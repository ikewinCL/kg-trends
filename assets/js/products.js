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
     categoria   -> debe existir en CATEGORIAS (más abajo). Las categorías
                    que se queden sin productos NO se muestran en la web:
                    aparecen solas en cuanto les agregues uno
     precio      -> precio de venta (número, sin símbolo).
                    Pon null si no lo sabes: la web mostrará "Ver precio" y
                    mandará a la tienda. Es lo más seguro con AliExpress,
                    porque sus precios cambian cada pocos días
     precioAntes -> precio tachado. Pon null si no hay descuento
     rating      -> de 0 a 5 (ej. 4.7). null si no lo sabes: se oculta
     reviews     -> cantidad de reseñas. null si no la sabes
     tienda      -> "aliexpress" o "amazon"
     url         -> TU LINK DE AFILIADO (el s.click.aliexpress.com/e/...)
     img         -> URL de la imagen ("" para usar el diseño con emoji).
                    OJO: usa la versión _640x640.jpg. Las miniaturas que
                    entrega el panel de afiliados son de 80x80 y la web las
                    descarta por considerarlas rotas
     emoji       -> se muestra cuando no hay imagen o si la foto falla
     etiqueta    -> texto de la cinta: "Nuevo", "Top ventas", "" ...
     envio       -> texto corto de envío. IMPORTANTE: si el texto contiene la
                    palabra "gratis" se pinta en VERDE con el ícono 🚚; en
                    cualquier otro caso sale en gris con 📦. El verde está
                    reservado al envío realmente gratuito, para no dar a
                    entender algo que no es
     descripcion -> 1 o 2 frases que se ven en la ficha
     destacado   -> true para que aparezca primero en el catálogo
   ============================================================ */

const CONFIG = {
  marca: 'K&G Trends',
  moneda: 'S/',
  // Mientras whatsapp siga siendo '51999999999', los botones de WhatsApp
  // escriben por correo. Al poner el número real (código de país sin el +,
  // ej. '51987654321') vuelven a WhatsApp automáticamente.
  whatsapp: '51999999999',          // <-- FALTA: tu número real
  email: 'kygtrends.contac@gmail.com',
  instagram: 'https://instagram.com/',
  tiktok: 'https://tiktok.com/',
  facebook: 'https://facebook.com/'
};

/* Las categorías sin productos no se muestran. Puedes dejarlas listadas aquí
   esperando a que consigas productos para ellas. */
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
    id: 28,
    nombre: 'Set de cortaúñas y tijeras de pedicura en acero inoxidable',
    categoria: 'belleza',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4Niy5Vl',
    img: 'https://ae01.alicdn.com/kf/S3a95fe479cba493fa92f7ae2474f7914t.jpg_640x640.jpg',
    emoji: '✂️',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Juego de cortaúñas, tijeras de pedicura y cuchara limpiadora de oídos, todo en acero inoxidable. Para tener en casa y no andar prestando el de nadie.',
    destacado: true
  },
  {
    id: 27,
    nombre: 'Crimpadora RJ45 todo en uno para Cat5e, Cat6, Cat7 y Cat8',
    categoria: 'tecnologia',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3UiLXxZ',
    img: 'https://ae01.alicdn.com/kf/Sbe459e6a5ef2460096afb2d1c15b1c41O.jpg_640x640.jpg',
    emoji: '🔧',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Herramienta WANJEED que pela, corta y crimpa en un solo movimiento, para conectores RJ45 de cable Cat5e, Cat6, Cat6A, Cat7 y Cat8. Pensada para quien arma sus propios cables de red.',
    destacado: true
  },
  {
    id: 26,
    nombre: 'Kit de manicura y pedicura con estuche portátil',
    categoria: 'belleza',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4pnVxuj',
    img: 'https://ae01.alicdn.com/kf/Sb5542c44538540a8868f76b9cf69d3eci.jpg_640x640.jpg',
    emoji: '💅',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Set de manicura y pedicura con cortaúñas, lima y limpiador de oídos, en un estuche que cabe en la cartera o el maletín. Hay presentaciones de 1 y de 5 piezas: revisa cuál eliges antes de pagar.',
    destacado: true
  },
  {
    id: 25,
    nombre: 'Esponja exfoliante 3D para ducha, elimina la piel muerta',
    categoria: 'belleza',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4pD3Aqj',
    img: 'https://ae01.alicdn.com/kf/S6f1b280373d24b41bc0ecf738df31e98d.jpg_640x640.jpg',
    emoji: '🧽',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Esponja de textura 3D que exfolia mientras te bañas: arrastra la piel muerta y deja la piel suave, sin raspar. Hace buena espuma con poco jabón y se seca rápido.',
    destacado: true
  },
  {
    id: 24,
    nombre: 'Soporte plegable de aluminio para laptop y tablet hasta 17"',
    categoria: 'tecnologia',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4sAwxWX',
    img: 'https://ae01.alicdn.com/kf/S9c8a108dfbf74803bed3415d8f20c1ef2.jpg_640x640.jpg',
    emoji: '💻',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Soporte de aleación de aluminio con altura y ángulo ajustables, para laptops y tablets de hasta 17". Levanta la pantalla a la altura de tus ojos y deja circular el aire por debajo para que el equipo no se caliente. Se pliega para llevarlo.',
    destacado: true
  },
  {
    id: 23,
    nombre: 'Cable retráctil Baseus 240W USB-C con clip mosquetón',
    categoria: 'tecnologia',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4NnOHmP',
    img: 'https://ae01.alicdn.com/kf/S91d51f8137a64242918b3672a72fa791p.jpg_640x640.jpg',
    emoji: '🔗',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Cable USB-C a USB-C de hasta 240W que se recoge solo con un toque: nunca más un nudo en la mochila. Trae clip mosquetón para colgarlo de las llaves. Para iPhone, MacBook y cualquier equipo USB-C.',
    destacado: true
  },
  {
    id: 22,
    nombre: 'Baseus power bank 20800mAh 145W con pantalla digital',
    categoria: 'tecnologia',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3SvlvWJ',
    img: 'https://ae01.alicdn.com/kf/Sc6759b45d683471d844beae21173fd3dt.jpg_640x640.jpg',
    emoji: '⚡',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Batería externa de 20800 mAh y 145W en total, con dos puertos USB-A y uno USB-C que entrega hasta 100W: suficiente para cargar una laptop. La pantalla digital te muestra la carga exacta que le queda.',
    destacado: true
  },
  {
    id: 21,
    nombre: 'Baseus power bank magnético del tamaño de una tarjeta',
    categoria: 'tecnologia',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3SFk8Sx',
    img: 'https://ae01.alicdn.com/kf/Sfc55bd7b3d934a00a854a925db7c8b56e.jpg_640x640.jpg',
    emoji: '🔋',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Batería externa magnética tan delgada como una tarjeta: se pega atrás del celular y carga sin cables. Hay dos versiones, 10000 mAh con PD de 27W y 5000 mAh con PD de 20W. Para iPhone 17 y Samsung compatibles con carga magnética.',
    destacado: true
  },
  {
    id: 20,
    nombre: 'Cable UGREEN Uno USB-C a USB-C PD 100W de carga rápida',
    categoria: 'tecnologia',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3z3WAkJ',
    img: 'https://ae01.alicdn.com/kf/S6048ddb2efa24377a0cac3f7eb0c2aacZ.jpg_640x640.jpg',
    emoji: '🔋',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Cable USB-C a USB-C que soporta hasta 100W con Power Delivery, así que carga rápido y también transfiere datos. Compatible con iPhone 15, 16 y 17, Samsung, Xiaomi y MacBook.',
    destacado: true
  },
  {
    id: 19,
    nombre: 'Cargador UGREEN 65W GaN diseño Robot con PD 3.0 y QC 4.0',
    categoria: 'tecnologia',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c2RlwECR',
    img: 'https://ae01.alicdn.com/kf/A01fe1134522f4918b0262d4ee61d41c3v.jpg_640x640.jpg',
    emoji: '🤖',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Cargador GaN de 65W con diseño de robot, compatible con PD 3.0, PPS y QuickCharge 4.0 y 3.0. Carga MacBook, laptops, tablets e iPhone 15, 16 y 17 Pro. Viene con enchufe plano tipo americano, que entra en los tomacorrientes de Perú.',
    destacado: true
  },
  {
    id: 18,
    nombre: 'Cargador UGREEN 100W GaN USB-C con carga rápida PD y QC4.0',
    categoria: 'tecnologia',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3X9NnYb',
    img: 'https://ae01.alicdn.com/kf/Sa6e08173f0114b1590c2b96d87091af8S.jpg_640x640.jpg',
    emoji: '🔌',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Cargador de 100W con tecnología GaN: más compacto y menos caliente que uno convencional. Sirve para MacBook, laptops y tablets, y trae carga rápida PD para iPhone 15, 16 y 17 Pro, además de QuickCharge 4.0 y 3.0.',
    destacado: true
  },
  {
    id: 17,
    nombre: 'QSHAVE Maquinilla de afeitar de seguridad ajustable para hombre',
    categoria: 'belleza',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3Q0b5TD',
    img: 'https://ae01.alicdn.com/kf/Haf02c8b968904fac86b22a66ed502d35g.jpg_640x640.jpg',
    emoji: '🪒',
    etiqueta: 'Nuevo',
    envio: 'Envío con costo, calculado en AliExpress',
    descripcion: 'Maquinilla de afeitar de seguridad para hombre, con nivel de agresividad ajustable. Una alternativa clásica y duradera a las de cartucho desechable. El costo de envío se calcula al pagar, según tu dirección.',
    destacado: true
  }
];
