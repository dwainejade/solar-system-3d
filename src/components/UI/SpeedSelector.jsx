import React, { useState, useRef, useEffect } from "react";
import "../../styles/Dropdown.css";

const SpeedSelector = ({ speedOptions, onSpeedSelect, disable }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select an option");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = option => {
    onSpeedSelect(option.value);
    setSelectedOption(option.label);
    setIsOpen(false);
  };

  return (
    <div className='speed-selector'>
      <button onClick={toggleDropdown} className='speed-selector-button' disabled={disable()}>
        {selectedOption}
      </button>
      {isOpen && (
        <div className='speed-selector-dropdown'>
          {speedOptions.map((option, index) => (
            <div key={index} value={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeedSelector;
