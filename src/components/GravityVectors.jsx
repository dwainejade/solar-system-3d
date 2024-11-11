import React from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';

const GravityVectors = ({ moonRef, planetPosition, length = 3 }) => {
    if (!moonRef?.current || !planetPosition) return null;

    const moonPos = moonRef.current.position;
    const planetPos = new Vector3(0, 0, 0);
    // console.log({ length })

    // Calculate direction vectors
    const towardsPlanet = new Vector3()
        .subVectors(planetPos, moonPos)
        .normalize()
        .multiplyScalar(length); // Length of arrow

    const towardsMoon = new Vector3()
        .subVectors(moonPos, planetPos)
        .normalize()
        .multiplyScalar(length); // Length of arrow

    return (
        <>
            {/* Vector pointing from moon towards planet */}
            <Line
                points={[
                    [moonPos.x, moonPos.y, moonPos.z],
                    [moonPos.x + towardsPlanet.x, moonPos.y + towardsPlanet.y, moonPos.z + towardsPlanet.z]
                ]}
                color="orange"
                lineWidth={3}
            />

            {/* Vector pointing from planet towards moon */}
            <Line
                points={[
                    [planetPos.x, planetPos.y, planetPos.z],
                    [planetPos.x + towardsMoon.x, planetPos.y + towardsMoon.y, planetPos.z + towardsMoon.z]
                ]}
                color="green"
                lineWidth={3}
            />
        </>
    );
};

export default GravityVectors;