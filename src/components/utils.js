export const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
}

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length);
  return array[randomIndex];
}

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0, 8);
  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
}

export const generateRepeatingDays = (days) => {
  return Object.assign({}, days, {
    "mo": Math.random() > 0.5,
  });
}

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
}

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());
  return `${hours}:${minutes}`;
}
