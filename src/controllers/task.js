import TaskComponent from "../components/task.js";
import FormComponent from "../components/form.js";
import TaskModel from "../models/task.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";
import {COLOR, WEEK_DAYS, SHAKE_TIMEOUT} from "../constants.js";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    "mo": false,
    "tu": false,
    "we": false,
    "th": false,
    "fr": false,
    "sa": false,
    "su": false,
  },
  color: COLOR.BLACK,
  isFavorite: false,
  isArchive: false,
};

const parseFormData = (formData) => {
  const date = formData.get(`date`);
  const repeatingDays = WEEK_DAYS.reduce((acc, day) => {
    acc[day] = false;
    return acc;
  }, {});

  return new TaskModel({
    "description": formData.get(`text`),
    "due_date": date ? new Date(date) : null,
    "repeating_days": formData.getAll(`repeat`).reduce((acc, it) => {
      acc[it] = true;
      return acc;
    }, repeatingDays),
    "color": formData.get(`color`),
    "is_favorite": false,
    "is_done": false,
  });
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._taskComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._formComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task, mode) {
    const oldTaskComponent = this._taskComponent;
    const oldFormComponent = this._formComponent;
    this._mode = mode;

    this._taskComponent = new TaskComponent(task);
    this._formComponent = new FormComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      const newTask = TaskModel.clone(task);
      newTask.isArchive = !newTask.isArchive;
      this._onDataChange(this, task, newTask);
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      const newTask = TaskModel.clone(task);
      newTask.isFavorite = !newTask.isFavorite;
      this._onDataChange(this, task, newTask);
    });

    this._formComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._formComponent.getData();
      const data = parseFormData(formData);
      this._forCmomponent.setData({
        saveButtonText: `Saving...`,
      });
      this._onDataChange(this, task, data);
    });

    this._formComponent.setDeleteButtonClickHandler(() => {
      this._formComponent.setData({
        deleteButtonText: `Deleting...`,
      });
      this._onDataChange(this, task, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldFormComponent && oldTaskComponent) {
          replace(this._taskComponent, oldTaskComponent);
          replace(this._formComponent, oldFormComponent);
          this._replaceFormToTask();
        } else {
          render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldFormComponent && oldTaskComponent) {
          remove(oldTaskComponent);
          remove(oldFormComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._formComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToTask();
    }
  }

  destroy() {
    remove(this._formComponent);
    remove(this._taskComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceFormToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._formComponent.reset();
    if (document.contains(this._formComponent.getElement())) {
      replace(this._taskComponent, this._formComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToForm() {
    this._onViewChange();
    replace(this._formComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  shake() {
    this._formComponent.getElement().style.animation = `shake ${SHAKE_TIMEOUT / 1000}s`;
    this._taskComponent.getElement().style.animation = `shake ${SHAKE_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._formComponent.getElement().style.animation = ``;
      this._taskComponent.getElement().style.animation = ``;
      this._taskEditComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_TIMEOUT);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyTask, null);
      }
      this._replaceFormToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
