import {TASK_COUNT} from './constants.js';
import {generateFilters, countTasksByType} from './mock/filters.js';
import {generateTask, generateTasks} from './mock/task.js';
import {render, replace, remove, RenderPosition} from "./utils/render.js";

import TasksModel from "./models/tasks.js";

import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filter.js";
import MenuComponent, {MenuItem} from "./components/menu.js";

const pageMain = document.querySelector(`main`);
const menuContainer = pageMain.querySelector(`.main__control`);
const menuComponent = new MenuComponent();
render(menuContainer, menuComponent, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

// const filters = generateFilters(tasks);

// const menu = new MenuComponent();
// const filtersComponent = new FilterComponent(filters);

// render(menuContainer, new MenuComponent(), RenderPosition.BEFOREEND);
// render(pageMain, new FilterComponent(filters), RenderPosition.BEFOREEND);

const filterController = new FilterController(pageMain, tasksModel);
filterController.render();

const board = new BoardComponent();
render(pageMain, board, RenderPosition.BEFOREEND);
const boardController = new BoardController(board, tasksModel);
boardController.render();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      menuComponent.setActiveItem(MenuItem.TASKS);
      boardController.createTask();
      break;
  }
});
