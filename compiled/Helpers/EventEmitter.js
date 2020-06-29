var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        var _this = this;
        // add a callback for an type
        // O(1)
        this.on = function (type, cb) {
            // get list of cb of type
            var observer = _this.observers.get(type);
            // add cb to list if list exists
            if (observer)
                observer.push(cb);
            // initialize list with [cb]
            else
                _this.observers.set(type, [cb]);
        };
        // remove a callback for an type
        // O(n) { n: # callbacks }
        this.remove = function (type, cb) {
            // get list of cb of type;
            var observer = _this.observers.get(type);
            // return if no such list exists
            if (!observer)
                return;
            // find cb in list
            for (var i = 0; i < observer.length; i++) {
                // matching cb
                if (observer[i] === cb) {
                    // remove cb from list
                    observer.splice(i, 1);
                    return;
                }
            }
        };
        // emit an event for type with arguments
        // O(n) { n: # callbacks }
        this.emit = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            // get list of cb of type
            var observer = _this.observers.get(type);
            // return if no such list exist
            if (!observer)
                return;
            // call each cb with arguments
            for (var i = 0; i < observer.length; i++) {
                observer[i].apply(observer, args);
            }
        };
        // map of observers
        // string type => list of callbacks
        this.observers = new Map();
    }
    return EventEmitter;
}());
export default EventEmitter;
