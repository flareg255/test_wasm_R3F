"use client";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function Box(props: any) {
    const meshRef = useRef<Mesh>(null!);
    const [hovered, setHover] = useState(false);
    const [wasmModule, setWasmModule] = useState<any>(null);

    useEffect(() => {
        import("../../wasm-lib/pkg/wasm_lib").then(async (module) => {
            await module.default();
            setWasmModule(module);
        });
    }, []);

    useFrame((state, delta) => {
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
