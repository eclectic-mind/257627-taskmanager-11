import {TASK_COUNT, TASKS_COUNT_ON_START, TASKS_COUNT_BY_BUTTON} from './components/constants.js';
import {render} from './components/render.js';
import {makeLoadButton} from './components/button.js';
import {makeForm} from './components/form.js';
import {makeSort} from './components/sort.js';
import {makeMenu} from './components/menu.js';

import {makeFiltersMarkup} from './components/filters.js';
import {generateFilters, countTasksByType} from './mock/filters.js';

import {generateTask, generateTasks, DefaultRepeatingDays} from "./mock/task.js";
import {makeTask, makeBoard} from "./components/task.js";

const pageMain = document.querySelector(`main`);
const menuContainer = pageMain.querySelector(`.main__control`);

const menu = makeMenu();
const sort = makeSort();
const board = makeBoard();
const form = makeForm();
const button = makeLoadButton();

render(menuContainer, menu, `beforeend`);
render(pageMain, board, `beforeend`);
const boardContainer = document.querySelector(`.board`);
render(boardContainer, sort, `afterbegin`);
const boardTasks = document.querySelector(`.board__tasks`);

const tasksData = generateTask();
// const tasks = generateTasks(TASKS_COUNT_ON_START - 1);
const tasks = generateTasks(TASK_COUNT - 1);
render(boardTasks, makeTask(tasks[0]), `afterbegin`);
render(boardTasks, form, `afterbegin`);

const all = tasks.length;
const over = 0;
const today = 0;
const rep = 0;
const fav = countTasksByType(tasks, `isFavourite`);
const arch = countTasksByType(tasks, `isArchive`);
const filterCounts = [all, over, today, fav, rep, arch];
console.log(filterCounts);

const filters = generateFilters(tasks, filterCounts);
const filtersMarkup = makeFiltersMarkup(filters);
render(menuContainer, filtersMarkup, `afterend`);

let showingTasksCount = TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount)
  .forEach((task) => render(boardTasks, makeTask(task), `beforeend`));

if (tasks.length >= TASKS_COUNT_ON_START) {
  render(boardContainer, button, `beforeend`);
}

const buttonMore = document.querySelector(`.load-more`);
if (buttonMore) {

buttonMore.addEventListener(`click`, () => {

    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + TASKS_COUNT_BY_BUTTON;
    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => render(boardTasks, makeTask(task), `beforeend`));

    if (showingTasksCount >= tasks.length) {
      buttonMore.remove();
    }

  });

}
