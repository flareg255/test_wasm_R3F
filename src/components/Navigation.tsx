"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    return (
        <>
            <button
                className={styles.toggleButton}
                onClick={toggleOpen}
                data-open={isOpen}
                aria-label="Toggle Menu"
            >
                <div className={styles.line} />
                <div className={styles.line} />
            </button>

            <div
                className={styles.backdrop}
                data-open={isOpen}
                onClick={close}
            />

            <aside className={styles.drawer} data-open={isOpen}>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.link} onClick={close}>
                        HOME
                    </Link>
                    <Link href="/about" className={styles.link} onClick={close}>
                        ABOUT
                    </Link>
                    <Link href="/gallery" className={styles.link} onClick={close}>
                        GALLERY
                    </Link>
                </nav>
            </aside>
        </>
    );
}
