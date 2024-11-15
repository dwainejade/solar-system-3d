// shaders/sun/lava.js
export const lavaShader = {
  uniforms: {
    time: { value: 0.0 },
    baseTexture: { value: null },
    lavaColor1: { value: [0.9, 0.1, 0.0] },
    lavaColor2: { value: [0.5, 0.0, 0.0] },
    glowColor: { value: [1.0, 0.4, 0.0] }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform float time;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // Create simple displacement
      float displacement = sin(position.x * 10.0 + time) * 
                         sin(position.y * 10.0 + time) * 
                         sin(position.z * 10.0 + time) * 0.05;
      
      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform sampler2D baseTexture;
    uniform vec3 lavaColor1;
    uniform vec3 lavaColor2;
    uniform vec3 glowColor;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
      // Create flowing lava effect with simplified noise
      vec2 flowUv = vUv + vec2(time * 0.1);
      float pattern = sin(flowUv.x * 10.0 + time) * 
                     sin(flowUv.y * 10.0 + time * 0.5);
      
      // Mix colors based on pattern
      vec3 color = mix(
        vec3(lavaColor1),
        vec3(lavaColor2),
        smoothstep(-1.0, 1.0, pattern)
      );
      
      // Add glow effect
      float glow = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
      color += vec3(glowColor) * glow;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};