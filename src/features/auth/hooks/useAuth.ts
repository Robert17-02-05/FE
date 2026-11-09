'use client';
// ============================================================
// useAuth.ts — Custom hook Auth (Client Component only)
// ============================================================
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../services/authApi';
import { useAuthStore } from '../store/authStore';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import type { LoginPayload, RegisterPayload } from '../types';

export const useAuth = () => {
  const router = useRouter();
  const { user, setUser, clearUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authApi.login(payload);
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, res.tokens.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, res.tokens.refreshToken);
      setUser(res.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [router, setUser]);

  const register = useCallback(async (payload: RegisterPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authApi.register(payload);
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, res.tokens.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, res.tokens.refreshToken);
      setUser(res.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [router, setUser]);

  const logout = useCallback(async () => {
    try { await authApi.logout(); } finally {
      storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      clearUser();
      router.push('/login');
    }
  }, [router, clearUser]);

  return { user, isLoading, error, login, register, logout };
};
