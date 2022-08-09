class InputManager {

    constructor() {
        this.callbacks = {};
    }

    subscribe(key, callback) {
        if (! this.callbacks[key]) this.callbacks[key] = [];
        this.callbacks[key].push(callback)
    }

    call(key) {
        if (this.callbacks[key])
            for (const f of this.callbacks[key])
                f()
    }
}

class Input {

    static keydown = new InputManager
    static keyup = new InputManager

    static init() {
        window.onkeydown = e => {
            this.keydown.call(e.key);
        }
        window.onkeyup = e => {
            this.keyup.call(e.key);
        }
    }
}


export { Input }
