import React, { useState, useRef, useEffect } from "react";
import "../../styles/Dropdown.css";

const MenuItem = ({
  label,
  isActive,
  hasSubmenu,
  onSelect,
  children,
  showSubmenu,
  onMouseEnter,
  onMouseLeave,
  isSubmenuItem = false,
  isHighlighted = false,
  onKeyDown,
  tabIndex,
  isFocused = false,
  "aria-expanded": ariaExpanded,
}) => {
  const handleItemMouseLeave = e => {
    // If this is a submenu item, don't trigger the regular mouseleave
    if (isSubmenuItem) {
      e.stopPropagation();
      return;
    }
    onMouseLeave?.(e);
  };

  return (
    <div
      className={`speed-selector-item 
                       ${isActive ? "active" : ""} 
                       ${isHighlighted ? "highlight" : ""}
                       ${isFocused ? "hover" : ""}`}
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleItemMouseLeave}
      onKeyDown={onKeyDown}
      role='menuitem'
      tabIndex={tabIndex}
      aria-haspopup={hasSubmenu}
      aria-expanded={hasSubmenu ? ariaExpanded : undefined}
    >
      <span>{label}</span>
    </div>
  );
};

const SpeedSelector = ({ speedOptions, onSpeedSelect, disable }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const speedDropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = option => {
    onSpeedSelect(option.value);
    setSelectedOption(option.label);
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (speedDropdownRef.current && !speedDropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [speedDropdownRef]);

  return (
    <div className='speed-selector' ref={speedDropdownRef}>
      <button onClick={toggleDropdown} className='speed-selector-button' disabled={disable()} aria-haspopup='true' aria-expanded={isOpen}>
        {selectedOption}
      </button>
      {isOpen && (
        <div className='speed-selector-dropdown' role='menu' aria-label='Planet selection menu'>
          {speedOptions.map((option, index) => (
            <div className='speed-selector-item' key={index} value={option.value} onClick={() => handleOptionClick(option)} role='menuitem'>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeedSelector;
