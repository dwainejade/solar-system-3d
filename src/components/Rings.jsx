// RadialRingComponent.jsx
import React, { useMemo } from 'react';
import * as THREE from 'three';

const RadialRingComponent = ({ innerRadius, outerRadius, height = 0, rotation, texture, detail = 16 }) => {
    const geometry = useMemo(() => {
        const geom = new THREE.CylinderGeometry(outerRadius, innerRadius, height, detail, 1, true);

        // Adjust UV mapping to wrap the texture correctly around the truncated cone
        const uv = geom.attributes.uv;
        for (let i = 0; i < uv.count; i++) {
            const uvX = uv.getX(i);
            const uvY = uv.getY(i);
            // Map the UV coordinates such that they wrap radially
            uv.setXY(i, uvX, uvY); // No adjustment needed as UVs should be correct for radial mapping
        }

        return geom;
    }, [innerRadius, outerRadius, height]);

    const material = useMemo(
        () => new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true
        }),
        [texture]
    );

    return <mesh geometry={geometry} material={material} rotation={rotation} />;
};

export default RadialRingComponent;
