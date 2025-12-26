import Link from "next/link";

interface GalleryItemProps {
    href: string;
    title: string;
    description: string;
}

export default function GalleryItem({ href, title, description }: GalleryItemProps) {
    return (
        <Link href={href} className="gallery-item-link group">
            <div className="gallery-item-container">
                <h2 className="gallery-item-title">
                    {title}
                </h2>
                <p className="gallery-item-description">
                    {description}
                </p>
            </div>
        </Link>
    );
}
