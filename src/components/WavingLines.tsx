"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { initWasm } from "../utils/wasm";
import { useWasmEngine } from "../hooks/useWasmEngine";


const SingleLine = ({

    id,
    engine,
    color,
    width,
    thickness,
    segments,
    intensity
}: {
    id: number;
    engine: any;
    color: string;
    width: number;
    thickness: number;
    segments: number;
    intensity: number;
}) => {

    const meshRef = useRef<THREE.Mesh>(null!);

    const { geometry, vertexMap, initialPositions } = useMemo(() => {

        const radius = thickness / 2;
        const radialSegments = 8;
        const geo = new THREE.CylinderGeometry(radius, radius, width, radialSegments, segments);

        geo.rotateZ(Math.PI / 2);


        const pos = geo.attributes.position.array as Float32Array;

        const initialPositions = new Float32Array(pos);
        const vertexMap = new Int16Array(pos.length / 3);


        for (let i = 0; i < pos.length / 3; i++) {
            const x = pos[i * 3 + 0];

            const normalized = (x + width / 2) / width;

            let segIndex = Math.round(normalized * segments);

            if (segIndex < 0) segIndex = 0;
            if (segIndex > segments) segIndex = segments;

            vertexMap[i] = segIndex;
        }

        return { geometry: geo, vertexMap, initialPositions };
    }, [width, thickness, segments]);

    useEffect(() => {
        return () => {
            geometry.dispose();
        };
    }, [geometry]);


    useFrame(() => {
        if (!meshRef.current || !engine) return;

        const geometry = meshRef.current.geometry;
        const positions = geometry.attributes.position.array as Float32Array;



        const wavePtr = engine.get_wave_values(id);

        const memory = (window as any).wasmMemory;


        if (!memory) return;

        const rustWaveData = new Float32Array(memory.buffer, wavePtr, segments + 1);

        const zOffset = engine.get_z_offset(id);

        for (let i = 0; i < positions.length / 3; i++) {
            const segIndex = vertexMap[i];
            const waveY = rustWaveData[segIndex];

            positions[i * 3 + 1] = waveY + initialPositions[i * 3 + 1];

            positions[i * 3 + 2] = initialPositions[i * 3 + 2] + zOffset;
        }

        geometry.attributes.position.needsUpdate = true;
    });

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={intensity}
                toneMapped={false}
                transparent
                opacity={1.0}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />

        </mesh>
    );

};

export default function WavingLines() {
    const lineCount = 15;
    const segments = 100;
    const width = 25;

    const engine = useWasmEngine(
        (mod) => new mod.WaveLineEngine(lineCount, segments, width),
        [lineCount, segments, width]
    );

    useFrame((state) => {
        if (engine) {
            engine.update(state.clock.getElapsedTime());
        }
    });

    const lines = useMemo(() => {
        return new Array(lineCount).fill(0).map((_, i) => ({
            id: i,
            color: ["#00ffff", "#ff00ff", "#00ff88"][Math.floor(Math.random() * 3)],
            thickness: Math.random() * 0.05 + 0.01,
            intensity: Math.random() * 0.8 + 0.2,
        }));


    }, [lineCount]);

    if (!engine) return null;

    return (
        <group>
            {lines.map((props) => (
                <SingleLine
                    key={props.id}
                    {...props}
                    engine={engine}
                    width={width}

                    segments={segments}
                />
            ))}
        </group>
    );
}
