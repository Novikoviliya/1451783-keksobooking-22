'use strict';
/*Функция случайное число с точкой*/
const getRandomValue = (min, max) => {
  return Math.random() * (max - min) + min;
}
getRandomValue(1, 5);

/*Функция  число*/
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
getRandom(1, 5);

const getRandomArrayElement = elements => {
  return elements[getRandom(0, elements.length - 1)];
};
export { getRandomArrayElement, getRandom, getRandomValue };
