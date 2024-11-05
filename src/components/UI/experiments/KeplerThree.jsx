import React, { useState, useEffect } from 'react';
import useStore, { usePlanetStore } from '../../../store/store';
import useExperimentsStore from '../../../store/experiments';
import planetsData from '../../../data/planetsData';
import { getSpeedValue } from '../../../helpers/utils';

function KeplerThree() {
    const { planetsData: newPlanetsData, updatePlanetData, resetSinglePlanetData } = usePlanetStore();
    const { experimentMode, experimentPlanet, setExperimentStatus, experimentStatus } = useExperimentsStore();
    const { setSimSpeed } = useStore();

    const selectedPlanet = experimentPlanet || 'Earth';
    const earthsOrbitalRadius = planetsData['Earth'].orbitalRadius;

    // Use state for values that need to be updated when planet changes
    const [originalOrbitalRadius, setOriginalOrbitalRadius] = useState(planetsData[selectedPlanet].orbitalRadius);
    const [originalOrbitalPeriod, setOriginalOrbitalPeriod] = useState(planetsData[selectedPlanet].orbitalPeriod);
    const [initialAU, setInitialAU] = useState(planetsData[selectedPlanet].orbitalRadius / earthsOrbitalRadius);
    const [AU, setAU] = useState(planetsData[selectedPlanet].orbitalRadius / earthsOrbitalRadius);

    // Update all relevant values when the selected planet changes
    useEffect(() => {
        const newOriginalRadius = planetsData[selectedPlanet].orbitalRadius;
        const newOriginalPeriod = planetsData[selectedPlanet].orbitalPeriod;
        const newInitialAU = newOriginalRadius / earthsOrbitalRadius;

        setOriginalOrbitalRadius(newOriginalRadius);
        setOriginalOrbitalPeriod(newOriginalPeriod);
        setInitialAU(newInitialAU);
        setAU(newInitialAU);

        // Reset the planet data to its original state when switching planets
        resetSinglePlanetData(selectedPlanet);
    }, [selectedPlanet, earthsOrbitalRadius]);

    // Calculate orbital period scaling based on AU change
    const calculatePeriod = (currentAU) => {
        // Calculate the ratio of orbital periods using Kepler's Third Law
        // T₂/T₁ = √((r₂/r₁)³)
        const periodRatio = Math.sqrt(Math.pow(currentAU / initialAU, 3));
        // Scale the original orbital period by this ratio
        return originalOrbitalPeriod * periodRatio / 365.25; // Convert to years
    };

    const handleUpdatePlanetData = (newAU) => {
        const newPeriod = calculatePeriod(newAU) * 365.25; // Convert back to days for planet data
        updatePlanetData(selectedPlanet, {
            orbitalRadius: originalOrbitalRadius * (newAU / initialAU),
            orbitalPeriod: newPeriod
        });
    };

    const handleIncrement = () => {
        const newValue = Math.min(40, AU + 0.1);
        setAU(newValue);
        handleUpdatePlanetData(newValue);
    };

    const handleDecrement = () => {
        const newValue = Math.max(0.1, AU - 0.1);
        setAU(newValue);
        handleUpdatePlanetData(newValue);
    };

    const handleSliderChange = (e) => {
        const newValue = parseFloat(e.target.value);
        setAU(newValue);
        handleUpdatePlanetData(newValue);
    };

    const handleStartExperiment = () => {
        const newSpeed = getSpeedValue('1 month /s');
        setSimSpeed(newSpeed); // Set to normal speed when starting
        setExperimentStatus("started");
    };

    const handleReset = () => {
        setAU(initialAU);
        resetSinglePlanetData(selectedPlanet);
        setSimSpeed(1);
        setExperimentStatus(null);
    };

    useEffect(() => {
        return () => {
            handleReset();
        }
    }, [])

    return (
        <>
            <header>Kepler's Third Law</header>
            <div className="newton-section kepler-1">
                <h2 className="title">{selectedPlanet}</h2>

                <div className="slider-con">
                    <div className="slider-control">
                        <button
                            className="increment-btn"
                            disabled={AU <= 0.1}
                            onClick={handleDecrement}
                        >
                            -
                        </button>

                        <div className="input-con">
                            <input
                                type="range"
                                min={0.1}
                                max={40}
                                step={0.1}
                                value={AU}
                                onChange={handleSliderChange}
                            />
                            <div className="slider-markers">
                                <span>0.1</span>
                                <span>40</span>
                            </div>
                        </div>

                        <button
                            className="increment-btn"
                            disabled={AU >= 40}
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="answer-con" style={{ color: 'white' }}>
                    <p>Current AU: {AU.toFixed(2)}</p>
                    <p>Current Orbital Period: {calculatePeriod(AU).toFixed(2)} years</p>

                    <p>Natural AU: {initialAU.toFixed(2)}</p>
                    <p>Natural Period: {(originalOrbitalPeriod / 365.25).toFixed(2)} years</p>
                </div>
            </div>

            <footer className="experiment-footer">
                <button
                    className={`btn start-btn ${experimentStatus === 'started' ? 'active' : ''}`}
                    onClick={handleStartExperiment}
                    disabled={experimentStatus === 'started'}
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