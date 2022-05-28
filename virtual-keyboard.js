export class VirtualKeyboard {
  #keyboard;

  constructor() {
    this.#keyboard = document.querySelector('.calculator__keyboard');
    this.handleKeyboardClick = this.handleKeyboardClick.bind(this);
    this.#keyboard.addEventListener('click', this.handleKeyboardClick);
  }

  handleKeyboardClick(evt) {
    if (!evt.target.classList.contains('keyboard__key')) {
      return;
    }

    const element = evt.target;

    const type = Array.from(element.classList).find((className) => className.startsWith('type-'));
    const value = element.id;

    document.dispatchEvent(
      new CustomEvent('keyboard-click', {
        detail: { type: type.replace('type-', ''), value },
      }),
    );
  }
}
