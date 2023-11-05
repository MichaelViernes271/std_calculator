/**
 * Calculator App
 *
 * This JavaScript file defines a calculator class and handles user interactions
 * to perform basic arithmetic calculations, convert numbers to binary, and manage memory.
 *
 * Author: Viernes, Michael
 * Date: 05/11/2023
 */

/**
 * Calculator Class
 *
 * This class represents a simple calculator with basic arithmetic operations,
 * decimal-to-binary conversion, and memory functionality.
 */
class Calculator {
   /**
   * Constructor for the Calculator class.
   *
   * @param {HTMLElement} previousOperandTextElement - The element displaying the previous operand.
   * @param {HTMLElement} currentOperandTextElement - The element displaying the current operand.
   */
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement // Previous numerical value on the display
    this.currentOperandTextElement = currentOperandTextElement // Current number in the display
    this.memory = 0; // Initialize memory to 0
    this.clear()
  }

  /**
   * Clear the calculator's state, including current and previous operands, operation, and memory.
   */
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    this.memory = 0
  }

  /**
   * Delete the last character from the current operand.
   */
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  /**
   * Append a number or decimal point to the current operand.
   *
   * @param {string} number - The number or decimal point to append.
   */
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  /**
   * Set the chosen operation for the calculator.
   *
   * @param {string} operation - The operation symbol (+, -, *, ÷).
   */
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

   /**
   * Perform the calculation based on the chosen operation.
   */
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

   /**
   * Convert the current operand from decimal to binary.
   */
  convertToBinary() {
    const currentValue = parseFloat(this.currentOperand);
    if (!isNaN(currentValue)) {
      this.currentOperand = currentValue.toString(2);
    }
  }

  /**
   * Add the current operand to the calculator's memory.
   */
  addToMemory() {
    const currentValue = parseFloat(this.currentOperand);
    if (!isNaN(currentValue)) {
      this.memory += currentValue;
      this.currentOperand = this.memory;
    }
  }

  /**
   * Subtract the current operand from the calculator's memory.
   */
  subtractFromMemory() {
    const currentValue = parseFloat(this.currentOperand);
    if (!isNaN(currentValue)) {
      this.memory -= currentValue;
      this.currentOperand = this.memory;
    }
  }

  /**
 * Get Display Number
 *
 * Formats a number for display in the calculator's output, ensuring proper thousands separators.
 *
 * @param {number} number - The number to format for display.
 * @returns {string} - The formatted number for display.
 */
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      // Format integer part with thousands separators for readability.
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  /**
   * Update the display elements to show the current and previous operands.
   */
  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


// Query various button elements in the HTML for user interactions.
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const binConvertButton = document.querySelector('[data-convert-binary]')
const mPlusButton = document.querySelector('[data-m-plus]')
const mMinusButton = document.querySelector('[data-m-minus]')

// Instantiate a calculator Object.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Event listeners for number buttons.
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Handle a click on a number button by appending the number to the current operand.
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

// Event listeners for operation buttons.
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Handle a click on an operation button by setting the chosen operation.
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  // Handle a click on the equals button by performing the calculation and updating the display.
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  // Handle a click on the all-clear button by resetting the calculator's state and updating the display.
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  // Handle a click on the delete button by removing the last character from the current operand and updating the display.
  calculator.delete()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
   // Handle a click on the binary conversion button by converting the current operand to binary and updating the display.
  calculator.delete()
  calculator.updateDisplay()
})

binConvertButton.addEventListener('click', button => {
  // Handle binary conversion here
  calculator.convertToBinary(); 
  calculator.updateDisplay();
});

mPlusButton.addEventListener('click', button => {
  // Handle Memory Add (M+) here
  calculator.addToMemory(); 
  calculator.updateDisplay();
});

mMinusButton.addEventListener('click', button => {
  // Handle Memory Subtract (M-) here
  calculator.subtractFromMemory(); 
  calculator.updateDisplay();
});