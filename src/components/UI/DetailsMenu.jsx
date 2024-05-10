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
  const { selectedPlanet, updatePlanetData, planetsData, setSelectedPlanet, resetSinglePlanetData, toggleResetPlanetModal } = usePlanetStore();
  const [editablePlanet, setEditablePlanet] = useState({});
  const [gravitationalPull, setGravitationalPull] = useState(0)

  useEffect(() => {
    if (selectedPlanet) {
      const currentPlanetData = planetsData[selectedPlanet.name];
      setEditablePlanet(currentPlanetData || {});
      setGravitationalPull(calculateSunGravitationalPull(selectedPlanet.orbitalRadius))
    }
  }, [selectedPlanet, planetsData, isEditing]);

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
    let newValue = e.target.type === 'number' ? Number(e.target.value) : e.target.value;

    // Create a copy of the editablePlanet to modify
    let updatedPlanet = { ...editablePlanet, [field]: newValue };

    if (field === 'orbitalRadius') {
      // Recalculate the orbital period and gravitational pull
      const newOrbitalPeriod = calculateOrbitalPeriod(newValue);
      const acceleration = calculateSunGravitationalPull(newValue);
      updatedPlanet.orbitalPeriod = newOrbitalPeriod;
      updatedPlanet.gravitationalAcceleration = acceleration.toFixed(3);
    }
    setEditablePlanet(updatedPlanet);

    if (isEditing) {
      updatePlanetData(selectedPlanet.name, updatedPlanet);
    }
  };


  // formatScientificNotation(editablePlanet?.mass)
  return (
    <>
      <h2>{selectedPlanet?.name}</h2>

      {editablePlanet && (
        <div className={`planet-details ${isEditing ? 'editing' : 'saved'}`}>
          <div className="item w1">
            <label htmlFor="mass">Mass:</label>
            <span>{formatScientificNotation(editablePlanet.mass)} kg</span>
          </div>
          <div className="item w1">
            <label htmlFor="radius">Radius:</label>
            <span>{formatScientificNotation(editablePlanet.radius)} km</span>
          </div>
          <div className="item w2">
            <label htmlFor="orbitalRadius">Orbit Radius:</label>
            <input
              type="text"
              id="orbitalRadius"
              value={formatScientificNotation(editablePlanet.orbitalRadius)}
              onChange={handleChange('orbitalRadius')}
              disabled={!isEditing}
            />
            <span className="measurement-unit">km</span>
          </div>
          <div className="item w2">
            <label htmlFor="orbitalPeriod">Orbital Period:</label>
            <span>{editablePlanet.orbitalPeriod || ''} days</span>
          </div>
          <div className="item w2">
            <label htmlFor="rotationPeriod">Day Length:</label>
            <input
              type="text"
              value={editablePlanet.rotationPeriod || ''}
              onChange={handleChange('rotationPeriod')}
              disabled={!isEditing}
            />
            <span className="measurement-unit">hours</span>
          </div>
          <div className="item w4">
            <label htmlFor="gravity">Acceleration:</label>
            <span>{editablePlanet.gravitationalAcceleration || ''} m/s²</span>

          </div>

          <div className='button-con'>
            <button onClick={toggleEditing} className='edit-planet-btn btn'>
              {isEditing ? "Save Values" : "Adjust Values"}
            </button>

            <button onClick={() => { toggleResetPlanetModal(true) }} className='reset-planet-btn btn'>
              Reset Values
            </button>
          </div>
        </div>


      )}
    </>
  );

};

export default DetailsMenu;
