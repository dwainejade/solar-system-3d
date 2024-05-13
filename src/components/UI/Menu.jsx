"use client";
import React, { useState, useLayoutEffect } from "react";
import useStore, { usePlanetStore, useCameraStore } from "../../store/store";
import DetailsMenu from "./DetailsMenu"
import ResetModal from "./ResetModal";

const Menu = () => {
  const { simSpeed, setSimSpeed, prevSpeed, setPrevSpeed, fullscreen, toggleFullscreen, orbitPaths, toggleOrbitPaths, showDetailsMenu, toggleDetailsMenu } = useStore();
  const { selectedPlanet, setSelectedPlanet, displayLabels, toggleDisplayLabels, planetsData, resetPlanetsData, showResetPlanetModal, showResetAllModal, toggleResetPlanetModal, toggleResetAllModal } = usePlanetStore();
  const { setTriggerReset, toggleSatelliteCamera, isCameraTransitioning, toggleCameraTransitioning } = useCameraStore()

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleResetBtn = () => {
    toggleResetAllModal(true)
  }
  const handleResetAll = () => {
    setTriggerReset(true)
    resetPlanetsData()
    toggleSatelliteCamera(false)
  };
  const resetCamera = () => {
    setTriggerReset(true)
  }

  const handleFullscreen = () => {
    toggleFullscreen()
  }

  const speedOptions = [
    // { label: "-5 year /s", value: -157788000 },
    { label: "-1 year /s", value: -31557600 },
    // { label: "-3 month /s", value: -7889400 },
    { label: "-1 month /s", value: -2629800 },
    // { label: "-2 week /s", value: -1209600 },
    { label: "-1 week /s", value: -604800 },
    { label: "-1 day /s", value: -86400 },
    // { label: "-4 hour /s", value: -14400 },
    { label: "-1 hour /s", value: -3600 },
    // { label: "-30 minute /s", value: -1800 },
    { label: "-1 minute /s", value: -60 },
    { label: "Realtime", value: 1 },
    { label: "1 minute /s", value: 60 },
    // { label: "30 min /s", value: 1800 },
    { label: "1 hour /s", value: 3600 },
    // { label: "4 hour /s", value: 14400 },
    { label: "1 day /s", value: 86400 },
    { label: "1 week /s", value: 604800 },
    // { label: "2 week /s", value: 1209600 },
    { label: "1 month /s", value: 2629800 },
    // { label: "3 month /s", value: 7889400 },
    { label: "1 year /s", value: 31557600 },
    // { label: "5 year /s", value: 157788000 },
  ];

  // Adjust this function to handle dropdown changes
  const handleSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value, 10);
    setSimSpeed(newSpeed);
  };

  // Handle planet selection change
  const handlePlanetChange = e => {
    const newSelectedPlanetName = e.target.value;
    if (newSelectedPlanetName === 'reset-camera') {
      resetCamera();
      setSelectedPlanet(null);
    } else {
      const newSelectedPlanet = planetsData[newSelectedPlanetName];
      setSelectedPlanet(newSelectedPlanet);
    };
  }

  useLayoutEffect(() => {
    setPrevSpeed(1)
    setSimSpeed(1)
  }, [])
  // console.log(isCameraTransitioning)

  return (
    <div className="menu-wrapper">
      {/* reset button */}
      <button className="reset-all-btn btn" onClick={handleResetBtn} />
      {/* fullscreen button */}
      <button className="fullscreen-btn btn" onClick={handleFullscreen} />
      {/* <button className="satelliteCamera-btn btn" onClick={() => toggleSatelliteCamera(!satelliteCamera)}
        style={{ height: "30px", width: "30px", position: "absolute", left: "10px", bottom: "10px" }}
      >{satelliteCamera ? "ON" : "OFF"}</button> */}

      {/* Bottom menu */}
      <div className={`bottom-menu ${isMenuOpen ? "open" : "closed"}`}>
        <button onClick={toggleMenu} className='menu-toggle-btn btn'>

        </button>

        <div className="left-con">

          {/* Dropdown for selecting planets */}
          <div className='menu-item'>
            <label htmlFor='planetSelection'>Select a Planet</label>
            <select id='planetSelection' onChange={handlePlanetChange} value={selectedPlanet?.name || "Select a Planet"}>
              <option value='reset-camera'>
                Solar System
              </option>
              {Object.keys(planetsData).map(planetName => (
                <option key={planetName} value={planetName}>
                  {planetName}
                </option>
              ))}
            </select>
          </div>
          {/* Dropdown for sim speed */}
          <div className="menu-item">
            <label htmlFor="simSpeedSelect">Simulation Speed</label>
            <select id="simSpeedSelect" onChange={handleSpeedChange}
              value={isCameraTransitioning ? prevSpeed : simSpeed} disabled={isCameraTransitioning}>
              {speedOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

        </div>
        {/* divider */}
        <div className="divider" />
        <div className="right-con">
          <div className="menu-item">
            <label htmlFor="orbitPathToggle">Orbit Paths</label>
            <div className="switch" onClick={() => toggleOrbitPaths(!orbitPaths)}>
              <input
                id="orbitPathToggle"
                type="checkbox"
                checked={orbitPaths}
                onChange={() => { }}
                style={{ display: 'none' }}
              />
              <div className="slider round"></div>
            </div>

          </div>

          <div className="menu-item">
            <label htmlFor="labelToggle">Labels</label>
            <div className="switch" onClick={() => toggleDisplayLabels(!displayLabels)}>
              <input
                id="labelToggle"
                type="checkbox"
                checked={displayLabels}
                onChange={() => { }}
                style={{ display: 'none' }}
              />
              <div className="slider round"></div>
            </div>
          </div>

          {/* <div className='menu-item'>
            <label htmlFor='fullscreenToggle'>Toggle Fullscreen:</label>
            <button id='fullscreenToggle' onClick={toggleFullscreen} className='btn'>
              {fullscreen ? "ON" : "OFF"}
            </button>
          </div> */}
          {/* <div className='menu-item'>
            <label htmlFor='constellationsToggle'>Toggle Constellations:</label>
            <button id='constellationsToggle' className='btn' onClick={toggleConstellations}>
              {showConstellations ? "ON" : "OFF"}
            </button>
          </div> */}
        </div>
      </div>

      {/* Details menu */}
      <div className={`details-menu ${selectedPlanet && !isCameraTransitioning && showDetailsMenu ? 'open' : 'closed'}`} key={selectedPlanet?.name}>
        <div className="details-menu-inner" >
          <DetailsMenu />
        </div>
      </div>

      {(showResetPlanetModal || showResetAllModal) &&
        <ResetModal type={showResetPlanetModal ? 'single' : 'all'} handleResetAll={handleResetAll} />}
    </div>
  );
};

export default Menu;
