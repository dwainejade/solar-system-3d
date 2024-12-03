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
  position,
  orbitalPeriod
}) {
  const segments = hiRes ? 512 : 128;
  const isRetrograde = orbitalPeriod < 0;

  const posX = Array.isArray(position) ? position[0] : position?.x || 0;
  const posY = Array.isArray(position) ? position[1] : position?.y || 0;
  const posZ = Array.isArray(position) ? position[2] : position?.z || 0;

  const { points, colors } = useMemo(() => {
    const pointsArray = [];
    const colorsArray = [];

    const currentAngle = Math.atan2(posZ, posX);
    const baseColor = new THREE.Color(color);
    const blackColor = new THREE.Color(0x000000);

    const inclinationRad = (orbitalInclination * -Math.PI) / 180;
    const rotationMatrix = new THREE.Matrix4().makeRotationX(inclinationRad);

    const totalArcAngle = arcLength * 2 * Math.PI;
    const segmentsToUse = Math.floor(segments * arcLength);

    // Define fade parameters
    const fadeStartPoint = .85;
    const fadeEndPoint = 1;

    for (let i = 0; i <= segmentsToUse; i++) {
      let theta;
      if (isRetrograde) {
        theta = (currentAngle + Math.PI) - (i / segmentsToUse) * totalArcAngle;
      } else {
        theta = currentAngle - (i / segmentsToUse) * totalArcAngle;
      }

      const r = (radius * (1 - eccentricity * eccentricity)) /
        (1 + eccentricity * Math.cos(theta));

      const point = new THREE.Vector3(
        r * Math.cos(theta),
        0,
        r * Math.sin(theta)
      );

      point.applyMatrix4(rotationMatrix);
      pointsArray.push([point.x, point.y, point.z]);

      // Calculate improved fade
      const progress = i / segmentsToUse;
      let fadeAmount;
      if (progress < fadeStartPoint) {
        fadeAmount = 0;
      } else if (progress > fadeEndPoint) {
        fadeAmount = 1;
      } else {
        fadeAmount = (progress - fadeStartPoint) / (fadeEndPoint - fadeStartPoint);
      }

      const fadeColor = baseColor.clone().lerp(blackColor, fadeAmount);
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
      transparent
      opacity={opacity}
    />
  );
}

export default OrbitPath;