import axios from 'axios';
import spinnerToggle from './spinner.js';

import {
  renderPagination,
  getAPIData,
  renderFilmCards,
  goUp,
} from './common.js';

// імпорт файлу сховища та запис в змінну ключа
import * as storageLocal from './local-storage.js';
const FILM_CURRENT_PAGE = 'film-current-page';
//

const galleryRef = document.querySelector('.js-gallery');
const pagRef = document.querySelector('.js-pagination');
const warningRef = document.querySelector('.header__warning');
const inputRef = document.querySelector('.header__input');
const formRef = document.querySelector('.header__form');

let currentQuery = '';
let currentPage = 1;
// 1 - popular, 0 - search
let nowAt = 1;

window.addEventListener('load', () => {
  spinnerToggle();
  galleryRef.innerHTML = '';

  currentPage = 1;
  nowAt = 1;

  getAPIData(currentPage, nowAt)
    .then(({ page, results, total_pages: pages }) => {
      renderFilmCards(results, galleryRef);
      renderPagination(page, pages, pagRef);
    })
    .catch(error => {
      warningRef.insertAdjacentHTML(
        'beforeend',
        `<div class="header__warning-message">Service is temporarily unavailable.</div>`
      );

      setTimeout(() => {
        warningRef.innerHTML = '';
      }, 4000);
    });
  spinnerToggle();
});

function emptyQueryOrNoResults() {
  spinnerToggle();
  warningRef.insertAdjacentHTML(
    'beforeend',
    `<div class="header__warning-message">Search result not successful. Enter the correct movie name.</div>`
  );

  setTimeout(() => {
    warningRef.innerHTML = '';
  }, 4000);

  galleryRef.innerHTML = '';

  nowAt = 1;
  currentPage = 1;

  getAPIData(currentPage, nowAt)
    .then(({ page, results, total_pages: pages }) => {
      renderFilmCards(results, galleryRef);
      renderPagination(page, pages, pagRef);
    })
    .catch(() => {
      warningRef.insertAdjacentHTML(
        'beforeend',
        `<div class="header__warning-message">Service is temporarily unavailable.</div>`
      );

      setTimeout(() => {
        warningRef.innerHTML = '';
      }, 4000);
    });
  spinnerToggle();
}

pagRef.addEventListener('click', onClickPagination);

function onClickPagination(evt) {
  spinnerToggle();
  const target = evt.target;

  if (target.textContent === '...' || target.tagName !== 'LI') return;

  if (target.classList.contains('js-pagination__arrow-left')) currentPage -= 1;

  if (target.classList.contains('js-pagination__arrow-right')) currentPage += 1;

  if (target.classList.contains('js-pagination__button'))
    currentPage = Number(target.textContent);

  getAPIData(currentPage, nowAt)
    .then(({ page, results, total_pages: pages }) => {
      renderFilmCards(results, galleryRef);
      renderPagination(page, pages, pagRef);
    })
    .catch(() => {
      warningRef.insertAdjacentHTML(
        'beforeend',
        `<div class="header__warning-message">Service is temporarily unavailable.</div>`
      );

      setTimeout(() => {
        warningRef.innerHTML = '';
      }, 4000);
    });
  spinnerToggle();
  goUp();
}

formRef.addEventListener('submit', evt => {
  nowAt = 0;
  currentPage = 1;

  spinnerToggle();
  evt.preventDefault();
  currentQuery = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  if (!currentQuery) {
    emptyQueryOrNoResults();
    return;
  }

  getAPIData(currentPage, nowAt)
    .then(({ page, results, total_pages: pages }) => {
      if (!pages) {
        emptyQueryOrNoResults();
        return;
      }
      renderFilmCards(results, galleryRef);
      renderPagination(page, pages, pagRef);
    })
    .catch(error => {
      warningRef.insertAdjacentHTML(
        'beforeend',
        `<div class="header__warning-message">Service is temporarily unavailable.</div>`
      );

      setTimeout(() => {
        warningRef.innerHTML = '';
      }, 4000);
    });
  spinnerToggle();
});

inputRef.addEventListener('input', evt => {
  const query = evt.target;
  const inputBtnClearRef = document.querySelector('.header__btn-clear');

  if (query.value.length) {
    inputBtnClearRef.classList.remove('hidden');
  } else {
    inputBtnClearRef.classList.add('hidden');
    inputBtnClearRef.removeEventListener('click', onClearInput);
  }

  inputBtnClearRef.addEventListener('click', onClearInput);

  function onClearInput() {
    query.value = '';
    inputBtnClearRef.classList.add('hidden');
    inputBtnClearRef.removeEventListener('click', onClearInput);
  }
});
