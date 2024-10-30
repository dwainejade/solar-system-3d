import React, { useState, useEffect } from 'react';
import useStore, { usePlanetStore } from '../../../store/store';
import useExperimentsStore from '../../../store/experiments';

function KeplerOne() {
    const selectedPlanet = 'Saturn';
    const { planetsData, updatePlanetData } = usePlanetStore();
    const { setSimSpeed, prevSpeed } = useStore();
    const { experimentMode, toggleExperimentMode } = useExperimentsStore();

    // Initialize eccentricity from planet data
    const [eccentricity, setEccentricity] = useState(planetsData[selectedPlanet].eccentricity);
    const originalEccentricity = 0.054; // Saturn's original eccentricity

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
        // If not already in experiment mode, start it
        if (!experimentMode) {
            setSimSpeed(1); // Set to normal speed when starting
            toggleExperimentMode(true);
            updatePlanetData(selectedPlanet, { eccentricity: eccentricity });
        }
    };

    const handleReset = () => {
        setEccentricity(originalEccentricity);
        updatePlanetData(selectedPlanet, { eccentricity: originalEccentricity });
        if (experimentMode) {
            toggleExperimentMode(false);
        }
    };

    // Update local eccentricity if planet data changes externally
    useEffect(() => {
        setEccentricity(planetsData[selectedPlanet].eccentricity);
    }, [planetsData[selectedPlanet].eccentricity]);

    return (
        <>
            <header>Kepler's First Law</header>
            <div className="newton-section kepler-1">
                <h2 className="title">Saturn</h2>

                <div className="slider-con">
                    <div className="slider-control">
                        <button
                            className="increment-btn"
                            disabled={eccentricity <= 0 || !experimentMode}
                            onClick={handleDecrement}
                        >
                            -
                        </button>
                        <input
                            type="range"
                            min={0}
                            max={0.9}
                            step={0.01}
                            value={eccentricity}
                            onChange={handleSliderChange}
                            disabled={!experimentMode}
                        />
                        <button
                            className="increment-btn"
                            disabled={eccentricity >= 0.9 || !experimentMode}
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                    <div className="slider-markers">
                        <span>0</span>
                        <span>0.9</span>
                    </div>
                    <div className="current-value">
                        Current eccentricity: {eccentricity.toFixed(3)}
                    </div>
                </div>

                <div className="description-con">
                    <p>Planets orbit the Sun in an ellipse, with the Sun at one of the foci.</p>
                    <p>Note that Saturn's normal eccentricity is {originalEccentricity}.</p>
                    {experimentMode && (
                        <p className="experiment-note">
                            Experiment active: Adjusting Saturn's orbital eccentricity
                        </p>
                    )}
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