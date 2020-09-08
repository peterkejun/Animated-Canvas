import { AnimationState } from './Constants.js'
import { TimingFunction, LINEAR } from './TimingFunction.js'
import { Graphics } from '../Views/View.js'

class Animation {
  // default animation duration to 500ms
  static defaultDuration = () => 500;

  startTimestamp: number;
  duration: number;
  state: AnimationState;
  timingFunction: TimingFunction;

  constructor () {
      // startTimestamp is for calculating elasped time, reset before each animation
      this.startTimestamp = undefined
      // default animation animation
      this.duration = Animation.defaultDuration()
      // default to idle state
      this.state = AnimationState.IDLE
      // default to linear timing function
      this.timingFunction = LINEAR
  }

  // returns if animation is idle
  get isIdle () {
      return this.state === AnimationState.IDLE
  }

  // returns if animation is running
  get isRunning () {
      return this.state === AnimationState.RUNNING
  }

  // returns if animation is finished
  get isFinished () {
      return this.state === AnimationState.FINISHED
  }

  // dummy transform function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform = (timestamp: number, graphics: Graphics): void => { };
}

export default Animation
