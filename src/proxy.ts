import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get('host') || '';
    const currentProto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '');
    const isDev = process.env.NODE_ENV === 'development';

    let needsRedirect = false;

    if (!isDev && hostname.startsWith('www.')) {
        url.hostname = hostname.replace('www.', '');
        needsRedirect = true;
    }

    if (!isDev && currentProto === 'http') {
        url.protocol = 'https';
        needsRedirect = true;
    }

    if (url.pathname.endsWith('/index')) {
        url.pathname = url.pathname.replace(/\/index$/, '');
        if (url.pathname === '') url.pathname = '/';
        needsRedirect = true;
    }

    if (needsRedirect) {
        return NextResponse.redirect(url, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
