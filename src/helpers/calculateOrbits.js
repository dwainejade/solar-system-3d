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
    // Initial setup if this is the first call
    if (!initialVelocity || !position) {
        // Reduced initial speed multiplier from 1.2 to 1.05
        const initialSpeed = meanMotion * orbitalRadius * 1.05;
        const velocity = new THREE.Vector2(
            -initialSpeed * Math.sin(currentAngle),
            initialSpeed * Math.cos(currentAngle)
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

    // Regular trajectory calculation
    const outwardDirection = position.clone().normalize();
    // Reduced escape acceleration from 0.2 to 0.02
    const escapeAcceleration = 0.000002;

    // Update velocity with reduced acceleration
    const newVelocity = initialVelocity.clone();
    newVelocity.x += outwardDirection.x * escapeAcceleration * deltaTime;
    newVelocity.y += outwardDirection.z * escapeAcceleration * deltaTime;

    // Optional: Add a small damping factor to prevent excessive speed
    const dampingFactor = 0.999;
    newVelocity.multiplyScalar(dampingFactor);

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