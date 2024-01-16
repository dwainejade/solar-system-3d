import React, { useState } from "react";
import useStore, { usePlanetStore } from "../store/store";
import planetsData from "../data/planetsData";

const Menu = () => {
  const { simSpeed, setSimSpeed, constellations, toggleConstellations, fullscreen, toggleFullscreen } = useStore();
  const { selectedPlanet, setSelectedPlanet } = usePlanetStore();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const formatNumber = number => {
    return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(number);
  };

  const handleSpeedChange = e => {
    const speedOption = e.target.value;
    let newSpeed;

    switch (speedOption) {
      case "realtime":
        newSpeed = 1;
        break;
      case "1min":
        newSpeed = 60;
        break;
      case "1hr":
        newSpeed = 3600; // 1 hour = 3600 seconds
        break;
      case "1day":
        newSpeed = 86400; // 1 day = 86400 seconds
        break;
      case "1wk":
        newSpeed = 604800; // 1 week = 7 * 86400 seconds
        break;
      case "1mon":
        newSpeed = 2629800; // Approx 1 month = 30.44 * 86400 seconds
        break;
      case "1yr":
        newSpeed = 31557600; // 1 year = 365.25 * 86400 seconds (accounting for leap years)
        break;
      case "5yr":
        newSpeed = 157788000; // 5 years
        break;
      case "10yr":
        newSpeed = 315576000; // 10 years
        break;
      default:
        newSpeed = 1;
    }

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
    <div className={`menu-con ${isMenuOpen ? "open" : "close"}`}>
      <button onClick={toggleMenu} className='menu-toggle-btn'>
        Menu
      </button>
      <div className='menu-content'>
        <div className='menu-item'>
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
        </div>
        <div className='menu-item'>
          <p>{constellations ? "ON" : "OFF"}</p>
          <button onClick={() => toggleConstellations()}>Toggle constellations</button>
        </div>
        {/* <div className='menu-item'>
          <p>{FPMode ? "ON" : "OFF"}</p>
          <button onClick={() => toggleFPMode()}>Toggle FP Mode</button>
        </div> */}
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

        <button className={`fullscreen-btn ${fullscreen ? "fullscreen" : "minimized"}`} onClick={toggleFullscreen} />

        {selectedPlanet && (
          <div className='planet-details'>
            <h2>{selectedPlanet.name}</h2>
            <p>Mass: {selectedPlanet.mass.toString().replace("e+", "e")} kg</p>
            <p>Radius: {selectedPlanet.radius} km</p>
            <p>Orbital Period: {selectedPlanet.orbitalPeriod} days</p>
            <p>Rotation Period: {selectedPlanet.rotationPeriod} hours</p>
            <p>Surface Temperature: {selectedPlanet.surfaceTemp} °C</p>
            <p>Gravity: {selectedPlanet.gravity} m/s²</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
