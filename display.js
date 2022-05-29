export default class Display {
  #eventBus;
  #main;
  #result;
  #handleDisplayBound;
  #maxLength;

  constructor(eventBus) {
    this.#eventBus = eventBus;

    this.#maxLength = 20;
    this.#main = document.querySelector('.output__display .output__main');
    this.#result = document.querySelector('.output__display .output__result');
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

      case 'clear-all':
        this.#clearMain();
        this.#clearResult();

        break;

      default:
        break;
    }
  }

  #renderToMain(text) {
    if (!text.trim()) {
      this.#clearMain();

      return;
    }

    if (text.length > this.#maxLength) {
      const bar = text.substring(text.length - this.#maxLength);
      this.#main.textContent = `... ${bar}`;

      return;
    }

    this.#main.textContent = text;
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
}
