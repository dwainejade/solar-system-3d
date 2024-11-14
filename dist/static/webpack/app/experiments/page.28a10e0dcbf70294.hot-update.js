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

/***/ "(app-pages-browser)/./src/components/UI/experiments/NewtonOne.jsx":
/*!*****************************************************!*\
  !*** ./src/components/UI/experiments/NewtonOne.jsx ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/store */ \"(app-pages-browser)/./src/store/store.js\");\n/* harmony import */ var _data_planetsData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../data/planetsData */ \"(app-pages-browser)/./src/data/planetsData.js\");\n/* harmony import */ var _store_experiments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store/experiments */ \"(app-pages-browser)/./src/store/experiments.js\");\n/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../helpers/utils */ \"(app-pages-browser)/./src/helpers/utils.js\");\n/* harmony import */ var _components_UI_Slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/UI/Slider */ \"(app-pages-browser)/./src/components/UI/Slider.jsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction NewtonGravity() {\n    _s();\n    const { updatePlanetData, resetSinglePlanetData } = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.usePlanetStore)();\n    const { setSimSpeed, simSpeed, prevSpeed } = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n    const { experimentPlanet, experimentStatus, setExperimentStatus } = (0,_store_experiments__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n    console.log(\"experiment\", experimentPlanet);\n    const selectedPlanet = experimentPlanet || \"Earth\";\n    // Initialize mass scale\n    const [massScale, setMassScale] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    const originalMass = _data_planetsData__WEBPACK_IMPORTED_MODULE_3__[\"default\"][selectedPlanet].mass;\n    const sliderValues = [\n        0.5,\n        1,\n        2\n    ];\n    const [sliderIndex, setSliderIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    const handleIncrement = ()=>{\n        // base on sliderValues array\n        if (massScale < sliderValues[sliderValues.length - 1]) {\n            const newIndex = sliderIndex + 1;\n            const newValue = sliderValues[newIndex];\n            setSliderIndex(newIndex);\n            setMassScale(newValue);\n            updatePlanetData(selectedPlanet, {\n                mass: originalMass * newValue,\n                radius: _data_planetsData__WEBPACK_IMPORTED_MODULE_3__[\"default\"][selectedPlanet].radius * newValue\n            });\n        }\n    };\n    const handleDecrement = ()=>{\n        if (massScale > sliderValues[0]) {\n            const newIndex = sliderIndex - 1;\n            const newValue = sliderValues[newIndex];\n            setSliderIndex(newIndex);\n            setMassScale(newValue);\n            updatePlanetData(selectedPlanet, {\n                mass: originalMass * newValue,\n                radius: _data_planetsData__WEBPACK_IMPORTED_MODULE_3__[\"default\"][selectedPlanet].radius * newValue\n            });\n        }\n    };\n    const handleSliderChange = (e)=>{\n        const value = parseFloat(e.target.value);\n        const newValue = value === 0 ? 0.5 : value;\n        setMassScale(newValue);\n        updatePlanetData(selectedPlanet, {\n            mass: originalMass * newValue,\n            radius: _data_planetsData__WEBPACK_IMPORTED_MODULE_3__[\"default\"][selectedPlanet].radius * newValue\n        });\n    };\n    const calculateGravitationalForce = ()=>{\n        const earthMass = originalMass * massScale;\n        const moonMass = 7.34767309e22; // Moon's mass in kg\n        const distance = 384400000; // Average Earth-Moon distance in meters\n        return _data_planetsData__WEBPACK_IMPORTED_MODULE_3__.G * (earthMass * moonMass) / (distance * distance);\n    };\n    const handleStartExperiment = ()=>{\n        setSimSpeed((0,_helpers_utils__WEBPACK_IMPORTED_MODULE_5__.getSpeedValue)(\"1 day /s\"));\n        setExperimentStatus(\"started\");\n    };\n    const handleReset = ()=>{\n        setMassScale(1);\n        resetSinglePlanetData(selectedPlanet);\n        setSimSpeed(1);\n        setExperimentStatus(null);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"newton-section kepler-1\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        className: \"title\",\n                        children: [\n                            selectedPlanet,\n                            \" Mass Scale\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                        lineNumber: 82,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_Slider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                        name: \"newton-gravity-slider\",\n                        min: 0,\n                        max: 2,\n                        markers: [\n                            \".5x\",\n                            \"1x\",\n                            \"2x\"\n                        ],\n                        step: 1,\n                        onDecrement: handleDecrement,\n                        onIncrement: handleIncrement,\n                        onSliderChange: handleSliderChange,\n                        value: massScale === 0.5 ? 0 : massScale,\n                        disableSlider: experimentStatus === \"started\",\n                        disableIncrement: massScale >= 2 || experimentStatus === \"started\",\n                        disableDecrement: massScale <= 0 || experimentStatus === \"started\",\n                        amountOfTicks: 3\n                    }, void 0, false, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                        lineNumber: 84,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"details-con\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Mass: \",\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        children: [\n                                            \" \",\n                                            (originalMass * massScale / 1e24).toFixed(2),\n                                            \"e24 kg\"\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                                        lineNumber: 102,\n                                        columnNumber: 19\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                                lineNumber: 101,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Gravitational Force: \",\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        children: [\n                                            (calculateGravitationalForce() / 1e20).toFixed(2),\n                                            \"e20 N\"\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                                        lineNumber: 105,\n                                        columnNumber: 34\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                                lineNumber: 104,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                        lineNumber: 100,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"description-con\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"(F) = G * (m₁ * m₂) / r\\xb2\"\n                            }, void 0, false, {\n                                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                                lineNumber: 110,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Current Mass: \",\n                                    (originalMass * massScale / 1e24).toFixed(2),\n                                    \"e24 kg\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                                lineNumber: 111,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Gravitational Force: \",\n                                    (calculateGravitationalForce() / 1e20).toFixed(2),\n                                    \"e20 N\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                                lineNumber: 112,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                        lineNumber: 109,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                lineNumber: 81,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"footer\", {\n                className: \"experiment-footer\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"btn start-btn \".concat(experimentStatus ? \"active\" : \"\"),\n                        onClick: handleStartExperiment,\n                        disabled: experimentStatus,\n                        children: \"Start Experiment\"\n                    }, void 0, false, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                        lineNumber: 116,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"btn reset-btn\",\n                        onClick: handleReset,\n                        children: \"Reset Values\"\n                    }, void 0, false, {\n                        fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                        lineNumber: 119,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/michaeltakeuchi/solar-system-interactive/src/components/UI/experiments/NewtonOne.jsx\",\n                lineNumber: 115,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(NewtonGravity, \"fOriOmaqO9na0cGywAcacQeKWfg=\", false, function() {\n    return [\n        _store_store__WEBPACK_IMPORTED_MODULE_2__.usePlanetStore,\n        _store_store__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n        _store_experiments__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n    ];\n});\n_c = NewtonGravity;\n/* harmony default export */ __webpack_exports__[\"default\"] = (NewtonGravity);\nvar _c;\n$RefreshReg$(_c, \"NewtonGravity\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1VJL2V4cGVyaW1lbnRzL05ld3Rvbk9uZS5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBd0M7QUFDd0I7QUFDRTtBQUNMO0FBQ047QUFDSjtBQUVuRCxTQUFTUzs7SUFDUCxNQUFNLEVBQUVDLGdCQUFnQixFQUFFQyxxQkFBcUIsRUFBRSxHQUFHUiw0REFBY0E7SUFDbEUsTUFBTSxFQUFFUyxXQUFXLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFLEdBQUdaLHdEQUFRQTtJQUNyRCxNQUFNLEVBQUVhLGdCQUFnQixFQUFFQyxnQkFBZ0IsRUFBRUMsbUJBQW1CLEVBQUUsR0FBR1gsOERBQW1CQTtJQUN2RlksUUFBUUMsR0FBRyxDQUFDLGNBQWNKO0lBRTFCLE1BQU1LLGlCQUFpQkwsb0JBQW9CO0lBRTNDLHdCQUF3QjtJQUN4QixNQUFNLENBQUNNLFdBQVdDLGFBQWEsR0FBR3JCLCtDQUFRQSxDQUFDO0lBQzNDLE1BQU1zQixlQUFlbkIseURBQWtCLENBQUNnQixlQUFlLENBQUNJLElBQUk7SUFDNUQsTUFBTUMsZUFBZTtRQUFDO1FBQUs7UUFBRztLQUFFO0lBQ2hDLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHMUIsK0NBQVFBLENBQUM7SUFFL0MsTUFBTTJCLGtCQUFrQjtRQUN0Qiw2QkFBNkI7UUFDN0IsSUFBSVAsWUFBWUksWUFBWSxDQUFDQSxhQUFhSSxNQUFNLEdBQUcsRUFBRSxFQUFFO1lBQ3JELE1BQU1DLFdBQVdKLGNBQWM7WUFDL0IsTUFBTUssV0FBV04sWUFBWSxDQUFDSyxTQUFTO1lBRXZDSCxlQUFlRztZQUNmUixhQUFhUztZQUNickIsaUJBQWlCVSxnQkFBZ0I7Z0JBQy9CSSxNQUFNRCxlQUFlUTtnQkFDckJDLFFBQVE1Qix5REFBa0IsQ0FBQ2dCLGVBQWUsQ0FBQ1ksTUFBTSxHQUFHRDtZQUN0RDtRQUNGO0lBQ0Y7SUFFQSxNQUFNRSxrQkFBa0I7UUFDdEIsSUFBSVos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QTtRQUNlSSwwREFBbUJBOzs7S0FIaEZHO0FBdUhULCtEQUFlQSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1VJL2V4cGVyaW1lbnRzL05ld3Rvbk9uZS5qc3g/NjEyMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB1c2VTdG9yZSwgeyB1c2VQbGFuZXRTdG9yZSB9IGZyb20gXCIuLi8uLi8uLi9zdG9yZS9zdG9yZVwiO1xuaW1wb3J0IGluaXRpYWxQbGFuZXRzRGF0YSwgeyBHIH0gZnJvbSBcIi4uLy4uLy4uL2RhdGEvcGxhbmV0c0RhdGFcIjtcbmltcG9ydCB1c2VFeHBlcmltZW50c1N0b3JlIGZyb20gXCIuLi8uLi8uLi9zdG9yZS9leHBlcmltZW50c1wiO1xuaW1wb3J0IHsgZ2V0U3BlZWRWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL3V0aWxzXCI7XG5pbXBvcnQgU2xpZGVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL1VJL1NsaWRlclwiO1xuXG5mdW5jdGlvbiBOZXd0b25HcmF2aXR5KCkge1xuICBjb25zdCB7IHVwZGF0ZVBsYW5ldERhdGEsIHJlc2V0U2luZ2xlUGxhbmV0RGF0YSB9ID0gdXNlUGxhbmV0U3RvcmUoKTtcbiAgY29uc3QgeyBzZXRTaW1TcGVlZCwgc2ltU3BlZWQsIHByZXZTcGVlZCB9ID0gdXNlU3RvcmUoKTtcbiAgY29uc3QgeyBleHBlcmltZW50UGxhbmV0LCBleHBlcmltZW50U3RhdHVzLCBzZXRFeHBlcmltZW50U3RhdHVzIH0gPSB1c2VFeHBlcmltZW50c1N0b3JlKCk7XG4gIGNvbnNvbGUubG9nKFwiZXhwZXJpbWVudFwiLCBleHBlcmltZW50UGxhbmV0KTtcblxuICBjb25zdCBzZWxlY3RlZFBsYW5ldCA9IGV4cGVyaW1lbnRQbGFuZXQgfHwgXCJFYXJ0aFwiO1xuXG4gIC8vIEluaXRpYWxpemUgbWFzcyBzY2FsZVxuICBjb25zdCBbbWFzc1NjYWxlLCBzZXRNYXNzU2NhbGVdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IG9yaWdpbmFsTWFzcyA9IGluaXRpYWxQbGFuZXRzRGF0YVtzZWxlY3RlZFBsYW5ldF0ubWFzcztcbiAgY29uc3Qgc2xpZGVyVmFsdWVzID0gWzAuNSwgMSwgMl07XG4gIGNvbnN0IFtzbGlkZXJJbmRleCwgc2V0U2xpZGVySW5kZXhdID0gdXNlU3RhdGUoMSk7XG5cbiAgY29uc3QgaGFuZGxlSW5jcmVtZW50ID0gKCkgPT4ge1xuICAgIC8vIGJhc2Ugb24gc2xpZGVyVmFsdWVzIGFycmF5XG4gICAgaWYgKG1hc3NTY2FsZSA8IHNsaWRlclZhbHVlc1tzbGlkZXJWYWx1ZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgIGNvbnN0IG5ld0luZGV4ID0gc2xpZGVySW5kZXggKyAxO1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSBzbGlkZXJWYWx1ZXNbbmV3SW5kZXhdO1xuXG4gICAgICBzZXRTbGlkZXJJbmRleChuZXdJbmRleCk7XG4gICAgICBzZXRNYXNzU2NhbGUobmV3VmFsdWUpO1xuICAgICAgdXBkYXRlUGxhbmV0RGF0YShzZWxlY3RlZFBsYW5ldCwge1xuICAgICAgICBtYXNzOiBvcmlnaW5hbE1hc3MgKiBuZXdWYWx1ZSxcbiAgICAgICAgcmFkaXVzOiBpbml0aWFsUGxhbmV0c0RhdGFbc2VsZWN0ZWRQbGFuZXRdLnJhZGl1cyAqIG5ld1ZhbHVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURlY3JlbWVudCA9ICgpID0+IHtcbiAgICBpZiAobWFzc1NjYWxlID4gc2xpZGVyVmFsdWVzWzBdKSB7XG4gICAgICBjb25zdCBuZXdJbmRleCA9IHNsaWRlckluZGV4IC0gMTtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gc2xpZGVyVmFsdWVzW25ld0luZGV4XTtcbiAgICAgIHNldFNsaWRlckluZGV4KG5ld0luZGV4KTtcbiAgICAgIHNldE1hc3NTY2FsZShuZXdWYWx1ZSk7XG4gICAgICB1cGRhdGVQbGFuZXREYXRhKHNlbGVjdGVkUGxhbmV0LCB7XG4gICAgICAgIG1hc3M6IG9yaWdpbmFsTWFzcyAqIG5ld1ZhbHVlLFxuICAgICAgICByYWRpdXM6IGluaXRpYWxQbGFuZXRzRGF0YVtzZWxlY3RlZFBsYW5ldF0ucmFkaXVzICogbmV3VmFsdWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2xpZGVyQ2hhbmdlID0gZSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHZhbHVlID09PSAwID8gMC41IDogdmFsdWU7XG4gICAgc2V0TWFzc1NjYWxlKG5ld1ZhbHVlKTtcbiAgICB1cGRhdGVQbGFuZXREYXRhKHNlbGVjdGVkUGxhbmV0LCB7XG4gICAgICBtYXNzOiBvcmlnaW5hbE1hc3MgKiBuZXdWYWx1ZSxcbiAgICAgIHJhZGl1czogaW5pdGlhbFBsYW5ldHNEYXRhW3NlbGVjdGVkUGxhbmV0XS5yYWRpdXMgKiBuZXdWYWx1ZSxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBjYWxjdWxhdGVHcmF2aXRhdGlvbmFsRm9yY2UgPSAoKSA9PiB7XG4gICAgY29uc3QgZWFydGhNYXNzID0gb3JpZ2luYWxNYXNzICogbWFzc1NjYWxlO1xuICAgIGNvbnN0IG1vb25NYXNzID0gNy4zNDc2NzMwOWUyMjsgLy8gTW9vbidzIG1hc3MgaW4ga2dcbiAgICBjb25zdCBkaXN0YW5jZSA9IDM4NDQwMDAwMDsgLy8gQXZlcmFnZSBFYXJ0aC1Nb29uIGRpc3RhbmNlIGluIG1ldGVyc1xuICAgIHJldHVybiAoRyAqIChlYXJ0aE1hc3MgKiBtb29uTWFzcykpIC8gKGRpc3RhbmNlICogZGlzdGFuY2UpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVN0YXJ0RXhwZXJpbWVudCA9ICgpID0+IHtcbiAgICBzZXRTaW1TcGVlZChnZXRTcGVlZFZhbHVlKFwiMSBkYXkgL3NcIikpO1xuICAgIHNldEV4cGVyaW1lbnRTdGF0dXMoXCJzdGFydGVkXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0ID0gKCkgPT4ge1xuICAgIHNldE1hc3NTY2FsZSgxKTtcbiAgICByZXNldFNpbmdsZVBsYW5ldERhdGEoc2VsZWN0ZWRQbGFuZXQpO1xuICAgIHNldFNpbVNwZWVkKDEpO1xuICAgIHNldEV4cGVyaW1lbnRTdGF0dXMobnVsbCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9J25ld3Rvbi1zZWN0aW9uIGtlcGxlci0xJz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT0ndGl0bGUnPntzZWxlY3RlZFBsYW5ldH0gTWFzcyBTY2FsZTwvaDI+XG5cbiAgICAgICAgPFNsaWRlclxuICAgICAgICAgIG5hbWU9e1wibmV3dG9uLWdyYXZpdHktc2xpZGVyXCJ9XG4gICAgICAgICAgbWluPXswfVxuICAgICAgICAgIG1heD17Mn1cbiAgICAgICAgICBtYXJrZXJzPXtbXCIuNXhcIiwgXCIxeFwiLCBcIjJ4XCJdfVxuICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgb25EZWNyZW1lbnQ9e2hhbmRsZURlY3JlbWVudH1cbiAgICAgICAgICBvbkluY3JlbWVudD17aGFuZGxlSW5jcmVtZW50fVxuICAgICAgICAgIG9uU2xpZGVyQ2hhbmdlPXtoYW5kbGVTbGlkZXJDaGFuZ2V9XG4gICAgICAgICAgdmFsdWU9e21hc3NTY2FsZSA9PT0gMC41ID8gMCA6IG1hc3NTY2FsZX1cbiAgICAgICAgICBkaXNhYmxlU2xpZGVyPXtleHBlcmltZW50U3RhdHVzID09PSBcInN0YXJ0ZWRcIn1cbiAgICAgICAgICBkaXNhYmxlSW5jcmVtZW50PXttYXNzU2NhbGUgPj0gMiB8fCBleHBlcmltZW50U3RhdHVzID09PSBcInN0YXJ0ZWRcIn1cbiAgICAgICAgICBkaXNhYmxlRGVjcmVtZW50PXttYXNzU2NhbGUgPD0gMCB8fCBleHBlcmltZW50U3RhdHVzID09PSBcInN0YXJ0ZWRcIn1cbiAgICAgICAgICBhbW91bnRPZlRpY2tzPXszfVxuICAgICAgICAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdkZXRhaWxzLWNvbic+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBNYXNzOiA8c3Bhbj4geygob3JpZ2luYWxNYXNzICogbWFzc1NjYWxlKSAvIDFlMjQpLnRvRml4ZWQoMil9ZTI0IGtnPC9zcGFuPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIEdyYXZpdGF0aW9uYWwgRm9yY2U6IDxzcGFuPnsoY2FsY3VsYXRlR3Jhdml0YXRpb25hbEZvcmNlKCkgLyAxZTIwKS50b0ZpeGVkKDIpfWUyMCBOPC9zcGFuPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Rlc2NyaXB0aW9uLWNvbic+XG4gICAgICAgICAgPHA+KEYpID0gRyAqICht4oKBICogbeKCgikgLyBywrI8L3A+XG4gICAgICAgICAgPHA+Q3VycmVudCBNYXNzOiB7KChvcmlnaW5hbE1hc3MgKiBtYXNzU2NhbGUpIC8gMWUyNCkudG9GaXhlZCgyKX1lMjQga2c8L3A+XG4gICAgICAgICAgPHA+R3Jhdml0YXRpb25hbCBGb3JjZTogeyhjYWxjdWxhdGVHcmF2aXRhdGlvbmFsRm9yY2UoKSAvIDFlMjApLnRvRml4ZWQoMil9ZTIwIE48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8Zm9vdGVyIGNsYXNzTmFtZT0nZXhwZXJpbWVudC1mb290ZXInPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YGJ0biBzdGFydC1idG4gJHtleHBlcmltZW50U3RhdHVzID8gXCJhY3RpdmVcIiA6IFwiXCJ9YH0gb25DbGljaz17aGFuZGxlU3RhcnRFeHBlcmltZW50fSBkaXNhYmxlZD17ZXhwZXJpbWVudFN0YXR1c30+XG4gICAgICAgICAgU3RhcnQgRXhwZXJpbWVudFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J0biByZXNldC1idG4nIG9uQ2xpY2s9e2hhbmRsZVJlc2V0fT5cbiAgICAgICAgICBSZXNldCBWYWx1ZXNcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICA8Lz5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV3dG9uR3Jhdml0eTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlU3RvcmUiLCJ1c2VQbGFuZXRTdG9yZSIsImluaXRpYWxQbGFuZXRzRGF0YSIsIkciLCJ1c2VFeHBlcmltZW50c1N0b3JlIiwiZ2V0U3BlZWRWYWx1ZSIsIlNsaWRlciIsIk5ld3RvbkdyYXZpdHkiLCJ1cGRhdGVQbGFuZXREYXRhIiwicmVzZXRTaW5nbGVQbGFuZXREYXRhIiwic2V0U2ltU3BlZWQiLCJzaW1TcGVlZCIsInByZXZTcGVlZCIsImV4cGVyaW1lbnRQbGFuZXQiLCJleHBlcmltZW50U3RhdHVzIiwic2V0RXhwZXJpbWVudFN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJzZWxlY3RlZFBsYW5ldCIsIm1hc3NTY2FsZSIsInNldE1hc3NTY2FsZSIsIm9yaWdpbmFsTWFzcyIsIm1hc3MiLCJzbGlkZXJWYWx1ZXMiLCJzbGlkZXJJbmRleCIsInNldFNsaWRlckluZGV4IiwiaGFuZGxlSW5jcmVtZW50IiwibGVuZ3RoIiwibmV3SW5kZXgiLCJuZXdWYWx1ZSIsInJhZGl1cyIsImhhbmRsZURlY3JlbWVudCIsImhhbmRsZVNsaWRlckNoYW5nZSIsImUiLCJ2YWx1ZSIsInBhcnNlRmxvYXQiLCJ0YXJnZXQiLCJjYWxjdWxhdGVHcmF2aXRhdGlvbmFsRm9yY2UiLCJlYXJ0aE1hc3MiLCJtb29uTWFzcyIsImRpc3RhbmNlIiwiaGFuZGxlU3RhcnRFeHBlcmltZW50IiwiaGFuZGxlUmVzZXQiLCJkaXYiLCJjbGFzc05hbWUiLCJoMiIsIm5hbWUiLCJtaW4iLCJtYXgiLCJtYXJrZXJzIiwic3RlcCIsIm9uRGVjcmVtZW50Iiwib25JbmNyZW1lbnQiLCJvblNsaWRlckNoYW5nZSIsImRpc2FibGVTbGlkZXIiLCJkaXNhYmxlSW5jcmVtZW50IiwiZGlzYWJsZURlY3JlbWVudCIsImFtb3VudE9mVGlja3MiLCJwIiwic3BhbiIsInRvRml4ZWQiLCJmb290ZXIiLCJidXR0b24iLCJvbkNsaWNrIiwiZGlzYWJsZWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/UI/experiments/NewtonOne.jsx\n"));

/***/ })

});