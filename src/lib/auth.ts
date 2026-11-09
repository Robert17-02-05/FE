// ============================================================
// auth.ts — Server-side session helper (Next.js)
// Dùng trong Server Components và API routes
// ============================================================
import { cookies } from 'next/headers';

export interface Session {
  userId: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
}

/**
 * Lấy session từ cookie phía server
 * Dùng trong Server Components (layout, page)
 */
export async function getServerSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) return null;

  try {
    // Verify token với backend hoặc dùng jose để verify JWT
    // const payload = await verifyJWT(token);
    // return payload as Session;

    // Demo: return mock session
    return {
      userId: '1',
      email: 'user@example.com',
      role: 'user',
    };
  } catch {
    return null;
  }
}

/**
 * Require session — throw redirect nếu chưa đăng nhập
 * Dùng trong protected page/layout
 */
export async function requireSession(): Promise<Session> {
  const session = await getServerSession();
  if (!session) {
    const { redirect } = await import('next/navigation');
    redirect('/login');
  }
  return session;
}
