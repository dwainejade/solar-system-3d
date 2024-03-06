import React, { useState, useEffect } from "react";
import useStore, { usePlanetStore } from "../../store/store";
import {
  G,
  MASS_OF_SUN,
  LUMINOSITY_OF_SUN,
  STEFAN_BOLTZMANN_CONSTANT
} from "../../data/planetsData";

// Function to calculate orbital period based on radius (Kepler's Third Law simplified)
const calculateOrbitalPeriod = (radiusKm) => {
  const radiusMeters = radiusKm * 1000; // Convert km to meters
  const periodSeconds = Math.sqrt((4 * Math.PI ** 2 * radiusMeters ** 3) / (G * MASS_OF_SUN));
  const periodDays = periodSeconds / (60 * 60 * 24); // Convert seconds to days
  return periodDays.toFixed(2); // Limit to 2 decimal places
};

// Function to calculate equilibrium temperature
const calculateEquilibriumTemperature = (distanceKm, albedo) => {
  const distanceMeters = distanceKm * 1000; // Convert km to meters
  const temperature = Math.pow(
    (LUMINOSITY_OF_SUN * (1 - albedo)) / (16 * Math.PI * STEFAN_BOLTZMANN_CONSTANT * Math.pow(distanceMeters, 2)),
    0.25
  );
  return temperature - 273.15; // Convert Kelvin to Celsius, and limit to 2 decimal places
};

const calculateGravity = (mass, radius) => {
  const G = 6.67430e-11; // Gravitational constant
  const gravity = (G * mass) / (radius * 1000) ** 2; // Convert radius from km to meters for calculation
  return gravity; // Returns gravity in m/s^2
};


const Menu = () => {
  const { isEditing, setIsEditing } = useStore();
  const { selectedPlanet, updatePlanetData, planetsData, setSelectedPlanet } = usePlanetStore();
  const [editablePlanet, setEditablePlanet] = useState({});

  useEffect(() => {
    if (selectedPlanet) {
      // Directly set editablePlanet to reflect the latest data from planetsData
      // This ensures that changes to planetsData are reflected here
      const currentPlanetData = planetsData[selectedPlanet.name];
      setEditablePlanet(currentPlanetData || {});
    }
  }, [selectedPlanet, planetsData, isEditing]); // Add planetsData as a dependency to refresh when it updates

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
      const newTemperature = calculateEquilibriumTemperature(newValue, updatedPlanet.albedo || 0.3); // Assuming a default albedo if not explicitly set
      updatedPlanet = { ...updatedPlanet, orbitalPeriod: newOrbitalPeriod, surfaceTemp: newTemperature.toFixed(2) };
    }

    // Optionally handle albedo changes affecting temperature
    if (field === 'albedo') {
      const newTemperature = calculateEquilibriumTemperature(updatedPlanet.orbitalRadius, newValue);
      updatedPlanet = { ...updatedPlanet, surfaceTemp: newTemperature.toFixed(2) };
    }

    // If mass or radius is changed, recalculate the gravity
    if (field === 'mass' || field === 'radius') {
      const newGravity = calculateGravity(
        field === 'mass' ? newValue : updatedPlanet.mass,
        field === 'radius' ? newValue : updatedPlanet.radius
      );
      updatedPlanet = { ...updatedPlanet, gravity: newGravity.toFixed(2) }; // Limit gravity to 2 decimal places
    }

    setEditablePlanet(updatedPlanet);
  };


  return (
    <>
      <h2>{selectedPlanet?.name}</h2>

      {editablePlanet && (
        <div className={`planet-details ${isEditing ? 'editing' : 'saved'}`}>
          <div className="item w1">
            <label htmlFor="mass">Mass</label>
            <input
              type="text"
              id="mass"
              value={editablePlanet.mass || ''}
              onChange={handleChange('mass')}
              disabled={!isEditing}
            />
            <span>kg</span>
          </div>
          <div className="item w1">
            <label htmlFor="radius">Radius</label>
            <input
              type="text"
              id="radius"
              value={editablePlanet.radius || ''}
              onChange={handleChange('radius')}
              disabled={!isEditing}
            />
            <span>km</span>
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
            <label htmlFor="gravity">Gravity:</label>
            <input
              type="text"
              value={editablePlanet.gravity || ''}
              onChange={handleChange('gravity')}
              disabled={!isEditing}
            />
            <span>m/s²</span>
          </div>

          <div className='button-con'>
            <button onClick={toggleEditing} className='edit-planet-btn btn'>
              {isEditing ? "Save Changes" : "Adjust Values"}
            </button>

            <button onClick={() => { }} className='reset-planet-btn btn'>
              Reset Values
            </button>
          </div>
        </div>


      )}
    </>
  );

};

export default Menu;
