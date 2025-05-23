import React, { useMemo, useRef, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useStore, { useCameraStore, usePlanetStore } from '../../store/store';
import { distanceScaleFactor, MASS_OF_SUN, G, asteroidBeltData } from '../../data/planetsData';
import { Html } from '@react-three/drei';
import Labels from '../Labels';

const AsteroidBelt = ({ meshCount = 500 }) => {
    const { simSpeed } = useStore();
    const { switchToCustomCamera, setAutoRotate, activeCamera } = useCameraStore();
    const { displayLabels } = usePlanetStore();

    // const asteroidGroupRef = useRef();
    const isHoveredRef = useRef(false);
    const textSizeRef = useRef(1);
    const labelRef = useRef();
    const colorArray = useRef();

    const opacity = ((activeCamera.type === 'planet' || activeCamera.type === 'moon') && activeCamera.name !== 'Sun') ? 0 : 1;


    const innerRadius = asteroidBeltData.innerRadius;
    const outerRadius = asteroidBeltData.outerRadius;
    const beltWidth = outerRadius - innerRadius;
    const averageRadius = ((innerRadius + outerRadius) / 2) * distanceScaleFactor;

    // Spectral types remain the same as they're accurate
    const spectralTypes = {
        C: {
            baseHue: 0.083,
            hueVariation: 0.02,
            saturation: [0.15, 0.25],
            lightness: [0.25, 0.35]
        },
        S: {
            baseHue: 0.055,
            hueVariation: 0.015,
            saturation: [0.25, 0.45],  // Increased saturation
            lightness: [0.35, 0.45]    // Increased lightness
        },
        M: {
            baseHue: 0.1,
            hueVariation: 0.01,
            saturation: [0.15, 0.3],
            lightness: [0.4, 0.5]
        },
        D: {
            baseHue: 0.065,
            hueVariation: 0.01,
            saturation: [0.15, 0.2],
            lightness: [0.2, 0.25]
        },
        V: {
            baseHue: 0.03,
            hueVariation: 0.01,
            saturation: [0.3, 0.5],
            lightness: [0.3, 0.4]
        }
    };

    const getRandomInRange = (min, max) => min + Math.random() * (max - min);

    const generateAsteroidColor = useCallback(() => {
        const rand = Math.random();
        let type;

        if (rand < 0.75) type = 'C';
        else if (rand < 0.92) type = 'S';
        else if (rand < 0.97) type = 'M';
        else if (rand < 0.99) type = 'D';
        else type = 'V';

        const specs = spectralTypes[type];
        const hue = specs.baseHue + (Math.random() - 0.5) * specs.hueVariation;
        const saturation = getRandomInRange(...specs.saturation);
        const lightness = getRandomInRange(...specs.lightness);
        const noise = (Math.random() - 0.5) * 0.05;

        // Create and brighten the color
        const color = new THREE.Color().setHSL(
            THREE.MathUtils.clamp(hue, 0, 1),
            THREE.MathUtils.clamp(saturation, 0, 1),
            THREE.MathUtils.clamp(lightness + noise, 0, 1)
        );

        // Boost the color intensity slightly
        color.multiplyScalar(1.2);

        return color;
    }, []);

    const generateAsteroidSize = useCallback(() => {
        const randomValue = Math.random();
        const minSize = 10;  // Minimum visible size
        const maxSize = 25;   // Maximum size for large asteroids
        return minSize + (maxSize - minSize) * Math.pow(randomValue, 20);
    }, []);

    const generateOrbitalElements = useCallback((index) => {
        // Generate semi-major axis with concentration in main belt
        const randRadius = Math.pow(Math.random(), 0.7); // Slight bias towards inner belt
        const semiMajorAxis = innerRadius + (randRadius * beltWidth);

        // Real eccentricity distribution (mean ~0.15, max ~0.3)
        const eccentricity = Math.min(0.3, Math.abs(0.15 + 0.07 * (Math.random() + Math.random() + Math.random() - 1.5)));

        // Real inclination distribution (mean ~8.5°, max ~30°)
        const inclination = Math.abs((8.5 + 6.2 * (Math.random() + Math.random() + Math.random() - 1.5))) * (Math.PI / 180);

        const orbitalSpeed = Math.sqrt(G * MASS_OF_SUN / (semiMajorAxis * 1000));

        return {
            semiMajorAxis: semiMajorAxis * distanceScaleFactor,
            eccentricity,
            orbitalSpeed: -orbitalSpeed * 0.0000000001,
            angle: Math.random() * Math.PI * 2,
            inclination,
            scale: generateAsteroidSize(),
            rotationAxis: new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize(),
            rotationSpeed: (0.1 + Math.random() * 0.9) * 0.00001,
            color: generateAsteroidColor()
        };
    }, []);

    // Rest of the component remains the same...
    const asteroidData = useMemo(() => {
        const data = Array.from({ length: meshCount }, (_, i) => generateOrbitalElements(i));
        const colors = new Float32Array(meshCount * 3);
        data.forEach((asteroid, i) => {
            colors[i * 3] = asteroid.color.r;
            colors[i * 3 + 1] = asteroid.color.g;
            colors[i * 3 + 2] = asteroid.color.b;
        });
        colorArray.current = colors;
        return data;
    }, [meshCount, generateOrbitalElements]);

    const instancedMeshRef = useRef();
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    useFrame((state, delta) => {
        const adjustedDelta = -delta * simSpeed * 0.06;
        if (adjustedDelta === 0) return;

        for (let i = 0; i < meshCount; i++) {
            const asteroid = asteroidData[i];
            asteroid.angle += asteroid.orbitalSpeed * adjustedDelta;

            const r = asteroid.semiMajorAxis * (1 - asteroid.eccentricity * asteroid.eccentricity) /
                (1 + asteroid.eccentricity * Math.cos(asteroid.angle));

            position.set(
                r * Math.cos(asteroid.angle),
                r * Math.sin(asteroid.inclination) * Math.sin(asteroid.angle),
                r * Math.cos(asteroid.inclination) * Math.sin(asteroid.angle)
            );

            quaternion.setFromAxisAngle(
                asteroid.rotationAxis,
                state.clock.elapsedTime * asteroid.rotationSpeed
            );

            scale.setScalar(asteroid.scale);
            matrix.compose(position, quaternion, scale);
            instancedMeshRef.current.setMatrixAt(i, matrix);
        }

        instancedMeshRef.current.instanceMatrix.needsUpdate = true;

        if (labelRef.current) {
            const labelPos = labelRef.current.getWorldPosition(new THREE.Vector3());
            textSizeRef.current = state.camera.position.distanceTo(labelPos) * 0.02;
        }
    });

    // Create geometry with color attribute
    const geometry = useMemo(() => {
        const baseGeometry = new THREE.IcosahedronGeometry(1, 1);
        const instancedGeometry = new THREE.InstancedBufferGeometry().copy(baseGeometry);
        instancedGeometry.setAttribute(
            'color',
            new THREE.InstancedBufferAttribute(colorArray.current, 3)
        );
        return instancedGeometry;
    }, []);

    const handleClick = () => {
        if (activeCamera.name !== 'Asteroid Belt') {
            switchToCustomCamera('Asteroid Belt');
        }
    };

    return (
        <group >
            <group position={[-0, 800, 4000]}>

                {(displayLabels) && (
                    <Labels
                        text="Asteroid Belt"
                        size={16}
                        color="#FFA500"
                        handleClick={handleClick}
                        zIndexRange={[100, 0]}

                    />
                )}
            </group>


            <instancedMesh
                ref={instancedMeshRef}
                args={[geometry, null, meshCount]}
                onClick={(e) => {
                    e.stopPropagation();
                    if (activeCamera.name !== 'Asteroid Belt') {
                        switchToCustomCamera('Asteroid Belt');
                        setAutoRotate(true);
                    }
                }}
            // onPointerOver={() => {
            //     isHoveredRef.current = true;
            //     document.body.style.cursor = "pointer";
            // }}
            // onPointerOut={() => {
            //     isHoveredRef.current = false;
            //     document.body.style.cursor = "auto";
            // }}
            >
                <meshStandardMaterial
                    vertexColors
                    roughness={0.7}
                    metalness={0.7}
                    emissive="#888"
                    emissiveIntensity={0.1}
                    toneMapped={false}
                    transparent={true}
                    opacity={opacity}
                />
            </instancedMesh>


        </group>
    );
};

export default AsteroidBelt;