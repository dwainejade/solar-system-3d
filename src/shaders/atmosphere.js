import * as THREE from 'three';

export const earthAtmosphereShader = {
  vertexShader: `
        varying vec3 vertexNormal;

        void main() {
            vertexNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
  fragmentShader: `
        varying vec3 vertexNormal;

        void main() {
            float intensity = pow(0.05 - dot(vertexNormal, vec3(0, 0, 1)), 2.0);
            gl_FragColor = vec4(0, 0.7, 1, 0.5) * intensity; // Atmospheric color
        }
    `,
  uniforms: {
    // Define any uniforms here if needed
  },
};


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
      vec4 color = mix(nightColor, dayColor, clamp(intensity * 2.0, 0.0, 1.0));
      gl_FragColor = color;
    }
  `,
  uniforms: {
    dayMap: { value: null },
    nightMap: { value: null },
    sunDirection: { value: new THREE.Vector3(1, 0, 0) },
  },
};


export const sunOuterShader = {
  vertexShader: `
        varying vec3 vertexNormal;

        void main() {
            vertexNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
  fragmentShader: `
        varying vec3 vertexNormal;

        void main() {
            float intensity = pow(0.05 - dot(vertexNormal, vec3(0, 0, 1)), 2.0);
            gl_FragColor = vec4(1, 0.7, 0, 0.5) * intensity; // Atmospheric color
        }
    `,
  uniforms: {
    // Define any uniforms here if needed
  },
};
