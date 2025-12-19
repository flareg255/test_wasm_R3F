"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useState, useEffect } from "react";
import ParticlesDisplay from "./ParticlesDisplay";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) return <main style={{ width: "100vw", height: "100vh", background: "#000" }} />;

  return (
    <main style={{
      width: "100vw",
      height: "100vh",
      margin: 0,
      padding: 0,
      overflow: "hidden",
      background: "#000"
    }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 6], fov: 75 }}
        gl={{ antialias: false }}
      >

        <OrbitControls
          makeDefault
          autoRotate
          autoRotateSpeed={0.5}
          minDistance={2}
          maxDistance={12}
          enableDamping
        />

        <Environment preset="city" />

        <ParticlesDisplay />

        <EffectComposer>
          <Bloom
            intensity={2.5}
            luminanceThreshold={0}
            mipmapBlur
            radius={0.7}
          />
        </EffectComposer>

        {/* 空間のガイド枠 */}
        {/* <mesh>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.1} />
        </mesh> */}
      </Canvas>
    </main>
  );
}