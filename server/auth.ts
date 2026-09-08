import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

export interface AdminUserRecord {
  username: string;
  salt: string;
  hash: string;
  updatedAt: string;
}

export interface SessionRecord {
  token: string;
  username: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory sessions store (survives requests, backed by map)
const activeSessions = new Map<string, SessionRecord>();

const SESSION_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

export function hashPassword(password: string, existingSalt?: string): { hash: string; salt: string } {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}

export function createSession(username: string): SessionRecord {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const session: SessionRecord = {
    token,
    username,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
  };
  activeSessions.set(token, session);
  return session;
}

export function validateSession(token?: string): SessionRecord | null {
  if (!token) return null;
  const session = activeSessions.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }

  return session;
}

export function destroySession(token?: string): boolean {
  if (!token) return false;
  return activeSessions.delete(token);
}

export function extractToken(req: Request): string | undefined {
  // 1. Authorization header: Bearer <token>
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  // 2. Custom header: X-Admin-Token
  const customHeader = req.headers['x-admin-token'];
  if (typeof customHeader === 'string') {
    return customHeader.trim();
  }

  // 3. Cookie check (if cookies parsed)
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map((c) => c.trim());
    const sessionCookie = cookies.find((c) => c.startsWith('tnoc_session='));
    if (sessionCookie) {
      return sessionCookie.split('=')[1];
    }
  }

  return undefined;
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const token = extractToken(req);
  const session = validateSession(token);

  if (!session) {
    return res.status(401).json({
      error: 'Unauthorized: Administrative authentication required.',
      code: 'AUTH_REQUIRED',
    });
  }

  // Attach session info
  (req as any).adminUser = session.username;
  next();
}
