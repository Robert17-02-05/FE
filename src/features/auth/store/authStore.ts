'use client';
// ============================================================
// authStore.ts — Zustand store for Auth (Next.js)
// ============================================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/utils/storage';

interface AuthUser {
  id:       string;
  email:    string;
  fullName: string;
  avatar?:  string;
  role:     'admin' | 'user' | 'moderator';
}

interface AuthState {
  user:            AuthUser | null;
  isAuthenticated: boolean;
  setUser:         (user: AuthUser) => void;
  clearUser:       () => void;
  updateAvatar:    (avatar: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:            null,
      isAuthenticated: false,

      setUser: (user) =>
        set({ user, isAuthenticated: true }),

      clearUser: () =>
        set({ user: null, isAuthenticated: false }),

      updateAvatar: (avatar) =>
        set((state) => ({
          user: state.user ? { ...state.user, avatar } : null,
        })),
    }),
    {
      name:       STORAGE_KEYS.USER,
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
