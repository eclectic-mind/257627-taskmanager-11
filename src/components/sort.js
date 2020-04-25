import {SortType, SortOptions} from '../constants.js';
import AbstractComponent from './abstract-component.js';

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
          <a href="#" class="board__filter" data-sort-type="${SortType.DEFAULT}">${SortOptions.DEFAULT}</a>
          <a href="#" class="board__filter" data-sort-type="${SortType.DATE_UP}">${SortOptions.DATE_DOWN}</a>
          <a href="#" class="board__filter" data-sort-type="${SortType.DATE_DOWN}">${SortOptions.DATE_UP}</a>
        </div>`
  );
};

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

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
