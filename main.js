import './normalize.css';
import './style.css';
import VirtualKeyboard from './virtual-keyboard';
import Display from './display';
import EventBus from './event-bus';
import Calculator from './calculator';
import PhysicalKeyboard from './physical-keyboard';

const eventBus = new EventBus();

/* eslint-disable no-new */
new Display(eventBus);
new VirtualKeyboard(eventBus);
new PhysicalKeyboard(eventBus);
new Calculator(eventBus);
