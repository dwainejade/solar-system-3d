import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DetailedAsteroids = ({ count = 1000 }) => {
    const asteroidRefs = useRef([]);

    const asteroids = useMemo(() => {
        const geometries = [
            new THREE.IcosahedronGeometry(1, 0),  // Rough shape
            new THREE.DodecahedronGeometry(1, 0), // Angular shape
            new THREE.OctahedronGeometry(1, 0),   // Diamond-like
        ];

        return Array.from({ length: count }, () => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 2000
            ),
            rotation: new THREE.Euler(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            ),
            scale: 0.5 + Math.random() * 2,
            geometry: geometries[Math.floor(Math.random() * geometries.length)],
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.002,
                y: (Math.random() - 0.5) * 0.002,
                z: (Math.random() - 0.5) * 0.002
            },
            color: new THREE.Color(
                0.4 + Math.random() * 0.2,
                0.3 + Math.random() * 0.2,
                0.2 + Math.random() * 0.2
            )
        }));
    }, [count]);

    useFrame(() => {
        asteroidRefs.current.forEach((mesh, i) => {
            if (mesh) {
                mesh.rotation.x += asteroids[i].rotationSpeed.x;
                mesh.rotation.y += asteroids[i].rotationSpeed.y;
                mesh.rotation.z += asteroids[i].rotationSpeed.z;
            }
        });
    });

    const material = useMemo(() => new THREE.MeshStandardMaterial({
        roughness: 0.8,
        metalness: 0.2,
        flatShading: true
    }), []);

    return (
        <group>
            {asteroids.map((asteroid, i) => (
                <mesh
                    key={i}
                    ref={el => asteroidRefs.current[i] = el}
                    position={asteroid.position}
                    rotation={asteroid.rotation}
                    scale={asteroid.scale}
                    geometry={asteroid.geometry}
                >
                    <primitive object={material} attach="material" color={asteroid.color} />
                </mesh>
            ))}
        </group>
    );
};

export default DetailedAsteroids;