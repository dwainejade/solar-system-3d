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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_Dropdown_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/Dropdown.css */ \"(app-pages-browser)/./src/styles/Dropdown.css\");\n\nvar _s = $RefreshSig$();\n\n\nconst MenuItem = (param)=>{\n    let { label, isActive, hasSubmenu, onSelect, children, showSubmenu, onMouseEnter, onMouseLeave, isSubmenuItem = false, isHighlighted = false, onKeyDown, tabIndex, isFocused = false, \"aria-expanded\": ariaExpanded } = param;\n    const handleItemMouseLeave = (e)=>{\n        // If this is a submenu item, don't trigger the regular mouseleave\n        if (isSubmenuItem) {\n            e.stopPropagation();\n            return;\n        }\n        onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(e);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"speed-selector-item \\n                       \".concat(isActive ? \"active\" : \"\", \" \\n                       \").concat(isHighlighted ? \"highlight\" : \"\", \"\\n                       \").concat(isFocused ? \"hover\" : \"\"),\n        onClick: onSelect,\n        onMouseEnter: onMouseEnter,\n        onMouseLeave: handleItemMouseLeave,\n        onKeyDown: onKeyDown,\n        role: \"menuitem\",\n        tabIndex: tabIndex,\n        \"aria-haspopup\": hasSubmenu,\n        \"aria-expanded\": hasSubmenu ? ariaExpanded : undefined,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n            children: label\n        }, void 0, false, {\n            fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n            lineNumber: 44,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n        lineNumber: 30,\n        columnNumber: 5\n    }, undefined);\n};\n_c = MenuItem;\nconst SpeedSelector = (param)=>{\n    let { speedOptions, onSpeedSelect, disable } = param;\n    _s();\n    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [focusedIndex, setFocusedIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(-1);\n    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"Select an option\");\n    const speedDropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const toggleDropdown = ()=>setIsOpen(!isOpen);\n    const handleOptionClick = (option)=>{\n        onSpeedSelect(option.value);\n        setSelectedOption(option.label);\n        setIsOpen(false);\n    };\n    // Close dropdown if clicked outside\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        function handleClickOutside(event) {\n            if (speedDropdownRef.current && !speedDropdownRef.current.contains(event.target)) {\n                setIsOpen(false);\n            }\n        }\n        // Attach the event listener\n        document.addEventListener(\"mousedown\", handleClickOutside);\n        return ()=>{\n            // Clean up the event listener\n            document.removeEventListener(\"mousedown\", handleClickOutside);\n        };\n    }, [\n        speedDropdownRef\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"speed-selector\",\n        ref: speedDropdownRef,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: toggleDropdown,\n                className: \"speed-selector-button\",\n                disabled: disable(),\n                \"aria-haspopup\": \"true\",\n                \"aria-expanded\": isOpen,\n                children: selectedOption\n            }, void 0, false, {\n                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                lineNumber: 79,\n                columnNumber: 7\n            }, undefined),\n            isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"speed-selector-dropdown\",\n                role: \"menu\",\n                \"aria-label\": \"Planet selection menu\",\n                children: speedOptions.map((option, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"speed-selector-item\",\n                        value: option.value,\n                        onClick: ()=>handleOptionClick(option),\n                        role: \"menuitem\",\n                        children: option.label\n                    }, index, false, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                        lineNumber: 85,\n                        columnNumber: 13\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                lineNumber: 83,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n        lineNumber: 78,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SpeedSelector, \"j4TaV+/3aLBJI1aXQYsBgpkjKes=\");\n_c1 = SpeedSelector;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SpeedSelector);\nvar _c, _c1;\n$RefreshReg$(_c, \"MenuItem\");\n$RefreshReg$(_c1, \"SpeedSelector\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1VJL1NwZWVkU2VsZWN0b3IuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkQ7QUFDeEI7QUFFbkMsTUFBTUksV0FBVztRQUFDLEVBQ2hCQyxLQUFLLEVBQ0xDLFFBQVEsRUFDUkMsVUFBVSxFQUNWQyxRQUFRLEVBQ1JDLFFBQVEsRUFDUkMsV0FBVyxFQUNYQyxZQUFZLEVBQ1pDLFlBQVksRUFDWkMsZ0JBQWdCLEtBQUssRUFDckJDLGdCQUFnQixLQUFLLEVBQ3JCQyxTQUFTLEVBQ1RDLFFBQVEsRUFDUkMsWUFBWSxLQUFLLEVBQ2pCLGlCQUFpQkMsWUFBWSxFQUM5QjtJQUNDLE1BQU1DLHVCQUF1QkMsQ0FBQUE7UUFDM0Isa0VBQWtFO1FBQ2xFLElBQUlQLGVBQWU7WUFDakJPLEVBQUVDLGVBQWU7WUFDakI7UUFDRjtRQUNBVCx5QkFBQUEsbUNBQUFBLGFBQWVRO0lBQ2pCO0lBRUEscUJBQ0UsOERBQUNFO1FBQ0NDLFdBQVcsZ0RBRVFULE9BREFSLFdBQVcsV0FBVyxJQUFHLDhCQUV6QlcsT0FEQUgsZ0JBQWdCLGNBQWMsSUFBRyw2QkFDUixPQUF6QkcsWUFBWSxVQUFVO1FBQ3pDTyxTQUFTaEI7UUFDVEcsY0FBY0E7UUFDZEMsY0FBY087UUFDZEosV0FBV0E7UUFDWFUsTUFBSztRQUNMVCxVQUFVQTtRQUNWVSxpQkFBZW5CO1FBQ2ZvQixpQkFBZXBCLGFBQWFXLGVBQWVVO2tCQUUzQyw0RUFBQ0M7c0JBQU14Qjs7Ozs7Ozs7Ozs7QUFHYjtLQTNDTUQ7QUE2Q04sTUFBTTBCLGdCQUFnQjtRQUFDLEVBQUVDLFlBQVksRUFBRUMsYUFBYSxFQUFFQyxPQUFPLEVBQUU7O0lBQzdELE1BQU0sQ0FBQ0MsUUFBUUMsVUFBVSxHQUFHbEMsK0NBQVFBLENBQUM7SUFDckMsTUFBTSxDQUFDbUMsY0FBY0MsZ0JBQWdCLEdBQUdwQywrQ0FBUUEsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sQ0FBQ3FDLGdCQUFnQkMsa0JBQWtCLEdBQUd0QywrQ0FBUUEsQ0FBQztJQUNyRCxNQUFNdUMsbUJBQW1CdEMsNkNBQU1BLENBQUM7SUFFaEMsTUFBTXVDLGlCQUFpQixJQUFNTixVQUFVLENBQUNEO0lBQ3hDLE1BQU1RLG9CQUFvQkMsQ0FBQUE7UUFDeEJYLGNBQWNXLE9BQU9DLEtBQUs7UUFDMUJMLGtCQUFrQkksT0FBT3RDLEtBQUs7UUFDOUI4QixVQUFVO0lBQ1o7SUFFQSxvQ0FBb0M7SUFDcENoQyxnREFBU0EsQ0FBQztRQUNSLFNBQVMwQyxtQkFBbUJDLEtBQUs7WUFDL0IsSUFBSU4saUJBQWlCTyxPQUFPLElBQUksQ0FBQ1AsaUJBQWlCTyxPQUFPLENBQUNDLFFBQVEsQ0FBQ0YsTUFBTUcsTUFBTSxHQUFHO2dCQUNoRmQsVUFBVTtZQUNaO1FBQ0Y7UUFDQSw0QkFBNEI7UUFDNUJlLFNBQVNDLGdCQUFnQixDQUFDLGFBQWFOO1FBQ3ZDLE9BQU87WUFDTCw4QkFBOEI7WUFDOUJLLFNBQVNFLG1CQUFtQixDQUFDLGFBQWFQO1FBQzVDO0lBQ0YsR0FBRztRQUFDTDtLQUFpQjtJQUVyQixxQkFDRSw4REFBQ2xCO1FBQUlDLFdBQVU7UUFBaUI4QixLQUFLYjs7MEJBQ25DLDhEQUFDYztnQkFBTzlCLFNBQVNpQjtnQkFBZ0JsQixXQUFVO2dCQUF3QmdDLFVBQVV0QjtnQkFBV1AsaUJBQWM7Z0JBQU9DLGlCQUFlTzswQkFDekhJOzs7Ozs7WUFFRkosd0JBQ0MsOERBQUNaO2dCQUFJQyxXQUFVO2dCQUEwQkUsTUFBSztnQkFBTytCLGNBQVc7MEJBQzdEekIsYUFBYTBCLEdBQUcsQ0FBQyxDQUFDZCxRQUFRZSxzQkFDekIsOERBQUNwQzt3QkFBSUMsV0FBVTt3QkFBa0NxQixPQUFPRCxPQUFPQyxLQUFLO3dCQUFFcEIsU0FBUyxJQUFNa0Isa0JBQWtCQzt3QkFBU2xCLE1BQUs7a0NBQ2xIa0IsT0FBT3RDLEtBQUs7dUJBRDJCcUQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRdEQ7R0E1Q001QjtNQUFBQTtBQThDTiwrREFBZUEsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9VSS9TcGVlZFNlbGVjdG9yLmpzeD9hNWJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBcIi4uLy4uL3N0eWxlcy9Ecm9wZG93bi5jc3NcIjtcblxuY29uc3QgTWVudUl0ZW0gPSAoe1xuICBsYWJlbCxcbiAgaXNBY3RpdmUsXG4gIGhhc1N1Ym1lbnUsXG4gIG9uU2VsZWN0LFxuICBjaGlsZHJlbixcbiAgc2hvd1N1Ym1lbnUsXG4gIG9uTW91c2VFbnRlcixcbiAgb25Nb3VzZUxlYXZlLFxuICBpc1N1Ym1lbnVJdGVtID0gZmFsc2UsXG4gIGlzSGlnaGxpZ2h0ZWQgPSBmYWxzZSxcbiAgb25LZXlEb3duLFxuICB0YWJJbmRleCxcbiAgaXNGb2N1c2VkID0gZmFsc2UsXG4gIFwiYXJpYS1leHBhbmRlZFwiOiBhcmlhRXhwYW5kZWQsXG59KSA9PiB7XG4gIGNvbnN0IGhhbmRsZUl0ZW1Nb3VzZUxlYXZlID0gZSA9PiB7XG4gICAgLy8gSWYgdGhpcyBpcyBhIHN1Ym1lbnUgaXRlbSwgZG9uJ3QgdHJpZ2dlciB0aGUgcmVndWxhciBtb3VzZWxlYXZlXG4gICAgaWYgKGlzU3VibWVudUl0ZW0pIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uTW91c2VMZWF2ZT8uKGUpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgc3BlZWQtc2VsZWN0b3ItaXRlbSBcbiAgICAgICAgICAgICAgICAgICAgICAgJHtpc0FjdGl2ZSA/IFwiYWN0aXZlXCIgOiBcIlwifSBcbiAgICAgICAgICAgICAgICAgICAgICAgJHtpc0hpZ2hsaWdodGVkID8gXCJoaWdobGlnaHRcIiA6IFwiXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICR7aXNGb2N1c2VkID8gXCJob3ZlclwiIDogXCJcIn1gfVxuICAgICAgb25DbGljaz17b25TZWxlY3R9XG4gICAgICBvbk1vdXNlRW50ZXI9e29uTW91c2VFbnRlcn1cbiAgICAgIG9uTW91c2VMZWF2ZT17aGFuZGxlSXRlbU1vdXNlTGVhdmV9XG4gICAgICBvbktleURvd249e29uS2V5RG93bn1cbiAgICAgIHJvbGU9J21lbnVpdGVtJ1xuICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgYXJpYS1oYXNwb3B1cD17aGFzU3VibWVudX1cbiAgICAgIGFyaWEtZXhwYW5kZWQ9e2hhc1N1Ym1lbnUgPyBhcmlhRXhwYW5kZWQgOiB1bmRlZmluZWR9XG4gICAgPlxuICAgICAgPHNwYW4+e2xhYmVsfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmNvbnN0IFNwZWVkU2VsZWN0b3IgPSAoeyBzcGVlZE9wdGlvbnMsIG9uU3BlZWRTZWxlY3QsIGRpc2FibGUgfSkgPT4ge1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZm9jdXNlZEluZGV4LCBzZXRGb2N1c2VkSW5kZXhdID0gdXNlU3RhdGUoLTEpO1xuICBjb25zdCBbc2VsZWN0ZWRPcHRpb24sIHNldFNlbGVjdGVkT3B0aW9uXSA9IHVzZVN0YXRlKFwiU2VsZWN0IGFuIG9wdGlvblwiKTtcbiAgY29uc3Qgc3BlZWREcm9wZG93blJlZiA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCB0b2dnbGVEcm9wZG93biA9ICgpID0+IHNldElzT3BlbighaXNPcGVuKTtcbiAgY29uc3QgaGFuZGxlT3B0aW9uQ2xpY2sgPSBvcHRpb24gPT4ge1xuICAgIG9uU3BlZWRTZWxlY3Qob3B0aW9uLnZhbHVlKTtcbiAgICBzZXRTZWxlY3RlZE9wdGlvbihvcHRpb24ubGFiZWwpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG4gIH07XG5cbiAgLy8gQ2xvc2UgZHJvcGRvd24gaWYgY2xpY2tlZCBvdXRzaWRlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2tPdXRzaWRlKGV2ZW50KSB7XG4gICAgICBpZiAoc3BlZWREcm9wZG93blJlZi5jdXJyZW50ICYmICFzcGVlZERyb3Bkb3duUmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBBdHRhY2ggdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVDbGlja091dHNpZGUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAvLyBDbGVhbiB1cCB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlQ2xpY2tPdXRzaWRlKTtcbiAgICB9O1xuICB9LCBbc3BlZWREcm9wZG93blJlZl0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J3NwZWVkLXNlbGVjdG9yJyByZWY9e3NwZWVkRHJvcGRvd25SZWZ9PlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0b2dnbGVEcm9wZG93bn0gY2xhc3NOYW1lPSdzcGVlZC1zZWxlY3Rvci1idXR0b24nIGRpc2FibGVkPXtkaXNhYmxlKCl9IGFyaWEtaGFzcG9wdXA9J3RydWUnIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn0+XG4gICAgICAgIHtzZWxlY3RlZE9wdGlvbn1cbiAgICAgIDwvYnV0dG9uPlxuICAgICAge2lzT3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzcGVlZC1zZWxlY3Rvci1kcm9wZG93bicgcm9sZT0nbWVudScgYXJpYS1sYWJlbD0nUGxhbmV0IHNlbGVjdGlvbiBtZW51Jz5cbiAgICAgICAgICB7c3BlZWRPcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NwZWVkLXNlbGVjdG9yLWl0ZW0nIGtleT17aW5kZXh9IHZhbHVlPXtvcHRpb24udmFsdWV9IG9uQ2xpY2s9eygpID0+IGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbil9IHJvbGU9J21lbnVpdGVtJz5cbiAgICAgICAgICAgICAge29wdGlvbi5sYWJlbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTcGVlZFNlbGVjdG9yO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJNZW51SXRlbSIsImxhYmVsIiwiaXNBY3RpdmUiLCJoYXNTdWJtZW51Iiwib25TZWxlY3QiLCJjaGlsZHJlbiIsInNob3dTdWJtZW51Iiwib25Nb3VzZUVudGVyIiwib25Nb3VzZUxlYXZlIiwiaXNTdWJtZW51SXRlbSIsImlzSGlnaGxpZ2h0ZWQiLCJvbktleURvd24iLCJ0YWJJbmRleCIsImlzRm9jdXNlZCIsImFyaWFFeHBhbmRlZCIsImhhbmRsZUl0ZW1Nb3VzZUxlYXZlIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsImRpdiIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJyb2xlIiwiYXJpYS1oYXNwb3B1cCIsImFyaWEtZXhwYW5kZWQiLCJ1bmRlZmluZWQiLCJzcGFuIiwiU3BlZWRTZWxlY3RvciIsInNwZWVkT3B0aW9ucyIsIm9uU3BlZWRTZWxlY3QiLCJkaXNhYmxlIiwiaXNPcGVuIiwic2V0SXNPcGVuIiwiZm9jdXNlZEluZGV4Iiwic2V0Rm9jdXNlZEluZGV4Iiwic2VsZWN0ZWRPcHRpb24iLCJzZXRTZWxlY3RlZE9wdGlvbiIsInNwZWVkRHJvcGRvd25SZWYiLCJ0b2dnbGVEcm9wZG93biIsImhhbmRsZU9wdGlvbkNsaWNrIiwib3B0aW9uIiwidmFsdWUiLCJoYW5kbGVDbGlja091dHNpZGUiLCJldmVudCIsImN1cnJlbnQiLCJjb250YWlucyIsInRhcmdldCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZWYiLCJidXR0b24iLCJkaXNhYmxlZCIsImFyaWEtbGFiZWwiLCJtYXAiLCJpbmRleCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/UI/SpeedSelector.jsx\n"));

/***/ })

});