"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import with no SSR because LiquidEther might depend on window/document directly
const LiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false });

export default function LiquidEtherWrapper() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#000', width: '100%', height: '100%' }} />}>
      <LiquidEther
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
    </Suspense>
  );
}
