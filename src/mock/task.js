import {COLORS, DESCR_ITEMS} from '../components/constants.js';
import {getRandomArrayItem, getRandomDate, generateRepeatingDays} from "../components/utils.js";

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
