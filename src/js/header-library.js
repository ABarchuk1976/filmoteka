import { getGenre } from './modal-film.js';
import { KEY, IMG_PATH, SMALL_SIZE, NO_IMAGE } from './constants.js';

const KEY_WATCHED = 'WatchedMovies';
const KEY_QUEUE = 'QueueMovies';
const PER_PAGE = 6;
// 1 - queue, 0 - watched
let nowAt = 1;

const buttonsRef = document.querySelector('.filter__list');
const queueRef = document.querySelector('.filter__item-queue');
const watchedRef = document.querySelector('.filter__item-watched');
const pagLibraryRef = document.querySelector('.js-pagination-library');
const emptyRef = document.querySelector('.empty-list');
const galleryLibrary = document.querySelector('.js-gallery-library');

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
    const allData = paginateAllStorage(key);

    if (!allData) throw 'No data to render';

    // renderStorageFilmCards(1, allData);

    emptyRef.classList.add('is-hidden');
  } catch (error) {
    emptyRef.classList.remove('is-h');
    console.log(error);
  }
}

export function renderStorageFilmCards(page, data) {
  const markup = data[page - 1]
    .map(({ id, poster_path, genre_ids, title, release_date }) => {
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
