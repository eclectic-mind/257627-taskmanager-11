import {TASK_COUNT} from './components/constants.js';
import {render} from './components/render.js';
import {makeLoadButton} from './components/button.js';
import {makeTask} from './components/task.js';
import {makeForm} from './components/form.js';
import {makeSort} from './components/sort.js';
import {makeFilters} from './components/filters.js';
import {makeMenu} from './components/menu.js';

const pageMain = document.querySelector(`main`);
const menuContainer = pageMain.querySelector(`.main__control`);
let board = document.createElement(`section`);
board.classList.add(`board`, `container`);
pageMain.appendChild(board);

const menu = makeMenu();
const filters = makeFilters();
const sort = makeSort();
const task = makeTask();
const form = makeForm();
const button = makeLoadButton();

render(menuContainer, menu, `beforeend`);
render(menuContainer, filters, `afterend`);

let tasks = document.createElement(`div`);
tasks.classList.add(`board__tasks`);
board.appendChild(tasks);

render(tasks, form, `beforeend`);
render(board, sort, `afterbegin`);
for (let i = 0; i < TASK_COUNT; i += 1) {
  render(tasks, task, `beforeend`);
}
render(board, button, `beforeend`);
