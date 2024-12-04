"use client";
import React, { useState, useEffect, useLayoutEffect, useCallback, useMemo } from "react";
import useStore, { usePlanetStore, useCameraStore } from "../../store/store";
import DetailsMenu from "./DetailsMenu";
import ResetModal from "./ResetModal";
import FocusLock from "react-focus-lock";
import PlanetSelector from "./PlanetSelector";
import SpeedSelector from "./SpeedSelector";

const Menu = () => {
  // Split store subscriptions into granular selectors
  const simSpeed = useStore(state => state.simSpeed);
  const setSimSpeed = useStore(state => state.setSimSpeed);
  const setPrevSpeed = useStore(state => state.setPrevSpeed);
  const toggleFullscreen = useStore(state => state.toggleFullscreen);
  const showDetailsMenu = useStore(state => state.showDetailsMenu);
  const toggleDetailsMenu = useStore(state => state.toggleDetailsMenu);
  const viewOnlyMode = useStore(state => state.viewOnlyMode);
  const resetAllData = useStore(state => state.resetAllData);

  // Planet store selectors
  const selectedPlanet = usePlanetStore(state => state.selectedPlanet);
  const setSelectedPlanet = usePlanetStore(state => state.setSelectedPlanet);
  const displayLabels = usePlanetStore(state => state.displayLabels);
  const toggleDisplayLabels = usePlanetStore(state => state.toggleDisplayLabels);
  const planetsData = usePlanetStore(state => state.planetsData);
  const showResetPlanetModal = usePlanetStore(state => state.showResetPlanetModal);
  const showResetAllModal = usePlanetStore(state => state.showResetAllModal);
  const toggleResetAllModal = usePlanetStore(state => state.toggleResetAllModal);
  const orbitPaths = usePlanetStore(state => state.orbitPaths);
  const toggleOrbitPaths = usePlanetStore(state => state.toggleOrbitPaths);
  const moonsData = usePlanetStore(state => state.moonsData);
  const setSelectedMoon = usePlanetStore(state => state.setSelectedMoon);

  // Camera store selectors
  const toggleSatelliteCamera = useCameraStore(state => state.toggleSatelliteCamera);
  const isCameraTransitioning = useCameraStore(state => state.isCameraTransitioning);
  const autoRotate = useCameraStore(state => state.autoRotate);
  const switchToMoonCamera = useCameraStore(state => state.switchToMoonCamera);
  const switchToCustomCamera = useCameraStore(state => state.switchToCustomCamera);
  const switchToPlanetCamera = useCameraStore(state => state.switchToPlanetCamera);
  const activeCamera = useCameraStore(state => state.activeCamera);
  const resetCamera = useCameraStore(state => state.resetCamera);

  const [firstRender, setFirstRender] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [textClass, setTextClass] = useState("");
  const [displayText, setDisplayText] = useState("");

  // Memoize speed options array
  const speedOptions = useMemo(() => [
    { label: "-1 year /s", value: -31557600 },
    { label: "-1 month /s", value: -2629800 },
    { label: "-1 week /s", value: -604800 },
    { label: "-1 day /s", value: -86400 },
    { label: "-1 hour /s", value: -3600 },
    { label: "-1 minute /s", value: -60 },
    { label: "real time", value: 1 },
    { label: "1 minute /s", value: 60 },
    { label: "1 hour /s", value: 3600 },
    { label: "1 day /s", value: 86400 },
    { label: "1 week /s", value: 604800 },
    { label: "1 month /s", value: 2629800 },
    { label: "1 year /s", value: 31557600 },
  ], []);

  // Memoize handlers
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const handleResetBtn = useCallback(() => {
    toggleResetAllModal(true);
  }, [toggleResetAllModal]);

  const handleResetAll = useCallback(() => {
    resetAllData();
    toggleSatelliteCamera(false);
  }, [resetAllData, toggleSatelliteCamera]);

  const handleFullscreen = useCallback(() => {
    toggleFullscreen();
  }, [toggleFullscreen]);

  const handleSpeedChange = useCallback(event => {
    const newSpeed = parseInt(event, 10);
    setSimSpeed(newSpeed);
    setPrevSpeed(newSpeed);
  }, [setSimSpeed, setPrevSpeed]);

  const handlePlanetSelect = useCallback(planetName => {
    switchToPlanetCamera(planetName);
  }, [switchToPlanetCamera]);

  const handleMoonSelect = useCallback((planetName, moonName) => {
    const planet = planetsData[planetName];
    setSelectedPlanet(planet);
    setTimeout(() => {
      switchToMoonCamera(planetName, moonName);
    }, 100);
  }, [planetsData, setSelectedPlanet, switchToMoonCamera]);

  const handleSolarSystemSelect = useCallback(() => {
    resetCamera();
  }, [resetCamera]);

  const handleAsteroidBeltSelect = useCallback(() => {
    setSelectedPlanet(null);
    setSelectedMoon(null);
    toggleDetailsMenu(true);
    switchToCustomCamera("Asteroid Belt");
  }, [setSelectedPlanet, setSelectedMoon, toggleDetailsMenu, switchToCustomCamera]);

  // Handle camera changes
  useEffect(() => {
    if (!activeCamera) return;

    if (activeCamera.type === "planet") {
      setSelectedPlanet(planetsData[activeCamera.name]);
      toggleDetailsMenu(true);
    } else if (activeCamera.type === "moon") {
      const moon = moonsData[activeCamera.parentName]?.find(m => m.name === activeCamera.name);
      setSelectedMoon(moon);
      toggleDetailsMenu(true);
    } else if (activeCamera.name === "Asteroid Belt") {
      setSelectedPlanet(null);
      toggleDetailsMenu(true);
    }
  }, [
    activeCamera,
    planetsData,
    moonsData,
    setSelectedPlanet,
    setSelectedMoon,
    toggleDetailsMenu
  ]);

  // Initialize speed
  useLayoutEffect(() => {
    setPrevSpeed(1);
    setSimSpeed(1);
  }, [setPrevSpeed, setSimSpeed]);

  // Handle auto-rotate notifications
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      toggleMenu(true);
      return;
    }

    let mounted = true;

    const showNotification = () => {
      if (!mounted) return;

      setTextClass("slideIn");
      setDisplayText(`Auto-Rotate ${autoRotate ? "On" : "Off"}`);

      const timer1 = setTimeout(() => {
        if (mounted) setTextClass("slideOut");
      }, 1500);

      const timer2 = setTimeout(() => {
        if (mounted) setDisplayText("");
      }, 2500);

      return [timer1, timer2];
    };

    const timers = showNotification();

    return () => {
      mounted = false;
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [autoRotate, firstRender]);

  const disableSpeedToggle = useCallback(() => {
    if (activeCamera.type === "custom") return false;
    return isCameraTransitioning || !isMenuOpen;
  }, [activeCamera.type, isCameraTransitioning, isMenuOpen]);

  // Memoize the menu content
  const menuContent = useMemo(() => (
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
              isDisabled={!isMenuOpen}
              enableSubmenu={true}
            />
          </div>

          <div className='menu-item'>
            <label htmlFor='simSpeedSelect'>Simulation Speed</label>
            <SpeedSelector
              simSpeed={simSpeed}
              speedOptions={speedOptions}
              onSpeedSelect={handleSpeedChange}
              isDisabled={disableSpeedToggle()}
            />
          </div>
        </div>

        <div className='divider' />
        <div className='right-con'>
          <div className='menu-item'>
            <label htmlFor='orbitPathToggle'>Orbit Paths</label>
            <div className='switch' onClick={() => toggleOrbitPaths(!orbitPaths)}>
              <input
                id='orbitPathToggle'
                type='checkbox'
                checked={orbitPaths}
                disabled={!isMenuOpen}
                readOnly
              />
              <div className='slider round' />
            </div>
          </div>

          <div className='menu-item'>
            <label htmlFor='labelToggle'>Labels</label>
            <div className='switch' onClick={() => toggleDisplayLabels(!displayLabels)}>
              <input
                id='labelToggle'
                type='checkbox'
                checked={displayLabels}
                disabled={!isMenuOpen}
                readOnly
              />
              <div className='slider round' />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`details-menu ${(selectedPlanet || activeCamera.name === "Sun" || activeCamera.name === "Asteroid Belt") &&
          !isCameraTransitioning &&
          showDetailsMenu
          ? "open"
          : "closed"
          }`}
        key={activeCamera.name}
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
    </div>
  ), [
    showResetAllModal,
    showResetPlanetModal,
    textClass,
    displayText,
    viewOnlyMode,
    isMenuOpen,
    planetsData,
    moonsData,
    activeCamera,
    simSpeed,
    speedOptions,
    orbitPaths,
    displayLabels,
    selectedPlanet,
    isCameraTransitioning,
    showDetailsMenu,
    handleResetBtn,
    handleFullscreen,
    toggleMenu,
    handlePlanetSelect,
    handleMoonSelect,
    handleSolarSystemSelect,
    handleAsteroidBeltSelect,
    handleSpeedChange,
    disableSpeedToggle,
    toggleOrbitPaths,
    toggleDisplayLabels,
    handleResetAll
  ]);

  return menuContent;
};

export default React.memo(Menu);