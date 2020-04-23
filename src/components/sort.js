import {SortOptions} from '../constants.js';
import {createElement} from '../utils.js';

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
          <a href="#" class="board__filter" data-sort-type="default">${SortOptions.DEFAULT}</a>
          <a href="#" class="board__filter" data-sort-type="date-up">${SortOptions.DATE_DOWN}</a>
          <a href="#" class="board__filter" data-sort-type="date-down">${SortOptions.DATE_UP}</a>
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
