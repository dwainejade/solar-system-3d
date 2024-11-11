import React, { useMemo, useState, useRef, useEffect } from "react";
import { Line } from "@react-three/drei";
import { usePlanetStore } from "../store/store";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useExperimentsStore from "../store/experiments";

const normalizeAngle = (angle) => {
    return ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
};

const AnimatedKeplerTriangles = ({
    planetName = 'Earth',
    planetRef,
    angleRef,
    numTriangles = 5,
    radius,
    eccentricity = 0,
    orbitalInclination,
}) => {
    const { planetsData, updatePlanetAngle, updatePlanetData } = usePlanetStore();
    const { experimentStatus } = useExperimentsStore();
    const [activeSlice, setActiveSlice] = useState(null);
    const [completedSlices, setCompletedSlices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastAngle, setLastAngle] = useState(null);
    const lastAngles = useRef([]);
    const isInitialized = useRef(false);

    // Reset visualization when planet data changes
    useEffect(() => {
        setCompletedSlices([]);
        setCurrentIndex(0);
        setActiveSlice(null);
        setLastAngle(null);
        lastAngles.current = [];
        isInitialized.current = true;
    }, [planetName, radius, planetsData[planetName].eccentricity, orbitalInclination, numTriangles, updatePlanetData]);

    useEffect(() => {
        if (experimentStatus === null) {
            setCompletedSlices([]);
            setCurrentIndex(0);
            setActiveSlice(null);
            setLastAngle(null);
            lastAngles.current = [];
            isInitialized.current = true;
        }
    }, [experimentStatus]);

    const createSlicePoints = (startAngle, endAngle, steps = 100) => {  // Increased from 30 to 100
        const points = [];
        startAngle = normalizeAngle(startAngle);
        endAngle = normalizeAngle(endAngle);

        // Add more points at the center for better radius resolution
        const centerPoints = 20;  // Number of points to add near center
        for (let i = 0; i < centerPoints; i++) {
            points.push([0, 0, 0]);
        }

        // Calculate arc length to distribute points more evenly
        let angleDiff = endAngle - startAngle;
        if (angleDiff < 0) angleDiff += 2 * Math.PI;

        // Add more points along the arc
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const angle = startAngle + t * angleDiff;
            points.push(getPositionAtAngle(angle));
        }

        // Add more points at the end for better radius resolution
        for (let i = 0; i < centerPoints; i++) {
            points.push([0, 0, 0]);
        }

        return points;
    };

    const equalAreaAngles = useMemo(() => {
        const angles = [];
        for (let i = 0; i <= numTriangles; i++) {
            const M = (i / numTriangles) * 2 * Math.PI;
            let E = M;

            for (let iter = 0; iter < 10; iter++) {
                const dE = (E - eccentricity * Math.sin(E) - M) /
                    (1 - eccentricity * Math.cos(E));
                E -= dE;
                if (Math.abs(dE) < 1e-6) break;
            }

            const trueAnomaly = 2 * Math.atan(
                Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
                Math.tan(E / 2)
            );

            angles.push(normalizeAngle(trueAnomaly)); // Normalize angles when we create them
        }
        return angles;
    }, [numTriangles, eccentricity]);

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

        const pos = planetRef.current.position;
        let currentAngle = normalizeAngle(Math.atan2(pos.z, pos.x));

        // Keep track of last few angles
        lastAngles.current.push(currentAngle);
        if (lastAngles.current.length > 3) {  // Keep last 3 angles
            lastAngles.current.shift();
        }

        if (lastAngle === null) {
            setLastAngle(currentAngle);
            return;
        }

        // Check for orbit completion with multiple angle checks
        // This helps catch high-speed transitions
        const angles = lastAngles.current;
        const hasHighAngle = angles.some(angle => angle > 5);
        const hasLowAngle = angles.some(angle => angle < 1);

        if (hasHighAngle && hasLowAngle && currentAngle < lastAngle) {
            // console.log("=== ORBIT COMPLETE - RESETTING ===", {
            //     angles: angles.map(a => (a * 180 / Math.PI).toFixed(1) + "°"),
            //     currentAngle: (currentAngle * 180 / Math.PI).toFixed(1) + "°"
            // });
            setCompletedSlices([]);
            setCurrentIndex(0);
            setActiveSlice(null);
            setLastAngle(currentAngle);
            lastAngles.current = [currentAngle];
            return;
        }

        if (currentIndex < numTriangles) {
            const sliceStartAngle = equalAreaAngles[currentIndex];
            const sliceEndAngle = equalAreaAngles[currentIndex + 1];

            if (!activeSlice) {
                // console.log(`Starting new slice ${currentIndex}:`, {
                //     sliceStartAngle: (sliceStartAngle * 180 / Math.PI).toFixed(1) + "°",
                //     sliceEndAngle: (sliceEndAngle * 180 / Math.PI).toFixed(1) + "°",
                //     currentAngle: (currentAngle * 180 / Math.PI).toFixed(1) + "°"
                // });

                setActiveSlice({
                    startAngle: sliceStartAngle,
                    endAngle: currentAngle,
                    color: `hsl(${(currentIndex * 360) / numTriangles}, 70%, 50%)`
                });
            } else {
                const passedEndAngle = !isAngleBetween(currentAngle, sliceStartAngle, sliceEndAngle) &&
                    isAngleBetween(lastAngle, sliceStartAngle, sliceEndAngle);

                if (passedEndAngle) {
                    // console.log(`Completing slice ${currentIndex}:`, {
                    //     sliceStartAngle: (sliceStartAngle * 180 / Math.PI).toFixed(1) + "°",
                    //     sliceEndAngle: (sliceEndAngle * 180 / Math.PI).toFixed(1) + "°",
                    //     currentAngle: (currentAngle * 180 / Math.PI).toFixed(1) + "°",
                    //     lastAngle: (lastAngle * 180 / Math.PI).toFixed(1) + "°"
                    // });

                    setCompletedSlices(prev => [...prev, {
                        points: createSlicePoints(sliceStartAngle, sliceEndAngle),
                        color: activeSlice.color
                    }]);

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
        <group key={planetName}>
            {completedSlices.map((slice, index) => (
                <Line
                    key={`complete-${index}`}
                    points={slice.points}
                    color={slice.color}
                    lineWidth={2.5}
                />
            ))}
            {activeSlice && (
                <Line
                    points={createSlicePoints(activeSlice.startAngle, activeSlice.endAngle)}
                    color={activeSlice.color}
                    lineWidth={4}
                />
            )}
        </group>
    );
};

export default AnimatedKeplerTriangles;