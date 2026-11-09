'use client';
// ============================================================
// useLocalStorage.ts — SSR-safe localStorage hook
// ============================================================
import { useState, useCallback } from 'react';
import { storage } from '@/utils/storage';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = storage.get<T>(key);
    return item !== null ? item : initialValue;
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const newValue = typeof value === 'function'
        ? (value as (prev: T) => T)(prev)
        : value;
      storage.set(key, newValue);
      return newValue;
    });
  }, [key]);

  const removeValue = useCallback(() => {
    storage.remove(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
};
