"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
attribute float aScale;
attribute float aLineIndex;
varying vec3 vColor;
varying float vAlpha;

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    vec3 pos = position;
    
    float width = 400.0;
    float speed = 10.0;
    
    pos.x = mod(pos.x + uTime * speed + width * 0.5, width) - width * 0.5;
    
    float alpha = smoothstep(-width * 0.5, -width * 0.5 + 50.0, pos.x);
    alpha *= (1.0 - smoothstep(width * 0.5 - 50.0, width * 0.5, pos.x));
    vAlpha = alpha;
    
    float noiseVal = snoise(vec3(pos.x * 0.003, aLineIndex * 100.0, uTime * 0.1));
    float noiseVal2 = snoise(vec3(pos.x * 0.01, aLineIndex * 50.0, uTime * 0.15));
    
    float displacement = noiseVal * 40.0 + noiseVal2 * 20.0;
    
    pos.y += displacement + (aLineIndex - 0.5) * 50.0;
    
    float noiseZ = snoise(vec3(pos.x * 0.005, aLineIndex * 30.0, uTime * 0.05));
    float noiseX = snoise(vec3(pos.z * 0.005, aLineIndex * 30.0, uTime * 0.05 + 10.0));
    
    pos.z += noiseZ * 20.0;
    pos.x += noiseX * 10.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    gl_PointSize = aScale * (300.0 / -mvPosition.z) * 1.5;
    
    float t = noiseVal * 0.5 + 0.5;
    
    vec3 colorDeep = vec3(0.0, 0.1, 0.4);
    vec3 colorMid = vec3(0.0, 0.8, 0.8);
    vec3 colorHigh = vec3(0.2, 1.0, 0.6);
    
    vec3 finalColor = mix(colorDeep, colorMid, t);
    finalColor = mix(finalColor, colorHigh, smoothstep(0.6, 1.0, t));
    
    finalColor = mix(finalColor, vec3(1.0), smoothstep(0.8, 1.0, t + noiseVal2 * 0.3));

    vColor = finalColor;
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    float glow = 1.0 - (r * 2.0);
    glow = pow(glow, 2.0);
    
    gl_FragColor = vec4(vColor, glow * 0.8 * vAlpha);
}
`;

export default function LightWave() {
    const pointsRef = useRef<THREE.Points>(null!);

    const numLines = 30;
    const particlesPerLine = 200;
    const count = numLines * particlesPerLine;

    const [positions, scales, lineIndices] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const lineIndices = new Float32Array(count);

        const width = 400;
        const depth = 300;
        const tubeRadius = 2.0;

        for (let l = 0; l < numLines; l++) {
            const lineNorm = l / numLines;
            const zBase = (lineNorm - 0.5) * depth;

            for (let i = 0; i < particlesPerLine; i++) {
                const idx = (l * particlesPerLine + i);
                const i3 = idx * 3;

                positions[i3] = (Math.random() - 0.5) * width;

                const phi = Math.random() * Math.PI * 2.0;
                const r = Math.random() * tubeRadius;

                positions[i3 + 1] = Math.sin(phi) * r;
                positions[i3 + 2] = zBase + Math.cos(phi) * r;

                scales[idx] = Math.random() * 2.0 + 0.5;
                lineIndices[idx] = lineNorm;
            }
        }

        return [positions, scales, lineIndices];
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 }
    }), []);

    useFrame((state) => {
        if (pointsRef.current) {
            (pointsRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={count}
                    array={scales}
                    itemSize={1}
                    args={[scales, 1]}
                />
                <bufferAttribute
                    attach="attributes-aLineIndex"
                    count={count}
                    array={lineIndices}
                    itemSize={1}
                    args={[lineIndices, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
