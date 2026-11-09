// ============================================================
// storage.ts — localStorage wrapper (client-side only)
// ============================================================

export const storage = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null; // SSR safe
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch { return null; }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (e) { console.error('storage.set error:', e); }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN:  'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER:          'user',
  THEME:         'theme',
  LANGUAGE:      'language',
  CART:          'cart',
} as const;
