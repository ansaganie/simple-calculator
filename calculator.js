const OPERATORS = new Set(['equals', 'plus', 'minus', 'times', 'divide']);

const OPERATOR_SIGNS_MAP = {
  equals: '=',
  plus: '+',
  minus: '-',
  times: '×',
  divide: '÷',
};

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

    this.#eventBus.subscribe(
      this.#eventBus.keyboardClick,
      this.#handleKeyboardClickBound,
    );

    this.#currentIndex = 0;
    this.#expression = [];
    this.#result = 0;
    this.#operations = CALCULATOR_FUNCTIONS;
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
    const value = this.#expression.reduce((result, elem) => {
      if (OPERATORS.has(elem)) {
        return `${result} ${OPERATOR_SIGNS_MAP[elem]}`;
      }

      return `${result} ${elem}`;
    }, '');
    const detail = { type: 'main', value };

    this.#eventBus.trigger(this.#eventBus.display, detail);
  }

  #handleNumber(value) {
    if (!this.#expression[this.#currentIndex]) {
      this.#expression[this.#currentIndex] = '';
    }

    const currentNumber = this.#expression[this.#currentIndex];

    this.#expression[this.#currentIndex] = `${currentNumber}${value}`;

    if (this.#expression.length >= 3) {
      this.#runCalculation();
    }

    this.#updateMainDisplay();
  }

  #handleOperator(operator) {
    const lastElementIndex = this.#expression.length - 1;
    const lastElement = this.#expression[lastElementIndex];

    if (OPERATORS.has(lastElement)) {
      this.#expression[lastElementIndex] = operator;
    } else {
      this.#expression.push(operator);
      this.#currentIndex += 2;
    }

    if (operator === 'equals') {
      this.#handleEquals();

      return;
    }

    this.#updateMainDisplay();
  }

  #handleModifier(value) {
    if (this.#expression.length > 0) {
      switch (value) {
        case 'dot':
          this.#handleDot();

          break;

        case 'plusminus':
          this.#handlePlusminus();

          break;

        case 'delete':
          this.#handleDelete();

          break;

        case 'clear':
          this.#handleClear();

          break;

        default:
          break;
      }
    }
  }

  #handleEquals() {
    this.#runCalculation();
    this.#expression.push(this.#result);
    this.#updateMainDisplay();

    this.#expression = [];
    this.#currentIndex = 0;
    this.#result = 0;
  }

  #handleDot() {
    const lastElementIndex = this.#expression.length - 1;
    const lastElement = this.#expression[lastElementIndex];

    if (!lastElement.includes('.')) {
      this.#expression[lastElementIndex] = `${lastElement}.`;
    }

    this.#updateMainDisplay();
  }

  #handlePlusminus() {
    const lastElementIndex = this.#expression.length - 1;
    let lastElement = this.#expression[lastElementIndex];

    if (!OPERATORS.has(lastElement)) {
      if (!lastElement.includes('-')) {
        lastElement = `-${lastElement}`;
      } else {
        lastElement = lastElement.substring(1);
      }
    }

    this.#expression[lastElementIndex] = lastElement;
    this.#updateMainDisplay();
  }

  #handleDelete() {
    const lastElementIndex = this.#expression.length - 1;
    const lastElement = this.#expression[lastElementIndex];

    if (!OPERATORS.has(lastElement)) {
      this.#expression[lastElementIndex] = lastElement.slice(0, -1);
      this.#updateMainDisplay();
    }
  }

  #handleClear() {
    this.#eventBus.trigger(this.#eventBus.display, { type: 'clear-all' });

    this.#expression = [];
    this.#currentIndex = 0;
    this.#result = 0;
  }
}
