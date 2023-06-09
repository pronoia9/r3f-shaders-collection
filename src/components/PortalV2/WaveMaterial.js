import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import guid from 'short-uuid';

import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

// This shader is from Bruno Simons Threejs-Journey: https://threejs-journey.xyz
class WaveMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
        colorStart: { value: new THREE.Color('hotpink') },
        colorEnd: { value: new THREE.Color('white') },
      },
      vertexShader,
      fragmentShader,
    });
  }
  set time(v) { this.uniforms.time.value = v }
  get time() { return this.uniforms.time.value }
  get colorStart() { return this.uniforms.colorStart.value }
  get colorEnd() { return this.uniforms.colorEnd.value }
}

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
WaveMaterial.key = guid.generate();
// Make the material available in JSX as <waveMaterial />
extend({ WaveMaterial });

export { WaveMaterial };
