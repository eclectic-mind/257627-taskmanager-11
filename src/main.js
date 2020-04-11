import {TASK_COUNT} from './components/constants.js';
import {render} from './components/render.js';
import {makeLoadButton} from './components/button.js';
import {makeTask, makeBoard} from './components/task.js';
import {makeForm} from './components/form.js';
import {makeSort} from './components/sort.js';
import {makeMenu} from './components/menu.js';

import {makeFiltersMarkup} from './components/filters.js';
import {generateFilters} from './mock/filters.js';

const pageMain = document.querySelector(`main`);
const menuContainer = pageMain.querySelector(`.main__control`);

const menu = makeMenu();
const sort = makeSort();
const task = makeTask();
const board = makeBoard();
const form = makeForm();
const button = makeLoadButton();

render(menuContainer, menu, `beforeend`);
render(pageMain, board, `beforeend`);
const boardContainer = document.querySelector(`.board`);
render(boardContainer, sort, `afterbegin`);
let boardTasks = document.querySelector(`.board__tasks`);
for (let i = 0; i < TASK_COUNT; i += 1) {
  render(boardTasks, task, `beforeend`);
}
render(boardTasks, form, `afterbegin`);
render(boardContainer, button, `beforeend`);

const filters = generateFilters();
const filtersMarkup = makeFiltersMarkup(filters);
render(menuContainer, filtersMarkup, `afterend`);
