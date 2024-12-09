/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/

const buttons = document.querySelectorAll('.button');
const display = document.querySelector(".display");

let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const value = event.target.innerText;
        if (!isNaN(value)) {
            currentInput += value;
            updateDisplay(currentInput);
        } else if (value === "C") {
            clearCalculator();
        } else if (value === "=") {
            calculateResult();
        } else {
            if (currentInput) {
                if (previousInput && operator) {
                    calculateResult();
                }
                operator = value;
                previousInput = currentInput;
                currentInput = "";
            }
        }
    });
});

function updateDisplay(value) {
    display.innerText = value || "0";
}

function clearCalculator() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("");
}

function calculateResult() {
    if (previousInput && currentInput && operator) {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result;
        const operations = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => (b !== 0 ? a / b : "error"),
        };

        result = operations[operator](num1, num2);
        updateDisplay(result);
        currentInput = result.toString();
        previousInput = "";
        operator = "";
    }
}
