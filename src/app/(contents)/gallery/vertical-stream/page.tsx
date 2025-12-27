"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import VerticalParticles from "./_components/VerticalParticles";

export default function VerticalStreamPage() {
    return (
        <main className="vertical-stream-main">
            <div className="vertical-stream-title-container">
                <h2 className="text-4xl font-teko text-white tracking-widest">VERTICAL STREAM</h2>
            </div>

            <div className="vertical-stream-canvas-container">
                <Canvas
                    camera={{ position: [0, 0, 15], fov: 60 }}
                    className="full-size-canvas"
                >
                    <color attach="background" args={['#0a0a0a']} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

                    <VerticalParticles radius={10.0} />

                    <OrbitControls
                        enableZoom={true}
                        minDistance={5}
                        maxDistance={20}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
            </div>
        </main>
    );
}
