"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import LightWave from "./_components/LightWave";

export default function LightWavePage() {
    return (
        <main className="light-wave-main">
            <div className="light-wave-title-container">
                <h2 className="text-4xl font-teko text-white tracking-widest">LIGHT WAVE</h2>
            </div>

            <div className="light-wave-canvas-container">
                <Canvas
                    camera={{ position: [0, 10, 40], fov: 60 }}
                    className="full-size-canvas"
                >
                    <color attach="background" args={['#0a0a0a']} />

                    <LightWave />

                    <EffectComposer>
                        <Bloom
                            intensity={1.5}
                            luminanceThreshold={0.2}
                            mipmapBlur
                            radius={0.6}
                        />
                    </EffectComposer>

                    <OrbitControls
                        enableZoom={true}
                        minDistance={1}
                        maxDistance={100}
                    />
                </Canvas>
            </div>
        </main>
    );
}
