import { renderPagination, renderFilmCards } from './common.js';

const KEY_WATCHED = 'WatchedMovies';
const KEY_QUEUE = 'QueueMovies';
const PER_PAGE = 6;
// 1 - queue, 0 - watched
let nowAt = 1;
let allData = [];

const queueRef = document.querySelector('.filter__item-queue');
const watchedRef = document.querySelector('.filter__item-watched');
const pagLibraryRef = document.querySelector('.js-pagination-library');
const emptyRef = document.querySelector('.empty-list');
const emptyTitleRef = document.querySelector('.empty-title');
const galleryLibrary = document.querySelector('.js-gallery-library');

window.addEventListener('load', () => {
  queueRef.click();
});

queueRef.addEventListener('click', onBtnClick);
watchedRef.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  const target = evt.target;

  nowAt = target.classList.contains('filter__item-queue') ? 1 : 0;

  let key = nowAt ? KEY_QUEUE : KEY_WATCHED;

  if (nowAt) {
    queueRef.classList.add('active');
    watchedRef.classList.remove('active');
  } else {
    watchedRef.classList.add('active');
    queueRef.classList.remove('active');
  }

  try {
    allData.length = 0;
    allData = [...paginateAllData(key)];

    console.log(allData[0]);

    if (!allData || !allData.length) {
      throw 'Your film list is empty';
    }

    renderFilmCards(allData[0], galleryLibrary);
    renderPagination(1, allData.length, pagLibraryRef);

    emptyRef.classList.add('is-hidden');
  } catch (error) {
    emptyRef.classList.remove('is-hidden');
    emptyTitleRef.textContent = error.message;
  }
}

function paginateAllData(key) {
  try {
    let filmStorage = localStorage.getItem(key);

    if (filmStorage) {
      filmStorage = JSON.parse(filmStorage);

      const allStorageDataByPages = [];
      for (let i = 0; i < filmStorage.length; i += PER_PAGE) {
        let end =
          i + PER_PAGE < filmStorage.length ? i + PER_PAGE : filmStorage.length;
        allStorageDataByPages.push(filmStorage.slice(i, end));
      }
      return allStorageDataByPages;
    }
  } catch (error) {
    console.log(error.message);
  }
}
