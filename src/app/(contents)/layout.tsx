"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const segments = pathname?.split('/').filter(Boolean) || [];
    const currentSection = segments[0] ? segments[0].toUpperCase() : '';

    return (
        <div className="relative w-full min-h-screen">
            <div className="fixed z-50 w-[90%] pointer-events-none top-[10px] left-[10px] md:top-[5%] md:left-[5%]">
                <div className="gallery-header-content">
                    <Link href="/" className="gallery-link">
                        ULTRAZONE FACTORY
                    </Link>
                    {currentSection && (
                        <>
                            <span className="mx-3 opacity-50">/</span>
                            <Link href={`/${segments[0]}`} className="gallery-link">
                                {currentSection}
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}
