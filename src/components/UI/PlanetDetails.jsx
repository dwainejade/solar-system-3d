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
  return periodDays.toFixed(2); // Limit to 2 decimal places
};

const calculateSunGravitationalPull = (distanceKm) => {
  const distanceMeters = distanceKm * 1000; // Convert km to meters
  const gravitationalPull = (G * MASS_OF_SUN) / (distanceMeters ** 2);
  return gravitationalPull; // Returns gravitational pull in m/s^2
};

const Menu = () => {
  const { isEditing, setIsEditing } = useStore();
  const { selectedPlanet, updatePlanetData, planetsData, setSelectedPlanet, resetSinglePlanetData } = usePlanetStore();
  const [editablePlanet, setEditablePlanet] = useState({});
  const [gravitationalPull, setGravitationalPull] = useState(0)
  useEffect(() => {
    if (selectedPlanet) {
      // Directly set editablePlanet to reflect the latest data from planetsData
      // This ensures that changes to planetsData are reflected here
      const currentPlanetData = planetsData[selectedPlanet.name];
      setEditablePlanet(currentPlanetData || {});
      setGravitationalPull(calculateSunGravitationalPull(selectedPlanet.orbitalRadius))
    }
  }, [selectedPlanet, planetsData, isEditing]);

  const toggleEditing = () => {
    if (isEditing && selectedPlanet?.name) {
      updatePlanetData(selectedPlanet.name, editablePlanet);
      setSelectedPlanet({ ...selectedPlanet, ...editablePlanet });
      setIsEditing(false); // Exit editing mode
    } else {
      setIsEditing(!isEditing);
    }
  };


  const handleChange = (field) => (e) => {
    let newValue = e.target.type === 'number' ? Number(e.target.value) : e.target.value;

    let updatedPlanet = { ...editablePlanet, [field]: newValue };

    // Recalculate both the orbitalPeriod and temperature when orbitalRadius is changed
    if (field === 'orbitalRadius') {
      const newOrbitalPeriod = calculateOrbitalPeriod(newValue);
      const newGravitationalPull = calculateSunGravitationalPull(newValue); // Assuming newValue is the distance from the Sun in km
      updatedPlanet = { ...updatedPlanet, orbitalPeriod: newOrbitalPeriod, gravity: newGravitationalPull.toFixed(2) };
    }

    setEditablePlanet(updatedPlanet);
  };


  return (
    <>
      <h2>{selectedPlanet?.name}</h2>

      {editablePlanet && (
        <div className={`planet-details ${isEditing ? 'editing' : 'saved'}`}>
          <div className="item w1">
            <label htmlFor="mass">Mass:</label>
            <span>{editablePlanet.mass || ''} kg</span>
          </div>
          <div className="item w1">
            <label htmlFor="radius">Radius:</label>
            <span>{editablePlanet.radius || ''} kg</span>
          </div>
          <div className="item w2">
            <label htmlFor="orbitalRadius">Orbit Radius:</label>
            <input
              type="text"
              id="orbitalRadius"
              value={editablePlanet.orbitalRadius || ''}
              onChange={handleChange('orbitalRadius')}
              disabled={!isEditing}
            />
            <span>km</span>
          </div>
          <div className="item w2">
            <label htmlFor="orbitalPeriod">Orbital Period:</label>
            <input
              type="text"
              value={editablePlanet.orbitalPeriod || ''}
              onChange={handleChange('orbitalPeriod')}
              disabled={!isEditing}
            />
            <span>days</span>
          </div>
          <div className="item w2">
            <label htmlFor="rotationPeriod">Rotation Period:</label>
            <input
              type="text"
              value={editablePlanet.rotationPeriod || ''}
              onChange={handleChange('rotationPeriod')}
              disabled={!isEditing}
            />
            <span>hours</span>
          </div>
          <div className="item w4">
            <label htmlFor="gravity">Gravitational Pull:</label>
            <p>{gravitationalPull.toFixed(3) || ''} m/s²</p>
          </div>

          <div className='button-con'>
            <button onClick={toggleEditing} className='edit-planet-btn btn'>
              {isEditing ? "Save Changes" : "Adjust Values"}
            </button>

            <button onClick={() => { resetSinglePlanetData(selectedPlanet?.name) }} className='reset-planet-btn btn'>
              Reset Values
            </button>
          </div>
        </div>


      )}
    </>
  );

};

export default Menu;
