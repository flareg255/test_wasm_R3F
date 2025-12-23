import type { Metadata } from 'next';
import UltraZoneText from "../components/UltraZoneText";
import TopMainScene from "../components/TopMainScene";

export const metadata: Metadata = {
    alternates: {
        canonical: '/',
    },
};

export default function Home() {
    return (
        <main className="main-container relative min-h-screen overflow-hidden">
            <TopMainScene />

            <UltraZoneText />
        </main>
    );
}