"use client";
import { Html } from "@react-three/drei";

export default function UltraZoneText() {
    return (
        <Html
            position={[0, 1.5, 0]}
            center
            distanceFactor={10}
        >
            <div className="ultrazone-text">
                ULTRAZONE<br />FACTORY
            </div>
        </Html>
    );
}
