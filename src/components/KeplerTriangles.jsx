import React, { useMemo, useState, useEffect } from "react";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AnimatedKeplerTriangles = ({
    planetRef,
    numTriangles = 5,
    radius,
    eccentricity = 0,
    orbitalInclination,
    color = "white"
}) => {
    const [activeSlice, setActiveSlice] = useState(null);
    const [completedSlices, setCompletedSlices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastAngle, setLastAngle] = useState(null);

    // Calculate angles for equal-area slices
    const equalAreaAngles = useMemo(() => {
        const angles = [];
        for (let i = 0; i <= numTriangles; i++) {
            const M = (i / numTriangles) * 2 * Math.PI;
            let E = M;

            // Solve Kepler's equation
            for (let iter = 0; iter < 10; iter++) {
                const dE = (E - eccentricity * Math.sin(E) - M) /
                    (1 - eccentricity * Math.cos(E));
                E -= dE;
                if (Math.abs(dE) < 1e-6) break;
            }

            // Calculate true anomaly
            const trueAnomaly = 2 * Math.atan(
                Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
                Math.tan(E / 2)
            );

            angles.push(trueAnomaly);
        }
        return angles;
    }, [numTriangles, eccentricity]);

    // Function to get position at a given angle
    const getPositionAtAngle = (angle) => {
        const r = (radius * (1 - eccentricity * eccentricity)) /
            (1 + eccentricity * Math.cos(angle));

        const x = r * Math.cos(angle);
        const z = r * Math.sin(angle);

        const inclination = orbitalInclination * (Math.PI / 180);
        const y = Math.sin(inclination) * z;
        const adjustedZ = Math.cos(inclination) * z;

        return [x, y, adjustedZ];
    };

    // Create points for a slice between angles
    const createSlicePoints = (startAngle, endAngle, steps = 30) => {
        const points = [[0, 0, 0]];

        for (let i = 0; i <= steps; i++) {
            const angle = startAngle + (i / steps) * (endAngle - startAngle);
            points.push(getPositionAtAngle(angle));
        }

        points.push([0, 0, 0]);
        return points;
    };

    // Helper to normalize angle to [0, 2π]
    const normalizeAngle = (angle) => {
        while (angle < 0) angle += 2 * Math.PI;
        while (angle >= 2 * Math.PI) angle -= 2 * Math.PI;
        return angle;
    };

    // Helper to check if angle is between start and end angles
    const isAngleBetween = (angle, start, end) => {
        angle = normalizeAngle(angle);
        start = normalizeAngle(start);
        end = normalizeAngle(end);

        if (start <= end) {
            return angle >= start && angle <= end;
        } else {
            return angle >= start || angle <= end;
        }
    };

    useFrame(() => {
        if (!planetRef.current) return;

        // Calculate current planet angle
        const pos = planetRef.current.position;
        let currentAngle = Math.atan2(pos.z, pos.x);
        currentAngle = normalizeAngle(currentAngle);

        // Initialize lastAngle if needed
        if (lastAngle === null) {
            setLastAngle(currentAngle);
            return;
        }

        // Detect orbit completion
        if (lastAngle > 5 && currentAngle < 1) {
            setCompletedSlices([]);
            setCurrentIndex(0);
            setActiveSlice(null);
            setLastAngle(currentAngle);
            return;
        }

        // Handle slice animation
        if (currentIndex < numTriangles) {
            const sliceStartAngle = equalAreaAngles[currentIndex];
            const sliceEndAngle = equalAreaAngles[currentIndex + 1];

            // If no active slice, start one
            if (!activeSlice) {
                setActiveSlice({
                    startAngle: sliceStartAngle,
                    endAngle: currentAngle,
                    color: `hsl(${(currentIndex * 360) / numTriangles}, 70%, 50%)`
                });
            } else {
                // Check if we've completed the current slice
                const passedEndAngle = !isAngleBetween(currentAngle, sliceStartAngle, sliceEndAngle) &&
                    isAngleBetween(lastAngle, sliceStartAngle, sliceEndAngle);

                if (passedEndAngle) {
                    // Complete current slice
                    setCompletedSlices(prev => [...prev, {
                        points: createSlicePoints(sliceStartAngle, sliceEndAngle),
                        color: activeSlice.color
                    }]);

                    // Move to next slice if not at end
                    if (currentIndex < numTriangles - 1) {
                        setCurrentIndex(prev => prev + 1);
                        setActiveSlice({
                            startAngle: sliceEndAngle,
                            endAngle: currentAngle,
                            color: `hsl(${((currentIndex + 1) * 360) / numTriangles}, 70%, 50%)`
                        });
                    } else {
                        setActiveSlice(null);
                    }
                } else {
                    // Update current slice
                    setActiveSlice(prev => ({
                        ...prev,
                        endAngle: currentAngle
                    }));
                }
            }
        }

        setLastAngle(currentAngle);
    });

    return (
        <group>
            {/* Completed slices */}
            {completedSlices.map((slice, index) => (
                <Line
                    key={`complete-${index}`}
                    points={slice.points}
                    color={slice.color}
                    lineWidth={2}
                    transparent
                    opacity={0.5}
                />
            ))}

            {/* Active slice */}
            {activeSlice && (
                <Line
                    points={createSlicePoints(activeSlice.startAngle, activeSlice.endAngle)}
                    color={activeSlice.color}
                    lineWidth={2}
                // transparent
                // opacity={0.5}
                />
            )}
        </group>
    );
};

export default AnimatedKeplerTriangles;