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
    const handleItemMouseLeave = (e) => {
        // If this is a submenu item, don't trigger the regular mouseleave
        if (isSubmenuItem) {
            e.stopPropagation();
            return;
        }
        onMouseLeave?.(e);
    };

    return (
        <div
            className={`planet-selector-item 
                       ${isActive ? 'active' : ''} 
                       ${isSubmenuItem ? 'submenu-item' : ''} 
                       ${isHighlighted ? 'highlight' : ''}
                       ${isFocused ? 'hover' : ''}`}
            onClick={onSelect}
            onMouseEnter={onMouseEnter}
            onMouseLeave={handleItemMouseLeave}
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
    onAsteroidBeltSelect,
    onSolarSystemSelect
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [focusedSubmenuIndex, setFocusedSubmenuIndex] = useState(-1);
    const dropdownRef = useRef(null);

    const menuItems = [
        {
            label: 'Solar System',
            onSelect: () => {
                onSolarSystemSelect();
                setIsOpen(false);
                setActiveSubmenu(null);
            }
        },
        ...Object.keys(planetsData).map(planetName => ({
            label: planetName,
            onSelect: () => handlePlanetClick(planetName),
            hasSubmenu: moonsData[planetName]?.length > 0,
            submenuItems: moonsData[planetName]?.map(moon => ({
                label: moon.name,
                onSelect: (e) => handleMoonClick(planetName, moon.name, e)
            }))
        })),
        {
            label: 'Asteroid Belt',
            onSelect: () => {
                onAsteroidBeltSelect();
                setIsOpen(false);
                setActiveSubmenu(null);
            }
        }
    ];

    // Modified to only find parent planet without setting submenu
    const findParentPlanet = () => {
        if (!activeCamera || activeCamera.type !== 'moon') return null;

        for (const [planetName, moons] of Object.entries(moonsData)) {
            if (moons.some(moon => moon.name === activeCamera.name)) {
                return planetName;
            }
        }
        return null;
    };

    // Find the index of the active item in the menu
    const findActiveItemIndex = () => {
        if (activeCamera.type === 'orbit' && activeCamera.name === 'default') return 0;
        if (activeCamera.type === 'asteroid' && activeCamera.name === 'Asteroid Belt') return menuItems.length - 1;

        const planetIndex = Object.keys(planetsData).findIndex(
            planetName => planetName === activeCamera.name
        );
        if (planetIndex !== -1) return planetIndex + 1;

        return -1;
    };

    const parentPlanet = findParentPlanet();

    useEffect(() => {
        if (isOpen) {
            if (activeCamera.type === 'moon') {
                // If a moon is selected, find its parent planet and open that submenu
                const parentPlanet = findParentPlanet();
                if (parentPlanet) {
                    setActiveSubmenu(parentPlanet);
                    const planetIndex = Object.keys(planetsData).findIndex(
                        name => name === parentPlanet
                    ) + 1; // Add 1 for Solar System offset
                    setFocusedIndex(planetIndex);
                    // Find and set the moon's index in the submenu
                    const moonIndex = moonsData[parentPlanet]?.findIndex(
                        moon => moon.name === activeCamera.name
                    );
                    if (moonIndex !== -1) {
                        setFocusedSubmenuIndex(moonIndex);
                    }
                }
            } else {
                // Regular active item handling for non-moon items
                const activeIndex = findActiveItemIndex();
                setFocusedIndex(activeIndex >= 0 ? activeIndex : 0);
                setFocusedSubmenuIndex(-1);
                setActiveSubmenu(null);
            }
        } else {
            setFocusedIndex(-1);
            setFocusedSubmenuIndex(-1);
            setActiveSubmenu(null); // Reset active submenu when closing
        }
    }, [isOpen, activeCamera]);

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

    const handleSubmenuItemHover = (moonIndex) => {
        setFocusedSubmenuIndex(moonIndex);
    };

    const handleMouseLeave = (event) => {
        // Only remove active submenu if we're leaving the menu entirely
        const menuElement = dropdownRef.current?.querySelector('.planet-selector-menu');
        const submenuElement = dropdownRef.current?.querySelector('.planet-selector-submenu.visible');

        if (menuElement) {
            const menuRect = menuElement.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // If still within menu bounds, don't close submenu
            if (mouseX >= menuRect.left && mouseX <= menuRect.right &&
                mouseY >= menuRect.top && mouseY <= menuRect.bottom) {

                // If there's a visible submenu, check if we're within its bounds
                if (submenuElement) {
                    const submenuRect = submenuElement.getBoundingClientRect();
                    if (mouseX >= submenuRect.left && mouseX <= submenuRect.right &&
                        mouseY >= submenuRect.top && mouseY <= submenuRect.bottom) {
                        return;
                    }
                }
                return;
            }
        }
        setActiveSubmenu(null);
    };


    const handleItemHover = (index, planetName = null) => {
        setFocusedIndex(index);
        if (planetName && moonsData[planetName]?.length > 0) {
            setActiveSubmenu(planetName);
            setFocusedSubmenuIndex(-1);
        }
    }
    const getActiveLabel = () => {
        if (activeCamera.type === 'orbit' && activeCamera.name === 'default') return 'Solar System';
        if (activeCamera.type === 'asteroid') return 'Asteroid Belt';
        return activeCamera.name;
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
                {getActiveLabel()}
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
                        onSelect={menuItems[0].onSelect}
                        onMouseEnter={() => handleItemHover(0)}
                        onMouseLeave={handleMouseLeave}
                        tabIndex={focusedIndex === 0 ? 0 : -1}
                        isFocused={focusedIndex === 0}
                    />

                    {Object.keys(planetsData).map((planetName, index) => (
                        <MenuItem
                            key={planetName}
                            label={planetName}
                            isActive={activeCamera.name === planetName}
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
                                    isActive={activeCamera.type === 'moon' && moon.name === activeCamera.name}
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
                        onSelect={menuItems[menuItems.length - 1].onSelect}
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