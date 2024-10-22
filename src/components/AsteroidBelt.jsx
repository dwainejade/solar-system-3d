import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, Point } from '@react-three/drei';
import useStore from '../store/store';
import { distanceScaleFactor } from '../data/planetsData';

const AsteroidBelt = ({
    meshCount = 100,
    pointCount = 200
}) => {
    const { simSpeed } = useStore();

    // Belt parameters
    const innerRadius = 400.9e6;
    const outerRadius = 600.5e6;
    // const averageRadius = (innerRadius + outerRadius) / 2;
    const beltWidth = outerRadius - innerRadius;

    // Calculate orbital speed using Kepler's laws
    const calculateOrbitalSpeed = (radius) => {
        const earthRadius = 149.6e6;
        const earthOrbitalSpeed = 29.78;
        return earthOrbitalSpeed * Math.sqrt(earthRadius / radius);
    };

    // Generate point data with much smaller inclinations
    // const asteroidPoints = useMemo(() => {
    //     const points = [];
    //     for (let i = 0; i < pointCount; i++) {
    //         const angle = Math.random() * Math.PI * 2;
    //         const semiMajorAxis = innerRadius + (Math.random() * beltWidth);
    //         const eccentricity = Math.random() * 0.3;
    //         const orbitalSpeed = calculateOrbitalSpeed(semiMajorAxis);

    //         // Drastically reduced inclination (from ±0.5 to ±0.05)
    //         const inclination = (Math.random() - 0.5) * 0.05;

    //         points.push({
    //             semiMajorAxis: semiMajorAxis * distanceScaleFactor,
    //             eccentricity,
    //             orbitalSpeed: orbitalSpeed * 0.000001,
    //             angle,
    //             inclination,
    //             position: [0, 0, 0],
    //             color: `rgb(
    //                 ${155 + Math.random() * 100},
    //                 ${155 + Math.random() * 100},
    //                 ${155 + Math.random() * 100}
    //             )`
    //         });
    //     }
    //     return points;
    // }, [pointCount]);

    // Generate mesh data with reduced inclinations
    const asteroidMeshes = useMemo(() => {
        const meshes = [];
        for (let i = 0; i < meshCount; i++) {
            const semiMajorAxis = innerRadius + (Math.random() * beltWidth);
            const eccentricity = Math.random() * 0.3;
            const orbitalSpeed = calculateOrbitalSpeed(semiMajorAxis);

            // Drastically reduced inclination for meshes too
            const inclination = (Math.random() - 0.5) * 0.05;

            meshes.push({
                semiMajorAxis: semiMajorAxis * distanceScaleFactor,
                eccentricity,
                orbitalSpeed: -orbitalSpeed * 0.0000000001,
                angle: Math.random() * Math.PI * 2,
                inclination,
                scale: [
                    10 + Math.random() * 30,
                    10 + Math.random() * 40,
                    10 + Math.random() * 40
                ],
                rotationSpeed: 0.00001 + (Math.random() * 0.00005)
            });
        }
        return meshes;
    }, [meshCount]);

    // const pointsRef = useRef();
    const meshRefs = useRef(asteroidMeshes.map(() => React.createRef()));

    useFrame((state, delta) => {
        if (simSpeed === 0) return;

        // // Update point positions
        // if (pointsRef.current && pointsRef.current.geometry) {
        //     asteroidPoints.forEach((asteroid, i) => {
        //         asteroid.angle += asteroid.orbitalSpeed * simSpeed;

        //         const r = asteroid.semiMajorAxis * (1 - asteroid.eccentricity * asteroid.eccentricity) /
        //             (1 + asteroid.eccentricity * Math.cos(asteroid.angle));

        //         const x = r * Math.cos(asteroid.angle);
        //         const z = r * Math.sin(asteroid.angle);
        //         // Reduced y-position impact from inclination
        //         const y = r * Math.sin(asteroid.inclination) * 0.2; // Added additional 0.2 multiplier

        //         if (pointsRef.current.geometry.attributes.position) {
        //             const positions = pointsRef.current.geometry.attributes.position.array;
        //             positions[i * 3] = x;
        //             positions[i * 3 + 1] = y;
        //             positions[i * 3 + 2] = z;
        //         }
        //     });
        //     pointsRef.current.geometry.attributes.position.needsUpdate = true;
        // }

        // Update mesh positions
        meshRefs.current.forEach((meshRef, i) => {
            if (meshRef.current) {
                const asteroid = asteroidMeshes[i];
                asteroid.angle += asteroid.orbitalSpeed * simSpeed;

                const r = asteroid.semiMajorAxis * (1 - asteroid.eccentricity * asteroid.eccentricity) /
                    (1 + asteroid.eccentricity * Math.cos(asteroid.angle));

                meshRef.current.position.x = r * Math.cos(asteroid.angle);
                meshRef.current.position.z = r * Math.sin(asteroid.angle);
                // Reduced y-position impact from inclination for meshes too
                meshRef.current.position.y = r * Math.sin(asteroid.inclination) * 0.2;

                // Rotate asteroid
                meshRef.current.rotation.x += delta * asteroid.rotationSpeed * simSpeed;
                meshRef.current.rotation.y += delta * asteroid.rotationSpeed * simSpeed;
            }
        });
    });

    return (
        <group>
            {/* <Points ref={pointsRef} limit={pointCount} range={pointCount}>
                <pointsMaterial
                    size={10}
                    sizeAttenuation={true}
                    transparent={true}
                    opacity={0.6}
                    vertexColors
                />
                {asteroidPoints.map((point, index) => (
                    <Point
                        key={index}
                        position={point.position}
                        color={point.color}
                    />
                ))}
            </Points> */}

            <group>
                {asteroidMeshes.map((asteroid, index) => (
                    <mesh
                        key={index}
                        ref={meshRefs.current[index]}
                        scale={asteroid.scale}
                    >
                        <dodecahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial
                            color="#8B7355"
                            roughness={0.9}
                            metalness={0.1}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

export default AsteroidBelt;