import { useRef } from 'react';
import { Color } from 'three';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

import PlaneMesh from '../PlaneMesh';
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

extend({
  PortalV2ShaderMaterial: shaderMaterial(
    { time: 0, colorStart: new Color('hotpink'), colorEnd: new Color('white') },
    vertexShader,
    fragmentShader
  ),
});

export function PortalV2Material() {
  const ref = useRef();
  useFrame((state, delta) => { ref.current.time += delta; });
  return <portalV2ShaderMaterial ref={ref} />;
}

export default function PortalV2() {
  return (
    <Canvas>
      <PlaneMesh>
        <PortalV2Material />
      </PlaneMesh>
    </Canvas>
  );
}
