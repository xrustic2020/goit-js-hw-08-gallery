import images from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('div.lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  buttonCloseModal: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
  overlay: document.querySelector('.lightbox__overlay'),
  galleryImage: document.querySelectorAll('.gallery__image'),
};

// Создание разметки

const markup = images.map(({ preview, original, description }, index) => {
  return `<li class="gallery__item">
    <a 
      class="gallery__link"
      href="#"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        data-index="${index}"
        alt="${description}"
      />
    </a>
  </li>`;
});

refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));

// Функция при нажатии на ESC

const onEscKeyPress = function (evt) {
  if (evt.code === 'Escape') {
    closeModalWindow();
  }
};

// Функция при нажатии на ArrowRight и ArrowLeft

const onKeyboardEvent = function (evt) {
  const index = images.indexOf(
    images.find(images => images.original === refs.modalImage.src),
  );

  if (evt.code === 'ArrowRight') {
    const within = index + 1 <= images.length - 1;

    if (within) {
      refs.modalImage.src = images[index + 1].original;
      refs.modalImage.alt = images[index + 1].description;
    }
  }

  if (evt.code === 'ArrowLeft') {
    const within = index - 1 >= 0;

    if (within) {
      refs.modalImage.src = images[index - 1].original;
      refs.modalImage.alt = images[index - 1].description;
    }
  }
};

// Функция закрытия модального окна

const closeModalWindow = function () {
  refs.modalImage.src = '';
  refs.lightbox.classList.remove('is-open');

  console.log('Удаляю обработчик на ESC');
  console.log('Удаляю обработчик на ArrowRight и ArrowLeft');
};

// Функция открытия модального окна

const openImageModalWindow = function (evt) {
  refs.lightbox.classList.add('is-open');

  refs.modalImage.src = evt.target.dataset.source;
  refs.modalImage.alt = evt.target.alt;

  refs.buttonCloseModal.addEventListener('click', closeModalWindow, {
    once: true,
  });

  refs.overlay.addEventListener('click', closeModalWindow, { once: true });

  console.log('Добавляю обработчик на ESC');
  window.addEventListener('keydown', onEscKeyPress, { once: true });

  console.log('Добавляю обработчик на ArrowRight и ArrowLeft');
  window.addEventListener('keydown', onKeyboardEvent);
};

// Слушатель события при нажатии на картинку из галереи

refs.gallery.addEventListener('click', openImageModalWindow);
