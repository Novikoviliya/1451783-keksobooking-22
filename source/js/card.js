const TYPES_GENERATION = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const generatePhotosList = (array, element) => {
  const photosList = element.querySelector('.popup__photos');
  if (!array.length) {
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


const insertFeatures = (array, element) => {
  const featuresList = element.querySelector('.popup__features');
  if (!array.length) {
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
const renderCard = (point) => {
  const card = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  const type = card.querySelector('.popup__type');
  point.offer.type ? type.textContent = TYPES_GENERATION[point.offer.type] : type.remove();

  const title = card.querySelector('.popup__title');
  point.offer.title ? title.textContent = point.offer.title : title.remove();

  const address = card.querySelector('.popup__text--address');
  point.offer.address ? address.textContent = point.offer.address : address.remove();

  const price = card.querySelector('.popup__text--price');
  point.offer.price ? price.textContent = point.offer.price+ ' ₽/ночь' : price.remove();

  insertFeatures(point.offer.features, card);
  generatePhotosList(point.offer.photos, card);

  const description = card.querySelector('.popup__description');
  point.offer.description ? description.textContent = point.offer.description : description.remove();
  const avatar = card.querySelector('.popup__avatar');
  point.offer.avatar ? avatar.src = point.offer.avatar  : avatar.remove();

  const capacity = card.querySelector('.popup__text--capacity');
  capacity ? capacity.textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей'  : capacity.remove();
  const time = card.querySelector('.popup__text--time');
  time ? time.textContent = 'Заезд после ' + point.offer.checkin + ', выезд до ' + point.offer.checkout : time.remove();

  return card;
};

export { renderCard };
