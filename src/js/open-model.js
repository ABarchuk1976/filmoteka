import ModalFilm from './modal-film';
import {
  handleBackButtonClick,
  trailerButtonRef,
  handleTrailerButtonClick,
} from './trailer';
import { changeStore, getFilmData } from './common.js';

const gallery = document.querySelector('.js-gallery');
const closeBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');
const body = document.querySelector('body');
const btnWrapperRef = document.querySelector('.btn__wrapper');

const modalFilm = new ModalFilm();

function onBtnClick(evt) {
  const { nodeName, name: key } = evt.target;
  if (nodeName !== 'BUTTON') return;
  changeStore(key);
  modalFilm.rerenderBtnWrapper();
}

function onOpenModal(evt) {
  const { id, nodeName, name } = evt.target;
  evt.preventDefault();

  trailerButtonRef.addEventListener('click', handleTrailerButtonClick);

  if (nodeName !== 'IMG') return;

  const dataCurrentFilm = getFilmData(id);

  modalFilm.modifyDataFilm(dataCurrentFilm);
  modalFilm.open();

  btnWrapperRef.addEventListener('click', onBtnClick);
}

function closeModal() {
  window.removeEventListener('keydown', onCloseModalEsc);
  modal.classList.add('is-hidden');
  body.classList.remove('body--modal-open');

  trailerButtonRef.removeEventListener('click', handleTrailerButtonClick);
}

function onOverlayClose(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function onCloseModalEsc(evt) {
  console.log(evt.code);
  if (evt.code === 'Escape') {
    closeModal();
  }
}

gallery.addEventListener('click', onOpenModal);

document.addEventListener('click', onOverlayClose);
window.addEventListener('keydown', onCloseModalEsc);
closeBtn.addEventListener('click', closeModal);

////////////// checks for button /////////////////

function checkWatchedStorage(currentFilm) {
  try {
    const getWatchedFromStorage = localStorage.getItem('WatchedMovies');
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
    const getQueueFromStorage = localStorage.getItem('QueueMovies');
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
