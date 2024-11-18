import { Billboard, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function Labels({ text, size = 1, position = [0, 3, 0], color, handleClick, handlePointerDown }) {
    const { camera } = useThree()
    const textRef = useRef()

    useFrame(() => {
        if (textRef.current) {
            const textWorldPos = new THREE.Vector3()
            textRef.current.getWorldPosition(textWorldPos)

            const cameraWorldPos = new THREE.Vector3()
            camera.getWorldPosition(cameraWorldPos)

            const distanceToCamera = cameraWorldPos.distanceTo(textWorldPos)
            const scaleFactor = distanceToCamera / 55

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