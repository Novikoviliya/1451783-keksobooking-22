const FILE_NAMES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarTake = document.querySelector('.ad-form-header__input');
const photoTake = document.querySelector('.ad-form__input');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const photoPreview = document.querySelector('.ad-form__photo');
//Копии
const isMatching = (expansion) => {
  return FILE_NAMES.some((it) => {
    return expansion.endsWith(it);
  })
}
//надо заменить https://prnt.sc/10lawl2
const cleanPhoto = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreview.innerHTML = '';
};

const setFileImage = (selector, preview) => {
  const file = selector.files[0];
  const fileName = file.name.toLowerCase();

  if (isMatching(fileName)) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.style.display = 'flex';
      preview.style.justifyContent = 'center';
      preview.style.alignItems = 'center';
      preview.style.minWidth = preview.offsetWidth + 'px';
      preview.style.padding = '0';
      preview.innerHTML = '';

      const element = document.createElement('img');

      element.src = reader.result;
      element.style.maxWidth = preview.offsetWidth + 'px';
      element.style.maxHeight = preview.offsetHeight + 'px';

      preview.appendChild(element);
    });

    reader.readAsDataURL(file);
  }
}

avatarTake.addEventListener('change', () => {
  setFileImage(avatarTake, avatarPreview);
});

photoTake.addEventListener('change', () => {
  setFileImage(photoTake, photoPreview);
});
export {cleanPhoto};
