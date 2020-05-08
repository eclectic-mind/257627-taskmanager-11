import moment from "moment";

export const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length);
  return array[randomIndex];
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0, 8);
  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};

export const generateRepeatingDays = (days) => {
  return Object.assign({}, days, {
    "mo": Math.random() > 0.5,
  });
};

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

export const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isSameDay(date, dueDate);
};

export const isSameDay = (dateOne, dateTwo) => {
  const a = moment(dateOne);
  const b = moment(dateTwo);
  return a.diff(b, `days`) === 0 && dateOne.getDate() === dateTwo.getDate();
};
