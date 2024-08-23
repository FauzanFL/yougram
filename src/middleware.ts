import { getSession } from "./lib/sessionCookie";
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const session = getSession()
    const pathname = request.nextUrl.pathname
    if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
        if (session) return NextResponse.rewrite(new URL('/home', request.url))
    }
    
    if (pathname.startsWith("/home") || pathname.startsWith("/search") || pathname.startsWith("/profile")) {
        if (!session) return NextResponse.rewrite(new URL('/login', request.url))
    }

    return NextResponse.next()
}