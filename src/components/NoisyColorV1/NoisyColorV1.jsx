import { useRef } from 'react';
import { Color } from 'three';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

import PlaneMesh from '../PlaneMesh';
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

extend({
  NoisyColorV1ShaderMaterial: shaderMaterial(
    {
      uResolution: [window.innerWidth, window.innerHeight],
      uTime: 0,
      uLowGpu: false,
      uVeryLowGpu: false,
      uSpeedColor: 20.0,
      uColor1: new Color('#225ee1'),
      uColor2: new Color('#28d7bf'),
      uColor3: new Color('#dd3333'),
      uColor4: new Color('#e7a39c'),
    },
    vertexShader,
    fragmentShader
  ),
});

export function NoisyColorV1Material() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.uTime += delta;
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
