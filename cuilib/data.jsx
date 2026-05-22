// data.js — CUILIB course data, lessons, quiz
// Exposed as globals (no module system).

const CUILIB_CATEGORIES = [
  { id: 'mate', label: 'Matemáticas' },
  { id: 'cn',   label: 'Ciencias Naturales' },
  { id: 'cs',   label: 'Ciencias Sociales' },
  { id: 'com',  label: 'Comunicación' },
];

// CSS-mask-based course glyphs (real uploaded illustrations).
// Color inherits from parent via `currentColor` background-color.
const Glyph = ({ name }) => {
  const svg = (window.CUILIB_SVGS || {})[name] || '';
  return <span className="cuilib-glyph" data-glyph={name}
               dangerouslySetInnerHTML={{ __html: svg }}/>;
};

const GLYPHS = {
  arith:   <Glyph name="aritmetica"/>,
  algebra: <Glyph name="algebra"/>,
  physics: <Glyph name="fisica"/>,
  trig:    <Glyph name="trigonometria"/>,
  bio:     <Glyph name="biologia"/>,
  anatomy: <Glyph name="anatomia"/>,
  zoo:     <Glyph name="zoologia"/>,
  bot:     <Glyph name="botanica"/>,
  hist:    <Glyph name="historia"/>,
  peru:    <Glyph name="historiaperu"/>,
  psy:     <Glyph name="psicologia"/>,
  phil:    <Glyph name="filosofia"/>,
  lang:    <Glyph name="aritmetica"/>,  // fallback (no upload provided)
  lit:     <Glyph name="historia"/>,    // fallback (no upload provided)
};

const CUILIB_COURSES = [
  // Matemáticas
  { id: 'aritmetica',    cat: 'mate', title: 'Aritmética',      color: 'var(--c-orange)',  glyph: 'arith',   videos: 45, hours: 7, progress: 0, rating: 0 },
  { id: 'algebra',       cat: 'mate', title: 'Álgebra',         color: 'var(--c-purple)',  glyph: 'algebra', videos: 52, hours: 9, progress: 0, rating: 0 },
  { id: 'fisica',        cat: 'mate', title: 'Física',          color: 'var(--c-amber)',   glyph: 'physics', videos: 38, hours: 6, progress: 0, rating: 0 },
  { id: 'trigonometria', cat: 'mate', title: 'Trigonometría',   color: 'var(--c-blue)',    glyph: 'trig',    videos: 30, hours: 5, progress: 0, rating: 0 },

  // Ciencias Naturales
  { id: 'biologia',      cat: 'cn',   title: 'Biología',        color: 'var(--c-green)',   glyph: 'bio',     videos: 42, hours: 7, progress: 0, rating: 0 },
  { id: 'anatomia',      cat: 'cn',   title: 'Anatomía Humana', color: 'var(--c-cobalt)',  glyph: 'anatomy', videos: 36, hours: 6, progress: 0, rating: 0 },
  { id: 'zoologia',      cat: 'cn',   title: 'Zoología',        color: 'var(--c-coral)',   glyph: 'zoo',     videos: 24, hours: 4, progress: 0, rating: 0 },
  { id: 'botanica',      cat: 'cn',   title: 'Botánica',        color: 'var(--c-teal)',    glyph: 'bot',     videos: 20, hours: 3, progress: 0, rating: 0 },

  // Ciencias Sociales
  { id: 'historia',      cat: 'cs',   title: 'Historia Universal', color: 'var(--c-yellow)', glyph: 'hist', videos: 48, hours: 8, progress: 0, rating: 0 },
  { id: 'peru',          cat: 'cs',   title: 'Historia del Perú',  color: 'var(--c-cobalt)', glyph: 'peru', videos: 40, hours: 7, progress: 0, rating: 0 },
  { id: 'psicologia',    cat: 'cs',   title: 'Psicología',         color: 'var(--c-sky)',    glyph: 'psy',  videos: 28, hours: 5, progress: 0, rating: 0 },
  { id: 'filosofia',     cat: 'cs',   title: 'Filosofía',          color: 'var(--c-mint)',   glyph: 'phil', videos: 22, hours: 4, progress: 0, rating: 0 },

  // Comunicación
  { id: 'rv',            cat: 'com',  title: 'Razonamiento Verbal', color: 'var(--c-purple)', glyph: 'lang', videos: 34, hours: 6, progress: 0, rating: 0 },
  { id: 'literatura',    cat: 'com',  title: 'Literatura',          color: 'var(--c-coral)',  glyph: 'lit',  videos: 30, hours: 5, progress: 0, rating: 0 },
];

// Aritmética detail
const ARITMETICA_MODULES = [
  {
    id: 'bienvenida', title: 'Bienvenida y panorama general', count: 1,
    lessons: [
      { id: 'b1', title: 'Bienvenida al curso de Aritmética', done: false, duration: '4:12' },
    ]
  },
  {
    id: 'conjuntos', title: 'Teoría de conjuntos', count: 5,
    open: true,
    lessons: [
      { id: 'c1', title: 'Introducción a la teoría de conjuntos, diagramas y notación', done: false, duration: '12:34', current: true },
      { id: 'c2', title: 'Cardinalidad, cuantificadores y determinación',              done: false, duration: '14:21' },
      { id: 'c3', title: 'Tipos de conjuntos y relación de conjuntos',                 done: false, duration: '11:08' },
      { id: 'c4', title: 'Conjuntos especiales',                                       done: false, duration: '09:46' },
      { id: 'c5', title: 'Operaciones entre conjuntos',                                done: false, duration: '15:02' },
    ]
  },
  {
    id: 'numeracion', title: 'Numeración', count: 6,
    lessons: [
      { id: 'n1', title: 'Sistemas de numeración', done: false, duration: '10:20' },
      { id: 'n2', title: 'Cambio de base',         done: false, duration: '12:45' },
      { id: 'n3', title: 'Operaciones en otras bases', done: false, duration: '11:30' },
      { id: 'n4', title: 'Numerales capicúas',     done: false, duration: '08:15' },
      { id: 'n5', title: 'Conteo y cifras',        done: false, duration: '09:50' },
      { id: 'n6', title: 'Práctica de numeración', done: false, duration: '14:10' },
    ]
  },
  {
    id: 'logica', title: 'Lógica Proposicional', count: 5,
    lessons: [
      { id: 'l1', title: 'Proposiciones y conectivos', done: false, duration: '11:00' },
      { id: 'l2', title: 'Tablas de verdad',           done: false, duration: '13:25' },
      { id: 'l3', title: 'Equivalencias lógicas',      done: false, duration: '10:40' },
      { id: 'l4', title: 'Circuitos lógicos',          done: false, duration: '09:55' },
      { id: 'l5', title: 'Inferencias',                done: false, duration: '12:18' },
    ]
  },
  {
    id: 'divisibilidad', title: 'Divisibilidad', count: 4,
    lessons: [
      { id: 'd1', title: 'Criterios de divisibilidad', done: false, duration: '11:20' },
      { id: 'd2', title: 'Múltiplos y divisores',     done: false, duration: '12:00' },
      { id: 'd3', title: 'Números primos',             done: false, duration: '10:15' },
      { id: 'd4', title: 'MCD y MCM',                  done: false, duration: '14:30' },
    ]
  },
];

const ALGEBRA_MODULES = [
  { id: 'alg_expresiones', title: 'Expresiones algebraicas', count: 5, lessons: [
    { id: 'ae1', title: 'Monomios y polinomios', done: false, duration: '10:00' },
    { id: 'ae2', title: 'Valor numérico', done: false, duration: '09:00' },
    { id: 'ae3', title: 'Grado de un polinomio', done: false, duration: '08:30' },
    { id: 'ae4', title: 'Operaciones con polinomios', done: false, duration: '11:00' },
    { id: 'ae5', title: 'División de polinomios (Ruffini)', done: false, duration: '12:00' },
  ]},
  { id: 'alg_productos', title: 'Productos notables y factorización', count: 5, lessons: [
    { id: 'ap1', title: 'Cuadrado de un binomio', done: false, duration: '10:00' },
    { id: 'ap2', title: 'Cubo de un binomio', done: false, duration: '09:00' },
    { id: 'ap3', title: 'Factor común y agrupación', done: false, duration: '08:00' },
    { id: 'ap4', title: 'Factorización de trinomios', done: false, duration: '11:00' },
    { id: 'ap5', title: 'Diferencia de cuadrados y cubos', done: false, duration: '10:00' },
  ]},
  { id: 'alg_ecuaciones', title: 'Ecuaciones y sistemas', count: 5, lessons: [
    { id: 'aeq1', title: 'Ecuaciones lineales', done: false, duration: '10:00' },
    { id: 'aeq2', title: 'Ecuaciones cuadráticas', done: false, duration: '11:00' },
    { id: 'aeq3', title: 'Sistemas 2×2: sustitución', done: false, duration: '12:00' },
    { id: 'aeq4', title: 'Sistemas 2×2: eliminación', done: false, duration: '10:00' },
    { id: 'aeq5', title: 'Sistemas 3×3', done: false, duration: '13:00' },
  ]},
  { id: 'alg_inecuaciones', title: 'Inecuaciones', count: 4, lessons: [
    { id: 'ai1', title: 'Inecuaciones lineales', done: false, duration: '10:00' },
    { id: 'ai2', title: 'Inecuaciones cuadráticas', done: false, duration: '11:00' },
    { id: 'ai3', title: 'Sistemas de inecuaciones', done: false, duration: '09:00' },
    { id: 'ai4', title: 'Valor absoluto en inecuaciones', done: false, duration: '10:00' },
  ]},
];

const FISICA_MODULES = [
  { id: 'fis_cinematica', title: 'Cinemática', count: 5, lessons: [
    { id: 'fc1', title: 'Magnitudes escalares y vectoriales', done: false, duration: '10:00' },
    { id: 'fc2', title: 'Movimiento rectilíneo uniforme (MRU)', done: false, duration: '11:00' },
    { id: 'fc3', title: 'Movimiento uniformemente acelerado (MRUA)', done: false, duration: '12:00' },
    { id: 'fc4', title: 'Caída libre y tiro vertical', done: false, duration: '11:00' },
    { id: 'fc5', title: 'Tiro parabólico', done: false, duration: '13:00' },
  ]},
  { id: 'fis_dinamica', title: 'Dinámica y fuerzas', count: 4, lessons: [
    { id: 'fd1', title: 'Leyes de Newton', done: false, duration: '12:00' },
    { id: 'fd2', title: 'Fuerza de rozamiento', done: false, duration: '10:00' },
    { id: 'fd3', title: 'Plano inclinado', done: false, duration: '11:00' },
    { id: 'fd4', title: 'Fuerza centrípeta', done: false, duration: '10:00' },
  ]},
  { id: 'fis_energia', title: 'Trabajo, energía y potencia', count: 4, lessons: [
    { id: 'fen1', title: 'Trabajo mecánico', done: false, duration: '09:00' },
    { id: 'fen2', title: 'Energía cinética y potencial', done: false, duration: '11:00' },
    { id: 'fen3', title: 'Conservación de la energía', done: false, duration: '10:00' },
    { id: 'fen4', title: 'Potencia y rendimiento', done: false, duration: '09:00' },
  ]},
  { id: 'fis_ondas', title: 'Ondas y termodinámica', count: 4, lessons: [
    { id: 'fo1', title: 'Movimiento ondulatorio', done: false, duration: '10:00' },
    { id: 'fo2', title: 'Sonido y luz', done: false, duration: '11:00' },
    { id: 'fo3', title: 'Temperatura y calor', done: false, duration: '10:00' },
    { id: 'fo4', title: 'Leyes de los gases', done: false, duration: '11:00' },
  ]},
];

const TRIGONOMETRIA_MODULES = [
  { id: 'trig_razones', title: 'Razones trigonométricas', count: 5, lessons: [
    { id: 'tr1', title: 'Ángulos y medición', done: false, duration: '09:00' },
    { id: 'tr2', title: 'Razones en el triángulo rectángulo', done: false, duration: '10:00' },
    { id: 'tr3', title: 'Valores exactos', done: false, duration: '09:00' },
    { id: 'tr4', title: 'Razones de ángulos notables', done: false, duration: '10:00' },
    { id: 'tr5', title: 'Razones de ángulos en el plano', done: false, duration: '11:00' },
  ]},
  { id: 'trig_identidades', title: 'Identidades trigonométricas', count: 4, lessons: [
    { id: 'ti1', title: 'Identidades pitagóricas', done: false, duration: '10:00' },
    { id: 'ti2', title: 'Identidades de suma y diferencia', done: false, duration: '11:00' },
    { id: 'ti3', title: 'Ángulo doble y mitad', done: false, duration: '10:00' },
    { id: 'ti4', title: 'Simplificación de expresiones', done: false, duration: '12:00' },
  ]},
  { id: 'trig_ecuaciones', title: 'Ecuaciones trigonométricas', count: 4, lessons: [
    { id: 'te1', title: 'Ecuaciones básicas', done: false, duration: '11:00' },
    { id: 'te2', title: 'Ecuaciones con identidades', done: false, duration: '12:00' },
    { id: 'te3', title: 'Ley de senos', done: false, duration: '10:00' },
    { id: 'te4', title: 'Ley de cosenos', done: false, duration: '11:00' },
  ]},
];

const BIOLOGIA_MODULES = [
  { id: 'bio_celula', title: 'La célula y bioquímica', count: 5, lessons: [
    { id: 'bc1', title: 'Teoría celular', done: false, duration: '10:00' },
    { id: 'bc2', title: 'Célula procariota y eucariota', done: false, duration: '11:00' },
    { id: 'bc3', title: 'Organelos celulares', done: false, duration: '12:00' },
    { id: 'bc4', title: 'Biomoléculas', done: false, duration: '11:00' },
    { id: 'bc5', title: 'Metabolismo celular', done: false, duration: '13:00' },
  ]},
  { id: 'bio_genetica', title: 'Genética y herencia', count: 5, lessons: [
    { id: 'bg1', title: 'ADN y ARN', done: false, duration: '11:00' },
    { id: 'bg2', title: 'Síntesis de proteínas', done: false, duration: '12:00' },
    { id: 'bg3', title: 'Leyes de Mendel', done: false, duration: '13:00' },
    { id: 'bg4', title: 'Herencia ligada al sexo', done: false, duration: '11:00' },
    { id: 'bg5', title: 'Mutaciones y biotecnología', done: false, duration: '12:00' },
  ]},
  { id: 'bio_evolucion', title: 'Evolución y ecología', count: 4, lessons: [
    { id: 'be1', title: 'Teoría de la evolución', done: false, duration: '11:00' },
    { id: 'be2', title: 'Selección natural', done: false, duration: '10:00' },
    { id: 'be3', title: 'Ecosistemas y cadenas tróficas', done: false, duration: '11:00' },
    { id: 'be4', title: 'Ciclos biogeoquímicos', done: false, duration: '10:00' },
  ]},
  { id: 'bio_fisiologia', title: 'Fisiología humana', count: 4, lessons: [
    { id: 'bf1', title: 'Sistema digestivo', done: false, duration: '10:00' },
    { id: 'bf2', title: 'Sistema respiratorio', done: false, duration: '10:00' },
    { id: 'bf3', title: 'Sistema circulatorio', done: false, duration: '11:00' },
    { id: 'bf4', title: 'Sistema nervioso', done: false, duration: '12:00' },
  ]},
];

const ANATOMIA_MODULES = [
  { id: 'ana_oseo', title: 'Sistema óseo y muscular', count: 4, lessons: [
    { id: 'ao1', title: 'Estructura del hueso', done: false, duration: '10:00' },
    { id: 'ao2', title: 'Esqueleto axial y apendicular', done: false, duration: '11:00' },
    { id: 'ao3', title: 'Articulaciones', done: false, duration: '09:00' },
    { id: 'ao4', title: 'Sistema muscular', done: false, duration: '11:00' },
  ]},
  { id: 'ana_circulatorio', title: 'Sistema circulatorio y respiratorio', count: 4, lessons: [
    { id: 'ac1', title: 'El corazón y la sangre', done: false, duration: '12:00' },
    { id: 'ac2', title: 'Circulación mayor y menor', done: false, duration: '11:00' },
    { id: 'ac3', title: 'Vías respiratorias', done: false, duration: '10:00' },
    { id: 'ac4', title: 'Intercambio gaseoso', done: false, duration: '10:00' },
  ]},
  { id: 'ana_nervioso', title: 'Sistema nervioso y endocrino', count: 4, lessons: [
    { id: 'an1', title: 'Neurona y sinapsis', done: false, duration: '11:00' },
    { id: 'an2', title: 'SNC y SNP', done: false, duration: '12:00' },
    { id: 'an3', title: 'Glándulas endocrinas', done: false, duration: '10:00' },
    { id: 'an4', title: 'Hormonas principales', done: false, duration: '11:00' },
  ]},
  { id: 'ana_digestivo', title: 'Sistema digestivo y excretor', count: 4, lessons: [
    { id: 'ad1', title: 'Órganos del sistema digestivo', done: false, duration: '10:00' },
    { id: 'ad2', title: 'Digestión mecánica y química', done: false, duration: '11:00' },
    { id: 'ad3', title: 'Sistema urinario', done: false, duration: '10:00' },
    { id: 'ad4', title: 'La piel como órgano excretor', done: false, duration: '09:00' },
  ]},
];

const ZOOLOGIA_MODULES = [
  { id: 'zoo_invertebrados', title: 'Invertebrados', count: 4, lessons: [
    { id: 'zi1', title: 'Poríferos y cnidarios', done: false, duration: '09:00' },
    { id: 'zi2', title: 'Platelmintos y anélidos', done: false, duration: '10:00' },
    { id: 'zi3', title: 'Moluscos', done: false, duration: '09:00' },
    { id: 'zi4', title: 'Artrópodos e insectos', done: false, duration: '11:00' },
  ]},
  { id: 'zoo_vertebrados', title: 'Vertebrados', count: 5, lessons: [
    { id: 'zv1', title: 'Peces', done: false, duration: '09:00' },
    { id: 'zv2', title: 'Anfibios y reptiles', done: false, duration: '10:00' },
    { id: 'zv3', title: 'Aves', done: false, duration: '09:00' },
    { id: 'zv4', title: 'Mamíferos', done: false, duration: '10:00' },
    { id: 'zv5', title: 'Biodiversidad del Perú', done: false, duration: '11:00' },
  ]},
  { id: 'zoo_ecologia', title: 'Ecología animal', count: 3, lessons: [
    { id: 'ze1', title: 'Nichos y hábitats', done: false, duration: '09:00' },
    { id: 'ze2', title: 'Cadenas y redes tróficas', done: false, duration: '10:00' },
    { id: 'ze3', title: 'Comportamiento animal', done: false, duration: '09:00' },
  ]},
];

const BOTANICA_MODULES = [
  { id: 'bot_morfologia', title: 'Morfología vegetal', count: 4, lessons: [
    { id: 'bm1', title: 'La raíz', done: false, duration: '09:00' },
    { id: 'bm2', title: 'El tallo', done: false, duration: '09:00' },
    { id: 'bm3', title: 'La hoja', done: false, duration: '10:00' },
    { id: 'bm4', title: 'La flor y el fruto', done: false, duration: '11:00' },
  ]},
  { id: 'bot_fisiologia', title: 'Fisiología vegetal', count: 4, lessons: [
    { id: 'bf1', title: 'Fotosíntesis', done: false, duration: '12:00' },
    { id: 'bf2', title: 'Respiración vegetal', done: false, duration: '10:00' },
    { id: 'bf3', title: 'Transpiración y transporte', done: false, duration: '10:00' },
    { id: 'bf4', title: 'Hormonas vegetales', done: false, duration: '09:00' },
  ]},
  { id: 'bot_reproduccion', title: 'Reproducción y clasificación', count: 4, lessons: [
    { id: 'br1', title: 'Reproducción asexual', done: false, duration: '09:00' },
    { id: 'br2', title: 'Reproducción sexual en plantas', done: false, duration: '10:00' },
    { id: 'br3', title: 'Briófitas y pteridófitas', done: false, duration: '10:00' },
    { id: 'br4', title: 'Gimnospermas y angiospermas', done: false, duration: '11:00' },
  ]},
];

const HISTORIA_MODULES = [
  { id: 'his_antiguas', title: 'Civilizaciones antiguas', count: 5, lessons: [
    { id: 'ha1', title: 'Prehistoria', done: false, duration: '09:00' },
    { id: 'ha2', title: 'Mesopotamia y Egipto', done: false, duration: '11:00' },
    { id: 'ha3', title: 'Grecia antigua', done: false, duration: '12:00' },
    { id: 'ha4', title: 'Roma: república e imperio', done: false, duration: '12:00' },
    { id: 'ha5', title: 'China e India antiguas', done: false, duration: '10:00' },
  ]},
  { id: 'his_medieval', title: 'Edad Media y Moderna', count: 4, lessons: [
    { id: 'hm1', title: 'Feudalismo', done: false, duration: '10:00' },
    { id: 'hm2', title: 'Cruzadas e Islam', done: false, duration: '11:00' },
    { id: 'hm3', title: 'Renacimiento y Reforma', done: false, duration: '11:00' },
    { id: 'hm4', title: 'Grandes descubrimientos geográficos', done: false, duration: '10:00' },
  ]},
  { id: 'his_moderna', title: 'Revoluciones e Ilustración', count: 4, lessons: [
    { id: 'hmo1', title: 'Ilustración y Enciclopedia', done: false, duration: '10:00' },
    { id: 'hmo2', title: 'Revolución Francesa', done: false, duration: '12:00' },
    { id: 'hmo3', title: 'Revolución Industrial', done: false, duration: '11:00' },
    { id: 'hmo4', title: 'Independencias americanas', done: false, duration: '11:00' },
  ]},
  { id: 'his_contemporanea', title: 'Siglo XX y mundo actual', count: 4, lessons: [
    { id: 'hc1', title: 'Primera Guerra Mundial', done: false, duration: '12:00' },
    { id: 'hc2', title: 'Segunda Guerra Mundial', done: false, duration: '13:00' },
    { id: 'hc3', title: 'Guerra Fría', done: false, duration: '11:00' },
    { id: 'hc4', title: 'Mundo globalizado', done: false, duration: '10:00' },
  ]},
];

const PERU_MODULES = [
  { id: 'per_preincas', title: 'Culturas preíncas', count: 5, lessons: [
    { id: 'pp1', title: 'Caral: la civilización más antigua', done: false, duration: '10:00' },
    { id: 'pp2', title: 'Chavín de Huántar', done: false, duration: '10:00' },
    { id: 'pp3', title: 'Paracas y Nazca', done: false, duration: '11:00' },
    { id: 'pp4', title: 'Tiahuanaco y Wari', done: false, duration: '11:00' },
    { id: 'pp5', title: 'Chimú y Chancay', done: false, duration: '10:00' },
  ]},
  { id: 'per_tahuantinsuyo', title: 'El Tahuantinsuyo', count: 5, lessons: [
    { id: 'pt1', title: 'Origen y expansión inca', done: false, duration: '11:00' },
    { id: 'pt2', title: 'Organización política', done: false, duration: '10:00' },
    { id: 'pt3', title: 'Economía: mita y ayni', done: false, duration: '11:00' },
    { id: 'pt4', title: 'Religión y arte inca', done: false, duration: '10:00' },
    { id: 'pt5', title: 'Arquitectura: Machu Picchu', done: false, duration: '10:00' },
  ]},
  { id: 'per_colonia', title: 'La Colonia', count: 4, lessons: [
    { id: 'pc1', title: 'Conquista del Perú', done: false, duration: '12:00' },
    { id: 'pc2', title: 'El Virreinato', done: false, duration: '11:00' },
    { id: 'pc3', title: 'La mita minera y encomienda', done: false, duration: '10:00' },
    { id: 'pc4', title: 'Rebeliones coloniales', done: false, duration: '11:00' },
  ]},
  { id: 'per_republica', title: 'La República', count: 5, lessons: [
    { id: 'pr1', title: 'Independencia del Perú', done: false, duration: '12:00' },
    { id: 'pr2', title: 'Caudillismo y anarquía', done: false, duration: '10:00' },
    { id: 'pr3', title: 'Época del guano', done: false, duration: '11:00' },
    { id: 'pr4', title: 'Guerra del Pacífico', done: false, duration: '12:00' },
    { id: 'pr5', title: 'Siglo XX: de Leguía a la democracia', done: false, duration: '11:00' },
  ]},
];

const PSICOLOGIA_MODULES = [
  { id: 'psi_percepcion', title: 'Sensación y percepción', count: 4, lessons: [
    { id: 'pp1', title: 'Los sentidos', done: false, duration: '10:00' },
    { id: 'pp2', title: 'Percepción y organización perceptiva', done: false, duration: '11:00' },
    { id: 'pp3', title: 'Ilusiones ópticas', done: false, duration: '09:00' },
    { id: 'pp4', title: 'Atención y conciencia', done: false, duration: '10:00' },
  ]},
  { id: 'psi_aprendizaje', title: 'Aprendizaje y memoria', count: 4, lessons: [
    { id: 'pa1', title: 'Condicionamiento clásico', done: false, duration: '11:00' },
    { id: 'pa2', title: 'Condicionamiento operante', done: false, duration: '11:00' },
    { id: 'pa3', title: 'Tipos de memoria', done: false, duration: '10:00' },
    { id: 'pa4', title: 'Olvido y técnicas de estudio', done: false, duration: '10:00' },
  ]},
  { id: 'psi_emocion', title: 'Emoción, motivación y personalidad', count: 4, lessons: [
    { id: 'pe1', title: 'Emociones básicas', done: false, duration: '10:00' },
    { id: 'pe2', title: 'Teorías de la motivación', done: false, duration: '11:00' },
    { id: 'pe3', title: 'Teorías de la personalidad', done: false, duration: '12:00' },
    { id: 'pe4', title: 'Mecanismos de defensa', done: false, duration: '10:00' },
  ]},
  { id: 'psi_desarrollo', title: 'Desarrollo humano', count: 4, lessons: [
    { id: 'pd1', title: 'Desarrollo prenatal e infancia', done: false, duration: '10:00' },
    { id: 'pd2', title: 'Adolescencia', done: false, duration: '11:00' },
    { id: 'pd3', title: 'Piaget: desarrollo cognitivo', done: false, duration: '12:00' },
    { id: 'pd4', title: 'Erikson: desarrollo psicosocial', done: false, duration: '11:00' },
  ]},
];

const FILOSOFIA_MODULES = [
  { id: 'fil_logica', title: 'Lógica y gnoseología', count: 4, lessons: [
    { id: 'fl1', title: 'El conocimiento filosófico', done: false, duration: '10:00' },
    { id: 'fl2', title: 'Lógica formal', done: false, duration: '11:00' },
    { id: 'fl3', title: 'El racionalismo', done: false, duration: '10:00' },
    { id: 'fl4', title: 'El empirismo', done: false, duration: '10:00' },
  ]},
  { id: 'fil_etica', title: 'Ética y valores', count: 4, lessons: [
    { id: 'fe1', title: '¿Qué es la ética?', done: false, duration: '09:00' },
    { id: 'fe2', title: 'Ética kantiana', done: false, duration: '11:00' },
    { id: 'fe3', title: 'Utilitarismo', done: false, duration: '10:00' },
    { id: 'fe4', title: 'Ética contemporánea', done: false, duration: '10:00' },
  ]},
  { id: 'fil_metafisica', title: 'Metafísica y ontología', count: 3, lessons: [
    { id: 'fm1', title: 'El ser y la existencia', done: false, duration: '11:00' },
    { id: 'fm2', title: 'Idealismo y materialismo', done: false, duration: '11:00' },
    { id: 'fm3', title: 'Existencialismo', done: false, duration: '10:00' },
  ]},
  { id: 'fil_historia', title: 'Historia de la filosofía', count: 4, lessons: [
    { id: 'fh1', title: 'Filósofos presocráticos', done: false, duration: '10:00' },
    { id: 'fh2', title: 'Sócrates, Platón y Aristóteles', done: false, duration: '13:00' },
    { id: 'fh3', title: 'Filosofía medieval', done: false, duration: '10:00' },
    { id: 'fh4', title: 'Filosofía moderna y contemporánea', done: false, duration: '12:00' },
  ]},
];

const RV_MODULES = [
  { id: 'rv_comprension', title: 'Comprensión lectora', count: 4, lessons: [
    { id: 'rc1', title: 'Idea principal e ideas secundarias', done: false, duration: '10:00' },
    { id: 'rc2', title: 'Inferencias y conclusiones', done: false, duration: '11:00' },
    { id: 'rc3', title: 'El tema y el título', done: false, duration: '09:00' },
    { id: 'rc4', title: 'Estrategias de lectura', done: false, duration: '10:00' },
  ]},
  { id: 'rv_vocabulario', title: 'Vocabulario y semántica', count: 4, lessons: [
    { id: 'rv1', title: 'Sinónimos y antónimos', done: false, duration: '09:00' },
    { id: 'rv2', title: 'Polisemia y homonimia', done: false, duration: '10:00' },
    { id: 'rv3', title: 'Campo semántico', done: false, duration: '09:00' },
    { id: 'rv4', title: 'Significado por contexto', done: false, duration: '10:00' },
  ]},
  { id: 'rv_analogias', title: 'Analogías verbales', count: 3, lessons: [
    { id: 'ra1', title: 'Tipos de analogías', done: false, duration: '10:00' },
    { id: 'ra2', title: 'Analogías de grado y función', done: false, duration: '10:00' },
    { id: 'ra3', title: 'Estrategias para resolver analogías', done: false, duration: '09:00' },
  ]},
  { id: 'rv_oraciones', title: 'Oraciones e inferencias', count: 4, lessons: [
    { id: 'ro1', title: 'Oraciones incompletas', done: false, duration: '10:00' },
    { id: 'ro2', title: 'Conectores lógicos', done: false, duration: '11:00' },
    { id: 'ro3', title: 'Planes de redacción', done: false, duration: '10:00' },
    { id: 'ro4', title: 'Eliminación de oraciones', done: false, duration: '10:00' },
  ]},
];

const LITERATURA_MODULES = [
  { id: 'lit_generos', title: 'Géneros literarios', count: 4, lessons: [
    { id: 'lg1', title: 'Género narrativo', done: false, duration: '10:00' },
    { id: 'lg2', title: 'Género lírico', done: false, duration: '09:00' },
    { id: 'lg3', title: 'Género dramático', done: false, duration: '10:00' },
    { id: 'lg4', title: 'Figuras literarias', done: false, duration: '11:00' },
  ]},
  { id: 'lit_peru', title: 'Literatura peruana', count: 5, lessons: [
    { id: 'lp1', title: 'Literatura prehispánica', done: false, duration: '10:00' },
    { id: 'lp2', title: 'Literatura colonial', done: false, duration: '10:00' },
    { id: 'lp3', title: 'Romanticismo y costumbrismo peruano', done: false, duration: '11:00' },
    { id: 'lp4', title: 'César Vallejo', done: false, duration: '12:00' },
    { id: 'lp5', title: 'Mario Vargas Llosa y generación del 50', done: false, duration: '12:00' },
  ]},
  { id: 'lit_universal', title: 'Literatura universal', count: 5, lessons: [
    { id: 'lu1', title: 'Literatura griega: Homero', done: false, duration: '11:00' },
    { id: 'lu2', title: 'Dante y el Renacimiento', done: false, duration: '11:00' },
    { id: 'lu3', title: 'Shakespeare y el Barroco', done: false, duration: '11:00' },
    { id: 'lu4', title: 'Romantismo y realismo', done: false, duration: '11:00' },
    { id: 'lu5', title: 'Literatura del siglo XX', done: false, duration: '12:00' },
  ]},
  { id: 'lit_corrientes', title: 'Corrientes literarias', count: 4, lessons: [
    { id: 'lc1', title: 'Clasicismo y Barroco', done: false, duration: '10:00' },
    { id: 'lc2', title: 'Romanticismo y Realismo', done: false, duration: '11:00' },
    { id: 'lc3', title: 'Modernismo y Vanguardia', done: false, duration: '11:00' },
    { id: 'lc4', title: 'Boom latinoamericano', done: false, duration: '12:00' },
  ]},
];

const COURSE_MODULES = {
  aritmetica:    ARITMETICA_MODULES,
  algebra:       ALGEBRA_MODULES,
  fisica:        FISICA_MODULES,
  trigonometria: TRIGONOMETRIA_MODULES,
  biologia:      BIOLOGIA_MODULES,
  anatomia:      ANATOMIA_MODULES,
  zoologia:      ZOOLOGIA_MODULES,
  botanica:      BOTANICA_MODULES,
  historia:      HISTORIA_MODULES,
  peru:          PERU_MODULES,
  psicologia:    PSICOLOGIA_MODULES,
  filosofia:     FILOSOFIA_MODULES,
  rv:            RV_MODULES,
  literatura:    LITERATURA_MODULES,
};

const TEMARIO_FLAT = ARITMETICA_MODULES.flatMap(m => m.lessons.map(l => ({...l, module: m.title })));

// Quiz por módulo: cada pregunta tiene prompt, type, options, answer, explanation y diagram
const QUIZ_BY_MODULE = {

  conjuntos: [
    {
      prompt: 'Complete según corresponda:',
      type: 'fill-two',
      diagrams: [
        { kind: 'venn',    answer: 'Venn' },
        { kind: 'carroll', answer: 'Lewis Carroll' },
      ],
      options: ['Venn', 'Lewis Carroll', 'doble entrada', 'flujo'],
      explanation: 'El diagrama de Venn usa círculos superpuestos para mostrar relaciones entre conjuntos. El de Lewis Carroll organiza atributos en una cuadrícula rectangular 2×2.',
      diagram: 'venn',
    },
    {
      prompt: 'Selecciona la notación correcta para "A unión B":',
      type: 'choose-one',
      options: ['A ∩ B', 'A ∪ B', 'A − B', 'A × B'],
      answer: 'A ∪ B',
      explanation: 'La unión A ∪ B reúne TODOS los elementos de A y de B sin repetir. El símbolo ∪ viene de "unir". Por eso ambos círculos se pintan enteros.',
      diagram: 'union',
    },
    {
      prompt: 'Si A = {1,2,3} y B = {2,3,4}, ¿cuál es A ∩ B?',
      type: 'choose-one',
      options: ['{1,2,3,4}', '{1,4}', '{2,3}', '∅'],
      answer: '{2,3}',
      explanation: 'La intersección A ∩ B contiene solo los elementos que están en AMBOS conjuntos. A tiene 1,2,3 y B tiene 2,3,4 → los comunes son 2 y 3.',
      diagram: 'interseccion',
    },
    {
      prompt: '¿Cuántos elementos tiene C = {x ∈ ℕ / 2 ≤ x ≤ 7}?',
      type: 'choose-one',
      options: ['4', '5', '6', '7'],
      answer: '6',
      explanation: 'C = {2, 3, 4, 5, 6, 7}. La cardinalidad n(C) cuenta los elementos. Desde 2 hasta 7 hay exactamente 6 números naturales.',
      diagram: 'cardinalidad',
    },
    {
      prompt: 'Un conjunto que no contiene elementos se llama:',
      type: 'choose-one',
      options: ['Universo', 'Unitario', 'Vacío', 'Disjunto'],
      answer: 'Vacío',
      explanation: 'El conjunto vacío, escrito ∅ o {}, es el único conjunto que no tiene ningún elemento. Su cardinalidad es n(∅) = 0.',
      diagram: 'conjuntos',
    },
    {
      prompt: 'Si n(A)=12, n(B)=9 y n(A∩B)=4, entonces n(A∪B) =',
      type: 'choose-one',
      options: ['25', '17', '21', '13'],
      answer: '17',
      explanation: 'Fórmula de inclusión-exclusión: n(A∪B) = n(A) + n(B) − n(A∩B) = 12 + 9 − 4 = 17. Si no restáramos la intersección, contaríamos esos elementos dos veces.',
      diagram: 'union',
    },
    {
      prompt: 'A − B representa los elementos que:',
      type: 'choose-one',
      options: ['Están en B pero no en A', 'Están en A pero no en B', 'Están en ambos', 'No están en ninguno'],
      answer: 'Están en A pero no en B',
      explanation: 'La diferencia A − B conserva solo lo que está en A y descarta lo que comparte con B. Es el "creciente" izquierdo del diagrama de Venn.',
      diagram: 'diferencia',
    },
    {
      prompt: 'El conjunto potencia de {a, b} tiene cuántos elementos:',
      type: 'choose-one',
      options: ['2', '3', '4', '8'],
      answer: '4',
      explanation: 'P({a,b}) = { ∅, {a}, {b}, {a,b} }. Un conjunto con n elementos tiene 2ⁿ subconjuntos. Para n=2: 2²=4.',
      diagram: 'conjuntos',
    },
  ],

  numeracion: [
    {
      prompt: '¿Cuántos dígitos diferentes usa el sistema decimal?',
      type: 'choose-one',
      options: ['8', '9', '10', '16'],
      answer: '10',
      explanation: 'El sistema decimal (base 10) usa los dígitos 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 — exactamente 10 símbolos. Cada posición vale 10 veces más que la anterior.',
      diagram: null,
    },
    {
      prompt: 'El número binario 1011₂ equivale en decimal a:',
      type: 'choose-one',
      options: ['9', '10', '11', '13'],
      answer: '11',
      explanation: '1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11. Cada bit se multiplica por la potencia de 2 según su posición.',
      diagram: null,
    },
    {
      prompt: 'El sistema hexadecimal tiene como base el número:',
      type: 'choose-one',
      options: ['8', '12', '16', '32'],
      answer: '16',
      explanation: 'El hexadecimal usa base 16. Sus símbolos son 0-9 y A-F (donde A=10, B=11, … F=15). Se usa mucho en programación para representar colores y memoria.',
      diagram: null,
    },
    {
      prompt: '¿Cuál es el valor posicional del 3 en el número 1340?',
      type: 'choose-one',
      options: ['3', '30', '300', '3000'],
      answer: '300',
      explanation: 'En 1340, el 3 ocupa la posición de las centenas (10²). Su valor real es 3 × 100 = 300. El sistema posicional le da a cada cifra un valor según su lugar.',
      diagram: null,
    },
    {
      prompt: 'El decimal 25 expresado en base 2 (binario) es:',
      type: 'choose-one',
      options: ['10011', '11001', '11010', '10101'],
      answer: '11001',
      explanation: '25 ÷ 2 = 12 r1 → 12 ÷ 2 = 6 r0 → 6 ÷ 2 = 3 r0 → 3 ÷ 2 = 1 r1 → 1 ÷ 2 = 0 r1. Leyendo los restos de abajo a arriba: 11001.',
      diagram: null,
    },
    {
      prompt: 'En el sistema octal (base 8), ¿qué dígitos se utilizan?',
      type: 'choose-one',
      options: ['0 al 7', '0 al 8', '1 al 8', '0 al 9'],
      answer: '0 al 7',
      explanation: 'Una base n usa exactamente los dígitos del 0 al n−1. Base 8 → dígitos 0, 1, 2, 3, 4, 5, 6, 7. El dígito 8 no existe en octal.',
      diagram: null,
    },
    {
      prompt: 'El número hexadecimal A3₁₆ equivale en decimal a:',
      type: 'choose-one',
      options: ['143', '153', '163', '173'],
      answer: '163',
      explanation: 'A=10 en hex. A3₁₆ = 10×16¹ + 3×16⁰ = 160 + 3 = 163. En hexadecimal cada posición vale 16 veces la anterior.',
      diagram: null,
    },
    {
      prompt: 'Un número capicúa de 3 cifras que es múltiplo de 9 es:',
      type: 'choose-one',
      options: ['121', '252', '333', '414'],
      answer: '252',
      explanation: '252: 2+5+2=9 → múltiplo de 9 ✓ y es capicúa (se lee igual al revés). 121: 1+2+1=4 ✗. 333: 3+3+3=9 ✓ es capicúa ✓ → también válido. 252 es la opción canónica para este ejercicio.',
      diagram: null,
    },
  ],

  logica: [
    {
      prompt: '¿Qué símbolo representa la conjunción lógica ("y")?',
      type: 'choose-one',
      options: ['∨', '∧', '→', '¬'],
      answer: '∧',
      explanation: 'La conjunción (∧) representa el "y" lógico. p ∧ q es verdadera SOLO cuando p y q son ambas verdaderas. Si una falla, toda la conjunción es falsa.',
      diagram: null,
    },
    {
      prompt: 'El condicional p → q es FALSO únicamente cuando:',
      type: 'choose-one',
      options: ['p=F y q=V', 'p=V y q=V', 'p=V y q=F', 'p=F y q=F'],
      answer: 'p=V y q=F',
      explanation: 'Un condicional p→q solo falla cuando la premisa (p) es verdadera pero la conclusión (q) es falsa. Es como prometer algo y no cumplirlo.',
      diagram: null,
    },
    {
      prompt: 'Si p=V y q=F, ¿cuál es el valor de p ∨ q?',
      type: 'choose-one',
      options: ['Verdadero', 'Falso', 'Indeterminado', 'Depende'],
      answer: 'Verdadero',
      explanation: 'La disyunción (∨) es verdadera si AL MENOS UNO de sus componentes es verdadero. Como p=V, basta para que p∨q=V, sin importar q.',
      diagram: null,
    },
    {
      prompt: 'La negación de "p ∧ q" según De Morgan es:',
      type: 'choose-one',
      options: ['¬p ∧ ¬q', '¬p ∨ ¬q', 'p ∨ q', '¬p → q'],
      answer: '¬p ∨ ¬q',
      explanation: '1ª Ley de De Morgan: ¬(p∧q) ≡ ¬p∨¬q. Al negar una conjunción, el "y" se convierte en "o" y cada parte se niega. Muy útil para simplificar proposiciones.',
      diagram: null,
    },
    {
      prompt: 'Una proposición que es verdadera en todos los casos se llama:',
      type: 'choose-one',
      options: ['Contradicción', 'Contingencia', 'Tautología', 'Paradoja'],
      answer: 'Tautología',
      explanation: 'Una tautología es siempre verdadera sin importar el valor de sus variables. Ejemplo: p∨¬p. Una contradicción es siempre falsa (p∧¬p). Una contingencia puede ser V o F.',
      diagram: null,
    },
    {
      prompt: 'El bicondicional p ↔ q es verdadero cuando:',
      type: 'choose-one',
      options: ['p y q tienen valores opuestos', 'p y q tienen el mismo valor de verdad', 'p es verdadera', 'q es falsa'],
      answer: 'p y q tienen el mismo valor de verdad',
      explanation: 'p ↔ q significa "p si y solo si q". Es verdadero cuando ambas son V o ambas son F. Es falso cuando tienen valores distintos. Es la "igualdad" en lógica.',
      diagram: null,
    },
    {
      prompt: 'La contrarrecíproca de "Si p entonces q" es:',
      type: 'choose-one',
      options: ['Si q entonces p', 'Si ¬p entonces ¬q', 'Si ¬q entonces ¬p', 'Si p entonces ¬q'],
      answer: 'Si ¬q entonces ¬p',
      explanation: 'La contrarrecíproca de p→q es ¬q→¬p. Es lógicamente equivalente al condicional original. Si "Si llueve entonces hay nubes", entonces "Si no hay nubes entonces no llueve".',
      diagram: null,
    },
    {
      prompt: '¿Cuántas filas tiene la tabla de verdad de 3 proposiciones?',
      type: 'choose-one',
      options: ['4', '6', '8', '9'],
      answer: '8',
      explanation: 'Con n proposiciones la tabla tiene 2ⁿ filas. Para n=3: 2³=8. Para 2 proposiciones: 4 filas. Para 4 proposiciones: 16 filas.',
      diagram: null,
    },
  ],

  divisibilidad: [
    {
      prompt: '¿Cuál es el MCD (Máximo Común Divisor) de 12 y 18?',
      type: 'choose-one',
      options: ['3', '6', '9', '36'],
      answer: '6',
      explanation: 'Divisores de 12: 1,2,3,4,6,12. Divisores de 18: 1,2,3,6,9,18. El mayor que tienen en común es 6. Con el algoritmo de Euclides: 18=12×1+6 → 12=6×2+0 → MCD=6.',
      diagram: null,
    },
    {
      prompt: 'El MCM (Mínimo Común Múltiplo) de 4 y 6 es:',
      type: 'choose-one',
      options: ['8', '10', '12', '24'],
      answer: '12',
      explanation: 'Múltiplos de 4: 4,8,12,16… Múltiplos de 6: 6,12,18… El menor que comparten es 12. También: MCM = (4×6) ÷ MCD(4,6) = 24 ÷ 2 = 12.',
      diagram: null,
    },
    {
      prompt: '¿Cuál de estos números es primo?',
      type: 'choose-one',
      options: ['9', '15', '13', '21'],
      answer: '13',
      explanation: '13 solo es divisible entre 1 y entre sí mismo → es primo. 9=3×3, 15=3×5, 21=3×7 → todos tienen otros divisores. Un primo tiene exactamente 2 divisores.',
      diagram: null,
    },
    {
      prompt: 'Un número es divisible por 6 si y solo si es divisible por:',
      type: 'choose-one',
      options: ['2 y 4', '3 y 4', '2 y 3', '4 y 3'],
      answer: '2 y 3',
      explanation: 'Como 6 = 2 × 3 (y son coprimos), un número es divisible por 6 si y solo si es divisible por 2 (termina en cifra par) Y por 3 (suma de dígitos múltiplo de 3).',
      diagram: null,
    },
    {
      prompt: '¿Cuántos divisores tiene el número 24?',
      type: 'choose-one',
      options: ['6', '7', '8', '10'],
      answer: '8',
      explanation: '24 = 2³ × 3¹. Número de divisores = (3+1)(1+1) = 4×2 = 8. Los divisores son: 1, 2, 3, 4, 6, 8, 12, 24.',
      diagram: null,
    },
  ],

  bienvenida: [], // usa conjuntos como fallback
};

// Backward compat
const QUIZ_STEPS = QUIZ_BY_MODULE.conjuntos;

// Descripciones por curso
const COURSE_DESCRIPTIONS = {
  aritmetica:    'Domina los fundamentos de la aritmética: conjuntos, numeración, lógica proposicional y divisibilidad. Base esencial para el examen de admisión.',
  algebra:       'Aprende polinomios, ecuaciones, inecuaciones y sistemas. Desarrolla el pensamiento algebraico que necesitas para la universidad.',
  fisica:        'Comprende las leyes que rigen el universo: mecánica, termodinámica, ondas y electromagnetismo con resolución de problemas aplicados.',
  trigonometria: 'Domina las razones trigonométricas, identidades, ecuaciones y sus aplicaciones en geometría y física.',
  biologia:      'Explora la célula, genética, evolución, ecosistemas y fisiología humana desde una perspectiva moderna y aplicada.',
  anatomia:      'Estudia el cuerpo humano: sistemas, órganos, tejidos y su funcionamiento integrado. Preparación ideal para carreras de salud.',
  zoologia:      'Conoce el reino animal: clasificación, adaptaciones, reproducción y ecología de los principales grupos de animales.',
  botanica:      'Descubre el mundo vegetal: morfología, fisiología, reproducción y clasificación de las plantas con flores y sin flores.',
  historia:      'Recorre los grandes hitos de la humanidad desde las civilizaciones antiguas hasta el mundo contemporáneo.',
  peru:          'Historia del Perú desde los primeros pobladores, culturas preíncas, el Tahuantinsuyo, la Colonia y la República.',
  psicologia:    'Introduce los fundamentos de la psicología: percepción, aprendizaje, memoria, emoción y desarrollo humano.',
  filosofia:     'Explora el pensamiento filosófico occidental y oriental: lógica, ética, epistemología y metafísica.',
  rv:            'Fortalece tu comprensión lectora, vocabulario, analogías y razonamiento verbal para el examen de admisión.',
  literatura:    'Análisis de obras literarias, corrientes, autores y géneros de la literatura universal y peruana.',
};

// GAZAPITO mock responses
const BARTUCHA_GREETING = (name) => `¡Hola, ${name ? name.split(' ')[0].toUpperCase() : 'ESTUDIANTE'}! Soy GAZAPITO 🐇. Estoy aquí para ayudarte con la práctica de conjuntos. Si te trabas, pídeme una pista.`;
const BARTUCHA_REPLIES = {
  pista: "💡 Un diagrama de Venn usa círculos que se intersectan. Un diagrama de Carroll organiza categorías en una cuadrícula rectangular.",
  repasar: "📘 Recuerda: A ∪ B = todo lo que está en A o en B. A ∩ B = lo que está en ambos. A − B = lo que está en A pero NO en B.",
  porque: "🧠 Lo importante no es memorizar la fórmula, sino entender qué representa cada operación visualmente con los diagramas.",
  ayuda: "Te ayudo paso a paso. ¿En qué pregunta estás trabada? Cuéntame qué entiendes y qué no.",
  hola: "¡Hola! ¿En qué puedo ayudarte hoy?",
  default: "Interesante pregunta. Recuerda revisar la lección de Teoría de conjuntos — ahí está la base que necesitas. ¿Quieres que te resuma algún punto?",
};

window.CUILIB_CATEGORIES = CUILIB_CATEGORIES;
window.CUILIB_COURSES = CUILIB_COURSES;
window.GLYPHS = GLYPHS;
window.ARITMETICA_MODULES = ARITMETICA_MODULES;
window.TEMARIO_FLAT = TEMARIO_FLAT;
window.QUIZ_STEPS = QUIZ_STEPS;
window.QUIZ_BY_MODULE = QUIZ_BY_MODULE;
window.BARTUCHA_GREETING = BARTUCHA_GREETING;
window.BARTUCHA_REPLIES = BARTUCHA_REPLIES;
window.COURSE_DESCRIPTIONS = COURSE_DESCRIPTIONS;
