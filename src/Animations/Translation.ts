import Animation from './Animation.js'

class Translation extends Animation {
    /**
     * Create a new translation animation with source and destination coordinates
     * @constructor
     * @param srcX - the x coordinate to start the translation
     * @param srcY - the y coordinate to start the translation
     * @param destX - the x coordinate to translate to
     * @param destY - the y coordinate to translate to
     */
    constructor (srcX: number, srcY: number, destX: number, destY: number) {
        super()
        this.properties = {
            // source coordinates
            srcX,
            srcY,
            // destination coordinates
            destX,
            destY
        }
        this.transform = (graphics, { progress, properties }) => {
            // translate x
            graphics.position.x = properties.srcX + this.deltaX * progress
            // translate y
            graphics.position.y = properties.srcY + this.deltaY * progress
        }
    }

    /**
     * Calculate the difference between source and destination x coordinates
     * @returns the difference in pixels
     */
    get deltaX (): number {
        return this.properties.destX - this.properties.srcX
    }

    /**
     * Calculate the difference between source and destination y coordinates
     * @returns the difference in pixels
     */
    get deltaY (): number {
        return this.properties.destY - this.properties.srcY
    }
}

export default Translation
