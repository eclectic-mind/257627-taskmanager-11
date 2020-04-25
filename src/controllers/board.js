import ButtonComponent from "../components/button.js";
import FormComponent from "../components/form.js";
import TaskComponent from "../components/task.js";
import TasksComponent from "../components/tasks.js";
import NoTasksComponent from "../components/no-tasks.js";
import SortComponent from "../components/sort.js";
import {render, remove, replace, RenderPosition} from "../utils/render.js";
import {TASK_COUNT, TASKS_COUNT_ON_START, TASKS_COUNT_BY_BUTTON, SortType} from '../constants.js';

const renderTask = (taskListElement, task) => {
  const replaceTaskToForm = () => {
    replace(formComponent, taskComponent);
  };
  const replaceFormToTask = (evt) => {
    evt.preventDefault();
    replace(taskComponent, formComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceFormToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  const formComponent = new FormComponent(task);

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  formComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceFormToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._buttonComponent = new ButtonComponent();
  }

  render(tasks) {
    const renderButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      render(container, this._buttonComponent, RenderPosition.BEFOREEND);

      this._buttonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + TASKS_COUNT_BY_BUTTON;

        const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);
        renderTasks(taskListElement, sortedTasks);

        if (showingTasksCount >= tasks.length) {
          remove(this._buttonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = TASKS_COUNT_ON_START;
    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));

    renderButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = TASKS_COUNT_BY_BUTTON;
      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks);

      renderButton();
    });
  }
}
