import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 正規ホスト(リダイレクト先はリクエストの Host ヘッダーから組み立てず固定値を使う)
const CANONICAL_HOST = 'ultrazone.blue';
const WWW_HOST = `www.${CANONICAL_HOST}`;

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get('host') || '';

    let needsRedirect = false;

    // www 付きの正規ドメインだけを完全一致で判定する(プレビュー環境や localhost には影響しない)
    // http → https の変換は Vercel のエッジが行うため、ここでは扱わない
    if (hostname === WWW_HOST) {
        url.protocol = 'https';
        url.hostname = CANONICAL_HOST;
        url.port = '';
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
