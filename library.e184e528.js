var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o),o("8G1wF"),o("7EEHk");var i=o("7EEHk"),r=o("8G1wF");let a=[],c=1;const l=document.querySelector(".filter__item-queue"),s=document.querySelector(".filter__item-watched"),d=document.querySelector(".filter__list"),u=document.querySelector(".js-pagination-library"),m=document.querySelector(".empty-list"),g=document.querySelector(".empty-title"),f=document.querySelector(".js-gallery-library");function v(e){try{let t=localStorage.getItem(e);if(console.log("In Pagination All: ",t),t){t=JSON.parse(t);const e=[];for(let n=0;n<t.length;n+=6){let o=n+6<t.length?n+6:t.length;e.push(t.slice(n,o))}return console.log(e),e}}catch(e){console.log(e.message)}}window.addEventListener("load",(()=>{l.click()})),d.addEventListener("click",(function(e){const{name:t,tagName:n}=e.target;if(console.log("on Li Click: ",e.target.name),"BUTTON"!==n)return;const o=t;switch(c=1,console.log(v(o)),o){case r.KEY_QUEUE:l.classList.add("active"),s.classList.remove("active");break;case r.KEY_WATCHED:s.classList.add("active"),l.classList.remove("active")}m.classList.add("is-hidden");try{if(a=[...v(o)],console.log(a),!a||!a.length)return m.classList.remove("is-hidden"),void(g.textContent="Your film list is empty.");(0,i.renderFilmCards)(a[c-1],f),(0,i.renderPagination)(c,a.length,u)}catch(e){m.classList.remove("is-hidden"),g.textContent="Something went wrong."}})),u.addEventListener("click",(function(e){const t=e.target;if("..."===t.textContent||"LI"!==t.tagName)return;t.classList.contains("js-pagination__arrow-left")&&(c-=1);t.classList.contains("js-pagination__arrow-right")&&(c+=1);t.classList.contains("js-pagination__button")&&(c=Number(t.textContent));try{(0,i.renderFilmCards)(a[c-1],f),(0,i.renderPagination)(c,a.length,u),m.classList.add("is-hidden")}catch(e){m.classList.remove("is-hidden"),g.textContent=e.message}(0,i.goUp)()})),o("b5rV1");var w=o("fQE3M");i=o("7EEHk");const y=document.querySelector(".js-gallery-library"),E=document.querySelector("[data-modal-close]"),L=document.querySelector(".btn__wrapper"),p=(document.querySelector(".filter__item>.filter__button--active"),new(0,w.default));function h(e){const{nodeName:t,name:n}=e.target;"BUTTON"===t&&((0,i.changeStore)(n),p.rerenderBtnWrapper())}function _(){p.close(),E.removeEventListener("click",_),window.removeEventListener("keydown",k),window.location.reload()}function k(e){"Escape"===e.code&&(p.close(),E.removeEventListener("click",_),window.removeEventListener("keydown",k))}y.addEventListener("click",(function(e){const{id:t,nodeName:n,name:o}=e.target;if(e.preventDefault(),"IMG"!==n)return;const r=(0,i.getFilmData)(t);p.modifyDataFilm(r),p.open(),L.addEventListener("click",h)})),E.addEventListener("click",_),window.addEventListener("keydown",k),document.addEventListener("click",(function(e){!e.target.closest(".modal")&&e.target.closest(".backdrop")&&_()})),E.addEventListener("click",_),window.addEventListener("keydown",k),o("fQE3M"),o("7bYU0"),o("37v9V"),o("jLhJV"),o("04jNI");
//# sourceMappingURL=library.e184e528.js.map
