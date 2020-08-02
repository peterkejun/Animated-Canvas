/*
 Animated Canvas is an EventEmitter.
 EventEmitter has the same API as 'events.EventEmitter' in NodeJS.
 events: [
        'did resize',
        'did add view',
        'will start draw', 'did start draw', 'will draw', 'did draw', 'did stop draw'
    ]
*/

import View from '../Views/View.js'
import EventEmitter from '../Helpers/EventEmitter.js'

class AnimatedCanvas extends EventEmitter {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private views: Array<View>;
    private drawPaused: Boolean;

    constructor (canvas: HTMLCanvasElement) {
        super()
        // html canvas to draw on
        this.canvas = canvas
        // cache 2d context
        this.context = canvas.getContext('2d')
        // resize canvas for HD
        this.resize(this.canvas.clientWidth, this.canvas.clientHeight)
        // views are added later on
        this.views = []
        // high level control to start/pause drawing
        this.drawPaused = true
        // enable hit test
        this.canvas.onclick = (event) => {
            const { x: boundingX, y: boundingY } = this.canvas.getBoundingClientRect()
            const mousePoint = {
                x: event.clientX - boundingX,
                y: event.clientY - boundingY
            }
            for (let i = 0, { length } = this.views; i < length; i++) {
                // if this view does not contain the point, check next one
                if (!this.views[i].containsPoint(mousePoint)) continue
                // if this view contains the point, call onClick handler
                this.views[i].onClick(event)
            }
        }
    }

    // returns current canvas size
    getSize = () => {
        const { clientWidth: width, clientHeight: height } = this.canvas
        return { width, height }
    }

    // resize canvas for HD
    resize = (width: number, height: number) => {
        // emit evnet "will resize"
        this.emit('will resize', width, height)
        // 2x width, height for HD
        this.canvas.width = width * 2
        this.canvas.height = height * 2
        // use css to maintain canvas visual size
        this.canvas.style.width = `${width}px`
        this.canvas.style.height = `${height}px`
        // scale 2x for HD
        this.context.scale(2, 2)
        // emit event "did resize"
        this.emit('did resize', width, height)
    }

    // add a view to canvas, drawn in next draw cycle
    addView = (view: View) => {
        // must be a View object
        if (!(view instanceof View)) {
            throw new Error('Views added to AnimatedCanvas must be of View type.')
        }
        // must have masterDraw function
        if (typeof view.masterDraw !== 'function') {
            throw new Error('Views added to AnimatedCanvas must have function masterDraw.')
        }
        // add canvas as delegate
        view.delegate = this
        // add to views
        this.views.push(view)
        // emit event "did add view"
        this.emit('did add view', view)
        // start draw cycle if paused
        if (this.drawPaused) {
        // emit event "will start draw"
            this.emit('will start draw')
            // set pause flag to false
            this.drawPaused = false
            // draw
            requestAnimationFrame(timestamp => {
                this.draw(timestamp)
            })
            // emit event "did start draw"
            this.emit('did start draw')
        }
    }

    // force start draw cycle
    // delegate function called by view
    requestRedraw = () => {
        if (this.drawPaused) {
        // emit event "will start draw"
            this.emit('will start draw')
            // set pause flag to false
            this.drawPaused = false
            // draw
            requestAnimationFrame(timestamp => {
                this.draw(timestamp)
            })
            // emit event "did start draw"
            this.emit('did start draw')
        }
    }

    // stop draw cycle
    stopDraw = () => {
        // emit event "did stop draw"
        this.emit('will stop draw')
        // set pause flag to true
        this.drawPaused = true
        // emit event "did stop draw"
        this.emit('did stop draw')
    }

    // start draw cycle
    startDraw = () => {
        // emit event "will start draw"
        this.emit('will start draw')
        // set pause flag to false
        this.drawPaused = false
        // emit event "did start draw"
        this.emit('did start draw')
    }

    // draw cycle function
    // draws all views
    // can be paused by setting drawPaused to true,
    // automatically paused if no animations
    draw = (timestamp: number) => {
        // don't draw if paused
        if (this.drawPaused) return
        // emit event 'will draw'
        this.emit('will draw', timestamp)
        // get canvas size
        const { clientWidth: canvasWidth, clientHeight: canvasHeight } = this.canvas
        // clear canvas
        this.context.clearRect(0, 0, canvasWidth, canvasHeight)
        // draw views
        let hasAnimation = false
        for (const view of this.views) {
        // draw this view
            view.masterDraw(this.context, timestamp, canvasWidth, canvasHeight)
            // check if this view has any animations
            if (view.hasAnimations()) {
                hasAnimation = true
            }
        }
        // pause draw cycle if no views or no animations
        if (this.views.length === 0 || !hasAnimation) {
            this.emit('did stop draw', timestamp)
            this.drawPaused = true
        }
        // emit event 'did draw'
        this.emit('did draw', timestamp)
        // next frame
        requestAnimationFrame(timestamp => {
            this.draw(timestamp)
        })
    }
}

export default AnimatedCanvas
