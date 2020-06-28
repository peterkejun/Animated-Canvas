import AnimatedCanvas from './Canvas/AnimatedCanvas';
import View from './Views/View';

console.log('running script');

// get html canvas
const htmlCanvas = <HTMLCanvasElement>document.getElementById('test-canvas');

// create animated canvas from html canvas
const animatedCanvas = new AnimatedCanvas(htmlCanvas);
// listen to event "did stop draw"
animatedCanvas.on('did stop draw', () => console.log('did stop view'));


// create a circle and add to canvas
const circleView = new View(100, 100, (context, canvasWidth, canvasHeight, x, y, timestamp) => {
    context.arc(x - 5, y - 5, 10, 0, 2 * Math.PI);
    context.fill();
});
animatedCanvas.addView(circleView);

// create a rectangle and add to canvas
const rectView = new View(500, 300, (context, canvasWidth, canvasHeight, x, y, timestamp) => {
    context.rect(x - 25, y - 25, 50, 50);
    context.fill();
});
animatedCanvas.addView(rectView);

// translate circle on button clicked
document.getElementById('circle-shift-left-button').onclick = () => {
    circleView.translate(circleView.graphics.x - 50, circleView.graphics.y);
};
document.getElementById('circle-shift-right-button').onclick = () => {
    circleView.translate(circleView.graphics.x + 50, circleView.graphics.y);
};

// translate rectangle on button clicked
document.getElementById('rect-shift-left-button').onclick = () => {
    rectView.translate(rectView.graphics.x - 50, rectView.graphics.y);
};
document.getElementById('rect-shift-right-button').onclick = () => {
    rectView.translate(rectView.graphics.x + 50, rectView.graphics.y);
};

// rotate rectangle on button clicked
document.getElementById('rect-rotate-clockwise-button').onclick = () => {
    rectView.rotateTo(rectView.graphics.angle + Math.PI / 4);
}
