// =============================================================================
// KineFlash PRO - Motor de Interacción, Búsqueda y Cinemática Biomecánica Unificada
// Módulo de Movimientos Analíticos y Actividades de la Vida Diaria (AVD)
// =============================================================================

let currentRegion = "all";
let currentCategory = "all"; // 'all', 'vida-diaria', 'analitico'
let currentPlane = "all";
let searchTerm = "";
let currentTab = "explorer"; // 'explorer', 'flashcards', 'info'
let flashcardIndex = 0;
let flashcardFlipped = false;
let flashcardStreak = 0;

// Estado de pausa por movimiento: { [movementId]: boolean }
const animationPausedState = {};

document.addEventListener("DOMContentLoaded", () => {
  renderStories();
  renderCategoryFilters();
  renderPlaneFilters();
  renderMovementFeed();
  setupSearchListener();
  setupBottomNav();
  setupModalDismiss();
});

// -----------------------------------------------------------------------------
// 1. Carrusel de Historias (Regiones Anatómicas y Vida Diaria)
// -----------------------------------------------------------------------------
function renderStories() {
  const container = document.getElementById("storiesContainer");
  if (!container) return;

  container.innerHTML = ANATOMY_DATABASE.regions.map(region => {
    const isSelected = (region.id === "all" && currentRegion === "all" && currentCategory === "all") ||
                       (region.id === "vida-diaria" && (currentCategory === "vida-diaria" || currentRegion === "vida-diaria")) ||
                       (region.id !== "all" && region.id !== "vida-diaria" && currentRegion === region.id);

    let ringClass = "bg-[#262626] opacity-80 hover:opacity-100";
    if (region.id === "all") {
      ringClass = isSelected ? "story-ring-cyan ring-2 ring-cyan-400 scale-105" : "bg-[#262626]";
    } else if (region.id === "vida-diaria") {
      ringClass = isSelected ? "story-ring-avd ring-2 ring-amber-400 scale-105" : "story-ring-avd opacity-85 hover:opacity-100";
    } else if (isSelected) {
      ringClass = "story-ring-active ring-2 ring-pink-500 scale-105";
    }

    return `
      <div class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group transition-all" onclick="handleStoryClick('${region.id}')">
        <div class="p-[2.5px] rounded-full ${ringClass} transition-transform group-active:scale-95 shadow-md">
          <div class="w-14 h-14 rounded-full bg-[#18181b] p-0.5 flex items-center justify-center border-2 border-black">
            <span class="material-symbols-outlined ${isSelected ? (region.id === 'vida-diaria' ? 'text-amber-400 font-bold' : 'text-accent') : 'text-neutral-300'} text-2xl" data-icon="${region.icon}">${region.icon}</span>
          </div>
        </div>
        <span class="text-[11px] font-medium ${isSelected ? 'text-white font-bold' : 'text-neutral-400'} tracking-tight">${region.name}</span>
      </div>
    `;
  }).join("");
}

function handleStoryClick(regionId) {
  if (regionId === "all") {
    currentRegion = "all";
    currentCategory = "all";
  } else if (regionId === "vida-diaria") {
    currentCategory = "vida-diaria";
    currentRegion = "all";
  } else {
    currentRegion = regionId;
    currentCategory = "all";
  }
  renderStories();
  renderCategoryFilters();
  renderMovementFeed();
}

// -----------------------------------------------------------------------------
// 2. Filtros de Categoría (Vida Diaria vs Analíticos)
// -----------------------------------------------------------------------------
function renderCategoryFilters() {
  const container = document.getElementById("categoryFiltersContainer");
  if (!container) return;

  const totalAll = ANATOMY_DATABASE.movements.length;
  const totalAVD = ANATOMY_DATABASE.movements.filter(m => m.category === "vida-diaria").length;
  const totalAnalytic = ANATOMY_DATABASE.movements.filter(m => m.category === "analitico").length;

  const catOptions = [
    { id: "all", label: `Todos (${totalAll})`, icon: "apps" },
    { id: "vida-diaria", label: `🏃 Vida Diaria (AVD) [${totalAVD}]`, icon: "routine" },
    { id: "analitico", label: `🔬 Analíticos [${totalAnalytic}]`, icon: "biotech" }
  ];

  container.innerHTML = catOptions.map(cat => {
    const isActive = currentCategory === cat.id;
    let activeStyle = "bg-[#18181b] text-neutral-400 border border-[#262626] hover:text-white";

    if (isActive) {
      if (cat.id === "vida-diaria") {
        activeStyle = "bg-gradient-to-r from-amber-500 to-emerald-500 text-black font-extrabold shadow-sm shadow-amber-500/30";
      } else if (cat.id === "analitico") {
        activeStyle = "bg-accent text-black font-extrabold shadow-sm shadow-cyan-500/30";
      } else {
        activeStyle = "bg-white text-black font-extrabold shadow-sm";
      }
    }

    return `
      <button 
        onclick="selectCategory('${cat.id}')"
        class="px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${activeStyle}">
        <span class="material-symbols-outlined text-[14px]">${cat.icon}</span>
        ${cat.label}
      </button>
    `;
  }).join("");
}

function selectCategory(catId) {
  currentCategory = catId;
  if (catId === "vida-diaria") {
    currentRegion = "all";
  }
  renderStories();
  renderCategoryFilters();
  renderMovementFeed();
}

// -----------------------------------------------------------------------------
// 3. Filtros de Planos Anatómicos
// -----------------------------------------------------------------------------
function renderPlaneFilters() {
  const container = document.getElementById("planeFiltersContainer");
  if (!container) return;

  container.innerHTML = ANATOMY_DATABASE.planes.map(p => {
    const isActive = currentPlane === p.id;
    return `
      <button 
        onclick="selectPlane('${p.id}')"
        class="px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all whitespace-nowrap ${
          isActive 
            ? 'bg-accent text-black font-bold shadow-sm shadow-cyan-500/30' 
            : 'bg-[#18181b] text-neutral-400 border border-[#262626] hover:text-white'
        }">
        ${p.name}
      </button>
    `;
  }).join("");
}

function selectPlane(planeId) {
  currentPlane = planeId;
  renderPlaneFilters();
  renderMovementFeed();
}

// -----------------------------------------------------------------------------
// 4. Buscador en Tiempo Real
// -----------------------------------------------------------------------------
function setupSearchListener() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.toLowerCase().trim();
    if (clearBtn) {
      clearBtn.classList.toggle("hidden", searchTerm.length === 0);
    }
    renderMovementFeed();
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchTerm = "";
      clearBtn.classList.add("hidden");
      renderMovementFeed();
      searchInput.focus();
    });
  }
}

// -----------------------------------------------------------------------------
// 5. Generador del Reproductor Visual Unificado por Movimiento (Sin duplicados)
// -----------------------------------------------------------------------------
function renderUnifiedMotionPlayer(movement) {
  const isPaused = !!animationPausedState[movement.id];
  let svgContent = "";

  switch (movement.animationType) {
    // ----------------- CASOS DE ACTIVIDADES DE LA VIDA DIARIA (AVD) -----------------
    case "daily-squat":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <!-- Suelo de Apoyo y Carga en el suelo -->
          <line x1="40" y1="165" x2="280" y2="165" stroke="#334155" stroke-width="3" stroke-dasharray="4 2"/>
          <rect x="175" y="145" width="28" height="20" rx="3" fill="#f59e0b" fill-opacity="0.8" stroke="#fbbf24" stroke-width="1.5"/>
          <text x="178" y="158" fill="#000" font-size="8" font-family="JetBrains Mono" font-weight="bold">CARGA</text>

          <!-- Figura en Sentadilla Funcional (Bucle Dinámico) -->
          <g class="motion-loop-daily-squat">
            <!-- Cabeza -->
            <circle cx="130" cy="40" r="9" fill="#e2e8f0"/>
            
            <!-- Tronco e Inclinación Neutra (Erectores Espinales Resaltados) -->
            <line x1="130" y1="48" x2="142" y2="92" stroke="#475569" stroke-width="12" stroke-linecap="round"/>
            <path d="M 126 50 L 138 92" stroke="#10b981" stroke-width="5" stroke-linecap="round" class="muscle-contract"/>
            
            <!-- Brazo que se extiende hacia el objeto del suelo -->
            <line x1="130" y1="52" x2="175" y2="120" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
            
            <!-- Cadera (Glúteo Mayor Resaltado en Contracción) -->
            <circle cx="142" cy="92" r="8" fill="#0f172a" stroke="#00f2fe" stroke-width="2.5"/>
            <path d="M 136 82 Q 120 95 142 98" fill="none" stroke="#00f2fe" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
            
            <!-- Muslo / Fémur (Cuádriceps Resaltado) -->
            <line x1="142" y1="92" x2="172" y2="128" stroke="#475569" stroke-width="10" stroke-linecap="round"/>
            <path d="M 144 88 L 170 124" stroke="#00f2fe" stroke-width="6" stroke-linecap="round" class="muscle-contract"/>
            
            <!-- Rodilla -->
            <circle cx="172" cy="128" r="6" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
            
            <!-- Pierna / Tibia -->
            <line x1="172" y1="128" x2="160" y2="165" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
            <!-- Pie en el suelo -->
            <line x1="150" y1="165" x2="178" y2="165" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"/>
          </g>

          <!-- Marcadores Anatómicos -->
          <text x="25" y="35" fill="#10b981" font-size="9" font-family="JetBrains Mono" font-weight="bold">🛡️ Fijador: Erectores + Core</text>
          <text x="25" y="70" fill="#00f2fe" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Agonistas: Glúteo Mayor + Cuádriceps</text>
          <text x="25" y="85" fill="#f59e0b" font-size="9" font-family="JetBrains Mono">🔗 Bisagra de Cadera (Hip Hinge)</text>
        </svg>
      `;
      break;

    case "daily-shelf-reach":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <!-- Estante Superior con Objeto -->
          <line x1="190" y1="35" x2="295" y2="35" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
          <rect x="220" y="15" width="22" height="20" rx="3" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/>
          <text x="248" y="28" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">ESTANTE</text>

          <!-- Figura Alcanzando en Elevación y Rotación Escapular -->
          <!-- Columna y Tronco -->
          <line x1="120" y1="65" x2="120" y2="160" stroke="#334155" stroke-width="14" stroke-linecap="round"/>
          <circle cx="120" cy="50" r="9" fill="#e2e8f0"/>
          
          <!-- Escápula Rotando Hacia Arriba (Serrato Anterior Resaltado) -->
          <path d="M 125 70 L 140 85 L 132 105 Z" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <path d="M 115 85 Q 130 92 138 85" stroke="#10b981" stroke-width="5" stroke-linecap="round" class="muscle-contract"/>

          <!-- Hombro y Brazo Elevándose en Bucle -->
          <circle cx="130" cy="68" r="8" fill="#0f172a" stroke="#00f2fe" stroke-width="2.5"/>
          <g class="motion-loop-daily-shelf-reach">
            <!-- Húmero Elevándose -->
            <line x1="130" y1="68" x2="185" y2="40" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
            <!-- Codo extendiéndose -->
            <circle cx="185" cy="40" r="5" fill="#0f172a" stroke="#00f2fe" stroke-width="2"/>
            <!-- Antebrazo y Mano alcanzando -->
            <line x1="185" y1="40" x2="225" y2="25" stroke="#cbd5e1" stroke-width="7" stroke-linecap="round"/>
            <circle cx="225" cy="25" r="4" fill="#fcb045"/>
          </g>

          <!-- Deltoides en Contracción en el Hombro -->
          <path d="M 125 62 Q 145 60 148 72" stroke="#00f2fe" stroke-width="7" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="125" cy="62" r="4" fill="#00f2fe" class="origin-indicator"/>

          <text x="15" y="35" fill="#00f2fe" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Deltoides + Serrato Anterior</text>
          <text x="15" y="50" fill="#10b981" font-size="9" font-family="JetBrains Mono">🛡️ Fijador: Manguito Rotador</text>
          <text x="15" y="150" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Ritmo Escápulo-Humeral 2:1</text>
        </svg>
      `;
      break;

    case "daily-door-push":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <!-- Puerta Pesada Vertical -->
          <rect x="235" y="20" width="14" height="145" rx="3" fill="#334155" stroke="#64748b" stroke-width="2"/>
          <circle cx="242" cy="95" r="3" fill="#f59e0b"/>
          <text x="255" y="98" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">PUERTA</text>

          <!-- Figura en Postura de Zancada Empujando -->
          <line x1="85" y1="165" x2="250" y2="165" stroke="#334155" stroke-width="2"/>
          
          <!-- Pierna Trasera que Empuja contra el Suelo -->
          <line x1="100" y1="165" x2="125" y2="125" stroke="#94a3b8" stroke-width="9" stroke-linecap="round"/>
          <line x1="125" y1="125" x2="145" y2="105" stroke="#475569" stroke-width="11" stroke-linecap="round"/>
          
          <!-- Pierna Delantera en Soporte -->
          <line x1="160" y1="165" x2="168" y2="135" stroke="#94a3b8" stroke-width="9" stroke-linecap="round"/>
          <line x1="168" y1="135" x2="152" y2="105" stroke="#475569" stroke-width="11" stroke-linecap="round"/>

          <!-- Tronco y Brazos con Empuje Dinámico -->
          <g class="motion-loop-daily-door-push">
            <!-- Cabeza -->
            <circle cx="160" cy="50" r="9" fill="#e2e8f0"/>
            <!-- Tronco Inclinado hacia adelante -->
            <line x1="148" y1="105" x2="165" y2="60" stroke="#475569" stroke-width="14" stroke-linecap="round"/>
            <!-- Core Abdominal Fijador Torsional -->
            <line x1="156" y1="72" x2="150" y2="98" stroke="#10b981" stroke-width="6" stroke-linecap="round" class="muscle-contract"/>
            <!-- Pectoral Mayor Resaltado en Contracción -->
            <path d="M 166 65 Q 185 70 188 78" stroke="#00f2fe" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
            <!-- Brazo Extendiéndose y Empujando -->
            <line x1="166" y1="65" x2="200" y2="82" stroke="#94a3b8" stroke-width="9" stroke-linecap="round"/>
            <circle cx="200" cy="82" r="5" fill="#0f172a" stroke="#00f2fe" stroke-width="2"/>
            <line x1="200" y1="82" x2="235" y2="85" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>
            <rect x="233" y="80" width="4" height="12" rx="1" fill="#f59e0b"/>
          </g>

          <text x="20" y="30" fill="#00f2fe" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Pectoral Mayor + Tríceps</text>
          <text x="20" y="45" fill="#10b981" font-size="9" font-family="JetBrains Mono">🛡️ Fijador: Core Antirretroceso</text>
          <text x="20" y="60" fill="#f59e0b" font-size="8" font-family="JetBrains Mono">Cadena Cinética desde el Suelo</text>
        </svg>
      `;
      break;

    case "daily-stairs-climb":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <!-- Gradas / Escalones -->
          <path d="M 120 165 L 160 165 L 160 135 L 210 135 L 210 105 L 260 105 L 260 75 L 305 75" fill="none" stroke="#475569" stroke-width="3"/>
          <text x="265" y="68" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">ESCALÓN</text>

          <!-- Figura Subiendo el Escalón (Elevación Unipodal) -->
          <g class="motion-loop-daily-stairs-climb">
            <!-- Cabeza y Tronco Erguido -->
            <circle cx="175" cy="35" r="9" fill="#e2e8f0"/>
            <line x1="175" y1="44" x2="175" y2="88" stroke="#475569" stroke-width="13" stroke-linecap="round"/>
            
            <!-- Pelvis (Glúteo Medio Fijador Antivalgo Resaltado) -->
            <circle cx="175" cy="88" r="7" fill="#0f172a" stroke="#10b981" stroke-width="2.5"/>
            <path d="M 166 82 Q 160 92 172 95" stroke="#10b981" stroke-width="6" stroke-linecap="round" class="muscle-contract"/>
            
            <!-- Miembro de Apoyo en Escalón: Extensión Potente -->
            <!-- Cadera / Glúteo Mayor -->
            <path d="M 172 85 L 195 105" stroke="#00f2fe" stroke-width="10" stroke-linecap="round" class="muscle-contract"/>
            <!-- Rodilla Extendiéndose -->
            <circle cx="195" cy="105" r="6" fill="#0f172a" stroke="#00f2fe" stroke-width="2"/>
            <line x1="195" y1="105" x2="190" y2="135" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>
            <!-- Pie apoyado en peldaño -->
            <line x1="180" y1="135" x2="208" y2="135" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"/>

            <!-- Pierna Trasera en Despegue -->
            <line x1="175" y1="88" x2="150" y2="120" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
            <line x1="150" y1="120" x2="145" y2="165" stroke="#475569" stroke-width="7" stroke-linecap="round"/>
          </g>

          <text x="20" y="30" fill="#00f2fe" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Cuádriceps + Glúteo Mayor</text>
          <text x="20" y="45" fill="#10b981" font-size="9" font-family="JetBrains Mono">🛡️ Fijador: Glúteo Medio (Pilar Pélvico)</text>
          <text x="20" y="60" fill="#f59e0b" font-size="8" font-family="JetBrains Mono">Carga Monopodal x3 Peso Corporal</text>
        </svg>
      `;
      break;

    case "daily-trunk-rotation":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <!-- Pelvis y Caderas Fijas (Base Estable) -->
          <line x1="120" y1="140" x2="200" y2="140" stroke="#334155" stroke-width="10" stroke-linecap="round"/>
          <circle cx="160" cy="140" r="7" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
          <text x="135" y="158" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">PELVIS FIJA</text>

          <!-- Columna y Caja Torácica Girando en Bucle Axial -->
          <g class="motion-loop-daily-trunk-rotation">
            <!-- Eje Espinal Central -->
            <line x1="160" y1="50" x2="160" y2="140" stroke="#475569" stroke-width="8" stroke-dasharray="3 2"/>
            
            <!-- Hombros Girando en el Plano Transversal -->
            <line x1="110" y1="65" x2="210" y2="65" stroke="#94a3b8" stroke-width="12" stroke-linecap="round"/>
            <circle cx="160" cy="40" r="10" fill="#e2e8f0"/>
            
            <!-- Nariz / Dirección de la Mirada Gira -->
            <line x1="160" y1="40" x2="175" y2="35" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>

            <!-- Par de Fuerzas Cruzado de Oblicuos (Contracción Resaltada) -->
            <!-- Oblicuo Externo Opuesto -->
            <path d="M 125 70 Q 150 95 170 135" stroke="#00f2fe" stroke-width="7" stroke-linecap="round" class="muscle-contract"/>
            <!-- Oblicuo Interno Mismo Lado -->
            <path d="M 195 70 Q 170 95 150 135" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" class="muscle-contract"/>
          </g>

          <!-- Faja Estabilizadora del Transverso (Protector Discal) -->
          <ellipse cx="160" cy="105" rx="35" ry="12" fill="none" stroke="#10b981" stroke-width="2.5" stroke-dasharray="4 2"/>
          
          <text x="20" y="30" fill="#00f2fe" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Par Cruzado Oblicuo Int/Ext</text>
          <text x="20" y="45" fill="#10b981" font-size="9" font-family="JetBrains Mono">🛡️ Fijador: Transverso (Faja Lumbar)</text>
          <text x="20" y="115" fill="#f59e0b" font-size="8" font-family="JetBrains Mono">Torsión Torácica 35°</text>
        </svg>
      `;
      break;

    // ----------------- CASOS DE MOVIMIENTOS ANALÍTICOS BASE -----------------
    case "elbow-flexion":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <defs>
            <linearGradient id="efGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00f2fe"/>
              <stop offset="100%" stop-color="#006a70"/>
            </linearGradient>
          </defs>
          <line x1="160" y1="22" x2="160" y2="105" stroke="#475569" stroke-width="14" stroke-linecap="round"/>
          <circle cx="160" cy="22" r="10" fill="#64748b"/>
          <text x="175" y="30" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">HÚMERO</text>
          <circle cx="160" cy="105" r="7" fill="#0f172a" stroke="#00f2fe" stroke-width="2"/>
          <text x="175" y="110" fill="#38bdf8" font-size="9" font-family="JetBrains Mono">Eje Tróclea</text>
          <g class="motion-loop-elbow-flexion">
            <line x1="160" y1="105" x2="160" y2="170" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
            <circle cx="160" cy="170" r="6" fill="#cbd5e1"/>
            <text x="172" y="152" fill="#cbd5e1" font-size="9" font-family="JetBrains Mono">Cúbito/Radio</text>
            <circle cx="160" cy="120" r="4" fill="#fcb045" stroke="#fff" stroke-width="1.5"/>
          </g>
          <path d="M 152 45 Q 135 75 152 105" fill="none" stroke="url(#efGrad)" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="152" cy="45" r="4.5" fill="#00f2fe" stroke="#fff" stroke-width="1.5" class="origin-indicator"/>
          <text x="45" y="55" fill="#00f2fe" font-size="10" font-family="JetBrains Mono" font-weight="bold">📍 Origen: Húmero distal</text>
          <text x="45" y="90" fill="#38bdf8" font-size="10" font-family="JetBrains Mono">⚡ Braquial + Bíceps</text>
        </svg>
      `;
      break;

    case "elbow-extension":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <line x1="160" y1="22" x2="160" y2="105" stroke="#475569" stroke-width="14" stroke-linecap="round"/>
          <circle cx="160" cy="22" r="10" fill="#64748b"/>
          <text x="175" y="30" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">HÚMERO</text>
          <circle cx="160" cy="105" r="7" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <path d="M 168 35 Q 185 70 166 102" fill="none" stroke="#fd1d1d" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="168" cy="35" r="4" fill="#fd1d1d" stroke="#fff" stroke-width="1.5" class="origin-indicator"/>
          <text x="180" y="50" fill="#ff7675" font-size="10" font-family="JetBrains Mono" font-weight="bold">📍 Tríceps (3 Cabezas)</text>
          <g class="motion-loop-elbow-extension">
            <line x1="160" y1="105" x2="160" y2="170" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
            <circle cx="160" cy="170" r="6" fill="#cbd5e1"/>
          </g>
          <text x="35" y="95" fill="#38bdf8" font-size="10" font-family="JetBrains Mono">⚡ Tríceps + Ancóneo</text>
        </svg>
      `;
      break;

    case "shoulder-abduction":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <path d="M 160 40 L 160 160" stroke="#334155" stroke-width="16" stroke-linecap="round"/>
          <path d="M 160 40 L 130 65 L 145 95 Z" fill="#1e293b" stroke="#475569"/>
          <text x="75" y="65" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">ESCÁPULA</text>
          <circle cx="160" cy="40" r="8" fill="#d5baff" stroke="#833ab4" stroke-width="2"/>
          <text x="175" y="40" fill="#d5baff" font-size="9" font-family="JetBrains Mono">Acromion</text>
          <g class="motion-loop-shoulder-abduction">
            <line x1="160" y1="40" x2="160" y2="125" stroke="#94a3b8" stroke-width="12" stroke-linecap="round"/>
            <circle cx="160" cy="125" r="7" fill="#cbd5e1"/>
            <circle cx="160" cy="75" r="4" fill="#fcb045" stroke="#fff" stroke-width="1.5"/>
          </g>
          <path d="M 160 40 Q 185 55 165 75" fill="none" stroke="#d5baff" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="160" cy="40" r="4.5" fill="#d5baff" stroke="#fff" stroke-width="1.5" class="origin-indicator"/>
          <text x="40" y="115" fill="#d5baff" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Deltoides (3 Cabezas)</text>
          <text x="40" y="130" fill="#cbd5e1" font-size="9" font-family="JetBrains Mono">Acromial + Clavicular + Espinal</text>
        </svg>
      `;
      break;

    case "shoulder-flexion":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <line x1="155" y1="35" x2="155" y2="160" stroke="#334155" stroke-width="18" stroke-linecap="round"/>
          <circle cx="155" cy="35" r="9" fill="#00f2fe"/>
          <text x="75" y="40" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">CLAVÍCULA</text>
          <g class="motion-loop-shoulder-flexion">
            <line x1="155" y1="35" x2="155" y2="120" stroke="#94a3b8" stroke-width="12" stroke-linecap="round"/>
            <circle cx="155" cy="120" r="6" fill="#cbd5e1"/>
          </g>
          <path d="M 155 35 Q 130 55 150 75" fill="none" stroke="#00f2fe" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="155" cy="35" r="4.5" fill="#00f2fe" stroke="#fff" stroke-width="1.5" class="origin-indicator"/>
          <text x="35" y="105" fill="#00f2fe" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Deltoides Clavicular</text>
          <text x="35" y="120" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">+ Coracobraquial</text>
        </svg>
      `;
      break;

    case "knee-extension":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <line x1="100" y1="95" x2="160" y2="95" stroke="#475569" stroke-width="14" stroke-linecap="round"/>
          <text x="95" y="80" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">FÉMUR</text>
          <circle cx="160" cy="95" r="7" fill="#0f172a" stroke="#00f2fe" stroke-width="2"/>
          <ellipse cx="162" cy="88" rx="5" ry="4" fill="#fcb045"/>
          <text x="175" y="88" fill="#fcb045" font-size="9" font-family="JetBrains Mono">Rótula</text>
          <path d="M 105 85 Q 135 75 162 88" fill="none" stroke="#00f2fe" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="105" cy="85" r="4.5" fill="#00f2fe" stroke="#fff" stroke-width="1.5" class="origin-indicator"/>
          <g class="motion-loop-knee-extension">
            <line x1="160" y1="95" x2="225" y2="95" stroke="#94a3b8" stroke-width="11" stroke-linecap="round"/>
            <circle cx="225" cy="95" r="6" fill="#cbd5e1"/>
          </g>
          <text x="35" y="135" fill="#00f2fe" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Cuádriceps (4 Cabezas)</text>
          <text x="35" y="150" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Recto + Vasto Med/Lat/Interm</text>
        </svg>
      `;
      break;

    case "knee-flexion":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <line x1="160" y1="22" x2="160" y2="95" stroke="#475569" stroke-width="14" stroke-linecap="round"/>
          <circle cx="160" cy="95" r="7" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="90" y="45" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">FÉMUR</text>
          <path d="M 166 30 Q 185 65 166 92" fill="none" stroke="#833ab4" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="166" cy="30" r="4.5" fill="#d5baff" stroke="#fff" stroke-width="1.5" class="origin-indicator"/>
          <text x="180" y="35" fill="#d5baff" font-size="9" font-family="JetBrains Mono">Tuberosidad Isquiática</text>
          <g class="motion-loop-knee-flexion">
            <line x1="160" y1="95" x2="160" y2="165" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
            <circle cx="160" cy="165" r="6" fill="#cbd5e1"/>
          </g>
          <text x="35" y="120" fill="#d5baff" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Isquiotibiales + Poplíteo</text>
          <text x="35" y="135" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Bíceps Femoral, Semis y Gemelos</text>
        </svg>
      `;
      break;

    case "hip-flexion":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <line x1="160" y1="20" x2="160" y2="65" stroke="#334155" stroke-width="16" stroke-linecap="round"/>
          <circle cx="160" cy="65" r="8" fill="#0f172a" stroke="#00f2fe" stroke-width="2"/>
          <text x="90" y="35" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">PELVIS/LUMBAR</text>
          <path d="M 160 25 Q 140 45 155 75" fill="none" stroke="#00f2fe" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="160" cy="25" r="4.5" fill="#00f2fe" stroke="#fff" stroke-width="1.5" class="origin-indicator"/>
          <text x="40" y="55" fill="#00f2fe" font-size="9" font-family="JetBrains Mono">T12-L5 y Fosa Ilíaca</text>
          <g class="motion-loop-hip-flexion">
            <line x1="160" y1="65" x2="160" y2="145" stroke="#94a3b8" stroke-width="12" stroke-linecap="round"/>
            <circle cx="160" cy="145" r="7" fill="#cbd5e1"/>
          </g>
          <text x="40" y="115" fill="#00f2fe" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Psoas Mayor + Ilíaco</text>
          <text x="40" y="130" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Recto Femoral, Sartorio y TFL</text>
        </svg>
      `;
      break;

    case "hip-abduction":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <path d="M 130 50 Q 160 30 190 50" fill="none" stroke="#475569" stroke-width="12"/>
          <circle cx="160" cy="65" r="8" fill="#0f172a" stroke="#d5baff" stroke-width="2"/>
          <text x="95" y="40" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Cresta Ilíaca</text>
          <path d="M 175 40 Q 195 55 170 75" fill="none" stroke="#d5baff" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="175" cy="40" r="4.5" fill="#d5baff" stroke="#fff" stroke-width="1.5" class="origin-indicator"/>
          <g class="motion-loop-hip-abduction">
            <line x1="160" y1="65" x2="160" y2="150" stroke="#94a3b8" stroke-width="12" stroke-linecap="round"/>
            <circle cx="160" cy="150" r="6" fill="#cbd5e1"/>
          </g>
          <text x="35" y="110" fill="#d5baff" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Glúteo Medio + Menor</text>
          <text x="35" y="125" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Pilar de Trendelenburg</text>
        </svg>
      `;
      break;

    case "ankle-dorsiflexion":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <line x1="160" y1="20" x2="160" y2="125" stroke="#475569" stroke-width="13" stroke-linecap="round"/>
          <text x="95" y="55" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">TIBIA</text>
          <circle cx="160" cy="125" r="7" fill="#0f172a" stroke="#00f2fe" stroke-width="2"/>
          <path d="M 152 40 Q 145 85 152 125" fill="none" stroke="#00f2fe" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="152" cy="40" r="4.5" fill="#00f2fe" stroke="#fff" stroke-width="1.5" class="origin-indicator"/>
          <g class="motion-loop-ankle-dorsiflexion">
            <line x1="160" y1="125" x2="220" y2="135" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
            <circle cx="220" cy="135" r="6" fill="#cbd5e1"/>
            <text x="210" y="155" fill="#cbd5e1" font-size="9" font-family="JetBrains Mono">Dorso Pie</text>
          </g>
          <text x="35" y="95" fill="#00f2fe" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Tibial Anterior + Extensores</text>
          <text x="35" y="110" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Largo Dedos, Hallux y 3er Peroneo</text>
        </svg>
      `;
      break;

    case "ankle-plantarflexion":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <line x1="160" y1="20" x2="160" y2="125" stroke="#475569" stroke-width="13" stroke-linecap="round"/>
          <circle cx="160" cy="125" r="7" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <text x="80" y="45" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">TIBIA/FÉMUR</text>
          <path d="M 166 30 Q 185 75 166 122" fill="none" stroke="#fd1d1d" stroke-width="9" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="166" cy="30" r="4.5" fill="#ff7675" stroke="#fff" stroke-width="1.5" class="origin-indicator"/>
          <text x="180" y="80" fill="#ff7675" font-size="9" font-family="JetBrains Mono">Tendón Aquiles</text>
          <g class="motion-loop-ankle-plantarflexion">
            <line x1="160" y1="125" x2="215" y2="160" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
            <circle cx="215" cy="160" r="6" fill="#cbd5e1"/>
          </g>
          <text x="35" y="110" fill="#ff7675" font-size="10" font-family="JetBrains Mono" font-weight="bold">⚡ Gastrocnemios + Sóleo</text>
          <text x="35" y="125" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Tibial Posterior y Flexores</text>
        </svg>
      `;
      break;

    default:
      svgContent = `<div class="h-44 flex items-center justify-center text-xs text-neutral-500 font-mono">Cinemática en bucle activa</div>`;
  }

  return `
    <div class="relative w-full overflow-hidden rounded-xl border border-[#262626] shadow-inner bg-black ${isPaused ? 'animation-paused' : ''}">
      <!-- Header Superior del Reproductor Único -->
      <div class="absolute top-2 left-2 right-2 z-10 flex items-center justify-between pointer-events-none">
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-[#333] text-[9px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          ${movement.category === 'vida-diaria' ? 'Cinemática AVD 60 FPS' : 'Loop Cinemático 60 FPS'}
        </span>
        <button 
          onclick="togglePauseMovement('${movement.id}')"
          class="pointer-events-auto p-1 rounded-full bg-black/80 hover:bg-[#262626] border border-[#333] text-neutral-300 hover:text-white transition-all shadow-sm">
          <span class="material-symbols-outlined text-[15px]">${isPaused ? 'play_arrow' : 'pause'}</span>
        </button>
      </div>

      <!-- Animación Biomecánica en Bucle Única -->
      ${svgContent}

      <!-- Pie del Reproductor con Músculos Activos Resaltados -->
      <div class="px-3 py-1.5 bg-[#141416] border-t border-[#222] flex items-center justify-between text-[10px] font-mono">
        <span class="text-neutral-400 truncate">
          <strong class="text-accent">Resaltado:</strong> ${movement.highlightedMuscle}
        </span>
        <span class="text-neutral-500 shrink-0 ml-2">ROM: ${movement.rom.split(" ")[0]}</span>
      </div>
    </div>
  `;
}

function togglePauseMovement(movementId) {
  animationPausedState[movementId] = !animationPausedState[movementId];
  renderMovementFeed();
}

// -----------------------------------------------------------------------------
// 6. Filtrado y Renderizado de Tarjetas de Movimiento
// -----------------------------------------------------------------------------
function getFilteredMovements() {
  return ANATOMY_DATABASE.movements.filter(m => {
    // Filtro por categoría (Todos / Vida Diaria / Analíticos)
    const matchesCategory = currentCategory === "all" || m.category === currentCategory;

    // Filtro por región (historias)
    const matchesRegion = currentRegion === "all" || 
                          m.region === currentRegion ||
                          (currentRegion === "vida-diaria" && m.category === "vida-diaria");

    // Filtro por plano
    const matchesPlane = currentPlane === "all" || m.plane === currentPlane;

    // Filtro por búsqueda textual
    const matchesSearch = !searchTerm || 
      m.name.toLowerCase().includes(searchTerm) ||
      m.joint.toLowerCase().includes(searchTerm) ||
      m.primaryMuscle.toLowerCase().includes(searchTerm) ||
      (m.dailyAction && m.dailyAction.toLowerCase().includes(searchTerm)) ||
      (m.stabilizers && m.stabilizers.toLowerCase().includes(searchTerm)) ||
      m.synergistMuscles.some(s => s.toLowerCase().includes(searchTerm)) ||
      m.searchTerms.some(t => t.toLowerCase().includes(searchTerm)) ||
      m.muscles.some(muscle => 
        muscle.name.toLowerCase().includes(searchTerm) || 
        muscle.origin.toLowerCase().includes(searchTerm) ||
        muscle.insertion.toLowerCase().includes(searchTerm) ||
        muscle.role.toLowerCase().includes(searchTerm)
      );

    return matchesCategory && matchesRegion && matchesPlane && matchesSearch;
  });
}

function renderMovementFeed() {
  const container = document.getElementById("feedContainer");
  const countIndicator = document.getElementById("movementCountIndicator");
  if (!container) return;

  const movements = getFilteredMovements();

  if (countIndicator) {
    countIndicator.textContent = `${movements.length} de ${ANATOMY_DATABASE.movements.length} movimientos`;
  }

  if (movements.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-[#121212] border border-[#262626] rounded-2xl flex flex-col items-center gap-3">
        <span class="material-symbols-outlined text-4xl text-neutral-500">search_off</span>
        <p class="text-sm text-neutral-300 font-medium">No se encontraron movimientos para tu búsqueda.</p>
        <p class="text-xs text-neutral-500">Prueba buscando "sentadilla", "estante alto", "puerta", "escaleras", "deltoides" o "codo".</p>
        <button onclick="resetFilters()" class="mt-2 px-4 py-1.5 rounded-lg bg-accent text-black text-xs font-bold">
          Restablecer todos los filtros
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = movements.map(m => {
    const isAVD = m.category === "vida-diaria";
    const initials = isAVD ? "AVD" : m.name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
    
    const planeColors = {
      Sagital: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
      Frontal: "bg-purple-950/80 text-purple-300 border-purple-500/40",
      Transversal: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
      Multiplanar: "bg-amber-950/80 text-amber-300 border-amber-500/40"
    };
    const planeStyle = planeColors[m.plane] || planeColors.Sagital;

    return `
      <article class="bg-[#121212] border ${isAVD ? 'border-amber-500/40 shadow-amber-950/20' : 'border-[#262626]'} rounded-2xl overflow-hidden hover:border-neutral-500 transition-all shadow-xl">
        
        <!-- Post Header -->
        <div class="flex items-center justify-between p-3.5 border-b border-[#1f1f1f] ${isAVD ? 'bg-gradient-to-r from-[#1c1811] to-[#121212]' : 'bg-[#18181b]/70'}">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full ${isAVD ? 'bg-gradient-to-tr from-amber-400 to-emerald-400' : 'bg-gradient-to-tr from-cyan-500 to-blue-600'} flex items-center justify-center text-black font-extrabold text-xs shadow-md">
              ${initials}
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h3 class="text-sm font-bold text-white tracking-tight">${m.name}</h3>
                <span class="w-1 h-1 rounded-full bg-neutral-600"></span>
                <span class="text-[10px] font-mono font-semibold ${isAVD ? 'text-amber-400' : 'text-accent'}">${m.code}</span>
              </div>
              <p class="text-[11px] text-neutral-400 leading-tight">${m.regionLabel}</p>
            </div>
          </div>
          
          <!-- Etiquetas: Vida Diaria / Plano -->
          <div class="flex flex-col items-end gap-1">
            ${isAVD ? `
              <span class="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-950/90 text-amber-300 border border-amber-500/50 flex items-center gap-1 shadow-sm">
                <span class="material-symbols-outlined text-[12px]">routine</span>
                VIDA DIARIA
              </span>
            ` : ''}
            <span class="px-2 py-0.5 rounded-full text-[9px] font-mono font-medium tracking-wide border flex items-center gap-1 ${planeStyle}">
              <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              Plano ${m.plane}
            </span>
          </div>
        </div>

        <!-- REPRODUCTOR VISUAL UNIFICADO DE CINEMÁTICA BIOMECÁNICA -->
        <div class="p-3 bg-black/50 border-b border-[#222]">
          ${renderUnifiedMotionPlayer(m)}
        </div>

        <!-- Biomechanical Body -->
        <div class="p-3.5 flex flex-col gap-3">
          
          <!-- Acción Cotidiana Específica (Para AVD) -->
          ${m.dailyAction ? `
            <div class="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40">
              <span class="text-[10px] uppercase font-mono font-bold text-amber-400 block mb-1 flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">task_alt</span>
                Acción Funcional en la Vida Diaria:
              </span>
              <p class="text-xs text-neutral-200 leading-relaxed">${m.dailyAction}</p>
            </div>
          ` : ''}

          <!-- Articulaciones y Movimientos Involucrados -->
          <div class="p-3 rounded-xl bg-black/40 border border-[#262626]">
            <span class="text-[10px] uppercase font-mono font-bold text-cyan-400 block mb-1 flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px]">hub</span>
              Articulaciones y Movimientos Involucrados:
            </span>
            <p class="text-xs text-neutral-300 leading-relaxed">${m.joint}</p>
            <div class="flex items-center justify-between text-[10px] font-mono text-neutral-400 mt-2 pt-2 border-t border-[#262626]">
              <span><strong>ROM:</strong> ${m.rom}</span>
              <span><strong>Eje:</strong> ${m.axis.split(" ")[0]} ${m.axis.split(" ")[1] || ''}</span>
            </div>
          </div>

          <!-- Músculos Fijadores / Estabilizadores (Requisito Explícito) -->
          ${m.stabilizers ? `
            <div class="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
              <span class="text-[10px] uppercase font-mono font-bold text-emerald-400 block mb-0.5 flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">shield</span>
                Músculos Fijadores / Estabilizadores de Cadena:
              </span>
              <p class="text-xs text-neutral-300 leading-relaxed font-medium">${m.stabilizers}</p>
            </div>
          ` : ''}

          <!-- Lista Interactiva de Músculos (Agónicos, Secundarios, Sinergistas y Fijadores) -->
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase font-mono tracking-wider text-neutral-400 font-bold">
                Músculos Participantes Detallados (${m.muscles.length}):
              </span>
              <span class="text-[9px] font-mono text-accent">Toca para abrir Ficha</span>
            </div>

            <div class="grid grid-cols-1 gap-1.5">
              ${m.muscles.map(muscle => {
                let badgeClass = "bg-cyan-950/80 text-cyan-300 border-cyan-800";
                let cardBg = "bg-[#162024] border-cyan-800/40 hover:border-cyan-400";

                if (muscle.roleType === 'secondary') {
                  badgeClass = "bg-amber-950/80 text-amber-300 border-amber-800";
                  cardBg = "bg-[#1c1c18] border-amber-900/30 hover:border-amber-400";
                } else if (muscle.roleType === 'synergist') {
                  badgeClass = "bg-neutral-800 text-neutral-300 border-neutral-700";
                  cardBg = "bg-[#18181b] border-[#262626] hover:border-neutral-500";
                } else if (muscle.roleType === 'stabilizer') {
                  badgeClass = "bg-emerald-950/80 text-emerald-300 border-emerald-800";
                  cardBg = "bg-[#112218] border-emerald-900/40 hover:border-emerald-400";
                }

                return `
                  <button 
                    onclick="openMuscleModal('${m.id}', '${muscle.id}')"
                    class="text-left p-2.5 rounded-xl border transition-all flex items-start justify-between group active:scale-98 ${cardBg}">
                    <div class="flex-1 pr-2">
                      <div class="flex items-center gap-1.5 mb-0.5">
                        <span class="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded border font-bold ${badgeClass}">
                          ${muscle.role.split(" ")[0]} ${muscle.role.split(" ")[1] || ''}
                        </span>
                        <span class="text-[10px] font-mono text-neutral-400 truncate">
                          ${muscle.compartment.split("(")[0]}
                        </span>
                      </div>
                      <span class="text-xs font-bold text-white group-hover:text-accent transition-colors flex items-center gap-1 mt-0.5">
                        ${muscle.name}
                      </span>
                      <span class="text-[10px] text-neutral-400 italic block mt-0.5 line-clamp-1">
                        ${muscle.scientificName}
                      </span>
                    </div>
                    <span class="material-symbols-outlined text-sm text-neutral-500 group-hover:text-accent transition-colors shrink-0 mt-2">
                      chevron_right
                    </span>
                  </button>
                `;
              }).join("")}
            </div>
          </div>
        </div>

        <!-- Post Action Strip -->
        <div class="px-3.5 py-2.5 bg-black/30 border-t border-[#1f1f1f] flex items-center justify-between text-xs text-neutral-400">
          <span class="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px] ${isAVD ? 'text-amber-400' : 'text-accent'}">fitness_center</span>
            Palanca: ${m.lever.split(" ")[0]} ${m.lever.split(" ")[1] || ''}
          </span>
          <button 
            onclick="openQuickStudy('${m.id}')"
            class="text-[11px] font-mono font-bold ${isAVD ? 'text-amber-400' : 'text-accent'} hover:underline flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">quiz</span>
            Probar flashcard
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function resetFilters() {
  currentRegion = "all";
  currentCategory = "all";
  currentPlane = "all";
  searchTerm = "";
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";
  renderStories();
  renderCategoryFilters();
  renderPlaneFilters();
  renderMovementFeed();
}

// -----------------------------------------------------------------------------
// 7. Modal de Ficha Muscular Completa (Incluye Fijadores y Estabilizadores)
// -----------------------------------------------------------------------------
function openMuscleModal(movementId, muscleId) {
  const movement = ANATOMY_DATABASE.movements.find(m => m.id === movementId);
  if (!movement) return;

  const muscle = movement.muscles.find(mu => mu.id === muscleId);
  if (!muscle) return;

  const modal = document.getElementById("muscleModal");
  const modalContent = document.getElementById("modalContent");
  if (!modal || !modalContent) return;

  let roleColor = "bg-cyan-950 text-cyan-300 border-cyan-800";
  if (muscle.roleType === 'secondary') roleColor = "bg-amber-950 text-amber-300 border-amber-800";
  if (muscle.roleType === 'synergist') roleColor = "bg-neutral-800 text-neutral-300 border-neutral-700";
  if (muscle.roleType === 'stabilizer') roleColor = "bg-emerald-950 text-emerald-300 border-emerald-800";

  modalContent.innerHTML = `
    <!-- Modal Header -->
    <div class="p-4 border-b border-[#262626] flex items-start justify-between bg-[#18181b]">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${roleColor}">
            ${muscle.role}
          </span>
          <span class="text-[10px] font-mono text-neutral-400">${muscle.compartment}</span>
        </div>
        <h2 class="text-base font-extrabold text-white tracking-tight">${muscle.name}</h2>
        <p class="text-xs text-neutral-400 italic">${muscle.scientificName}</p>
      </div>
      <button onclick="closeMuscleModal()" class="w-8 h-8 rounded-full bg-black/60 border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-white transition-all">
        <span class="material-symbols-outlined text-lg">close</span>
      </button>
    </div>

    <!-- Modal Body -->
    <div class="p-4 space-y-3.5 max-h-[75vh] overflow-y-auto">
      
      <!-- Mini Reproductor Biomecánico del Movimiento en Bucle -->
      <div class="rounded-xl overflow-hidden border border-[#262626] bg-black">
        <div class="px-3 py-1.5 bg-[#18181b] border-b border-[#262626] flex items-center justify-between">
          <span class="text-[10px] font-mono font-bold ${movement.category === 'vida-diaria' ? 'text-amber-400' : 'text-accent'} flex items-center gap-1">
            <span class="material-symbols-outlined text-[13px]">play_circle</span>
            Cinemática en Bucle (60 FPS) • ${movement.code}
          </span>
          <span class="text-[9px] font-mono text-neutral-400">Plano ${movement.plane}</span>
        </div>
        ${renderUnifiedMotionPlayer(movement)}
      </div>

      <!-- Punto de Origen Anatómico Detallado (Requisito Explícito) -->
      <div class="p-3.5 rounded-xl bg-[#162024] border border-cyan-900/60">
        <div class="flex items-center gap-1.5 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-1">
          <span class="material-symbols-outlined text-sm">my_location</span>
          Punto de Origen Anatómico Completo
        </div>
        <p class="text-xs text-white leading-relaxed font-medium whitespace-pre-line">${muscle.origin}</p>
      </div>

      <!-- Inserción Anatómica Detallada -->
      <div class="p-3.5 rounded-xl bg-[#18181b] border border-amber-900/40">
        <div class="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
          <span class="material-symbols-outlined text-sm">pin_drop</span>
          Inserción Anatómica Ósea
        </div>
        <p class="text-xs text-neutral-200 leading-relaxed whitespace-pre-line">${muscle.insertion}</p>
      </div>

      <!-- Función Principal y Rol Biomecánico -->
      <div class="p-3.5 rounded-xl bg-[#1c1b1b] border border-emerald-900/40">
        <div class="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
          <span class="material-symbols-outlined text-sm">bolt</span>
          Función y Mecánica en la Tarea
        </div>
        <p class="text-xs text-white leading-relaxed font-medium whitespace-pre-line">${muscle.action}</p>
      </div>

      <!-- Inervación y Raíces Nerviosas -->
      <div class="p-3.5 rounded-xl bg-[#18181b] border border-purple-900/40">
        <div class="flex items-center gap-1.5 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
          <span class="material-symbols-outlined text-sm">neurology</span>
          Inervación y Niveles Radiculares
        </div>
        <p class="text-xs text-neutral-200 leading-relaxed font-mono">${muscle.innervation}</p>
      </div>

      <!-- Perla Clínica para Parciales y Práctica -->
      <div class="p-3.5 rounded-xl bg-black/60 border border-neutral-800">
        <span class="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold block mb-1">
          💡 Perla Clínica & Biomecánica:
        </span>
        <p class="text-xs text-neutral-300 leading-relaxed">${muscle.clinicalNote}</p>
      </div>
    </div>

    <!-- Modal Footer -->
    <div class="p-3 bg-black border-t border-[#262626] flex justify-end">
      <button onclick="closeMuscleModal()" class="w-full py-2.5 rounded-xl ${movement.category === 'vida-diaria' ? 'bg-amber-400' : 'bg-accent'} text-black font-bold text-xs">
        Cerrar Ficha
      </button>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeMuscleModal() {
  const modal = document.getElementById("muscleModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

function setupModalDismiss() {
  const modal = document.getElementById("muscleModal");
  if (!modal) return;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeMuscleModal();
    }
  });
}

// -----------------------------------------------------------------------------
// 8. Navegación y Modo Repaso Flashcard
// -----------------------------------------------------------------------------
function setupBottomNav() {
  const btnExplorer = document.getElementById("navExplorer");
  const btnFlashcards = document.getElementById("navFlashcards");
  const btnInfo = document.getElementById("navInfo");

  if (btnExplorer) btnExplorer.addEventListener("click", () => switchTab("explorer"));
  if (btnFlashcards) btnFlashcards.addEventListener("click", () => switchTab("flashcards"));
  if (btnInfo) btnInfo.addEventListener("click", () => switchTab("info"));
}

function switchTab(tabId) {
  currentTab = tabId;
  const explorerView = document.getElementById("explorerView");
  const flashcardView = document.getElementById("flashcardView");
  const infoView = document.getElementById("infoView");

  const btnExplorer = document.getElementById("navExplorer");
  const btnFlashcards = document.getElementById("navFlashcards");
  const btnInfo = document.getElementById("navInfo");

  if (explorerView) explorerView.classList.toggle("hidden", tabId !== "explorer");
  if (flashcardView) flashcardView.classList.toggle("hidden", tabId !== "flashcards");
  if (infoView) infoView.classList.toggle("hidden", tabId !== "info");

  const updateNavBtn = (btn, active) => {
    if (!btn) return;
    btn.classList.toggle("text-accent", active);
    btn.classList.toggle("text-neutral-400", !active);
  };

  updateNavBtn(btnExplorer, tabId === "explorer");
  updateNavBtn(btnFlashcards, tabId === "flashcards");
  updateNavBtn(btnInfo, tabId === "info");

  if (tabId === "flashcards") {
    renderFlashcard();
  }
}

function openQuickStudy(movementId) {
  const index = ANATOMY_DATABASE.movements.findIndex(m => m.id === movementId);
  if (index !== -1) {
    flashcardIndex = index;
  }
  switchTab("flashcards");
}

function renderFlashcard() {
  const movement = ANATOMY_DATABASE.movements[flashcardIndex];
  if (!movement) return;

  flashcardFlipped = false;
  const cardElement = document.getElementById("studyFlashcard");
  const progressText = document.getElementById("flashcardProgress");
  const streakText = document.getElementById("streakIndicator");

  if (progressText) {
    progressText.textContent = `Tarjeta ${flashcardIndex + 1} de ${ANATOMY_DATABASE.movements.length}`;
  }
  if (streakText) {
    streakText.textContent = `${flashcardStreak} racha`;
  }

  if (!cardElement) return;

  const isAVD = movement.category === "vida-diaria";

  cardElement.innerHTML = `
    <!-- Cara Frontal (Pregunta) -->
    <div id="cardFront" class="p-6 bg-[#18181b] border-2 ${isAVD ? 'border-amber-500/50' : 'border-[#262626]'} rounded-2xl flex flex-col justify-between min-h-[380px] text-center shadow-2xl">
      <div>
        <span class="inline-block px-3 py-1 rounded-full ${isAVD ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-cyan-950 text-accent border border-cyan-800'} text-[10px] font-mono uppercase font-bold tracking-wider mb-4">
          ${movement.regionLabel}
        </span>
        <h3 class="text-xl font-black text-white tracking-tight mb-2">${movement.name}</h3>
        <p class="text-xs text-neutral-400 mb-3">${movement.joint.split(":")[0]}</p>
        
        <div class="p-4 rounded-xl bg-black/60 border border-[#262626] text-xs text-neutral-300 text-left space-y-1.5">
          <p>¿Qué <strong>articulaciones y movimientos</strong> intervienen?</p>
          <p>¿Cuáles son sus <strong>motores principales (agónicos)</strong>, <strong>sinergistas</strong> y <strong>fijadores/estabilizadores</strong>?</p>
        </div>
      </div>

      <div class="mt-4 flex flex-col items-center">
        <button onclick="flipCard()" class="px-5 py-2.5 rounded-full ${isAVD ? 'bg-amber-400' : 'bg-accent'} text-black font-extrabold text-xs flex items-center gap-2 active:scale-95 transition-all">
          <span class="material-symbols-outlined text-sm">flip</span>
          Tocar para voltear y ver respuesta completa
        </button>
      </div>
    </div>

    <!-- Cara Trasera (Respuesta con Animación y Datos) -->
    <div id="cardBack" class="hidden p-5 bg-[#12161a] border-2 ${isAVD ? 'border-amber-500/60' : 'border-cyan-500/50'} rounded-2xl flex flex-col justify-between min-h-[380px] shadow-2xl">
      <div>
        <div class="flex items-center justify-between border-b border-[#262626] pb-2 mb-3">
          <span class="text-xs font-mono font-bold ${isAVD ? 'text-amber-400' : 'text-accent'} truncate max-w-[200px]">${movement.name}</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-700">
            Plano ${movement.plane}
          </span>
        </div>

        <div class="space-y-2.5 max-h-[240px] overflow-y-auto pr-1">
          ${movement.stabilizers ? `
            <div class="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-left">
              <span class="text-[9px] font-mono text-emerald-400 uppercase font-bold block">🛡️ Fijadores / Estabilizadores:</span>
              <p class="text-[11px] text-neutral-200 mt-0.5">${movement.stabilizers}</p>
            </div>
          ` : ''}

          ${movement.muscles.map(m => `
            <div class="p-2.5 rounded-lg bg-black/50 border border-[#262626] text-left">
              <div class="flex items-center justify-between mb-0.5">
                <span class="text-xs font-bold text-white">${m.name}</span>
                <span class="text-[9px] font-mono ${m.roleType === 'stabilizer' ? 'text-emerald-400' : (m.roleType === 'primary' ? 'text-accent' : 'text-amber-300')} uppercase font-bold">${m.role}</span>
              </div>
              <p class="text-[11px] text-neutral-200 mt-1"><strong>Origen:</strong> ${m.origin}</p>
              <p class="text-[11px] text-amber-300 mt-0.5"><strong>Inserción:</strong> ${m.insertion}</p>
              <p class="text-[11px] text-emerald-300 mt-0.5"><strong>Acción:</strong> ${m.action}</p>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="mt-4 pt-3 border-t border-[#262626] flex items-center gap-2">
        <button onclick="nextFlashcard(false)" class="flex-1 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold">
          Repasar luego
        </button>
        <button onclick="nextFlashcard(true)" class="flex-1 py-2 rounded-xl bg-emerald-500 text-black text-xs font-black shadow-md">
          ¡Me lo sabía! ✓
        </button>
      </div>
    </div>
  `;
}

function flipCard() {
  const front = document.getElementById("cardFront");
  const back = document.getElementById("cardBack");
  if (front && back) {
    front.classList.add("hidden");
    back.classList.remove("hidden");
  }
}

function nextFlashcard(correct) {
  if (correct) {
    flashcardStreak++;
  } else {
    flashcardStreak = 0;
  }
  flashcardIndex = (flashcardIndex + 1) % ANATOMY_DATABASE.movements.length;
  renderFlashcard();
}
