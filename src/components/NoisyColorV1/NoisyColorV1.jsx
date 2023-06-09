import { useRef } from 'react';
import { Color } from 'three';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

import PlaneMesh from '../PlaneMesh';
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

const colors = ['', '#225ee1', '#28d7bf', '#dd3333', '#e7a39c']; // OG
// const colors = ['', '#225ee1', '#28d7bf', '#ac53cf', '#e7a39c']; // purple and blue

extend({
  NoisyColorV1ShaderMaterial: shaderMaterial(
    {
      uResolution: [window.innerWidth, window.innerHeight],
      uTime: 0,
      uLowGpu: false,
      uVeryLowGpu: false,
      uSpeedColor: 20.0,
      uColor1: new Color(colors[1]),
      uColor2: new Color(colors[2]),
      uColor3: new Color(colors[3]),
      uColor4: new Color(colors[4]),
    },
    vertexShader,
    fragmentShader
  ),
});

export function NoisyColorV1Material() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.uTime += delta; // 0.05
  });
  return <noisyColorV1ShaderMaterial ref={ref} />;
}

export default function NoisyColorV1() {
  return (
    <Canvas>
      <color args={['#31AFD4']} attach='background' />
      <PlaneMesh>
        <NoisyColorV1Material />
      </PlaneMesh>
    </Canvas>
  );
}
