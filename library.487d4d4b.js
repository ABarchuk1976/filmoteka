var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},c=e.parcelRequired7c6;null==c&&((c=function(e){if(e in t)return t[e].exports;if(e in n){var c=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,c.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=c),c("7bYU0"),c("jLhJV"),c("9dykO"),c("37v9V");var a=c("b5rV1"),o=c("fQE3M"),s=c("9dykO");const d={gallery:document.querySelector(".js-gallery"),closeBtn:document.querySelector("[data-modal-close]"),btnWatched:document.querySelector(".btn_watched"),btnQueue:document.querySelector(".btn_queue"),activLibraryBtn:document.querySelector(".filter__item>.filter__button--active")},i=new(0,o.default);function r(){i.close(),d.closeBtn.removeEventListener("click",r),window.removeEventListener("keydown",u),window.location.reload()}function u(e){"Escape"===e.code&&(i.close(),d.closeBtn.removeEventListener("click",r),window.removeEventListener("keydown",u))}d.gallery.addEventListener("click",(function(e){if(e.preventDefault(),"IMG"!==e.target.nodeName)return;const t=(n=e.target.id,a.load("QueueMovies").concat(a.load("WatchedMovies")).find((e=>e.id===Number(n))));var n;i.modifyDataFilm(t),i.open(),d.btnWatched.addEventListener("click",(function(){d.btnWatched.classList.contains("watched_send")?(d.btnWatched.textContent="REMOVE FROM WATCHED",d.btnWatched.classList.replace("watched_send","watched_remove"),(0,s.sendWatchedToStorage)()):d.btnWatched.classList.contains("watched_remove")&&(d.btnWatched.textContent="ADD TO WATCHED",d.btnWatched.classList.replace("watched_remove","watched_send"),function(e){try{const t=localStorage.getItem("WatchedMovies"),n=JSON.parse(t),c=n.findIndex((t=>t.id===e.id));n.splice(c,1),localStorage.setItem("WatchedMovies",JSON.stringify(n))}catch(e){}}(t));d.btnWatched.textContent="ADD TO WATCHED",d.btnWatched.classList.replace("watched_remove","watched_send")})),d.btnQueue.addEventListener("click",(function(){d.btnQueue.classList.contains("queue_send")?(d.btnQueue.textContent="REMOVE FROM QUEUE",d.btnQueue.classList.replace("queue_send","queue_remove"),(0,s.sendQueueToStorage)()):d.btnQueue.classList.contains("queue_remove")&&(d.btnQueue.textContent="ADD TO QUEUE",d.btnQueue.classList.replace("queue_remove","queue_send"),function(e){try{const t=localStorage.getItem("QueueMovies"),n=JSON.parse(t),c=n.findIndex((t=>t.id===e.id));n.splice(c,1),localStorage.setItem("QueueMovies",JSON.stringify(n))}catch(e){}}(t));d.btnQueue.textContent="ADD TO QUEUE",d.btnQueue.classList.replace("queue_remove","queue_send")})),localStorage.setItem("CurrentFilm",JSON.stringify(t)),function(e){try{const t=localStorage.getItem("WatchedMovies"),n=JSON.parse(t);n.find((t=>t.id===e.id))?(d.btnWatched.classList.replace("watched_send","watched_remove"),d.btnWatched.textContent="REMOVE FROM WATCHED"):(d.btnWatched.classList.replace("watched_remove","watched_send"),d.btnWatched.textContent="ADD TO WATCHED")}catch(e){d.btnWatched.classList.replace("watched_remove","watched_send")}}(t),d.btnWatched.classList.contains("watched_remove")?d.btnWatched.textContent="REMOVE FROM WATCHED":d.btnWatched.classList.contains("watched_send")&&(d.btnWatched.textContent="ADD TO WATCHED");(function(e){try{const t=localStorage.getItem("QueueMovies"),n=JSON.parse(t);n.find((t=>t.id===e.id))?(d.btnQueue.classList.replace("queue_send","queue_remove"),d.btnQueue.textContent="REMOVE FROM QUEUE"):(d.btnQueue.classList.replace("queue_remove","queue_send"),d.btnQueue.textContent="ADD TO QUEUE")}catch(e){d.btnQueue.classList.replace("queue_remove","queue_send")}})(t),d.btnQueue.classList.contains("queue_remove")?d.btnQueue.textContent="REMOVE FROM QUEUE":d.btnWatched.classList.contains("queue_send")&&(d.btnQueue.textContent="ADD TO QUEUE");d.closeBtn.addEventListener("click",r),window.addEventListener("keydown",u)})),d.closeBtn.addEventListener("click",r),window.addEventListener("keydown",u),document.addEventListener("click",(function(e){!e.target.closest(".modal")&&e.target.closest(".backdrop")&&r()})),c("eBpwN");
//# sourceMappingURL=library.487d4d4b.js.map
