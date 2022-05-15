export default class Memory {
    constructor(display) {
        this.memory = 0;
        this.display = display;
        this.clear();
    }

    set(number) {
        this.memory = number;
        if (this.display) this.display.innerHTML = "Memory: " + this.memory.toString();
    }

    get() {
        return this.memory;
    }

    clear() {
        this.set(0);
    }
}