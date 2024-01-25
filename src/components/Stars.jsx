import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { BackSide } from "three";
import useStore from "../store/store";

const Stars = () => {
  const starsTexture = useLoader(TextureLoader, "./assets/stars/starmap_8k.png");
  const constellationTexture = useLoader(TextureLoader, "./assets/stars/constellations.png");
  const { showConstellations } = useStore();
  const size = 100000;
  return (
    <>
      <mesh>
        <sphereGeometry args={[size + 1, 128]} />
        <meshBasicMaterial map={starsTexture} side={BackSide} />
      </mesh>

      {showConstellations && (
        <mesh>
          <sphereGeometry args={[size, 128]} />
          <meshBasicMaterial map={constellationTexture} transparent={true} opacity={0.2} side={BackSide} />
        </mesh>
      )}
    </>
  );
};

export default Stars;
