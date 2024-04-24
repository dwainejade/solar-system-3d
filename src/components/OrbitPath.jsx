import React, { forwardRef, useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const OrbitPath = forwardRef(
  ({ origin = new THREE.Vector3(0, 0, 0), radius = 2, color = "white", name = "orbit-path", orbitalInclination, hiRes = false }, ref) => {
    // Convert inclination to radians
    const inclination = orbitalInclination * (Math.PI / 180);

    const points = useMemo(() => {
      const pathPoints = [];
      const resolution = hiRes ? Math.min(radius / 2, 1000) : 30;

      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / resolution) {
        const x = radius * Math.cos(angle);
        const y = Math.sin(inclination) * radius * Math.sin(angle);
        const z = radius * Math.sin(angle);
        pathPoints.push(new THREE.Vector3(x, y, z));
      }
      return pathPoints;
    }, [origin, radius, hiRes]);

    return <Line ref={ref} points={points} color={color} lineWidth={0.25} />;
  }
);

export default OrbitPath;
