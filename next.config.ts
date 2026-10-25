import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
// Vercel のプレビューデプロイかどうか(本番では vercel.live を許可しない)
const isPreview = process.env.VERCEL_ENV === "preview";

// GTM / GA4 が利用するオリジン(Google 公式の CSP ガイドに準拠)
const GTM = "https://www.googletagmanager.com";
const GA_WILDCARDS = "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com";
// Vercel のプレビューデプロイで表示されるツールバー(プレビュー時のみ許可)
const VERCEL_LIVE = isPreview ? " https://vercel.live" : "";

const csp = [
  "default-src 'self'",
  // GTM のインラインスクリプトのため 'unsafe-inline'、WASM のコンパイルのため 'wasm-unsafe-eval' が必要
  // 開発時は webpack の eval ソースマップのため 'unsafe-eval' も許可する
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ""} ${GTM}${VERCEL_LIVE}`,
  // framer-motion などのインラインスタイルのため 'unsafe-inline' が必要
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${GA_WILDCARDS}`,
  // next/font はフォントをセルフホストするため外部オリジンは不要
  "font-src 'self'",
  // 開発時は HMR の WebSocket を許可する
  `connect-src 'self' ${GA_WILDCARDS}${VERCEL_LIVE}${isDev ? " ws: wss:" : ""}`,
  "worker-src 'self' blob:",
  `frame-src ${GTM}${VERCEL_LIVE}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  // まずは Report-Only で導入し、違反がないことを確認してから Content-Security-Policy に切り替える
  { key: "Content-Security-Policy-Report-Only", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // HSTS は Vercel が自動付与するためここでは設定しない
];

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
  trailingSlash: false,
  // X-Powered-By ヘッダーでフレームワークを露出しない
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
