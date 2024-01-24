import React, { useState, useRef } from "react";
import { usePlanetStore } from "../store/store";
import planetsData from "../data/planetsData";
import { Html } from "@react-three/drei";

const Sun = ({ position, resetCamera, textures }) => {
  const [isDragging, setIsDragging] = useState(false);
  const initialClickPosition = useRef({ x: 0, y: 0 });
  const { selectedPlanet, setSelectedPlanet, displayLabels } = usePlanetStore();

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
    // Calculate the distance moved
    const distanceMoved = Math.sqrt(
      Math.pow(e.clientX - initialClickPosition.current.x, 2) + Math.pow(e.clientY - initialClickPosition.current.y, 2)
    );
    if (distanceMoved > 5) {
      // Threshold to consider as a drag, adjust as needed
      setIsDragging(true);
    }
  };

  // New handler for pointer up
  const handlePointerUp = e => {
    setIsDragging(false); // Reset dragging state
  };

  const handlePointerOver = e => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
  };

  return (
    <group>
      <mesh
        position={position}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[50, 64, 64]} />
        {textures ? (
          <meshPhysicalMaterial map={textures.map} color={[10, 3, 0]} toneMapped={false} zIndexRange={[100 - 1]} />
        ) : (
          <meshBasicMaterial color={[10, 3, 0]} toneMapped={false} />
        )}
      </mesh>
      {/* Display planet names */}
      {displayLabels ? (
        <Html as='div' center occlude position-y={60} zIndexRange={[100, 0]}>
          <div
            className='planet-label'
            style={{ color: "rgb(255, 255, 0)" }}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            Sun
          </div>
        </Html>
      ) : (
        <Html center zIndexRange={[100, 0]}>
          <div
            className='planet-point'
            style={{ backgroundColor: "rgb(255, 255, 0)" }}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          />
        </Html>
      )}
    </group>
  );
};

export default Sun;
