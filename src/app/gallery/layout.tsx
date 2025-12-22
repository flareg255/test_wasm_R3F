
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
        return null;
    }

    return (
        <div className="relative w-full h-full">
            <div className="gallery-header-container">
                <div className="gallery-header-content">
                    <Link href="/" className="gallery-link">
                        ULTRAZONE FACTORY
                    </Link>
                    <span className="gallery-separator">/</span>
                    <Link href="/gallery" className="gallery-link">
                        GALLERY
                    </Link>
                </div>
            </div>
            {children}
        </div>
    );
}
