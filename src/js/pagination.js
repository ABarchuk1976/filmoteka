import { renderFilmCards, getPopulars } from './popular.js';
import spinnerToggle from './spinner';
import { inputRef, searchMovieFetch } from './film-search.js';
import {
  renderStorageFilmCards,
  paginateAllStorage,
  KEY_WATCHED,
} from './watched.js';
import { pagLibraryRef } from './queue.js';

spinnerToggle();
window.addEventListener('load', spinnerToggle);

const pagMainRef = document.querySelector('.js-pagination');

let currentNow = 1;
let currentRef = pagMainRef;
let currentPage = 1;

export const IN_MAIN_POPULAR = 1;
export const IN_MAIN_SEARCH = 2;
export const IN_LIBRARY_QUEUE = 11;
export const IN_LIBRARY_WATCHED = 12;

const LEFT_ARROW = '&#8592;';
const RIGHT_ARROW = '&#8594;';

export function renderPagination(page, pages, now) {
  let prevPage = page - 1;
  let twoPrevPage = page - 2;
  let nextPage = page + 1;
  let twoNextPage = page + 2;
  let markup = '';

  currentRef = now < 10 ? pagMainRef : pagLibraryRef;
  currentNow = now;

  if (!page || page > pages) return;

  if (page > 1)
    markup += `<li class="js-pagination__arrow-left">${LEFT_ARROW}</li>`;

  if (page > 1)
    markup += `<li class="js-pagination__button js-pagination__button-end">1</li>`;

  if (page > 4) markup += `<li class="js-pagination__points">...</li>`;

  if (page > 3)
    markup += `<li class="js-pagination__button">${twoPrevPage}</li>`;

  if (page > 2) markup += `<li class="js-pagination__button">${prevPage}</li>`;

  markup += `<li class="js-pagination__button js-pagination__button-current">${page}</li>`;

  if (page + 1 < pages)
    markup += `<li class="js-pagination__button">${nextPage}</li>`;

  if (page + 2 < pages)
    markup += `<li class="js-pagination__button">${twoNextPage}</li>`;

  if (page + 4 < pages) markup += `<li class="js-pagination__points">...</li>`;

  if (page < pages)
    markup += `<li class="js-pagination__button js-pagination__button-end">${pages}</li>`;

  if (page < pages)
    markup += `<li class="js-pagination__arrow-right">${RIGHT_ARROW}</li>`;

  // pagLibraryRef
  // Here need a ref of Library pagRef
  currentRef.innerHTML = markup;
}

currentRef.addEventListener('click', ({ target }) => {
  if (target.textContent === '...') return;

  if (target.classList.contains('js-pagination__arrow-left')) currentPage -= 1;

  if (target.classList.contains('js-pagination__arrow-right')) currentPage += 1;

  if (target.classList.contains('js-pagination__button'))
    currentPage = Number(target.textContent);

  console.log(currentNow, currentPage, inputRef.value.trim().toLowerCase());

  let promise = {};

  if (currentNow < 10) {
    console.log('In switch', currentNow);
    switch (currentNow) {
      case IN_MAIN_POPULAR:
        console.log('in Popular');
        promise = getPopulars;
        break;
      case IN_MAIN_SEARCH:
        console.log('in Search');
        promise = searchMovieFetch;
        break;
    }

    if (promise)
      promise(currentPage)
        .then(({ page, results, total_pages: pages }) => {
          renderFilmCards(results);
          renderPagination(page, pages, currentNow);
        })
        .catch(() => {
          warningRef.insertAdjacentHTML(
            'beforeend',
            `<div class="header__warning-message">Service is temporarily unavailable.</div>`
          );

          setTimeout(() => {
            warning.innerHTML = '';
          }, 4000);
        });
    return;
  }

  let key = '';
  switch (currentNow) {
    case IN_LIBRARY_QUEUE:
      key = KEY_QUEUE;
    case IN_LIBRARY_WATCHED:
      key = KEY_WATCHED;
  }

  const data = paginateAllStorage(key);
  renderStorageFilmCards(currentPage, data);
});
