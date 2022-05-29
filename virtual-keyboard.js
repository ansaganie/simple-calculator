export default class VirtualKeyboard {
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
  }
}
