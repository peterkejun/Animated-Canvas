# Animated Canvas

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWHhkSlpzU0tsbTRUNTFQNStKSWNBUFZ6N29jL2lVdWxSNWV3ZVV2Ky9oNDQxWk5PQ3lNL0dXMjIvK1hTdGhNWTY5NkpMVVduS1BQZmpnSURNVzdkbXZVPSIsIml2UGFyYW1ldGVyU3BlYyI6IklRK3dxdnRvcUN3ZkZjUmoiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/peterkejun/Animated-Canvas/blob/master/LICENSE) [![npm version](https://badge.fury.io/js/animated-canvas.svg)](https://badge.fury.io/js/animated-canvas)

Animated Canvas is a JavaScript library for rendering 2D graphics and animations on the HTML canvas.

- **Declarative:** Your application only needs to specify the graphics and animations for a view, Animated Canvas will efficiently redraw your view in the background. Your application is also provided with a set of basic shapes (rectangle, circle, etc.) to get started with simple graphics. Animated Canvas will take care of coordinating your animations into a single flow of canvas updates. 
- **Customizable:** Animations are highly customizable to fit your application's graphics needs. Aside from a set of pre-programmed animations (e.g. translation, rotation, etc.), you can customize your animation up to the level of timestamp-specific movements.  If you want more complex graphics, you can utilize the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) to instruct Animated Canvas how to render your view.
- **Observable:** CSS animations does the job but don't give you control over the animation's lifecycle. Animated Canvas provides lifecycle events that your application can subscribe to. Animations can be replayed, paused and canceled, etc. Hit test is another powerful feature to make your graphics user interative.

## Installation

For the latest module,

```
npm install animated-canvas
```

 Please note that there is no default export from the module. You need to access the interface using named import.

```javascript
import { AnimatedCanvas, View, Translation, TimingFunction } from 'animated-canvas';
```

## Documentation

This section talks about the fundamental logic of the Animated Canvas such as the Draw Cycle, the View, the Canvas, custom animations, and canvas & animation lifecycles. For API reference, refer to...

### The Draw Cycle

Animated Canvas renders your views in draw cycles. You can think of a draw cycle as one frame. During each draw cycle, Animated Canvas will loop through your views and call their individual ```draw``` function.

###### The Draw Cycle is Smart

There are rarely times where every millisecond of your application's lifecycle is occupied by some animations. In other words, constantly refreshing at the rate of 60Hz even if nothing is supposed to be updated is a waste of compute resources. 

The Animated Canvas resolves this problem by keeping track of when the canvas needs to be updated. During the period when no views are changing, the draw cycle stops. 

The draw cycle will start at the following instances,

- A new view is added to the canvas
- A new animation is added to a view
- The application requested a render by calling the ```requestRedraw``` function on the Animated Canvas

The draw cycle will persist in the following situations,

- An animation is running

The draw cycle will stop after the following instances,

- All animations are finished
- The application stopped the draw cycle by calling the ```stopDraw``` function on the Animated Canvas
- There are no views added to the Animated Canvas (e.g. initial canvas, all views are removed)

###### Refresh Rate

The Animated Canvas uses the ```window.requestAnimationFrame()``` API to rerender your views. This means that your views are guaranteed to update before the next browser repaint. As a result, the refresh rate is normally **60Hz** but "will generally match the display refresh rate in most web browsers as per W3C recommendation" according to [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). 

### View 

Views are the fundamental components of graphics on an Animated Canvas. A view can be a custom shape or an image, and it has basic graphical properties like size, position, z-index, and rotation angle. The Animated Canvas is a declarative library in the sense that changing the graphical properties of a view and requesting a render will result in an update in the view's appearance. 

###### Create a View

To create a view, you create a ```View``` object and provide initial graphical properties and an optional customized draw function.

```javascript
import { View } from 'animated-canvas';

const circleView = new View({
    position: {
        x: 100,
        y: 100,
    },
    size: {
        width: 20,
        height: 20,
    },
    angle: 0,
    zIndex: 3,
}, (context, canvasSize, { x, y }) => {
    context.fillStyle = 'red';
    context.arc(x + 10, y + 10, 10, 0, 2 * Math.PI);
    context.fill();
});
```

###### The ```draw``` Function

A ```draw``` function is a function that will be called by the Animated Canvas to render your view. You can utilize the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) to customize your views. It is important to notice that **a ```draw``` function does not have to be static**. Upon invoking your draw function, the Animated Canvas will pass in the following arguments,

- context: A ```CanvasRenderingContext2D``` object bound to the canvas DOM element.
- canvasSize: A ```Size``` object with a width and a height
- position: A ```Point``` object with an x and a y coordinate of the current view
- timestamp: A number representing the current timestamp (at the instance of rendering this view).

These arguments will give your draw function the necessary context to highly customize your view based on orientation (size & position) and time.

**Your ```draw``` function does not need to account for static transformations such as rotation.** The ```context``` object passed to your ```draw``` function is already transformed. In other words, draw your shapes in a portrait fashion.

###### Add View to Canvas

When you create a view, it is only an object containing information on how to render itself. It has no connection with the Animated Canvas. To have your view rendered on the Animated Canvas, you need to add the view to it. The ```addView``` function of the Animated Canvas is a simple way to add and render a view.

```javascript
import { AnimatedCanvas } from 'animated-canvas';

const animatedCanvas = new AnimatedCanvas(document.getElementById('my-canvas'));
animatedCanvas.addView(circleView);
```

The Animated Canvas stores your views in a sorted fashion by z-index. The ```addView``` function will use binary insertion so that the function's time complexity is reduced to ```O(log n)``` where ```n``` is the number of views. This creates performance enhancement as features such as overlapping views and hit tests will require your views to be sorted by z-index. 

###### User Interaction on a View

Currently a view only supports hit tests which means that your application can subscribe to an "on click" event. Hit tests are not penetrable, meaning that only the view with the greatest z-index will emit an "on click" event. Penetrable hit test and more user interactions (swipe, pan, long press, etc.) will be included in future releases. 

To subscribe to an "on click" event, provide a callback.

```javascript
circleView.onClick = (event) => {
    const { clientX, clientY } = event;
    console.log(`Circle clicked at (${clientX}, ${clientY}).`); // Circle clicked at (1, 2).
};
```

###### Shortcut Animations

Translation and Rotation are the two most common animations, so the ```View``` object has native support for them. Simply use the ```translate``` and ```rotate``` functions on a ```View``` object without having to create separate animations.

To translate a view, specify destination coordinates.

```javascript
circleView.translate(circleView.graphics.position.x + 50, circleView.graphics.position.y);
```

To rotate a view, specify destination angle in radians.

```javascript
rectView.rotateTo(rectView.graphics.angle + Math.PI / 4);
```



### Custom Animation

If simple animations like translation and rotation are not enough for your application, you can create custom animations and specify intermediate graphics up to the frame level. For example, you can incorporate two different movements in one animation and switch between them based on the animation progress. 

 To provide a smooth animation experience, Animated Canvas uses the good-old ```window.requestAnimationFrame()``` API of the browser to render each frame. On each render, the Animated Canvas will call your the animation's ```transform``` function. Your ```transform``` function is expected to modify the ```graphics``` argument in order to change the view's appearance. 

There are 2 ways to create a custom animation by modifying the ```transform``` function.

##### Extend the Animation Class

You can create a child class of ```Animation``` and override the ```transform``` function. Here's an example to recreate the ```Translation``` animation, 

```javascript
import { View, Animation } from 'animated-canvas';

class CustomTranslation extends Animation {
    constructor(srcX, destX, srcY, destY) {
        super()
        this.srcX = srcX;
        this.srcY = srcY;
        this.destX = destX;
        this.destY = destY;
    }
    transform = (graphics, { progress }) => {
        graphics.position.x = this.srcX + (this.destX - this.srcX) * progress;
        graphics.position.y = this.srcY + (this.destY - this.srcY) * progress;
    }
}

const myView = new View();
const myTranslation = new CustomTranslation(10, 20, 30, 40);
myView.addAnimation(myTranslation);
```

This method is extremely helpful in cases where your application will create multiple instances of the same customized animation.

##### Modify the ```transform``` Function Directly

You can also create an Animation object and just modify the ``` transform``` function.

```javascript
const srcX = 10, srcY = 30, destX = 20, destY = 40;
const myTranslation = new Animation();
myTranslation.transform = (graphics, { progress }) => {
    graphics.position.x = srcX + (destX - srcX) * progress
    graphics.position.y = srcY - (destY - srcY) * progress
}
```

Or you can pass your ```transform``` function in the ```config``` object when creating the ```Animation``` object.

```javascript
const srcX = 10, srcY = 30, destX = 20, destY = 40;
const myTranslation = new Animation({
    transform: (graphics, { progress }) => {
        graphics.position.x = srcX + (destX - srcX) * progress
        graphics.position.y = srcY - (destY - srcY) * progress
    }
});
```



### Canvas & Animation Lifecycle

Animated Canvas gives you control over the entire lifecycle of an animation. This is the lifecycle flow when your application adds a view to the canvas and assigns it an animation. 



![lifecycle](https://i.ibb.co/K6Wbmzc/lifecycle.png)



Upon each phase of the lifecycle, the Animated Canvas and the Animation will emit an event. To subscribe to the event, you can use the standard ```EventEmitter``` API.

```javascript
import { AnimatedCanvas, CanvasEvent } from 'animated-canvas';

const animatedCanvas = new AnimatedCanvas(document.getElementById('my-canvas'));
animatedCanvas.on(CanvasEvent.DID_STOP_DRAW, () => console.log('did stop view'));
```



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License

Animated-canvas is [MIT Licensed](https://github.com/peterkejun/Animated-Canvas/blob/master/LICENSE).

