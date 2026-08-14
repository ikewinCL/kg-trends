/* ============================================================
   K&G TRENDS — Generador de SEO
   ------------------------------------------------------------
   Ejecutar SIEMPRE antes de publicar:

       node tools/build-seo.js

   Qué hace:
   1. Escribe el catálogo dentro de index.html. El buscador de Google
      descarga el HTML antes de ejecutar JavaScript, así que si los
      productos solo los pinta el JS, para Google la tienda está vacía.
   2. Genera los datos estructurados (JSON-LD) que Google usa para
      entender qué vende la tienda.
   3. Genera sitemap.xml.
   4. Actualiza solo el ?v= de los assets, calculándolo del contenido
      de los archivos. Así ya no hay que acordarse de subirlo a mano.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const RAIZ = path.join(__dirname, '..');
const SITIO = 'https://kygtrends.com';
const f = (...p) => path.join(RAIZ, ...p);

/* ---------- Cargar el catálogo ---------- */
const fuenteProductos = fs.readFileSync(f('assets/js/products.js'), 'utf8');
const { PRODUCTOS, CATEGORIAS, CONFIG } =
  vm.runInNewContext(fuenteProductos + '\n;({PRODUCTOS,CATEGORIAS,CONFIG});');

const nombreCategoria = id => (CATEGORIAS.find(c => c.id === id) || { nombre: id }).nombre;
const nombreTienda = t => (t === 'amazon' ? 'Amazon' : 'AliExpress');
const esc = t => String(t).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* Dirección propia de cada producto, legible y con las palabras del nombre:
   /producto/cargador-ugreen-100w-gan-usb-c-18/ */
function slug(p) {
  const base = p.nombre
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')   // quita tildes
    .replace(/["']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-').slice(0, 8).join('-');
  return `${base}-${p.id}`;
}
const rutaProducto = p => `/producto/${slug(p)}.html`;

/* ---------- 1. Catálogo estático para el buscador ----------
   El marcado replica el que genera app.js. Al cargar la página, el JS
   vuelve a pintar lo mismo con los filtros activos; el visitante no
   nota diferencia y Google ya tiene el contenido. */
function tarjeta(p) {
  const envioGratis = /gratis|free/i.test(p.envio || '');
  const precio = p.precio == null
    ? '<span class="ahora ver-precio">Ver precio</span>'
    : `<span class="ahora">${CONFIG.moneda} ${p.precio}</span>`;

  return `      <article class="producto">
        <div class="p-media">
          ${p.etiqueta ? `<span class="cinta">${esc(p.etiqueta)}</span>` : ''}
          <img src="${esc(p.img)}" alt="${esc(p.nombre)}" loading="lazy" data-emoji="${esc(p.emoji || '🛍️')}" data-clase="emoji">
          <span class="tienda-tag ${p.tienda}">${nombreTienda(p.tienda)}</span>
        </div>
        <div class="p-body">
          <span class="p-cat">${esc(nombreCategoria(p.categoria))}</span>
          <h3 class="p-nombre"><a href="${rutaProducto(p)}">${esc(p.nombre)}</a></h3>
          <div class="p-precio">${precio}</div>
          <span class="p-envio${envioGratis ? ' gratis' : ''}">${envioGratis ? '🚚' : '📦'} ${esc(p.envio)}</span>
          <div class="p-acciones">
            <a class="btn btn-primario" href="${esc(p.url)}" target="_blank" rel="noopener sponsored">Comprar</a>
          </div>
        </div>
      </article>`;
}

const catalogoHtml = PRODUCTOS.map(tarjeta).join('\n');

/* ---------- 2. Datos estructurados ----------
   No se declara precio ni disponibilidad porque no los conocemos: marcar
   datos falsos es motivo de penalización en Google. Se usa ItemList, que
   no los exige. */
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: CONFIG.marca,
    url: SITIO + '/',
    logo: SITIO + '/assets/img/logo.svg',
    email: CONFIG.email,
    description: 'Tienda de productos en tendencia seleccionados a mano en AliExpress y Amazon, con envío a Perú.',
    areaServed: { '@type': 'Country', name: 'Perú' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: CONFIG.marca,
    url: SITIO + '/',
    inLanguage: 'es-PE'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catálogo de K&G Trends',
    numberOfItems: PRODUCTOS.length,
    itemListElement: PRODUCTOS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.nombre,
        description: p.descripcion,
        image: p.img,
        category: nombreCategoria(p.categoria),
        url: p.url
      }
    }))
  }
];

const jsonLdHtml = jsonLd
  .map(o => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`)
  .join('\n');

/* ---------- 2b. Una página propia por producto ----------
   Con todos los productos en una sola dirección, Google no tiene qué mostrar
   cuando alguien busca un producto concreto. Cada ficha pasa a tener su
   propia URL, su propio título y sus propios datos estructurados. */
function paginaProducto(p, version) {
  const cat = nombreCategoria(p.categoria);
  const tienda = nombreTienda(p.tienda);
  const url = SITIO + rutaProducto(p);
  const envioGratis = /gratis|free/i.test(p.envio || '');

  // Hasta 3 productos de la misma categoría, para que Google encuentre el
  // resto de fichas y el visitante siga navegando.
  const relacionados = PRODUCTOS
    .filter(o => o.categoria === p.categoria && o.id !== p.id)
    .slice(0, 3);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.nombre,
    description: p.descripcion,
    image: p.img,
    category: cat,
    url,
    ...(p.rating ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: p.rating,
        reviewCount: p.reviews || 1
      }
    } : {})
  };

  const miga = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO + '/' },
      { '@type': 'ListItem', position: 2, name: cat, item: SITIO + '/#catalogo' },
      { '@type': 'ListItem', position: 3, name: p.nombre, item: url }
    ]
  };

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.nombre)} | K&amp;G Trends</title>
<meta name="description" content="${esc(p.descripcion.slice(0, 155))}">
<meta name="theme-color" content="#08060F">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="K&amp;G Trends">
<meta property="og:locale" content="es_PE">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(p.nombre)}">
<meta property="og:description" content="${esc(p.descripcion.slice(0, 155))}">
<meta property="og:image" content="${esc(p.img)}">
<meta name="twitter:card" content="summary_large_image">

<script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(miga, null, 2)}
</script>

<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/styles.css?v=${version}">
</head>
<body>

<header class="cabecera">
  <div class="contenedor">
    <a href="/" class="logo" aria-label="K&amp;G Trends — inicio">
      <img src="/assets/img/logo.svg" alt="K&amp;G Trends">
    </a>
    <a href="/#catalogo" class="btn btn-fantasma">← Ver todo el catálogo</a>
  </div>
</header>

<main class="seccion">
  <div class="contenedor">

    <nav class="miga" aria-label="Ruta de navegación">
      <a href="/">Inicio</a> <span>›</span>
      <a href="/#catalogo">${esc(cat)}</a> <span>›</span>
      <span>${esc(p.nombre)}</span>
    </nav>

    <article class="ficha">
      <div class="ficha-media">
        <img src="${esc(p.img)}" alt="${esc(p.nombre)}"
             data-emoji="${esc(p.emoji || '🛍️')}" data-clase="emoji">
      </div>

      <div class="ficha-info">
        <span class="p-cat">${esc(cat)} · ${tienda}</span>
        <h1>${esc(p.nombre)}</h1>
        <p class="ficha-desc">${esc(p.descripcion)}</p>

        <div class="p-precio">
          ${p.precio == null
            ? '<span class="ahora ver-precio">Ver precio actual</span>'
            : `<span class="ahora">${CONFIG.moneda} ${p.precio}</span>`}
        </div>
        <span class="p-envio${envioGratis ? ' gratis' : ''}">${envioGratis ? '🚚' : '📦'} ${esc(p.envio)}</span>

        <ul class="lista-check">
          ${p.precio == null ? `<li>El precio siempre es el vigente en ${tienda}, no uno desactualizado</li>` : ''}
          <li>Pago seguro en ${tienda}, con su protección al comprador</li>
          <li>Vendedor revisado por el equipo de K&amp;G Trends</li>
        </ul>

        <a class="btn btn-primario btn-bloque" href="${esc(p.url)}"
           target="_blank" rel="noopener sponsored">Comprar en ${tienda} →</a>

        <p class="nota-form">
          Al comprar por este enlace podemos recibir una comisión de ${tienda},
          sin ningún costo adicional para ti.
        </p>
      </div>
    </article>

    ${relacionados.length ? `
    <section style="margin-top:3.5rem">
      <h2 class="titulo-seccion" style="font-size:1.5rem">También en ${esc(cat)}</h2>
      <div class="grid-productos">
${relacionados.map(tarjeta).join('\n')}
      </div>
    </section>` : ''}

  </div>
</main>

<footer class="pie">
  <div class="contenedor">
    <div class="legal">
      <span>© ${new Date().getFullYear()} K&amp;G Trends</span>
      <span>Participamos en programas de afiliados de AliExpress y Amazon: podemos ganar una comisión por las compras realizadas, sin costo extra para ti.</span>
    </div>
  </div>
</footer>

<script src="/assets/js/products.js?v=${version}"></script>
<script src="/assets/js/ficha.js?v=${version}"></script>
</body>
</html>
`;
}

/* ---------- 3. Versión de los assets, calculada del contenido ---------- */
const huella = crypto.createHash('md5').update(
  fs.readFileSync(f('assets/js/products.js')) + '' +
  fs.readFileSync(f('assets/js/app.js')) + '' +
  fs.readFileSync(f('assets/css/styles.css'))
).digest('hex').slice(0, 8);

/* ---------- Reemplazar en index.html ---------- */
function entreMarcas(texto, marca, contenido) {
  const re = new RegExp(`(<!-- ${marca}:INICIO -->)[\\s\\S]*?(<!-- ${marca}:FIN -->)`);
  if (!re.test(texto)) throw new Error(`Faltan las marcas ${marca} en index.html`);
  return texto.replace(re, `$1\n${contenido}\n$2`);
}

let html = fs.readFileSync(f('index.html'), 'utf8');
html = entreMarcas(html, 'SEO:CATALOGO', catalogoHtml);
html = entreMarcas(html, 'SEO:JSONLD', jsonLdHtml);
html = html.replace(/(assets\/(?:css\/styles\.css|js\/products\.js|js\/app\.js))\?v=[^"]*/g, `$1?v=${huella}`);
fs.writeFileSync(f('index.html'), html);

let html404 = fs.readFileSync(f('404.html'), 'utf8');
html404 = html404.replace(/(\/assets\/css\/styles\.css)\?v=[^"]*/g, `$1?v=${huella}`);
fs.writeFileSync(f('404.html'), html404);

/* ---------- Escribir las páginas de producto ---------- */
const dirProd = f('producto');
if (fs.existsSync(dirProd)) {
  // Se borran las viejas: si se quita un producto, su página no debe quedar
  // huérfana en el sitio ni en Google.
  fs.readdirSync(dirProd).forEach(a => fs.unlinkSync(path.join(dirProd, a)));
} else {
  fs.mkdirSync(dirProd);
}
PRODUCTOS.forEach(p => {
  fs.writeFileSync(f('producto', slug(p) + '.html'), paginaProducto(p, huella));
});

/* ---------- 4. sitemap.xml ---------- */
const hoy = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: SITIO + '/', prio: '1.0', freq: 'weekly' },
  ...PRODUCTOS.map(p => ({ loc: SITIO + rutaProducto(p), prio: '0.8', freq: 'monthly' }))
];
fs.writeFileSync(f('sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.prio}</priority>
  </url>`).join('\n')}
</urlset>
`);

/* ---------- robots.txt ---------- */
fs.writeFileSync(f('robots.txt'),
`User-agent: *
Allow: /

Sitemap: ${SITIO}/sitemap.xml
`);

/* ---------- Resumen ---------- */
const porCat = {};
PRODUCTOS.forEach(p => { porCat[nombreCategoria(p.categoria)] = (porCat[nombreCategoria(p.categoria)] || 0) + 1; });

console.log('SEO generado');
console.log('  productos escritos en el HTML:', PRODUCTOS.length);
console.log('  por categoría:', JSON.stringify(porCat));
console.log('  versión de assets (?v=):', huella);
console.log('  sitemap.xml y robots.txt actualizados');
