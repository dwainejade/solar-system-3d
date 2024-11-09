import { Line } from "@react-three/drei";
import * as THREE from "three";

function OrbitPath({
  origin,
  radius,
  eccentricity = 0,
  orbitalInclination,
  color,
  name,
  lineWidth = 1,
  opacity = 1,
  hiRes = false,
  depthWrite = true,
  arcLength = 1.6 * Math.PI,
  position
}) {
  if (!position) return null;

  const segments = hiRes ? 512 : 64;
  const pointsArray = [];

  // Calculate start angle from current position
  const startAngle = Math.atan2(
    position.z * Math.cos(orbitalInclination * (Math.PI / 180)),
    position.x
  );

  // Generate points along the elliptical orbit
  for (let i = 0; i <= segments; i++) {
    // Calculate angle for this point
    const theta = startAngle - (i / segments) * arcLength;

    // Calculate radius at this angle using the elliptical orbit equation
    const r = (radius * (1 - eccentricity * eccentricity)) /
      (1 + eccentricity * Math.cos(theta));

    // Convert to Cartesian coordinates
    const x = r * Math.cos(theta);
    const baseZ = r * Math.sin(theta);

    // Apply inclination
    const inclination = orbitalInclination * (Math.PI / 180);
    const y = Math.sin(inclination) * baseZ;
    const z = Math.cos(inclination) * baseZ;

    pointsArray.push([x, y, z]);
  }

  // Ensure the first point exactly matches the current position
  pointsArray[0] = [position.x, position.y, position.z];

  return (
    <Line
      name={name}
      points={pointsArray}
      color={color}
      lineWidth={lineWidth}
      transparent
      opacity={opacity}
      depthWrite={depthWrite}
    />
  );
}

export default OrbitPath;