import Animation from './Animation.js'
import { AnimationState } from './Constants.js'
import { TimingFunction } from './TimingFunction.js'
import { Graphics } from '../Views/View.js'

class Rotation extends Animation {
    srcAngle: number;
    destAngle: number

    constructor (srcAngle: number, destAngle: number) {
        super()
        // source radians
        this.srcAngle = srcAngle
        // destination radians
        this.destAngle = destAngle
    }

    // set current timing function
    setTimingFunction = (timingFunction: TimingFunction): void => {
        this.timingFunction = timingFunction
    }

    // delta angle from src to dest
    get deltaAngle (): number {
        return this.destAngle - this.srcAngle
    }

    // transform angle based on timestamp and timing function
    transform = (timestamp: number, graphics: Graphics) => {
        // set start timestamp if none
        if (!this.startTimestamp) this.startTimestamp = timestamp
        // set animation state to running
        this.state = AnimationState.RUNNING
        // % time since started
        const percentTime = (timestamp - this.startTimestamp) / this.duration
        // apply timing function for % progress
        const progress = Math.min(1, this.timingFunction.apply(percentTime))
        // translate angle
        graphics.angle = this.srcAngle + this.deltaAngle * progress
        // mark animation stopped if progress >= 100%
        if (progress >= 1) {
        // clear start timestamp
            this.startTimestamp = undefined
            // set animation state to finished
            this.state = AnimationState.FINISHED
        }
    }
}

export default Rotation
