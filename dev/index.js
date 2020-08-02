/*
This is a test index.js for development purposes.
Not included in NPM package.
*/

import { AnimatedCanvas, View } from '../compiled/index.js'

console.log('running script')

// get html canvas
const htmlCanvas = document.getElementById('test-canvas')

// create animated canvas from html canvas
const animatedCanvas = new AnimatedCanvas(htmlCanvas)
// listen to event "did stop draw"
animatedCanvas.on('did stop draw', () => console.log('did stop view'))

// create a circle and add to canvas
const circleView = new View({
    position: {
        x: 100,
        y: 100
    },
    size: {
        width: 20,
        height: 20
    },
    angle: 0
}, (context, canvasSize, { x, y }) => {
    context.arc(x + 10, y + 10, 10, 0, 2 * Math.PI)
    context.fill()
})
circleView.onClick = () => {
    console.log('circle clicked')
}
animatedCanvas.addView(circleView)

// create a rectangle and add to canvas
const rectView = new View({
    position: {
        x: 500,
        y: 300
    },
    size: {
        width: 50,
        height: 50
    },
    angle: 0
}, (context, canvasSize, { x, y }) => {
    context.rect(x, y, 50, 50)
    context.fill()
})
rectView.onClick = () => {
    console.log('rect clicked')
}
animatedCanvas.addView(rectView)

// translate circle on button clicked
document.getElementById('circle-shift-left-button').onclick = () => {
    circleView.translate(circleView.graphics.position.x - 50, circleView.graphics.position.y)
}
document.getElementById('circle-shift-right-button').onclick = () => {
    circleView.translate(circleView.graphics.position.x + 50, circleView.graphics.position.y)
}

// translate rectangle on button clicked
document.getElementById('rect-shift-left-button').onclick = () => {
    rectView.translate(rectView.graphics.position.x - 50, rectView.graphics.position.y)
}
document.getElementById('rect-shift-right-button').onclick = () => {
    rectView.translate(rectView.graphics.position.x + 50, rectView.graphics.position.y)
}

// rotate rectangle on button clicked
document.getElementById('rect-rotate-clockwise-button').onclick = () => {
    rectView.rotateTo(rectView.graphics.angle + Math.PI / 4)
}
