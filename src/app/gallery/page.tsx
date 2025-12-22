import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gallery - ULTRAZONE FACTORY',
    description: 'Experiments and Demonstrations',
};

export default function GalleryPage() {
    return (
        <main className="main-container relative flex flex-col items-center justify-center text-white bg-black">
            <div className="z-10 text-center">
                <h1 className="ultrazone-text mb-12">GALLERY</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                    <Link href="/gallery/box" className="group block">
                        <div className="border border-white/20 p-6 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                            <h2 className="text-2xl font-teko text-cyan-400 mb-2 group-hover:text-white transition-colors">WASM CUBE</h2>
                            <p className="text-gray-400 font-inter text-sm group-hover:text-gray-200">
                                A simple 3D cube manipulated by Rust/Wasm physics.
                            </p>
                        </div>
                    </Link>

                    {/* New items can be added here */}

                </div>

                <div className="mt-20">
                    <Link href="/" className="inline-block text-gray-500 hover:text-white tracking-widest text-sm transition-colors">
                        ← BACK TO HOME
                    </Link>
                </div>
            </div>

            {/* Optional: Add a subtle background effect if desired */}
        </main>
    );
}
