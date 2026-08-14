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
  { id: 'audio',      nombre: 'Audio y streaming', emoji: '🎙️' },
  { id: 'hogar',      nombre: 'Hogar',        emoji: '🏠' },
  { id: 'gaming',     nombre: 'Gaming',       emoji: '🎮' },
  { id: 'belleza',    nombre: 'Belleza',      emoji: '💄' },
  { id: 'fitness',    nombre: 'Fitness',      emoji: '🏋️' },
  { id: 'moda',       nombre: 'Moda',         emoji: '👟' },
  { id: 'mascotas',   nombre: 'Mascotas',     emoji: '🐶' }
];

const PRODUCTOS = [
  {
    id: 45,
    nombre: 'Audífonos Baseus Bass EP10 Ultra con ANC y 65 h de batería',
    categoria: 'audio',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3DtZd6R',
    img: 'https://ae01.alicdn.com/kf/S3b559413dfd54b788556f43680aca1cbB.jpg_640x640.jpg',
    emoji: '🎧',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Audífonos inalámbricos con cancelación de ruido de hasta -55 dB, Bluetooth 6.0 y hasta 65 horas de reproducción contando el estuche. Traen 6 micrófonos con reducción de ruido por IA para que se te escuche claro en las llamadas.',
    destacado: true
  },
  {
    id: 44,
    nombre: 'Audífonos Baseus Bowie MS1 semi-intraaurales con ANC',
    categoria: 'audio',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3fqcPU3',
    img: 'https://ae01.alicdn.com/kf/S60d440b48b7b46a8abdb560f77e84602m.jpg_640x640.jpg',
    emoji: '🎧',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Audífonos semi-intraaurales, de los que apoyan sin meterse en el canal del oído: más cómodos si los usas muchas horas. Cancelación de ruido adaptativa de hasta -55 dB, Bluetooth 6.0 y audio de alta resolución.',
    destacado: true
  },
  {
    id: 43,
    nombre: 'Audífonos Baseus Bowie MP1 con ANC híbrido y Hi-Res LDAC',
    categoria: 'audio',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3vGyYAT',
    img: 'https://ae01.alicdn.com/kf/Sc0149f302beb423db38eb48a906309ffk.jpg_640x640.jpg',
    emoji: '🎧',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Audífonos con cancelación de ruido híbrida adaptativa de hasta -55 dB y Bluetooth 6.0. Soportan LDAC, el códec de alta resolución, así que aprovechan la música sin comprimir si tu celular lo permite. Seis micrófonos para llamadas.',
    destacado: true
  },
  {
    id: 42,
    nombre: 'Selladora al vacío eléctrica con cortador y modo seco o húmedo',
    categoria: 'hogar',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4tgqyAb',
    img: 'https://ae01.alicdn.com/kf/S617dec0444bb450caec85b98843e65abG.jpg_640x640.jpg',
    emoji: '🍱',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Selladora al vacío de mesa con botones táctiles, cortador de bolsa integrado y modos para alimentos secos o húmedos. Saca el aire y sella de una pasada, así la comida dura mucho más en la refrigeradora o el congelador.',
    destacado: true
  },
  {
    id: 41,
    nombre: 'Bomba selladora al vacío recargable con bolsas reutilizables',
    categoria: 'hogar',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3a7863H',
    img: 'https://ae01.alicdn.com/kf/Sd3a5300d8ad74743bc7a53f7f28fa956w.png_640x640.png',
    emoji: '🧊',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Bomba de aire recargable e inalámbrica que extrae el aire y sella sola. Viene con bolsas reutilizables, así que no gastas en repuestos cada vez. Ocupa poco y se guarda en un cajón.',
    destacado: true
  },
  {
    // OJO: llegaron dos links distintos para este producto. Se usa el que
    // venía junto a la imagen, para que la foto y el destino coincidan.
    // El otro era https://s.click.aliexpress.com/e/_c3TrzYDh
    id: 40,
    nombre: 'Micrófono MAONO PD300X XLR y USB de 192 kHz para podcast',
    categoria: 'audio',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3s0cJMT',
    img: 'https://ae01.alicdn.com/kf/S9527e909f53d41ba94b6ebe74385f5c8S.jpg_640x640.jpg',
    emoji: '🎙️',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Micrófono dinámico con doble conexión XLR y USB, y grabación a 192 kHz / 24 bits. Pensado para podcast, creación de contenido y grabación en estudio casero.',
    destacado: true
  },
  {
    // Mismo caso: el otro link recibido era
    // https://s.click.aliexpress.com/e/_c4eHIWhp
    id: 39,
    nombre: 'Brazo de micrófono FIFINE de perfil bajo con guía de cables',
    categoria: 'audio',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4rQslz9',
    img: 'https://ae01.alicdn.com/kf/S029d8c68a73f468c8a907eeddcccd5fbK.jpg_640x640.jpg',
    emoji: '🎚️',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Brazo de suspensión de perfil bajo, que queda fuera de cuadro cuando grabas o transmites. Trae guía para ordenar el cable y soporte de escritorio. Compatible con los FIFINE Ampligame AM8, BM88 y K688.',
    destacado: true
  },
  {
    id: 38,
    nombre: 'Micrófono inalámbrico MAONO PD200W USB y XLR para podcast',
    categoria: 'audio',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4pSdcoR',
    img: 'https://ae01.alicdn.com/kf/A645744db7c6741adac9e6113d15864a0y.jpg_640x640.jpg',
    emoji: '🎤',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Micrófono dinámico inalámbrico con doble conexión USB y XLR, grabación a 48 kHz / 24 bits y 82 dB de relación señal-ruido. Para podcast, transmisiones en vivo y grabación de audio.',
    destacado: true
  },
  {
    id: 37,
    nombre: 'Micrófono MAONO PD400X USB y XLR todo en metal',
    categoria: 'audio',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3t9Z2E7',
    img: 'https://ae01.alicdn.com/kf/S276577f105cd42eb8437134cb02025f4F.png_640x640.png',
    emoji: '🎙️',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Micrófono dinámico profesional con cuerpo de metal, conexión USB y XLR, silenciador táctil, salida para auriculares y control de volumen. Para podcast, streaming y YouTube.',
    destacado: true
  },
  {
    id: 36,
    nombre: 'Micrófono FIFINE K688 USB y XLR con soporte antivibración',
    categoria: 'audio',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4Tn85dl',
    img: 'https://ae01.alicdn.com/kf/S78c5d66820d44f898bc52e8d3cedeb06w.jpg_640x640.jpg',
    emoji: '🎙️',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Micrófono dinámico con doble conexión USB y XLR, soporte antivibración incluido, botón táctil de silencio, salida para auriculares y control de volumen. Sirve conectado a la PC o a una interfaz de audio.',
    destacado: true
  },
  {
    id: 35,
    nombre: 'Brazo de micrófono FIFINE ajustable con abrazadera',
    categoria: 'audio',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c427WCoB',
    img: 'https://ae01.alicdn.com/kf/S21ee94f4583f42b988ab3424040199f5w.jpg_640x640.jpg',
    emoji: '🎚️',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Brazo de suspensión tipo tijera con abrazadera reforzada para fijar al escritorio. Deja el micrófono a la altura que quieras y libera espacio en la mesa. Compatible con los FIFINE K688 y K658.',
    destacado: true
  },
  {
    id: 34,
    nombre: 'Llavero de dinosaurio en cuero, colgante para bolso',
    categoria: 'moda',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3P4TMwb',
    img: 'https://ae01.alicdn.com/kf/S55790aa68b884ffeacf017a083ddd7eeZ.jpg_640x640.jpg',
    emoji: '🦖',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Llavero de dinosaurio en cuero, para las llaves del carro o colgado de la cartera. Pequeño, resistente y de buen acabado. Buena opción de regalo.',
    destacado: true
  },
  {
    id: 33,
    nombre: 'Electroestimulador TENS digital de 4 canales, recargable',
    categoria: 'fitness',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4O8cmkr',
    img: 'https://ae01.alicdn.com/kf/S807307eb8c124d7b87be97e4e0533bf1C.jpg_640x640.jpg',
    emoji: '⚡',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Electroestimulador muscular TENS con 4 canales, 20 niveles de intensidad y batería recargable, con pantalla digital. Consulta a un profesional de salud antes de usarlo, sobre todo si tienes marcapasos, alguna condición cardíaca o estás embarazada.',
    destacado: true
  },
  {
    id: 32,
    nombre: 'Muñecos de bloques para armar: capibara, bala y ratón',
    categoria: 'hogar',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c3YG8O7H',
    img: 'https://ae01.alicdn.com/kf/Sa7de6ef25da2452e984ef9274751efc1a.jpg_640x640.jpg',
    emoji: '🐹',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Figuritas de bloques tipo caricatura para armar y dejar de adorno en el escritorio o la repisa. Buen regalo de cumpleaños, y entretienen mientras se arman. Revisa en la tienda cuál modelo eliges.',
    destacado: true
  },
  {
    id: 31,
    nombre: 'Cactus en maceta para armar, micro bloques de construcción',
    categoria: 'hogar',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c2RJ27F1',
    img: 'https://ae01.alicdn.com/kf/Sb1482297d0e44c0b9eaf2ed3e40d03b2Z.jpg_640x640.jpg',
    emoji: '🌵',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Cactus de micro bloques para armar y dejar en el escritorio: una planta que nunca se te va a secar. Entretiene mientras lo armas y queda como adorno. También sirve de regalo.',
    destacado: true
  },
  {
    id: 30,
    nombre: 'Figura de capibara para armar, decoración de escritorio',
    categoria: 'hogar',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4K09BvH',
    img: 'https://ae01.alicdn.com/kf/Sa34117b8a5da42b6b6a9cd45ab2aee56u.jpg_640x640.jpg',
    emoji: '🦫',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Capibara de bloques con su accesorio naranja, el meme hecho figura. Queda bien en el escritorio, en la repisa o como regalo para quien no para de mandarte capibaras.',
    destacado: true
  },
  {
    id: 29,
    nombre: 'Juego de destornilladores magnéticos 40 en 1 con trinquete',
    categoria: 'tecnologia',
    precio: null,
    precioAntes: null,
    rating: null,
    reviews: null,
    tienda: 'aliexpress',
    url: 'https://s.click.aliexpress.com/e/_c4TXc8fH',
    img: 'https://ae01.alicdn.com/kf/S38364f39d55c4f8a99d2e3def11559a22.jpg_640x640.jpg',
    emoji: '🪛',
    etiqueta: 'Nuevo',
    envio: 'Envío calculado en AliExpress',
    descripcion: 'Set de 40 puntas magnéticas con mango desmontable y cabezal de trinquete que gira 180°, con mecanismo de 45 dientes para trabajar en espacios estrechos. Ideal para abrir celulares, laptops, consolas y arreglos de casa.',
    destacado: true
  },
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
