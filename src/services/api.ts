// Client-side API client for TNOC Medical Diagnostics CMS

const TOKEN_STORAGE_KEY = 'tnoc_admin_auth_token';

export function getStoredToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null) {
  try {
    if (token) {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // sessionStorage not available
  }
}

function getAuthHeaders(): HeadersInit {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['X-Admin-Token'] = token;
  }
  return headers;
}

export const api = {
  // Public data fetching
  async getPublicData() {
    try {
      const res = await fetch('/api/public/data');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API getPublicData failed, fallback to local:', err);
      return null;
    }
  },

  // Authentication
  async login(username: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Invalid administrative credentials.');
    }

    if (data.token) {
      setStoredToken(data.token);
    }

    return data;
  },

  async verifyAuth(): Promise<boolean> {
    const token = getStoredToken();
    if (!token) return false;

    try {
      const res = await fetch('/api/auth/verify', {
        headers: getAuthHeaders(),
      });
      if (!res.ok) return false;
      const data = await res.json();
      return Boolean(data.authenticated);
    } catch {
      return false;
    }
  },

  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: getAuthHeaders(),
      });
    } catch {
      // Ignore network errors on logout
    }
    setStoredToken(null);
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Password update failed.');
    }
    return data;
  },

  // Save / Sync whole DB sections
  async syncDatabase(data: Record<string, any>) {
    const res = await fetch('/api/admin/data', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  // Investigations / Tests
  async addTest(item: any) {
    const res = await fetch('/api/admin/tests', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    return await res.json();
  },

  async updateTest(id: string, item: any) {
    const res = await fetch(`/api/admin/tests/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    return await res.json();
  },

  async deleteTest(id: string) {
    const res = await fetch(`/api/admin/tests/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  // Services
  async addService(item: any) {
    const res = await fetch('/api/admin/services', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    return await res.json();
  },

  async updateService(id: string, item: any) {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    return await res.json();
  },

  async deleteService(id: string) {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  // Photo Gallery
  async addPhoto(item: any) {
    const res = await fetch('/api/admin/gallery/photos', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    return await res.json();
  },

  async updatePhoto(id: string, item: any) {
    const res = await fetch(`/api/admin/gallery/photos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    return await res.json();
  },

  async deletePhoto(id: string) {
    const res = await fetch(`/api/admin/gallery/photos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  // Video Gallery
  async addVideo(item: any) {
    const res = await fetch('/api/admin/gallery/videos', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    return await res.json();
  },

  async updateVideo(id: string, item: any) {
    const res = await fetch(`/api/admin/gallery/videos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(item),
    });
    return await res.json();
  },

  async deleteVideo(id: string) {
    const res = await fetch(`/api/admin/gallery/videos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  // Upload Media
  async uploadFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const token = getStoredToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['X-Admin-Token'] = token;
    }

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed with HTTP ${res.status}`);
    }

    return await res.json();
  },

  // Factory Reset
  async resetToDefaults() {
    const res = await fetch('/api/admin/reset', {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },
};
