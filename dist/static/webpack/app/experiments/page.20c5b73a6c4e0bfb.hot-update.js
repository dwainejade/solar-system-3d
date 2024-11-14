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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_Dropdown_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/Dropdown.css */ \"(app-pages-browser)/./src/styles/Dropdown.css\");\n\nvar _s = $RefreshSig$();\n\n\nconst MenuItem = (param)=>{\n    let { label, isActive, hasSubmenu, onSelect, children, showSubmenu, onMouseEnter, onMouseLeave, isSubmenuItem = false, isHighlighted = false, onKeyDown, tabIndex, isFocused = false, \"aria-expanded\": ariaExpanded } = param;\n    const handleItemMouseLeave = (e)=>{\n        // If this is a submenu item, don't trigger the regular mouseleave\n        if (isSubmenuItem) {\n            e.stopPropagation();\n            return;\n        }\n        onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(e);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"speed-selector-item \\n                       \".concat(isActive ? \"active\" : \"\", \" \\n                       \").concat(isHighlighted ? \"highlight\" : \"\", \"\\n                       \").concat(isFocused ? \"hover\" : \"\"),\n        onClick: onSelect,\n        onMouseEnter: onMouseEnter,\n        onMouseLeave: handleItemMouseLeave,\n        onKeyDown: onKeyDown,\n        role: \"menuitem\",\n        tabIndex: tabIndex,\n        \"aria-haspopup\": hasSubmenu,\n        \"aria-expanded\": hasSubmenu ? ariaExpanded : undefined,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n            children: label\n        }, void 0, false, {\n            fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n            lineNumber: 44,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n        lineNumber: 30,\n        columnNumber: 5\n    }, undefined);\n};\n_c = MenuItem;\nconst SpeedSelector = (param)=>{\n    let { speedOptions, onSpeedSelect, disable } = param;\n    _s();\n    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [focusedIndex, setFocusedIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(-1);\n    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"Select an option\");\n    const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const toggleDropdown = ()=>setIsOpen(!isOpen);\n    const handleOptionClick = (option)=>{\n        onSpeedSelect(option.value);\n        setSelectedOption(option.label);\n        setIsOpen(false);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"speed-selector\",\n        ref: dropdownRef,\n        role: \"combobox\",\n        \"aria-expanded\": \"false\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: toggleDropdown,\n                className: \"speed-selector-button\",\n                disabled: disable(),\n                \"aria-haspopup\": \"listbox\",\n                \"aria-labelledby\": \"dropdownButton\",\n                \"aria-expanded\": \"false\",\n                children: selectedOption\n            }, void 0, false, {\n                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, undefined),\n            isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"speed-selector-dropdown\",\n                role: \"listbox\",\n                \"aria-labelledby\": \"dropdownButton\",\n                tabindex: \"-1\",\n                hidden: true,\n                children: speedOptions.map((option, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"speed-selector-item\",\n                        value: option.value,\n                        onClick: ()=>handleOptionClick(option),\n                        children: option.label\n                    }, index, false, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                        lineNumber: 77,\n                        columnNumber: 13\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                lineNumber: 75,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n        lineNumber: 63,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SpeedSelector, \"bwqCtLoEWaleoKnVRrCJJVl55IU=\");\n_c1 = SpeedSelector;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SpeedSelector);\nvar _c, _c1;\n$RefreshReg$(_c, \"MenuItem\");\n$RefreshReg$(_c1, \"SpeedSelector\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1VJL1NwZWVkU2VsZWN0b3IuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkQ7QUFDeEI7QUFFbkMsTUFBTUksV0FBVztRQUFDLEVBQ2hCQyxLQUFLLEVBQ0xDLFFBQVEsRUFDUkMsVUFBVSxFQUNWQyxRQUFRLEVBQ1JDLFFBQVEsRUFDUkMsV0FBVyxFQUNYQyxZQUFZLEVBQ1pDLFlBQVksRUFDWkMsZ0JBQWdCLEtBQUssRUFDckJDLGdCQUFnQixLQUFLLEVBQ3JCQyxTQUFTLEVBQ1RDLFFBQVEsRUFDUkMsWUFBWSxLQUFLLEVBQ2pCLGlCQUFpQkMsWUFBWSxFQUM5QjtJQUNDLE1BQU1DLHVCQUF1QkMsQ0FBQUE7UUFDM0Isa0VBQWtFO1FBQ2xFLElBQUlQLGVBQWU7WUFDakJPLEVBQUVDLGVBQWU7WUFDakI7UUFDRjtRQUNBVCx5QkFBQUEsbUNBQUFBLGFBQWVRO0lBQ2pCO0lBRUEscUJBQ0UsOERBQUNFO1FBQ0NDLFdBQVcsZ0RBRVFULE9BREFSLFdBQVcsV0FBVyxJQUFHLDhCQUV6QlcsT0FEQUgsZ0JBQWdCLGNBQWMsSUFBRyw2QkFDUixPQUF6QkcsWUFBWSxVQUFVO1FBQ3pDTyxTQUFTaEI7UUFDVEcsY0FBY0E7UUFDZEMsY0FBY087UUFDZEosV0FBV0E7UUFDWFUsTUFBSztRQUNMVCxVQUFVQTtRQUNWVSxpQkFBZW5CO1FBQ2ZvQixpQkFBZXBCLGFBQWFXLGVBQWVVO2tCQUUzQyw0RUFBQ0M7c0JBQU14Qjs7Ozs7Ozs7Ozs7QUFHYjtLQTNDTUQ7QUE2Q04sTUFBTTBCLGdCQUFnQjtRQUFDLEVBQUVDLFlBQVksRUFBRUMsYUFBYSxFQUFFQyxPQUFPLEVBQUU7O0lBQzdELE1BQU0sQ0FBQ0MsUUFBUUMsVUFBVSxHQUFHbEMsK0NBQVFBLENBQUM7SUFDckMsTUFBTSxDQUFDbUMsY0FBY0MsZ0JBQWdCLEdBQUdwQywrQ0FBUUEsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sQ0FBQ3FDLGdCQUFnQkMsa0JBQWtCLEdBQUd0QywrQ0FBUUEsQ0FBQztJQUNyRCxNQUFNdUMsY0FBY3RDLDZDQUFNQSxDQUFDO0lBRTNCLE1BQU11QyxpQkFBaUIsSUFBTU4sVUFBVSxDQUFDRDtJQUN4QyxNQUFNUSxvQkFBb0JDLENBQUFBO1FBQ3hCWCxjQUFjVyxPQUFPQyxLQUFLO1FBQzFCTCxrQkFBa0JJLE9BQU90QyxLQUFLO1FBQzlCOEIsVUFBVTtJQUNaO0lBRUEscUJBQ0UsOERBQUNiO1FBQUlDLFdBQVU7UUFBaUJzQixLQUFLTDtRQUFhZixNQUFLO1FBQVdFLGlCQUFjOzswQkFDOUUsOERBQUNtQjtnQkFDQ3RCLFNBQVNpQjtnQkFDVGxCLFdBQVU7Z0JBQ1Z3QixVQUFVZDtnQkFDVlAsaUJBQWM7Z0JBQ2RzQixtQkFBZ0I7Z0JBQ2hCckIsaUJBQWM7MEJBRWJXOzs7Ozs7WUFFRkosd0JBQ0MsOERBQUNaO2dCQUFJQyxXQUFVO2dCQUEwQkUsTUFBSztnQkFBVXVCLG1CQUFnQjtnQkFBaUJDLFVBQVM7Z0JBQUtDLE1BQU07MEJBQzFHbkIsYUFBYW9CLEdBQUcsQ0FBQyxDQUFDUixRQUFRUyxzQkFDekIsOERBQUM5Qjt3QkFBSUMsV0FBVTt3QkFBa0NxQixPQUFPRCxPQUFPQyxLQUFLO3dCQUFFcEIsU0FBUyxJQUFNa0Isa0JBQWtCQztrQ0FDcEdBLE9BQU90QyxLQUFLO3VCQUQyQitDOzs7Ozs7Ozs7Ozs7Ozs7O0FBUXREO0dBcENNdEI7TUFBQUE7QUFzQ04sK0RBQWVBLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvVUkvU3BlZWRTZWxlY3Rvci5qc3g/YTViZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZVJlZiwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgXCIuLi8uLi9zdHlsZXMvRHJvcGRvd24uY3NzXCI7XG5cbmNvbnN0IE1lbnVJdGVtID0gKHtcbiAgbGFiZWwsXG4gIGlzQWN0aXZlLFxuICBoYXNTdWJtZW51LFxuICBvblNlbGVjdCxcbiAgY2hpbGRyZW4sXG4gIHNob3dTdWJtZW51LFxuICBvbk1vdXNlRW50ZXIsXG4gIG9uTW91c2VMZWF2ZSxcbiAgaXNTdWJtZW51SXRlbSA9IGZhbHNlLFxuICBpc0hpZ2hsaWdodGVkID0gZmFsc2UsXG4gIG9uS2V5RG93bixcbiAgdGFiSW5kZXgsXG4gIGlzRm9jdXNlZCA9IGZhbHNlLFxuICBcImFyaWEtZXhwYW5kZWRcIjogYXJpYUV4cGFuZGVkLFxufSkgPT4ge1xuICBjb25zdCBoYW5kbGVJdGVtTW91c2VMZWF2ZSA9IGUgPT4ge1xuICAgIC8vIElmIHRoaXMgaXMgYSBzdWJtZW51IGl0ZW0sIGRvbid0IHRyaWdnZXIgdGhlIHJlZ3VsYXIgbW91c2VsZWF2ZVxuICAgIGlmIChpc1N1Ym1lbnVJdGVtKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvbk1vdXNlTGVhdmU/LihlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YHNwZWVkLXNlbGVjdG9yLWl0ZW0gXG4gICAgICAgICAgICAgICAgICAgICAgICR7aXNBY3RpdmUgPyBcImFjdGl2ZVwiIDogXCJcIn0gXG4gICAgICAgICAgICAgICAgICAgICAgICR7aXNIaWdobGlnaHRlZCA/IFwiaGlnaGxpZ2h0XCIgOiBcIlwifVxuICAgICAgICAgICAgICAgICAgICAgICAke2lzRm9jdXNlZCA/IFwiaG92ZXJcIiA6IFwiXCJ9YH1cbiAgICAgIG9uQ2xpY2s9e29uU2VsZWN0fVxuICAgICAgb25Nb3VzZUVudGVyPXtvbk1vdXNlRW50ZXJ9XG4gICAgICBvbk1vdXNlTGVhdmU9e2hhbmRsZUl0ZW1Nb3VzZUxlYXZlfVxuICAgICAgb25LZXlEb3duPXtvbktleURvd259XG4gICAgICByb2xlPSdtZW51aXRlbSdcbiAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgIGFyaWEtaGFzcG9wdXA9e2hhc1N1Ym1lbnV9XG4gICAgICBhcmlhLWV4cGFuZGVkPXtoYXNTdWJtZW51ID8gYXJpYUV4cGFuZGVkIDogdW5kZWZpbmVkfVxuICAgID5cbiAgICAgIDxzcGFuPntsYWJlbH08L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCBTcGVlZFNlbGVjdG9yID0gKHsgc3BlZWRPcHRpb25zLCBvblNwZWVkU2VsZWN0LCBkaXNhYmxlIH0pID0+IHtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2ZvY3VzZWRJbmRleCwgc2V0Rm9jdXNlZEluZGV4XSA9IHVzZVN0YXRlKC0xKTtcbiAgY29uc3QgW3NlbGVjdGVkT3B0aW9uLCBzZXRTZWxlY3RlZE9wdGlvbl0gPSB1c2VTdGF0ZShcIlNlbGVjdCBhbiBvcHRpb25cIik7XG4gIGNvbnN0IGRyb3Bkb3duUmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IHRvZ2dsZURyb3Bkb3duID0gKCkgPT4gc2V0SXNPcGVuKCFpc09wZW4pO1xuICBjb25zdCBoYW5kbGVPcHRpb25DbGljayA9IG9wdGlvbiA9PiB7XG4gICAgb25TcGVlZFNlbGVjdChvcHRpb24udmFsdWUpO1xuICAgIHNldFNlbGVjdGVkT3B0aW9uKG9wdGlvbi5sYWJlbCk7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPSdzcGVlZC1zZWxlY3RvcicgcmVmPXtkcm9wZG93blJlZn0gcm9sZT0nY29tYm9ib3gnIGFyaWEtZXhwYW5kZWQ9J2ZhbHNlJz5cbiAgICAgIDxidXR0b25cbiAgICAgICAgb25DbGljaz17dG9nZ2xlRHJvcGRvd259XG4gICAgICAgIGNsYXNzTmFtZT0nc3BlZWQtc2VsZWN0b3ItYnV0dG9uJ1xuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZSgpfVxuICAgICAgICBhcmlhLWhhc3BvcHVwPSdsaXN0Ym94J1xuICAgICAgICBhcmlhLWxhYmVsbGVkYnk9J2Ryb3Bkb3duQnV0dG9uJ1xuICAgICAgICBhcmlhLWV4cGFuZGVkPSdmYWxzZSdcbiAgICAgID5cbiAgICAgICAge3NlbGVjdGVkT3B0aW9ufVxuICAgICAgPC9idXR0b24+XG4gICAgICB7aXNPcGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NwZWVkLXNlbGVjdG9yLWRyb3Bkb3duJyByb2xlPSdsaXN0Ym94JyBhcmlhLWxhYmVsbGVkYnk9J2Ryb3Bkb3duQnV0dG9uJyB0YWJpbmRleD0nLTEnIGhpZGRlbj5cbiAgICAgICAgICB7c3BlZWRPcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NwZWVkLXNlbGVjdG9yLWl0ZW0nIGtleT17aW5kZXh9IHZhbHVlPXtvcHRpb24udmFsdWV9IG9uQ2xpY2s9eygpID0+IGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbil9PlxuICAgICAgICAgICAgICB7b3B0aW9uLmxhYmVsfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNwZWVkU2VsZWN0b3I7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZVJlZiIsInVzZUVmZmVjdCIsIk1lbnVJdGVtIiwibGFiZWwiLCJpc0FjdGl2ZSIsImhhc1N1Ym1lbnUiLCJvblNlbGVjdCIsImNoaWxkcmVuIiwic2hvd1N1Ym1lbnUiLCJvbk1vdXNlRW50ZXIiLCJvbk1vdXNlTGVhdmUiLCJpc1N1Ym1lbnVJdGVtIiwiaXNIaWdobGlnaHRlZCIsIm9uS2V5RG93biIsInRhYkluZGV4IiwiaXNGb2N1c2VkIiwiYXJpYUV4cGFuZGVkIiwiaGFuZGxlSXRlbU1vdXNlTGVhdmUiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwiZGl2IiwiY2xhc3NOYW1lIiwib25DbGljayIsInJvbGUiLCJhcmlhLWhhc3BvcHVwIiwiYXJpYS1leHBhbmRlZCIsInVuZGVmaW5lZCIsInNwYW4iLCJTcGVlZFNlbGVjdG9yIiwic3BlZWRPcHRpb25zIiwib25TcGVlZFNlbGVjdCIsImRpc2FibGUiLCJpc09wZW4iLCJzZXRJc09wZW4iLCJmb2N1c2VkSW5kZXgiLCJzZXRGb2N1c2VkSW5kZXgiLCJzZWxlY3RlZE9wdGlvbiIsInNldFNlbGVjdGVkT3B0aW9uIiwiZHJvcGRvd25SZWYiLCJ0b2dnbGVEcm9wZG93biIsImhhbmRsZU9wdGlvbkNsaWNrIiwib3B0aW9uIiwidmFsdWUiLCJyZWYiLCJidXR0b24iLCJkaXNhYmxlZCIsImFyaWEtbGFiZWxsZWRieSIsInRhYmluZGV4IiwiaGlkZGVuIiwibWFwIiwiaW5kZXgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/UI/SpeedSelector.jsx\n"));

/***/ })

});