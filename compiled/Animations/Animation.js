import { AnimationState } from "./Constants.js";
import { LINEAR } from "./TimingFunction.js";
var Animation = /** @class */ (function () {
    function Animation() {
        // dummy transform function
        this.transform = function (timestamp, graphics) { };
        // startTimestamp is for calculating elasped time, reset before each animation
        this.startTimestamp = undefined;
        // default animation animation
        this.duration = Animation.defaultDuration();
        // default to idle state
        this.state = AnimationState.IDLE;
        // default to linear timing function
        this.timingFunction = LINEAR;
    }
    Object.defineProperty(Animation.prototype, "isIdle", {
        // returns if animation is idle
        get: function () {
            return this.state === AnimationState.IDLE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "isRunning", {
        // returns if animation is running
        get: function () {
            return this.state === AnimationState.RUNNING;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "isFinished", {
        // returns if animation is finished
        get: function () {
            return this.state === AnimationState.FINISHED;
        },
        enumerable: false,
        configurable: true
    });
    // default animation duration to 500ms
    Animation.defaultDuration = function () { return 500; };
    return Animation;
}());
export default Animation;
