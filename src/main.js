import API from "./api.js";
import {render, replace, remove, RenderPosition} from "./utils/render.js";
import TasksModel from "./models/tasks.js";
import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filter.js";
import MenuComponent, {MenuItem} from "./components/menu.js";
import StatsComponent from "./components/stats.js";

const AUTHORIZATION = `Basic skjfglkdlekKJhLfloKLF=`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const api = new API(END_POINT, AUTHORIZATION);
const tasksModel = new TasksModel();

const pageMain = document.querySelector(`main`);
const menuContainer = pageMain.querySelector(`.main__control`);
const menuComponent = new MenuComponent();
const statsComponent = new StatsComponent({tasks: tasksModel, dateFrom, dateTo});

const board = new BoardComponent();
const boardController = new BoardController(board, tasksModel, api);
const filterController = new FilterController(pageMain, tasksModel);

render(menuContainer, new MenuComponent(), RenderPosition.BEFOREEND);
filterController.render();
render(pageMain, board, RenderPosition.BEFOREEND);
render(pageMain, statsComponent, RenderPosition.BEFOREEND);
statsComponent.hide();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      menuComponent.setActiveItem(MenuItem.TASKS);
      statsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statsComponent.show();
      break;
    case MenuItem.TASKS:
      statsComponent.hide();
      boardController.show();
      break;
  }
});

api.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
});
