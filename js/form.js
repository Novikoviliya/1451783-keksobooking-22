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
const deactivateMapForm = () => {
  form.classList.add('ad-form--disabled');
  form.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.classList.add('disabled');
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
    filter.classList.add('disabled');
  })

  mapFilters.querySelectorAll('.map__features').forEach((feature) => {
    feature.classList.add('disabled');
  })
}

const fillAddress = ({ lat, long }) => {
  const latitude = lat.toFixed(LOCATION_PRECISION);
  const longitude = long.toFixed(LOCATION_PRECISION);
  address.value = `${latitude} ${longitude}`;
}

const activateMapForm = (startingAddress) => {
  return () => {
    form.classList.remove('ad-form--disabled');

    form.querySelectorAll('fieldset').forEach((fieldset) => {
      fieldset.classList.remove('disabled');
    });

    mapFilters.classList.remove('map__filters--disabled');
    mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
      filter.classList.remove('disabled');
    });

    mapFilters.querySelectorAll('.map__features').forEach((feature) => {
      feature.classList.remove('disabled');
    });

    address.setAttribute('readonly', 'readonly');

    fillAddress(startingAddress);
  }
}

export { deactivateMapForm, activateMapForm, fillAddress };
