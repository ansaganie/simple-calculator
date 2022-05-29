export default class Display {
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
