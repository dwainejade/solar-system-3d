import React, { useState, useEffect } from "react";
import useStore, { usePlanetStore } from "../../store/store";

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
    const newValue = e.target.value;
    setEditablePlanet(prev => ({ ...prev, [field]: newValue }));
  };



  return (
    <>
      <h2>{selectedPlanet.name}</h2>
      <div className='menu-item'>
        <button onClick={toggleEditing} className='btn'>
          {isEditing ? "Save Changes" : "Edit Details"}
        </button>
      </div>

      {editablePlanet && (
        <div className='planet-details'>
          <div>
            <label htmlFor="mass">Mass:</label>
            {isEditing ? (
              <input
                type="text"
                id="mass"
                value={editablePlanet.mass || ''}
                onChange={handleChange('mass')}
              />
            ) : (
              <span> {editablePlanet.mass?.toString().replace("e+", "e")} kg</span>
            )}
          </div>
          <div>
            <label htmlFor="radius">Planet Radius:</label>
            {isEditing ? (
              <input
                type="text"
                id="radius"
                value={editablePlanet.radius || ''}
                onChange={handleChange('radius')}
              />
            ) : (
              <span> {editablePlanet.radius} km</span>
            )}
          </div>
          <div>
            <label htmlFor="orbitalRadius">Planet Radius:</label>
            {isEditing ? (
              <input
                type="text"
                id="orbitalRadius"
                value={editablePlanet.orbitalRadius || ''}
                onChange={handleChange('orbitalRadius')}
              />
            ) : (
              <span> {editablePlanet.orbitalRadius} km</span>
            )}
          </div>
          <div>
            <label htmlFor="orbitalPeriod">Orbital Period:</label>
            {isEditing ? (
              <input
                type="text"
                value={editablePlanet.orbitalPeriod || ''}
                onChange={handleChange('orbitalPeriod')}
              />
            ) : (
              <span> {editablePlanet.orbitalPeriod} days</span>
            )}
          </div>
          <div>
            <label htmlFor="rotationPeriod">Rotation Period:</label>
            {isEditing ? (
              <input
                type="text"
                value={editablePlanet.rotationPeriod || ''}
                onChange={handleChange('rotationPeriod')}
              />
            ) : (
              <span> {editablePlanet.rotationPeriod} hours</span>
            )}
          </div>
          <div>
            <label htmlFor="surfaceTemp">Surface Temperature:</label>
            {isEditing ? (
              <input
                type="text"
                value={editablePlanet.surfaceTemp || ''}
                onChange={handleChange('surfaceTemp')}
              />
            ) : (
              <span> {editablePlanet.surfaceTemp} °C</span>
            )}
          </div>
          <div>
            <label htmlFor="gravity">Gravity:</label>
            {isEditing ? (
              <input
                type="text"
                value={editablePlanet.gravity || ''}
                onChange={handleChange('gravity')}
              />
            ) : (
              <span> {editablePlanet.gravity} m/s²</span>
            )}
          </div>
        </div>
      )}
    </>
  );

};

export default Menu;
