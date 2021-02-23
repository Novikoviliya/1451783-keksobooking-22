/* global L:readonly */
import { fillMap } from './map.js';
import { deactivateMapForm, activateMapForm } from './form.js';
deactivateMapForm();
const map = L.map('map-canvas')
  .on('load', () => { activateMapForm(); })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 13);
fillMap(map);
