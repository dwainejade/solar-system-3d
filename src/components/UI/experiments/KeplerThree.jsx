import React, { useState, useEffect } from "react";
import useStore, { usePlanetStore } from "../../../store/store";
import useExperimentsStore from "../../../store/experiments";
import planetsData from "../../../data/planetsData";
import { getSpeedValue } from "../../../helpers/utils";
import Slider from "../../../components/UI/Slider";

function KeplerThree() {
  const { updatePlanetData, resetSinglePlanetData } = usePlanetStore();
  const { setExperimentStatus, experimentStatus, setExperimentPlanet } = useExperimentsStore();
  const { setSimSpeed } = useStore();

  const selectedPlanet = "Earth";

  const [originalOrbitalRadius] = useState(planetsData[selectedPlanet].orbitalRadius);
  const [originalOrbitalPeriod] = useState(planetsData[selectedPlanet].orbitalPeriod);
  const [AU, setAU] = useState(1);

  // Separate initialization effect
  useEffect(() => {
    setExperimentPlanet("Earth");
  }, []);

  const calculatePeriod = currentAU => {
    const periodRatio = Math.sqrt(Math.pow(currentAU, 3));
    return originalOrbitalPeriod * periodRatio;
  };

  const formatPeriod = (periodInDays) => {
    const years = Math.floor(periodInDays / 365.25);
    const remainingDays = Math.round(periodInDays % 365.25);
    if (years === 0) return `${remainingDays} days`;
    if (remainingDays === 0) return `${years > 1 ? `${years} years` : `${years} year`}`;
    return `${years} years, ${remainingDays} days`;
  };

  const handleUpdatePlanetData = newAU => {
    const newPeriod = calculatePeriod(newAU);
    updatePlanetData(selectedPlanet, {
      orbitalRadius: originalOrbitalRadius * newAU,
      orbitalPeriod: newPeriod,
      initialOrbitalAngle: Math.random() * 360  // Reset angle on each update
    });
  };

  const handleIncrement = () => {
    const newValue = Math.min(10, AU + 0.1);
    setAU(newValue);
    handleUpdatePlanetData(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(1, AU - 0.1);
    setAU(newValue);
    handleUpdatePlanetData(newValue);
  };

  const handleSliderChange = e => {
    const newValue = parseFloat(e.target.value);
    setAU(newValue);
    handleUpdatePlanetData(newValue);
  };

  const handleStartExperiment = () => {
    const newSpeed = getSpeedValue("1 month /s");
    setSimSpeed(newSpeed);
    setExperimentStatus("started");
  };

  const handleReset = () => {
    setAU(1);
    resetSinglePlanetData(selectedPlanet);
    setSimSpeed(1);
    setExperimentStatus(null);
  };

  useEffect(() => {
    return () => {
      handleReset();
    };
  }, []);

  const orbitalPeriod = calculatePeriod(AU);

  return (
    <>
      <div className='newton-section kepler-3'>
        <h2 className='title'>Earth</h2>

        <Slider
          name={"kepler-3-slider"}
          min={1}
          max={10}
          markers={["1", "10"]}
          step={0.1}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          onSliderChange={handleSliderChange}
          value={AU}
          disableSlider={experimentStatus === "started"}
          disableIncrement={AU >= 10 || experimentStatus === "started"}
          disableDecrement={AU <= 1 || experimentStatus === "started"}
          amountOfTicks={10}
        />

        <div className='details-con'>
          <p>
            Distance from Sun: <span>{AU.toFixed(1)} AU</span>
          </p>
          <div className="results">
            {experimentStatus === "started" && (
              <p>
                Orbital Period: <span>{formatPeriod(orbitalPeriod)}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <footer className='experiment-footer kepler-3-footer'>
        <button
          className={`btn start-btn ${experimentStatus === "started" ? "active" : ""}`}
          onClick={handleStartExperiment}
          disabled={experimentStatus === "started"}
        >
          Calculate Orbital Period
        </button>
        <button className='btn reset-btn' onClick={handleReset}>
          Reset
        </button>
      </footer>
    </>
  );
}

export default KeplerThree;