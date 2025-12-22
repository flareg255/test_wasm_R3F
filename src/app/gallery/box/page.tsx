"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Box from "./Box";
import Link from "next/link";

export default function BoxPage() {
    return (
        <main className="main-container relative bg-black">


            <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none z-10">
                <h1 className="text-4xl font-teko text-white tracking-widest">WASM ROTATION CUBE</h1>
            </div>

            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <Box position={[0, 0, 0]} />

                <OrbitControls />
            </Canvas>
        </main>
    );
}
