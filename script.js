import Solve from './solve.js';

const display = document.querySelector("#display_screen");
const buttons = document.querySelectorAll(".buttons button");
const memoryDisplay = document.querySelector("#memory_display");

let solve = new Solve(display, memoryDisplay);

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (e) {
        solve.handler(e.target.innerHTML);
    });
}