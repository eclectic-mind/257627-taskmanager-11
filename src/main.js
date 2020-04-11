import {TASK_COUNT} from './components/constants.js';
import {render} from './components/render.js';
import {makeLoadButton} from './components/button.js';
import {makeTask, makeBoard} from './components/task.js';
import {makeForm} from './components/form.js';
import {makeSort} from './components/sort.js';
import {makeFilters} from './components/filters.js';
import {makeMenu} from './components/menu.js';

const pageMain = document.querySelector(`main`);
const menuContainer = pageMain.querySelector(`.main__control`);

const menu = makeMenu();
const filters = makeFilters();
const sort = makeSort();
const task = makeTask();
const board = makeBoard();
const form = makeForm();
const button = makeLoadButton();

render(menuContainer, menu, `beforeend`);
render(menuContainer, filters, `afterend`);
render(pageMain, board, `beforeend`);

const boardContainer = document.querySelector(`.board`);
render(boardContainer, sort, `afterbegin`);
let boardTasks = document.querySelector(`.board__tasks`);
console.log(boardTasks);
for (let i = 0; i < TASK_COUNT; i += 1) {
  render(boardTasks, task, `beforeend`);
}
render(boardTasks, form, `afterbegin`);

render(boardContainer, button, `beforeend`);
