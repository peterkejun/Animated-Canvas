import Animation from '../Animations/Animation.js';
import Translation from '../Animations/Translation.js';
import Rotation from '../Animations/Rotation.js';
;
;
var View = /** @class */ (function () {
    function View(x, y, draw) {
        var _this = this;
        this.addAnimation = function (animation) {
            // must be of type Animation
            if (!(animation instanceof Animation)) {
                throw new Error("Animation added to view must be of type Animation or any of its subclasses.");
            }
            // add animation
            _this.animations.add(animation);
        };
        this.hasAnimations = function () { return _this.animations.size !== 0; };
        this.masterDraw = function (context, timestamp, canvasWidth, canvasHeight) {
            _this.timestamp = timestamp;
            _this.animations.forEach(function (animation) {
                animation.transform(timestamp, _this.graphics);
                if (animation.isFinished) {
                    _this.animations.delete(animation);
                }
            });
            context.save();
            context.translate(_this.graphics.x, _this.graphics.y);
            context.rotate(_this.graphics.angle);
            context.translate(-_this.graphics.x, -_this.graphics.y);
            context.beginPath();
            _this.draw(context, canvasWidth, canvasHeight, _this.graphics.x, _this.graphics.y, timestamp);
            context.closePath();
            context.restore();
        };
        this.setX = function (x) {
            if (!x)
                return;
            _this.graphics.x = x;
            _this.delegate.requestRedraw();
        };
        this.setY = function (y) {
            if (!y)
                return;
            _this.graphics.y = y;
            if (_this.delegate)
                _this.delegate.requestRedraw();
        };
        this.setXY = function (x, y) {
            if (!x || !y)
                return;
            _this.graphics.x = x;
            _this.graphics.y = y;
            if (_this.delegate)
                _this.delegate.requestRedraw();
        };
        this.setAngle = function (angle) {
            _this.graphics.angle = angle;
            if (_this.delegate)
                _this.delegate.requestRedraw();
        };
        this.setAngleInDeg = function (degAngle) {
            _this.setAngle(degAngle * Math.PI / 180);
        };
        this.translate = function (x, y, timingFunction) {
            var translation = new Translation(_this.graphics.x, _this.graphics.y, x, y);
            if (timingFunction)
                translation.setTimingFunction(timingFunction);
            _this.addAnimation(translation);
            console.log("new translation to " + x + ", " + y);
            if (_this.delegate) {
                _this.delegate.requestRedraw();
            }
        };
        this.rotateTo = function (angle, timingFunction) {
            var rotation = new Rotation(_this.graphics.angle, angle);
            if (timingFunction)
                rotation.setTimingFunction(timingFunction);
            _this.addAnimation(rotation);
            console.log("new rotation to angle " + angle);
            if (_this.delegate) {
                _this.delegate.requestRedraw();
            }
        };
        this.graphics = {
            x: x,
            y: y,
            angle: 0,
        };
        this.draw = draw;
        this.animationDuration = 500;
        this.delegate = null;
        this.animations = new Set();
    }
    return View;
}());
export default View;
