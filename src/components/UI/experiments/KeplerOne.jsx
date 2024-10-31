import React, { useState, useEffect } from 'react';
import useStore, { usePlanetStore } from '../../../store/store';
import planetsData from '../../../data/planetsData';
import useExperimentsStore from '../../../store/experiments';

function KeplerOne() {
    const { planetsData: newPlanetsData, updatePlanetData, resetSinglePlanetData } = usePlanetStore();
    const { setSimSpeed, simSpeed, prevSpeed } = useStore();
    const { experimentMode, experimentPlanet } = useExperimentsStore();

    const selectedPlanet = experimentPlanet || 'Earth';

    // Initialize eccentricity from planet data
    const [eccentricity, setEccentricity] = useState(newPlanetsData[selectedPlanet].eccentricity);
    const originalEccentricity = planetsData[experimentPlanet].eccentricity; // Saturn's original eccentricity

    const handleIncrement = () => {
        const newValue = Math.min(0.9, eccentricity + 0.01);
        setEccentricity(newValue);
        if (experimentMode) {
            updatePlanetData(selectedPlanet, { eccentricity: newValue });
        }
    };

    const handleDecrement = () => {
        const newValue = Math.max(0, eccentricity - 0.01);
        setEccentricity(newValue);
        if (experimentMode) {
            updatePlanetData(selectedPlanet, { eccentricity: newValue });
        }
    };

    const handleSliderChange = (e) => {
        const newValue = parseFloat(e.target.value);
        setEccentricity(newValue);
        if (experimentMode) {
            updatePlanetData(selectedPlanet, { eccentricity: newValue });
        }
    };

    const handleStartExperiment = () => {
        updatePlanetData(selectedPlanet, { eccentricity: eccentricity });
        setSimSpeed(100000); // Set to normal speed when starting
    };

    const handleReset = () => {
        setEccentricity(originalEccentricity);
        updatePlanetData(selectedPlanet, { eccentricity: originalEccentricity });
    };

    // Update local eccentricity if planet data changes externally
    // useEffect(() => {
    //     setEccentricity(newPlanetsData[selectedPlanet].eccentricity);
    // }, [newPlanetsData[selectedPlanet].eccentricity]);

    return (
        <>
            <header>Kepler's First Law</header>
            <div className="newton-section kepler-1">
                <h2 className="title">{selectedPlanet}</h2>

                <div className="slider-con">
                    <div className="slider-control">
                        <button
                            className="increment-btn"
                            disabled={eccentricity <= 0 || !experimentMode}
                            onClick={handleDecrement}
                        >
                            -
                        </button>

                        <div className="input-con">
                            <input
                                type="range"
                                min={0}
                                max={0.9}
                                step={0.001}
                                value={eccentricity}
                                onChange={handleSliderChange}
                                disabled={!experimentMode}
                            />
                            <div className="slider-markers">
                                <span>0</span>
                                <span>.9</span>
                            </div>

                        </div>
                        <button
                            className="increment-btn"
                            disabled={eccentricity >= 0.9 || !experimentMode}
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="description-con">
                    <p>Planets orbit the Sun in an ellipse, with the Sun at one of the foci.</p>
                    <p>Note that Saturn's normal eccentricity is {originalEccentricity}.</p>
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

export default KeplerOne;