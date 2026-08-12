/* ============================================================
   K&G TRENDS — CATÁLOGO DE PRODUCTOS
   ------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR PARA AGREGAR,
   QUITAR O CAMBIAR PRODUCTOS. No toques nada más.

   Cómo agregar un producto:
   1. Copia un bloque { ... } completo, incluida la coma final.
   2. Pégalo dentro de la lista PRODUCTOS.
   3. Cambia los datos. Guarda el archivo y recarga la página.

   Campos:
     id          -> número único (no repitas ninguno)
     nombre      -> título del producto
     categoria   -> debe existir en CATEGORIAS (más abajo)
     precio      -> precio de venta (número, sin símbolo)
     precioAntes -> precio tachado. Pon null si no hay descuento
     rating      -> de 0 a 5 (ej. 4.7)
     reviews     -> cantidad de reseñas
     tienda      -> "aliexpress" o "amazon"
     url         -> TU LINK DE AFILIADO. Aquí va el enlace que te
                    da AliExpress Portals o Amazon Afiliados
     img         -> URL de la imagen del producto ("" para usar
                    el diseño de color con emoji)
     emoji       -> se muestra cuando no hay imagen
     etiqueta    -> texto de la cinta: "Nuevo", "Top ventas", "" ...
     envio       -> texto corto de envío
     descripcion -> 1 o 2 frases que se ven en la ficha
     destacado   -> true para que aparezca en "Lo más buscado"
   ============================================================ */

const CONFIG = {
  marca: 'K&G Trends',
  moneda: 'S/',
  whatsapp: '51999999999',          // <-- CAMBIA por tu número (código de país sin +)
  email: 'hola@kgtrends.com',       // <-- CAMBIA por tu correo
  instagram: 'https://instagram.com/',
  tiktok: 'https://tiktok.com/',
  facebook: 'https://facebook.com/'
};

const CATEGORIAS = [
  { id: 'todos',      nombre: 'Todos',        emoji: '✨' },
  { id: 'tecnologia', nombre: 'Tecnología',   emoji: '🎧' },
  { id: 'hogar',      nombre: 'Hogar',        emoji: '🏠' },
  { id: 'gaming',     nombre: 'Gaming',       emoji: '🎮' },
  { id: 'belleza',    nombre: 'Belleza',      emoji: '💄' },
  { id: 'fitness',    nombre: 'Fitness',      emoji: '🏋️' },
  { id: 'moda',       nombre: 'Moda',         emoji: '👟' },
  { id: 'mascotas',   nombre: 'Mascotas',     emoji: '🐶' }
];

const PRODUCTOS = [
  {
    id: 1,
    nombre: 'Audífonos Bluetooth TWS Pro con cancelación de ruido',
    categoria: 'tecnologia',
    precio: 89,
    precioAntes: 149,
    rating: 4.8,
    reviews: 2431,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '🎧',
    etiqueta: 'Top ventas',
    envio: 'Envío gratis',
    descripcion: 'Sonido envolvente, hasta 30 h de batería con el estuche y emparejamiento automático al abrir la tapa.',
    destacado: true
  },
  {
    id: 2,
    nombre: 'Smartwatch deportivo con GPS y monitor cardíaco',
    categoria: 'tecnologia',
    precio: 129,
    precioAntes: 219,
    rating: 4.6,
    reviews: 1877,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '⌚',
    etiqueta: '-41%',
    envio: 'Envío gratis',
    descripcion: 'Pantalla AMOLED de 1.9", más de 100 modos deportivos y resistencia al agua IP68.',
    destacado: true
  },
  {
    id: 3,
    nombre: 'Lámpara LED de escritorio con carga inalámbrica',
    categoria: 'hogar',
    precio: 75,
    precioAntes: 110,
    rating: 4.7,
    reviews: 942,
    tienda: 'amazon',
    url: 'https://www.amazon.com/',
    img: '',
    emoji: '💡',
    etiqueta: 'Nuevo',
    envio: 'Llega en 7-12 días',
    descripcion: 'Tres temperaturas de color, brazo articulado y base con carga rápida para tu celular.',
    destacado: false
  },
  {
    id: 4,
    nombre: 'Proyector portátil Full HD 1080p con WiFi',
    categoria: 'tecnologia',
    precio: 349,
    precioAntes: 499,
    rating: 4.5,
    reviews: 613,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '📽️',
    etiqueta: 'Destacado',
    envio: 'Envío gratis',
    descripcion: 'Proyecta hasta 150" desde tu celular. Ideal para convertir tu cuarto en un cine en minutos.',
    destacado: true
  },
  {
    id: 5,
    nombre: 'Teclado mecánico RGB 60% inalámbrico',
    categoria: 'gaming',
    precio: 145,
    precioAntes: 199,
    rating: 4.9,
    reviews: 1520,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '⌨️',
    etiqueta: 'Top ventas',
    envio: 'Envío gratis',
    descripcion: 'Switches hot-swap, triple conexión (cable, Bluetooth y 2.4G) y retroiluminación personalizable.',
    destacado: true
  },
  {
    id: 6,
    nombre: 'Mouse gamer inalámbrico 8000 DPI ultraligero',
    categoria: 'gaming',
    precio: 69,
    precioAntes: 99,
    rating: 4.6,
    reviews: 830,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '🖱️',
    etiqueta: '',
    envio: 'Envío gratis',
    descripcion: 'Solo 58 g, sensor óptico de alta precisión y batería para 70 horas de juego.',
    destacado: false
  },
  {
    id: 7,
    nombre: 'Set de brochas de maquillaje profesional (12 piezas)',
    categoria: 'belleza',
    precio: 55,
    precioAntes: 89,
    rating: 4.8,
    reviews: 3102,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '💄',
    etiqueta: '-38%',
    envio: 'Envío gratis',
    descripcion: 'Cerdas sintéticas suaves, mango ergonómico y estuche de viaje incluido.',
    destacado: true
  },
  {
    id: 8,
    nombre: 'Secador de cabello iónico plegable de viaje',
    categoria: 'belleza',
    precio: 99,
    precioAntes: null,
    rating: 4.4,
    reviews: 421,
    tienda: 'amazon',
    url: 'https://www.amazon.com/',
    img: '',
    emoji: '💇',
    etiqueta: 'Nuevo',
    envio: 'Llega en 7-12 días',
    descripcion: 'Tecnología iónica antifrizz, mango plegable y doble voltaje para viajar.',
    destacado: false
  },
  {
    id: 9,
    nombre: 'Bandas elásticas de resistencia (set de 5)',
    categoria: 'fitness',
    precio: 39,
    precioAntes: 65,
    rating: 4.7,
    reviews: 1288,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '🏋️',
    etiqueta: 'Top ventas',
    envio: 'Envío gratis',
    descripcion: 'Cinco niveles de tensión, látex natural y bolsa de transporte. Entrena en casa sin máquinas.',
    destacado: false
  },
  {
    id: 10,
    nombre: 'Botella térmica inteligente con display de temperatura',
    categoria: 'fitness',
    precio: 59,
    precioAntes: 85,
    rating: 4.6,
    reviews: 967,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '🧊',
    etiqueta: '',
    envio: 'Envío gratis',
    descripcion: 'Acero inoxidable de doble pared: mantiene el frío 24 h y el calor 12 h.',
    destacado: false
  },
  {
    id: 11,
    nombre: 'Zapatillas urbanas transpirables unisex',
    categoria: 'moda',
    precio: 119,
    precioAntes: 179,
    rating: 4.5,
    reviews: 2044,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '👟',
    etiqueta: '-33%',
    envio: 'Envío gratis',
    descripcion: 'Tejido ligero tipo calcetín, suela antideslizante y diseño que combina con todo.',
    destacado: true
  },
  {
    id: 12,
    nombre: 'Lentes de sol polarizados estilo retro UV400',
    categoria: 'moda',
    precio: 45,
    precioAntes: 79,
    rating: 4.7,
    reviews: 1355,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '🕶️',
    etiqueta: '',
    envio: 'Envío gratis',
    descripcion: 'Protección UV400 real, montura ligera y estuche rígido incluido.',
    destacado: false
  },
  {
    id: 13,
    nombre: 'Organizador plegable multiuso para closet',
    categoria: 'hogar',
    precio: 49,
    precioAntes: 79,
    rating: 4.5,
    reviews: 702,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '🧺',
    etiqueta: '',
    envio: 'Envío gratis',
    descripcion: 'Gana el doble de espacio en tu ropero. Se arma en segundos y se guarda plano.',
    destacado: false
  },
  {
    id: 14,
    nombre: 'Cepillo quita pelos para mascotas autolimpiante',
    categoria: 'mascotas',
    precio: 35,
    precioAntes: 59,
    rating: 4.8,
    reviews: 1811,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '🐶',
    etiqueta: 'Top ventas',
    envio: 'Envío gratis',
    descripcion: 'Un botón y las cerdas se retraen para soltar todo el pelo. Perros y gatos.',
    destacado: true
  },
  {
    id: 15,
    nombre: 'Fuente de agua automática para gatos 2.5 L',
    categoria: 'mascotas',
    precio: 89,
    precioAntes: 129,
    rating: 4.6,
    reviews: 540,
    tienda: 'amazon',
    url: 'https://www.amazon.com/',
    img: '',
    emoji: '🐱',
    etiqueta: 'Nuevo',
    envio: 'Llega en 7-12 días',
    descripcion: 'Filtro de carbón activado, bomba silenciosa y luz LED nocturna.',
    destacado: false
  },
  {
    id: 16,
    nombre: 'Cámara de seguridad WiFi 360° visión nocturna',
    categoria: 'hogar',
    precio: 109,
    precioAntes: 169,
    rating: 4.6,
    reviews: 1490,
    tienda: 'aliexpress',
    url: 'https://es.aliexpress.com/',
    img: '',
    emoji: '📷',
    etiqueta: '-35%',
    envio: 'Envío gratis',
    descripcion: 'Mira tu casa desde el celular, detecta movimiento y habla por el altavoz integrado.',
    destacado: true
  }
];
