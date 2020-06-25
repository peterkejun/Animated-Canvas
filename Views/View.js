class View {
    constructor(x, y, draw) {
        this.coords = { x, y };
        this.draw = draw;
        this.translation = null;
        this.animationDuration = 500;
        this.delegate = null;
    }

    masterDraw = (context, timestamp, canvasWidth, canvasHeight) => {
        this.timestamp = timestamp;
        if (this.translation && this.startTimestamp) {
            const timeDelta = timestamp - this.startTimestamp;
            const percentage = Math.min(1, timeDelta / this.animationDuration);
            const x = this.translation.srcX + this.translation.getDeltaX() * percentage;
            const y = this.translation.srcY + this.translation.getDeltaY() * percentage;
            this.draw(context, canvasWidth, canvasHeight, x, y, timestamp);
            if (percentage >= 1) {
                this.coords = {
                    x: this.translation.destX,
                    y: this.translation.destY,
                };
                this.translation = null;
                this.startTimestamp = undefined;
            }
            return;
        }
        this.draw(context, canvasWidth, canvasHeight, this.coords.x, this.coords.y, timestamp);
    }

    translate = (x, y) => {
        this.startTimestamp = this.timestamp;
        this.translation = new Translation(this.coords.x, this.coords.y, x, y);
        console.log(`new translation to ${x}, ${y}`)
        if (this.delegate) {
            this.delegate.notifyNewTranslation();
        }
    }
}

export default View;