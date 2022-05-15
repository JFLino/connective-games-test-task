export default class Display {
    constructor(displayEl) {
        this.display = displayEl;
        this.DEFAULT_VALUE = '0';
        this.MAX_LENGTH = 25;
        this.current = this.DEFAULT_VALUE;
        this.previousValue = this.DEFAULT_VALUE;
    }

    get() {
        return this.current;
    }

    set(value) {
        if (value.length < this.MAX_LENGTH) {
            this.current = value;
            if (this.display) this.display.innerHTML = this.current;
        } else {
            console.log("Слишком большое выражение");
        }
    }

    clear() {
        this.set(this.DEFAULT_VALUE);
    }

    clearLast() {
        let value = this.get();

        if (value.length == 1) this.clear();
        else this.set(value.slice(0, value.length - 1));
    }

    setPrevious(value) {
        this.previousValue = value;
    }
    getPrevious() {
        return this.previousValue;
    }
}