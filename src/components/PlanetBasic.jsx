import React, { useRef, forwardRef, useState, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import { distanceScaleFactor, sizeScaleFactor, rotationSpeedScaleFactor } from "../data/planetsData";
import OrbitPath from "./OrbitPath";
import SatelliteCamera from "./SatelliteCamera";
import Moon from "./Moon";
import Labels from "./Labels";
import { moonsData } from "@/data/moonsData";
import { earthAtmosphereShader } from "../shaders/atmosphere";
import Rings from "./Rings";
// import SatelliteModel from "@/components/models/Satellite";
import earthVertexShader from '../shaders/earth/vertex.glsl';
import earthFragmentShader from '../shaders/earth/fragment.glsl';

const Planet = forwardRef(({ name = 'Earth', textures }, ref) => {
  const { planetsData } = usePlanetStore();
  const bodyData = planetsData[name];

  const mergedData = { ...bodyData };
  const {
    mass,
    radius,
    orbitalOrigin,
    orbitalRadius,
    orbitalSpeed,
    orbitalPeriod,
    orbitalInclination,
    axialTilt,
    rotationPeriod,
    surfaceTemp,
    color,
    gravity,
    initialOrbitalAngle,
    interestPoints
  } = mergedData;

  const { simSpeed, toggleDetailsMenu } = useStore();
  const { planetAngles, updatePlanetPosition, selectedPlanet, setSelectedPlanet, displayLabels, selectedMoon, setSelectedMoon, orbitPaths } = usePlanetStore();
  const { isSurfaceCameraActive, satelliteCamera, toggleSatelliteCamera, setAutoRotate, autoRotate } = useCameraStore();
  const localRef = ref || useRef();
  const localAngleRef = useRef(planetAngles[name] || 0);
  const cloudsRef = useRef();

  const [texturesLoaded, setTexturesLoaded] = useState(false);

  const scaledOrbitalRadius = orbitalRadius * (isSurfaceCameraActive ? .0001 : distanceScaleFactor);
  const scaledRadius = radius * sizeScaleFactor;
  let rotationSpeed = rotationPeriod ? (2 * Math.PI) / (rotationPeriod * 3600) : 0;
  rotationSpeed *= rotationSpeedScaleFactor;

  const isPlanetSelected = selectedPlanet && selectedPlanet.name === name;
  const detailLevel = isPlanetSelected ? 64 : 32;

  const [isDragging, setIsDragging] = useState(false);
  const initialClickPosition = useRef({ x: 0, y: 0 });
  const meshRef = useRef(null);

  const [scale, setScale] = useState(scaledRadius);
  const textSize = useRef(1);
  const [showTextures, setShowTextures] = useState(false);
  const textureDisplayDistance = 500;
  const [orbitPathOpacity, setOrbitPathOpacity] = useState(1);
  // const [satelliteZRotation, setSatelliteZRotation] = useState(0);

  const earthParameters = {}
  earthParameters.atmosphereDayColor = '#0088FF'
  earthParameters.atmosphereTwilightColor = '#FF9D00'

  const sunDirectionRef = useRef(new THREE.Vector3(0, 0, 1));
  const earthMaterial = new THREE.ShaderMaterial({
    vertexShader: earthVertexShader,
    fragmentShader: earthFragmentShader,
    uniforms: {
      uDayTexture: new THREE.Uniform(textures.map),
      uNightTexture: new THREE.Uniform(textures.night),
      uSunDirection: { value: sunDirectionRef.current },
      uAtmosphereDayColor: new THREE.Uniform(new THREE.Color(earthParameters.atmosphereDayColor)),
      uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color(earthParameters.atmosphereTwilightColor))
    }
  });

  useFrame((state, delta) => {
    const adjustedDelta = delta * simSpeed;

    const planetOrbitalSpeed = (2 * Math.PI) / (orbitalPeriod * 24 * 60 * 60);

    if (localAngleRef.current === 0) {
      localAngleRef.current = initialOrbitalAngle * (Math.PI / 180);
    } else {
      localAngleRef.current -= planetOrbitalSpeed * adjustedDelta;
    }
    const x = scaledOrbitalRadius * Math.cos(localAngleRef.current);
    const z = scaledOrbitalRadius * Math.sin(localAngleRef.current);

    if (localRef.current) {
      const inclination = orbitalInclination * (Math.PI / 180);
      const y = Math.sin(inclination) * scaledOrbitalRadius * Math.sin(localAngleRef.current);

      localRef.current.position.set(x, y, z);
      updatePlanetPosition(name, { x, y, z });

      if (rotationPeriod) {
        const rotationPeriodInSeconds = rotationPeriod * 3600;
        const rotationSpeed = (2 * Math.PI) / rotationPeriodInSeconds;
        const rotationIncrement = rotationSpeed * adjustedDelta;

        const yAxis = new THREE.Vector3(0, 1, 0);
        meshRef.current.rotateOnAxis(yAxis, rotationIncrement);

        if (localRef.current.rotation.y >= 2 * Math.PI && isPlanetSelected) {
          localRef.current.rotation.y %= 2 * Math.PI;
        }

        if (cloudsRef.current) {
          cloudsRef.current.rotation.y += rotationIncrement * 1.2;
        }
      }

      // Update the sun direction
      sunDirectionRef.current.set(0, 0, 0).sub(localRef.current.position).normalize();
      if (name === "Earth" && meshRef.current.material.uniforms?.uSunDirection) {
        meshRef.current.material.uniforms.uSunDirection.value.copy(sunDirectionRef.current);
      }

      const distance = localRef.current.position.distanceTo(state.camera.position);
      if (distance / 100 <= scaledRadius) {
        setScale(scaledRadius);
      } else {
        setScale(distance / 100);
      }
      setShowTextures(distance < textureDisplayDistance);
      if (name === "Earth") {
        console.log(distance)
      }
      const maxDistance = scaledRadius * 100;
      const minDistance = scaledRadius * 10;
      const opacity = Math.max(0, Math.min(1, (distance - minDistance) / (maxDistance - minDistance)));
      setOrbitPathOpacity(opacity);

      if (textSize.current) {
        textSize.current = distance * 0.02;
      }
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.order = 'YXZ';
      meshRef.current.rotation.y = 0;
      meshRef.current.rotation.x = THREE.MathUtils.degToRad(axialTilt);
    }
  }, [axialTilt, selectedPlanet]);

  // useEffect(() => {
  //   const specificDate = new Date(2023, 0, 1, 1, 45, 30);
  //   const hourOfDay = specificDate.getHours();
  //   const minuteOfHour = specificDate.getMinutes();
  //   const secondOfMinute = specificDate.getSeconds();

  //   const currentTimeOfDayInSeconds = hourOfDay * 3600 + minuteOfHour * 60 + secondOfMinute;
  //   const rotationPeriodInSeconds = rotationPeriod * 3600;
  //   const initialRotationFraction = currentTimeOfDayInSeconds / rotationPeriodInSeconds;
  //   const initialRotationAngleRadians = initialRotationFraction * 2 * Math.PI;

  //   if (meshRef.current) {
  //     meshRef.current.rotation.order = 'YXZ';
  //     meshRef.current.rotation.y = initialRotationAngleRadians;
  //     meshRef.current.rotation.x = THREE.MathUtils.degToRad(axialTilt);
  //   }
  // }, [rotationPeriod, axialTilt]);

  const handleClick = e => {
    e.stopPropagation();
    if (isDragging) return;
    toggleDetailsMenu(true);
    setSelectedMoon(null);
    if (isPlanetSelected) return;
    setSelectedPlanet(mergedData);
  };

  const handlePointerDown = e => {
    e.stopPropagation();
    setIsDragging(false);
    initialClickPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = e => {
    const distanceMoved = Math.sqrt(
      Math.pow(e.clientX - initialClickPosition.current.x, 2) + Math.pow(e.clientY - initialClickPosition.current.y, 2)
    );
    if (distanceMoved > 5) {
      setIsDragging(true);
    }
  };

  const handlePointerUp = e => {
    setIsDragging(false);
  };
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerOver = e => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    setIsHovered(true);
  };

  const handlePointerOut = e => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
    setIsHovered(false);
  };

  const handleDoubleClick = e => {
    e.stopPropagation();
    setAutoRotate(!autoRotate);
  };

  const moons = moonsData[name] || [];

  return (
    <>
      {isPlanetSelected && !selectedMoon && localRef.current &&
        <SatelliteCamera target={localRef.current} targetName={name} size={scaledRadius} satelliteCamera={satelliteCamera} toggleSatelliteCamera={toggleSatelliteCamera} />
      }

      <group ref={localRef}>
        <mesh
          visible={false}
          onClick={handleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onDoubleClick={handleDoubleClick}
        >
          {isPlanetSelected
            ? <sphereGeometry args={[scaledRadius, 16, 16]} />
            : <sphereGeometry args={[scale * 3, 8, 8]} />
          }
        </mesh>

        <mesh
          ref={meshRef}
          key={isPlanetSelected ? name + '-textured' : name + '-basic'}
        >
          <sphereGeometry args={[(isPlanetSelected ? scaledRadius : scale), detailLevel, detailLevel]} />
          {(!isPlanetSelected && texturesLoaded) ?
            <meshBasicMaterial color={color} />
            :
            <>
              {name === "Earth" && isPlanetSelected &&
                <>
                  <shaderMaterial
                    attach='material'
                    args={[earthMaterial]}
                  />
                  <mesh ref={cloudsRef} key={`${name}-cloud_texture`} >
                    <sphereGeometry args={[Math.min(scaledRadius * 1.01), detailLevel, detailLevel]} />
                    <meshStandardMaterial alphaMap={textures?.clouds} transparent opacity={1} />
                  </mesh>
                </>
              }
              <meshStandardMaterial
                metalness={0.6}
                roughness={0.8}
                map={textures?.map}
                onBuild={() => setTexturesLoaded(true)}
              />
              {/* {name === "Earth" &&
                <>
                  <mesh key={`${name}-atmosphere`}>
                    <sphereGeometry args={[scaledRadius * 1.035, detailLevel, detailLevel]} />
                    <shaderMaterial args={[earthAtmosphereShader]} />
                  </mesh>
                </>} */}
            </>
          }
        </mesh>

        {name === "Saturn" && showTextures && (
          <Rings innerRadius={scaledRadius * 1.2} outerRadius={scaledRadius * 2} height={0} rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]} texture={textures?.ringTexture} detail={detailLevel * 2} />
        )}
        {name === "Uranus" && showTextures && (
          <Rings innerRadius={scaledRadius * 1.5} outerRadius={scaledRadius * 1.9} height={0} texture={textures?.ringTexture} detail={detailLevel * 2} rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]} />
        )}

        {/* {name === "Earth" && isPlanetSelected &&
  <Suspense fallback={null}>
    <group ref={satelliteRef} >
      <SatelliteModel scale={scaledRadius * .001} zRotation={satelliteZRotation} />
    </group>
  </Suspense>
} */}

        {(displayLabels && !isPlanetSelected || isHovered && !isPlanetSelected) && (
          <Labels key={name} text={name} size={textSize?.current} position={[0, scale * 1.2 + textSize?.current, 0]} color={color} handleClick={handleClick} handlePointerDown={handlePointerDown} font={'../assets/fonts/Termina_Black.ttf'} />
        )}

        {(displayLabels && isPlanetSelected) && (
          <Html
            as='span'
            wrapperClass='label-wrapper'
            center
            position-y={isPlanetSelected ? scale + scale * 0.25 : scale * 4}
            zIndexRange={[100, 0]}
            style={{ pointerEvents: 'none' }}
          >
            <span
              className='planet-label'
              style={{ color }}
              onClick={handleClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
            >
              {name}
            </span>
          </Html>
        )}

        {isPlanetSelected && moons.map((moon, index) => {
          const shouldAlignWithTilt = ["Saturn", "Uranus"].includes(name);

          return (
            <group key={`${name}-moon-group-${index}`} rotation={shouldAlignWithTilt ? [THREE.MathUtils.degToRad(axialTilt), 0, 0] : [0, 0, 0]}>
              <Moon
                key={`${name}-moon-${index}`}
                moonData={moon}
                planetPosition={localRef.current?.position}
              />
            </group>
          );
        })}
      </group>

      {orbitPaths && (
        <OrbitPath origin={orbitalOrigin} radius={scaledOrbitalRadius} orbitalInclination={orbitalInclination} color={color} name={name + "-orbit-path"} opacity={isPlanetSelected ? orbitPathOpacity : .5} hiRes={isPlanetSelected} />
      )}
    </>

  );
});

export default Planet;