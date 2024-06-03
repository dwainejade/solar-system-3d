

export const earthShaderMaterial = {
  uniforms: {
    dayTexture: { value: earthTextures.map },
    nightTexture: { value: earthTextures.night },
    lightDirection: { value: new THREE.Vector3() },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform vec3 lightDirection;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 lightDir = normalize(lightDirection);
      float dotProduct = dot(vNormal, lightDir);
      float blendFactor = clamp(dotProduct * 0.5 + 0.5, 0.0, 1.0);

      vec4 dayColor = texture2D(dayTexture, gl_PointCoord);
      vec4 nightColor = texture2D(nightTexture, gl_PointCoord);
      vec4 color = mix(nightColor, dayColor, blendFactor);

      gl_FragColor = color;
    }
  `,
};
