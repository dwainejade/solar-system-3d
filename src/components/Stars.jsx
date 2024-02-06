import { useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';
import { BackSide } from 'three';
import useStore from '../store/store';



function SkyBox({ texture, showConstellations }) {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = texture;
  }, [showConstellations]);
  return null;
}

const Stars = () => {
  const { showConstellations } = useStore();
  const loader = new CubeTextureLoader();

  const starsTexture = loader.load([
    '../assets/stars/stars-cube-map/px.png',
    '../assets/stars/stars-cube-map/nx.png',
    '../assets/stars/stars-cube-map/py.png',
    '../assets/stars/stars-cube-map/ny.png',
    '../assets/stars/stars-cube-map/pz.png',
    '../assets/stars/stars-cube-map/nz.png',
  ]);
  const constellationsTexture = loader.load([
    '../assets/stars/constellations-cube-map/px.png',
    '../assets/stars/constellations-cube-map/nx.png',
    '../assets/stars/constellations-cube-map/py.png',
    '../assets/stars/constellations-cube-map/ny.png',
    '../assets/stars/constellations-cube-map/pz.png',
    '../assets/stars/constellations-cube-map/nz.png',
  ]);

  return (
    <>
      <SkyBox
        showConstellations={showConstellations}
        texture={showConstellations ? constellationsTexture : starsTexture} />
    </>
  );
};

export default Stars;
