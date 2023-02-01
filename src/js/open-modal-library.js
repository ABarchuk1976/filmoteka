import ModalFilm from './modal-film.js';
import { changeStore, getFilmData } from './common.js';

const gallery = document.querySelector('.js-gallery-library');
const closeBtn = document.querySelector('[data-modal-close]');
const btnWrapperRef = document.querySelector('.btn__wrapper');

const modalFilm = new ModalFilm();

function onBtnClick(evt) {
  const { nodeName, name: key } = evt.target;
  if (nodeName !== 'BUTTON') return;
  changeStore(key);
  modalFilm.rerenderBtnWrapper();
}

function onOpenModal(evt) {
  window.addEventListener('keydown', onCloseModalEsc);
  document.addEventListener('click', onOverlayClose);
  closeBtn.addEventListener('click', closeModal);

  const { id, nodeName, name } = evt.target;
  evt.preventDefault();

  if (nodeName !== 'IMG') return;

  const dataCurrentFilm = getFilmData(id);

  modalFilm.modifyDataFilm(dataCurrentFilm);
  modalFilm.open();

  btnWrapperRef.addEventListener('click', onBtnClick);
}

function closeModal() {
  modalFilm.close();

  window.removeEventListener('keydown', onCloseModalEsc);
  document.removeEventListener('click', onOverlayClose);
  closeBtn.removeEventListener('click', closeModal);

  window.location.reload();
}

function onOverlayClose(evt) {
  if (evt.target.classList.contains('backdrop')) closeModal();
}

function onCloseModalEsc(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

gallery.addEventListener('click', onOpenModal);
