import React, { useState } from "react";
import useStore, { usePlanetStore } from "../../../store/store";
import initialPlanetsData, { G } from "../../../data/planetsData";
import useExperimentsStore from "../../../store/experiments";
import { getSpeedValue } from "../../../helpers/utils";
import Slider from "../../../components/UI/Slider";

function NewtonGravity() {
  const { updatePlanetData, resetSinglePlanetData } = usePlanetStore();
  const { setSimSpeed, simSpeed, prevSpeed } = useStore();
  const { experimentPlanet, experimentStatus, setExperimentStatus } = useExperimentsStore();
  console.log("experiment", experimentStatus);

  const selectedPlanet = experimentPlanet || "Earth";

  // Initialize mass scale
  const [massScale, setMassScale] = useState(1);
  const originalMass = initialPlanetsData[selectedPlanet].mass;
  const sliderValues = [0.5, 1, 2];
  const [sliderIndex, setSliderIndex] = useState(1);

  // Update the handlers to work together
  const handleIncrement = () => {
    if (sliderIndex < sliderValues.length - 1) {
      const newIndex = sliderIndex + 1;
      setSliderIndex(newIndex);
      setMassScale(sliderValues[newIndex]);
      updatePlanetData(selectedPlanet, {
        mass: originalMass * sliderValues[newIndex],
        radius: initialPlanetsData[selectedPlanet].radius * sliderValues[newIndex]
      });
    }
  };

  const handleDecrement = () => {
    if (sliderIndex > 0) {
      const newIndex = sliderIndex - 1;
      setSliderIndex(newIndex);
      setMassScale(sliderValues[newIndex]);
      updatePlanetData(selectedPlanet, {
        mass: originalMass * sliderValues[newIndex],
        radius: initialPlanetsData[selectedPlanet].radius * sliderValues[newIndex]
      });
    }
  };

  const handleSliderChange = (e) => {
    const index = parseInt(e.target.value);
    setSliderIndex(index);
    setMassScale(sliderValues[index]);
    updatePlanetData(selectedPlanet, {
      mass: originalMass * sliderValues[index],
      radius: initialPlanetsData[selectedPlanet].radius * sliderValues[index]
    });
  };

  const calculateGravitationalForce = () => {
    const earthMass = originalMass * massScale;
    const moonMass = 7.34767309e22; // Moon's mass in kg
    const distance = 384400000; // Average Earth-Moon distance in meters
    return (G * (earthMass * moonMass)) / (distance * distance);
  };

  const handleStartExperiment = () => {
    setSimSpeed(getSpeedValue("1 day /s"));
    setExperimentStatus("started");
  };

  const handleReset = () => {
    setMassScale(1);
    resetSinglePlanetData(selectedPlanet);
    setSimSpeed(1);
    setSliderIndex(1);
    setExperimentStatus(null);
  };

  const results = () => {
    switch (sliderIndex) {
      case 0:
        return <p>The decreased gravitational force between the Earth and the Moon caused the Moon to fly off into space. Uh oh!</p>
      case 1:
        return <p>The force of gravity on a body is proportional to the product of its mass and the square of its distance from the center of the Earth.</p>
      case 2:
        return <p>The increased gravitational force between the Earth and the Moon caused the Moon to crash into the Earth. Uh oh!</p>
      default:
        return <p>The force of gravity on a body is proportional to the product of its mass and the square of its distance from the center of the Earth.</p>
    }
  }

  return (
    <>
      <header>Newton's Law of Universal Gravitation</header>
      <div className="newton-section newton-1">
        <h2 className="title">{selectedPlanet}</h2>

        <Slider
          name={'newton-gravity-slider'}
          min={0}
          max={2}
          markers={['.5x', '1x', '2x']}
          step={1}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          onSliderChange={handleSliderChange}
          value={sliderIndex}
          disableSlider={experimentStatus === 'started'}
          disableIncrement={sliderIndex >= 2 || experimentStatus === 'started'}
          disableDecrement={sliderIndex <= 0 || experimentStatus === 'started'}
          amountOfTicks={3}
        />

        <div className="info-con">
          <p className='label'>Current Mass: <span className='value'>{(originalMass * massScale / 1e24).toFixed(2)}e24 kg</span></p>
          <p className='label'>Gravitational Force: <span className='value'>{(calculateGravitationalForce() / 1e20).toFixed(2)}e20 N</span></p>
        </div>

        {experimentStatus === 'completed' && (
          <div className="description-con">
            {results()}
          </div>
        )}
      </div>
      <footer className="experiment-footer">
        <button
          className={`btn start-btn ${experimentStatus ? 'active' : ''}`}
          onClick={handleStartExperiment}
          disabled={experimentStatus}
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
