import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/' || 
                      path.startsWith('/auth/') ||
                      path.startsWith('/api/auth/') ||
                      path.startsWith('/_next/') ||
                      path.startsWith('/favicon.ico')

  // Get the token from the request cookies
  const token = request.cookies.get('auth-token')?.value || ''

  // If user is on a public path and has a token, redirect to dashboard
  if (isPublicPath && token && (path === '/' || path.startsWith('/auth/'))) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  // If user is on a protected path and doesn't have a token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
