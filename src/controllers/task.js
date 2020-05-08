import TaskComponent from "../components/task.js";
import FormComponent from "../components/form.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";
import {COLOR} from "../constants.js";

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
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._formComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._formComponent.getData();
      this._onDataChange(this, task, data);
    });

    this._formComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, task, null));

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
