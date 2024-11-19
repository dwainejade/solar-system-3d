import * as THREE from 'three';

export function calculateKeplerianOrbit({
    meanMotion,
    eccentricity,
    orbitalRadius,
    orbitalInclination,
    currentAngle,
    deltaTime
}) {
    const newAngle = currentAngle + meanMotion * deltaTime;

    let E = newAngle;
    const maxIterations = 10;
    const tolerance = 1e-6;

    for (let i = 0; i < maxIterations; i++) {
        const deltaE = (E - eccentricity * Math.sin(E) - newAngle) /
            (1 - eccentricity * Math.cos(E));
        E -= deltaE;
        if (Math.abs(deltaE) < tolerance) break;
    }

    const trueAnomaly = 2 * Math.atan(
        Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
        Math.tan(E / 2)
    );

    const r = (orbitalRadius * (1 - eccentricity * eccentricity)) /
        (1 + eccentricity * Math.cos(trueAnomaly));

    const x = r * Math.cos(trueAnomaly);
    const baseZ = r * Math.sin(trueAnomaly);

    const inclination = orbitalInclination * (Math.PI / 180);
    const y = Math.sin(inclination) * baseZ;
    const z = Math.cos(inclination) * baseZ;

    return {
        position: new THREE.Vector3(x, y, z),
        angle: newAngle
    };
}

export function calculateModifiedKeplerianOrbit({
    meanMotion,
    eccentricity,
    orbitalRadius,
    orbitalInclination,
    currentAngle,
    deltaTime,
    radiusModifier = 0.7,
    eccentricityModifier = 0.3
}) {
    const modifiedRadius = orbitalRadius * radiusModifier;
    const modifiedEccentricity = Math.min(0.7, eccentricity + eccentricityModifier);

    return calculateKeplerianOrbit({
        meanMotion: meanMotion * 1.2,
        eccentricity: modifiedEccentricity,
        orbitalRadius: modifiedRadius,
        orbitalInclination,
        currentAngle,
        deltaTime
    });
}

export function calculateSpiralOrbit({
    meanMotion,
    orbitalRadius,
    currentAngle,
    startAngle,
    deltaTime
}) {
    const totalRotation = Math.abs(startAngle - currentAngle);
    const revolutions = totalRotation / (2 * Math.PI);

    const decayFactor = 2.2;

    const radiusFactor = Math.exp(-revolutions * decayFactor);
    const currentRadius = orbitalRadius * radiusFactor;

    const speedIncrease = Math.pow(orbitalRadius / currentRadius, 0.8);
    const adjustedMeanMotion = meanMotion * speedIncrease * 5.0;
    const newAngle = currentAngle + adjustedMeanMotion * deltaTime;

    const x = currentRadius * Math.cos(newAngle);
    const z = currentRadius * Math.sin(newAngle);

    return {
        position: new THREE.Vector3(x, 0, z),
        angle: newAngle,
        radius: currentRadius
    };
}

export function calculateEscapeTrajectory({
    meanMotion,
    orbitalRadius,
    currentAngle,
    startAngle = null,
    deltaTime,
    initialVelocity = null,
    position = null
}) {
    const G = 0.000004; // Drastically reduced gravitational constant

    // Initial setup if this is the first call
    if (!initialVelocity || !position) {
        // Calculate initial escape velocity - reduced multiplier
        const tangentialSpeed = meanMotion * orbitalRadius * 1.02; // Just slightly above orbital velocity

        // Initial velocity is tangential to the orbit
        const velocity = new THREE.Vector2(
            -tangentialSpeed * Math.sin(currentAngle),
            tangentialSpeed * Math.cos(currentAngle)
        );

        const pos = new THREE.Vector3(
            orbitalRadius * Math.cos(currentAngle),
            0,
            orbitalRadius * Math.sin(currentAngle)
        );

        return {
            position: pos,
            velocity: velocity,
            angle: currentAngle
        };
    }

    // Calculate very weak gravitational effect
    const distanceToCenter = Math.sqrt(position.x * position.x + position.z * position.z);
    const gravitationalAcceleration = G / (distanceToCenter * distanceToCenter);

    // Direction to center
    const directionToCenter = new THREE.Vector2(
        -position.x / distanceToCenter,
        -position.z / distanceToCenter
    );

    // Update velocity with very weak gravity
    const newVelocity = initialVelocity.clone();
    newVelocity.x += directionToCenter.x * gravitationalAcceleration * deltaTime * 0.1; // Further reduced gravity
    newVelocity.y += directionToCenter.y * gravitationalAcceleration * deltaTime * 0.1;

    // Very small constant acceleration in velocity direction
    const escapeAcceleration = 0.0000000001; // Reduced escape acceleration
    const velocityDirection = newVelocity.clone().normalize();
    newVelocity.x += velocityDirection.x * escapeAcceleration * deltaTime;
    newVelocity.y += velocityDirection.y * escapeAcceleration * deltaTime;

    // Update position
    const newPosition = position.clone();
    newPosition.x += newVelocity.x * deltaTime;
    newPosition.z += newVelocity.y * deltaTime;

    const newAngle = Math.atan2(newPosition.z, newPosition.x);

    return {
        position: newPosition,
        velocity: newVelocity,
        angle: newAngle
    };
}