"use client";
import React, { useMemo, useState } from "react";
import useStore, { useCameraStore, usePlanetStore } from "../store/store";
import planetsData from "../data/planetsData";

const Menu = () => {
  const { simSpeed, setSimSpeed, showConstellations, toggleConstellations, fullscreen, toggleFullscreen, orbitPaths, toggleOrbitPaths } = useStore();
  const { selectedPlanet, setSelectedPlanet, selectedMoon, displayLabels, toggleDisplayLabels } = usePlanetStore();
  const { isSurfaceCameraActive, toggleSurfaceCamera, surfacePoint } = useCameraStore();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const formatNumber = number => {
    return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(number);
  };

  const speedOptions = [
    { label: "-5yr", value: -157788000 },
    { label: "-1yr", value: -31557600 },
    { label: "-1mon", value: -2629800 },
    { label: "-1wk", value: -604800 },
    { label: "-1day", value: -86400 },
    { label: "-1hr", value: -3600 },
    { label: "-1min", value: -60 },
    { label: "Realtime", value: 1 },
    { label: "1min", value: 60 },
    { label: "1hr", value: 3600 },
    { label: "1day", value: 86400 },
    { label: "1wk", value: 604800 },
    { label: "1mon", value: 2629800 },
    { label: "1yr", value: 31557600 },
    { label: "5yr", value: 157788000 },
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
          <div className='menu-item'>
            <label htmlFor='cameraToggle'>Toggle Camera:</label>
            {surfacePoint &&
              <button id='cameraToggle' className='btn' onClick={toggleSurfaceCamera}>
                {isSurfaceCameraActive ? "SURFACE" : "DEFAULT"}
              </button>
            }
          </div>

          {selectedPlanet && !selectedMoon && (
            <div className='planet-details'>
              <h2>{selectedPlanet.name}</h2>
              <p>Mass: {selectedPlanet.mass?.toString().replace("e+", "e")} kg</p>
              <p>Radius: {selectedPlanet.radius} km</p>
              <p>Orbital Period: {selectedPlanet.orbitalPeriod} days</p>
              <p>Rotation Period: {selectedPlanet.rotationPeriod} hours</p>
              <p>Surface Temperature: {selectedPlanet.surfaceTemp} °C</p>
              <p>Gravity: {selectedPlanet.gravity} m/s²</p>
            </div>
          )}
          {selectedMoon && selectedPlanet && (
            <div className='planet-details'>
              <h2>{selectedMoon.bodyData.name}</h2>
              <p>Mass: {selectedMoon.bodyData.mass?.toString().replace("e+", "e")} kg</p>
              <p>Radius: {selectedMoon.bodyData.radius} km</p>
              <p>Orbital Period: {selectedMoon.bodyData.orbitalPeriod} days</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
