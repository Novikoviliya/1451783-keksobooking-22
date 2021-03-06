'use strict';
import { getRandomArrayElement, getRandom, getRandomValue } from './util.js'
//Описание автора
const LOCATION_PRECISION = 5;
const getAuthor = () => ({
  avatar: `img/avatars/user0${getRandom()}.png`,
});

//Локация
const getLocation = () => ({
  x: getRandomValue(),
  y: getRandomValue(),
});

//Длина массива рандом
const getSingleArray = (items) => {
  const singleArray = [];
  for (let i = 0; i <= getRandom(0, items.length - 1); i++) {
    const singleIndex = getRandom(0, items.length - 1);
    if (singleArray.indexOf(items[singleIndex]) === -1) {
      singleArray.push(items[singleIndex]);
    }
  }
  return singleArray;
};
const generateOffer = () => ({
  title: getRandomArrayElement(),
  address: Object.values(getLocation()),
  price: getRandom(),
  type: getRandomArrayElement(),
  rooms: getRandom(),
  guests: getRandom(),
  checkin: getRandomArrayElement(),
  checkout: getRandomArrayElement(),
  features: getSingleArray(),
  description: getRandomArrayElement(),
  photos: getSingleArray(),
});
const getObject = () => ({
  author: getAuthor(),
  offer: generateOffer(),
  location: getLocation(),
});

export { LOCATION_PRECISION, getObject };
