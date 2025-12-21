import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Teko, Orbitron } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ULTRAZONE FACTORY",
  description: "ULTRAZONE FACTORYでは宮崎の地域に根ざしたサイト・システムをご提案します。お気軽にお問い合わせください。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${teko.variable} ${orbitron.variable} antialiased`}
      >
        {children}
        <div style={{
          position: "fixed",
          bottom: "20px",
          width: "100%",
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.4)",
          fontFamily: "var(--font-orbitron)",
          fontSize: "14px",
          letterSpacing: "0.1em",
          pointerEvents: "none",
          zIndex: 9999,
        }}>
          © {new Date().getFullYear()} ULTRAZONE FACTORY
        </div>
      </body>
    </html>
  );
}
