import { useRef } from 'react';
import { Color } from 'three';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

import PlaneMesh from '../PlaneMesh';
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

extend({
  PortalMaterial: shaderMaterial({ uTime: 0, uColorStart: new Color('#ffffff'), uColorEnd: new Color('#000000') }, vertexShader, fragmentShader),
});

export function PortalMaterial() {
  const portalMaterialRef = useRef();
  useFrame((state, delta) => { portalMaterialRef.current.uTime += delta; });
  return <portalMaterial ref={portalMaterialRef} />;
}

export default function Portal() {
  return (
    <Canvas>
      <PlaneMesh>
        <PortalMaterial />
      </PlaneMesh>
    </Canvas>
  );
}