"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { initWasm } from "@/src/utils/wasm";
import { useParticleTexture } from "@/src/hooks/useParticleTexture";
import { useWasmEngine } from "@/src/hooks/useWasmEngine";

export default function VerticalParticles() {
    const pointsRef = useRef<THREE.Points>(null!);

    const count = 1000;

    const particleTexture = useParticleTexture();

    const engine = useWasmEngine((mod) => new mod.VerticalStreamEngine(count), []);

    useFrame(() => {
        if (!engine || !pointsRef.current) return;

        engine.update();

        const attrPos = pointsRef.current.geometry.attributes.position;
        const attrSize = pointsRef.current.geometry.attributes.size;
        const attrColor = pointsRef.current.geometry.attributes.color;

        const positions = attrPos.array as Float32Array;
        const sizes = attrSize.array as Float32Array;
        const colors = attrColor.array as Float32Array;

        const data = engine.get_all_particles();

        for (let i = 0; i < count; i++) {
            const baseIdx = i * 8;

            positions[i * 3 + 0] = data[baseIdx + 0];
            positions[i * 3 + 1] = data[baseIdx + 1];
            positions[i * 3 + 2] = data[baseIdx + 2];

            const phase = data[baseIdx + 6];
            const pulse = Math.sin(phase) * 0.3 + 0.7;

            sizes[i] = 1.0 * pulse;

            // Cyan ~ Blue gradient based on pulse or height could be cool
            // For now, fixed cyan-ish color varying with pulse
            colors[i * 3 + 0] = 0.2 * pulse; // R
            colors[i * 3 + 1] = 0.8; // G
            colors[i * 3 + 2] = 1.0;         // B
        }

        attrPos.needsUpdate = true;
        attrSize.needsUpdate = true;
        attrColor.needsUpdate = true;
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
