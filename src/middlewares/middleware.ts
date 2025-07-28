import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  //apenas proteger rotas e não buscar o token do localstorage
  
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/cadastro');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/cadastro'],
}