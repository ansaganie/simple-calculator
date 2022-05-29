import './normalize.css';
import './style.css';
import VirtualKeyboard from './virtual-keyboard';
import Display from './display';
import EventBus from './event-bus';
import Calculator from './calculator';
import PhysicalKeyboard from './physical-keyboard';
import Memory from './memory';

const eventBus = new EventBus();

new Display(eventBus).init();
new Memory(eventBus).init();
new VirtualKeyboard(eventBus).init();
new PhysicalKeyboard(eventBus).init();
new Calculator(eventBus).init();
