import spinnerToggle from './spinner';
import axios from 'axios';
import {
  renderPagination,
  IN_MAIN_POPULAR,
  IN_MAIN_SEARCH,
} from './pagination.js';
import { getPopulars, renderFilmCards, galleryRef } from './popular.js';
import { KEY, MEDIA_TYPE, API } from './constants';

const formRef = document.querySelector('.header__form');
export const inputRef = document.querySelector('.header__input');
// const formButtonRef = document.querySelector('.header__btn-submit');
export const warningRef = document.querySelector('.header__warning');
const inputBtnClearRef = document.querySelector('.header__btn-close');

let currentQuery = '';

export async function searchMovieFetch(page) {
  const searchMovieParams = new URLSearchParams({
    api_key: KEY,
    language: 'en-US',
    query: currentQuery,
    page: page,
    include_adult: false,
  });

  try {
    const response = await axios.get(
      `${API}/search/${MEDIA_TYPE}?${searchMovieParams}`
    );

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    // return response.data.results;
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

// this function will be call if input or results is empty. No possibility to check at same time, becouse error occured when search string is empty!
inputRef.addEventListener('input', onInputClear);

function onInputClear(evt) {
  const inputValue = inputRef.value;

  if (inputValue) {
    inputBtnClearRef.style.display = 'block';

    inputBtnClearRef.addEventListener('click', () => {
      inputBtnClearRef.style.display = 'none';
      inputRef.value = '';
    });
  }
}

function emptyQueryOrNoResults() {
  warningRef.insertAdjacentHTML(
    'beforeend',
    `<div class="header__warning-message">Search result not successful. Enter the correct movie name.</div>`
  );

  setTimeout(() => {
    warningRef.innerHTML = '';
  }, 4000);

  galleryRef.innerHTML = '';

  console.log('Rendering a Popular');
  getPopulars(1).then(({ page, results, total_pages: pages }) => {
    renderFilmCards(results);
    renderPagination(page, pages, IN_MAIN_POPULAR);
  });
}

formRef.addEventListener('submit', onSearchClick);

function onSearchClick(evt) {
  spinnerToggle();
  evt.preventDefault();

  currentQuery = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  console.log('Ar Listener', !!currentQuery);
  if (!currentQuery) {
    emptyQueryOrNoResults();
    return;
  }

  console.log(currentQuery);

  searchMovieFetch(1).then(data => {
    if (!data) return;
    // Destructure Andrii
    const { page, total_pages, results } = data;
    // If no results - show Popular
    if (!total_pages) {
      spinnerToggle();
      emptyQueryOrNoResults();
      return;
    }
    // renderFilmCards(data); Andrii
    renderFilmCards(results);
    // Add rendering of pagination
    renderPagination(page, total_pages, IN_MAIN_SEARCH);
    // spinnerToggle();
  });
}
