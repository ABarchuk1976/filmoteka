import { renderPagination, renderFilmCards } from './common.js';

const KEY_WATCHED = 'WatchedMovies';
const KEY_QUEUE = 'QueueMovies';
const PER_PAGE = 6;
// 1 - queue, 0 - watched
let nowAt = 1;
let allData = [];
let currentPage = 1;

const queueRef = document.querySelector('.filter__item-queue');
const watchedRef = document.querySelector('.filter__item-watched');
const pagLibraryRef = document.querySelector('.js-pagination-library');
const emptyRef = document.querySelector('.empty-list');
const emptyTitleRef = document.querySelector('.empty-title');
const galleryLibrary = document.querySelector('.js-gallery-library');

window.addEventListener('load', () => {
  queueRef.click();
  currentPage = 1;
});

queueRef.addEventListener('click', onBtnClick);
watchedRef.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  const target = evt.target;

  nowAt = target.classList.contains('filter__item-queue') ? 1 : 0;
  currentPage = 1;

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

    if (!allData || !allData.length) {
      throw 'Your film list is empty';
    }

    renderFilmCards(allData[currentPage - 1], galleryLibrary);
    renderPagination(currentPage, allData.length, pagLibraryRef);

    emptyRef.classList.add('is-hidden');
  } catch (error) {
    emptyRef.classList.remove('is-hidden');
    emptyTitleRef.textContent = 'Your film list is empty';
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

pagLibraryRef.addEventListener('click', onClickPagination);

function onClickPagination(evt) {
  const target = evt.target;

  if (target.textContent === '...' || target.tagName !== 'LI') return;

  if (target.classList.contains('js-pagination__arrow-left')) currentPage -= 1;

  if (target.classList.contains('js-pagination__arrow-right')) currentPage += 1;

  if (target.classList.contains('js-pagination__button'))
    currentPage = Number(target.textContent);

  try {
    if (!allData || !allData.length) {
      throw 'Your film list is empty';
    }

    renderFilmCards(allData[currentPage - 1], galleryLibrary);
    renderPagination(currentPage, allData.length, pagLibraryRef);

    emptyRef.classList.add('is-hidden');
  } catch (error) {
    emptyRef.classList.remove('is-hidden');
    emptyTitleRef.textContent = error.message;
  }
}
