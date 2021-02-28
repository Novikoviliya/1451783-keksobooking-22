'use strict';
import {mapFilters} from './form.js'
import{removePins, processData} from './map.js'
import {getData} from './server.js'
const mapMain = document.querySelector('.map');
const typeTake = mapFilters.querySelector('#housing-type');
const priceTake = mapFilters.querySelector('#housing-price');
const roomTake = mapFilters.querySelector('#housing-rooms');
const guestTake = mapFilters.querySelector('#housing-guests');
const featuresField = mapFilters.querySelector('#housing-features');
const featuresList = featuresField.querySelectorAll('.map__checkbox');
const filterByType = (card) => card.filter((card) => card.offer.type === typeTake.value || typeTake.value === 'any');
const filterByPrice = (card) => {
  if (priceTake.value === 'low') {
    return card.filter((card) => card.offer.price <= 1000);
  } else if (priceTake.value === 'middle') {
    return card.filter((card) => card.offer.price >= 1000 && card.offer.price <= 50000);
  } else if (priceTake.value === 'high') {
    return card.filter((card) => card.offer.price >= 5000);
  } else {
    return card;
  }
};

const filterByRoom = (card) => {
  if (roomTake.value === '1') {
    return card.filter((card) => card.offer.rooms === 1);
  } else if (roomTake.value === '2') {
    return card.filter((card) => card.offer.rooms === 2);
  } else if (roomTake.value === '3') {
    return card.filter((card) => card.offer.rooms === 3);
  } else {
    return card;
  }
};

const filterByGuests = (card) => {
  if (guestTake.value === '1') {
    return card.filter((card) => card.offer.guests === 1);
  } else if (guestTake.value === '2') {
    return card.filter((card) => card.offer.guests === 2);
  } else if (guestTake.value === '0') {
    return card.filter((card) => card.offer.guests > 2);
  } else {
    return card;
  }
};
const filterByFeatures = (card) => {
  for (let feature of featuresList) {
    if (feature.checked === true) {
      return card.filter((card) => card.offer.features.includes(feature.value));
    } else {
      return card;
    }
  }
}
mapFilters.addEventListener('change', (evt) => {
  removePins();
  if(evt.target.name === 'housing-type') {
    getData((card) => processData(filterByType(card)), mapMain);
  } else if (evt.target.name === 'housing-price') {
    getData((card) => processData(filterByPrice(card)), mapMain);
  } else if(evt.target.name === 'housing-rooms') {
    getData((card) => processData(filterByRoom(card)), mapMain);
  } else if (evt.target.name === 'housing-guests') {
    getData((card) => processData(filterByGuests(card)), mapMain);
  } else if (evt.target.name === 'features') {
    getData((card) => processData(filterByFeatures(card)), mapMain);
  }
});
