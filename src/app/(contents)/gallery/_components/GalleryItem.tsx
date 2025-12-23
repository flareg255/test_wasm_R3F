import Link from "next/link";

interface GalleryItemProps {
    href: string;
    title: string;
    description: string;
}

export default function GalleryItem({ href, title, description }: GalleryItemProps) {
    return (
        <Link href={href} className="group block">
            <div className="border border-white/20 p-6 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <h2 className="text-2xl font-teko text-cyan-400 mb-2 group-hover:text-white transition-colors">
                    {title}
                </h2>
                <p className="text-gray-400 font-inter text-sm group-hover:text-gray-200">
                    {description}
                </p>
            </div>
        </Link>
    );
}
