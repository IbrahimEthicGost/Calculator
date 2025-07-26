const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalButton = document.querySelector('.equal');
const deleteButton = document.querySelector('.delete');
const clearButton = document.querySelector('.clear');
const prevDisplay = document.querySelector('.prev-display');
const currDisplay = document.querySelector('.curr-display');

let currentOperand = '';
let previousOperand = '';
let operation = null;

function updateDisplay() {
    currDisplay.textContent = currentOperand;
    prevDisplay.textContent = operation ? `${previousOperand} ${operation}` : '';
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number;
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let result;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                result = 'Erreur';
                break;
            }
            result = prev / curr;
            break;
        default:
            return;
    }

    currentOperand = result.toString();
    operation = null;
    previousOperand = '';
    updateDisplay();
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function del() {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
}

// Événements
numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => chooseOperation(button.textContent));
});

equalButton.addEventListener('click', compute);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);

// Affichage initial
updateDisplay();
