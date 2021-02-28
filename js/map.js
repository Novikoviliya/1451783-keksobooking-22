'use strict';
/* global L:readonly */
import { fillAddress, activateMapForm } from './form.js';
import { renderCard } from './card.js';
import { getData } from './server.js';
import { showAlert } from './util.js';
const map = L.map('map-canvas')
  .on('load', () => { activateMapForm(); })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [45, 45],
  iconAnchor: [45 / 2, 45],
});

const mainMarker = L.marker({
  lat: 35.6895,
  lng: 139.692,
}, {
  draggable: true,
  icon: mainIcon,
}).addTo(map);
//По умолчанию значение координат
const tokyoCoor = {
  lat: 35.6895,
  long: 139.692,
}
fillAddress(tokyoCoor);
//При движении балуна
const onMove = (evt) => {
  const addressLoc = {
    lat: evt.target.getLatLng().lat,
    long: evt.target.getLatLng().lng,
  }
  fillAddress(addressLoc);
}

mainMarker.on('move', onMove);
//Отображение объявления
const processData = async() => {
  let adOffers = [];
  const OFFERS_CARD_NUMBER = 10;
  try {
    adOffers = await getData();
  } catch (err) {
    showAlert('При загрузке данных с сервера произошла ошибка запроса');
  }

  adOffers.length > OFFERS_CARD_NUMBER ? adOffers.length = OFFERS_CARD_NUMBER : null;
  adOffers.forEach((card) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [40 / 2, 40],
    });
    const lat = card.location.lat;
    const lng = card.location.lng;
    const marker = L.marker({
      lat,
      lng,
    }, {
      icon,
    });

    marker
      .addTo(map)
      .bindPopup(
        renderCard(card), {
          keepInView: true,
        },
      );
  });
}
//Удаление маркера
const removePins = () => {
  map.eachLayer((marker) => {
    if (marker instanceof L.Marker && marker !== mainMarker) {
      marker.remove();
    }
  })
};
processData();
export { mainMarker,processData, removePins };



