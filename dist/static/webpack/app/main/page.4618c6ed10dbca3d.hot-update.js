"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/main/page",{

/***/ "(app-pages-browser)/./src/components/UI/SpeedSelector.jsx":
/*!*********************************************!*\
  !*** ./src/components/UI/SpeedSelector.jsx ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_Dropdown_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/Dropdown.css */ \"(app-pages-browser)/./src/styles/Dropdown.css\");\n\nvar _s = $RefreshSig$();\n\n\nconst MenuItem = (param)=>{\n    let { label, isActive, hasSubmenu, onSelect, children, showSubmenu, onMouseEnter, onMouseLeave, isSubmenuItem = false, isHighlighted = false, onKeyDown, tabIndex: tabIndex1, isFocused = false, \"aria-expanded\": ariaExpanded } = param;\n    const handleItemMouseLeave = (e)=>{\n        // If this is a submenu item, don't trigger the regular mouseleave\n        if (isSubmenuItem) {\n            e.stopPropagation();\n            return;\n        }\n        onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(e);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"speed-selector-item \\n                       \".concat(isActive ? \"active\" : \"\", \" \\n                       \").concat(isHighlighted ? \"highlight\" : \"\", \"\\n                       \").concat(isFocused ? \"hover\" : \"\"),\n        onClick: onSelect,\n        onMouseEnter: onMouseEnter,\n        onMouseLeave: handleItemMouseLeave,\n        onKeyDown: onKeyDown,\n        role: \"menuitem\",\n        tabIndex: tabIndex1,\n        \"aria-haspopup\": hasSubmenu,\n        \"aria-expanded\": hasSubmenu ? ariaExpanded : undefined,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n            children: label\n        }, void 0, false, {\n            fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n            lineNumber: 44,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n        lineNumber: 30,\n        columnNumber: 5\n    }, undefined);\n};\n_c = MenuItem;\nconst SpeedSelector = (param)=>{\n    let { speedOptions, onSpeedSelect, disable } = param;\n    _s();\n    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [focusedIndex, setFocusedIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(-1);\n    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"Select an option\");\n    const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const toggleDropdown = ()=>setIsOpen(!isOpen);\n    const handleOptionClick = (option)=>{\n        onSpeedSelect(option.value);\n        setSelectedOption(option.label);\n        setIsOpen(false);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"speed-selector\",\n        ref: dropdownRef,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: toggleDropdown,\n                className: \"speed-selector-button\",\n                disabled: disable(),\n                \"aria-haspopup\": \"true\",\n                \"aria-expanded\": isOpen,\n                children: selectedOption\n            }, void 0, false, {\n                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, undefined),\n            isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"speed-selector-dropdown\",\n                role: \"menu\",\n                \"aria-label\": \"Planet selection menu\",\n                children: speedOptions.map((option, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"speed-selector-item\",\n                        value: option.value,\n                        onClick: ()=>handleOptionClick(option),\n                        role: \"menuitem\",\n                        tabIndex: tabIndex,\n                        children: option.label\n                    }, index, false, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                        lineNumber: 70,\n                        columnNumber: 13\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n                lineNumber: 68,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/SpeedSelector.jsx\",\n        lineNumber: 63,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SpeedSelector, \"bwqCtLoEWaleoKnVRrCJJVl55IU=\");\n_c1 = SpeedSelector;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SpeedSelector);\nvar _c, _c1;\n$RefreshReg$(_c, \"MenuItem\");\n$RefreshReg$(_c1, \"SpeedSelector\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1VJL1NwZWVkU2VsZWN0b3IuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkQ7QUFDeEI7QUFFbkMsTUFBTUksV0FBVztRQUFDLEVBQ2hCQyxLQUFLLEVBQ0xDLFFBQVEsRUFDUkMsVUFBVSxFQUNWQyxRQUFRLEVBQ1JDLFFBQVEsRUFDUkMsV0FBVyxFQUNYQyxZQUFZLEVBQ1pDLFlBQVksRUFDWkMsZ0JBQWdCLEtBQUssRUFDckJDLGdCQUFnQixLQUFLLEVBQ3JCQyxTQUFTLEVBQ1RDLFVBQUFBLFNBQVEsRUFDUkMsWUFBWSxLQUFLLEVBQ2pCLGlCQUFpQkMsWUFBWSxFQUM5QjtJQUNDLE1BQU1DLHVCQUF1QkMsQ0FBQUE7UUFDM0Isa0VBQWtFO1FBQ2xFLElBQUlQLGVBQWU7WUFDakJPLEVBQUVDLGVBQWU7WUFDakI7UUFDRjtRQUNBVCx5QkFBQUEsbUNBQUFBLGFBQWVRO0lBQ2pCO0lBRUEscUJBQ0UsOERBQUNFO1FBQ0NDLFdBQVcsZ0RBRVFULE9BREFSLFdBQVcsV0FBVyxJQUFHLDhCQUV6QlcsT0FEQUgsZ0JBQWdCLGNBQWMsSUFBRyw2QkFDUixPQUF6QkcsWUFBWSxVQUFVO1FBQ3pDTyxTQUFTaEI7UUFDVEcsY0FBY0E7UUFDZEMsY0FBY087UUFDZEosV0FBV0E7UUFDWFUsTUFBSztRQUNMVCxVQUFVQTtRQUNWVSxpQkFBZW5CO1FBQ2ZvQixpQkFBZXBCLGFBQWFXLGVBQWVVO2tCQUUzQyw0RUFBQ0M7c0JBQU14Qjs7Ozs7Ozs7Ozs7QUFHYjtLQTNDTUQ7QUE2Q04sTUFBTTBCLGdCQUFnQjtRQUFDLEVBQUVDLFlBQVksRUFBRUMsYUFBYSxFQUFFQyxPQUFPLEVBQUU7O0lBQzdELE1BQU0sQ0FBQ0MsUUFBUUMsVUFBVSxHQUFHbEMsK0NBQVFBLENBQUM7SUFDckMsTUFBTSxDQUFDbUMsY0FBY0MsZ0JBQWdCLEdBQUdwQywrQ0FBUUEsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sQ0FBQ3FDLGdCQUFnQkMsa0JBQWtCLEdBQUd0QywrQ0FBUUEsQ0FBQztJQUNyRCxNQUFNdUMsY0FBY3RDLDZDQUFNQSxDQUFDO0lBRTNCLE1BQU11QyxpQkFBaUIsSUFBTU4sVUFBVSxDQUFDRDtJQUN4QyxNQUFNUSxvQkFBb0JDLENBQUFBO1FBQ3hCWCxjQUFjVyxPQUFPQyxLQUFLO1FBQzFCTCxrQkFBa0JJLE9BQU90QyxLQUFLO1FBQzlCOEIsVUFBVTtJQUNaO0lBRUEscUJBQ0UsOERBQUNiO1FBQUlDLFdBQVU7UUFBaUJzQixLQUFLTDs7MEJBQ25DLDhEQUFDTTtnQkFBT3RCLFNBQVNpQjtnQkFBZ0JsQixXQUFVO2dCQUF3QndCLFVBQVVkO2dCQUFXUCxpQkFBYztnQkFBT0MsaUJBQWVPOzBCQUN6SEk7Ozs7OztZQUVGSix3QkFDQyw4REFBQ1o7Z0JBQUlDLFdBQVU7Z0JBQTBCRSxNQUFLO2dCQUFPdUIsY0FBVzswQkFDN0RqQixhQUFha0IsR0FBRyxDQUFDLENBQUNOLFFBQVFPLHNCQUN6Qiw4REFBQzVCO3dCQUNDQyxXQUFVO3dCQUVWcUIsT0FBT0QsT0FBT0MsS0FBSzt3QkFDbkJwQixTQUFTLElBQU1rQixrQkFBa0JDO3dCQUNqQ2xCLE1BQUs7d0JBQ0xULFVBQVVBO2tDQUVUMkIsT0FBT3RDLEtBQUs7dUJBTlI2Qzs7Ozs7Ozs7Ozs7Ozs7OztBQWFuQjtHQXBDTXBCO01BQUFBO0FBc0NOLCtEQUFlQSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1VJL1NwZWVkU2VsZWN0b3IuanN4P2E1YmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFwiLi4vLi4vc3R5bGVzL0Ryb3Bkb3duLmNzc1wiO1xuXG5jb25zdCBNZW51SXRlbSA9ICh7XG4gIGxhYmVsLFxuICBpc0FjdGl2ZSxcbiAgaGFzU3VibWVudSxcbiAgb25TZWxlY3QsXG4gIGNoaWxkcmVuLFxuICBzaG93U3VibWVudSxcbiAgb25Nb3VzZUVudGVyLFxuICBvbk1vdXNlTGVhdmUsXG4gIGlzU3VibWVudUl0ZW0gPSBmYWxzZSxcbiAgaXNIaWdobGlnaHRlZCA9IGZhbHNlLFxuICBvbktleURvd24sXG4gIHRhYkluZGV4LFxuICBpc0ZvY3VzZWQgPSBmYWxzZSxcbiAgXCJhcmlhLWV4cGFuZGVkXCI6IGFyaWFFeHBhbmRlZCxcbn0pID0+IHtcbiAgY29uc3QgaGFuZGxlSXRlbU1vdXNlTGVhdmUgPSBlID0+IHtcbiAgICAvLyBJZiB0aGlzIGlzIGEgc3VibWVudSBpdGVtLCBkb24ndCB0cmlnZ2VyIHRoZSByZWd1bGFyIG1vdXNlbGVhdmVcbiAgICBpZiAoaXNTdWJtZW51SXRlbSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25Nb3VzZUxlYXZlPy4oZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2BzcGVlZC1zZWxlY3Rvci1pdGVtIFxuICAgICAgICAgICAgICAgICAgICAgICAke2lzQWN0aXZlID8gXCJhY3RpdmVcIiA6IFwiXCJ9IFxuICAgICAgICAgICAgICAgICAgICAgICAke2lzSGlnaGxpZ2h0ZWQgPyBcImhpZ2hsaWdodFwiIDogXCJcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgJHtpc0ZvY3VzZWQgPyBcImhvdmVyXCIgOiBcIlwifWB9XG4gICAgICBvbkNsaWNrPXtvblNlbGVjdH1cbiAgICAgIG9uTW91c2VFbnRlcj17b25Nb3VzZUVudGVyfVxuICAgICAgb25Nb3VzZUxlYXZlPXtoYW5kbGVJdGVtTW91c2VMZWF2ZX1cbiAgICAgIG9uS2V5RG93bj17b25LZXlEb3dufVxuICAgICAgcm9sZT0nbWVudWl0ZW0nXG4gICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICBhcmlhLWhhc3BvcHVwPXtoYXNTdWJtZW51fVxuICAgICAgYXJpYS1leHBhbmRlZD17aGFzU3VibWVudSA/IGFyaWFFeHBhbmRlZCA6IHVuZGVmaW5lZH1cbiAgICA+XG4gICAgICA8c3Bhbj57bGFiZWx9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgU3BlZWRTZWxlY3RvciA9ICh7IHNwZWVkT3B0aW9ucywgb25TcGVlZFNlbGVjdCwgZGlzYWJsZSB9KSA9PiB7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtmb2N1c2VkSW5kZXgsIHNldEZvY3VzZWRJbmRleF0gPSB1c2VTdGF0ZSgtMSk7XG4gIGNvbnN0IFtzZWxlY3RlZE9wdGlvbiwgc2V0U2VsZWN0ZWRPcHRpb25dID0gdXNlU3RhdGUoXCJTZWxlY3QgYW4gb3B0aW9uXCIpO1xuICBjb25zdCBkcm9wZG93blJlZiA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCB0b2dnbGVEcm9wZG93biA9ICgpID0+IHNldElzT3BlbighaXNPcGVuKTtcbiAgY29uc3QgaGFuZGxlT3B0aW9uQ2xpY2sgPSBvcHRpb24gPT4ge1xuICAgIG9uU3BlZWRTZWxlY3Qob3B0aW9uLnZhbHVlKTtcbiAgICBzZXRTZWxlY3RlZE9wdGlvbihvcHRpb24ubGFiZWwpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0nc3BlZWQtc2VsZWN0b3InIHJlZj17ZHJvcGRvd25SZWZ9PlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0b2dnbGVEcm9wZG93bn0gY2xhc3NOYW1lPSdzcGVlZC1zZWxlY3Rvci1idXR0b24nIGRpc2FibGVkPXtkaXNhYmxlKCl9IGFyaWEtaGFzcG9wdXA9J3RydWUnIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn0+XG4gICAgICAgIHtzZWxlY3RlZE9wdGlvbn1cbiAgICAgIDwvYnV0dG9uPlxuICAgICAge2lzT3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzcGVlZC1zZWxlY3Rvci1kcm9wZG93bicgcm9sZT0nbWVudScgYXJpYS1sYWJlbD0nUGxhbmV0IHNlbGVjdGlvbiBtZW51Jz5cbiAgICAgICAgICB7c3BlZWRPcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9J3NwZWVkLXNlbGVjdG9yLWl0ZW0nXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgIHZhbHVlPXtvcHRpb24udmFsdWV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbil9XG4gICAgICAgICAgICAgIHJvbGU9J21lbnVpdGVtJ1xuICAgICAgICAgICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtvcHRpb24ubGFiZWx9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU3BlZWRTZWxlY3RvcjtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlUmVmIiwidXNlRWZmZWN0IiwiTWVudUl0ZW0iLCJsYWJlbCIsImlzQWN0aXZlIiwiaGFzU3VibWVudSIsIm9uU2VsZWN0IiwiY2hpbGRyZW4iLCJzaG93U3VibWVudSIsIm9uTW91c2VFbnRlciIsIm9uTW91c2VMZWF2ZSIsImlzU3VibWVudUl0ZW0iLCJpc0hpZ2hsaWdodGVkIiwib25LZXlEb3duIiwidGFiSW5kZXgiLCJpc0ZvY3VzZWQiLCJhcmlhRXhwYW5kZWQiLCJoYW5kbGVJdGVtTW91c2VMZWF2ZSIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJkaXYiLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwicm9sZSIsImFyaWEtaGFzcG9wdXAiLCJhcmlhLWV4cGFuZGVkIiwidW5kZWZpbmVkIiwic3BhbiIsIlNwZWVkU2VsZWN0b3IiLCJzcGVlZE9wdGlvbnMiLCJvblNwZWVkU2VsZWN0IiwiZGlzYWJsZSIsImlzT3BlbiIsInNldElzT3BlbiIsImZvY3VzZWRJbmRleCIsInNldEZvY3VzZWRJbmRleCIsInNlbGVjdGVkT3B0aW9uIiwic2V0U2VsZWN0ZWRPcHRpb24iLCJkcm9wZG93blJlZiIsInRvZ2dsZURyb3Bkb3duIiwiaGFuZGxlT3B0aW9uQ2xpY2siLCJvcHRpb24iLCJ2YWx1ZSIsInJlZiIsImJ1dHRvbiIsImRpc2FibGVkIiwiYXJpYS1sYWJlbCIsIm1hcCIsImluZGV4Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/UI/SpeedSelector.jsx\n"));

/***/ })

});