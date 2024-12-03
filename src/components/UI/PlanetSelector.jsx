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
    if (isSubmenuItem) {
      e.stopPropagation();
      return;
    }
    onMouseLeave?.(e);
  };

  return (
    <div
      className={`planet-selector-item 
                 ${isActive ? "active" : ""} 
                 ${isSubmenuItem ? "submenu-item" : ""} 
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
      {hasSubmenu && (
        <>
          <span className='planet-selector-item-chevron'>➤</span>
          <div
            className={`planet-selector-submenu ${showSubmenu ? "visible" : ""}`}
            role='menu'
            aria-label={`${label} submenu`}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};

const PlanetSelector = ({
  planetsData,
  moonsData,
  activeCamera,
  onPlanetSelect,
  onMoonSelect,
  onSolarSystemSelect,
  onAsteroidBeltSelect,
  disabled = false,
  enableSubmenu = false,
  showOnlyPlanets = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [focusedSubmenuIndex, setFocusedSubmenuIndex] = useState(-1);
  const dropdownRef = useRef(null);

  // Build complete menu items including Solar System and Asteroid Belt
  // Inside PlanetSelector component
  const menuItems = showOnlyPlanets
    ? Object.keys(planetsData)
      .filter(planetName => planetName !== 'Sun')
      .map(planetName => ({
        label: planetName,
        onSelect: () => handlePlanetClick(planetName)
      }))
    : [
      {
        label: "Solar System",
        onSelect: () => {
          onSolarSystemSelect?.();
          setIsOpen(false);
          setActiveSubmenu(null);
        }
      },
      ...Object.keys(planetsData)
        .filter(planetName => planetName !== 'Sun')
        .map(planetName => ({
          label: planetName,
          onSelect: () => handlePlanetClick(planetName),
          hasSubmenu: enableSubmenu && moonsData?.[planetName]?.length > 0,
          submenuItems: enableSubmenu ? moonsData?.[planetName]?.map(moon => ({
            label: moon.name,
            onSelect: e => handleMoonClick(planetName, moon.name, e)
          })) : []
        })),
      {
        label: "Asteroid Belt",
        onSelect: () => {
          onAsteroidBeltSelect?.();
          setIsOpen(false);
          setActiveSubmenu(null);
        }
      }
    ];

  const handleKeyDown = event => {
    if (!isOpen && event.key === "Enter") {
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (activeSubmenu && focusedSubmenuIndex >= 0) {
          const submenuItems = moonsData[activeSubmenu] || [];
          setFocusedSubmenuIndex(prev => (prev < submenuItems.length - 1 ? prev + 1 : prev));
        } else {
          setFocusedIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : prev));
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (activeSubmenu && focusedSubmenuIndex >= 0) {
          setFocusedSubmenuIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else {
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev));
        }
        break;

      case "ArrowRight":
        if (!enableSubmenu) break;
        event.preventDefault();
        const currentItem = menuItems[focusedIndex];
        if (currentItem?.hasSubmenu) {
          setActiveSubmenu(currentItem.label);
          setFocusedSubmenuIndex(0);
        }
        break;

      case "ArrowLeft":
        event.preventDefault();
        if (activeSubmenu) {
          setActiveSubmenu(null);
          setFocusedSubmenuIndex(-1);
        }
        break;

      case "Enter":
      case " ":
        event.preventDefault();
        if (activeSubmenu && focusedSubmenuIndex >= 0) {
          const submenuItems = moonsData[activeSubmenu] || [];
          const selectedMoon = submenuItems[focusedSubmenuIndex];
          if (selectedMoon) {
            handleMoonClick(activeSubmenu, selectedMoon.name, event);
          }
        } else {
          const selectedItem = menuItems[focusedIndex];
          if (selectedItem) {
            selectedItem.onSelect();
          }
        }
        break;

      case "Escape":
        event.preventDefault();
        if (activeSubmenu) {
          setActiveSubmenu(null);
          setFocusedSubmenuIndex(-1);
        } else {
          setIsOpen(false);
        }
        break;
    }
  };

  const handlePlanetClick = planetName => {
    onPlanetSelect(planetName);
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const handleMoonClick = (planetName, moonName, event) => {
    event?.stopPropagation();
    onMoonSelect?.(planetName, moonName);
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const handleItemHover = (index, planetName = null) => {
    setFocusedIndex(index);
    if (enableSubmenu && planetName && moonsData?.[planetName]?.length > 0) {
      setActiveSubmenu(planetName);
      setFocusedSubmenuIndex(-1);
    }
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  const getActiveLabel = () => {
    // If activeCamera is a string (experiment menu case), return it directly
    if (typeof activeCamera === 'string') {
      return activeCamera;
    }

    // Otherwise handle the object case (main menu)
    if (activeCamera.type === "orbit" && activeCamera.name === "default") return "Solar System";
    if (activeCamera.type === "asteroid") return "Asteroid Belt";
    return activeCamera.name;
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
        {getActiveLabel()}
      </button>

      {isOpen && (
        <div className='planet-selector-menu' role='menu' aria-label='Planet selection menu'>
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.label}
              label={item.label}
              isActive={activeCamera.name === item.label}
              hasSubmenu={item.hasSubmenu}
              onSelect={item.onSelect}
              onMouseEnter={() => handleItemHover(index, item.label)}
              onMouseLeave={handleMouseLeave}
              showSubmenu={activeSubmenu === item.label}
              tabIndex={focusedIndex === index ? 0 : -1}
              isFocused={focusedIndex === index}
              aria-expanded={activeSubmenu === item.label}
            >
              {item.submenuItems?.map((subItem, subIndex) => (
                <MenuItem
                  key={subItem.label}
                  label={subItem.label}
                  isActive={activeCamera.type === "moon" && subItem.label === activeCamera.name}
                  isSubmenuItem={true}
                  onSelect={subItem.onSelect}
                  onMouseEnter={() => setFocusedSubmenuIndex(subIndex)}
                  onMouseLeave={handleMouseLeave}
                  tabIndex={activeSubmenu === item.label && focusedSubmenuIndex === subIndex ? 0 : -1}
                  isFocused={activeSubmenu === item.label && focusedSubmenuIndex === subIndex}
                />
              ))}
            </MenuItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanetSelector;