import { useMemo } from "react";
import { Line } from "@react-three/drei";

function KeplerTriangles({
    planetRef,
    numTriangles = 5,
    radius,
    eccentricity = 0,
    orbitalInclination,
    color = "white"
}) {
    const lines = useMemo(() => {
        const allLines = [];

        // Calculate true anomaly angles that divide the orbit into equal areas
        const angles = [];
        for (let i = 0; i <= numTriangles; i++) {
            // Use mean anomaly (M) to get eccentric anomaly (E)
            const M = (i / numTriangles) * 2 * Math.PI;

            // Solve Kepler's equation (M = E - e * sin(E)) using Newton-Raphson
            let E = M;
            for (let iter = 0; iter < 10; iter++) {
                const dE = (E - eccentricity * Math.sin(E) - M) /
                    (1 - eccentricity * Math.cos(E));
                E -= dE;
                if (Math.abs(dE) < 1e-6) break;
            }

            // Calculate true anomaly (ν)
            const trueAnomaly = 2 * Math.atan(
                Math.sqrt((1 + eccentricity) / (1 - eccentricity)) *
                Math.tan(E / 2)
            );

            angles.push(trueAnomaly);
        }

        // Create lines for each angle
        for (let i = 0; i < angles.length; i++) {
            const theta = angles[i];

            // Calculate radius using orbital equation
            const r = (radius * (1 - eccentricity * eccentricity)) /
                (1 + eccentricity * Math.cos(theta));

            // Convert to Cartesian coordinates
            const x = r * Math.cos(theta);
            const z = r * Math.sin(theta);

            // Apply inclination
            const inclination = orbitalInclination * (Math.PI / 180);
            const y = Math.sin(inclination) * z;
            const adjustedZ = Math.cos(inclination) * z;

            // Create line from center to orbit point
            allLines.push([[0, 0, 0], [x, y, adjustedZ]]);
        }

        return allLines;
    }, [radius, eccentricity, orbitalInclination, numTriangles]);

    const colors = [
        '#90EE90', // Light green
        '#FFB6C1', // Light pink
        '#8B4513', // Saddle brown
        '#DC143C', // Crimson
        '#87CEEB', // Sky blue
    ];

    return (
        <>
            {lines.map((points, index) => (
                <Line
                    key={index}
                    points={points}
                    color={colors[index % colors.length]}
                    lineWidth={2}
                    transparent
                    opacity={0.5}
                />
            ))}
        </>
    );
}

export default KeplerTriangles;