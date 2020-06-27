import AnimatedCanvas from "./Canvas/AnimatedCanvas.js";
import View from "./Views/View.js";
import { EASE_IN_CUBIC, EASE_IN_OUT_BACK, EASE_IN_BACK } from './Animations/TimingFunction.js';

console.log('running script');

// get html canvas
const htmlCanvas = document.getElementById('test-canvas');

// create animated canvas from html canvas
const animatedCanvas = new AnimatedCanvas(htmlCanvas);

// create a circle and add to canvas
const circleView = new View(100, 100, (context, canvasWidth, canvasHeight, x, y, timestamp) => {
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
});
animatedCanvas.addView(circleView);

// create a rectangle and add to canvas
const rectView = new View(500, 300, (context, canvasWidth, canvasHeight, x, y, timestamp) => {
    context.beginPath();
    context.rect(x, y, 50, 50);
    context.fill();
    context.closePath();
})
animatedCanvas.addView(rectView);

// translate circle on button clicked
document.getElementById('circle-shift-left-button').onclick = function () {
    circleView.translate(circleView.graphics.x - 50, circleView.graphics.y);
};
document.getElementById('circle-shift-right-button').onclick = function () {
    circleView.translate(circleView.graphics.x + 50, circleView.graphics.y);
};

// translate rectangle on button clicked
document.getElementById('rect-shift-left-button').onclick = function () {
    rectView.translate(rectView.graphics.x - 50, rectView.graphics.y);
};
document.getElementById('rect-shift-right-button').onclick = function () {
    rectView.translate(rectView.graphics.x + 50, rectView.graphics.y);
};