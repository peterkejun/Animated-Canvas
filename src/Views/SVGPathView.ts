import View, { Graphics, Point, Size } from './View.js'

interface SVGPathTransform {
    translate: Point,
    scale: Point
}

interface SVGPathStyle {
    fill: string | CanvasGradient | CanvasPattern,
    stroke: string | CanvasGradient | CanvasPattern,
    strokeWidth: number
}

interface SVGPathViewConfig {
    d: string,
    transform: SVGPathTransform,
    style: SVGPathStyle
}

class SVGPathView extends View {
    d: string;
    path: Path2D;
    transform: SVGPathTransform
    constructor (graphics: Graphics, config: SVGPathViewConfig) {
        super(graphics)
        this.setD(config.d)
        this.transform = config.transform
        this.draw = (context: CanvasRenderingContext2D, canvasSize: Size, position: Point) => {
            context.fillStyle = config.style.fill
            context.strokeStyle = config.style.stroke
            context.lineWidth = config.style.strokeWidth
            context.translate(this.transform.translate.x, this.transform.translate.y)
            context.scale(this.transform.scale.x, this.transform.scale.y)
            context.fill(this.path)
            context.stroke(this.path)
        }
    }

    setD = (d: string) => {
        this.d = d
        this.path = new Path2D(this.d)
    }
}

export default SVGPathView
