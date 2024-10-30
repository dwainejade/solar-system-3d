import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useStore, { useCameraStore, usePlanetStore } from '../../store/store';
import { distanceScaleFactor, MASS_OF_SUN, G } from '../../data/planetsData';
import Labels from '../Labels';
import * as THREE from 'three';

const AsteroidBelt = ({ meshCount = 200 }) => {
    const { simSpeed } = useStore();
    const { switchToCustomCamera, setAutoRotate, activeCamera } = useCameraStore();
    const { displayLabels } = usePlanetStore();

    const asteroidGroupRef = useRef();
    const isHoveredRef = useRef(false);
    const textSizeRef = useRef(1);
    const labelRef = useRef();

    // Real asteroid belt parameters (in km)
    const innerRadius = 2.2 * 149.6e6;
    const outerRadius = 3.2 * 149.6e6;
    const beltWidth = outerRadius - innerRadius;
    const averageRadius = ((innerRadius + outerRadius) / 2) * distanceScaleFactor;

    // Fixed position for the label
    const labelPosition = new THREE.Vector3(averageRadius * 0.8, averageRadius * 0.01, 0);

    const handleClick = (e) => {
        e.stopPropagation();
        if (activeCamera.name === 'Asteroid Belt') return;
        switchToCustomCamera('Asteroid Belt');
        setAutoRotate(true);
    };

    const handlePointerOver = (e) => {
        e.stopPropagation();
        isHoveredRef.current = true;
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = (e) => {
        e.stopPropagation();
        isHoveredRef.current = false;
        document.body.style.cursor = "auto";
    };

    const calculateOrbitalSpeed = (radius) => {
        return Math.sqrt(G * MASS_OF_SUN / (radius * 1000));
    };

    const asteroidMeshes = useMemo(() => {
        const meshes = [];
        for (let i = 0; i < meshCount; i++) {
            const randRadius = Math.pow(Math.random(), 0.5);
            const semiMajorAxis = innerRadius + (randRadius * beltWidth);
            const eccentricity = Math.random() * 0.3;
            const inclination = (Math.random() * 20) * (Math.PI / 275);
            const orbitalSpeed = calculateOrbitalSpeed(semiMajorAxis);
            const sizeScale = Math.pow(Math.random(), 2) * 30;

            meshes.push({
                semiMajorAxis: semiMajorAxis * distanceScaleFactor,
                eccentricity,
                orbitalSpeed: -orbitalSpeed * 0.0000000001,
                angle: Math.random() * Math.PI * 2,
                inclination,
                scale: [sizeScale, sizeScale, sizeScale],
                rotationSpeed: 0.00001 + (Math.random() * 0.00005),
                color: Math.random() > 0.8
                    ? '#8B7355'
                    : Math.random() > 0.5
                        ? '#4A4A4A'
                        : '#A0522D'
            });
        }
        return meshes;
    }, [meshCount]);

    const meshRefs = useRef(asteroidMeshes.map(() => React.createRef()));

    useFrame((state, delta) => {
        const adjustedDelta = - delta * simSpeed * 0.06;
        if (adjustedDelta === 0) return;

        // Update asteroid positions and rotations
        meshRefs.current.forEach((meshRef, i) => {
            if (meshRef.current) {
                const asteroid = asteroidMeshes[i];
                asteroid.angle += asteroid.orbitalSpeed * adjustedDelta / 2;

                const r = asteroid.semiMajorAxis * (1 - asteroid.eccentricity * asteroid.eccentricity) /
                    (1 + asteroid.eccentricity * Math.cos(asteroid.angle));

                const x = r * Math.cos(asteroid.angle);
                const y = r * Math.sin(asteroid.inclination) * Math.sin(asteroid.angle);
                const z = r * Math.cos(asteroid.inclination) * Math.sin(asteroid.angle);

                meshRef.current.position.set(x, y, z);
                meshRef.current.rotation.x += asteroid.rotationSpeed * adjustedDelta;
                meshRef.current.rotation.y += asteroid.rotationSpeed * adjustedDelta;
                meshRef.current.rotation.z += asteroid.rotationSpeed * adjustedDelta * 0.5;
            }
        });

        // Update text size based on distance from camera to label position
        const distanceToLabel = state.camera.position.distanceTo(labelPosition);
        textSizeRef.current = distanceToLabel * 0.02;
    });

    return (
        <>
            {/* Fixed Label */}
            {(displayLabels || isHoveredRef.current) && (
                <group
                    ref={labelRef}
                    position={labelPosition}
                >
                    <Labels
                        text="Asteroid Belt"
                        size={textSizeRef.current}
                        color="orangered"
                        handleClick={handleClick}
                        handlePointerOver={handlePointerOver}
                        handlePointerOut={handlePointerOut}
                    />
                </group>
            )}

            {/* Asteroids */}
            <group ref={asteroidGroupRef}>
                {asteroidMeshes.map((asteroid, index) => (
                    <mesh
                        key={index}
                        ref={meshRefs.current[index]}
                        scale={asteroid.scale}
                        onClick={handleClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    >
                        <dodecahedronGeometry args={[1, 0]} />
                        <meshBasicMaterial
                            color={asteroid.color}
                            roughness={0.7}
                            metalness={.5}
                        />
                    </mesh>
                ))}
            </group>
        </>
    );
};

export default AsteroidBelt;