import { useRef } from 'react';
import { Color } from 'three';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

import PlaneMesh from '../PlaneMesh';
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

// const colors = ['', '#225ee1', '#28d7bf', '#ac53cf', '#e7a39c']; // OG
// const colors = ['', '#4d8be9', '#6ce4d6', '#d485e4', '#f2c5ba']; // OG Lighter
// const colors = ['', '#78a4f5', '#8df2e6', '#eaa0f0', '#f9d8ca']; // OG Even Lights
const colors = ['', '#225ee1', '#28d7bf', '#dd3333', '#e7a39c']; // V1

extend({
  NoisyColorV2ShaderMaterial: shaderMaterial(
    {
      uResolution: [window.innerWidth, window.innerHeight],
      uTime: 0,
      uColor1: new Color(colors[2]),
      uColor2: new Color(colors[4]),
      uColor3: new Color(colors[1]),
      uColor4: new Color(colors[3]),
    },
    vertexShader,
    fragmentShader
  ),
});

export function NoisyColorV2Material() {
  const ref = useRef();
  useFrame((state, delta) => { ref.current.uTime += delta * 5; });
  return <noisyColorV2ShaderMaterial ref={ref} />;
}

export default function NoisyColorV2() {
  return (
    <Canvas>
      <color args={['#31AFD4']} attach='background' />
      <PlaneMesh>
        <NoisyColorV2Material />
      </PlaneMesh>
    </Canvas>
  );
}
