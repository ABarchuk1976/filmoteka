import * as storageLocal from './local-storage.js';
import ModalFilm from './modal-film.js';
import { sendWatchedToStorage, sendQueueToStorage } from './local-storage-set';
const refs = {
  gallery: document.querySelector('.js-gallery-library'),
  closeBtn: document.querySelector('[data-modal-close]'),
  btnWatched: document.querySelector('.btn_watched'),
  btnQueue: document.querySelector('.btn_queue'),
  activLibraryBtn: document.querySelector(
    '.filter__item>.filter__button--active'
  ),
};
// console.log(refs.activLibraryBtn.textContent);
const modalFilm = new ModalFilm();

refs.gallery.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onCloseModalEsc);
document.addEventListener('click', onOverlayClose);

function onOpenModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') return;

  const dataCurentFilm = getFilmData(e.target.id);

  modalFilm.modifyDataFilm(dataCurentFilm);
  modalFilm.open();

  ///// for local-storage and button /////////
  refs.btnWatched.addEventListener('click', onWatchedBtnClick);
  refs.btnQueue.addEventListener('click', onQueueBtnClick);

  localStorage.setItem('CurrentFilm', JSON.stringify(dataCurentFilm));

  checkWatchedStorage(dataCurentFilm);
  if (refs.btnWatched.classList.contains('watched_remove')) {
    refs.btnWatched.textContent = 'REMOVE FROM WATCHED';
  } else if (refs.btnWatched.classList.contains('watched_send')) {
    refs.btnWatched.textContent = 'ADD TO WATCHED';
  }

  checkQueueStorage(dataCurentFilm);
  if (refs.btnQueue.classList.contains('queue_remove')) {
    refs.btnQueue.textContent = 'REMOVE FROM QUEUE';
  } else if (refs.btnWatched.classList.contains('queue_send')) {
    refs.btnQueue.textContent = 'ADD TO QUEUE';
  }

  function onWatchedBtnClick() {
    if (refs.btnWatched.classList.contains('watched_send')) {
      refs.btnWatched.textContent = 'REMOVE FROM WATCHED';
      refs.btnWatched.classList.replace('watched_send', 'watched_remove');

      sendWatchedToStorage();
    } else if (refs.btnWatched.classList.contains('watched_remove')) {
      refs.btnWatched.textContent = 'ADD TO WATCHED';
      refs.btnWatched.classList.replace('watched_remove', 'watched_send');

      removeWatchedFilm(dataCurentFilm);
    }

    refs.btnWatched.textContent = 'ADD TO WATCHED';
    refs.btnWatched.classList.replace('watched_remove', 'watched_send');
  }

  function removeWatchedFilm(currentFilm) {
    try {
      const getWatchedFromStorage = localStorage.getItem('WatchedMovies');
      const getWatchedArray = JSON.parse(getWatchedFromStorage);

      const watchedFilmIndex = getWatchedArray.findIndex(
        value => value.id === currentFilm.id
      );
      getWatchedArray.splice(watchedFilmIndex, 1);
      localStorage.setItem('WatchedMovies', JSON.stringify(getWatchedArray));
    } catch (error) {
      // console.error('Get state error: ', error.message);
    }
  }

  function onQueueBtnClick() {
    if (refs.btnQueue.classList.contains('queue_send')) {
      refs.btnQueue.textContent = 'REMOVE FROM QUEUE';
      refs.btnQueue.classList.replace('queue_send', 'queue_remove');

      sendQueueToStorage();
    } else if (refs.btnQueue.classList.contains('queue_remove')) {
      refs.btnQueue.textContent = 'ADD TO QUEUE';
      refs.btnQueue.classList.replace('queue_remove', 'queue_send');

      removeQueueFilm(dataCurentFilm);
    }

    refs.btnQueue.textContent = 'ADD TO QUEUE';
    refs.btnQueue.classList.replace('queue_remove', 'queue_send');
  }

  function removeQueueFilm(currentFilm) {
    try {
      const getQueueFromStorage = localStorage.getItem('QueueMovies');
      const getQueueArray = JSON.parse(getQueueFromStorage);

      const queueFilmIndex = getQueueArray.findIndex(
        value => value.id === currentFilm.id
      );
      getQueueArray.splice(queueFilmIndex, 1);
      localStorage.setItem('QueueMovies', JSON.stringify(getQueueArray));
    } catch (error) {
      // console.error('Get state error: ', error.message);
    }
  }
  ///////////////////end of local-storage ///////////

  refs.closeBtn.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onCloseModalEsc);
}

function onCloseModal() {
  modalFilm.close();

  refs.closeBtn.removeEventListener('click', onCloseModal);
  window.removeEventListener('keydown', onCloseModalEsc);

  window.location.reload();
}

function onCloseModalEsc(e) {
  if (e.code === 'Escape') {
    modalFilm.close();

    refs.closeBtn.removeEventListener('click', onCloseModal);
    window.removeEventListener('keydown', onCloseModalEsc);
  }
}

function getFilmData(filmId) {
  const filmList = storageLocal
    .load('QueueMovies')
    .concat(storageLocal.load('WatchedMovies'));
  return filmList.find(film => film.id === Number(filmId));
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
    const getWatchedFromStorage = localStorage.getItem('WatchedMovies');
    const getWatchedArray = JSON.parse(getWatchedFromStorage);
    const checkWatchedStorage = getWatchedArray.find(
      option => option.id === currentFilm.id
    );
    if (checkWatchedStorage) {
      refs.btnWatched.classList.replace('watched_send', 'watched_remove');
      refs.btnWatched.textContent = 'REMOVE FROM WATCHED';
    } else {
      refs.btnWatched.classList.replace('watched_remove', 'watched_send');
      refs.btnWatched.textContent = 'ADD TO WATCHED';
    }
  } catch (error) {
    // console.error('Get state error: ', error.message);
    refs.btnWatched.classList.replace('watched_remove', 'watched_send');
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
      refs.btnQueue.classList.replace('queue_send', 'queue_remove');
      refs.btnQueue.textContent = 'REMOVE FROM QUEUE';
    } else {
      refs.btnQueue.classList.replace('queue_remove', 'queue_send');
      refs.btnQueue.textContent = 'ADD TO QUEUE';
    }
  } catch (error) {
    // console.error('Get state error: ', error.message);
    refs.btnQueue.classList.replace('queue_remove', 'queue_send');
  }
}
