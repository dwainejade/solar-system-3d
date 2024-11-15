import * as THREE from "three";

const earthAtmosphereShader = {
    uniforms: {
        glowColor: { value: new THREE.Color(0x3388ff) },
        glowIntensity: { value: 0.6 }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float glowIntensity;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      
      void main() {
        float rim = 1.0 - max(dot(normalize(vViewPosition), vNormal), 0.0);
        rim = pow(rim, 3.0); // Increased power for sharper falloff
        gl_FragColor = vec4(glowColor, rim * glowIntensity);
      }
    `,
};

export { earthAtmosphereShader };