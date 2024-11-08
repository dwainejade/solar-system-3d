import React, { useState, useRef, useEffect } from 'react';
import '../../styles/Dropdown.css';

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
    'aria-expanded': ariaExpanded
}) => {
    return (
        <div
            className={`planet-selector-item 
                       ${isActive ? 'active' : ''} 
                       ${isSubmenuItem ? 'submenu-item' : ''} 
                       ${isHighlighted ? 'highlight' : ''}
                       ${isFocused ? 'hover' : ''}`}
            onClick={onSelect}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onKeyDown={onKeyDown}
            role="menuitem"
            tabIndex={tabIndex}
            aria-haspopup={hasSubmenu}
            aria-expanded={hasSubmenu ? ariaExpanded : undefined}
        >
            <span>{label}</span>
            {hasSubmenu && <span className="planet-selector-item-chevron">➤</span>}
            {hasSubmenu && (
                <div
                    className={`planet-selector-submenu ${showSubmenu ? 'visible' : ''}`}
                    role="menu"
                    aria-label={`${label} submenu`}
                >
                    {children}
                </div>
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
    onAsteroidBeltSelect
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [focusedSubmenuIndex, setFocusedSubmenuIndex] = useState(-1);
    const dropdownRef = useRef(null);

    const menuItems = [
        { label: 'Solar System', onSelect: onSolarSystemSelect },
        ...Object.keys(planetsData).map(planetName => ({
            label: planetName,
            onSelect: () => handlePlanetClick(planetName),
            hasSubmenu: moonsData[planetName]?.length > 0,
            submenuItems: moonsData[planetName]?.map(moon => ({
                label: moon.name,
                onSelect: (e) => handleMoonClick(planetName, moon.name, e)
            }))
        })),
        { label: 'Asteroid Belt', onSelect: onAsteroidBeltSelect }
    ];

    const findParentPlanet = () => {
        for (const [planetName, moons] of Object.entries(moonsData)) {
            if (moons.some(moon => moon.name === activeCamera.name)) {
                return planetName;
            }
        }
        return null;
    };

    // Find the index of the active item in the menu
    const findActiveItemIndex = () => {
        if (activeCamera.name === 'default') return 0;
        if (activeCamera.name === 'Asteroid Belt') return menuItems.length - 1;

        const planetIndex = Object.keys(planetsData).findIndex(
            planetName => planetName === activeCamera.name
        );
        if (planetIndex !== -1) return planetIndex + 1;

        return -1;
    };

    // Find the index of the active moon in its submenu
    const findActiveMoonIndex = (planetName) => {
        if (!moonsData[planetName]) return -1;
        return moonsData[planetName].findIndex(moon => moon.name === activeCamera.name);
    };

    const parentPlanet = findParentPlanet();

    useEffect(() => {
        if (isOpen) {
            if (parentPlanet) {
                const planetIndex = Object.keys(planetsData).findIndex(
                    name => name === parentPlanet
                ) + 1;
                setFocusedIndex(planetIndex);
                setActiveSubmenu(parentPlanet);
                const moonIndex = findActiveMoonIndex(parentPlanet);
                setFocusedSubmenuIndex(moonIndex);
            } else {
                const activeIndex = findActiveItemIndex();
                setFocusedIndex(activeIndex >= 0 ? activeIndex : 0);
                setFocusedSubmenuIndex(-1);
            }
        } else {
            setFocusedIndex(-1);
            setFocusedSubmenuIndex(-1);
        }
    }, [isOpen, activeCamera.name]);

    const handleKeyDown = (event) => {
        if (!isOpen && event.key === 'Enter') {
            setIsOpen(true);
            return;
        }

        if (!isOpen) return;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (activeSubmenu && focusedSubmenuIndex >= 0) {
                    const submenuItems = moonsData[activeSubmenu] || [];
                    setFocusedSubmenuIndex(prev =>
                        prev < submenuItems.length - 1 ? prev + 1 : prev
                    );
                } else {
                    setFocusedIndex(prev =>
                        prev < menuItems.length - 1 ? prev + 1 : prev
                    );
                }
                break;

            case 'ArrowUp':
                event.preventDefault();
                if (activeSubmenu && focusedSubmenuIndex >= 0) {
                    setFocusedSubmenuIndex(prev => prev > 0 ? prev - 1 : prev);
                } else {
                    setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
                }
                break;

            case 'ArrowRight':
                event.preventDefault();
                const currentItem = menuItems[focusedIndex];
                if (currentItem?.hasSubmenu) {
                    setActiveSubmenu(currentItem.label);
                    setFocusedSubmenuIndex(0);
                }
                break;

            case 'ArrowLeft':
                event.preventDefault();
                if (activeSubmenu) {
                    setActiveSubmenu(null);
                    setFocusedSubmenuIndex(-1);
                }
                break;

            case 'Enter':
            case ' ':
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
                        selectedItem.onSelect(event);
                    }
                }
                break;

            case 'Escape':
                event.preventDefault();
                if (activeSubmenu) {
                    setActiveSubmenu(null);
                    setFocusedSubmenuIndex(-1);
                } else {
                    setIsOpen(false);
                }
                break;

            default:
                break;
        }
    };

    const handlePlanetMouseEnter = (planetName) => {
        if (moonsData[planetName]?.length > 0) {
            setActiveSubmenu(planetName);
        }
    };

    const handlePlanetMouseLeave = (event) => {
        const submenu = event.currentTarget.querySelector('.planet-selector-submenu');
        if (submenu) {
            const submenuRect = submenu.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            if (mouseX >= submenuRect.left && mouseX <= submenuRect.right &&
                mouseY >= submenuRect.top && mouseY <= submenuRect.bottom) {
                return;
            }
        }

        if (parentPlanet !== event.currentTarget.textContent.trim()) {
            setActiveSubmenu(parentPlanet);
        }
    };

    const handlePlanetClick = (planetName) => {
        onPlanetSelect(planetName);
        setIsOpen(false);
        setActiveSubmenu(null);
    };

    const handleMoonClick = (planetName, moonName, event) => {
        event.stopPropagation();
        onMoonSelect(planetName, moonName);
        setIsOpen(false);
        setActiveSubmenu(null);
    };

    const handleItemHover = (index, planetName = null) => {
        setFocusedIndex(index);
        if (planetName && moonsData[planetName]?.length > 0) {
            setActiveSubmenu(planetName);
            setFocusedSubmenuIndex(-1); // Reset submenu focus when hovering main menu
        } else if (!planetName) {
            setActiveSubmenu(null);
            setFocusedSubmenuIndex(-1);
        }
    };

    const handleSubmenuItemHover = (moonIndex) => {
        setFocusedSubmenuIndex(moonIndex);
    };

    const handleMouseLeave = () => {
        // When mouse leaves an item, maintain the current focus for keyboard navigation
        // Instead of setting to -1, we keep the current focus
        if (parentPlanet) {
            setActiveSubmenu(parentPlanet);
        }
    };

    return (
        <div
            ref={dropdownRef}
            className="planet-selector"
            onKeyDown={handleKeyDown}
        >
            <button
                className="planet-selector-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {activeCamera.name === 'default' ? 'Solar System' : activeCamera.name}
            </button>

            {isOpen && (
                <div
                    className="planet-selector-menu"
                    role="menu"
                    aria-label="Planet selection menu"
                >
                    <MenuItem
                        label="Solar System"
                        isActive={activeCamera.name === 'default'}
                        onSelect={onSolarSystemSelect}
                        onMouseEnter={() => handleItemHover(0)}
                        onMouseLeave={handleMouseLeave}
                        tabIndex={focusedIndex === 0 ? 0 : -1}
                        isFocused={focusedIndex === 0}
                    />

                    {Object.keys(planetsData).map((planetName, index) => (
                        <MenuItem
                            key={planetName}
                            label={planetName}
                            isActive={planetName === activeCamera.name}
                            isHighlighted={planetName === parentPlanet}
                            hasSubmenu={moonsData[planetName]?.length > 0}
                            onSelect={() => handlePlanetClick(planetName)}
                            onMouseEnter={() => handleItemHover(index + 1, planetName)}
                            onMouseLeave={handleMouseLeave}
                            showSubmenu={activeSubmenu === planetName}
                            tabIndex={focusedIndex === index + 1 ? 0 : -1}
                            isFocused={focusedIndex === index + 1}
                            aria-expanded={activeSubmenu === planetName}
                        >
                            {moonsData[planetName]?.map((moon, moonIndex) => (
                                <MenuItem
                                    key={moon.name}
                                    label={moon.name}
                                    isActive={moon.name === activeCamera.name}
                                    isSubmenuItem={true}
                                    onSelect={(e) => handleMoonClick(planetName, moon.name, e)}
                                    onMouseEnter={() => handleSubmenuItemHover(moonIndex)}
                                    onMouseLeave={handleMouseLeave}
                                    tabIndex={activeSubmenu === planetName && focusedSubmenuIndex === moonIndex ? 0 : -1}
                                    isFocused={activeSubmenu === planetName && focusedSubmenuIndex === moonIndex}
                                />
                            ))}
                        </MenuItem>
                    ))}

                    <MenuItem
                        label="Asteroid Belt"
                        isActive={activeCamera.name === 'Asteroid Belt'}
                        onSelect={onAsteroidBeltSelect}
                        onMouseEnter={() => handleItemHover(menuItems.length - 1)}
                        onMouseLeave={handleMouseLeave}
                        tabIndex={focusedIndex === menuItems.length - 1 ? 0 : -1}
                        isFocused={focusedIndex === menuItems.length - 1}
                    />
                </div>
            )}
        </div>
    );
};

export default PlanetSelector;