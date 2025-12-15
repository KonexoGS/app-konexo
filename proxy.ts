import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './app/lib/session'

const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/api/auth',
];

const protectedRoutes = [
  '/home',
  '/projects',
  '/dev',
  '/profile',
];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // const isPublicRoute = publicRoutes.includes(path) ||
  //   path.startsWith('/api/') ||
  //   path.startsWith('/_next/') ||
  //   path.startsWith('/favicon') ||
  //   path.includes('.')

  const isProtectedRoute = protectedRoutes.some(route =>
    path.startsWith(route)
  )

  // verifica se há uma sessão válida
  const cookie = request.cookies.get('session')?.value;
  const session = await decrypt(cookie);

// redirect caso não haja sessão
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // para logados não acessarem a página de login
  if (session?.userId && (path === '/login' || path === '/register' || path === '/')) {
    return NextResponse.redirect(new URL('/home', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};