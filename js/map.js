'use strict';
import { deactivateMapForm, activateMapForm, fillAddress } from './form.js';
import { createGame } from './data.js';
import { renderCard } from './card.js';

deactivateMapForm();
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

const onMove = (evt) => {
  const addressLoc = {
    lat: evt.target.getLatLng().lat,
    long: evt.target.getLatLng().lng,
  }
  fillAddress(addressLoc);
}
mainMarker.on('move', onMove);
//Всплывашка
const adCards = createGame();

const createadCards = () => {
  adCards.forEach(({ author, offer, location }) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [40 / 2, 40],
    });
    const lat = location.x;
    const lng = location.y;
    const marker = L.marker({
      lat,
      lng,
    }, {
      icon,
    });

    marker
      .addTo(map)
      .bindPopup(
        renderCard({ author, offer }), {
          keepInView: true,
        },
      );
  });
}
export { createadCards };
