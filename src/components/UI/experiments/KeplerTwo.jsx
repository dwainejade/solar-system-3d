import React, { useState, useEffect } from "react";
import useStore, { usePlanetStore } from "../../../store/store";
import useExperimentsStore from "../../../store/experiments";
import initialPlanetsData, { G } from "../../../data/planetsData";
import { getSpeedValue } from "../../../helpers/utils";
import Slider from "../../../components/UI/Slider";

function KeplerTwo() {
  const { planetsData, updatePlanetData } = usePlanetStore();
  const { setSimSpeed, simSpeed, prevSpeed } = useStore();
  const { experimentMode, experimentStatus, setExperimentStatus, experimentPlanet } = useExperimentsStore();
  const selectedPlanet = experimentPlanet;

  // Initialize eccentricity from planet data
  const originalEccentricity = initialPlanetsData[selectedPlanet].eccentricity;
  const [eccentricity, setEccentricity] = useState(originalEccentricity);

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

  const handleSliderChange = e => {
    const newValue = parseFloat(e.target.value);
    setEccentricity(newValue);
    if (experimentMode) {
      updatePlanetData(selectedPlanet, { eccentricity: newValue });
    }
  };

  const handleStartExperiment = () => {
    setExperimentStatus("started");
    updatePlanetData(selectedPlanet, { eccentricity: eccentricity });
    const newSpeed = getSpeedValue("1 month /s");
    setSimSpeed(newSpeed); // Set to normal speed when starting
  };

  const handleReset = () => {
    setSimSpeed(1);
    updatePlanetData(selectedPlanet, { eccentricity: originalEccentricity, initialOrbitalAngle: 0 });
    setExperimentStatus(null);
    console.log("reset");
  };
  // Update local eccentricity if planet data changes externally
  useEffect(() => {
    setEccentricity(planetsData[selectedPlanet].eccentricity);
  }, [planetsData[selectedPlanet].eccentricity]);

  useEffect(() => {
    handleReset();
    return () => {
      handleReset();
    };
  }, [selectedPlanet]);

  return (
    <>
      <div className='newton-section kepler-2'>
        <h2 className='title'>{selectedPlanet}</h2>

        <Slider
          name={"kepler-2-slider"}
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

        <div className='details-con'>
          <p>
            Eccentricity: <span>{eccentricity}</span>
          </p>
        </div>

        <div className='description-con'>
          <p>
            A planet sweeps out equal areas in equal times, moving faster when the planet is closer to the
            Sun and slower when it is farther away.
          </p>
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

export default KeplerTwo;
