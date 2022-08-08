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

const secondaryDisplay = document.getElementById('secondary-display');
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
const deleteButton = document.getElementById('delete-btn');

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
deleteButton.addEventListener('click', () => pressDelete());
window.addEventListener('keydown', (key) => handleKeyboardInput(key));


// Declaring functions for button presses

function pressNumber(number) {
    if (lastPressed === '=') {
        return;
    }
    if (displayValue[0] === '0' && !displayValue.includes('.')) {
        displayValue = displayValue.substring(1);
    }
    displayValue = displayValue.concat(number);
    updateDisplay();
    lastPressed = '';
}

function pressOperator(operator) {
    if (lastPressed === operator) {
        return;
    }
    if (lastPressed === '+' || lastPressed === '-' || lastPressed === '*' || lastPressed === '/') {
        currentOperator = operator;
        secondaryDisplayContent = secondaryDisplayContent.substring(0, (secondaryDisplayContent.length - 2));
        updateSecondaryDisplay('', operator);
        return;
    }
    if (!firstOperand) {
        currentOperator = operator;
        if (displayValue !== '0') {
            firstOperand = displayValue;
            updateSecondaryDisplay(displayValue, operator)
        }
    } else {
        secondOperand = displayValue;
        updateSecondaryDisplay(displayValue, operator)
        solution = operate(currentOperator, firstOperand, secondOperand);
        displayValue = String(solution);
        updateDisplay();
        firstOperand = solution;
        currentOperator = operator;
    }
    solution = null;
    lastPressed = operator;
    displayValue = '0';
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
    updateSecondaryDisplay(displayValue, '=')
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
    secondaryDisplayContent = '';
    secondaryDisplay.textContent = '';
}

function pressDecimal() {
    if (!displayValue.includes('.')) {
        displayValue = displayValue.concat('.');
        updateDisplay();
        lastPressed = '';
    }
}

function pressDelete() {
    if (lastPressed === '=') {
        return;
    }
    if (displayValue.length === 1) {
        displayValue = '0';
    } else {
        displayValue = displayValue.substring(0, (displayValue.length - 1));
    }
    updateDisplay();
    lastPressed = '';
}

// Declaring function for keyboard support

function handleKeyboardInput(pressedKey) {
    if (pressedKey.key >= 0 && pressedKey.key <= 9) {
        pressNumber(pressedKey.key);
    }
    if (pressedKey.key === '+' ||
        pressedKey.key === '-' ||
        pressedKey.key === '*' ||
        pressedKey.key === '/') {
            pressOperator(pressedKey.key);
        }
    if (pressedKey.key === 'Enter') {
        pressEqual();
    }
    if (pressedKey.key === 'Escape') {
        pressClear();
    }
    if (pressedKey.key === '.') {
        pressDecimal();
    }
    if (pressedKey.key === 'Backspace') {
        pressDelete();
    }
}

// Declaring functions for populating the displays

function updateDisplay() {
    display.textContent = displayValue;
}

function updateSecondaryDisplay(numberContent, operatorContent) {
    if (lastPressed === '=') {
        secondaryDisplayContent = '';
        secondaryDisplay.textContent = '';
    }
    secondaryDisplayContent = secondaryDisplayContent.concat(`${numberContent} ${operatorContent} `);
    secondaryDisplay.textContent = secondaryDisplayContent;
}

// Initializing variables

let displayValue = '0';
let currentOperator = '';
let firstOperand = '';
let secondOperand = '';
let solution = null;
let lastPressed = '';
let secondaryDisplayContent = '';

updateDisplay();