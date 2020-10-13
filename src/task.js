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

const onEscKeyPress = function(evt) {
  if (evt.code === 'Escape') {
    closeModalWindow();
  };
};

let imageIndex = 0;

const onKeyboardEvent = function (evt) {
  const imageRef = refs.modalImage.src;
  
  if (evt.code === 'ArrowRight') {
    images.forEach(({ original }, index, arr) => {
      if (original === imageRef) {
        imageIndex = index + 1;
        console.log(imageIndex);

        refs.modalImage.src = arr[imageIndex].original;
        refs.modalImage.alt = arr[imageIndex].description;
      }
    });
  }

  // if (evt.code === 'ArrowLeft') {

  //   refs.modalImage.src = '';
  //   refs.modalImage.alt = '';
  // }

  

  

  console.log(evt.code);
};

const closeModalWindow = function () {
  refs.modalImage.src = '';
  refs.lightbox.classList.remove('is-open');
  
  console.log('Удаляю обработчик на ESC');
  console.log('Удаляю обработчик на ArrowRight ArrowLeft');
};

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

  console.log('Добавляю обработчик на ArrowRight ArrowLeft');
  window.addEventListener('keydown', onKeyboardEvent);
};

refs.gallery.addEventListener('click', openImageModalWindow);


// console.log(refs.galleryImage);
