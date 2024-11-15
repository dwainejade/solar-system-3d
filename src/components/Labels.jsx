import { Billboard, Text } from '@react-three/drei'

function Labels({ name, text, size = 1, position = [0, 3, 0], color, handleClick, handlePointerDown, font = '../assets/fonts/Termina_Black.ttf' }) {
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
                position={position}
                scale={size}
                color={color}
                font={font}
                anchorX="center"
                anchorY="middle"
            >
                {text.toUpperCase()}
            </Text>
        </Billboard>
    )
}

export default Labels