"use client";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import AuroraBackground from "./AuroraBackground";
import ParticlesDisplay from "@/src/components/ParticlesDisplay";

// オーロラのシーン:
// 画面ロックのオーロラ背景 + トップページ準拠の粒子雲 + Bloom。
export default function AuroraScene() {
  return (
    <>
      <AuroraBackground />
      <ParticlesDisplay />

      <OrbitControls
        makeDefault
        enableDamping
        enablePan={false}
        minDistance={3}
        maxDistance={12}
      />

      <EffectComposer>
        {/* しきい値を上げ、明るい粒子の芯だけを光らせる（オーロラはにじませない） */}
        <Bloom intensity={1.1} luminanceThreshold={0.75} radius={0.45} mipmapBlur />
      </EffectComposer>
    </>
  );
}
