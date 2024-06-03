import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function SatelliteModel(props) {
    const { nodes, materials } = useGLTF('../assets/models/satellite/scene.gltf')

    return (
        <group {...props} dispose={null}>
            <group rotation={[0, Math.PI, 0]} rotation-z={props.zRotation || 0}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2.geometry}
                    material={materials.initialShadingGroup}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_3.geometry}
                    material={materials.initialShadingGroup}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_4.geometry}
                    material={materials.initialShadingGroup}
                />
            </group>
        </group>
    )
}

useGLTF.preload('../assets/models/satellite/scene.gltf')