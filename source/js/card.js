'use strict'
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const imgTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
const TYPES_GENERATION = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}
//Вставка изображений
const insertPhotos = (element, array) => {
  element.innerHTML = '';

  array.forEach((item) => {
    const adPhoto = imgTemplate.cloneNode(true);
    adPhoto.src = item;
    element.appendChild(adPhoto);
  });
};
//Удобства
const insertFeatures = (element, array) => {
  element.innerHTML = '';

  array.forEach((item) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + item);
    element.appendChild(featureItem);
  });
};
const renderCard = (card) => {
  const { author, offer } = card;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__type').textContent = TYPES_GENERATION[offer.type];
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  insertFeatures(cardElement.querySelector('.popup__features'), offer.features);
  insertPhotos(cardElement.querySelector('.popup__photos'), offer.photos);
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  return cardElement;
};

export { renderCard };
