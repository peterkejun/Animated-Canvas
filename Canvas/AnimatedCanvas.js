import View from '../Views/View.js';

class AnimatedCanvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.resize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.views = [];
        this.drawPaused = true;
    }

    getSize = () => {
        const { clientWidth: width, clientHeight: height } = this.canvas;
        return { width, height };
    }

    resize = (width, height) => {
        this.canvas.width = width * 2;
        this.canvas.height = height * 2;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.context.scale(2, 2);
    }

    addView = view => {
        // must be a View object
        if (!(view instanceof View)) {
            throw new Error("Views added to AnimatedCanvas must be of View type.");
        }
        // must have masterDraw function
        if (typeof view.masterDraw !== 'function') {
            throw new Error("Views added to AnimatedCanvas must have function masterDraw.");
        }
        // add canvas as delegate
        view.delegate = this;
        // add to views
        this.views.push(view);
        if (this.drawPaused) {
            this.drawPaused = false;
            requestAnimationFrame(timestamp => {
                this.draw(timestamp);
            })
        }
    }

    requestRedraw = () => {
        if (this.drawPaused) {
            this.drawPaused = false;
            requestAnimationFrame(timestamp => {
                this.draw(timestamp);
            })
        }
    }

    stopDraw = () => {
        this.drawPaused = true;
    }

    startDraw = () => {
        this.drawPaused = false;
    }

    draw = (timestamp) => {
        if (this.drawPaused) return;
        // console.log('draw');
        const { clientWidth: canvasWidth, clientHeight: canvasHeight } = this.canvas;
        // clear canvas
        this.context.clearRect(0, 0, canvasWidth, canvasHeight);
        // draw views
        let hasAnimation = false;
        for (const view of this.views) {
            view.masterDraw(this.context, timestamp, canvasWidth, canvasHeight);
            if (view.hasAnimations()) {
                hasAnimation = true;
            }
        }
        // next frame
        // console.log('no view', this.views.length === 0);
        if (this.views.length === 0 || !hasAnimation) {
            console.log('draw stopped')
            this.drawPaused = true;
        }
        requestAnimationFrame(timestamp => {
            this.draw(timestamp);
        })
    }

}

export default AnimatedCanvas;