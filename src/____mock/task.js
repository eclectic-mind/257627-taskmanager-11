import {COLORS, DESCR_ITEMS} from '../constants.js';
import {getRandomArrayItem, getRandomDate, generateRepeatingDays} from "../utils/common.js";

export const DefaultRepeatingDays = {
  "mo": false,
  "tu": false,
  "we": false,
  "th": false,
  "fr": false,
  "sa": false,
  "su": false,
};

export const generateTask = (days) => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    id: String(new Date() + Math.random()),
    description: getRandomArrayItem(DESCR_ITEMS),
    dueDate,
    repeatingDays: dueDate ? days : generateRepeatingDays(),
    color: getRandomArrayItem(COLORS),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

export const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};