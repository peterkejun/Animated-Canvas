class EventEmitter {
    constructor() {
        // map of observers
        // string type => list of callbacks
        this.observers = new Map();
    }

    // add a callback for an type
    // O(1)
    on = (type, cb) => {
        // get list of cb of type
        const observer = this.observers.get(type);
        // add cb to list if list exists
        if (observer) observer.push(cb);
        // initialize list with [cb]
        else this.observers.set(type, [cb]);
    }

    // remove a callback for an type
    // O(n) { n: # callbacks }
    remove = (type, cb) => {
        // get list of cb of type;
        const observer = this.observers.get(type);
        // return if no such list exists
        if (!observer) return;
        // find cb in list
        for (let i = 0; i < observer.length; i++) {
            // matching cb
            if (observer[i] === cb) {
                // remove cb from list
                observer.splice(i, 1);
                return;
            }
        }
    }

    // emit an event for type with arguments
    // O(n) { n: # callbacks }
    emit = (type, ...args) => {
        // get list of cb of type
        const observer = this.observers.get(type);
        // return if no such list exist
        if (!observer) return;
        // call each cb with arguments
        for (let i = 0; i < observer.length; i++) {
            observer[i](...args);
        }
    }

}

export default EventEmitter;