import React, { useState, useEffect } from "react";
import useStore, { usePlanetStore, useCameraStore } from "../../store/store";
import initialPlanetsData, { G, MASS_OF_SUN, asteroidBeltData } from "../../data/planetsData";
import initialMoonsData from "../../data/moonsData";

const formatScientificNotation = (num) => {
  if (num === null || num === undefined) return '';
  const absNum = Math.abs(num);
  const upperLimit = 1e6;
  const lowerLimit = 1e-3;

  if (absNum >= upperLimit || (absNum > 0 && absNum <= lowerLimit)) {
    let newNum = num;
    if (typeof num !== 'number') {
      newNum = parseFloat(num);
    }
    const expStr = newNum?.toExponential(2);
    const [base, exponent] = expStr.split('e');
    const exponentValue = exponent.replace('+', '');
    return (
      <span>
        {parseFloat(base).toFixed(2)} x 10<sup>{exponentValue}</sup>
      </span>
    );
  } else {
    return num.toLocaleString();
  }
};

const DetailsMenu = () => {
  const { isEditing, setIsEditing, showDetailsMenu, toggleDetailsMenu, viewOnlyMode } = useStore();
  const { selectedPlanet, updatePlanetData, planetsData, moonsData: currentMoonsData, handleBodyReset, showResetPlanetModal, showResetAllModal, toggleResetPlanetModal, selectedMoon, updateMoonData } = usePlanetStore();
  const [editableBodyData, setEditableBodyData] = useState({});
  const { activeCamera, isCameraTransitioning } = useCameraStore();

  useEffect(() => {
    if (activeCamera.type === 'planet' || activeCamera.name === 'Sun') {
      setEditableBodyData(planetsData[activeCamera.name] || {});
    }
    if (activeCamera.type === 'moon') {
      setEditableBodyData(currentMoonsData[activeCamera.parentName]?.find((m) => m.name === activeCamera.name) || {});
    }
    if (activeCamera.name === 'Asteroid Belt') {
      setEditableBodyData(asteroidBeltData);
    }
  }, [activeCamera]);

  const toggleEditing = () => {
    if (isEditing && activeCamera.name) {
      // Update appropriate data based on camera type
      if (activeCamera.type === 'planet' || activeCamera.name === 'Sun') {
        updatePlanetData(activeCamera.name, editableBodyData);
      } else if (activeCamera.type === 'moon') {
        // Add moon update logic here when needed
      }
      setIsEditing(false);
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleChange = (field) => (e) => {
    const rawValue = e.target.value;
    // Convert to number immediately for numeric fields
    const newValue = ['orbitalRadius', 'orbitalPeriod', 'rotationPeriod', 'gravitationalAcceleration']
      .includes(field) ? parseFloat(rawValue) || 0 : rawValue;

    setEditableBodyData(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  const handleBlur = (field) => {
    let value = parseFloat(editableBodyData[field]);

    if (isNaN(value)) {
      console.warn(`Invalid value for ${field}`);
      return;
    }

    if (field === 'orbitalRadius') {
      if (activeCamera.type === 'planet') {
        // Planet constraints
        value = Math.min(9000000000, Math.max(9000000, value));
      } else if (activeCamera.type === 'moon') {
        const parentPlanet = planetsData[activeCamera.parentName];
        if (parentPlanet) {
          const minRadius = parentPlanet.radius * 1.5; // Minimum safe orbit
          const maxRadius = parentPlanet.radius * 1000; // Maximum orbit
          value = Math.min(maxRadius, Math.max(minRadius, value));
        }
      }

      // Calculate dependent values
      const newOrbitalPeriod = calculateOrbitalPeriod(value);
      const newGravitationalPull = calculateSunGravitationalPull(value);

      setEditableBodyData(prev => {
        const updatedData = {
          ...prev,
          [field]: value,
          orbitalPeriod: newOrbitalPeriod,
          gravitationalAcceleration: newGravitationalPull
        };
        return updatedData;
      });
    } else if (field === 'rotationPeriod') {
      value = Math.min(9000000000, Math.max(0.01, value));
      setEditableBodyData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    if (activeCamera.type === 'planet' || activeCamera.name === 'Sun') {
      const dataToUpdate = {
        ...editableBodyData,
        orbitalPeriod: parseFloat(editableBodyData.orbitalPeriod),
        gravitationalAcceleration: parseFloat(editableBodyData.gravitationalAcceleration)
      };
      updatePlanetData(activeCamera.name, dataToUpdate);
    } else if (activeCamera.type === 'moon') {
      const dataToUpdate = {
        ...editableBodyData,
        orbitalPeriod: parseFloat(editableBodyData.orbitalPeriod),
        gravitationalAcceleration: parseFloat(editableBodyData.gravitationalAcceleration)
      };
      updateMoonData(activeCamera.parentName, activeCamera.name, dataToUpdate);
    }
    setIsEditing(false);
  };


  // Add these helper functions if they're not already present
  const calculateOrbitalPeriod = (radiusKm) => {
    try {
      if (activeCamera.type === 'moon') {
        // Get parent planet's mass for moon calculations
        const parentPlanet = planetsData[activeCamera.parentName];
        if (!parentPlanet) {
          console.error('Parent planet not found');
          return 0;
        }

        // Convert units
        const radiusMeters = radiusKm * 1000;
        const parentMass = parentPlanet.mass; // Mass in kg

        // Calculate period using planet's mass instead of sun's mass
        const periodSeconds = Math.sqrt((4 * Math.PI ** 2 * radiusMeters ** 3) / (G * parentMass));
        const periodDays = periodSeconds / (60 * 60 * 24);

        return periodDays;
      } else {
        // Original calculation for planets orbiting the sun
        const radiusMeters = radiusKm * 1000;
        const periodSeconds = Math.sqrt((4 * Math.PI ** 2 * radiusMeters ** 3) / (G * MASS_OF_SUN));
        const periodDays = periodSeconds / (60 * 60 * 24);
        return periodDays;
      }
    } catch (error) {
      console.error('Error calculating orbital period:', error);
      return 0;
    }
  };

  const calculateSunGravitationalPull = (distanceKm) => {
    try {
      const distanceMeters = distanceKm * 1000;
      return (G * MASS_OF_SUN) / (distanceMeters ** 2);
    } catch (error) {
      console.error('Error calculating gravitational pull:', error);
      return 0;
    }
  };
  // For display purposes only, use toFixed
  const formatGravitationalAcceleration = (value) => {
    if (typeof value === 'number') {
      return value.toFixed(7);
    }
    return value;
  };


  useEffect(() => {
    if (activeCamera.type === 'planet' || activeCamera.name === 'Sun') {
      setEditableBodyData(planetsData[activeCamera.name] || {});
    }
    if (activeCamera.type === 'moon') {
      setEditableBodyData(currentMoonsData[activeCamera.parentName]?.find((m) => m.name === activeCamera.name) || {});
    }
    if (activeCamera.name === 'Asteroid Belt') {
      setEditableBodyData(asteroidBeltData);
    }
  }, [activeCamera, planetsData, currentMoonsData]); // Add store data to dependencies

  // Modify handleBodyReset to also update local state
  const handleReset = () => {
    handleBodyReset();
    // Immediately update local state with reset data
    if (activeCamera.type === 'planet' || activeCamera.name === 'Sun') {
      setEditableBodyData(initialPlanetsData[activeCamera.name] || {});
    } else if (activeCamera.type === 'moon') {
      const initialMoonData = initialMoonsData[activeCamera.parentName]?.find(
        moon => moon.name === activeCamera.name
      );
      setEditableBodyData(initialMoonData || {});
    }
    setIsEditing(false); // Exit editing mode after reset
  };

  const renderAsteroidBeltDetails = () => {

    return (
      <div className="planet-details asteroid-belt-details" >
        <div className="item w2">
          <label>Inner Radius:</label>
          <span className="value">{formatScientificNotation(editableBodyData.innerRadius)} km</span>
        </div>
        <div className="item w2">
          <label>Outer Radius:</label>
          <span className="value">{formatScientificNotation(editableBodyData.outerRadius)} km</span>
        </div>
        <div className="item w2">
          <label>Total Mass:</label>
          <span className="value">{formatScientificNotation(editableBodyData.mass)} kg</span>
        </div>
        <div className="item w2">
          <label>Orbital Period:</label>
          <span className="value">{formatScientificNotation(editableBodyData.orbitalPeriod)} days</span>
        </div>
        <div className="item w2">
          <label>Total Objects:</label>
          <span>{editableBodyData.estimatedObjects?.total}</span>
        </div>
      </div >
    );
  }


  return (
    <>
      <h2>{editableBodyData?.name}</h2>

      {editableBodyData && (
        <>
          {activeCamera.name === 'Asteroid Belt' ? (
            renderAsteroidBeltDetails()
          ) : (
            <>
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
                    {!isEditing ?
                      <span className="value">{formatScientificNotation(editableBodyData.orbitalRadius)}</span>
                      : <input
                        type="text"
                        id="orbitalRadius"
                        value={editableBodyData.orbitalRadius}
                        onChange={handleChange('orbitalRadius')}
                        onBlur={() => handleBlur('orbitalRadius')}
                        disabled={showResetPlanetModal || showResetAllModal}
                        min={activeCamera.type === 'moon' ? planetsData[activeCamera.parentName]?.radius : "9000000"}
                        max={activeCamera.type === 'moon' ? planetsData[activeCamera.parentName]?.radius * 10 : "9000000000"}
                        className="input value"
                      />
                    }
                    <span className="measurement-unit">km</span>
                  </div>
                }

                {selectedPlanet?.name !== 'Sun' &&
                  <div className="item w2">
                    <label htmlFor="eccentricity">Eccentricity:</label>
                    <span className="value">{editableBodyData.eccentricity}</span>
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
                    {!isEditing ?
                      <span className="value">{formatScientificNotation(editableBodyData.rotationPeriod)}</span>
                      : <input
                        type="text"
                        value={editableBodyData.rotationPeriod} // Remove formatScientificNotation here
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
                    <span>{formatScientificNotation(formatGravitationalAcceleration(editableBodyData.gravitationalAcceleration))} m/s²</span>
                  </div>
                }

                {selectedPlanet?.name !== 'Sun' && !viewOnlyMode &&
                  <div className='button-con'>
                    <button onClick={isEditing ? handleSave : toggleEditing} className='edit-planet-btn btn' disabled={isCameraTransitioning}>
                      {isEditing ? "Save Values" : "Adjust Values"}
                    </button>

                    <button onClick={handleReset} className='reset-planet-btn btn' disabled={isCameraTransitioning}>
                      Reset Values
                    </button>
                  </div>
                }

              </div>
            </>
          )}
        </>
      )}
    </>
  )

}

export default DetailsMenu;
