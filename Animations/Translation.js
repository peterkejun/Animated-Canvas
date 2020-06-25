class Translation {
    constructor(srcX, srcY, destX, destY) {
        this.srcX = srcX;
        this.srcY = srcY;
        this.destX = destX;
        this.destY = destY;
    }

    getDeltaX = () => {
        return this.destX - this.srcX;
    }

    getDeltaY = () => {
        return this.destY - this.srcY;
    }
}

export default Translation;