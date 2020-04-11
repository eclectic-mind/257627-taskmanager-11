import {BUTTON_MORE, SORT_DEF, SORT_DATE_D, SORT_DATE_U} from './constants.js';

export const makeSort = () => {
  return (
    `<div class="board__filter-list">
          <a href="#" class="board__filter" data-sort-type="default">${SORT_DEF}</a>
          <a href="#" class="board__filter" data-sort-type="date-up">${SORT_DATE_U}</a>
          <a href="#" class="board__filter" data-sort-type="date-down">${SORT_DATE_D}</a>
        </div>`
  );
};
