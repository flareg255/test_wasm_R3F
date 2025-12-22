import Link from 'next/link';
import type { Metadata } from 'next';

import GalleryItem from './_components/GalleryItem';

export const metadata: Metadata = {
    title: 'ULTRAZONE FACTORY / GALLERY',
    description: 'Experiments and Demonstrations',
};

export default function GalleryPage() {
    return (
        <main className="main-container relative flex flex-col items-center justify-center text-white bg-black">
            <div className="z-10 text-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                    <GalleryItem
                        href="/gallery/box"
                        title="WASM CUBE"
                        description="A simple 3D cube manipulated by Rust/Wasm physics."
                    />
                </div>

                <div className="mt-20">
                    <Link href="/" className="inline-block text-gray-500 hover:text-white tracking-widest text-sm transition-colors">
                        ← BACK TO HOME
                    </Link>
                </div>
            </div>
        </main>
    );
}
