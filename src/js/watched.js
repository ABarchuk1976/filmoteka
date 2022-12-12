// import { btnQueueRef } from './queue.js';
// import { getGenre } from './modal-film.js';
// import { renderPagination } from './pagination.js';
// import { IN_LIBRARY_WATCHED } from './constants.js';

// export const IMG_PATH = 'https://image.tmdb.org/t/p/';
// export const SMALL_SIZE = 'w500';
// export const KEY_WATCHED = 'WatchedMovies';
// const PER_PAGE = 6;

// export const btnWatchRef = document.querySelector('data-name="watched"');
// export const emptyRef = document.querySelector('.title-empty-list');
// export const galleryLibrary = document.querySelector('.js-gallery-library');

// btnWatchedRefs.addEventListener('click', onBtnWatchedClick);

// function onBtnWatchedClick() {
//   btnQueueRef.classList.remove('filter__button--active');
//   btnWatchRef.classList.add('filter__button--active');
//   try {
//     const allData = paginateAllStorage(KEY_WATCHED);
//     renderStorageFilmCards(1, allData);

//     emptyRef.classList.add('is-hidden');
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function renderStorageFilmCards(page, data) {
//   const markup = data[page - 1]
//     .map(({ id, poster_path, genre_ids, title, release_date }) => {
//       let genresStr = getGenre(genre_ids);
//       let year = release_date.substring(0, 4);
//       if (genresStr && year) genresStr += ' | ';
//       if (!title) title = 'no information';

//       let smallImg = !!poster_path
//         ? IMG_PATH + SMALL_SIZE + poster_path
//         : NO_IMAGE;
//       return `
//       <li class="film-card">
//          	<a href="#" class="film-card__link">
//             <img
//               class="film-card__film-img"
//               src="${smallImg}"
//               alt="${title}"
//               id="${id}"
//             />
//             <h3 class="film-card__film-name">${title}</h3>
//             <p class="film-card__genre">${genresStr}${year}</p>
//           </a>
//         </li>
// 		`;
//     })
//     .join('');

//   galleryLibrary.innerHTML = markup;
// }

// export function paginateAllStorage(key) {
//   try {
//     const filmStorage = localStorage.getItem(key);
//     if (filmStorage) {
//       filmStorage = JSON.parse(filmStorage);
//       console.log('At paginateAllStorage', filmStorage);
//       const allStorageDataByPages = [];
//       for (let i = 0; i < filmStorage.length; i += PER_PAGE) {
//         let end =
//           i + PER_PAGE < filmStorage.length ? i + PER_PAGE : filmStorage.length;
//         allStorageDataByPages.push(filmStorage.slice(i, end));
//       }
//       return allStorageDataByPages;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
