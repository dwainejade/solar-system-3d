import React, { useRef, useMemo } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

const SaturnRings = ({ saturnRef, scaledRadius }) => {
  const texture = useLoader(TextureLoader, "../assets/saturn/saturn-rings-top.png");
  const innerRadius = scaledRadius * 1.2;
  const outerRadius = scaledRadius * 1.4;

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: texture },
        innerRadius: { value: innerRadius },
        outerRadius: { value: outerRadius },
      },
      vertexShader: `
        varying vec3 vPos;
        
        void main() {
          vPos = position;
          vec3 viewPosition = (modelViewMatrix * vec4(position, 1.)).xyz;
          gl_Position = projectionMatrix * vec4(viewPosition, 1.);
        }
      `,
      fragmentShader: `
      uniform sampler2D u_texture;
      uniform float innerRadius;
      uniform float outerRadius;
      
      varying vec3 vPos;
      
      void main() {
        float distance = length(vPos.xy);
        float alpha = smoothstep(innerRadius, outerRadius, distance);
        vec2 uv = vec2((distance - innerRadius) / (outerRadius - innerRadius), 0.5);
      
        vec4 texColor = texture(u_texture, uv);
      
        gl_FragColor = vec4(texColor.rgb, texColor.a );
      }
      `,
    });
  }, [innerRadius, outerRadius, texture]);

  const ringGeometry = useMemo(() => {
    return new THREE.RingGeometry(innerRadius, outerRadius, 64);
  }, [innerRadius, outerRadius]);

  const ringRef = useRef();

  useFrame(() => {
    if (saturnRef.current && ringRef.current) {
      ringRef.current.position.copy(saturnRef.current.position);
      ringRef.current.rotation.x = Math.PI / 2;
    }
  });

  return <mesh ref={ringRef} geometry={ringGeometry} material={shaderMaterial} />;
};

export default SaturnRings;
