// =============================================================================
// KineFlash PRO - Base de Datos Anatómica y Biomecánica Exhaustiva
// Revisión anatómica clínica según Latarjet-Ruiz Liard, Rouvière y Moore
// =============================================================================

const ANATOMY_DATABASE = {
  regions: [
    { id: "all", name: "Todas", icon: "all_inclusive", color: "cyan" },
    { id: "codo", name: "Codo", icon: "sports_handball", color: "active" },
    { id: "hombro", name: "Hombro", icon: "accessibility", color: "active" },
    { id: "rodilla", name: "Rodilla", icon: "snowshoeing", color: "active" },
    { id: "cadera", name: "Cadera", icon: "directions_walk", color: "active" },
    { id: "tobillo", name: "Tobillo", icon: "footprint", color: "active" }
  ],

  planes: [
    { id: "all", name: "Todos los planos" },
    { id: "Sagital", name: "Plano Sagital" },
    { id: "Frontal", name: "Plano Frontal" },
    { id: "Transversal", name: "Plano Transversal" }
  ],

  movements: [
    // -------------------------------------------------------------------------
    // 1. FLEXIÓN DE CODO
    // -------------------------------------------------------------------------
    {
      id: "flexion-codo",
      name: "Flexión de Codo",
      region: "codo",
      regionLabel: "Codo • Miembro Superior",
      code: "MS-01",
      joint: "Articulación Húmero-cubital y Húmero-radial",
      jointType: "Gínglimo / Troclear (Húmero-cubital) y Enartrosis / Esferoidea funcional (Húmero-radial)",
      plane: "Sagital",
      axis: "Eje Perpendicular Laterolateral (Transversal)",
      rom: "0° — 145° (Activo) / 160° (Pasivo)",
      description: "Aproximación de la cara anterior del antebrazo hacia la cara anterior del brazo mediante rotación sobre el eje transversal trócleo-condíleo.",
      lever: "3er Género (Interpotente - El esfuerzo muscular se aplica entre el punto de apoyo y la resistencia)",
      animationType: "elbow-flexion",
      gifUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
      searchTerms: ["flexion de codo", "doblar brazo", "biceps", "braquial", "antebrazo", "codo", "humerocubital"],
      primaryMuscle: "Braquial anterior",
      synergistMuscles: ["Bíceps braquial", "Braquiorradial", "Pronador redondo"],
      antagonist: "Tríceps braquial y Ancóneo",
      muscles: [
        {
          id: "braquial-anterior",
          name: "Braquial Anterior",
          scientificName: "Musculus brachialis",
          role: "Agonista Primario",
          roleType: "primary",
          compartment: "Compartimento Braquial Anterior (Plano Profundo)",
          origin: "Mitad distal de las caras anteromedial y anterolateral del cuerpo del húmero (abarcando las zonas bajo la V deltoidea) y tabiques intermusculares medial y lateral del brazo.",
          insertion: "Tuberosidad del cúbito (tuberositas ulnae) y cara anterior de la apófisis coronoides del cúbito.",
          innervation: "Nervio Musculocutáneo (C5, C6). Además recibe ramas propioceptivas accesorias del Nervio Radial (C7).",
          action: "Principal flexor del antebrazo en la articulación del codo. Es el flexor más constante y potente, actuando con máxima fuerza sin importar la posición de pronación o supinación del antebrazo.",
          clinicalNote: "Se le denomina 'el burro de carga' del codo. Al insertarse en el cúbito (que no rota), su brazo de palanca se mantiene invariante en cualquier movimiento de rotación del radio."
        },
        {
          id: "biceps-braquial",
          name: "Bíceps Braquial",
          scientificName: "Musculus biceps brachii",
          role: "Sinergista Principal (Agonista en Supinación)",
          roleType: "synergist",
          compartment: "Compartimento Braquial Anterior (Plano Superficial)",
          origin: "• Cabeza Corta: Vértice de la apófisis coracoides de la escápula (tendón común con el coracobraquial).\n• Cabeza Larga: Tubérculo supraglenoideo de la escápula y rodete glenoideo (tendón intraarticular que recorre el surco intertubercular).",
          insertion: "Parte posterior de la tuberosidad del radio (separada por la bursa bicipitorradial) y aponeurosis bicipital (lacerus fibrosus) que se expande hacia la fascia antebraquial medial.",
          innervation: "Nervio Musculocutáneo (C5, C6).",
          action: "Potente supinador del antebrazo flexionado y flexor mayor del codo cuando el antebrazo está en supinación. Coadyuva débilmente en la flexión y coaptación de la articulación glenohumeral.",
          clinicalNote: "El reflejo bicipital evalúa el arco reflejo a nivel radicular C5-C6. Si el antebrazo está en pronación forzada, el tendón del bíceps se enrolla en el radio y pierde hasta un 40% de ventaja mecánica flexora."
        },
        {
          id: "braquiorradial",
          name: "Braquiorradial (Supinador Largo)",
          scientificName: "Musculus brachioradialis",
          role: "Sinergista / Estabilizador Shunt",
          roleType: "synergist",
          compartment: "Compartimento Antebraquial Lateral / Posterior Superficial",
          origin: "Dos tercios proximales de la cresta supracondílea lateral del húmero y cara anterior del tabique intermuscular lateral.",
          insertion: "Cara lateral de la base de la apófisis estiloides del radio.",
          innervation: "Nervio Radial (C5, C6), antes de su bifurcación en el codo.",
          action: "Flexiona el codo con mayor ventaja mecánica cuando el antebrazo se encuentra en posición neutra o semiprona (apretón de manos). Asiste en el retorno hacia la posición neutra desde pronación o supinación extrema.",
          clinicalNote: "Actúa como músculo centrípeto o 'de derivación' (shunt muscle): comprime la cabeza del radio contra el cóndilo humeral impidiendo la luxación articular en movimientos rápidos."
        },
        {
          id: "pronador-redondo",
          name: "Pronador Redondo",
          scientificName: "Musculus pronator teres",
          role: "Sinergista Accesorio",
          roleType: "synergist",
          compartment: "Compartimento Antebraquial Anterior (1er Plano Superficial)",
          origin: "• Cabeza Humeral: Por encima del epicóndilo medial del húmero (epitróclea) y tendón común de los flexores.\n• Cabeza Cubital: Cara medial de la apófisis coronoides del cúbito.",
          insertion: "Porción media de la cara lateral de la diáfisis del radio (tuberosidad pronadora).",
          innervation: "Nervio Mediano (C6, C7).",
          action: "Pronación del antebrazo y asiste débilmente en la flexión del codo cuando hay resistencia añadida.",
          clinicalNote: "El nervio mediano pasa entre las dos cabezas de este músculo; su hipertrofia o espasmo puede generar el Síndrome del Pronador Redondo."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 2. EXTENSIÓN DE CODO
    // -------------------------------------------------------------------------
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
      rom: "145° — 0° (hasta 5°-10° de hiperextensión en mujeres y niños)",
      description: "Movimiento de alejamiento del antebrazo respecto al brazo, alineando el cúbito en el plano sagital hasta el encaje del olécranon en la fosa olecraniana.",
      lever: "1er Género (Interapoyo - El fulcro articular se ubica entre la fuerza del tríceps y la resistencia del antebrazo)",
      animationType: "elbow-extension",
      gifUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
      searchTerms: ["extension de codo", "estirar brazo", "triceps", "anconeo", "codo posterior"],
      primaryMuscle: "Tríceps braquial",
      synergistMuscles: ["Ancóneo"],
      antagonist: "Braquial anterior y Bíceps braquial",
      muscles: [
        {
          id: "triceps-braquial",
          name: "Tríceps Braquial (Cabezas Larga, Lateral y Medial)",
          scientificName: "Musculus triceps brachii",
          role: "Agonista Primario Absoluto",
          roleType: "primary",
          compartment: "Compartimento Braquial Posterior",
          origin: "• Cabeza Larga: Tubérculo infraglenoideo de la escápula y rodete glenoideo adyacente.\n• Cabeza Lateral: Cara posterior del húmero, por encima del surco del nervio radial (canal de torsión) y tabique intermuscular lateral.\n• Cabeza Medial: Cara posterior del húmero, por debajo del surco del nervio radial y tabique intermuscular medial.",
          insertion: "Cara superior y posterior del olécranon del cúbito (tendón tricipital común) y expansión a la fascia antebraquial posterior.",
          innervation: "Nervio Radial (C6, C7, C8). Cada cabeza recibe ramos nerviosos individuales.",
          action: "Extensor principal y potente del codo en todas las posiciones. La cabeza larga es biarticular: aduce y colabora en la retroversión/extensión del húmero en la articulación glenohumeral.",
          clinicalNote: "El reflejo tricipital evalúa preferentemente el nivel radicular C7. La cabeza medial se activa contra cualquier resistencia menor; las cabezas lateral y larga se reclutan en esfuerzos intensos."
        },
        {
          id: "anconeo",
          name: "Ancóneo",
          scientificName: "Musculus anconeus",
          role: "Sinergista y Estabilizador Posterior",
          roleType: "synergist",
          compartment: "Región Posterior del Codo (Triángulo Olecraniano)",
          origin: "Superficie posterior e inferior del epicóndilo lateral del húmero.",
          insertion: "Cara lateral del olécranon y porción superior posterolateral de la diáfisis cubital.",
          innervation: "Nervio Radial (C7, C8, T1), por medio de una rama proveniente de la cabeza medial del tríceps.",
          action: "Coadyuva en la fase final de la extensión del codo y abduce ligeramente el cúbito durante la pronación. Tensa y protege la cápsula articular evitando pliegues sinoviales pellizcados.",
          clinicalNote: "Es el estabilizador dinámico más importante de la cápsula posterior del codo."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 3. ABDUCCIÓN DE HOMBRO
    // -------------------------------------------------------------------------
    {
      id: "abduccion-hombro",
      name: "Abducción de Hombro",
      region: "hombro",
      regionLabel: "Hombro • Cintura Escapular",
      code: "MS-03",
      joint: "Complejo Articular del Hombro (Glenohumeral, Subdeltoidea, Escapulotorácica y Acromioclavicular)",
      jointType: "Enartrosis (Esferoidea) multiaxial de tres grados de libertad",
      plane: "Frontal / Coronal",
      axis: "Eje Anteroposterior (Sagital)",
      rom: "0° — 180° (0-90° Glenohumeral pura; 90-150° Escapulotorácica; 150-180° Inclinación de raquis)",
      description: "Separación lateral del miembro superior alejándolo del plano sagital medio del cuerpo.",
      lever: "3er Género (Interpotente - Deltoides inserta distal al centro de giro articular)",
      animationType: "shoulder-abduction",
      gifUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80",
      searchTerms: ["abduccion de hombro", "abducir hombro", "separar brazo", "deltoides", "supraespinoso", "hombro"],
      primaryMuscle: "Deltoides (con sus tres porciones detalladas)",
      synergistMuscles: ["Supraespinoso", "Serrato anterior", "Trapecio"],
      antagonist: "Pectoral mayor, Dorsal ancho y Redondo mayor",
      muscles: [
        {
          id: "deltoides-completo",
          name: "Músculo Deltoides (Porciones Clavicular, Acromial y Espinal)",
          scientificName: "Musculus deltoideus",
          role: "Agonista Primario en Abducción, Flexión y Extensión",
          roleType: "primary",
          compartment: "Hombro • Músculo Capitular Voluminoso",
          origin: "Posee 3 cabezas de inserción proximal bien delimitadas:\n" +
                  "1. PORCIÓN CLAVICULAR (Anterior): Borde anterior y cara superior del tercio lateral de la clavícula.\n" +
                  "2. PORCIÓN ACROMIAL (Media / Multipenniforme): Borde lateral y vértice del acromion de la escápula.\n" +
                  "3. PORCIÓN ESPINAL (Posterior): Labio inferior del borde posterior de la espina de la escápula en toda su longitud.",
          insertion: "Todas sus porciones convergen distalmente en la tuberosidad deltoidea del húmero (cresta deltoidea o 'V deltoidea'), en la cara lateral de la diáfisis humeral.",
          innervation: "Nervio Axilar / Circunflejo (C5, C6), tronco secundario posterior del plexo braquial.",
          action: "• Porción Acromial (Media): Es el motor agonista principal de la abducción del brazo de 15° a 90°.\n" +
                  "• Porción Clavicular (Anterior): Potente flexor y rotador medial del húmero; colabora en la aducción horizontal.\n" +
                  "• Porción Espinal (Posterior): Potente extensor y rotador lateral del húmero; motor de la abducción horizontal.",
          clinicalNote: "La atrofia del deltoides borra el contorno redondeado del hombro (signo de la charretera por lesión del nervio axilar en fracturas de cuello quirúrgico del húmero)."
        },
        {
          id: "supraespinoso",
          name: "Supraespinoso",
          scientificName: "Musculus supraspinatus",
          role: "Iniciador de Abducción (0°-15°) y Coaptador",
          roleType: "primary",
          compartment: "Manguito de los Rotadores • Fosa Supraespinosa",
          origin: "Dos tercios mediales de la fosa supraespinosa de la escápula y cara profunda de la fascia supraspinosa.",
          insertion: "Carilla superior del tubérculo mayor del húmero (troquíter) y cápsula articular glenohumeral.",
          innervation: "Nervio Supraescapular (C5, C6).",
          action: "Inicia la abducción glenohumeral (0° a 15° iniciales) y genera coaptación concéntrica de la cabeza humeral dentro de la cavidad glenoidea, previniendo su ascenso desmedido.",
          clinicalNote: "Es el tendón con mayor tasa de rotura y pinzamiento (impingement subacromial) debido a su zona hipovascular crítica bajo el arco coracoacromial."
        },
        {
          id: "serrato-anterior",
          name: "Serrato Anterior (Serrato Mayor)",
          scientificName: "Musculus serratus anterior",
          role: "Sinergista Escapulotorácico Clave",
          roleType: "synergist",
          compartment: "Pared Lateral del Tórax",
          origin: "Caras laterales de las costillas 1ª a 9ª mediante digitaciones carnosas en forma de sierra.",
          insertion: "Cara anterior del borde medial de la escápula (desde el ángulo superior hasta el ángulo inferior).",
          innervation: "Nervio Torácico Largo / Respiratorio de Charles Bell (C5, C6, C7).",
          action: "Genera el campaneo externo o báscula lateral de la escápula (rotación de la glena hacia arriba), permitiendo la abducción del brazo más allá de los 90° hasta los 180°.",
          clinicalNote: "Su parálisis provoca la temida 'escápula alada' (winged scapula), impidiendo al paciente elevar el brazo por encima de la horizontal."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 4. FLEXIÓN DE HOMBRO
    // -------------------------------------------------------------------------
    {
      id: "flexion-hombro",
      name: "Flexión de Hombro (Anteversión)",
      region: "hombro",
      regionLabel: "Hombro • Cintura Escapular",
      code: "MS-04",
      joint: "Articulación Glenohumeral",
      jointType: "Enartrosis (Esferoidea)",
      plane: "Sagital",
      axis: "Eje Perpendicular Laterolateral (Transversal)",
      rom: "0° — 180°",
      description: "Desplazamiento anterior del húmero en el plano sagital, elevando el brazo hacia el frente y por encima de la cabeza.",
      lever: "3er Género (Interpotente)",
      animationType: "shoulder-flexion",
      gifUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
      searchTerms: ["flexion de hombro", "levantar brazo", "subir brazo", "anteversion", "deltoides anterior", "coracobraquial"],
      primaryMuscle: "Deltoides (Porción Clavicular Anterior)",
      synergistMuscles: ["Coracobraquial", "Pectoral mayor (porción clavicular)", "Bíceps braquial"],
      antagonist: "Dorsal ancho, Redondo mayor y Deltoides espinal posterior",
      muscles: [
        {
          id: "deltoides-anterior",
          name: "Deltoides (Fibras Claviculares / Anteriores)",
          scientificName: "Musculus deltoideus (pars clavicularis)",
          role: "Agonista Primario",
          roleType: "primary",
          compartment: "Hombro Anterior",
          origin: "Borde anterior y tercio lateral de la cara superior de la clavícula.",
          insertion: "Tuberosidad deltoidea del húmero (V deltoidea).",
          innervation: "Nervio Axilar (C5, C6).",
          action: "Flexión potente del húmero en el plano sagital y rotación medial del brazo; colabora en la aducción horizontal.",
          clinicalNote: "Fundamental para todas las actividades funcionales de alcance frontal hacia la cara o estantes elevados."
        },
        {
          id: "coracobraquial",
          name: "Coracobraquial",
          scientificName: "Musculus coracobrachialis",
          role: "Sinergista Agonista",
          roleType: "synergist",
          compartment: "Compartimento Braquial Anterior Profundo",
          origin: "Vértice de la apófisis coracoides de la escápula (tendón fusionado con la cabeza corta del bíceps).",
          insertion: "Tercio medio de la cara anteromedial y borde medial de la diáfisis del húmero.",
          innervation: "Nervio Musculocutáneo (C5, C6, C7), el cual perfora directamente su vientre muscular.",
          action: "Flexión y aducción del brazo a nivel de la articulación glenohumeral; resiste la luxación inferior de la cabeza humeral.",
          clinicalNote: "Referencia quirúrgica y anatómica esencial: el nervio musculocutáneo lo atraviesa de medial a lateral."
        },
        {
          id: "pectoral-mayor-clavicular",
          name: "Pectoral Mayor (Porción Clavicular)",
          scientificName: "Musculus pectoralis major (pars clavicularis)",
          role: "Sinergista Potente en Flexión",
          roleType: "synergist",
          compartment: "Pared Torácica Anterior",
          origin: "Cara anterior de la mitad esternal/medial de la clavícula.",
          insertion: "Labio lateral del surco intertubercular del húmero (cresta del tubérculo mayor).",
          innervation: "Nervio Pectoral Lateral (C5, C6).",
          action: "Flexiona el brazo desde la extensión máxima hasta los 90°; aduce horizontalmente el brazo hacia el lado opuesto.",
          clinicalNote: "Trabaja vigorosamente en movimientos de empuje hacia el frente (estilo flexiones de pecho o press militar)."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 5. EXTENSIÓN DE RODILLA
    // -------------------------------------------------------------------------
    {
      id: "extension-rodilla",
      name: "Extensión de Rodilla",
      region: "rodilla",
      regionLabel: "Rodilla • Miembro Inferior",
      code: "MI-01",
      joint: "Articulación Tibiofemoral y Femororrotuliana (Patelofemoral)",
      jointType: "Bicondílea con meniscos (Tibiofemoral) y Tróclea / Gínglimo (Femororrotuliana)",
      plane: "Sagital",
      axis: "Eje Bicondíleo Laterolateral (Transversal)",
      rom: "135°/140° — 0° (Extensión neutra completa)",
      description: "Aumento del ángulo articular entre el fémur y la tibia en el plano sagital, con desplazamiento de la rótula hacia arriba en la garganta troclear.",
      lever: "1er / 3er Género anatómico con polea patelar (la rótula incrementa el brazo de palanca del tendón en un 30-50%)",
      animationType: "knee-extension",
      gifUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
      searchTerms: ["extension de rodilla", "estirar pierna", "cuadriceps", "recto femoral", "vasto medial", "vasto lateral", "rodilla"],
      primaryMuscle: "Cuádriceps femoral (Recto femoral, Vastos medial, lateral e intermedio)",
      synergistMuscles: ["Tensor de la fascia lata (estabilizador externo)"],
      antagonist: "Isquiotibiales (Bíceps femoral, Semitendinoso, Semimembranoso)",
      muscles: [
        {
          id: "cuadriceps-femoral",
          name: "Cuádriceps Femoral (Las 4 Cabezas Exhaustivas)",
          scientificName: "Musculus quadriceps femoris",
          role: "Agonista Primario Absoluto",
          roleType: "primary",
          compartment: "Compartimento Femoral Anterior",
          origin: "Se compone de 4 cabezas musculares fundamentales:\n" +
                  "1. RECTO FEMORAL (Biarticular): Espina ilíaca anteroinferior (tendón directo) y surco supraacetabular del ilion (tendón reflejo).\n" +
                  "2. VASTO MEDIAL: Parte distal de la línea intertrocantérea, labio medial de la línea áspera y línea supracondílea medial del fémur.\n" +
                  "3. VASTO LATERAL: Trocánter mayor, tuberosidad glútea y labio lateral de la línea áspera del fémur.\n" +
                  "4. VASTO INTERMEDIO (Crural): Caras anterior y lateral de los dos tercios superiores de la diáfisis femoral y tabique intermuscular lateral.",
          insertion: "Todas las cabezas convergen en la base y bordes laterales de la rótula a través del tendón del cuádriceps, y se continúan distalmente mediante el ligamento rotuliano en la tuberosidad de la tibia.",
          innervation: "Nervio Femoral / Crural (L2, L3, L4).",
          action: "Extensor supremo y potente de la rodilla. El recto femoral además flexiona activamente la articulación de la cadera.",
          clinicalNote: "El reflejo patelar / rotuliano explora las raíces L3-L4. Las fibras oblicuas distales del vasto medial (VMO) estabilizan dinámicamente la rótula evitando su luxación lateral."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 6. FLEXIÓN DE RODILLA
    // -------------------------------------------------------------------------
    {
      id: "flexion-rodilla",
      name: "Flexión de Rodilla",
      region: "rodilla",
      regionLabel: "Rodilla • Miembro Inferior",
      code: "MI-02",
      joint: "Articulación Tibiofemoral",
      jointType: "Bicondílea con fibrocartílagos meniscales",
      plane: "Sagital",
      axis: "Eje Laterolateral (Transversal)",
      rom: "0° — 135° (Activo con cadera extendida) / 145° (Activo con cadera flexionada) / 160° (Pasivo)",
      description: "Aproximación de la cara posterior de la pierna hacia la cara posterior del muslo con rodamiento y deslizamiento posterior de los cóndilos femorales.",
      lever: "3er Género (Interpotente)",
      animationType: "knee-flexion",
      gifUrl: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=600&q=80",
      searchTerms: ["flexion de rodilla", "doblar pierna", "talon al gluteo", "isquiotibiales", "biceps femoral", "semitendinoso", "semimembranoso"],
      primaryMuscle: "Isquiotibiales (Bíceps femoral, Semitendinoso y Semimembranoso)",
      synergistMuscles: ["Gastrocnemios", "Poplíteo (desbloqueador)", "Grácil", "Sartorio"],
      antagonist: "Cuádriceps femoral",
      muscles: [
        {
          id: "isquiotibiales-grupo",
          name: "Músculos Isquiotibiales (Bíceps Femoral, Semitendinoso y Semimembranoso)",
          scientificName: "Musculi ischiocrurales",
          role: "Agonistas Primarios Biarticulares",
          roleType: "primary",
          compartment: "Compartimento Femoral Posterior",
          origin: "• BÍCEPS FEMORAL (Cabeza Larga): Tuberosidad isquiática (tendón común con semitendinoso). Cabeza Corta: Labio lateral de la línea áspera y línea supracondílea lateral del fémur.\n" +
                  "• SEMITENDINOSO: Tuberosidad isquiática.\n" +
                  "• SEMIMEMBRANOSO: Porción superolateral de la tuberosidad isquiática.",
          insertion: "• Bíceps Femoral: Cabeza del peroné (vértice y cara lateral) y cóndilo lateral de la tibia.\n" +
                  "• Semitendinoso: Cara medial de la porción superior de la tibia (Pata de Ganso superficial).\n" +
                  "• Semimembranoso: Cara posterior del cóndilo medial de la tibia, ligamento poplíteo oblicuo y fascia poplítea.",
          innervation: "Nervio Ciático (L5, S1, S2): Porción tibial para la cabeza larga del bíceps, semitendinoso y semimembranoso; porción peronea común para la cabeza corta del bíceps.",
          action: "Flexores potentes de la rodilla y extensores de la cadera. El bíceps femoral realiza rotación externa de la tibia; el semitendinoso y semimembranoso producen rotación interna de la pierna flexionada.",
          clinicalNote: "Son los músculos con mayor incidencia de desgarros miofasciales en deportes de velocidad durante la fase terminal de balanceo de la carrera."
        },
        {
          id: "popliteo",
          name: "Poplíteo",
          scientificName: "Musculus popliteus",
          role: "Desbloqueador de la Rodilla",
          roleType: "synergist",
          compartment: "Fosa Poplítea Profunda",
          origin: "Cara lateral del cóndilo femoral lateral (tendón intracapsular) y cuerno posterior del menisco lateral.",
          insertion: "Cara posterior de la tibia por encima de la línea del músculo sóleo.",
          innervation: "Nervio Tibial (L4, L5, S1).",
          action: "Rota medialmente la tibia sobre el fémur (o rota lateralmente el fémur sobre la tibia fija) para desbloquear la rodilla extendida e iniciar la flexión.",
          clinicalNote: "Se le llama 'la llave de la rodilla'. Sin el poplíteo, los isquiotibiales tienen que vencer el mecanismo de bloqueo en tornillo (screw-home)."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 7. FLEXIÓN DE CADERA
    // -------------------------------------------------------------------------
    {
      id: "flexion-cadera",
      name: "Flexión de Cadera (Nutación Femoral)",
      region: "cadera",
      regionLabel: "Cadera • Pelvis y Muslo",
      code: "MI-03",
      joint: "Articulación Coxofemoral",
      jointType: "Enartrosis / Cotiloidea (Esferoidea de máxima congruencia)",
      plane: "Sagital",
      axis: "Eje Perpendicular Laterolateral (Transversal)",
      rom: "0° — 120° (con rodilla flexionada) / 0° — 90° (con rodilla extendida por tensión isquiotibial)",
      description: "Aproximación de la cara anterior del muslo hacia el tronco en el plano sagital.",
      lever: "3er Género (Interpotente)",
      animationType: "hip-flexion",
      gifUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
      searchTerms: ["flexion de cadera", "levantar muslo", "psoas", "iliaco", "iliopsoas", "cadera", "coxofemoral"],
      primaryMuscle: "Psoas-Ilíaco (Psoas Mayor e Ilíaco)",
      synergistMuscles: ["Recto femoral", "Sartorio", "Tensor de la fascia lata", "Pectíneo"],
      antagonist: "Glúteo mayor e Isquiotibiales",
      muscles: [
        {
          id: "iliopsoas",
          name: "Músculo Psoas-Ilíaco (Iliopsoas)",
          scientificName: "Musculus iliopsoas",
          role: "Agonista Primario Supremo",
          roleType: "primary",
          compartment: "Retroperitoneo Lumbar y Fosa Ilíaca",
          origin: "• PSOAS MAYOR: Cuerpos vertebrales de T12 a L4, discos intervertebrales y apófisis costiformes de las vértebras L1-L5.\n• ILÍACO: Dos tercios superiores de la fosa ilíaca interna, labio interno de la cresta ilíaca, ligamento iliolumbar y ala del sacro.",
          insertion: "Pasan juntos bajo el ligamento inguinal por la laguna muscular para insertarse en el trocánter menor del fémur.",
          innervation: "• Psoas Mayor: Ramos ventrales directos del Plexo Lumbar (L1, L2, L3).\n• Ilíaco: Nervio Femoral (L2, L3).",
          action: "El flexor más potente y rápido de la articulación coxofemoral. Con el fémur fijo, flexiona el tronco sobre la pelvis en sedestación y aumenta la lordosis lumbar.",
          clinicalNote: "El acortamiento del psoas (muy común por sedentarismo prolongado) provoca anteversión pélvica e hiperlordosis compensatoria (Test de Thomas positivo)."
        },
        {
          id: "sartorio",
          name: "Sartorio (Músculo del Sastre)",
          scientificName: "Musculus sartorius",
          role: "Sinergista Poliarticular",
          roleType: "synergist",
          compartment: "Compartimento Femoral Anterior (Superficial)",
          origin: "Espina ilíaca anterosuperior (EIAS) y parte superior de la escotadura innominada.",
          insertion: "Cara medial de la porción superior de la diáfisis tibial (parte anterior de la Pata de Ganso).",
          innervation: "Nervio Femoral (L2, L3).",
          action: "Flexiona, abduce y rota lateralmente la cadera; flexiona y rota medialmente la rodilla (permite cruzar la pierna en posición de sastre).",
          clinicalNote: "Es el músculo más largo de toda la anatomía humana."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 8. ABDUCCIÓN DE CADERA
    // -------------------------------------------------------------------------
    {
      id: "abduccion-cadera",
      name: "Abducción de Cadera",
      region: "cadera",
      regionLabel: "Cadera • Cintura Pélvica",
      code: "MI-04",
      joint: "Articulación Coxofemoral",
      jointType: "Enartrosis",
      plane: "Frontal / Coronal",
      axis: "Eje Anteroposterior (Sagital)",
      rom: "0° — 45°",
      description: "Separación del miembro inferior de la línea media corporal en el plano frontal.",
      lever: "1er Género en apoyo monopodal (Estabilizador pélvico contra gravedad) / 3er Género en cadena cinética abierta",
      animationType: "hip-abduction",
      gifUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80",
      searchTerms: ["abduccion de cadera", "separar pierna", "gluteo medio", "gluteo menor", "trendelenburg", "cadera"],
      primaryMuscle: "Glúteo medio",
      synergistMuscles: ["Glúteo menor", "Tensor de la fascia lata", "Piriforme"],
      antagonist: "Aductores (Mayor, Largo, Corto), Pectíneo y Grácil",
      muscles: [
        {
          id: "gluteo-medio",
          name: "Glúteo Medio (Gluteus Medius)",
          scientificName: "Musculus gluteus medius",
          role: "Agonista Primario y Pilar Estabilizador",
          roleType: "primary",
          compartment: "Región Glútea (Plano Medio)",
          origin: "Cara glútea externa del hueso ilion, entre las líneas glúteas anterior y posterior, y cresta ilíaca externa.",
          insertion: "Cara lateral y cresta oblicua del trocánter mayor del fémur.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Potente abductor de la cadera. Sus fibras anteriores rotan internamente y flexionan la cadera; sus fibras posteriores extienden y rotan externamente. En apoyo monopodal es el estabilizador horizontal indispensable de la pelvis.",
          clinicalNote: "Su debilidad o fallo del nervio glúteo superior causa el 'Signo de Trendelenburg' (la pelvis cae hacia el lado sano en la marcha)."
        },
        {
          id: "gluteo-menor",
          name: "Glúteo Menor",
          scientificName: "Musculus gluteus minimus",
          role: "Sinergista Agonista Profundo",
          roleType: "synergist",
          compartment: "Región Glútea (Plano Profundo)",
          origin: "Cara glútea externa del ilion, entre las líneas glúteas anterior e inferior.",
          insertion: "Borde anterior y cara anterosuperior del trocánter mayor del fémur.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Abducción y rotación medial del fémur; asiste al glúteo medio en la contención de la cabeza femoral dentro del cotilo.",
          clinicalNote: "Trabaja en estrecha intimidad con la cápsula articular coxofemoral reforzándola por arriba."
        },
        {
          id: "tensor-fascia-lata",
          name: "Tensor de la Fascia Lata (TFL)",
          scientificName: "Musculus tensor fasciae latae",
          role: "Sinergista / Estabilizador de Rodilla",
          roleType: "synergist",
          compartment: "Región Anterolateral del Muslo",
          origin: "Espina ilíaca anterosuperior (EIAS) y labio externo de la cresta ilíaca anterior.",
          insertion: "Tracto iliotibial (cintilla de Maissiat) que desciende hasta el tubérculo de Gerdy en el cóndilo lateral de la tibia.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Abduce, flexiona y rota medialmente el muslo; tensa la fascia lata y bloquea la rodilla en extensión completa.",
          clinicalNote: "El roce repetitivo del tracto iliotibial sobre el epicóndilo femoral lateral produce el 'Síndrome del limpiaparabrisas' en corredores."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 9. DORSIFLEXIÓN DE TOBILLO
    // -------------------------------------------------------------------------
    {
      id: "dorsiflexion-tobillo",
      name: "Dorsiflexión de Tobillo (Flexión Dorsal)",
      region: "tobillo",
      regionLabel: "Tobillo • Pierna y Pie",
      code: "MI-05",
      joint: "Articulación Talocrural (Tibiotarsiana)",
      jointType: "Gínglimo / Trocleartrosis con mortaja tibioperonea",
      plane: "Sagital",
      axis: "Eje Bimaleolar Oblicuo Laterolateral (Transversal)",
      rom: "0° — 20°/30°",
      description: "Elevación del dorso del pie hacia la cara anterior de la tibia, reduciendo el ángulo articular tibioperoneoastragalino.",
      lever: "2do / 3er Género según apoyo o vuelo",
      animationType: "ankle-dorsiflexion",
      gifUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
      searchTerms: ["dorsiflexion de tobillo", "subir punta de pie", "tibial anterior", "extensor dedos", "pie caido", "tobillo"],
      primaryMuscle: "Tibial anterior",
      synergistMuscles: ["Extensor largo de los dedos", "Extensor largo del dedo gordo", "Tercer peroneo"],
      antagonist: "Tríceps sural (Gastrocnemios y Sóleo)",
      muscles: [
        {
          id: "tibial-anterior",
          name: "Tibial Anterior",
          scientificName: "Musculus tibialis anterior",
          role: "Agonista Primario Incontestable",
          roleType: "primary",
          compartment: "Compartimento Anterior de la Pierna",
          origin: "Cóndilo lateral y mitad proximal de la superficie lateral de la diáfisis tibial, membrana interósea adyacente y fascia crural profunda.",
          insertion: "Caras medial e inferior del hueso cuneiforme medial (1ª cuña) y base medial del primer metatarsiano.",
          innervation: "Nervio Peroneo Profundo / Fibular Profundo (L4, L5).",
          action: "Dorsiflexor principal del pie en la articulación talocrural e inversor del pie en las articulaciones subtalar y mediotarsiana; sostiene el arco longitudinal medial del pie.",
          clinicalNote: "Su afectación (lesión del nervio ciático poplíteo externo o L4) provoca el 'pie caído', obligando a la marcha equina o estepaje."
        },
        {
          id: "extensor-largo-dedos",
          name: "Extensor Largo de los Dedos",
          scientificName: "Musculus extensor digitorum longus",
          role: "Sinergista Agonista",
          roleType: "synergist",
          compartment: "Compartimento Anterior de la Pierna",
          origin: "Cóndilo lateral de la tibia, tres cuartos proximales de la cara medial del peroné y porción superior de la membrana interósea.",
          insertion: "Se divide en cuatro tendones que terminan en las falanges media y distal de los cuatro dedos laterales (2º al 5º).",
          innervation: "Nervio Peroneo Profundo (L5, S1).",
          action: "Extiende los dedos laterales y colabora activamente en la dorsiflexión y eversión del pie.",
          clinicalNote: "Garantiza el despegue de la punta de los dedos durante la fase oscilante de la marcha normal."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 10. FLEXIÓN PLANTAR DE TOBILLO
    // -------------------------------------------------------------------------
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
      description: "Descenso del antepié alejando el dorso del pie de la cara anterior de la tibia (ponerse en puntas de pie).",
      lever: "2do Género (Interresistencia - Palanca de fuerza multiplicada donde el peso corporal recae entre el apoyo de los metatarsos y el tendón de Aquiles)",
      animationType: "ankle-plantarflexion",
      gifUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
      searchTerms: ["flexion plantar", "puntas de pie", "gemelos", "soleo", "triceps sural", "tendon de aquiles", "tobillo"],
      primaryMuscle: "Tríceps Sural (Gastrocnemios y Sóleo)",
      synergistMuscles: ["Plantar delgado", "Tibial posterior", "Flexor largo de los dedos", "Flexor largo del dedo gordo", "Peroneos"],
      antagonist: "Tibial anterior y Extensor largo de los dedos",
      muscles: [
        {
          id: "triceps-sural",
          name: "Tríceps Sural (Gastrocnemios y Sóleo)",
          scientificName: "Musculus triceps surae",
          role: "Agonista Primario Supremo de Potencia y Postura",
          roleType: "primary",
          compartment: "Compartimento Posterior Superficial de la Pierna",
          origin: "• GASTROCNEMIO MEDIAL: Cara poplítea y porción posterosuperior del cóndilo medial del fémur.\n" +
                  "• GASTROCNEMIO LATERAL: Cara posterolateral del cóndilo femoral lateral.\n" +
                  "• SÓLEO: Cara posterior de la cabeza del peroné, tercio proximal de la diáfisis peronea, línea del sóleo y tercio medio del borde medial de la tibia (arco tendinoso del sóleo).",
          insertion: "Las tres cabezas forman el potente tendón calcáneo (Tendón de Aquiles) que se inserta en la mitad inferior de la cara posterior del hueso calcáneo.",
          innervation: "Nervio Tibial (S1, S2).",
          action: "El flexor plantar más potente del cuerpo humano. Es el motor indispensable para la marcha, carrera, salto y bipedestación quieta (sóleo como bomba venosa periférica).",
          clinicalNote: "El reflejo aquileo explora la integridad radicular S1-S2. La rotura del tendón de Aquiles es detectable mediante la maniobra de Thompson."
        }
      ]
    }
  ]
};
