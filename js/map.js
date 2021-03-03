'use strict';
/* global L:readonly */
/* global _:readonly */
import { fillAddress, activateMapForm } from './form.js';
import { renderCard } from './card.js';
import { enableFilter, disableFilter} from './filter.js';
import { getData } from './server.js';
import { filterData, setFilterChange, setFilterReset } from './filter.js';
import { showAlert } from './util.js';
const CREATE_PINS_DELAY = 500;
const OFFERS_CARD_NUMBER = 10;
const map = L.map('map-canvas')
  .on('load', () => {
    activateMapForm();
    disableFilter();
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
const adLayer = L.layerGroup().addTo(map);
const processData = similarData => {
  map.closePopup();
  adLayer.clearLayers();

  similarData
    .filter(filterData)
    .slice(0, OFFERS_CARD_NUMBER)
    .forEach((ad) => {
      const littleIcon = L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [40 / 2, 40],
      });
      const lat = ad.location.lat;
      const lng = ad.location.lng;
      const littleMarkerIcon = L.marker({
        lat,
        lng,
      }, {
        littleIcon,
      });

      littleMarkerIcon
        .addTo(adLayer)
        .bindPopup(renderCard(ad));
    });
}
getData((data) => {
  processData(data);
  enableFilter();
  setFilterReset(() => processData(data));
  setFilterChange(_.debounce(
    () => processData(data),
    CREATE_PINS_DELAY,
  ));
}, showAlert);
export { mainMarker, processData };
