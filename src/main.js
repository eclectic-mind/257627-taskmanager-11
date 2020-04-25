import {TASK_COUNT, TASKS_COUNT_ON_START, TASKS_COUNT_BY_BUTTON} from './constants.js';
import {formatTime} from './utils.js';
import {generateFilters, countTasksByType} from './mock/filters.js';
import {generateTask, generateTasks} from './mock/task.js';
import {render, replace, remove, RenderPosition} from "./utils/render.js";

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
    // taskListElement.replaceChild(form.getElement(), taskComponent.getElement());
    replace(taskListElement, form.getElement(), taskComponent.getElement());
  };
  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    // taskListElement.replaceChild(taskComponent.getElement(), form.getElement());
    replace(taskListElement, taskComponent.getElement(), form.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const form = new FormComponent(task);
  const editForm = form.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), new SortComponent(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent(), RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const button = new ButtonComponent();
  render(boardComponent.getElement(), button, RenderPosition.BEFOREEND);

  button.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      remove(button.getElement());
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
// render(menuContainer, menu.getElement(), RenderPosition.BEFOREEND);
// render(pageMain, filtersComponent.getElement(), RenderPosition.BEFOREEND);

render(menuContainer, new MenuComponent(), RenderPosition.BEFOREEND);
render(pageMain, new FilterComponent(filters), RenderPosition.BEFOREEND);

const board = new BoardComponent();
render(pageMain, board, RenderPosition.BEFOREEND);
renderBoard(board, tasks);
