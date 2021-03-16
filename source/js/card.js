const TYPES_GENERATION = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}



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
const renderCard = (point) => {
  const card = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  card.querySelector('.popup__type').textContent = TYPES_GENERATION[point.offer.type];
  card.querySelector('.popup__title').textContent = point.offer.title;
  card.querySelector('.popup__text--address').textContent = point.offer.address;
  card.querySelector('.popup__text--price').textContent = point.offer.price + ' ₽/ночь';
  insertFeatures(point.offer.features, card);
  generatePhotosList(point.offer.photos, card);
  card.querySelector('.popup__text--capacity').textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + point.offer.checkin + ', выезд до ' + point.offer.checkout;
  card.querySelector('.popup__description').textContent = point.offer.description;
  card.querySelector('.popup__avatar').src = point.author.avatar;
  card.querySelectorAll('*').forEach((item) => {
    if (item.children.lenght === 0) {
      item.remove();
    }
  });
  return card;
};

export { renderCard };
