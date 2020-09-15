import Animation from './Animation.js'

class Rotation extends Animation {
    /**
     * Create a new rotation animation based on source and destination angles
     * @constructor
     * @param srcAngle - The angle to start with
     * @param destAngle - The angle to rotate to
     */
    constructor (srcAngle: number, destAngle: number) {
        super()
        this.properties = {
            // source radians
            srcAngle,
            // destination radians
            destAngle
        }
        this.transform = (graphics, { progress, properties }) => {
            // translate angle
            graphics.angle = properties.srcAngle + this.deltaAngle * progress
        }
    }

    /**
     * Calculate the difference between source and destination angles
     * @returns the difference in radians
     */
    get deltaAngle (): number {
        return this.properties.destAngle - this.properties.srcAngle
    }
}

export default Rotation
