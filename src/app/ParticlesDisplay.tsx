"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { initWasm } from "../utils/wasm";


export default function ParticlesDisplay() {
    const pointsRef = useRef<THREE.Points>(null!);
    const [engine, setEngine] = useState<any>(null);
    const count = 100;

    const particleTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d')!;
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0,242,255,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(canvas);
    }, []);

    useEffect(() => {
        let active = true;

        initWasm().then((mod) => {
            if (active) {
                setEngine(new mod.PhysicsEngine(count));
            }
        });


        return () => {
            active = false;
            setEngine(null);

        };
    }, [count]);

    useFrame(() => {
        if (!engine || !pointsRef.current) return;

        try {
            engine.update();
        } catch (e) {
            console.error(e);
            setEngine(null);
            return;
        }

        const attrPos = pointsRef.current.geometry.attributes.position;
        const attrSize = pointsRef.current.geometry.attributes.size;
        const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;

        const positions = attrPos.array as Float32Array;
        const sizes = attrSize.array as Float32Array;

        const data = engine.get_all_particles();


        for (let i = 0; i < count; i++) {
            const baseIdx = i * 8;


            positions[i * 3 + 0] = data[baseIdx + 0];
            positions[i * 3 + 1] = data[baseIdx + 1];
            positions[i * 3 + 2] = data[baseIdx + 2];

            const phase = data[baseIdx + 6];
            const b = Math.sin(phase) * 0.4 + 0.6;


            sizes[i] = 0.8 * b;

            colors[i * 3 + 0] = 0.2 * b;
            colors[i * 3 + 1] = 0.8;
            colors[i * 3 + 2] = 1.0;
        }

        attrPos.needsUpdate = true;
        attrSize.needsUpdate = true;

        pointsRef.current.geometry.attributes.color.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={new Float32Array(count * 3)}
                    itemSize={3}
                    args={[new Float32Array(count * 3), 3]}
                />

                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={new Float32Array(count)}
                    itemSize={1}
                    args={[new Float32Array(count), 1]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={new Float32Array(count * 3)}
                    itemSize={3}
                    args={[new Float32Array(count * 3), 3]}
                />
            </bufferGeometry>

            <pointsMaterial
                vertexColors={true}
                map={particleTexture}
                transparent={true}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                sizeAttenuation={true}
                toneMapped={false}
                onBeforeCompile={(shader) => {
                    shader.vertexShader = shader.vertexShader.replace(
                        'uniform float size;',
                        'attribute float size;'
                    );
                }}
            />
        </points>
    );
}
