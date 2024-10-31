import React, { useState, useEffect } from 'react';
import useStore, { usePlanetStore } from '../../../store/store';
import useExperimentsStore from '../../../store/experiments';

function KeplerTwo() {
    const { planetsData, updatePlanetData } = usePlanetStore();
    const { setSimSpeed, simSpeed, prevSpeed } = useStore();
    const { experimentMode, toggleExperimentMode, experimentPlanet } = useExperimentsStore();
    const selectedPlanet = experimentPlanet

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
        setSimSpeed(1);
        setEccentricity(originalEccentricity);
        updatePlanetData(selectedPlanet, { eccentricity: originalEccentricity });
        // clear triangles from previous experiment
        // reset planets angle to 0
    };

    // Update local eccentricity if planet data changes externally
    useEffect(() => {
        setEccentricity(planetsData[selectedPlanet].eccentricity);
    }, [planetsData[selectedPlanet].eccentricity]);

    return (
        <>
            <header>Kepler's Second Law</header>
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