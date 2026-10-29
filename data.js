// =============================================================================
// KineFlash - Base de Datos Anatómica y Biomecánica Verificada
// Para estudiantes de Fisioterapia (2do semestre en adelante)
// =============================================================================

const ANATOMY_DATABASE = {
  regions: [
    { id: "all", name: "Todas", icon: "all_inclusive", color: "cyan" },
    { id: "codo", name: "Codo", icon: "sports_handball", color: "active" },
    { id: "hombro", name: "Hombro", icon: "accessibility", color: "active" },
    { id: "rodilla", name: "Rodilla", icon: "snowshoeing", color: "active" },
    { id: "cadera", name: "Cadera", icon: "directions_walk", color: "active" },
    { id: "tobillo", name: "Tobillo", icon: "footprint", color: "active" },
    { id: "muneca", name: "Muñeca", icon: "pan_tool", color: "active" }
  ],

  planes: [
    { id: "all", name: "Todos los planos" },
    { id: "Sagital", name: "Plano Sagital" },
    { id: "Frontal", name: "Plano Frontal" },
    { id: "Transversal", name: "Plano Transversal" }
  ],

  movements: [
    {
      id: "flexion-codo",
      name: "Flexión de Codo",
      region: "codo",
      regionLabel: "Codo • Miembro Superior",
      code: "MS-01",
      joint: "Articulación Húmero-cubital y Húmero-radial",
      jointType: "Gínglimo / Troclear",
      plane: "Sagital",
      axis: "Eje Perpendicular Laterolateral (Transversal)",
      rom: "0° — 145°/150°",
      description: "Aproximación de la cara anterior del antebrazo hacia la cara anterior del brazo.",
      lever: "3er Género (Interpotente)",
      searchTerms: ["flexionar el codo", "doblar el brazo", "codo", "biceps", "braquial", "antebrazo"],
      primaryMuscle: "Braquial anterior",
      synergistMuscles: ["Bíceps braquial", "Braquiorradial"],
      antagonist: "Tríceps braquial",
      muscles: [
        {
          id: "braquial-anterior",
          name: "Braquial Anterior",
          scientificName: "Musculus brachialis",
          role: "Agonista Primario",
          roleType: "primary",
          compartment: "Compartimento Braquial Anterior",
          origin: "Mitad distal de la cara anterior del húmero (por debajo de la tuberosidad deltoidea).",
          insertion: "Tuberosidad del cúbito y apófisis coronoides.",
          innervation: "Nervio Musculocutáneo (C5, C6). Fibras accesorias sensitivas del nervio radial.",
          action: "Principal flexor del codo en cualquier posición. No se ve afectado por la pronación ni supinación del antebrazo (es el 'burro de carga' de la flexión).",
          clinicalNote: "Es el flexor más puro y potente porque se inserta directamente en el cúbito, hueso que no rota en la pronosupinación."
        },
        {
          id: "biceps-braquial",
          name: "Bíceps Braquial",
          scientificName: "Musculus biceps brachii",
          role: "Sinergista Principal",
          roleType: "synergist",
          compartment: "Compartimento Braquial Anterior (Superficial)",
          origin: "Cabeza corta: Vértice de la apófisis coracoides de la escápula. Cabeza larga: Tubérculo supraglenoideo de la escápula (tendón intraarticular).",
          insertion: "Tuberosidad del radio y aponeurosis bicipital (lacerus fibrosus) en la fascia profunda del antebrazo.",
          innervation: "Nervio Musculocutáneo (C5, C6).",
          action: "Potente flexor del codo cuando el antebrazo se encuentra en supinación. Principal supinador del antebrazo en flexión.",
          clinicalNote: "Pierde notable eficacia mecánica para flexionar si el antebrazo está en pronación completa."
        },
        {
          id: "braquiorradial",
          name: "Braquiorradial (Supinador largo)",
          scientificName: "Musculus brachioradialis",
          role: "Sinergista / Estabilizador",
          roleType: "synergist",
          compartment: "Compartimento Posterior del Antebrazo (Grupo Lateral)",
          origin: "Dos tercios proximales de la cresta supracondílea lateral del húmero y tabique intermuscular lateral.",
          insertion: "Cara lateral de la base de la apófisis estiloides del radio.",
          innervation: "Nervio Radial (C5, C6).",
          action: "Flexión rápida del codo o contra resistencia, especialmente en posición de semipronación neutra (posición de apretón de manos).",
          clinicalNote: "Actúa como músculo de 'desvío' centrípeto, estabilizando la articulación durante movimientos rápidos."
        }
      ]
    },

    {
      id: "extension-codo",
      name: "Extensión de Codo",
      region: "codo",
      regionLabel: "Codo • Miembro Superior",
      code: "MS-02",
      joint: "Articulación Húmero-cubital",
      jointType: "Gínglimo / Troclear",
      plane: "Sagital",
      axis: "Eje Laterolateral (Transversal)",
      rom: "145° — 0° (hasta 5° de hiperextensión)",
      description: "Retorno del antebrazo desde la flexión, alineando el cúbito y el radio con el húmero.",
      lever: "1er Género (Interapoyo)",
      searchTerms: ["extender el codo", "estirar el brazo", "triceps", "anconeo", "codo"],
      primaryMuscle: "Tríceps braquial",
      synergistMuscles: ["Ancóneo"],
      antagonist: "Braquial anterior y Bíceps braquial",
      muscles: [
        {
          id: "triceps-braquial",
          name: "Tríceps Braquial",
          scientificName: "Musculus triceps brachii",
          role: "Agonista Primario",
          roleType: "primary",
          compartment: "Compartimento Braquial Posterior",
          origin: "Cabeza larga: Tubérculo infraglenoideo de la escápula. Cabeza lateral: Cara posterior del húmero (sobre el surco del N. radial). Cabeza medial: Cara posterior del húmero (bajo el surco del N. radial).",
          insertion: "Cara superior y posterior del olécranon del cúbito.",
          innervation: "Nervio Radial (C6, C7, C8).",
          action: "Principal extensor de la articulación del codo. La cabeza larga además aduce y extiende el hombro.",
          clinicalNote: "La cabeza medial está activa en todas las extensiones; las cabezas larga y lateral se reclutan contra resistencia."
        },
        {
          id: "anconeo",
          name: "Ancóneo",
          scientificName: "Musculus anconeus",
          role: "Sinergista / Estabilizador",
          roleType: "synergist",
          compartment: "Posterior del Codo",
          origin: "Superficie posterior del epicóndilo lateral del húmero.",
          insertion: "Cara lateral del olécranon y cuarto superior de la cara posterior del cúbito.",
          innervation: "Nervio Radial (C7, C8, T1).",
          action: "Ayuda al tríceps en la extensión terminal del codo y estabiliza la articulación húmero-cubital impidiendo pellizcos capsulares.",
          clinicalNote: "Abduce ligeramente el cúbito durante la pronación del antebrazo."
        }
      ]
    },

    {
      id: "abduccion-hombro",
      name: "Abducción de Hombro",
      region: "hombro",
      regionLabel: "Hombro • Cintura Escapular",
      code: "MS-03",
      joint: "Articulación Glenohumeral y Escapulotorácica",
      jointType: "Enartrosis (Esferoidea) multiaxial",
      plane: "Frontal",
      axis: "Eje Anteroposterior (Sagital)",
      rom: "0° — 180°",
      description: "Separación lateral del brazo alejándolo del plano sagital medio del tronco.",
      lever: "3er Género (Interpotente)",
      searchTerms: ["abduccion de hombro", "abducir el hombro", "separar el brazo", "hombro", "deltoides", "supraespinoso"],
      primaryMuscle: "Deltoides (fibras medias)",
      synergistMuscles: ["Supraespinoso", "Serrato anterior (báscula externa)"],
      antagonist: "Pectoral mayor y Dorsal ancho",
      muscles: [
        {
          id: "deltoides-medio",
          name: "Deltoides (Fibras Medias)",
          scientificName: "Musculus deltoideus (pars acromialis)",
          role: "Agonista Primario (15°-90°)",
          roleType: "primary",
          compartment: "Hombro (Región Deltoidea)",
          origin: "Borde lateral y cara superior del acromion de la escápula.",
          insertion: "Tuberosidad deltoidea del húmero (cara lateral del cuerpo humeral).",
          innervation: "Nervio Axilar / Circunflejo (C5, C6).",
          action: "Potente abductor del brazo una vez iniciados los primeros 15° de movimiento.",
          clinicalNote: "Su par de fuerza con el manguito rotador comprime la cabeza del húmero contra la glena para evitar el pinzamiento subacromial."
        },
        {
          id: "supraespinoso",
          name: "Supraespinoso",
          scientificName: "Musculus supraspinatus",
          role: "Iniciador Agonista (0°-15°)",
          roleType: "primary",
          compartment: "Manguito de los Rotadores (Fosa Supraespinosa)",
          origin: "Dos tercios mediales de la fosa supraespinosa de la escápula y fascia que lo recubre.",
          insertion: "Carilla articular superior del tubérculo mayor del húmero (troquíter).",
          innervation: "Nervio Supraescapular (C5, C6).",
          action: "Inicia la abducción del brazo en los primeros 15 grados y estabiliza la cabeza humeral dentro de la cavidad glenoidea.",
          clinicalNote: "Es el tendón que con mayor frecuencia se lesiona o inflama en el síndrome de manguito rotador."
        }
      ]
    },

    {
      id: "flexion-hombro",
      name: "Flexión de Hombro",
      region: "hombro",
      regionLabel: "Hombro • Cintura Escapular",
      code: "MS-04",
      joint: "Articulación Glenohumeral",
      jointType: "Enartrosis (Esferoidea)",
      plane: "Sagital",
      axis: "Eje Perpendicular Laterolateral (Transversal)",
      rom: "0° — 180°",
      description: "Elevación del brazo hacia adelante por delante del cuerpo en dirección cefálica.",
      lever: "3er Género",
      searchTerms: ["flexion de hombro", "levantar el brazo", "subir el brazo", "antebrazo", "deltoides anterior", "coracobraquial"],
      primaryMuscle: "Deltoides (fibras anteriores)",
      synergistMuscles: ["Coracobraquial", "Pectoral mayor (haz clavicular)"],
      antagonist: "Dorsal ancho y Redondo mayor",
      muscles: [
        {
          id: "deltoides-anterior",
          name: "Deltoides (Fibras Anteriores)",
          scientificName: "Musculus deltoideus (pars clavicularis)",
          role: "Agonista Primario",
          roleType: "primary",
          compartment: "Hombro (Porción Anterior)",
          origin: "Borde anterior y cara superior del tercio lateral de la clavícula.",
          insertion: "Tuberosidad deltoidea del húmero.",
          innervation: "Nervio Axilar (C5, C6).",
          action: "Flexión y rotación interna o medial del brazo a nivel de la articulación glenohumeral.",
          clinicalNote: "Fundamental para alcanzar objetos situados al frente a la altura del pecho o la cabeza."
        },
        {
          id: "coracobraquial",
          name: "Coracobraquial",
          scientificName: "Musculus coracobrachialis",
          role: "Sinergista",
          roleType: "synergist",
          compartment: "Compartimento Braquial Anterior (Profundo)",
          origin: "Vértice de la apófisis coracoides de la escápula (tendón compartido con la cabeza corta del bíceps).",
          insertion: "Tercio medio de la cara medial y borde medial del cuerpo del húmero.",
          innervation: "Nervio Musculocutáneo (C5, C6, C7), el cual lo atraviesa.",
          action: "Colabora en la flexión y aducción del brazo a nivel del hombro.",
          clinicalNote: "Referencia anatómica clave: el nervio musculocutáneo perfora su vientre muscular."
        },
        {
          id: "pectoral-mayor-clavicular",
          name: "Pectoral Mayor (Porción Clavicular)",
          scientificName: "Musculus pectoralis major (pars clavicularis)",
          role: "Sinergista Potente",
          roleType: "synergist",
          compartment: "Pared Torácica Anterior",
          origin: "Mitad medial del borde anterior de la clavícula.",
          insertion: "Cresta del tubérculo mayor del húmero (labio lateral del surco bicipital).",
          innervation: "Nervio Pectoral Lateral (C5, C6, C7).",
          action: "Flexiona el brazo desde la extensión completa hasta los 90°.",
          clinicalNote: "Reclutado activamente en empujes frontales o elevaciones contra gravedad."
        }
      ]
    },

    {
      id: "extension-rodilla",
      name: "Extensión de Rodilla",
      region: "rodilla",
      regionLabel: "Rodilla • Miembro Inferior",
      code: "MI-01",
      joint: "Articulación Tibiofemoral y Femororrotuliana",
      jointType: "Bicondílea / Trocleartrosis funcional",
      plane: "Sagital",
      axis: "Eje Laterolateral (Transversal)",
      rom: "135° — 0° (extensión completa)",
      description: "Alineación de la tibia con el fémur, aumentando el ángulo articular de la rodilla.",
      lever: "1er / 3er Género (con patela como polea anatómica)",
      searchTerms: ["extension de rodilla", "estirar la pierna", "patear", "cuadriceps", "recto femoral", "rodilla"],
      primaryMuscle: "Cuádriceps femoral (Vastos y Recto femoral)",
      synergistMuscles: ["Tensor de la fascia lata (estabilizador)"],
      antagonist: "Isquiotibiales (Bíceps femoral, Semitendinoso, Semimembranoso)",
      muscles: [
        {
          id: "recto-femoral",
          name: "Recto Femoral (Recto anterior)",
          scientificName: "Musculus rectus femoris",
          role: "Agonista Biarticular",
          roleType: "primary",
          compartment: "Compartimento Femoral Anterior",
          origin: "Espina ilíaca anteroinferior (tendón directo) y surco superior al reborde del acetábulo (tendón reflejo).",
          insertion: "Base de la rótula y, mediante el ligamento rotuliano, en la tuberosidad de la tibia.",
          innervation: "Nervio Femoral (L2, L3, L4).",
          action: "Extiende la articulación de la rodilla y colabora activamente en la flexión de la articulación de la cadera.",
          clinicalNote: "Es el único de los cuatro vientres del cuádriceps que cruza la cadera, por lo que es propenso a retracciones musculares."
        },
        {
          id: "vasto-medial",
          name: "Vasto Medial",
          scientificName: "Musculus vastus medialis",
          role: "Agonista / Guía Patelar",
          roleType: "primary",
          compartment: "Compartimento Femoral Anterior (Medial)",
          origin: "Parte distal de la línea intertrocantérea, labio medial de la línea áspera y línea supracondílea medial del fémur.",
          insertion: "Borde medial de la rótula y expansión al tendón del cuádriceps y retináculo patelar medial.",
          innervation: "Nervio Femoral (L2, L3, L4).",
          action: "Extensión de rodilla y estabilización medial de la rótula en los últimos grados de extensión.",
          clinicalNote: "Sus fibras oblicuas (VMO) previenen la subluxación lateral de la rótula."
        },
        {
          id: "vasto-lateral",
          name: "Vasto Lateral",
          scientificName: "Musculus vastus lateralis",
          role: "Agonista Mayor",
          roleType: "primary",
          compartment: "Compartimento Femoral Anterior (Lateral)",
          origin: "Cara lateral del trocánter mayor, tuberosidad glútea y labio lateral de la línea áspera del fémur.",
          insertion: "Borde lateral de la rótula y tendón común del cuádriceps.",
          innervation: "Nervio Femoral (L2, L3, L4).",
          action: "Es el vientre más voluminoso y potente del cuádriceps; genera la mayor fuerza de extensión de rodilla.",
          clinicalNote: "Frecuente punto de aplicación de inyecciones intramusculares en pediatría."
        }
      ]
    },

    {
      id: "flexion-rodilla",
      name: "Flexión de Rodilla",
      region: "rodilla",
      regionLabel: "Rodilla • Miembro Inferior",
      code: "MI-02",
      joint: "Articulación Tibiofemoral",
      jointType: "Bicondílea con meniscos",
      plane: "Sagital",
      axis: "Eje Laterolateral (Transversal)",
      rom: "0° — 135°/140°",
      description: "Aproximación de la cara posterior de la pierna hacia la cara posterior del muslo.",
      lever: "3er Género",
      searchTerms: ["flexion de rodilla", "doblar la pierna", "talon al gluteo", "isquiotibiales", "isquiosurales", "biceps femoral"],
      primaryMuscle: "Bíceps femoral, Semitendinoso y Semimembranoso",
      synergistMuscles: ["Gastrocnemios", "Poplíteo (desbloqueador)", "Sartorio", "Grácil"],
      antagonist: "Cuádriceps femoral",
      muscles: [
        {
          id: "biceps-femoral",
          name: "Bíceps Femoral",
          scientificName: "Musculus biceps femoris",
          role: "Agonista Primario (Lateral)",
          roleType: "primary",
          compartment: "Compartimento Femoral Posterior (Isquiotibiales)",
          origin: "Cabeza larga: Tuberosidad isquiática (cara posteroinferior). Cabeza corta: Labio lateral de la línea áspera y línea supracondílea lateral del fémur.",
          insertion: "Cara lateral de la cabeza del peroné y cóndilo lateral de la tibia.",
          innervation: "Cabeza larga: Rama tibial del N. Ciático (L5, S1, S2). Cabeza corta: Rama peronea común del N. Ciático (L5, S1).",
          action: "Flexiona y rota lateralmente la pierna sobre el muslo (cuando la rodilla está flexionada); extiende la cadera (cabeza larga).",
          clinicalNote: "El músculo con mayor índice de desgarros en corredores durante la desaceleración del ciclo de marcha."
        },
        {
          id: "semitendinoso",
          name: "Semitendinoso",
          scientificName: "Musculus semitendinosus",
          role: "Agonista Primario (Medial)",
          roleType: "primary",
          compartment: "Compartimento Femoral Posterior",
          origin: "Tuberosidad isquiática (junto con la cabeza larga del bíceps femoral).",
          insertion: "Cara medial de la porción superior de la tibia (forma la pata de ganso junto al sartorio y grácil).",
          innervation: "Rama tibial del Nervio Ciático (L5, S1, S2).",
          action: "Flexiona y rota medialmente la rodilla; extiende la cadera.",
          clinicalNote: "Su tendón distal largo se utiliza habitualmente como injerto para la reconstrucción del Ligamento Cruzado Anterior (LCA)."
        },
        {
          id: "semimembranoso",
          name: "Semimembranoso",
          scientificName: "Musculus semimembranosus",
          role: "Agonista Primario (Profundo Medial)",
          roleType: "primary",
          compartment: "Compartimento Femoral Posterior",
          origin: "Porción superolateral de la tuberosidad isquiática.",
          insertion: "Parte posterior del cóndilo medial de la tibia y forma el ligamento poplíteo oblicuo de la rodilla.",
          innervation: "Rama tibial del Nervio Ciático (L5, S1, S2).",
          action: "Flexiona la rodilla y rota medialmente la tibia; potente extensor de la cadera.",
          clinicalNote: "La bursa entre este tendón y la cabeza medial del gastrocnemio puede originar el Quiste de Baker."
        }
      ]
    },

    {
      id: "flexion-cadera",
      name: "Flexión de Cadera",
      region: "cadera",
      regionLabel: "Cadera • Pelvis y Muslo",
      code: "MI-03",
      joint: "Articulación Coxofemoral",
      jointType: "Enartrosis (Esferoidea) cotiloidea",
      plane: "Sagital",
      axis: "Eje Laterolateral (Transversal)",
      rom: "0° — 120° (con rodilla flexionada)",
      description: "Aproximación de la cara anterior del muslo hacia el tronco o abdomen.",
      lever: "3er Género",
      searchTerms: ["flexion de cadera", "levantar la pierna", "subir la rodilla", "psoas", "iliaco", "cadera"],
      primaryMuscle: "Psoas-Ilíaco (Iliopsoas)",
      synergistMuscles: ["Recto femoral", "Sartorio", "Tensor de la fascia lata"],
      antagonist: "Glúteo mayor e Isquiotibiales",
      muscles: [
        {
          id: "psoas-mayor",
          name: "Psoas Mayor",
          scientificName: "Musculus psoas major",
          role: "Agonista Primario",
          roleType: "primary",
          compartment: "Pared Abdominal Posterior / Fosa Ilíaca",
          origin: "Cuerpos de T12-L4, discos intervertebrales adyacentes y apófisis transversas de L1-L5.",
          insertion: "Trocánter menor del fémur a través del tendón iliopsoas.",
          innervation: "Ramos anteriores de los nervios espinales lumbares (L1, L2, L3).",
          action: "El flexor más potente de la articulación de la cadera; flexiona el tronco sobre el fémur en sedestación.",
          clinicalNote: "El acortamiento del psoas genera hiperlordosis lumbar y dolor lumbopélvico frecuente en estudiantes."
        },
        {
          id: "iliaco",
          name: "Ilíaco",
          scientificName: "Musculus iliacus",
          role: "Agonista Primario",
          roleType: "primary",
          compartment: "Fosa Ilíaca Interna",
          origin: "Dos tercios superiores de la fosa ilíaca, labio interno de la cresta ilíaca y ala del sacro.",
          insertion: "Trocánter menor del fémur (fusionado con el tendón del psoas mayor).",
          innervation: "Nervio Femoral (L2, L3).",
          action: "Flexión potente de la cadera y estabilización anterior de la cabeza femoral en el acetábulo.",
          clinicalNote: "Junto al psoas conforma una unidad funcional inseparable llamada 'músculo iliopsoas'."
        }
      ]
    },

    {
      id: "abduccion-cadera",
      name: "Abducción de Cadera",
      region: "cadera",
      regionLabel: "Cadera • Cintura Pélvica",
      code: "MI-04",
      joint: "Articulación Coxofemoral",
      jointType: "Enartrosis",
      plane: "Frontal",
      axis: "Eje Anteroposterior (Sagital)",
      rom: "0° — 45°",
      description: "Separación del miembro inferior de la línea media corporal.",
      lever: "1er Género en apoyo monopodal / 3er Género en cadena abierta",
      searchTerms: ["abduccion de cadera", "separar la pierna", "abrir la pierna", "gluteo medio", "trendelenburg", "cadera"],
      primaryMuscle: "Glúteo medio",
      synergistMuscles: ["Glúteo menor", "Tensor de la fascia lata"],
      antagonist: "Aductor mayor, Aductor largo, Aductor corto y Grácil",
      muscles: [
        {
          id: "gluteo-medio",
          name: "Glúteo Medio",
          scientificName: "Musculus gluteus medius",
          role: "Agonista Primario y Estabilizador Clave",
          roleType: "primary",
          compartment: "Región Glútea (Capa Intermedia)",
          origin: "Cara glútea externa del ilion, entre las líneas glúteas anterior y posterior.",
          insertion: "Cara lateral y posterosuperior del trocánter mayor del fémur.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Abduce el fémur en la articulación coxofemoral; mantiene nivelada la pelvis en la fase de apoyo de la marcha.",
          clinicalNote: "Su debilidad produce la Marcha de Trendelenburg (caída de la hemipelvis opuesta al caminar)."
        },
        {
          id: "gluteo-menor",
          name: "Glúteo Menor",
          scientificName: "Musculus gluteus minimus",
          role: "Sinergista Agonista (Profundo)",
          roleType: "synergist",
          compartment: "Región Glútea (Capa Profunda)",
          origin: "Cara externa del ilion entre las líneas glúteas anterior e inferior.",
          insertion: "Borde anterior del trocánter mayor del fémur.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Abducción y rotación medial del fémur; ayuda a centrar la cabeza femoral en el cótilo.",
          clinicalNote: "Trabaja en estrecha sinergia con el glúteo medio protegiendo la cápsula articular."
        },
        {
          id: "tensor-fascia-lata",
          name: "Tensor de la Fascia Lata (TFL)",
          scientificName: "Musculus tensor fasciae latae",
          role: "Sinergista",
          roleType: "synergist",
          compartment: "Glúteo / Anterolateral del Muslo",
          origin: "Espina ilíaca anterosuperior y porción anterior del labio externo de la cresta ilíaca.",
          insertion: "Tracto iliotibial (bandeleta de Maissiat) que se inserta en el tubérculo de Gerdy en la tibia.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Abduce, flexiona y rota medialmente el muslo; tensa la fascia lata y estabiliza la rodilla lateralmente.",
          clinicalNote: "Su tensión excesiva provoca el síndrome de fricción de la cintilla iliotibial en atletas."
        }
      ]
    },

    {
      id: "dorsiflexion-tobillo",
      name: "Dorsiflexión de Tobillo",
      region: "tobillo",
      regionLabel: "Tobillo • Pierna y Pie",
      code: "MI-05",
      joint: "Articulación Talocrural (Tibiotarsiana)",
      jointType: "Trocleartrosis (Gínglimo)",
      plane: "Sagital",
      axis: "Eje Bimaleolar Laterolateral (Transversal)",
      rom: "0° — 20°/30°",
      description: "Elevación del dorso del pie hacia la cara anterior de la tibia (llevar la punta del pie arriba).",
      lever: "2do / 3er Género",
      searchTerms: ["dorsiflexion de tobillo", "subir la punta del pie", "levantar el pie", "tibial anterior", "tobillo"],
      primaryMuscle: "Tibial anterior",
      synergistMuscles: ["Extensor largo de los dedos", "Extensor largo del dedo gordo", "Tercer peroneo"],
      antagonist: "Gastrocnemios y Sóleo (Tríceps sural)",
      muscles: [
        {
          id: "tibial-anterior",
          name: "Tibial Anterior",
          scientificName: "Musculus tibialis anterior",
          role: "Agonista Primario",
          roleType: "primary",
          compartment: "Compartimento Anterior de la Pierna",
          origin: "Cóndilo lateral y mitad proximal de la superficie lateral de la diáfisis tibial y membrana interósea.",
          insertion: "Cara medial e inferior del hueso cuneiforme medial y base del 1er metatarsiano.",
          innervation: "Nervio Peroneo Profundo / Fibular Profundo (L4, L5).",
          action: "Dorsiflexión del pie a nivel del tobillo e inversión del pie a nivel de las articulaciones intertarsianas.",
          clinicalNote: "Su parálisis (por lesión del N. peroneo común) produce el 'pie caído' o marcha en estepaje."
        },
        {
          id: "extensor-largo-dedos",
          name: "Extensor Largo de los Dedos",
          scientificName: "Musculus extensor digitorum longus",
          role: "Sinergista",
          roleType: "synergist",
          compartment: "Compartimento Anterior de la Pierna",
          origin: "Cóndilo lateral de la tibia y tres cuartos proximales de la cara anterior del peroné y membrana interósea.",
          insertion: "Falanges media y distal de los cuatro dedos laterales del pie (2° al 5° dedo).",
          innervation: "Nervio Peroneo Profundo (L5, S1).",
          action: "Extiende los cuatro dedos laterales y asiste en la dorsiflexión del pie a nivel del tobillo.",
          clinicalNote: "Garantiza que los dedos no rocen el suelo durante la fase de balanceo de la marcha."
        }
      ]
    },

    {
      id: "flexion-plantar-tobillo",
      name: "Flexión Plantar de Tobillo",
      region: "tobillo",
      regionLabel: "Tobillo • Pierna y Pie",
      code: "MI-06",
      joint: "Articulación Talocrural",
      jointType: "Trocleartrosis",
      plane: "Sagital",
      axis: "Eje Bimaleolar Laterolateral (Transversal)",
      rom: "0° — 45°/50°",
      description: "Descenso del pie aumentando el ángulo con la tibia (ponerse de puntas de pie).",
      lever: "2do Género (Interresistencia - Palanca de fuerza máxima)",
      searchTerms: ["flexion plantar de tobillo", "ponerse en puntas de pie", "gemelos", "soleo", "triceps sural", "tobillo"],
      primaryMuscle: "Gastrocnemios y Sóleo (Tríceps sural)",
      synergistMuscles: ["Plantar delgado", "Tibial posterior", "Flexor largo de los dedos", "Peroneo largo"],
      antagonist: "Tibial anterior",
      muscles: [
        {
          id: "gastrocnemios",
          name: "Gastrocnemios (Gemelos)",
          scientificName: "Musculus gastrocnemius",
          role: "Agonista Primario Dinámico",
          roleType: "primary",
          compartment: "Compartimento Posterior Superficial de la Pierna",
          origin: "Cabeza medial: Porción posterosuperior del cóndilo medial del fémur. Cabeza lateral: Cara posterolateral del cóndilo femoral lateral.",
          insertion: "Cara posterior del hueso calcáneo mediante el tendón calcáneo (tendón de Aquiles).",
          innervation: "Nervio Tibial (S1, S2).",
          action: "Potente flexión plantar del pie al extender la rodilla; colabora en la flexión de la rodilla.",
          clinicalNote: "Músculo de potencia y despegue explosivo al saltar, correr o subir escaleras."
        },
        {
          id: "soleo",
          name: "Sóleo",
          scientificName: "Musculus soleus",
          role: "Agonista Postural Continuo",
          roleType: "primary",
          compartment: "Compartimento Posterior Superficial (Profundo a los gemelos)",
          origin: "Cara posterior de la cabeza y tercio proximal del peroné, línea del sóleo y tercio medio del borde medial de la tibia.",
          insertion: "Cara posterior del calcáneo mediante el tendón común de Aquiles.",
          innervation: "Nervio Tibial (S1, S2).",
          action: "Flexión plantar constante del tobillo; estabiliza la pierna sobre el pie durante la bipedestación quieta.",
          clinicalNote: "Rico en fibras lentas tipo I; funciona como 'bomba muscular' periférica para el retorno venoso."
        }
      ]
    }
  ]
};
