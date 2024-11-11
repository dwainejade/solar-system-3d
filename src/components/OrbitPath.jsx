import { Line } from "@react-three/drei";
import { useMemo } from "react";

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
  arcLength = 'full',
  position
}) {
  // Only check position for partial arcs
  if (arcLength !== 'full' && !position) return null;

  const segments = hiRes ? 2048 : 64;

  const points = useMemo(() => {
    const pointsArray = [];

    if (arcLength === 'full') {
      // For full orbit, generate complete ellipse starting from 0
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * 2 * Math.PI;

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

      // Close the loop by connecting back to the start
      pointsArray.push(pointsArray[0]);
    } else {
      // Calculate start angle from current position for partial arc
      const startAngle = Math.atan2(
        position.z * Math.cos(orbitalInclination * (Math.PI / 180)),
        position.x
      );

      // Generate points for partial arc
      for (let i = 0; i <= segments; i++) {
        const theta = startAngle - (i / segments) * arcLength;

        const r = (radius * (1 - eccentricity * eccentricity)) /
          (1 + eccentricity * Math.cos(theta));

        const x = r * Math.cos(theta);
        const baseZ = r * Math.sin(theta);

        const inclination = orbitalInclination * (Math.PI / 180);
        const y = Math.sin(inclination) * baseZ;
        const z = Math.cos(inclination) * baseZ;

        pointsArray.push([x, y, z]);
      }

      // For partial arc, ensure first point matches current position
      pointsArray[0] = [position.x, position.y, position.z];
    }

    return pointsArray;
  }, [radius, eccentricity, orbitalInclination, segments, arcLength, position]);

  return (
    <Line
      name={name}
      points={points}
      color={color}
      lineWidth={lineWidth}
      transparent
      opacity={opacity}
      depthWrite={depthWrite}
    />
  );
}

export default OrbitPath;