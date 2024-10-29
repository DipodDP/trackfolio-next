import { NextRequest, NextResponse } from 'next/server';


// Define unprotected routes
const unprotectedRoutes = ['/sign-in', '/sign-up'];

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('trackfolio'); // Get the JWT token from cookies
  // Check if the current request is for a unprotected route
  if (unprotectedRoutes.includes(req.nextUrl.pathname)) {
    console.log('Not authenticated!')
    return NextResponse.next(); // Continue if not a protected route
  }
  // If token does not exist, redirect to login
  if (!token) {
    console.log('Not authenticated!')
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  try {
    console.log('Auth ok', req.nextUrl.pathname)
    return NextResponse.next(); // Continue to the protected route
  } catch (error) {
    console.log('Auth error!', error)
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}
