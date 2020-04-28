import TaskComponent from "../components/task.js";
import FormComponent from "../components/form.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class TaskController {
  constructor(container, onDataChange) {
    this._container = container;
    this._taskComponent = null;
    this._onDataChange = onDataChange;
    this._formComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
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
      this._replaceEditToTask();
    });

    render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
  }

  _replaceFormToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._taskComponent, this._formComponent);
  }

  _replaceTaskToForm() {
    replace(this._formComponent, this._taskComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceFormToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
