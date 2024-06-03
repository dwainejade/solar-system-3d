import React, { useState, useEffect } from "react";
import useStore, { usePlanetStore } from "../../store/store";
import {
  G,
  MASS_OF_SUN,
} from "../../data/planetsData";

// Function to calculate orbital period based on radius (Kepler's Third Law simplified)
const calculateOrbitalPeriod = (radiusKm) => {
  const radiusMeters = radiusKm * 1000; // Convert km to meters
  const periodSeconds = Math.sqrt((4 * Math.PI ** 2 * radiusMeters ** 3) / (G * MASS_OF_SUN));
  const periodDays = periodSeconds / (60 * 60 * 24); // Convert seconds to days
  return periodDays.toFixed(1); // Limit to 2 decimal places
};

const calculateSunGravitationalPull = (distanceKm) => {
  const distanceMeters = distanceKm * 1000; // Convert km to meters
  const pull = (G * MASS_OF_SUN) / (distanceMeters ** 2);
  return pull;
};

const formatScientificNotation = (num) => {
  if (!num) return ''
  let str = num.toString();
  if (str.indexOf('e+') !== -1) {
    const [base, exponent] = str.split('e+');
    return (
      <span>
        {parseFloat(base).toFixed(2)} x 10<sup>{exponent}</sup>
      </span>
    );
  }
  return num; // return the number as is if not in exponential form
};


const DetailsMenu = () => {
  const { isEditing, setIsEditing, showDetailsMenu, toggleDetailsMenu } = useStore();
  const { selectedPlanet, updatePlanetData, planetsData, setSelectedPlanet, showResetPlanetModal, showResetAllModal, toggleResetPlanetModal } = usePlanetStore();
  const [editablePlanet, setEditablePlanet] = useState({});
  // const [gravitationalPull, setGravitationalPull] = useState(0)

  useEffect(() => {
    // When selectedPlanet changes, update the local state to reflect the current data
    if (selectedPlanet) {
      setEditablePlanet(planetsData[selectedPlanet.name] || {});
    }
  }, [selectedPlanet, planetsData]);

  const toggleEditing = () => {
    if (isEditing && selectedPlanet?.name) {
      updatePlanetData(selectedPlanet.name, editablePlanet);
      // setSelectedPlanet({ ...selectedPlanet, ...editablePlanet });
      setIsEditing(false); // Exit editing mode
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleChange = (field) => (e) => {
    const newValue = e.target.value; // Get the current value as string to allow typing freely

    setEditablePlanet(prev => ({
      ...prev,
      [field]: newValue // Temporarily store any input including invalid ones like decimals
    }));
  };

  const handleBlur = (field) => {
    let value = parseFloat(editablePlanet[field]); // Convert the current input to a float

    if (field === 'orbitalRadius') {
      value = Math.min(9000000000, Math.max(9000000, value));
      const newOrbitalPeriod = calculateOrbitalPeriod(value);
      const newGravitationalPull = calculateSunGravitationalPull(value);
      setEditablePlanet(prev => ({
        ...prev,
        [field]: value,
        orbitalPeriod: newOrbitalPeriod,
        gravitationalAcceleration: newGravitationalPull.toFixed(7)
      }));
    } else if (field === 'rotationPeriod') {
      value = Math.min(9000000000, Math.max(0.01, value));
      setEditablePlanet(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setEditablePlanet(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };


  const handleSave = () => {
    // Update global state with the values from local state
    updatePlanetData(selectedPlanet.name, editablePlanet);
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
      <h2>{selectedPlanet?.name}</h2>

      {editablePlanet && (
        <div className={`planet-details ${isEditing ? 'editing' : 'saved'}`}>
          <div className="item w1">
            <label htmlFor="mass">Mass:</label>
            <span className="value">{formatScientificNotation(editablePlanet.mass)} kg</span>
          </div>
          <div className="item w1">
            <label htmlFor="radius">Radius:</label>
            <span className="value">{formatScientificNotation(editablePlanet.radius)} km</span>
          </div>

          {selectedPlanet?.name !== 'Sun' &&
            <div className="item w2">
              <label htmlFor="orbitalRadius">Orbit Radius:</label>
              {!isEditing ? <span className="value">{formatScientificNotation(editablePlanet.orbitalRadius)}</span>
                : <input
                  type="text"
                  id="orbitalRadius"
                  value={formatScientificNotation(editablePlanet.orbitalRadius)}
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
              <span className="value">{formatScientificNotation(editablePlanet.orbitalPeriod)} days</span>
            </div>
          }

          {selectedPlanet?.name !== 'Sun' &&
            <div className="item w2">
              <label htmlFor="rotationPeriod">Day Length:</label>
              {!isEditing ? <span className="value">{formatScientificNotation(editablePlanet.rotationPeriod)}</span>
                : <input
                  type="text"
                  value={formatScientificNotation(editablePlanet.rotationPeriod)}
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
              <span>{formatScientificNotation(editablePlanet.rotationPeriod)} hours</span>
            </div>
          }

          {selectedPlanet?.name !== 'Sun' &&
            <div className="item w4">
              <label htmlFor="gravity">Acceleration:</label>
              <span>{formatScientificNotation(editablePlanet.gravitationalAcceleration)} m/s²</span>
            </div>
          }

          {selectedPlanet?.name !== 'Sun' &&
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
