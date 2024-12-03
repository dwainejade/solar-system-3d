import React, { useState, useRef, useEffect } from "react";
import "../../styles/Dropdown.css";

const MenuItem = ({
  label,
  isActive,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  tabIndex,
  isFocused = false,
}) => {
  return (
    <div
      className={`planet-selector-item 
                 ${isActive ? "active" : ""} 
                 ${isFocused ? "hover" : ""}`}
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role='menuitem'
      tabIndex={tabIndex}
    >
      <span>{label}</span>
    </div>
  );
};

const PlanetSelector = ({
  planetsData,
  activeCamera,
  onPlanetSelect,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  // Build menu items
  const menuItems = Object.keys(planetsData).filter(
    planetName => planetName !== 'Sun'
  ).map(planetName => ({
    label: planetName,
    onSelect: () => handlePlanetClick(planetName),
  }));

  const handleKeyDown = event => {
    if (!isOpen && event.key === "Enter") {
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex(prev =>
          prev < menuItems.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;

      case "Enter":
      case " ":
        event.preventDefault();
        const selectedItem = menuItems[focusedIndex];
        if (selectedItem) {
          selectedItem.onSelect();
        }
        break;

      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;

      default:
        break;
    }
  };

  const handlePlanetClick = planetName => {
    onPlanetSelect(planetName);
    setIsOpen(false);
  };

  const handleItemHover = (index) => {
    setFocusedIndex(index);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className='planet-selector' onKeyDown={handleKeyDown}>
      <button
        className='planet-selector-button'
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup='true'
        aria-expanded={isOpen}
        disabled={disabled}
      >
        {typeof activeCamera === 'string' ? activeCamera : 'Select Planet'}
      </button>

      {isOpen && (
        <div className='planet-selector-menu' role='menu' aria-label='Planet selection menu'>
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.label}
              label={item.label}
              isActive={activeCamera === item.label}
              onSelect={item.onSelect}
              onMouseEnter={() => handleItemHover(index)}
              tabIndex={focusedIndex === index ? 0 : -1}
              isFocused={focusedIndex === index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanetSelector;