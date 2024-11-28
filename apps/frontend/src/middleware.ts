import { IGetMe } from '@repo/api';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/app', '/admin', '/auth'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the path matches any protected route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const sessionCookie = req.cookies.get(
      process.env.API_COOKIE_KEY as string,
    )?.value;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            cookie: `${process.env.API_COOKIE_KEY}=${sessionCookie}`,
          },
        },
      );

      // If 401 status is returned, delete the session cookie and redirect to the sign-in page
      if (response.status === 401) {
        if (!pathname.startsWith('/auth')) {
          const redirect = NextResponse.redirect(
            new URL('/auth/signin', req.url),
          );
          redirect.cookies.delete(process.env.API_COOKIE_KEY as string);
          return redirect;
        }
        const response = NextResponse.next();
        response.cookies.delete(process.env.API_COOKIE_KEY as string);
        return response;
      }

      // For other server errors, log the error and proceed without deleting the cookie
      if (!response.ok) {
        return NextResponse.next(); // Continue the request without modifications
      }

      const auth: IGetMe['response'] | undefined = await response.json();

      // If the user is not authenticated and tries to access /app or /admin routes
      if (
        !auth?.data &&
        (pathname.startsWith('/app') || pathname.startsWith('/admin'))
      ) {
        const redirect = NextResponse.redirect(
          new URL('/auth/signin', req.url),
        );
        redirect.cookies.delete(process.env.API_COOKIE_KEY as string);
        return redirect;
      }

      // If the user is authenticated but is on the /auth route, redirect to the appropriate dashboard
      if (auth?.data) {
        if (pathname.startsWith('/auth')) {
          const redirectPath = auth.data.isAdmin
            ? '/admin/dashboard'
            : '/app/dashboard';
          return NextResponse.redirect(new URL(redirectPath, req.url));
        }

        // If the user is not an admin but tries to access /admin, redirect to /app
        if (pathname.startsWith('/admin') && !auth.data.isAdmin) {
          return NextResponse.redirect(new URL('/app/dashboard', req.url));
        }
      }
    } catch (error) {
      // Handle network or request errors without deleting the session cookie
      return NextResponse.next();
    }
  }

  // If the route is not protected or no redirect is needed, continue the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
