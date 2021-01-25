import Animation from '../Animations/Animation.js'
import Translation from '../Animations/Translation.js'
import Rotation from '../Animations/Rotation.js'
import { TimingFunction } from '../Animations/TimingFunction.js'

export interface Point {
    x: number,
    y: number
}

export interface Size {
    width: number,
    height: number
}

export interface Graphics {
    position: Point,
    size: Size,
    angle: number,
    zIndex: number,
    scale: Point,
};

export const DEFAULT_GRAPHICS: Graphics = {
    position: {
        x: 0,
        y: 0
    },
    size: {
        width: 0,
        height: 0
    },
    angle: 0,
    zIndex: 0,
    scale: {
        x: 1,
        y: 1
    }
}

type DrawFunction = (
    context: CanvasRenderingContext2D,
    canvasSize: Size,
    position: Point,
    timestamp: number) => void;

interface ViewDelegate {
    requestRedraw: () => void,
};

class View {
    /**
     * Graphical properties
     */
    graphics: Graphics;
    /**
     * Draw function to render this view
     */
    draw: DrawFunction;
    /**
     * the timestamp of the last transformation
     */
    timestamp: number;
    /**
     * A delegate object that handles render requests
     */
    delegate: ViewDelegate;

    /**
     * Animations of this view
     */
    private animations: Set<Animation>;

    /**
     * On click handler for hit tests
     */
    onClick: (event: MouseEvent) => void;

    /**
     * A new view with initial graphical properties and a custom draw function
     * @constructor
     * @param graphics Grapical properties
     * @param draw A draw function that specifies how to render this view
     */
    constructor (graphics?: Graphics, draw?: DrawFunction) {
        this.graphics = Object.assign({}, DEFAULT_GRAPHICS, graphics)
        this.draw = draw || (() => {})
        this.delegate = null
        this.animations = new Set()
    }

    /**
     * Applies all transformations from animations and transform the context before calling the draw function of this view
     * @param context the 2D context object associated with the canvas
     * @param timestamp the timestamp at the instance of render
     * @param canvasSize the size of the canvas
     */
    masterDraw = (context: CanvasRenderingContext2D, timestamp: number, canvasSize: Size): void => {
        // save current timestamp
        this.timestamp = timestamp
        // apply transformations from each animation
        this.animations.forEach(animation => {
            animation.applyTransform(timestamp, this.graphics)
            // delete animation if finished
            if (animation.isFinished) {
                this.animations.delete(animation)
            }
        })
        // save the current state
        context.save()
        context.translate(this.graphics.position.x, this.graphics.position.y)
        // translate the context by this view's position
        context.translate(this.graphics.position.x, this.graphics.position.y)
        // rotate the context by this view's angle
        context.rotate(this.graphics.angle)
        // translate the context back
        context.translate(-this.graphics.position.x, -this.graphics.position.y)
        // scale the context
        context.scale(this.graphics.scale.x, this.graphics.scale.y)
        context.translate(this.graphics.position.x * (1 - this.graphics.scale.x) / this.graphics.scale.x, this.graphics.position.y * (1 - this.graphics.scale.y) / this.graphics.scale.y)
        // call this view's draw function to render this view
        context.beginPath()
        this.draw(context, canvasSize, this.graphics.position, timestamp)
        context.closePath()
        // restore the current state
        context.restore()
    }

    /**
     * Set a new x coordinate
     * @param x the new x coordinate
     */
    setX = (x: number): void => {
        if (!x) return
        this.graphics.position.x = x
        this.delegate.requestRedraw()
    }

    /**
     * Set a new y coordinate
     * @param y the new y coordinate
     */
    setY = (y: number): void => {
        if (!y) return
        this.graphics.position.y = y
        if (this.delegate) this.delegate.requestRedraw()
    }

    /**
     * Set new x and y coordinates
     * @param x the new x coordinate
     * @param y the new y coordinate
     */
    setXY = (x: number, y: number): void => {
        if (!x || !y) return
        this.graphics.position.x = x
        this.graphics.position.y = y
        if (this.delegate) this.delegate.requestRedraw()
    }

    /**
     * Set a new rotation angle in radians
     * @param angle the new angle in radians
     */
    setAngle = (angle: number): void => {
        this.graphics.angle = angle
        if (this.delegate) this.delegate.requestRedraw()
    }

    /**
     * Set a new rotation angle in degrees
     * @param degAngle the new angle in degrees
     */
    setAngleInDeg = (degAngle: number): void => {
        this.setAngle(degAngle * Math.PI / 180)
    }

    /**
     * Transforms a point relative to the canvas to a point relative to this view
     * @param canvasPoint the position relative to the canvas
     * @returns the position relative to this view
     */
    transformPoint = (canvasPoint: Point): Point => {
        const xDiff = canvasPoint.x - this.graphics.position.x
        const yDiff = canvasPoint.y - this.graphics.position.y
        const radius = Math.hypot(xDiff, yDiff)
        const currentAngle = (xDiff >= 0 ? 0 : Math.PI) + Math.atan(yDiff / xDiff)
        const nextAngle = currentAngle - this.graphics.angle
        return {
            x: Math.cos(nextAngle) * radius + this.graphics.position.x,
            y: Math.sin(nextAngle) * radius + this.graphics.position.y
        }
    }

    /**
     * Checks if this view contains a point relative to the canvas
     * @param canvasPoint the point relative to the canvas
     * @returns True if this view contains the point, false if not
     */
    containsPoint = (canvasPoint: Point): Boolean => {
        // transform the point to a point relative to this view
        const { x, y } = this.transformPoint(canvasPoint)
        // check if the point is within the bounds of this view
        return x >= this.graphics.position.x && x <= this.graphics.position.x + this.graphics.size.width && y >= this.graphics.position.y && y <= this.graphics.position.y + this.graphics.size.height
    }

    /**
     * The center point of this view relative to the canvas
     */
    get center (): Point {
        return {
            x: this.graphics.position.x + this.graphics.size.width / 2,
            y: this.graphics.position.y + this.graphics.size.height / 2
        }
    }

    /**
     * Add a new animation and request a render
     * @param animation a new animation
     */
    addAnimation = (animation: Animation): void => {
        // must be of type Animation
        if (!(animation instanceof Animation)) {
            throw new Error('Animation added to view must be of type Animation or any of its subclasses.')
        }
        // add animation
        this.animations.add(animation)
        // request redraw
        if (this.delegate) {
            this.delegate.requestRedraw()
        }
    }

    /**
     * Check if this view has at least one animation
     * @returns True if this view has at least one animation, false if not
     */
    hasAnimations = (): Boolean => this.animations.size !== 0;

    /**
     * Animate the translation of this view using a destination coordinate and a timing function
     * @param x the x coordinate to translate to
     * @param y the y coordinate to translate to
     * @param timingFunction the timing function for the translation animation
     */
    translate = (x: number, y: number, timingFunction?: TimingFunction): void => {
        // create a new translation animation
        const translation = new Translation(this.graphics.position.x, this.graphics.position.y, x, y)
        // use the timing function if specified, otherwise use default timing function (linear)
        if (timingFunction) translation.timingFunction = timingFunction
        // add animation to this view
        this.addAnimation(translation)
        console.log(`new translation to ${x}, ${y}`)
    }

    /**
     * Animate the rotation of this view using a destination coordinate and a timing function
     * @param angle the angle in radians to rotate to
     * @param timingFunction the timing function for the rotation animation
     */
    rotateTo = (angle: number, timingFunction?: TimingFunction) => {
        // create a new rotation animation
        const rotation = new Rotation(this.graphics.angle, angle)
        // use the timing function if specified, otherwise use default timing function (linear)
        if (timingFunction) rotation.timingFunction = timingFunction
        // add animation to this view
        this.addAnimation(rotation)
        console.log(`new rotation to angle ${angle}`)
    }
}

export default View
