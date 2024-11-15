import { Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

function OrbitPath({
  origin,
  radius,
  eccentricity = 0,
  orbitalInclination,
  color,
  name,
  lineWidth = 2,
  opacity = 1,
  hiRes = false,
  arcLength = 0.8, // Default to 80% of the orbit
  position
}) {
  const segments = hiRes ? 512 : 64;

  // Extract position components for dependency tracking
  const posX = Array.isArray(position) ? position[0] : position?.x || 0;
  const posY = Array.isArray(position) ? position[1] : position?.y || 0;
  const posZ = Array.isArray(position) ? position[2] : position?.z || 0;

  const { points, colors } = useMemo(() => {
    const pointsArray = [];
    const colorsArray = [];

    // Calculate current angle from position components
    const currentAngle = Math.atan2(posZ, posX);
    const baseColor = new THREE.Color(color);

    // Calculate how many segments to use based on arcLength
    const totalArcAngle = arcLength * 2 * Math.PI;
    const segmentsToUse = Math.floor(segments * arcLength);

    // Generate points for the specified arc length
    for (let i = 0; i <= segmentsToUse; i++) {
      // Calculate angle for this point, starting from current position and going backwards
      const theta = currentAngle - (i / segmentsToUse) * totalArcAngle;

      // Calculate radius with eccentricity
      const r = (radius * (1 - eccentricity * eccentricity)) /
        (1 + eccentricity * Math.cos(theta));

      // Calculate position
      const x = r * Math.cos(theta);
      const baseZ = r * Math.sin(theta);
      const inclination = orbitalInclination * (Math.PI / 180);
      const y = Math.sin(inclination) * baseZ;
      const z = Math.cos(inclination) * baseZ;

      pointsArray.push([x, y, z]);

      // Calculate fade for the tail
      // Fade should complete over the visible arc length
      const fadeProgress = i / segmentsToUse;
      const fadeColor = new THREE.Color(color).lerp(new THREE.Color(0x000000), fadeProgress);
      colorsArray.push(fadeColor);
    }

    return {
      points: pointsArray,
      colors: colorsArray
    };
  }, [
    radius,
    eccentricity,
    orbitalInclination,
    segments,
    posX,
    posY,
    posZ,
    color,
    arcLength
  ]);

  return (
    <Line
      key={name}
      points={points}
      vertexColors={colors}
      lineWidth={lineWidth}
      depthWrite={false}
    />
  );
}

export default OrbitPath;