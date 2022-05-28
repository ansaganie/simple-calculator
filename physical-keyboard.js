const KEYCODE_MAPPER = {
  Digit1: {
    type: 'number',
    value: '1',
  },
  Digit2: {
    type: 'number',
    value: '2',
  },
  Digit3: {
    type: 'number',
    value: '3',
  },
  Digit4: {
    type: 'number',
    value: '4',
  },
  Digit5: {
    type: 'number',
    value: '5',
  },
  Digit6: {
    type: 'number',
    value: '6',
  },
  Digit7: {
    type: 'number',
    value: '7',
  },
  Digit8: {
    type: 'number',
    value: '8',
  },
  Digit9: {
    type: 'number',
    value: '9',
  },
  Digit0: {
    type: 'number',
    value: '0',
  },
  Numpad1: {
    type: 'number',
    value: '1',
  },
  Numpad2: {
    type: 'number',
    value: '2',
  },
  Numpad3: {
    type: 'number',
    value: '3',
  },
  Numpad4: {
    type: 'number',
    value: '4',
  },
  Numpad5: {
    type: 'number',
    value: '5',
  },
  Numpad6: {
    type: 'number',
    value: '6',
  },
  Numpad7: {
    type: 'number',
    value: '7',
  },
  Numpad8: {
    type: 'number',
    value: '8',
  },
  Numpad9: {
    type: 'number',
    value: '9',
  },
  Numpad0: {
    type: 'number',
    value: '0',
  },
  Minus: {
    type: 'operator',
    value: 'minus',
  },
  Slash: {
    type: 'operator',
    value: 'divide',
  },
  Equal: {
    type: 'operator',
    value: 'equals',
  },
  Enter: {
    type: 'operator',
    value: 'equals',
  },
  Backspace: {
    type: 'modifier',
    value: 'delete',
  },
  Period: {
    type: 'modifier',
    value: 'dot',
  },
  NumpadDecimal: {
    type: 'modifier',
    value: 'dot',
  },
  NumpadAdd: {
    type: 'operator',
    value: 'plus',
  },
  NumpadSubtract: {
    type: 'operator',
    value: 'minus',
  },
  NumpadMultiply: {
    type: 'operator',
    value: 'times',
  },
  NumpadDivide: {
    type: 'operator',
    value: 'divide',
  },
  NumpadEnter: {
    type: 'operator',
    value: 'equals',
  },
};

const KEYCODE = new Set(Object.keys(KEYCODE_MAPPER));

const KEYCODE_MAPPER_SHIFT = {
  Equal: {
    type: 'operator',
    value: 'plus',
  },
  Numpad8: {
    type: 'operator',
    value: 'times',
  },
  Minus: {
    type: 'modifier',
    value: 'plusminus',
  },
  Backspace: {
    type: 'control',
    value: 'clear',
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
      this.#eventBus.trigger(this.#eventBus.keyboard, KEYCODE_MAPPER[CODE]);
    }

    if (this.#isShiftDown && KEYCODE_SHIFT.has(CODE)) {
      this.#eventBus.trigger(this.#eventBus.keyboard, KEYCODE_MAPPER_SHIFT[CODE]);
    }
  }

  #handleUp(event) {
    const CODE = event.code;

    if (SHIFT_CODES.has(CODE)) {
      this.#isShiftDown = false;
    }
  }
}
