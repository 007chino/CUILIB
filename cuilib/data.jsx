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
