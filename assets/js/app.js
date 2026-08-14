/* ============================================================
   K&G TRENDS — Lógica de la tienda
   No necesitas editar este archivo para agregar productos.
   Los productos están en assets/js/products.js
   ============================================================ */

(function () {
  'use strict';

  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ---------- Estado ---------- */
  const estado = {
    categoria: 'todos',
    busqueda: '',
    orden: 'destacado',
    favoritos: cargarFavoritos()
  };

  function cargarFavoritos() {
    try { return JSON.parse(localStorage.getItem('kg_favoritos') || '[]'); }
    catch (e) { return []; }
  }
  function guardarFavoritos() {
    try { localStorage.setItem('kg_favoritos', JSON.stringify(estado.favoritos)); } catch (e) {}
  }

  /* ---------- Helpers ---------- */
  //   = espacio duro, para que "S/ 145" nunca se parta en dos líneas
  const precio = n => CONFIG.moneda + ' ' + Number(n).toLocaleString('es-PE', { minimumFractionDigits: 0 });

  const descuento = p =>
    (p.precio != null && p.precioAntes ? Math.round((1 - p.precio / p.precioAntes) * 100) : 0);

  function estrellas(r) {
    const llenas = Math.round(r);
    return '★'.repeat(llenas) + '☆'.repeat(5 - llenas);
  }

  /* Bloque de precio. Si el producto no tiene precio (precio: null) se muestra
     "Ver precio" en vez de un número: los precios de AliExpress cambian seguido
     y es preferible mandar a la tienda antes que mostrar un dato viejo. */
  function bloquePrecio(p) {
    if (p.precio == null) {
      return `<div class="p-precio">
                <span class="ahora ver-precio">Ver precio</span>
              </div>`;
    }
    const off = descuento(p);
    return `<div class="p-precio">
              <span class="ahora">${precio(p.precio)}</span>
              ${p.precioAntes ? `<span class="antes">${precio(p.precioAntes)}</span><span class="off">-${off}%</span>` : ''}
            </div>`;
  }

  /* El verde señala un beneficio. Solo se usa cuando el envío es realmente
     gratis; si tiene costo va en gris neutro, para no dar a entender lo que
     no es. La regla se decide por el propio texto de "envio". */
  const envioEsGratis = p => /gratis|free/i.test(p.envio || '');

  function bloqueEnvio(p) {
    const gratis = envioEsGratis(p);
    return `<span class="p-envio${gratis ? ' gratis' : ''}">${gratis ? '🚚' : '📦'} ${escapar(p.envio)}</span>`;
  }

  /* Solo se pinta si el producto trae valoración real. */
  function bloqueRating(p) {
    if (!p.rating) return '';
    const n = p.reviews ? ` (${p.reviews.toLocaleString('es-PE')})` : '';
    return `<div class="p-rating">
              <span class="estrellas">${estrellas(p.rating)}</span>
              <span>${p.rating}${n}</span>
            </div>`;
  }

  const nombreCategoria = id => (CATEGORIAS.find(c => c.id === id) || { nombre: id }).nombre;

  const escapar = t => String(t).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const nombreTienda = t => (t === 'amazon' ? 'Amazon' : 'AliExpress');

  function media(p, claseEmoji) {
    return p.img
      ? `<img src="${escapar(p.img)}" alt="${escapar(p.nombre)}" loading="lazy"
              data-emoji="${escapar(p.emoji || '🛍️')}" data-clase="${claseEmoji}">`
      : `<span class="${claseEmoji}">${p.emoji || '🛍️'}</span>`;
  }

  /* Red de seguridad para las fotos alojadas en servidores ajenos (AliExpress
     y Amazon): si la imagen desaparece, la tarjeta muestra el emoji en vez de
     quedar rota. Los eventos "load" y "error" de <img> no burbujean, por eso
     se escuchan en fase de captura. */
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

  /* AliExpress no responde 404 cuando una foto ya no existe: entrega un
     marcador gris de 100x100. Como las fotos de producto son de 640px o más,
     cualquier imagen diminuta se trata como rota. */
  document.addEventListener('load', e => {
    const img = e.target;
    if (img.tagName === 'IMG' && img.dataset.emoji && img.naturalWidth < 200) fotoPorEmoji(img);
  }, true);

  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('visible');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('visible'), 2600);
  }

  /* ---------- Categorías ---------- */
  function pintarCategorias() {
    // Tarjetas grandes (sin "todos")
    $('#gridCategorias').innerHTML = CATEGORIAS
      .filter(c => c.id !== 'todos')
      .map(c => {
        const n = PRODUCTOS.filter(p => p.categoria === c.id).length;
        return `<button class="cat-card" data-cat="${c.id}">
                  <span class="emoji">${c.emoji}</span>
                  <b>${escapar(c.nombre)}</b>
                  <small>${n} producto${n === 1 ? '' : 's'}</small>
                </button>`;
      }).join('');

    // Chips del catálogo
    $('#chipsCategorias').innerHTML = CATEGORIAS
      .map(c => `<button class="chip${c.id === estado.categoria ? ' activo' : ''}" data-cat="${c.id}">
                   ${c.emoji} ${escapar(c.nombre)}
                 </button>`).join('');
  }

  /* ---------- Filtrado y orden ---------- */
  function productosVisibles() {
    let lista = PRODUCTOS.slice();

    if (estado.categoria !== 'todos') {
      lista = lista.filter(p => p.categoria === estado.categoria);
    }

    const q = estado.busqueda.trim().toLowerCase();
    if (q) {
      lista = lista.filter(p =>
        (p.nombre + ' ' + p.descripcion + ' ' + nombreCategoria(p.categoria)).toLowerCase().includes(q)
      );
    }

    // Los productos sin precio van siempre al final al ordenar por precio
    const pr = (p, sinPrecio) => (p.precio == null ? sinPrecio : p.precio);

    const ordenar = {
      'precio-asc':  (a, b) => pr(a, Infinity) - pr(b, Infinity),
      'precio-desc': (a, b) => pr(b, -Infinity) - pr(a, -Infinity),
      'rating':      (a, b) => b.rating - a.rating,
      'descuento':   (a, b) => descuento(b) - descuento(a),
      'destacado':   (a, b) => (b.destacado === true) - (a.destacado === true) || b.rating - a.rating
    }[estado.orden];

    return lista.sort(ordenar);
  }

  /* ---------- Tarjetas de producto ---------- */
  function pintarProductos() {
    const lista = productosVisibles();
    const grid  = $('#gridProductos');

    if (!lista.length) {
      grid.innerHTML = `<div class="sin-resultados">
          <span class="emoji">🔍</span>
          <b>No encontramos nada con esa búsqueda</b>
          <p>Prueba con otra palabra o mira todas las categorías.</p>
          <button class="btn btn-fantasma" id="limpiarFiltros">Ver todo el catálogo</button>
        </div>`;
      $('#limpiarFiltros').addEventListener('click', () => {
        estado.categoria = 'todos';
        estado.busqueda  = '';
        $('#inputBuscar').value = '';
        pintarCategorias();
        pintarProductos();
      });
      return;
    }

    grid.innerHTML = lista.map((p, i) => {
      const esFav = estado.favoritos.includes(p.id);
      return `
      <article class="producto" style="animation-delay:${Math.min(i * 45, 400)}ms">
        <div class="p-media">
          ${p.etiqueta ? `<span class="cinta">${escapar(p.etiqueta)}</span>` : ''}
          <button class="fav${esFav ? ' activo' : ''}" data-fav="${p.id}"
                  aria-label="Guardar en favoritos" title="Guardar en favoritos">${esFav ? '❤️' : '🤍'}</button>
          ${media(p, 'emoji')}
          <span class="tienda-tag ${p.tienda}">${nombreTienda(p.tienda)}</span>
        </div>

        <div class="p-body">
          <span class="p-cat">${escapar(nombreCategoria(p.categoria))}</span>
          <h3 class="p-nombre">${escapar(p.nombre)}</h3>

          ${bloqueRating(p)}
          ${bloquePrecio(p)}
          ${bloqueEnvio(p)}

          <div class="p-acciones">
            <a class="btn btn-primario" href="${escapar(p.url)}" target="_blank" rel="noopener sponsored"
               data-comprar="${p.id}">Comprar</a>
            <button class="btn btn-fantasma btn-ver" data-ver="${p.id}" aria-label="Ver detalles" title="Ver detalles">👁</button>
          </div>
        </div>
      </article>`;
    }).join('');
  }

  /* ---------- Favoritos ---------- */
  function alternarFavorito(id) {
    const i = estado.favoritos.indexOf(id);
    if (i === -1) {
      estado.favoritos.push(id);
      toast('❤️ Guardado en favoritos');
    } else {
      estado.favoritos.splice(i, 1);
      toast('Quitado de favoritos');
    }
    guardarFavoritos();
    actualizarContador();
    pintarProductos();
    pintarPanelFavoritos();
  }

  function actualizarContador() {
    const c = $('#contadorFav');
    c.textContent = estado.favoritos.length;
    c.classList.toggle('visible', estado.favoritos.length > 0);
  }

  function pintarPanelFavoritos() {
    const cuerpo = $('#panelBody');
    const items  = estado.favoritos.map(id => PRODUCTOS.find(p => p.id === id)).filter(Boolean);

    if (!items.length) {
      cuerpo.innerHTML = `<div class="panel-vacio">
          <span class="emoji">🤍</span>
          <b>Aún no tienes favoritos</b>
          <p>Toca el corazón de un producto para guardarlo aquí.</p>
        </div>`;
      return;
    }

    cuerpo.innerHTML = items.map(p => `
      <div class="fav-item">
        <span class="mini">${media(p, '')}</span>
        <span class="fav-txt">
          <b>${escapar(p.nombre)}</b>
          <span class="fav-precio">${p.precio == null ? 'Ver precio' : precio(p.precio)}</span>
        </span>
        <button class="quitar" data-fav="${p.id}" aria-label="Quitar de favoritos">×</button>
      </div>`).join('') +
      `<a class="btn btn-primario btn-bloque" id="verFavCatalogo" href="#catalogo">Seguir explorando</a>`;
  }

  function abrirPanel(abrir) {
    $('#panelFav').classList.toggle('abierto', abrir);
    $('#velo').classList.toggle('visible', abrir);
    document.body.style.overflow = abrir ? 'hidden' : '';
  }

  /* ---------- Modal de producto ---------- */
  function abrirModal(id) {
    const p = PRODUCTOS.find(x => x.id === id);
    if (!p) return;

    $('#modalMedia').innerHTML = media(p, 'emoji');
    $('#modalInfo').innerHTML = `
      <span class="p-cat">${escapar(nombreCategoria(p.categoria))} · ${nombreTienda(p.tienda)}</span>
      <h3>${escapar(p.nombre)}</h3>
      ${bloqueRating(p)}
      <p class="desc">${escapar(p.descripcion)}</p>
      ${bloquePrecio(p)}
      <ul class="lista-check">
        ${p.precio == null ? `<li>Precio actualizado directamente en ${nombreTienda(p.tienda)}</li>` : ''}
        <li>${escapar(p.envio)}</li>
        <li>Pago seguro en ${nombreTienda(p.tienda)}, con protección al comprador</li>
        <li>Producto verificado por el equipo de K&amp;G Trends</li>
      </ul>
      <div class="p-acciones">
        <a class="btn btn-primario" href="${escapar(p.url)}" target="_blank" rel="noopener sponsored">Comprar ahora →</a>
        <button class="btn btn-fantasma" data-fav="${p.id}">
          ${estado.favoritos.includes(p.id) ? '❤️ Guardado' : '🤍 Guardar'}
        </button>
      </div>`;

    $('#modal').classList.add('abierto');
    document.body.style.overflow = 'hidden';
  }

  function cerrarModal() {
    $('#modal').classList.remove('abierto');
    if (!$('#panelFav').classList.contains('abierto')) document.body.style.overflow = '';
  }

  /* ---------- Contador de ofertas (72 h en bucle) ---------- */
  function reloj() {
    const ciclo = 72 * 60 * 60 * 1000;
    const restante = ciclo - (Date.now() % ciclo);
    const s = Math.floor(restante / 1000);
    const dos = n => String(n).padStart(2, '0');

    $('#rDias').textContent  = dos(Math.floor(s / 86400));
    $('#rHoras').textContent = dos(Math.floor((s % 86400) / 3600));
    $('#rMin').textContent   = dos(Math.floor((s % 3600) / 60));
    $('#rSeg').textContent   = dos(s % 60);
  }

  /* ---------- Números que suben ---------- */
  function animarNumeros() {
    $$('[data-contar]').forEach(el => {
      const destino = parseInt(el.dataset.contar, 10);
      const io = new IntersectionObserver(entradas => {
        if (!entradas[0].isIntersecting) return;
        io.disconnect();
        let actual = 0;
        const paso = destino / 45;
        const t = setInterval(() => {
          actual += paso;
          if (actual >= destino) { actual = destino; clearInterval(t); }
          el.textContent = Math.floor(actual).toLocaleString('es-PE') + (actual >= destino ? '+' : '');
        }, 26);
      }, { threshold: .4 });
      io.observe(el);
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  function revelar() {
    const io = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: .12 });
    $$('.reveal').forEach(el => io.observe(el));
  }

  /* ---------- Enlaces de contacto ---------- */
  function enlacesContacto() {
    const saludo = '¡Hola K&G Trends! Vi su web y quiero información sobre un producto 🛍️';

    /* Un WhatsApp de relleno es peor que ninguno: el cliente abre un chat con
       un número inexistente y se va. Mientras CONFIG.whatsapp siga siendo el
       ejemplo, los botones de WhatsApp escriben por correo. En cuanto se ponga
       el número real, vuelven a ser WhatsApp solos. */
    // Se aceptan formatos como "+51 987 654 321": se limpia todo lo que no
    // sea dígito, así el número funciona aunque se escriba con + o espacios.
    const numero = String(CONFIG.whatsapp || '').replace(/\D/g, '');
    const waValido = numero.length >= 8 && numero.length <= 15 && numero !== '51999999999';

    const destino = waValido
      ? 'https://wa.me/' + numero + '?text=' + encodeURIComponent(saludo)
      : 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent('Consulta desde K&G Trends') +
        '&body=' + encodeURIComponent(saludo);

    ['#btnWhatsapp', '#lnkWhatsapp', '#lnkWaFooter'].forEach(sel => {
      const el = $(sel);
      if (!el) return;
      el.href = destino;
      if (waValido) {
        el.target = '_blank'; el.rel = 'noopener';
      } else {
        el.removeAttribute('target');
        if (el.id === 'btnWhatsapp') {
          el.textContent = '✉️';
          el.classList.add('es-correo');
          el.setAttribute('aria-label', 'Escríbenos por correo');
          el.title = 'Escríbenos por correo';
        } else if (el.id === 'lnkWaFooter') {
          // El pie ya tiene su enlace de correo: se oculta para no duplicarlo
          (el.closest('li') || el).style.display = 'none';
        } else {
          el.textContent = '✉️';
          el.title = 'Escríbenos por correo';
        }
      }
    });

    const mail = $('#lnkMail');
    if (mail) mail.href = 'mailto:' + CONFIG.email;

    const redes = { '#lnkInstagram': CONFIG.instagram, '#lnkTiktok': CONFIG.tiktok, '#lnkFacebook': CONFIG.facebook };
    Object.entries(redes).forEach(([sel, url]) => {
      const el = $(sel);
      if (el) { el.href = url; el.target = '_blank'; el.rel = 'noopener'; }
    });

    $('#anio').textContent = new Date().getFullYear();
  }

  /* ---------- Eventos ---------- */
  function eventos() {
    // Delegación global de clics
    document.addEventListener('click', e => {
      const fav = e.target.closest('[data-fav]');
      if (fav) {
        e.preventDefault();
        alternarFavorito(Number(fav.dataset.fav));
        if ($('#modal').classList.contains('abierto')) abrirModal(Number(fav.dataset.fav));
        return;
      }

      const ver = e.target.closest('[data-ver]');
      if (ver) { abrirModal(Number(ver.dataset.ver)); return; }

      const cat = e.target.closest('[data-cat]');
      if (cat) {
        estado.categoria = cat.dataset.cat;
        pintarCategorias();
        pintarProductos();
        $('#catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      const comprar = e.target.closest('[data-comprar]');
      if (comprar) toast('Te llevamos a la tienda oficial 🛒');
    });

    // Buscador
    let temporizador;
    $('#inputBuscar').addEventListener('input', e => {
      clearTimeout(temporizador);
      temporizador = setTimeout(() => {
        estado.busqueda = e.target.value;
        pintarProductos();
      }, 180);
    });

    // Orden
    $('#selectOrden').addEventListener('change', e => {
      estado.orden = e.target.value;
      pintarProductos();
    });

    // Panel de favoritos
    $('#btnFavoritos').addEventListener('click', () => { pintarPanelFavoritos(); abrirPanel(true); });
    $('#cerrarPanel').addEventListener('click', () => abrirPanel(false));
    $('#velo').addEventListener('click', () => abrirPanel(false));
    $('#lnkFavFooter').addEventListener('click', e => { e.preventDefault(); pintarPanelFavoritos(); abrirPanel(true); });
    $('#panelBody').addEventListener('click', e => { if (e.target.id === 'verFavCatalogo') abrirPanel(false); });

    // Modal
    $('#modalCerrar').addEventListener('click', cerrarModal);
    $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') cerrarModal(); });
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      cerrarModal();
      abrirPanel(false);
      $('#menuMovil').classList.remove('abierto');
    });

    // Menú móvil
    $('#btnMenu').addEventListener('click', () => $('#menuMovil').classList.add('abierto'));
    $('#cerrarMenu').addEventListener('click', () => $('#menuMovil').classList.remove('abierto'));
    $$('#menuMovil a').forEach(a => a.addEventListener('click', () => $('#menuMovil').classList.remove('abierto')));

    // Newsletter (demo: no envía a ningún servidor)
    $('#formNews').addEventListener('submit', e => {
      e.preventDefault();
      toast('¡Listo! Te avisaremos de las mejores ofertas 🎉');
      e.target.reset();
    });

    // Scroll: cabecera fija + botón subir
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      $('#cabecera').classList.toggle('fija', y > 20);
      $('#btnArriba').classList.toggle('visible', y > 600);
    }, { passive: true });

    $('#btnArriba').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Arranque ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    pintarCategorias();
    pintarProductos();
    actualizarContador();
    pintarPanelFavoritos();
    enlacesContacto();
    eventos();
    revelar();
    animarNumeros();
    reloj();
    setInterval(reloj, 1000);
  });
})();
