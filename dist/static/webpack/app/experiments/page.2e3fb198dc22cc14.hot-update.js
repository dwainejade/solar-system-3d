"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/experiments/page",{

/***/ "(app-pages-browser)/./src/components/UI/SpeedSelector.jsx":
/*!*********************************************!*\
  !*** ./src/components/UI/SpeedSelector.jsx ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_Dropdown_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/Dropdown.css */ \"(app-pages-browser)/./src/styles/Dropdown.css\");\n\nvar _s = $RefreshSig$();\n\n\nconst MenuItem = (param)=>{\n    let { label, isActive, hasSubmenu, onSelect, children, showSubmenu, onMouseEnter, onMouseLeave, isSubmenuItem = false, isHighlighted = false, onKeyDown, tabIndex, isFocused = false, \"aria-expanded\": ariaExpanded } = param;\n    const handleItemMouseLeave = (e)=>{\n        // If this is a submenu item, don't trigger the regular mouseleave\n        onMouseLeave?.(e);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: `speed-selector-item\n                       ${isActive ? \"active\" : \"\"}\n                       ${isHighlighted ? \"highlight\" : \"\"}\n                       ${isFocused ? \"hover\" : \"\"}`,\n        onClick: onSelect,\n        onMouseEnter: onMouseEnter,\n        onMouseLeave: handleItemMouseLeave,\n        onKeyDown: onKeyDown,\n        role: \"menuitem\",\n        tabIndex: tabIndex,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n            children: label\n        }, void 0, false, {\n            fileName: \"/Users/mtakeuchi7001/Interactives/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n            lineNumber: 38,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/mtakeuchi7001/Interactives/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, undefined);\n};\n_c = MenuItem;\nconst SpeedSelector = (param)=>{\n    let { speedOptions, onSpeedSelect, disable } = param;\n    _s();\n    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [focusedIndex, setFocusedIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(7);\n    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"Select an option\");\n    const speedDropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    console.log(\"focus\", focusedIndex);\n    const menuItems = [\n        speedOptions.map((speed)=>({\n                ...speed,\n                onSelect: ()=>handleOptionClick(speed)\n            }))\n    ];\n    const toggleDropdown = ()=>setIsOpen(!isOpen);\n    const handleOptionClick = (option)=>{\n        onSpeedSelect(option.value);\n        setSelectedOption(option.label);\n        setIsOpen(false);\n    };\n    const handleKeyDown = (event)=>{\n        if (!isOpen && event.key === \"Enter\") {\n            setIsOpen(true);\n            return;\n        }\n        if (!isOpen) return;\n        switch(event.key){\n            case \"ArrowDown\":\n                event.preventDefault();\n                setFocusedIndex((prev)=>prev < menuItems.length - 1 ? prev + 1 : prev);\n                break;\n            case \"ArrowUp\":\n                event.preventDefault();\n                setFocusedIndex((prev)=>prev > 0 ? prev - 1 : prev);\n                break;\n            case \"Enter\":\n            case \" \":\n                event.preventDefault();\n                const selectedItem = menuItems[focusedIndex - 1];\n                if (selectedItem) {\n                    console.log(\"eve\", event);\n                    selectedItem.onSelect(event);\n                }\n                break;\n            case \"Escape\":\n                event.preventDefault();\n                setIsOpen(false);\n                break;\n            default:\n                break;\n        }\n    };\n    const handleMouseLeave = (event)=>{\n        // Only remove active submenu if we're leaving the menu entirely\n        const menuElement = speedDropdownRef.current?.querySelector(\".speed-selector-menu\");\n        if (menuElement) {\n            const menuRect = menuElement.getBoundingClientRect();\n            const mouseX = event.clientX;\n            const mouseY = event.clientY;\n            // If still within menu bounds, don't close submenu\n            if (mouseX >= menuRect.left && mouseX <= menuRect.right && mouseY >= menuRect.top && mouseY <= menuRect.bottom) {\n                // If there's a visible submenu, check if we're within its bounds\n                return;\n            }\n        }\n    };\n    const handleItemHover = (index)=>{\n        setFocusedIndex(index);\n    };\n    // Close dropdown if clicked outside\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        function handleClickOutside(event) {\n            if (speedDropdownRef.current && !speedDropdownRef.current.contains(event.target)) {\n                setIsOpen(false);\n            }\n        }\n        // Attach the event listener\n        document.addEventListener(\"mousedown\", handleClickOutside);\n        return ()=>{\n            // Clean up the event listener\n            document.removeEventListener(\"mousedown\", handleClickOutside);\n        };\n    }, [\n        speedDropdownRef\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"speed-selector\",\n        ref: speedDropdownRef,\n        onKeyDown: handleKeyDown,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: toggleDropdown,\n                className: \"speed-selector-button\",\n                disabled: disable(),\n                \"aria-haspopup\": \"true\",\n                \"aria-expanded\": isOpen,\n                children: selectedOption\n            }, void 0, false, {\n                fileName: \"/Users/mtakeuchi7001/Interactives/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                lineNumber: 142,\n                columnNumber: 7\n            }, undefined),\n            isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"speed-selector-menu\",\n                role: \"menu\",\n                \"aria-label\": \"Planet selection menu\",\n                children: speedOptions.map((option, index)=>// <div className='speed-selector-item' key={index} value={option.value} onClick={() => handleOptionClick(option)} role='menuitem'>\n                    //   {option.label}\n                    // </div>\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(MenuItem, {\n                        label: option.label,\n                        isActive: focusedIndex === index + 1,\n                        isHighlighted: focusedIndex === index + 1,\n                        onSelect: ()=>handleOptionClick(option),\n                        onMouseEnter: ()=>handleItemHover(index + 1, option.label),\n                        onMouseLeave: handleMouseLeave,\n                        tabIndex: focusedIndex === index + 1 ? 0 : -1,\n                        isFocused: focusedIndex === index + 1\n                    }, option.label, false, {\n                        fileName: \"/Users/mtakeuchi7001/Interactives/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                        lineNumber: 151,\n                        columnNumber: 13\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/mtakeuchi7001/Interactives/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                lineNumber: 146,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/mtakeuchi7001/Interactives/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n        lineNumber: 141,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SpeedSelector, \"IzryvXAanLMeb27tjoZeuzGL5wI=\");\n_c1 = SpeedSelector;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SpeedSelector);\nvar _c, _c1;\n$RefreshReg$(_c, \"MenuItem\");\n$RefreshReg$(_c1, \"SpeedSelector\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1VJL1NwZWVkU2VsZWN0b3IuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkQ7QUFDeEI7QUFFbkMsTUFBTUksV0FBVztRQUFDLEVBQ2hCQyxLQUFLLEVBQ0xDLFFBQVEsRUFDUkMsVUFBVSxFQUNWQyxRQUFRLEVBQ1JDLFFBQVEsRUFDUkMsV0FBVyxFQUNYQyxZQUFZLEVBQ1pDLFlBQVksRUFDWkMsZ0JBQWdCLEtBQUssRUFDckJDLGdCQUFnQixLQUFLLEVBQ3JCQyxTQUFTLEVBQ1RDLFFBQVEsRUFDUkMsWUFBWSxLQUFLLEVBQ2pCLGlCQUFpQkMsWUFBWSxFQUM5QjtJQUNDLE1BQU1DLHVCQUF1QkMsQ0FBQUE7UUFDM0Isa0VBQWtFO1FBQ2xFUixlQUFlUTtJQUNqQjtJQUVBLHFCQUNFLDhEQUFDQztRQUNDQyxXQUFXLENBQUM7dUJBQ0ssRUFBRWhCLFdBQVcsV0FBVyxHQUFHO3VCQUMzQixFQUFFUSxnQkFBZ0IsY0FBYyxHQUFHO3VCQUNuQyxFQUFFRyxZQUFZLFVBQVUsR0FBRyxDQUFDO1FBQzdDTSxTQUFTZjtRQUNURyxjQUFjQTtRQUNkQyxjQUFjTztRQUNkSixXQUFXQTtRQUNYUyxNQUFLO1FBQ0xSLFVBQVVBO2tCQUVWLDRFQUFDUztzQkFBTXBCOzs7Ozs7Ozs7OztBQUdiO0tBckNNRDtBQXVDTixNQUFNc0IsZ0JBQWdCO1FBQUMsRUFBRUMsWUFBWSxFQUFFQyxhQUFhLEVBQUVDLE9BQU8sRUFBRTs7SUFDN0QsTUFBTSxDQUFDQyxRQUFRQyxVQUFVLEdBQUc5QiwrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUMrQixjQUFjQyxnQkFBZ0IsR0FBR2hDLCtDQUFRQSxDQUFDO0lBQ2pELE1BQU0sQ0FBQ2lDLGdCQUFnQkMsa0JBQWtCLEdBQUdsQywrQ0FBUUEsQ0FBQztJQUNyRCxNQUFNbUMsbUJBQW1CbEMsNkNBQU1BLENBQUM7SUFFaENtQyxRQUFRQyxHQUFHLENBQUMsU0FBU047SUFDckIsTUFBTU8sWUFBWTtRQUNoQlosYUFBYWEsR0FBRyxDQUFDQyxDQUFBQSxRQUFVO2dCQUN6QixHQUFHQSxLQUFLO2dCQUNSakMsVUFBVSxJQUFNa0Msa0JBQWtCRDtZQUNwQztLQUNEO0lBRUQsTUFBTUUsaUJBQWlCLElBQU1aLFVBQVUsQ0FBQ0Q7SUFDeEMsTUFBTVksb0JBQW9CRSxDQUFBQTtRQUN4QmhCLGNBQWNnQixPQUFPQyxLQUFLO1FBQzFCVixrQkFBa0JTLE9BQU92QyxLQUFLO1FBQzlCMEIsVUFBVTtJQUNaO0lBRUEsTUFBTWUsZ0JBQWdCQyxDQUFBQTtRQUNwQixJQUFJLENBQUNqQixVQUFVaUIsTUFBTUMsR0FBRyxLQUFLLFNBQVM7WUFDcENqQixVQUFVO1lBQ1Y7UUFDRjtRQUVBLElBQUksQ0FBQ0QsUUFBUTtRQUViLE9BQVFpQixNQUFNQyxHQUFHO1lBQ2YsS0FBSztnQkFDSEQsTUFBTUUsY0FBYztnQkFDcEJoQixnQkFBZ0JpQixDQUFBQSxPQUFTQSxPQUFPWCxVQUFVWSxNQUFNLEdBQUcsSUFBSUQsT0FBTyxJQUFJQTtnQkFDbEU7WUFFRixLQUFLO2dCQUNISCxNQUFNRSxjQUFjO2dCQUNwQmhCLGdCQUFnQmlCLENBQUFBLE9BQVNBLE9BQU8sSUFBSUEsT0FBTyxJQUFJQTtnQkFDL0M7WUFFRixLQUFLO1lBQ0wsS0FBSztnQkFDSEgsTUFBTUUsY0FBYztnQkFDcEIsTUFBTUcsZUFBZWIsU0FBUyxDQUFDUCxlQUFlLEVBQUU7Z0JBQ2hELElBQUlvQixjQUFjO29CQUNoQmYsUUFBUUMsR0FBRyxDQUFDLE9BQU9TO29CQUNuQkssYUFBYTVDLFFBQVEsQ0FBQ3VDO2dCQUN4QjtnQkFDQTtZQUVGLEtBQUs7Z0JBQ0hBLE1BQU1FLGNBQWM7Z0JBQ3BCbEIsVUFBVTtnQkFDVjtZQUVGO2dCQUNFO1FBQ0o7SUFDRjtJQUVBLE1BQU1zQixtQkFBbUJOLENBQUFBO1FBQ3ZCLGdFQUFnRTtRQUNoRSxNQUFNTyxjQUFjbEIsaUJBQWlCbUIsT0FBTyxFQUFFQyxjQUFjO1FBRTVELElBQUlGLGFBQWE7WUFDZixNQUFNRyxXQUFXSCxZQUFZSSxxQkFBcUI7WUFDbEQsTUFBTUMsU0FBU1osTUFBTWEsT0FBTztZQUM1QixNQUFNQyxTQUFTZCxNQUFNZSxPQUFPO1lBRTVCLG1EQUFtRDtZQUNuRCxJQUFJSCxVQUFVRixTQUFTTSxJQUFJLElBQUlKLFVBQVVGLFNBQVNPLEtBQUssSUFBSUgsVUFBVUosU0FBU1EsR0FBRyxJQUFJSixVQUFVSixTQUFTUyxNQUFNLEVBQUU7Z0JBQzlHLGlFQUFpRTtnQkFFakU7WUFDRjtRQUNGO0lBQ0Y7SUFFQSxNQUFNQyxrQkFBa0JDLENBQUFBO1FBQ3RCbkMsZ0JBQWdCbUM7SUFDbEI7SUFFQSxvQ0FBb0M7SUFDcENqRSxnREFBU0EsQ0FBQztRQUNSLFNBQVNrRSxtQkFBbUJ0QixLQUFLO1lBQy9CLElBQUlYLGlCQUFpQm1CLE9BQU8sSUFBSSxDQUFDbkIsaUJBQWlCbUIsT0FBTyxDQUFDZSxRQUFRLENBQUN2QixNQUFNd0IsTUFBTSxHQUFHO2dCQUNoRnhDLFVBQVU7WUFDWjtRQUNGO1FBQ0EsNEJBQTRCO1FBQzVCeUMsU0FBU0MsZ0JBQWdCLENBQUMsYUFBYUo7UUFDdkMsT0FBTztZQUNMLDhCQUE4QjtZQUM5QkcsU0FBU0UsbUJBQW1CLENBQUMsYUFBYUw7UUFDNUM7SUFDRixHQUFHO1FBQUNqQztLQUFpQjtJQUVyQixxQkFDRSw4REFBQ2Y7UUFBSUMsV0FBVTtRQUFpQnFELEtBQUt2QztRQUFrQnJCLFdBQVcrQjs7MEJBQ2hFLDhEQUFDOEI7Z0JBQU9yRCxTQUFTb0I7Z0JBQWdCckIsV0FBVTtnQkFBd0J1RCxVQUFVaEQ7Z0JBQVdpRCxpQkFBYztnQkFBT0MsaUJBQWVqRDswQkFDekhJOzs7Ozs7WUFFRkosd0JBQ0MsOERBQUNUO2dCQUFJQyxXQUFVO2dCQUFzQkUsTUFBSztnQkFBT3dELGNBQVc7MEJBQ3pEckQsYUFBYWEsR0FBRyxDQUFDLENBQUNJLFFBQVF3QixRQUN6QixtSUFBbUk7b0JBQ25JLG1CQUFtQjtvQkFDbkIsU0FBUztrQ0FDVCw4REFBQ2hFO3dCQUVDQyxPQUFPdUMsT0FBT3ZDLEtBQUs7d0JBQ25CQyxVQUFVMEIsaUJBQWlCb0MsUUFBUTt3QkFDbkN0RCxlQUFla0IsaUJBQWlCb0MsUUFBUTt3QkFDeEM1RCxVQUFVLElBQU1rQyxrQkFBa0JFO3dCQUNsQ2pDLGNBQWMsSUFBTXdELGdCQUFnQkMsUUFBUSxHQUFHeEIsT0FBT3ZDLEtBQUs7d0JBQzNETyxjQUFjeUM7d0JBQ2RyQyxVQUFVZ0IsaUJBQWlCb0MsUUFBUSxJQUFJLElBQUksQ0FBQzt3QkFDNUNuRCxXQUFXZSxpQkFBaUJvQyxRQUFRO3VCQVIvQnhCLE9BQU92QyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7O0FBZS9CO0dBNUhNcUI7TUFBQUE7QUE4SE4sK0RBQWVBLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvVUkvU3BlZWRTZWxlY3Rvci5qc3g/YTViZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZVJlZiwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgXCIuLi8uLi9zdHlsZXMvRHJvcGRvd24uY3NzXCI7XG5cbmNvbnN0IE1lbnVJdGVtID0gKHtcbiAgbGFiZWwsXG4gIGlzQWN0aXZlLFxuICBoYXNTdWJtZW51LFxuICBvblNlbGVjdCxcbiAgY2hpbGRyZW4sXG4gIHNob3dTdWJtZW51LFxuICBvbk1vdXNlRW50ZXIsXG4gIG9uTW91c2VMZWF2ZSxcbiAgaXNTdWJtZW51SXRlbSA9IGZhbHNlLFxuICBpc0hpZ2hsaWdodGVkID0gZmFsc2UsXG4gIG9uS2V5RG93bixcbiAgdGFiSW5kZXgsXG4gIGlzRm9jdXNlZCA9IGZhbHNlLFxuICBcImFyaWEtZXhwYW5kZWRcIjogYXJpYUV4cGFuZGVkLFxufSkgPT4ge1xuICBjb25zdCBoYW5kbGVJdGVtTW91c2VMZWF2ZSA9IGUgPT4ge1xuICAgIC8vIElmIHRoaXMgaXMgYSBzdWJtZW51IGl0ZW0sIGRvbid0IHRyaWdnZXIgdGhlIHJlZ3VsYXIgbW91c2VsZWF2ZVxuICAgIG9uTW91c2VMZWF2ZT8uKGUpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgc3BlZWQtc2VsZWN0b3ItaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAke2lzQWN0aXZlID8gXCJhY3RpdmVcIiA6IFwiXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICR7aXNIaWdobGlnaHRlZCA/IFwiaGlnaGxpZ2h0XCIgOiBcIlwifVxuICAgICAgICAgICAgICAgICAgICAgICAke2lzRm9jdXNlZCA/IFwiaG92ZXJcIiA6IFwiXCJ9YH1cbiAgICAgIG9uQ2xpY2s9e29uU2VsZWN0fVxuICAgICAgb25Nb3VzZUVudGVyPXtvbk1vdXNlRW50ZXJ9XG4gICAgICBvbk1vdXNlTGVhdmU9e2hhbmRsZUl0ZW1Nb3VzZUxlYXZlfVxuICAgICAgb25LZXlEb3duPXtvbktleURvd259XG4gICAgICByb2xlPSdtZW51aXRlbSdcbiAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICA+XG4gICAgICA8c3Bhbj57bGFiZWx9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgU3BlZWRTZWxlY3RvciA9ICh7IHNwZWVkT3B0aW9ucywgb25TcGVlZFNlbGVjdCwgZGlzYWJsZSB9KSA9PiB7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtmb2N1c2VkSW5kZXgsIHNldEZvY3VzZWRJbmRleF0gPSB1c2VTdGF0ZSg3KTtcbiAgY29uc3QgW3NlbGVjdGVkT3B0aW9uLCBzZXRTZWxlY3RlZE9wdGlvbl0gPSB1c2VTdGF0ZShcIlNlbGVjdCBhbiBvcHRpb25cIik7XG4gIGNvbnN0IHNwZWVkRHJvcGRvd25SZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgY29uc29sZS5sb2coXCJmb2N1c1wiLCBmb2N1c2VkSW5kZXgpO1xuICBjb25zdCBtZW51SXRlbXMgPSBbXG4gICAgc3BlZWRPcHRpb25zLm1hcChzcGVlZCA9PiAoe1xuICAgICAgLi4uc3BlZWQsXG4gICAgICBvblNlbGVjdDogKCkgPT4gaGFuZGxlT3B0aW9uQ2xpY2soc3BlZWQpLFxuICAgIH0pKSxcbiAgXTtcblxuICBjb25zdCB0b2dnbGVEcm9wZG93biA9ICgpID0+IHNldElzT3BlbighaXNPcGVuKTtcbiAgY29uc3QgaGFuZGxlT3B0aW9uQ2xpY2sgPSBvcHRpb24gPT4ge1xuICAgIG9uU3BlZWRTZWxlY3Qob3B0aW9uLnZhbHVlKTtcbiAgICBzZXRTZWxlY3RlZE9wdGlvbihvcHRpb24ubGFiZWwpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IGV2ZW50ID0+IHtcbiAgICBpZiAoIWlzT3BlbiAmJiBldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgc2V0SXNPcGVuKHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaXNPcGVuKSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZXRGb2N1c2VkSW5kZXgocHJldiA9PiAocHJldiA8IG1lbnVJdGVtcy5sZW5ndGggLSAxID8gcHJldiArIDEgOiBwcmV2KSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZXRGb2N1c2VkSW5kZXgocHJldiA9PiAocHJldiA+IDAgPyBwcmV2IC0gMSA6IHByZXYpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJFbnRlclwiOlxuICAgICAgY2FzZSBcIiBcIjpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0gbWVudUl0ZW1zW2ZvY3VzZWRJbmRleCAtIDFdO1xuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJldmVcIiwgZXZlbnQpO1xuICAgICAgICAgIHNlbGVjdGVkSXRlbS5vblNlbGVjdChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJFc2NhcGVcIjpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb3VzZUxlYXZlID0gZXZlbnQgPT4ge1xuICAgIC8vIE9ubHkgcmVtb3ZlIGFjdGl2ZSBzdWJtZW51IGlmIHdlJ3JlIGxlYXZpbmcgdGhlIG1lbnUgZW50aXJlbHlcbiAgICBjb25zdCBtZW51RWxlbWVudCA9IHNwZWVkRHJvcGRvd25SZWYuY3VycmVudD8ucXVlcnlTZWxlY3RvcihcIi5zcGVlZC1zZWxlY3Rvci1tZW51XCIpO1xuXG4gICAgaWYgKG1lbnVFbGVtZW50KSB7XG4gICAgICBjb25zdCBtZW51UmVjdCA9IG1lbnVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgbW91c2VYID0gZXZlbnQuY2xpZW50WDtcbiAgICAgIGNvbnN0IG1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG5cbiAgICAgIC8vIElmIHN0aWxsIHdpdGhpbiBtZW51IGJvdW5kcywgZG9uJ3QgY2xvc2Ugc3VibWVudVxuICAgICAgaWYgKG1vdXNlWCA+PSBtZW51UmVjdC5sZWZ0ICYmIG1vdXNlWCA8PSBtZW51UmVjdC5yaWdodCAmJiBtb3VzZVkgPj0gbWVudVJlY3QudG9wICYmIG1vdXNlWSA8PSBtZW51UmVjdC5ib3R0b20pIHtcbiAgICAgICAgLy8gSWYgdGhlcmUncyBhIHZpc2libGUgc3VibWVudSwgY2hlY2sgaWYgd2UncmUgd2l0aGluIGl0cyBib3VuZHNcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUl0ZW1Ib3ZlciA9IGluZGV4ID0+IHtcbiAgICBzZXRGb2N1c2VkSW5kZXgoaW5kZXgpO1xuICB9O1xuXG4gIC8vIENsb3NlIGRyb3Bkb3duIGlmIGNsaWNrZWQgb3V0c2lkZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZ1bmN0aW9uIGhhbmRsZUNsaWNrT3V0c2lkZShldmVudCkge1xuICAgICAgaWYgKHNwZWVkRHJvcGRvd25SZWYuY3VycmVudCAmJiAhc3BlZWREcm9wZG93blJlZi5jdXJyZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQXR0YWNoIHRoZSBldmVudCBsaXN0ZW5lclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlQ2xpY2tPdXRzaWRlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgLy8gQ2xlYW4gdXAgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZUNsaWNrT3V0c2lkZSk7XG4gICAgfTtcbiAgfSwgW3NwZWVkRHJvcGRvd25SZWZdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPSdzcGVlZC1zZWxlY3RvcicgcmVmPXtzcGVlZERyb3Bkb3duUmVmfSBvbktleURvd249e2hhbmRsZUtleURvd259PlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0b2dnbGVEcm9wZG93bn0gY2xhc3NOYW1lPSdzcGVlZC1zZWxlY3Rvci1idXR0b24nIGRpc2FibGVkPXtkaXNhYmxlKCl9IGFyaWEtaGFzcG9wdXA9J3RydWUnIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn0+XG4gICAgICAgIHtzZWxlY3RlZE9wdGlvbn1cbiAgICAgIDwvYnV0dG9uPlxuICAgICAge2lzT3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzcGVlZC1zZWxlY3Rvci1tZW51JyByb2xlPSdtZW51JyBhcmlhLWxhYmVsPSdQbGFuZXQgc2VsZWN0aW9uIG1lbnUnPlxuICAgICAgICAgIHtzcGVlZE9wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAvLyA8ZGl2IGNsYXNzTmFtZT0nc3BlZWQtc2VsZWN0b3ItaXRlbScga2V5PXtpbmRleH0gdmFsdWU9e29wdGlvbi52YWx1ZX0gb25DbGljaz17KCkgPT4gaGFuZGxlT3B0aW9uQ2xpY2sob3B0aW9uKX0gcm9sZT0nbWVudWl0ZW0nPlxuICAgICAgICAgICAgLy8gICB7b3B0aW9uLmxhYmVsfVxuICAgICAgICAgICAgLy8gPC9kaXY+XG4gICAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgICAga2V5PXtvcHRpb24ubGFiZWx9XG4gICAgICAgICAgICAgIGxhYmVsPXtvcHRpb24ubGFiZWx9XG4gICAgICAgICAgICAgIGlzQWN0aXZlPXtmb2N1c2VkSW5kZXggPT09IGluZGV4ICsgMX1cbiAgICAgICAgICAgICAgaXNIaWdobGlnaHRlZD17Zm9jdXNlZEluZGV4ID09PSBpbmRleCArIDF9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXsoKSA9PiBoYW5kbGVPcHRpb25DbGljayhvcHRpb24pfVxuICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IGhhbmRsZUl0ZW1Ib3ZlcihpbmRleCArIDEsIG9wdGlvbi5sYWJlbCl9XG4gICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17aGFuZGxlTW91c2VMZWF2ZX1cbiAgICAgICAgICAgICAgdGFiSW5kZXg9e2ZvY3VzZWRJbmRleCA9PT0gaW5kZXggKyAxID8gMCA6IC0xfVxuICAgICAgICAgICAgICBpc0ZvY3VzZWQ9e2ZvY3VzZWRJbmRleCA9PT0gaW5kZXggKyAxfVxuICAgICAgICAgICAgPjwvTWVudUl0ZW0+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNwZWVkU2VsZWN0b3I7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZVJlZiIsInVzZUVmZmVjdCIsIk1lbnVJdGVtIiwibGFiZWwiLCJpc0FjdGl2ZSIsImhhc1N1Ym1lbnUiLCJvblNlbGVjdCIsImNoaWxkcmVuIiwic2hvd1N1Ym1lbnUiLCJvbk1vdXNlRW50ZXIiLCJvbk1vdXNlTGVhdmUiLCJpc1N1Ym1lbnVJdGVtIiwiaXNIaWdobGlnaHRlZCIsIm9uS2V5RG93biIsInRhYkluZGV4IiwiaXNGb2N1c2VkIiwiYXJpYUV4cGFuZGVkIiwiaGFuZGxlSXRlbU1vdXNlTGVhdmUiLCJlIiwiZGl2IiwiY2xhc3NOYW1lIiwib25DbGljayIsInJvbGUiLCJzcGFuIiwiU3BlZWRTZWxlY3RvciIsInNwZWVkT3B0aW9ucyIsIm9uU3BlZWRTZWxlY3QiLCJkaXNhYmxlIiwiaXNPcGVuIiwic2V0SXNPcGVuIiwiZm9jdXNlZEluZGV4Iiwic2V0Rm9jdXNlZEluZGV4Iiwic2VsZWN0ZWRPcHRpb24iLCJzZXRTZWxlY3RlZE9wdGlvbiIsInNwZWVkRHJvcGRvd25SZWYiLCJjb25zb2xlIiwibG9nIiwibWVudUl0ZW1zIiwibWFwIiwic3BlZWQiLCJoYW5kbGVPcHRpb25DbGljayIsInRvZ2dsZURyb3Bkb3duIiwib3B0aW9uIiwidmFsdWUiLCJoYW5kbGVLZXlEb3duIiwiZXZlbnQiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsInByZXYiLCJsZW5ndGgiLCJzZWxlY3RlZEl0ZW0iLCJoYW5kbGVNb3VzZUxlYXZlIiwibWVudUVsZW1lbnQiLCJjdXJyZW50IiwicXVlcnlTZWxlY3RvciIsIm1lbnVSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibW91c2VYIiwiY2xpZW50WCIsIm1vdXNlWSIsImNsaWVudFkiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJoYW5kbGVJdGVtSG92ZXIiLCJpbmRleCIsImhhbmRsZUNsaWNrT3V0c2lkZSIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlZiIsImJ1dHRvbiIsImRpc2FibGVkIiwiYXJpYS1oYXNwb3B1cCIsImFyaWEtZXhwYW5kZWQiLCJhcmlhLWxhYmVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/UI/SpeedSelector.jsx\n"));

/***/ })

});