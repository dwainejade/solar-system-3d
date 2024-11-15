import React from 'react';
import { Line } from '@react-three/drei';
import { Vector3, BufferGeometry, Float32BufferAttribute } from 'three';

const createArrowGeometry = (start, end, headLength = 0.4, headWidth = 0.2) => {
    const direction = new Vector3().subVectors(end, start).normalize();
    const length = start.distanceTo(end);

    // Calculate arrow head points
    const headStart = new Vector3().copy(end).sub(direction.multiplyScalar(headLength));
    const headBase = new Vector3().copy(headStart);
    const up = new Vector3(0, 1, 0);
    const right = new Vector3().crossVectors(direction, up).normalize().multiplyScalar(headWidth);

    if (Math.abs(direction.y) === 1) {
        right.set(1, 0, 0).multiplyScalar(headWidth);
    }

    const headRight = new Vector3().copy(headBase).add(right);
    const headLeft = new Vector3().copy(headBase).sub(right);

    // Create vertices for the arrow head
    const vertices = new Float32Array([
        // Line
        start.x, start.y, start.z,
        headStart.x, headStart.y, headStart.z,
        // Arrow head
        headLeft.x, headLeft.y, headLeft.z,
        end.x, end.y, end.z,
        headRight.x, headRight.y, headRight.z
    ]);

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    return geometry;
};

const GravityVectors = ({ moonRef, planetPosition, length = 3 }) => {
    if (!moonRef?.current || !planetPosition) return null;

    const moonPos = moonRef.current.position;
    const planetPos = new Vector3(0, 0, 0);

    // Calculate direction vectors
    const towardsPlanet = new Vector3()
        .subVectors(planetPos, moonPos)
        .normalize()
        .multiplyScalar(length);

    const towardsMoon = new Vector3()
        .subVectors(moonPos, planetPos)
        .normalize()
        .multiplyScalar(length);

    // Calculate end points
    const moonVectorEnd = new Vector3(
        moonPos.x + towardsPlanet.x,
        moonPos.y + towardsPlanet.y,
        moonPos.z + towardsPlanet.z
    );

    const planetVectorEnd = new Vector3(
        planetPos.x + towardsMoon.x,
        planetPos.y + towardsMoon.y,
        planetPos.z + towardsMoon.z
    );

    return (
        <>
            {/* Vector pointing from moon towards planet */}
            <line geometry={createArrowGeometry(moonPos, moonVectorEnd, length * 0.2, length * 0.1)}>
                <lineBasicMaterial attach="material" color="salmon" linewidth={2} />
            </line>

            {/* Vector pointing from planet towards moon */}
            <line geometry={createArrowGeometry(planetPos, planetVectorEnd, length * 0.2, length * 0.1)}>
                <lineBasicMaterial attach="material" color="dodgerblue" linewidth={2} />
            </line>
        </>
    );
};

export default GravityVectors;