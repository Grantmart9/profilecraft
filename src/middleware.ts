import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host');
  const pathname = url.pathname;
  
  // Check if this is a subdomain request
  if (host && host.includes('.')) {
    const subdomain = host.split('.')[0];
    
    // Check if this is a profile subdomain (not www or api)
    if (subdomain && !['www', 'api'].includes(subdomain)) {
      // Rewrite to profile page
      url.pathname = `/profile/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }
  
  // For all other requests, continue normally
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};