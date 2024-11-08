import React, { useState, useEffect } from 'react';
import useStore, { usePlanetStore } from '../../../store/store';
import planetsData from '../../../data/planetsData';
import useExperimentsStore from '../../../store/experiments';
import { getSpeedValue } from '../../../helpers/utils';

function KeplerOne() {
    const { planetsData: newPlanetsData, updatePlanetData, resetSinglePlanetData } = usePlanetStore();
    const { setSimSpeed, simSpeed, prevSpeed } = useStore();
    const { experimentMode, experimentPlanet, setExperimentStatus, experimentStatus } = useExperimentsStore();

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
        const newSpeed = getSpeedValue('1 year /s');
        setSimSpeed(newSpeed); // Set to normal speed when starting
        setExperimentStatus("started");
    };

    const handleReset = () => {
        setEccentricity(originalEccentricity);
        updatePlanetData(selectedPlanet, { eccentricity: originalEccentricity });
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
            <header>Kepler's First Law</header>
            <div className="newton-section kepler-1">
                <h2 className="title">{selectedPlanet}</h2>

                <div className="slider-con">
                    <div className="slider-control">
                        <button
                            className="increment-btn"
                            disabled={eccentricity <= 0 || experimentStatus === 'started'}
                            onClick={handleDecrement}
                        >
                            -
                        </button>

                        <div className="input-con">
                            <input
                                type="range"
                                min={0}
                                max={0.9}
                                step={0.1}
                                value={eccentricity}
                                onChange={handleSliderChange}
                                disabled={experimentStatus === 'started'}
                                className='slider'
                            />
                            <div className="slider-markers">
                                <span>0</span>
                                <span>.9</span>
                            </div>
                            <div className="slider-ticks" >
                                <span className="tick"></span>
                                <span className="tick"></span>
                                <span className="tick"></span>
                                <span className="tick"></span>
                                <span className="tick"></span>
                                <span className="tick"></span>
                                <span className="tick"></span>
                                <span className="tick"></span>
                                <span className="tick"></span>
                                <span className="tick"></span>
                            </div>

                        </div>
                        <button
                            className="increment-btn"
                            disabled={eccentricity >= 0.9 || experimentStatus === 'started'}
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="description-con">
                    <p>Planets orbit the Sun in an ellipse, with the Sun at one of the foci.</p>
                    <p>Note that {selectedPlanet}'s normal eccentricity is {originalEccentricity}.</p>
                </div>
            </div>
            <footer className="experiment-footer">
                <button
                    className={`btn start-btn ${experimentMode ? 'active' : ''}`}
                    onClick={handleStartExperiment}
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