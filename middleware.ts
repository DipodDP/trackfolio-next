import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {PUBLIC_ROUTES, SIGN_IN, ROOT, PROTECTED_SUB_ROUTES} from "@/constants/routes";
import { decrypt } from '@/lib/stateless-session';

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  // Decrypt the session from the cookie
  const cookie_action = await cookies()
  const cookie = cookie_action.get('session')?.value;
  const session = await decrypt(cookie);
  const isAuthenticated = !!session?.accessToken; // Get the JWT token from cookies

  // Check if the current request is for a protected route
  const isPublicRoute = (!!PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))
  // || nextUrl.pathname === ROOT
  ) && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route));

  console.log('Authenticated:', isAuthenticated, 'for', nextUrl.href, 'is public:', isPublicRoute);

  if (!isAuthenticated && !isPublicRoute)
    // If token does not exist, redirect to login
    return NextResponse.redirect(new URL(SIGN_IN, nextUrl));

  if (isAuthenticated && nextUrl.pathname === SIGN_IN)
    // If token, redirect to dashboard
    return NextResponse.redirect(new URL(ROOT, nextUrl));

  // Continue if is authenticated or not a protected route
  try {

    // Create a new Headers object by copying the request headers
    const requestHeaders = new Headers(request.headers);

    // Add the Authorization header if the user is authenticated
    if (isAuthenticated && session?.accessToken) {
      requestHeaders.delete('cookie');
      requestHeaders.set('Authorization', `Bearer ${session.accessToken}`);
    }

    // Create a new response with the modified headers
    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    }); // Continue to the protected route

    // console.log('Continue...', response)

    return response

  } catch (error) {
    console.log('Auth error!', error)
    return NextResponse.redirect(new URL(SIGN_IN, nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
