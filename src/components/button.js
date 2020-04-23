import {BUTTON_MORE} from '../constants.js';
import {createElement} from '../utils.js';

const createLoadButton = () => {
  return (
    `<button class="load-more" type="button">${BUTTON_MORE}</button>`
  );
};

export default class Button {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createLoadButton();
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
