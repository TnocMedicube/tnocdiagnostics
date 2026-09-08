import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import {
  hashPassword,
  verifyPassword,
  createSession,
  validateSession,
  destroySession,
  extractToken,
  requireAdminAuth,
} from './server/auth';
import {
  loadDatabase,
  saveDatabase,
  getPublicData,
  logDbActivity,
  resetDatabaseToDefaults,
} from './server/db';

const app = express();
const PORT = 3000;

// Ensure upload directory exists
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage for media uploads (photos and videos)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, uniqueSuffix + '-' + sanitized);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit for direct video or high-res photo uploads
  },
});

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded static assets
app.use('/uploads', express.static(UPLOADS_DIR));

// ============================================================================
// API ROUTES
// ============================================================================

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    facility: 'TNOC Medical Diagnostic Facility',
    timestamp: new Date().toISOString(),
  });
});

// 2. Public Data (Database as single source of truth - NO admin credentials exposed)
app.get('/api/public/data', (_req: Request, res: Response) => {
  try {
    const data = getPublicData();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve public data', details: err?.message });
  }
});

app.get('/api/public/tests', (_req: Request, res: Response) => {
  try {
    const db = loadDatabase();
    res.json(db.investigations || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve investigations', details: err?.message });
  }
});

app.get('/api/public/services', (_req: Request, res: Response) => {
  try {
    const db = loadDatabase();
    res.json(db.services || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve services', details: err?.message });
  }
});

app.get('/api/public/gallery', (_req: Request, res: Response) => {
  try {
    const db = loadDatabase();
    res.json({
      photos: (db.galleryPhotos || []).filter((p) => p.isActive !== false),
      videos: (db.galleryVideos || []).filter((v) => v.isPublished !== false),
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve gallery', details: err?.message });
  }
});

// 3. Authentication Endpoints
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required.',
    });
  }

  const db = loadDatabase();
  const admin = db.admin;

  if (username.trim() !== admin.username) {
    return res.status(401).json({
      success: false,
      message: 'Invalid administrative credentials.',
    });
  }

  const isPasswordValid = verifyPassword(password, admin.hash, admin.salt);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid administrative credentials.',
    });
  }

  // Create session
  const session = createSession(admin.username);
  logDbActivity('Admin Login', 'Security', `Administrator "${admin.username}" signed in successfully.`);

  // Set HTTP cookie as well
  res.cookie('tnoc_session', session.token, {
    httpOnly: false, // Accessible to client-side auth header manager
    secure: false,
    sameSite: 'lax',
    maxAge: 14 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    success: true,
    token: session.token,
    user: {
      username: admin.username,
      role: 'admin',
    },
    message: 'Authentication successful.',
  });
});

app.get('/api/auth/verify', (req: Request, res: Response) => {
  const token = extractToken(req);
  const session = validateSession(token);

  if (!session) {
    return res.json({
      authenticated: false,
    });
  }

  return res.json({
    authenticated: true,
    user: {
      username: session.username,
      role: 'admin',
    },
  });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const token = extractToken(req);
  if (token) {
    destroySession(token);
  }
  res.clearCookie('tnoc_session');
  return res.json({ success: true, message: 'Logged out successfully.' });
});

app.post('/api/auth/change-password', requireAdminAuth, (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'New password must be at least 6 characters long.',
    });
  }

  const db = loadDatabase();
  if (!verifyPassword(currentPassword, db.admin.hash, db.admin.salt)) {
    return res.status(401).json({
      success: false,
      message: 'Current password verification failed.',
    });
  }

  const newAuth = hashPassword(newPassword);
  db.admin.salt = newAuth.salt;
  db.admin.hash = newAuth.hash;
  db.admin.updatedAt = new Date().toISOString();
  saveDatabase(db);

  logDbActivity('Password Changed', 'Security', 'Administrator password was changed successfully.');
  return res.json({ success: true, message: 'Password updated successfully.' });
});

// 4. Protected Content Management (All require authentication)
// Upload Endpoint (for direct photo or video files)
app.post('/api/admin/upload', requireAdminAuth, upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  logDbActivity('File Uploaded', 'Media', `Uploaded file: ${req.file.originalname} (${req.file.mimetype})`);

  return res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});

// Sync / Update Full Data Section
app.post('/api/admin/data', requireAdminAuth, (req: Request, res: Response) => {
  const db = loadDatabase();
  const updates = req.body;

  // Protect admin credentials from overwrite via general data endpoint
  delete updates.admin;

  Object.assign(db, updates);
  saveDatabase(db);
  logDbActivity('Database Synchronized', 'CMS Data', 'Content modules updated.');

  res.json({ success: true, message: 'Database updated successfully.' });
});

// Investigations / Tests Management
app.post('/api/admin/tests', requireAdminAuth, (req: Request, res: Response) => {
  const db = loadDatabase();
  const newTest = {
    id: 'test-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    ...req.body,
  };

  db.investigations = [newTest, ...(db.investigations || [])];
  saveDatabase(db);
  logDbActivity('Added Investigation', newTest.name, `Price: ${newTest.price}`);

  res.json({ success: true, item: newTest });
});

app.put('/api/admin/tests/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = loadDatabase();
  const index = db.investigations.findIndex((t: any) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Test not found' });
  }

  db.investigations[index] = {
    ...db.investigations[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  saveDatabase(db);
  logDbActivity('Updated Investigation', db.investigations[index].name, `Price: ${db.investigations[index].price}`);

  res.json({ success: true, item: db.investigations[index] });
});

app.delete('/api/admin/tests/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = loadDatabase();
  const target = db.investigations.find((t: any) => t.id === id);

  db.investigations = db.investigations.filter((t: any) => t.id !== id);
  saveDatabase(db);
  logDbActivity('Deleted Investigation', target ? target.name : id);

  res.json({ success: true, message: 'Test deleted successfully' });
});

// Services Management
app.post('/api/admin/services', requireAdminAuth, (req: Request, res: Response) => {
  const db = loadDatabase();
  const newService = {
    id: 'service-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    ...req.body,
  };

  db.services = [newService, ...(db.services || [])];
  saveDatabase(db);
  logDbActivity('Added Clinical Service', newService.name);

  res.json({ success: true, item: newService });
});

app.put('/api/admin/services/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = loadDatabase();
  const index = db.services.findIndex((s: any) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }

  db.services[index] = {
    ...db.services[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  saveDatabase(db);
  logDbActivity('Updated Clinical Service', db.services[index].name);

  res.json({ success: true, item: db.services[index] });
});

app.delete('/api/admin/services/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = loadDatabase();
  const target = db.services.find((s: any) => s.id === id);

  db.services = db.services.filter((s: any) => s.id !== id);
  saveDatabase(db);
  logDbActivity('Deleted Clinical Service', target ? target.name : id);

  res.json({ success: true, message: 'Service deleted successfully' });
});

// Photo Gallery Management
app.post('/api/admin/gallery/photos', requireAdminAuth, (req: Request, res: Response) => {
  const db = loadDatabase();
  const newPhoto = {
    id: 'photo-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    isActive: true,
    order: (db.galleryPhotos?.length || 0) + 1,
    ...req.body,
  };

  db.galleryPhotos = [newPhoto, ...(db.galleryPhotos || [])];
  saveDatabase(db);
  logDbActivity('Added Gallery Photo', newPhoto.title);

  res.json({ success: true, item: newPhoto });
});

app.put('/api/admin/gallery/photos/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = loadDatabase();
  const index = db.galleryPhotos.findIndex((p: any) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Photo not found' });
  }

  db.galleryPhotos[index] = {
    ...db.galleryPhotos[index],
    ...req.body,
  };

  saveDatabase(db);
  logDbActivity('Updated Gallery Photo', db.galleryPhotos[index].title);

  res.json({ success: true, item: db.galleryPhotos[index] });
});

app.delete('/api/admin/gallery/photos/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = loadDatabase();
  const target = db.galleryPhotos.find((p: any) => p.id === id);

  db.galleryPhotos = db.galleryPhotos.filter((p: any) => p.id !== id);
  saveDatabase(db);
  logDbActivity('Deleted Gallery Photo', target ? target.title : id);

  res.json({ success: true, message: 'Photo deleted successfully' });
});

// Video Gallery Management (Uploads & YouTube)
app.post('/api/admin/gallery/videos', requireAdminAuth, (req: Request, res: Response) => {
  const db = loadDatabase();
  const newVideo = {
    id: 'video-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    isPublished: true,
    order: (db.galleryVideos?.length || 0) + 1,
    ...req.body,
  };

  db.galleryVideos = [newVideo, ...(db.galleryVideos || [])];
  saveDatabase(db);
  logDbActivity('Added Gallery Video', newVideo.title, `Type: ${newVideo.videoType}`);

  res.json({ success: true, item: newVideo });
});

app.put('/api/admin/gallery/videos/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = loadDatabase();
  const index = db.galleryVideos.findIndex((v: any) => v.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Video not found' });
  }

  db.galleryVideos[index] = {
    ...db.galleryVideos[index],
    ...req.body,
  };

  saveDatabase(db);
  logDbActivity('Updated Gallery Video', db.galleryVideos[index].title);

  res.json({ success: true, item: db.galleryVideos[index] });
});

app.delete('/api/admin/gallery/videos/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = loadDatabase();
  const target = db.galleryVideos.find((v: any) => v.id === id);

  db.galleryVideos = db.galleryVideos.filter((v: any) => v.id !== id);
  saveDatabase(db);
  logDbActivity('Deleted Gallery Video', target ? target.title : id);

  res.json({ success: true, message: 'Video deleted successfully' });
});

// Reset Database to Factory Defaults
app.post('/api/admin/reset', requireAdminAuth, (_req: Request, res: Response) => {
  resetDatabaseToDefaults();
  logDbActivity('Factory Reset', 'Database', 'All content restored to initial verified clinical defaults.');
  res.json({ success: true, message: 'All website content restored to factory defaults.' });
});

// ============================================================================
// START SERVER & VITE INTEGRATION
// ============================================================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TNOC Medical Diagnostics Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
