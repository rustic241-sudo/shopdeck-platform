import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Standard root domains
  const rootDomains = ['localhost:3000', 'shopdeck.in', 'app.shopdeck.in', 'shopdeck.vercel.app'];

  // Check if current host is a custom domain or subdomain (not root)
  const isRootDomain = rootDomains.some(root => hostname === root || hostname.endsWith(`.${root}`));

  // Extract subdomain if exists (e.g. "trendygadgets" from "trendygadgets.localhost:3000")
  let currentHost = hostname.split(':')[0]; // Remove port if any

  // If request is for static assets / Next.js internals / API endpoints, skip middleware rewrite
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/static') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Handle Subdomain or Custom Domain Storefront Routing
  if (!rootDomains.includes(currentHost)) {
    // Extract subdomain if it's a subdomain of root (e.g. trendygadgets.shopdeck.in)
    let domainIdentifier = currentHost;
    if (currentHost.endsWith('.localhost')) {
      domainIdentifier = currentHost.replace('.localhost', '');
    } else if (currentHost.endsWith('.shopdeck.in')) {
      domainIdentifier = currentHost.replace('.shopdeck.in', '');
    }

    // Rewrite to storefront dynamic route
    return NextResponse.rewrite(new URL(`/store/${domainIdentifier}${url.pathname}`, request.url));
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
