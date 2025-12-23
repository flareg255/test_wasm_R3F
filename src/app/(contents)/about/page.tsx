import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'ULTRAZONE FACTORY | ABOUT',
    description: 'About ULTRAZONE FACTORY - Web Engineering & Cloud Solutions',
    alternates: {
        canonical: '/about',
    },
};

export default function AboutPage() {
    return (
        <main className="main-container !h-auto min-h-screen !overflow-y-auto relative flex flex-col items-center justify-center bg-background text-foreground py-20">
            <div className="z-10 w-full max-w-4xl px-6 text-center">
                <h1 className="mb-16 text-6xl md:text-8xl font-teko tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                    ABOUT US
                </h1>

                <div className="space-y-10 text-lg md:text-xl font-inter tracking-wide text-gray-300 leading-loose">
                    <p>
                        Next.js / React / Vue によるモダンUI、
                        <br className="hidden md:block" />
                        Django / Laravel でのバックエンド開発に加え、
                        <br className="hidden md:block" />
                        SharePoint Framework (SPFx) によるMS365拡張まで。
                    </p>
                    <p>
                        ULTRAZONE FACTORYは、
                        <br className="hidden md:block" />
                        Webと業務システムの境界を超えて一気通貫で開発する
                        <br className="hidden md:block" />
                        エンジニアリング・スタジオです。
                    </p>
                </div>

                <div className="mt-24">
                    <Link
                        href="/"
                        className="inline-block text-gray-500 hover:text-white tracking-widest text-sm transition-colors font-orbitron"
                    >
                        ← BACK TO HOME
                    </Link>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black -z-10 pointer-events-none opacity-50" />
        </main>
    );
}
