export interface ArchitectureHighlight {
  label: string;
  description: string;
}

export interface CodeArchitectureSnippet {
  filename: string;
  language: string;
  code: string;
  explanation: string;
}

export interface ProjectBenchmark {
  label: string;
  value: string;
  badge?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  clientType: string;
  category: "Luxury & Hospitality" | "3D & E-Commerce" | "Web Apps & Portals";
  description: string;
  fullCaseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    deliverables: string[];
    metrics: { label: string; value: string }[];
  };
  tech: string[];
  metricsPreview: { label: string; value: string };
  links: {
    github?: string;
    live?: string | null;
  };
  accentColor: string;
  glowColor: string;
  featured: boolean;
  status: "Progetto Dimostrativo" | "Production Architecture" | "Active Production";
  previewUrl: string;
  videoUrl: string;
  videoUrlIt?: string;
  gifUrl: string;
  posterUrl: string;
  mockupTheme: "dark" | "luxury" | "vibrant" | "minimal";
  devicePreview: {
    desktopMock: string;
    tagline: string;
  };
  architectureHighlights: ArchitectureHighlight[];
  codeArchitecture: CodeArchitectureSnippet;
  benchmarks: ProjectBenchmark[];
}

export const PROJECTS: Project[] = [
  {
    id: "yoz-shop",
    title: "The Yoz Shop",
    subtitle: "Configuratore 3D interattivo & store headless",
    clientType: "Shop & Skate Store (Progetto Dimostrativo)",
    category: "3D & E-Commerce",
    description:
      "Un configuratore 3D di tavole da skate con fisica dinamica, personalizzazione grip in tempo reale e navigazione fluida nel catalogo.",
    fullCaseStudy: {
      overview:
        "Progetto dimostrativo e architettura di riferimento per brand retail ed e-commerce che desiderano personalizzazione 3D WebGL su desktop e mobile.",
      challenge:
        "Renderizzare geometrie 3D concave e texture fotorealistiche a 60 FPS stabili su smartphone a basso consumo.",
      solution:
        "Ho sviluppato una pipeline WebGL dedicata con Three.js e React Three Fiber con motore fisico Rapier, abbinata a frontend Next.js ultra-reattivo.",
      deliverables: [
        "Configuratore skateboard interattivo 3D WebGL",
        "Simulatore fisico di rotazione e grip-tape",
        "Catalogo prodotti headless ad alta velocità",
        "Interfaccia ottimizzata per touch e dispositivi mobili",
      ],
      metrics: [
        { label: "Rendering", value: "60 FPS WebGL" },
        { label: "Edge Latency", value: "< 240ms" },
        { label: "Physics Engine", value: "Rapier 3D" },
      ],
    },
    tech: ["Next.js", "Three.js / R3F", "Rapier Physics", "GSAP", "Tailwind CSS", "Zustand"],
    metricsPreview: { label: "Rendering", value: "60 FPS 3D" },
    links: {
      github: "https://github.com/1Yosh1/YozShop",
      live: "https://yoz-shop.vercel.app",
    },
    accentColor: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.25)",
    featured: true,
    status: "Progetto Dimostrativo",
    previewUrl: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "/projects/yoz-shop.mp4",
    videoUrlIt: "/projects/yoz-shop-it.mp4",
    gifUrl: "/projects/yoz-shop.gif",
    posterUrl: "/projects/yoz-shop.jpg",
    mockupTheme: "vibrant",
    devicePreview: {
      desktopMock: "/mockups/yoz-desktop.png",
      tagline: "Configuratore ultra veloce con interazione fisica tattile",
    },
    architectureHighlights: [
      {
        label: "Decoupled Canvas State",
        description: "Zustand store isolates Three.js mesh rotation and shader updates from triggering React virtual DOM tree reconciliations.",
      },
      {
        label: "Rapier Rigid-Body Physics",
        description: "Embedded WebAssembly physics engine calculates realistic mass, friction, and bounce impulse during deck flips.",
      },
      {
        label: "Edge Asset Streaming",
        description: "GLTF models and KTX2 texture compressions compressed down to sub-1.2MB total initial network transfer.",
      },
    ],
    codeArchitecture: {
      filename: "SkateboardViewport.tsx",
      language: "typescript",
      code: `// Rapier 3D Kinetic Simulation Engine
const rigidBodyRef = useRef<RapierRigidBody>(null);

useFrame((_, delta) => {
  if (!rigidBodyRef.current || !isSpinning) return;
  // Apply rotational impulse without re-rendering parent React tree
  rigidBodyRef.current.applyTorqueImpulse({ x: 0, y: torqueForce * delta, z: 0 }, true);
});`,
      explanation: "Directly manipulates Rapier rigid-body physics via useFrame delta loops, keeping GPU frame rates pinned at 60 FPS without React state thrashing.",
    },
    benchmarks: [
      { label: "Canvas Frame Rate", value: "60 FPS", badge: "WebGL Hardware Accelerated" },
      { label: "Edge Catalog TTFB", value: "< 240ms", badge: "Vercel Edge Network" },
      { label: "Model Asset Payload", value: "1.18 MB", badge: "KTX2 + Draco Compression" },
    ],
  },
  {
    id: "medo-spa",
    title: "Medo Spa",
    subtitle: "Portale prenotazioni & calendario per centro benessere",
    clientType: "Centro Benessere & Trattamenti (Progetto Dimostrativo)",
    category: "Luxury & Hospitality",
    description:
      "Un portale fluido che unisce chiara gerarchia visiva, scorrimento a fisica d'inerzia, prenotazione operatori in tempo reale e gestione appuntamenti.",
    fullCaseStudy: {
      overview:
        "Progetto dimostrativo che illustra come un centro estetico o spa locale possa automatizzare le prenotazioni 24/7 senza perdite di tempo telefonico.",
      challenge:
        "Garantire prenotazioni rapide da mobile senza conflitti di orario e con sincronizzazione calendario istantanea.",
      solution:
        "Ho sviluppato un'interfaccia a scorrimento inerziale con Lenis e Next.js, integrata con database Supabase con blocco concorrente anti-doppia prenotazione.",
      deliverables: [
        "Interfaccia editoriale con scorrimento a inerzia",
        "Motore di prenotazione live multi-operatore",
        "Dashboard per consultazione appuntamenti e clienti",
        "Suite completa di test E2E con Playwright",
      ],
      metrics: [
        { label: "LCP Benchmark", value: "0.62s" },
        { label: "Database Latency", value: "< 45ms" },
        { label: "Test Coverage", value: "Playwright E2E" },
      ],
    },
    tech: ["Next.js", "Supabase", "GSAP", "Lenis", "Playwright", "Tailwind CSS", "TypeScript"],
    metricsPreview: { label: "Performance", value: "0.62s LCP" },
    links: {
      github: "https://github.com/1Yosh1/medo-spa",
      live: "https://medo-spa.vercel.app",
    },
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.25)",
    featured: true,
    status: "Progetto Dimostrativo",
    previewUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "/projects/medo-spa.mp4",
    videoUrlIt: "/projects/medo-spa-it.mp4",
    gifUrl: "/projects/medo-spa.gif",
    posterUrl: "/projects/medo-spa.jpg",
    mockupTheme: "luxury",
    devicePreview: {
      desktopMock: "/mockups/medo-desktop.png",
      tagline: "Esperienza cliente fluida con prenotazione immediata a calendario",
    },
    architectureHighlights: [
      {
        label: "Lenis Inertia Physics",
        description: "Normalized smooth scrolling pipeline calibrated to 1.15 inertia multiplier, eliminating scroll stutter on high-refresh displays.",
      },
      {
        label: "Atomic Slot Reservations",
        description: "Postgres RPC function executing isolation-level row locks on therapist calendar slots to prevent race-condition double bookings.",
      },
      {
        label: "Zero-Layout-Shift Images",
        description: "Explicit aspect ratio preservation with CSS inline blur hashes loaded ahead of high-resolution spa photography.",
      },
    ],
    codeArchitecture: {
      filename: "reserveTreatment.ts",
      language: "typescript",
      code: `// Atomic Slot Reservation RPC via Supabase Postgres
const { data, error } = await supabase.rpc("atomic_reserve_slot", {
  p_therapist_id: therapistId,
  p_slot_timestamp: slotTime,
  p_client_uuid: user.id
});
if (error?.code === "P0001") throw new Error("Slot already claimed in race condition");`,
      explanation: "Guarantees transactional consistency during simultaneous client checkout sessions via atomic Postgres RPC procedures.",
    },
    benchmarks: [
      { label: "Largest Contentful Paint", value: "0.62s", badge: "Sub-Second LCP" },
      { label: "Supabase Query Roundtrip", value: "< 45ms", badge: "Direct Edge RPC" },
      { label: "E2E Journey Verification", value: "100% Green", badge: "Playwright Automated CI" },
    ],
  },
  {
    id: "essenza-moda-capelli",
    title: "Essenza Moda Capelli",
    subtitle: "Vetrina digitale & prenotazioni per salone parrucchiere a Messina",
    clientType: "Salone Parrucchiere & Beauty a Messina (Progetto Dimostrativo)",
    category: "Luxury & Hospitality",
    description:
      "Vetrina digitale editoriale per salone di acconciatura con lookbook fotografico, presentazione servizi e prenotazione appuntamenti su misura.",
    fullCaseStudy: {
      overview:
        "Progetto dimostrativo sviluppato per parrucchieri, barbieri e centri beauty a Messina che desiderano presentare tagli e trattamenti con stile raffinato.",
      challenge:
        "Mostrare fotografie ad alta risoluzione senza rallentare il caricamento su smartphone con copertura di rete debole.",
      solution:
        "Ho sviluppato una pipeline di immagini responsive in formati moderni WebP/AVIF, abbinata a un'esperienza di navigazione leggera e fluida.",
      deliverables: [
        "Lookbook visivo & video showcase",
        "Selezione servizi e richiesta appuntamento",
        "Interfaccia mobile-first ultra reattiva",
        "Tipografia conforme agli standard di accessibilità WCAG 2.1 AA",
      ],
      metrics: [
        { label: "Lighthouse Performance", value: "98/100" },
        { label: "Accessibility Score", value: "100/100" },
        { label: "Core Web Vitals", value: "All Green" },
      ],
    },
    tech: ["React 19", "Vite", "Tailwind CSS", "Playwright", "TypeScript", "Lucide"],
    metricsPreview: { label: "Lighthouse", value: "98/100" },
    links: {
      github: "https://github.com/1Yosh1/essenza-moda-capelli",
      live: "https://essenza-moda-capelli.vercel.app",
    },
    accentColor: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.25)",
    featured: true,
    status: "Progetto Dimostrativo",
    previewUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "/projects/essenza-moda-capelli.mp4",
    videoUrlIt: "/projects/essenza-moda-capelli-it.mp4",
    gifUrl: "/projects/essenza-moda-capelli.gif",
    posterUrl: "/projects/essenza-moda-capelli.jpg",
    mockupTheme: "luxury",
    devicePreview: {
      desktopMock: "/mockups/essenza-desktop.png",
      tagline: "Estetica curata con richiesta appuntamenti senza attriti",
    },
    architectureHighlights: [
      {
        label: "Adaptive Picture Pipeline",
        description: "Automatic content negotiation serving AVIF formats with fallbacks to WebP and optimized JPEG at calibrated viewports.",
      },
      {
        label: "Editorial Typography Grid",
        description: "Fluid clamp-based type scales maintaining proportion across mobile handsets to 4K studio displays without layout jump.",
      },
      {
        label: "Deterministic Client State",
        description: "Zero global state bloat, using URL query parameters for stylist filtering and shareable booking links.",
      },
    ],
    codeArchitecture: {
      filename: "ResponsiveEditorialPicture.tsx",
      language: "typescript",
      code: `// Multi-Density Adaptive Picture Element
<picture className="relative block overflow-hidden rounded-2xl">
  <source type="image/avif" srcSet={\`\${basePath}-800.avif 800w, \${basePath}-1400.avif 1400w\`} />
  <source type="image/webp" srcSet={\`\${basePath}-800.webp 800w, \${basePath}-1400.webp 1400w\`} />
  <img src={\`\${basePath}-1400.jpg\`} alt={title} loading="lazy" decoding="async" className="w-full object-cover" />
</picture>`,
      explanation: "Dual AVIF/WebP content negotiation yields 65% byte-weight reduction over raw assets while upholding strict visual fidelity.",
    },
    benchmarks: [
      { label: "Lighthouse Performance", value: "98/100", badge: "Google Chrome Audit" },
      { label: "Accessibility Audit", value: "100/100", badge: "WCAG 2.1 AA Compliant" },
      { label: "Cumulative Layout Shift", value: "0.00", badge: "Zero Visual Shifting" },
    ],
  },
  {
    id: "locanda",
    title: "La Locanda Dei Mori",
    subtitle: "Sito web ristorazione locale & menu QR dinamico a Messina",
    clientType: "Ristorante & Pizzeria a Messina (Progetto Dimostrativo)",
    category: "Luxury & Hospitality",
    description:
      "Sito web gastronomico e piattaforma menu QR interattiva creata con tonalità calde, cambio lingua IT/EN e dati strutturati Schema.org per la ricerca locale.",
    fullCaseStudy: {
      overview:
        "Progetto dimostrativo per ristoranti, trattorie e pizzerie di Messina che vogliono un menu QR fulmineo e una presenza curata su Google Maps.",
      challenge:
        "Creare un menu digitale che si carichi istantaneamente anche in locali chiusi o seminterrati dove la ricezione cellulare è debole.",
      solution:
        "Ho implementato una strategia di caching offline-first, bundle leggero e markup Schema.org specifico per attività di ristorazione locale.",
      deliverables: [
        "Identità visiva calda e accogliente",
        "Menu QR dinamico attivo anche offline in 110ms",
        "Supporto bilingue (Italiano / Inglese)",
        "Dati strutturati Google Rich Snippets e pulsante contatto rapido",
      ],
      metrics: [
        { label: "Cold Cache Load", value: "110ms" },
        { label: "Client Bundle Size", value: "32 kB" },
        { label: "Structured Data", value: "Schema.org 100%" },
      ],
    },
    tech: ["Next.js", "Vanilla CSS", "SEO / Schema.org", "WCAG 2.1 AA", "TypeScript"],
    metricsPreview: { label: "TTFB", value: "110ms" },
    links: {
      github: "https://github.com/1Yosh1/LocandaDeiMori-Website",
      live: "https://locandadeimori-ercct9v9y-1yosh1s-projects.vercel.app",
    },
    accentColor: "#eab308",
    glowColor: "rgba(234, 179, 8, 0.25)",
    featured: false,
    status: "Progetto Dimostrativo",
    previewUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "/projects/locanda.mp4",
    videoUrlIt: "/projects/locanda-it.mp4",
    gifUrl: "/projects/locanda.gif",
    posterUrl: "/projects/locanda.jpg",
    mockupTheme: "minimal",
    devicePreview: {
      desktopMock: "/mockups/locanda-desktop.png",
      tagline: "Estetica accogliente con risposta menu QR fulminea",
    },
    architectureHighlights: [
      {
        label: "Zero-Runtime CSS",
        description: "Critical path CSS compiled directly into the HTML document stream for instant first-paint on weak cellular connections.",
      },
      {
        label: "Schema.org JSON-LD",
        description: "Full semantic food establishment markup providing verified menu items, price ranges, and coordinates to search engines.",
      },
      {
        label: "ServiceWorker Cache-First",
        description: "Cached restaurant menu assets and wine listings remain accessible indefinitely once scanned, even in subterranean vaults.",
      },
    ],
    codeArchitecture: {
      filename: "schemaRestaurant.ts",
      language: "typescript",
      code: `// Schema.org Restaurant Semantic Structured Data
export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "La Locanda Dei Mori",
  "servesCuisine": "Sicilian",
  "priceRange": "$$$",
  "hasMenu": "https://locanda-dei-mori.vercel.app/menu",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Messina",
    "addressRegion": "ME",
    "addressCountry": "IT"
  }
};`,
      explanation: "Injects strict machine-readable semantic schemas, guaranteeing enhanced search engine visibility and table booking cards.",
    },
    benchmarks: [
      { label: "First Contentful Paint", value: "110ms", badge: "Vercel Edge Global Cache" },
      { label: "JavaScript Payload", value: "32 kB", badge: "Zero Heavy Dependencies" },
      { label: "Structured Validation", value: "Schema.org Valid", badge: "Google Rich Snippets" },
    ],
  },
  {
    id: "discover-messina",
    title: "Discover Messina",
    subtitle: "Guida interattiva culturale & percorsi dello Stretto",
    clientType: "Guida Locale & Portale Turistico (Concept per Messina)",
    category: "Web Apps & Portals",
    description:
      "Guida culturale interattiva ai luoghi storici, percorsi gastronomici siciliani ed escursioni a Messina con filtri geospaziali immediati.",
    fullCaseStudy: {
      overview:
        "Concept dimostrativo per valorizzare il territorio di Messina, i suoi monumenti storici e le attività commerciali locali con una mappa mobile intuitiva.",
      challenge:
        "Organizzare punti di interesse ed itinerari a piedi senza appesantire la navigazione su smartphone.",
      solution:
        "Ho sviluppato una mappa interattiva con filtri istantanei, percorsi a tema e predisposizione contatti per guide e commercianti locali.",
      deliverables: [
        "Mappa interattiva luoghi storici e gastronomia",
        "Motore di filtraggio veloce per categoria",
        "Predisposizione contatti e prenotazioni dirette",
        "Layout mobile-first leggero e accessibile",
      ],
      metrics: [
        { label: "Initial Bundle", value: "84 kB" },
        { label: "Filter Latency", value: "< 16ms" },
        { label: "Accessibility", value: "ARIA Compliant" },
      ],
    },
    tech: ["React 19", "Vite", "Tailwind CSS", "Lucide Icons", "TypeScript"],
    metricsPreview: { label: "Client Bundle", value: "< 85kB" },
    links: {
      github: "https://github.com/1Yosh1/DiscoverMessina",
      live: "https://discovermessina.com",
    },
    accentColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.25)",
    featured: false,
    status: "Progetto Dimostrativo",
    previewUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "/projects/discover-messina.mp4",
    videoUrlIt: "/projects/discover-messina-it.mp4",
    gifUrl: "/projects/discover-messina.gif",
    posterUrl: "/projects/discover-messina.jpg",
    mockupTheme: "vibrant",
    devicePreview: {
      desktopMock: "/mockups/messina-desktop.png",
      tagline: "Esplora Messina con mappa e percorsi geospaziali",
    },
    architectureHighlights: [
      {
        label: "Client-Side Spatial Indexing",
        description: "In-memory spatial bounding box calculations for landmark clustering, executing in under 5 milliseconds on low-power phones.",
      },
      {
        label: "Zero-Lag Category Filters",
        description: "Memoized tag filtering with URL synchronization allows instant bookmarking of custom walking itineraries.",
      },
      {
        label: "A11y Map Navigation",
        description: "ARIA live announcement regions provide spoken directions and location summaries for screen-reader users.",
      },
    ],
    codeArchitecture: {
      filename: "SpatialFilterEngine.ts",
      language: "typescript",
      code: `// Instant In-Memory Categorical & Spatial Sifter
export function filterLandmarks(items: Landmark[], category: string, bounds: BoundingBox): Landmark[] {
  return items.filter(landmark => {
    const matchesCat = category === "all" || landmark.category === category;
    const inBounds = landmark.lat >= bounds.minLat && landmark.lat <= bounds.maxLat &&
                     landmark.lng >= bounds.minLng && landmark.lng <= bounds.maxLng;
    return matchesCat && inBounds;
  });
}`,
      explanation: "Performs client-side geometric coordinate calculations within 1 frame (16ms), eliminating repeated API round trips during mobile map pans.",
    },
    benchmarks: [
      { label: "Gzipped Bundle Size", value: "84 kB", badge: "Tree-Shaken ES Modules" },
      { label: "Spatial Filter Execution", value: "< 16ms", badge: "Sub-Frame Responsiveness" },
      { label: "Screen Reader Support", value: "Full ARIA", badge: "Keyboard & VoiceOver Ready" },
    ],
  },
];

export const CATEGORIES = [
  "All",
  "Luxury & Hospitality",
  "3D & E-Commerce",
  "Web Apps & Portals",
] as const;
