import Animation from '../Animations/Animation.js'
import Translation from '../Animations/Translation.js'
import Rotation from '../Animations/Rotation.js'

export interface Graphics {
    x: number,
    y: number,
    angle: number,
};

type DrawFunction = (
    context: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    x: number,
    y: number,
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

    constructor (x: number, y: number, draw: DrawFunction) {
      this.graphics = {
        x,
        y,
        angle: 0
      }
      this.draw = draw
      this.animationDuration = 500
      this.delegate = null
      this.animations = new Set()
    }

    addAnimation = (animation: Animation): void => {
      // must be of type Animation
      if (!(animation instanceof Animation)) {
        throw new Error('Animation added to view must be of type Animation or any of its subclasses.')
      }
      // add animation
      this.animations.add(animation)
    }

    hasAnimations = (): Boolean => this.animations.size !== 0;

    masterDraw = (context: CanvasRenderingContext2D, timestamp: number, canvasWidth: number, canvasHeight: number): void => {
      this.timestamp = timestamp
      this.animations.forEach(animation => {
        animation.transform(timestamp, this.graphics)
        if (animation.isFinished) {
          this.animations.delete(animation)
        }
      })
      context.save()
      context.translate(this.graphics.x, this.graphics.y)
      context.rotate(this.graphics.angle)
      context.translate(-this.graphics.x, -this.graphics.y)
      context.beginPath()
      this.draw(context, canvasWidth, canvasHeight, this.graphics.x, this.graphics.y, timestamp)
      context.closePath()
      context.restore()
    }

    setX = (x: number): void => {
      if (!x) return
      this.graphics.x = x
      this.delegate.requestRedraw()
    }

    setY = (y: number): void => {
      if (!y) return
      this.graphics.y = y
      if (this.delegate) this.delegate.requestRedraw()
    }

    setXY = (x: number, y: number): void => {
      if (!x || !y) return
      this.graphics.x = x
      this.graphics.y = y
      if (this.delegate) this.delegate.requestRedraw()
    }

    setAngle = (angle: number): void => {
      this.graphics.angle = angle
      if (this.delegate) this.delegate.requestRedraw()
    }

    setAngleInDeg = (degAngle: number): void => {
      this.setAngle(degAngle * Math.PI / 180)
    }

    translate = (x: number, y: number, timingFunction?: TimingFunction): void => {
      const translation = new Translation(this.graphics.x, this.graphics.y, x, y)
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
