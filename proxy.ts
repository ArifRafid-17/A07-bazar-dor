import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import type { Session, User } from 'better-auth/types';

export async function proxy(request: NextRequest) {
  // Check for session cookie first as a fast path
  const sessionCookie =
    request.cookies.get('better-auth.session_token') ||
    request.cookies.get('__Secure-better-auth.session_token');

  if (!sessionCookie?.value) {
    const signInUrl = new URL('/SignIn', request.url);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Validate the session with Better Auth
  try {
    const { data: session } = await betterFetch<{
      session: Session;
      user: User;
    }>('/api/auth/get-session', {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    if (!session?.user) {
      const signInUrl = new URL('/SignIn', request.url);
      signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
  } catch (error) {
    console.error('Session verification error in proxy:', error);
    const signInUrl = new URL('/SignIn', request.url);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/ProductDetails', '/Profile', '/ProductDetails/:path*'],
};
