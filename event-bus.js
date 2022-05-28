export default class EventBus {
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
