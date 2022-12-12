import { getGenre } from './modal-film.js';
import { IN_LIBRARY_WATCHED, IN_LIBRARY_QUEUE } from './constants.js';

const IMG_PATH = 'https://image.tmdb.org/t/p/';
const SMALL_SIZE = 'w500';
const KEY_WATCHED = 'WatchedMovies';
const KEY_QUEUE = 'QueueMovies';
const PER_PAGE = 6;

const buttonsRef = document.querySelector('.filter__list');
const queueRef = document.querySelector('.filter__item-queue');
const watchedRef = document.querySelector('.filter__item-watched');
const pagLibraryRef = document.querySelector('.js-pagination-library');
const emptyRef = document.querySelector('.empty-list');
export const galleryLibrary = document.querySelector('.js-gallery-library');

buttonsRef.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  const target = evt.target;
  let key = KEY_QUEUE;
  let nowAt = IN_LIBRARY_QUEUE;

  if (target.tagName !== 'LI') return;

  if (target.textContent.toLowerCase() === 'watched') {
    key = KEY_WATCHED;
    nowAt = IN_LIBRARY_WATCHED;
    target.classList.add('active');
  }
  // const key =
  btnQueueRef.classList.remove('filter__button--active');
  btnWatchRef.classList.add('filter__button--active');
  try {
    const allData = paginateAllStorage(KEY_WATCHED);
    renderStorageFilmCards(1, allData);

    emptyRef.classList.add('is-hidden');
  } catch (error) {
    console.log(error);
  }
}

export function renderStorageFilmCards(page, data) {
  const markup = data[page - 1]
    .map(({ poster_path, genre_ids, title, release_date }) => {
      let genresStr = getGenre(genre_ids);
      let year = release_date.substring(0, 4);
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

  galleryLibrary.innerHTML = markup;
}

export function paginateAllStorage(key) {
  try {
    const filmStorage = localStorage.getItem(key);
    if (filmStorage) {
      filmStorage = JSON.parse(filmStorage);
      console.log('At paginateAllStorage', filmStorage);
      const allStorageDataByPages = [];
      for (let i = 0; i < filmStorage.length; i += PER_PAGE) {
        let end =
          i + PER_PAGE < filmStorage.length ? i + PER_PAGE : filmStorage.length;
        allStorageDataByPages.push(filmStorage.slice(i, end));
      }
      return allStorageDataByPages;
    }
  } catch (error) {
    console.log(error);
  }
}
