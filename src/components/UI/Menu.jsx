"use client";
import React, { useMemo, useState } from "react";
import useStore, { usePlanetStore } from "../../store/store";
import Details from "./PlanetDetails"

const Menu = () => {
  const { simSpeed, setSimSpeed, showConstellations, toggleConstellations, fullscreen, toggleFullscreen, orbitPaths, toggleOrbitPaths, isEditing, setIsEditing } = useStore();
  const { selectedPlanet, setSelectedPlanet, selectedMoon, displayLabels, toggleDisplayLabels, updateSelectedPlanet, planetsData } = usePlanetStore();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };


  const speedOptions = [
    { label: "-5 year /s", value: -157788000 },
    { label: "-1 year /s", value: -31557600 },
    { label: "-3 month /s", value: -7889400 },
    { label: "-1 month /s", value: -2629800 },
    { label: "-2 week /s", value: -1209600 },
    { label: "-1 week /s", value: -604800 },
    { label: "-1 day /s", value: -86400 },
    { label: "-4 hour /s", value: -14400 },
    { label: "-1 hour /s", value: -3600 },
    { label: "-30 minute /s", value: -1800 },
    { label: "-1 minute /s", value: -60 },
    { label: "Realtime", value: 1 },
    { label: "1 minute /s", value: 60 },
    { label: "30 min /s", value: 1800 },
    { label: "1 hour /s", value: 3600 },
    { label: "4 hour /s", value: 14400 },
    { label: "1 day /s", value: 86400 },
    { label: "1 week /s", value: 604800 },
    { label: "2 week /s", value: 1209600 },
    { label: "1 month /s", value: 2629800 },
    { label: "3 month /s", value: 7889400 },
    { label: "1 year /s", value: 31557600 },
    { label: "5 year /s", value: 157788000 },
  ];
  // Finding the index of the current simulation speed in the speedOptions array
  const currentSpeedIndex = useMemo(
    () => speedOptions.findIndex(option => option.value === simSpeed),
    [simSpeed]
  );

  // Handle the change in slider value
  const handleSliderChange = (event) => {
    const newIndex = parseInt(event.target.value, 10);
    setSimSpeed(speedOptions[newIndex].value);
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
      <div className={`menu-con ${isMenuOpen ? "open" : "close"}`}>
        <button onClick={toggleMenu} className='menu-toggle-btn'>
          Menu
        </button>
        <div className='menu-content'>
          <div className="menu-item">
            <label htmlFor="simSpeed">Simulation Speed: {speedOptions[currentSpeedIndex].label}</label>
          </div>
          <input
            id="simSpeed"
            type="range"
            min="0"
            max={speedOptions.length - 1}
            value={currentSpeedIndex}
            onChange={handleSliderChange}
            className="slider"
          />

          {/* Dropdown for selecting planets */}
          <div className='menu-item'>
            <label htmlFor='planetSelection'>Select a Planet:</label>
            <select id='planetSelection' onChange={handlePlanetChange} value={selectedPlanet?.name || "Select a Planet"}>
              <option value='Select a Planet' disabled>
                Select a Planet
              </option>
              {Object.keys(planetsData).map(planetName => (
                <option key={planetName} value={planetName}>
                  {planetName}
                </option>
              ))}
            </select>
          </div>

          <div className='menu-item'>
            <label htmlFor='fullscreenToggle'>Toggle Fullscreen:</label>
            <button id='fullscreenToggle' onClick={toggleFullscreen} className='btn'>
              {fullscreen ? "ON" : "OFF"}
            </button>
          </div>
          <div className='menu-item'>
            <label htmlFor='orbitPathToggle'>Toggle Orbit Paths:</label>
            <button id='orbitPathToggle' className='btn' onClick={toggleOrbitPaths}>
              {orbitPaths ? "ON" : "OFF"}
            </button>
          </div>
          <div className='menu-item'>
            <label htmlFor='labelToggle'>Toggle Labels:</label>
            <button id='labelToggle' className='btn' onClick={toggleDisplayLabels}>
              {displayLabels ? "NAMES" : "POINTS"}
            </button>
          </div>
          <div className='menu-item'>
            <label htmlFor='constellationsToggle'>Toggle Constellations:</label>
            <button id='constellationsToggle' className='btn' onClick={toggleConstellations}>
              {showConstellations ? "ON" : "OFF"}
            </button>
          </div>

          {selectedPlanet && (
            <Details />
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
