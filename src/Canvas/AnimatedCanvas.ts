/*
 Animated Canvas is an EventEmitter.
 EventEmitter has the same API as 'events.EventEmitter' in NodeJS.
*/

import View, { Point } from '../Views/View.js'
import EventEmitter from '../Helpers/EventEmitter.js'
import { CanvasEvent } from './Events.js'

class AnimatedCanvas extends EventEmitter {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private views: Array<View>;
    private drawPaused: Boolean;

    /**
     * On click handler of the canvas, called before all on click handlers of views.
     * @type {(event: MouseEvent) => void}
     */
    onClick: (event: MouseEvent) => void;

    /**
     * Create a new AnimatedCanvas instance and bind it to a <canvas> DOM element
     * @constructor
     * @param canvas - the base <canvas> DOM element to bind with views and animations
     */
    constructor (canvas: HTMLCanvasElement) {
        super()
        // html canvas to draw on
        this.canvas = canvas
        // cache 2d context
        this.context = canvas.getContext('2d')
        // resize canvas for HD
        this.resize(this.canvas.clientWidth, this.canvas.clientHeight)
        // views are added later on, sorted by z-index asc
        this.views = []
        // high level control to start/pause drawing
        this.drawPaused = true
        // enable hit test
        this.canvas.onclick = (event) => {
            // call onClick handler of canvas
            if (this.onClick) this.onClick(event)
            // find mouse position relative to canvas
            const canvasPoint = this.getRelativePosition({
                x: event.clientX,
                y: event.clientY
            })
            // find view from higher z-index to lower z-index
            for (let { length } = this.views, i = length - 1; i >= 0; i--) {
                // if this view does not contain the point, check next one
                if (!this.views[i].containsPoint(canvasPoint)) continue
                // if this view contains the point, call onClick handler
                this.views[i].onClick(event)
                break
            }
        }
    }

    /**
     * Get current size of the canvas
     * @returns the current size of the canvas
     */
    getSize = () => {
        const { clientWidth: width, clientHeight: height } = this.canvas
        return { width, height }
    }

    /**
     * Resize the canvas
     * @param width new width to resize the canvas
     * @param height new height to resize the canvas
     */
    // resize canvas for HD
    resize = (width: number, height: number) => {
        // emit evnet "will resize"
        this.emit(CanvasEvent.WILL_RESIZE, width, height)
        // 2x width, height for HD
        this.canvas.width = width * 2
        this.canvas.height = height * 2
        // use css to maintain canvas visual size
        this.canvas.style.width = `${width}px`
        this.canvas.style.height = `${height}px`
        // scale 2x for HD
        this.context.scale(2, 2)
        // emit event "did resize"
        this.emit(CanvasEvent.DID_RESIZE, width, height)
    }

    /**
     * Add a view to canvas, drawn in the next draw cycle
     *
     * @param view { import("../Views/View") }
     */
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
        // add view to array
        if (this.views.length === 0) {
            this.views.push(view)
        } else {
            // binary insert into views array
            let low = 0; let high = this.views.length; let mid = 0
            let index = -1
            while (index === -1) {
                if (high <= low) {
                    if (this.views[low]) {
                        index = view.graphics.zIndex > this.views[low].graphics.zIndex ? low + 1 : low
                    } else {
                        index = low
                    }
                    break
                }
                mid = low + Math.floor((high - low) / 2)
                if (view.graphics.zIndex === this.views[mid].graphics.zIndex) {
                    index = mid + 1
                    break
                }
                if (view.graphics.zIndex > this.views[mid].graphics.zIndex) {
                    low = mid + 1
                    continue
                }
                high = mid - 1
            }
            this.views.splice(index, 0, view)
        }
        // emit event "did add view"
        this.emit(CanvasEvent.DID_ADD_VIEW, view)
        // start draw cycle if paused
        this.startDraw()
    }

    /**
     * Force a draw cycle to start if not started already
     */
    requestRedraw = () => {
        // emit event "will start draw"
        this.emit('will start draw')
        // set pause flag to false
        this.drawPaused = false
        // emit event "did start draw"
        this.emit('did start draw')
    }

    /**
     * Stop the current and future draw cycles
     */
    stopDraw = () => {
        // emit event "will stop draw"
        this.emit(CanvasEvent.WILL_STOP_DRAW)
        // set pause flag to true
        this.drawPaused = true
        // emit event "did stop draw"
        this.emit(CanvasEvent.DID_STOP_DRAW)
    }

    /**
     * Start a draw cycle if stopped
     */
    startDraw = () => {
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

    /**
     * Rerenders all views and their current animation frame with the timestamp
     * @param timestamp the timestamp used to calculate animation frames for each view
     */
    draw = (timestamp: number) => {
        // don't draw if paused
        if (this.drawPaused) return
        // emit event 'will draw'
        this.emit(CanvasEvent.WILL_DRAW, timestamp)
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
            this.emit(CanvasEvent.DID_STOP_DRAW, timestamp)
            this.drawPaused = true
        }
        // emit event 'did draw'
        this.emit(CanvasEvent.DID_DRAW, timestamp)
        // next frame
        requestAnimationFrame(timestamp => {
            this.draw(timestamp)
        })
    }

    /**
     * Converts a position relative to the window to a position relative to the canvas
     * @param point the position relative to the window
     * @returns the position relative to the canvas
     */
    getRelativePosition = (point: Point): Point => {
        const { x: boundingX, y: boundingY } = this.canvas.getBoundingClientRect()
        return {
            x: point.x - boundingX,
            y: point.y - boundingY
        }
    }
}

export default AnimatedCanvas
