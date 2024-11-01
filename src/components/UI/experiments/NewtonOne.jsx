import React, { useState, useEffect } from 'react';
import useStore, { usePlanetStore } from '../../../store/store';
import planetsData from '../../../data/planetsData';
import useExperimentsStore from '../../../store/experiments';

function NewtonGravity() {
    const { planetsData: newPlanetsData, updatePlanetData, resetSinglePlanetData } = usePlanetStore();
    const { setSimSpeed, simSpeed, prevSpeed } = useStore();
    const { experimentMode, experimentPlanet } = useExperimentsStore();

    const selectedPlanet = experimentPlanet || 'Earth';

    // Initialize mass scale
    const [massScale, setMassScale] = useState(1);
    const originalMass = planetsData[selectedPlanet].mass;
    const G = 6.67430e-11; // Gravitational constant

    const handleIncrement = () => {
        const newValue = Math.min(2, massScale + 0.01);
        setMassScale(newValue);
        if (experimentMode) {
            updatePlanetData(selectedPlanet, {
                mass: originalMass * newValue,
                radius: planetsData[selectedPlanet].radius * newValue
            });
        }
    };

    const handleDecrement = () => {
        const newValue = Math.max(0.5, massScale - 0.01);
        setMassScale(newValue);
        if (experimentMode) {
            updatePlanetData(selectedPlanet, {
                mass: originalMass * newValue,
                radius: planetsData[selectedPlanet].radius * newValue
            });
        }
    };

    const handleSliderChange = (e) => {
        const newValue = parseFloat(e.target.value);
        setMassScale(newValue);
        if (experimentMode) {
            updatePlanetData(selectedPlanet, {
                mass: originalMass * newValue,
                radius: planetsData[selectedPlanet].radius * newValue
            });
        }
    };

    const calculateGravitationalForce = () => {
        const earthMass = originalMass * massScale;
        const moonMass = 7.34767309e22; // Moon's mass in kg
        const distance = 384400000; // Average Earth-Moon distance in meters
        return G * (earthMass * moonMass) / (distance * distance);
    };

    const handleStartExperiment = () => {
        updatePlanetData(selectedPlanet, {
            mass: originalMass * massScale,
            radius: planetsData[selectedPlanet].radius * massScale
        });
        setSimSpeed(100000);
    };

    const handleReset = () => {
        setMassScale(1);
        resetSinglePlanetData(selectedPlanet);
    };

    return (
        <>
            <header>Newton's Law of Universal Gravitation</header>
            <div className="newton-section kepler-1">
                <h2 className="title">{selectedPlanet} Mass Scale</h2>

                <div className="slider-con">
                    <div className="slider-control">
                        <button
                            className="increment-btn"
                            disabled={massScale <= 0.5 || !experimentMode}
                            onClick={handleDecrement}
                        >
                            -
                        </button>

                        <div className="input-con">
                            <input
                                type="range"
                                min={0.5}
                                max={2}
                                step={0.01}
                                value={massScale}
                                onChange={handleSliderChange}
                                disabled={!experimentMode}
                            />
                            <div className="slider-markers">
                                <span>0.5x</span>
                                <span>2x</span>
                            </div>
                        </div>

                        <button
                            className="increment-btn"
                            disabled={massScale >= 2 || !experimentMode}
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="description-con">
                    <p>Gravitational force (F) = G * (m₁ * m₂) / r²</p>
                    <p>Current Mass: {(originalMass * massScale / 1e24).toFixed(2)}e24 kg</p>
                    <p>Gravitational Force: {(calculateGravitationalForce() / 1e20).toFixed(2)}e20 N</p>
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

export default NewtonGravity;