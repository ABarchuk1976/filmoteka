import axios from 'axios';

import { renderPagination, IN_MAIN_POPULAR } from './pagination.js';
import { KEY, MEDIA_TYPE, API } from './constants';
import { warningRef } from './film-search.js';

// імпорт файлу сховища та запис в змінну ключа
import * as storageLocal from './local-storage.js';
const FILM_CURRENT_PAGE = 'film-current-page';
//
const TIME_WINDOW = 'week';
const TRENDING = 'trending';
const GENRES = 'genre/movie/list';
const IMG_PATH = 'https://image.tmdb.org/t/p/';
const SMALL_SIZE = 'w500';

export const NO_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

export let genresList;

getOriginGenres().then(response => {
  genresList = Array.from(response.genres);
});

export const galleryRef = document.querySelector('.js-gallery');

window.addEventListener('load', () => {
  galleryRef.innerHTML = '';

  getPopulars(1)
    .then(({ page, results, total_pages: pages }) => {
      renderFilmCards(results);
      renderPagination(page, pages, IN_MAIN_POPULAR);
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
});

export async function getPopulars(page) {
  try {
    const searchParams = new URLSearchParams({
      api_key: KEY,
      page: page,
      include_adult: false,
    });

    const response = await axios.get(
      `${API}${TRENDING}/${MEDIA_TYPE}/${TIME_WINDOW}?${searchParams}`
    );

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    // console.log('респонс Барчука', response.data);

    return response.data;
  } catch (error) {
    // console.log('Підставити картинку, сервер терміново недоступний');
  }
}

export function renderFilmCards(data) {
  let markup = '';
  data.forEach(({ id, poster_path, genre_ids, title, release_date }) => {
    let genresStr = getGenres(genre_ids);
    let year = !release_date ? '' : release_date.substring(0, 4);
    if (genresStr && year) genresStr += ' | ';
    if (!title) title = 'no information';

    let smallImg = !!poster_path
      ? IMG_PATH + SMALL_SIZE + poster_path
      : NO_IMAGE;

    markup += `
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
  });

  galleryRef.innerHTML = markup;

  // запис в локальне сховище
  storageLocal.save(FILM_CURRENT_PAGE, [...data]);
  //
}

async function getOriginGenres() {
  try {
    const searchParams = new URLSearchParams({
      api_key: KEY,
    });

    const response = await axios.get(`${API}${GENRES}?${searchParams}`);

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  } catch (error) {
    console.log('Підставити картинку, сервер терміново недоступний');
  }
}

export function getGenres(genreSet) {
  let genreStr = '';

  if (!genreSet) return '';
  genreSet.forEach(id => {
    for (const genre of genresList) {
      if (genre.id === id) genreStr += genre.name + ', ';
    }
  });

  return !genreStr ? '' : genreStr.substring(0, genreStr.length - 2);
}
