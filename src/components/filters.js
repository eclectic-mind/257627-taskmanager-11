// import {createElement} from '../utils.js';
import AbstractComponent from './abstract-component.js';

const createFilterTemplate = (filter, isChecked) => {
  const {title, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}/>
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span></label>`
  );
};

const createFiltersMarkup = (filters) => {
  const filterMarkup = filters.map((item, i) => createFilterTemplate(item, i === 0)).join(`\n`);
  return (
    `<section class="main__filter filter container">
    ${filterMarkup}
    </section>`
  );
};

/*
export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }
  getTemplate() {
    return createFiltersMarkup(this._filters);
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
*/

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }
  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
