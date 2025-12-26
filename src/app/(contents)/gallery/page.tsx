import Link from 'next/link';
import type { Metadata } from 'next';

import GalleryItem from './_components/GalleryItem';

export const metadata: Metadata = {
    title: 'ULTRAZONE FACTORY / GALLERY / WASM CUBE',
    description: 'WASM CUBE',
    alternates: {
        canonical: '/gallery',
    },
};

export default function GalleryPage() {
    return (
        <main className="relative flex flex-col items-center text-white pt-20 pb-20 w-full">
            <article className="z-10 text-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                    <GalleryItem
                        href="/gallery/box"
                        title="WASM CUBE"
                        description="A simple 3D cube manipulated by Rust/Wasm physics."
                    />
                    <GalleryItem
                        href="/gallery/vertical-stream"
                        title="VERTICAL STREAM"
                        description="A vertical stream visual experiment."
                    />
                </div>

                <nav className="mt-20">
                    <Link href="/" className="inline-block text-gray-500 hover:text-white tracking-widest text-sm transition-colors">
                        ← BACK TO HOME
                    </Link>
                </nav>
            </article>
        </main>
    );
}
