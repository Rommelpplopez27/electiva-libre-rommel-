// =============================================================================
// KineFlash - Lógica de Interacción, Búsqueda y Navegación
// =============================================================================

let currentRegion = "all";
let currentPlane = "all";
let searchTerm = "";
let currentTab = "explorer"; // 'explorer', 'flashcards', 'info'
let flashcardIndex = 0;
let flashcardFlipped = false;
let flashcardStreak = 0;

// Inicialización cuando carga la página
document.addEventListener("DOMContentLoaded", () => {
  renderStories();
  renderPlaneFilters();
  renderMovementFeed();
  setupSearchListener();
  setupBottomNav();
  setupModalDismiss();
});

// 1. Renderizar Carrusel de Historias (Regiones Anatómicas)
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

// 2. Renderizar Filtros de Planos Anatómicos
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

// 3. Buscador en Tiempo Real
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

// 4. Filtrar y Renderizar los Movimientos en el Feed
function getFilteredMovements() {
  return ANATOMY_DATABASE.movements.filter(m => {
    // Filtro por región
    const matchesRegion = currentRegion === "all" || m.region === currentRegion;
    // Filtro por plano
    const matchesPlane = currentPlane === "all" || m.plane === currentPlane;
    // Filtro por texto de búsqueda
    const matchesSearch = !searchTerm || 
      m.name.toLowerCase().includes(searchTerm) ||
      m.joint.toLowerCase().includes(searchTerm) ||
      m.primaryMuscle.toLowerCase().includes(searchTerm) ||
      m.synergistMuscles.some(s => s.toLowerCase().includes(searchTerm)) ||
      m.searchTerms.some(t => t.toLowerCase().includes(searchTerm)) ||
      m.muscles.some(muscle => muscle.name.toLowerCase().includes(searchTerm) || muscle.origin.toLowerCase().includes(searchTerm));

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
        <p class="text-xs text-neutral-500">Intenta buscar por "codo", "hombro", "cuádriceps" o selecciona "Todas".</p>
        <button onclick="resetFilters()" class="mt-2 px-4 py-1.5 rounded-lg bg-accent text-black text-xs font-bold">
          Restablecer filtros
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = movements.map(m => {
    // Iniciales para avatar
    const initials = m.name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
    
    // Color según plano
    const planeColors = {
      Sagital: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40 dot-cyan",
      Frontal: "bg-purple-950/80 text-purple-300 border-purple-500/40 dot-purple",
      Transversal: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40 dot-emerald"
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

        <!-- Biomechanical Body -->
        <div class="p-3.5 flex flex-col gap-3">
          <!-- Detalles Rápidos -->
          <div class="flex items-center justify-between text-[11px] text-neutral-400 bg-black/40 px-3 py-1.5 rounded-lg border border-[#262626]">
            <span class="font-mono text-neutral-300"><strong>ROM:</strong> ${m.rom}</span>
            <span class="font-mono text-neutral-400"><strong>Eje:</strong> ${m.axis.split(" ")[1] || 'Transversal'}</span>
          </div>

          <p class="text-xs text-neutral-300 leading-relaxed">${m.description}</p>

          <!-- Grid de Músculos (Interactivo con clic) -->
          <div class="flex flex-col gap-1.5">
            <span class="text-[10px] uppercase font-mono tracking-wider text-neutral-500 font-semibold">
              Músculos Participantes (Toca para ver origen y función):
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${m.muscles.map(muscle => `
                <button 
                  onclick="openMuscleModal('${m.id}', '${muscle.id}')"
                  class="text-left p-2.5 rounded-xl border transition-all flex items-start justify-between group active:scale-98 ${
                    muscle.roleType === 'primary' 
                      ? 'bg-[#162024] border-cyan-800/40 hover:border-cyan-400' 
                      : 'bg-[#18181b] border-[#262626] hover:border-neutral-500'
                  }">
                  <div>
                    <span class="text-[9px] font-mono uppercase tracking-wider block font-bold ${
                      muscle.roleType === 'primary' ? 'text-accent' : 'text-neutral-400'
                    }">
                      ${muscle.role}
                    </span>
                    <span class="text-xs font-bold text-white group-hover:text-accent transition-colors flex items-center gap-1 mt-0.5">
                      ${muscle.name}
                    </span>
                    <span class="text-[10px] text-neutral-400 italic block">
                      ${muscle.scientificName}
                    </span>
                  </div>
                  <span class="material-symbols-outlined text-sm text-neutral-500 group-hover:text-accent transition-colors shrink-0 mt-1">
                    chevron_right
                  </span>
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- Post Action Strip -->
        <div class="px-3.5 py-2.5 bg-black/30 border-t border-[#1f1f1f] flex items-center justify-between text-xs text-neutral-400">
          <span class="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px] text-accent">fitness_center</span>
            Palanca: ${m.lever}
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

// 5. Modal de Ficha Muscular (Requisito clave del PRD)
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
        <h2 class="text-lg font-extrabold text-white tracking-tight">${muscle.name}</h2>
        <p class="text-xs text-neutral-400 italic">${muscle.scientificName}</p>
      </div>
      <button onclick="closeMuscleModal()" class="w-8 h-8 rounded-full bg-black/60 border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-white transition-all">
        <span class="material-symbols-outlined text-lg">close</span>
      </button>
    </div>

    <!-- Modal Body (Origen, Inserción, Inervación, Función) -->
    <div class="p-4 space-y-3.5 max-h-[70vh] overflow-y-auto">
      <!-- Punto de Origen Anatómico (Requisito Explícito PRD) -->
      <div class="p-3 rounded-xl bg-[#162024] border border-cyan-900/50">
        <div class="flex items-center gap-1.5 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-1">
          <span class="material-symbols-outlined text-sm">my_location</span>
          Punto de Origen Anatómico
        </div>
        <p class="text-xs text-white leading-relaxed font-medium">${muscle.origin}</p>
      </div>

      <!-- Función Principal (Requisito Explícito PRD) -->
      <div class="p-3 rounded-xl bg-[#1c1b1b] border border-[#262626]">
        <div class="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
          <span class="material-symbols-outlined text-sm">bolt</span>
          Función y Acción Biomecánica
        </div>
        <p class="text-xs text-white leading-relaxed font-medium">${muscle.action}</p>
      </div>

      <!-- Inserción Anatómica -->
      <div class="p-3 rounded-xl bg-[#18181b] border border-[#262626]">
        <div class="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
          <span class="material-symbols-outlined text-sm">pin_drop</span>
          Inserción Anatómica
        </div>
        <p class="text-xs text-neutral-200 leading-relaxed">${muscle.insertion}</p>
      </div>

      <!-- Inervación (Clave para estudiantes de 2do semestre) -->
      <div class="p-3 rounded-xl bg-[#18181b] border border-[#262626]">
        <div class="flex items-center gap-1.5 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
          <span class="material-symbols-outlined text-sm">neurology</span>
          Inervación y Raíces Nerviosas
        </div>
        <p class="text-xs text-neutral-200 leading-relaxed font-mono">${muscle.innervation}</p>
      </div>

      <!-- Nota Clínica de Examen / Práctica -->
      <div class="p-3 rounded-xl bg-black/60 border border-neutral-800">
        <span class="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold block mb-1">
          💡 Perla Clínica para Parciales y Práctica:
        </span>
        <p class="text-xs text-neutral-300 leading-relaxed">${muscle.clinicalNote}</p>
      </div>
    </div>

    <!-- Modal Footer -->
    <div class="p-3 bg-black border-t border-[#262626] flex justify-end">
      <button onclick="closeMuscleModal()" class="w-full py-2.5 rounded-xl bg-accent text-black font-bold text-xs">
        Entendido
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

// 6. Modo Repaso Flashcard (Para memorizar rápido)
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

  // Ocultar vistas
  if (explorerView) explorerView.classList.toggle("hidden", tabId !== "explorer");
  if (flashcardView) flashcardView.classList.toggle("hidden", tabId !== "flashcards");
  if (infoView) infoView.classList.toggle("hidden", tabId !== "info");

  // Estilos de botones
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
    <div id="cardFront" class="p-6 bg-[#18181b] border-2 border-[#262626] rounded-2xl flex flex-col justify-between min-h-[360px] text-center shadow-2xl">
      <div>
        <span class="inline-block px-3 py-1 rounded-full bg-cyan-950 text-accent border border-cyan-800 text-[10px] font-mono uppercase font-bold tracking-wider mb-4">
          ${movement.regionLabel}
        </span>
        <h3 class="text-2xl font-black text-white tracking-tight mb-2">${movement.name}</h3>
        <p class="text-xs text-neutral-400 mb-6">${movement.joint}</p>
        
        <div class="p-4 rounded-xl bg-black/60 border border-[#262626] text-xs text-neutral-300">
          ¿En qué <strong>plano anatómico</strong> actúa y cuáles son sus <strong>músculos principales y sus orígenes</strong>?
        </div>
      </div>

      <div class="mt-6 flex flex-col items-center">
        <button onclick="flipCard()" class="px-5 py-2.5 rounded-full bg-accent text-black font-extrabold text-xs flex items-center gap-2 active:scale-95 transition-all">
          <span class="material-symbols-outlined text-sm">flip</span>
          Tocar para voltear y ver respuesta
        </button>
      </div>
    </div>

    <!-- Cara Trasera (Respuesta Oculta inicialmente) -->
    <div id="cardBack" class="hidden p-5 bg-[#12161a] border-2 border-cyan-500/50 rounded-2xl flex flex-col justify-between min-h-[360px] shadow-2xl">
      <div>
        <div class="flex items-center justify-between border-b border-[#262626] pb-2 mb-3">
          <span class="text-xs font-mono font-bold text-accent">${movement.name}</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-700">
            Plano ${movement.plane} (${movement.axis})
          </span>
        </div>

        <div class="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
          ${movement.muscles.map(m => `
            <div class="p-2 rounded-lg bg-black/50 border border-[#262626] text-left">
              <div class="flex items-center justify-between mb-0.5">
                <span class="text-xs font-bold text-white">${m.name}</span>
                <span class="text-[9px] font-mono text-accent uppercase">${m.role}</span>
              </div>
              <p class="text-[11px] text-neutral-300"><strong>Origen:</strong> ${m.origin}</p>
              <p class="text-[11px] text-neutral-400"><strong>Función:</strong> ${m.action}</p>
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
