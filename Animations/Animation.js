import { AnimationState } from "./Constants.js";
import { LINEAR } from "./TimingFunction.js";

class Animation {
  // default animation duration to 500ms
  static defaultDuration = () => 500;

  constructor() {
    // startTimestamp is for calculating elasped time, reset before each animation
    this.startTimestamp = undefined;
    // default animation animation
    this.duration = Animation.defaultDuration();
    // default to idle state
    this.state = AnimationState.IDLE;
    // default to linear timing function
    this.timingFunction = LINEAR;
  }

  // returns if animation is idle
  get isIdle() {
    return this.state === AnimationState.IDLE;
  }

  // returns if animation is running
  get isRunning() {
    return this.state === AnimationState.RUNNING;
  }

  // returns if animation is finished
  get isFinished() {
    return this.state === AnimationState.FINISHED;
  }
}

export default Animation;
