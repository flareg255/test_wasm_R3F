"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useState, useEffect } from "react";
import ParticlesDisplay from "../components/ParticlesDisplay";
import WavingLines from "../components/WavingLines";
import UltraZoneText from "../components/UltraZoneText";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) return <main style={{ width: "100vw", height: "100vh", background: "#000" }} />;

  return (
    <main className="main-container relative">
      <div className="canvas-layer z-0">
        <Canvas
          shadows
          camera={{ position: [0, 2, 6], fov: 75 }}
          gl={{ antialias: false }}
        >
          <color attach="background" args={['#101010']} />
          <fog attach="fog" args={['#101010', 200, 2000]} />

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

      <div className="canvas-overlay">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ alpha: true }}
        >
          <UltraZoneText />
        </Canvas>
      </div>

    </main>
  );
}