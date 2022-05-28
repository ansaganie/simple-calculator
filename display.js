export default class Display {
  #eventBus;

  #main;

  #result;

  #handleDisplayBound;

  constructor(eventBus) {
    this.#eventBus = eventBus;

    this.#main = document.querySelector('.output__display .output__main');
    this.#result = document.querySelector('.output__display .output__result');
    this.#handleDisplayBound = this.#handleDisplay.bind(this);

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
      case 'clear-main':
        this.#clearMain();
        break;
      case 'clear-result':
        this.#clearResult();
        break;
      default:
        break;
    }
  }

  #renderToMain(text) {
    if (text.length > 22) {
      const bar = text.substring(text.length - 22);
      this.#main.textContent = `... ${bar}`;

      return;
    }

    this.#main.textContent = text;
  }

  #clearMain() {
    this.#main.textContent = '0';
  }

  #renderToResult(text) {
    this.#result.textContent = text;
  }

  #clearResult() {
    this.#result.textContent = '0';
  }
}
