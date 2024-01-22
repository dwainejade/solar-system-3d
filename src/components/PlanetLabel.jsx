import React from "react";
import { Html } from "@react-three/drei";
import { usePlanetStore } from "../store/store";

const PlanetLabel = ({
  name,
  position,
  color,
  handleClick,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
  handlePointerOver,
  handlePointerOut,
  scaledRadius,
}) => {
  const { displayLabels } = usePlanetStore();
  console.log({ name });
  return (
    <>
      {displayLabels ? (
        <Html
          as='span'
          wrapperClass='label-wrapper'
          center
          //   occlude
          position={position}
          zIndexRange={[100, 0]}
        >
          <span
            className='planet-label'
            style={{ color }}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            {name}
          </span>
        </Html>
      ) : (
        <Html as='div' center zIndexRange={[100, 0]}>
          <div
            className='planet-point'
            style={{ backgroundColor: color }}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          />
        </Html>
      )}
    </>
  );
};

export default PlanetLabel;
