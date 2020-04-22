import {TASK_COUNT, TASKS_COUNT_ON_START, TASKS_COUNT_BY_BUTTON} from './components/constants.js';
import {render, RenderPosition} from './components/render.js';
import {formatTime, createElement} from './components/utils.js';
import {generateFilters, countTasksByType} from './mock/filters.js';
import {generateTask, generateTasks} from "./mock/task.js";

import BoardComponent from "./components/board.js";
import FilterComponent from "./components/filters.js";
import ButtonComponent from "./components/button.js";
import FormComponent from "./components/form.js";
import TaskComponent from "./components/task.js";
import TasksComponent from "./components/tasks.js";
import NoTasksComponent from "./components/no-tasks.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";

const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(form.getElement(), taskComponent.getElement());
  };
  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent.getElement(), form.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const form = new FormComponent(task);
  const editForm = form.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent().getElement(), RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const button = new ButtonComponent();
  render(boardComponent.getElement(), button.getElement(), RenderPosition.BEFOREEND);

  button.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      button.getElement().remove();
      button.removeElement();
    }
  });
};

const pageMain = document.querySelector(`main`);
const menuContainer = pageMain.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);

const menu = new MenuComponent();
const filtersComponent = new FilterComponent(filters);
render(menuContainer, menu.getElement(), RenderPosition.BEFOREEND);
render(pageMain, filtersComponent.getElement(), RenderPosition.BEFOREEND);

const board = new BoardComponent();
render(pageMain, board.getElement(), RenderPosition.BEFOREEND);
renderBoard(board, tasks);
