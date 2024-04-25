import React, { forwardRef, useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const OrbitPath = forwardRef(
  ({ origin = new THREE.Vector3(0, 0, 0), radius = 2, color = "white", name = "orbit-path", orbitalInclination, hiRes = false, lineType = "solid", opacity = 1 }, ref) => {
    // Convert inclination to radians
    const inclination = orbitalInclination * (Math.PI / 180);

    const points = useMemo(() => {
      const pathPoints = [];
      const resolution = hiRes ? Math.min(Math.max(radius / 2, 30), 1000) : 30;

      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / resolution) {
        const x = radius * Math.cos(angle);
        const y = Math.sin(inclination) * radius * Math.sin(angle);
        const z = radius * Math.sin(angle);
        pathPoints.push(new THREE.Vector3(x, y, z));
      }
      return pathPoints;
    }, [radius, orbitalInclination, hiRes]);


    return (
      <Line
        ref={ref}
        points={points}
        color={color}
        lineWidth={0.2}
        // lineMaterial={lineMaterial}
        depthWrite
        dashed={lineType === "dashed"}
        dashScale={2}
        transparent
        opacity={opacity}
      />
    );
  }
);

export default OrbitPath;
