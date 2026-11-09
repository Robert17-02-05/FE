// ============================================================
// lib/auth-client.ts — better-auth React client
// Usage (Client Components only):
//   import { authClient } from '@/lib/auth-client';
//   const { data: session } = authClient.useSession();
// ============================================================
import { createAuthClient } from 'better-auth/react';

// baseURL left empty: auth endpoints are proxied through Next.js
// rewrites: /api/auth/* → http://localhost:5173/api/auth/*
export const authClient = createAuthClient({
  baseURL: '',
});
