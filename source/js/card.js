const TYPES_GENERATION = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const generatePhotosList = (array, element) => {
  const photosList = element.querySelector('.popup__photos');
  if (!array.length) {
    photosList.remove();
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
    featuresList.remove();
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

  const { offer, author } = point;

  const type = card.querySelector('.popup__type');
  offer.type ? type.textContent = TYPES_GENERATION[offer.type] : type.remove();

  const title = card.querySelector('.popup__title');
  offer.title ? title.textContent = offer.title : title.remove();

  const address = card.querySelector('.popup__text--address');
  offer.address ? address.textContent = offer.address : address.remove();

  const price = card.querySelector('.popup__text--price');
  offer.price ? price.textContent = offer.price + ' ₽/ночь' : price.remove();

  insertFeatures(offer.features, card);
  generatePhotosList(offer.photos, card);

  const capacity = card.querySelector('.popup__text--capacity');
  offer.rooms && offer.guests ? capacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей' : capacity.remove();

  const time = card.querySelector('.popup__text--time');
  offer.checkin && offer.checkout ? time.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout : time.remove();

  const description = card.querySelector('.popup__description');
  offer.description ? description.textContent = offer.description : description.remove();

  const avatar = card.querySelector('.popup__avatar');
  author.avatar ? avatar.src = author.avatar : avatar.remove();
  return card;
};
export { renderCard };
