import { Suspense, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';
import useStore from '../store/store';

function SkyBox({ texture }) {
  const { scene } = useThree();
  const { toggleBackgroundLoaded } = useStore();

  useEffect(() => {
    scene.background = texture;
    toggleBackgroundLoaded(true);
  }, [texture]);

  return null;
}

const Stars = () => {
  const { showConstellations } = useStore();
  const [starsTexture, setStarsTexture] = useState();

  useEffect(() => {
    const loader = new CubeTextureLoader();
    const texture = loader.load([
      '../assets/stars/stars-cube-map/high-res/px.png',
      '../assets/stars/stars-cube-map/high-res/nx.png',
      '../assets/stars/stars-cube-map/high-res/py.png',
      '../assets/stars/stars-cube-map/high-res/ny.png',
      '../assets/stars/stars-cube-map/high-res/pz.png',
      '../assets/stars/stars-cube-map/high-res/nz.png',
    ]);

    // const constellationsTexture = loader.load([
    //   '../assets/stars/constellations-cube-map/px.png',
    //   '../assets/stars/constellations-cube-map/nx.png',
    //   '../assets/stars/constellations-cube-map/py.png',
    //   '../assets/stars/constellations-cube-map/ny.png',
    //   '../assets/stars/constellations-cube-map/pz.png',
    //   '../assets/stars/constellations-cube-map/nz.png',
    // ]);

    setStarsTexture(texture);

    return () => {
      texture.dispose();
    };
  }, [showConstellations]);

  return (
    <Suspense fallback={null}>
      <SkyBox texture={starsTexture} />
    </Suspense>
  );
};

export default Stars;
