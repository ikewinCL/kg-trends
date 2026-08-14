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
          <h3 class="p-nombre">${esc(p.nombre)}</h3>
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

/* ---------- 4. sitemap.xml ---------- */
const hoy = new Date().toISOString().slice(0, 10);
fs.writeFileSync(f('sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITIO}/</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
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
