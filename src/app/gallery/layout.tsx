
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
                <Link href="/gallery">
                    <h1 className="ultrazone-text !text-2xl !text-left !pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity">
                        GALLERY
                    </h1>
                </Link>
            </div>
            {children}
        </div>
    );
}
