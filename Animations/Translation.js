import Animation from './Animation.js';
import { AnimationState } from './Constants.js';

class Translation extends Animation {

    constructor(srcX, srcY, destX, destY) {
        super();
        // source coordinates
        this.srcX = srcX;
        this.srcY = srcY;
        // destination coordinates
        this.destX = destX;
        this.destY = destY;
    }

    // set current timing function
    setTimingFunction = timingFunction => {
        this.timingFunction = timingFunction;
    }

    // delta x from src to dest
    get deltaX() {
        return this.destX - this.srcX;
    }

    // delta y from src to dest
    get deltaY() {
        return this.destY - this.srcY;
    }

    // transform x and y based on timestamp and timing function
    transform = (timestamp, graphics) => {
        // set start timestamp if none
        if (!this.startTimestamp) this.startTimestamp = timestamp;
        // set animation state to running
        this.state = AnimationState.RUNNING;
        // % time since started
        const percentTime = (timestamp - this.startTimestamp) / this.duration;
        // apply timing function for % progress
        const progress = Math.min(1, this.timingFunction(percentTime));
        // translate x
        graphics.x = this.srcX + this.deltaX * progress;
        // translate y
        graphics.y = this.srcY + this.deltaY * progress;
        // mark animation stopped if progress >= 100%
        if (progress >= 1) {
            // clear start timestamp
            this.startTimestamp = undefined;
            // set animation state to finished
            this.state = AnimationState.FINISHED;
        }
    }
}

export default Translation;