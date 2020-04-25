import {SortType, SortOptions} from '../constants.js';
// import {createElement} from '../utils.js';
import AbstractComponent from './abstract-component.js';

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
          <a href="#" class="board__filter" data-sort-type="default">${SortOptions.DEFAULT}</a>
          <a href="#" class="board__filter" data-sort-type="date-up">${SortOptions.DATE_DOWN}</a>
          <a href="#" class="board__filter" data-sort-type="date-down">${SortOptions.DATE_UP}</a>
        </div>`
  );
};
/*
export default class Sort extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
  getSortType() {
  }
  setSortTypeChangeHandler(handler) {
  }
}
*/

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return createSortTemplate();
  }
  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
