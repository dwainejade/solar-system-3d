// utils/KeplerianOrbit.js
import * as THREE from 'three';

export function calculateKeplerianOrbit({
    meanMotion,
    eccentricity,
    orbitalRadius,
    orbitalInclination,
    currentAngle,
    deltaTime
}) {
    // Update angle
    const newAngle = currentAngle - meanMotion * deltaTime;

    // Solve Kepler's Equation
    let E = newAngle;
    const maxIterations = 10;
    const tolerance = 1e-6;

    for (let i = 0; i < maxIterations; i++) {
        const deltaE = (E - eccentricity * Math.sin(E) - newAngle) /
            (1 - eccentricity * Math.cos(E));
        E -= deltaE;
        if (Math.abs(deltaE) < tolerance) break;
    }

    // Calculate true anomaly
    const trueAnomaly = 2 * Math.atan(
        Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
        Math.tan(E / 2)
    );

    // Calculate radius
    const r = (orbitalRadius * (1 - eccentricity * eccentricity)) /
        (1 + eccentricity * Math.cos(trueAnomaly));

    // Calculate position
    const x = r * Math.cos(-trueAnomaly);
    const baseZ = r * Math.sin(-trueAnomaly);

    // Apply inclination
    const inclination = orbitalInclination * (Math.PI / 180);
    const y = Math.sin(inclination) * baseZ;
    const z = Math.cos(inclination) * baseZ;

    return {
        position: new THREE.Vector3(x, y, z),
        angle: newAngle
    };
}

// Optional: Additional orbital calculation functions
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
    const totalRotation = startAngle - currentAngle;
    const rotations = totalRotation / (2 * Math.PI);
    const spiralTightness = Math.PI;
    const radiusFactor = Math.exp(-rotations * spiralTightness);
    const currentRadius = orbitalRadius * radiusFactor;

    // Increase speed as radius decreases (inverse square law-like behavior)
    const radiusRatio = currentRadius / orbitalRadius; // Goes from 1 to near 0
    const speedMultiplier = 1 + Math.pow((1 - radiusRatio), 2) * 15; // Quadratic increase in speed

    // Calculate new angle with increased speed near the center
    const newAngle = currentAngle - meanMotion * speedMultiplier * deltaTime;

    const x = currentRadius * Math.cos(newAngle);
    const z = currentRadius * Math.sin(newAngle);

    return {
        position: new THREE.Vector3(x, 0, z),
        angle: newAngle,
        radius: currentRadius
    };
}