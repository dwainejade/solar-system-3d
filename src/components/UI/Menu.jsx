"use client";
import React, { useMemo, useState } from "react";
import useStore, { usePlanetStore, useCameraStore } from "../../store/store";
import Details from "./PlanetDetails"

const Menu = () => {
  const { simSpeed, setSimSpeed, showConstellations, toggleConstellations, fullscreen, toggleFullscreen, orbitPaths, toggleOrbitPaths, isEditing, setIsEditing } = useStore();
  const { selectedPlanet, setSelectedPlanet, selectedMoon, displayLabels, toggleDisplayLabels, updateSelectedPlanet, planetsData, resetPlanetsData } = usePlanetStore();
  const { setTriggerReset } = useCameraStore()

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const resetCamera = () => {
    // setTriggerReset(true)
    resetPlanetsData()
  };

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
  // Finding the index of the current simulation speed in the speedOptions array
  const currentSpeedIndex = useMemo(
    () => speedOptions.findIndex(option => option.value === simSpeed),
    [simSpeed]
  );

  // Adjust this function to handle dropdown changes
  const handleSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value, 10);
    setSimSpeed(newSpeed);
  };

  // Handle planet selection change
  const handlePlanetChange = e => {
    // Update selected planet based on user selection
    const newSelectedPlanetName = e.target.value;
    const newSelectedPlanet = planetsData[newSelectedPlanetName];
    setSelectedPlanet(newSelectedPlanet); // Update the selected planet in the store
  };


  return (
    <div className="menu-wrapper">
      {/* reset button */}
      <button className="reset-all-btn btn" onClick={resetCamera} />
      {/* fullscreen button */}
      <button className="fullscreen-btn btn" onClick={handleFullscreen} />

      {/* Bottom menu */}
      <div className={`bottom-menu ${isMenuOpen ? "open" : "closed"}`}>
        <button onClick={toggleMenu} className='menu-toggle-btn btn'>

        </button>

        <div className="left-con">

          {/* Dropdown for selecting planets */}
          <div className='menu-item'>
            <label htmlFor='planetSelection'>Select a Planet</label>
            <select id='planetSelection' onChange={handlePlanetChange} value={selectedPlanet?.name || "Select a Planet"}>
              <option value='Select a Planet'>
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
            <select id="simSpeedSelect" onChange={handleSpeedChange} value={simSpeed}>
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

      {/* Side menu */}
      <div className={`side-menu ${selectedPlanet ? 'open' : 'closed'}`}>
        <Details />
      </div>
    </div>
  );
};

export default Menu;
