"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// クリップ空間へ直接出力する頂点シェーダー。
// planeGeometry(2,2) の頂点(-1..1)をそのまま使うことで、
// カメラに追従しない「画面ロックの全画面背景」になる。
const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// オーロラ + 発光フォグ。fbm ノイズ + ドメインワープで連続した光の膜を描く。
const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec2 uResolution;
  uniform float uTime;

  float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; } return v; }

  void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 pp = uv; pp.x *= uResolution.x / uResolution.y;
    float t = uTime * 0.06;

    // 極暗の緑黒グラデ背景
    vec3 col = mix(vec3(0.020, 0.075, 0.058), vec3(0.010, 0.030, 0.032), uv.y);

    // 漂う発光フォグ
    float fog = fbm(pp * 1.4 + vec2(t * 0.4, -t * 0.25));
    fog = pow(fog, 1.8);
    col += vec3(0.05, 0.28, 0.17) * fog * 0.55;

    // オーロラの帳（3層）。縦の筋（rays）でカーテン状に。
    vec3 aur = vec3(0.0);
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float base = 0.34 + 0.19 * fi;
      float wob = (fbm(vec2(pp.x * 1.15 + fi * 7.0, t * 0.85 + fi)) - 0.5) * 0.55;
      float h = base + wob;
      float d = uv.y - h;
      float band = exp(-d * d * (58.0 - fi * 10.0));
      float rays = 0.5 + 0.5 * fbm(vec2(pp.x * 11.0 + fi * 20.0, t * 1.1 + uv.y * 1.5));
      rays = pow(rays, 1.5);
      float bright = band * rays * (0.75 + 0.35 * sin(t * 2.0 + fi * 1.7));
      vec3 c = mix(vec3(0.16, 1.0, 0.52), vec3(0.36, 0.9, 1.0), fi * 0.5);
      aur += c * bright;
    }
    col += aur * 1.25;

    // 床から立ち上る淡いヘイズ
    col += vec3(0.05, 0.30, 0.20) * smoothstep(0.0, 0.65, 1.0 - uv.y) * 0.14;

    // ビネット + トーンマップ
    vec2 vd = uv - 0.5;
    col *= 1.0 - dot(vd, vd) * 0.95;
    col = 1.0 - exp(-col * 1.7);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function AuroraBackground() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    // gl_FragCoord に合わせて描画バッファ解像度（CSSサイズ × dpr）を渡す
    const dpr = state.viewport.dpr;
    matRef.current.uniforms.uResolution.value.set(state.size.width * dpr, state.size.height * dpr);
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
