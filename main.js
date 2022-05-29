const DECIMAL_PLACES = 10 ** 8;

const NUMBER_REGEX = /^-?\d*\.?\d*$/;

const OperatorSigns = {
  equals: '=',
  plus: '+',
  minus: '-',
  times: '×',
  divide: '÷',
};

const Operators = new Set(Object.keys(OperatorSigns));

const NumberSigns = {
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

const Numbers = new Set(Object.keys(NumberSigns));

const CalculatorFunctions = {
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

const KeycodeMapper = {
  Digit1: {
    type: 'number',
    value: 'one',
    activeClass: 'keyboard__key--active',
  },
  Digit2: {
    type: 'number',
    value: 'two',
    activeClass: 'keyboard__key--active',
  },
  Digit3: {
    type: 'number',
    value: 'three',
    activeClass: 'keyboard__key--active',
  },
  Digit4: {
    type: 'number',
    value: 'four',
    activeClass: 'keyboard__key--active',
  },
  Digit5: {
    type: 'number',
    value: 'five',
    activeClass: 'keyboard__key--active',
  },
  Digit6: {
    type: 'number',
    value: 'six',
    activeClass: 'keyboard__key--active',
  },
  Digit7: {
    type: 'number',
    value: 'seven',
    activeClass: 'keyboard__key--active',
  },
  Digit8: {
    type: 'number',
    value: 'eight',
    activeClass: 'keyboard__key--active',
  },
  Digit9: {
    type: 'number',
    value: 'nine',
    activeClass: 'keyboard__key--active',
  },
  Digit0: {
    type: 'number',
    value: 'zero',
    activeClass: 'keyboard__key--active',
  },
  Numpad1: {
    type: 'number',
    value: 'one',
    activeClass: 'keyboard__key--active',
  },
  Numpad2: {
    type: 'number',
    value: 'two',
    activeClass: 'keyboard__key--active',
  },
  Numpad3: {
    type: 'number',
    value: 'three',
    activeClass: 'keyboard__key--active',
  },
  Numpad4: {
    type: 'number',
    value: 'four',
    activeClass: 'keyboard__key--active',
  },
  Numpad5: {
    type: 'number',
    value: 'five',
    activeClass: 'keyboard__key--active',
  },
  Numpad6: {
    type: 'number',
    value: 'six',
    activeClass: 'keyboard__key--active',
  },
  Numpad7: {
    type: 'number',
    value: 'seven',
    activeClass: 'keyboard__key--active',
  },
  Numpad8: {
    type: 'number',
    value: 'eight',
    activeClass: 'keyboard__key--active',
  },
  Numpad9: {
    type: 'number',
    value: 'nine',
    activeClass: 'keyboard__key--active',
  },
  Numpad0: {
    type: 'number',
    value: 'zero',
    activeClass: 'keyboard__key--active',
  },
  Minus: {
    type: 'operator',
    value: 'minus',
    activeClass: 'keyboard__key--dark-active',
  },
  NumpadSubtract: {
    type: 'operator',
    value: 'minus',
    activeClass: 'keyboard__key--dark-active',
  },
  Slash: {
    type: 'operator',
    value: 'divide',
    activeClass: 'keyboard__key--dark-active',
  },
  NumpadDivide: {
    type: 'operator',
    value: 'divide',
    activeClass: 'keyboard__key--dark-active',
  },
  Equal: {
    type: 'operator',
    value: 'equals',
    activeClass: 'keyboard__key--blue-active',
  },
  Enter: {
    type: 'operator',
    value: 'equals',
    activeClass: 'keyboard__key--blue-active',
  },
  NumpadEnter: {
    type: 'operator',
    value: 'equals',
    activeClass: 'keyboard__key--blue-active',
  },
  Backspace: {
    type: 'modifier',
    value: 'delete',
    activeClass: 'keyboard__key--light-active',
  },
  Period: {
    type: 'modifier',
    value: 'dot',
    activeClass: 'keyboard__key--active',
  },
  NumpadDecimal: {
    type: 'modifier',
    value: 'dot',
    activeClass: 'keyboard__key--active',
  },
  NumpadAdd: {
    type: 'operator',
    value: 'plus',
    activeClass: 'keyboard__key--dark-active',
  },
  NumpadMultiply: {
    type: 'operator',
    value: 'times',
    activeClass: 'keyboard__key--dark-active',
  },
  Delete: {
    type: 'control',
    value: 'clear',
    activeClass: 'keyboard__key--red-active',
  },
};

const Keycode = new Set(Object.keys(KeycodeMapper));

const KeycodeMapperShift = {
  Equal: {
    type: 'operator',
    value: 'plus',
    activeClass: 'keyboard__key--dark-active',
  },
  Digit8: {
    type: 'operator',
    value: 'times',
    activeClass: 'keyboard__key--dark-active',
  },
  Minus: {
    type: 'modifier',
    value: 'plusminus',
    activeClass: 'keyboard__key--light-active',
  },
  NumpadSubtract: {
    type: 'modifier',
    value: 'plusminus',
    activeClass: 'keyboard__key--light-active',
  },
  Backspace: {
    type: 'control',
    value: 'clear',
    activeClass: 'keyboard__key--red-active',
  },
};

const KeycodeShift = new Set(Object.keys(KeycodeMapperShift));

const ShiftCodes = new Set(['ShiftLeft', 'ShiftRight']);

class EventBus {
  #bus;
  keyboardClick;
  display;

  constructor() {
    this.#bus = document.createElement('span');
    this.keyboard = 'keyboard';
    this.display = 'display';
  }

  subscribe(eventName, callback) {
    this.#bus.addEventListener(eventName, callback);
  }

  trigger(eventName, detail) {
    this.#bus.dispatchEvent(new CustomEvent(eventName, { detail }));
  }
}

class Display {
  #eventBus;
  #main;
  #result;
  #history;
  #handleDisplayBound;
  #maxLength;
  #historyMaxLength;

  constructor(eventBus) {
    this.#eventBus = eventBus;

    this.#maxLength = 18;
    this.#historyMaxLength = 32;
    this.#main = document.querySelector('.output__display .output__main');
    this.#result = document.querySelector('.output__footer .output__result');
    this.#history = document.querySelector('.output__footer .output__history');
    this.#handleDisplayBound = this.#handleDisplay.bind(this);
  }

  init() {
    this.#eventBus.subscribe(this.#eventBus.display, this.#handleDisplayBound);
  }

  #handleDisplay(event) {
    const { type, value } = event.detail;

    switch (type) {
      case 'main':
        this.#renderToMain(value);

        break;

      case 'result':
        this.#renderToResult(value);

        break;

      case 'history':
        this.#pushHistory(value);

        break;

      case 'clear-all':
        this.#clearMain();
        this.#clearResult();
        this.#clearHistory();

        break;

      case 'clear-result':
        this.#clearResult();

        break;

      default:
        break;
    }
  }

  #renderToMain(text) {
    let result = text.trim();
    if (!result) {
      this.#clearMain();

      return;
    }

    if (text.length > this.#maxLength) {
      result = `... ${text.substring(text.length - this.#maxLength)}`;
    }

    this.#main.textContent = result;
  }

  #pushHistory(text) {
    let result = text.trim();

    if (!text.trim()) {
      this.#clearHistory();

      return;
    }

    if (text.length > this.#maxLength) {
      result = `... ${text.substring(text.length - this.#historyMaxLength)}`;
    }

    this.#history.textContent = result;
  }

  #clearMain() {
    this.#main.textContent = '0';
  }

  #renderToResult(text) {
    if (text === undefined) {
      this.#clearResult();

      return;
    }

    this.#result.textContent = text;
  }

  #clearResult() {
    this.#result.textContent = '-';
  }

  #clearHistory() {
    this.#history.textContent = '';
  }
}

class Memory {
  #eventBus;
  #mainDisplay;
  #copyButton;
  #currentButton;
  #memoryName;
  #memoryValue;
  #memoryContainer;
  #memory;
  #currentMemory;
  #handleCopyClickBound;
  #handleCurrentMemoryClickBound;
  #handleMemoryButtonsClickBound;

  constructor(eventBus) {
    this.#eventBus = eventBus;

    this.#memory = {
      1: '0',
      2: '0',
      3: '0',
      4: '0',
    };
    this.#currentMemory = 1;

    this.#mainDisplay = document.querySelector('.output__display .output__main');
    this.#copyButton = document.querySelector('.output__memory .memory__copy');
    this.#currentButton = document.querySelector('.output__memory .memory__current');
    this.#memoryName = document.querySelector('.memory__current .memory__name');
    this.#memoryValue = document.querySelector('.memory__current .memory__value');
    this.#memoryContainer = document.querySelector('.calculator__memory .memory__container');

    this.#handleCopyClickBound = this.#handleCopyClick.bind(this);
    this.#handleCurrentMemoryClickBound = this.#handleCurrentMemoryClick.bind(this);
    this.#handleMemoryButtonsClickBound = this.#handleMemoryButtonsClick.bind(this);
  }

  init() {
    this.#copyButton.addEventListener('click', this.#handleCopyClickBound);
    this.#currentButton.addEventListener('click', this.#handleCurrentMemoryClickBound);
    this.#memoryContainer.addEventListener('click', this.#handleMemoryButtonsClickBound);
  }

  #handleCopyClick() {
    const text = this.#mainDisplay.textContent.trim();

    navigator.clipboard
      .writeText(text)
      .then(() => alert('Скопированно в буфер обмена !'))
      .catch(() => alert('Нескопированно в буфер обмена !'));
  }

  #handleCurrentMemoryClick() {
    this.#currentMemory += 1;

    if (this.#currentMemory === 5) {
      this.#currentMemory = 1;
    }

    this.#updateCurrentMemory();
  }

  #handleMemoryButtonsClick(evt) {
    const element = evt.target;

    if (!element.classList.contains('memory__button')) {
      return;
    }

    switch (element.id) {
      case 'clear':
        this.#memory[this.#currentMemory] = '0';
        this.#updateCurrentMemory();

        break;

      case 'save-minus':
        this.#handleSave(-1);

        break;

      case 'save-plus':
        this.#handleSave(1);

        break;

      case 'put':
        this.#eventBus.trigger(
          this.#eventBus.keyboard,
          {
            type: 'swap',
            value: this.#memory[this.#currentMemory],
          },
        );

        break;

      default:
        break;
    }
  }

  #updateCurrentMemory() {
    this.#memoryName.textContent = `M${this.#currentMemory}: `;
    this.#memoryValue.textContent = this.#memory[this.#currentMemory];
  }

  #handleSave(sign) {
    const text = this.#mainDisplay.textContent.trim();

    if (NUMBER_REGEX.test(text)) {
      this.#memory[this.#currentMemory] = (text * sign).toString();

      this.#updateCurrentMemory();
    }
  }
}

class VirtualKeyboard {
  #keyboard;
  #eventBus;
  #handleKeyboardClickBound;

  constructor(eventBus) {
    this.#keyboard = document.querySelector('.calculator__keyboard');
    this.#eventBus = eventBus;

    this.#handleKeyboardClickBound = this.#handleKeyboardClick.bind(this);
  }

  init() {
    this.#keyboard.addEventListener('click', this.#handleKeyboardClickBound);
  }

  #handleKeyboardClick(evt) {
    if (!evt.target.classList.contains('keyboard__key')) {
      return;
    }

    const element = evt.target;
    const type = Array.from(element.classList).find((className) => className.startsWith('type-'));
    const value = element.id;
    const detail = { type: type.replace('type-', ''), value };

    this.#eventBus.trigger(this.#eventBus.keyboard, detail);

    element.blur();
  }
}

class PhysicalKeyboard {
  #eventBus;
  #handleKeydownBound;
  #handleKeyupBound;
  #isShiftDown;

  constructor(eventBus) {
    this.#eventBus = eventBus;
    this.#handleKeydownBound = this.#handleKeydown.bind(this);
    this.#handleKeyupBound = this.#handleUp.bind(this);
    this.#isShiftDown = false;
  }

  init() {
    document.addEventListener('keydown', this.#handleKeydownBound);
    document.addEventListener('keyup', this.#handleKeyupBound);
  }

  #handleKeydown(event) {
    const CODE = event.code;

    if (ShiftCodes.has(CODE)) {
      this.#isShiftDown = true;

      return;
    }

    if (!this.#isShiftDown && Keycode.has(CODE)) {
      const key = KeycodeMapper[CODE];

      this.#eventBus.trigger(this.#eventBus.keyboard, key);
      document.querySelector(`#${key.value}`).classList.add(key.activeClass);
    }

    if (this.#isShiftDown && KeycodeShift.has(CODE)) {
      const key = KeycodeMapperShift[CODE];

      this.#eventBus.trigger(this.#eventBus.keyboard, key);
      document.querySelector(`#${key.value}`).classList.add(key.activeClass);
    }
  }

  #handleUp(event) {
    const CODE = event.code;
    let key;

    if (ShiftCodes.has(CODE)) {
      this.#isShiftDown = false;
    }

    if (this.#isShiftDown) {
      key = KeycodeMapperShift[CODE];
    } else {
      key = KeycodeMapper[CODE];
    }

    if (key) {
      document.querySelector(`#${key.value}`).classList.remove(key.activeClass);
    }
  }
}

class Calculator {
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
    this.#operations = CalculatorFunctions;
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

      if (Operators.has(value) && !isLastElem) {
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
      if (Operators.has(elem)) {
        return `${result} ${OperatorSigns[elem]}`;
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

    if (Numbers.has(value)) {
      const result = `${currentNumber}${NumberSigns[value]}`;

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

      if (Operators.has(lastElement)) {
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

    if (Operators.has(lastElement)) {
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

    if (!lastElement.includes('.') && !Operators.has(lastElement)) {
      this.#pushExpression(`${lastElement}.`);
    } else {
      this.#pushExpression(lastElement);
    }
  }

  #handlePlusminus() {
    let lastElement = this.#popLastElement();

    if (!Operators.has(lastElement)) {
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

    if (lastElement && !Operators.has(lastElement)) {
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

const eventBus = new EventBus();

new Display(eventBus).init();
new Memory(eventBus).init();
new VirtualKeyboard(eventBus).init();
new PhysicalKeyboard(eventBus).init();
new Calculator(eventBus).init();
