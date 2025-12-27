"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useState, useEffect } from "react";
import ParticlesDisplay from "./ParticlesDisplay";
import WavingLines from "./WavingLines";

export default function TopMainScene() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => { setIsClient(true); }, []);

    if (!isClient) {
        return <div className="main-scene-placeholder" />;
    }

    return (
        <div className="main-scene-container">
            <Canvas
                shadows
                camera={{ position: [0, 2, 6], fov: 75 }}
                gl={{ antialias: false }}
            >
                <color attach="background" args={['#0a0a0a']} />
                <fogExp2 attach="fog" args={['#0a0a0a', 0.15]} />

                <ambientLight intensity={0.2} />

                <pointLight position={[10, 10, 10]} intensity={2.0} castShadow color="#00ffff" />
                <pointLight position={[-10, -5, -5]} intensity={1.0} color="#ff00ff" />

                <OrbitControls
                    makeDefault
                    minDistance={2}
                    maxDistance={12}
                    enableDamping
                />

                <WavingLines />
                <ParticlesDisplay />

                <EffectComposer>
                    <Bloom
                        intensity={2.5}
                        luminanceThreshold={0}
                        mipmapBlur
                        radius={0.7}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
