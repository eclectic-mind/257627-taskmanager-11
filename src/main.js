import {TASK_COUNT, TASKS_COUNT_ON_START, TASKS_COUNT_BY_BUTTON} from './constants.js';
import {formatTime} from './utils/common.js';
import {generateFilters, countTasksByType} from './mock/filters.js';
import {generateTask, generateTasks} from './mock/task.js';
import {render, replace, remove, RenderPosition} from "./utils/render.js";

import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board.js";
import FilterComponent from "./components/filters.js";
import MenuComponent from "./components/menu.js";

const pageMain = document.querySelector(`main`);
const menuContainer = pageMain.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);

const menu = new MenuComponent();
const filtersComponent = new FilterComponent(filters);

render(menuContainer, new MenuComponent(), RenderPosition.BEFOREEND);
render(pageMain, new FilterComponent(filters), RenderPosition.BEFOREEND);

const board = new BoardComponent();
const boardController = new BoardController(board);
render(pageMain, board, RenderPosition.BEFOREEND);
boardController.render(tasks);
