
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Check for admin-session cookie (mock check)
    const adminSession = request.cookies.get('admin_session');

    // In a real application, you would verify the session/token here
    if (!adminSession || adminSession.value !== 'true') {
      // Redirect to home or sign-in if not authorized
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
