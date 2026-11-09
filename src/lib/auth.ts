// src/lib/auth.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type Role = 'STUDENT' | 'EMPLOYER' | 'ADMIN';

export interface Session {
  userId: string;
  email: string;
  name: string;
  role: Role;
}

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:5173';

/** Lấy session từ BE (Better Auth). Trả về null nếu chưa đăng nhập. */
export async function getServerSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  if (!cookieHeader) return null;

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
      headers: { cookie: cookieHeader },
      cache: 'no-store',
    });
    if (!res.ok) return null;

    const data = await res.json();
    if (!data?.user) return null;

    return {
      userId: data.user.id,
      email: data.user.email,
      name: data.user.name,
      role: data.user.role,
    };
  } catch {
    return null;
  }
}

/** Bắt buộc đăng nhập (và đúng vai trò nếu truyền vào). */
export async function requireSession(allowedRoles?: Role[]): Promise<Session> {
  const session = await getServerSession();
  if (!session) redirect('/login');
  if (allowedRoles && !allowedRoles.includes(session.role)) redirect('/');
  return session;
}