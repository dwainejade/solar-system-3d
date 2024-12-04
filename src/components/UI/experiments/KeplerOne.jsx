import React, { useState, useEffect } from "react";
import useStore, { usePlanetStore } from "../../../store/store";
import planetsData from "../../../data/planetsData";
import useExperimentsStore from "../../../store/experiments";
import { getSpeedValue } from "../../../helpers/utils";
import Slider from "../../../components/UI/Slider";

function KeplerOne() {
  const newPlanetsData = usePlanetStore((state) => state.planetsData);
  const updatePlanetData = usePlanetStore((state) => state.updatePlanetData);

  const setSimSpeed = useStore((state) => state.setSimSpeed);

  const experimentMode = useExperimentsStore((state) => state.experimentMode);
  const experimentPlanet = useExperimentsStore((state) => state.experimentPlanet);
  const setExperimentStatus = useExperimentsStore((state) => state.setExperimentStatus);
  const experimentStatus = useExperimentsStore((state) => state.experimentStatus);

  const selectedPlanet = experimentPlanet || "Earth";

  // Initialize eccentricity from planet data
  const [eccentricity, setEccentricity] = useState(newPlanetsData[selectedPlanet].eccentricity);
  const originalEccentricity = planetsData[experimentPlanet].eccentricity; // Saturn's original eccentricity

  const handleIncrement = () => {
    const newValue = Math.min(0.9, eccentricity + 0.1);
    setEccentricity(newValue);
    if (experimentMode) {
      updatePlanetData(selectedPlanet, { eccentricity: newValue });
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, eccentricity - 0.1);
    setEccentricity(newValue);
    if (experimentMode) {
      updatePlanetData(selectedPlanet, { eccentricity: newValue });
    }
  };

  const handleSliderChange = e => {
    const newValue = parseFloat(e.target.value);
    setEccentricity(newValue);
    if (experimentMode) {
      updatePlanetData(selectedPlanet, { eccentricity: newValue });
    }
  };

  const handleStartExperiment = () => {
    updatePlanetData(selectedPlanet, { eccentricity: eccentricity });
    const newSpeed = getSpeedValue("1 month /s");
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
    handleReset();
    return () => {
      handleReset();
    };
  }, [selectedPlanet]);

  return (
    <>
      <div className='newton-section kepler-1'>
        <h2 className='title'>{selectedPlanet}</h2>

        <Slider
          name={"kepler-1-slider"}
          min={0}
          max={0.9}
          markers={["0", ".9"]}
          step={0.01}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          onSliderChange={handleSliderChange}
          value={eccentricity}
          disableSlider={experimentStatus === "started"}
          disableIncrement={eccentricity >= 0.9 || experimentStatus === "started"}
          disableDecrement={eccentricity <= 0 || experimentStatus === "started"}
          amountOfTicks={10}
        />

        <div className='description-con'>
          <p>Planets orbit the Sun in an ellipse, with the Sun at one of the foci.</p>
          <p>
            Note that {selectedPlanet}'s normal eccentricity is {originalEccentricity}.
          </p>
        </div>
      </div>
      <footer className='experiment-footer'>
        <button
          className={`btn start-btn ${experimentMode ? "active" : ""}`}
          onClick={handleStartExperiment}
          disabled={experimentStatus === "started"}
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

export default KeplerOne;
