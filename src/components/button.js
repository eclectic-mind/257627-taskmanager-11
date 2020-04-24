import {BUTTON_MORE} from '../constants.js';
// import {createElement} from '../utils.js';
import AbstractComponent from './abstract-component.js';

const createLoadButton = () => {
  return (
    `<button class="load-more" type="button">${BUTTON_MORE}</button>`
  );
};

export default class Button extends AbstractComponent {
  getTemplate() {
    return createLoadButton();
  }
}
