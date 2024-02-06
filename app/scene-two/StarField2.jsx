import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import Papa, { parse } from 'papaparse';

const StarField = () => {
    const [data, setData] = useState([]);
    const meshRef = useRef();

    useEffect(() => {
        async function getData() {
            const response = await fetch('../dataset/hygfull_v1.csv');
            const reader = response.body.getReader();
            const stream = new ReadableStream({
                async start(controller) {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) {
                            break;
                        }
                        controller.enqueue(value);
                    }
                    controller.close();
                    reader.releaseLock();
                }
            });

            new Response(stream).text().then(text => {
                Papa.parse(text, {
                    complete: (results) => {
                        console.log('Completed parsing:', results);
                        setData(results.data);
                    },
                    header: true,
                    dynamicTyping: true,
                    worker: true, // Run parser in a Web Worker
                });
            });
        }
        getData();
    }, []);



    // Convert RA (in hours) and DEC (in degrees) to radians
    const degToRad = degrees => degrees * (Math.PI / 180);
    const hourToRad = hours => hours * 15 * (Math.PI / 180); // 1 hour = 15 degrees

    const positionsAndMagnitudes = useMemo(() => data.map(star => {
        const RightAscension = hourToRad(parseFloat(star.RA));
        const Declination = degToRad(parseFloat(star.Dec));
        const scaleFactor = 1000; // Adjust this scale factor as needed
        const baseDistance = 40000; // Minimum distance for visualization
        let distance = parseFloat(star.Distance) * scaleFactor + baseDistance;
        distance = Math.min(Math.max(distance, 40000), 60000); // Constrain distance to 50,000 - 60,000

        const x = distance * Math.cos(Declination) * Math.cos(RightAscension);
        const y = distance * Math.cos(Declination) * Math.sin(RightAscension);
        const z = distance * Math.sin(Declination);
        const mag = parseFloat(star.Mag);
        const id = star.StarID

        return { id, x, y, z, mag };
    }), [data]);

    // Define a function to calculate scale based on magnitude
    const getScaleFromMag = (mag) => {
        // Example scale calculation, adjust as needed
        const baseScale = 10; // Base scale for the dimmest stars
        const scaleRange = 70; // Maximum scale for the brightest stars
        const minMag = 9; // Adjust based on your dataset
        const maxMag = 21; // Adjust based on your dataset
        return baseScale + (maxMag - mag) / (maxMag - minMag) * scaleRange;
    };

    useEffect(() => {
        if (positionsAndMagnitudes.length > 0 && meshRef.current) {
            positionsAndMagnitudes.forEach(({ id, x, y, z, mag }) => {
                const position = new THREE.Vector3(x, y, z);
                const scale = getScaleFromMag(mag); // Calculate scale for this star
                const matrix = new THREE.Matrix4().compose(
                    position,
                    new THREE.Quaternion(0, 0, 0, 1),
                    new THREE.Vector3(scale, scale, scale)
                );
                meshRef.current.setMatrixAt(id, matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [positionsAndMagnitudes]);

    return (
        <instancedMesh ref={meshRef} args={[null, null, positionsAndMagnitudes.length]} dispose={null}>
            <sphereGeometry attach="geometry" args={[1, 8, 6]} />
            <meshBasicMaterial attach="material" color="white" />
        </instancedMesh>
    );
};

export default StarField;