"use client";
import React, { useState, useLayoutEffect } from "react";
import useStore, { usePlanetStore, useCameraStore } from "../../store/store";
import DetailsMenu from "./DetailsMenu";
import ResetModal from "./ResetModal";
import FocusLock from 'react-focus-lock';

const Menu = () => {
  const {
    simSpeed, setSimSpeed, prevSpeed, setPrevSpeed, fullscreen, toggleFullscreen,
    orbitPaths, toggleOrbitPaths, showDetailsMenu
  } = useStore();
  const {
    selectedPlanet, setSelectedPlanet, displayLabels, toggleDisplayLabels, planetsData,
    resetPlanetsData, showResetPlanetModal, showResetAllModal, toggleResetAllModal
  } = usePlanetStore();
  const { setTriggerReset, toggleSatelliteCamera, isCameraTransitioning, satelliteCamera } = useCameraStore();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleResetBtn = () => {
    toggleResetAllModal(true);
  };

  const handleResetAll = () => {
    setTriggerReset(true);
    resetPlanetsData();
    toggleSatelliteCamera(false);
  };

  const resetCamera = () => {
    setTriggerReset(true);
  };

  const handleFullscreen = () => {
    toggleFullscreen();
  };

  const speedOptions = [
    { label: "-1 year /s", value: -31557600 },
    { label: "-1 month /s", value: -2629800 },
    { label: "-1 week /s", value: -604800 },
    { label: "-1 day /s", value: -86400 },
    { label: "-1 hour /s", value: -3600 },
    { label: "-1 minute /s", value: -60 },
    { label: "Realtime", value: 1 },
    { label: "1 minute /s", value: 60 },
    { label: "1 hour /s", value: 3600 },
    { label: "1 day /s", value: 86400 },
    { label: "1 week /s", value: 604800 },
    { label: "1 month /s", value: 2629800 },
    { label: "1 year /s", value: 31557600 },
  ];

  const handleSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value, 10);
    setSimSpeed(newSpeed);
  };

  const handlePlanetChange = (e) => {
    const newSelectedPlanetName = e.target.value;
    if (newSelectedPlanetName === 'reset-camera') {
      resetCamera();
      setSelectedPlanet(null);
    } else {
      const newSelectedPlanet = planetsData[newSelectedPlanetName];
      setSelectedPlanet(newSelectedPlanet);
    }
  };

  useLayoutEffect(() => {
    setPrevSpeed(1);
    setSimSpeed(1);
  }, []);

  return (

    <div className={`menu-wrapper ${showResetAllModal || showResetPlanetModal ? "disabled" : "enabled"}`}>
      {/* Reset button */}
      <button className="reset-all-btn btn" onClick={handleResetBtn} />
      {/* Fullscreen button */}
      <button className="fullscreen-btn btn" onClick={handleFullscreen} />

      {/* Bottom menu */}
      <div className={`bottom-menu ${isMenuOpen ? "open" : "closed"}`}>
        <button onClick={toggleMenu} className="menu-toggle-btn btn" />

        <div className="left-con">
          {/* Dropdown for selecting planets */}
          <div className="menu-item">
            <label htmlFor="planetSelection">Select a Planet</label>
            <select
              id="planetSelection"
              onChange={handlePlanetChange}
              value={selectedPlanet?.name || "Select a Planet"}
              disabled={!isMenuOpen}
            >
              <option value="reset-camera">Solar System</option>
              {Object.keys(planetsData).map((planetName) => (
                <option key={planetName} value={planetName}>
                  {planetName}
                </option>
              ))}
            </select>
          </div>
          {/* Dropdown for sim speed */}
          <div className="menu-item">
            <label htmlFor="simSpeedSelect">Simulation Speed</label>
            <select
              id="simSpeedSelect"
              onChange={handleSpeedChange}
              value={isCameraTransitioning ? prevSpeed : simSpeed}
              disabled={isCameraTransitioning || !isMenuOpen}
            >
              {speedOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Divider */}
        <div className="divider" />
        <div className="right-con">
          <div className="menu-item">
            <label htmlFor="orbitPathToggle">Orbit Paths</label>
            <div className="switch" onClick={() => toggleOrbitPaths(!orbitPaths)} disabled={!isMenuOpen}>
              <input
                id="orbitPathToggle"
                type="checkbox"
                checked={orbitPaths}
                onChange={() => { }}
                style={{ display: "none" }}
              />
              <div className="slider round"></div>
            </div>
          </div>

          <div className="menu-item">
            <label htmlFor="labelToggle">Labels</label>
            <div className="switch" onClick={() => toggleDisplayLabels(!displayLabels)} disabled={!isMenuOpen}>
              <input
                id="labelToggle"
                type="checkbox"
                checked={displayLabels}
                onChange={() => { }}
                style={{ display: "none" }}
              />
              <div className="slider round"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Details menu */}
      <div
        className={`details-menu ${selectedPlanet &&
          (!isCameraTransitioning && showDetailsMenu && satelliteCamera || selectedPlanet?.name === "Sun")
          ? "open"
          : "closed"
          }`}
        key={selectedPlanet?.name}
      >
        <div className="details-menu-inner">
          <DetailsMenu />
        </div>
      </div>

      {(showResetPlanetModal || showResetAllModal) && (
        <>
          <div className="backdrop" />
          <FocusLock>
            <ResetModal type={showResetPlanetModal ? "single" : "all"} handleResetAll={handleResetAll} />
          </FocusLock>
        </>
      )}
    </div>
  );
};

export default Menu;
