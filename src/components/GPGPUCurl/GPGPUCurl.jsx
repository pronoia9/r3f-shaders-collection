import { useMemo, useState, useRef } from 'react';
import * as THREE from 'three';
import { createPortal, useFrame } from '@react-three/fiber';
import { CameraShake, useFBO } from '@react-three/drei';
import { useControls } from 'leva';

// SHADERS/MATERIALS
import './dofPointsMaterial';
import './simulationMaterial';

const Particles = ({ speed, fov, aperture, focus, curl, size = 512, ...props }) => {
  // REFS
  const simRef = useRef(),
    renderRef = useRef();
  // SET UP FBO
  const [scene] = useState(() => new THREE.Scene());
  const [camera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1));
  const [positions] = useState(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]));
  const [uvs] = useState(() => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]));
  const target = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });
  // NORMALIZE POINTS
  const particles = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);

  // UPDATE FBO AND POINTCLOUD EVERY FRAME
  useFrame((state) => {
    state.gl.setRenderTarget(target);
    state.gl.clear();
    state.gl.render(scene, camera);
    state.gl.setRenderTarget(null);
    renderRef.current.uniforms.positions.value = target.texture;
    renderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    renderRef.current.uniforms.uFocus.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uFocus.value, focus, 0.1);
    renderRef.current.uniforms.uFov.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uFov.value, fov, 0.1);
    renderRef.current.uniforms.uBlur.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uBlur.value, (5.6 - aperture) * 9, 0.1);
    simRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed;
    simRef.current.uniforms.uCurlFreq.value = THREE.MathUtils.lerp(simRef.current.uniforms.uCurlFreq.value, curl, 0.1);
  });

  return (
    <>
      {/* Simulation goes into a FBO/Off-buffer */}
      {createPortal(
        <mesh>
          <simulationMaterial ref={simRef} />
          <bufferGeometry>
            <bufferAttribute attach='attributes-position' count={positions.length / 3} array={positions} itemSize={3} />
            <bufferAttribute attach='attributes-uv' count={uvs.length / 2} array={uvs} itemSize={2} />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      {/* The result of which is forwarded into a pointcloud via data-texture */}
      <points {...props}>
        <dofPointsMaterial ref={renderRef} />
        <bufferGeometry>
          <bufferAttribute attach='attributes-position' count={particles.length / 3} array={particles} itemSize={3} />
        </bufferGeometry>
      </points>
    </>
  );
};

export default function GPGPUCurl() {
  const options = useControls({
    focus: { value: 5.4, min: 3, max: 7, step: 0.01 },
    speed: { value: 16.6, min: 0.1, max: 100, step: 0.1 },
    aperture: { value: 5.1, min: 1, max: 5.6, step: 0.1 },
    fov: { value: 0, min: 0, max: 200 },
    curl: { value: 0.5, min: 0.01, max: 0.5, step: 0.01 },
  });

  return (
    <>
      <CameraShake yawFrequency={1} maxYaw={0.05} pitchFrequency={1} maxPitch={0.05} rollFrequency={0.5} maxRoll={0.5} intensity={0.2} />
      <Particles {...options} />
    </>
  );
}
