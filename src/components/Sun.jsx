import React, { useState, useRef } from "react";
import useStore, { usePlanetStore, useCameraStore } from "../store/store";
import useExperimentsStore from "@/store/experiments";
import { sizeScaleFactor } from "../data/planetsData";
import { useFrame } from "@react-three/fiber";
import { sunOuterShader } from "../shaders/atmosphere";


const Sun = ({ position, textures }) => {
  const { selectedPlanet, setSelectedPlanet, planetsData } = usePlanetStore();
  const { toggleZoomingToSun, switchToSunCamera } = useCameraStore();
  const { experimentMode, toggleExperimentMode } = useExperimentsStore();
  const [isDragging, setIsDragging] = useState(false);
  const initialClickPosition = useRef({ x: 0, y: 0 });
  const { simSpeed } = useStore();
  const { radius, name, rotationPeriod } = planetsData.Sun
  const sunRadius = radius * sizeScaleFactor

  // Modify the handleClick to account for dragging
  const handleClick = e => {
    if (experimentMode) return
    e.stopPropagation();
    if (selectedPlanet?.name === name) {
      return
    }
    if (!isDragging) {
      setSelectedPlanet(planetsData.Sun);
      switchToSunCamera();
      toggleZoomingToSun(true);
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
  // const [shaderScale, setShaderScale] = useState(sunRadius * 1.08);
  useFrame((state, delta) => {
    const distance = localRef.current.position.distanceTo(state.camera.position);
    if (distance / 100 <= sunRadius) {
      setScale(sunRadius);
    } else {
      setScale(distance / 100);
    }
    // add rotation based on planetsData.Sun.rotationPeriod
    const adjustedDelta = delta * simSpeed;
    const rotationPeriodInSeconds = rotationPeriod * 3600; // Convert hours to seconds
    const rotationSpeed = (2 * Math.PI) / rotationPeriodInSeconds; // radians per second
    const rotationIncrement = rotationSpeed * adjustedDelta;
    if (localRef.current) {
      localRef.current.rotation.y += rotationIncrement;
    }
    if (localRef.current?.material?.uniforms?.time) {
      localRef.current.material.uniforms.time.value += delta;
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
        <sphereGeometry args={[scale * 1.08, 32, 32]} />
        <shaderMaterial args={[sunOuterShader]} />
      </mesh>
    </group>

  );
};

export default Sun;
