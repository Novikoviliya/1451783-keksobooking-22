const filter = document.querySelector('.map__filters');

const selects = filter.querySelectorAll('select');

const typeSelect = filter.querySelector('#housing-type');

const priceSelect = filter.querySelector('#housing-price');

const roomsSelect = filter.querySelector('#housing-rooms');

const guestsSelect = filter.querySelector('#housing-guests');

const featuresSelect = filter.querySelector('#housing-features');

const disableFilter = () => {
  filter.classList.add('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = true;
  });
  featuresSelect.disabled = true;
};

disableFilter();

const enableFilter = () => {
  filter.classList.remove('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = false;
  });
  featuresSelect.disabled = false;
};

const getFilterByPrice = (card) => {
  const LOW_PRICE = 10000;

  const HIGH_PRICE = 50000;

  switch (priceSelect.value) {
    case 'low':
      return card.offer.price < LOW_PRICE;
    case 'middle':
      return card.offer.price >= LOW_PRICE && card.offer.price <= HIGH_PRICE;
    case 'high':
      return card.offer.price > HIGH_PRICE;
    case 'any':
      return true;
  }
};

const getFilterByFeatures = (card) => {
  const CHECKED_FEATURES = featuresSelect.querySelectorAll('input:checked');
  return Array.from(CHECKED_FEATURES).every((input) => {
    return card.offer.features.includes(input.value);
  });
};

const filterData = (card) => {
  const FILTER_BY_TYPE = typeSelect.value === 'any' || typeSelect.value === card.offer.type;

  const FILTER_BY_ROOMS = roomsSelect.value === 'any' || +roomsSelect.value === card.offer.rooms;

  const FILTER_BY_GUESTS = guestsSelect.value === 'any' || +guestsSelect.value === card.offer.guests;

  const FILTER_BY_PRICE = getFilterByPrice(card);

  const FILTER_BY_FEATURES = getFilterByFeatures(card);

  return FILTER_BY_TYPE && FILTER_BY_ROOMS && FILTER_BY_GUESTS && FILTER_BY_PRICE && FILTER_BY_FEATURES;
};
const setFilterChange = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
}
const setFilterReset = (cb) => {
  filter.addEventListener('reset', () => {
    setTimeout(() => {
      cb();
    }, 0);
  });
};
export { enableFilter, disableFilter, filter, filterData, setFilterReset, setFilterChange };