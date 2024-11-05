import React, { useState, useEffect } from "react";
import useStore, { usePlanetStore, useCameraStore } from "../../store/store";
import { G, MASS_OF_SUN, asteroidBeltData } from "../../data/planetsData";

const formatScientificNotation = (num) => {
  if (num === null || num === undefined) return '';
  const absNum = Math.abs(num);
  const upperLimit = 1e6;
  const lowerLimit = 1e-3;

  if (absNum >= upperLimit || (absNum > 0 && absNum <= lowerLimit)) {
    const expStr = num.toExponential(2);
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
  const { selectedPlanet, updatePlanetData, planetsData, moonsData: currentMoonsData, setSelectedPlanet, showResetPlanetModal, showResetAllModal, toggleResetPlanetModal, selectedMoon } = usePlanetStore();
  const [editableBodyData, setEditableBodyData] = useState({});
  const { activeCamera } = useCameraStore();

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

  const renderAsteroidBeltDetails = () => (
    <div className="asteroid-belt-details">
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
        <label>Surface Temperature:</label>
        <span className="value">{editableBodyData.surfaceTemp}°C</span>
      </div>

      <div className="composition-section w4">
        <h3 className="section-title">Composition</h3>
        <div className="composition-grid">
          <div className="composition-item">
            <label>Rocky:</label>
            <span>{editableBodyData.composition?.rocky}</span>
          </div>
          <div className="composition-item">
            <label>Metallic:</label>
            <span>{editableBodyData.composition?.metallic}</span>
          </div>
          <div className="composition-item">
            <label>Other:</label>
            <span>{editableBodyData.composition?.other}</span>
          </div>
        </div>
      </div>

      <div className="major-objects-section w4">
        <h3 className="section-title">Major Objects</h3>
        <div className="objects-grid">
          {editableBodyData.interestPoints?.map((point, index) => (
            <div key={index} className="object-item">
              <div className="object-name">{point.title}</div>
              <div className="object-type">{point.type}</div>
              <div className="object-diameter">Diameter: {point.diameter} km</div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section w4">
        <h3 className="section-title">Estimated Objects</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <label>Total Objects:</label>
            <span>{editableBodyData.estimatedObjects?.total}</span>
          </div>
          <div className="stat-item">
            <label>Larger than 1km:</label>
            <span>{editableBodyData.estimatedObjects?.largerThan1km}</span>
          </div>
          <div className="stat-item">
            <label>Identified:</label>
            <span>{editableBodyData.estimatedObjects?.identified}</span>
          </div>
        </div>
      </div>

      <div className="description-section w4">
        <p className="description">{editableBodyData.description}</p>
      </div>
    </div>
  );


  return (
    <>
      <h2>{editableBodyData?.name}</h2>

      {editableBodyData && (
        <div className={`planet-details ${isEditing ? 'editing' : 'saved'}`}>
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
            </>
          )}
        </div>
      )}
    </>
  )

}

export default DetailsMenu;
