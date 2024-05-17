import { Billboard, Text } from '@react-three/drei'

function Labels({ text, size = 1, position = [0, 3, 0], color, handleClick, handlePointerDown, font }) {
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
            >
                {text.toUpperCase()}
            </Text>
        </Billboard>
    )
}

export default Labels