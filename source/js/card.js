//https://up.htmlacademy.ru/javascript/22/project/keksobooking#keksobooking-5-4 нет проверки на полей на неполные данные
//insertFeatures и generatePhotosList изменил функции
//https://prnt.sc/10lahbu поднять наверх
const TYPES_GENERATION = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

//Вставка изображений
const generatePhotosList = (array, element) => {
  const photosList = element.querySelector('.popup__photos');
  if(!array.length){
    element.remove();
    return;
  }
  photosList.innerHTML = '';

  array.forEach((item) => {
    const photoItem = document.createElement('img');
    photoItem.className = 'popup__photo';
    photoItem.src = item;
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt = 'Фотография жилья';
    photosList.appendChild(photoItem);
  })

  return photosList;
}

//Удобства
const insertFeatures = (array, element) => {
  const featuresList = element.querySelector('.popup__features');
  if(!array.length){
    element.remove();
    return;
  }
  featuresList.innerHTML = '';

  array.forEach((item) => {
    const featureItem = document.createElement('li');
    featureItem.className = `popup__feature popup__feature--${item}`;
    featuresList.appendChild(featureItem);
  });
  return featuresList;
};
const renderCard = (card) => {
  const { author, offer } = card;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__type').textContent = TYPES_GENERATION[offer.type];
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  insertFeatures(offer.features, cardElement);
  generatePhotosList(offer.photos, cardElement);
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  return cardElement;
};

export { renderCard };
