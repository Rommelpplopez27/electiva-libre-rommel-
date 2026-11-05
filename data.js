// =============================================================================
// KineFlash PRO - Base de Datos Anatómica y Biomecánica Completa
// Revisada según Latarjet-Ruiz Liard, Rouvière, Kapandji y Moore
// Movimientos Analíticos y Actividades de la Vida Diaria (AVD)
// Motores Primarios, Secundarios, Sinergistas y Fijadores / Estabilizadores
// =============================================================================

const ANATOMY_DATABASE = {
  regions: [
    { id: "all", name: "Todas", icon: "all_inclusive", color: "cyan" },
    { id: "vida-diaria", name: "Vida Diaria", icon: "routine", color: "active" },
    { id: "codo", name: "Codo", icon: "sports_handball", color: "active" },
    { id: "hombro", name: "Hombro", icon: "accessibility", color: "active" },
    { id: "rodilla", name: "Rodilla", icon: "snowshoeing", color: "active" },
    { id: "cadera", name: "Cadera", icon: "directions_walk", color: "active" },
    { id: "tobillo", name: "Tobillo", icon: "footprint", color: "active" }
  ],

  categories: [
    { id: "all", name: "Todos", icon: "apps" },
    { id: "vida-diaria", name: "Vida Diaria (AVD)", icon: "routine" },
    { id: "analitico", name: "Analíticos", icon: "biotech" }
  ],

  planes: [
    { id: "all", name: "Todos los planos" },
    { id: "Sagital", name: "Plano Sagital" },
    { id: "Frontal", name: "Plano Frontal" },
    { id: "Transversal", name: "Plano Transversal" },
    { id: "Multiplanar", name: "Multiplanar / Funcional" }
  ],

  movements: [
    // =========================================================================
    // --- CATEGORÍA 1: ACTIVIDADES DE LA VIDA DIARIA (AVD) ---
    // =========================================================================

    // -------------------------------------------------------------------------
    // AVD 1: AGACHARSE A COGER UN OBJETO / SENTADILLA FUNCIONAL (SQUAT)
    // -------------------------------------------------------------------------
    {
      id: "sentadilla-agacharse",
      category: "vida-diaria",
      name: "Agacharse a recoger un objeto (Patrón de Sentadilla / Squat)",
      region: "vida-diaria",
      regionLabel: "Vida Diaria (AVD) • Cadena Cinética Cerrada",
      code: "AVD-01",
      dailyAction: "Descenso y ascenso del centro de gravedad flexionando caderas y rodillas manteniendo el tronco erguido para tomar un objeto del suelo sin dañar la columna.",
      joint: "Complejo Multarticular: Art. Coxofemorales, Tibiofemorales, Patelofemorales, Talocrurales y Raquis Lumbotorácico",
      jointType: "Enartrosis (Caderas), Bicondíleas con meniscos (Rodillas), Gínglimo (Tobillos) y Anfiartrosis/Artrodias (Raquis)",
      plane: "Sagital",
      axis: "Ejes Laterolaterales articulares sincrónicos",
      rom: "Cadera: 0°-105° flexión | Rodilla: 0°-110° flexión | Tobillo: 0°-25° dorsiflexión",
      description: "Patrón motor fundamental de triple flexión en fase de descenso excéntrico y triple extensión en fase de elevación concéntrica. Exige neutralidad lumbar estricta.",
      lever: "3er Género en rodilla y cadera; 1er Género en raquis (músculos erectores contrapesando el peso anterior)",
      animationType: "daily-squat",
      highlightedMuscle: "Glúteo Mayor, Cuádriceps y Erectores Espinales (Fijadores)",
      searchTerms: ["agacharse", "coger objeto", "sentadilla", "squat", "levantar carga", "vida diaria", "avd", "suelo", "core"],
      primaryMuscle: "Glúteo mayor y Cuádriceps femoral",
      synergistMuscles: ["Isquiotibiales (co-contracción protectora de rodilla)", "Sóleo", "Aductor mayor"],
      stabilizers: "Erector de la columna, Transverso del abdomen, Multífidos y Glúteo medio (previene valgo dinámico)",
      muscles: [
        {
          id: "gluteo-mayor-squat",
          name: "Glúteo Mayor (Gluteus Maximus)",
          scientificName: "Musculus gluteus maximus",
          role: "Motor Primario Agónico",
          roleType: "primary",
          compartment: "Región Glútea (Plano Superficial Posterior)",
          origin: "Línea glútea posterior del ilion, cara dorsal del sacro y coxis, ligamento sacrotuberoso y aponeurosis toracolumbar.",
          insertion: "Tuberosidad glútea del fémur y tracto iliotibial de la fascia lata.",
          innervation: "Nervio Glúteo Inferior (L5, S1, S2).",
          action: "Potente motor extensor concéntrico de la cadera en el ascenso de la sentadilla; frena la flexión en fase excéntrica.",
          clinicalNote: "Al agacharse con bisagra de cadera (hip hinge), el glúteo mayor asume la mayor demanda mecánica, protegiendo las vértebras lumbares."
        },
        {
          id: "cuadriceps-squat",
          name: "Cuádriceps Femoral (Vastos Medial, Lateral, Intermedio y Recto)",
          scientificName: "Musculus quadriceps femoris",
          role: "Motor Primario Agónico",
          roleType: "primary",
          compartment: "Compartimento Femoral Anterior",
          origin: "Recto femoral en espina ilíaca anteroinferior; vastos en fémur (línea áspera, trocánter mayor y diáfisis femoral).",
          insertion: "Base y bordes de la rótula, continuándose por el ligamento rotuliano en la tuberosidad anterior de la tibia.",
          innervation: "Nervio Femoral / Crural (L2, L3, L4).",
          action: "Controla excéntricamente la bajada evitando el desplome del cuerpo y genera la extensión concéntrica potente al levantarse.",
          clinicalNote: "El vasto medial oblicuo (VMO) asegura el tracking rotuliano adecuado dentro de la tróclea durante la carga."
        },
        {
          id: "isquiotibiales-squat",
          name: "Músculos Isquiotibiales (Bíceps Femoral, Semitendinoso, Semimembranoso)",
          scientificName: "Musculi ischiocrurales",
          role: "Sinergista Agonista y Coaptador Protector",
          roleType: "synergist",
          compartment: "Compartimento Femoral Posterior",
          origin: "Tuberosidad isquiática de la pelvis (y labio lateral de línea áspera para cabeza corta del bíceps).",
          insertion: "Cabeza del peroné y cóndilos medial/lateral de la tibia.",
          innervation: "Nervio Ciático (L5, S1, S2).",
          action: "Coadyuvan en la extensión de cadera y generan co-contracción sinérgica en la rodilla, reduciendo la tensión sobre el Ligamento Cruzado Anterior (LCA).",
          clinicalNote: "La coactivación cuádriceps-isquiotibiales es el mecanismo biomecánico que estabiliza la rodilla en cadena cinética cerrada."
        },
        {
          id: "soleo-squat",
          name: "Sóleo",
          scientificName: "Musculus soleus",
          role: "Sinergista de Control Tibial",
          roleType: "synergist",
          compartment: "Compartimento Posterior de la Pierna",
          origin: "Cara posterior de la cabeza del peroné y línea del sóleo en la tibia.",
          insertion: "Cara posterior del hueso calcáneo mediante el tendón común de Aquiles.",
          innervation: "Nervio Tibial (S1, S2).",
          action: "Frena la traslación anterior de la tibia (control excéntrico de la dorsiflexión) impidiendo que el peso venza hacia adelante.",
          clinicalNote: "Una retracción del sóleo limita la dorsiflexión del tobillo y obliga al estudiante o paciente a despegar los talones del suelo al agacharse."
        },
        {
          id: "erectores-squat",
          name: "Músculos Erectores de la Columna (Iliocostal, Longísimo, Espinoso)",
          scientificName: "Musculus erector spinae",
          role: "Fijador / Estabilizador Raquídeo Crítico",
          roleType: "stabilizer",
          compartment: "Región Dorsal y Lumbar Profunda (Músculos Autóctonos)",
          origin: "Cresta ilíaca posterior, cara dorsal del sacro y apófisis espinosas lumbosacras.",
          insertion: "Ángulos de las costillas y apófisis transversas/espinosas torácicas y cervicales.",
          innervation: "Ramos dorsales de los nervios espinales correspondientes.",
          action: "Contracción isométrica intensa que mantiene la columna vertebral neutra, contrarrestando el momento flector anterior del tronco.",
          clinicalNote: "Si los erectores claudican y la columna se curva en cifosis durante el levantamiento, el estrés de cizallamiento en los discos L5-S1 se multiplica por 5."
        },
        {
          id: "transverso-multifidos-squat",
          name: "Core Profundo (Transverso del Abdomen y Multífidos)",
          scientificName: "Musculus transversus abdominis et multifidi",
          role: "Fijador de Presión Intraabdominal (Faja Lumbar)",
          roleType: "stabilizer",
          compartment: "Pared Abdominal Profunda y Surco Vertebral",
          origin: "Fascia toracolumbar, cresta ilíaca interna y cartílagos costales inferiores (transverso); apófisis mamilares y transversas (multífidos).",
          insertion: "Línea alba y aponeurosis abdominal (transverso); apófisis espinosas de 2-4 vértebras superiores (multífidos).",
          innervation: "Nervios Intercostales (T7-T11), Subcostal (T12), Iliohipogástrico (L1) y ramos dorsales.",
          action: "Generan el mecanismo de 'cilindro hidráulico' aumentando la presión intraabdominal para descargar las carillas articulares lumbares.",
          clinicalNote: "Es el cinturón de fuerza anatómico que se activa de forma anticipatoria antes de mover los brazos o agacharse."
        },
        {
          id: "gluteo-medio-squat",
          name: "Glúteo Medio (Fibras Posteriores)",
          scientificName: "Musculus gluteus medius",
          role: "Fijador Frontal Antivalgo",
          roleType: "stabilizer",
          compartment: "Región Glútea Lateral",
          origin: "Cara glútea externa del hueso ilion entre las líneas glúteas anterior y posterior.",
          insertion: "Cara lateral del trocánter mayor del fémur.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Mantiene el fémur alineado en el plano frontal y rota externamente la cadera, impidiendo el colapso de las rodillas hacia adentro (valgo dinámico).",
          clinicalNote: "El valgo dinámico de rodilla al agacharse es el principal factor de riesgo en fisioterapia para síndrome patelofemoral y rotura del LCA."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // AVD 2: ALCANZAR UN OBJETO EN UN ESTANTE ALTO (OVERHEAD REACH)
    // -------------------------------------------------------------------------
    {
      id: "alcanzar-estante-alto",
      category: "vida-diaria",
      name: "Alcanzar un objeto en un estante alto (Alcance Sobre la Cabeza)",
      region: "vida-diaria",
      regionLabel: "Vida Diaria (AVD) • Cintura Escapular y Tronco",
      code: "AVD-02",
      dailyAction: "Elevación del brazo por encima de 120°-180° coordinada con rotación hacia arriba de la escápula y extensión torácica para alcanzar un libro, caja o vaso en una repisa superior.",
      joint: "Complejo del Hombro (Glenohumeral, Escapulotorácica, Esternoclavicular, Acromioclavicular), Codo y Columna Torácica",
      jointType: "Enartrosis (Hombro), Sinsarcosis (Escapulotorácica), Encamado/Silla de montar (Esternoclavicular) y Artrodia (Acromioclavicular)",
      plane: "Multiplanar",
      axis: "Plano Escapular (30° anterior al coronal) y extensión torácica",
      rom: "Elevación global: 0° — 180° | Rotación escapular: 60° | Extensión codo: 0°",
      description: "Movimiento funcional que depende del Ritmo Escápulo-Humeral (2:1). Por cada 2° de elevación del húmero, la escápula debe rotar 1° hacia arriba para liberar el espacio subacromial.",
      lever: "3er Género en hombro y codo",
      animationType: "daily-shelf-reach",
      highlightedMuscle: "Deltoides, Serrato Anterior y Manguito Rotador (Fijador)",
      searchTerms: ["alcanzar estante", "estante alto", "subir brazo", "repisa", "caja alta", "overhead reach", "vida diaria", "avd", "hombro"],
      primaryMuscle: "Deltoides (Porciones Clavicular y Acromial) y Serrato anterior",
      synergistMuscles: ["Trapecio (Fibras Superiores e Inferiores)", "Coracobraquial", "Tríceps braquial", "Pectoral mayor clavicular"],
      stabilizers: "Manguito de los Rotadores (Supraespinoso, Infraespinoso, Redondo menor, Subescapular) y Erectores Torácicos",
      muscles: [
        {
          id: "deltoides-reach",
          name: "Deltoides (Porciones Clavicular y Acromial)",
          scientificName: "Musculus deltoideus",
          role: "Motor Primario Agónico",
          roleType: "primary",
          compartment: "Hombro • Capa Muscular Externa",
          origin: "Tercio lateral de la clavícula y acromion de la escápula.",
          insertion: "Tuberosidad deltoidea del húmero (V deltoidea).",
          innervation: "Nervio Axilar / Circunflejo (C5, C6).",
          action: "Eleva el brazo en flexión anterior y abducción funcional en el plano de la escápula.",
          clinicalNote: "Sin el trabajo compensador del manguito rotador, la fuerza ascendente del deltoides chocaría el troquíter contra el acromion."
        },
        {
          id: "serrato-anterior-reach",
          name: "Serrato Anterior (Serrato Mayor)",
          scientificName: "Musculus serratus anterior",
          role: "Motor Primario Escapulotorácico",
          roleType: "primary",
          compartment: "Pared Lateral del Tórax",
          origin: "Caras laterales de las costillas 1ª a 9ª mediante digitaciones carnosas.",
          insertion: "Cara anterior del borde medial de la escápula (desde ángulo superior al inferior).",
          innervation: "Nervio Torácico Largo (C5, C6, C7).",
          action: "Genera la báscula axilar / rotación superior de la escápula (orientando la cavidad glenoidea hacia el techo) y fija la escápula al tórax.",
          clinicalNote: "Si el serrato se debilita, el paciente no puede levantar el brazo más allá de los 90° y compensa inclinando todo el tronco."
        },
        {
          id: "trapecio-reach",
          name: "Trapecio (Fibras Superiores e Inferiores)",
          scientificName: "Musculus trapezius",
          role: "Sinergista en Par de Fuerzas Escapular",
          roleType: "synergist",
          compartment: "Región Posterior del Cuello y Tronco",
          origin: "Línea nucal superior, protuberancia occipital externa, ligamento nucal y apófisis espinosas de C7 a T12.",
          insertion: "Tercio lateral de la clavícula, acromion y espina de la escápula.",
          innervation: "Nervio Accesorio (Espinal / XI par craneal) y ramos del plexo cervical (C3, C4).",
          action: "Las fibras superiores tiran de la clavícula hacia arriba y las inferiores tiran de la espina hacia abajo, rotando la glena en sinergia con el serrato.",
          clinicalNote: "El balance entre trapecio y serrato es clave para prevenir el síndrome de pinzamiento del hombro en estudiantes y trabajadores."
        },
        {
          id: "triceps-reach",
          name: "Tríceps Braquial",
          scientificName: "Musculus triceps brachii",
          role: "Sinergista Extensor Terminal de Codo",
          roleType: "synergist",
          compartment: "Compartimento Braquial Posterior",
          origin: "Tubérculo infraglenoideo de la escápula (cabeza larga) y cara posterior del húmero (cabezas lateral y medial).",
          insertion: "Olécranon del cúbito.",
          innervation: "Nervio Radial (C6, C7, C8).",
          action: "Extiende el codo para extender el radio de acción y posibilitar que la mano alcance la profundidad del estante.",
          clinicalNote: "Permite fijar la distancia brazo-objeto sin doblar el codo de forma inestable."
        },
        {
          id: "manguito-rotador-reach",
          name: "Manguito de los Rotadores (Supraespinoso, Infraespinoso, Redondo Menor, Subescapular)",
          scientificName: "Musculi rotatores humeri",
          role: "Fijador y Centrador Glenohumeral Vital",
          roleType: "stabilizer",
          compartment: "Hombro Profundo Periarticular",
          origin: "Fosa supraespinosa, infraespinosa, borde lateral de la escápula y fosa subescapular.",
          insertion: "Tubérculos mayor (troquíter) y menor (troquín) del húmero y cápsula articular.",
          innervation: "Nervios Supraescapular, Axilar y Subescapular (C5, C6).",
          action: "Deprimen activamente la cabeza humeral y la comprimen concéntricamente en el centro de la cavidad glenoidea.",
          clinicalNote: "Su fallo genera bursitis subacromial y dolor punzante en 'arco doloroso' entre 60° y 120° de elevación al guardar cosas en alacenas."
        },
        {
          id: "erectores-toracicos-reach",
          name: "Erectores de la Columna Torácica y Core",
          scientificName: "Musculi erectores spinae thoracis",
          role: "Fijador Postural Axial",
          roleType: "stabilizer",
          compartment: "Espalda Media y Pared Abdominal",
          origin: "Apófisis espinosas y transversas torácicas y arcos costales.",
          insertion: "Vértebras torácicas superiores y costillas.",
          innervation: "Ramos dorsales de los nervios espinales torácicos.",
          action: "Aportan los últimos 10°-15° de extensión torácica indispensable para la verticalidad del brazo; el core evita la hiperextensión lumbar lesiva.",
          clinicalNote: "Una cifosis torácica rígida (dorso curvo) bloquea mecánicamente la elevación del brazo impidiendo alcanzar objetos altos."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // AVD 3: EMPUJAR UNA PUERTA PESADA (PATRÓN DE EMPUJE HORIZONTAL)
    // -------------------------------------------------------------------------
    {
      id: "empujar-puerta",
      category: "vida-diaria",
      name: "Empujar una puerta pesada (Patrón de Empuje Horizontal / Push)",
      region: "vida-diaria",
      regionLabel: "Vida Diaria (AVD) • Cadena Cinética y Miembro Superior",
      code: "AVD-03",
      dailyAction: "Aplicación de fuerza horizontal hacia adelante mediante la extensión coordinada de codos y brazos con postura en zancada para vencer la inercia de una puerta maciza.",
      joint: "Glenohumeral, Escapulotorácica, Húmero-cubital, Radiocarpiana y Articulaciones de Miembros Inferiores en zancada",
      jointType: "Enartrosis (Hombro), Gínglimo (Codo) y Condílea (Muñeca)",
      plane: "Plano Transversal (Eje Vertical)",
      planeBadge: "Transversal (Eje Vertical)",
      axis: "Eje Vertical (Longitudinal) para aducción horizontal de hombro y extensión de codo",
      rom: "Aducción horizontal: 0°-90° | Extensión de codo: 90° a 0° | Bloqueo muñeca: 30°",
      description: "Transmisión de fuerza en cadena cinética desde el suelo: los pies empujan contra el suelo, el core transfiere el vector y los miembros superiores realizan aducción horizontal (plano transversal, eje vertical) y extensión de codo contra la puerta.",
      lever: "3er Género en hombro; 1er Género en codo",
      animationType: "daily-door-push",
      highlightedMuscle: "Pectoral Mayor, Tríceps Braquial y Core Torsional (Fijador)",
      searchTerms: ["empujar puerta", "empuje", "abrir puerta pesada", "puerta", "push", "cadena cinetica", "vida diaria", "avd", "pectoral"],
      primaryMuscle: "Pectoral mayor y Tríceps braquial",
      synergistMuscles: ["Deltoides anterior", "Serrato anterior (protracción)", "Pectoral menor", "Tríceps sural posterior"],
      stabilizers: "Core abdominal (frena retroceso del tronco), Manguito rotador y Flexores/Extensores de muñeca",
      muscles: [
        {
          id: "pectoral-mayor-push",
          name: "Pectoral Mayor (Porciones Esternocostal y Clavicular)",
          scientificName: "Musculus pectoralis major",
          role: "Motor Primario Agónico de Empuje",
          roleType: "primary",
          compartment: "Pared Torácica Anterior",
          origin: "Mitad esternal de la clavícula, cara anterior del esternón y cartílagos costales 1º a 6º.",
          insertion: "Cresta del tubérculo mayor del húmero (labio lateral del surco intertubercular).",
          innervation: "Nervios Pectorales Medial y Lateral (C5, C6, C7, C8, T1).",
          action: "Potente aducción horizontal y propulsión anterior del brazo en el plano horizontal contra la resistencia de la puerta.",
          clinicalNote: "Es el motor principal de empuje frontal en toda la biomecánica clínica humana."
        },
        {
          id: "triceps-push",
          name: "Tríceps Braquial (Cabezas Lateral, Medial y Larga)",
          scientificName: "Musculus triceps brachii",
          role: "Motor Primario de Extensión",
          roleType: "primary",
          compartment: "Compartimento Braquial Posterior",
          origin: "Tubérculo infraglenoideo (cabeza larga) y cara posterior del húmero por encima y debajo del surco radial (cabezas lateral y medial).",
          insertion: "Cara superior y posterior del olécranon del cúbito.",
          innervation: "Nervio Radial (C6, C7, C8).",
          action: "Extiende con fuerza la articulación del codo empujando el punto de contacto hacia adelante.",
          clinicalNote: "La cabeza medial actúa de forma continua, mientras que las cabezas lateral y larga se disparan al aumentar la masa de la puerta."
        },
        {
          id: "deltoides-anterior-push",
          name: "Deltoides (Porción Clavicular / Anterior)",
          scientificName: "Musculus deltoideus (pars clavicularis)",
          role: "Sinergista Agonista Anterior",
          roleType: "synergist",
          compartment: "Hombro Anterior",
          origin: "Borde anterior y tercio lateral de la clavícula.",
          insertion: "Tuberosidad deltoidea del húmero (V deltoidea).",
          innervation: "Nervio Axilar (C5, C6).",
          action: "Flexiona y aduce horizontalmente el húmero en sinergia directa con el pectoral mayor.",
          clinicalNote: "Mantiene la altura del brazo frente al pecho durante toda la fase de empuje."
        },
        {
          id: "serrato-anterior-push",
          name: "Serrato Anterior (Músculo del Empuje / Boxeador)",
          scientificName: "Musculus serratus anterior",
          role: "Sinergista de Protracción Escapular",
          roleType: "synergist",
          compartment: "Pared Lateral del Tórax",
          origin: "Caras laterales de las costillas 1ª a 9ª.",
          insertion: "Borde medial anterior de la escápula.",
          innervation: "Nervio Torácico Largo (C5, C6, C7).",
          action: "Desplaza la escápula hacia adelante alrededor de la parrilla costal (protracción), sumando alcance y firmeza al empuje.",
          clinicalNote: "Permite proyectar el muñón del hombro hacia adelante para maximizar el vector de contacto."
        },
        {
          id: "core-push",
          name: "Core Abdominal y Oblicuos (Fijador Antirretroceso)",
          scientificName: "Musculi abdominis (rectus, obliquus externus et internus, transversus)",
          role: "Fijador de Transferencia Cinética",
          roleType: "stabilizer",
          compartment: "Pared Abdominal Anterolateral",
          origin: "Costillas 5ª a 12ª, cresta ilíaca y sínfisis púbica.",
          insertion: "Línea alba, cresta púbica y cartílagos costales.",
          innervation: "Nervios Intercostales (T7-T12) y Nervios Iliohipogástrico/Ilioinguinal.",
          action: "Fija el tronco en isometría impidiendo que la fuerza reactiva de la puerta empuje el torso hacia atrás o desestabilice la pelvis.",
          clinicalNote: "Sin un core firme, la fuerza de los brazos se disipa y la columna lumbar sufre hiperlordosis reactiva lesiva."
        },
        {
          id: "antebrazo-muneca-push",
          name: "Músculos Flexores y Extensores de Muñeca (Co-contracción)",
          scientificName: "Musculi carpi flexores et extensores",
          role: "Fijadores del Puente de Muñeca",
          roleType: "stabilizer",
          compartment: "Compartimentos Anterior y Posterior del Antebrazo",
          origin: "Epicóndilo medial (epitróclea) y epicóndilo lateral del húmero.",
          insertion: "Bases de los metacarpianos 2º, 3º y 5º y huesos del carpo.",
          innervation: "Nervios Mediano, Cubital y Radial (C6, C7, C8).",
          action: "Bloquean isométricamente la muñeca en 20°-30° de dorsiflexión neutra para transmitir el vector de fuerza a la palma sin que colapse.",
          clinicalNote: "Protegen el ligamento transverso del carpo y evitan microtraumatismos del nervio mediano."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // AVD 4: SUBIR ESCALERAS (ASCENSO DE ESCALÓN / STAIR CLIMBING)
    // -------------------------------------------------------------------------
    {
      id: "subir-escaleras",
      category: "vida-diaria",
      name: "Subir escaleras (Ascenso en Carga Unipodal / Step-Up)",
      region: "vida-diaria",
      regionLabel: "Vida Diaria (AVD) • Miembro Inferior y Pelvis",
      code: "AVD-04",
      dailyAction: "Propulsión del cuerpo hacia arriba y adelante apoyando un pie en el peldaño superior y venciendo toda la fuerza de gravedad en carga monopodal.",
      joint: "Cadera, Rodilla y Tobillo de la pierna delantera (Carga) y Tobillo de pierna trasera (Despegue)",
      jointType: "Enartrosis (Cadera), Bicondílea (Rodilla) y Gínglimo (Tobillo)",
      plane: "Sagital dominante con estricto control Frontal de pelvis",
      axis: "Ejes laterolaterales articulares y eje anteroposterior pélvico",
      rom: "Rodilla: de 70°-90° de flexión a 0° | Cadera: de 60°-70° de flexión a 0°",
      description: "Exige que una sola extremidad inferior soporte y eleve la totalidad del peso corporal más la inercia, mientras la cadera contralateral se mantiene estable en el aire.",
      lever: "3er Género en rodilla y cadera; 2do Género en tobillo de empuje",
      animationType: "daily-stairs-climb",
      highlightedMuscle: "Cuádriceps, Glúteo Mayor y Glúteo Medio (Fijador Pélvico)",
      searchTerms: ["subir escaleras", "escalon", "gradas", "subir gradas", "step up", "unipodal", "vida diaria", "avd", "rodilla", "cadera"],
      primaryMuscle: "Cuádriceps femoral y Glúteo mayor",
      synergistMuscles: ["Tríceps sural (Gastrocnemios y Sóleo)", "Isquiotibiales", "Aductor mayor"],
      stabilizers: "Glúteo medio y menor (pilar de Trendelenburg), Cuadrado lumbar y Tibial anterior",
      muscles: [
        {
          id: "cuadriceps-stairs",
          name: "Cuádriceps Femoral (Vastos y Recto Femoral)",
          scientificName: "Musculus quadriceps femoris",
          role: "Motor Primario Propulsor",
          roleType: "primary",
          compartment: "Compartimento Femoral Anterior",
          origin: "Fémur (vastos lateral, medial e intermedio) y espina ilíaca anteroinferior (recto femoral).",
          insertion: "Rótula y tuberosidad tibial mediante el ligamento rotuliano.",
          innervation: "Nervio Femoral (L2, L3, L4).",
          action: "Extiende concéntricamente la rodilla soportando de 2.5 a 3 veces el peso corporal sobre la articulación femororrotuliana.",
          clinicalNote: "Subir escaleras genera las mayores fuerzas de compresión patelofemoral de la vida diaria, desencadenando dolor en condromalacia rotuliana."
        },
        {
          id: "gluteo-mayor-stairs",
          name: "Glúteo Mayor",
          scientificName: "Musculus gluteus maximus",
          role: "Motor Primario Extensor de Cadera",
          roleType: "primary",
          compartment: "Región Glútea Posterior",
          origin: "Ilion posterior, sacro, coxis y ligamento sacrotuberoso.",
          insertion: "Tuberosidad glútea del fémur y cintilla iliotibial.",
          innervation: "Nervio Glúteo Inferior (L5, S1, S2).",
          action: "Extiende la cadera desde la posición flexionada impulsando la pelvis hacia arriba y hacia adelante sobre el peldaño.",
          clinicalNote: "El glúteo mayor apenas se activa al caminar en llano, pero se recluta con máxima potencia al subir escaleras o cuestas pronunciadas."
        },
        {
          id: "triceps-sural-stairs",
          name: "Tríceps Sural (Gastrocnemios y Sóleo)",
          scientificName: "Musculus triceps surae",
          role: "Sinergista de Despegue y Estabilidad",
          roleType: "synergist",
          compartment: "Pantorrilla Posterior Superficial",
          origin: "Cóndilos femorales medial y lateral (gemelos) y cabeza de peroné/tibia (sóleo).",
          insertion: "Cara posterior del hueso calcáneo (Tendón de Aquiles).",
          innervation: "Nervio Tibial (S1, S2).",
          action: "En la pierna inferior aporta la flexión plantar de despegue; en la pierna superior estabiliza el tobillo sobre la huella del escalón.",
          clinicalNote: "Permite una transición suave de carga sin impacto brusco sobre el talón."
        },
        {
          id: "gluteo-medio-stairs",
          name: "Glúteo Medio (Pilar Estabilizador Pélvico)",
          scientificName: "Musculus gluteus medius",
          role: "Fijador Frontal Esencial (Anti-Trendelenburg)",
          roleType: "stabilizer",
          compartment: "Región Glútea Lateral",
          origin: "Cara glútea externa del hueso ilion entre las líneas anterior y posterior.",
          insertion: "Cara lateral del trocánter mayor del fémur.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Mantiene la pelvis perfectamente horizontal en el plano frontal durante la fase de apoyo unipodal en el escalón.",
          clinicalNote: "Si el glúteo medio es débil, la pelvis del lado opuesto cae (Marcha de Trendelenburg) y la rodilla de apoyo colapsa en valgo excesivo."
        },
        {
          id: "tibial-anterior-stairs",
          name: "Tibial Anterior",
          scientificName: "Musculus tibialis anterior",
          role: "Fijador y Posicionador del Pie",
          roleType: "stabilizer",
          compartment: "Compartimento Anterior de la Pierna",
          origin: "Cóndilo lateral y dos tercios superiores de la diáfisis tibial y membrana interósea.",
          insertion: "Cuneiforme medial y base del primer metatarsiano.",
          innervation: "Nervio Peroneo Profundo (L4, L5).",
          action: "Dorsiflexiona el pie para que los dedos no tropiecen con la contrahuella del escalón al elevar la pierna.",
          clinicalNote: "Previene caídas por tropezón frontal en escaleras en adultos mayores y pacientes neurológicos."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // AVD 5: ROTACIÓN DE TRONCO AL GIRARSE (GIRO AXIAL ESPINAL / TWIST)
    // -------------------------------------------------------------------------
    {
      id: "rotacion-tronco-giro",
      category: "vida-diaria",
      name: "Rotación de tronco al girarse (Giro Axial del Raquis / Torso Twist)",
      region: "vida-diaria",
      regionLabel: "Vida Diaria (AVD) • Columna Vertebral y Core Torsional",
      code: "AVD-05",
      dailyAction: "Giro del tronco y la cabeza en el plano transversal para mirar hacia atrás, alcanzar un objeto colocado en el asiento trasero del auto o pasar un objeto hacia un costado.",
      joint: "Articulaciones Intervertebrales Torácicas (T1-T12), Cervicales (C1-C7, esp. Atlantoaxoidea) y Caderas (Coxofemorales)",
      jointType: "Artrodias interapofisarias torácicas, Trocoide (C1-C2) y Enartrosis (Caderas)",
      plane: "Transversal",
      axis: "Eje Longitudinal Céfalo-Caudal (Vertical)",
      rom: "Rotación torácica: 35° por lado | Cervical: 60°-70° | Lumbar: restringida a 5°",
      description: "Giro armónico guiado por la orientación coronal de las carillas torácicas. Las vértebras lumbares tienen carillas sagitales que bloquean la rotación para proteger los discos.",
      lever: "3er Género torsional alrededor del cilindro axial espinal",
      animationType: "daily-trunk-rotation",
      highlightedMuscle: "Oblicuos Abdominales (Par Cruzado) y Multífidos (Fijadores)",
      searchTerms: ["rotacion de tronco", "girarse", "mirar atras", "torsion", "tronco", "espalda", "oblicuos", "asiento trasero", "vida diaria", "avd"],
      primaryMuscle: "Oblicuo Externo contralateral y Oblicuo Interno ipsilateral (Par de fuerzas cruzado)",
      synergistMuscles: ["Músculos Rotadores y Multífidos profundos", "Dorsal ancho", "Esternocleidomastoideo contralateral"],
      stabilizers: "Transverso del abdomen (faja torsional), Erectores espinales y Pelvis/Glúteo medio",
      muscles: [
        {
          id: "oblicuo-externo-twist",
          name: "Oblicuo Externo del Abdomen (Lado Opuesto al Giro)",
          scientificName: "Musculus obliquus externus abdominis",
          role: "Motor Primario Agónico (Contralateral)",
          roleType: "primary",
          compartment: "Pared Abdominal Anterolateral Superficial",
          origin: "Caras externas y bordes inferiores de las costillas 5ª a 12ª.",
          insertion: "Línea alba, tubérculo del pubis y mitad anterior del labio externo de la cresta ilíaca.",
          innervation: "Nervios Intercostales inferiores (T7-T11) y Nervio Subcostal (T12).",
          action: "Sus fibras oblicuas 'en manos a los bolsillos' traccionan la caja torácica rotándola hacia el lado opuesto (giro a la derecha activa oblicuo izquierdo).",
          clinicalNote: "Forma una cinta miofascial cruzada con el oblicuo interno opuesto alrededor del ombligo."
        },
        {
          id: "oblicuo-interno-twist",
          name: "Oblicuo Interno del Abdomen (Mismo Lado del Giro)",
          scientificName: "Musculus obliquus internus abdominis",
          role: "Motor Primario Agónico (Ipsilateral)",
          roleType: "primary",
          compartment: "Pared Abdominal Anterolateral Media",
          origin: "Fascia toracolumbar, dos tercios anteriores de la cresta ilíaca y tercio lateral del ligamento inguinal.",
          insertion: "Bordes inferiores de las costillas 10ª a 12ª, línea alba y pecten del pubis.",
          innervation: "Nervios Intercostales inferiores (T7-T12), Nervio Iliohipogástrico e Ilioinguinal (L1).",
          action: "Tracciona las costillas inferiores hacia la cresta ilíaca del mismo lado, rotando el tronco hacia su propio lado en acoplamiento con el oblicuo externo contralateral.",
          clinicalNote: "Es el motor que completa el par de torsión horizontal sin flexionar el tronco hacia adelante."
        },
        {
          id: "multifidos-rotadores-twist",
          name: "Multífidos y Rotadores Cortos y Largos",
          scientificName: "Musculi multifidi et rotatores spinae",
          role: "Sinergista Segmentario Profundo",
          roleType: "synergist",
          compartment: "Surco Vertebral Profundo (Canales Paravertebrales)",
          origin: "Apófisis transversas y mamilares de las vértebras dorsales y lumbares.",
          insertion: "Apófisis espinosas de las vértebras superiores (saltando de 1 a 3 niveles).",
          innervation: "Ramos dorsales de los nervios espinales correspondientes.",
          action: "Rotan vértebra a vértebra hacia el lado opuesto a su contracción y estabilizan la columna contra la fuerza de cizallamiento transversal.",
          clinicalNote: "Tienen la mayor densidad de propioceptores de la columna, informando al cerebro de la posición exacta de cada vértebra."
        },
        {
          id: "ecm-twist",
          name: "Esternocleidomastoideo (ECM Contralateral)",
          scientificName: "Musculus sternocleidomastoideus",
          role: "Sinergista Cervical de Mirada",
          roleType: "synergist",
          compartment: "Región Anterolateral del Cuello",
          origin: "Manubrio esternal y tercio medial de la clavícula.",
          insertion: "Cara lateral de la apófisis mastoides del hueso temporal y línea nucal superior.",
          innervation: "Nervio Accesorio (XI par craneal) y ramos cervicales C2-C3.",
          action: "Gira la cabeza hacia el lado opuesto acompañando el movimiento de los ojos y del tronco.",
          clinicalNote: "Inicia el reflejo oculocefálico guiando la rotación global del cuerpo."
        },
        {
          id: "transverso-faja-twist",
          name: "Transverso del Abdomen (Faja Torsional Antilesión)",
          scientificName: "Musculus transversus abdominis",
          role: "Fijador Protector de Discos Lumbares",
          roleType: "stabilizer",
          compartment: "Pared Abdominal Profunda",
          origin: "Fascia toracolumbar, cresta ilíaca interna y cartílagos costales inferiores.",
          insertion: "Línea alba y cresta del pubis.",
          innervation: "Nervios Intercostales inferiores y nervios de L1.",
          action: "Co-contracción circunferencial que comprime las vísceras y tensa la fascia toracolumbar, limitando la torsión lumbar excesiva.",
          clinicalNote: "Girar el tronco levantando un peso sin activar el transverso es la causa mecánica número uno de rotura del anillo fibroso y hernia discal lumbar."
        },
        {
          id: "caderas-rot-twist",
          name: "Pelvis y Rotadores de Cadera (Glúteo Medio y Pelvitrocantéreos)",
          scientificName: "Musculi pelvitrochanterici",
          role: "Fijadores de la Base Pélvica",
          roleType: "stabilizer",
          compartment: "Cintura Pélvica y Caderas",
          origin: "Sacro, ilion y marco isquiopubiano.",
          insertion: "Trocánter mayor y fosa trocantérica del fémur.",
          innervation: "Ramos del plexo sacro y nervio glúteo superior.",
          action: "Fijan la pelvis y permiten una rotación interna en la cadera del lado del giro y rotación externa en la contraria, disipando la torsión sin forzar la espalda.",
          clinicalNote: "La falta de rotación en las caderas sobrecarga automáticamente la columna lumbar durante los giros cotidianos."
        }
      ]
    },

    // =========================================================================
    // --- CATEGORÍA 2: MOVIMIENTOS ARTICULARES ANALÍTICOS (BASE) ---
    // =========================================================================

    // -------------------------------------------------------------------------
    // 1. FLEXIÓN DE CODO
    // -------------------------------------------------------------------------
    {
      id: "flexion-codo",
      category: "analitico",
      name: "Flexión de Codo",
      region: "codo",
      regionLabel: "Codo • Miembro Superior",
      code: "MS-01",
      joint: "Articulación Húmero-cubital y Húmero-radial",
      jointType: "Gínglimo / Troclear (Húmero-cubital) y Enartrosis funcional (Húmero-radial)",
      plane: "Sagital",
      axis: "Eje Perpendicular Laterolateral (Transversal)",
      rom: "0° — 145° (Activo) / 160° (Pasivo)",
      description: "Aproximación de la cara anterior del antebrazo hacia la cara anterior del brazo mediante giro sobre el eje trócleo-condíleo.",
      lever: "3er Género (Interpotente - El esfuerzo muscular se aplica entre el punto de apoyo y la resistencia)",
      animationType: "elbow-flexion",
      highlightedMuscle: "Braquial Anterior y Bíceps Braquial",
      searchTerms: ["flexion de codo", "doblar brazo", "biceps", "braquial", "antebrazo", "codo", "braquiorradial"],
      primaryMuscle: "Braquial anterior",
      synergistMuscles: ["Bíceps braquial", "Braquiorradial", "Pronador redondo"],
      antagonist: "Tríceps braquial y Ancóneo",
      muscles: [
        {
          id: "braquial-anterior",
          name: "Braquial Anterior",
          scientificName: "Musculus brachialis",
          role: "Motor Primario (Agonista Principal)",
          roleType: "primary",
          compartment: "Compartimento Braquial Anterior (Plano Profundo)",
          origin: "Mitad distal de las caras anteromedial y anterolateral del cuerpo del húmero (por debajo de la tuberosidad deltoidea) y tabiques intermusculares medial y lateral del brazo.",
          insertion: "Tuberosidad del cúbito (tuberositas ulnae) y cara anterior de la apófisis coronoides del cúbito.",
          innervation: "Nervio Musculocutáneo (C5, C6). Fibras propioceptivas accesorias del Nervio Radial (C7).",
          action: "Principal flexor del antebrazo en la articulación del codo. Actúa como el flexor más constante y potente en cualquier posición de pronación o supinación.",
          clinicalNote: "Apodado 'el burro de carga' del codo. Al anclarse al cúbito (hueso fijo en la pronosupinación), su brazo de palanca permanece inalterable en todo momento."
        },
        {
          id: "biceps-braquial",
          name: "Bíceps Braquial (Cabezas Corta y Larga)",
          scientificName: "Musculus biceps brachii",
          role: "Motor Secundario (Agonista Potente en Supinación)",
          roleType: "secondary",
          compartment: "Compartimento Braquial Anterior (Plano Superficial)",
          origin: "• Cabeza Corta: Vértice de la apófisis coracoides de la escápula (tendón compartido con el coracobraquial).\n• Cabeza Larga: Tubérculo supraglenoideo de la escápula y rodete glenoideo (tendón intraarticular que recorre la corredera bicipital).",
          insertion: "Parte posterior de la tuberosidad del radio (bicipital) y aponeurosis bicipital (lacerus fibrosus) que se expande hacia la fascia del antebrazo.",
          innervation: "Nervio Musculocutáneo (C5, C6).",
          action: "Potente flexor del codo cuando el antebrazo se halla en supinación. Principal supinador del antebrazo en flexión. Asiste débilmente en la flexión y coaptación glenohumeral.",
          clinicalNote: "El reflejo bicipital evalúa las raíces C5-C6. En pronación forzada pierde hasta el 40% de su eficacia mecánica flexora."
        },
        {
          id: "braquiorradial",
          name: "Braquiorradial (Supinador Largo)",
          scientificName: "Musculus brachioradialis",
          role: "Sinergista de Velocidad y Estabilizador Shunt",
          roleType: "synergist",
          compartment: "Compartimento Antebraquial Lateral",
          origin: "Dos tercios proximales de la cresta supracondílea lateral del húmero y tabique intermuscular lateral adyacente.",
          insertion: "Cara lateral de la base de la apófisis estiloides del radio.",
          innervation: "Nervio Radial (C5, C6), antes de bifurcarse en el codo.",
          action: "Flexiona el codo rápidamente contra cargas, con máxima ventaja mecánica en posición semiprona neutra ('apretón de manos'). Retorna el antebrazo a neutro desde extremos de rotación.",
          clinicalNote: "Actúa como músculo centrípeto (shunt): tracciona el radio contra el cóndilo humeral impidiendo la luxación en movimientos rápidos."
        },
        {
          id: "pronador-redondo",
          name: "Pronador Redondo",
          scientificName: "Musculus pronator teres",
          role: "Sinergista Accesorio",
          roleType: "synergist",
          compartment: "Compartimento Antebraquial Anterior (1er Plano)",
          origin: "• Cabeza Humeral: Por encima del epicóndilo medial del húmero (epitróclea).\n• Cabeza Cubital: Cara medial de la apófisis coronoides del cúbito.",
          insertion: "Porción media de la cara lateral de la diáfisis del radio (tuberosidad pronadora).",
          innervation: "Nervio Mediano (C6, C7).",
          action: "Pronación del antebrazo y asiste en la flexión del codo cuando existe resistencia añadida.",
          clinicalNote: "El nervio mediano discurre entre sus dos cabezas; su hipertonía genera el Síndrome del Pronador Redondo."
        },
        {
          id: "deltoides-manguito-flex-codo",
          name: "Deltoides y Manguito Rotador (Fijadores Glenohumerales)",
          scientificName: "Musculi deltoideus et rotatores humeri",
          role: "Fijador / Estabilizador de Cadena",
          roleType: "stabilizer",
          compartment: "Cintura Escapular y Hombro",
          origin: "Clavícula, acromion y fosas escapulares (supra/infraespinosa).",
          insertion: "Tuberosidad deltoidea y tubérculos mayor/menor del húmero.",
          innervation: "Nervios Axilar y Supraescapular (C5, C6).",
          action: "Anclan y fijan el húmero en posición neutra impidiendo que el codo se desplace hacia adelante o atrás durante la flexión.",
          clinicalNote: "Sin fijación del hombro, la flexión del codo produce una oscilación compensatoria que reduce la fuerza efectiva del bíceps."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 2. EXTENSIÓN DE CODO
    // -------------------------------------------------------------------------
    {
      id: "extension-codo",
      category: "analitico",
      name: "Extensión de Codo",
      region: "codo",
      regionLabel: "Codo • Miembro Superior",
      code: "MS-02",
      joint: "Articulación Húmero-cubital",
      jointType: "Gínglimo / Troclear",
      plane: "Sagital",
      axis: "Eje Laterolateral (Transversal)",
      rom: "145° — 0° (hasta 5°-10° de hiperextensión fisiológica)",
      description: "Alejamiento del antebrazo respecto al brazo hasta que el olécranon impacta en la fosa olecraniana del húmero.",
      lever: "1er Género (Interapoyo - El fulcro articular se ubica entre la fuerza del tríceps y la resistencia del antebrazo)",
      animationType: "elbow-extension",
      highlightedMuscle: "Tríceps Braquial (Cabezas Larga, Lateral y Medial)",
      searchTerms: ["extension de codo", "estirar brazo", "triceps", "anconeo", "codo posterior"],
      primaryMuscle: "Tríceps braquial",
      synergistMuscles: ["Ancóneo"],
      stabilizers: "Deltoides posterior, Pectoral mayor clavicular y Manguito rotador (fijan el hombro contra la inercia)",
      antagonist: "Braquial anterior y Bíceps braquial",
      muscles: [
        {
          id: "triceps-braquial",
          name: "Tríceps Braquial (Cabezas Larga, Lateral y Medial)",
          scientificName: "Musculus triceps brachii",
          role: "Motor Primario Absoluto",
          roleType: "primary",
          compartment: "Compartimento Braquial Posterior",
          origin: "• Cabeza Larga: Tubérculo infraglenoideo de la escápula y rodete glenoideo.\n• Cabeza Lateral: Cara posterior del húmero, por encima del surco del nervio radial.\n• Cabeza Medial: Cara posterior del húmero, por debajo del surco del nervio radial y tabiques intermusculares.",
          insertion: "Cara superior y posterior del olécranon del cúbito (tendón común tricipital) y expansión a la fascia antebraquial.",
          innervation: "Nervio Radial (C6, C7, C8). Cada cabeza cuenta con ramos nerviosos propios.",
          action: "Extensor principal y potente del codo en todas las posiciones. La cabeza larga además aduce y retrovierte el húmero a nivel glenohumeral.",
          clinicalNote: "El reflejo tricipital evalúa prioritariamente la raíz C7. La cabeza medial se activa en cualquier extensión cotidiana; las cabezas larga y lateral se suman ante resistencia."
        },
        {
          id: "anconeo",
          name: "Ancóneo",
          scientificName: "Musculus anconeus",
          role: "Sinergista y Estabilizador Articular",
          roleType: "synergist",
          compartment: "Región Posterior del Codo (Triángulo Olecraniano)",
          origin: "Superficie posterior e inferior del epicóndilo lateral del húmero.",
          insertion: "Cara lateral del olécranon y cuarto superior posterolateral de la diáfisis cubital.",
          innervation: "Nervio Radial (C7, C8, T1), por una rama de la cabeza medial del tríceps.",
          action: "Coadyuva en la fase terminal de la extensión del codo; estabiliza la articulación húmero-cubital y retrae la cápsula posterior evitando su pellizcamiento.",
          clinicalNote: "Abduce sutilmente el cúbito durante la pronación activa del antebrazo."
        },
        {
          id: "deltoides-posterior-fijador-ext",
          name: "Deltoides Posterior y Pectoral Clavicular (Fijadores del Húmero)",
          scientificName: "Musculi deltoideus posterior et pectoralis major",
          role: "Fijador / Estabilizador de Cadena",
          roleType: "stabilizer",
          compartment: "Hombro Posterior y Anterior",
          origin: "Espina de la escápula y tercio medial de la clavícula.",
          insertion: "Tuberosidad deltoidea y cresta del tubérculo mayor del húmero.",
          innervation: "Nervios Axilar y Pectoral Lateral (C5, C6, C7).",
          action: "Coactivan y fijan el muñón del hombro absorbiendo el vector inercial del antebrazo durante la extensión rápida.",
          clinicalNote: "Garantizan que la potencia extensora se focalice en la articulación húmero-cubital sin desplazamientos parásitos del brazo."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 3. ABDUCCIÓN DE HOMBRO
    // -------------------------------------------------------------------------
    {
      id: "abduccion-hombro",
      category: "analitico",
      name: "Abducción de Hombro",
      region: "hombro",
      regionLabel: "Hombro • Cintura Escapular",
      code: "MS-03",
      joint: "Complejo Articular del Hombro (Glenohumeral y Escapulotorácica)",
      jointType: "Enartrosis (Esferoidea) multiaxial",
      plane: "Frontal / Coronal",
      axis: "Eje Anteroposterior (Sagital)",
      rom: "0° — 180° (0-90° Glenohumeral; 90-150° Escapulotorácica; 150-180° Inclinación espinal)",
      description: "Separación lateral del miembro superior alejándolo de la línea media en el plano frontal.",
      lever: "3er Género (Interpotente)",
      animationType: "shoulder-abduction",
      highlightedMuscle: "Deltoides (Porción Acromial) y Supraespinoso",
      searchTerms: ["abduccion de hombro", "abducir hombro", "separar brazo", "deltoides", "supraespinoso", "hombro"],
      primaryMuscle: "Deltoides (Porción Acromial / Media)",
      synergistMuscles: ["Supraespinoso", "Deltoides Clavicular", "Deltoides Espinal", "Serrato anterior", "Trapecio"],
      antagonist: "Pectoral mayor, Dorsal ancho y Redondo mayor",
      muscles: [
        {
          id: "deltoides-acromial",
          name: "Deltoides • Porción Acromial (Media / Multipenniforme)",
          scientificName: "Musculus deltoideus (pars acromialis)",
          role: "Motor Primario (15° a 90°)",
          roleType: "primary",
          compartment: "Hombro • Capa Muscular Externa",
          origin: "Borde lateral y vértice superior del acromion de la escápula.",
          insertion: "Tuberosidad deltoidea del húmero (V deltoidea), en la cara lateral de la diáfisis humeral.",
          innervation: "Nervio Axilar / Circunflejo (C5, C6).",
          action: "Principal motor abductor del hombro a partir de los 15° hasta los 90° en el plano frontal.",
          clinicalNote: "Su disposición multipenniforme le otorga una inmensa fuerza ascensional, requiriendo el descenso de la cabeza humeral por el manguito rotador para no impactar el acromion."
        },
        {
          id: "supraespinoso",
          name: "Supraespinoso",
          scientificName: "Musculus supraspinatus",
          role: "Motor Primario Iniciador (0° a 15°) y Coaptador",
          roleType: "primary",
          compartment: "Manguito de los Rotadores • Fosa Supraespinosa",
          origin: "Dos tercios mediales de la fosa supraespinosa de la escápula y fascia supraspinosa profunda.",
          insertion: "Carilla articular superior del tubérculo mayor del húmero (troquíter) y cápsula glenohumeral.",
          innervation: "Nervio Supraescapular (C5, C6).",
          action: "Inicia la abducción en los primeros 15 grados y centra firmemente la cabeza humeral en la glena.",
          clinicalNote: "Es el tendón con mayor tasa de roturas por atrapamiento bajo el arco coracoacromial."
        },
        {
          id: "deltoides-clavicular",
          name: "Deltoides • Porción Clavicular (Anterior)",
          scientificName: "Musculus deltoideus (pars clavicularis)",
          role: "Motor Secundario / Sinergista Coaptador",
          roleType: "secondary",
          compartment: "Hombro Anterior",
          origin: "Borde anterior y tercio lateral de la cara superior de la clavícula.",
          insertion: "Tuberosidad deltoidea del húmero (V deltoidea).",
          innervation: "Nervio Axilar (C5, C6).",
          action: "Asiste en la abducción horizontal y estabiliza la articulación en elevación lateral; además es potente flexor y rotador medial.",
          clinicalNote: "Participa activamente en la fase de aceleración de lanzamientos por encima del hombro."
        },
        {
          id: "deltoides-espinal",
          name: "Deltoides • Porción Espinal (Posterior)",
          scientificName: "Musculus deltoideus (pars spinalis)",
          role: "Motor Secundario / Estabilizador Posterior",
          roleType: "secondary",
          compartment: "Hombro Posterior",
          origin: "Labio inferior del borde posterior de la espina de la escápula en toda su longitud.",
          insertion: "Tuberosidad deltoidea del húmero (V deltoidea).",
          innervation: "Nervio Axilar (C5, C6).",
          action: "Colabora en la abducción por encima de 60°; es el motor clave de la abducción horizontal, extensión y rotación lateral del brazo.",
          clinicalNote: "Equilibra el vector anterior del pectoral y deltoides clavicular protegiendo la cápsula posterior."
        },
        {
          id: "serrato-anterior",
          name: "Serrato Anterior (Serrato Mayor)",
          scientificName: "Musculus serratus anterior",
          role: "Sinergista Escapulotorácico Indispensable",
          roleType: "synergist",
          compartment: "Pared Lateral del Tórax",
          origin: "Caras laterales de las costillas 1ª a 9ª mediante digitaciones carnosas.",
          insertion: "Cara anterior del borde medial de la escápula (desde el ángulo superior hasta el inferior).",
          innervation: "Nervio Torácico Largo / Respiratorio de Charles Bell (C5, C6, C7).",
          action: "Produce la báscula axilar o campaneo externo de la escápula para permitir la abducción por encima de los 90°.",
          clinicalNote: "Su lesión causa 'escápula alada' e imposibilidad total de elevar el brazo sobre la cabeza."
        },
        {
          id: "manguito-coaptador-abd",
          name: "Manguito de los Rotadores (Infraespinoso, Redondo Menor, Subescapular)",
          scientificName: "Musculi rotatores humeri",
          role: "Fijador / Estabilizador de Cadena",
          roleType: "stabilizer",
          compartment: "Manguito Rotador Periarticular",
          origin: "Fosa infraespinosa, fosa subescapular y borde axilar de la escápula.",
          insertion: "Tubérculos mayor y menor del húmero y cápsula articular.",
          innervation: "Nervios Supraescapular, Subescapular y Axilar (C5, C6).",
          action: "Ejercen una fuerza de depresión y centrado concéntrico de la cabeza humeral dentro de la cavidad glenoidea, evitando el choque contra el acromion.",
          clinicalNote: "Si este trío de fijadores falla, el deltoides proyecta la cabeza del húmero hacia el acromion provocando tendinopatía por pinzamiento."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 4. FLEXIÓN DE HOMBRO
    // -------------------------------------------------------------------------
    {
      id: "flexion-hombro",
      category: "analitico",
      name: "Flexión de Hombro (Anteversión)",
      region: "hombro",
      regionLabel: "Hombro • Cintura Escapular",
      code: "MS-04",
      joint: "Articulación Glenohumeral",
      jointType: "Enartrosis (Esferoidea)",
      plane: "Sagital",
      axis: "Eje Perpendicular Laterolateral (Transversal)",
      rom: "0° — 180°",
      description: "Desplazamiento anterior del húmero en el plano sagital, elevando el brazo hacia el frente y arriba.",
      lever: "3er Género (Interpotente)",
      animationType: "shoulder-flexion",
      highlightedMuscle: "Deltoides (Porción Clavicular) y Coracobraquial",
      searchTerms: ["flexion de hombro", "levantar brazo", "subir brazo", "anteversion", "deltoides anterior", "coracobraquial"],
      primaryMuscle: "Deltoides (Porción Clavicular / Anterior)",
      synergistMuscles: ["Coracobraquial", "Pectoral mayor (haz clavicular)", "Bíceps braquial (cabeza corta)"],
      stabilizers: "Serrato anterior, Trapecio inferior y Manguito rotador (fijan la escápula contra la parrilla costal)",
      antagonist: "Dorsal ancho, Redondo mayor y Deltoides espinal",
      muscles: [
        {
          id: "deltoides-anterior-flex",
          name: "Deltoides • Porción Clavicular (Anterior)",
          scientificName: "Musculus deltoideus (pars clavicularis)",
          role: "Motor Primario Agonista",
          roleType: "primary",
          compartment: "Hombro Anterior",
          origin: "Borde anterior y tercio lateral de la cara superior de la clavícula.",
          insertion: "Tuberosidad deltoidea del húmero (V deltoidea).",
          innervation: "Nervio Axilar (C5, C6).",
          action: "Flexión potente del húmero en el plano sagital y rotación medial del brazo.",
          clinicalNote: "Inseparable de todas las acciones de alcance frontal a la altura de los ojos."
        },
        {
          id: "coracobraquial",
          name: "Coracobraquial",
          scientificName: "Musculus coracobrachialis",
          role: "Motor Secundario Agonista",
          roleType: "secondary",
          compartment: "Compartimento Braquial Anterior Profundo",
          origin: "Vértice de la apófisis coracoides de la escápula (tendón común con la cabeza corta del bíceps).",
          insertion: "Tercio medio de la cara anteromedial y borde medial del cuerpo del húmero.",
          innervation: "Nervio Musculocutáneo (C5, C6, C7), el cual lo atraviesa.",
          action: "Flexión y aducción del brazo a nivel de la articulación glenohumeral.",
          clinicalNote: "El nervio musculocutáneo perfora su vientre, siendo un hito quirúrgico vital."
        },
        {
          id: "pectoral-mayor-clavicular",
          name: "Pectoral Mayor (Porción Clavicular)",
          scientificName: "Musculus pectoralis major (pars clavicularis)",
          role: "Motor Secundario Potente",
          roleType: "secondary",
          compartment: "Pared Torácica Anterior",
          origin: "Mitad medial del borde anterior de la clavícula.",
          insertion: "Labio lateral del surco intertubercular del húmero (cresta del troquíter).",
          innervation: "Nervio Pectoral Lateral (C5, C6, C7).",
          action: "Flexiona el brazo desde la posición neutra hasta los 90° y produce aducción horizontal.",
          clinicalNote: "Reclutado con gran potencia al empujar objetos al frente contra gravedad."
        },
        {
          id: "biceps-corta-flex",
          name: "Bíceps Braquial (Cabeza Corta)",
          scientificName: "Musculus biceps brachii (caput breve)",
          role: "Sinergista Coadyuvante",
          roleType: "synergist",
          compartment: "Brazo Anterior",
          origin: "Vértice de la apófisis coracoides de la escápula.",
          insertion: "Tuberosidad del radio y fascia antebraquial.",
          innervation: "Nervio Musculocutáneo (C5, C6).",
          action: "Asiste en la flexión del hombro cuando el codo está estabilizado.",
          clinicalNote: "Su anclaje en la coracoides le permite cruzar la articulación glenohumeral por delante."
        },
        {
          id: "serrato-trapecio-fijador-flex",
          name: "Serrato Anterior y Trapecio Inferior (Fijadores Escapulotorácicos)",
          scientificName: "Musculi serratus anterior et trapezius inferior",
          role: "Fijador / Estabilizador de Cadena",
          roleType: "stabilizer",
          compartment: "Pared Torácica Lateral y Espalda Media",
          origin: "Caras laterales de costillas 1ª a 9ª y apófisis espinosas T4 a T12.",
          insertion: "Borde medial y espina de la escápula.",
          innervation: "Nervio Torácico Largo (C5-C7) y Nervio Accesorio (XI).",
          action: "Adosan la escápula contra el tórax ofreciendo una base de soporte rígida para que el brazo pueda proyectarse hacia el frente.",
          clinicalNote: "La debilidad de estos fijadores escapulares produce escápula alada al empujar o elevar objetos frontales."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 5. EXTENSIÓN DE RODILLA
    // -------------------------------------------------------------------------
    {
      id: "extension-rodilla",
      category: "analitico",
      name: "Extensión de Rodilla",
      region: "rodilla",
      regionLabel: "Rodilla • Miembro Inferior",
      code: "MI-01",
      joint: "Articulación Tibiofemoral y Femororrotuliana (Patelofemoral)",
      jointType: "Bicondílea con meniscos (Tibiofemoral) y Tróclea (Femororrotuliana)",
      plane: "Sagital",
      axis: "Eje Bicondíleo Laterolateral (Transversal)",
      rom: "135°/140° — 0° (Extensión completa neutra)",
      description: "Aumento del ángulo articular entre el fémur y la tibia con deslizamiento superior de la rótula en la tróclea femoral.",
      lever: "1er / 3er Género anatómico con polea patelar (la rótula incrementa el brazo de palanca un 30-50%)",
      animationType: "knee-extension",
      highlightedMuscle: "Cuádriceps Femoral (Recto Femoral y 3 Vastos)",
      searchTerms: ["extension de rodilla", "estirar pierna", "cuadriceps", "recto femoral", "vasto medial", "vasto lateral", "vasto intermedio"],
      primaryMuscle: "Cuádriceps femoral (Las 4 cabezas completas)",
      synergistMuscles: ["Tensor de la fascia lata (estabilizador terminal)"],
      antagonist: "Isquiotibiales (Bíceps femoral, Semitendinoso, Semimembranoso)",
      muscles: [
        {
          id: "recto-femoral",
          name: "Recto Femoral (Recto Anterior)",
          scientificName: "Musculus rectus femoris",
          role: "Motor Primario Biarticular",
          roleType: "primary",
          compartment: "Compartimento Femoral Anterior (Superficial)",
          origin: "Espina ilíaca anteroinferior (EIAI - tendón directo) y surco supraacetabular del ilion (tendón reflejo).",
          insertion: "Base de la rótula y, por medio del ligamento rotuliano, en la tuberosidad de la tibia.",
          innervation: "Nervio Femoral / Crural (L2, L3, L4).",
          action: "Extiende con potencia la rodilla y flexiona simultáneamente la articulación de la cadera.",
          clinicalNote: "Al cruzar dos articulaciones es vulnerable a contracturas y avulsiones en patadas potentes."
        },
        {
          id: "vasto-lateral",
          name: "Vasto Lateral (Vastus Lateralis)",
          scientificName: "Musculus vastus lateralis",
          role: "Motor Primario (Mayor Masa y Fuerza)",
          roleType: "primary",
          compartment: "Compartimento Femoral Anterior (Lateral)",
          origin: "Cara lateral del trocánter mayor, tuberosidad glútea y labio lateral de la línea áspera del fémur.",
          insertion: "Borde lateral de la rótula y tendón común del cuádriceps hacia la tuberosidad tibial.",
          innervation: "Nervio Femoral (L2, L3, L4).",
          action: "Extensión pura y potente de la rodilla; genera la mayor cuota de fuerza de todo el complejo cuádriceps.",
          clinicalNote: "Sitio predilecto para inyecciones intramusculares seguras en lactantes y niños pequeños."
        },
        {
          id: "vasto-medial",
          name: "Vasto Medial y Fibras VMO",
          scientificName: "Musculus vastus medialis (pars obliqua)",
          role: "Motor Primario y Estabilizador Patelar",
          roleType: "primary",
          compartment: "Compartimento Femoral Anterior (Medial)",
          origin: "Parte distal de la línea intertrocantérea, labio medial de la línea áspera y línea supracondílea medial.",
          insertion: "Borde medial de la rótula y retináculo patelar medial.",
          innervation: "Nervio Femoral (L2, L3, L4).",
          action: "Extensión de rodilla; sus fibras distales oblicuas (VMO) guían la rótula e impiden su subluxación lateral.",
          clinicalNote: "Es el primer músculo en atrofiarse tras cirugías o derrames articulares de rodilla."
        },
        {
          id: "vasto-intermedio",
          name: "Vasto Intermedio (Músculo Crural)",
          scientificName: "Musculus vastus intermedius",
          role: "Motor Primario Profundo",
          roleType: "primary",
          compartment: "Compartimento Femoral Anterior (Profundo al recto femoral)",
          origin: "Caras anterior y lateral de los dos tercios superiores de la diáfisis femoral y tabique intermuscular lateral.",
          insertion: "Borde superior y base de la rótula, integrándose a la capa profunda del tendón rotuliano.",
          innervation: "Nervio Femoral (L2, L3, L4).",
          action: "Extensión pura de la rodilla independientemente de la posición de la cadera.",
          clinicalNote: "Sus fibras más profundas (músculo articular de la rodilla) retraen la bolsa suprarrotuliana durante la extensión."
        },
        {
          id: "tfl-estabilizador",
          name: "Tensor de la Fascia Lata (TFL)",
          scientificName: "Musculus tensor fasciae latae",
          role: "Sinergista Estabilizador Lateral",
          roleType: "synergist",
          compartment: "Muslo Anterolateral",
          origin: "Espina ilíaca anterosuperior y cresta ilíaca anterior.",
          insertion: "Tracto iliotibial hasta el tubérculo de Gerdy en la tibia.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Bloquea y estabiliza la rodilla en los últimos grados de extensión completa.",
          clinicalNote: "Su tensión excesiva desalinea el tracking patelar hacia lateral."
        },
        {
          id: "isquiotibiales-fijador-ext-rodilla",
          name: "Isquiotibiales (Coaptadores Protectores del LCA)",
          scientificName: "Musculi ischiocrurales",
          role: "Fijador / Estabilizador de Cadena",
          roleType: "stabilizer",
          compartment: "Muslo Posterior",
          origin: "Tuberosidad isquiática y línea áspera femoral.",
          insertion: "Cabeza del peroné y cóndilos tibiales.",
          innervation: "Nervio Ciático (L5, S1, S2).",
          action: "Co-contracción posterior sincrónica que frena el cizallamiento anterior de la tibia, protegiendo activamente el Ligamento Cruzado Anterior (LCA).",
          clinicalNote: "La activación refleja de los isquiotibiales es el principal mecanismo de protección activa de la rodilla en cadena abierta."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 6. FLEXIÓN DE RODILLA
    // -------------------------------------------------------------------------
    {
      id: "flexion-rodilla",
      category: "analitico",
      name: "Flexión de Rodilla",
      region: "rodilla",
      regionLabel: "Rodilla • Miembro Inferior",
      code: "MI-02",
      joint: "Articulación Tibiofemoral",
      jointType: "Bicondílea con fibrocartílagos meniscales",
      plane: "Sagital",
      axis: "Eje Laterolateral (Transversal)",
      rom: "0° — 135° (Activo con cadera extendida) / 145° (Activo con cadera flexionada) / 160° (Pasivo)",
      description: "Aproximación de la cara posterior de la pierna hacia el muslo con deslizamiento posterior condíleo.",
      lever: "3er Género (Interpotente)",
      animationType: "knee-flexion",
      highlightedMuscle: "Isquiotibiales (Bíceps Femoral, Semitendinoso y Semimembranoso)",
      searchTerms: ["flexion de rodilla", "doblar pierna", "talon al gluteo", "isquiotibiales", "biceps femoral", "semitendinoso", "semimembranoso", "popliteo"],
      primaryMuscle: "Isquiotibiales (Bíceps femoral, Semitendinoso, Semimembranoso)",
      synergistMuscles: ["Gastrocnemios (gemelos)", "Poplíteo", "Grácil (recto interno)", "Sartorio"],
      stabilizers: "Cuádriceps femoral (control excéntrico del movimiento y centrado rotuliano) y Pelvitrocantéreos",
      antagonist: "Cuádriceps femoral",
      muscles: [
        {
          id: "biceps-femoral",
          name: "Bíceps Femoral (Cabezas Larga y Corta)",
          scientificName: "Musculus biceps femoris",
          role: "Motor Primario (Grupo Lateral)",
          roleType: "primary",
          compartment: "Compartimento Femoral Posterior Lateral",
          origin: "• Cabeza Larga: Tuberosidad isquiática (tendón común con semitendinoso).\n• Cabeza Corta: Labio lateral de la línea áspera y línea supracondílea lateral del fémur.",
          insertion: "Cara lateral de la cabeza del peroné y cóndilo lateral de la tibia.",
          innervation: "Cabeza larga: Rama tibial del Nervio Ciático (L5, S1, S2). Cabeza corta: Rama peronea común del Nervio Ciático (L5, S1).",
          action: "Flexiona la rodilla y rota lateralmente la pierna (con rodilla flexionada); la cabeza larga además extiende la cadera.",
          clinicalNote: "Es el músculo con mayor índice de desgarros miofasciales en carreras de velocidad."
        },
        {
          id: "semitendinoso",
          name: "Semitendinoso",
          scientificName: "Musculus semitendinosus",
          role: "Motor Primario (Grupo Medial Superficial)",
          roleType: "primary",
          compartment: "Compartimento Femoral Posterior Medial",
          origin: "Tuberosidad isquiática (cara posterior interna).",
          insertion: "Cara medial de la porción superior de la tibia (Pata de Ganso superficial).",
          innervation: "Rama tibial del Nervio Ciático (L5, S1, S2).",
          action: "Flexiona la rodilla y rota medialmente la tibia sobre el fémur; extiende la cadera.",
          clinicalNote: "Su tendón distal largo se extrae con frecuencia como autoinjerto para reconstruir el LCA."
        },
        {
          id: "semimembranoso",
          name: "Semimembranoso",
          scientificName: "Musculus semimembranosus",
          role: "Motor Primario (Grupo Medial Profundo)",
          roleType: "primary",
          compartment: "Compartimento Femoral Posterior Medial Profundo",
          origin: "Porción superolateral de la tuberosidad isquiática.",
          insertion: "Parte posterior del cóndilo medial de la tibia, ligamento poplíteo oblicuo y fascia poplítea.",
          innervation: "Rama tibial del Nervio Ciático (L5, S1, S2).",
          action: "Flexiona la rodilla y rota medialmente la tibia; potente extensor de la cadera.",
          clinicalNote: "Entre su tendón y el gemelo medial se ubica la bursa que puede inflamar el Quiste de Baker."
        },
        {
          id: "gastrocnemios-flex",
          name: "Gastrocnemios (Gemelos Medial y Lateral)",
          scientificName: "Musculus gastrocnemius",
          role: "Motor Secundario Potente",
          roleType: "secondary",
          compartment: "Pantorrilla Posterior Superficial",
          origin: "Caras posteriores de los cóndilos medial y lateral del fémur.",
          insertion: "Cara posterior del calcáneo por el tendón de Aquiles.",
          innervation: "Nervio Tibial (S1, S2).",
          action: "Flexiona la rodilla cuando el pie no está apoyado fijamente; potente flexor plantar.",
          clinicalNote: "Son biarticulares: su capacidad para flexionar la rodilla disminuye si el tobillo está en flexión plantar máxima."
        },
        {
          id: "popliteo",
          name: "Poplíteo",
          scientificName: "Musculus popliteus",
          role: "Motor Secundario (Desbloqueador de Rodilla)",
          roleType: "secondary",
          compartment: "Fosa Poplítea Profunda",
          origin: "Cara lateral del cóndilo femoral lateral (tendón intracapsular) y menisco lateral.",
          insertion: "Cara posterior de la diáfisis tibial por encima de la línea del sóleo.",
          innervation: "Nervio Tibial (L4, L5, S1).",
          action: "Desbloquea la rodilla extendida mediante rotación medial de la tibia al iniciar la flexión.",
          clinicalNote: "Apodado 'la llave de la rodilla'. Sin el poplíteo, los isquiotibiales no pueden flexionar con soltura."
        },
        {
          id: "gracil-flex",
          name: "Grácil (Recto Interno)",
          scientificName: "Musculus gracilis",
          role: "Sinergista Medial",
          roleType: "synergist",
          compartment: "Muslo Medial (Aductores)",
          origin: "Cuerpo y rama inferior del pubis.",
          insertion: "Parte superior de la cara medial de la tibia (Pata de Ganso).",
          innervation: "Nervio Obturador (L2, L3).",
          action: "Flexiona la rodilla y aduce la cadera.",
          clinicalNote: "Forma el elemento intermedio de la pata de ganso entre sartorio y semitendinoso."
        },
        {
          id: "sartorio-flex",
          name: "Sartorio",
          scientificName: "Musculus sartorius",
          role: "Sinergista",
          roleType: "synergist",
          compartment: "Muslo Anterior",
          origin: "Espina ilíaca anterosuperior (EIAS).",
          insertion: "Cara medial de la tibia (Pata de Ganso).",
          innervation: "Nervio Femoral (L2, L3).",
          action: "Flexiona y rota medialmente la rodilla.",
          clinicalNote: "Cruza en diagonal todo el muslo anterior."
        },
        {
          id: "cuadriceps-fijador-patelar",
          name: "Cuádriceps Femoral (Fijador Excéntrico y Centrador Rotuliano)",
          scientificName: "Musculus quadriceps femoris",
          role: "Fijador / Estabilizador de Cadena",
          roleType: "stabilizer",
          compartment: "Muslo Anterior",
          origin: "Espina ilíaca anteroinferior y diáfisis femoral.",
          insertion: "Tuberosidad anterior de la tibia por el tendón rotuliano.",
          innervation: "Nervio Femoral (L2, L3, L4).",
          action: "Centra la rótula en la tróclea femoral y actúa como fijador desacelerador excéntrico regulando la velocidad de la flexión.",
          clinicalNote: "Impide el colapso de la rodilla y neutraliza las fuerzas rotacionales sobre los meniscos."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 7. FLEXIÓN DE CADERA
    // -------------------------------------------------------------------------
    {
      id: "flexion-cadera",
      category: "analitico",
      name: "Flexión de Cadera (Nutación Femoral)",
      region: "cadera",
      regionLabel: "Cadera • Pelvis y Muslo",
      code: "MI-03",
      joint: "Articulación Coxofemoral",
      jointType: "Enartrosis / Cotiloidea",
      plane: "Sagital",
      axis: "Eje Perpendicular Laterolateral (Transversal)",
      rom: "0° — 120° (con rodilla flexionada) / 0° — 90° (rodilla extendida)",
      description: "Aproximación de la cara anterior del muslo hacia el tronco o abdomen en el plano sagital.",
      lever: "3er Género (Interpotente)",
      animationType: "hip-flexion",
      highlightedMuscle: "Psoas Mayor e Ilíaco (Iliopsoas)",
      searchTerms: ["flexion de cadera", "levantar muslo", "psoas", "iliaco", "iliopsoas", "cadera", "recto femoral", "sartorio"],
      primaryMuscle: "Psoas-Ilíaco (Psoas Mayor e Ilíaco)",
      synergistMuscles: ["Recto femoral", "Sartorio", "Tensor de la fascia lata", "Pectíneo", "Aductor largo"],
      antagonist: "Glúteo mayor e Isquiotibiales",
      muscles: [
        {
          id: "psoas-mayor",
          name: "Psoas Mayor",
          scientificName: "Musculus psoas major",
          role: "Motor Primario Supremo",
          roleType: "primary",
          compartment: "Retroperitoneo Lumbar",
          origin: "Cuerpos de T12-L4, discos intervertebrales correspondientes y apófisis costiformes de L1-L5.",
          insertion: "Trocánter menor del fémur a través del tendón iliopsoas.",
          innervation: "Ramos anteriores directos del Plexo Lumbar (L1, L2, L3).",
          action: "El flexor más potente y rápido de la articulación coxofemoral; flexiona el tronco sobre el fémur en sedestación.",
          clinicalNote: "Su hipertonía produce anteversión pélvica e hiperlordosis lumbar dolorosa (Test de Thomas)."
        },
        {
          id: "iliaco",
          name: "Ilíaco",
          scientificName: "Musculus iliacus",
          role: "Motor Primario Agonista",
          roleType: "primary",
          compartment: "Fosa Ilíaca Interna",
          origin: "Dos tercios superiores de la fosa ilíaca interna, labio interno de la cresta ilíaca y ala del sacro.",
          insertion: "Trocánter menor del fémur, fusionado con el tendón del psoas mayor.",
          innervation: "Nervio Femoral (L2, L3).",
          action: "Flexión potente de la cadera y estabilización anterior de la cabeza femoral en el acetábulo.",
          clinicalNote: "Conforma con el psoas una unidad motora funcional inseparable: el músculo iliopsoas."
        },
        {
          id: "recto-femoral-hip",
          name: "Recto Femoral (Recto Anterior)",
          scientificName: "Musculus rectus femoris",
          role: "Motor Secundario Biarticular",
          roleType: "secondary",
          compartment: "Femoral Anterior",
          origin: "Espina ilíaca anteroinferior (EIAI) y surco supraacetabular.",
          insertion: "Tuberosidad de la tibia mediante el ligamento rotuliano.",
          innervation: "Nervio Femoral (L2, L3, L4).",
          action: "Flexiona potentemente la cadera cuando la rodilla se halla en flexión previa.",
          clinicalNote: "Se explora activamente en el test de elevación con pierna recta."
        },
        {
          id: "sartorio-hip",
          name: "Sartorio",
          scientificName: "Musculus sartorius",
          role: "Motor Secundario Triarticular",
          roleType: "secondary",
          compartment: "Femoral Anterior",
          origin: "Espina ilíaca anterosuperior (EIAS).",
          insertion: "Cara medial de la tibia proximal (Pata de Ganso).",
          innervation: "Nervio Femoral (L2, L3).",
          action: "Flexiona, abduce y rota lateralmente el muslo (posición de cruzar la pierna).",
          clinicalNote: "El músculo más largo de la economía humana."
        },
        {
          id: "tfl-hip",
          name: "Tensor de la Fascia Lata (TFL)",
          scientificName: "Musculus tensor fasciae latae",
          role: "Motor Secundario",
          roleType: "secondary",
          compartment: "Glúteo / Anterolateral",
          origin: "Espina ilíaca anterosuperior (EIAS) y cresta ilíaca anterior.",
          insertion: "Tubérculo de Gerdy en la tibia a través del tracto iliotibial.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Flexiona, abduce y rota medialmente la cadera.",
          clinicalNote: "Contribuye con fuerza en la marcha rápida hacia adelante."
        },
        {
          id: "pectineo",
          name: "Pectíneo",
          scientificName: "Musculus pectineus",
          role: "Sinergista Aductor-Flexor",
          roleType: "synergist",
          compartment: "Trígono Femoral / Muslo Medial",
          origin: "Cresta pectínea del pubis y eminencia iliopúbica.",
          insertion: "Línea pectínea del fémur (por debajo del trocánter menor).",
          innervation: "Nervio Femoral (L2, L3) y ocasionalmente ramos del Nervio Obturador.",
          action: "Flexiona y aduce el muslo en la articulación de la cadera.",
          clinicalNote: "Forma el suelo medial del triángulo de Scarpa."
        },
        {
          id: "aductor-largo",
          name: "Aductor Largo (Primer Aductor)",
          scientificName: "Musculus adductor longus",
          role: "Sinergista Inicial",
          roleType: "synergist",
          compartment: "Muslo Medial",
          origin: "Cuerpo del pubis, por debajo de la cresta púbica.",
          insertion: "Tercio medio del labio medial de la línea áspera del fémur.",
          innervation: "Nervio Obturador (división anterior L2, L3, L4).",
          action: "Aducción y asiste en los primeros 50° de flexión de cadera.",
          clinicalNote: "Su tendón proximal es comúnmente afectado en pubalgias de futbolistas."
        },
        {
          id: "transverso-recto-fijador-pelvis",
          name: "Transverso y Recto Abdominal (Fijadores Lumbopélvicos Antilordosis)",
          scientificName: "Musculi transversus abdominis et rectus abdominis",
          role: "Fijador / Estabilizador de Cadena",
          roleType: "stabilizer",
          compartment: "Pared Abdominal Anterior y Profunda",
          origin: "Cresta ilíaca, sínfisis del pubis y cartílagos costales 5º a 7º.",
          insertion: "Línea alba y cresta del pubis.",
          innervation: "Nervios Intercostales inferiores (T7-T12) y L1.",
          action: "Fijan la pelvis en retroversión activa impidiendo que la tracción del psoas mayor hiperlordose la columna lumbar.",
          clinicalNote: "Sin fijadores abdominales activos, la flexión de cadera arquearía destructivamente la columna lumbar causando lumbalgia mecánica."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 8. ABDUCCIÓN DE CADERA
    // -------------------------------------------------------------------------
    {
      id: "abduccion-cadera",
      category: "analitico",
      name: "Abducción de Cadera",
      region: "cadera",
      regionLabel: "Cadera • Cintura Pélvica",
      code: "MI-04",
      joint: "Articulación Coxofemoral",
      jointType: "Enartrosis",
      plane: "Frontal / Coronal",
      axis: "Eje Anteroposterior (Sagital)",
      rom: "0° — 45°",
      description: "Separación lateral del miembro inferior alejándolo del plano sagital medio corporal.",
      lever: "1er Género en apoyo monopodal (Estabilizador pélvico contra gravedad) / 3er Género en cadena cinética abierta",
      animationType: "hip-abduction",
      highlightedMuscle: "Glúteo Medio y Glúteo Menor",
      searchTerms: ["abduccion de cadera", "separar pierna", "gluteo medio", "gluteo menor", "trendelenburg", "cadera", "tfl"],
      primaryMuscle: "Glúteo medio",
      synergistMuscles: ["Glúteo menor", "Tensor de la fascia lata", "Piriforme (en flexión)"],
      stabilizers: "Glúteo medio contralateral y Cuadrado lumbar (mantienen la horizontalidad pélvica impidiendo el signo de Trendelenburg)",
      antagonist: "Aductores (Mayor, Largo, Corto), Pectíneo y Grácil",
      muscles: [
        {
          id: "gluteo-medio",
          name: "Glúteo Medio (Gluteus Medius)",
          scientificName: "Musculus gluteus medius",
          role: "Motor Primario Supremo y Estabilizador Pélvico",
          roleType: "primary",
          compartment: "Región Glútea (Capa Intermedia)",
          origin: "Cara glútea externa del hueso ilion, entre las líneas glúteas anterior y posterior, y labio externo de la cresta ilíaca.",
          insertion: "Cara lateral y cresta oblicua del trocánter mayor del fémur.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Abductor potente del fémur. Sus fibras anteriores rotan internamente y flexionan; sus fibras posteriores extienden y rotan externamente. En apoyo monopodal mantiene nivelada la pelvis.",
          clinicalNote: "Su insuficiencia o parálisis ocasiona el signo de Trendelenburg (caída pélvica al lado opuesto durante la marcha)."
        },
        {
          id: "gluteo-menor",
          name: "Glúteo Menor",
          scientificName: "Musculus gluteus minimus",
          role: "Motor Secundario Agonista Profundo",
          roleType: "secondary",
          compartment: "Región Glútea (Capa Profunda)",
          origin: "Cara glútea externa del ilion, entre las líneas glúteas anterior e inferior.",
          insertion: "Borde anterior y cara anterosuperior del trocánter mayor del fémur.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Abducción y rotación medial del fémur; asiste en centrar la cabeza femoral dentro del cotilo.",
          clinicalNote: "Refuerza directamente la cápsula articular por arriba."
        },
        {
          id: "tfl-abd",
          name: "Tensor de la Fascia Lata (TFL)",
          scientificName: "Musculus tensor fasciae latae",
          role: "Motor Secundario / Sinergista",
          roleType: "secondary",
          compartment: "Región Glútea Anterolateral",
          origin: "Espina ilíaca anterosuperior (EIAS) y labio externo de la cresta ilíaca.",
          insertion: "Tubérculo de Gerdy en la tibia por medio del tracto iliotibial.",
          innervation: "Nervio Glúteo Superior (L4, L5, S1).",
          action: "Abduce, flexiona y rota medialmente el muslo.",
          clinicalNote: "Trabaja en estrecho acoplamiento motor con el glúteo menor."
        },
        {
          id: "piriforme-abd",
          name: "Piriforme (Piramidal de la Pelvis)",
          scientificName: "Musculus piriformis",
          role: "Sinergista en Flexión de Cadera",
          roleType: "synergist",
          compartment: "Región Glútea Profunda (Pelvitrocantéreo)",
          origin: "Cara anterior de las vértebras sacras S2 a S4 y borde de la escotadura ciática mayor.",
          insertion: "Vértice del trocánter mayor del fémur.",
          innervation: "Ramos directos del Plexo Sacro (S1, S2).",
          action: "Abductor de la cadera cuando esta se encuentra flexionada a 90° (rotador externo en extensión).",
          clinicalNote: "El nervio ciático sale por debajo de él; su espasmo provoca el Síndrome Piriforme o falsa ciática."
        },
        {
          id: "gluteo-medio-contralateral-fijador",
          name: "Glúteo Medio Contralateral y Cuadrado Lumbar (Pilar Pélvico Antivalgo)",
          scientificName: "Musculi gluteus medius contralateralis et quadratus lumborum",
          role: "Fijador / Estabilizador de Cadena",
          roleType: "stabilizer",
          compartment: "Pelvis Contralateral y Pared Abdominal Posterior",
          origin: "Línea glútea anterior del ilion opuesto y cresta ilíaca dorsal.",
          insertion: "Trocánter mayor contralateral y costilla 12ª.",
          innervation: "Nervio Glúteo Superior (L4-S1) y ramos espinales de T12-L4.",
          action: "Mantiene la pelvis horizontal en el plano frontal asegurando que la abducción contralateral ocurra sin inclinación compensatoria del tronco (Trendelenburg).",
          clinicalNote: "Garantiza la estabilidad horizontal pélvica de la marcha en fisioterapia y biomecánica clínica."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 9. DORSIFLEXIÓN DE TOBILLO
    // -------------------------------------------------------------------------
    {
      id: "dorsiflexion-tobillo",
      category: "analitico",
      name: "Dorsiflexión de Tobillo (Flexión Dorsal)",
      region: "tobillo",
      regionLabel: "Tobillo • Pierna y Pie",
      code: "MI-05",
      joint: "Articulación Talocrural (Tibiotarsiana)",
      jointType: "Gínglimo / Trocleartrosis con mortaja tibioperonea",
      plane: "Sagital",
      axis: "Eje Bimaleolar Oblicuo Laterolateral (Transversal)",
      rom: "0° — 20°/30°",
      description: "Elevación del dorso del pie hacia la cara anterior de la tibia reduciendo el ángulo articular tibioperoneoastragalino.",
      lever: "2do / 3er Género según apoyo o fase de oscilación",
      animationType: "ankle-dorsiflexion",
      highlightedMuscle: "Tibial Anterior y Extensor Largo de los Dedos",
      searchTerms: ["dorsiflexion de tobillo", "subir punta pie", "tibial anterior", "extensor dedos", "pie caido", "tobillo", "peroneo tercer"],
      primaryMuscle: "Tibial anterior",
      synergistMuscles: ["Extensor largo de los dedos", "Extensor largo del dedo gordo", "Tercer peroneo (peroneo anterior)"],
      antagonist: "Tríceps sural (Gastrocnemios y Sóleo)",
      muscles: [
        {
          id: "tibial-anterior",
          name: "Tibial Anterior",
          scientificName: "Musculus tibialis anterior",
          role: "Motor Primario Absoluto e Inversor",
          roleType: "primary",
          compartment: "Compartimento Anterior de la Pierna",
          origin: "Cóndilo lateral y mitad proximal de la superficie lateral de la diáfisis tibial, membrana interósea adyacente y fascia crural.",
          insertion: "Caras medial e inferior del hueso cuneiforme medial (1ª cuña) y base medial del primer metatarsiano.",
          innervation: "Nervio Peroneo Profundo / Fibular Profundo (L4, L5).",
          action: "Dorsiflexor principal del pie en la articulación talocrural e inversor del pie en la articulación subtalar; sostiene el arco plantar medial.",
          clinicalNote: "Su parálisis provoca el 'pie caído', obligando a elevar exageradamente la rodilla (marcha en estepaje o equina)."
        },
        {
          id: "extensor-largo-dedos",
          name: "Extensor Largo de los Dedos",
          scientificName: "Musculus extensor digitorum longus",
          role: "Motor Secundario Agonista",
          roleType: "secondary",
          compartment: "Compartimento Anterior de la Pierna",
          origin: "Cóndilo lateral de la tibia, tres cuartos proximales de la cara medial del peroné y membrana interósea.",
          insertion: "Se divide en 4 tendones hacia las falanges media y distal de los dedos 2º al 5º.",
          innervation: "Nervio Peroneo Profundo (L5, S1).",
          action: "Extiende los dedos laterales y asiste potentemente en la dorsiflexión y eversión del pie.",
          clinicalNote: "Garantiza que la punta del pie no tropiece con el suelo en el balanceo de la marcha."
        },
        {
          id: "extensor-largo-hallux",
          name: "Extensor Largo del Dedo Gordo (Hallux)",
          scientificName: "Musculus extensor hallucis longus",
          role: "Motor Secundario Agonista",
          roleType: "secondary",
          compartment: "Compartimento Anterior de la Pierna",
          origin: "Porción media de la cara anterior del peroné y membrana interósea adyacente.",
          insertion: "Cara dorsal de la base de la falange distal del dedo gordo (primer dedo).",
          innervation: "Nervio Peroneo Profundo (L5, S1).",
          action: "Extiende el dedo gordo del pie y asiste en la dorsiflexión del tobillo.",
          clinicalNote: "Evalúa la raíz motora L5 específica en la exploración neurológica."
        },
        {
          id: "tercer-peroneo",
          name: "Tercer Peroneo (Peroneo Anterior)",
          scientificName: "Musculus fibularis tertius / peroneus tertius",
          role: "Sinergista Accesorio y Eversor",
          roleType: "synergist",
          compartment: "Compartimento Anterior de la Pierna (Tercio Inferior)",
          origin: "Tercio distal de la cara anterior del peroné y membrana interósea adyacente.",
          insertion: "Cara dorsal de la base del quinto metatarsiano.",
          innervation: "Nervio Peroneo Profundo (L5, S1).",
          action: "Asiste en la dorsiflexión y produce eversión (pronación) del pie.",
          clinicalNote: "Inconstante en un 5-10% de la población, pero de gran relevancia en la estabilidad del tobillo."
        },
        {
          id: "peroneos-fijadores-tobillo",
          name: "Peroneos Lateral Largo y Corto (Estabilizadores de Mortaja y Arco)",
          scientificName: "Musculi fibulares longus et brevis",
          role: "Fijador / Estabilizador de Cadena",
          roleType: "stabilizer",
          compartment: "Compartimento Lateral de la Pierna",
          origin: "Cabeza y cara lateral del peroné.",
          insertion: "Base del 5º metatarsiano y 1ª cuña con base del 1er metatarsiano.",
          innervation: "Nervio Peroneo Superficial (L5, S1).",
          action: "Coactivan y fijan la mortaja tibioperonea impidiendo la inversión brusca del retropié durante la dorsiflexión activa.",
          clinicalNote: "Protegen el ligamento talofibular anterior contra esguinces de tobillo al caminar o correr."
        }
      ]
    },

    // -------------------------------------------------------------------------
    // 10. FLEXIÓN PLANTAR DE TOBILLO
    // -------------------------------------------------------------------------
    {
      id: "flexion-plantar-tobillo",
      category: "analitico",
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
      lever: "2do Género (Interresistencia - Palanca de fuerza máxima donde el peso corporal recae entre los metatarsos y el tendón de Aquiles)",
      animationType: "ankle-plantarflexion",
      highlightedMuscle: "Tríceps Sural (Gastrocnemios y Sóleo)",
      searchTerms: ["flexion plantar", "puntas de pie", "gemelos", "soleo", "triceps sural", "tendon aquiles", "tobillo", "tibial posterior"],
      primaryMuscle: "Tríceps Sural (Gastrocnemios y Sóleo)",
      synergistMuscles: ["Plantar delgado", "Tibial posterior", "Flexor largo de los dedos", "Flexor largo del dedo gordo", "Peroneo largo y corto"],
      stabilizers: "Tibial anterior e intrínsecos del pie (tensan la bóveda plantar y coactivan la estabilidad del retropié)",
      antagonist: "Tibial anterior y Extensor largo de los dedos",
      muscles: [
        {
          id: "gastrocnemios",
          name: "Gastrocnemios (Gemelos Medial y Lateral)",
          scientificName: "Musculus gastrocnemius",
          role: "Motor Primario Dinámico y Despegue",
          roleType: "primary",
          compartment: "Compartimento Posterior Superficial de la Pierna",
          origin: "• Cabeza Medial: Porción posterosuperior del cóndilo medial del fémur y cápsula articular.\n• Cabeza Lateral: Cara posterolateral del cóndilo lateral del fémur.",
          insertion: "Cara posterior del calcáneo a través del tendón de Aquiles (tendón calcáneo común).",
          innervation: "Nervio Tibial (S1, S2).",
          action: "Potente flexor plantar del pie en extensión de rodilla; motor del salto, carrera y marcha rápida.",
          clinicalNote: "Rico en fibras rápidas tipo II; vulnerable a desgarros agudos ('síndrome de la pedrada')."
        },
        {
          id: "soleo",
          name: "Sóleo",
          scientificName: "Musculus soleus",
          role: "Motor Primario Postural y Bomba Venosa",
          roleType: "primary",
          compartment: "Compartimento Posterior Superficial (Profundo a gemelos)",
          origin: "Cara posterior de la cabeza y tercio superior del peroné, línea del sóleo y tercio medio del borde medial de la tibia (arco tendinoso del sóleo).",
          insertion: "Cara posterior del calcáneo mediante el tendón común de Aquiles.",
          innervation: "Nervio Tibial (S1, S2).",
          action: "Flexión plantar continua y postural; clave para mantener la bipedestación erguida y retorno venoso periférico.",
          clinicalNote: "Predominio de fibras lentas tipo I; funciona como el 'segundo corazón' muscular."
        },
        {
          id: "plantar-delgado",
          name: "Plantar Delgado",
          scientificName: "Musculus plantaris",
          role: "Sinergista Accesorio y Propioceptivo",
          roleType: "synergist",
          compartment: "Compartimento Posterior Superficial",
          origin: "Extremo inferior de la línea supracondílea lateral del fémur y ligamento poplíteo oblicuo.",
          insertion: "Borde medial del tendón calcáneo o directamente en la cara posterior del calcáneo.",
          innervation: "Nervio Tibial (S1, S2).",
          action: "Colabora débilmente con los gastrocnemios; contiene una altísima densidad de husos neuromusculares propioceptivos.",
          clinicalNote: "Su tendón extremadamente largo se emplea a menudo en injertos de tendones flexores de la mano."
        },
        {
          id: "tibial-posterior",
          name: "Tibial Posterior",
          scientificName: "Musculus tibialis posterior",
          role: "Motor Secundario Inversor y Arco Plantar",
          roleType: "secondary",
          compartment: "Compartimento Posterior Profundo de la Pierna",
          origin: "Membrana interósea en toda su extensión, cara posterior de la diáfisis tibial y dos tercios proximales de la cara medial del peroné.",
          insertion: "Tuberosidad del hueso navicular (escafoides), los tres huesos cuneiformes, cuboides y bases de los metatarsianos 2º, 3º y 4º.",
          innervation: "Nervio Tibial (L4, L5).",
          action: "Flexión plantar del tobillo y potente inversión/supinación del pie; es el sostén dinámico principal del arco plantar longitudinal medial.",
          clinicalNote: "La disfunción de su tendón es la causa número uno de pie plano adquirido del adulto."
        },
        {
          id: "flexor-largo-hallux",
          name: "Flexor Largo del Dedo Gordo",
          scientificName: "Musculus flexor hallucis longus",
          role: "Sinergista Agonista",
          roleType: "synergist",
          compartment: "Compartimento Posterior Profundo",
          origin: "Dos tercios inferiores de la cara posterior del peroné y membrana interósea.",
          insertion: "Base de la falange distal del dedo gordo en su cara plantar.",
          innervation: "Nervio Tibial (S1, S2).",
          action: "Flexiona el dedo gordo y asiste en la flexión plantar del tobillo en el momento del despegue digital de la marcha.",
          clinicalNote: "Pasa por el túnel tarsiano bajo el sustentaculum tali del calcáneo."
        },
        {
          id: "flexor-largo-dedos",
          name: "Flexor Largo de los Dedos",
          scientificName: "Musculus flexor digitorum longus",
          role: "Sinergista Agonista",
          roleType: "synergist",
          compartment: "Compartimento Posterior Profundo",
          origin: "Tercio medio de la cara posterior de la tibia por debajo de la línea del sóleo.",
          insertion: "Bases de las falanges distales de los cuatro dedos laterales (2º al 5º).",
          innervation: "Nervio Tibial (S1, S2).",
          action: "Flexiona los cuatro dedos laterales y ayuda en la flexión plantar del tobillo.",
          clinicalNote: "Cruza al tendón del tibial posterior en la garganta retromaleolar medial."
        },
        {
          id: "peroneo-largo",
          name: "Peroneo Largo (Fibular Largo)",
          scientificName: "Musculus fibularis longus",
          role: "Sinergista Eversor",
          roleType: "synergist",
          compartment: "Compartimento Lateral de la Pierna",
          origin: "Cabeza y dos tercios superiores de la cara lateral del peroné.",
          insertion: "Cara plantar del cuneiforme medial y base del 1er metatarsiano.",
          innervation: "Nervio Peroneo Superficial (L5, S1).",
          action: "Eversión del pie y asiste en la flexión plantar.",
          clinicalNote: "Cruza oblicuamente toda la planta del pie asegurando el arco transversal."
        },
        {
          id: "tibial-anterior-fijador-plantar",
          name: "Tibial Anterior e Intrínsecos del Pie (Fijadores de la Bóveda Plantar)",
          scientificName: "Musculus tibialis anterior et musculi plantares",
          role: "Fijador / Estabilizador de Cadena",
          roleType: "stabilizer",
          compartment: "Pierna Anterior y Planta del Pie",
          origin: "Cóndilo lateral de la tibia y aponeurosis plantar.",
          insertion: "1ª cuña y falanges de los dedos.",
          innervation: "Nervio Peroneo Profundo y Nervio Tibial (L4-S2).",
          action: "Fijan el retropié y tensan la bóveda longitudinal del pie para convertirlo en una palanca rígida sobre la que el tríceps sural propulsa.",
          clinicalNote: "Sin estos fijadores, el antepié se colapsaría absorbiendo la energía del despegue en lugar de propulsar el cuerpo."
        }
      ]
    }
  ]
};
