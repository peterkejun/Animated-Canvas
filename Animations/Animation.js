import { AnimationState } from './Constants.js';

class Animation {

    static defaultDuration = () => 500;

    startTimestamp;
    duration;
    state;

    constructor() {
        this.startTimestamp = undefined;
        this.duration = Animation.defaultDuration();
        this.state = AnimationState.IDLE;
    }

    setStartTimestamp = timestamp => {
        this.startTimestamp = timestamp;
    }

    get isIdle() {
        return this.state === AnimationState.IDLE;
    }

    get isRunning() {
        return this.state === AnimationState.RUNNING;
    }

    get isFinished() {
        return this.state === AnimationState.FINISHED;
    }

}

export default Animation;