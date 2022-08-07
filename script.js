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
        case '-' :
            return subtract(a, b);
        case '*' :
            return multiply(a, b);
        case '/' :
            if (b === 0) {
                alert('Can\'t divide with zero!');
                return a;
            }
            return divide(a, b);
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
const decimalButton = document.getElementById('decimal-btn');

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
decimalButton.addEventListener('click', () => pressDecimal());

// Declaring functions for button presses

function pressNumber(number) {
    if (displayValue[0] === '0' && !displayValue.includes('.')) {
        displayValue = displayValue.substring(1);
    }
    displayValue = displayValue.concat(number);
    updateDisplay();
    lastPressed = '';
}

function pressOperator(operator) {
    // console.log(`LastPressed: ${lastPressed} - operator: ${operator}`);
    if (lastPressed === operator) {
        return;
    }
    if (lastPressed === '+' || lastPressed === '-' || lastPressed === '*' || lastPressed === '/') {
        currentOperator = operator;
        return;
    }
    if (!firstOperand) {
        currentOperator = operator;
        if (displayValue !== '0') {
            firstOperand = displayValue;
            displayValue = '0';
        }
    } else {
        secondOperand = displayValue;
        solution = operate(currentOperator, firstOperand, secondOperand);
        displayValue = String(solution);
        updateDisplay();
        firstOperand = solution;
        displayValue = '0';
        currentOperator = operator;
    }
    solution = null;
    lastPressed = operator;
}

function pressEqual() {
    if (solution || !firstOperand) {
        return;
    }
    if (lastPressed === '+' || lastPressed === '-' || lastPressed === '*' || lastPressed === '/' || lastPressed === '=') {
        return; 
    }
    secondOperand = displayValue;
    solution = operate(currentOperator, firstOperand, secondOperand);
    displayValue = String(solution);
    updateDisplay();
    firstOperand = '';
    currentOperator = '';
    lastPressed = '=';
}

function pressClear() {
    displayValue = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperator = '';
    updateDisplay();
    lastPressed = '';
}

function pressDecimal() {
    if (!displayValue.includes('.')) {
        displayValue = displayValue.concat('.');
        updateDisplay();
        lastPressed = '';
    }
}

function updateDisplay() {
    // if (displayValue[0] !== '0') {
    //     roundedDisplay = String(Math.round(Number(displayValue) * 1000000) / 1000000);
    // } else {
    //     roundedDisplay = displayValue;
    // }
    // if (roundedDisplay.length > 9) {
    //     scientificDisplay = String(Number(roundedDisplay).toExponential());
    //     display.textContent = scientificDisplay.substring(0, 5) + 
    //         scientificDisplay.substring(scientificDisplay.indexOf('e'));
    // } else {
    //     display.textContent = roundedDisplay;
    // }
    // display.textContent = String(Math.round(Number(displayValue) * 1000000) / 1000000);
    display.textContent = displayValue;
    // console.log(`${displayValue} / ${displayValue.length} / ${scientificDisplay}`);
}

// Initializing variables

let displayValue = '0';
let currentOperator = '';
let firstOperand = '';
let secondOperand = '';
let solution = null;
let lastPressed = '';
// let scientificDisplay;
// let roundedDisplay;

updateDisplay();