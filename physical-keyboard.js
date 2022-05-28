const KEYCODE_MAPPER = {
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

const KEYCODE = new Set(Object.keys(KEYCODE_MAPPER));

const KEYCODE_MAPPER_SHIFT = {
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
  Backspace: {
    type: 'control',
    value: 'clear',
    activeClass: 'keyboard__key--red-active',
  },
};

const KEYCODE_SHIFT = new Set(Object.keys(KEYCODE_MAPPER_SHIFT));

const SHIFT_CODES = new Set(['ShiftLeft', 'ShiftRight']);

export default class PhysicalKeyboard {
  #eventBus;

  #handleKeydownBound;

  #handleKeyupBound;

  #isShiftDown;

  constructor(eventBus) {
    this.#eventBus = eventBus;
    this.#handleKeydownBound = this.#handleKeydown.bind(this);
    this.#handleKeyupBound = this.#handleUp.bind(this);
    this.#isShiftDown = false;

    document.addEventListener('keydown', this.#handleKeydownBound);
    document.addEventListener('keyup', this.#handleKeyupBound);
  }

  #handleKeydown(event) {
    const CODE = event.code;

    if (SHIFT_CODES.has(CODE)) {
      this.#isShiftDown = true;

      return;
    }

    if (!this.#isShiftDown && KEYCODE.has(CODE)) {
      const key = KEYCODE_MAPPER[CODE];

      this.#eventBus.trigger(this.#eventBus.keyboard, key);
      document.querySelector(`#${key.value}`).classList.add(key.activeClass);
    }

    if (this.#isShiftDown && KEYCODE_SHIFT.has(CODE)) {
      const key = KEYCODE_MAPPER_SHIFT[CODE];

      this.#eventBus.trigger(this.#eventBus.keyboard, key);
      document.querySelector(`#${key.value}`).classList.add(key.activeClass);
    }
  }

  #handleUp(event) {
    const CODE = event.code;
    let key;

    if (SHIFT_CODES.has(CODE)) {
      this.#isShiftDown = false;
    }

    if (this.#isShiftDown) {
      key = KEYCODE_MAPPER_SHIFT[CODE];
    } else {
      key = KEYCODE_MAPPER[CODE];
    }

    if (key) {
      document.querySelector(`#${key.value}`).classList.remove(key.activeClass);
    }
  }
}