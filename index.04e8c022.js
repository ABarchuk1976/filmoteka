var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=r),r("8G1wF"),r("7EEHk");var a=r("2shzp"),o=r("8G1wF"),i=r("04jNI"),c=r("7EEHk");const d=document.querySelector(".js-gallery"),s=document.querySelector(".js-pagination"),l=document.querySelector(".header__warning"),u=document.querySelector(".header__input"),m=document.querySelector(".header__form");let f="",v=1,g=1;function p(e){l.insertAdjacentHTML("beforeend",`<div class="header__warning-message">${e}</div>`),setTimeout((()=>{l.innerHTML=""}),4e3)}function E(e,t){(0,i.default)(),setTimeout((()=>async function(e,t){try{let n="";t?(n=`${o.API}${o.TRENDING}/${o.MEDIA_TYPE}/${o.TIME_WINDOW}?`,n+=new URLSearchParams({api_key:o.KEY,page:e,include_adult:!1})):(n=`${o.API}/search/${o.MEDIA_TYPE}?`,n+=new URLSearchParams({api_key:o.KEY,language:"en-US",query:u.value.trim().toLowerCase(),page:e,include_adult:!1}));const r=await a.default.get(n);if(200!==r.status)throw new Error("Service is temporarily unavailable.");return r.data}catch(e){p(e.message)}}(e,t).then((({page:e,results:t,total_pages:n})=>{if((0,c.renderFilmCards)(t,d),(0,c.renderPagination)(e,n,s),!n)throw new Error(`Search result "${f}" not successful. Enter an another movie name.`)})).catch((e=>p(e.message))).finally((0,i.default)())),200)}window.addEventListener("load",(()=>{E(v,g)})),s.addEventListener("click",(function(e){const t=e.target;if("..."===t.textContent||"LI"!==t.tagName)return;t.classList.contains("js-pagination__arrow-left")&&(v-=1);t.classList.contains("js-pagination__arrow-right")&&(v+=1);t.classList.contains("js-pagination__button")&&(v=Number(t.textContent));E(v,g),(0,c.goUp)()})),m.addEventListener("submit",(e=>{if(g=0,v=1,e.preventDefault(),f=e.currentTarget.elements.searchQuery.value.trim().toLowerCase(),!f){p("Search query is empty. Rendering the popular movies."),d.innerHTML="",g=1}E(v,g)})),u.addEventListener("input",(e=>{const t=e.target,n=document.querySelector(".header__btn-clear");function r(){t.value="",n.classList.add("hidden"),n.removeEventListener("click",r)}t.value.length?n.classList.remove("hidden"):(n.classList.add("hidden"),n.removeEventListener("click",r)),n.addEventListener("click",r)}));var L=r("fQE3M"),h=r("37v9V");c=r("7EEHk");const y=document.querySelector(".js-gallery"),w=document.querySelector("[data-modal-close]"),_=document.querySelector("[data-modal]"),k=document.querySelector("body"),S=document.querySelector(".btn__wrapper"),T=new(0,L.default);function b(e){const{nodeName:t,name:n}=e.target;"BUTTON"===t&&((0,c.changeStore)(n),T.rerenderBtnWrapper())}function q(){window.removeEventListener("keydown",N),_.classList.add("is-hidden"),k.classList.remove("body--modal-open"),h.trailerButtonRef.removeEventListener("click",h.handleTrailerButtonClick)}function N(e){console.log(e.code),"Escape"===e.code&&q()}y.addEventListener("click",(function(e){const{id:t,nodeName:n,name:r}=e.target;if(e.preventDefault(),h.trailerButtonRef.addEventListener("click",h.handleTrailerButtonClick),"IMG"!==n)return;const a=(0,c.getFilmData)(t);T.modifyDataFilm(a),T.open(),S.addEventListener("click",b)})),document.addEventListener("click",(function(e){e.target===e.currentTarget&&q()})),window.addEventListener("keydown",N),w.addEventListener("click",q),r("fQE3M"),r("7bYU0"),r("37v9V"),r("jLhJV"),r("04jNI"),r("b5rV1");
//# sourceMappingURL=index.04e8c022.js.map
