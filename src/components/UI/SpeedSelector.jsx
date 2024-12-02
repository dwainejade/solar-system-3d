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
    >
      <span>{label}</span>
    </div>
  );
};

const SpeedSelector = ({ simSpeed, speedOptions, onSpeedSelect, disable }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(7);
  const [selectedOption, setSelectedOption] = useState("Realtime");
  const speedDropdownRef = useRef(null);

  const menuItems = [
    ...speedOptions.map(speed => ({
      ...speed,
      onSelect: () => handleOptionClick(speed),
    })),
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = option => {
    onSpeedSelect(option.value);
    setSelectedOption(option.label);
    setIsOpen(false);
  };

  const handleKeyDown = event => {
    if (!isOpen && event.key === "Enter") {
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : prev));
        break;

      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;

      case "Enter":
      case " ":
        event.preventDefault();
        const selectedItem = menuItems[focusedIndex - 1];
        if (selectedItem) {
          selectedItem.onSelect(event);
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

  const handleMouseLeave = event => {
    // Only remove active submenu if we're leaving the menu entirely
    const menuElement = speedDropdownRef.current?.querySelector(".speed-selector-menu");

    if (menuElement) {
      const menuRect = menuElement.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // If still within menu bounds, don't close submenu
      if (mouseX >= menuRect.left && mouseX <= menuRect.right && mouseY >= menuRect.top && mouseY <= menuRect.bottom) {
        // If there's a visible submenu, check if we're within its bounds

        return;
      }
    }
  };

  const handleItemHover = index => {
    setFocusedIndex(index);
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
    <div className='speed-selector' ref={speedDropdownRef} onKeyDown={handleKeyDown}>
      <button onClick={toggleDropdown} className='speed-selector-button' disabled={disable()} aria-haspopup='true' aria-expanded={isOpen}>
        {selectedOption}
      </button>
      {isOpen && (
        <div className='speed-selector-menu' role='menu' aria-label='Planet selection menu'>
          {speedOptions.map((option, index) => (
            // <div className='speed-selector-item' key={index} value={option.value} onClick={() => handleOptionClick(option)} role='menuitem'>
            //   {option.label}
            // </div>
            <MenuItem
              key={option.label}
              label={option.label}
              isActive={simSpeed === option.value}
              isHighlighted={focusedIndex === index + 1}
              onSelect={() => handleOptionClick(option)}
              onMouseEnter={() => handleItemHover(index + 1, option.label)}
              onMouseLeave={handleMouseLeave}
              tabIndex={focusedIndex === index + 1 ? 0 : -1}
              isFocused={focusedIndex === index + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeedSelector;
