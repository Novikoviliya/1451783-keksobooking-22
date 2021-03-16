import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import debounce from 'lodash/debounce';

import { fillAddress, activateMapForm, address } from './form.js';
import { renderCard } from './card.js';
import { getData } from './server.js';
import { filterAdverts, setFilterChange, setFilterReset, enableFilter, disableFilter } from './filter.js';
import { showAlert } from './util.js';

const CREATE_PINS_DELAY = 500;
const MAP_ZOOM = 13;
const TOKYO_CITY_CENTER_COORD = {
  lat: 35.6895,
  lng: 139.692,
};
const LITTLE_PIN_ICON = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const MAIN_PIN_ICON = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [46, 46],
  iconAnchor: [23, 46],
});
const map = L.map('map-canvas')
  .on('load', () => {
    activateMapForm();
    disableFilter();
    fillAddress(address, TOKYO_CITY_CENTER_COORD);
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
  .setView(TOKYO_CITY_CENTER_COORD, MAP_ZOOM);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
const mainMarker = L.marker(
  TOKYO_CITY_CENTER_COORD, {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
);

const adLayer = L.layerGroup().addTo(map);
mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  fillAddress(address, evt.target.getLatLng());
});
const resetMarkerAndAddress = () => {
  map.setView(TOKYO_CITY_CENTER_COORD, MAP_ZOOM);
  map.closePopup();
  mainMarker.setLatLng(TOKYO_CITY_CENTER_COORD);
  fillAddress(address, TOKYO_CITY_CENTER_COORD);
}
const processData = (similarData) => {
  map.closePopup();
  adLayer.clearLayers();
  filterAdverts(similarData)
    .forEach((ad) => {
      const lat = ad.location.lat;
      const lng = ad.location.lng;
      const addMarkerIcon = L.marker({
        lat,
        lng,
      }, {
        icon: LITTLE_PIN_ICON,
      });

      addMarkerIcon
        .addTo(adLayer)
        .bindPopup(renderCard(ad));
    });
}
export { processData, resetMarkerAndAddress };
