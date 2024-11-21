import React from 'react';
import { Vector3, Quaternion } from 'three';

// Arrow component that creates a cylinder with cone tip
const Arrow = ({ start, end, color, thickness = 0.1 }) => {
    const direction = new Vector3().subVectors(end, start);
    const length = direction.length() * .5;
    const normalized = direction.normalize();

    // Create quaternion for rotation
    const quaternion = new Quaternion();
    const up = new Vector3(0, 1, 0);
    quaternion.setFromUnitVectors(up, normalized);

    // Arrow head (cone) proportions
    const headLength = .8; // 20% of total length
    const headRadius = .4;
    const bodyLength = length - headLength;

    return (
        <group position={start}>
            <group quaternion={quaternion}>
                {/* Arrow body (cylinder) */}
                <mesh position={[0, bodyLength / 2, 0]}>
                    <cylinderGeometry args={[thickness, thickness, bodyLength, 32]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.5} depthWrite={false} depthTest={false} />
                </mesh>

                {/* Arrow head (cone) */}
                <mesh position={[0, length - headLength / 2, 0]}>
                    <coneGeometry args={[headRadius, headLength, 32]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={.8} transparent opacity={0.5} depthWrite={false} depthTest={false} />
                </mesh>
            </group>
        </group>
    );
};

const GravityVectors = ({ moonRef, planetRef, length = 3 }) => {
    if (!moonRef?.current?.position || !planetRef?.current?.position) return null;

    const moonPos = moonRef.current.position.clone();
    const planetPos = new Vector3(0, 0, 0); // Planet's local position

    // Calculate direction vectors
    const towardsPlanet = new Vector3()
        .subVectors(planetPos, moonPos)
        .normalize()
        .multiplyScalar(Math.max(3, Math.min(25, length * 8)));

    const towardsMoon = new Vector3()
        .subVectors(moonPos, planetPos)
        .normalize()
        .multiplyScalar(Math.max(3, Math.min(25, length * 8)));

    // Calculate end points
    const moonArrowEnd = new Vector3(
        moonPos.x + towardsPlanet.x,
        moonPos.y + towardsPlanet.y,
        moonPos.z + towardsPlanet.z
    );

    const planetArrowEnd = new Vector3(
        planetPos.x + towardsMoon.x,
        planetPos.y + towardsMoon.y,
        planetPos.z + towardsMoon.z
    );

    return (
        <>
            {/* Vector pointing from moon towards planet */}
            <Arrow
                start={moonPos}
                end={moonArrowEnd}
                color="orange"
                thickness={0.04}
            />

            {/* Vector pointing from planet towards moon */}
            <Arrow
                start={planetPos}
                end={planetArrowEnd}
                color="green"
                thickness={0.04}
            />
        </>
    );
};

export default GravityVectors;