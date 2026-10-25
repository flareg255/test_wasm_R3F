"use client";
import { useRef, useState, useEffect } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { Mesh } from "three";
import { initWasm, type WasmModule } from "@/src/utils/wasm";

export default function Box(props: ThreeElements["mesh"]) {
    const meshRef = useRef<Mesh>(null!);
    const [hovered, setHover] = useState(false);
    const [wasmModule, setWasmModule] = useState<WasmModule | null>(null);

    useEffect(() => {
        initWasm().then((module) => {
            setWasmModule(module);
        });
    }, []);

    useFrame((state) => {
        if (wasmModule && typeof wasmModule.calculate_rotation === "function") {
            try {
                const rotation = wasmModule.calculate_rotation(state.clock.elapsedTime);
                meshRef.current.rotation.x = rotation;
                meshRef.current.rotation.y = rotation;
            } catch (e) {
                console.error("WASM実行エラー:", e);
            }
        }
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
        </mesh>
    );
}
