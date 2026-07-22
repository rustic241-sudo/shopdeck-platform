import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const currentHost = hostname.split(':')[0]; // e.g. "localhost", "127.0.0.1", "shopdeck.in"

  // If request is for static assets / Next.js internals / API endpoints, skip
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/static') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if current host is standard localhost or platform root domain
  const isLocalOrRootHost = 
    currentHost === 'localhost' || 
    currentHost === '127.0.0.1' || 
    currentHost === 'shopdeck.in' || 
    currentHost === 'app.shopdeck.in' || 
    currentHost.endsWith('.vercel.app');

  // If visiting dashboard, admin, or storefront routes directly, pass through
  if (
    isLocalOrRootHost || 
    url.pathname === '/' || 
    url.pathname.startsWith('/dashboard') || 
    url.pathname.startsWith('/admin') || 
    url.pathname.startsWith('/store')
  ) {
    return NextResponse.next();
  }

  // Handle Subdomain or Custom Domain Storefront Routing for dynamic stores
  let domainIdentifier = currentHost;
  if (currentHost.endsWith('.localhost')) {
    domainIdentifier = currentHost.replace('.localhost', '');
  } else if (currentHost.endsWith('.shopdeck.in')) {
    domainIdentifier = currentHost.replace('.shopdeck.in', '');
  }

  return NextResponse.rewrite(new URL(`/store/${domainIdentifier}${url.pathname}`, request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
