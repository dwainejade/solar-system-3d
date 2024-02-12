"use client";
import React, { useState } from "react";
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

  const [currentSpeedIndex, setCurrentSpeedIndex] = useState(7);
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
  const adjustSpeed = (direction) => {
    const newIndex = currentSpeedIndex + direction;
    if (newIndex >= 0 && newIndex < speedOptions.length) {
      setCurrentSpeedIndex(newIndex);
      setSimSpeed(speedOptions[newIndex].value);
    }
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
          {/* <div className='menu-item'>
            <label htmlFor='simSpeed'>Simulation Speed: </label>
            <select id='simSpeed' onChange={handleSpeedChange}>
              <option value='realtime'>Realtime</option>
              <option value='1min'>1s equals 1 minute</option>
              <option value='1hr'>1s equals 1 hour</option>
              <option value='1day'>1s equals 1 day</option>
              <option value='1wk'>1s equals 1 week</option>
              <option value='1mon'>1s equals 1 month</option>
              <option value='1yr'>1s equals 1 year</option>
              <option value='5yr'>1s equals 5 years</option>
              <option value='10yr'>1s equals 10 years</option>
            </select>
          </div> */}
          <div className='menu-item'>
            <label>Simulation Speed: </label>
            <button onClick={() => adjustSpeed(-1)}>-</button>
            {speedOptions[currentSpeedIndex].label}
            <button onClick={() => adjustSpeed(1)}>+</button>
          </div>

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
