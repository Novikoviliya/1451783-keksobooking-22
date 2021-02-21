'use strict';
const housePrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const form = document.querySelector('.ad-form');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const price = form.querySelector('#price');
const typeFlat = form.querySelector('#type');

/*выбор опции меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь»;*/
const setMinPrice = () => {
  const minPrice = housePrice[typeFlat.value];

  price.placeholder = minPrice;
  price.min = minPrice;
};

typeFlat.addEventListener('change', () => {
  setMinPrice();
});

/*выбор опции одного поля автоматически изменят значение другого.*/
timeIn.addEventListener('change', () => {
  toSyncTimeOut();
});

timeOut.addEventListener('change', () => {
  toSyncTimeIn();
});

const toSyncTimeOut = () => {
  timeOut.value = timeIn.value;
};

const toSyncTimeIn = () => {
  timeIn.value = timeOut.value;
};
