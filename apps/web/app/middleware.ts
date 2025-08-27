import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (
        pathname.startsWith('/api/auth') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next()
    }

    const secret = process.env.NEXTAUTH_SECRET
    if (!secret) console.warn('NEXTAUTH_SECRET not set')

    const token = await getToken({ req: request as any, secret })

    if (!token) {
        const signInUrl = new URL('/api/auth/signin', request.url)
        return NextResponse.redirect(signInUrl)
    }

    
    return NextResponse.next()
}

export const config = {
    matcher: '/chats/:path*',
}