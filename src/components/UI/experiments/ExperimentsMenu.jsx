"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import useStore, { usePlanetStore, useCameraStore } from "../../../store/store";
import useExperimentsStore from "../../../store/experiments";
import ExperimentsModal from "./ExperimentsModal";

const SPEED_OPTIONS = {
  "-1 year /s": -31557600,
  "-1 month /s": -2629800,
  "-1 week /s": -604800,
  "-1 day /s": -86400,
  "-1 hour /s": -3600,
  "-1 minute /s": -60,
  "Real-time": 1,
  "1 minute /s": 60,
  "1 hour /s": 3600,
  "1 day /s": 86400,
  "1 week /s": 604800,
  "1 month /s": 2629800,
  "1 year /s": 31557600
};

// max speeds for each experiment type
const EXPERIMENT_SPEED_LIMITS = {
  'kepler-1': "1 year /s",
  'kepler-2': "1 month /s",
  'kepler-3': "1 year /s",
  'newton-1': "1 day /s",
  'default': "1 year /s"
};


const Menu = () => {
  const { resetExperiments, experimentPlanet, setExperimentPlanet, experimentStatus, experimentType } = useExperimentsStore();
  const { simSpeed, setSimSpeed, prevSpeed, setPrevSpeed, toggleFullscreen, resetAllData, } = useStore();
  const { displayLabels, toggleDisplayLabels, planetsData, showResetPlanetModal, showResetAllModal, toggleResetAllModal, orbitPaths, toggleOrbitPaths } = usePlanetStore();
  const { isCameraTransitioning, autoRotate, activeCamera } = useCameraStore();

  const [firstRender, setFirstRender] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [textClass, setTextClass] = useState('');
  const [displayText, setDisplayText] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleResetAll = () => {
    resetExperiments();
    resetAllData();
  };

  const handleFullscreen = () => {
    toggleFullscreen();
  };

  const disablePlanetSelect = () => {
    if (experimentType === 'newton-1') return true;
    if (experimentType === 'kepler-3') return true;
  };

  // Get available speed options based on experiment type
  const getSpeedOptions = () => {
    if (!experimentType) {
      return Object.entries(SPEED_OPTIONS);
    }

    const maxSpeed = EXPERIMENT_SPEED_LIMITS[experimentType] || EXPERIMENT_SPEED_LIMITS.default;
    const allOptions = Object.entries(SPEED_OPTIONS);

    // Find the index of "Real-time" and maxSpeed
    const startIndex = allOptions.findIndex(([key]) => key === "Real-time");
    const maxIndex = allOptions.findIndex(([key]) => key === maxSpeed);

    return allOptions.slice(startIndex, maxIndex + 1);
  };


  const handlePlanetSelect = (planetName) => {
    setExperimentPlanet(planetName);
    setIsDropdownOpen(false); // Close dropdown after selection
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
      return
    }

    setTextClass('slideIn');
    setDisplayText(`Auto-Rotate ${autoRotate ? "On" : "Off"}`);
    const timer1 = setTimeout(() => {
      setTextClass('slideOut');
    }, 1500); // display text for 1.5 seconds

    const timer2 = setTimeout(() => {
      setDisplayText('');
    }, 2500); // Total duration

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [autoRotate]);

  useEffect(() => {
    return () => {
      handleResetAll()
    }
  }, []);

  const disableSpeedToggle = () => {
    if (experimentStatus !== 'started') return true;
    else if (!isMenuOpen) return true;
    return false;
  };


  return (
    <div className={`menu-wrapper ${showResetAllModal || showResetPlanetModal ? "disabled" : "enabled"}`}>
      <div className={`auto-rotate-text ${textClass}`}>
        {displayText}
      </div>

      <button className="fullscreen-btn btn" onClick={handleFullscreen} />

      <div className={`bottom-menu ${isMenuOpen ? "open" : "closed"}`}>
        <button onClick={toggleMenu} className="menu-toggle-btn btn" />

        <div className="left-con">
          <div className="menu-item">
            <label>Select a Planet</label>
            <div className="dropdown-container">
              <button
                className="dropdown-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={!isMenuOpen || experimentStatus || disablePlanetSelect()}
              >
                {experimentPlanet}
              </button>


              <div className="item-wrapper">
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    {/* <li onClick={handleSolarSystemSelect}>Solar System</li> */}
                    {Object.keys(planetsData)
                      .filter((planetName) => planetName !== 'Sun')
                      .map((planetName) => (
                        <li
                          key={planetName}
                          className="dropdown-item"
                          onClick={() => handlePlanetSelect(planetName)}
                        >
                          {planetName}
                        </li>
                      ))}
                    {/* <li onClick={handleAsteroidBeltSelect}>Asteroid Belt</li> */}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="menu-item">
            <label htmlFor="simSpeedSelect">Simulation Speed</label>
            <select
              id="simSpeedSelect"
              onChange={(e) => setSimSpeed(SPEED_OPTIONS[e.target.value])}
              value={Object.entries(SPEED_OPTIONS).find(([_, v]) => v === simSpeed)?.[0] || "Real-time"}
              disabled={disableSpeedToggle()}
            >
              {getSpeedOptions().map(([label, value]) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

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

      <ExperimentsModal />

    </div>
  );
};

export default Menu;
