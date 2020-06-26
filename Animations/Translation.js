import Animation from './Animation.js';
import { AnimationState } from './Constants.js';

class Translation extends Animation {

    constructor(srcX, srcY, destX, destY) {
        super();
        this.srcX = srcX;
        this.srcY = srcY;
        this.destX = destX;
        this.destY = destY;
    }

    get deltaX() {
        return this.destX - this.srcX;
    }

    get deltaY() {
        return this.destY - this.srcY;
    }

    transform = (timestamp, graphics) => {
        if (!this.startTimestamp) this.startTimestamp = timestamp;
        this.state = AnimationState.RUNNING;
        const timeDelta = timestamp - this.startTimestamp;
        const percentage = Math.min(1, timeDelta / this.duration);
        graphics.x = this.srcX + this.deltaX * percentage;
        graphics.y = this.srcY + this.deltaY * percentage;
        if (percentage >= 1) {
            this.setStartTimestamp(undefined);
            this.state = AnimationState.FINISHED;
            this.startTimestamp = undefined;
        }
    }
}

export default Translation;