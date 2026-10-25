"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useParticleTexture } from "../hooks/useParticleTexture";
import { useWasmEngine } from "../hooks/useWasmEngine";


export default function ParticlesDisplay() {
    const pointsRef = useRef<THREE.Points>(null!);
    const count = 100;
    const particleTexture = useParticleTexture();
    const engine = useWasmEngine((mod) => new mod.PhysicsEngine(count), [count]);

    useFrame(() => {
        if (!engine || !pointsRef.current) return;

        engine.update();

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
