'use strict'
const getData = async() => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json());
};
const sendData = (onSuccess, onFail, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking', { method: 'POST', body })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };
