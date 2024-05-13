import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';
import useStore from '../store/store';

function SkyBox({ texture }) {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = texture;
  }, [texture]);

  return null;
}

const Stars = () => {
  const { showConstellations } = useStore();
  const [starsTexture, setStarsTexture] = useState();

  useEffect(() => {
    const loader = new CubeTextureLoader();
    const texture = loader.load([
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

    setStarsTexture(showConstellations ? constellationsTexture : texture);

    return () => {
      texture.dispose();
      constellationsTexture.dispose();
    };
  }, [showConstellations]);

  return (
    <>
      <SkyBox
        showConstellations={showConstellations}
        texture={starsTexture} />
    </>
  );
};

export default Stars;
