'use strict';
import { getRandomArrayElement, getRandom, getRandomValue } from './util.js'
const TITLES = [
  'Radisson',
  'Mercure',
  'Buen retiro',
  'Hotel baltika',
];
const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const LOCATION_PRECISION = 5;
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Отель Mercure Kaliningrad с террасой расположен в Калининграде',
  'К услугам гостей бесплатный Wi-Fi на всей территории и платная подземная парковка.',
  'Предоставляется бесплатный Wi-Fi. Второй раз здесь.',
  'К услугам гостей ночной клуб и бесплатный доступ в интернет.',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const CoorX = {
  MIN: 35.65000,
  MAX: 35.70000,
};
const CoorY = {
  MIN: 139.70000,
  MAX: 139.80000,
};
const ImageNumbers = {
  MIN: 1,
  MAX: 8,
};

const NumberForOffers = {
  MIN: 0,
  MAX: 10,
};

const PriceNumbers = {
  MIN: 0,
  MAX: 10000,
};
//Описание автора
const getAuthor = () => ({
  avatar: `img/avatars/user0${getRandom(ImageNumbers.MIN, ImageNumbers.MAX)}.png`,
});

//Локация
const getLocation = () => ({
  x: getRandomValue(CoorX.MIN, CoorX.MAX),
  y: getRandomValue(CoorY.MIN, CoorY.MAX),
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
  title: getRandomArrayElement(TITLES),
  address: Object.values(getLocation()),
  price: getRandom(PriceNumbers.MIN, PriceNumbers.MAX),
  type: getRandomArrayElement(TYPES),
  rooms: getRandom(NumberForOffers.MIN, NumberForOffers.MAX),
  guests: getRandom(NumberForOffers.MIN, NumberForOffers.MAX),
  checkin: getRandomArrayElement(CHECKIN_TIMES),
  checkout: getRandomArrayElement(CHECKOUT_TIMES),
  features: getSingleArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getSingleArray(PHOTOS),
});
const getObject = () => ({
  author: getAuthor(),
  offer: generateOffer(),
  location: getLocation(),
});

const createGame = () => new Array(10).fill(null).map(getObject);
export { createGame, LOCATION_PRECISION };