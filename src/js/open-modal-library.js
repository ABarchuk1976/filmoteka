import { setStore, getStore, removeStore } from './local-storage.js';
import ModalFilm from './modal-film.js';
import { changeStore, getFilmData } from './common.js';

const gallery = document.querySelector('.js-gallery-library');
const closeBtn = document.querySelector('[data-modal-close]');
const btnWrapperRef = document.querySelector('.btn__wrapper');
// const btnWatched = document.querySelector('.btn_watched');
// const btnQueue = document.querySelector('.btn_queue');
const activeLibraryBtn = document.querySelector(
  '.filter__item>.filter__button--active'
);

const modalFilm = new ModalFilm();

gallery.addEventListener('click', onOpenModal);
closeBtn.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onCloseModalEsc);
document.addEventListener('click', onOverlayClose);

function onOpenModal(evt) {
  const { id, nodeName, name } = evt.target;

  evt.preventDefault();
  if (nodeName !== 'IMG') return;

  const dataCurrentFilm = getFilmData(id);

  modalFilm.modifyDataFilm(dataCurrentFilm);
  modalFilm.open();

  btnWrapperRef.addEventListener('click', onBtnClick);
}

function onBtnClick(evt) {
  const { nodeName, name: key } = evt.target;
  if (nodeName !== 'BUTTON') return;
  changeStore(key);
  modalFilm.rerenderBtnWrapper();
}

closeBtn.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onCloseModalEsc);

function onCloseModal() {
  modalFilm.close();

  closeBtn.removeEventListener('click', onCloseModal);
  window.removeEventListener('keydown', onCloseModalEsc);

  window.location.reload();
}

function onCloseModalEsc(e) {
  if (e.code === 'Escape') {
    modalFilm.close();

    closeBtn.removeEventListener('click', onCloseModal);
    window.removeEventListener('keydown', onCloseModalEsc);
  }
}

function onOverlayClose(e) {
  // e.preventDefault();

  if (!e.target.closest('.modal') && e.target.closest('.backdrop')) {
    onCloseModal();
  }
}
///////////// checks for button /////////////////

function checkWatchedStorage(currentFilm) {
  try {
    const getWatchedFromStorage = localStorage.getItem(KEY_WATCHED);
    const getWatchedArray = JSON.parse(getWatchedFromStorage);
    const checkWatchedStorage = getWatchedArray.find(
      option => option.id === currentFilm.id
    );
    if (checkWatchedStorage) {
      btnWatched.classList.replace('watched_send', 'watched_remove');
      btnWatched.textContent = 'REMOVE FROM WATCHED';
    } else {
      btnWatched.classList.replace('watched_remove', 'watched_send');
      btnWatched.textContent = 'ADD TO WATCHED';
    }
  } catch (error) {
    // console.error('Get state error: ', error.message);
    btnWatched.classList.replace('watched_remove', 'watched_send');
  }
}

function checkQueueStorage(currentFilm) {
  try {
    const getQueueFromStorage = localStorage.getItem(KEY_QUEUE);
    const getQueueArray = JSON.parse(getQueueFromStorage);
    const checkQueueStorage = getQueueArray.find(
      option => option.id === currentFilm.id
    );
    if (checkQueueStorage) {
      btnQueue.classList.replace('queue_send', 'queue_remove');
      btnQueue.textContent = 'REMOVE FROM QUEUE';
    } else {
      btnQueue.classList.replace('queue_remove', 'queue_send');
      btnQueue.textContent = 'ADD TO QUEUE';
    }
  } catch (error) {
    // console.error('Get state error: ', error.message);
    btnQueue.classList.replace('queue_remove', 'queue_send');
  }
}
