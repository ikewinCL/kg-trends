# K&G Trends 🛍️

Tienda de dropshipping / afiliados (AliExpress + Amazon). Sitio estático: solo HTML, CSS y
JavaScript, sin base de datos ni servidor. Eso lo hace **gratis de hospedar y rapidísimo**.

```
kg-trends/
├── index.html                 ← la página (estructura y textos)
├── 404.html                   ← página de error
├── robots.txt / .nojekyll     ← configuración para buscadores y GitHub Pages
└── assets/
    ├── css/styles.css         ← todos los estilos y colores
    ├── img/logo.svg           ← logo (editable con cualquier editor de texto)
    ├── img/favicon.svg        ← ícono de la pestaña
    └── js/
        ├── products.js        ← ⭐ TUS PRODUCTOS Y DATOS DE CONTACTO
        └── app.js             ← funcionamiento (filtros, favoritos, modal)
```

---

## 1. Lo primero que debes cambiar

Abre `assets/js/products.js` con el Bloc de notas o VS Code. Arriba encontrarás:

```js
const CONFIG = {
  marca: 'K&G Trends',
  moneda: 'S/',
  whatsapp: '51999999999',      // ← tu número real, código de país sin el +
  email: 'hola@kgtrends.com',   // ← tu correo
  instagram: 'https://instagram.com/tu_usuario',
  tiktok: 'https://tiktok.com/@tu_usuario',
  facebook: 'https://facebook.com/tu_pagina'
};
```

Guarda y recarga la página. Los botones de WhatsApp, correo y redes ya apuntan a lo tuyo.

---

## 2. Agregar o cambiar productos

Todo vive en la lista `PRODUCTOS` del mismo archivo. Copia un bloque completo, pégalo y edítalo:

```js
{
  id: 17,                                   // número único, no repitas
  nombre: 'Nombre del producto',
  categoria: 'tecnologia',                  // debe existir en CATEGORIAS
  precio: 99,
  precioAntes: 149,                         // null si no hay descuento
  rating: 4.7,
  reviews: 830,
  tienda: 'aliexpress',                     // 'aliexpress' o 'amazon'
  url: 'AQUÍ VA TU LINK DE AFILIADO',
  img: '',                                  // URL de imagen, o "" para el diseño con emoji
  emoji: '🎧',
  etiqueta: 'Nuevo',                        // texto de la cinta, "" para no mostrar
  envio: 'Envío gratis',
  descripcion: 'Una o dos frases que se ven en la ficha.',
  destacado: true
},
```

El descuento (`-33%`) se calcula solo. Las categorías cuentan sus productos solas.

### Sobre las imágenes

Con `img: ''` se muestra un fondo degradado con el emoji: se ve bien y nunca se rompe.
Cuando tengas fotos reales tienes dos opciones:

1. **Súbelas a la carpeta** `assets/img/` y pon `img: 'assets/img/audifonos.jpg'` *(recomendado: cargan rápido y no dependen de nadie)*.
2. Pega la URL de la imagen de AliExpress. Ojo: si el vendedor la borra, la foto desaparece de tu web.

Usa fotos de **800×600 px aprox.** y guárdalas como `.webp` o `.jpg` para que la página no pese.

---

## 3. Conseguir tus links de afiliado

**AliExpress** → busca "AliExpress Affiliate" / Portals (`portals.aliexpress.com`). Te registras gratis,
pegas el link del producto en su generador y te devuelve tu link con seguimiento. Comisiones típicas: 3–9%.

**Amazon** → "Amazon Associates" (`afiliados.amazon.es` o `affiliate-program.amazon.com`).
Requiere que tu web ya esté publicada y con contenido. Importante: Amazon suele exigir **3 ventas
en los primeros 180 días** o cierra la cuenta, así que preséntate primero con AliExpress.

> ⚠️ Ambos programas exigen que declares que eres afiliado. Ese aviso ya está en el pie de la web,
> no lo borres.

---

## 4. Probar la web en tu PC

Solo haz doble clic en `index.html`. Se abre en el navegador y funciona todo.

Si prefieres un servidor local (más parecido a la realidad):

```bash
npx serve .
```

---

## 5. Publicar gratis en GitHub Pages

### Paso a paso

1. Crea una cuenta en <https://github.com> (gratis).
2. Botón **+** arriba a la derecha → **New repository**.
   - Repository name: `kg-trends`
   - Marca **Public**
   - **NO** marques "Add a README"
   - **Create repository**
3. En tu PC, dentro de la carpeta `D:\kg-trends`, ejecuta (cambia `TU-USUARIO`):

```bash
git remote add origin https://github.com/TU-USUARIO/kg-trends.git
git branch -M main
git push -u origin main
```

4. En GitHub: pestaña **Settings** → menú lateral **Pages**.
   - Source: **Deploy from a branch**
   - Branch: **main** / carpeta **/ (root)** → **Save**
5. Espera 1–2 minutos. Tu web queda en:
   **`https://TU-USUARIO.github.io/kg-trends/`**

### Para actualizar la web después

Cada vez que cambies productos o textos:

```bash
git add -A
git commit -m "Nuevos productos"
git push
```

En un minuto los cambios están en línea.

> 💡 Truco: si nombras el repositorio **`TU-USUARIO.github.io`** en lugar de `kg-trends`,
> la web queda en `https://TU-USUARIO.github.io/` (sin subcarpeta), que se ve más profesional.

---

## 6. Dominio: opciones gratis y de pago

| Opción | Cómo queda | Costo | Comentario |
|---|---|---|---|
| Subdominio de GitHub | `tuusuario.github.io` | **Gratis para siempre** | Ya lo tienes con el paso 5. HTTPS incluido. |
| Subdominio de Netlify | `kg-trends.netlify.app` | **Gratis** | Alternativa si prefieres arrastrar la carpeta en vez de usar git. |
| **DigitalPlat / us.kg** (`dash.domain.digitalplat.org`) | `kgtrends.us.kg` | **Gratis** | Dominio corto de verdad. Piden un motivo del proyecto al registrarte. |
| **is-a.dev / js.org** | `kgtrends.is-a.dev` | **Gratis** | Se pide por Pull Request en GitHub. Pensados para proyectos, no tiendas. |
| **.com / .store** (Namecheap, Porkbun, GoDaddy) | `kgtrends.com` | **~US$ 8–12 al año** | La opción seria si vas a hacer publicidad o vender de verdad. |

### Mi recomendación honesta

Arranca con `tuusuario.github.io` — gratis, con HTTPS y sin trámites. Si el proyecto camina y ya
tienes ventas, compra un **.com** (menos de 40 soles al año). Un dominio propio da mucha más
confianza al comprador y es obligatorio si en algún momento haces publicidad en Meta o Google.

Los dominios "gratis" tipo `.tk`, `.ml` o `.ga` (Freenom) **ya no los recomiendo**: los cancelan
sin aviso y muchos navegadores los marcan como sospechosos.

### Conectar un dominio propio a GitHub Pages

1. Compra el dominio (ej. `kgtrends.com`).
2. En tu proveedor de DNS crea:
   - 4 registros **A** para `@` apuntando a `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro **CNAME** para `www` apuntando a `TU-USUARIO.github.io`
3. En GitHub → **Settings → Pages → Custom domain**: escribe tu dominio y guarda.
4. Marca **Enforce HTTPS** cuando se habilite (tarda unos minutos).

---

## 7. Ideas para cuando quieras crecer

- **Google Analytics** o Umami para ver qué productos miran más.
- **Google Search Console** para aparecer en búsquedas.
- Página individual por producto (mejora mucho el SEO).
- Reemplazar los emojis por fotos reales: es lo que más sube las ventas.
- Un blog corto tipo "Los 5 mejores audífonos baratos de 2026" — ese contenido es el que trae
  visitas gratis desde Google.

---

## Licencia

Uso libre para tu proyecto. Los emojis son del sistema operativo del visitante.
