/*
 Animated Canvas is an EventEmitter.
 EventEmitter has the same API as 'events.EventEmitter' in NodeJS.
 events: [
        'did resize',
        'did add view',
        'will start draw', 'did start draw', 'will draw', 'did draw', 'did stop draw'
    ]
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import View from '../Views/View.js';
import EventEmitter from '../Helpers/EventEmitter.js';
var AnimatedCanvas = /** @class */ (function (_super) {
    __extends(AnimatedCanvas, _super);
    function AnimatedCanvas(canvas) {
        var _this = _super.call(this) || this;
        // returns current canvas size
        _this.getSize = function () {
            var _a = _this.canvas, width = _a.clientWidth, height = _a.clientHeight;
            return { width: width, height: height };
        };
        // resize canvas for HD
        _this.resize = function (width, height) {
            // emit evnet "will resize"
            _this.emit('will resize', width, height);
            // 2x width, height for HD
            _this.canvas.width = width * 2;
            _this.canvas.height = height * 2;
            // use css to maintain canvas visual size
            _this.canvas.style.width = width + "px";
            _this.canvas.style.height = height + "px";
            // scale 2x for HD
            _this.context.scale(2, 2);
            // emit event "did resize"
            _this.emit('did resize', width, height);
        };
        // add a view to canvas, drawn in next draw cycle
        _this.addView = function (view) {
            // must be a View object
            if (!(view instanceof View)) {
                throw new Error("Views added to AnimatedCanvas must be of View type.");
            }
            // must have masterDraw function
            if (typeof view.masterDraw !== 'function') {
                throw new Error("Views added to AnimatedCanvas must have function masterDraw.");
            }
            // add canvas as delegate
            view.delegate = _this;
            // add to views
            _this.views.push(view);
            // emit event "did add view"
            _this.emit('did add view', view);
            // start draw cycle if paused
            if (_this.drawPaused) {
                // emit event "will start draw"
                _this.emit('will start draw');
                // set pause flag to false
                _this.drawPaused = false;
                // draw
                requestAnimationFrame(function (timestamp) {
                    _this.draw(timestamp);
                });
                // emit event "did start draw"
                _this.emit('did start draw');
            }
        };
        // force start draw cycle
        // delegate function called by view
        _this.requestRedraw = function () {
            if (_this.drawPaused) {
                // emit event "will start draw"
                _this.emit('will start draw');
                // set pause flag to false
                _this.drawPaused = false;
                // draw
                requestAnimationFrame(function (timestamp) {
                    _this.draw(timestamp);
                });
                // emit event "did start draw"
                _this.emit('did start draw');
            }
        };
        // stop draw cycle
        _this.stopDraw = function () {
            // emit event "did stop draw"
            _this.emit('will stop draw');
            // set pause flag to true
            _this.drawPaused = true;
            // emit event "did stop draw"
            _this.emit('did stop draw');
        };
        // start draw cycle
        _this.startDraw = function () {
            // emit event "will start draw"
            _this.emit('will start draw');
            // set pause flag to false
            _this.drawPaused = false;
            // emit event "did start draw"
            _this.emit('did start draw');
        };
        // draw cycle function
        // draws all views
        // can be paused by setting drawPaused to true, 
        // automatically paused if no animations
        _this.draw = function (timestamp) {
            // don't draw if paused
            if (_this.drawPaused)
                return;
            // emit event 'will draw'
            _this.emit('will draw', timestamp);
            // get canvas size
            var _a = _this.canvas, canvasWidth = _a.clientWidth, canvasHeight = _a.clientHeight;
            // clear canvas
            _this.context.clearRect(0, 0, canvasWidth, canvasHeight);
            // draw views
            var hasAnimation = false;
            for (var _i = 0, _b = _this.views; _i < _b.length; _i++) {
                var view = _b[_i];
                // draw this view
                view.masterDraw(_this.context, timestamp, canvasWidth, canvasHeight);
                // check if this view has any animations
                if (view.hasAnimations()) {
                    hasAnimation = true;
                }
            }
            // pause draw cycle if no views or no animations
            if (_this.views.length === 0 || !hasAnimation) {
                _this.emit('did stop draw', timestamp);
                _this.drawPaused = true;
            }
            // emit event 'did draw'
            _this.emit('did draw', timestamp);
            // next frame
            requestAnimationFrame(function (timestamp) {
                _this.draw(timestamp);
            });
        };
        // html canvas to draw on
        _this.canvas = canvas;
        // cache 2d context
        _this.context = canvas.getContext('2d');
        // resize canvas for HD
        _this.resize(_this.canvas.clientWidth, _this.canvas.clientHeight);
        // views are added later on
        _this.views = [];
        // high level control to start/pause drawing
        _this.drawPaused = true;
        return _this;
    }
    return AnimatedCanvas;
}(EventEmitter));
export default AnimatedCanvas;
