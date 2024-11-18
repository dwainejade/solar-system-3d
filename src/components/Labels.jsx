import { Billboard, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function Labels({ text, size = 1, position = [0, 3, 0], color, handleClick, handlePointerDown }) {
    const { camera } = useThree()
    const textRef = useRef()
    const baseSize = 1000  // Adjust this constant as needed

    useFrame(() => {
        if (textRef.current) {
            // Get the text's world position
            const textWorldPos = new THREE.Vector3()
            textRef.current.getWorldPosition(textWorldPos)

            // Get the camera's world position
            const cameraWorldPos = new THREE.Vector3()
            camera.getWorldPosition(cameraWorldPos)

            // Compute the distance between the text and the camera
            const distanceToCamera = cameraWorldPos.distanceTo(textWorldPos)

            // Calculate the scale factor based on distance and size prop
            const scaleFactor = (distanceToCamera * size) / baseSize

            // Apply the scaling to the text
            textRef.current.scale.setScalar(scaleFactor)
        }
    })

    const handlePointerOver = () => {
        if (!handleClick) return
        document.body.style.cursor = 'pointer'
    }

    const handlePointerOut = () => {
        if (!handleClick) return
        document.body.style.cursor = 'auto'
    }

    return (
        <Billboard
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            <Text
                ref={textRef}
                position={position}
                color={color}
                font={'../assets/fonts/Termina_Black.ttf'}
                anchorX="center"
                anchorY="middle"
                matrixWorldAutoUpdate={false}
            >
                {text.toUpperCase()}
            </Text>
        </Billboard>
    )
}

export default Labels