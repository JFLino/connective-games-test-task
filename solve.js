import Display from './display.js';
import Memory from './memory.js';

export default class Solve {
    constructor(displayEl, memoryDisplay) {
        this.display = new Display(displayEl);
        this.memory = new Memory(memoryDisplay);
        this.MAX_BEFORE_DOT = 12;
        this.MAX_AFTER_DOT = 8;
    }

    handler(operation) {
        try {
            if (operation.match(/^\d$/)) this._digitsHandler(operation);
            else if (operation.match(/^[\+\-\*\/]$/)) this._operationSymbolsHandler(operation);
            else if (operation.match(/^C|AC|D|Rvt|=$/)) this._nonWritableSymbolsHandler(operation);
            else if (operation.match(/^[\.\(\)]$/)) this._specialSymbolsHandler(operation);
            else if (operation.match(/^MC|MS|MR|M+|M-$/)) this._memorySymbolsHandler(operation);
        } catch (error) {
            console.log("Неверное выражение")
        }
    }

    _digitsHandler(symbol) {
        if (!this.display.get().match(/[\d\-\+\/\*\.\(]$/)) return;

        let displayValue = this.display.get();

        let match = displayValue.match(/[\d\.]+$/);
        let beforeDot = displayValue.match(/(\d+)(\.\d+)?$/);
        let afterDot = displayValue.match(/\.(\d+)$/);

        if (match && match[0] == '0') displayValue = displayValue.slice(0, displayValue.length - 1) + symbol;
        else if (!beforeDot || (beforeDot[1].length < this.MAX_BEFORE_DOT && !afterDot)) displayValue = displayValue + symbol;
        else if ((beforeDot[1].length <= this.MAX_BEFORE_DOT && afterDot && afterDot[1].length < this.MAX_AFTER_DOT)) displayValue = displayValue + symbol;

        this.display.set(displayValue);
    }

    _operationSymbolsHandler(symbol) {
        let displayValue = this.display.get();

        if (symbol == '-' && displayValue.match(/\($/)) {
            displayValue = displayValue + '0' + symbol;
        } else if (displayValue.match(/[\d)]$/)) {
            displayValue = displayValue + symbol;
        }

        this.display.set(displayValue);
    }

    _nonWritableSymbolsHandler(symbol) {
        if (symbol == '=') {
            let displayValue = this.display.get();
            this.display.setPrevious(displayValue);
            let result = eval(displayValue);

            if (result < (Math.pow(10, this.MAX_BEFORE_DOT) - 1)) {
                let digits = result.toString().split('.');

                if (digits[1] == undefined || digits[1].length <= this.MAX_AFTER_DOT) this.display.set(result.toString());
                else if (digits[1].length > this.MAX_AFTER_DOT) this.display.set(parseInt(result) + '.' + digits[1].slice(0, 8));

            } else this.display.set("Overflow");
        } else if (symbol == 'C') {
            this.display.clear();
        } else if (symbol == 'D') this.display.clearLast();
        else if (symbol == 'AC') {
            this.display.clear();
            this.memory.clear();
        } else if (symbol == 'Rvt') this.display.set(this.display.getPrevious());
    }

    _specialSymbolsHandler(symbol) {
        let displayValue = this.display.get();

        switch (symbol) {
            case '(':
                if (displayValue.match(/[(\/\.\+\*-]$/)) displayValue = displayValue + symbol;
                else if (displayValue.match(/^0$/)) displayValue = symbol;
                break;
            case ')':
                let oBrackets = displayValue.match(/\(/g);
                let cBrackets = displayValue.match(/\)/g);
                if (displayValue.match(/[\d]$/) && oBrackets && (!cBrackets || (oBrackets.length > cBrackets.length)))
                    displayValue = displayValue + symbol;
                break;
            case '.':
                if (displayValue.match(/[\d]$/) && displayValue.match(/\d+\.\d*$/) == null) displayValue = displayValue + symbol;
                break;
        }

        this.display.set(displayValue);
    }

    _memorySymbolsHandler(symbol) {
        let displayValue = this.display.get();
        let value = displayValue.match(/[\d\.]+$/);

        if (symbol == 'MS' && value) this.memory.set(Number(value[0]));
        else if (symbol == 'MC') this.memory.clear();
        else if (symbol == 'MR') {
            if (this.display.get().match(/[\d\-\+\/\*\.\(]$/))
                this.display.set(this.display.get() + this.memory.get().toString());
        } else if (symbol == 'M+' && value) this.memory.set(this.memory.get() + Number(value[0]));
        else if (symbol == 'M-' && value) this.memory.set(this.memory.get() - Number(value[0]));
    }

}