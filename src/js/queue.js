import { emptyRef, btnWatchRef } from './watched';

import { renderStorageFilmCards } from './watched';

export const btnQueueRef = document.querySelector('.js-queue');
export const pagLibraryRef = document.querySelector('.js-pagination-library');

export const KEY_QUEUE = 'QueueMovies';
// const QUEUE_KEY = 'QueueMovies';

window.addEventListener('load', () => onBtnQueueClick());

btnQueueRefs.addEventListener('click', onBtnQueueClick);

export function onBtnQueueClick() {
  btnQueueRef.classList.add('filter__button--active');
  btnWatchRef.classList.remove('filter__button--active');
  try {
    let queueFilms = localStorage.getItem('QueueMovies');
    if (queueFilms) {
      queueFilms = JSON.parse(queueFilms);
      const allData = paginateAllStorage(KEY_WATCHED);
      renderStorageFilmCards(1, allData);

      emptyRef.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
  return;
}
