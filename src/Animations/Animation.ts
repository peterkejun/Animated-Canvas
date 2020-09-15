import { AnimationState } from './Constants.js'
import { TimingFunction, LINEAR } from './TimingFunction.js'
import { Graphics } from '../Views/View.js'
import EventEmitter from '../Helpers/EventEmitter.js'

/**
 * Arbitrary object used to determine intermediate graphics in a custom animation
 */
type AnimationProperties = any

/**
 * The configuration passed to custom tranform functions which uses it to modify a view's graphics
 */
interface TransformConfig {
    timestamp: number,
    startTimestamp: number,
    percentTime: number,
    progress: number,
    timingFunction: TimingFunction,
    properties: AnimationProperties,
}

/**
 * The function that modifies a view's graphics based on the transform configuration
 */
type TransformFunction = (graphics: Graphics, config: TransformConfig) => void

class Animation extends EventEmitter {
    /**
     * Default duration for all animations: 500ms
     */
    static defaultDuration = () => 500;

    /**
     * The timestamp at the time the animation started
     */
    startTimestamp: number;
    /**
     * The animation's duration, set to default duration if not specified
     */
    duration: number;
    /**
     * The state of the animation
     */
    state: AnimationState;
    /**
     * The timing function to use with this animation
     */
    timingFunction: TimingFunction;
    /**
     * The transform function to modifies a view's graphics based on the transform configuration
     */
    transform: TransformFunction = () => {};
    /**
     * Arbitrary object used to determine intermediate graphics in a custom animation
     */
    properties: any;

    /**
     * Create a new animation with default duration, linear timing function, and set it to the idle state
     * @constructor
     */
    constructor () {
        super()
        // startTimestamp is for calculating elasped time, reset before each animation
        this.startTimestamp = undefined
        // default animation animation
        this.duration = Animation.defaultDuration()
        // default to idle state
        this.state = AnimationState.IDLE
        // default to linear timing function
        this.timingFunction = LINEAR
    }

    /**
     * Check if animation is in the idle state
     * @returns True if the animation is idle, false otherwise
     */
    get isIdle () {
        return this.state === AnimationState.IDLE
    }

    /**
     * Check if animation is in the running state
     * @returns True if the animation is running, false otherwise
     */
    get isRunning () {
        return this.state === AnimationState.RUNNING
    }

    /**
     * Check if the animation is in the finished state
     * @returns True if the animation is finished, false otherwise
     */
    get isFinished () {
        return this.state === AnimationState.FINISHED
    }

    /**
     * Modifies graphics based on timestamp and updates animation state
     * @param timestamp the timestamp of this animation
     * @param graphics the graphics of the view that this animation is bound to
     */
    applyTransform = (timestamp: number, graphics: Graphics): void => {
        // set start timestamp if none
        if (!this.startTimestamp) this.startTimestamp = timestamp
        // set animation state to running
        this.state = AnimationState.RUNNING
        // % time since started
        const percentTime = (timestamp - this.startTimestamp) / this.duration
        // apply timing function for % progress
        const progress = Math.min(1, this.timingFunction.apply(percentTime))
        // call custom transform function
        const config = {
            timestamp,
            startTimestamp: this.startTimestamp,
            percentTime,
            progress,
            timingFunction: this.timingFunction,
            properties: this.properties
        }
        this.transform(graphics, config)
        // mark animation stopped if progress >= 100%
        if (progress >= 1) {
            // clear start timestamp
            this.startTimestamp = undefined
            // set animation state to finished
            this.state = AnimationState.FINISHED
        }
    }
}

export default Animation
export { TransformFunction }
