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
var Rotation = /** @class */ (function (_super) {
    __extends(Rotation, _super);
    function Rotation(srcAngle, destAngle) {
        var _this = _super.call(this) || this;
        // set current timing function
        _this.setTimingFunction = function (timingFunction) {
            _this.timingFunction = timingFunction;
        };
        // transform angle based on timestamp and timing function
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
            // translate angle
            graphics.angle = _this.srcAngle + _this.deltaAngle * progress;
            // mark animation stopped if progress >= 100%
            if (progress >= 1) {
                // clear start timestamp
                _this.startTimestamp = undefined;
                // set animation state to finished
                _this.state = AnimationState.FINISHED;
            }
        };
        // source radians
        _this.srcAngle = srcAngle;
        // destination radians
        _this.destAngle = destAngle;
        return _this;
    }
    Object.defineProperty(Rotation.prototype, "deltaAngle", {
        // delta angle from src to dest
        get: function () {
            return this.destAngle - this.srcAngle;
        },
        enumerable: false,
        configurable: true
    });
    return Rotation;
}(Animation));
export default Rotation;
