/*
Timing Functions take in percentage time and return percentage progress.
e.g. progress = LINEAR(timeElasped / totalDuration);
*/
var TimingFunction = /** @class */ (function () {
    function TimingFunction(name, apply) {
        this.name = name;
        this.apply = apply;
    }
    return TimingFunction;
}());
export { TimingFunction };
;
// linear
export var LINEAR = new TimingFunction('linear', function (pt) { return pt; });
// trigonometric
export var EASE_IN_SINE = new TimingFunction('ease in sine', function (pt) { return 1 - Math.cos((pt * Math.PI) / 2); });
export var EASE_OUT_SINE = new TimingFunction('ease out sine', function (pt) { return Math.sin((pt * Math.PI) / 2); });
export var EASE_IN_OUT_SINE = new TimingFunction('ease in out sine', function (pt) { return -(Math.cos(Math.PI * pt) - 1) / 2; });
// quadratic
export var EASE_IN_QUAD = new TimingFunction('ease in quad', function (pt) { return pt * pt; });
export var EASE_OUT_QUAD = new TimingFunction('ease out quad', function (pt) { return 1 - (1 - pt) * (1 - pt); });
export var EASE_IN_OUT_QUAD = new TimingFunction('ease in out quad', function (pt) {
    return pt < 0.5 ? 2 * pt * pt : 1 - Math.pow((-2 * pt + 2), 2) / 2;
});
// cubic
export var EASE_IN_CUBIC = new TimingFunction('ease in cubic', function (pt) { return pt * pt * pt; });
export var EASE_OUT_CUBIC = new TimingFunction('ease out cubic', function (pt) { return 1 - Math.pow((1 - pt), 3); });
export var EASE_IN_OUT_CUBIC = new TimingFunction('ease in out cubic', function (pt) {
    return pt < 0.5 ? 4 * pt * pt * pt : 1 - Math.pow((-2 * pt + 2), 3) / 2;
});
// exponential
export var EASE_IN_EXPO = new TimingFunction('ease in exponential', function (pt) { return (pt === 0 ? 0 : Math.pow(2, (10 * pt - 10))); });
export var EASE_OUT_EXPO = new TimingFunction('ease out exponential', function (pt) { return (pt === 1 ? 1 : 1 - Math.pow(2, (-10 * pt))); });
export var EASE_IN_OUT_EXPO = new TimingFunction('ease in out exponential', function (pt) {
    if (pt === 0)
        return 0;
    if (pt === 1)
        return 1;
    if (pt === 0.5)
        return Math.pow(2, (20 * pt - 10)) / 2;
    return (2 - Math.pow(2, (-20 * pt + 10))) / 2;
});
// circular
export var EASE_IN_CIRC = new TimingFunction('ease in circular', function (pt) { return 1 - Math.sqrt(1 - pt * pt); });
export var EASE_OUT_CIRC = new TimingFunction('ease out exponential', function (pt) { return Math.sqrt(1 - (pt - 1) * (pt - 1)); });
export var EASE_IN_OUT_CIRC = new TimingFunction('ease in out exponential', function (pt) {
    if (pt < 0.5)
        return (1 - Math.sqrt(1 - 4 * pt * pt)) / 2;
    return (Math.sqrt(1 - Math.pow((-2 * pt + 2), 2)) + 1) / 2;
});
// back
export var EASE_IN_BACK = new TimingFunction('ease in back', function (pt) { return 2.70158 * pt * pt * pt - 1.70158 * pt * pt; });
export var EASE_OUT_BACK = new TimingFunction('ease out back', function (pt) {
    return 1 + 2.70158 * Math.pow((pt - 1), 3) + 1.70158 * Math.pow((pt - 1), 2);
});
export var EASE_IN_OUT_BACK = new TimingFunction('ease in out back', function (pt) {
    var c1 = 1.70158;
    var c2 = c1 * 1.525;
    if (pt < 0.5)
        return (Math.pow((2 * pt), 2) * ((c2 + 1) * 2 * pt - c2)) / 2;
    return (Math.pow((2 * pt - 2), 2) * ((c2 + 1) * (pt * 2 - 2) + c2) + 2) / 2;
});
// reverse
export var reverse = function (progress) { return 1 - progress; };
