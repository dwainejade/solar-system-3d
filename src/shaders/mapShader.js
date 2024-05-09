import * as THREE from 'three';

export const earthMapShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D dayMap;
    uniform sampler2D nightMap;
    uniform vec3 sunDirection;
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      float intensity = dot(normalize(vNormal), sunDirection);
      vec4 dayColor = texture2D(dayMap, vUv);
      vec4 nightColor = texture2D(nightMap, vUv);
      vec4 color = mix(nightColor, dayColor, clamp(intensity * 1.0, 0.0, 1.0));
      gl_FragColor = color;
    }
  `,
  uniforms: {
    dayMap: { value: null },
    nightMap: { value: null },
    sunDirection: { value: new THREE.Vector3(1, 0, 0) },
  },
};
