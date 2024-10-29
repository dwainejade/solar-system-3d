import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import useStore, { useCameraStore, usePlanetStore } from '../store/store';
import { distanceScaleFactor, MASS_OF_SUN, G } from '../data/planetsData';
import Labels from './Labels';
import SatelliteCamera from './SatelliteCamera';

const AsteroidBelt = ({ meshCount = 200 }) => {
    const { simSpeed, setPrevSpeed, setSimSpeed } = useStore();
    const { toggleCameraTransitioning, setAutoRotate } = useCameraStore();
    const { setSelectedPlanet, updatePlanetPosition, displayLabels } = usePlanetStore();
    const [isHovered, setIsHovered] = useState(false);
    const groupRef = useRef();
    const asteroidGroupRef = useRef();

    // Real asteroid belt parameters (in km)
    const innerRadius = 2.2 * 149.6e6;
    const outerRadius = 3.2 * 149.6e6;
    const beltWidth = outerRadius - innerRadius;
    const averageRadius = ((innerRadius + outerRadius) / 2) * distanceScaleFactor;

    const beltData = {
        name: "AsteroidBelt",
        radius: beltWidth * distanceScaleFactor * 0.5,
    };

    const handleClick = (e) => {
        e.stopPropagation();
        updatePlanetPosition("AsteroidBelt", {
            x: 2000,
            y: 0,
            z: 2000
        });
        setPrevSpeed(simSpeed);
        setSimSpeed(0);
        setSelectedPlanet(beltData);
        setAutoRotate(false);
    };

    const handlePointerOver = (e) => {
        e.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = (e) => {
        e.stopPropagation();
        setIsHovered(false);
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
        if (simSpeed === 0) return;
        const deltaSpeed = delta * simSpeed;

        meshRefs.current.forEach((meshRef, i) => {
            if (meshRef.current) {
                const asteroid = asteroidMeshes[i];
                asteroid.angle += asteroid.orbitalSpeed * deltaSpeed / 2;

                const r = asteroid.semiMajorAxis * (1 - asteroid.eccentricity * asteroid.eccentricity) /
                    (1 + asteroid.eccentricity * Math.cos(asteroid.angle));

                const x = r * Math.cos(asteroid.angle);
                const y = r * Math.sin(asteroid.inclination) * Math.sin(asteroid.angle);
                const z = r * Math.cos(asteroid.inclination) * Math.sin(asteroid.angle);

                meshRef.current.position.set(x, y, z);
                meshRef.current.rotation.x += asteroid.rotationSpeed * deltaSpeed;
                meshRef.current.rotation.y += asteroid.rotationSpeed * deltaSpeed;
                meshRef.current.rotation.z += asteroid.rotationSpeed * deltaSpeed * 0.5;
            }
        });
    });

    return (
        <>
            {/* Fixed Label - outside the rotating group */}
            {displayLabels &&
                <group position={[3400, 140, 0]}>
                    <Labels
                        key={'asteroid-belt-label'}
                        text={'Asteroid Belt'}
                        size={150}
                        color={'orangered'}
                        handleClick={handleClick}
                    />
                </group>
            }


            {/* Rotating Asteroids */}
            <group
                ref={groupRef}
                onClick={handleClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                <group ref={asteroidGroupRef}>
                    {asteroidMeshes.map((asteroid, index) => (
                        <mesh
                            key={index}
                            ref={meshRefs.current[index]}
                            scale={asteroid.scale}
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

                {/* {isAsteroidBeltSelected && localRef.current &&
                    <SatelliteCamera
                        target={localRef.current}
                        targetName={beltData.name}
                        size={scaledRadius}
                        satelliteCamera={satelliteCamera}
                        toggleSatelliteCamera={toggleSatelliteCamera}
                    />
                } */}
            </group>
        </>
    );
};

export default AsteroidBelt;