import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import PlaneMesh from '../PlaneMesh';
import { WaveMaterial } from './WaveMaterial';

export default function PortalV2() {
  return (
    <Canvas dpr={[1, 2]}>
      <PortalV2Shader />
    </Canvas>
  );
}

function PortalV2Shader() {
  const ref = useRef();
  useFrame((state, delta) => (ref.current.time += delta));

  return (
    <PlaneMesh>
      <waveMaterial ref={ref} key={WaveMaterial.key} colorStart='pink' colorEnd='white' />
    </PlaneMesh>
  );
}
