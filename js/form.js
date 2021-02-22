'use strict';
import { LOCATION_PRECISION } from './data.js';
const housePrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFields = mapFilters.querySelectorAll('label, input, select');
const formFields = form.querySelectorAll('label, input, select, textarea, button');
const address = form.querySelector('#address');
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
//НЕактивное состояние
let className = null;
const changeName = () => {
  mapFilters ? className = 'map__filters--disabled' : className = 'ad-form--disabled';
}
const disableForm = (form, fields) => {
  changeName();
  form.classList.add(className);
  fields.forEach((field) => {
    field.disabled = true;
  })
};
const enableForm = (form, fields) => {
  changeName();
  form.classList.remove(className);
  fields.forEach((field) => {
    field.disabled = false;
  })
};
const deactivateMapForm = () => {
  disableForm(form, formFields);
  disableForm(mapFilters, mapFiltersFields);
}
const activateMapForm = () => {
  enableForm(form, formFields);
  enableForm(mapFilters, mapFiltersFields);
  address.setAttribute('readonly', 'readonly');
}

const fillAddress = ({ lat, long }) => {
  const latitude = lat.toFixed(LOCATION_PRECISION);
  const longitude = long.toFixed(LOCATION_PRECISION);
  address.value = `${latitude} ${longitude}`;
}

export { deactivateMapForm, activateMapForm, fillAddress };
