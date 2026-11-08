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
const activePlayerMode = {};

const ANATOMICAL_GIF_DATABASE = {
  // 1. Flexión de Codo
  "elbow-flexion": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Standing-biceps-curl-1.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Biceps_brachii_muscle_-_animation01.gif",
    label: "Flexión de Codo (Aproximación de antebrazo hacia el brazo)",
    plane: "Plano Sagital"
  },
  // 2. Extensión de Codo (Corregida: extensión concéntrica de tríceps de flexión a neutro)
  "elbow-extension": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Standing-triceps-extension-1.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Triceps_brachii_muscle_-_animation01.gif",
    label: "Extensión de Codo (Alineación recta de antebrazo y activación de tríceps)",
    plane: "Plano Sagital"
  },
  // 3. Abducción de Hombro
  "shoulder-abduction": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Deltoid_muscle_animation.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Deltoid_muscle_animation.gif",
    label: "Abducción de Hombro (Separación del brazo de la línea media)",
    plane: "Plano Frontal"
  },
  // 4. Flexión de Hombro
  "shoulder-flexion": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Deltoid_muscle_animation.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Deltoid_muscle_animation.gif",
    label: "Flexión de Hombro (Anteversión anterior del brazo)",
    plane: "Plano Sagital"
  },
  // 5. Extensión de Rodilla
  "knee-extension": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Quadricep-animation.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Quadricep-animation.gif",
    label: "Extensión de Rodilla (Alineación de pierna por cuádriceps de 90° a 0°)",
    plane: "Plano Sagital"
  },
  // 6. Flexión de Rodilla
  "knee-flexion": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Biceps_femoris_muscle_-_animation_1.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Biceps_femoris_muscle_-_animation_1.gif",
    label: "Flexión de Rodilla (Isquiotibiales y bíceps femoral de 0° a 130°)",
    plane: "Plano Sagital"
  },
  // 7. Flexión de Cadera
  "hip-flexion": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Iliacus_muscle_-_animation_1.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Iliacus_muscle_-_animation_1.gif",
    label: "Flexión de Cadera (Elevación anterior del fémur por psoas ilíaco)",
    plane: "Plano Sagital"
  },
  // 8. Abducción de Cadera
  "hip-abduction": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Gluteus_medius_muscle_-_animation01.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Gluteus_medius_muscle_-_animation01.gif",
    label: "Abducción de Cadera (Separación lateral de la extremidad por glúteo medio)",
    plane: "Plano Frontal"
  },
  // 9. Dorsiflexión de Tobillo
  "ankle-dorsiflexion": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tibialis_anterior_muscle_-_animation.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tibialis_anterior_muscle_-_animation.gif",
    label: "Dorsiflexión de Tobillo (Elevación del dorso del pie por tibial anterior)",
    plane: "Plano Sagital"
  },
  // 10. Flexión Plantar de Tobillo
  "ankle-plantarflexion": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/1/11/Standing-calf-raises-1.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Gastrocnemius_muscle_-_animation.gif",
    label: "Flexión Plantar de Tobillo (Elevación sobre puntas por tríceps sural)",
    plane: "Plano Sagital"
  },
  // Actividades de la Vida Diaria (AVD)
  "daily-squat": {
    movementGif: "./stitch_reference/agacharse-recoger-objeto.gif o squat.gif.gif",
    
    label: "Agacharse / Sentadilla (Triple flexión funcional en cadena cerrada)",
    plane: "Plano Sagital"
  },
  "daily-shelf-reach": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Deltoid_muscle_animation.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Deltoid_muscle_animation.gif",
    label: "Alcanzar estante alto (Ritmo escápulo-humeral y deltoides)",
    plane: "Plano Sagital"
  },
  "daily-door-push": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Triceps_brachii_muscle_-_animation01.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Triceps_brachii_muscle_-_animation01.gif",
    label: "Empujar puerta pesada (Extensión coordinada y pectoral)",
    plane: "Plano Sagital"
  },
  "daily-stairs-climb": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/a/a4/One-leg-squat-1.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Quadricep-animation.gif",
    label: "Subir escaleras (Ascenso en carga monopodal)",
    plane: "Plano Sagital"
  },
  "daily-trunk-rotation": {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Gluteus_medius_muscle_-_animation01.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Gluteus_medius_muscle_-_animation01.gif",
    label: "Rotación de tronco al girarse (Torsión de raquis y oblicuos)",
    plane: "Plano Transversal"
  }
};

function setPlayerMode(movementId, mode) {
  activePlayerMode[movementId] = mode;
  renderMovementFeed();
}

function renderUnifiedMotionPlayer(movement) {
  const isPaused = !!animationPausedState[movement.id];
  const playerMode = activePlayerMode[movement.id] || "movement";
  const asset = ANATOMICAL_GIF_DATABASE[movement.animationType] || {
    movementGif: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Standing-biceps-curl-1.gif",
    anatomyGif: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Biceps_brachii_muscle_-_animation01.gif",
    label: movement.name,
    plane: "Plano " + movement.plane
  };

  const currentMediaUrl = (playerMode === "anatomy" && asset.anatomyGif) ? asset.anatomyGif : asset.movementGif;

  return `
    <div class="relative w-full overflow-hidden rounded-xl border border-[#262626] shadow-inner bg-black ${isPaused ? 'animation-paused' : ''}">
      <!-- Cabecera Superior del Reproductor -->
      <div class="absolute top-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-none">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#333] text-[9px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
          <span class="w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}"></span>
          ${isPaused ? 'Pausado' : 'Cuerpo Anatómico en Movimiento'}
        </span>
        <button 
          onclick="event.stopPropagation(); togglePauseMovement('${movement.id}')"
          class="pointer-events-auto p-1.5 rounded-full bg-black/80 hover:bg-[#262626] border border-[#333] text-neutral-300 hover:text-white transition-all shadow-md active:scale-95">
          <span class="material-symbols-outlined text-[16px]">${isPaused ? 'play_arrow' : 'pause'}</span>
        </button>
      </div>

      <!-- Pantalla Visual del GIF del Cuerpo Anatómico (CERO STICKMEN) -->
      <div class="relative w-full h-56 bg-gradient-to-b from-[#18181b] via-[#101013] to-black flex items-center justify-center overflow-hidden p-2">
        <img 
          src="${currentMediaUrl}" 
          alt="${asset.label}" 
          class="max-h-full max-w-full object-contain filter drop-shadow-[0_0_18px_rgba(0,242,254,0.18)] transition-all duration-300 ${isPaused ? 'opacity-40 grayscale blur-[1px]' : 'opacity-100'}"
          loading="lazy"
        />

        <!-- Controles Inferiores Flotantes: Selector de Vista y Plano -->
        <div class="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between pointer-events-none">
          <span class="pointer-events-auto px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-[#333] text-[9px] font-mono text-cyan-300 font-bold">
            ${asset.plane}
          </span>
          <div class="pointer-events-auto flex items-center gap-1 bg-black/80 backdrop-blur-md p-0.5 rounded-lg border border-[#333]">
            <button 
              onclick="event.stopPropagation(); setPlayerMode('${movement.id}', 'movement')"
              class="px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${playerMode === 'movement' ? 'bg-cyan-500 text-black shadow-sm' : 'text-neutral-400 hover:text-white'}">
              Movimiento
            </button>
            <button 
              onclick="event.stopPropagation(); setPlayerMode('${movement.id}', 'anatomy')"
              class="px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${playerMode === 'anatomy' ? 'bg-cyan-500 text-black shadow-sm' : 'text-neutral-400 hover:text-white'}">
              Anatomía 3D
            </button>
          </div>
        </div>
      </div>

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
