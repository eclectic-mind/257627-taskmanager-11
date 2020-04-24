import {SortOptions} from '../constants.js';
//import {createElement} from '../utils.js';
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

export default class Sort extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
