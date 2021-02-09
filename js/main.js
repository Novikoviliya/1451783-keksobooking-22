'use strict';

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
const TYPE = ['palace',
  'flat',
  'house',
  'bungalow',
];
const FEATURE = [
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
const ART = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const CoorX = {
  MIN: 35.65000,
  MAX: 35.70000,
};
const DECIMAL_FOR_LOCATION = 5;
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
  MAX: 100,
};

/*Функция случайное число с точкой*/
const getRandomValue = (min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.random() * (maxValue - minValue + 1) + minValue;
}
getRandomValue(1, 5);

/*Функция  число*/
const getRandom = (min, max) => Math.random() * (max - min) + min;
getRandom(1, 5);

/*Описание автора*/
const getAuthor = () => ({
  avatar: `img/avatars/user0${getRandom(ImageNumber.MIN, ImageNumber.MAX)}.png`,
});
/*Длина массива рандом*/
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
/*Локация*/
const getLocation = () => ({
  x: getRandomValue(CoorX.MIN, CoorX.MAX, DECIMAL_FOR_LOCATION),
  y: getRandomValue(CoorY.MIN, CoorY.MAX, DECIMAL_FOR_LOCATION),
});

const getRandomArrayElement = function(elements) {
  return elements[getRandom(0, elements.length - 1)];
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
  features: getSingleArray(FEATURE),
  description: getRandomArrayElement(DESCRIPTION),
  photos: getSingleArray(ART),
});
const getObject = () => ({
  author: getAuthor(),
  offer: generateOffer(),
  location: getLocation(),
});

const createGame = new Array(10).fill(null).map(getObject);

createGame;
