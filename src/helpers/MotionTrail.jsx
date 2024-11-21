import React, { useState, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const MotionTrail = ({
    target,
    color = 'white',
    width = 3,
    opacity = 1,
    active = true,
    minPoints = 500, // Increased for smoother trails
    maxPoints = 1000, // Increased max points
    pause = false
}) => {
    const [points, setPoints] = useState([]);
    const lastPosition = useRef(null);
    const lastUpdateTime = useRef(0);
    const interpolatedPoints = useRef([]);

    // Interpolation settings
    const interpolationSettings = {
        pointsPerSegment: 5,
        smoothingFactor: 1
    };

    // Catmull-Rom spline interpolation for smooth curves
    const interpolatePoints = (points, segments) => {
        if (points.length < 2) return points;

        const result = [];

        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[Math.max(0, i - 1)];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[Math.min(points.length - 1, i + 2)];

            for (let j = 0; j < segments; j++) {
                const t = j / segments;
                const tt = t * t;
                const ttt = tt * t;

                const q = new THREE.Vector3();
                q.x = 0.5 * ((2 * p1.x) +
                    (-p0.x + p2.x) * t +
                    (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * tt +
                    (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * ttt);
                q.y = 0.5 * ((2 * p1.y) +
                    (-p0.y + p2.y) * t +
                    (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * tt +
                    (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * ttt);
                q.z = 0.5 * ((2 * p1.z) +
                    (-p0.z + p2.z) * t +
                    (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * tt +
                    (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * ttt);

                result.push(q);
            }
        }

        return result;
    };

    useFrame((_, delta) => {
        if (!active || !target?.current || pause) return;

        const currentTime = performance.now();
        const currentPosition = target.current.position.clone();

        // Only update if enough time has passed or position has changed significantly
        const timeDiff = currentTime - lastUpdateTime.current;
        const positionChanged = lastPosition.current &&
            currentPosition.distanceTo(lastPosition.current) > 0.001;

        if (timeDiff > 16 || positionChanged) { // 60fps = ~16ms
            setPoints(prev => {
                // Smoothly interpolate to new position
                const smoothedPosition = lastPosition.current ?
                    new THREE.Vector3().lerpVectors(
                        lastPosition.current,
                        currentPosition,
                        interpolationSettings.smoothingFactor
                    ) : currentPosition;

                let newPoints = [...prev, smoothedPosition];

                // Maintain point limits while ensuring smooth transitions
                if (newPoints.length > maxPoints) {
                    newPoints = newPoints.slice(newPoints.length - maxPoints);
                }

                // Ensure minimum points
                while (newPoints.length < minPoints) {
                    newPoints.unshift(newPoints[0]?.clone() || currentPosition);
                }

                // Update interpolated points
                interpolatedPoints.current = interpolatePoints(
                    newPoints,
                    interpolationSettings.pointsPerSegment
                );

                lastPosition.current = smoothedPosition;
                lastUpdateTime.current = currentTime;

                return newPoints;
            });
        }
    });

    // Reset trail when deactivated
    useEffect(() => {
        if (!active) {
            setPoints([]);
            lastPosition.current = null;
            lastUpdateTime.current = 0;
            interpolatedPoints.current = [];
        }
    }, [active]);

    // Create gradient colors for the trail
    const colors = useMemo(() => {
        if (!interpolatedPoints.current.length) return [];

        return interpolatedPoints.current.map((_, index) => {
            const alpha = index / (interpolatedPoints.current.length - 1);
            return new THREE.Color(color).multiplyScalar(alpha);
        });
    }, [color, interpolatedPoints.current.length]);

    if (!interpolatedPoints.current.length) return null;

    return (
        <Line
            points={interpolatedPoints.current}
            vertexColors={colors}
            lineWidth={width}
            depthWrite={false}
            transparent
            opacity={opacity}
        />
    );
};

export default MotionTrail;