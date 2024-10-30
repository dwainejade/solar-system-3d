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
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  uniforms: {
    time: { value: 0 },
    glowColor: { value: new THREE.Color(0xffaa00) }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec2 vUv;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    uniform float time;
    varying vec3 vNormal;
    varying vec2 vUv;
    
    float rand(vec2 n) {
      return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }
    
    float noise(vec2 p) {
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u * u * (3.0 - 2.0 * u);
      
      float res = mix(
        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
      return res * res;
    }
    
    void main() {
      float distanceFromCenter = length(vUv - vec2(0.5));
      
      // Basic fresnel effect
      vec3 viewDirection = normalize(cameraPosition);
      float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);
      
      // Animated noise
      vec2 uv = vUv * 8.0;
      float noiseVal = noise(uv + time * 0.2);
      
      // Combine effects
      float glow = (1.0 - distanceFromCenter) * fresnel;
      glow = pow(glow, 1.5) + noiseVal * 0.1;
      
      // Pulsing
      float pulse = sin(time) * 0.1 + 0.9;
      glow *= pulse;
      
      // Color gradient
      vec3 innerColor = vec3(1.0, 0.8, 0.2);
      vec3 outerColor = glowColor;
      vec3 finalColor = mix(innerColor, outerColor, fresnel);
      
      gl_FragColor = vec4(finalColor, glow);
    }
  `
};
