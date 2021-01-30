'use strict';

((min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.random() * (maxValue - minValue + 1) + minValue;
})();

((min, max) => Math.random() * (max - min) + min)();