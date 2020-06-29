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
import Animation from './Animation.js';
import { AnimationState } from './Constants.js';
var Translation = /** @class */ (function (_super) {
    __extends(Translation, _super);
    function Translation(srcX, srcY, destX, destY) {
        var _this = _super.call(this) || this;
        // set current timing function
        _this.setTimingFunction = function (timingFunction) {
            _this.timingFunction = timingFunction;
        };
        // transform x and y based on timestamp and timing function
        _this.transform = function (timestamp, graphics) {
            // set start timestamp if none
            if (!_this.startTimestamp)
                _this.startTimestamp = timestamp;
            // set animation state to running
            _this.state = AnimationState.RUNNING;
            // % time since started
            var percentTime = (timestamp - _this.startTimestamp) / _this.duration;
            // apply timing function for % progress
            var progress = Math.min(1, _this.timingFunction.apply(percentTime));
            // translate x
            graphics.x = _this.srcX + _this.deltaX * progress;
            // translate y
            graphics.y = _this.srcY + _this.deltaY * progress;
            // mark animation stopped if progress >= 100%
            if (progress >= 1) {
                // clear start timestamp
                _this.startTimestamp = undefined;
                // set animation state to finished
                _this.state = AnimationState.FINISHED;
            }
        };
        // source coordinates
        _this.srcX = srcX;
        _this.srcY = srcY;
        // destination coordinates
        _this.destX = destX;
        _this.destY = destY;
        return _this;
    }
    Object.defineProperty(Translation.prototype, "deltaX", {
        // delta x from src to dest
        get: function () {
            return this.destX - this.srcX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Translation.prototype, "deltaY", {
        // delta y from src to dest
        get: function () {
            return this.destY - this.srcY;
        },
        enumerable: false,
        configurable: true
    });
    return Translation;
}(Animation));
export default Translation;
