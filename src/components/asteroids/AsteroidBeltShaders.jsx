import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { asteroidBeltData, distanceScaleFactor, rotationSpeedScaleFactor } from '../../data/planetsData';
import useStore, { usePlanetStore, useCameraStore } from '../../store/store';
import Labels from '../Labels';
import DetailedAsteroids from './DetailedAsteroids';

const AsteroidBelt = ({ particleCount = 5000 }) => {
    const { simSpeed } = useStore();
    const { displayLabels } = usePlanetStore();
    const { activeCamera, switchToCustomCamera, setAutoRotate } = useCameraStore();
    const isHoveredRef = useRef(false);
    const pointsRef = useRef();
    const textSizeRef = useRef(1);
    const labelRef = useRef();

    // Constants for the asteroid belt
    const innerRadius = asteroidBeltData.innerRadius * distanceScaleFactor;
    const outerRadius = asteroidBeltData.outerRadius * distanceScaleFactor;
    const averageRadius = (innerRadius + outerRadius) / 2;

    // Fixed position for the label - now relative to scene center
    const labelPosition = new THREE.Vector3(averageRadius * 0.8, averageRadius * 0.01, 0);


    const { positions, sizes, colors, velocities, initialAngles, eccentricities, semiMajorAxes } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount);
        const initialAngles = new Float32Array(particleCount);
        const eccentricities = new Float32Array(particleCount);
        const semiMajorAxes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const randRadius = Math.pow(Math.random(), 0.5);
            const semiMajorAxis = innerRadius + (randRadius * (outerRadius - innerRadius));
            const ecc = Math.random() * 0.3; // Max eccentricity of 0.3

            const angle = Math.random() * Math.PI * 2;
            const inclination = (Math.random() * 20) * (Math.PI / 275);

            // Initial position calculation
            const radius = semiMajorAxis * (1 - ecc * ecc) / (1 + ecc * Math.cos(angle));
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(inclination) * Math.sin(angle);
            const z = radius * Math.cos(inclination) * Math.sin(angle);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            sizes[i] = Math.pow(Math.random(), 3) * 50 + 10;

            // Kepler's Third Law: orbital period ∝ sqrt(a³)
            // So velocity ∝ 1/sqrt(a)
            velocities[i] = 0.1 * Math.sqrt(averageRadius / semiMajorAxis);

            initialAngles[i] = angle;
            eccentricities[i] = ecc;
            semiMajorAxes[i] = semiMajorAxis;

            const colorType = Math.random();
            if (colorType > 0.8) {
                colors[i * 3] = 0.545;
                colors[i * 3 + 1] = 0.45;
                colors[i * 3 + 2] = 0.33;
            } else if (colorType > 0.5) {
                colors[i * 3] = 0.29;
                colors[i * 3 + 1] = 0.29;
                colors[i * 3 + 2] = 0.29;
            } else {
                colors[i * 3] = 0.63;
                colors[i * 3 + 1] = 0.32;
                colors[i * 3 + 2] = 0.18;
            }
        }

        return { positions, sizes, colors, velocities, initialAngles, eccentricities, semiMajorAxes };
    }, [particleCount]);

    const handleClick = (e) => {
        e.stopPropagation();
        if (activeCamera?.name === 'Asteroid Belt') return;
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

    useFrame((state, delta) => {
        const deltaSpeed = delta * simSpeed / rotationSpeedScaleFactor;
        if (pointsRef.current) {
            pointsRef.current.material.uniforms.time.value += deltaSpeed;
        }
        // Update text size based on camera distance
        if (state.camera) {
            const distanceToLabel = state.camera.position.distanceTo(labelPosition);
            textSizeRef.current = distanceToLabel * 0.02;
        }
    });


    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                attribute float velocity;
                attribute float initialAngle;
                attribute float eccentricity;
                attribute float semiMajorAxis;
                
                varying vec3 vColor;
                
                uniform float time;
                
                void main() {
                    vColor = color;
                    
                    // Calculate true anomaly (angle from perihelion)
                    float meanAnomaly = initialAngle + velocity * time;
                    float angle = meanAnomaly; // Approximation of true anomaly
                    
                    // Calculate radius using orbital equation
                    float radius = semiMajorAxis * (1.0 - eccentricity * eccentricity) / 
                                 (1.0 + eccentricity * cos(angle));
                    
                    // Calculate new position
                    vec3 pos = position;
                    float baseY = pos.y / length(pos.xz); // Preserve inclination ratio
                    pos.x = radius * cos(angle);
                    pos.z = radius * sin(angle);
                    pos.y = baseY * length(pos.xz); // Apply inclination to new radius
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    vec2 coord = gl_PointCoord - vec2(0.5);
                    if (length(coord) > 0.5) discard;
                    
                    float distanceFromCenter = length(coord);
                    float brightness = 1.0 - distanceFromCenter * 0.5;
                    
                    gl_FragColor = vec4(vColor * brightness, 1.0);
                }
            `,
            uniforms: {
                time: { value: 0 }
            },
            transparent: false,
            depthWrite: false,
            blending: THREE.NoBlending
        });
    }, []);


    return (
        <>
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
                    />
                </group>
            )}
            {activeCamera?.name === 'Asteroid Belt' && <DetailedAsteroids />}

            <group >
                <points ref={pointsRef}  >
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={particleCount}
                            array={positions}
                            itemSize={3}
                        />
                        <bufferAttribute
                            attach="attributes-size"
                            count={particleCount}
                            array={sizes}
                            itemSize={1}
                        />
                        <bufferAttribute
                            attach="attributes-color"
                            count={particleCount}
                            array={colors}
                            itemSize={3}
                        />
                        <bufferAttribute
                            attach="attributes-velocity"
                            count={particleCount}
                            array={velocities}
                            itemSize={1}
                        />
                        <bufferAttribute
                            attach="attributes-initialAngle"
                            count={particleCount}
                            array={initialAngles}
                            itemSize={1}
                        />
                        <bufferAttribute
                            attach="attributes-eccentricity"
                            count={particleCount}
                            array={eccentricities}
                            itemSize={1}
                        />
                        <bufferAttribute
                            attach="attributes-semiMajorAxis"
                            count={particleCount}
                            array={semiMajorAxes}
                            itemSize={1}
                        />
                    </bufferGeometry>
                    <primitive object={shaderMaterial} attach="material" />
                </points>
            </group>
        </>
    );
};

export default AsteroidBelt;