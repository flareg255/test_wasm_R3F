import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Teko, Orbitron } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google'
import "@/src/styles/globals.css";
import Navigation from "@/src/components/Navigation";



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
  metadataBase: new URL('https://ultrazone.blue'),
  title: "ULTRAZONE FACTORY | Web Engineering & Cloud Solutions",
  description: 'Next.js/React/VueによるモダンUI、Django/Laravelでのバックエンド開発に加え、SharePoint Framework (SPFx) によるMS365拡張まで。ULTRAZONE FACTORYは、Webと業務システムの境界を超えて一気通貫で開発するエンジニアリング・スタジオです。',

  keywords: [
    'Web開発',
    'フルスタックエンジニア',
    'Next.js', 'React', 'Nuxt', 'Vue.js',
    'Django', 'Python',
    'Laravel', 'PHP',
    'AWS',
    'SharePoint Framework', 'SPFx', 'Microsoft 365'
  ],
  openGraph: {
    title: 'ULTRAZONE FACTORY | Web Engineering & Cloud Solutions',
    description: 'Next.js/React/VueによるモダンUI、Django/Laravelでのバックエンド開発に加え、SharePoint Framework (SPFx) によるMS365拡張まで。ULTRAZONE FACTORYは、Webと業務システムの境界を超えて一気通貫で開発するエンジニアリング・スタジオです。',
    url: 'https://ultrazone.blue',
    siteName: 'ULTRAZONE FACTORY',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/images/og-main.png',
        width: 1200,
        height: 630,
        alt: 'ULTRAZONE FACTORY',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ULTRAZONE FACTORY | Web Engineering & Cloud Solutions',
    description: 'Next.js/React/VueによるモダンUI、Django/Laravelでのバックエンド開発に加え、SharePoint Framework (SPFx) によるMS365拡張まで。ULTRAZONE FACTORYは、Webと業務システムの境界を超えて一気通貫で開発するエンジニアリング・スタジオです。',
    images: ['/images/og-main.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-TCMHWF2W" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${teko.variable} ${orbitron.variable} antialiased`}
      >
        <Navigation />
        {children}
        <div className="footer">
          © {new Date().getFullYear()} ULTRAZONE FACTORY
        </div>
      </body>
    </html>
  );
}
