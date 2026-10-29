// =============================================================================
// KineFlash PRO - Base de Datos Anatómica y Biomecánica Completa
// Revisada según Latarjet-Ruiz Liard, Rouvière y Moore
// Motores Primarios, Motores Secundarios y Sinergistas Exhaustivos
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
    // =========================================================================
    // 1. FLEXIÓN DE CODO
    // =========================================================================
    {
      id: "flexion-codo",
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
        }
      ]
    },

    // =========================================================================
    // 2. EXTENSIÓN DE CODO
    // =========================================================================
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
      rom: "145° — 0° (hasta 5°-10° de hiperextensión fisiológica)",
      description: "Alejamiento del antebrazo respecto al brazo hasta que el olécranon impacta en la fosa olecraniana del húmero.",
      lever: "1er Género (Interapoyo - El fulcro articular se ubica entre la fuerza del tríceps y la resistencia del antebrazo)",
      animationType: "elbow-extension",
      highlightedMuscle: "Tríceps Braquial (Cabezas Larga, Lateral y Medial)",
      searchTerms: ["extension de codo", "estirar brazo", "triceps", "anconeo", "codo posterior"],
      primaryMuscle: "Tríceps braquial",
      synergistMuscles: ["Ancóneo"],
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
          role: "Motor Secundario y Estabilizador Articular",
          roleType: "secondary",
          compartment: "Región Posterior del Codo (Triángulo Olecraniano)",
          origin: "Superficie posterior e inferior del epicóndilo lateral del húmero.",
          insertion: "Cara lateral del olécranon y cuarto superior posterolateral de la diáfisis cubital.",
          innervation: "Nervio Radial (C7, C8, T1), por una rama de la cabeza medial del tríceps.",
          action: "Coadyuva en la fase terminal de la extensión del codo; estabiliza la articulación húmero-cubital y retrae la cápsula posterior evitando su pellizcamiento.",
          clinicalNote: "Abduce sutilmente el cúbito durante la pronación activa del antebrazo."
        }
      ]
    },

    // =========================================================================
    // 3. ABDUCCIÓN DE HOMBRO
    // =========================================================================
    {
      id: "abduccion-hombro",
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
        }
      ]
    },

    // =========================================================================
    // 4. FLEXIÓN DE HOMBRO
    // =========================================================================
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
      description: "Desplazamiento anterior del húmero en el plano sagital, elevando el brazo hacia el frente y arriba.",
      lever: "3er Género (Interpotente)",
      animationType: "shoulder-flexion",
      highlightedMuscle: "Deltoides (Porción Clavicular) y Coracobraquial",
      searchTerms: ["flexion de hombro", "levantar brazo", "subir brazo", "anteversion", "deltoides anterior", "coracobraquial"],
      primaryMuscle: "Deltoides (Porción Clavicular / Anterior)",
      synergistMuscles: ["Coracobraquial", "Pectoral mayor (haz clavicular)", "Bíceps braquial (cabeza corta)"],
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
        }
      ]
    },

    // =========================================================================
    // 5. EXTENSIÓN DE RODILLA
    // =========================================================================
    {
      id: "extension-rodilla",
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
        }
      ]
    },

    // =========================================================================
    // 6. FLEXIÓN DE RODILLA
    // =========================================================================
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
      description: "Aproximación de la cara posterior de la pierna hacia el muslo con deslizamiento posterior condíleo.",
      lever: "3er Género (Interpotente)",
      animationType: "knee-flexion",
      highlightedMuscle: "Isquiotibiales (Bíceps Femoral, Semitendinoso y Semimembranoso)",
      searchTerms: ["flexion de rodilla", "doblar pierna", "talon al gluteo", "isquiotibiales", "biceps femoral", "semitendinoso", "semimembranoso", "popliteo"],
      primaryMuscle: "Isquiotibiales (Bíceps femoral, Semitendinoso, Semimembranoso)",
      synergistMuscles: ["Gastrocnemios (gemelos)", "Poplíteo", "Grácil (recto interno)", "Sartorio"],
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
        }
      ]
    },

    // =========================================================================
    // 7. FLEXIÓN DE CADERA
    // =========================================================================
    {
      id: "flexion-cadera",
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
        }
      ]
    },

    // =========================================================================
    // 8. ABDUCCIÓN DE CADERA
    // =========================================================================
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
      description: "Separación lateral del miembro inferior alejándolo del plano sagital medio corporal.",
      lever: "1er Género en apoyo monopodal (Estabilizador pélvico contra gravedad) / 3er Género en cadena cinética abierta",
      animationType: "hip-abduction",
      highlightedMuscle: "Glúteo Medio y Glúteo Menor",
      searchTerms: ["abduccion de cadera", "separar pierna", "gluteo medio", "gluteo menor", "trendelenburg", "cadera", "tfl"],
      primaryMuscle: "Glúteo medio",
      synergistMuscles: ["Glúteo menor", "Tensor de la fascia lata", "Piriforme (en flexión)"],
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
        }
      ]
    },

    // =========================================================================
    // 9. DORSIFLEXIÓN DE TOBILLO
    // =========================================================================
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
        }
      ]
    },

    // =========================================================================
    // 10. FLEXIÓN PLANTAR DE TOBILLO
    // =========================================================================
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
      lever: "2do Género (Interresistencia - Palanca de fuerza máxima donde el peso corporal recae entre los metatarsos y el tendón de Aquiles)",
      animationType: "ankle-plantarflexion",
      highlightedMuscle: "Tríceps Sural (Gastrocnemios y Sóleo)",
      searchTerms: ["flexion plantar", "puntas de pie", "gemelos", "soleo", "triceps sural", "tendon aquiles", "tobillo", "tibial posterior"],
      primaryMuscle: "Tríceps Sural (Gastrocnemios y Sóleo)",
      synergistMuscles: ["Plantar delgado", "Tibial posterior", "Flexor largo de los dedos", "Flexor largo del dedo gordo", "Peroneo largo y corto"],
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
        }
      ]
    }
  ]
};
