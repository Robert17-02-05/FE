import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================================
// middleware.ts — Route protection for Internery
//
// Strategy: check for session cookie presence only.
// Role-based access control is handled inside each group's
// layout.tsx (server-side), not here.
//
// Protected route groups (by URL prefix):
//   /student/* → requires STUDENT session
//   /employer/* → requires EMPLOYER session
// ============================================================

// Cookie name set by better-auth on the SvelteKit backend
const SESSION_COOKIE = 'better-auth.session_token';

const STUDENT_ROUTES = ['/student'];
const EMPLOYER_ROUTES = ['/employer'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  const isStudentRoute = STUDENT_ROUTES.some((r) => pathname.startsWith(r));
  const isEmployerRoute = EMPLOYER_ROUTES.some((r) => pathname.startsWith(r));

  if ((isStudentRoute || isEmployerRoute) && !hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/student/:path*',
    '/employer/:path*',
  ],
};
