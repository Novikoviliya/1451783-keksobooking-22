'use strict';

const  getRandomValue =  (min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.random() * (maxValue - minValue + 1) + minValue;
}
getRandomValue(1,5);

const  getRandom = (min, max) => Math.random() * (max - min) + min;
getRandom(1,5);
