/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./compiled/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./compiled/Animations/Animation.js":
/*!******************************************!*\
  !*** ./compiled/Animations/Animation.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ \"./compiled/Animations/Constants.js\");\n/* harmony import */ var _TimingFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimingFunction */ \"./compiled/Animations/TimingFunction.js\");\n\n\nvar Animation = /** @class */ (function () {\n    function Animation() {\n        // dummy transform function\n        this.transform = function (timestamp, graphics) { };\n        // startTimestamp is for calculating elasped time, reset before each animation\n        this.startTimestamp = undefined;\n        // default animation animation\n        this.duration = Animation.defaultDuration();\n        // default to idle state\n        this.state = _Constants__WEBPACK_IMPORTED_MODULE_0__[\"AnimationState\"].IDLE;\n        // default to linear timing function\n        this.timingFunction = _TimingFunction__WEBPACK_IMPORTED_MODULE_1__[\"LINEAR\"];\n    }\n    Object.defineProperty(Animation.prototype, \"isIdle\", {\n        // returns if animation is idle\n        get: function () {\n            return this.state === _Constants__WEBPACK_IMPORTED_MODULE_0__[\"AnimationState\"].IDLE;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Animation.prototype, \"isRunning\", {\n        // returns if animation is running\n        get: function () {\n            return this.state === _Constants__WEBPACK_IMPORTED_MODULE_0__[\"AnimationState\"].RUNNING;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Animation.prototype, \"isFinished\", {\n        // returns if animation is finished\n        get: function () {\n            return this.state === _Constants__WEBPACK_IMPORTED_MODULE_0__[\"AnimationState\"].FINISHED;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    // default animation duration to 500ms\n    Animation.defaultDuration = function () { return 500; };\n    return Animation;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (Animation);\n\n\n//# sourceURL=webpack:///./compiled/Animations/Animation.js?");

/***/ }),

/***/ "./compiled/Animations/Constants.js":
/*!******************************************!*\
  !*** ./compiled/Animations/Constants.js ***!
  \******************************************/
/*! exports provided: AnimationState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AnimationState\", function() { return AnimationState; });\nvar AnimationState;\n(function (AnimationState) {\n    AnimationState[AnimationState[\"IDLE\"] = 0] = \"IDLE\";\n    AnimationState[AnimationState[\"RUNNING\"] = 1] = \"RUNNING\";\n    AnimationState[AnimationState[\"FINISHED\"] = 2] = \"FINISHED\";\n})(AnimationState || (AnimationState = {}));\n;\n\n\n//# sourceURL=webpack:///./compiled/Animations/Constants.js?");

/***/ }),

/***/ "./compiled/Animations/Rotation.js":
/*!*****************************************!*\
  !*** ./compiled/Animations/Rotation.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Animation */ \"./compiled/Animations/Animation.js\");\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ \"./compiled/Animations/Constants.js\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar Rotation = /** @class */ (function (_super) {\n    __extends(Rotation, _super);\n    function Rotation(srcAngle, destAngle) {\n        var _this = _super.call(this) || this;\n        // set current timing function\n        _this.setTimingFunction = function (timingFunction) {\n            _this.timingFunction = timingFunction;\n        };\n        // transform angle based on timestamp and timing function\n        _this.transform = function (timestamp, graphics) {\n            // set start timestamp if none\n            if (!_this.startTimestamp)\n                _this.startTimestamp = timestamp;\n            // set animation state to running\n            _this.state = _Constants__WEBPACK_IMPORTED_MODULE_1__[\"AnimationState\"].RUNNING;\n            // % time since started\n            var percentTime = (timestamp - _this.startTimestamp) / _this.duration;\n            // apply timing function for % progress\n            var progress = Math.min(1, _this.timingFunction.apply(percentTime));\n            // translate angle\n            graphics.angle = _this.srcAngle + _this.deltaAngle * progress;\n            // mark animation stopped if progress >= 100%\n            if (progress >= 1) {\n                // clear start timestamp\n                _this.startTimestamp = undefined;\n                // set animation state to finished\n                _this.state = _Constants__WEBPACK_IMPORTED_MODULE_1__[\"AnimationState\"].FINISHED;\n            }\n        };\n        // source radians\n        _this.srcAngle = srcAngle;\n        // destination radians\n        _this.destAngle = destAngle;\n        return _this;\n    }\n    Object.defineProperty(Rotation.prototype, \"deltaAngle\", {\n        // delta angle from src to dest\n        get: function () {\n            return this.destAngle - this.srcAngle;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Rotation;\n}(_Animation__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (Rotation);\n\n\n//# sourceURL=webpack:///./compiled/Animations/Rotation.js?");

/***/ }),

/***/ "./compiled/Animations/TimingFunction.js":
/*!***********************************************!*\
  !*** ./compiled/Animations/TimingFunction.js ***!
  \***********************************************/
/*! exports provided: TimingFunction, LINEAR, EASE_IN_SINE, EASE_OUT_SINE, EASE_IN_OUT_SINE, EASE_IN_QUAD, EASE_OUT_QUAD, EASE_IN_OUT_QUAD, EASE_IN_CUBIC, EASE_OUT_CUBIC, EASE_IN_OUT_CUBIC, EASE_IN_EXPO, EASE_OUT_EXPO, EASE_IN_OUT_EXPO, EASE_IN_CIRC, EASE_OUT_CIRC, EASE_IN_OUT_CIRC, EASE_IN_BACK, EASE_OUT_BACK, EASE_IN_OUT_BACK, reverse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TimingFunction\", function() { return TimingFunction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LINEAR\", function() { return LINEAR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_SINE\", function() { return EASE_IN_SINE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_OUT_SINE\", function() { return EASE_OUT_SINE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_OUT_SINE\", function() { return EASE_IN_OUT_SINE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_QUAD\", function() { return EASE_IN_QUAD; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_OUT_QUAD\", function() { return EASE_OUT_QUAD; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_OUT_QUAD\", function() { return EASE_IN_OUT_QUAD; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_CUBIC\", function() { return EASE_IN_CUBIC; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_OUT_CUBIC\", function() { return EASE_OUT_CUBIC; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_OUT_CUBIC\", function() { return EASE_IN_OUT_CUBIC; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_EXPO\", function() { return EASE_IN_EXPO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_OUT_EXPO\", function() { return EASE_OUT_EXPO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_OUT_EXPO\", function() { return EASE_IN_OUT_EXPO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_CIRC\", function() { return EASE_IN_CIRC; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_OUT_CIRC\", function() { return EASE_OUT_CIRC; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_OUT_CIRC\", function() { return EASE_IN_OUT_CIRC; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_BACK\", function() { return EASE_IN_BACK; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_OUT_BACK\", function() { return EASE_OUT_BACK; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EASE_IN_OUT_BACK\", function() { return EASE_IN_OUT_BACK; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reverse\", function() { return reverse; });\n/*\nTiming Functions take in percentage time and return percentage progress.\ne.g. progress = LINEAR(timeElasped / totalDuration);\n*/\nvar TimingFunction = /** @class */ (function () {\n    function TimingFunction(name, apply) {\n        this.name = name;\n        this.apply = apply;\n    }\n    return TimingFunction;\n}());\n\n;\n// linear\nvar LINEAR = new TimingFunction('linear', function (pt) { return pt; });\n// trigonometric\nvar EASE_IN_SINE = new TimingFunction('ease in sine', function (pt) { return 1 - Math.cos((pt * Math.PI) / 2); });\nvar EASE_OUT_SINE = new TimingFunction('ease out sine', function (pt) { return Math.sin((pt * Math.PI) / 2); });\nvar EASE_IN_OUT_SINE = new TimingFunction('ease in out sine', function (pt) { return -(Math.cos(Math.PI * pt) - 1) / 2; });\n// quadratic\nvar EASE_IN_QUAD = new TimingFunction('ease in quad', function (pt) { return pt * pt; });\nvar EASE_OUT_QUAD = new TimingFunction('ease out quad', function (pt) { return 1 - (1 - pt) * (1 - pt); });\nvar EASE_IN_OUT_QUAD = new TimingFunction('ease in out quad', function (pt) {\n    return pt < 0.5 ? 2 * pt * pt : 1 - Math.pow((-2 * pt + 2), 2) / 2;\n});\n// cubic\nvar EASE_IN_CUBIC = new TimingFunction('ease in cubic', function (pt) { return pt * pt * pt; });\nvar EASE_OUT_CUBIC = new TimingFunction('ease out cubic', function (pt) { return 1 - Math.pow((1 - pt), 3); });\nvar EASE_IN_OUT_CUBIC = new TimingFunction('ease in out cubic', function (pt) {\n    return pt < 0.5 ? 4 * pt * pt * pt : 1 - Math.pow((-2 * pt + 2), 3) / 2;\n});\n// exponential\nvar EASE_IN_EXPO = new TimingFunction('ease in exponential', function (pt) { return (pt === 0 ? 0 : Math.pow(2, (10 * pt - 10))); });\nvar EASE_OUT_EXPO = new TimingFunction('ease out exponential', function (pt) { return (pt === 1 ? 1 : 1 - Math.pow(2, (-10 * pt))); });\nvar EASE_IN_OUT_EXPO = new TimingFunction('ease in out exponential', function (pt) {\n    if (pt === 0)\n        return 0;\n    if (pt === 1)\n        return 1;\n    if (pt === 0.5)\n        return Math.pow(2, (20 * pt - 10)) / 2;\n    return (2 - Math.pow(2, (-20 * pt + 10))) / 2;\n});\n// circular\nvar EASE_IN_CIRC = new TimingFunction('ease in circular', function (pt) { return 1 - Math.sqrt(1 - pt * pt); });\nvar EASE_OUT_CIRC = new TimingFunction('ease out exponential', function (pt) { return Math.sqrt(1 - (pt - 1) * (pt - 1)); });\nvar EASE_IN_OUT_CIRC = new TimingFunction('ease in out exponential', function (pt) {\n    if (pt < 0.5)\n        return (1 - Math.sqrt(1 - 4 * pt * pt)) / 2;\n    return (Math.sqrt(1 - Math.pow((-2 * pt + 2), 2)) + 1) / 2;\n});\n// back\nvar EASE_IN_BACK = new TimingFunction('ease in back', function (pt) { return 2.70158 * pt * pt * pt - 1.70158 * pt * pt; });\nvar EASE_OUT_BACK = new TimingFunction('ease out back', function (pt) {\n    return 1 + 2.70158 * Math.pow((pt - 1), 3) + 1.70158 * Math.pow((pt - 1), 2);\n});\nvar EASE_IN_OUT_BACK = new TimingFunction('ease in out back', function (pt) {\n    var c1 = 1.70158;\n    var c2 = c1 * 1.525;\n    if (pt < 0.5)\n        return (Math.pow((2 * pt), 2) * ((c2 + 1) * 2 * pt - c2)) / 2;\n    return (Math.pow((2 * pt - 2), 2) * ((c2 + 1) * (pt * 2 - 2) + c2) + 2) / 2;\n});\n// reverse\nvar reverse = function (progress) { return 1 - progress; };\n\n\n//# sourceURL=webpack:///./compiled/Animations/TimingFunction.js?");

/***/ }),

/***/ "./compiled/Animations/Translation.js":
/*!********************************************!*\
  !*** ./compiled/Animations/Translation.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Animation */ \"./compiled/Animations/Animation.js\");\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ \"./compiled/Animations/Constants.js\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar Translation = /** @class */ (function (_super) {\n    __extends(Translation, _super);\n    function Translation(srcX, srcY, destX, destY) {\n        var _this = _super.call(this) || this;\n        // set current timing function\n        _this.setTimingFunction = function (timingFunction) {\n            _this.timingFunction = timingFunction;\n        };\n        // transform x and y based on timestamp and timing function\n        _this.transform = function (timestamp, graphics) {\n            // set start timestamp if none\n            if (!_this.startTimestamp)\n                _this.startTimestamp = timestamp;\n            // set animation state to running\n            _this.state = _Constants__WEBPACK_IMPORTED_MODULE_1__[\"AnimationState\"].RUNNING;\n            // % time since started\n            var percentTime = (timestamp - _this.startTimestamp) / _this.duration;\n            // apply timing function for % progress\n            var progress = Math.min(1, _this.timingFunction.apply(percentTime));\n            // translate x\n            graphics.x = _this.srcX + _this.deltaX * progress;\n            // translate y\n            graphics.y = _this.srcY + _this.deltaY * progress;\n            // mark animation stopped if progress >= 100%\n            if (progress >= 1) {\n                // clear start timestamp\n                _this.startTimestamp = undefined;\n                // set animation state to finished\n                _this.state = _Constants__WEBPACK_IMPORTED_MODULE_1__[\"AnimationState\"].FINISHED;\n            }\n        };\n        // source coordinates\n        _this.srcX = srcX;\n        _this.srcY = srcY;\n        // destination coordinates\n        _this.destX = destX;\n        _this.destY = destY;\n        return _this;\n    }\n    Object.defineProperty(Translation.prototype, \"deltaX\", {\n        // delta x from src to dest\n        get: function () {\n            return this.destX - this.srcX;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Translation.prototype, \"deltaY\", {\n        // delta y from src to dest\n        get: function () {\n            return this.destY - this.srcY;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Translation;\n}(_Animation__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (Translation);\n\n\n//# sourceURL=webpack:///./compiled/Animations/Translation.js?");

/***/ }),

/***/ "./compiled/Canvas/AnimatedCanvas.js":
/*!*******************************************!*\
  !*** ./compiled/Canvas/AnimatedCanvas.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Views_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Views/View */ \"./compiled/Views/View.js\");\n/* harmony import */ var _Helpers_EventEmitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Helpers/EventEmitter */ \"./compiled/Helpers/EventEmitter.js\");\n/*\n Animated Canvas is an EventEmitter.\n EventEmitter has the same API as 'events.EventEmitter' in NodeJS.\n events: [\n        'did resize',\n        'did add view',\n        'will start draw', 'did start draw', 'will draw', 'did draw', 'did stop draw'\n    ]\n*/\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar AnimatedCanvas = /** @class */ (function (_super) {\n    __extends(AnimatedCanvas, _super);\n    function AnimatedCanvas(canvas) {\n        var _this = _super.call(this) || this;\n        // returns current canvas size\n        _this.getSize = function () {\n            var _a = _this.canvas, width = _a.clientWidth, height = _a.clientHeight;\n            return { width: width, height: height };\n        };\n        // resize canvas for HD\n        _this.resize = function (width, height) {\n            // emit evnet \"will resize\"\n            _this.emit('will resize', width, height);\n            // 2x width, height for HD\n            _this.canvas.width = width * 2;\n            _this.canvas.height = height * 2;\n            // use css to maintain canvas visual size\n            _this.canvas.style.width = width + \"px\";\n            _this.canvas.style.height = height + \"px\";\n            // scale 2x for HD\n            _this.context.scale(2, 2);\n            // emit event \"did resize\"\n            _this.emit('did resize', width, height);\n        };\n        // add a view to canvas, drawn in next draw cycle\n        _this.addView = function (view) {\n            // must be a View object\n            if (!(view instanceof _Views_View__WEBPACK_IMPORTED_MODULE_0__[\"default\"])) {\n                throw new Error(\"Views added to AnimatedCanvas must be of View type.\");\n            }\n            // must have masterDraw function\n            if (typeof view.masterDraw !== 'function') {\n                throw new Error(\"Views added to AnimatedCanvas must have function masterDraw.\");\n            }\n            // add canvas as delegate\n            view.delegate = _this;\n            // add to views\n            _this.views.push(view);\n            // emit event \"did add view\"\n            _this.emit('did add view', view);\n            // start draw cycle if paused\n            if (_this.drawPaused) {\n                // emit event \"will start draw\"\n                _this.emit('will start draw');\n                // set pause flag to false\n                _this.drawPaused = false;\n                // draw\n                requestAnimationFrame(function (timestamp) {\n                    _this.draw(timestamp);\n                });\n                // emit event \"did start draw\"\n                _this.emit('did start draw');\n            }\n        };\n        // force start draw cycle\n        // delegate function called by view\n        _this.requestRedraw = function () {\n            if (_this.drawPaused) {\n                // emit event \"will start draw\"\n                _this.emit('will start draw');\n                // set pause flag to false\n                _this.drawPaused = false;\n                // draw\n                requestAnimationFrame(function (timestamp) {\n                    _this.draw(timestamp);\n                });\n                // emit event \"did start draw\"\n                _this.emit('did start draw');\n            }\n        };\n        // stop draw cycle\n        _this.stopDraw = function () {\n            // emit event \"did stop draw\"\n            _this.emit('will stop draw');\n            // set pause flag to true\n            _this.drawPaused = true;\n            // emit event \"did stop draw\"\n            _this.emit('did stop draw');\n        };\n        // start draw cycle\n        _this.startDraw = function () {\n            // emit event \"will start draw\"\n            _this.emit('will start draw');\n            // set pause flag to false\n            _this.drawPaused = false;\n            // emit event \"did start draw\"\n            _this.emit('did start draw');\n        };\n        // draw cycle function\n        // draws all views\n        // can be paused by setting drawPaused to true, \n        // automatically paused if no animations\n        _this.draw = function (timestamp) {\n            // don't draw if paused\n            if (_this.drawPaused)\n                return;\n            // emit event 'will draw'\n            _this.emit('will draw', timestamp);\n            // get canvas size\n            var _a = _this.canvas, canvasWidth = _a.clientWidth, canvasHeight = _a.clientHeight;\n            // clear canvas\n            _this.context.clearRect(0, 0, canvasWidth, canvasHeight);\n            // draw views\n            var hasAnimation = false;\n            for (var _i = 0, _b = _this.views; _i < _b.length; _i++) {\n                var view = _b[_i];\n                // draw this view\n                view.masterDraw(_this.context, timestamp, canvasWidth, canvasHeight);\n                // check if this view has any animations\n                if (view.hasAnimations()) {\n                    hasAnimation = true;\n                }\n            }\n            // pause draw cycle if no views or no animations\n            if (_this.views.length === 0 || !hasAnimation) {\n                _this.emit('did stop draw', timestamp);\n                _this.drawPaused = true;\n            }\n            // emit event 'did draw'\n            _this.emit('did draw', timestamp);\n            // next frame\n            requestAnimationFrame(function (timestamp) {\n                _this.draw(timestamp);\n            });\n        };\n        // html canvas to draw on\n        _this.canvas = canvas;\n        // cache 2d context\n        _this.context = canvas.getContext('2d');\n        // resize canvas for HD\n        _this.resize(_this.canvas.clientWidth, _this.canvas.clientHeight);\n        // views are added later on\n        _this.views = [];\n        // high level control to start/pause drawing\n        _this.drawPaused = true;\n        return _this;\n    }\n    return AnimatedCanvas;\n}(_Helpers_EventEmitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (AnimatedCanvas);\n\n\n//# sourceURL=webpack:///./compiled/Canvas/AnimatedCanvas.js?");

/***/ }),

/***/ "./compiled/Helpers/EventEmitter.js":
/*!******************************************!*\
  !*** ./compiled/Helpers/EventEmitter.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar EventEmitter = /** @class */ (function () {\n    function EventEmitter() {\n        var _this = this;\n        // add a callback for an type\n        // O(1)\n        this.on = function (type, cb) {\n            // get list of cb of type\n            var observer = _this.observers.get(type);\n            // add cb to list if list exists\n            if (observer)\n                observer.push(cb);\n            // initialize list with [cb]\n            else\n                _this.observers.set(type, [cb]);\n        };\n        // remove a callback for an type\n        // O(n) { n: # callbacks }\n        this.remove = function (type, cb) {\n            // get list of cb of type;\n            var observer = _this.observers.get(type);\n            // return if no such list exists\n            if (!observer)\n                return;\n            // find cb in list\n            for (var i = 0; i < observer.length; i++) {\n                // matching cb\n                if (observer[i] === cb) {\n                    // remove cb from list\n                    observer.splice(i, 1);\n                    return;\n                }\n            }\n        };\n        // emit an event for type with arguments\n        // O(n) { n: # callbacks }\n        this.emit = function (type) {\n            var args = [];\n            for (var _i = 1; _i < arguments.length; _i++) {\n                args[_i - 1] = arguments[_i];\n            }\n            // get list of cb of type\n            var observer = _this.observers.get(type);\n            // return if no such list exist\n            if (!observer)\n                return;\n            // call each cb with arguments\n            for (var i = 0; i < observer.length; i++) {\n                observer[i].apply(observer, args);\n            }\n        };\n        // map of observers\n        // string type => list of callbacks\n        this.observers = new Map();\n    }\n    return EventEmitter;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (EventEmitter);\n\n\n//# sourceURL=webpack:///./compiled/Helpers/EventEmitter.js?");

/***/ }),

/***/ "./compiled/Views/View.js":
/*!********************************!*\
  !*** ./compiled/Views/View.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Animations_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Animations/Animation */ \"./compiled/Animations/Animation.js\");\n/* harmony import */ var _Animations_Translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Animations/Translation */ \"./compiled/Animations/Translation.js\");\n/* harmony import */ var _Animations_Rotation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Animations/Rotation */ \"./compiled/Animations/Rotation.js\");\n\n\n\n;\n;\nvar View = /** @class */ (function () {\n    function View(x, y, draw) {\n        var _this = this;\n        this.addAnimation = function (animation) {\n            // must be of type Animation\n            if (!(animation instanceof _Animations_Animation__WEBPACK_IMPORTED_MODULE_0__[\"default\"])) {\n                throw new Error(\"Animation added to view must be of type Animation or any of its subclasses.\");\n            }\n            // add animation\n            _this.animations.add(animation);\n        };\n        this.hasAnimations = function () { return _this.animations.size !== 0; };\n        this.masterDraw = function (context, timestamp, canvasWidth, canvasHeight) {\n            _this.timestamp = timestamp;\n            _this.animations.forEach(function (animation) {\n                animation.transform(timestamp, _this.graphics);\n                if (animation.isFinished) {\n                    _this.animations.delete(animation);\n                }\n            });\n            context.save();\n            context.translate(_this.graphics.x, _this.graphics.y);\n            context.rotate(_this.graphics.angle);\n            context.translate(-_this.graphics.x, -_this.graphics.y);\n            context.beginPath();\n            _this.draw(context, canvasWidth, canvasHeight, _this.graphics.x, _this.graphics.y, timestamp);\n            context.closePath();\n            context.restore();\n        };\n        this.setX = function (x) {\n            if (!x)\n                return;\n            _this.graphics.x = x;\n            _this.delegate.requestRedraw();\n        };\n        this.setY = function (y) {\n            if (!y)\n                return;\n            _this.graphics.y = y;\n            if (_this.delegate)\n                _this.delegate.requestRedraw();\n        };\n        this.setXY = function (x, y) {\n            if (!x || !y)\n                return;\n            _this.graphics.x = x;\n            _this.graphics.y = y;\n            if (_this.delegate)\n                _this.delegate.requestRedraw();\n        };\n        this.setAngle = function (angle) {\n            _this.graphics.angle = angle;\n            if (_this.delegate)\n                _this.delegate.requestRedraw();\n        };\n        this.setAngleInDeg = function (degAngle) {\n            _this.setAngle(degAngle * Math.PI / 180);\n        };\n        this.translate = function (x, y, timingFunction) {\n            var translation = new _Animations_Translation__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_this.graphics.x, _this.graphics.y, x, y);\n            if (timingFunction)\n                translation.setTimingFunction(timingFunction);\n            _this.addAnimation(translation);\n            console.log(\"new translation to \" + x + \", \" + y);\n            if (_this.delegate) {\n                _this.delegate.requestRedraw();\n            }\n        };\n        this.rotateTo = function (angle, timingFunction) {\n            var rotation = new _Animations_Rotation__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_this.graphics.angle, angle);\n            if (timingFunction)\n                rotation.setTimingFunction(timingFunction);\n            _this.addAnimation(rotation);\n            console.log(\"new rotation to angle \" + angle);\n            if (_this.delegate) {\n                _this.delegate.requestRedraw();\n            }\n        };\n        this.graphics = {\n            x: x,\n            y: y,\n            angle: 0,\n        };\n        this.draw = draw;\n        this.animationDuration = 500;\n        this.delegate = null;\n        this.animations = new Set();\n    }\n    return View;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (View);\n\n\n//# sourceURL=webpack:///./compiled/Views/View.js?");

/***/ }),

/***/ "./compiled/index.js":
/*!***************************!*\
  !*** ./compiled/index.js ***!
  \***************************/
/*! exports provided: AnimatedCanvas, Animation, Translation, Rotation, TimingFunction, Constants, View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Canvas_AnimatedCanvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas/AnimatedCanvas */ \"./compiled/Canvas/AnimatedCanvas.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AnimatedCanvas\", function() { return _Canvas_AnimatedCanvas__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _Animations_Animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Animations/Animation */ \"./compiled/Animations/Animation.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Animation\", function() { return _Animations_Animation__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _Animations_Translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Animations/Translation */ \"./compiled/Animations/Translation.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Translation\", function() { return _Animations_Translation__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _Animations_Rotation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Animations/Rotation */ \"./compiled/Animations/Rotation.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Rotation\", function() { return _Animations_Rotation__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _Animations_TimingFunction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Animations/TimingFunction */ \"./compiled/Animations/TimingFunction.js\");\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"TimingFunction\", function() { return _Animations_TimingFunction__WEBPACK_IMPORTED_MODULE_4__; });\n/* harmony import */ var _Animations_Constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Animations/Constants */ \"./compiled/Animations/Constants.js\");\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"Constants\", function() { return _Animations_Constants__WEBPACK_IMPORTED_MODULE_5__; });\n/* harmony import */ var _Views_View__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Views/View */ \"./compiled/Views/View.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return _Views_View__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./compiled/index.js?");

/***/ })

/******/ });