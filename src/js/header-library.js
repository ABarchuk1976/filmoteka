import { renderPagination, renderFilmCards, goUp } from './common.js';
import { KEY_QUEUE, KEY_WATCHED } from './constants.js';

const PER_PAGE = 6;

let allData = [];
let currentPage = 1;
// 1 - do queue, 0 - do watched
let currentProcess = 1;

const queueRef = document.querySelector('.filter__item-queue');
const watchedRef = document.querySelector('.filter__item-watched');
const listRef = document.querySelector('.filter__list');
const pagLibraryRef = document.querySelector('.js-pagination-library');
const emptyRef = document.querySelector('.empty-list');
const emptyTitleRef = document.querySelector('.empty-title');
const galleryLibrary = document.querySelector('.js-gallery-library');

window.addEventListener('load', () => {
  queueRef.click();
});

listRef.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  const target = evt.target;

  if (target.tagName !== 'LI') return;

  const key = target.name;

  currentPage = 1;

  console.log(paginateAllData(key));

  switch (key) {
    case KEY_QUEUE:
      queueRef.classList.add('active');
      watchedRef.classList.remove('active');
      break;
    case KEY_WATCHED:
      watchedRef.classList.add('active');
      queueRef.classList.remove('active');
      break;
  }

  emptyRef.classList.add('is-hidden');

  try {
    allData = [...paginateAllData(key)];

    console.log(allData);

    if (!allData || !allData.length) {
      emptyRef.classList.remove('is-hidden');
      emptyTitleRef.textContent = 'Your film list is empty.';
      return;
    }

    renderFilmCards(allData[currentPage - 1], galleryLibrary);
    renderPagination(currentPage, allData.length, pagLibraryRef);
  } catch (error) {
    emptyRef.classList.remove('is-hidden');
    emptyTitleRef.textContent = 'Something went wrong.';
  }
}

function paginateAllData(key) {
  try {
    let filmStorage = localStorage.getItem(key);

    console.log('In Pagination All: ', filmStorage);

    if (filmStorage) {
      filmStorage = JSON.parse(filmStorage);

      const allStorageDataByPages = [];
      for (let i = 0; i < filmStorage.length; i += PER_PAGE) {
        let end =
          i + PER_PAGE < filmStorage.length ? i + PER_PAGE : filmStorage.length;
        allStorageDataByPages.push(filmStorage.slice(i, end));
      }
      console.log(allStorageDataByPages);
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
    renderFilmCards(allData[currentPage - 1], galleryLibrary);
    renderPagination(currentPage, allData.length, pagLibraryRef);

    emptyRef.classList.add('is-hidden');
  } catch (error) {
    emptyRef.classList.remove('is-hidden');
    emptyTitleRef.textContent = error.message;
  }

  goUp();
}
