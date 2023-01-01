import * as storageLocal from './local-storage.js';

import { getGenre } from './modal-film';
import { btnUp, btnDown } from './btn-scroll.js';

const LEFT_ARROW = '&#8592;';
const RIGHT_ARROW = '&#8594;';
import { IMG_PATH, SMALL_SIZE, NO_IMAGE } from './constants.js';

const searchQuery = document.querySelector('.header__input');

export function goUp() {
  btnUp.el.click();
  btnUp.hide();
  btnDown.show();
}

export function renderPagination(page, pages, ref) {
  let prevPage = page - 1;
  let twoPrevPage = page - 2;
  let nextPage = page + 1;
  let twoNextPage = page + 2;
  let markup = '';

  if (!page || page > pages) {
    ref.innerHTML = '';
    return;
  }
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

  ref.innerHTML = markup;
}

// ref = where need to render
export function renderFilmCards(data, ref, needStore = false) {
  ref.innerHTML = '';
  let markup = data
    .map(({ id, poster_path, genre_ids, title, release_date }) => {
      let genresStr = getGenre(genre_ids);
      let year = !release_date ? '' : release_date.substring(0, 4);
      if (genresStr && year) genresStr += ' | ';
      if (!title) title = 'no information';

      let smallImg = !!poster_path
        ? IMG_PATH + SMALL_SIZE + poster_path
        : NO_IMAGE;

      return `
      <li class="film-card">
         	<a href="#" class="film-card__link">
            <img
              class="film-card__film-img"
              src="${smallImg}"
              alt="${title}"
              id="${id}"
            />
            <h3 class="film-card__film-name">${title}</h3>
            <p class="film-card__genre">${genresStr}${year}</p>
          </a>
        </li>
							`;
    })
    .join('');

  ref.innerHTML = markup;

  //
  if (needStore) storageLocal.save(storageLocal.FILM_CURRENT_PAGE, [...data]);
  //
}
