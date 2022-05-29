const OPERATOR_SIGNS = {
  equals: '=',
  plus: '+',
  minus: '-',
  times: '×',
  divide: '÷',
};

const OPERATORS = new Set(Object.keys(OPERATOR_SIGNS));

const NUMBER_SIGNS = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  zero: '0',
};

const NUMBERS = new Set(Object.keys(NUMBER_SIGNS));

const CALCULATOR_FUNCTIONS = {
  getPower(first, second) {
    const firstPower = first.includes('.') ? first.split('.')[1].length : 1;
    const secondPower = second.includes('.') ? first.split('.')[1].length : 1;

    const power = 10 ** Math.max(firstPower, secondPower);
    const firstPowered = parseFloat(first) * power;
    const secondPowered = parseFloat(second) * power;

    return [firstPowered, secondPowered, power];
  },
  plus(first, second) {
    const [firstPowered, secondPowered, power] = this.getPower(first, second);

    return (firstPowered + secondPowered) / power;
  },
  minus(first, second) {
    const [firstPowered, secondPowered, power] = this.getPower(first, second);

    return (firstPowered - secondPowered) / power;
  },
  times(first, second) {
    return parseFloat(first) * parseFloat(second);
  },
  divide(first, second) {
    const firstOperand = parseFloat(first);

    if (firstOperand === 0) {
      return 'error';
    }

    return parseFloat(first) / parseFloat(second);
  },
};

const DECIMAL_PLACES = 10 ** 8;

export default class Calculator {
  #eventBus;
  #handleKeyboardClickBound;
  #currentIndex;
  #expression;
  #result;
  #operations;
  #lastOperator;
  #lastNumber;
  #isError;

  constructor(eventBus) {
    this.#eventBus = eventBus;

    this.#handleKeyboardClickBound = this.#handleKeyboardClick.bind(this);
    this.#reset();
    this.#operations = CALCULATOR_FUNCTIONS;
    this.#isError = false;
  }

  init() {
    this.#eventBus.subscribe(
      this.#eventBus.keyboard,
      this.#handleKeyboardClickBound,
    );
  }

  #handleKeyboardClick(event) {
    const { type, value } = event.detail;

    if (this.#currentIndex === -1 && value !== 'equals') {
      this.#currentIndex = 0;
    }

    if (this.#isError && value !== 'equals') {
      this.#reset();
      this.#isError = false;
    }

    switch (type) {
      case 'number':
        this.#handleNumber(value);
        break;

      case 'operator':
        this.#handleOperator(value);
        break;

      case 'modifier':
        this.#handleModifier(value);
        break;

      case 'control':
        this.#handleControl(value);
        break;

      case 'swap':
        this.#handleSwap(value);
        break;

      default:
        break;
    }
  }

  #runCalculation() {
    this.#result = this.#expression.reduce((result, value, index, arr) => {
      const isLastElem = arr.length === index + 1;

      if (OPERATORS.has(value) && !isLastElem) {
        const first = result ?? arr[index - 1];
        const second = arr[index + 1] || '0';

        if (value === 'equals') {
          return result;
        }

        return this.#operations[value](first.toString(), second);
      }

      return result;
    });

    if (this.#result === 'error') {
      this.#isError = true;

      return;
    }

    this.#result = Math.round(this.#result * DECIMAL_PLACES) / DECIMAL_PLACES;
  }

  #updateMainDisplay() {
    if (this.#expression.length >= 3) {
      this.#runCalculation();
      this.#eventBus.trigger(
        this.#eventBus.display,
        { type: 'result', value: this.#result },
      );
    } else {
      this.#eventBus.trigger(
        this.#eventBus.display,
        { type: 'clear-result' },
      );
    }

    const value = this.#printExpression();
    const detail = { type: 'main', value };

    this.#eventBus.trigger(this.#eventBus.display, detail);
  }

  #printExpression() {
    return this.#expression.reduce((result, elem) => {
      if (OPERATORS.has(elem)) {
        return `${result} ${OPERATOR_SIGNS[elem]}`;
      }

      return `${result} ${elem}`;
    }, '');
  }

  #pushExpression(value) {
    this.#expression.push(value);
    this.#currentIndex += 1;

    this.#updateMainDisplay();
  }

  #updateExpression(index, update) {
    this.#expression[index] = update;

    this.#updateMainDisplay();
  }

  #popLastElement() {
    this.#currentIndex -= 1;

    return this.#expression.pop();
  }

  #handleNumber(value) {
    const currentNumber = this.#expression[this.#currentIndex] || '';

    if (NUMBERS.has(value)) {
      const result = `${currentNumber}${NUMBER_SIGNS[value]}`;

      this.#updateExpression(this.#currentIndex, result);
      this.#lastNumber = result;
    }
  }

  #handleOperator(operator) {
    if (this.#expression.length > 0) {
      if (operator === 'equals') {
        this.#handleEquals();

        return;
      }

      const lastElement = this.#popLastElement();

      if (OPERATORS.has(lastElement)) {
        this.#pushExpression(operator);
      } else {
        this.#pushExpression(lastElement);
        this.#pushExpression(operator);
        this.#currentIndex += 1;
      }

      this.#lastOperator = operator;
    }
  }

  #handleModifier(type) {
    if (this.#expression.length > 0) {
      switch (type) {
        case 'dot':
          this.#handleDot();

          break;

        case 'plusminus':
          this.#handlePlusminus();

          break;

        case 'delete':
          this.#handleDelete();

          break;

        default:
          break;
      }
    }
  }

  #handleControl(type) {
    if (type === 'clear') {
      this.#handleClear();
    }
  }

  #handleSwap(value) {
    const lastElement = this.#popLastElement();

    if (OPERATORS.has(lastElement)) {
      this.#pushExpression(lastElement);
    }

    this.#pushExpression(value);
    this.#currentIndex -= 1;
  }

  #handleEquals() {
    const isEqualLoop = this.#expression.length === 1 && this.#currentIndex === -1;

    if (this.#expression.length >= 3) {
      this.#pushExpression('=');
      this.#pushExpression(this.#result.toString());
      this.#eventBus.trigger(
        this.#eventBus.display,
        {
          type: 'history',
          value: this.#printExpression(),
        },
      );

      this.#expression = [];

      this.#pushExpression(this.#result.toString());
      this.#currentIndex = -1;
    } else if (isEqualLoop) {
      const lastElement = this.#popLastElement();

      this.#pushExpression(
        this.#operations[this.#lastOperator](lastElement, this.#lastNumber).toString(),
      );

      this.#currentIndex = -1;
    }
  }

  #handleDot() {
    const lastElement = this.#popLastElement();

    if (!lastElement.includes('.') && !OPERATORS.has(lastElement)) {
      this.#pushExpression(`${lastElement}.`);
    } else {
      this.#pushExpression(lastElement);
    }
  }

  #handlePlusminus() {
    let lastElement = this.#popLastElement();

    if (!OPERATORS.has(lastElement)) {
      if (!lastElement.includes('-')) {
        lastElement = `-${lastElement}`;
      } else {
        lastElement = lastElement.substring(1);
      }
    }

    this.#pushExpression(lastElement);
  }

  #handleDelete() {
    const lastElement = this.#popLastElement();

    if (lastElement && !OPERATORS.has(lastElement)) {
      this.#pushExpression(lastElement.slice(0, -1));
    } else {
      this.#pushExpression(lastElement);
    }
  }

  #handleClear() {
    this.#eventBus.trigger(this.#eventBus.display, { type: 'clear-all' });

    this.#expression = [];
    this.#currentIndex = 0;
    this.#result = 0;
  }

  #reset() {
    this.#currentIndex = 0;
    this.#expression = [];
  }
}
