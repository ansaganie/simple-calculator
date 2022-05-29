const NUMBER_REGEX = /^-?\d*\.?\d*$/;

export default class Memory {
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
