import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value || request.headers.get('authorization');

   const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/registrar');
   const isProtectedRoute = request.nextUrl.pathname.startsWith('dashboard');

   if(isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('login', request.url));
   };

   if(isAuthPage && token) {
    return NextResponse.redirect(new URL('dashboard', request.url));
   };

    return NextResponse.next();
}

export const config = {
    matcher: ['dashboard/:path', '/login', '/register'], //Protege dashboard e subrotas
}