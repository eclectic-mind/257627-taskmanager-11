import {MENU_ADD, MENU_T, MENU_S} from '../constants.js';
import AbstractComponent from './abstract-component.js';

export const MenuItem = {
  NEW_TASK: `control__new-task`,
  STATISTICS: `control__statistic`,
  TASKS: `control__task`,
};

const createMenuTemplate = () => {
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

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }
  setActiveItem(menuItem) {
    const item = this.getElement().querySelector(`#${menuItem}`);
    if (item) {
      item.checked = true;
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }
      const menuItem = evt.target.id;
      handler(menuItem);
    });
  }
}
