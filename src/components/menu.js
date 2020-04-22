import {MENU_ADD, MENU_T, MENU_S} from './constants.js';
import {createElement} from './utils.js';

export const makeMenu = () => {
  return (
    `<section class="control__btn-wrap">
          <input
            type="radio"
            name="control"
            id="control__new-task"
            class="control__input visually-hidden"/>
          <label for="control__new-task" class="control__label control__label--new-task"
            >${MENU_ADD}</label>
          <input
            type="radio"
            name="control"
            id="control__task"
            class="control__input visually-hidden"
            checked/>
          <label for="control__task" class="control__label">${MENU_T}</label>
          <input
            type="radio"
            name="control"
            id="control__statistic"
            class="control__input visually-hidden"/>
          <label for="control__statistic" class="control__label"
            >${MENU_S}</label>
        </section>`
  );
};

export default class Menu {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return makeMenu();
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
