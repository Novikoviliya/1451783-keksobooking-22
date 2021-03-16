import { isEscEvent, isMouseEvent, isEnterEvent } from './util.js';
import { sendData } from './server.js';
import { resetMarkerAndAddress } from './map.js';
import { cleanPhoto } from './filter-image';

const LOCATION_PRECISION = 5;
const housesPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
//здесь поправить опечатку https://prnt.sc/10lauaw Убрал s
const room = {
  '1': { '1': 'для 1 гостя' },
  '2': { '2': 'для 2 гостей', '1': 'для 1 гостя' },
  '3': { '3': 'для 3 гостей', '2': 'для 2 гостей', '1': 'для 1 гостя' },
  '100': { '0': 'не для гостей' },
};

const form = document.querySelector('.ad-form');
const main = document.querySelector('main');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFields = mapFilters.querySelectorAll('label, input, select');
const formFields = form.querySelectorAll('label, input, select, textarea, button');
const numberRooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const address = form.querySelector('#address');
const checkinSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');
const price = form.querySelector('#price');
const typeFlat = form.querySelector('#type');
const resetButton = form.querySelector('.ad-form__reset');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorButton = errorMessage.querySelector('.error__button');
//выбор опции меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь»
const setMinPrice = () => {
  const minPrice = housesPrice[typeFlat.value];

  price.placeholder = minPrice;
  price.min = minPrice;
};

typeFlat.addEventListener('change', () => {
  setMinPrice();
});

//исправьте на просто syncTimeOut/syncTimeIn. Плюс у вас одна строка которую вы можете сразу в обработчике написать, наверно нет смысла делать отдельную функцию. В целом хорошо бы эти 2 функции объединить в одну. Но если не получится, то просто переименуйте
checkinSelect.addEventListener('change', () => {
  checkoutSelect.value = checkinSelect.value;
});

checkoutSelect.addEventListener('change', () => {
  checkinSelect.value = checkoutSelect.value;
});
//НЕактивное состояние формы
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
//Активное состояние формы
const enableForm = (form, fields) => {
  changeName();
  form.classList.remove(className);
  fields.forEach((field) => {
    field.disabled = false;
  })
};
//Отключение формы нет карты
const deactivateMapForm = () => {
  disableForm(form, formFields);
  disableForm(mapFilters, mapFiltersFields);
}
deactivateMapForm();
//здесь заменить на обращение к свойству https://prnt.sc/10lay18 убрал readonly
const activateMapForm = () => {
  enableForm(form, formFields);
  enableForm(mapFilters, mapFiltersFields);
}
//Ручное редактирование запрещено
const fillAddress = (addressInput, coordinates) => {
  const lat = coordinates.lat.toFixed(LOCATION_PRECISION);
  const lng = coordinates.lng.toFixed(LOCATION_PRECISION);
  addressInput.value = `${lat}, ${lng}`;
  address.setAttribute('readonly', 'readonly');
}
//Проверка комнат и гостей
const addCustomValiditytoCapacity = () => {
  guests.setCustomValidity('');

  if (!Object.keys(room[numberRooms.value]).includes(guests.value)) {
    guests.setCustomValidity(`При выборе ${numberRooms.value} ${(numberRooms.value, 'комнаты', 'комнат', 'комнат')} доступны места:
    ${Object.values(room[numberRooms.value]).join(', ')}.`);
  }

  guests.reportValidity();
}

numberRooms.addEventListener('change', addCustomValiditytoCapacity);

guests.addEventListener('change', addCustomValiditytoCapacity);
//тоже самое, лучше в map сделать функцию которая ресетит маркер, чем снова дублировать https://prnt.sc/10lapei
const resetForm = () => {
  form.reset();
  mapFilters.reset();
  cleanPhoto();
  resetMarkerAndAddress();
};

resetButton.addEventListener('click', resetForm);

// Показ сообщения при успешной отправке
const getSuccessMessage = () => {
  successMessage.style.zIndex = 1000;
  main.append(successMessage);
  resetForm();
  document.addEventListener('keydown', closeSuccessMessage);
  document.addEventListener('click', closeSuccessMessage);
}
//https://prnt.sc/10lazfi
const closeSuccessMessage = (evt) => {
  if (isEnterEvent(evt) || isMouseEvent(evt)) {
    evt.preventDefault();
    successMessage.remove();
    document.removeEventListener('keydown', closeSuccessMessage);
    document.removeEventListener('click', closeSuccessMessage);
  }
}

// Показ сообщения при ошибке отправления
const getErrorMessage = () => {
  errorMessage.style.zIndex = 1000;
  main.append(errorMessage);
  document.addEventListener('keydown', closeErrorMessage);
  document.addEventListener('click', closeErrorMessage);
  errorButton.addEventListener('click', closeErrorMessage);
}
//https://prnt.sc/10lazfi
const closeErrorMessage = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    errorMessage.remove();
    document.removeEventListener('keydown', closeErrorMessage);
    document.removeEventListener('click', closeErrorMessage);
    errorButton.removeEventListener('click', closeErrorMessage);
  }
}

// Отправка формы
const setFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(getSuccessMessage, getErrorMessage, new FormData(evt.target));
  });
};

setFormSubmit();
export { deactivateMapForm, activateMapForm, fillAddress, mapFilters, address };
