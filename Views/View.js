import Translation from '../Animations/Translation.js';

class View {
    #animations;

    constructor(x, y, draw) {
        this.graphics = {
            x,
            y,
        }
        this.draw = draw;
        this.animationDuration = 500;
        this.delegate = null;
        this.#animations = new Set();
    }

    addAnimation = animation => {
        // must be of type Animation
        if (!(animation instanceof Translation)) {
            throw new Error("Animation added to view must be of type Animation or any of its subclasses.");
        }
        // add animation
        this.#animations.add(animation);
    }

    hasAnimations = () => this.#animations.size !== 0;

    masterDraw = (context, timestamp, canvasWidth, canvasHeight) => {
        this.timestamp = timestamp;
        this.#animations.forEach(animation => {
            animation.transform(timestamp, this.graphics);
            if (animation.isFinished) {
                this.#animations.delete(animation);
            }
        });
        this.draw(context, canvasWidth, canvasHeight, this.graphics.x, this.graphics.y, timestamp);
    }

    setX = x => {
        if (!x) return;
        this.graphics.x = x;
        this.delegate.requestRedraw();
    }

    setY = y => {
        if (!y) return;
        this.graphics.y = y;
        this.delegate.requestRedraw();
    }

    setXY = (x, y) => {
        if (!x || !y) return;
        this.graphics.x = x;
        this.graphics.y = y;
        this.delegate.requestRedraw();
    }

    translate = (x, y) => {
        const translation = new Translation(this.graphics.x, this.graphics.y, x, y);
        this.addAnimation(translation);
        console.log(`new translation to ${x}, ${y}`)
        if (this.delegate) {
            this.delegate.requestRedraw();
        }
    }
}

export default View;