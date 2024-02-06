import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import Papa from 'papaparse';
import { Text, Html } from '@react-three/drei'; // Import Text from Drei


const StarField = () => {
    const [data, setData] = useState([]);
    const meshRefs = useRef({});

    const constellationColors = {
        // Aqr: "#00FFFF", // Aquarius: Aqua
        // And: "#0000FF", // Andromeda: Blue
        // Ori: "#FFA500", // Orion: Orange
        // Cas: "#FF0000", // Cassiopeia: Red
        // Cyg: "#FFFF00", // Cygnus: Yellow
        // Leo: "#008000", // Leo: Green
        // Sgr: "#FFD700", // Sagittarius: Gold
        // Gem: "#FFC0CB", // Gemini: Pink
        // UMa: "#ADD8E6", // Ursa Major: Light Blue
        // Sco: "#800000", // Scorpius: Maroon
        // Psc: "lime", // Pisces: Lime
        // Vir: "#800080", // Virgo: Purple
        // Cnc: "#008080", // Cancer: Teal
        // Tau: "#808000", // Taurus: Olive
        // Lib: [0, 2, 2], // Libra: Navy
        // Cap: "#C0C0C0", // Capricorn: Silver
        // Aql: "#E6E6FA", // Aquila: Lavender
        // Lyr: "#FF00FF", // Lyra: Magenta
        // Per: "#FA8072", // Perseus: Salmon
        // Ara: "#FF7F50", // Ara: Coral
        // Cen: "#F0E68C", // Centaurus: Khaki
        // Dra: "#98FF98", // Draco: Mint
        // Crv: "#FFFFF0", // Corvus: Ivory
        // Hya: "#FDDA0D", // Hydra: Apricot
        // Boo: "#F5F5DC", // Boötes: Beige
        // Cma: "#FFDAB9", // Canis Major: Peach
        // Cmi: "#A52A2A", // Canis Minor: Rust
        // Gru: "#36454F", // Grus: Charcoal
        // Her: "#4B0082", // Hercules: Indigo
        // Lep: "#FFFDD0", // Lepus: Cream
        // Lyn: "#40E0D0", // Lynx: Turquoise
        // Mon: "#FFBF00", // Monoceros: Amber
        // Oph: "#50C878", // Ophiuchus: Emerald
        // Phe: "#0F52BA", // Phoenix: Sapphire
        // Ser: "#B87333", // Serpens: Copper
        // Tuc: "#007FFF", // Tucana: Azure
        // Vel: "#8F00FF", // Vela: Violet
        // Car: "#D2691E", // Carina: Chocolate
        // Cet: "#DDA0DD", // Cetus: Plum
        // Col: "#FFC0CB", // Columba: Rose
        // CrA: "#2E2B5F", // Corona Australis: Cerulean
        // CrB: "#DA70D6", // Corona Borealis: Orchid
        // CVn: "#2E8B57", // Canes Venatici: Sea Green
        // Com: "#87CEEB", // Coma Berenices: Sky Blue
        // Del: "#228B22", // Delphinus: Forest Green
        // Dor: "#D2B48C", // Dorado: Tan
        // Equ: "#708090", // Equuleus: Slate Gray
        // Eri: "#B22222", // Eridanus: Fire Brick
        // For: "#DAA520", // Fornax: Goldenrod
        // Continue adding more constellations and their colors as needed
    };


    useEffect(() => {
        async function getData() {
            const response = await fetch('../dataset/hygdata.csv');
            // Stream the response
            const reader = response.body.getReader();
            let receivedLength = 0; // length at the moment
            let chunks = []; // array of received binary chunks (comprises the body)
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                chunks.push(value);
                receivedLength += value.length;
            }

            // Combine chunks into a single Uint8Array
            let chunksAll = new Uint8Array(receivedLength);
            let position = 0;
            for (let chunk of chunks) {
                chunksAll.set(chunk, position);
                position += chunk.length;
            }

            // Decode new Uint8Array back into a string
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(chunksAll);

            // Use PapaParse to parse the CSV string
            Papa.parse(csv, {
                complete: (results) => {
                    // console.log('Completed parsing:', results);
                    setData(results.data); // Assuming 'dist' is the distance field
                },
                header: true,
                dynamicTyping: true,
            });
        }
        getData();
    }, []);

    const fixedDistance = 100000;
    const scaleFactor = 10000; // Example scale factor, adjust as needed
    const starSizeScale = 400;

    // Function to convert magnitude to size for rendering
    const magnitudeToSize = (magnitude) => {
        // Adjust the function to map magnitude to size based on your specific needs
        // This is a simple linear scale; you might want a non-linear scale depending on your magnitude range and desired visual effect
        const size = (1 / (magnitude + 3)) * starSizeScale;
        return Math.max(size, 0.1); // Ensure the star size is not too small to be seen
    };

    const constellationGroups = useMemo(() => {
        const groups = {};
        data.forEach(star => {
            const con = star.con;
            if (!groups[con]) {
                groups[con] = [];
            }
            groups[con].push(star);
        });
        return groups;
    }, [data]);

    useEffect(() => {
        Object.entries(constellationGroups).forEach(([con, stars]) => {
            const normalizedPositions = stars.map(star => {
                // Original position
                const originalPosition = new THREE.Vector3(
                    parseFloat(star.x) * scaleFactor,
                    parseFloat(star.y) * scaleFactor,
                    parseFloat(star.z) * scaleFactor
                );

                // Calculate the normalized direction vector from the original position
                const direction = originalPosition.clone().normalize();

                // Scale the direction by the fixed distance
                const normalizedPosition = direction.multiplyScalar(fixedDistance);

                return normalizedPosition;
            });

            if (normalizedPositions.length > 0 && meshRefs.current[con]) {
                normalizedPositions.forEach((position, index) => {
                    const star = stars[index];
                    // Convert the star's magnitude to a size
                    const size = magnitudeToSize(star.mag);
                    // Create a new matrix for positioning and scaling
                    const matrix = new THREE.Matrix4().compose(
                        position,
                        new THREE.Quaternion(0, 0, 0, 1),
                        new THREE.Vector3(size, size, size)
                    );
                    // Apply this matrix to the instanced mesh at the current index
                    meshRefs.current[con].setMatrixAt(index, matrix);
                });
                meshRefs.current[con].instanceMatrix.needsUpdate = true;
            }
        });
    }, [constellationGroups, scaleFactor]);


    // Calculate centroids for constellation labels
    const constellationCentroids = useMemo(() => {
        const centroids = {};
        Object.entries(constellationGroups).forEach(([con, stars]) => {
            if (stars.length) {
                const sumPosition = stars.reduce((acc, star) => {
                    const pos = new THREE.Vector3(
                        parseFloat(star.x) * scaleFactor,
                        parseFloat(star.y) * scaleFactor,
                        parseFloat(star.z) * scaleFactor
                    ).normalize().multiplyScalar(100000); // Use your normalized positions
                    acc.add(pos);
                    return acc;
                }, new THREE.Vector3(0, 0, 0));

                // Calculate the average position (centroid)
                sumPosition.divideScalar(stars.length);
                centroids[con] = sumPosition;
            }
        });
        return centroids;
    }, [constellationGroups, scaleFactor]);

    return (
        <>
            {Object.keys(constellationGroups).map(con => (
                <instancedMesh
                    key={con}
                    ref={el => meshRefs.current[con] = el}
                    args={[null, null, constellationGroups[con].length]}
                    dispose={null}
                >
                    <sphereGeometry attach="geometry" args={[1, 8, 4]} />
                    <meshBasicMaterial attach="material" color={constellationColors[con] || [1, 1, 1]} toneMapped={false} />
                </instancedMesh>
            ))}
            {Object.entries(constellationCentroids).map(([con, position]) => (
                <Html
                    key={con}
                    position={[position.x, position.y, position.z]}
                    center
                >
                    <span style={{ color: 'red' }}>{con || null}</span>
                </Html>
            ))}
        </>
    );
};

export default StarField;
