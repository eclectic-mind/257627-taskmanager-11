import {BUTTON_MORE} from './constants.js';
import {createElement} from './utils.js';

const makeLoadButton = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class Button {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return makeLoadButton();
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
};
