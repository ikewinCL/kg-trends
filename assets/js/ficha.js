/* ============================================================
   K&G TRENDS — Página individual de producto
   Solo se encarga del respaldo de imágenes. Todo lo demás en estas
   páginas es HTML estático, para que Google lo lea sin ejecutar nada.
   ============================================================ */

(function () {
  'use strict';

  /* Igual que en app.js: si la foto del CDN falla, o si AliExpress devuelve
     su marcador gris de 100x100 en vez de un 404, se muestra el emoji. */
  function fotoPorEmoji(img) {
    const contenedor = img.parentElement;
    const clase = img.dataset.clase || 'emoji';
    const emoji = img.dataset.emoji;
    img.remove();
    contenedor.insertAdjacentHTML('beforeend', `<span class="${clase}">${emoji}</span>`);
  }

  document.addEventListener('error', e => {
    const img = e.target;
    if (img.tagName === 'IMG' && img.dataset.emoji) fotoPorEmoji(img);
  }, true);

  document.addEventListener('load', e => {
    const img = e.target;
    if (img.tagName === 'IMG' && img.dataset.emoji && img.naturalWidth < 200) fotoPorEmoji(img);
  }, true);
})();
