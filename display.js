export class Display {
  #main;
  #result;

  constructor() {
    this.#main = document.querySelector('.output__display .output__main');
    this.#result = document.querySelector('.output__display .output__result');
  }

  renderToMain(text) {
    this.#main.textContent = text;
  }

  clearMain() {
    this.#main.textContent = '0';
  }

  renderToResult(text) {
    this.#result.textContent = text;
  }

  clearMain() {
    this.#result.textContent = '0';
  }
}
