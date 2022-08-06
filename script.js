// Declaring functions for mathematical operations

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+' :
            return add(a, b);
            break;
        case '-' :
            return subtract(a, b);
            break;
        case '*' :
            return multiply(a, b);
            break;
        case '/' :
            return divide(a, b);
            break;
        default :
            return null;
    }
}

// Grabbing HTML elements

const display = document.getElementById('display');
const zeroButton = document.getElementById('zero-btn');
const oneButton = document.getElementById('one-btn');
const twoButton = document.getElementById('two-btn');
const threeButton = document.getElementById('three-btn');
const fourButton = document.getElementById('four-btn');
const fiveButton = document.getElementById('five-btn');
const sixButton = document.getElementById('six-btn');
const sevenButton = document.getElementById('seven-btn');
const eightButton = document.getElementById('eight-btn');
const nineButton = document.getElementById('nine-btn');
const addButton = document.getElementById('add-btn');
const subtractButton = document.getElementById('subtract-btn');
const multiplyButton = document.getElementById('multiply-btn');
const divideButton = document.getElementById('divide-btn');
const equalButton = document.getElementById('equal-btn');
const clearButton = document.getElementById('clear-btn');

// Setting up EventListeners

zeroButton.addEventListener('click', () => pressNumber('0'));
oneButton.addEventListener('click', () => pressNumber('1'));
twoButton.addEventListener('click', () => pressNumber('2'));
threeButton.addEventListener('click', () => pressNumber('3'));
fourButton.addEventListener('click', () => pressNumber('4'));
fiveButton.addEventListener('click', () => pressNumber('5'));
sixButton.addEventListener('click', () => pressNumber('6'));
sevenButton.addEventListener('click', () => pressNumber('7'));
eightButton.addEventListener('click', () => pressNumber('8'));
nineButton.addEventListener('click', () => pressNumber('9'));
addButton.addEventListener('click', () => pressOperator('+'));
subtractButton.addEventListener('click', () => pressOperator('-'));
multiplyButton.addEventListener('click', () => pressOperator('*'));
divideButton.addEventListener('click', () => pressOperator('/'));
equalButton.addEventListener('click', () => pressEqual());
clearButton.addEventListener('click', () => pressClear());

// Declaring functions for button presses

function pressNumber(number) {
    if (displayValue[0] === '0' && !displayValue.includes('.')) {
        displayValue = displayValue.substring(1);
    }
    displayValue = displayValue.concat(number);
    display.textContent = displayValue;
}

function pressOperator(operator) {
    if (!firstOperand) {
        currentOperator = operator;
        if (displayValue !== '') {
            firstOperand = displayValue;
            displayValue = '';
        }
    } else {
        secondOperand = displayValue;
        solution = operate(currentOperator, firstOperand, secondOperand);
        displayValue = String(solution);
        display.textContent = displayValue;
        firstOperand = solution;
        displayValue = '';
        currentOperator = operator;
    }
    solution = null;
}

function pressEqual() {
    if (solution || !firstOperand) {
        return;
    }
    secondOperand = displayValue;
    solution = operate(currentOperator, firstOperand, secondOperand);
    displayValue = String(solution);
    display.textContent = displayValue;
}

function pressClear() {
    displayValue = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperator = '';
    display.textContent = displayValue;
}

// Initializing variables

let displayValue = '0';
let currentOperator = '';
let firstOperand = '';
let secondOperand = '';
let solution = null;

display.textContent = displayValue;