import React, { useState, useEffect } from 'react';
import useStore, { usePlanetStore } from '../../../store/store';
import useExperimentsStore from '../../../store/experiments';
import planetsData, { distanceScaleFactor } from '../../../data/planetsData';

function KeplerThree() {
    const { planetsData: newPlanetsData, updatePlanetData, resetSinglePlanetData } = usePlanetStore();
    const { setSimSpeed, simSpeed, prevSpeed } = useStore();
    const { experimentMode, toggleExperimentMode } = useExperimentsStore();

    const selectedPlanet = 'Earth';
    const originalOrbitalRadius = planetsData[selectedPlanet].orbitalRadius;
    const earthsOrbitalRadius = planetsData['Earth'].orbitalRadius
    const [AU, setAU] = useState(originalOrbitalRadius / earthsOrbitalRadius);

    const originalOrbitalPeriod = planetsData[selectedPlanet].orbitalPeriod;
    const earthsOrbitalPeriod = planetsData['Earth'].orbitalPeriod
    // const [orbitalPeriod, setOrbitalPeriod] = useState(null);

    // Calculate orbital period using Kepler's Third Law
    const calculatePeriod = (au) => {
        return Math.sqrt(Math.pow(au, 3));
    };

    const handleUpdatePlanetData = (newValue) => {
        updatePlanetData(selectedPlanet, {
            orbitalRadius: originalOrbitalRadius * newValue,
            orbitalPeriod: originalOrbitalPeriod * calculatePeriod(newValue)
        });
    }

    const handleIncrement = () => {
        const newValue = Math.min(10, AU + 1);
        setAU(newValue);
        handleUpdatePlanetData(newValue)
    };

    const handleDecrement = () => {
        const newValue = Math.max(1, AU - 1);
        setAU(newValue);
        handleUpdatePlanetData(newValue)
    };

    const handleSliderChange = (e) => {
        const newValue = parseFloat(e.target.value);
        setAU(newValue);
        handleUpdatePlanetData(newValue)
    };

    const handleStartExperiment = () => {
        setSimSpeed(100000); // Set to normal speed when starting
    };

    const handleReset = () => {
        setAU(originalOrbitalRadius / earthsOrbitalRadius);
        resetSinglePlanetData(selectedPlanet);
    };

    // Update local data if planet data changes externally
    // useEffect(() => {
    //     setEccentricity(planetsData[selectedPlanet].orbitalPeriod);
    // }, [planetsData[selectedPlanet].orbitalPeriod]);

    return (
        <>
            <header>Kepler's Third Law</header>
            <div className="newton-section kepler-1">
                <h2 className="title">{selectedPlanet}</h2>

                <div className="slider-con">
                    <div className="slider-control">
                        <button
                            className="increment-btn"
                            disabled={AU <= 0 || !experimentMode}
                            onClick={handleDecrement}
                        >
                            -
                        </button>

                        <div className="input-con">
                            <input
                                type="range"
                                min={1}
                                max={10}
                                step={.1}
                                value={AU}
                                onChange={handleSliderChange}
                            />
                            <div className="slider-markers">
                                <span>1</span>
                                <span>10</span>
                            </div>
                        </div>
                        <button
                            className="increment-btn"
                            disabled={AU >= 10 || !experimentMode}
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="answer-con" style={{ color: 'white' }}>
                    <p>AU: {AU}</p>
                    <p>Orbital Period: {calculatePeriod(AU).toFixed(1)} years</p>
                </div>

            </div>
            <footer className="experiment-footer">
                <button
                    className={`btn start-btn ${experimentMode ? 'active' : ''}`}
                    onClick={handleStartExperiment}
                    disabled={experimentMode}
                >
                    Start Experiment
                </button>
                <button
                    className="btn reset-btn"
                    onClick={handleReset}
                >
                    Reset Values
                </button>
            </footer>
        </>
    );
}

export default KeplerThree;