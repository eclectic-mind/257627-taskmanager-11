import API from "./api/index.js";
import Store from "./api/store.js";
import {render, replace, remove, RenderPosition} from "./utils/render.js";
import Provider from "./api/provider.js";
import TasksModel from "./models/tasks.js";
import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filter.js";
import MenuComponent, {MenuItem} from "./components/menu.js";
import StatsComponent from "./components/stats.js";

const AUTHORIZATION = `Basic skjfglkdlekKJhLfloKLF=`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;
const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const tasksModel = new TasksModel();

const pageMain = document.querySelector(`main`);
const menuContainer = pageMain.querySelector(`.main__control`);
const menuComponent = new MenuComponent();
const statsComponent = new StatsComponent({tasks: tasksModel, dateFrom, dateTo});

const board = new BoardComponent();
const boardController = new BoardController(board, tasksModel, apiWithProvider);
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

apiWithProvider.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
    }).catch(() => {
  });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
