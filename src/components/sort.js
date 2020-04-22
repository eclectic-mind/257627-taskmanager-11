import {SORT_DEF, SORT_DATE_D, SORT_DATE_U} from './constants.js';
import {createElement} from './utils.js';

export const makeSort = () => {
  return (
    `<div class="board__filter-list">
          <a href="#" class="board__filter" data-sort-type="default">${SORT_DEF}</a>
          <a href="#" class="board__filter" data-sort-type="date-up">${SORT_DATE_U}</a>
          <a href="#" class="board__filter" data-sort-type="date-down">${SORT_DATE_D}</a>
        </div>`
  );
};

export default class Sort {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return makeSort();
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
