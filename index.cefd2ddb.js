!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},c=e.parcelRequired7c6;null==c&&((c=function(e){if(e in t)return t[e].exports;if(e in n){var c=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,c.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=c),c("jcFG7"),c("cLaDu"),c("hV50k");var a=c("4LMMA"),o=c("73ES2"),r=c("cDXQO"),s=c("iDjs5"),d={gallery:document.querySelector(".js-gallery"),closeBtn:document.querySelector("[data-modal-close]"),btnWatched:document.querySelector(".btn_watched"),btnQueue:document.querySelector(".btn_queue")},i=new(0,o.default);function u(){var e=document.querySelector(".iframe-container"),t=document.querySelector(".film__info-wrapper");(0,r.handleBackButtonClick)(e,t),i.close(),d.closeBtn.removeEventListener("click",u),r.trailerButtonRef.removeEventListener("click",r.handleTrailerButtonClick),window.removeEventListener("keydown",l)}function l(e){"Escape"===e.code&&(i.close(),d.closeBtn.removeEventListener("click",u),window.removeEventListener("keydown",l))}d.gallery.addEventListener("click",(function(e){if(e.preventDefault(),r.trailerButtonRef.addEventListener("click",r.handleTrailerButtonClick),"IMG"!==e.target.nodeName)return;var t=(n=e.target.id,a.load("film-current-page").find((function(e){return e.id===Number(n)})));var n;i.modifyDataFilm(t),i.open(),d.btnWatched.addEventListener("click",(function(){d.btnWatched.classList.contains("watched_send")?(d.btnWatched.textContent="REMOVE FROM WATCHED",d.btnWatched.classList.replace("watched_send","watched_remove"),(0,s.sendWatchedToStorage)()):d.btnWatched.classList.contains("watched_remove")&&(d.btnWatched.textContent="ADD TO WATCHED",d.btnWatched.classList.replace("watched_remove","watched_send"),function(e){try{var t=localStorage.getItem("WatchedMovies"),n=JSON.parse(t),c=n.findIndex((function(t){return t.id===e.id}));n.splice(c,1),localStorage.setItem("WatchedMovies",JSON.stringify(n))}catch(e){}}(t));d.btnWatched.textContent="ADD TO WATCHED",d.btnWatched.classList.replace("watched_remove","watched_send")})),d.btnQueue.addEventListener("click",(function(){d.btnQueue.classList.contains("queue_send")?(d.btnQueue.textContent="REMOVE FROM QUEUE",d.btnQueue.classList.replace("queue_send","queue_remove"),(0,s.sendQueueToStorage)()):d.btnQueue.classList.contains("queue_remove")&&(d.btnQueue.textContent="ADD TO QUEUE",d.btnQueue.classList.replace("queue_remove","queue_send"),function(e){try{var t=localStorage.getItem("QueueMovies"),n=JSON.parse(t),c=n.findIndex((function(t){return t.id===e.id}));n.splice(c,1),localStorage.setItem("QueueMovies",JSON.stringify(n))}catch(e){}}(t));d.btnQueue.textContent="ADD TO QUEUE",d.btnQueue.classList.replace("queue_remove","queue_send")})),localStorage.setItem("CurrentFilm",JSON.stringify(t)),function(e){try{var t=localStorage.getItem("WatchedMovies");JSON.parse(t).find((function(t){return t.id===e.id}))?(d.btnWatched.classList.replace("watched_send","watched_remove"),d.btnWatched.textContent="REMOVE FROM WATCHED"):(d.btnWatched.classList.replace("watched_remove","watched_send"),d.btnWatched.textContent="ADD TO WATCHED")}catch(e){d.btnWatched.classList.replace("watched_remove","watched_send")}}(t),d.btnWatched.classList.contains("watched_remove")?d.btnWatched.textContent="REMOVE FROM WATCHED":d.btnWatched.classList.contains("watched_send")&&(d.btnWatched.textContent="ADD TO WATCHED");(function(e){try{var t=localStorage.getItem("QueueMovies");JSON.parse(t).find((function(t){return t.id===e.id}))?(d.btnQueue.classList.replace("queue_send","queue_remove"),d.btnQueue.textContent="REMOVE FROM QUEUE"):(d.btnQueue.classList.replace("queue_remove","queue_send"),d.btnQueue.textContent="ADD TO QUEUE")}catch(e){d.btnQueue.classList.replace("queue_remove","queue_send")}})(t),d.btnQueue.classList.contains("queue_remove")?d.btnQueue.textContent="REMOVE FROM QUEUE":d.btnWatched.classList.contains("queue_send")&&(d.btnQueue.textContent="ADD TO QUEUE");d.closeBtn.addEventListener("click",u),window.addEventListener("keydown",l)})),d.closeBtn.addEventListener("click",u),window.addEventListener("keydown",l),document.addEventListener("click",(function(e){!e.target.closest(".modal")&&e.target.closest(".backdrop")&&u()})),c("cDXQO"),c("aZhHc"),c("d7VxN")}();
//# sourceMappingURL=index.cefd2ddb.js.map
