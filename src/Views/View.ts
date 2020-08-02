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
};

type DrawFunction = (
    context: CanvasRenderingContext2D,
    canvasSize: Size,
    position: Point,
    timestamp: number) => void;

interface ViewDelegate {
    requestRedraw: () => void,
};

class View {
    // drawing
    graphics: Graphics;
    draw: DrawFunction;
    timestamp: number;
    delegate: ViewDelegate;

    // animation
    private animations: Set<Animation>;
    animationDuration: number;

    // hit test
    onClick: (event: MouseEvent) => void;

    constructor (graphics: Graphics, draw: DrawFunction) {
        this.graphics = graphics
        this.draw = draw
        this.animationDuration = 500
        this.delegate = null
        this.animations = new Set()
    }

    // Graphics
    masterDraw = (context: CanvasRenderingContext2D, timestamp: number, canvasWidth: number, canvasHeight: number): void => {
        this.timestamp = timestamp
        this.animations.forEach(animation => {
            animation.transform(timestamp, this.graphics)
            if (animation.isFinished) {
                this.animations.delete(animation)
            }
        })
        context.save()
        context.translate(this.graphics.position.x, this.graphics.position.y)
        context.rotate(this.graphics.angle)
        context.translate(-this.graphics.position.x, -this.graphics.position.y)
        context.beginPath()
        this.draw(context, {
            width: canvasWidth,
            height: canvasHeight
        }, this.graphics.position, timestamp)
        context.closePath()
        context.restore()
    }

    setX = (x: number): void => {
        if (!x) return
        this.graphics.position.x = x
        this.delegate.requestRedraw()
    }

    setY = (y: number): void => {
        if (!y) return
        this.graphics.position.y = y
        if (this.delegate) this.delegate.requestRedraw()
    }

    setXY = (x: number, y: number): void => {
        if (!x || !y) return
        this.graphics.position.x = x
        this.graphics.position.y = y
        if (this.delegate) this.delegate.requestRedraw()
    }

    setAngle = (angle: number): void => {
        this.graphics.angle = angle
        if (this.delegate) this.delegate.requestRedraw()
    }

    setAngleInDeg = (degAngle: number): void => {
        this.setAngle(degAngle * Math.PI / 180)
    }

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

    containsPoint = (canvasPoint: Point): Boolean => {
        const { x, y } = this.transformPoint(canvasPoint)
        return x >= this.graphics.position.x && x <= this.graphics.position.x + this.graphics.size.width && y >= this.graphics.position.y && y <= this.graphics.position.y + this.graphics.size.height
    }

    get center (): Point {
        return {
            x: this.graphics.position.x + this.graphics.size.width / 2,
            y: this.graphics.position.y + this.graphics.size.height / 2
        }
    }

    // Animations
    addAnimation = (animation: Animation): void => {
        // must be of type Animation
        if (!(animation instanceof Animation)) {
            throw new Error('Animation added to view must be of type Animation or any of its subclasses.')
        }
        // add animation
        this.animations.add(animation)
    }

    hasAnimations = (): Boolean => this.animations.size !== 0;

    translate = (x: number, y: number, timingFunction?: TimingFunction): void => {
        const translation = new Translation(this.graphics.position.x, this.graphics.position.y, x, y)
        if (timingFunction) translation.setTimingFunction(timingFunction)
        this.addAnimation(translation)
        console.log(`new translation to ${x}, ${y}`)
        if (this.delegate) {
            this.delegate.requestRedraw()
        }
    }

    rotateTo = (angle: number, timingFunction?: TimingFunction) => {
        const rotation = new Rotation(this.graphics.angle, angle)
        if (timingFunction) rotation.setTimingFunction(timingFunction)
        this.addAnimation(rotation)
        console.log(`new rotation to angle ${angle}`)
        if (this.delegate) {
            this.delegate.requestRedraw()
        }
    }
}

export default View
