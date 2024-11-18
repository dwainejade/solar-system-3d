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
  arcLength = 0.8,
  position
}) {
  const segments = hiRes ? 512 : 64;
  const isRetrograde = orbitalInclination > 90;

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

    const inclinationRad = (orbitalInclination * -Math.PI) / 180;
    const rotationMatrix = new THREE.Matrix4().makeRotationX(inclinationRad);

    const totalArcAngle = arcLength * 2 * Math.PI;
    const segmentsToUse = Math.floor(segments * arcLength);

    for (let i = 0; i <= segmentsToUse; i++) {
      let theta;
      if (isRetrograde) {
        // For retrograde orbits, start at current angle + π and move backwards
        theta = (currentAngle + Math.PI) - (i / segmentsToUse) * totalArcAngle;
      } else {
        // Normal orbits remain the same
        theta = currentAngle - (i / segmentsToUse) * totalArcAngle;
      }

      // Calculate radius with eccentricity
      const r = (radius * (1 - eccentricity * eccentricity)) /
        (1 + eccentricity * Math.cos(theta));

      // Create point in orbital plane (XZ plane)
      const point = new THREE.Vector3(
        r * Math.cos(theta),
        0,
        r * Math.sin(theta)
      );

      // Apply inclination rotation
      point.applyMatrix4(rotationMatrix);

      pointsArray.push([point.x, point.y, point.z]);

      // Calculate fade
      const fadeProgress = i / segmentsToUse;
      const fadeColor = baseColor.clone().lerp(new THREE.Color(0x000000), fadeProgress);
      colorsArray.push(fadeColor);
    }

    if (name === "Triton-orbit-path") {
      console.log("Triton points:", {
        currentAngle: currentAngle * (180 / Math.PI),
        isRetrograde,
        first: pointsArray[0],
        last: pointsArray[pointsArray.length - 1],
        thetaFirst: (currentAngle + Math.PI) * (180 / Math.PI),
        thetaLast: (currentAngle + Math.PI - totalArcAngle) * (180 / Math.PI)
      });
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
      transparent
      opacity={opacity}
    />
  );
}

export default OrbitPath;