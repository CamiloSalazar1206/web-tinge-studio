// Casos "ricos" curados (data real) para la página de proyecto v3 en layout
// bento. Warner es el caso modelo (cifras, pipeline y quotes reales, tomados de
// icp-hub). Los demás se irán cargando aquí con las cifras reales que pase el
// cliente — mientras tanto la página cae al layout adaptativo desde el CMS.
export const projectCases = {
  'warner-channel': {
    slug: 'warner-channel',
    tag: 'Rebranding + Hub digital',
    client: 'Warner Channel TV',
    company: 'Warner Bros. Discovery',
    category: 'Rebranding + Brand Hub',
    year: '2025',
    problema:
      'Una marca que lleva décadas en la casa de la gente. El encargo real fue darle sentido a una promesa que ya existía: “Cada vez mejor”.',
    story: [
      {
        label: 'El reto',
        text: 'Rediseñar una marca que vive en la memoria de varias generaciones, sin perder lo que la hace icónica.',
      },
      {
        label: 'La solución',
        text: 'Una identidad en movimiento para toda Latinoamérica, con un hub digital que la mantiene viva en cada equipo.',
      },
    ],
    concepto: 'Donde la historia crece contigo.',
    serviciosList: ['Estrategia de marca', 'Diseño de identidad', 'Producción de contenido', 'Toolkit en 7 categorías', 'Hub digital'],
    resultado: 'Brand hub operativo · Toolkit en 7 categorías · Acceso unificado',
    logo: '/casos/warner-logo-animation.mp4',
    cover: '/videos/wbtv-rebrand-bento.jpg',
    pipeline: [
      { step: 'Estrategia de marca', color: '#A3FF12' },
      { step: 'Diseño de identidad', color: '#FF6B9D' },
      { step: 'Producción de contenido', color: '#0055FF' },
      { step: 'Toolkit · 7 categorías', color: '#C084FC' },
      { step: 'Hub digital', color: '#0055FF' },
    ],
    metrics: [
      { num: '–80%', label: 'Búsqueda de assets', color: '#A3FF12' },
      { num: '3x', label: 'Producción on-air', color: '#FF6B9D' },
      { num: '100%', label: 'Adopción semana 1', color: '#0055FF' },
      { num: '0', label: 'Inconsistencias', color: '#C084FC' },
    ],
    // Videos siempre primero; luego key arts. `orient: 'v'` = pieza vertical,
    // se muestran de a dos para no cortarlas.
    visuals: [
      { type: 'video', src: '/videos/wbtv-rebrand-bento.mp4', alt: 'Warner Channel TV, rebrand' },
      { type: 'video', src: '/videos/warner-id-preview.mp4', alt: 'Warner Channel TV, ID' },
      { type: 'image', src: '/casos/title-brand-horizontal.png', alt: 'Warner Channel TV, key art' },
      { type: 'image', src: '/casos/toolkit-preview.png', alt: 'Warner Channel TV, toolkit', orient: 'v' },
      { type: 'image', src: '/casos/title-brand-vertical.png', alt: 'Warner Channel TV, key art vertical', orient: 'v' },
    ],
    quotes: [
      {
        text: 'Es que no te puedo explicar lo útil que es para nosotros tener esa Web. Ya desde el vamos el Brand les quedó increíble. Y esto es un extra que no esperábamos. Definitivamente subieron mucho la vara.',
        name: 'Sergio Laguzzi',
        role: 'Art Manager | Basic Linear Channels (BLC)',
        company: 'Warner Bros. Discovery',
      },
      {
        text: 'Nos entregaron en tiempo récord algo que llevábamos meses intentando resolver internamente. El equipo adoptó la herramienta desde el primer día.',
        name: 'Nico Sarsoti',
        role: 'Art Director',
        company: 'Warner Bros. Discovery',
      },
      {
        text: 'O nível de detalhe e a velocidade com que resolveram tudo foi impressionante. Nos deixaram um sistema que realmente funciona no dia a dia.',
        name: 'Thais Vieira',
        role: 'Production Manager | Creative Services',
        company: 'Warner Bros. Discovery',
      },
    ],
  },

  bimbo: {
    slug: 'bimbo',
    tag: 'Consumo masivo / FMCG',
    client: 'Bimbo',
    company: 'Grupo Bimbo',
    category: 'Producción IA + curaduría',
    year: '2025',
    problema:
      'Decenas de submarcas, demanda constante de contenido y un archivo lleno de producciones que ya nadie aprovechaba.',
    story: [
      {
        label: 'El reto',
        text: 'Más de 40 submarcas y una demanda de contenido que no daba tregua.',
      },
      {
        label: 'La solución',
        text: 'Un concepto claro, el producto y la experiencia en el centro, y un sistema que combina IA con curaduría humana sobre los assets que ya existían.',
      },
    ],
    resultado: 'Producción IA + curaduría humana · –50% tiempos · Flujo profesional',
    serviciosList: ['Estrategia de contenido', 'Concepto creativo', 'Integración de IA', 'Curaduría humana', 'Producción optimizada'],
    logo: '/casos/bimbo-logo.png',
    cover: '/casos/bimbo-cover.jpg',
    pipeline: [
      { step: 'Diagnóstico de flujo', color: '#A3FF12' },
      { step: 'Integración IA', color: '#FF6B9D' },
      { step: 'Curaduría humana', color: '#0055FF' },
      { step: 'Producción optimizada', color: '#C084FC' },
    ],
    metrics: [
      { num: '–50%', label: 'Tiempo de producción', color: '#A3FF12' },
      { num: '+40%', label: 'Reutilización de contenido', color: '#FF6B9D' },
      { num: '40+', label: 'Submarcas gestionadas', color: '#0055FF' },
      { num: '2×', label: 'Piezas en la mitad del tiempo', color: '#C084FC' },
    ],
    // Videos primero. Todas las piezas de Bimbo son verticales, van en pares.
    visuals: [
      { type: 'video', src: '/casos/video-1.mp4', alt: 'Bimbo, video', orient: 'v' },
      { type: 'video', src: '/casos/story-vital.mp4', alt: 'Bimbo, story Vital', orient: 'v' },
      { type: 'image', src: '/casos/post-1.png', alt: 'Bimbo, post', orient: 'v' },
      { type: 'image', src: '/casos/post-2.png', alt: 'Bimbo, post', orient: 'v' },
    ],
    quotes: [
      {
        text: 'Soy cero fan del contenido con IA, pero esto me pareció demasiado wow. Toman las producciones que ya tenemos y las potencian: nuevas vistas, movimiento, animación. Funciona perfecto para cuando querés impulsar algo sin el presupuesto de una producción completa.',
        name: 'Sara Parra',
        role: 'Brand Manager',
        company: 'Grupo Bimbo',
      },
      {
        text: 'Teníamos contenido acumulado que no estábamos aprovechando. Con el sistema que nos armaron, hoy producimos el doble de piezas en la mitad del tiempo, sin perder el estándar que la marca necesita.',
        name: 'Natalia Carrillo',
        role: 'Gerente de Categoría | Baked Goods',
        company: 'Grupo Bimbo',
      },
    ],
  },

  'artesano-eleva-tus-sentidos': {
    slug: 'artesano-eleva-tus-sentidos',
    tag: 'Campaña + Sistema de producción',
    client: 'Artesano, Eleva tus sentidos',
    company: 'Bimbo',
    category: 'Advertising',
    year: '2024',
    problema:
      'Una campaña regional para Bimbo bajo el concepto “Eleva tus sentidos”, desplegada en Colombia, Ecuador y Centroamérica.',
    story: [
      {
        label: 'El reto',
        text: 'Lanzar Artesano alineado a objetivos de negocio en tres mercados a la vez.',
      },
      {
        label: 'La solución',
        text: 'Un concepto sensorial, “Eleva tus sentidos”, convertido en campaña y sistema de producción consistentes en los tres mercados.',
      },
    ],
    serviciosList: ['Concepto creativo', 'Campaña regional', 'Sistema de producción', 'Despliegue en 3 mercados'],
    metrics: [
      { num: '+22 pts', label: 'Value SOM', color: '#A3FF12' },
      { num: 'GBF 2022', label: 'Premio de la categoría', color: '#FF6B9D' },
    ],
    video: 'https://vimeo.com/926888136?share=copy',
    visuals: [
      { type: 'image', src: '/media/wf-a33d55646fbf.png', alt: 'Artesano, pieza de campaña', orient: 'v' },
      { type: 'image', src: '/media/wf-2b4d214d8790.png', alt: 'Artesano, pieza de campaña', orient: 'v' },
      { type: 'image', src: '/media/wf-f79d789f5793.png', alt: 'Artesano, pieza de campaña', orient: 'v' },
    ],
    quotes: [],
  },

  'danet-shake': {
    slug: 'danet-shake',
    tag: 'Campaña + Producción',
    client: 'Danet Shake',
    company: 'Danone España',
    category: 'Advertising',
    year: '2020',
    problema:
      '“Supera las distancias con Danet Shake”: una campaña para acercar a la gente cuando más separada estaba.',
    story: [
      {
        label: 'El reto',
        text: 'Conectar con la juventud española en plena pandemia, cuando la distancia era la norma.',
      },
      {
        label: 'La solución',
        text: 'Una idea de conexión: cada compra lleva un mensaje personalizado. La contamos con tres de los influencers más relevantes del momento y animación 3D.',
      },
    ],
    serviciosList: ['Estrategia de campaña', 'Concepto creativo', 'Publicidad dinámica', 'Animación 3D'],
    metrics: [],
    video: 'https://www.youtube.com/watch?v=wQWO0d23WCI',
    visuals: [
      { type: 'image', src: '/media/wf-b5b2e6bcd51f.png', alt: 'Danet Shake, pieza de campaña' },
      { type: 'image', src: '/media/wf-edb456acb9fe.png', alt: 'Danet Shake, pieza de campaña' },
      { type: 'image', src: '/media/wf-b15d6df84a9d.png', alt: 'Danet Shake, pieza de campaña', orient: 'v' },
    ],
    quotes: [],
  },

  'espn-scrum-mundial-2023': {
    slug: 'espn-scrum-mundial-2023',
    tag: 'Dirección de arte + Animación',
    client: 'ESPN Scrum Mundial 2023',
    company: 'ESPN · Estudio.la',
    category: 'Animation',
    year: '2023',
    problema:
      'Dirección de arte y animación para que la cobertura del Mundial de Rugby 2023 tuviera identidad propia en ESPN.',
    story: [],
    serviciosList: ['Dirección de arte', 'Animación', 'Producción de contenido'],
    metrics: [],
    video: 'https://vimeo.com/926882287?share=copy',
    visuals: [
      { type: 'image', src: '/media/wf-d05f98e28af4.png', alt: 'ESPN Scrum Mundial, pieza', orient: 'v' },
      { type: 'image', src: '/media/wf-006497e37b46.png', alt: 'ESPN Scrum Mundial, pieza', orient: 'v' },
      { type: 'image', src: '/media/wf-a28046a279cb.png', alt: 'ESPN Scrum Mundial, pieza', orient: 'v' },
    ],
    quotes: [],
  },

  'f1-fox-premium': {
    slug: 'f1-fox-premium',
    tag: 'Branding TV',
    client: 'F1 Fox Premium',
    company: 'Fox',
    category: 'Branding TV',
    year: '2020',
    problema:
      'Una mezcla de estilos 3D y 2D para dar vida a la experiencia de la Fórmula 1 en FOX Premium, de la creatividad a la producción.',
    story: [],
    serviciosList: ['Concepto creativo', 'Branding TV', 'Producción 3D'],
    metrics: [],
    video: '',
    visuals: [
      { type: 'image', src: '/media/wf-5676842c4343.png', alt: 'F1 Fox Premium, pieza' },
      { type: 'image', src: '/media/wf-16c33072001f.png', alt: 'F1 Fox Premium, pieza' },
      { type: 'image', src: '/media/wf-4a8544d7d718.png', alt: 'F1 Fox Premium, pieza' },
    ],
    quotes: [],
  },

  'f1-fox-premium-2': {
    slug: 'f1-fox-premium-2',
    tag: 'Sistema gráfico + Animación',
    client: 'F1 Fox Premium, Toolkit',
    company: 'The Walt Disney Company',
    category: 'Animation',
    year: '2020',
    problema:
      'El sistema gráfico del programa F1 Fox Premium: una identidad pensada para operar el día a día del canal sin perder fuerza.',
    story: [],
    serviciosList: ['Dirección de arte', 'Sistema gráfico', 'Animación'],
    metrics: [],
    video: 'https://vimeo.com/926867318',
    visuals: [
      { type: 'image', src: '/media/wf-ce2f518e092a.png', alt: 'F1 Fox Premium, toolkit' },
      { type: 'image', src: '/media/wf-dd0a8d628c4d.png', alt: 'F1 Fox Premium, toolkit', orient: 'v' },
      { type: 'image', src: '/media/wf-b368641558ee.png', alt: 'F1 Fox Premium, toolkit', orient: 'v' },
    ],
    quotes: [],
  },

  'invasion-marvel': {
    slug: 'invasion-marvel',
    tag: 'Sistema gráfico + Animación',
    client: 'Invasión Marvel',
    company: 'The Walt Disney Company',
    category: 'Animation',
    year: '2020',
    problema:
      'El sistema gráfico de Invasión Marvel: la fuerza de la franquicia traducida a un toolkit que opera el programa día a día.',
    story: [],
    serviciosList: ['Dirección de arte', 'Sistema gráfico', 'Animación'],
    metrics: [],
    video: 'https://vimeo.com/926862935?share=copy',
    visuals: [
      { type: 'image', src: '/media/wf-0b8d1a967c3b.png', alt: 'Invasión Marvel, pieza', orient: 'v' },
      { type: 'image', src: '/media/wf-7cdccece0c26.png', alt: 'Invasión Marvel, pieza', orient: 'v' },
      { type: 'image', src: '/media/wf-ca70cd7f0a58.png', alt: 'Invasión Marvel, pieza', orient: 'v' },
    ],
    quotes: [],
  },

  sabaton: {
    slug: 'sabaton',
    tag: 'Concepto + Sistema gráfico',
    client: 'Sabatón',
    company: 'The Walt Disney Company',
    category: 'Animation',
    year: '2023',
    problema:
      'Concepto y sistema gráfico para un maratón de tres horas en Disney Channel: varios programas conviviendo bajo una misma identidad.',
    story: [],
    serviciosList: ['Concepto creativo', 'Sistema gráfico', 'Animación'],
    metrics: [],
    video: 'https://vimeo.com/926851198?share=copy',
    visuals: [
      { type: 'image', src: '/media/wf-6d0f6da65f0f.png', alt: 'Sabatón, pieza' },
      { type: 'image', src: '/media/wf-e2af6c7e301e.png', alt: 'Sabatón, pieza' },
      { type: 'image', src: '/media/wf-d20b711861c6.png', alt: 'Sabatón, pieza', orient: 'v' },
    ],
    quotes: [],
  },
}
