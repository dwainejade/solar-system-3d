"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import useStore, { usePlanetStore, useCameraStore } from "../../store/store";
import DetailsMenu from "./DetailsMenu";
import ResetModal from "./ResetModal";
import FocusLock from "react-focus-lock";
import PlanetSelector from "./PlanetSelector";
import SpeedSelector from "./SpeedSelector";

const Menu = () => {
  const {
    simSpeed,
    setSimSpeed,
    prevSpeed,
    setPrevSpeed,
    toggleFullscreen,
    showDetailsMenu,
    toggleDetailsMenu,
    viewOnlyMode,
    resetAllData,
  } = useStore();
  const {
    selectedPlanet,
    setSelectedPlanet,
    displayLabels,
    toggleDisplayLabels,
    planetsData,
    resetPlanetsData,
    showResetPlanetModal,
    showResetAllModal,
    toggleResetAllModal,
    orbitPaths,
    toggleOrbitPaths,
    moonsData,
    setSelectedMoon,
    selectedMoon,
  } = usePlanetStore();
  const {
    toggleSatelliteCamera,
    isCameraTransitioning,
    satelliteCamera,
    autoRotate,
    isZoomingToSun,
    switchToMoonCamera,
    switchToCustomCamera,
    switchToPlanetCamera,
    activeCamera,
    resetCamera,
  } = useCameraStore();

  const [firstRender, setFirstRender] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [textClass, setTextClass] = useState("");
  const [displayText, setDisplayText] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredPlanetName, setHoveredPlanetName] = useState(null); // Track which planet's moons are displayed

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleResetBtn = () => {
    toggleResetAllModal(true);
  };

  const handleResetAll = () => {
    resetAllData();
    toggleSatelliteCamera(false);
  };

  const handleFullscreen = () => {
    toggleFullscreen();
  };

  useEffect(() => {
    setIsDropdownOpen(false);
    if (activeCamera.type === "planet") {
      setSelectedPlanet(planetsData[activeCamera.name]);
      // setSelectedMoon(null);
      toggleDetailsMenu(true);
    }

    if (activeCamera.type === "moon") {
      // setSelectedPlanet(null);
      const moon = moonsData[activeCamera.parentName]?.find(m => m.name === activeCamera.name);
      setSelectedMoon(moon);
      toggleDetailsMenu(true);
    }

    if (activeCamera.name === "Asteroid Belt") {
      setSelectedPlanet(null);
      // setSelectedMoon(null);
      toggleDetailsMenu(true);
    }
  }, [activeCamera]);

  const speedOptions = [
    { label: "-1 year /s", value: -31557600 },
    { label: "-1 month /s", value: -2629800 },
    { label: "-1 week /s", value: -604800 },
    { label: "-1 day /s", value: -86400 },
    { label: "-1 hour /s", value: -3600 },
    { label: "-1 minute /s", value: -60 },
    { label: "Real-time", value: 1 },
    { label: "1 minute /s", value: 60 },
    { label: "1 hour /s", value: 3600 },
    { label: "1 day /s", value: 86400 },
    { label: "1 week /s", value: 604800 },
    { label: "1 month /s", value: 2629800 },
    { label: "1 year /s", value: 31557600 },
  ];

  const handleSpeedChange = event => {
    // const newSpeed = parseInt(event.target.value, 10);
    // setSimSpeed(newSpeed);
    // setPrevSpeed(newSpeed);

    const newSpeed = parseInt(event, 10);
    setSimSpeed(newSpeed);
    setPrevSpeed(newSpeed);
  };

  const handlePlanetSelect = planetName => {
    switchToPlanetCamera(planetName);
  };

  const handleMoonSelect = (planetName, moonName) => {
    const planet = planetsData[planetName];
    setSelectedPlanet(planet);
    setTimeout(() => {
      switchToMoonCamera(planetName, moonName);
    }, 100);
  };

  const handleSolarSystemSelect = () => {
    resetCamera();
  };

  const handleAsteroidBeltSelect = () => {
    setSelectedPlanet({
      name: "Asteroid Belt",
    });
    setSelectedPlanet(null);
    setSelectedMoon(null);
    toggleDetailsMenu(true);
    switchToCustomCamera("Asteroid Belt");
    setIsDropdownOpen(false);
  };

  useLayoutEffect(() => {
    setPrevSpeed(1);
    setSimSpeed(1);
  }, []);

  useEffect(() => {
    // do not show on initial render
    if (firstRender) {
      setFirstRender(false);
      toggleMenu(true);
      return;
    }

    setTextClass("slideIn");
    setDisplayText(`Auto-Rotate ${autoRotate ? "On" : "Off"}`);
    const timer1 = setTimeout(() => {
      setTextClass("slideOut");
    }, 1500); // display text for 1.5 seconds

    const timer2 = setTimeout(() => {
      setDisplayText("");
    }, 2500); // Total duration

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [autoRotate]);

  const disableSpeedToggle = () => {
    if (activeCamera.type === "custom") return false;
    else if (isCameraTransitioning || !isMenuOpen) return true;
    return false;
  };

  return (
    <div className={`menu-wrapper ${showResetAllModal || showResetPlanetModal ? "disabled" : "enabled"}`}>
      <div className={`auto-rotate-text ${textClass}`}>{displayText}</div>

      {!viewOnlyMode && <button className='reset-all-btn btn' onClick={handleResetBtn} />}
      <button className='fullscreen-btn btn' onClick={handleFullscreen} />

      <div className={`bottom-menu ${isMenuOpen ? "open" : "closed"}`}>
        <button onClick={toggleMenu} className='menu-toggle-btn btn' />

        <div className='left-con'>
          <div className='menu-item'>
            <label>Select a Planet</label>
            <PlanetSelector
              planetsData={planetsData}
              moonsData={moonsData}
              activeCamera={activeCamera}
              onPlanetSelect={handlePlanetSelect}
              onMoonSelect={handleMoonSelect}
              onSolarSystemSelect={handleSolarSystemSelect}
              onAsteroidBeltSelect={handleAsteroidBeltSelect}
            />
          </div>

          <div className='menu-item'>
            <label htmlFor='simSpeedSelect'>Simulation Speed</label>
            <SpeedSelector simSpeed={simSpeed} speedOptions={speedOptions} onSpeedSelect={handleSpeedChange} disable={disableSpeedToggle} />
            {/* <select
              id='simSpeedSelect'
              onChange={handleSpeedChange}
              value={simSpeed === 0 ? prevSpeed : simSpeed}
              disabled={disableSpeedToggle()}
            >
              {speedOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select> */}
          </div>
        </div>

        <div className='divider' />
        <div className='right-con'>
          <div className='menu-item'>
            <label htmlFor='orbitPathToggle'>Orbit Paths</label>
            <div className='switch' onClick={() => toggleOrbitPaths(!orbitPaths)} disabled={!isMenuOpen}>
              <input id='orbitPathToggle' type='checkbox' checked={orbitPaths} onChange={() => {}} style={{ display: "none" }} />
              <div className='slider round'></div>
            </div>
          </div>

          <div className='menu-item'>
            <label htmlFor='labelToggle'>Labels</label>
            <div className='switch' onClick={() => toggleDisplayLabels(!displayLabels)} disabled={!isMenuOpen}>
              <input id='labelToggle' type='checkbox' checked={displayLabels} onChange={() => {}} style={{ display: "none" }} />
              <div className='slider round'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Details menu */}
      <>
        <div
          className={`details-menu ${
            selectedPlanet &&
            ((!isCameraTransitioning && showDetailsMenu && satelliteCamera) || (selectedPlanet?.name === "Sun" && !isZoomingToSun))
              ? "open"
              : "closed"
          }`}
          key={selectedPlanet?.name}
        >
          <div className='details-menu-inner'>
            {(activeCamera.type === "planet" ||
              activeCamera.type === "moon" ||
              activeCamera.name === "Asteroid Belt" ||
              activeCamera.name === "Sun") && <DetailsMenu />}
          </div>
        </div>

        {(showResetPlanetModal || showResetAllModal) && (
          <>
            <div className='backdrop' />
            <FocusLock>
              <ResetModal type={showResetPlanetModal ? "single" : "all"} handleResetAll={handleResetAll} />
            </FocusLock>
          </>
        )}
      </>
    </div>
  );
};

export default Menu;
