const OPERATORS = new Set(['equals', 'plus', 'minus', 'times', 'divide']);

const OPERATOR_SIGNS_MAP = {
  equals: '=',
  plus: '+',
  minus: '-',
  times: '×',
  divide: '÷',
};

export default class Calculator {
  #eventBus;

  #handleKeyboardClickBound;

  #currentIndex;

  #expression;

  #result;

  #calculators;

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

    this.#calculators = {
      plus(first, second) {
        return BigInt(first) + BigInt(second);
      },
      minus(first, second) {
        return BigInt(first) - BigInt(second);
      },
      times(first, second) {
        return BigInt(first) * BigInt(second);
      },
      divide(first, second) {
        return BigInt(first) / BigInt(second);
      },
    };
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

        return this.#calculators[value](first, second);
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

    this.#updateMainDisplay();
  }

  #handleEquals() {
    this.#runCalculation();
    this.#expression.push(this.#result);
    this.#updateMainDisplay();

    this.#expression = [];
    this.#currentIndex = 0;
    this.#result = 0;
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

    if (this.#expression.length > 3) {
      this.#runCalculation();
    }

    this.#updateMainDisplay();
  }
}
