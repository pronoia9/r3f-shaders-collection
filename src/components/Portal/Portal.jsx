import { useRef } from 'react';
import { Color } from 'three';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

import PlaneMesh from '../PlaneMesh';
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

extend({
  PortalMaterial: shaderMaterial({ uTime: 0, uColorStart: new Color('#ffffff'), uColorEnd: new Color('#000000') }, vertexShader, fragmentShader),
});

export default function Portal() {
  const { viewport } = useThree();
  const portalMaterialRef = useRef();

  useFrame((state, delta) => {
    portalMaterialRef.current.uTime += delta;
  });

  return (
    <Canvas>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <portalMaterial ref={portalMaterialRef} />
        {children}
      </mesh>
    </Canvas>
  );
}
