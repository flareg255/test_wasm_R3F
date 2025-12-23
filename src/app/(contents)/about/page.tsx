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

                <div className="space-y-8 text-lg md:text-xl font-inter tracking-wide text-gray-300 leading-loose">
                    <p>
                        ULTRAZONE FACTORYは、Webと業務システムの境界を超えて開発を行う
                        <br className="hidden md:block" />
                        Webエンジニアリング・スタジオです。
                    </p>
                    <p className="text-base md:text-lg text-gray-400">
                        Next.jsやReactによる没入感のあるフロントエンド表現から、
                        <br className="hidden md:block" />
                        AWS上の堅牢なインフラ構築、
                        <br className="hidden md:block" />
                        そしてSharePoint Framework (SPFx) を用いたエンタープライズ環境の拡張まで。
                        <br />
                        一人のフルスタックエンジニアが、一気通貫した技術ソリューションを提供します。
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
                    {/* Frontend */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-teko tracking-wider text-cyan-400 border-b border-cyan-400/30 pb-2 mb-4">
                            Frontend
                        </h2>
                        <ul className="space-y-2 text-gray-400 font-inter text-sm md:text-base">
                            <li>Next.js / React</li>
                            <li>Nuxt / Vue.js</li>
                            <li>Three.js / WebGL</li>
                            <li>Tailwind CSS</li>
                        </ul>
                    </div>

                    {/* Backend */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-teko tracking-wider text-purple-400 border-b border-purple-400/30 pb-2 mb-4">
                            Backend
                        </h2>
                        <ul className="space-y-2 text-gray-400 font-inter text-sm md:text-base">
                            <li>Python (Django/FastAPI)</li>
                            <li>PHP (Laravel)</li>
                            <li>Node.js</li>
                        </ul>
                    </div>

                    {/* Content Management */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-teko tracking-wider text-orange-400 border-b border-orange-400/30 pb-2 mb-4">
                            CMS & Architecture
                        </h2>
                        <ul className="space-y-2 text-gray-400 font-inter text-sm md:text-base">
                            <li>Headless CMS Architecture<br /><span className="text-xs text-gray-500">(WordPress + Next.js)</span></li>
                            <li>WordPress Theme/Plugin Dev</li>
                        </ul>
                    </div>

                    {/* Enterprise & Cloud */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-teko tracking-wider text-emerald-400 border-b border-emerald-400/30 pb-2 mb-4">
                            Enterprise & Cloud
                        </h2>
                        <ul className="space-y-2 text-gray-400 font-inter text-sm md:text-base">
                            <li>AWS Architecture</li>
                            <li>SharePoint Framework (SPFx)</li>
                            <li>Microsoft 365 Integration</li>
                            <li>Docker / CI/CD</li>
                        </ul>
                    </div>
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
