import React, { useState, useEffect } from "react";
import useStore, { usePlanetStore } from "../../store/store";
import { G, MASS_OF_SUN } from "../../data/planetsData";
import moonsData, { findMoonAndParent } from "../../data/moonsData";

// Function to calculate orbital period based on radius (Kepler's Third Law simplified)
const calculateOrbitalPeriod = (radiusKm) => {
  const radiusMeters = radiusKm * 1000; // Convert km to meters
  const periodSeconds = Math.sqrt((4 * Math.PI ** 2 * radiusMeters ** 3) / (G * MASS_OF_SUN));
  const periodDays = periodSeconds / (60 * 60 * 24); // Convert seconds to days
  return periodDays.toFixed(1); // Limit to 2 decimal places
};

const formatScientificNotation = (num) => {
  if (num === null || num === undefined) return '';
  const absNum = Math.abs(num);

  // Define thresholds for when to use scientific notation
  const upperLimit = 1e6;  // Numbers greater than or equal to 1,000,000
  const lowerLimit = 1e-3; // Numbers less than or equal to 0.001

  if (absNum >= upperLimit || (absNum > 0 && absNum <= lowerLimit)) {
    // Convert to scientific notation with 2 decimal places
    const expStr = num.toExponential(2); // e.g., '1.48e+15'
    const [base, exponent] = expStr.split('e');
    const exponentValue = exponent.replace('+', ''); // Remove '+' sign if present
    return (
      <span>
        {parseFloat(base).toFixed(2)} x 10<sup>{exponentValue}</sup>
      </span>
    );
  } else {
    // Return the number with commas as thousand separators
    return num.toLocaleString();
  }
};


const DetailsMenu = () => {
  const { isEditing, setIsEditing, showDetailsMenu, toggleDetailsMenu, viewOnlyMode } = useStore();
  const { selectedPlanet, updatePlanetData, planetsData, moonsData: currentMoonsData, setSelectedPlanet, showResetPlanetModal, showResetAllModal, toggleResetPlanetModal, selectedMoon } = usePlanetStore();
  const [editableBodyData, setEditableBodyData] = useState({});
  // const [gravitationalPull, setGravitationalPull] = useState(0)
  useEffect(() => {
    // When selectedPlanet changes, update the local state to reflect the current data
    if (selectedPlanet && !selectedMoon) {
      setEditableBodyData(planetsData[selectedPlanet.name] || {});
    }
    if (selectedMoon) {
      setEditableBodyData(selectedMoon);
    }
  }, [selectedPlanet, planetsData, selectedMoon]);
  // console.log(selectedMoon)
  // console.log(editableBodyData)
  const toggleEditing = () => {
    if (isEditing && selectedPlanet?.name) {
      updatePlanetData(selectedPlanet.name, editableBodyData);
      setIsEditing(false); // Exit editing mode
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleChange = (field) => (e) => {
    const newValue = e.target.value; // Get the current value as string to allow typing freely

    setEditableBodyData(prev => ({
      ...prev,
      [field]: newValue // Temporarily store any input including invalid ones like decimals
    }));
  };

  const handleBlur = (field) => {
    let value = parseFloat(editableBodyData[field]); // Convert the current input to a float

    if (field === 'orbitalRadius') {
      value = Math.min(9000000000, Math.max(9000000, value));
      const newOrbitalPeriod = calculateOrbitalPeriod(value);
      const newGravitationalPull = calculateSunGravitationalPull(value);
      setEditableBodyData(prev => ({
        ...prev,
        [field]: value,
        orbitalPeriod: newOrbitalPeriod,
        gravitationalAcceleration: newGravitationalPull.toFixed(7)
      }));
    } else if (field === 'rotationPeriod') {
      value = Math.min(9000000000, Math.max(0.01, value));
      setEditableBodyData(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setEditableBodyData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };


  const handleSave = () => {
    // Update global state with the values from local state
    updatePlanetData(selectedPlanet.name, editableBodyData);
    setIsEditing(false); // Optionally close editing mode
  };

  const handleReset = () => {
    toggleResetPlanetModal(true)
  };

  // initialize with adjust values button
  useEffect(() => {
    setIsEditing(false);
  }, [])


  return (
    <>
      <h2>{editableBodyData?.name}</h2>

      {editableBodyData && (
        <div className={`planet-details ${isEditing ? 'editing' : 'saved'}`}>
          <div className="item w1">
            <label htmlFor="mass">Mass:</label>
            <span className="value">{formatScientificNotation(editableBodyData.mass)} kg</span>
          </div>
          <div className="item w1">
            <label htmlFor="radius">Radius:</label>
            <span className="value">{formatScientificNotation(editableBodyData.radius)} km</span>
          </div>

          {selectedPlanet?.name !== 'Sun' &&
            <div className="item w2">
              <label htmlFor="orbitalRadius">Orbit Radius:</label>
              {!isEditing ? <span className="value">{formatScientificNotation(editableBodyData.orbitalRadius)}</span>
                : <input
                  type="text"
                  id="orbitalRadius"
                  value={formatScientificNotation(editableBodyData.orbitalRadius)}
                  onChange={handleChange('orbitalRadius')}
                  onBlur={() => handleBlur('orbitalRadius')}
                  disabled={showResetPlanetModal || showResetAllModal}
                  min="9000000"
                  max="9000000000"
                  className="input value"
                />
              }
              <span className="measurement-unit">km</span>
            </div>
          }

          {selectedPlanet?.name !== 'Sun' &&
            <div className="item w2">
              <label htmlFor="orbitalPeriod">Orbital Period:</label>
              <span className="value">{formatScientificNotation(editableBodyData.orbitalPeriod)} days</span>
            </div>
          }

          {selectedPlanet?.name !== 'Sun' &&
            <div className="item w2">
              <label htmlFor="rotationPeriod">Day Length:</label>
              {!isEditing ? <span className="value">{formatScientificNotation(editableBodyData.rotationPeriod)}</span>
                : <input
                  type="text"
                  value={formatScientificNotation(editableBodyData.rotationPeriod)}
                  onChange={handleChange('rotationPeriod')}
                  onBlur={() => handleBlur('rotationPeriod')}
                  disabled={!isEditing || showResetPlanetModal || showResetAllModal}
                  min="0.01"
                  max="9000000000"
                  className="input value"
                />
              }
              <span className="measurement-unit">hours</span>
            </div>
          }

          {selectedPlanet?.name === 'Sun' &&
            <div className="item w2">
              <label htmlFor="rotationPeriod">Day Length:</label>
              <span>{formatScientificNotation(editableBodyData.rotationPeriod)} hours</span>
            </div>
          }

          {selectedPlanet?.name !== 'Sun' &&
            <div className="item w4">
              <label htmlFor="gravity">Acceleration:</label>
              <span>{formatScientificNotation(editableBodyData.gravitationalAcceleration)} m/s²</span>
            </div>
          }

          {selectedPlanet?.name !== 'Sun' && !viewOnlyMode &&
            <div className='button-con'>
              <button onClick={isEditing ? handleSave : toggleEditing} className='edit-planet-btn btn'>
                {isEditing ? "Save Values" : "Adjust Values"}
              </button>

              <button onClick={handleReset} className='reset-planet-btn btn'>
                Reset Values
              </button>
            </div>
          }

        </div>
      )}
    </>
  );

};

export default DetailsMenu;
