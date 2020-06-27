import View from '../Views/View.js';

class AnimatedCanvas {
    constructor(canvas) {
        // html canvas to draw on
        this.canvas = canvas;
        // cache 2d context
        this.context = canvas.getContext('2d');
        // resize canvas for HD
        this.resize(this.canvas.clientWidth, this.canvas.clientHeight);
        // views are added later on
        this.views = [];
        // high level control to start/pause drawing
        this.drawPaused = true;
    }

    // returns current canvas size
    getSize = () => {
        const { clientWidth: width, clientHeight: height } = this.canvas;
        return { width, height };
    }

    // resize canvas for HD
    resize = (width, height) => {
        // 2x width, height for HD
        this.canvas.width = width * 2;
        this.canvas.height = height * 2;
        // use css to maintain canvas visual size
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        // scale 2x for HD
        this.context.scale(2, 2);
    }

    // add a view to canvas, drawn in next draw cycle
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
        // start draw cycle if paused
        if (this.drawPaused) {
            this.drawPaused = false;
            requestAnimationFrame(timestamp => {
                this.draw(timestamp);
            })
        }
    }

    // force start draw cycle
    // delegate function called by view
    requestRedraw = () => {
        if (this.drawPaused) {
            this.drawPaused = false;
            requestAnimationFrame(timestamp => {
                this.draw(timestamp);
            })
        }
    }

    // stop draw cycle
    stopDraw = () => {
        this.drawPaused = true;
    }

    // start draw cycle
    startDraw = () => {
        this.drawPaused = false;
    }

    // draw cycle function
    // draws all views
    // can be paused by setting drawPaused to true, 
    // automatically paused if no animations
    draw = timestamp => {
        if (this.drawPaused) return;
        // console.log('draw');
        const { clientWidth: canvasWidth, clientHeight: canvasHeight } = this.canvas;
        // clear canvas
        this.context.clearRect(0, 0, canvasWidth, canvasHeight);
        // draw views
        let hasAnimation = false;
        for (const view of this.views) {
            // draw this view
            view.masterDraw(this.context, timestamp, canvasWidth, canvasHeight);
            // check if this view has any animations
            if (view.hasAnimations()) {
                hasAnimation = true;
            }
        }
        // pause draw cycle if no views or no animations
        if (this.views.length === 0 || !hasAnimation) {
            console.log('draw stopped')
            this.drawPaused = true;
        }
        // next frame
        requestAnimationFrame(timestamp => {
            this.draw(timestamp);
        })
    }

}

export default AnimatedCanvas;