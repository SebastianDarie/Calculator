class Calculator {
    constructor(prevOperandText, currOperandText) {
        this.prevOperandText = prevOperandText
        this.currOperandText = currOperandText
        this.reset = false
        this.clear()
    }

    clear() {
        this.prevOperand = ''
        this.currOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNum(number) {
        if(number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currOperand === '') return
        if(this.prevOperand !== '') {
            this.operate()
        }
        
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    operate() {
        let calculation
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(curr)) return

        switch (this.operation) {
            case '+':
                calculation = Math.round(100 * (prev + curr)) / 100
                break
            case '-':
                calculation = Math.round(100 * (prev - curr)) / 100
                break
            case '*':
                calculation = Math.round(100 * (prev * curr)) / 100
                break
            case '÷': 
                calculation = Math.round(100 * (prev / curr)) / 100
                break
            case '%':
                calculation = Math.round(100 * (prev % curr)) / 100
                break
            case '**':
                calculation = Math.round(10 * Math.pow(prev, curr)) / 10
                break
            default:
                return
        }

        this.reset = true
        this.currOperand = calculation
        this.operation = undefined
        this.prevOperand = ''
    }

    getDisplayNum(num) {
        const strNum = num.toString()
        const intDigits = parseFloat(strNum.split('.')[0])
        const decimalDigits = strNum.split('.')[1]
        let intDisplay
        if(isNaN(intDigits)) {
            intDisplay = ''
        } else {
            intDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`
        } else {
            return intDisplay
        }
    }

    updateDisplay() {
        this.currOperandText.innerText = this.getDisplayNum(this.currOperand)
        if(this.operation != null) {
            this.prevOperandText.innerText = `${this.getDisplayNum(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperandText.innerText = ''
        }
    }
}

const numBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const clearBtn = document.querySelector('[data-clear]')
const delBtn = document.querySelector('[data-delete]')
const equalBtn = document.querySelector('[data-equal]')
const prevOperandText  = document.querySelector('[data-prev-operand]')
const currOperandText  = document.querySelector('[data-curr-operand]')

const calculator = new Calculator(prevOperandText, currOperandText)

numBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        if(calculator.prevOperand === '' && calculator.currOperand !== '' && calculator.reset) {
            calculator.currOperand = ''
            calculator.reset = false
        }

        calculator.appendNum(btn.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

clearBtn.addEventListener('click', e => {
    calculator.clear()
    calculator.updateDisplay()
})

delBtn.addEventListener('click', e => {
    calculator.delete()
    calculator.updateDisplay()
})

equalBtn.addEventListener('click', e => {
    calculator.operate()
    calculator.updateDisplay()
})