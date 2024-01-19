import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { BackSide } from "three";
import useStore from "../store/store";

const Stars = () => {
  const starsTexture = useLoader(TextureLoader, "/assets/stars/starmap_8k.png");
  const constellationTexture = useLoader(TextureLoader, "/assets/stars/constellations.png");
  const { showConstellations } = useStore();

  return (
    <>
      <mesh>
        <sphereGeometry args={[90001, 60, 40]} />
        <meshBasicMaterial map={starsTexture} side={BackSide} />
      </mesh>

      {!showConstellations && (
        <mesh>
          <sphereGeometry args={[90000, 60, 40]} />
          <meshBasicMaterial map={constellationTexture} transparent={true} opacity={0.1} side={BackSide} />
        </mesh>
      )}
    </>
  );
};

export default Stars;
