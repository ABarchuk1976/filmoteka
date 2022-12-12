// import { emptyRef, btnWatchRef, renderStorageFilmCards } from './watched.js';
// import { IN_LIBRARY_QUEUE } from './constants.js';

// export const btnQueueRef = document.querySelector('button[data-name="queue"]');
// console.log('btnQueueRef', btnQueueRef);

// export const KEY_QUEUE = 'QueueMovies';

// window.addEventListener('load', () => onBtnQueueClick());

// export function onBtnQueueClick() {
//   btnQueueRef.classList.add('active');
//   btnWatchRef.classList.remove('active');
//   try {
//     let queueFilms = localStorage.getItem('QueueMovies');
//     if (queueFilms) {
//       queueFilms = JSON.parse(queueFilms);
//       const allData = paginateAllStorage(KEY_QUEUE);
//       renderStorageFilmCards(1, allData);

//       emptyRef.classList.add('is-hidden');
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   return;
// }
