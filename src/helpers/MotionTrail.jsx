import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import useStore from '@/store/store';

const MotionTrail = ({
    target,
    color = 'white',
    width = 3,
    opacity = 1,
    active = true,
    minPoints = 150,
    maxPoints = 300
}) => {
    const [points, setPoints] = useState([]);
    const frameCount = useRef(0);
    const initialPosition = useRef(null);

    useFrame(() => {
        if (!active || !target?.current) return;

        frameCount.current++;

        // Fill initial trail
        if (!initialPosition.current && points.length < minPoints) {
            initialPosition.current = target.current.position.clone();
            setPoints(Array(minPoints).fill(initialPosition.current.clone()));
            return;
        }

        // Update every 2 frames for smoother trails
        if (frameCount.current % 2 === 0) {
            setPoints(prev => {
                // Always keep minimum number of points
                if (prev.length < minPoints) {
                    const lastPoint = prev[prev.length - 1] || target.current.position.clone();
                    const padding = Array(minPoints - prev.length).fill(lastPoint);
                    return [...prev, ...padding];
                }

                const newPoint = target.current.position.clone();
                let newPoints = [...prev, newPoint];

                // Keep within max points limit
                if (newPoints.length > maxPoints) {
                    newPoints = newPoints.slice(newPoints.length - maxPoints);
                }

                // Ensure we never go below minimum points
                if (newPoints.length < minPoints) {
                    const lastPoint = newPoints[newPoints.length - 1];
                    while (newPoints.length < minPoints) {
                        newPoints.unshift(lastPoint.clone());
                    }
                }

                return newPoints;
            });
        }
    });

    // Reset trail but maintain minimum length
    useEffect(() => {
        if (!active) {
            if (target?.current) {
                const pos = target.current.position.clone();
                setPoints(Array(minPoints).fill(pos));
            } else {
                setPoints([]);
            }
            initialPosition.current = null;
        }
    }, [active, minPoints]);

    // Create colors for the trail
    const colors = points.map((_, index) => {
        const alpha = index / Math.max(points.length - 1, 1);
        return new THREE.Color(color).multiplyScalar(alpha);
    });

    return points.length > 1 ? (
        <Line
            points={points}
            vertexColors={colors}
            lineWidth={width}
            depthWrite={false}
            transparent
            opacity={opacity}
        />
    ) : null;
};

export default MotionTrail;