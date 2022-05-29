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
  plus(first, second) {
    return parseFloat(first) + parseFloat(second);
  },
  minus(first, second) {
    return parseFloat(first) - parseFloat(second);
  },
  times(first, second) {
    return parseFloat(first) * parseFloat(second);
  },
  divide(first, second) {
    return parseFloat(first) / parseFloat(second);
  },
};

export default class Calculator {
  #eventBus;
  #handleKeyboardClickBound;
  #currentIndex;
  #expression;
  #result;
  #operations;

  constructor(eventBus) {
    this.#eventBus = eventBus;

    this.#handleKeyboardClickBound = this.#handleKeyboardClick.bind(this);
    this.#currentIndex = 0;
    this.#expression = [];
    this.#result = 0;
    this.#operations = CALCULATOR_FUNCTIONS;
  }

  init() {
    this.#eventBus.subscribe(
      this.#eventBus.keyboard,
      this.#handleKeyboardClickBound,
    );
  }

  #handleKeyboardClick(event) {
    const { type, value } = event.detail;

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

      default:
        break;
    }
  }

  #runCalculation() {
    this.#result = this.#expression.reduce((result, value, index, arr) => {
      const isLastElem = arr.length === index + 1;

      if (OPERATORS.has(value) && !isLastElem) {
        const first = result || arr[index - 1];
        const second = arr[index + 1];

        if (value === 'equals') {
          return result;
        }

        return this.#operations[value](first, second);
      }

      return result;
    }, 0);

    this.#eventBus.trigger(
      this.#eventBus.display,
      { type: 'result', value: this.#result },
    );
  }

  #updateMainDisplay() {
    if (this.#expression.length >= 3) {
      this.#runCalculation();
    }

    const value = this.#expression.reduce((result, elem) => {
      if (OPERATORS.has(elem)) {
        return `${result} ${OPERATOR_SIGNS[elem]}`;
      }

      return `${result} ${elem}`;
    }, '');
    const detail = { type: 'main', value };

    this.#eventBus.trigger(this.#eventBus.display, detail);
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
      this.#updateExpression(this.#currentIndex, `${currentNumber}${NUMBER_SIGNS[value]}`);
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

  #handleEquals() {
    if (this.#expression.length >= 3) {
      this.#pushExpression('equals');
      this.#pushExpression(this.#result);

      this.#expression = [];
      this.#currentIndex = 0;
      this.#result = 0;
    }
  }

  #handleDot() {
    const lastElement = this.#popLastElement();

    if (!lastElement.includes('.')) {
      this.#pushExpression(`${lastElement}.`);
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

    if (!OPERATORS.has(lastElement)) {
      this.#pushExpression(lastElement.slice(0, -1));
    }
  }

  #handleClear() {
    this.#eventBus.trigger(this.#eventBus.display, { type: 'clear-all' });

    this.#expression = [];
    this.#currentIndex = 0;
    this.#result = 0;
  }
}
