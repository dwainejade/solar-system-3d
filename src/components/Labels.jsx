import { Billboard, Text } from '@react-three/drei'

function Labels({ text, size = 1, position = [0, 3, 0], color, handleClick, font }) {

    return (
        <Billboard
            onClick={handleClick}
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