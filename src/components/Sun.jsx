import React from "react";
import { usePlanetStore } from "../store/store";
import planetsData from "../data/planetsData";

const Sun = ({ position, resetCamera }) => {
  const { selectedPlanet, setSelectedPlanet } = usePlanetStore();

  const handleClick = e => {
    e.stopPropagation();

    if (selectedPlanet && selectedPlanet.name === "Sun") {
      setSelectedPlanet(null);
      resetCamera();
    } else {
      setSelectedPlanet(planetsData.Sun);
    }
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
    <mesh position={position} onClick={handleClick} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial color={[10, 3, 0]} toneMapped={false} />
    </mesh>
  );
};

export default Sun;
