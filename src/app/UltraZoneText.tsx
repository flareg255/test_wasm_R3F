"use client";
import { Html } from "@react-three/drei";

export default function UltraZoneText() {
    return (
        <Html
            position={[0, 1.5, 0]}
            center
            distanceFactor={10} // Optional: makes it scale with distance if desired
        >
            <div style={{
                color: "white",
                fontSize: "4rem",
                fontWeight: "100",
                textAlign: "center",
                letterSpacing: "0.2em",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-orbitron), var(--font-teko), var(--font-inter), sans-serif",
                pointerEvents: "none",
                userSelect: "none",
                textShadow: "0 0 10px rgba(0,0,0,0.5)" // Subtle shadow for readability if needed
            }}>
                ULTRAZONE<br />FACTORY
            </div>
        </Html>
    );
}
