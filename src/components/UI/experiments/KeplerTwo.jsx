import React, { useState, useEffect } from 'react';
import useStore, { usePlanetStore } from '../../../store/store';
import useExperimentsStore from '../../../store/experiments';

function KeplerTwo() {
    const selectedPlanet = 'Earth';
    const { planetsData, updatePlanetData } = usePlanetStore();
    const { setSimSpeed, simSpeed, prevSpeed } = useStore();
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
        updatePlanetData(selectedPlanet, { eccentricity: eccentricity });
        setSimSpeed(100000); // Set to normal speed when starting
    };

    const handleReset = () => {
        setEccentricity(originalEccentricity);
        updatePlanetData(selectedPlanet, { eccentricity: originalEccentricity });
    };

    // Update local eccentricity if planet data changes externally
    useEffect(() => {
        setEccentricity(planetsData[selectedPlanet].eccentricity);
    }, [planetsData[selectedPlanet].eccentricity]);

    return (
        <>
            <header>Kepler's Second Law</header>
            <div className="newton-section kepler-2">
                <h2 className="title">{selectedPlanet}</h2>

                <div className="slider-con">
                    <div className="slider-control">
                        <label htmlFor="eccentricity">Eccentricity</label>
                        <input type="text" />
                    </div>
                </div>

                <div className="description-con">
                    <p>Kepler's second law states that a planet sweeps out equal areas in equal times, moving faster when the planet is closer to the Sun and slower when it is farther away.</p>
                </div>
            </div >
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

export default KeplerTwo;