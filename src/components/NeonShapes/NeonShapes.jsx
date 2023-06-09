import { useRef } from 'react';
import { Color, Vector2 } from 'three';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

import PlaneMesh from '../PlaneMesh';
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

extend({
  NeonShapesShaderMaterial: shaderMaterial({ time: 0, resolution: new Vector2() }, vertexShader, fragmentShader),
});

function NeonShapesMaterial() {
  const { viewport, size } = useThree();
  const ref = useRef();
  useFrame((state, delta) => { ref.current.time += delta; });
  return <neonShapesShaderMaterial ref={ref} resolution={[size.width * viewport.dpr, size.height * viewport.dpr]} />;
}

export default function NeonShapes() {
  return (
    <Canvas>
      <PlaneMesh>
        <NeonShapesMaterial />
      </PlaneMesh>
    </Canvas>
  );
}
