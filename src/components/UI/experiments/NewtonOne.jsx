import React, { useState, useEffect } from "react";
import useStore, { usePlanetStore } from "../../../store/store";
import initialPlanetsData, { G } from "../../../data/planetsData";
import useExperimentsStore from "../../../store/experiments";
import { getSpeedValue } from "../../../helpers/utils";
import Slider from "../../../components/UI/Slider";

function NewtonGravity() {
  const { updatePlanetData, resetSinglePlanetData, updatePlanetPosition } = usePlanetStore();
  const { setSimSpeed, simSpeed, prevSpeed } = useStore();
  const { experimentPlanet, setExperimentPlanet, experimentStatus, setExperimentStatus } = useExperimentsStore();

  const selectedPlanet = "Earth";
  const [massScale, setMassScale] = useState(1);
  const originalMass = initialPlanetsData[selectedPlanet].mass;
  const sliderValues = [0.5, 1, 2];
  const [sliderIndex, setSliderIndex] = useState(1);


  // Separate initialization effect
  useEffect(() => {
    setExperimentPlanet("Earth");
  }, []);

  // Cleanup effect
  useEffect(() => {
    return () => {
      resetSinglePlanetData(selectedPlanet);
      updatePlanetPosition(selectedPlanet, initialPlanetsData[selectedPlanet].position);
      setExperimentStatus(null);
      setSimSpeed(1);
    };
  }, []);

  // Reset states when experiment starts
  useEffect(() => {
    if (experimentStatus === "started") {
      setMassScale(1);
      updatePlanetData(selectedPlanet, {
        escaped: false,
        collided: false
      });
      updatePlanetPosition(selectedPlanet, initialPlanetsData[selectedPlanet].position);
    }
  }, [experimentStatus]);

  const handleIncrement = () => {
    if (massScale < sliderValues[sliderValues.length - 1]) {
      const newIndex = sliderIndex + 1;
      const newValue = sliderValues[newIndex];

      setSliderIndex(newIndex);
      setMassScale(newValue);
      updatePlanetData(selectedPlanet, {
        mass: originalMass * newValue,
        radius: initialPlanetsData[selectedPlanet].radius * newValue,
      });
    }
  };

  const handleDecrement = () => {
    if (massScale > sliderValues[0]) {
      const newIndex = sliderIndex - 1;
      const newValue = sliderValues[newIndex];
      setSliderIndex(newIndex);
      setMassScale(newValue);
      updatePlanetData(selectedPlanet, {
        mass: originalMass * newValue,
        radius: initialPlanetsData[selectedPlanet].radius * newValue,
      });
    }
  };

  const handleSliderChange = e => {
    const value = parseFloat(e.target.value);
    const newValue = value === 0 ? 0.5 : value;
    setMassScale(newValue);
    updatePlanetData(selectedPlanet, {
      mass: originalMass * newValue,
      radius: initialPlanetsData[selectedPlanet].radius * newValue,
    });
  };

  const calculateGravitationalForce = () => {
    const earthMass = originalMass * massScale;
    const moonMass = 7.34767309e22;
    const distance = 384400000;
    return (G * (earthMass * moonMass)) / (distance * distance);
  };

  const handleStartExperiment = () => {
    setSimSpeed(getSpeedValue("1 hour /s"));
    setExperimentStatus("started");
  };

  const handleReset = () => {
    setMassScale(1);
    resetSinglePlanetData(selectedPlanet);
    setSimSpeed(1);
    setExperimentStatus(null);
  };

  return (
    <>
      <div className='newton-section kepler-1'>
        <h2 className='title'>{selectedPlanet}</h2>

        <Slider
          name={"newton-gravity-slider"}
          min={0}
          max={2}
          markers={[".5x", "1x", "2x"]}
          step={1}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          onSliderChange={handleSliderChange}
          value={massScale === 0.5 ? 0 : massScale}
          disableSlider={experimentStatus === "started"}
          disableIncrement={massScale >= 2 || experimentStatus === "started"}
          disableDecrement={massScale <= 0 || experimentStatus === "started"}
          amountOfTicks={3}
        />

        <div className='details-con'>
          <p>
            Mass: <span> {((originalMass * massScale) / 1e24).toFixed(2)}e24 kg</span>
          </p>
          <p>
            Gravitational Force: <span>{(calculateGravitationalForce() / 1e20).toFixed(2)}e20 N</span>
          </p>
        </div>

        <div className='description-con'>
          <p>The increased gravitational force between the earth and the moon cause the moon to crash into the earth. Uh oh!</p>
        </div>
      </div>
      <footer className='experiment-footer'>
        <button
          className={`btn start-btn ${experimentStatus ? "active" : ""}`}
          onClick={handleStartExperiment}
          disabled={experimentStatus}
        >
          Start Experiment
        </button>
        <button className='btn reset-btn' onClick={handleReset}>
          Reset Values
        </button>
      </footer>
    </>
  );
}

export default NewtonGravity;