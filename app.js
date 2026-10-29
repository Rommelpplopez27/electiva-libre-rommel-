// =============================================================================
// KineFlash PRO - Motor de Interacción, Búsqueda y Cinemática Biomecánica Unificada
// =============================================================================

let currentRegion = "all";
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
  renderPlaneFilters();
  renderMovementFeed();
  setupSearchListener();
  setupBottomNav();
  setupModalDismiss();
});

// -----------------------------------------------------------------------------
// 1. Carrusel de Historias (Regiones Anatómicas)
// -----------------------------------------------------------------------------
function renderStories() {
  const container = document.getElementById("storiesContainer");
  if (!container) return;

  container.innerHTML = ANATOMY_DATABASE.regions.map(region => {
    const isActive = currentRegion === region.id;
    const ringClass = region.id === "all" 
      ? (isActive ? "story-ring-cyan ring-2 ring-cyan-400" : "bg-[#262626]")
      : (isActive ? "story-ring-active ring-2 ring-pink-500 scale-105" : "bg-[#262626] opacity-80 hover:opacity-100");
    
    return `
      <div class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group transition-all" onclick="selectRegion('${region.id}')">
        <div class="p-[2.5px] rounded-full ${ringClass} transition-transform group-active:scale-95">
          <div class="w-14 h-14 rounded-full bg-[#18181b] p-0.5 flex items-center justify-center border-2 border-black">
            <span class="material-symbols-outlined ${isActive ? 'text-accent' : 'text-neutral-300'} text-2xl" data-icon="${region.icon}">${region.icon}</span>
          </div>
        </div>
        <span class="text-[11px] font-medium ${isActive ? 'text-white font-bold' : 'text-neutral-400'} tracking-tight">${region.name}</span>
      </div>
    `;
  }).join("");
}

function selectRegion(regionId) {
  currentRegion = regionId;
  renderStories();
  renderMovementFeed();
}

// -----------------------------------------------------------------------------
// 2. Filtros de Planos Anatómicos
// -----------------------------------------------------------------------------
function renderPlaneFilters() {
  const container = document.getElementById("planeFiltersContainer");
  if (!container) return;

  container.innerHTML = ANATOMY_DATABASE.planes.map(p => {
    const isActive = currentPlane === p.id;
    return `
      <button 
        onclick="selectPlane('${p.id}')"
        class="px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
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
// 3. Buscador en Tiempo Real
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
// 4. Generador del Reproductor Visual Unificado por Movimiento (Sin duplicados)
// -----------------------------------------------------------------------------
function renderUnifiedMotionPlayer(movement) {
  const isPaused = !!animationPausedState[movement.id];
  let svgContent = "";

  switch (movement.animationType) {
    case "elbow-flexion":
      svgContent = `
        <svg viewBox="0 0 320 180" class="w-full h-44 bg-gradient-to-b from-[#18181b] via-[#121214] to-black">
          <defs>
            <linearGradient id="efGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00f2fe"/>
              <stop offset="100%" stop-color="#006a70"/>
            </linearGradient>
          </defs>
          <!-- Húmero Fijo -->
          <line x1="160" y1="22" x2="160" y2="105" stroke="#475569" stroke-width="14" stroke-linecap="round"/>
          <circle cx="160" cy="22" r="10" fill="#64748b"/>
          <text x="175" y="30" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">HÚMERO</text>
          
          <!-- Eje Articular Troclear -->
          <circle cx="160" cy="105" r="7" fill="#0f172a" stroke="#00f2fe" stroke-width="2"/>
          <text x="175" y="110" fill="#38bdf8" font-size="9" font-family="JetBrains Mono">Eje Tróclea</text>

          <!-- Antebrazo Móvil en Bucle -->
          <g class="motion-loop-elbow-flexion">
            <line x1="160" y1="105" x2="160" y2="170" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
            <circle cx="160" cy="170" r="6" fill="#cbd5e1"/>
            <text x="172" y="152" fill="#cbd5e1" font-size="9" font-family="JetBrains Mono">Cúbito/Radio</text>
            <circle cx="160" cy="120" r="4" fill="#fcb045" stroke="#fff" stroke-width="1.5"/>
          </g>

          <!-- Vientre Muscular Resaltado (Braquial / Bíceps) -->
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

          <!-- Tríceps Posterior Resaltado en Contracción -->
          <path d="M 168 35 Q 185 70 166 102" fill="none" stroke="#fd1d1d" stroke-width="8" stroke-linecap="round" class="muscle-contract"/>
          <circle cx="168" cy="35" r="4" fill="#fd1d1d" stroke="#fff" stroke-width="1.5" class="origin-indicator"/>
          <text x="180" y="50" fill="#ff7675" font-size="10" font-family="JetBrains Mono" font-weight="bold">📍 Tríceps (3 Cabezas)</text>

          <!-- Antebrazo Extendiéndose -->
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
          <!-- Tronco y Escápula -->
          <path d="M 160 40 L 160 160" stroke="#334155" stroke-width="16" stroke-linecap="round"/>
          <path d="M 160 40 L 130 65 L 145 95 Z" fill="#1e293b" stroke="#475569"/>
          <text x="75" y="65" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">ESCÁPULA</text>

          <circle cx="160" cy="40" r="8" fill="#d5baff" stroke="#833ab4" stroke-width="2"/>
          <text x="175" y="40" fill="#d5baff" font-size="9" font-family="JetBrains Mono">Acromion</text>

          <!-- Brazo en Abducción Frontal -->
          <g class="motion-loop-shoulder-abduction">
            <line x1="160" y1="40" x2="160" y2="125" stroke="#94a3b8" stroke-width="12" stroke-linecap="round"/>
            <circle cx="160" cy="125" r="7" fill="#cbd5e1"/>
            <circle cx="160" cy="75" r="4" fill="#fcb045" stroke="#fff" stroke-width="1.5"/>
          </g>

          <!-- Deltoides Acromial y Supraespinoso Resaltados -->
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
          Loop Cinemático 60 FPS
        </span>
        <button 
          onclick="togglePauseMovement('${movement.id}')"
          class="pointer-events-auto p-1 rounded-full bg-black/80 hover:bg-[#262626] border border-[#333] text-neutral-300 hover:text-white transition-all">
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
// 5. Renderizado de Tarjetas de Movimiento en el Feed
// -----------------------------------------------------------------------------
function getFilteredMovements() {
  return ANATOMY_DATABASE.movements.filter(m => {
    const matchesRegion = currentRegion === "all" || m.region === currentRegion;
    const matchesPlane = currentPlane === "all" || m.plane === currentPlane;
    const matchesSearch = !searchTerm || 
      m.name.toLowerCase().includes(searchTerm) ||
      m.joint.toLowerCase().includes(searchTerm) ||
      m.primaryMuscle.toLowerCase().includes(searchTerm) ||
      m.synergistMuscles.some(s => s.toLowerCase().includes(searchTerm)) ||
      m.searchTerms.some(t => t.toLowerCase().includes(searchTerm)) ||
      m.muscles.some(muscle => 
        muscle.name.toLowerCase().includes(searchTerm) || 
        muscle.origin.toLowerCase().includes(searchTerm) ||
        muscle.insertion.toLowerCase().includes(searchTerm)
      );

    return matchesRegion && matchesPlane && matchesSearch;
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
        <p class="text-xs text-neutral-500">Prueba buscando "deltoides", "codo", "cuádriceps", "isquiotibiales" o "tobillo".</p>
        <button onclick="resetFilters()" class="mt-2 px-4 py-1.5 rounded-lg bg-accent text-black text-xs font-bold">
          Restablecer filtros
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = movements.map(m => {
    const initials = m.name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
    
    const planeColors = {
      Sagital: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
      Frontal: "bg-purple-950/80 text-purple-300 border-purple-500/40",
      Transversal: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
    };
    const planeStyle = planeColors[m.plane] || planeColors.Sagital;

    return `
      <article class="bg-[#121212] border border-[#262626] rounded-2xl overflow-hidden hover:border-neutral-600 transition-all shadow-xl">
        <!-- Post Header -->
        <div class="flex items-center justify-between p-3.5 border-b border-[#1f1f1f] bg-[#18181b]/70">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-extrabold text-xs shadow-md">
              ${initials}
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h3 class="text-sm font-bold text-white tracking-tight">${m.name}</h3>
                <span class="w-1 h-1 rounded-full bg-neutral-600"></span>
                <span class="text-[10px] font-mono font-semibold text-accent">${m.code}</span>
              </div>
              <p class="text-[11px] text-neutral-400 leading-tight">${m.joint}</p>
            </div>
          </div>
          <!-- Plano Tag -->
          <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide border flex items-center gap-1.5 ${planeStyle}">
            <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
            Plano ${m.plane}
          </span>
        </div>

        <!-- UNICO CONTENEDOR VISUAL CON LA ANIMACIÓN BIOMECÁNICA DEL MOVIMIENTO -->
        <div class="p-3 bg-black/50 border-b border-[#222]">
          ${renderUnifiedMotionPlayer(m)}
        </div>

        <!-- Biomechanical Body -->
        <div class="p-3.5 flex flex-col gap-3">
          <!-- Detalles Cinemáticos Rápidos -->
          <div class="flex items-center justify-between text-[11px] text-neutral-400 bg-black/40 px-3 py-1.5 rounded-lg border border-[#262626]">
            <span class="font-mono text-neutral-300"><strong>ROM:</strong> ${m.rom}</span>
            <span class="font-mono text-neutral-400"><strong>Eje:</strong> ${m.axis.split(" ")[1] || 'Transversal'}</span>
          </div>

          <p class="text-xs text-neutral-300 leading-relaxed">${m.description}</p>

          <!-- Lista de Músculos Participantes (Motores Primarios, Secundarios y Sinergistas) -->
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase font-mono tracking-wider text-neutral-400 font-bold">
                Músculos Participantes (${m.muscles.length}):
              </span>
              <span class="text-[9px] font-mono text-accent">Toca para abrir Ficha</span>
            </div>

            <div class="grid grid-cols-1 gap-1.5">
              ${m.muscles.map(muscle => {
                let badgeClass = "bg-cyan-950/80 text-cyan-300 border-cyan-800";
                let roleColor = "text-accent";
                let cardBg = "bg-[#162024] border-cyan-800/40 hover:border-cyan-400";

                if (muscle.roleType === 'secondary') {
                  badgeClass = "bg-amber-950/80 text-amber-300 border-amber-800";
                  roleColor = "text-amber-400";
                  cardBg = "bg-[#1c1c18] border-amber-900/30 hover:border-amber-400";
                } else if (muscle.roleType === 'synergist') {
                  badgeClass = "bg-neutral-800 text-neutral-300 border-neutral-700";
                  roleColor = "text-neutral-400";
                  cardBg = "bg-[#18181b] border-[#262626] hover:border-neutral-500";
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
            <span class="material-symbols-outlined text-[15px] text-accent">fitness_center</span>
            Palanca: ${m.lever.split(" ")[0]} ${m.lever.split(" ")[1] || ''}
          </span>
          <button 
            onclick="openQuickStudy('${m.id}')"
            class="text-[11px] font-mono font-bold text-accent hover:underline flex items-center gap-1">
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
  currentPlane = "all";
  searchTerm = "";
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";
  renderStories();
  renderPlaneFilters();
  renderMovementFeed();
}

// -----------------------------------------------------------------------------
// 6. Modal de Ficha Muscular Completa y Revisada (Unificado)
// -----------------------------------------------------------------------------
function openMuscleModal(movementId, muscleId) {
  const movement = ANATOMY_DATABASE.movements.find(m => m.id === movementId);
  if (!movement) return;

  const muscle = movement.muscles.find(mu => mu.id === muscleId);
  if (!muscle) return;

  const modal = document.getElementById("muscleModal");
  const modalContent = document.getElementById("modalContent");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <!-- Modal Header -->
    <div class="p-4 border-b border-[#262626] flex items-start justify-between bg-[#18181b]">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
            muscle.roleType === 'primary' 
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' 
              : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
          }">
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
      
      <!-- Reproductor Biomecánico Unificado del Músculo en Bucle -->
      <div class="rounded-xl overflow-hidden border border-[#262626] bg-black">
        <div class="px-3 py-1.5 bg-[#18181b] border-b border-[#262626] flex items-center justify-between">
          <span class="text-[10px] font-mono font-bold text-accent flex items-center gap-1">
            <span class="material-symbols-outlined text-[13px]">play_circle</span>
            Acción Biomecánica en Bucle (60 FPS)
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

      <!-- Función Principal y Acción Biomecánica -->
      <div class="p-3.5 rounded-xl bg-[#1c1b1b] border border-emerald-900/40">
        <div class="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
          <span class="material-symbols-outlined text-sm">bolt</span>
          Función y Mecánica Muscular
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

      <!-- Perla Clínica para Parciales -->
      <div class="p-3.5 rounded-xl bg-black/60 border border-neutral-800">
        <span class="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold block mb-1">
          💡 Perla Clínica & Biomecánica:
        </span>
        <p class="text-xs text-neutral-300 leading-relaxed">${muscle.clinicalNote}</p>
      </div>
    </div>

    <!-- Modal Footer -->
    <div class="p-3 bg-black border-t border-[#262626] flex justify-end">
      <button onclick="closeMuscleModal()" class="w-full py-2.5 rounded-xl bg-accent text-black font-bold text-xs">
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
// 7. Navegación y Modo Repaso Flashcard
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

  cardElement.innerHTML = `
    <!-- Cara Frontal (Pregunta) -->
    <div id="cardFront" class="p-6 bg-[#18181b] border-2 border-[#262626] rounded-2xl flex flex-col justify-between min-h-[380px] text-center shadow-2xl">
      <div>
        <span class="inline-block px-3 py-1 rounded-full bg-cyan-950 text-accent border border-cyan-800 text-[10px] font-mono uppercase font-bold tracking-wider mb-4">
          ${movement.regionLabel}
        </span>
        <h3 class="text-2xl font-black text-white tracking-tight mb-2">${movement.name}</h3>
        <p class="text-xs text-neutral-400 mb-4">${movement.joint}</p>
        
        <div class="p-4 rounded-xl bg-black/60 border border-[#262626] text-xs text-neutral-300">
          ¿En qué <strong>plano anatómico</strong> actúa y cuáles son los <strong>motores primarios, secundarios y sus orígenes</strong>?
        </div>
      </div>

      <div class="mt-4 flex flex-col items-center">
        <button onclick="flipCard()" class="px-5 py-2.5 rounded-full bg-accent text-black font-extrabold text-xs flex items-center gap-2 active:scale-95 transition-all">
          <span class="material-symbols-outlined text-sm">flip</span>
          Tocar para voltear y ver respuesta completa
        </button>
      </div>
    </div>

    <!-- Cara Trasera (Respuesta con Animación y Datos) -->
    <div id="cardBack" class="hidden p-5 bg-[#12161a] border-2 border-cyan-500/50 rounded-2xl flex flex-col justify-between min-h-[380px] shadow-2xl">
      <div>
        <div class="flex items-center justify-between border-b border-[#262626] pb-2 mb-3">
          <span class="text-xs font-mono font-bold text-accent">${movement.name}</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-700">
            Plano ${movement.plane} (${movement.axis})
          </span>
        </div>

        <div class="space-y-2.5 max-h-[240px] overflow-y-auto pr-1">
          ${movement.muscles.map(m => `
            <div class="p-2.5 rounded-lg bg-black/50 border border-[#262626] text-left">
              <div class="flex items-center justify-between mb-0.5">
                <span class="text-xs font-bold text-white">${m.name}</span>
                <span class="text-[9px] font-mono text-accent uppercase font-bold">${m.role}</span>
              </div>
              <p class="text-[11px] text-neutral-200 mt-1"><strong>Origen:</strong> ${m.origin}</p>
              <p class="text-[11px] text-amber-300 mt-0.5"><strong>Inserción:</strong> ${m.insertion}</p>
              <p class="text-[11px] text-emerald-300 mt-0.5"><strong>Función:</strong> ${m.action}</p>
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
