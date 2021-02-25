'use strict';
//Функция случайное целое число с точкой
const getRandomValue = (min, max) => {
  return Math.random() * (max - min) + min;
}
getRandomValue(1, 5);

//Функция случайное число
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
getRandom(1, 5);

const getRandomArrayElement = elements => {
  return elements[getRandom(0, elements.length - 1)];
};
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};
const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '32px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
}
export { getRandomArrayElement, getRandom, getRandomValue, isEscEvent, isEnterEvent, showAlert };