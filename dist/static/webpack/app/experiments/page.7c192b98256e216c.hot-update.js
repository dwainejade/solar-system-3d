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

/***/ "(app-pages-browser)/./src/components/UI/experiments/KeplerThree.jsx":
/*!*******************************************************!*\
  !*** ./src/components/UI/experiments/KeplerThree.jsx ***!
  \*******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/store */ \"(app-pages-browser)/./src/store/store.js\");\n/* harmony import */ var _store_experiments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store/experiments */ \"(app-pages-browser)/./src/store/experiments.js\");\n/* harmony import */ var _data_planetsData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../data/planetsData */ \"(app-pages-browser)/./src/data/planetsData.js\");\n/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../helpers/utils */ \"(app-pages-browser)/./src/helpers/utils.js\");\n/* harmony import */ var _components_UI_Slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/UI/Slider */ \"(app-pages-browser)/./src/components/UI/Slider.jsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction KeplerThree() {\n    _s();\n    const { planetsData: newPlanetsData, updatePlanetData, resetSinglePlanetData } = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.usePlanetStore)();\n    const { experimentMode, experimentPlanet, setExperimentStatus, experimentStatus } = (0,_store_experiments__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n    const { setSimSpeed } = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n    const selectedPlanet = experimentPlanet || \"Earth\";\n    const earthsOrbitalRadius = _data_planetsData__WEBPACK_IMPORTED_MODULE_4__[\"default\"][\"Earth\"].orbitalRadius;\n    // Use state for values that need to be updated when planet changes\n    const [originalOrbitalRadius, setOriginalOrbitalRadius] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(_data_planetsData__WEBPACK_IMPORTED_MODULE_4__[\"default\"][selectedPlanet].orbitalRadius);\n    const [originalOrbitalPeriod, setOriginalOrbitalPeriod] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(_data_planetsData__WEBPACK_IMPORTED_MODULE_4__[\"default\"][selectedPlanet].orbitalPeriod);\n    const [initialAU, setInitialAU] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(_data_planetsData__WEBPACK_IMPORTED_MODULE_4__[\"default\"][selectedPlanet].orbitalRadius / earthsOrbitalRadius);\n    const [AU, setAU] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(_data_planetsData__WEBPACK_IMPORTED_MODULE_4__[\"default\"][selectedPlanet].orbitalRadius / earthsOrbitalRadius);\n    // Update all relevant values when the selected planet changes\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const newOriginalRadius = _data_planetsData__WEBPACK_IMPORTED_MODULE_4__[\"default\"][selectedPlanet].orbitalRadius;\n        const newOriginalPeriod = _data_planetsData__WEBPACK_IMPORTED_MODULE_4__[\"default\"][selectedPlanet].orbitalPeriod;\n        const newInitialAU = newOriginalRadius / earthsOrbitalRadius;\n        setOriginalOrbitalRadius(newOriginalRadius);\n        setOriginalOrbitalPeriod(newOriginalPeriod);\n        setInitialAU(newInitialAU);\n        setAU(newInitialAU);\n        // Reset the planet data to its original state when switching planets\n        resetSinglePlanetData(selectedPlanet);\n    }, [\n        selectedPlanet,\n        earthsOrbitalRadius\n    ]);\n    // Calculate orbital period scaling based on AU change\n    const calculatePeriod = (currentAU)=>{\n        // Calculate the ratio of orbital periods using Kepler's Third Law\n        // T₂/T₁ = √((r₂/r₁)³)\n        const periodRatio = Math.sqrt(Math.pow(currentAU / initialAU, 3));\n        // Scale the original orbital period by this ratio\n        return originalOrbitalPeriod * periodRatio / 365.25; // Convert to years\n    };\n    const handleUpdatePlanetData = (newAU)=>{\n        const newPeriod = calculatePeriod(newAU) * 365.25; // Convert back to days for planet data\n        updatePlanetData(selectedPlanet, {\n            orbitalRadius: originalOrbitalRadius * (newAU / initialAU),\n            orbitalPeriod: newPeriod\n        });\n    };\n    const handleIncrement = ()=>{\n        const newValue = Math.min(40, AU + 0.1);\n        setAU(newValue);\n        handleUpdatePlanetData(newValue);\n    };\n    const handleDecrement = ()=>{\n        const newValue = Math.max(0.1, AU - 0.1);\n        setAU(newValue);\n        handleUpdatePlanetData(newValue);\n    };\n    const handleSliderChange = (e)=>{\n        const newValue = parseFloat(e.target.value);\n        setAU(newValue);\n        handleUpdatePlanetData(newValue);\n    };\n    const handleStartExperiment = ()=>{\n        const newSpeed = (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_5__.getSpeedValue)(\"1 month /s\");\n        setSimSpeed(newSpeed); // Set to normal speed when starting\n        setExperimentStatus(\"started\");\n    };\n    const handleReset = ()=>{\n        setAU(initialAU);\n        resetSinglePlanetData(selectedPlanet);\n        setSimSpeed(1);\n        setExperimentStatus(null);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        return ()=>{\n            handleReset();\n        };\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"newton-section kepler-3\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        className: \"title\",\n                        children: selectedPlanet\n                    }, void 0, false, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/KeplerThree.jsx\",\n                        lineNumber: 94,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_Slider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                        name: \"kepler-3-slider\",\n                        min: 0.5,\n                        max: 40,\n                        markers: [\n                            \".5\",\n                            \"40\"\n                        ],\n                        step: 0.1,\n                        onDecrement: handleDecrement,\n                        onIncrement: handleIncrement,\n                        onSliderChange: handleSliderChange,\n                        value: AU,\n                        disableSlider: experimentStatus === \"started\",\n                        disableIncrement: AU >= 40 || experimentStatus === \"started\",\n                        disableDecrement: AU <= 0 || experimentStatus === \"started\",\n                        amountOfTicks: 10\n                    }, void 0, false, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/KeplerThree.jsx\",\n                        lineNumber: 96,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"answer-con\",\n                        style: {\n                            color: \"white\"\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Current AU: \",\n                                    AU.toFixed(2)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/KeplerThree.jsx\",\n                                lineNumber: 113,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Current Orbital Period: \",\n                                    calculatePeriod(AU).toFixed(2),\n                                    \" years\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/KeplerThree.jsx\",\n                                lineNumber: 114,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Natural AU: \",\n                                    initialAU.toFixed(2)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/KeplerThree.jsx\",\n                                lineNumber: 116,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Natural Period: \",\n                                    (originalOrbitalPeriod / 365.25).toFixed(2),\n                                    \" years\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/KeplerThree.jsx\",\n                                lineNumber: 117,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/KeplerThree.jsx\",\n                        lineNumber: 112,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/KeplerThree.jsx\",\n                lineNumber: 93,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"footer\", {\n                className: \"experiment-footer kepler-3-footer\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"btn start-btn \".concat(experimentStatus === \"started\" ? \"active\" : \"\"),\n                        onClick: handleStartExperiment,\n                        disabled: experimentStatus === \"started\",\n                        children: \"Calculate Orbital Period\"\n                    }, void 0, false, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/KeplerThree.jsx\",\n                        lineNumber: 122,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"btn reset-btn\",\n                        onClick: handleReset,\n                        children: \"Reset\"\n                    }, void 0, false, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/KeplerThree.jsx\",\n                        lineNumber: 129,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/KeplerThree.jsx\",\n                lineNumber: 121,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(KeplerThree, \"L1XxyUSsM96drJSihNrIF5tHH98=\", false, function() {\n    return [\n        _store_store__WEBPACK_IMPORTED_MODULE_2__.usePlanetStore,\n        _store_experiments__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n        _store_store__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n    ];\n});\n_c = KeplerThree;\n/* harmony default export */ __webpack_exports__[\"default\"] = (KeplerThree);\nvar _c;\n$RefreshReg$(_c, \"KeplerThree\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1VJL2V4cGVyaW1lbnRzL0tlcGxlclRocmVlLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFtRDtBQUNhO0FBQ0g7QUFDVDtBQUNHO0FBQ0o7QUFFbkQsU0FBU1M7O0lBQ1AsTUFBTSxFQUFFSCxhQUFhSSxjQUFjLEVBQUVDLGdCQUFnQixFQUFFQyxxQkFBcUIsRUFBRSxHQUFHUiw0REFBY0E7SUFDL0YsTUFBTSxFQUFFUyxjQUFjLEVBQUVDLGdCQUFnQixFQUFFQyxtQkFBbUIsRUFBRUMsZ0JBQWdCLEVBQUUsR0FBR1gsOERBQW1CQTtJQUN2RyxNQUFNLEVBQUVZLFdBQVcsRUFBRSxHQUFHZCx3REFBUUE7SUFFaEMsTUFBTWUsaUJBQWlCSixvQkFBb0I7SUFDM0MsTUFBTUssc0JBQXNCYix5REFBVyxDQUFDLFFBQVEsQ0FBQ2MsYUFBYTtJQUU5RCxtRUFBbUU7SUFDbkUsTUFBTSxDQUFDQyx1QkFBdUJDLHlCQUF5QixHQUFHckIsK0NBQVFBLENBQUNLLHlEQUFXLENBQUNZLGVBQWUsQ0FBQ0UsYUFBYTtJQUM1RyxNQUFNLENBQUNHLHVCQUF1QkMseUJBQXlCLEdBQUd2QiwrQ0FBUUEsQ0FBQ0sseURBQVcsQ0FBQ1ksZUFBZSxDQUFDTyxhQUFhO0lBQzVHLE1BQU0sQ0FBQ0MsV0FBV0MsYUFBYSxHQUFHMUIsK0NBQVFBLENBQUNLLHlEQUFXLENBQUNZLGVBQWUsQ0FBQ0UsYUFBYSxHQUFHRDtJQUN2RixNQUFNLENBQUNTLElBQUlDLE1BQU0sR0FBRzVCLCtDQUFRQSxDQUFDSyx5REFBVyxDQUFDWSxlQUFlLENBQUNFLGFBQWEsR0FBR0Q7SUFFekUsOERBQThEO0lBQzlEakIsZ0RBQVNBLENBQUM7UUFDUixNQUFNNEIsb0JBQW9CeEIseURBQVcsQ0FBQ1ksZUFBZSxDQUFDRSxhQUFhO1FBQ25FLE1BQU1XLG9CQUFvQnpCLHlEQUFXLENBQUNZLGVBQWUsQ0FBQ08sYUFBYTtRQUNuRSxNQUFN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Q0FHRCw4REFBQ3lEO3dCQUFPakIsV0FBVTt3QkFBZ0JrQixTQUFTcEI7a0NBQWE7Ozs7Ozs7Ozs7Ozs7O0FBTWhFO0dBL0hTN0M7O1FBQzBFTCx3REFBY0E7UUFDWEMsMERBQW1CQTtRQUMvRUYsb0RBQVFBOzs7S0FIekJNO0FBaUlULCtEQUFlQSxXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1VJL2V4cGVyaW1lbnRzL0tlcGxlclRocmVlLmpzeD81NDZiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdXNlU3RvcmUsIHsgdXNlUGxhbmV0U3RvcmUgfSBmcm9tIFwiLi4vLi4vLi4vc3RvcmUvc3RvcmVcIjtcbmltcG9ydCB1c2VFeHBlcmltZW50c1N0b3JlIGZyb20gXCIuLi8uLi8uLi9zdG9yZS9leHBlcmltZW50c1wiO1xuaW1wb3J0IHBsYW5ldHNEYXRhIGZyb20gXCIuLi8uLi8uLi9kYXRhL3BsYW5ldHNEYXRhXCI7XG5pbXBvcnQgeyBnZXRTcGVlZFZhbHVlIH0gZnJvbSBcIi4uLy4uLy4uL2hlbHBlcnMvdXRpbHNcIjtcbmltcG9ydCBTbGlkZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvVUkvU2xpZGVyXCI7XG5cbmZ1bmN0aW9uIEtlcGxlclRocmVlKCkge1xuICBjb25zdCB7IHBsYW5ldHNEYXRhOiBuZXdQbGFuZXRzRGF0YSwgdXBkYXRlUGxhbmV0RGF0YSwgcmVzZXRTaW5nbGVQbGFuZXREYXRhIH0gPSB1c2VQbGFuZXRTdG9yZSgpO1xuICBjb25zdCB7IGV4cGVyaW1lbnRNb2RlLCBleHBlcmltZW50UGxhbmV0LCBzZXRFeHBlcmltZW50U3RhdHVzLCBleHBlcmltZW50U3RhdHVzIH0gPSB1c2VFeHBlcmltZW50c1N0b3JlKCk7XG4gIGNvbnN0IHsgc2V0U2ltU3BlZWQgfSA9IHVzZVN0b3JlKCk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRQbGFuZXQgPSBleHBlcmltZW50UGxhbmV0IHx8IFwiRWFydGhcIjtcbiAgY29uc3QgZWFydGhzT3JiaXRhbFJhZGl1cyA9IHBsYW5ldHNEYXRhW1wiRWFydGhcIl0ub3JiaXRhbFJhZGl1cztcblxuICAvLyBVc2Ugc3RhdGUgZm9yIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdXBkYXRlZCB3aGVuIHBsYW5ldCBjaGFuZ2VzXG4gIGNvbnN0IFtvcmlnaW5hbE9yYml0YWxSYWRpdXMsIHNldE9yaWdpbmFsT3JiaXRhbFJhZGl1c10gPSB1c2VTdGF0ZShwbGFuZXRzRGF0YVtzZWxlY3RlZFBsYW5ldF0ub3JiaXRhbFJhZGl1cyk7XG4gIGNvbnN0IFtvcmlnaW5hbE9yYml0YWxQZXJpb2QsIHNldE9yaWdpbmFsT3JiaXRhbFBlcmlvZF0gPSB1c2VTdGF0ZShwbGFuZXRzRGF0YVtzZWxlY3RlZFBsYW5ldF0ub3JiaXRhbFBlcmlvZCk7XG4gIGNvbnN0IFtpbml0aWFsQVUsIHNldEluaXRpYWxBVV0gPSB1c2VTdGF0ZShwbGFuZXRzRGF0YVtzZWxlY3RlZFBsYW5ldF0ub3JiaXRhbFJhZGl1cyAvIGVhcnRoc09yYml0YWxSYWRpdXMpO1xuICBjb25zdCBbQVUsIHNldEFVXSA9IHVzZVN0YXRlKHBsYW5ldHNEYXRhW3NlbGVjdGVkUGxhbmV0XS5vcmJpdGFsUmFkaXVzIC8gZWFydGhzT3JiaXRhbFJhZGl1cyk7XG5cbiAgLy8gVXBkYXRlIGFsbCByZWxldmFudCB2YWx1ZXMgd2hlbiB0aGUgc2VsZWN0ZWQgcGxhbmV0IGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBuZXdPcmlnaW5hbFJhZGl1cyA9IHBsYW5ldHNEYXRhW3NlbGVjdGVkUGxhbmV0XS5vcmJpdGFsUmFkaXVzO1xuICAgIGNvbnN0IG5ld09yaWdpbmFsUGVyaW9kID0gcGxhbmV0c0RhdGFbc2VsZWN0ZWRQbGFuZXRdLm9yYml0YWxQZXJpb2Q7XG4gICAgY29uc3QgbmV3SW5pdGlhbEFVID0gbmV3T3JpZ2luYWxSYWRpdXMgLyBlYXJ0aHNPcmJpdGFsUmFkaXVzO1xuXG4gICAgc2V0T3JpZ2luYWxPcmJpdGFsUmFkaXVzKG5ld09yaWdpbmFsUmFkaXVzKTtcbiAgICBzZXRPcmlnaW5hbE9yYml0YWxQZXJpb2QobmV3T3JpZ2luYWxQZXJpb2QpO1xuICAgIHNldEluaXRpYWxBVShuZXdJbml0aWFsQVUpO1xuICAgIHNldEFVKG5ld0luaXRpYWxBVSk7XG5cbiAgICAvLyBSZXNldCB0aGUgcGxhbmV0IGRhdGEgdG8gaXRzIG9yaWdpbmFsIHN0YXRlIHdoZW4gc3dpdGNoaW5nIHBsYW5ldHNcbiAgICByZXNldFNpbmdsZVBsYW5ldERhdGEoc2VsZWN0ZWRQbGFuZXQpO1xuICB9LCBbc2VsZWN0ZWRQbGFuZXQsIGVhcnRoc09yYml0YWxSYWRpdXNdKTtcblxuICAvLyBDYWxjdWxhdGUgb3JiaXRhbCBwZXJpb2Qgc2NhbGluZyBiYXNlZCBvbiBBVSBjaGFuZ2VcbiAgY29uc3QgY2FsY3VsYXRlUGVyaW9kID0gY3VycmVudEFVID0+IHtcbiAgICAvLyBDYWxjdWxhdGUgdGhlIHJhdGlvIG9mIG9yYml0YWwgcGVyaW9kcyB1c2luZyBLZXBsZXIncyBUaGlyZCBMYXdcbiAgICAvLyBU4oKCL1TigoEgPSDiiJooKHLigoIvcuKCgSnCsylcbiAgICBjb25zdCBwZXJpb2RSYXRpbyA9IE1hdGguc3FydChNYXRoLnBvdyhjdXJyZW50QVUgLyBpbml0aWFsQVUsIDMpKTtcbiAgICAvLyBTY2FsZSB0aGUgb3JpZ2luYWwgb3JiaXRhbCBwZXJpb2QgYnkgdGhpcyByYXRpb1xuICAgIHJldHVybiAob3JpZ2luYWxPcmJpdGFsUGVyaW9kICogcGVyaW9kUmF0aW8pIC8gMzY1LjI1OyAvLyBDb252ZXJ0IHRvIHllYXJzXG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVXBkYXRlUGxhbmV0RGF0YSA9IG5ld0FVID0+IHtcbiAgICBjb25zdCBuZXdQZXJpb2QgPSBjYWxjdWxhdGVQZXJpb2QobmV3QVUpICogMzY1LjI1OyAvLyBDb252ZXJ0IGJhY2sgdG8gZGF5cyBmb3IgcGxhbmV0IGRhdGFcbiAgICB1cGRhdGVQbGFuZXREYXRhKHNlbGVjdGVkUGxhbmV0LCB7XG4gICAgICBvcmJpdGFsUmFkaXVzOiBvcmlnaW5hbE9yYml0YWxSYWRpdXMgKiAobmV3QVUgLyBpbml0aWFsQVUpLFxuICAgICAgb3JiaXRhbFBlcmlvZDogbmV3UGVyaW9kLFxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUluY3JlbWVudCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IE1hdGgubWluKDQwLCBBVSArIDAuMSk7XG4gICAgc2V0QVUobmV3VmFsdWUpO1xuICAgIGhhbmRsZVVwZGF0ZVBsYW5ldERhdGEobmV3VmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURlY3JlbWVudCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IE1hdGgubWF4KDAuMSwgQVUgLSAwLjEpO1xuICAgIHNldEFVKG5ld1ZhbHVlKTtcbiAgICBoYW5kbGVVcGRhdGVQbGFuZXREYXRhKG5ld1ZhbHVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTbGlkZXJDaGFuZ2UgPSBlID0+IHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpO1xuICAgIHNldEFVKG5ld1ZhbHVlKTtcbiAgICBoYW5kbGVVcGRhdGVQbGFuZXREYXRhKG5ld1ZhbHVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTdGFydEV4cGVyaW1lbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3U3BlZWQgPSBnZXRTcGVlZFZhbHVlKFwiMSBtb250aCAvc1wiKTtcbiAgICBzZXRTaW1TcGVlZChuZXdTcGVlZCk7IC8vIFNldCB0byBub3JtYWwgc3BlZWQgd2hlbiBzdGFydGluZ1xuICAgIHNldEV4cGVyaW1lbnRTdGF0dXMoXCJzdGFydGVkXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0ID0gKCkgPT4ge1xuICAgIHNldEFVKGluaXRpYWxBVSk7XG4gICAgcmVzZXRTaW5nbGVQbGFuZXREYXRhKHNlbGVjdGVkUGxhbmV0KTtcbiAgICBzZXRTaW1TcGVlZCgxKTtcbiAgICBzZXRFeHBlcmltZW50U3RhdHVzKG51bGwpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGhhbmRsZVJlc2V0KCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSduZXd0b24tc2VjdGlvbiBrZXBsZXItMyc+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9J3RpdGxlJz57c2VsZWN0ZWRQbGFuZXR9PC9oMj5cblxuICAgICAgICA8U2xpZGVyXG4gICAgICAgICAgbmFtZT17XCJrZXBsZXItMy1zbGlkZXJcIn1cbiAgICAgICAgICBtaW49ezAuNX1cbiAgICAgICAgICBtYXg9ezQwfVxuICAgICAgICAgIG1hcmtlcnM9e1tcIi41XCIsIFwiNDBcIl19XG4gICAgICAgICAgc3RlcD17MC4xfVxuICAgICAgICAgIG9uRGVjcmVtZW50PXtoYW5kbGVEZWNyZW1lbnR9XG4gICAgICAgICAgb25JbmNyZW1lbnQ9e2hhbmRsZUluY3JlbWVudH1cbiAgICAgICAgICBvblNsaWRlckNoYW5nZT17aGFuZGxlU2xpZGVyQ2hhbmdlfVxuICAgICAgICAgIHZhbHVlPXtBVX1cbiAgICAgICAgICBkaXNhYmxlU2xpZGVyPXtleHBlcmltZW50U3RhdHVzID09PSBcInN0YXJ0ZWRcIn1cbiAgICAgICAgICBkaXNhYmxlSW5jcmVtZW50PXtBVSA+PSA0MCB8fCBleHBlcmltZW50U3RhdHVzID09PSBcInN0YXJ0ZWRcIn1cbiAgICAgICAgICBkaXNhYmxlRGVjcmVtZW50PXtBVSA8PSAwIHx8IGV4cGVyaW1lbnRTdGF0dXMgPT09IFwic3RhcnRlZFwifVxuICAgICAgICAgIGFtb3VudE9mVGlja3M9ezEwfVxuICAgICAgICAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhbnN3ZXItY29uJyBzdHlsZT17eyBjb2xvcjogXCJ3aGl0ZVwiIH19PlxuICAgICAgICAgIDxwPkN1cnJlbnQgQVU6IHtBVS50b0ZpeGVkKDIpfTwvcD5cbiAgICAgICAgICA8cD5DdXJyZW50IE9yYml0YWwgUGVyaW9kOiB7Y2FsY3VsYXRlUGVyaW9kKEFVKS50b0ZpeGVkKDIpfSB5ZWFyczwvcD5cblxuICAgICAgICAgIDxwPk5hdHVyYWwgQVU6IHtpbml0aWFsQVUudG9GaXhlZCgyKX08L3A+XG4gICAgICAgICAgPHA+TmF0dXJhbCBQZXJpb2Q6IHsob3JpZ2luYWxPcmJpdGFsUGVyaW9kIC8gMzY1LjI1KS50b0ZpeGVkKDIpfSB5ZWFyczwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGZvb3RlciBjbGFzc05hbWU9J2V4cGVyaW1lbnQtZm9vdGVyIGtlcGxlci0zLWZvb3Rlcic+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9e2BidG4gc3RhcnQtYnRuICR7ZXhwZXJpbWVudFN0YXR1cyA9PT0gXCJzdGFydGVkXCIgPyBcImFjdGl2ZVwiIDogXCJcIn1gfVxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVN0YXJ0RXhwZXJpbWVudH1cbiAgICAgICAgICBkaXNhYmxlZD17ZXhwZXJpbWVudFN0YXR1cyA9PT0gXCJzdGFydGVkXCJ9XG4gICAgICAgID5cbiAgICAgICAgICBDYWxjdWxhdGUgT3JiaXRhbCBQZXJpb2RcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidG4gcmVzZXQtYnRuJyBvbkNsaWNrPXtoYW5kbGVSZXNldH0+XG4gICAgICAgICAgUmVzZXRcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICA8Lz5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgS2VwbGVyVGhyZWU7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVN0b3JlIiwidXNlUGxhbmV0U3RvcmUiLCJ1c2VFeHBlcmltZW50c1N0b3JlIiwicGxhbmV0c0RhdGEiLCJnZXRTcGVlZFZhbHVlIiwiU2xpZGVyIiwiS2VwbGVyVGhyZWUiLCJuZXdQbGFuZXRzRGF0YSIsInVwZGF0ZVBsYW5ldERhdGEiLCJyZXNldFNpbmdsZVBsYW5ldERhdGEiLCJleHBlcmltZW50TW9kZSIsImV4cGVyaW1lbnRQbGFuZXQiLCJzZXRFeHBlcmltZW50U3RhdHVzIiwiZXhwZXJpbWVudFN0YXR1cyIsInNldFNpbVNwZWVkIiwic2VsZWN0ZWRQbGFuZXQiLCJlYXJ0aHNPcmJpdGFsUmFkaXVzIiwib3JiaXRhbFJhZGl1cyIsIm9yaWdpbmFsT3JiaXRhbFJhZGl1cyIsInNldE9yaWdpbmFsT3JiaXRhbFJhZGl1cyIsIm9yaWdpbmFsT3JiaXRhbFBlcmlvZCIsInNldE9yaWdpbmFsT3JiaXRhbFBlcmlvZCIsIm9yYml0YWxQZXJpb2QiLCJpbml0aWFsQVUiLCJzZXRJbml0aWFsQVUiLCJBVSIsInNldEFVIiwibmV3T3JpZ2luYWxSYWRpdXMiLCJuZXdPcmlnaW5hbFBlcmlvZCIsIm5ld0luaXRpYWxBVSIsImNhbGN1bGF0ZVBlcmlvZCIsImN1cnJlbnRBVSIsInBlcmlvZFJhdGlvIiwiTWF0aCIsInNxcnQiLCJwb3ciLCJoYW5kbGVVcGRhdGVQbGFuZXREYXRhIiwibmV3QVUiLCJuZXdQZXJpb2QiLCJoYW5kbGVJbmNyZW1lbnQiLCJuZXdWYWx1ZSIsIm1pbiIsImhhbmRsZURlY3JlbWVudCIsIm1heCIsImhhbmRsZVNsaWRlckNoYW5nZSIsImUiLCJwYXJzZUZsb2F0IiwidGFyZ2V0IiwidmFsdWUiLCJoYW5kbGVTdGFydEV4cGVyaW1lbnQiLCJuZXdTcGVlZCIsImhhbmRsZVJlc2V0IiwiZGl2IiwiY2xhc3NOYW1lIiwiaDIiLCJuYW1lIiwibWFya2VycyIsInN0ZXAiLCJvbkRlY3JlbWVudCIsIm9uSW5jcmVtZW50Iiwib25TbGlkZXJDaGFuZ2UiLCJkaXNhYmxlU2xpZGVyIiwiZGlzYWJsZUluY3JlbWVudCIsImRpc2FibGVEZWNyZW1lbnQiLCJhbW91bnRPZlRpY2tzIiwic3R5bGUiLCJjb2xvciIsInAiLCJ0b0ZpeGVkIiwiZm9vdGVyIiwiYnV0dG9uIiwib25DbGljayIsImRpc2FibGVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/UI/experiments/KeplerThree.jsx\n"));

/***/ })

});