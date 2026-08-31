import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  const hostname = host.toLowerCase();

  // Detect if request is via the `toolify.` subdomain
  const isToolifySubdomain =
    hostname.startsWith('toolify.') || hostname.startsWith('toolify.localhost');

  if (isToolifySubdomain) {
    // If someone on toolify subdomain visits /tools or /tools/xxx, 
    // clean up the URL by stripping /tools (e.g., toolify.domain.com/tools/image-compressor -> toolify.domain.com/image-compressor)
    if (url.pathname.startsWith('/tools')) {
      const cleanPath = url.pathname.replace(/^\/tools/, '') || '/';
      url.pathname = cleanPath;
      return NextResponse.redirect(url);
    }

    // Rewrite toolify.domain.com/<path> internally to /tools/<path>
    url.pathname = `/tools${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  } else {
    // On the main domain (e.g., nsshan.com or localhost:3000):
    // When visiting /tools or /tools/*, redirect immediately to toolify subdomain
    if (url.pathname.startsWith('/tools')) {
      const cleanPath = url.pathname.replace(/^\/tools/, '') || '/';

      // Build target hostname: toolify.yourdomain.com or toolify.localhost:3000
      let baseHost = host;
      if (baseHost.startsWith('www.')) {
        baseHost = baseHost.slice(4);
      }
      const toolifyHost = `toolify.${baseHost}`;

      const redirectUrl = new URL(
        `${cleanPath}${url.search}`,
        `${url.protocol}//${toolifyHost}`
      );
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all requests except static assets, _next internals, and favicon
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
