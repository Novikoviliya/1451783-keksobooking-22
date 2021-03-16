const LOW_PRICE = 10000;

const HIGH_PRICE = 50000;

const STANDART_FILTER_VALUE = 'any';

const filters = document.querySelector('.map__filters');

const selects = filters.querySelectorAll('select');

const typesSelect = filters.querySelector('#housing-type');

const priceSelect = filters.querySelector('#housing-price');

const roomsSelect = filters.querySelector('#housing-rooms');

const guestsSelect = filters.querySelector('#housing-guests');

const featuresSelect = filters.querySelector('#housing-features');

const disableFilter = () => {
  filters.classList.add('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = true;
  });
  featuresSelect.disabled = true;
};
disableFilter();

const enableFilter = () => {
  filters.classList.remove('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = false;
  });
  featuresSelect.disabled = false;
};

const getFilterByPrice = (card) => {
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
  const checkedFeatures = featuresSelect.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every((input) => {
    return card.offer.features.includes(input.value);
  });
};

const filterData = (card) => {
  const typesFilter = typesSelect.value === STANDART_FILTER_VALUE || typesSelect.value === card.offer.type;

  const roomsFilter = roomsSelect.value === STANDART_FILTER_VALUE || +roomsSelect.value === card.offer.rooms;

  const guestsFilter = guestsSelect.value === STANDART_FILTER_VALUE || +guestsSelect.value === card.offer.guests;

  const priceFilter = getFilterByPrice(card);

  const featuresFilter = getFilterByFeatures(card);

  return typesFilter && roomsFilter && guestsFilter && priceFilter && featuresFilter;
};
const filterAdverts = (adverts) => {
  const filteredData = [];
  for (let i = 0; i < adverts.length; i++) {
    if (filteredData.length >= 10) {
      return filteredData;
    }
    if (filterData(adverts[i])) {
      filteredData.push(adverts[i])
    }
  }
  return filteredData;
}

const setFilterChange = (cb) => {
  filters.addEventListener('change', () => {
    cb();
  });
}
const setFilterReset = (cb) => {
  filters.addEventListener('reset', () => {
    setTimeout(() => {
      cb();
    }, 0);
  });
};
export { enableFilter, disableFilter, filters, filterAdverts, setFilterReset, setFilterChange };
