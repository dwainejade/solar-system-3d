import React, { useState, useRef } from "react";
import { usePlanetStore } from "../store/store";
import { sizeScaleFactor } from "../data/planetsData";
import { useFrame } from "@react-three/fiber";
// import { Html } from "@react-three/drei";
import { sunOuterShader } from "../shaders/atmosphere";


const Sun = ({ position, resetCamera, textures }) => {
  const [isDragging, setIsDragging] = useState(false);
  const initialClickPosition = useRef({ x: 0, y: 0 });
  const { selectedPlanet, setSelectedPlanet, displayLabels, planetsData } = usePlanetStore();
  const sunRadius = planetsData["Sun"].radius * sizeScaleFactor

  // Modify the handleClick to account for dragging
  const handleClick = e => {
    e.stopPropagation();
    if (!isDragging) {
      // Your original click handling logic
      // This now only triggers if the mesh wasn't dragged
      if (selectedPlanet && selectedPlanet.name === "Sun") {
        setSelectedPlanet(null);
        resetCamera();
      } else {
        setSelectedPlanet(planetsData.Sun);
      }
    }
  };

  // New handler for pointer down
  const handlePointerDown = e => {
    e.stopPropagation();
    setIsDragging(false); // Reset dragging state
    initialClickPosition.current = { x: e.clientX, y: e.clientY }; // Record initial click position
  };

  // New handler for pointer move
  const handlePointerMove = e => {
    const distanceMoved = Math.sqrt(
      Math.pow(e.clientX - initialClickPosition.current.x, 2) + Math.pow(e.clientY - initialClickPosition.current.y, 2)
    );
    if (distanceMoved > 5) {
      setIsDragging(true);
    }
  };

  const handlePointerUp = e => {
    setIsDragging(false);
  };

  const handlePointerOver = e => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
  };

  // scale planet size based on distance. Also use to toggle textures on/off
  const localRef = useRef()
  const [scale, setScale] = useState(sunRadius);
  const [shaderScale, setShaderScale] = useState(sunRadius * 1.08);
  useFrame(({ camera }) => {
    const distance = localRef.current.position.distanceTo(camera.position);
    if (distance / 100 <= sunRadius) {
      setScale(sunRadius);
    } else {
      setScale(distance / 100);
    }
  });

  return (
    <group>
      <mesh
        ref={localRef}
        position={position}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[scale, 32, 32]} />
        {textures ? (
          <meshBasicMaterial map={textures.map} color={[10, 3, 0]} toneMapped={false} zIndexRange={[100 - 1]} />
        ) : (
          <meshBasicMaterial color={[10, 4, 0]} toneMapped={false} />
        )}
      </mesh>
      <mesh key={`${name}-atmosphere`}>
        <sphereGeometry args={[shaderScale, 32, 32]} />
        <shaderMaterial args={[sunOuterShader]} />
      </mesh>
    </group>
  );
};

export default Sun;
