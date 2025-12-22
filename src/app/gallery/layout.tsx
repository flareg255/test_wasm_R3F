
"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // またはローディングスピナーなど
    }

    return (
        <div className="relative w-full h-full">
            <div className="fixed top-[5%] left-[5%] z-50 w-[90%] pointer-events-none">
                <div className="flex flex-wrap items-center gap-2 ultrazone-text !text-lg md:!text-2xl !text-left pointer-events-auto">
                    <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
                        ULTRAZONE FACTORY
                    </Link>
                    <span className="text-gray-500">/</span>
                    <Link href="/gallery" className="cursor-pointer hover:opacity-80 transition-opacity">
                        GALLERY
                    </Link>
                </div>
            </div>
            {children}
        </div>
    );
}
