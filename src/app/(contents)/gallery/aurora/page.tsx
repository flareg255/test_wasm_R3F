"use client";

import { Canvas } from "@react-three/fiber";
import AuroraScene from "./_components/AuroraScene";

export default function AuroraPage() {
  return (
    <main className="aurora-main">
      <div className="aurora-title-container">
        <h2 className="text-4xl font-teko text-white tracking-widest">AURORA</h2>
      </div>

      <div className="aurora-canvas-container">
        <Canvas
          className="full-size-canvas"
          camera={{ position: [0, 2, 6], fov: 75 }}
          dpr={[1, 1.5]}
        >
          <AuroraScene />
        </Canvas>
      </div>
    </main>
  );
}
