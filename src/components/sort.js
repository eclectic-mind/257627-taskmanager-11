import {SORT_PARAMS} from '../constants.js';
import {createElement} from '../utils.js';

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
          <a href="#" class="board__filter" data-sort-type="default">${SORT_PARAMS[0]}</a>
          <a href="#" class="board__filter" data-sort-type="date-up">${SORT_PARAMS[1]}</a>
          <a href="#" class="board__filter" data-sort-type="date-down">${SORT_PARAMS[2]}</a>
        </div>`
  );
};

export default class Sort {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createSortTemplate();
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
