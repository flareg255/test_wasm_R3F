import { useMemo } from 'react';
import * as THREE from 'three';

interface ParticleTextureProps {
    centerColor?: string;
    midColor?: string;
}

export const useParticleTexture = ({
    centerColor = 'rgba(255,255,255,1)',
    midColor = 'rgba(0,242,255,1)',
}: ParticleTextureProps = {}) => {
    return useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        if (!ctx) return new THREE.Texture(); // Fallback if context creation fails (SSR etc)

        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, centerColor);
        gradient.addColorStop(0.2, midColor);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(canvas);
    }, [centerColor, midColor]);
};
