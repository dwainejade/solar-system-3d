import { useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";

function OrbitPath({
  origin,
  radius,
  eccentricity = 0,
  orbitalInclination,
  color,
  name,
  opacity = 1,
  lineType = 'solid',
  hiRes = false
}) {
  const points = useMemo(() => {
    const segments = hiRes ? 1000 : 128;
    const pointsArray = [];

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * 2 * Math.PI;

      // Distance from focus (r) in polar coordinates
      const r = (radius * (1 - eccentricity * eccentricity)) /
        (1 + eccentricity * Math.cos(theta));

      // Convert to Cartesian coordinates
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);

      // Apply inclination
      const inclination = orbitalInclination * (Math.PI / 180);
      const y = Math.sin(inclination) * z;
      const adjustedZ = Math.cos(inclination) * z;

      // Add as array of numbers instead of Vector3
      pointsArray.push([x, y, adjustedZ]);
    }

    return pointsArray;
  }, [radius, eccentricity, orbitalInclination, hiRes]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={opacity}
      dashed={false}
    />
  );
}

export default OrbitPath;