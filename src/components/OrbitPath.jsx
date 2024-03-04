import React, { forwardRef, useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const OrbitPath = forwardRef(
  ({ origin = new THREE.Vector3(0, 0, 0), radius = 2, color = "white", name = "orbit-path", orbitalInclination }, ref) => {
    // Convert inclination to radians
    const inclination = orbitalInclination * (Math.PI / 180);

    const points = useMemo(() => {
      const pathPoints = [];
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 150) {
        const x = radius * Math.cos(angle);
        const y = Math.sin(inclination) * radius * Math.sin(angle);
        const z = radius * Math.sin(angle);
        pathPoints.push(new THREE.Vector3(x, y, z));
      }
      return pathPoints;
    }, [origin, radius]);

    return <Line ref={ref} points={points} color={color} lineWidth={0.2} />;
  }
);

export default OrbitPath;
