import React, { useState, useEffect } from 'react';
import useStore, { usePlanetStore } from '../../../store/store';
import useExperimentsStore from '../../../store/experiments';

const getSpeedValue = (key) => {
    switch (key) {
        case "-1 year /s":
            return -31557600;
        case "-1 month /s":
            return -2629800;
        case "-1 week /s":
            return -604800;
        case "-1 day /s":
            return -86400;
        case "-1 hour /s":
            return -3600;
        case "-1 minute /s":
            return -60;
        case "Real-time":
            return 1;
        case "1 minute /s":
            return 60;
        case "1 hour /s":
            return 3600;
        case "1 day /s":
            return 86400;
        case "1 week /s":
            return 604800;
        case "1 month /s":
            return 2629800;
        case "1 year /s":
            return 31557600;
        default:
            return 1;
    }
}


function KeplerTwo() {
    const { planetsData, updatePlanetData } = usePlanetStore();
    const { setSimSpeed, simSpeed, prevSpeed } = useStore();
    const { experimentMode, experimentStatus, setExperimentStatus, experimentPlanet } = useExperimentsStore();
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
        setExperimentStatus("started");
        updatePlanetData(selectedPlanet, { eccentricity: eccentricity });
        const newSpeed = getSpeedValue('1 month /s');
        setSimSpeed(newSpeed); // Set to normal speed when starting
    };

    const handleReset = () => {
        setSimSpeed(1);
        updatePlanetData(selectedPlanet, { eccentricity: originalEccentricity, initialOrbitalAngle: 0 });
        setExperimentStatus(null);
    };
    // console.log(planetsData[selectedPlanet].initialOrbitalAngle)
    // Update local eccentricity if planet data changes externally
    useEffect(() => {
        setEccentricity(planetsData[selectedPlanet].eccentricity);
    }, [planetsData[selectedPlanet].eccentricity]);

    useEffect(() => {
        handleReset();
    }, [selectedPlanet])

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