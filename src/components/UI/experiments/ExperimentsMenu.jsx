"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import useStore, { usePlanetStore, useCameraStore } from "../../../store/store";
import useExperimentsStore from "../../../store/experiments";
import ExperimentsModal from "./ExperimentsModal";
import PlanetSelector from "../PlanetSelector";
import SpeedSelector from "../SpeedSelector";

const SPEED_OPTIONS = {
  "-1 year /s": -31557600,
  "-1 month /s": -2629800,
  "-1 week /s": -604800,
  "-1 day /s": -86400,
  "-1 hour /s": -3600,
  "-1 minute /s": -60,
  "real time": 1,
  "1 minute /s": 60,
  "1 hour /s": 3600,
  "1 day /s": 86400,
  "1 week /s": 604800,
  "1 month /s": 2629800,
  "1 year /s": 31557600
};

const EXPERIMENT_SPEED_LIMITS = {
  'kepler-1': "1 year /s",
  'kepler-2': "1 month /s",
  'kepler-3': "1 year /s",
  'newton-1': "1 day /s",
  'default': "1 year /s"
};

const ExperimentsMenu = () => {
  const { resetExperiments, setExperimentPlanet, experimentPlanet, experimentStatus, experimentType } = useExperimentsStore();
  const { simSpeed, setSimSpeed, setPrevSpeed, toggleFullscreen, resetAllData } = useStore();
  const { displayLabels, toggleDisplayLabels, planetsData, showResetPlanetModal, showResetAllModal, orbitPaths, toggleOrbitPaths } = usePlanetStore();
  const { autoRotate } = useCameraStore();

  const [firstRender, setFirstRender] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [textClass, setTextClass] = useState('');
  const [displayText, setDisplayText] = useState('');

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

  const handleSpeedChange = (speedValue) => {
    setSimSpeed(speedValue);
  };

  const disablePlanetSelect = () => {
    if (experimentType === 'newton-1') return true;
    if (experimentType === 'kepler-3') return true;
    return false;
  };

  const getSpeedOptions = () => {
    if (!experimentType) {
      // Format the options properly
      return Object.entries(SPEED_OPTIONS).map(([label, value]) => ({
        label,
        value
      }));
    }

    const maxSpeed = EXPERIMENT_SPEED_LIMITS[experimentType] || EXPERIMENT_SPEED_LIMITS.default;
    const allOptions = Object.entries(SPEED_OPTIONS);
    const startIndex = allOptions.findIndex(([key]) => key === "real time");
    const maxIndex = allOptions.findIndex(([key]) => key === maxSpeed);

    // Format the sliced options properly
    return allOptions.slice(startIndex, maxIndex + 1)
      .map(([label, value]) => ({
        label,
        value
      }));
  };

  const handlePlanetSelect = (planetName) => {
    setExperimentPlanet(planetName);
  };

  useLayoutEffect(() => {
    setPrevSpeed(1);
    setSimSpeed(1);
  }, []);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      toggleMenu(true);
      return;
    }

    setTextClass('slideIn');
    setDisplayText(`Auto-Rotate ${autoRotate ? "On" : "Off"}`);
    const timer1 = setTimeout(() => {
      setTextClass('slideOut');
    }, 1500);

    const timer2 = setTimeout(() => {
      setDisplayText('');
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [autoRotate]);

  useEffect(() => {
    return () => {
      handleResetAll();
    };
  }, []);

  const disableSpeedToggle = () => {
    if (experimentStatus !== 'started') return true;
    if (!isMenuOpen) return true;
    return false;
  };

  const handleOrbitPathsChange = (e) => {
    toggleOrbitPaths(!orbitPaths);
  };

  const handleLabelsChange = (e) => {
    toggleDisplayLabels(!displayLabels);
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
          <div className='menu-item'>
            <label>Select a Planet</label>
            <PlanetSelector
              planetsData={planetsData}
              activeCamera={experimentPlanet}
              onPlanetSelect={handlePlanetSelect}
              isDisabled={!isMenuOpen || experimentStatus || disablePlanetSelect()}
              enableSubmenu={false}
              showOnlyPlanets={true}
            />
          </div>

          <div className="menu-item">
            <label htmlFor="simSpeedSelect">Simulation Speed</label>
            <SpeedSelector
              simSpeed={simSpeed}
              speedOptions={getSpeedOptions()}
              onSpeedSelect={handleSpeedChange}
              isDisabled={disableSpeedToggle()}
            />
          </div>
        </div>

        <div className="divider" />
        <div className="right-con">
          <div className="menu-item">
            <label htmlFor="orbitPathToggle">Orbit Paths</label>
            <div className="switch" onClick={handleOrbitPathsChange} disabled={!isMenuOpen}>
              <input
                id="orbitPathToggle"
                type="checkbox"
                checked={orbitPaths}
                onChange={handleOrbitPathsChange}
                disabled={!isMenuOpen}
              />
              <div className="slider round"></div>
            </div>
          </div>

          <div className="menu-item">
            <label htmlFor="labelToggle">Labels</label>
            <div className="switch" onClick={handleLabelsChange} disabled={!isMenuOpen}>
              <input
                id="labelToggle"
                type="checkbox"
                checked={displayLabels}
                onChange={handleLabelsChange}
                disabled={!isMenuOpen}
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

export default ExperimentsMenu;