'use strict';
import { getRandomArrayElement, getRandom, getRandomValue } from './util.js'
const TITLE = [
  'Radisson',
  'Mercure',
  'Buen retiro',
  'Hotel baltika',
];
const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const LOCATION_PRECISION = 5;
const TYPE = [
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
const DESCRIPTION = [
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
const ImageNumber = {
  MIN: 1,
  MAX: 8,
};

const NumberForOffer = {
  MIN: 0,
  MAX: 10,
};

const PriceNumber = {
  MIN: 0,
  MAX: 10000,
};
//Описание автора
const getAuthor = () => ({
  avatar: `img/avatars/user0${getRandom(ImageNumber.MIN, ImageNumber.MAX)}.png`,
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
  title: getRandomArrayElement(TITLE),
  address: Object.values(getLocation()),
  price: getRandom(PriceNumber.MIN, PriceNumber.MAX),
  type: getRandomArrayElement(TYPE),
  rooms: getRandom(NumberForOffer.MIN, NumberForOffer.MAX),
  guests: getRandom(NumberForOffer.MIN, NumberForOffer.MAX),
  checkin: getRandomArrayElement(CHECKIN_TIME),
  checkout: getRandomArrayElement(CHECKOUT_TIME),
  features: getSingleArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTION),
  photos: getSingleArray(PHOTOS),
});
const getObject = () => ({
  author: getAuthor(),
  offer: generateOffer(),
  location: getLocation(),
});

const createGame = () => new Array(10).fill(null).map(getObject);
export { createGame, LOCATION_PRECISION };
