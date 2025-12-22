
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
            <div className="fixed top-8 left-8 z-50">
                <div className="flex items-center gap-2 ultrazone-text !text-2xl !text-left !pointer-events-auto">
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
