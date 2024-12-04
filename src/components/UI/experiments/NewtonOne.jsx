import React, { useState, useEffect } from "react";
import useStore, { usePlanetStore } from "../../../store/store";
import initialPlanetsData, { G } from "../../../data/planetsData";
import useExperimentsStore from "../../../store/experiments";
import { getSpeedValue } from "../../../helpers/utils";
import Slider from "../../../components/UI/Slider";

function NewtonGravity() {
  const updatePlanetData = usePlanetStore((state) => state.updatePlanetData);
  const resetSinglePlanetData = usePlanetStore((state) => state.resetSinglePlanetData);
  const updatePlanetPosition = usePlanetStore((state) => state.updatePlanetPosition);

  const setSimSpeed = useStore((state) => state.setSimSpeed);

  const setExperimentPlanet = useExperimentsStore((state) => state.setExperimentPlanet);
  const experimentStatus = useExperimentsStore((state) => state.experimentStatus);
  const setExperimentStatus = useExperimentsStore((state) => state.setExperimentStatus);
  const newtonOneStatus = useExperimentsStore((state) => state.newtonOneStatus);
  const setNewtonOneStatus = useExperimentsStore((state) => state.setNewtonOneStatus);

  const selectedPlanet = "Earth";
  const [massScale, setMassScale] = useState(1);
  const originalMass = initialPlanetsData[selectedPlanet].mass;
  const sliderValues = [0.5, 1, 2];
  const [sliderIndex, setSliderIndex] = useState(1);

  // Separate initialization effect
  useEffect(() => {
    setExperimentPlanet("Earth");
  }, []);


  // Modified experiment status effect - only reset position and flags
  useEffect(() => {
    if (experimentStatus === "started") {
      updatePlanetData(selectedPlanet, {
        escaped: false,
        collided: false,
        // Keep the current mass and radius, just update the experiment flags
        position: initialPlanetsData[selectedPlanet].position
      });
    }
  }, [experimentStatus]);

  // Update planet data whenever mass scale changes
  useEffect(() => {
    updatePlanetData(selectedPlanet, {
      mass: originalMass * massScale,
      radius: initialPlanetsData[selectedPlanet].radius * massScale,
    });
  }, [massScale]);

  const handleIncrement = () => {
    if (sliderIndex < sliderValues.length - 1) {
      const newIndex = sliderIndex + 1;
      setSliderIndex(newIndex);
      setMassScale(sliderValues[newIndex]);
    }
  };

  const handleDecrement = () => {
    if (sliderIndex > 0) {
      const newIndex = sliderIndex - 1;
      setSliderIndex(newIndex);
      setMassScale(sliderValues[newIndex]);
    }
  };

  const handleSliderChange = e => {
    const value = parseFloat(e.target.value);
    const newIndex = value === 0 ? 0 : value;
    setSliderIndex(newIndex);
    setMassScale(sliderValues[newIndex]);
  };

  const calculateGravitationalForce = () => {
    const earthMass = originalMass * massScale;
    const moonMass = 7.34767309e22;
    const distance = 384400000;
    return (G * (earthMass * moonMass)) / (distance * distance);
  };

  const handleStartExperiment = () => {
    setSimSpeed(getSpeedValue("1 day /s"));
    setExperimentStatus("started");
  };

  const handleReset = () => {
    setMassScale(1);
    setSliderIndex(1);
    resetSinglePlanetData(selectedPlanet);
    setSimSpeed(1);
    setExperimentStatus(null);
    setNewtonOneStatus(null);
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      updatePlanetPosition(selectedPlanet, initialPlanetsData[selectedPlanet].position);
      handleReset();
    };
  }, []);

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
          value={sliderIndex}
          disableSlider={experimentStatus}
          disableIncrement={sliderIndex >= 2 || experimentStatus}
          disableDecrement={sliderIndex <= 0 || experimentStatus}
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
        {newtonOneStatus &&
          <div className='description-con'>
            {newtonOneStatus === 'stable' &&
              <p>This is the normal gravitational force between the Earth and the Moon, causing its expected orbit.</p>}
            {newtonOneStatus === 'colliede' &&
              <p>The increased gravitational force between the Earth and the Moon causes the Moon to crash into the Earth. Uh oh!</p>}
            {newtonOneStatus === 'escaped' &&
              <p>The decreased gravitational force between the Earth and the Moon caused the moon to fly off into space. Uh oh!</p>}
          </div>
        }
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