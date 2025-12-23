"use client";
import UltraZoneText from "../components/UltraZoneText";



import TopMainScene from "../components/TopMainScene";

export default function Home() {
    return (
        <main className="main-container relative min-h-screen">
            <TopMainScene />

            <UltraZoneText />

            <div className="home-gallery-link-container">
                <a href="/gallery" className="home-gallery-link">
                    ENTER GALLERY →
                </a>
            </div>
        </main>
    );
}