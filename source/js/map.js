'use strict';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import debounce from 'lodash/debounce';

import { fillAddress, activateMapForm } from './form.js';
import { renderCard } from './card.js';
import { getData } from './server.js';
import { filterData, setFilterChange, setFilterReset, enableFilter, disableFilter } from './filter.js';
import { showAlert } from './util.js';
const CREATE_PINS_DELAY = 500;
const OFFERS_CARD_NUMBER = 10;
const littleIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const map = L.map('map-canvas')
  .on('load', () => {
    activateMapForm();
    disableFilter();
    getData((data) => {
      processData(data);
      enableFilter();
      setFilterReset(() => processData(data));
      setFilterChange(debounce(
        () => processData(data),
        CREATE_PINS_DELAY,
      ));
    }, showAlert);
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [46, 46],
  iconAnchor: [23, 46],
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
const adLayer = L.layerGroup().addTo(map);
const processData = similarData => {
  map.closePopup();
  adLayer.clearLayers();

  similarData
    .filter(filterData)
    .slice(0, OFFERS_CARD_NUMBER)
    .forEach((ad) => {
      const lat = ad.location.lat;
      const lng = ad.location.lng;
      const littleMarkerIcon = L.marker({
        lat,
        lng,
      }, {
        icon: littleIcon,
      });

      littleMarkerIcon
        .addTo(adLayer)
        .bindPopup(renderCard(ad));
    });
}
export { mainMarker, processData };