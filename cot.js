// Datos globales para almacenar la cotización
let quoteData = {};
let bankCounter = 0;

// Base de datos de asesores
const ADVISORS_DB = [
    { id: 1, name: "Huamanchumo Paula", active: true },
    { id: 2, name: "Alayo Yoiner", active: true }
];

// Base de datos de bancos
const DEFAULT_BANKS = [
    {
        name: "BCP",
        accountPen: "5707200550002",
        cciPen: "00257000720055000209"
    },
    {
        name: "INTERBANK",
        accountPen: "600-3007138013",
        cciPen: "003-600-003007138013-40",
        accountUsd: "600-3007138020",
        cciUsd: "003-600-003007138020-45"
    }
];

// Base de datos de productos
const PRODUCTS_DB = [
    { id: 1, code: "", name: "GUANTE NITRON V9'' T-M USAFETY", brand: "CLUTE", unit: "PAR", price: 7.92 },
    { id: 2, code: "", name: "RESPIRADOR MEDIA CARA 7502", brand: "3M", unit: "UNIDAD", price: 130.00 },
    { id: 3, code: "", name: "CORREA PORTALAMPARA DE ZUELA", brand: "", unit: "UNIDAD", price: 14.00 },
    { id: 4, code: "", name: "LENTE DE MALLA DE ACERO CON MARCO ERGONOMICO MOD.SP700", brand: "", unit: "UNIDAD", price: 18.00 },
    { id: 5, code: "", name: "PANTALON PROCESADO C/CINTA REFLECTIVA T-S", brand: "", unit: "UNIDAD", price: 50.00 },
    { id: 6, code: "", name: "PANTALON PROCESADO C/CINTA REFLECTIVA T-XL", brand: "", unit: "UNIDAD", price: 50.00 },
    { id: 7, code: "", name: "BLUSA MANGA LARGA T-S", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 8, code: "", name: "TAFILETE SUSPENSION", brand: "", unit: "UNIDAD", price: 18.00 },
    { id: 9, code: "", name: "CINTA AISLANTE 18.3M X 19MM X 0.13MM, NEGRO", brand: "3M", unit: "UNIDAD", price: 5.00 },
    { id: 10, code: "", name: "DISCO DE CORTE DE METAL 7'' X 1/16'' X 7/8'' DW44602", brand: "DEWALT", unit: "UNIDAD", price: 7.00 },
    { id: 11, code: "", name: "ARNES DE SEGURIDAD CUERPO COMPLETO 3 AROS + LINEA DE VIDA", brand: "CLUTE", unit: "UNIDAD", price: 230.00 },
    { id: 12, code: "", name: "CARGADOR DE ANFO", brand: "", unit: "UNIDAD", price: 95.00 },
    { id: 13, code: "", name: "CINTA TEFLON 1/2''X0.075MMX10MX0.35G/CM3", brand: "SWIFT", unit: "UNIDAD", price: 2.00 },
    { id: 14, code: "", name: "ABRAZADERA DOBLE PERNO 1'' (SL-40)", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 15, code: "", name: "ABRAZADERA DOBLE PERNO 1/2 PULG SL29", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 16, code: "", name: "ABRAZADERA DOBLE PERNO 3/4 PULG SL34", brand: "", unit: "UNIDAD", price: 14.00 },
    { id: 17, code: "", name: "ACEITE MOTOR GASOLINERO 10W-30", brand: "CAM2", unit: "UNIDAD", price: 25.00 },
    { id: 18, code: "", name: "UNION HDPE 1 PULG PN16", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 19, code: "", name: "UNION HDPE 2 PULG PN16", brand: "", unit: "UNIDAD", price: 25.00 },
    { id: 20, code: "", name: "UNION HDPE 3/4 PULG PN16", brand: "", unit: "UNIDAD", price: 7.50 },
    { id: 21, code: "", name: "KIT AGUJAS YT29 #63 #64 AGUA - AIRE", brand: "", unit: "UNIDAD", price: 22.00 },
    { id: 22, code: "", name: "BARBIQUEJO CON MENTONERA PARA CASCO", brand: "", unit: "UNIDAD", price: 2.00 },
    { id: 23, code: "", name: "BOTA RGB-A F/AZUL 36CM C/REF C/LOGO T-42", brand: "SEGUSA", unit: "PAR", price: 100.00 },
    { id: 24, code: "", name: "CARRETILLA MINERA PESADA PEQUEÑA C/ACCESORIOS S-LL", brand: "", unit: "UNIDAD", price: 180.00 },
    { id: 25, code: "", name: "ARO DE PLASTICO C/RODAJE", brand: "", unit: "UNIDAD", price: 35.00 },
    { id: 26, code: "", name: "PINTURA IGNIFUGA RETARTADORA AL FUEGO 1 GL", brand: "ANYPSA", unit: "UNIDAD", price: 220.00 },
    { id: 27, code: "", name: "MASILLA P/MADERA 1KG", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 28, code: "", name: "GUANTE MULTIFLEX CUT 5 LATEX T-M PAR", brand: "STEELPRO", unit: "UNIDAD", price: 20.00 },
    { id: 29, code: "", name: "MOSQUITERO TUL PARA CAMA 2 PLAZS", brand: "", unit: "UNIDAD", price: 32.00 },
    { id: 30, code: "", name: "BROCHA 4\"", brand: "", unit: "UNIDAD", price: 11.00 },
    { id: 31, code: "", name: "PEGAMENTO PARA PARCHAR LLANTAS (LIQUIDO)", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 32, code: "", name: "PARCHE PARA LLANTA M48", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 33, code: "", name: "PALANA TIPO CUCHARA HOJA VERDE COD.77460/434", brand: "TRAMONTINA", unit: "UNIDAD", price: 25.00 },
    { id: 34, code: "", name: "BROCA SDS MAX 32X920MM", brand: "DEWALT", unit: "UNIDAD", price: 520.00 },
    { id: 35, code: "", name: "TAPON DE OIDO TPR ELITE VERDE CON BOLSA", brand: "CLUTE", unit: "UNIDAD", price: 1.00 },
    { id: 36, code: "", name: "CORREA PORTALAMPARA NYLO", brand: "", unit: "UNIDAD", price: 12.00 },
    { id: 37, code: "", name: "CASCO MINERO SUSP.4PTAS C/PLC DIELECTRICO C/BLANCO", brand: "MSA", unit: "UNIDAD", price: 45.00 },
    { id: 38, code: "", name: "CASCO MINERO SUSP.4PTAS C/PLC DIELECTRICO C/ROJO", brand: "MSA", unit: "UNIDAD", price: 45.00 },
    { id: 39, code: "", name: "CASCO MINERO SUSP.4PTAS C/PLC DIELECTRICO C/VERDE", brand: "MSA", unit: "UNIDAD", price: 45.00 },
    { id: 40, code: "", name: "TABLERO 1 ENT/TRI 3 ENT/MON PARA GRUPO ELECTRICO", brand: "", unit: "UNIDAD", price: 450.00 },
    { id: 41, code: "", name: "LLANTA P/CARRETILLA MODELO ROMBO 400*8", brand: "ENDURO", unit: "UNIDAD", price: 55.00 },
    { id: 42, code: "", name: "CHOTANA 7/8\" X 1.5 MTRS (4 PIES)", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 43, code: "", name: "CHOTANA 7/8\" X 1.8 MTRS (6 PIES)", brand: "", unit: "UNIDAD", price: 55.00 },
    { id: 44, code: "", name: "YT29 KIT CODO AGUA (CONEX. AGUA #12 - TUERCA CONEX. AGUA #13 - RETEN DE CODO AGUA #16)", brand: "", unit: "KIT", price: 45.00 },
    { id: 45, code: "", name: "CUTTER LIVIANO ECON.", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 46, code: "", name: "FAJA B64", brand: "", unit: "UNIDAD", price: 30.00 },
    { id: 47, code: "", name: "LAMPARA MINERA KL5M C/CARGADOR DE LAMPARA MINERA NWB (KL5M/KL8/KL12)", brand: "WISDOM", unit: "UNIDAD", price: 290.00 },
    { id: 48, code: "", name: "VALVULA ESFERICA 1PULG BRONCE", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 49, code: "", name: "VALVULA ESFERICA 1/2PULG BRONCE", brand: "", unit: "UNIDAD", price: 25.00 },
    { id: 50, code: "", name: "VALVULA ESFERICA 3/4PULG BRONCE", brand: "", unit: "UNIDAD", price: 37.00 },
    { id: 51, code: "", name: "NIPLE ESCAMADO P/MANGUERA 3/4\" GALVANIZADO", brand: "", unit: "UNIDAD", price: 13.00 },
    { id: 52, code: "", name: "NIPLE COMBINADO 1'' GALVANIZADO", brand: "", unit: "UNIDAD", price: 13.50 },
    { id: 53, code: "", name: "NIPLE COMBINADO 1/2\" GALVANIZADO", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 54, code: "", name: "MAMELUCO DRILL C/REFLECTIVA C/AZUL T-S", brand: "", unit: "UNIDAD", price: 40.00 },
    { id: 55, code: "", name: "MAMELUCO DRILL C/REFLECTIVA C/AZUL T-M", brand: "", unit: "UNIDAD", price: 40.00 },
    { id: 56, code: "", name: "MAMELUCO DRILL C/REFLECTIVA C/AZUL T-L", brand: "", unit: "UNIDAD", price: 40.00 },
    { id: 57, code: "", name: "MAMELUCO DRILL C/REFLECTIVA C/AZUL T-XL", brand: "", unit: "UNIDAD", price: 40.00 },
    { id: 58, code: "", name: "MAMELUCO DRILL C/REFLECTIVA C/AZUL T-XXL", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 59, code: "", name: "ZAPAPICO 5 LIBRAS 41007 C/MANGO MADERA", brand: "ULTRACRAFT", unit: "UNIDAD", price: 33.00 },
    { id: 60, code: "", name: "COMBA OCTAGONAL 8 LB 10588 C/MANGO MADERA", brand: "TRUPER", unit: "UNIDAD", price: 45.00 },
    { id: 61, code: "", name: "COMBA OCTAGONAL 6 LB 10584 C/MANGO MADERA", brand: "TRUPER", unit: "UNIDAD", price: 40.00 },
    { id: 62, code: "", name: "DESTORNILLADORES DE GOLPE 6PZ DEG604 D4G2949U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 28.00 },
    { id: 63, code: "", name: "CABLE VULCANIZADO NMT (SJT-0) 2X12 AWG - ROLLO/100MTRS C160V374IN", brand: "INDECO", unit: "UNIDAD", price: 690.00 },
    { id: 64, code: "", name: "PORTAHERRAMIENTA | HR5212C| ROTOMARTILLO", brand: "MAKITA", unit: "UNIDAD", price: 350.00 },
    { id: 65, code: "", name: "TRABAS | HR5212C| ROTOMARTILLO", brand: "MAKITA", unit: "UNIDAD", price: 45.00 },
    { id: 66, code: "", name: "CARBON PAR CB-175 | HR5212C| ROTOMARTILLO", brand: "MAKITA", unit: "UNIDAD", price: 290.00 },
    { id: 67, code: "", name: "TARJETA CONTROLLER | HR5212C| ROTOMARTILLO", brand: "MAKITA", unit: "UNIDAD", price: 288.00 },
    { id: 68, code: "", name: "MANGUERA HDPE 3/4PULG PN12.5", brand: "", unit: "UNIDAD", price: 160.00 },
    { id: 69, code: "", name: "MANGUERA JEBE/LONA 300PSI 1\"", brand: "", unit: "UNIDAD", price: 950.00 },
    { id: 70, code: "", name: "MANGUERA JEBE/LONA 300PSI 1/2\"", brand: "", unit: "UNIDAD", price: 500.00 },
    { id: 71, code: "", name: "BOMBA DE AGUA PARA JD DE 33HP", brand: "", unit: "UNIDAD", price: 150.00 },
    { id: 72, code: "", name: "ATACADOR MADERA", brand: "", unit: "UNIDAD", price: 4.50 },
    { id: 73, code: "", name: "GUANTE ANTICORTE - ROJO LATEX NEGRO WORKFLEX T8/M GA-10902-R-8", brand: "ASTARA", unit: "PAR", price: 5.00 },
    { id: 74, code: "", name: "NIPLE COMBINADO 2\" GALVANIZADO", brand: "", unit: "UNIDAD", price: 17.50 },
    { id: 75, code: "", name: "MARTILLO M/MADERA 29MM MAM29TR M3M5972U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 30.00 },
    { id: 76, code: "", name: "CARRETILLA MINERA CHICA PESADA C/ARO BOCINA | EYB-007 | ORO", brand: "ORO", unit: "UNIDAD", price: 185.00 },
    { id: 77, code: "", name: "LLAVE ESMERIL 115-150MM YEM115 LL0E5599U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 7.00 },
    { id: 78, code: "", name: "MANGA LAMINADA C/OREJAS 24\"", brand: "", unit: "METRO", price: 3.50 },
    { id: 79, code: "", name: "PERFORADOR YT29", brand: "", unit: "UNIDAD", price: 1950.00 },
    { id: 80, code: "", name: "EXTRACTOR AXIAL IMPORTADO 2HP", brand: "", unit: "UNIDAD", price: 950.00 },
    { id: 81, code: "", name: "EXTRACTOR AXIAL C/MOTOR MONOFASICO COBRE 3HP", brand: "", unit: "UNIDAD", price: 1297.00 },
    { id: 82, code: "", name: "YT29 KIT RETENEDOR | RETEN. BARRENO (1) #71 | PERNO RETEN. PIPAS (2) #69 | RESORTE DE RETEN. (2) #68 | TUERCA SEGURO RETEN. #67", brand: "", unit: "KIT", price: 190.00 },
    { id: 83, code: "", name: "YT29 KIT VALVULA DE AGUA #14 #36 #37 #38 #41 #42 #43X2 #45", brand: "", unit: "KIT", price: 85.00 },
    { id: 84, code: "", name: "YT29 BOCINA HEXAGONAL #70", brand: "", unit: "UNIDAD", price: 63.00 },
    { id: 85, code: "", name: "YT29 BRONCE GRANDE #39", brand: "", unit: "UNIDAD", price: 110.00 },
    { id: 86, code: "", name: "YT29 BUJE PORTA-BOCINA #66", brand: "", unit: "UNIDAD", price: 150.00 },
    { id: 87, code: "", name: "YT29 KIT CODO DE AIRE | CODO AIRE #7 | RETEN DE CODO AIRE #11 |  TUERCA CODO AIRE #8", brand: "", unit: "KIT", price: 80.00 },
    { id: 88, code: "", name: "hola", brand: "SEGUSA", unit: "UNIDAD", price: 1.00 },
    { id: 89, code: "", name: "YT29 KIT COMPLETO O'RING Y EMPAQUES - PIE DE AVANCE", brand: "", unit: "UNIDAD", price: 35.00 },
    { id: 90, code: "", name: "YT29 TUERCA DE LA VALVULA DE CONTROL #1", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 91, code: "", name: "YT29 PIN DE LA VALVULA DE CONTROL #2", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 92, code: "", name: "LLAVE TERMICA TRIF 3X25 AMP", brand: "BTICINO", unit: "UNIDAD", price: 55.00 },
    { id: 93, code: "", name: "ASPIRADORA POLVO | LIQUIDO METAL 20L ASP20LM A42P0699U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 258.00 },
    { id: 94, code: "", name: "WINCHA PROMOCIONAL 3 MTRS X 16MM TC1488", brand: "TOOLCRAFT", unit: "UNIDAD", price: 10.00 },
    { id: 95, code: "", name: "GATA TIPO LAGARTO 3TON GAM003 G77TL9732U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 350.00 },
    { id: 96, code: "", name: "FILTRO CONTRA PARTICULAS 7093", brand: "", unit: "PAR", price: 25.00 },
    { id: 97, code: "", name: "BOMBA TIPO LAPICERO 2HP 2PULG", brand: "LEO", unit: "UNIDAD", price: 900.00 },
    { id: 98, code: "", name: "LAMPARA MINERA KL5M WDM C/CARGADOR", brand: "", unit: "UNIDAD", price: 192.00 },
    { id: 99, code: "", name: "MOTOR MONOFASICO COBRE 1HP ALTA 100% COBRE", brand: "DEREK MOTORS", unit: "UNIDAD", price: 450.00 },
    { id: 100, code: "", name: "MOTOR MONOFASICO COBRE 2HP ALTA 100% COBRE", brand: "DEREK MOTORS", unit: "UNIDAD", price: 567.00 },
    { id: 101, code: "", name: "MOTOR MONOFASICO COBRE 3HP ALTA 100% COBRE", brand: "DEREK MOTORS", unit: "UNIDAD", price: 650.00 },
    { id: 102, code: "", name: "VENTILADOR 5 ESPADAS 220V 1250RPM", brand: "KAZO", unit: "UNIDAD", price: 120.00 },
    { id: 103, code: "", name: "MOTOBOMBA 2X2 C/MOTOR 5.5HP KZ-WP50", brand: "KAZO", unit: "UNIDAD", price: 570.00 },
    { id: 104, code: "", name: "ESTRUCTURA VENTILADOR AXIAL 1HP/24PULG", brand: "", unit: "UNIDAD", price: 400.00 },
    { id: 105, code: "", name: "ESTRUCTURA VENTILADOR AXIAL 2HP/26PULG", brand: "", unit: "UNIDAD", price: 500.00 },
    { id: 106, code: "", name: "ESTRUCTURA VENTILADOR AXIAL 3HP/27.5PULG", brand: "", unit: "UNIDAD", price: 500.00 },
    { id: 107, code: "", name: "CABLE VULCANIZADO NLT 2X10 AWG - ROLLO/100MTS C201V747673", brand: "BRANDE", unit: "UNIDAD", price: 850.00 },
    { id: 108, code: "", name: "CABLE VULCANIZADO NLT 3X14 AWG - ROLLO/100MTS C107V1203B", brand: "BRANDE", unit: "UNIDAD", price: 480.00 },
    { id: 109, code: "", name: "CABLE VULCANIZADO NLT 3X12 AWG - ROLLO/100MTS C203V3780B", brand: "BRANDE", unit: "UNIDAD", price: 760.00 },
    { id: 110, code: "", name: "CABLE VULCANIZADO NLT 3X10 AWG - ROLLO/100MTS C333V7080B", brand: "BRANDE", unit: "UNIDAD", price: 1250.00 },
    { id: 111, code: "", name: "CARRETILLA OLYMPO 5.5 PIES - COLOR/ROJO", brand: "VELKAS", unit: "UNIDAD", price: 185.00 },
    { id: 112, code: "", name: "CLAVOS D/CABEZA 2''", brand: "PRODAC", unit: "KILOGRAMOS", price: 6.00 },
    { id: 113, code: "", name: "CLAVOS C/CABEZA 3''", brand: "PRODAC", unit: "KILOGRAMOS", price: 6.00 },
    { id: 114, code: "", name: "CLAVOS C/CABEZA 4''", brand: "PRODAC", unit: "KILOGRAMOS", price: 6.50 },
    { id: 115, code: "", name: "ALAMBRE RECOCIDO NEGRO N°16", brand: "PRODAC", unit: "KILOGRAMOS", price: 6.50 },
    { id: 116, code: "", name: "ALAMBRE RECOCIDO NEGRO N°8", brand: "PRODAC", unit: "KILOGRAMOS", price: 6.50 },
    { id: 117, code: "", name: "MANGUERA DE HDPE 1'' CLASE 12.5 X 100 MTS", brand: "", unit: "UNIDAD", price: 250.00 },
    { id: 118, code: "", name: "BROCA P/MARTILLO ELC. PLUS 1/4''x6'' BCT1406 B0P5139U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 8.00 },
    { id: 119, code: "", name: "LIJA P/METAL 9''x11'' GR60 K200 L0F56N", brand: "NORTON", unit: "UNIDAD", price: 4.50 },
    { id: 120, code: "", name: "DISCO DIAMANTADO CONTINUO LISO 4-1/2'' DDU115H", brand: "UYUSTOOLS", unit: "UNIDAD", price: 10.00 },
    { id: 121, code: "", name: "BARRA CONICA 4 PIES T/AZUL", brand: "", unit: "UNIDAD", price: 200.00 },
    { id: 122, code: "", name: "BROCA CONICA 7 BOTONES #36", brand: "BOART", unit: "UNIDAD", price: 40.00 },
    { id: 123, code: "", name: "ACEITE ROCKDRILL ISO 100 BALDE x 5GLN", brand: "CAM2", unit: "BALDE", price: 350.00 },
    { id: 124, code: "", name: "LAMPARA MINERA KJ3.5LM PERILLA C/CARGADOR", brand: "DOOLPRO", unit: "UNIDAD", price: 95.00 },
    { id: 125, code: "", name: "TECLE CADENA 1T X 3M TEC201  T54C1425U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 350.00 },
    { id: 126, code: "", name: "PINTURA EN SPRAY ROJO BRILLANTE", brand: "ULTRACRAFT", unit: "UNIDAD", price: 8.00 },
    { id: 127, code: "", name: "INYECTOR 192F - GENERADOR MEBA 8500", brand: "", unit: "UNIDAD", price: 150.00 },
    { id: 128, code: "", name: "BOMBA DE INYECCION 192F - GENERADOR MEBA 8500", brand: "", unit: "UNIDAD", price: 160.00 },
    { id: 129, code: "", name: "FILTRO DE PETROLEO - GENERADOR MEBA 8500", brand: "", unit: "UNIDAD", price: 40.00 },
    { id: 130, code: "", name: "FILTRO DE AIRE - GENERADOR MEBA 8500", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 131, code: "", name: "LLAVE STILSON 24''", brand: "PARACASA", unit: "UNIDAD", price: 65.00 },
    { id: 132, code: "", name: "MARTILLO DEMOLEDOR SDS-MAX 10KG 1500W 16J DZG10 M169D7093DC", brand: "DONGCHENG", unit: "UNIDAD", price: 950.00 },
    { id: 133, code: "", name: "GUANTE BADANA AMARILLO", brand: "CLUTE", unit: "PAR", price: 8.00 },
    { id: 134, code: "", name: "BROCA HSS BLANCA 3/8''", brand: "", unit: "UNIDAD", price: 13.00 },
    { id: 135, code: "", name: "DISCO DE CORTE DE METAL 4 1/2''X3/64''X 7/8'' DW44618", brand: "DEWALT", unit: "UNIDAD", price: 4.50 },
    { id: 136, code: "", name: "TEMPLADOR F 1D X 18'', OJO GANCHO, ACERO FORJADO", brand: "", unit: "UNIDAD", price: 250.00 },
    { id: 137, code: "", name: "CUCHILLAS MAPED 9MM", brand: "", unit: "UNIDAD", price: 4.00 },
    { id: 138, code: "", name: "RAFIA EN CONO X 500GR", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 139, code: "", name: "TIJERA LATA DELUXE 10'' TJL210 T3L881U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 30.00 },
    { id: 140, code: "", name: "CINTA AISLANTE C/BLANCO 19MM X 18M", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 141, code: "", name: "LIJA AL AGUA 800 ASA - ASA", brand: "", unit: "UNIDAD", price: 4.50 },
    { id: 142, code: "", name: "LLAVE FRANCESA M/PLST 15'' YFP015 LL10F1551U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 60.00 },
    { id: 143, code: "", name: "LIJA AL AGUA Y AL SECO 9''x11'' GR120 A275 L0A31N", brand: "NORTON", unit: "UNIDAD", price: 3.00 },
    { id: 144, code: "", name: "ALICATE PARA ANILLOS DE RETENCIÓN 6'', 4 CABEZAS INTERCAMBIABLES 17355", brand: "TRUPER", unit: "UNIDAD", price: 28.00 },
    { id: 145, code: "", name: "CALIBRADOR DE BUJIAS Y VALVULAS, 32 HOJAS 14397", brand: "TRUPER", unit: "UNIDAD", price: 20.00 },
    { id: 146, code: "", name: "ESPATULA 2'' M/MADERA EPU02M E0M4832U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 4.00 },
    { id: 147, code: "", name: "SERRUCHO PROFESIONAL 18'' SRP018 S3P6279U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 25.00 },
    { id: 148, code: "", name: "MARTILLO PERFORADOR SDS MAX, AVT, 1510W, 20J, HR5212C", brand: "MAKITA", unit: "UNIDAD", price: 2750.00 },
    { id: 149, code: "", name: "PRECINTO DE 4.8MM X 300MM BOLSA/100PZ", brand: "", unit: "UNIDAD", price: 12.00 },
    { id: 150, code: "", name: "GUANTE CORRUGADO ANTIDESLIZANTE T/M", brand: "VIRUTEX", unit: "PAR", price: 15.00 },
    { id: 151, code: "", name: "BROCA DE COBALTO P/METAL BS1/8, DE 1/8''X41MMX70MM", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 152, code: "", name: "PINTURA ESMALTE ALTO BRILLO C/AMARILLO CATERPILLAR X GLN", brand: "", unit: "UNIDAD", price: 62.00 },
    { id: 153, code: "", name: "SERRUCHO M/GOMA 22\"", brand: "ASAKI", unit: "UNIDAD", price: 16.00 },
    { id: 154, code: "", name: "ESCOBILLA DE MANO M/MADERA 6 HILERA", brand: "TOOLMAX", unit: "UNIDAD", price: 0.00 },
    { id: 155, code: "", name: "BROCHA 2''", brand: "KAMASA", unit: "UNIDAD", price: 2.00 },
    { id: 156, code: "", name: "DISCO DE CORTE METAL 4'' NEGRO/NARANJA", brand: "", unit: "UNIDAD", price: 3.50 },
    { id: 157, code: "", name: "DISCO DE CORTE CONCRETO 4''", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 158, code: "", name: "PINTURA AEROSOL NEGRO MATE 300ML WF0681", brand: "WOLFOX", unit: "UNIDAD", price: 8.00 },
    { id: 159, code: "", name: "YT29 - RESORTE #1", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 160, code: "", name: "YT29 - PIN #2", brand: "", unit: "UNIDAD", price: 3.90 },
    { id: 161, code: "", name: "YT29 - O-RING #9", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 162, code: "", name: "YT29 - ANILLO RETENEDOR #16", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 163, code: "", name: "YT29 - ANILLO DE RETENEDOR #23", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 164, code: "", name: "YT29 - RESORTE CONICO #27", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 165, code: "", name: "YT29 - ALETA #28", brand: "", unit: "UNIDAD", price: 5.80 },
    { id: 166, code: "", name: "YT29 - MANGUITO DE SELLADO #30", brand: "", unit: "UNIDAD", price: 16.70 },
    { id: 167, code: "", name: "YT29 - MANGO DE GOMA #33", brand: "", unit: "UNIDAD", price: 13.80 },
    { id: 168, code: "", name: "YT29 - ALMOADILLA DE GOMA #45", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 169, code: "", name: "YT29 -CASQUILLO DE TUBO DE AGUA #47", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 170, code: "", name: "YT29 -ALMOHADILLA DE TUBO DE AIRE #48", brand: "", unit: "UNIDAD", price: 3.90 },
    { id: 171, code: "", name: "YT29 -CILINDRO #58", brand: "", unit: "UNIDAD", price: 298.80 },
    { id: 172, code: "", name: "YT29 - MANGUITO GUIA #59", brand: "", unit: "UNIDAD", price: 126.20 },
    { id: 173, code: "", name: "YT29 -TUERCA DE RETENEDOR #67", brand: "", unit: "UNIDAD", price: 4.80 },
    { id: 174, code: "", name: "YT29 - RESORTE DEL RETENEDOR #68", brand: "", unit: "UNIDAD", price: 9.70 },
    { id: 175, code: "", name: "YT29 - PERNO #69", brand: "", unit: "UNIDAD", price: 21.60 },
    { id: 176, code: "", name: "YT29 - BRONCE CAMPANA #72", brand: "", unit: "UNIDAD", price: 97.50 },
    { id: 177, code: "", name: "YT29 - TAPA LUBRICADORA", brand: "", unit: "UNIDAD", price: 12.40 },
    { id: 178, code: "", name: "YT29 - KIT DE MAQUINA", brand: "", unit: "UNIDAD", price: 59.50 },
    { id: 179, code: "", name: "FT160 - O-RING #5", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 180, code: "", name: "FT160 - O-RING #6", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 181, code: "", name: "FT160 - O-RING #7", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 182, code: "", name: "FT160 - PERNO DE CABEZA HEXAGONAL #11", brand: "", unit: "UNIDAD", price: 10.70 },
    { id: 183, code: "", name: "FT160 - NUEZ PEQUEÑA #12", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 184, code: "", name: "FT160 - ALMOADILLA DE RESORTE #13", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 185, code: "", name: "SUPER HD TITANIUM FORCE SAE 15W-40 CI-4 (BAL 5GL)", brand: "CAM2", unit: "BALDE", price: 320.00 },
    { id: 186, code: "", name: "SUPER HD TITANIUM FORCE SAE 15W-40 CI-4 1/4GL", brand: "CAM2", unit: "UNIDAD", price: 25.00 },
    { id: 187, code: "", name: "RESPIRADOR 7502 SILICONA", brand: "", unit: "UNIDAD", price: 43.00 },
    { id: 188, code: "", name: "TOMACORRIENTE INDUSTRIAL 2X16 AZUL", brand: "", unit: "UNIDAD", price: 18.00 },
    { id: 189, code: "", name: "ENCHUFE INDUSTRIAL 2X16 AZUL", brand: "", unit: "UNIDAD", price: 16.00 },
    { id: 190, code: "", name: "(NO USAR)", brand: "WISEUP", unit: "UNIDAD", price: 420.00 },
    { id: 191, code: "", name: "ESMERIL DE BANCO (200W) 6''/150MM", brand: "WISEUP", unit: "UNIDAD", price: 220.00 },
    { id: 192, code: "", name: "BOMBA DE AGUA SUCIA (750W/1HP/2''/50HZ)", brand: "WISEUP", unit: "UNIDAD", price: 620.00 },
    { id: 193, code: "", name: "BOMBA DE AGUA SUCIA (1500W/2HP/2''/50HZ)", brand: "WISEUP", unit: "UNIDAD", price: 750.00 },
    { id: 194, code: "", name: "LLAVE STILSON 12''/300MM", brand: "WISEUP", unit: "UNIDAD", price: 30.00 },
    { id: 195, code: "", name: "LLAVE STILSON 18''/450MM", brand: "WISEUP", unit: "UNIDAD", price: 48.00 },
    { id: 196, code: "", name: "SET DE DESTORNILLADORES CON PUNTAS 100PZ", brand: "WISEUP", unit: "UNIDAD", price: 200.00 },
    { id: 197, code: "", name: "BOMBA TIPO LAPICERO MON. 1HP SAL. 2\"", brand: "ENZO", unit: "UNIDAD", price: 750.00 },
    { id: 198, code: "", name: "PANTALON DRILL C/AZUL T/L", brand: "", unit: "UNIDAD", price: 22.00 },
    { id: 199, code: "", name: "PANTALON DRILL C/AZUL T/XL", brand: "", unit: "UNIDAD", price: 25.00 },
    { id: 200, code: "", name: "CINTA DELIMITADORA NEGRO/AMARILLO", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 201, code: "", name: "ROLLO DE 100 MTS DE CINTA DE SEGURIDAD, ''PRECAUCION'' 12578", brand: "TRUPER", unit: "UNIDAD", price: 16.00 },
    { id: 202, code: "", name: "SOLDIMIX SILICONA 35GR", brand: "SOLDIMIX", unit: "UNIDAD", price: 8.50 },
    { id: 203, code: "", name: "SOLDIMIX SILICONA 50GR", brand: "SOLDIMIX", unit: "UNIDAD", price: 10.00 },
    { id: 204, code: "", name: "ADHESIVO INSTANTANEO 725 BAJA VISCOCIDAD 20GR BLISTER", brand: "TEKBOND", unit: "UNIDAD", price: 10.00 },
    { id: 205, code: "", name: "LIJA P/METAL 9''x11'' GR80 K200 L0F47N", brand: "NORTON", unit: "UNIDAD", price: 4.00 },
    { id: 206, code: "", name: "LIJA P/METAL 9''x11'' GR100 K200 L0F39N", brand: "NORTON", unit: "UNIDAD", price: 3.50 },
    { id: 207, code: "", name: "CARRETILLA MINERA PEQUEÑA C/ LLANTA", brand: "", unit: "UNIDAD", price: 180.00 },
    { id: 208, code: "", name: "CARTUCHO CONTRA GASES 6003", brand: "", unit: "PAR", price: 18.00 },
    { id: 209, code: "", name: "CARTUCHO CONTRA GASES 6003", brand: "", unit: "PAR", price: 15.00 },
    { id: 210, code: "", name: "LIJA P/METAL 9''x11'' GR36 K200 L0F57N", brand: "NORTON", unit: "UNIDAD", price: 5.00 },
    { id: 211, code: "", name: "LIJA AL AGUA Y AL SECO 9''x11'' GR80 A275 L0A44N", brand: "NORTON", unit: "UNIDAD", price: 4.00 },
    { id: 212, code: "", name: "LIJA AL AGUA Y AL SECO 9''x11'' GR100 A275 L0A35N", brand: "NORTON", unit: "UNIDAD", price: 3.50 },
    { id: 213, code: "", name: "PANTALON ENJEBADO C/NEGRO T/40", brand: "SEGUSA", unit: "UNIDAD", price: 70.00 },
    { id: 214, code: "", name: "CASACA ENJEBADA C/NEGRO T/40", brand: "SEGUSA", unit: "UNIDAD", price: 70.00 },
    { id: 215, code: "", name: "ELECTROSIERRA 16'' (400MM) 1800W UC4041A", brand: "MAKITA", unit: "UNIDAD", price: 1050.00 },
    { id: 216, code: "", name: "BARRA CONICA 6 PIES", brand: "", unit: "UNIDAD", price: 250.00 },
    { id: 217, code: "", name: "BARRA CONICA 5 PIES", brand: "", unit: "UNIDAD", price: 220.00 },
    { id: 218, code: "", name: "COMBA OCTAGONAL 10 LB 10589 C/MANGO MADERA", brand: "TRUPER", unit: "UNIDAD", price: 60.00 },
    { id: 219, code: "", name: "PERFORADORA NEUMATICO YT29A", brand: "", unit: "UNIDAD", price: 1800.00 },
    { id: 220, code: "", name: "ACEITE AFLOJA TODO EN AEROSOL DE 400ML WT-400 13471", brand: "TRUPER", unit: "UNIDAD", price: 18.00 },
    { id: 221, code: "", name: "ALICATE UNIVERSAL 8'' ALU8D15 A2U3930U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 22.00 },
    { id: 222, code: "", name: "SE CAMBIARA POR OTRO ITEM", brand: "NORTON", unit: "UNIDAD", price: 3.00 },
    { id: 223, code: "", name: "CINTAS PEGAFAN MASKING PROFESIONAL 550 1x40YDS", brand: "", unit: "UNIDAD", price: 8.00 },
    { id: 224, code: "", name: "CINTAS PEGAFAN MASKING PROFESIONAL 550 2x40YDS", brand: "", unit: "UNIDAD", price: 12.00 },
    { id: 225, code: "", name: "ADHESIVO INSTANTANEO SUPER COLA 2 GRIS BLISTER", brand: "TEKBOND", unit: "UNIDAD", price: 1.50 },
    { id: 226, code: "", name: "SUPER GLUE - 1 GR", brand: "SOLDIMIX", unit: "UNIDAD", price: 2.00 },
    { id: 227, code: "", name: "PINTURA AEROSOL GRIS MAQUINA 300ML WF0687", brand: "WOLFOX", unit: "UNIDAD", price: 8.00 },
    { id: 228, code: "", name: "PINTURA AEROSOL VERDE BOSQUE 300ML WF0689", brand: "WOLFOX", unit: "UNIDAD", price: 8.00 },
    { id: 229, code: "", name: "PINTURA EN SPRAY BLANCO BRILLANTE 40022", brand: "ULTRACRAFT", unit: "UNIDAD", price: 8.00 },
    { id: 230, code: "", name: "GUANTE TELA + GOMA 8'' C/GRIS GD7003-8 GT0G3988F", brand: "FERRAWYY", unit: "PAR", price: 5.00 },
    { id: 231, code: "", name: "GUANTE TELA + GOMA 9'' C/NARANJADO GD0016-9-NR GT0G4832F", brand: "FERRAWYY", unit: "PAR", price: 5.00 },
    { id: 232, code: "", name: "CORTAPISOS DE MAYOLICA 20'' (50CM) CON RODAJES 16782", brand: "TRUPER", unit: "UNIDAD", price: 16.00 },
    { id: 233, code: "", name: "GATA HIDRAULICA PESADA 2T GAB202", brand: "UYUSTOOLS", unit: "UNIDAD", price: 60.00 },
    { id: 234, code: "", name: "GATA HIDRAULICA PESADA 6T GAB206 G14H0054U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 90.00 },
    { id: 235, code: "", name: "GATA BOTELLA 8 TON TC5361", brand: "TOOLCRAFT", unit: "UNIDAD", price: 120.00 },
    { id: 236, code: "", name: "GATA BOTELLA 10 TON TC5362", brand: "TOOLCRAFT", unit: "UNIDAD", price: 140.00 },
    { id: 237, code: "", name: "GATA BOTELLA 12 TON TC5363", brand: "TOOLCRAFT", unit: "UNIDAD", price: 170.00 },
    { id: 238, code: "", name: "GATA HIDRAULICA PESADA 32T GAB232 GH65P4788U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 320.00 },
    { id: 239, code: "", name: "ELECTRODO 1/8 XKG 7018 14363", brand: "TRUPER", unit: "KILOGRAMOS", price: 18.00 },
    { id: 240, code: "", name: "ELECTRODO 1/8 XKG 6011 15460", brand: "TRUPER", unit: "KILOGRAMOS", price: 18.00 },
    { id: 241, code: "", name: "ELECTRODO 3/32'' XKG 7018 101535", brand: "TRUPER", unit: "KILOGRAMOS", price: 18.00 },
    { id: 242, code: "", name: "GATA TIPO LAGARTO 2T GAM02U G39TL3864U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 200.00 },
    { id: 243, code: "", name: "SILICONA EN TUBO ACETICA VIDRIO&ALUMINIO TRANSP 280GR", brand: "TEKBOND", unit: "UNIDAD", price: 12.00 },
    { id: 244, code: "", name: "SILICONA EN TUBO ACETICA VIDRIO&ALUMINIO NEGRO 280GR", brand: "TEKBOND", unit: "UNIDAD", price: 15.00 },
    { id: 245, code: "", name: "CABLE MELLIZO CTM 2X14 AWG - BLANCO - ROLLO/100MTS C85M7152I", brand: "INDECO", unit: "UNIDAD", price: 420.00 },
    { id: 246, code: "", name: "CABLE MELLIZO CTM 2X16 AWG - BLANCO - ROLLO/100MTS C52M5454I", brand: "INDECO", unit: "UNIDAD", price: 290.00 },
    { id: 247, code: "", name: "CABLE MELLIZO BLANCO 2x18 ELECTRICO CM2X18", brand: "AMERICAN DAKKARS", unit: "UNIDAD", price: 120.00 },
    { id: 248, code: "", name: "CARRETILLA MINERA PESADA BUGGY C/ACCESORIOS S-LL", brand: "", unit: "UNIDAD", price: 180.00 },
    { id: 249, code: "", name: "KIT PERNOS CARRETILLA", brand: "", unit: "KIT", price: 10.00 },
    { id: 250, code: "", name: "ARO RODAJE | LLANTA | CAMARA", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 251, code: "", name: "HUINCHA CON MANGO 30M HUM030 H3M4822U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 28.00 },
    { id: 252, code: "", name: "HUINCHA CON MANGO 50M HUM050 H4M4870U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 35.00 },
    { id: 253, code: "", name: "SUPER HD TITANIUM FORCE SAE 15W-40 CI-4 1/4GL", brand: "CAM2", unit: "UNIDAD", price: 25.00 },
    { id: 254, code: "", name: "ACEITE MGT SAE 20W-50 API SP 1/4GL", brand: "CAM2", unit: "UNIDAD", price: 27.00 },
    { id: 255, code: "", name: "MOCHILA HIGH PRESSURE SPRAYER 16L SPRAYER-16", brand: "", unit: "UNIDAD", price: 80.00 },
    { id: 256, code: "", name: "BALANZA DIGITAL 30KG BAG030-YJ B26D4538F", brand: "FERRAWYY", unit: "UNIDAD", price: 140.00 },
    { id: 257, code: "", name: "BOQUILLA AJUSTABLE 9 PATRONES - ENCASTRE DE 3/4'' ESNE10901", brand: "EMTOP", unit: "UNIDAD", price: 22.00 },
    { id: 258, code: "", name: "NIVEL CON IMAN 12 NII012 N2I6078U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 15.00 },
    { id: 259, code: "", name: "NIVEL CON IMAN 14 NII014 N2I7765U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 19.00 },
    { id: 260, code: "", name: "SERRUCHO PROFESIONAL 16'' SRP016 S3P2597U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 20.00 },
    { id: 261, code: "", name: "NIVEL CON IMAN 20 NII020 N3I2674U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 24.00 },
    { id: 262, code: "", name: "NIVEL CON IMAN 24 NII024 N3I4515U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 28.00 },
    { id: 263, code: "", name: "SACARODAMIENTO 3'' SDR203 S3R7583U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 30.00 },
    { id: 264, code: "", name: "SACARODAMIENTO 4'' SDR204 S4R1955U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 35.00 },
    { id: 265, code: "", name: "SACARODAMIENTO 6'' SDR206 S8R4754U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 55.00 },
    { id: 266, code: "", name: "SACARODAMIENTO 8'' SDR208 S9R4571U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 65.00 },
    { id: 267, code: "", name: "CINTA VEHICULAR REFLECTIVA 50MMX45.7M GRADO DIAMANTE COLOR AMBAR", brand: "REFLEXLITE", unit: "UNIDAD", price: 120.00 },
    { id: 268, code: "", name: "CINTA VEHICULAR REFLECTIVA 50MMX45.7M GRADO DIAMANTE COLOR ROJO", brand: "REFLEXLITE", unit: "UNIDAD", price: 120.00 },
    { id: 269, code: "", name: "TECLE C/RATCHET O SEÑORITA TR7005 (0.5TON)", brand: "BIG RED", unit: "UNIDAD", price: 300.00 },
    { id: 270, code: "", name: "ESCUADRA MAGNETICA 5'' PARA SOLDAR, 75LB SMS05U E4M7784U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 32.00 },
    { id: 271, code: "", name: "ESPATULA 4'' M/MADERA EPU04M E0M6443U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 6.00 },
    { id: 272, code: "", name: "CABEZA DE ZAPAPICO + PALO", brand: "TRAMONTINA", unit: "UNIDAD", price: 35.00 },
    { id: 273, code: "", name: "COMBA 10 LBS. CON MANGO 36''L. TC0563", brand: "TOOLCRAFT", unit: "UNIDAD", price: 95.00 },
    { id: 274, code: "", name: "HACHA SIN MANGO 3.5LB HAU035 H4SM1878U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 22.00 },
    { id: 275, code: "", name: "HACHA SIN MANGO 4.0LB HAU040 H4SM9241U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 26.00 },
    { id: 276, code: "", name: "HACHA SIN MANGO 4.5LB HAU045 H5SM5607U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 32.00 },
    { id: 277, code: "", name: "TRIANGULO DE SEGURIDAD DE 29CM DE ALTO CON ESTUCHE PLASTICO 10943", brand: "TRUPER", unit: "UNIDAD", price: 25.00 },
    { id: 278, code: "", name: "BROCA P/MARTILLO ELEC. PLUS 8x160MM BCE0816 B0P5753U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 8.00 },
    { id: 279, code: "", name: "BROCA PARA METAL HSS 1/4''(6.4MM) BCF104 B0M36816U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 5.00 },
    { id: 280, code: "", name: "BROCA PARA METAL HSS 1/8''(3.2MM) BCF108 B0M15647U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 3.50 },
    { id: 281, code: "", name: "BROCA MIX 16PCS-MM (FIE/MAD/CONC) BCX16S-L B3M5589U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 24.00 },
    { id: 282, code: "", name: "BROCA MADERA X 5PCS(5/32-25/64) BCM05U B1M4266U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 12.00 },
    { id: 283, code: "", name: "LLAVE TERMICA MON 2X40 AMP", brand: "BTICINO", unit: "UNIDAD", price: 30.00 },
    { id: 284, code: "", name: "SIERRA COPA 4PCS SEO004 S1C6721U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 16.00 },
    { id: 285, code: "", name: "PROBADOR PILOTO 14 CM DE CORRIENTE DIRECTA C/CAIMAN 13987", brand: "TRUPER", unit: "UNIDAD", price: 12.00 },
    { id: 286, code: "", name: "PROBADOR PILOTO 19 CM DE CORRIENTE ALTERNA 13989", brand: "TRUPER", unit: "UNIDAD", price: 9.00 },
    { id: 287, code: "", name: "TOMACORRIENTE SIMPLE VISIBLE OVAL", brand: "BTICINO", unit: "UNIDAD", price: 5.00 },
    { id: 288, code: "", name: "SOCATE PLAFON", brand: "BTICINO", unit: "UNIDAD", price: 6.00 },
    { id: 289, code: "", name: "FOCO UFO 18 WATTS", brand: "ASHUN", unit: "UNIDAD", price: 12.00 },
    { id: 290, code: "", name: "INTERRUPTOR TERMOMAGNETICO EASY9 2X32A - EZ9F56232", brand: "SCHNEIDER", unit: "UNIDAD", price: 40.00 },
    { id: 291, code: "", name: "INTERRUPTOR TERMOMAGNETICO EASY9 2X20A - EZ9F56220", brand: "SCHNEIDER", unit: "UNIDAD", price: 40.00 },
    { id: 292, code: "", name: "TAPA CIEGA PVC RECTANGULAR", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 293, code: "", name: "DUCHA LORENZETTI", brand: "", unit: "UNIDAD", price: 57.00 },
    { id: 294, code: "", name: "INTERRUPTOR SIMPLE SENCIA UNIPOLAR", brand: "BTICINO", unit: "UNIDAD", price: 5.00 },
    { id: 295, code: "", name: "FOCO CENSOR", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 296, code: "", name: "CABLE THW#12", brand: "INDECO", unit: "UNIDAD", price: 250.00 },
    { id: 297, code: "", name: "WINCHA PROMOCIONAL 5 MTRS X 19MM TC1490", brand: "TOOLCRAFT", unit: "UNIDAD", price: 15.00 },
    { id: 298, code: "", name: "WINCHA METRICA JH51 3MX16 FL316A W0M99135U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 5.00 },
    { id: 299, code: "", name: "WINCHA METRICA JH51 5MX19 FL519A W1M1498U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 7.00 },
    { id: 300, code: "", name: "WINCHA METRICA CON 3 FRENOS 7.5Mx25MM FLG9075 W2M6231U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 15.00 },
    { id: 301, code: "", name: "WINCHA 8 METROS CINTA 26MM 21625", brand: "PRETUL", unit: "UNIDAD", price: 17.00 },
    { id: 302, code: "", name: "LLAVE MANDRIL 13MM YMA013 LL0M3452U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 7.00 },
    { id: 303, code: "", name: "POLEA DE CARGA 2T PL002U P20C0110U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 120.00 },
    { id: 304, code: "", name: "TECLE CADENA 2T X 3M TEC202 T68C7922U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 480.00 },
    { id: 305, code: "", name: "ALICATE UNIVERSAL 7'' MANGO COMFORT GRIP 22676", brand: "PRETUL", unit: "UNIDAD", price: 20.00 },
    { id: 306, code: "", name: "ALICATE DE CORTE DIAGONAL 7'' MANGO COMFORT GRIP 22678", brand: "PRETUL", unit: "UNIDAD", price: 18.00 },
    { id: 307, code: "", name: "LLAVE TERMICA TRIF 3X32 AMP", brand: "BTICINO", unit: "UNIDAD", price: 55.00 },
    { id: 308, code: "", name: "LLAVE COMBINADA 8PCS 10-21MM YOZ8S1 LL6C8953U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 55.00 },
    { id: 309, code: "", name: "MANDIL CARNAZA PARA SOLDADOR", brand: "", unit: "UNIDAD", price: 20.00 },
    { id: 310, code: "", name: "ESCARPINES CARNAZA PARA SOLDADOR", brand: "", unit: "PAR", price: 16.00 },
    { id: 311, code: "", name: "MANGAS CARNAZA PARA SOLDADOR", brand: "", unit: "PAR", price: 15.00 },
    { id: 312, code: "", name: "TORRE PARA AUTO, CABALLETES 3T BSG03U T24A4903U", brand: "UYUSTOOLS", unit: "PAR", price: 140.00 },
    { id: 313, code: "", name: "TORRE PARA AUTO, CABALLETES 6T BSG06U T48A7965U", brand: "UYUSTOOLS", unit: "PAR", price: 255.00 },
    { id: 314, code: "", name: "LLAVE STILSON 48'' M/PVC YSP048 LL38S0355U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 180.00 },
    { id: 315, code: "", name: "TORRE PARA AUTO, CABALLETES DE 3 TON 14843", brand: "TRUPER", unit: "PAR", price: 160.00 },
    { id: 316, code: "", name: "CUTTER PROFESIONAL 18MM CON ALMA METALICA Y GRIP 16977", brand: "TRUPER", unit: "UNIDAD", price: 12.00 },
    { id: 317, code: "", name: "CUTTER PROFESIONAL CEA3SU C1P6337U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 10.00 },
    { id: 318, code: "", name: "CUTTER ECONOMICO", brand: "", unit: "UNIDAD", price: 3.00 },
    { id: 319, code: "", name: "DISCO LIJA FLAP P/METAL 115MM #100 DLF4100T DL0F8974U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 10.00 },
    { id: 320, code: "", name: "DISCO DIAMANTADO SEGMENTADO 4-1/2'' SECO DDU115 D1D4343U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 12.00 },
    { id: 321, code: "", name: "DISCO DIAMANTADO TURBO 4-1/2'' DDU116 D1D1989U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 11.00 },
    { id: 322, code: "", name: "LIMA PLANA BASTARDA 6'' MANGO DOBLE INYECCION 15309", brand: "TRUPER", unit: "UNIDAD", price: 14.00 },
    { id: 323, code: "", name: "CEPILLO DE ALAMBRE 51 PINCELES DE ACERO AL CARBONO 11553", brand: "TRUPER", unit: "UNIDAD", price: 10.00 },
    { id: 324, code: "", name: "DISCO DIAMANTADO SEGMENTADO 9'' SECO DDU230 D6S7880U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 40.00 },
    { id: 325, code: "", name: "BROCA PARA METAL HSS 3/16''(4.8MM) BCF316-L B0M29299U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 4.00 },
    { id: 326, code: "", name: "CARRETILLA OLYMPO 5.5 PIES - COLOR/AZUL CA30O8334V", brand: "VELKAS", unit: "UNIDAD", price: 185.00 },
    { id: 327, code: "", name: "ESCOBILLA TIPO COPA 3'' ALAMBRE TRENZADO GRUESO EJE M14 17530", brand: "TRUPER", unit: "UNIDAD", price: 22.00 },
    { id: 328, code: "", name: "DISCO DIAMANTADO TURBO 7-1/4'' DDU181 D2D5441U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 16.00 },
    { id: 329, code: "", name: "DISCO DIAMANTADO CONTINUO LISO 7-1/4'' DDU18H D3L8273U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 20.00 },
    { id: 330, code: "", name: "DISCO DE SIERRA PARA MADERA 4-1/2'' x 18T DMA115 D1M6797U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 12.00 },
    { id: 331, code: "", name: "DISCO DE SIERRA PARA MADERA 4-1/2'' x 24T DMA116 D1S4113U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 10.00 },
    { id: 332, code: "", name: "DISCO DE SIERRA PARA MADERA 4-1/2'' x 40T DMA117 D2S3317U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 15.00 },
    { id: 333, code: "", name: "DISCO DE SIERRA PARA MADERA 7-1/4'' x 18T DMD718 D2S6078U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 18.00 },
    { id: 334, code: "", name: "DISCO DE SIERRA PARA MADERA 7-1/4'' x 40T DMD740 D2S8532U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 20.00 },
    { id: 335, code: "", name: "LLAVE FRANCESA 12'' YFU12K LL5F0239U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 36.00 },
    { id: 336, code: "", name: "ALICATE CAIMAN O PINZA DE PRESION 10'' ALM210 A2C8916U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 20.00 },
    { id: 337, code: "", name: "LLAVE FRANCESA M/PLST 12'' YFP012 LL4F3642U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 32.00 },
    { id: 338, code: "", name: "LLAVE MASTER 2PCS MANGO ENGOMADO YMM202 LL5M8062U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 35.00 },
    { id: 339, code: "", name: "ALICATE CAIMAN O PINZA DE PRESION 7'' ALM207 A2C8302U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 18.00 },
    { id: 340, code: "", name: "RASTRILLO CURVO 14T SIN MANGO RAV14T R1C8408U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 14.00 },
    { id: 341, code: "", name: "LLAVE TECLE ARRASTRE 2T NO.802 YDA802 LL23T2708U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 125.00 },
    { id: 342, code: "", name: "DISCO DE CORTE P/METAL INOX 4-1/2'' x 3/64'' x 7/8'' EACD211550", brand: "EMTOP", unit: "UNIDAD", price: 3.50 },
    { id: 343, code: "", name: "DADO LARGO CR-V 12MM DAV312U D1L2119U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 10.00 },
    { id: 344, code: "", name: "DADO LARGO CR-V 13MM DAV313U D1L2119U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 10.00 },
    { id: 345, code: "", name: "DADO LARGO CR-V 14MM DAV314U D1L2119U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 10.00 },
    { id: 346, code: "", name: "DADO CR-V 12MM DAV12U D0C5829U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 6.00 },
    { id: 347, code: "", name: "DADO CR-V 13MM DAV13U D0C5829U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 6.00 },
    { id: 348, code: "", name: "DADO CR-V 14MM DAV14U D0C5829U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 6.00 },
    { id: 349, code: "", name: "DADO CR-V 15MM DAV15U D0C5829U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 6.00 },
    { id: 350, code: "", name: "LLAVE COMBINADA 16MM FULL-P YOV616 LL0C8974F", brand: "FERRAWYY", unit: "UNIDAD", price: 9.00 },
    { id: 351, code: "", name: "LLAVE COMBINADA 17MM CR-V YOV917 LL0C8897F", brand: "FERRAWYY", unit: "UNIDAD", price: 10.00 },
    { id: 352, code: "", name: "LLAVE COMBINADA 19MM CR-V YOV919 LL1C1735F", brand: "FERRAWYY", unit: "UNIDAD", price: 12.00 },
    { id: 353, code: "", name: "LLAVE COMBINADA 20MM CR-V YOV920 LL1C4036F", brand: "FERRAWYY", unit: "UNIDAD", price: 14.00 },
    { id: 354, code: "", name: "JUEGO DE 8 LLAVES TORX TIPO NAVAJA, CUERPO DE LAMINA 21395", brand: "PRETUL", unit: "UNIDAD", price: 15.00 },
    { id: 355, code: "", name: "TENAZA PARA TIERRA DE 500A 24235", brand: "PRETUL", unit: "UNIDAD", price: 20.00 },
    { id: 356, code: "", name: "CABEZA INFLADORA DE LLANTAS, MACHO, CUERDA 1/4 NPT 19087", brand: "TRUPER", unit: "UNIDAD", price: 10.00 },
    { id: 357, code: "", name: "CABEZA INFLADORA DE LLANTAS, HEMBRA, CUERDA 1/4 NPT 19088", brand: "TRUPER", unit: "UNIDAD", price: 10.00 },
    { id: 358, code: "", name: "JUEGO 13 LLAVES ALLEN MM PUNTA HEXAGONAL CON ORGANIZADOR 15542", brand: "TRUPER", unit: "UNIDAD", price: 28.00 },
    { id: 359, code: "", name: "JUEGO 7 LLAVES ALLEN LARGAS MM PUNTA BOLA CON ORGANIZADOR 15548", brand: "TRUPER", unit: "UNIDAD", price: 28.00 },
    { id: 360, code: "", name: "LF-74 FILTRO DE ACEITE LYS", brand: "", unit: "UNIDAD", price: 30.00 },
    { id: 361, code: "", name: "JD 33HP JUEGO DE PIÑONES", brand: "", unit: "UNIDAD", price: 220.00 },
    { id: 362, code: "", name: "JD 33HP JUEGO BAQUELITA", brand: "", unit: "UNIDAD", price: 60.00 },
    { id: 363, code: "", name: "MANGA LAMINADO BLANCO 29 PULGX80 GR C/MATE", brand: "", unit: "METRO", price: 4.50 },
    { id: 364, code: "", name: "LF-946 FILTRO DE ACEITE LYS", brand: "", unit: "UNIDAD", price: 35.00 },
    { id: 365, code: "", name: "GENERADOR ELECTRICO A GASOLINA 2500W/2700W GEG2500", brand: "UYUSTOOLS", unit: "UNIDAD", price: 1200.00 },
    { id: 366, code: "", name: "PANTALON ENJEBADO C/NEGRO T/42", brand: "SEGUSA", unit: "UNIDAD", price: 65.00 },
    { id: 367, code: "", name: "ESCOBILLA COPA TRENZADA 3'' EBC103 E1C9865U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 15.00 },
    { id: 368, code: "", name: "ESCOBILLA COPA TRENZADA 4'' EBC104 E2C7765U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 18.00 },
    { id: 369, code: "", name: "PRENSA G 3'' PRG03U P2G39U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 16.00 },
    { id: 370, code: "", name: "PRENSA G 4'' PRG04U P3G34U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 22.00 },
    { id: 371, code: "", name: "PRENSA G 5'' PRG05U P4G39U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 30.00 },
    { id: 372, code: "", name: "CASACA ENJEBADA C/NEGRO T/42", brand: "SEGUSA", unit: "UNIDAD", price: 80.00 },
    { id: 373, code: "", name: "PIEDRA P/ESMERIL 6'' #36 PDE636U P2E2933U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 18.00 },
    { id: 374, code: "", name: "PIEDRA P/ESMERIL 6'' #60 PDE660U P2E2780U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 18.00 },
    { id: 375, code: "", name: "WINCHE ELECTRICO MONOFASICO EMBRAGUE 500KGX60M KVC", brand: "", unit: "UNIDAD", price: 1750.00 },
    { id: 376, code: "", name: "GRUPO ELECTROGENO JIANG DONG 33HP 20KW MOTOR LIMAX (INCLUYE: 3 FAJAS, 1 BASE, 1 TABLERO 3 e/MONOFASICA + 1 e/TRIFASICA)", brand: "", unit: "UNIDAD", price: 6850.00 },
    { id: 377, code: "", name: "BOMBA TIPO LAPICERO 2HP", brand: "ENZO", unit: "UNIDAD", price: 850.00 },
    { id: 378, code: "", name: "BROCA SDS MAX MINERA 32X1300MM", brand: "DEWALT", unit: "UNIDAD", price: 720.00 },
    { id: 379, code: "", name: "BROCA SDS MAX MINERA 28X690MM FRANCE", brand: "DEWALT", unit: "UNIDAD", price: 380.00 },
    { id: 380, code: "", name: "FOCO TIPO BOTELLA 16W", brand: "ULIX", unit: "UNIDAD", price: 12.00 },
    { id: 381, code: "", name: "CERRADURA DE POMO PARA DORMITORIO", brand: "TRAVEX", unit: "UNIDAD", price: 37.00 },
    { id: 382, code: "", name: "CURVA PVC DE LUZ 3/4''", brand: "EUROTUBO", unit: "UNIDAD", price: 1.70 },
    { id: 383, code: "", name: "JUEGO DE 8 BROCAS CON PUNTA CENTRADORA PARA MADERA 11338", brand: "TRUPER", unit: "UNIDAD", price: 22.00 },
    { id: 384, code: "", name: "CERROJO STRONG 3'' PESADO AC. INOX", brand: "", unit: "UNIDAD", price: 17.00 },
    { id: 385, code: "", name: "HILO CANUTO GRANDE COLOR VERDE FOSFORECENTE", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 386, code: "", name: "HILO CANUTO GRANDE COLOR ANARANJADO FOSFORECENTE", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 387, code: "", name: "HILO CANUTO GRANDE COLOR ROSADO FOSFORECENTE", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 388, code: "", name: "AGUJA CAPOTERA 90MM", brand: "", unit: "UNIDAD", price: 2.00 },
    { id: 389, code: "", name: "BISAGRA ALETA 5/8*6'' (3 ALAS)", brand: "", unit: "UNIDAD", price: 8.00 },
    { id: 390, code: "", name: "PEGAMENTO PVC - AZUL 1/8 (16OZ)", brand: "OATEY", unit: "UNIDAD", price: 65.00 },
    { id: 391, code: "", name: "CANDADO FORTE 60", brand: "", unit: "UNIDAD", price: 65.00 },
    { id: 392, code: "", name: "CANDADO DORADO 20MM HIPOCAMPO", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 393, code: "", name: "PERNO HEX. ZINCADO 5/16''X2'' + TUERCA + ARANDELA", brand: "", unit: "UNIDAD", price: 1.95 },
    { id: 394, code: "", name: "EXTENSION 5 METROS AMARILLA VULC", brand: "ARLED", unit: "UNIDAD", price: 20.00 },
    { id: 395, code: "", name: "DISCO FLAP 4'' AZUL GRANO 60", brand: "UYUSTOOLS", unit: "UNIDAD", price: 8.00 },
    { id: 396, code: "", name: "TALADRO INALAMBRICO + TALADRO ATORNILLADOR INALAMBRICO + CARGADOR + 2 BATERIA DE IONES DE LITIO + BOLSA DE TELA ECKL2006", brand: "EMTOP", unit: "UNIDAD", price: 600.00 },
    { id: 397, code: "", name: "PINTURA SPRAY MULTIUSO KNAUF VERDE FLUORESCENTE", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 398, code: "", name: "PINTURA SPRAY MULTIUSO KNAUF ROSADO FLUORESCENTE", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 399, code: "", name: "LATEX SATINADO GAMAX BLANCO X 5GL", brand: "", unit: "UNIDAD", price: 340.00 },
    { id: 400, code: "", name: "YT29 PATA DEL PIE #14P", brand: "", unit: "UNIDAD", price: 86.00 },
    { id: 401, code: "", name: "POLO PIQUE C/VERDE MILITAR PARA VARON T/M", brand: "", unit: "UNIDAD", price: 37.00 },
    { id: 402, code: "", name: "POLO PIQUE C/VERDE MILITAR PARA VARON T/L", brand: "", unit: "UNIDAD", price: 37.00 },
    { id: 403, code: "", name: "POLO PIQUE C/VERDE MILITAR PARA VARON T/XL", brand: "", unit: "UNIDAD", price: 37.00 },
    { id: 404, code: "", name: "POLO PIQUE C/VERDE MILITAR PARA VARON T/XXL", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 405, code: "", name: "POLO PIQUE C/VERDE MILITAR PARA DAMA T/M", brand: "", unit: "UNIDAD", price: 37.00 },
    { id: 406, code: "", name: "GATA LAGARTO 3TN PESADA DRKFJ3T", brand: "DEREK MOTORS", unit: "UNIDAD", price: 620.00 },
    { id: 407, code: "", name: "ZAPAPICO NEGRO 5LB C/MANGO MADERA", brand: "VELKAS", unit: "UNIDAD", price: 33.00 },
    { id: 408, code: "", name: "ADAPTADOR PARA FILTROS 502", brand: "3M", unit: "PAR", price: 9.00 },
    { id: 409, code: "", name: "FOCO TIPO BOTELLA 16 WATTS", brand: "PHELIX", unit: "UNIDAD", price: 16.00 },
    { id: 410, code: "", name: "SACABARRENO", brand: "", unit: "UNIDAD", price: 135.00 },
    { id: 411, code: "", name: "REMACHADORA 10'' NO.20 REA006 R2EA8302U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 22.00 },
    { id: 412, code: "", name: "GUANTE DE HILO ALGODON C/PUNTOS PVC DOS LADOS", brand: "PROTEGTUS", unit: "PAR", price: 6.00 },
    { id: 413, code: "", name: "GUANTE DE HILO ALGODON C/PUNTOS PVC NEGRO", brand: "", unit: "PAR", price: 6.00 },
    { id: 414, code: "", name: "ZAPATO DE SEGURIDAD C/PUNTA DE ACERO T-42", brand: "VICART", unit: "PAR", price: 55.00 },
    { id: 415, code: "", name: "CANALETA PVC 10x10x2000MM C/ADHESIVO AZUL C0P2850S", brand: "SWIFT", unit: "UNIDAD", price: 2.00 },
    { id: 416, code: "", name: "FLUORESCENTE CIRCULAR OJO FELINO 22W/6500K LED-CIF22BL", brand: "FSL", unit: "UNIDAD", price: 16.00 },
    { id: 417, code: "", name: "TRONZADORA DE METALES 14'' 2350W ECFS3551", brand: "EMTOP", unit: "UNIDAD", price: 650.00 },
    { id: 418, code: "", name: "MOTOR MONOFASICO ALTA 3.0 HP - 100% COBRE/YC100L-2", brand: "WELKER", unit: "UNIDAD", price: 700.00 },
    { id: 419, code: "", name: "TRAMPA BOTELLA PARA LAVATORIO", brand: "", unit: "UNIDAD", price: 18.00 },
    { id: 420, code: "", name: "COMBA 12 LBS. CON MANGO 36''L. TC0564", brand: "TOOLCRAFT", unit: "UNIDAD", price: 100.00 },
    { id: 421, code: "", name: "PALANA TIPO CUCHARA TC9135", brand: "TOOLCRAFT", unit: "UNIDAD", price: 20.00 },
    { id: 422, code: "", name: "PALANA TIPO RECTA TC9134", brand: "TOOLCRAFT", unit: "UNIDAD", price: 22.00 },
    { id: 423, code: "", name: "PALANA CUCHARA PEQUEÑA C/MANGO 45CM 77498/404", brand: "TRAMONTINA", unit: "UNIDAD", price: 22.00 },
    { id: 424, code: "", name: "CAVADOR MANGO DE MADERA 45'' 11973", brand: "TRUPER", unit: "UNIDAD", price: 80.00 },
    { id: 425, code: "", name: "CAVA HOYO 2.0KG LARGO/1200MM S535-9Y", brand: "DEREK TOOLS", unit: "UNIDAD", price: 60.00 },
    { id: 426, code: "", name: "REMACHADORA MANUAL 9.5'' KM-043", brand: "KAMASA", unit: "UNIDAD", price: 22.00 },
    { id: 427, code: "", name: "CINCEL DE PUNTA M/PVC 10''X16'' CN10VP C4P0421U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 28.00 },
    { id: 428, code: "", name: "CORTADOR DE VIDRIO 7''/175MM", brand: "WISEUP", unit: "UNIDAD", price: 14.00 },
    { id: 429, code: "", name: "LLANTA TORITO PARA CARRETILLA", brand: "", unit: "UNIDAD", price: 60.00 },
    { id: 430, code: "", name: "SOLDIMIX 10 MINUTOS CLASICO 30G", brand: "SOLDIMIX", unit: "UNIDAD", price: 12.00 },
    { id: 431, code: "", name: "ESMERIL DE BANCO 5'' 1/3HP RPM 3450/60HZ (125x20x12.7 MM) VLK-125 E22B24V", brand: "VELKAS", unit: "UNIDAD", price: 150.00 },
    { id: 432, code: "", name: "CARCASA CAMPO D25773 - (N580536)", brand: "DEWALT", unit: "UNIDAD", price: 120.00 },
    { id: 433, code: "", name: "LENTES DE SEGURIDAD TRANSPARENTES OSCUROS", brand: "SEGPRO", unit: "UNIDAD", price: 6.00 },
    { id: 434, code: "", name: "LENTES DE SEGURIDAD TRANSPARENTES", brand: "STARTEC SPRO", unit: "UNIDAD", price: 6.00 },
    { id: 435, code: "", name: "LENTES DE SEGURIDAD TRANSPARENTE CLASIO (AZUL)", brand: "", unit: "UNIDAD", price: 4.00 },
    { id: 436, code: "", name: "LENTE GOGGLES DE SEGURIDAD CON VALVULA DE VENTILACION 14220", brand: "TRUPER", unit: "UNIDAD", price: 12.00 },
    { id: 437, code: "", name: "YT29 - KIT CONEXION DE TUBERIA (CONECTOR DE TUBERIA #6, TUERCA DE PALETA #5, CONECTOR CONICO DE TUBERIA #3)", brand: "SHENYANG", unit: "UNIDAD", price: 35.00 },
    { id: 438, code: "", name: "CASCO PARA SOLDAR FOTOSENSIBLE", brand: "WISEUP", unit: "UNIDAD", price: 95.00 },
    { id: 439, code: "", name: "CASCO MINERO SUSP.4PTAS C/PLC DIELECTRICO C/AZUL", brand: "MSA", unit: "UNIDAD", price: 45.00 },
    { id: 440, code: "", name: "POR USAR MMM", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 441, code: "", name: "CABLE VULCANIZADO NLT 2X12 AWG", brand: "BRANDE", unit: "METRO", price: 6.00 },
    { id: 442, code: "", name: "CHALECO DE SEGURIDAD AZUL MARINO TIPO H T-M", brand: "", unit: "UNIDAD", price: 25.00 },
    { id: 443, code: "", name: "CHALECO DE SEGURIDAD BEIGE TIPO H T-S", brand: "", unit: "UNIDAD", price: 25.00 },
    { id: 444, code: "", name: "CINCEL DE PUNTA 400MM DWA0805", brand: "DEWALT", unit: "UNIDAD", price: 25.00 },
    { id: 445, code: "", name: "MOTOSIERRA ELECTRICA 16'' 2200W", brand: "WISEUP", unit: "UNIDAD", price: 500.00 },
    { id: 446, code: "", name: "TOMA TRIPLE AEREO PULPO 16A - VOLTEZ", brand: "", unit: "UNIDAD", price: 35.00 },
    { id: 447, code: "", name: "GUANTE NITRON V9'' T-L USAFETY", brand: "CLUTE", unit: "PAR", price: 8.00 },
    { id: 448, code: "", name: "GUANTE DE PVC NEGRO NEOPLUS 40CM", brand: "ASTARA", unit: "PAR", price: 17.00 },
    { id: 449, code: "", name: "LLAVE MIXTA 11MM", brand: "STANLEY", unit: "UNIDAD", price: 12.00 },
    { id: 450, code: "", name: "MANGA LAMINADA BLANCO MATE 24''", brand: "", unit: "METRO", price: 3.00 },
    { id: 451, code: "", name: "BROCA SDS MAX 1500X32MM", brand: "DEWALT", unit: "UNIDAD", price: 800.00 },
    { id: 452, code: "", name: "HDPE UNION 1 PULG DIM (32)", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 453, code: "", name: "HDPE TEE 1 PULG DIM (32)", brand: "", unit: "UNIDAD", price: 16.00 },
    { id: 454, code: "", name: "BOMBA SUMERGIBLE TIPO LAPICERO TRIFASICA | 380V | 2 PULG DESC", brand: "MEBA", unit: "UNIDAD", price: 1050.00 },
    { id: 455, code: "", name: "YT29 KIT COMPLETO DE ORING MAQUINA", brand: "", unit: "UNIDAD", price: 25.00 },
    { id: 456, code: "", name: "YT29 CONEXION DE AGUA #12", brand: "", unit: "UNIDAD", price: 35.00 },
    { id: 457, code: "", name: "YT29 TUERCA CONEXION DE AGUA #13", brand: "", unit: "UNIDAD", price: 20.00 },
    { id: 458, code: "", name: "YT29 RETEN DE CODO DE AGUA #16", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 459, code: "", name: "HDPE UNION 2 PULG DIM (63)", brand: "", unit: "UNIDAD", price: 22.00 },
    { id: 460, code: "", name: "HDPE TEE 2 PULG DIM", brand: "", unit: "UNIDAD", price: 30.00 },
    { id: 461, code: "", name: "HDPE REDUCCION 2 PULG A 1 PULG DIM (63 X 32)", brand: "", unit: "UNIDAD", price: 18.00 },
    { id: 462, code: "", name: "HDPE VALVULA 1 PULG DIM", brand: "", unit: "UNIDAD", price: 22.00 },
    { id: 463, code: "", name: "HDPE VALVULA 2 PULG DIM (63)", brand: "", unit: "UNIDAD", price: 65.00 },
    { id: 464, code: "", name: "HDPE ADAPTADOR MACHO 1 PULG DIM", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 465, code: "", name: "HDPE ADAPTADOR HEMBRA 1 PULG DIM (32 X 1'')", brand: "", unit: "UNIDAD", price: 7.00 },
    { id: 466, code: "", name: "LLAVE MIXTA 13MM", brand: "STANLEY", unit: "UNIDAD", price: 14.00 },
    { id: 467, code: "", name: "BROCA CONICA 7 BOTONES #34", brand: "BOART", unit: "UNIDAD", price: 40.00 },
    { id: 468, code: "", name: "BROCA CONICA 7 BOTONES #32", brand: "BOART", unit: "UNIDAD", price: 38.00 },
    { id: 469, code: "", name: "CINCEL SDS MAX PUNTA 600 MM (D-34447)", brand: "MAKITA", unit: "UNIDAD", price: 45.00 },
    { id: 470, code: "", name: "SUPRESOR DE PICO 4 SALIDAS 3M AGM004-L S5P3460U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 40.00 },
    { id: 471, code: "", name: "JUEGO ARTICULADO TORX T9-T40 - 8 PIEZAS CR-V EHKY4083", brand: "EMTOP", unit: "UNIDAD", price: 16.00 },
    { id: 472, code: "", name: "CINCEL SDS MAX PUNTA 400 MM (D-34182)", brand: "MAKITA", unit: "UNIDAD", price: 30.00 },
    { id: 473, code: "", name: "BROCA SDS PLUS 5/16 X 6'', BS-5/16X6 11269", brand: "TRUPER", unit: "UNIDAD", price: 11.00 },
    { id: 474, code: "", name: "FILTRO CONTRA PARTICULAS P100 2097", brand: "", unit: "PAR", price: 28.00 },
    { id: 475, code: "", name: "ESCOBILLA TIPO COPA 3'' ALAMBRE TRENZADO FINO EJE M14 14184", brand: "TRUPER", unit: "UNIDAD", price: 24.00 },
    { id: 476, code: "", name: "ESMALTE ACRIL. X-3 GLOSS NEGRO GA-7000 X GL", brand: "ANYPSA", unit: "GALON", price: 95.00 },
    { id: 477, code: "", name: "CINCEL PUNTA DE METAL 3/4'' X 35CM", brand: "", unit: "UNIDAD", price: 25.00 },
    { id: 478, code: "", name: "TABLA DE MADERA PARA LAVAR", brand: "", unit: "UNIDAD", price: 27.00 },
    { id: 479, code: "", name: "BALANZA DIGITAL 50KG", brand: "", unit: "UNIDAD", price: 220.00 },
    { id: 480, code: "", name: "UNION HDPE DE 16MM", brand: "", unit: "UNIDAD", price: 0.50 },
    { id: 481, code: "", name: "DESTORNILLADORES M/TRANSPARENTE 6PCS DET601P D3T6893U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 24.00 },
    { id: 482, code: "", name: "BOMBA SUMERGIBLE A/SUCIA 2HP 2'' C/ TRITURADOR", brand: "MEBA", unit: "UNIDAD", price: 1300.00 },
    { id: 483, code: "", name: "GENERADOR GASOLINERO 10000W JSU10000E", brand: "KAZO", unit: "UNIDAD", price: 3300.00 },
    { id: 484, code: "", name: "ACEITE GASOLINERO MULTIGRADO 10W-30 1/4", brand: "CAM2", unit: "UNIDAD", price: 0.00 },
    { id: 485, code: "", name: "MOTOBOMBA WP40 K390 13HP 6LITROS", brand: "KAWAMOTO", unit: "UNIDAD", price: 1500.00 },
    { id: 486, code: "", name: "MANGUERA PLANA DE PVC PARA RIEGO 4''", brand: "", unit: "METRO", price: 9.00 },
    { id: 487, code: "", name: "MANGUERA DE SUBSION NARANJA 4''", brand: "", unit: "METRO", price: 45.00 },
    { id: 488, code: "", name: "ACCESORIOS COMPRESOR 17PCS ACC017", brand: "UYUSTOOLS", unit: "UNIDAD", price: 65.00 },
    { id: 489, code: "", name: "CARRETILLA MINERA PESADA BUGGY", brand: "ORO", unit: "UNIDAD", price: 230.00 },
    { id: 490, code: "", name: "BROCA SDS MAX 32X540;920", brand: "DEWALT", unit: "UNIDAD", price: 750.00 },
    { id: 491, code: "", name: "BROCA SDS MAX 32X540MM", brand: "DEWALT", unit: "UNIDAD", price: 300.00 },
    { id: 492, code: "", name: "CHOTANA 4 PIES", brand: "", unit: "UNIDAD", price: 40.00 },
    { id: 493, code: "", name: "CHOTANA 5 PIES", brand: "", unit: "UNIDAD", price: 55.00 },
    { id: 494, code: "", name: "EXTRACTOR AXIAL 5.5HP | 380V", brand: "DIMAQSA", unit: "UNIDAD", price: 2200.00 },
    { id: 495, code: "", name: "BROCA SDS MAX 32X690MM", brand: "DEWALT", unit: "UNIDAD", price: 380.00 },
    { id: 496, code: "", name: "BOTA PVC NEGRA/AMAR 36CM T-40", brand: "XTREME", unit: "UNIDAD", price: 38.00 },
    { id: 497, code: "", name: "BOTA PVC NEGRA/AMAR 36CM T-41", brand: "XTREME", unit: "PAR", price: 38.00 },
    { id: 498, code: "", name: "BOTA PVC NEGRA/AMAR 36CM T-43", brand: "XTREME", unit: "PAR", price: 38.00 },
    { id: 499, code: "", name: "CABLE VULCANIZADO NLT 2X12 AWG - ROLLO/100MTS C150V7500B", brand: "BRANDE", unit: "UNIDAD", price: 640.00 },
    { id: 500, code: "", name: "BOTA RGB-A F/AZUL 36CM C/REF C/LOGO T-41", brand: "SEGUSA", unit: "PAR", price: 105.00 },
    { id: 501, code: "", name: "CASCO MINERO SUSP.4PTAS C/PLC DIELECTRICO C/AZUL", brand: "TRIDENTE", unit: "UNIDAD", price: 25.00 },
    { id: 502, code: "", name: "CASCO MINERO SUSP.4PTAS C/PLC DIELECTRICO C/ROJO", brand: "TRIDENTE", unit: "UNIDAD", price: 25.00 },
    { id: 503, code: "", name: "TABLERO JD", brand: "", unit: "UNIDAD", price: 550.00 },
    { id: 504, code: "", name: "COMBA 4 LBS. CON MANGO 12''L. TC0560", brand: "TOOLCRAFT", unit: "UNIDAD", price: 45.00 },
    { id: 505, code: "", name: "COMBA 8 LBS. CON MANGO 36''L. TC0562", brand: "TOOLCRAFT", unit: "UNIDAD", price: 85.00 },
    { id: 506, code: "", name: "MANGA LAMINADA BLANCO MATE 26'", brand: "", unit: "METRO", price: 3.00 },
    { id: 507, code: "", name: "TOMACORRIENTE SOBREPONER 3 SERV. 20A 240V L/T A-056", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 30.00 },
    { id: 508, code: "", name: "TAPON DE OIDO TPR ELITE VERDE CON BOLSA (CAJA/100UND)", brand: "CLUTE", unit: "CAJA", price: 85.00 },
    { id: 509, code: "", name: "BOMBA PERIFERICA PARA AGUA 0.5HP 1''X1'' 220V/60HZ BP24A3107V", brand: "VELKAS", unit: "UNIDAD", price: 140.00 },
    { id: 510, code: "", name: "BOMBA PERIFERICA PARA AGUA 1HP 1''X1'' 220V/60HZ BP41A47V", brand: "VELKAS", unit: "UNIDAD", price: 260.00 },
    { id: 511, code: "", name: "ESMERIL ANGULAR 4 1/2'' 500W 220V WF0005", brand: "WOLFOX", unit: "UNIDAD", price: 95.00 },
    { id: 512, code: "", name: "ESMERIL ANGULAR 4 1/2'' 710W 220V WF0001", brand: "WOLFOX", unit: "UNIDAD", price: 110.00 },
    { id: 513, code: "", name: "CARETA PARA SOLDAR C/NEGRO", brand: "WOLFOX", unit: "UNIDAD", price: 20.00 },
    { id: 514, code: "", name: "BOMBA MANUAL EXTRACTORA PARA ACEITES BMC032 B22A7876U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 140.00 },
    { id: 515, code: "", name: "MASCARA DE SILICONA MEDIA CARA + FILTRO 7093 - CAJA CARTON X 1UND", brand: "ASTARA", unit: "UNIDAD", price: 55.00 },
    { id: 516, code: "", name: "DISCO LIJA FLAP P/METAL 115MM #100 DLF4100T", brand: "UYUSTOOLS", unit: "UNIDAD", price: 12.00 },
    { id: 517, code: "", name: "GRASA AMARILLA  1/2K", brand: "", unit: "UNIDAD", price: 20.00 },
    { id: 518, code: "", name: "CINTA AISLANTE AMARILLO 19MM X 18M X 0.18MM", brand: "3M", unit: "UNIDAD", price: 10.00 },
    { id: 519, code: "", name: "PALANA CARBONERA T-2000, PUÑO ''Y'' 17164", brand: "TRUPER", unit: "UNIDAD", price: 55.00 },
    { id: 520, code: "", name: "BIDON 8 GALONES", brand: "", unit: "UNIDAD", price: 28.00 },
    { id: 521, code: "", name: "CINTA AISLANTE C/VERDE 19MM X 18M 12502", brand: "TRUPER", unit: "UNIDAD", price: 6.00 },
    { id: 522, code: "", name: "CABLE ALMA DE ACERO 5/8''", brand: "", unit: "METRO", price: 14.00 },
    { id: 523, code: "", name: "SACABROCAS", brand: "", unit: "UNIDAD", price: 145.00 },
    { id: 524, code: "", name: "TEE DENTADO 16MM", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 525, code: "", name: "HDPE TEE REDUCIDO 32*16*32 MM", brand: "", unit: "UNIDAD", price: 16.00 },
    { id: 526, code: "", name: "HOJA DE SIERRA 1/2 X 12 X 18D", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 527, code: "", name: "BROCA DE COBALTO 1/4''", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 528, code: "", name: "BROCA DE MADERA 1/4'' 101691", brand: "TRUPER", unit: "UNIDAD", price: 8.00 },
    { id: 529, code: "", name: "DISCO DE DESBASTE 4-1/2'' x 1/4'' x 7/8''", brand: "", unit: "UNIDAD", price: 7.00 },
    { id: 530, code: "", name: "ENCENDEDOR GAS SOLIDO - CAJA/50UND", brand: "", unit: "UNIDAD", price: 60.00 },
    { id: 531, code: "", name: "DISCO DE CORTE DE METAL 7''X1/8''X 7/8'' DW44560", brand: "DEWALT", unit: "UNIDAD", price: 7.00 },
    { id: 532, code: "", name: "EXTRACTOR AXIAL IMPORTADO 1HP", brand: "", unit: "UNIDAD", price: 850.00 },
    { id: 533, code: "", name: "GRASA ROJA - ENVASE/250 GRAMOS", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 534, code: "", name: "ENCHUFE INDUSTRIAL 3X16 ROJO", brand: "", unit: "UNIDAD", price: 40.00 },
    { id: 535, code: "", name: "TOMACORRIENTE INDUSTRIAL 3X16 ROJO", brand: "", unit: "UNIDAD", price: 40.00 },
    { id: 536, code: "", name: "MANGUERA DE HDPE 2'' CLASE 10 X 100 MTS", brand: "", unit: "UNIDAD", price: 480.00 },
    { id: 537, code: "", name: "GANCHO GALVANIZADO 2TON", brand: "UYUSTOOLS", unit: "UNIDAD", price: 60.00 },
    { id: 538, code: "", name: "ANTEOJO KOMET XPV C/REJILLA DE METAL C/CORDON (LENTE DE MALLA)", brand: "CLUTE", unit: "UNIDAD", price: 20.00 },
    { id: 539, code: "", name: "GUANTE CUERO BADANA BLANCO T-L", brand: "CLUTE", unit: "PAR", price: 8.00 },
    { id: 540, code: "", name: "COMPRESORA 25L 2.5HP 220V-60HZ DRK-24LP", brand: "DEREK MOTORS", unit: "UNIDAD", price: 480.00 },
    { id: 541, code: "", name: "COMPRESORA 50L 2.5HP 220V-60HZ DRK-50LP", brand: "DEREK MOTORS", unit: "UNIDAD", price: 580.00 },
    { id: 542, code: "", name: "ESPADA DE MOTOSIERRA 24'' PARA DRK-5800", brand: "", unit: "UNIDAD", price: 110.00 },
    { id: 543, code: "", name: "YT29 - VALVULA DE REGULACION DE PRESION #24", brand: "", unit: "UNIDAD", price: 43.50 },
    { id: 544, code: "", name: "YT29 - MANGO DERECHO #31", brand: "", unit: "UNIDAD", price: 36.00 },
    { id: 545, code: "", name: "YT29 - MANIJA IZQUIERDA #32", brand: "", unit: "UNIDAD", price: 32.00 },
    { id: 546, code: "", name: "YT29 - MANGA DE SELLO GRANDE #29", brand: "", unit: "UNIDAD", price: 19.00 },
    { id: 547, code: "", name: "YT29 - EXPANSION #25", brand: "", unit: "UNIDAD", price: 2.80 },
    { id: 548, code: "", name: "YT29 - TAPA DE RESORTE DE VALVULA #36", brand: "", unit: "UNIDAD", price: 5.50 },
    { id: 549, code: "", name: "YT29 - O-RING #43", brand: "", unit: "UNIDAD", price: 3.00 },
    { id: 550, code: "", name: "YT29 - ALMOHADILLA #40", brand: "", unit: "UNIDAD", price: 4.80 },
    { id: 551, code: "", name: "YT29 - VALVULA DE CONTROL #17", brand: "", unit: "UNIDAD", price: 48.00 },
    { id: 552, code: "", name: "YT29 - RETENEDOR, GRAMPA #71", brand: "", unit: "UNIDAD", price: 69.00 },
    { id: 553, code: "", name: "YT29 - RESORTE DE VALVULA #38", brand: "", unit: "UNIDAD", price: 2.50 },
    { id: 554, code: "", name: "YT29 - VALVULA DE AGUA #42", brand: "", unit: "UNIDAD", price: 21.50 },
    { id: 555, code: "", name: "EMBUDO PLASTICO 500ML, CUELLO FLEXIBLE CON FILTRO 11207", brand: "TRUPER", unit: "UNIDAD", price: 10.00 },
    { id: 556, code: "", name: "BOMBA TUBULAR TRIFASICA 220V PARA POZO DE 4'' 3HP C/DESCARGA DE 2'' 4XR11/7-2.2-220V BS257T158L", brand: "LEO", unit: "UNIDAD", price: 1400.00 },
    { id: 557, code: "", name: "CAJA PARA HERRAMIENTAS DE 14'' SIN COMPARTIMIENTOS 19854", brand: "TRUPER", unit: "UNIDAD", price: 30.00 },
    { id: 558, code: "", name: "CAJA PARA HERRAMIENTAS DE 19'' CON COMPARTIMIENTOS 11143", brand: "TRUPER", unit: "UNIDAD", price: 55.00 },
    { id: 559, code: "", name: "CAJA PARA HERRAMIENTAS DE 22'' CON COMPARTIMIENTOS 11145", brand: "TRUPER", unit: "UNIDAD", price: 70.00 },
    { id: 560, code: "", name: "SIERRA CIRCULAR PROFESIONAL 7-1/4'' 1500W 220V 11005", brand: "TRUPER", unit: "UNIDAD", price: 280.00 },
    { id: 561, code: "", name: "TALADRO INALAMBRICO 1.5 AH 12V DRK-CD508S", brand: "DEREK TOOLS", unit: "UNIDAD", price: 250.00 },
    { id: 562, code: "", name: "SIERRA CALADORA 570 WATTS 220V TC5916", brand: "TOOLCRAFT", unit: "UNIDAD", price: 175.00 },
    { id: 563, code: "", name: "SIERRA CIRCULAR 1200W 220V TC4116", brand: "TOOLCRAFT", unit: "UNIDAD", price: 260.00 },
    { id: 564, code: "", name: "AMOLADORA ANGULAR 2200W 230MM/9'' DSM02-230B E77A5207DC", brand: "DONGCHENG", unit: "UNIDAD", price: 440.00 },
    { id: 565, code: "", name: "KIT CARBON D25773 - (N580542)", brand: "DEWALT", unit: "UNIDAD", price: 40.00 },
    { id: 566, code: "", name: "KIT CARBON D25773 - (N580543)", brand: "DEWALT", unit: "UNIDAD", price: 40.00 },
    { id: 567, code: "", name: "CAMPO D25773 - (N580537)", brand: "DEWALT", unit: "UNIDAD", price: 170.00 },
    { id: 568, code: "", name: "BOMBA SUMERGIBLE TUBULAR 10HP TRI PULGADA", brand: "LEO", unit: "UNIDAD", price: 2350.00 },
    { id: 569, code: "", name: "ESCUADRA RAPIDA 12\" KM-1635", brand: "KAMASA", unit: "UNIDAD", price: 49.00 },
    { id: 570, code: "", name: "PORTA HERRAMIENTA (HUSILLO) D25773 - (N580524)", brand: "DEWALT", unit: "UNIDAD", price: 220.00 },
    { id: 571, code: "", name: "SIERRA CIRCULAR 7-1/4'' 1600 WATTS 5000RPM ECSW1853", brand: "EMTOP", unit: "UNIDAD", price: 340.00 },
    { id: 572, code: "", name: "SOPLADOR DE AIRE 3.5M³ 600W EABR6001", brand: "EMTOP", unit: "UNIDAD", price: 190.00 },
    { id: 573, code: "", name: "SIERRA SABLE 750W ERSW8001", brand: "EMTOP", unit: "UNIDAD", price: 390.00 },
    { id: 574, code: "", name: "RECTIFICADORA 550W/25MM DSJ05-25 R32D5285DC", brand: "DONGCHENG", unit: "UNIDAD", price: 220.00 },
    { id: 575, code: "", name: "AMOLADORA ANGULAR 115MM/710W DSM02-115 E22A7722DC", brand: "DONGCHENG", unit: "UNIDAD", price: 135.00 },
    { id: 576, code: "", name: "SIERRA INALAMBRICO 12'' 20V/5AH DCML250FK S144I9707DC", brand: "DONGCHENG", unit: "UNIDAD", price: 820.00 },
    { id: 577, code: "", name: "PISTOLA CALOR 2000W DQB2000 P15C8769DC", brand: "DONGCHENG", unit: "UNIDAD", price: 100.00 },
    { id: 578, code: "", name: "SOPLADOR ELECTRICO 220V 60HZ 500W 13000RPM BK-EB825", brand: "DEREK TOOLS", unit: "UNIDAD", price: 95.00 },
    { id: 579, code: "", name: "FRESADORA RUTEADORA ELECTRICA DE PALMA 500W DRK-ER6", brand: "DEREK TOOLS", unit: "UNIDAD", price: 180.00 },
    { id: 580, code: "", name: "SOLDIMIX ULTRAFUERTE 30GR - PEND.", brand: "SOLDIMIX", unit: "UNIDAD", price: 16.00 },
    { id: 581, code: "", name: "BOTA RGB-A F/AZUL 36CM C/REF C/LOGO T-38", brand: "SEGUSA", unit: "PAR", price: 105.00 },
    { id: 582, code: "", name: "BOTA RGB-A F/AZUL 36CM C/REF C/LOGO T-41", brand: "SEGUSA", unit: "PAR", price: 105.00 },
    { id: 583, code: "", name: "PROTECTORES DE OIDOS P/ADAPTADOR DE CASCO HUNTER", brand: "CLUTE", unit: "UNIDAD", price: 25.00 },
    { id: 584, code: "", name: "PILA RECARGABLE AA PAR", brand: "OPALUX", unit: "UNIDAD", price: 25.00 },
    { id: 585, code: "", name: "ABRAZADERA UNIVERSAL 2\" SINFIN", brand: "", unit: "UNIDAD", price: 3.00 },
    { id: 586, code: "", name: "ESMALTE ACRILICO GLOSS X3 C/AMARILLO CAT", brand: "ANYPSA", unit: "UNIDAD", price: 90.00 },
    { id: 587, code: "", name: "LAMPARA MINERA RD400 MOD.KOMBA AZUL", brand: "DOOLPRO", unit: "UNIDAD", price: 120.00 },
    { id: 588, code: "", name: "RESPIRADOR PROFESIONAL MULTIPROPOSITO GA-SI-2 + FILTRO GA-7093", brand: "ASTARA", unit: "UNIDAD", price: 55.00 },
    { id: 589, code: "", name: "INFLADOR MANUAL DE ACERO 100 PSI 14863", brand: "TRUPER", unit: "UNIDAD", price: 30.00 },
    { id: 590, code: "", name: "FOCO TIPO BOTELLA DE 80W", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 591, code: "", name: "TOMACORRIENTE VISIBLE UNIVERSAL X2 CON L/TIERRA U-29", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 592, code: "", name: "UNION DE 3/4''", brand: "", unit: "UNIDAD", price: 5.50 },
    { id: 593, code: "", name: "ARO GALVANIZADO", brand: "", unit: "UNIDAD", price: 40.00 },
    { id: 594, code: "", name: "WINCHA GLOBAL PLUS 8MTS", brand: "STANLEY", unit: "UNIDAD", price: 50.00 },
    { id: 595, code: "", name: "PALETA DE PLASTICO DE 22CM X 38CM", brand: "", unit: "UNIDAD", price: 30.00 },
    { id: 596, code: "", name: "FROTACHO DE PLASTICO 15CM X 20CM", brand: "", unit: "UNIDAD", price: 17.00 },
    { id: 597, code: "", name: "BROCA HSS COBALTO 1/8 - HB", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 598, code: "", name: "CARGADOR DE PILAS ENERGIZER", brand: "", unit: "UNIDAD", price: 75.00 },
    { id: 599, code: "", name: "CINTA AISLANTE PVC NEGRO 155 19MMX18.3MX0.13MM", brand: "3M", unit: "UNIDAD", price: 6.00 },
    { id: 600, code: "", name: "SOCKET COLGANTE", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 601, code: "", name: "JUEGO DE BROCAS SDS MAX MINERAS 32x540MM Y 32X920MM FRANCE", brand: "DEWALT", unit: "UNIDAD", price: 740.00 },
    { id: 602, code: "", name: "LIMA P/MOTOSIERRA 5/32 X 8''", brand: "KAMASA", unit: "UNIDAD", price: 5.00 },
    { id: 603, code: "", name: "CADENA MAKITA 16''", brand: "MAKITA", unit: "UNIDAD", price: 90.00 },
    { id: 604, code: "", name: "GENERADOR GASOLINERO MEBA M3600-200UG", brand: "MEBA", unit: "UNIDAD", price: 1500.00 },
    { id: 605, code: "", name: "BOMBA SUMERGIBLE A/SUCIA MEBA 2HP 2'' WQD10-15-1.5A MONOF.", brand: "MEBA", unit: "UNIDAD", price: 750.00 },
    { id: 606, code: "", name: "BOMBA SUMERGIBLE A/SUCIA MEBA 3HP 2'' MONOF. 12-18-2.2'' 18M", brand: "MEBA", unit: "UNIDAD", price: 950.00 },
    { id: 607, code: "", name: "PANTALON DRILL C/AZUL T/M", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 608, code: "", name: "VALVULA HDPE 16MM", brand: "", unit: "UNIDAD", price: 4.00 },
    { id: 609, code: "", name: "TAPON HDPE 16MM", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 610, code: "", name: "GOTERO REGULABLE 0.135 L/H", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 611, code: "", name: "PUNZON P/MANGUERA", brand: "", unit: "UNIDAD", price: 20.00 },
    { id: 612, code: "", name: "BOTA RGB-A F/AZUL 36CM C/REF C/LOGO T-40", brand: "SEGUSA", unit: "PAR", price: 105.00 },
    { id: 613, code: "", name: "CAMISA DRILL AZUL - T/M", brand: "", unit: "UNIDAD", price: 19.00 },
    { id: 614, code: "", name: "CAMISA DRILL AZUL - T/L", brand: "", unit: "UNIDAD", price: 19.00 },
    { id: 615, code: "", name: "BOTA RGB-A F/AZUL 36CM C/REF C/LOGO T-39", brand: "SEGUSA", unit: "PAR", price: 105.00 },
    { id: 616, code: "", name: "PANTALON DRILL C/AZUL T/M", brand: "", unit: "UNIDAD", price: 19.00 },
    { id: 617, code: "", name: "ENCAPSULADORA", brand: "", unit: "UNIDAD", price: 850.00 },
    { id: 618, code: "", name: "SOPLADOR DE AIRE 4.5M³ 800W EABR8001", brand: "EMTOP", unit: "UNIDAD", price: 270.00 },
    { id: 619, code: "", name: "LLAVE COMBINADA 5PCS 10-17MM YOZ5S1 LL4C2722U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 24.00 },
    { id: 620, code: "", name: "MANGUERA PLANA AZUL 2\" 100MTRS", brand: "", unit: "UNIDAD", price: 450.00 },
    { id: 621, code: "", name: "YT29 - AGUJA DE AGUA #64", brand: "", unit: "UNIDAD", price: 12.50 },
    { id: 622, code: "", name: "YT29 - O-RING #15", brand: "", unit: "UNIDAD", price: 3.00 },
    { id: 623, code: "", name: "YT29 - CABEZA TRASERA #46", brand: "", unit: "UNIDAD", price: 195.00 },
    { id: 624, code: "", name: "FT160 - KIT DE REPARACION", brand: "", unit: "UNIDAD", price: 58.00 },
    { id: 625, code: "", name: "BROCA DE COBALTO PARA METAL 5/32", brand: "", unit: "UNIDAD", price: 8.00 },
    { id: 626, code: "", name: "BROCA DE COBALTO PARA METAL 3/16", brand: "", unit: "UNIDAD", price: 9.00 },
    { id: 627, code: "", name: "GUANTE DE CUERO C/ROJO SOLDADOR", brand: "ASTARA", unit: "PAR", price: 15.00 },
    { id: 628, code: "", name: "ESCUADRA FALSA PROFESIONAL 8\" 14382", brand: "TRUPER", unit: "UNIDAD", price: 24.00 },
    { id: 629, code: "", name: "AGUJA ARRIERO PUNTA CURVA 5\"", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 630, code: "", name: "CINTURON PORTAHERRAMIENTOS STST511304LA", brand: "STANLEY", unit: "UNIDAD", price: 85.00 },
    { id: 631, code: "", name: "HDPE UNION 1-1/2 PULG (50)", brand: "", unit: "UNIDAD", price: 17.00 },
    { id: 632, code: "", name: "HDPE TEE 1 A 1/2 PULG PN16", brand: "", unit: "UNIDAD", price: 30.00 },
    { id: 633, code: "", name: "CADENA MOTOSIERRA 30''", brand: "", unit: "UNIDAD", price: 120.00 },
    { id: 634, code: "", name: "ESPADA MOTOSIERRA 30''", brand: "", unit: "UNIDAD", price: 160.00 },
    { id: 635, code: "", name: "MOTOSIERRA 30'' C/CADENA ORIGINAL OREGON, DRK-MS381", brand: "DEREK MOTORS", unit: "UNIDAD", price: 950.00 },
    { id: 636, code: "", name: "CANDADO ANTIPALANCA 50MM CUERPO DE LATON LLAVE TRADICIONAL 43355", brand: "HERMEX", unit: "UNIDAD", price: 35.00 },
    { id: 637, code: "", name: "SACO TEJIDO AMARILLO 20X30PULG 87GR.", brand: "", unit: "UNIDAD", price: 1.16 },
    { id: 638, code: "", name: "BOTA RGB-A F/AZUL 36CM C/REF C/LOGO T-43", brand: "SEGUSA", unit: "PAR", price: 100.00 },
    { id: 639, code: "", name: "BOTA RGB-A F/AZUL 36CM C/REF C/LOGO T-44", brand: "SEGUSA", unit: "PAR", price: 100.00 },
    { id: 640, code: "", name: "BOTIN P/ACERO T-42", brand: "", unit: "PAR", price: 85.00 },
    { id: 641, code: "", name: "ACOPLE RAPIDO ESPIGA 1/2'' SAL. CONECTOR NPT MACHO", brand: "", unit: "UNIDAD", price: 12.00 },
    { id: 642, code: "", name: "INSECTOCUTOR TUBO HALOGENO 40W 150M2 - OPALUX", brand: "", unit: "UNIDAD", price: 360.00 },
    { id: 643, code: "", name: "PEDESTAL PARA BIDON DE AGUA", brand: "", unit: "UNIDAD", price: 175.00 },
    { id: 644, code: "", name: "BOMBA SUMERGIBLE A/SUCIA MEBA 1HP 2'' WQD7-10-0.75 MONOF.", brand: "MEBA", unit: "UNIDAD", price: 600.00 },
    { id: 645, code: "", name: "PLASTICO DOBLE CARA (AZUL Y NEGRO) X M3", brand: "", unit: "UNIDAD", price: 7.50 },
    { id: 646, code: "", name: "REGLA DE ALUMINIO PESADA DE 3 1/4\" X 1 1/2\" - PESADA", brand: "", unit: "UNIDAD", price: 135.00 },
    { id: 647, code: "", name: "YT29 - GATILLO #34", brand: "", unit: "UNIDAD", price: 23.00 },
    { id: 648, code: "", name: "YT29 - TUERCA PERNO LATERAL #61", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 649, code: "", name: "YT29 - LUBRICADORA ACRILICA", brand: "", unit: "UNIDAD", price: 68.00 },
    { id: 650, code: "", name: "FT160 - ALMOHADILLA DE RESORTE #16", brand: "", unit: "UNIDAD", price: 0.00 },
    { id: 651, code: "", name: "BROCA SDS MAX 32X920MM", brand: "MAKITA", unit: "UNIDAD", price: 360.00 },
    { id: 652, code: "", name: "BROCA SDS MAX 32X540MM", brand: "MAKITA", unit: "UNIDAD", price: 240.00 },
    { id: 653, code: "", name: "GUANTE BADAN C/AMARILLO - NACIONAL", brand: "", unit: "PAR", price: 6.50 },
    { id: 654, code: "", name: "MANGO DE MADERA #12 P/COMBA 2,3 Y 4LBS", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 655, code: "", name: "CINCEL SDS-MAX PLANO 400MM - DWA0807", brand: "DEWALT", unit: "UNIDAD", price: 45.00 },
    { id: 656, code: "", name: "GALONERA DE PLASTICO X 1 GALON C/TAPA", brand: "", unit: "UNIDAD", price: 8.00 },
    { id: 657, code: "", name: "CARCASA HERMETICA (LUMINARIA) PARA 2 TUBOS LED", brand: "PHILIPS", unit: "UNIDAD", price: 95.00 },
    { id: 658, code: "", name: "ADAPTADOR PARA FILTROS 502", brand: "", unit: "PAR", price: 8.00 },
    { id: 659, code: "", name: "CONECTOR PARA MANGUERA 3/4'' C/VERDE/NARANJO", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 660, code: "", name: "WINCHE DE 3HP MOTOR DELCROSA", brand: "", unit: "UNIDAD", price: 4200.00 },
    { id: 661, code: "", name: "FUSIBLE P/GENERADOR MEB8500", brand: "", unit: "UNIDAD", price: 7.50 },
    { id: 662, code: "", name: "SIERRA CORVINA 36''", brand: "JUPITER", unit: "UNIDAD", price: 130.00 },
    { id: 663, code: "", name: "TABLERO ROYAL 5 POLOS EMPOTRABLE SIST/PUSH RIEL DE METAL A-087", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 20.00 },
    { id: 664, code: "", name: "TABLERO ROYAL 12 POLOS EMPOTRABLE SIST/PUSH BORNERA A TIERRA/RIEL DE METAL A-089", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 35.00 },
    { id: 665, code: "", name: "TABLERO 18 POLOS EMPOTRABLE SIST/PUSH BORNER A TIERR/RIEL METAL A-130", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 50.00 },
    { id: 666, code: "", name: "A-070 GABINETE EXT. TERMICO DIN 1 A 2 POLOS STAR", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 7.00 },
    { id: 667, code: "", name: "A-068 GABINETE EXT. TERMICO DIN 1 A 3 POLOS STAR", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 9.00 },
    { id: 668, code: "", name: "A-069 GABINETE EXT. TERMICO DIN 2 A 5 POLOS STAR", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 14.00 },
    { id: 669, code: "", name: "A-128 GABINETE SOBREPONER PARA TERMICO DIN 6 POLOS", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 16.00 },
    { id: 670, code: "", name: "A-049 GABINETE EXT. TERMICO DIN 2 A 8 POLOS STAR", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 20.00 },
    { id: 671, code: "", name: "A-113 GABINETE EXT. TERMICO DIN 8 A 12 POLOS STAR", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 25.00 },
    { id: 672, code: "", name: "GABINETE 2 POLOS EMPOTRABLE", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 7.00 },
    { id: 673, code: "", name: "CAJA DE PASO 15X15X80 A-080", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 10.00 },
    { id: 674, code: "", name: "CAJA DE PASO 20X20X80 A-081", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 18.00 },
    { id: 675, code: "", name: "CAJA DE PASO 30X30X80 A-096", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 30.00 },
    { id: 676, code: "", name: "TOMACORRIENTE SOBREPONER 4 SERV. 15A L/T A-082", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 28.00 },
    { id: 677, code: "", name: "ENCHUFE SHUKO 16A 220V L/T A-062", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 12.50 },
    { id: 678, code: "", name: "CONECTOR 15A L/T ABRAZ/METAL A-022", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 7.00 },
    { id: 679, code: "", name: "ENCHUFE 15A 2 HILOS ABRAZ/METAL A-025", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 6.00 },
    { id: 680, code: "", name: "ADAPTADOR UNIVERSAL PLANO 16AMP 250V", brand: "", unit: "UNIDAD", price: 3.00 },
    { id: 681, code: "", name: "MANGA LAMINADA BLANCO MATE 4'' C/ OREJA", brand: "", unit: "METRO", price: 2.30 },
    { id: 682, code: "", name: "TAPA CIEGA PVC CIRCULAR", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 683, code: "", name: "PORTALAMPARA PARA CASCO", brand: "", unit: "UNIDAD", price: 9.50 },
    { id: 684, code: "", name: "BANCO DE PLASTICO MOD. REY ATILA PREMIUM", brand: "", unit: "UNIDAD", price: 19.00 },
    { id: 685, code: "", name: "LAVATORIO DE MANOS COMPL. COLOR BLANCO INC. PERNOS Y TARUGOS", brand: "", unit: "UNIDAD", price: 225.00 },
    { id: 686, code: "", name: "PLANCHA ESTRUCTURAL HARDOX500 1.5MTRS X 6MTRS X 1/4 ESPESOR", brand: "", unit: "UNIDAD", price: 1735.00 },
    { id: 687, code: "", name: "PINTURA SPRAY MULTIUSO AZUL FLUORESCENTE", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 688, code: "", name: "FOCO UFO 36 WATTS", brand: "ASHUN", unit: "UNIDAD", price: 20.00 },
    { id: 689, code: "", name: "FOCO TIPO BOTELLA 30 WATTS", brand: "ASHUN", unit: "UNIDAD", price: 16.00 },
    { id: 690, code: "", name: "FOCO TIPO BOTELLA 40 WATTS", brand: "ASHUN", unit: "UNIDAD", price: 20.00 },
    { id: 691, code: "", name: "FOCO TIPO BOTELLA 50 WATTS", brand: "ASHUN", unit: "UNIDAD", price: 24.00 },
    { id: 692, code: "", name: "FOCO UFO 20 WATTS", brand: "PHELIX", unit: "UNIDAD", price: 20.00 },
    { id: 693, code: "", name: "FOCO UFO 30 WATTS", brand: "PHELIX", unit: "UNIDAD", price: 24.00 },
    { id: 694, code: "", name: "FOCO UFO 36 WATTS", brand: "PHELIX", unit: "UNIDAD", price: 27.00 },
    { id: 695, code: "", name: "CABLE DE BATERIA 250AMP ES5580", brand: "AUTOTECH", unit: "UNIDAD", price: 35.00 },
    { id: 696, code: "", name: "SPOT LIGHT - LED EMPOTRABLE P/CJ OCTOGONAL 8W 7000K S1L4446S", brand: "SWIFT", unit: "UNIDAD", price: 12.00 },
    { id: 697, code: "", name: "LAMPARA DE EMERGENCIA LED 2.4W L10E9008S", brand: "SWIFT", unit: "UNIDAD", price: 65.00 },
    { id: 698, code: "", name: "LAMPARA DE EMERGENCIA LED 3W AC100-240V L12E9929S", brand: "SWIFT", unit: "UNIDAD", price: 85.00 },
    { id: 699, code: "", name: "REFLECTOR LED PORTATIL RECARGABLE 10W 800LM RL14PR566S", brand: "SWIFT", unit: "UNIDAD", price: 95.00 },
    { id: 700, code: "", name: "FOCO LED ADOSABLE 15 WATTS - REDONDO - 160X160X28MM", brand: "DARLUZ", unit: "UNIDAD", price: 20.00 },
    { id: 701, code: "", name: "FOCO LED ADOSABLE 15 WATTS - REDONDO - 170X170X30MM", brand: "DARLUZ", unit: "UNIDAD", price: 20.00 },
    { id: 702, code: "", name: "EQUIPO LED 36 WATTS BLANCO LECHOZO", brand: "DARLUZ", unit: "UNIDAD", price: 22.00 },
    { id: 703, code: "", name: "EQUIPO LED 36 WATTS BLANCO RELIEVE", brand: "DARLUZ", unit: "UNIDAD", price: 22.00 },
    { id: 704, code: "", name: "EQUIPO LED 36 WATTS BLANCO TRANSPARENTE", brand: "DARLUZ", unit: "UNIDAD", price: 22.00 },
    { id: 705, code: "", name: "REFLECTOR LED 150W ULTRADELGADO LUZ DIA FU1741", brand: "FULGORE", unit: "UNIDAD", price: 160.00 },
    { id: 706, code: "", name: "REFLECTOR LED 200W ULTRADELGADO LUZ DIA FU1742", brand: "FULGORE", unit: "UNIDAD", price: 200.00 },
    { id: 707, code: "", name: "SUPRESOR DE PICOS 6 TOMAS 1.5 METROS ATRR 220V C/BLANCO", brand: "FULGORE", unit: "UNIDAD", price: 20.00 },
    { id: 708, code: "", name: "SUPRESOR DE PICOS 6 TOMAS 3 METROS ATRR 220V C/BLANCO", brand: "FULGORE", unit: "UNIDAD", price: 25.00 },
    { id: 709, code: "", name: "EXTENSION ELECTRICA NARANJA 10 METROS USO RUDO", brand: "FULGORE", unit: "UNIDAD", price: 28.00 },
    { id: 710, code: "", name: "EXTENSION ELECTRICA NARANJA 15 METROS USO RUDO", brand: "FULGORE", unit: "UNIDAD", price: 35.00 },
    { id: 711, code: "", name: "EXTENSION 3 METROS AMARILLA VULC", brand: "ARLED", unit: "UNIDAD", price: 15.00 },
    { id: 712, code: "", name: "EXTENSION 10 METROS AMARILLA VULC", brand: "ARLED", unit: "UNIDAD", price: 26.00 },
    { id: 713, code: "", name: "EXTENSION 15 METROS AMARILLA VULC", brand: "ARLED", unit: "UNIDAD", price: 35.00 },
    { id: 714, code: "", name: "EXTENSION 20 METROS AMARILLA VULC", brand: "ARLED", unit: "UNIDAD", price: 40.00 },
    { id: 715, code: "", name: "TOMACORRIENTE DOBLE C/LINEA A TIERRA VISIBLE", brand: "ARLED", unit: "UNIDAD", price: 9.00 },
    { id: 716, code: "", name: "TOMA COAXIAL RG6", brand: "ARLED", unit: "UNIDAD", price: 8.00 },
    { id: 717, code: "", name: "INTERRUPTOR DOBLE SENCIA EMP", brand: "BTICINO", unit: "UNIDAD", price: 10.00 },
    { id: 718, code: "", name: "TOMACORRIENTE SIMPLE SENCIA EMP", brand: "BTICINO", unit: "UNIDAD", price: 8.00 },
    { id: 719, code: "", name: "TOMA MIXTO SENCIA EMP (1 INTERRUPTOR + 1 TOMACORRIENTE)", brand: "BTICINO", unit: "UNIDAD", price: 10.00 },
    { id: 720, code: "", name: "TOMACORRIENTE TRIPLE SENCIA EMP", brand: "BTICINO", unit: "UNIDAD", price: 12.00 },
    { id: 721, code: "", name: "TOMACORRIENTE DOBLE C/LINEA A TIERRA VISIBLE", brand: "BTICINO", unit: "UNIDAD", price: 10.00 },
    { id: 722, code: "", name: "TOMACORRIENTE TRIPLE VISIBLE", brand: "BTICINO", unit: "UNIDAD", price: 10.00 },
    { id: 723, code: "", name: "LLAVE TERMICA MON 2X25 AMP", brand: "BTICINO", unit: "UNIDAD", price: 30.00 },
    { id: 724, code: "", name: "LLAVE TERMICA MON 2X63 AMP", brand: "BTICINO", unit: "UNIDAD", price: 35.00 },
    { id: 725, code: "", name: "NO USAR", brand: "BTICINO", unit: "UNIDAD", price: 55.00 },
    { id: 726, code: "", name: "INTERRUPTOR DIFERENCIAL 25 AMP", brand: "BTICINO", unit: "UNIDAD", price: 55.00 },
    { id: 727, code: "", name: "INTERRUPTOR DIFERENCIAL 32 AMP", brand: "BTICINO", unit: "UNIDAD", price: 55.00 },
    { id: 728, code: "", name: "INTERRUPTOR DIFERENCIAL 40 AMP", brand: "BTICINO", unit: "UNIDAD", price: 55.00 },
    { id: 729, code: "", name: "SOCKET PLANO", brand: "BTICINO", unit: "UNIDAD", price: 6.00 },
    { id: 730, code: "", name: "SOCKET OVAL", brand: "BTICINO", unit: "UNIDAD", price: 6.00 },
    { id: 731, code: "", name: "INTERRUPTOR TERMOMAGNETICO EASY9 2X16A - EZ9F56216", brand: "SCHNEIDER", unit: "UNIDAD", price: 40.00 },
    { id: 732, code: "", name: "INTERRUPTOR TERMOMAGNETICO EASY9 2X25A - EZ9F56225", brand: "SCHNEIDER", unit: "UNIDAD", price: 40.00 },
    { id: 733, code: "", name: "ENCHUFE SCHUKO RECTO MACHO C/BLANCO 16A 250V P/GENERADOR", brand: "", unit: "UNIDAD", price: 30.00 },
    { id: 734, code: "", name: "ENCHUFE DE BLOQUEO 2X30A+T 250V NEMA L6-30 C/NEGRO P/GENERADOR", brand: "", unit: "UNIDAD", price: 60.00 },
    { id: 735, code: "", name: "DESARMADOR DE CRUZ 1/4X6\" MANGO DE PVC 21477", brand: "PRETUL", unit: "UNIDAD", price: 7.50 },
    { id: 736, code: "", name: "LLAVE COMBINADA 16MM FULL-P YOV616 LL0C8974F", brand: "FERRAWYY", unit: "UNIDAD", price: 10.00 },
    { id: 737, code: "", name: "ENCHUFE DE BLOQUEO 2X20A+T 4400V L6-20 C/NEGRO Y AMARILLO", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 738, code: "", name: "LINTERNA RECARGABLE No.826 LED 15 LNR826-L L2R9606U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 20.00 },
    { id: 739, code: "", name: "LAMPARA DE TRABAJO PORTATIL 5MTS C/VERDE", brand: "PARACASA", unit: "UNIDAD", price: 30.00 },
    { id: 740, code: "", name: "PINZA AMPERIMETRICA C/BUZZER DCV 600V ACV 450V, DT87", brand: "SAMWIN", unit: "UNIDAD", price: 55.00 },
    { id: 741, code: "", name: "MULTITESTER DIGITAL PROFESIONAL 100360", brand: "TRUPER", unit: "UNIDAD", price: 105.00 },
    { id: 742, code: "", name: "WINCHA PASACABLE 5 MTRS NYLO", brand: "FLEXIBLEC", unit: "UNIDAD", price: 12.00 },
    { id: 743, code: "", name: "WINCHA PASACABLE 10 MTRS NYLO", brand: "FLEXIBLEC", unit: "UNIDAD", price: 15.00 },
    { id: 744, code: "", name: "WINCHA PASACABLE 15 MTRS NYLO", brand: "FLEXIBLEC", unit: "UNIDAD", price: 20.00 },
    { id: 745, code: "", name: "WINCHA PASACABLE 20 MTRS NYLO", brand: "FLEXIBLEC", unit: "UNIDAD", price: 25.00 },
    { id: 746, code: "", name: "WINCHA PASACABLE 25 MTRS NYLO", brand: "FLEXIBLEC", unit: "UNIDAD", price: 32.00 },
    { id: 747, code: "", name: "EXTRACTOR AIRE T/CARACOL 1HP", brand: "", unit: "UNIDAD", price: 780.00 },
    { id: 748, code: "", name: "CHOTANA 6 PIES", brand: "", unit: "UNIDAD", price: 36.00 },
    { id: 749, code: "", name: "CABEZA DE PICO 5 LIBRAS 41004 C/MANGO MADERA", brand: "ULTRACRAFT", unit: "UNIDAD", price: 35.00 },
    { id: 750, code: "", name: "ACEITERA DE 300ML (10OZ) CON APLICADOR FLEXIBLE 14872", brand: "TRUPER", unit: "UNIDAD", price: 18.00 },
    { id: 751, code: "", name: "BROCHA EPBH15702", brand: "EMTOP", unit: "UNIDAD", price: 4.00 },
    { id: 752, code: "", name: "PINCEL PLANO N°6", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 753, code: "", name: "JUEGO DE 5 PUNTAS MONTADAS ZANCO 1/4'', ALTO RENDIMIENTO 12444", brand: "TRUPER", unit: "UNIDAD", price: 22.00 },
    { id: 754, code: "", name: "LIJA AL AGUA #800", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 755, code: "", name: "PARCHE PARA CAMARA DE AIRE R-01 VIPAL CAJA/100UN", brand: "", unit: "UNIDAD", price: 65.00 },
    { id: 756, code: "", name: "PEGAMENTO BV-03 VIPAL", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 757, code: "", name: "LUBRICADORA YT24", brand: "", unit: "UNIDAD", price: 90.00 },
    { id: 758, code: "", name: "ACEITERA FLEXIBLE ACEF-500 14874", brand: "TRUPER", unit: "UNIDAD", price: 18.00 },
    { id: 759, code: "", name: "EXTRACTOR DE AIRE DE 1HP - FABRICA", brand: "", unit: "UNIDAD", price: 650.00 },
    { id: 760, code: "", name: "CAJA DE PASO RECTANGULAR 4X2\" PVC", brand: "", unit: "UNIDAD", price: 1.80 },
    { id: 761, code: "", name: "CAJA DE PASO OCTOGONAL PVC", brand: "", unit: "UNIDAD", price: 2.00 },
    { id: 762, code: "", name: "MANGUERA 3/4\" PARA AGUA", brand: "", unit: "METRO", price: 1.30 },
    { id: 763, code: "", name: "BROCA DE CONCRETO 3/8\"", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 764, code: "", name: "SOLDADORA INVERSORA MAQUINA DE SOLDAR 200A-220V", brand: "TRUPER", unit: "UNIDAD", price: 850.00 },
    { id: 765, code: "", name: "RODILLERA Y CODERA PROBIKER ALUMINIO", brand: "", unit: "UNIDAD", price: 198.00 },
    { id: 766, code: "", name: "COMBA 6 LBS CON MANGO DE MADERA 14''", brand: "", unit: "UNIDAD", price: 55.00 },
    { id: 767, code: "", name: "ROTOMARTILLO PERFORADOR 5J 1250W DRK-RH3032", brand: "DEREK TOOLS", unit: "UNIDAD", price: 450.00 },
    { id: 768, code: "", name: "MARTILLO DEMOLEDOR 1700W D25911K-B2", brand: "DEWALT", unit: "UNIDAD", price: 2599.00 },
    { id: 769, code: "", name: "TABLERO 8 POLOS EMPOTRABLE SIST/PUSH BORNER A TIERR/RIEL METAL A-048", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 24.00 },
    { id: 770, code: "", name: "MANGO DE MADERA PARA PICO Y ZAPAPICO", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 771, code: "", name: "GRASA MP RED (BALDE/35LB)", brand: "CAM2", unit: "UNIDAD", price: 215.00 },
    { id: 772, code: "", name: "LIMA PARA MOTOSIERRA 3/16''", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 773, code: "", name: "CABLE VULCANIZADO NLT 2X14 AWG - ROLLO/100MTS", brand: "BRANDE", unit: "UNIDAD", price: 350.00 },
    { id: 774, code: "", name: "BARRETILLA DIABLO CORRUGADO 1'' X 90CM (SACA CLAVOS)", brand: "", unit: "UNIDAD", price: 27.00 },
    { id: 775, code: "", name: "POLO PLOMO MANGA LARGA - T/L", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 776, code: "", name: "POLO PLOMO MANGA LARGA - T/XL", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 777, code: "", name: "MARTILLO PERFORADOR SDS MAX BOSCH AVT 1700W, 19J, GBH 12-52 DV", brand: "BOSCH", unit: "UNIDAD", price: 2800.00 },
    { id: 778, code: "", name: "SACO TEJIDO MINERO GRANDE C/A 21.5X39 PULG", brand: "", unit: "UNIDAD", price: 1.51 },
    { id: 779, code: "", name: "BROCA P/CONCRETO SDS-PLUS - 5X - 7.9MM 5/16''X6''X8''", brand: "BOSCH", unit: "UNIDAD", price: 45.00 },
    { id: 780, code: "", name: "DISCO FLAP 4\" AZUL GR 80", brand: "UYUSTOOLS", unit: "UNIDAD", price: 6.00 },
    { id: 781, code: "", name: "DISCO FLAP 7\" AZUL GR 60", brand: "UYUSTOOLS", unit: "UNIDAD", price: 0.00 },
    { id: 782, code: "", name: "POLO PLOMO MANGA LARGA 30/1 TALLA M", brand: "", unit: "UNIDAD", price: 11.00 },
    { id: 783, code: "", name: "NIPLE 1PULG X 3", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 784, code: "", name: "NIPLE 1/2PULG X 2.5", brand: "", unit: "UNIDAD", price: 8.00 },
    { id: 785, code: "", name: "GRAMPA CROSBY 1/2''", brand: "", unit: "UNIDAD", price: 9.00 },
    { id: 786, code: "", name: "GRAMPA CROSBY 3/4''", brand: "", unit: "UNIDAD", price: 7.00 },
    { id: 787, code: "", name: "GRAMPA CROSBY 5/8''", brand: "", unit: "UNIDAD", price: 14.00 },
    { id: 788, code: "", name: "MOTOSIERRA 24'' C/CADENA ORIGINAL OREGON, DRK-5800", brand: "DEREK MOTORS", unit: "UNIDAD", price: 420.00 },
    { id: 789, code: "", name: "GUANTES BADANA C/AMARILLO", brand: "SPRO", unit: "PAR", price: 7.92 },
    { id: 790, code: "", name: "ROCIADOR DE PINTURA 800ML 20 VOLTIOS - 2.0 AH (LI-ION) ELSG20250", brand: "EMTOP", unit: "UNIDAD", price: 310.00 },
    { id: 791, code: "", name: "PISTOLA PARA PINTAR ELECTRICA 450W", brand: "INGCO", unit: "UNIDAD", price: 150.00 },
    { id: 792, code: "", name: "PINTURA SPRAY C/ROJO 400ML", brand: "TEKBOND", unit: "UNIDAD", price: 5.00 },
    { id: 793, code: "", name: "GENERADOR GASOLINERO 1500W JSU1500-C", brand: "KAZO", unit: "UNIDAD", price: 1100.00 },
    { id: 794, code: "", name: "GENERADOR GASOLINERO MEBA 6500 MONOF 13HP 220V A/MANUAL", brand: "MEBA", unit: "UNIDAD", price: 2900.00 },
    { id: 795, code: "", name: "GENERADOR DIESEL MEBA D8500SPE-UG", brand: "MEBA", unit: "UNIDAD", price: 4300.00 },
    { id: 796, code: "", name: "MARTILLO DEMOLEDOR BOSCH GSH 11E 1500W", brand: "BOSCH", unit: "UNIDAD", price: 2300.00 },
    { id: 797, code: "", name: "CINCEL DE PUNTA SDS-MAX 400MM", brand: "BOSCH", unit: "UNIDAD", price: 45.00 },
    { id: 798, code: "", name: "BROCA SDS-MAX 32x450/570MM", brand: "BOSCH", unit: "UNIDAD", price: 230.00 },
    { id: 799, code: "", name: "BROCA SDS-MAX 32x800/920MM", brand: "BOSCH", unit: "UNIDAD", price: 355.00 },
    { id: 800, code: "", name: "HILO CANUTO GRANDE COLOR AZUL MARINO", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 801, code: "", name: "RED DE PESCAR 3MTS", brand: "", unit: "UNIDAD", price: 16.00 },
    { id: 802, code: "", name: "ELECTRODO 4043 DE 1/8 - PARA ALUMINIO", brand: "", unit: "KILOGRAMOS", price: 235.00 },
    { id: 803, code: "", name: "ELECTRODO NIQUEL 100 DE 1/8 - PARA METAL FUNDIDO", brand: "", unit: "KILOGRAMOS", price: 415.00 },
    { id: 804, code: "", name: "POLEA DE CARGA 1T PL001U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 75.00 },
    { id: 805, code: "", name: "LIQUIDO PARA FRENOS - DOT4 12OZ/355ML - FRENOSA", brand: "", unit: "UNIDAD", price: 17.00 },
    { id: 806, code: "", name: "ABRAZADERA DOBLE PERNO 5/8 PULG SL", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 807, code: "", name: "PRENSA TIPO C NODULAR 6\"", brand: "KAMASA", unit: "UNIDAD", price: 25.00 },
    { id: 808, code: "", name: "BROCA CARBURO DE TUNGSTENO SF-5DC 12-25-70-6", brand: "", unit: "UNIDAD", price: 53.00 },
    { id: 809, code: "", name: "KIT DE COMUNICACION (AMPLIFICADOR, CABLE, PARLANTE Y MICROFONO)", brand: "", unit: "UNIDAD", price: 1770.00 },
    { id: 810, code: "", name: "PARCHE PARA LLANTA R04 | 80MM - VIPAL", brand: "", unit: "UNIDAD", price: 2.00 },
    { id: 811, code: "", name: "BROCA SDS PLUS 1/2'' PARA CONCRETO 11279", brand: "TRUPER", unit: "UNIDAD", price: 17.50 },
    { id: 812, code: "", name: "CABLE THW 14 C/NEGRO - ROLLO/100MTS", brand: "BRANDE", unit: "UNIDAD", price: 140.00 },
    { id: 813, code: "", name: "INTERRUPTOR MIXTO SENCIA EMP", brand: "", unit: "UNIDAD", price: 9.00 },
    { id: 814, code: "", name: "TOMACORRIENTE MIXTO SENCIA EMP", brand: "", unit: "UNIDAD", price: 9.00 },
    { id: 815, code: "", name: "YT29 - AGUJA DE AIRE #63", brand: "", unit: "UNIDAD", price: 12.50 },
    { id: 816, code: "", name: "ASPERSOR PLASTICO PARA JARDIN", brand: "", unit: "UNIDAD", price: 16.50 },
    { id: 817, code: "", name: "ALAMBRE DE PUA ANDINO 200M 0.5CM DIAMETRO", brand: "", unit: "UNIDAD", price: 72.00 },
    { id: 818, code: "", name: "ARPILLERA POLIPROPILENO NEGRA 1.5-3 MTRS 85GR 200MTRS", brand: "", unit: "UNIDAD", price: 800.00 },
    { id: 819, code: "", name: "SELLADOR DE JUNTAS DE PISOS Y PAREDES 300ML COD415 SIKAFLEX", brand: "SIKA", unit: "UNIDAD", price: 29.00 },
    { id: 820, code: "", name: "MICRÓFONO DINÁMICO PROFESIONAL MICRÓFONO CON CABLE VOCAL UNIDIRECCIONAL", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 821, code: "", name: "HYDROFLUID SPECIAL AW ISO68 BALDE 5GL", brand: "CAM2", unit: "UNIDAD", price: 240.00 },
    { id: 822, code: "", name: "HIDRAULAN H68 V0073 BALDE 5GAL", brand: "VISTONY", unit: "UNIDAD", price: 230.00 },
    { id: 823, code: "", name: "CABLE AUTOPORTANTE DE ALUMINIO FORRADO 2X25", brand: "", unit: "METRO", price: 6.50 },
    { id: 824, code: "", name: "JUEGO DE CINCELES SDS-PLUS PUNTA Y PLANO BCT201 J1C8561U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 18.00 },
    { id: 825, code: "", name: "CALIBRADOR VERNIER ANALOGICO 6'' ACERO INOX, STD Y MM, CAL-6MP 14394", brand: "TRUPER", unit: "UNIDAD", price: 95.00 },
    { id: 826, code: "", name: "ARCO SIERRA 12'' A2S499K", brand: "KAMASA", unit: "UNIDAD", price: 18.00 },
    { id: 827, code: "", name: "YT29 - PASADOR ELASTICO #35", brand: "", unit: "UNIDAD", price: 2.70 },
    { id: 828, code: "", name: "YT29 - KIT CAJA VALVULA | PECHO #51 | VALVULA #52 | MANGA#53", brand: "", unit: "UNIDAD", price: 180.00 },
    { id: 829, code: "", name: "YT29 - PISTON #60", brand: "", unit: "UNIDAD", price: 130.00 },
    { id: 830, code: "", name: "YT29 - SELLO #44", brand: "", unit: "UNIDAD", price: 4.00 },
    { id: 831, code: "", name: "PUNTAS DE CRUZ PH2 LARGO 2'' 12147", brand: "TRUPER", unit: "UNIDAD", price: 6.00 },
    { id: 832, code: "", name: "TUBO PVC 315MM S-25 UF X 6MTRS", brand: "", unit: "UNIDAD", price: 470.00 },
    { id: 833, code: "", name: "LLAVE STILSON 36'' M/PVC YSP036 LL23S4779U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 110.00 },
    { id: 834, code: "", name: "LLAVE STILSON 24'' CUERPO ROBUSTO DE HIERRO DUCTIL 15840", brand: "TRUPER", unit: "UNIDAD", price: 135.00 },
    { id: 835, code: "", name: "LLAVE FRANCESA 15'' YFU15K LL11F6584U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 65.00 },
    { id: 836, code: "", name: "LLAVE FRANCESA 10'' CROMADA MANGO DE PVC 15511", brand: "TRUPER", unit: "UNIDAD", price: 35.00 },
    { id: 837, code: "", name: "LLAVE FRANCESA 8''/200MM", brand: "WISEUP", unit: "UNIDAD", price: 22.00 },
    { id: 838, code: "", name: "MASCARILLA KN95", brand: "CLUTE", unit: "UNIDAD", price: 1.50 },
    { id: 839, code: "", name: "BROCA RIMADORA 64MM 7/8\" 14 BOTONES", brand: "", unit: "UNIDAD", price: 450.00 },
    { id: 840, code: "", name: "BROCA SDS MAX 32X920;540MM", brand: "KULKONI", unit: "UNIDAD", price: 650.00 },
    { id: 841, code: "", name: "COMBA 10 LIBRAS MANGO MADERA", brand: "HERRAGRO", unit: "UNIDAD", price: 80.00 },
    { id: 842, code: "", name: "COMBA 4LB. C/MANGO", brand: "PARACASA", unit: "UNIDAD", price: 35.00 },
    { id: 843, code: "", name: "COMBA 6LB. C/MANGO", brand: "PARACASA", unit: "UNIDAD", price: 40.00 },
    { id: 844, code: "", name: "COMBA 8LB. C/MANGO", brand: "PARACASA", unit: "UNIDAD", price: 50.00 },
    { id: 845, code: "", name: "COMBA 12LB. C/MANGO", brand: "PARACASA", unit: "UNIDAD", price: 70.00 },
    { id: 846, code: "", name: "PALA 72.5X15.2CM", brand: "PARACASA", unit: "UNIDAD", price: 21.00 },
    { id: 847, code: "", name: "CABLE VULCANIZADO NMT-PC (SJT-0) 3X12 AWG - ROLLO/100MTRS C223V622IN", brand: "INDECO", unit: "UNIDAD", price: 970.00 },
    { id: 848, code: "", name: "ZAPATO P/ACERO NACIONAL T-39", brand: "", unit: "UNIDAD", price: 29.00 },
    { id: 849, code: "", name: "APLICADOR DE SILICONA REFORZADO 101280", brand: "TRUPER", unit: "UNIDAD", price: 24.00 },
    { id: 850, code: "", name: "CINTA DE EMBALAJE C/TRANSPARENTE", brand: "", unit: "UNIDAD", price: 7.00 },
    { id: 851, code: "", name: "[D25773K-K1] ROTOMARTILLO SDS MAX 1700W", brand: "DEWALT", unit: "UNIDAD", price: 2148.00 },
    { id: 852, code: "", name: "LAMPARA INALAMBRICA 4A", brand: "WISDOM", unit: "UNIDAD", price: 312.00 },
    { id: 853, code: "", name: "SOLDADURA SUPERCITO 1/8'' (7018)", brand: "", unit: "KILOGRAMOS", price: 17.00 },
    { id: 854, code: "", name: "SILICONA AUTOMOTRIZ GRIS 999", brand: "", unit: "UNIDAD", price: 14.50 },
    { id: 855, code: "", name: "BOMBA DE AGUA PARA MOTOR PETROLERO", brand: "", unit: "UNIDAD", price: 120.00 },
    { id: 856, code: "", name: "GUANTES DIELECTRICOS T-L", brand: "", unit: "PAR", price: 185.00 },
    { id: 857, code: "", name: "GUANTES DIELECTRICOS T-XL", brand: "", unit: "PAR", price: 185.00 },
    { id: 858, code: "", name: "NIPLE HEMBRA GALV. C/ROSCA 2''", brand: "", unit: "UNIDAD", price: 20.00 },
    { id: 859, code: "", name: "PLASTICO DOBLE CARA 3-6 MTRS", brand: "", unit: "ROLLO", price: 455.00 },
    { id: 860, code: "", name: "WINCHE ELECTRICO RAPIDO 100MTRS MONOFASICO", brand: "", unit: "UNIDAD", price: 1950.00 },
    { id: 861, code: "", name: "MAMELUCO TERMICO C/REFLECTIVA C/AZUL T-M", brand: "", unit: "UNIDAD", price: 150.00 },
    { id: 862, code: "", name: "BARRA CONICA 3 PIES T/AZUL", brand: "", unit: "UNIDAD", price: 160.00 },
    { id: 863, code: "", name: "BROCA SDS MAX 32X920MM", brand: "HARBO", unit: "UNIDAD", price: 450.00 },
    { id: 864, code: "", name: "BROCA SDS MAX 32X540MM", brand: "HARBO", unit: "UNIDAD", price: 290.00 },
    { id: 865, code: "", name: "EXTRACTOR AXIAL IMP 0.5HP", brand: "", unit: "UNIDAD", price: 650.00 },
    { id: 866, code: "", name: "EXTRACTOR AXIAL IMP 1HP", brand: "", unit: "UNIDAD", price: 750.00 },
    { id: 867, code: "", name: "EXTRACTOR AXIAL IMP 2HP", brand: "", unit: "UNIDAD", price: 850.00 },
    { id: 868, code: "", name: "CABLE VULCANIZADO NLT-PC 3X14 100MTRS", brand: "INDECO", unit: "UNIDAD", price: 689.00 },
    { id: 869, code: "", name: "CABLE VULCANIZADO NMT 2X14 AWG 100MTRS", brand: "INDECO", unit: "UNIDAD", price: 929.00 },
    { id: 870, code: "", name: "GUANTE ANTICORTE NIVEL 5 PALMA DE NITRILO T/8 PU CUT5", brand: "", unit: "PAR", price: 9.50 },
    { id: 871, code: "", name: "GUANTE ANTICORTE NIVEL 5 PALMA DE NITRILO T/9 PU CUT5", brand: "", unit: "PAR", price: 9.50 },
    { id: 872, code: "", name: "VIDRIO TRANSPARENTE PARA MASCARA DE SOLDAR", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 873, code: "", name: "CODO DE 1'' SOLDABLE", brand: "", unit: "UNIDAD", price: 9.00 },
    { id: 874, code: "", name: "LIMPIADOR DE CONTACTOS WD-40, 9.6 OZ", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 875, code: "", name: "NIPLE DE FIERRO GALVANIZADO DE 1'' X 3''", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 876, code: "", name: "BOTA CAMPERA MARCA WELLCO PERUANA T-41 595PU", brand: "", unit: "PAR", price: 280.00 },
    { id: 877, code: "", name: "ESCUADRA 12'', ALUMINIO P/MURO DE YESO 15132", brand: "TRUPER", unit: "UNIDAD", price: 70.00 },
    { id: 878, code: "", name: "MALLA GALVANIZADA 1/8'' X 30MTRS", brand: "", unit: "ROLLO", price: 150.00 },
    { id: 879, code: "", name: "VIBRADORA DE CONCRETO A GASOLINA 6.5HP INC. MANGUERA", brand: "", unit: "UNIDAD", price: 1150.00 },
    { id: 880, code: "", name: "BISAGRA DE ACERO NEGRO 3\"X3\"X3\"", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 881, code: "", name: "CHALECO MULTIBOLSILLO T/M", brand: "", unit: "UNIDAD", price: 44.00 },
    { id: 882, code: "", name: "CHALECO MULTIBOLSILLO T/L", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 883, code: "", name: "CINTA ADHESIVA MULTIUSOS PARA DUCTOS TAPE 1.88X10YD", brand: "3M", unit: "UNIDAD", price: 15.00 },
    { id: 884, code: "", name: "SOLDADURA SUPERCITO 3/32\" E7018 KG", brand: "", unit: "UNIDAD", price: 19.00 },
    { id: 885, code: "", name: "FAJA CONECTORA DE ANCLAJE 3' (0.9M)", brand: "3M", unit: "UNIDAD", price: 240.00 },
    { id: 886, code: "", name: "HDPE TEE REDUCCION 4\" A 2\"", brand: "", unit: "UNIDAD", price: 135.00 },
    { id: 887, code: "", name: "CLAVO D/CABEZA 5\"", brand: "", unit: "UNIDAD", price: 5.50 },
    { id: 888, code: "", name: "YT29 - GLANDULA DE AGUA COMPLETA #41 (14;36;37;38;40;41;42;43;44;45)", brand: "", unit: "UNIDAD", price: 51.00 },
    { id: 889, code: "", name: "YT29 - PASADOR #50", brand: "", unit: "UNIDAD", price: 30.00 },
    { id: 890, code: "", name: "FT160 - TAPA CONTRA POLVO #30", brand: "", unit: "UNIDAD", price: 4.80 },
    { id: 891, code: "", name: "FT160 - TOMA DE TUBO INFERIOR #17", brand: "", unit: "UNIDAD", price: 43.00 },
    { id: 892, code: "", name: "FT160 - TUBERIA EXTERIOR #21", brand: "", unit: "UNIDAD", price: 185.00 },
    { id: 893, code: "", name: "FT160 - TUERCA DE BLOQUEO #1", brand: "", unit: "UNIDAD", price: 6.80 },
    { id: 894, code: "", name: "BARRA CONICA 5 PIES T/AZUL", brand: "", unit: "UNIDAD", price: 250.00 },
    { id: 895, code: "", name: "ENCHUFE PARA MOTOR COLOR BLANCO", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 896, code: "", name: "BALANZA ELECTRONICA 150KG", brand: "", unit: "UNIDAD", price: 155.00 },
    { id: 897, code: "", name: "MARTILLO DEMOLEDOR 1100W GSH500", brand: "BOSCH", unit: "UNIDAD", price: 1200.00 },
    { id: 898, code: "", name: "JUEGO METALES PARA MOTOR JD 35HP", brand: "", unit: "UNIDAD", price: 65.00 },
    { id: 899, code: "", name: "ESMERIL DE BANCO 8'' 1HP WLK-200", brand: "WELKER", unit: "UNIDAD", price: 200.00 },
    { id: 900, code: "", name: "MANTA C/NEGRO 3-6 MTRS XMETRO", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 901, code: "", name: "PLASTICO DOBLE CARA 3-6 MTRS XMETRO", brand: "", unit: "UNIDAD", price: 9.00 },
    { id: 902, code: "", name: "PINTURA EN SPRAY ROJO BRILLANTE", brand: "C&A", unit: "UNIDAD", price: 8.00 },
    { id: 903, code: "", name: "TALADRO 1/2'' 500W 220V", brand: "WOLFOX", unit: "UNIDAD", price: 115.00 },
    { id: 904, code: "", name: "GUANTE DE NITRON ECONITRON M360 PAR", brand: "DOOLPRO", unit: "UNIDAD", price: 7.00 },
    { id: 905, code: "", name: "LAMPARA MINERA KJ3.5LM C/CARGADOR", brand: "DOOLPRO", unit: "UNIDAD", price: 95.00 },
    { id: 906, code: "", name: "CAMARA 550|600|650-14", brand: "", unit: "UNIDAD", price: 75.00 },
    { id: 907, code: "", name: "LLANTA | CAMARA 600-14", brand: "", unit: "UNIDAD", price: 400.00 },
    { id: 908, code: "", name: "LLANTA | CAMARA 500-14", brand: "", unit: "UNIDAD", price: 400.00 },
    { id: 909, code: "", name: "LAMPARA MINERA KL8M C/CARGADOR DE LAMPARA MINERA NWB (KL5M/KL8/KL12)", brand: "WISDOM", unit: "UNIDAD", price: 320.00 },
    { id: 910, code: "", name: "FUNDA PARA TV 65 PULG", brand: "", unit: "UNIDAD", price: 105.00 },
    { id: 911, code: "", name: "FUNDA PARA TV 55 PULG", brand: "", unit: "UNIDAD", price: 105.00 },
    { id: 912, code: "", name: "FUNDA PARA PC", brand: "", unit: "UNIDAD", price: 25.00 },
    { id: 913, code: "", name: "REPELENTE PARA ZANCUDOS Y MOSQUITOS - SACHET 10G C/TAPA", brand: "", unit: "UNIDAD", price: 2.30 },
    { id: 914, code: "", name: "CINTA COLGANTE P/FOTOSHECK VERDE", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 915, code: "", name: "VARILLA FIERRO CORRUGADO 1/4'' X 9MTRS", brand: "", unit: "UNIDAD", price: 9.60 },
    { id: 916, code: "", name: "CORRECTOR PUNTA METALICA TIPO LAPICERO", brand: "", unit: "UNIDAD", price: 2.50 },
    { id: 917, code: "", name: "FILTRO 7093B PARA PARTICULAS P100", brand: "3M", unit: "PAR", price: 35.00 },
    { id: 918, code: "", name: "SOBRELENTES DE SEGURIDAD OX1000 LUNA CLARA", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 919, code: "", name: "YT29A - MARTILLO PERFORADOR NEUMATICO", brand: "SHENYANG", unit: "UNIDAD", price: 2000.00 },
    { id: 920, code: "", name: "PONCHO IMPERMEABLE PARA AGUA PVC C/AMARILLO TALLA: L", brand: "", unit: "UNIDAD", price: 19.50 },
    { id: 921, code: "", name: "EXTENSION 50MTRS REFORZADA", brand: "", unit: "UNIDAD", price: 130.00 },
    { id: 922, code: "", name: "WINCHE TRIFASICO 300KG | MOTOREDUCTOR DELCROSA|", brand: "", unit: "UNIDAD", price: 5200.00 },
    { id: 923, code: "", name: "HDPE MANGUERA 4 PULG PN12.5", brand: "", unit: "ROLLO", price: 1750.00 },
    { id: 924, code: "", name: "PICO 5LB C/MANGO MADERA", brand: "", unit: "UNIDAD", price: 25.00 },
    { id: 925, code: "", name: "GARRA ESCAMADA/ESPIGA 1 PULG", brand: "", unit: "UNIDAD", price: 13.00 },
    { id: 926, code: "", name: "GARRA HEMBRA 1 PULG", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 927, code: "", name: "GARRA MACHO 1 PULG", brand: "", unit: "UNIDAD", price: 15.00 },
    { id: 928, code: "", name: "GAMARRILLA 2 PULG C/RED 1 PULG | VALVULA 2 PULG | NIPLE MIXTO 2 PULG | BUSHING 2 PULG HILO A 1 PULG ESCAMA|", brand: "", unit: "UNIDAD", price: 185.00 },
    { id: 929, code: "", name: "PALANA PEQ. CUCHARA T/JARDINERO 45CM", brand: "PARACASA", unit: "UNIDAD", price: 15.00 },
    { id: 930, code: "", name: "MANGUERA AIRE 1 PULG F/ROJA JEBE/LONA 300PSI", brand: "", unit: "METRO", price: 10.00 },
    { id: 931, code: "", name: "ALICATE UNIVERSAL 8'' AM/NEG KM001", brand: "KAMASA", unit: "UNIDAD", price: 18.00 },
    { id: 932, code: "", name: "JUEGO DE DESARMADOR GOLPE M/AZUL X4PCS KM948", brand: "KAMASA", unit: "UNIDAD", price: 25.00 },
    { id: 933, code: "", name: "MINI DESARMADOR CON 30 PUNTAS KM1036", brand: "KAMASA", unit: "UNIDAD", price: 24.00 },
    { id: 934, code: "", name: "LIMA PARA MOTOSIERRA 5/32'' X 8'' KM1836", brand: "KAMASA", unit: "UNIDAD", price: 6.00 },
    { id: 935, code: "", name: "ARCO SIERRA COLORES 12'' KM1301", brand: "KAMASA", unit: "UNIDAD", price: 20.00 },
    { id: 936, code: "", name: "WINCHA PLASTICA COLOR 5MX19MM KM710", brand: "KAMASA", unit: "UNIDAD", price: 7.00 },
    { id: 937, code: "", name: "LLAVE STILSON 12''", brand: "PARACASA", unit: "UNIDAD", price: 30.00 },
    { id: 938, code: "", name: "LLAVE STILSON 14''", brand: "PARACASA", unit: "UNIDAD", price: 38.00 },
    { id: 939, code: "", name: "LLAVE STILSON 18''", brand: "PARACASA", unit: "UNIDAD", price: 48.00 },
    { id: 940, code: "", name: "DESTORNILLADOR DOBLE CABEZA 6X100MM/CRV", brand: "PARACASA", unit: "UNIDAD", price: 10.00 },
    { id: 941, code: "", name: "DESTORNILLADOR PLANO IMANTADO 6X100MM", brand: "PARACASA", unit: "UNIDAD", price: 8.00 },
    { id: 942, code: "", name: "DESTORNILLADOR ESTRELLA IMANTADO 6X100MM", brand: "PARACASA", unit: "UNIDAD", price: 8.00 },
    { id: 943, code: "", name: "ARCO DE SIERRA 12''/300MM 101002", brand: "WISEUP", unit: "UNIDAD", price: 18.00 },
    { id: 944, code: "", name: "ARCO DE SIERRA 12''/300MM 101007", brand: "WISEUP", unit: "UNIDAD", price: 22.00 },
    { id: 945, code: "", name: "CUCHILLA MULTIUSOS CON FUNDA DE GOMA 1+2 HOJAS - 100107", brand: "WISEUP", unit: "UNIDAD", price: 9.00 },
    { id: 946, code: "", name: "COMBA OCTAGONAL MANGO MADERA 4LB", brand: "PARACASA", unit: "UNIDAD", price: 35.00 },
    { id: 947, code: "", name: "LLAVE COMBINADA 7MM", brand: "WISEUP", unit: "UNIDAD", price: 6.00 },
    { id: 948, code: "", name: "LLAVE COMBINADA 8MM", brand: "WISEUP", unit: "UNIDAD", price: 7.00 },
    { id: 949, code: "", name: "LLAVE COMBINADA 9MM", brand: "WISEUP", unit: "UNIDAD", price: 8.00 },
    { id: 950, code: "", name: "LLAVE COMBINADA 10MM", brand: "WISEUP", unit: "UNIDAD", price: 9.00 },
    { id: 951, code: "", name: "LLAVE COMBINADA 11MM", brand: "WISEUP", unit: "UNIDAD", price: 10.00 },
    { id: 952, code: "", name: "FUSIBLE UNIVERSAL ATO 25A STD TIPO ENCHUFE", brand: "", unit: "UNIDAD", price: 2.00 },
    { id: 953, code: "", name: "FUSIBLE CILINDRICO 32A 250V", brand: "", unit: "UNIDAD", price: 5.50 },
    { id: 954, code: "", name: "FUSIBLE CILINDRICO 10A 250V", brand: "", unit: "UNIDAD", price: 5.50 },
    { id: 955, code: "", name: "CINTA TEFLON 1/2''X0.075MM", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 956, code: "", name: "CARRO MINERO 1000KG REF.", brand: "", unit: "UNIDAD", price: 4250.00 },
    { id: 957, code: "", name: "CANDADO DE HIERRO COLOR LATON 32MM", brand: "PARACASA", unit: "UNIDAD", price: 7.00 },
    { id: 958, code: "", name: "CANDADO DE HIERRO COLOR LATON 38MM", brand: "PARACASA", unit: "UNIDAD", price: 9.00 },
    { id: 959, code: "", name: "CANDADO DE HIERRO COLOR LATON 50MM", brand: "PARACASA", unit: "UNIDAD", price: 15.00 },
    { id: 960, code: "", name: "CANDADO DE HIERRO COLOR LATON 63MM", brand: "PARACASA", unit: "UNIDAD", price: 22.00 },
    { id: 961, code: "", name: "BOLSA DE CINTILLOS (PRECINTO) C/BLANCO 4.8MM X 300MM/100U", brand: "PARACASA", unit: "UNIDAD", price: 18.00 },
    { id: 962, code: "", name: "INFLADOR 66CM X 4.5CM", brand: "PARACASA", unit: "UNIDAD", price: 26.00 },
    { id: 963, code: "", name: "PICO 5LB C/MANGO MADERA", brand: "PARACASA", unit: "UNIDAD", price: 27.00 },
    { id: 964, code: "", name: "COMBA 10LB. C/MANGO", brand: "PARACASA", unit: "UNIDAD", price: 57.00 },
    { id: 965, code: "", name: "COMBA OCTAGONAL MANGO MADERA 10LB", brand: "PARACASA", unit: "UNIDAD", price: 65.00 },
    { id: 966, code: "", name: "MOTOR PETROLERO 33HP", brand: "JD", unit: "UNIDAD", price: 3600.00 },
    { id: 967, code: "", name: "PANTALON JEAN CRUDO T-30", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 968, code: "", name: "PANTALON JEAN PROCESADO T-30", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 969, code: "", name: "POLO PLOMO MANGA LARGA - T/M", brand: "", unit: "UNIDAD", price: 11.00 },
    { id: 970, code: "", name: "GUANTE DE CUERO CROMADA C/PALMA REFUERZO", brand: "", unit: "PAR", price: 12.00 },
    { id: 971, code: "", name: "CASACA JEAN PROCESADO T-M", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 972, code: "", name: "GENERADOR GASOLINERO 6500W", brand: "CATTINI", unit: "UNIDAD", price: 2500.00 },
    { id: 973, code: "", name: "ENCENDEDOR GAS SOLIDO", brand: "", unit: "UNIDAD", price: 2.00 },
    { id: 974, code: "", name: "YT29 - RESORTE #26", brand: "", unit: "UNIDAD", price: 0.00 },
    { id: 975, code: "", name: "YT29 - PERNO LATERAL #62", brand: "", unit: "UNIDAD", price: 0.00 },
    { id: 976, code: "", name: "FT160 - ALMOHADILLA #2", brand: "", unit: "UNIDAD", price: 0.00 },
    { id: 977, code: "", name: "FT160 - ANILLO DE GOMA #24", brand: "", unit: "UNIDAD", price: 0.00 },
    { id: 978, code: "", name: "CASCO MINERO SUSP.4PTAS C/PLC DIELECTRICO", brand: "MSA", unit: "UNIDAD", price: 45.00 },
    { id: 979, code: "", name: "MOTOSIERRA 28'' C/CADENA ORIGINAL OREGON, DRK-6200", brand: "DEREK MOTORS", unit: "UNIDAD", price: 780.00 },
    { id: 980, code: "", name: "BROCA SDS MAX 32X920MM", brand: "KULKONI", unit: "UNIDAD", price: 419.00 },
    { id: 981, code: "", name: "PLASTICO DOBLE CARA 1-2M", brand: "", unit: "METRO", price: 0.00 },
    { id: 982, code: "", name: "MANTA 1-2M", brand: "", unit: "METRO", price: 3.00 },
    { id: 983, code: "", name: "CLAVO C/CABEZA 6\"", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 984, code: "", name: "GENERADOR GASOLINERO 10KW", brand: "MEBA", unit: "UNIDAD", price: 3300.00 },
    { id: 985, code: "", name: "VALVULA DE AIRE PVC 1\"", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 986, code: "", name: "HDPE TEE ROSCA HEMBRA 1\"", brand: "", unit: "UNIDAD", price: 13.50 },
    { id: 987, code: "", name: "FUSIBLE DE CARTUCHO TIPO UÑA 32A", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 988, code: "", name: "FUSIBLE DE CARTUCHO TIPO UÑA 40A", brand: "", unit: "UNIDAD", price: 2.00 },
    { id: 989, code: "", name: "FUSIBLE UNIVERSAL ATO 25A ESTÁNDAR - BLANCO TIPO ENCHUFE", brand: "", unit: "UNIDAD", price: 0.00 },
    { id: 990, code: "", name: "COMBA 20 LIBRAS 16516", brand: "TRUPER", unit: "UNIDAD", price: 170.00 },
    { id: 991, code: "", name: "HDPE MANGUERA 1 PULG PN8", brand: "", unit: "UNIDAD", price: 88.00 },
    { id: 992, code: "", name: "VARILLA DE COBRE 5/8\"", brand: "", unit: "UNIDAD", price: 247.00 },
    { id: 993, code: "", name: "BISAGRA SOLDAR LISA 1/2X4\" DOBLE ALETA", brand: "", unit: "UNIDAD", price: 10.00 },
    { id: 994, code: "", name: "SACARODAMIENTO 4'' SDR204 S4R1955U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 30.00 },
    { id: 995, code: "", name: "KIT BATERIA 5.0AH DCB205 + CARGADOR 12V/20V DCB1104", brand: "DEWALT", unit: "UNIDAD", price: 520.00 },
    { id: 996, code: "", name: "ASPIRADOR/SOPLADOR 800W", brand: "INGCO", unit: "UNIDAD", price: 220.00 },
    { id: 997, code: "", name: "HDPE MANGUERA 16MM X 500MTRS", brand: "", unit: "UNIDAD", price: 115.00 },
    { id: 998, code: "", name: "NIPLE GALVANIZADO 2X8", brand: "", unit: "UNIDAD", price: 33.00 },
    { id: 999, code: "", name: "ESMERIL ANGULAR INALAMBRICO 20V DCG413B - K3 + BATERIA 5AH + CARGADOR", brand: "DEWALT", unit: "UNIDAD", price: 1199.00 },
    { id: 1000, code: "", name: "LLAVE DE RUEDAS 18\"", brand: "TRUPER", unit: "UNIDAD", price: 45.00 },
    { id: 1001, code: "", name: "MANGA LAMINADA 27\"", brand: "", unit: "UNIDAD", price: 3.50 },
    { id: 1002, code: "", name: "PIEDRA ESMERIL GRANO #80 VERDE CARBURADA 8X1X1\" KM-154", brand: "KAMASA", unit: "UNIDAD", price: 55.00 },
    { id: 1003, code: "", name: "BROCA CÓNICA 38MM NEGRA", brand: "", unit: "UNIDAD", price: 40.00 },
    { id: 1004, code: "", name: "VARILLA DE COBRE 1/2\"", brand: "", unit: "UNIDAD", price: 170.00 },
    { id: 1005, code: "", name: "BROCA DE COBALTO PARA METAL 1/2''", brand: "", unit: "UNIDAD", price: 39.00 },
    { id: 1006, code: "", name: "GUANTE DE PVC NEGRO NEOPLUS 40CM", brand: "ASTARA", unit: "PAR", price: 17.00 },
    { id: 1007, code: "", name: "CINTA FOIL DE ALUMINIO 10MX50MM", brand: "", unit: "UNIDAD", price: 18.00 },
    { id: 1008, code: "", name: "REGADERA TIPO DUCHA 3L", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 1009, code: "", name: "PERNO DE EXPANSION 3/8 X 4''", brand: "", unit: "UNIDAD", price: 1.50 },
    { id: 1010, code: "", name: "BROCA PARA CONCRETO DE 3/8 X 5'', 11221", brand: "TRUPER", unit: "UNIDAD", price: 6.00 },
    { id: 1011, code: "", name: "POLICARBONATO ALVEOLAR GLANZE 8MM C/BRONCE (PLANCHA: 2100MM X 12200MM)", brand: "", unit: "UNIDAD", price: 990.00 },
    { id: 1012, code: "", name: "ALICATE 9'' PELA CABLES 18 A 10 AWG 22710", brand: "PRETUL", unit: "UNIDAD", price: 20.00 },
    { id: 1013, code: "", name: "SOLDIMIX CARGA MAXIMA X 30GR", brand: "SOLDIMIX", unit: "UNIDAD", price: 16.00 },
    { id: 1014, code: "", name: "CINCEL HEXAGONAL 19MM PLANO 1'' X 12'' C/PROTECCION P/HORMIGON ECCL251902", brand: "EMTOP", unit: "UNIDAD", price: 28.00 },
    { id: 1015, code: "", name: "ACOPLE ACERO, CUERDA 1/4NPT, MACHO 27029", brand: "PRETUL", unit: "UNIDAD", price: 12.00 },
    { id: 1016, code: "", name: "JUEGO DE 4 CONECTORES Y 2 ACOPLES PARA COMPRESORA DE AIRE 27030", brand: "PRETUL", unit: "UNIDAD", price: 30.00 },
    { id: 1017, code: "", name: "FRESA RECTA 2 FILOS, 1/4'', LARGA 11453", brand: "TRUPER", unit: "UNIDAD", price: 16.00 },
    { id: 1018, code: "", name: "JUEGO DE DESTORNILLADORES 18 PIEZAS DW2174", brand: "DEWALT", unit: "UNIDAD", price: 55.00 },
    { id: 1019, code: "", name: "SCO DIAMOND DE PULIR 115MM DOBLE FILO DDP115D D6P5118U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 45.00 },
    { id: 1020, code: "", name: "DISCO DIAMANTADO SEGMENTADO 7-1/4'' SECO DDU180 D3S5282U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 22.00 },
    { id: 1021, code: "", name: "DISCO DE CORTE METAL 4-1/2'' x 3/64'' x 7/8'' DCM504", brand: "UYUSTOOLS", unit: "UNIDAD", price: 4.00 },
    { id: 1022, code: "", name: "DISCO DE CORTE INOX 7'' 180MMX1.6MMX22.23MM A60T-BF DC1F324166GD", brand: "3M", unit: "UNIDAD", price: 8.00 },
    { id: 1023, code: "", name: "DISCO DE CORTE INOX 4-1/2'' 115MMX1MMX22.23MM A60T-BF DC0F864166GD", brand: "3M", unit: "UNIDAD", price: 5.00 },
    { id: 1024, code: "", name: "DISCO DE DESBASTE 4-1/2'' x 1/4'' x 7/8''", brand: "BLACK-DECKER", unit: "UNIDAD", price: 8.00 },
    { id: 1025, code: "", name: "LIMA TRIANGULO PESADO 6'' MANGO DOBLE INYECCION 15307", brand: "TRUPER", unit: "UNIDAD", price: 10.00 },
    { id: 1026, code: "", name: "LIMA PLANA BASTARDA 6'' MANGO DOBLE INYECCION 15309", brand: "TRUPER", unit: "UNIDAD", price: 12.00 },
    { id: 1027, code: "", name: "CEPILLO DE ALAMBRE 51 PINCELES DE ACERO AL CARBONO 11553", brand: "TRUPER", unit: "UNIDAD", price: 10.00 },
    { id: 1028, code: "", name: "DISCO TRONZADORA DE CORTE DE ACERO BNA32 14''x7/64''x1'' DT3A6434N", brand: "NORTON", unit: "UNIDAD", price: 22.00 },
    { id: 1029, code: "", name: "TRABADOR PARA SERRUCHOS 18190", brand: "TRUPER", unit: "UNIDAD", price: 60.00 },
    { id: 1030, code: "", name: "CALIBRADOR VERNIER DIGITAL 6''", brand: "", unit: "UNIDAD", price: 75.00 },
    { id: 1031, code: "", name: "CALIBRADOR VERNIER DIGITAL 4''", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 1032, code: "", name: "NIPLE DE FIERRO GALVANIZADO DE 1 1/2'' X 3 1/2''", brand: "", unit: "UNIDAD", price: 14.00 },
    { id: 1033, code: "", name: "SOLDADURA CITOFONTE 1/8''", brand: "", unit: "KILOGRAMOS", price: 800.00 },
    { id: 1034, code: "", name: "LINTERNA RECARGABLE No.826 LED 15 LNR826-L L2R9606U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 22.00 },
    { id: 1035, code: "", name: "SPOT LIGHT - LED EMPOTRABLE P/CJ OCTOGONAL 8W 7000K S1L4446S", brand: "SWIFT", unit: "UNIDAD", price: 12.00 },
    { id: 1036, code: "", name: "FT160 - CENTRAL #15", brand: "", unit: "UNIDAD", price: 18.00 },
    { id: 1037, code: "", name: "FT160 - MARCO #27", brand: "", unit: "UNIDAD", price: 163.00 },
    { id: 1038, code: "", name: "FT160 - O-RING #26", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 1039, code: "", name: "ALICATE UNIVERSAL 8'' (KM-001)", brand: "KAMASA", unit: "UNIDAD", price: 20.00 },
    { id: 1040, code: "", name: "CIZALLA 24'' (NAP124)", brand: "UYUSTOOLS", unit: "UNIDAD", price: 70.00 },
    { id: 1041, code: "", name: "NIPLE 1/2'' X 3'' GALVANIZADO", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 1042, code: "", name: "TEE 1'' GALVANIZADO", brand: "MAGNUM", unit: "UNIDAD", price: 12.00 },
    { id: 1043, code: "", name: "VALVULA ESFERICA 1/2'' M/PLANO R-3 (ROY268)", brand: "ROYITALY", unit: "UNIDAD", price: 18.00 },
    { id: 1044, code: "", name: "ACEITE DIESEL 15W-40", brand: "MOBIL", unit: "BALDE", price: 340.00 },
    { id: 1045, code: "", name: "HIDROLINA ATF D3M (BALDE 5GL)", brand: "CAM2", unit: "BALDE", price: 300.00 },
    { id: 1046, code: "", name: "LAMPARA MINERA KL5M ORIGINAL C/CARGADOR", brand: "WISDOM", unit: "UNIDAD", price: 260.00 },
    { id: 1047, code: "", name: "LLANTA CON CAMARA 6.00 - 14 P/DUMPER", brand: "", unit: "UNIDAD", price: 380.00 },
    { id: 1048, code: "", name: "CAMARA LLANTA CARRO MINERO 1TON", brand: "", unit: "UNIDAD", price: 35.00 },
    { id: 1049, code: "", name: "CAMARA LLANTA CARRO MINERO 1/2 TON", brand: "", unit: "UNIDAD", price: 30.00 },
    { id: 1050, code: "", name: "CAMARA LLANTA DE CARRETILLA 16'' 11866", brand: "TRUPER", unit: "UNIDAD", price: 11.00 },
    { id: 1051, code: "", name: "BARRA CONICA 4 PIES OR", brand: "SANDVICK", unit: "UNIDAD", price: 380.00 },
    { id: 1052, code: "", name: "YT29 - PASADOR #21", brand: "", unit: "UNIDAD", price: 6.80 },
    { id: 1053, code: "", name: "YT29 - ARANDELA DE PALANCA DE ACELERACION #19", brand: "", unit: "UNIDAD", price: 2.90 },
    { id: 1054, code: "", name: "YT29 - ABRAZADERA DEL SILENCIADOR #57", brand: "", unit: "UNIDAD", price: 6.90 },
    { id: 1055, code: "", name: "PINZA PARA ELECTRICISTA 8'' MANGO COMFORT GRIP, PRETUL 22674", brand: "PRETUL", unit: "UNIDAD", price: 22.00 },
    { id: 1056, code: "", name: "ESTUCHE CON 5 DADOS MAGNETICOS DE 1/16'', EXPERT 12942", brand: "TRUPER", unit: "UNIDAD", price: 14.00 },
    { id: 1057, code: "", name: "PINZA DE PUNTA Y CORTE 6'' MANGO COMFORT GRIP 22670", brand: "PRETUL", unit: "UNIDAD", price: 18.00 },
    { id: 1058, code: "", name: "BROCA SDS PLUS 10 X 160MM 101196", brand: "TRUPER", unit: "UNIDAD", price: 10.00 },
    { id: 1059, code: "", name: "PISTOLA CALENTADORA REFORZADA 101280", brand: "TRUPER", unit: "UNIDAD", price: 24.00 },
    { id: 1060, code: "", name: "CASCO MINERO SUSP.4PTAS C/PLC DIELECTRICO C/BLANCO", brand: "TRIDENTE", unit: "UNIDAD", price: 20.00 },
    { id: 1061, code: "", name: "BARRA - PIE DE AVANCE FT-160", brand: "", unit: "UNIDAD", price: 700.00 },
    { id: 1062, code: "", name: "GATO HIDRÀULICO DE BOTELLA DE 50 TN", brand: "TRUPER", unit: "UNIDAD", price: 626.00 },
    { id: 1063, code: "", name: "TOMACORRIENTE SOBREPONER 2 SERV. 16A 220V L/T A060", brand: "STAR ELECTRIC", unit: "UNIDAD", price: 15.00 },
    { id: 1064, code: "", name: "LIMA MEDIA CAÑA BASTARDA 6'' MANGO DOBLE INYECCION 15317", brand: "TRUPER", unit: "UNIDAD", price: 15.00 },
    { id: 1065, code: "", name: "LIMA REDONDA BASTARDA 6'' MANGO DOBLE INYECCION 15315", brand: "TRUPER", unit: "UNIDAD", price: 12.00 },
    { id: 1066, code: "", name: "CIZALLA TIJERA PROFESIONAL 30'' NAP130 C17T3035U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 85.00 },
    { id: 1067, code: "", name: "CIZALLA PROFESIONAL DE 14'' 12831", brand: "TRUPER", unit: "UNIDAD", price: 70.00 },
    { id: 1068, code: "", name: "HDPE REDUCCION 1-1/2 PULG A 1 PULG DIM (50 X 32)", brand: "", unit: "UNIDAD", price: 16.00 },
    { id: 1069, code: "", name: "ALICATE SET 3PCS No.D15 AL3SD15 A7S0027U", brand: "UYUSTOOLS", unit: "UNIDAD", price: 45.00 },
    { id: 1070, code: "", name: "LLAVE MIXTA EXTRALARGA 14MM X 193MM DE LARGO 15618", brand: "TRUPER", unit: "UNIDAD", price: 14.00 },
    { id: 1071, code: "", name: "HDPE VALVULA 1-1/2 PULG DIM (50)", brand: "", unit: "UNIDAD", price: 45.00 },
    { id: 1072, code: "", name: "LLAVE COMBINADA 13MM CR-V YOV913 LL0C6213U", brand: "FERRAWYY", unit: "UNIDAD", price: 6.00 },
    { id: 1073, code: "", name: "LLAVE MIXTA EXTRALARGA 12MM X 193MM DE LARGO 15616", brand: "TRUPER", unit: "UNIDAD", price: 13.00 },
    { id: 1074, code: "", name: "MARTILLO M/MADERA", brand: "KAMASA", unit: "UNIDAD", price: 15.00 },
    { id: 1075, code: "", name: "MOCHILA DE COSTAL | COLOR: NEGRO", brand: "", unit: "UNIDAD", price: 14.00 },
    { id: 1076, code: "", name: "MOCHILA PARA EXPLOSIVO - 25KG", brand: "", unit: "UNIDAD", price: 70.00 },
    { id: 1077, code: "", name: "SACO NICOVITA", brand: "", unit: "UNIDAD", price: 0.35 },
    { id: 1078, code: "", name: "CARBON PAR | DEMOLEDOR BOSH 12E", brand: "BOSCH", unit: "UNIDAD", price: 40.00 },
    { id: 1079, code: "", name: "PURUÑA PEQUEÑA", brand: "", unit: "UNIDAD", price: 20.00 },
    { id: 1080, code: "", name: "PURUÑA MEDIANA", brand: "", unit: "UNIDAD", price: 30.00 },
    { id: 1081, code: "", name: "BARRETA 1.8 MTRS", brand: "", unit: "UNIDAD", price: 30.00 },
    { id: 1082, code: "", name: "PALANA RECTA C/MGO/MADERA 71CM COD.77427/404", brand: "TRAMONTINA", unit: "UNIDAD", price: 27.00 },
    { id: 1083, code: "", name: "LLAVE DE CRUZ 18'' 17-19-21-23", brand: "PARACASA", unit: "UNIDAD", price: 35.00 },
    { id: 1084, code: "", name: "CANDADO DE BLOQUEO ROJO DIELECTRICO", brand: "", unit: "UNIDAD", price: 55.00 },
    { id: 1085, code: "", name: "AMOLADORA ANGULAR 4-1/2'' 1500W DWE4336", brand: "DEWALT", unit: "UNIDAD", price: 725.00 },
    { id: 1086, code: "", name: "CIRCULINA LED 220V COLOR ROJO", brand: "OPALUX", unit: "UNIDAD", price: 70.00 },
    { id: 1087, code: "", name: "ENGRASADORA NEUMATICA 45 LITROS 400-BAR 70MM", brand: "", unit: "UNIDAD", price: 1100.00 },
    { id: 1088, code: "", name: "YT29 - TUERCA DE PALANCA DE ACELARACION #20", brand: "", unit: "UNIDAD", price: 1.00 },
    { id: 1089, code: "", name: "YT29 - CODO DE AIRE #7", brand: "", unit: "UNIDAD", price: 28.00 },
    { id: 1090, code: "", name: "FT160 - PISTON BAR #20", brand: "", unit: "UNIDAD", price: 128.00 },
    { id: 1091, code: "", name: "FT160 - TUBERIA DE AIRE #10", brand: "", unit: "UNIDAD", price: 24.00 },
    { id: 1092, code: "", name: "GATA TIPO LAGARTO 3.5 TON 14802", brand: "TRUPER", unit: "UNIDAD", price: 980.00 },
    { id: 1093, code: "", name: "GATA TIPO BOTELLA DE 12 TON 14818", brand: "TRUPER", unit: "UNIDAD", price: 170.00 },
    { id: 1094, code: "", name: "TORNILLO DE BANCO DE 8'' GIRATORIO 18595", brand: "TRUPER", unit: "UNIDAD", price: 740.00 },
    { id: 1095, code: "", name: "DESTORNILLADORES GOLPE 6PCS", brand: "", unit: "UNIDAD", price: 30.00 },
    { id: 1096, code: "", name: "JUEGO DE ALICATE SACA SEGURO 4 PIEZAS THTJ214042", brand: "", unit: "UNIDAD", price: 85.00 },
    { id: 1097, code: "", name: "JUEGO DE 9 LLAVES TORX 15554", brand: "TRUPER", unit: "UNIDAD", price: 29.00 },
    { id: 1098, code: "", name: "ALICATE PRENSA TERMINAL TUBULAR 23-7 AWG + 1200 TERM.", brand: "", unit: "UNIDAD", price: 220.00 },
    { id: 1099, code: "", name: "HEBILLA PARA CINTA BANDIT 3/4", brand: "", unit: "UNIDAD", price: 2.50 },
    { id: 1100, code: "", name: "MOCHILA PORTAHERRAMIENTA 18''", brand: "STANLEY", unit: "UNIDAD", price: 180.00 },
    { id: 1101, code: "", name: "ROLLO DE MALLA DE GALLINERO DE 1'' X 1''", brand: "", unit: "UNIDAD", price: 150.00 },
    { id: 1102, code: "", name: "PLASTICO DOBLE CARA AZUL-NEGRO 4MTS DE ANCHO", brand: "", unit: "METRO", price: 13.00 },
    { id: 1103, code: "", name: "PLASTICO DE 80GR DOBLE CARA", brand: "", unit: "METRO", price: 5.70 },
    { id: 1104, code: "", name: "ARPILLERA POLIPROPILENO NEGRA 3M X 85GR", brand: "", unit: "METRO", price: 5.00 },
    { id: 1105, code: "", name: "PILAS RECARGABLES AA - ENERGIZER", brand: "", unit: "PAR", price: 36.00 },
    { id: 1106, code: "", name: "INFLADOR MANUAL PARA NEUMATICO 23'' 14863", brand: "TRUPER", unit: "UNIDAD", price: 30.00 },
    { id: 1107, code: "", name: "CINCEL PLANO CON MANGO DE GOMA 12''", brand: "TRUPER", unit: "UNIDAD", price: 35.00 },
    { id: 1108, code: "", name: "PERNOS GANCHO DE SUSPENSION GALV. 5/8''", brand: "", unit: "UNIDAD", price: 12.00 },
    { id: 1109, code: "", name: "CAJA DE REGISTRO 25X25", brand: "", unit: "UNIDAD", price: 35.00 },
    { id: 1110, code: "", name: "LLAVE DE ALTA RESISTENCIA BRONCE CROMADO 1/2'' X 150LB", brand: "", unit: "UNIDAD", price: 60.00 },
    { id: 1111, code: "", name: "CODO PVC PESADO 2''X90GRADOS", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 1112, code: "", name: "TEE PVC CLASE PESADA 2''", brand: "", unit: "UNIDAD", price: 6.00 },
    { id: 1113, code: "", name: "MALLA ELECTROSOLDADA 1/2'' 20KG", brand: "", unit: "ROLLO", price: 190.00 },
    { id: 1114, code: "", name: "STOVEBOLT 5/32 X 2'' PARA CAJA HEXAGONAL", brand: "", unit: "UNIDAD", price: 0.50 },
    { id: 1115, code: "", name: "SOMBRERO PARA TUBO DE VENTILACION 2''", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 1116, code: "", name: "ESPATULA 4'' M/MADERA", brand: "", unit: "UNIDAD", price: 5.00 },
    { id: 1117, code: "", name: "MANGA LAMINADA BLANCO 14\"", brand: "", unit: "METRO", price: 2.70 },
    { id: 1118, code: "", name: "ROTOMARTILLO SDS PLUS 1250W STHR1232K", brand: "STANLEY", unit: "UNIDAD", price: 630.00 },
    { id: 1119, code: "", name: "ESMERIL ANGULAR 4-1/2'' 750W SG7115", brand: "STANLEY", unit: "UNIDAD", price: 180.00 },
    { id: 1120, code: "", name: "ESMERIL ANGULAR 9'' 2200W SL229", brand: "STANLEY", unit: "UNIDAD", price: 490.00 },
    { id: 1121, code: "", name: "ESMERIL ANGULAR 7'' 2200W SL227", brand: "STANLEY", unit: "UNIDAD", price: 440.00 },
    { id: 1122, code: "", name: "ESMERIL ANGULAR 4-1/2'' 1000W STGS1011", brand: "STANLEY", unit: "UNIDAD", price: 250.00 },
    { id: 1123, code: "", name: "TALADRO PERCUTOR 1/2'' 800W STDH8013", brand: "STANLEY", unit: "UNIDAD", price: 250.00 }
];
// Base de datos de empresas/clientes frecuentes
const COMPANIES_DB = [
    {
        ruc: "20605975225",
        name: "CONSORCIO COPTOS",
        address: "AV. HUANACAURE NRO. 959 URB. TAHUANTINSUYO ZN. CUATRO LIMA LIMA INDEPENDENCIA",
        district: "INDEPENDENCIA",
        province: "LIMA",
        department: "LIMA"
    },
    {
        ruc: "20606121084",
        name: "INVERSIONES D ROMERO E.I.R.L.",
        address: "CAL.JOAQUIN CAPELLA NRO. 230 URB. INGENIERIA LIMA",
        district: "SAN MARTIN DE PORRES",
        province: "LIMA",
        department: "LIMA"
    }
];

// Inicializar bancos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    // Agregar bancos por defecto
    DEFAULT_BANKS.forEach(bank => {
        addBank(bank);
    });
    
    // Establecer fecha actual
    const today = new Date();
    document.getElementById('quote-date').valueAsDate = today;
    
    // Establecer fecha de vigencia (15 días después)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);
    document.getElementById('valid-until').valueAsDate = futureDate;

    // Cargar asesores en el select
    loadAdvisors();
    
    // Configurar buscador de productos
    setupProductSearch();
});

// Función para cargar asesores en el select
function loadAdvisors() {
    const advisorSelect = document.getElementById('advisor-name');
    
    // Limpiar opciones existentes
    advisorSelect.innerHTML = '';
    
    // Agregar opción por defecto
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione un asesor';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    advisorSelect.appendChild(defaultOption);
    
    // Agregar asesores activos
    ADVISORS_DB
        .filter(advisor => advisor.active)
        .forEach(advisor => {
            const option = document.createElement('option');
            option.value = advisor.name;
            option.textContent = advisor.name;
            advisorSelect.appendChild(option);
        });
}

// Función para configurar el buscador de productos - CORREGIDA COMPLETAMENTE
function setupProductSearch() {
    const searchInput = document.getElementById('product-search');
    const searchResults = document.getElementById('search-results');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            return;
        }
        
        // Filtrar productos (incluyendo búsqueda por marca)
        const filteredProducts = PRODUCTS_DB.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.code.toLowerCase().includes(searchTerm) ||
            (product.brand && product.brand.toLowerCase().includes(searchTerm))
        );
        
        // Mostrar resultados
        if (filteredProducts.length > 0) {
            searchResults.innerHTML = filteredProducts.map(product => {
                // Construir descripción con marca y código
                let displayText = product.name;
                if (product.brand && product.brand.trim() !== '') {
                    displayText += ` - ${product.brand}`;
                }
                if (product.code && product.code.trim() !== '') {
                    displayText += ` - ${product.code}`;
                }
                
                return `
                    <div class="search-result-item" data-product-id="${product.id}">
                        <div class="product-info">
                            <strong>${displayText}</strong>
                        </div>
                        <div class="product-details">
                            ${product.unit} - S/ ${product.price.toFixed(2)}
                        </div>
                        <button type="button" class="btn btn-add-product">Agregar</button>
                    </div>
                `;
            }).join('');
            
            searchResults.style.display = 'block';
            
            // Configurar eventos para los botones de agregar
            document.querySelectorAll('.btn-add-product').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.closest('.search-result-item').dataset.productId);
                    addProductFromSearch(productId);
                    searchInput.value = '';
                    searchResults.style.display = 'none';
                    searchResults.innerHTML = '';
                });
            });
        } else {
            searchResults.innerHTML = '<div class="no-results">No se encontraron productos</div>';
            searchResults.style.display = 'block';
        }
    });
    
    // Ocultar resultados al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
        }
    });
}

// Función para verificar si un producto ya existe en la tabla - CORREGIDA
function productExists(productName) {
    const existingItems = document.querySelectorAll('.item-original-name');
    for (let item of existingItems) {
        // Solo comparar el nombre base (sin marca ni código)
        const existingName = item.value.toLowerCase().trim();
        const newName = productName.toLowerCase().trim();
        if (existingName === newName) {
            return true;
        }
    }
    return false;
}

// Función para agregar producto desde la búsqueda - CORREGIDA
function addProductFromSearch(productId) {
    const product = PRODUCTS_DB.find(p => p.id === productId);
    
    if (product) {
        // Verificar si el producto ya existe
        if (productExists(product.name)) {
            alert('Este producto ya ha sido agregado a la cotización.');
            return;
        }
        
        const itemsBody = document.getElementById('items-body');
        const newRow = document.createElement('tr');
        
        // Construir la descripción formateada con marca y código
        let description = product.name;
        if (product.brand && product.brand.trim() !== '') {
            description += ` - ${product.brand}`;
        }
        if (product.code && product.code.trim() !== '') {
            description += ` - ${product.code}`;
        }
        
        newRow.innerHTML = `
            <td>
                <input type="text" class="item-desc" value="${description}" placeholder="Descripción del artículo">
                <input type="hidden" class="item-original-name" value="${product.name}">
                <input type="hidden" class="item-brand" value="${product.brand || ''}">
                <input type="hidden" class="item-code" value="${product.code || ''}">
            </td>
            <td>
                <select class="item-unit">
                    <option value="UND" ${product.unit === 'UND' ? 'selected' : ''}>UND</option>
                    <option value="KG">KG</option>
                    <option value="PAR">PAR</option>
                    <option value="MTS">MTS</option>
                    <option value="GLN">GLN</option>
                    <option value="LTS">LTS</option>
                    <option value="CAJ">CAJ</option>
                    <option value="ROL">ROL</option>
                </select>
            </td>
            <td><input type="number" class="item-qty" value="1" min="1"></td>
            <td><input type="number" class="item-price" value="${product.price}" step="0.01" min="0"></td>
            <td><button type="button" class="btn btn-remove" onclick="removeItem(this)">Eliminar</button></td>
        `;
        
        itemsBody.appendChild(newRow);
        
        // Agregar evento para validar duplicados cuando se edite manualmente
        const descInput = newRow.querySelector('.item-desc');
        descInput.addEventListener('blur', function() {
            validateDuplicateProducts();
        });
    }
}

// Función para buscar cliente por RUC
function searchClientByRUC() {
    const rucInput = document.getElementById('client-ruc');
    const searchResults = document.getElementById('client-search-results');
    const ruc = rucInput.value.trim();
    
    // Ocultar resultados si el campo está vacío
    if (ruc.length === 0) {
        searchResults.style.display = 'none';
        searchResults.innerHTML = '';
        return;
    }
    
    // Buscar coincidencias en la base de datos (no solo coincidencia exacta)
    const foundClients = COMPANIES_DB.filter(client => 
        client.ruc.includes(ruc) || 
        client.name.toLowerCase().includes(ruc.toLowerCase())
    );
    
    if (foundClients.length > 0) {
        // Mostrar todos los clientes que coinciden
        searchResults.innerHTML = foundClients.map(client => `
            <div class="search-result-item" onclick="fillClientData('${client.ruc}')">
                <div class="client-info">
                    <div class="client-name">${client.name}</div>
                    <div class="client-ruc">RUC: ${client.ruc}</div>
                    <div class="client-details">${client.address}</div>
                </div>
            </div>
        `).join('');
        
        searchResults.style.display = 'block';
    } else {
        // Mostrar opción para agregar manualmente
        searchResults.innerHTML = '';
        searchResults.style.display = 'block';
    }
}

// Función para llenar automáticamente los datos del cliente
function fillClientData(ruc) {
    const client = COMPANIES_DB.find(c => c.ruc === ruc);
    
    if (client) {
        document.getElementById('client-ruc').value = client.ruc;
        document.getElementById('client-name').value = client.name;
        document.getElementById('client-address').value = client.address;
        document.getElementById('client-district').value = client.district;
        document.getElementById('client-province').value = client.province;
        document.getElementById('client-department').value = client.department;
        
        // Ocultar resultados de búsqueda
        document.getElementById('client-search-results').style.display = 'none';
        
        // Habilitar edición por si el usuario quiere modificar algo
        disableClientFields(true);
    }
}

// Cerrar resultados de búsqueda al hacer clic fuera
document.addEventListener('click', function(e) {
    const clientSearch = document.getElementById('client-ruc');
    const clientResults = document.getElementById('client-search-results');
    
    if (!clientSearch.contains(e.target) && !clientResults.contains(e.target)) {
        clientResults.style.display = 'none';
    }
});

// Función para habilitar/deshabilitar campos del cliente
function disableClientFields(enable) {
    const fields = [
        'client-name',
        'client-address', 
        'client-district',
        'client-province',
        'client-department'
    ];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.disabled = !enable;
            field.style.backgroundColor = enable ? '#fff' : '#f8f9fa';
        }
    });
}

// Función para agregar un nuevo banco
function addBank(bankData = null) {
    bankCounter++;
    const bankContainer = document.getElementById('bank-accounts-container');
    const bankItem = document.createElement('div');
    bankItem.className = 'bank-item';
    bankItem.id = `bank-${bankCounter}`;
    
    // Si no se proporcionan datos, usar datos vacíos
    const data = bankData || {
        name: '',
        accountPen: '',
        cciPen: '',
        accountUsd: '',
        cciUsd: ''
    };
    
    bankItem.innerHTML = `
        <div class="bank-item-header">
            <div class="bank-title">Banco ${bankCounter}</div>
            <button type="button" class="btn btn-remove" onclick="removeBank(${bankCounter})">Eliminar</button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="bank-name-${bankCounter}">Nombre del Banco</label>
                <input type="text" id="bank-name-${bankCounter}" value="${data.name}" placeholder="No especificado">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="bank-account-pen-${bankCounter}">Cuenta Soles</label>
                <input type="text" id="bank-account-pen-${bankCounter}" value="${data.accountPen}" placeholder="No especificada">
            </div>
            <div class="form-group">
                <label for="bank-cci-pen-${bankCounter}">CCI Soles</label>
                <input type="text" id="bank-cci-pen-${bankCounter}" value="${data.cciPen}" placeholder="No especificada">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="bank-account-usd-${bankCounter}">Cuenta Dólares</label>
                <input type="text" id="bank-account-usd-${bankCounter}" value="${data.accountUsd}" placeholder="No especificada">
            </div>
            <div class="form-group">
                <label for="bank-cci-usd-${bankCounter}">CCI Dólares</label>
                <input type="text" id="bank-cci-usd-${bankCounter}" value="${data.cciUsd}" placeholder="No especificada">
            </div>
        </div>
    `;
    
    bankContainer.appendChild(bankItem);
}

// Función para eliminar un banco
function removeBank(bankId) {
    const bankItem = document.getElementById(`bank-${bankId}`);
    if (bankItem && document.querySelectorAll('.bank-item').length > 1) {
        bankItem.remove();
    } else if (document.querySelectorAll('.bank-item').length === 1) {
        alert('Debe haber al menos un banco en la cotización');
    }
}

// Función para agregar un nuevo artículo a la tabla
function addItem() {
    const itemsBody = document.getElementById('items-body');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td>
            <input type="text" class="item-desc" placeholder="Descripción del artículo">
            <input type="hidden" class="item-original-name" value="">
            <input type="hidden" class="item-brand" value="">
            <input type="hidden" class="item-code" value="">
        </td>
        <td>
            <select class="item-unit">
                <option value="UND">UND</option>
                <option value="KG">KG</option>
                <option value="PAR">PAR</option>
                <option value="MTS">MTS</option>
                <option value="GLN">GLN</option>
                <option value="LTS">LTS</option>
                <option value="CAJ">CAJ</option>
                <option value="ROL">ROL</option>
            </select>
        </td>
        <td><input type="number" class="item-qty" value="1" min="1"></td>
        <td><input type="number" class="item-price" placeholder="0.00" step="0.01" min="0"></td>
        <td><button type="button" class="btn btn-remove" onclick="removeItem(this)">Eliminar</button></td>
    `;
    
    itemsBody.appendChild(newRow);
    
    // Agregar evento para validar duplicados cuando se edite manualmente
    const descInput = newRow.querySelector('.item-desc');
    descInput.addEventListener('blur', function() {
        validateDuplicateProducts();
    });
}

// Función para validar productos duplicados en toda la tabla
function validateDuplicateProducts() {
    const items = document.querySelectorAll('.item-desc');
    const duplicates = {};
    let hasDuplicates = false;
    
    // Contar ocurrencias de cada producto
    items.forEach(item => {
        const productName = item.value.toLowerCase().trim();
        if (productName) {
            duplicates[productName] = (duplicates[productName] || 0) + 1;
        }
    });
    
    // Remover clases de error anteriores
    items.forEach(item => {
        item.classList.remove('duplicate-error');
    });
    
    // Aplicar clase de error a los duplicados
    items.forEach(item => {
        const productName = item.value.toLowerCase().trim();
        if (productName && duplicates[productName] > 1) {
            item.classList.add('duplicate-error');
            hasDuplicates = true;
        }
    });
    
    return hasDuplicates;
}

// Función para eliminar un artículo de la tabla
function removeItem(button) {
    const row = button.closest('tr');
    const itemsBody = document.getElementById('items-body');
    
    if (itemsBody.children.length > 1) {
        row.remove();
    }
}

// Función para mostrar la vista previa - CORREGIDA COMPLETAMENTE
function showPreview() {
    try {
        // Validar si hay productos duplicados
        if (validateDuplicateProducts()) {
            alert('No puede haber productos duplicados en la cotización. Por favor, corrija los productos marcados en rojo.');
            return;
        }
        
        const defaultLogo = '<img src="accents/ANFERCORP.jpeg" alt="Logo">';

        // Recopilar datos del formulario de forma segura
        quoteData = {
            logo: defaultLogo,
            companyName: 'ANFERCORP S.A.C.',
            companyRuc: '20605975225',
            companyAddress: 'Av. America Sur 1178 - Trujillo - Trujillo',
            companyPhone: '966927253',
            companyEmail: 'anfercorp.pe@gmail.com',
            quoteNumber: document.getElementById('quote-number').value || '0001 - 01',
            quoteDate: document.getElementById('quote-date').value,
            validUntil: document.getElementById('valid-until').value,
            currency: document.getElementById('currency').value || 'PEN',
            orderType: document.getElementById('order-type').value || 'Entrega Inmediata',
            clientRuc: document.getElementById('client-ruc').value || '',
            clientName: document.getElementById('client-name').value || '',
            clientAddress: document.getElementById('client-address').value || '',
            clientDistrict: document.getElementById('client-district').value || '',
            clientProvince: document.getElementById('client-province').value || '',
            clientDepartment: document.getElementById('client-department').value || '',
            advisorName: document.getElementById('advisor-name').value || '',
            banks: [],
            items: []
        };
        
        // Recopilar bancos
        const bankItems = document.querySelectorAll('.bank-item');
        quoteData.banks = [];
        
        bankItems.forEach(bankItem => {
            const bankId = bankItem.id.split('-')[1];
            const bankName = document.getElementById(`bank-name-${bankId}`).value || '';
            const accountPen = document.getElementById(`bank-account-pen-${bankId}`).value || '';
            const cciPen = document.getElementById(`bank-cci-pen-${bankId}`).value || '';
            const accountUsd = document.getElementById(`bank-account-usd-${bankId}`).value || '';
            const cciUsd = document.getElementById(`bank-cci-usd-${bankId}`).value || '';
            
            quoteData.banks.push({
                name: bankName,
                accountPen,
                cciPen,
                accountUsd,
                cciUsd
            });
        });
        
        // Recopilar artículos de forma segura - REVISADO
        const itemRows = document.querySelectorAll('#items-body tr');
        quoteData.items = [];

        itemRows.forEach(row => {
            // Obtener los campos visibles y ocultos
            const descInput = row.querySelector('.item-desc');
            const originalNameInput = row.querySelector('.item-original-name');
            const brandInput = row.querySelector('.item-brand');
            const codeInput = row.querySelector('.item-code');
            const unitSelect = row.querySelector('.item-unit');
            const qtyInput = row.querySelector('.item-qty');
            const priceInput = row.querySelector('.item-price');
            
            // Verificar que todos los elementos existan
            if (!descInput || !unitSelect || !qtyInput || !priceInput) return;
            
            // Obtener valores
            const desc = descInput.value || 'Artículo';
            const unit = unitSelect.value || 'UND';
            const qty = parseFloat(qtyInput.value) || 0;
            const price = parseFloat(priceInput.value) || 0;
            
            // Construir descripción final
            let finalDesc = desc;
            
            // Si hay campos ocultos (producto de la base de datos), reconstruir la descripción
            if (originalNameInput && originalNameInput.value) {
                finalDesc = originalNameInput.value;
                
                if (brandInput && brandInput.value && brandInput.value.trim() !== '') {
                    finalDesc += `  -  ${brandInput.value.trim()}`;
                }
                
                if (codeInput && codeInput.value && codeInput.value.trim() !== '') {
                    finalDesc += ` - ${codeInput.value.trim()}`;
                }
            }
            
            quoteData.items.push({
                desc: finalDesc,
                unit,
                qty,
                price
            });
        });
        
        // Generar vista previa
        generatePreview(quoteData);
        
        // Cambiar a pantalla de vista previa
        document.getElementById('form-screen').classList.remove('active');
        document.getElementById('preview-screen').classList.add('active');
        
    } catch (error) {
        console.error('Error en showPreview:', error);
        alert('Error al generar la vista previa. Verifique que todos los campos estén completos.');
    }
}

// Función para generar la vista previa - CORREGIDA
function generatePreview(data) {
    try {
        // Calcular totales
        let subtotal = 0;
        const itemsWithTotals = data.items.map(item => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;
            
            return {
                ...item,
                itemTotal
            };
        });
        
        // CALCULAR GRAVADO (BASE IMPONIBLE) Y IGV CORRECTAMENTE
        const gravado = subtotal / 1.18;
        const totalIgv = subtotal - gravado;
        const total = subtotal;
        
        // Formatear fechas
        // Función para formatear fechas - CORREGIDA PARA MANEJAR ZONAS HORARIAS
const formatDate = (dateString) => {
    if (!dateString) return '10/11/2025';
    
    try {
        // Crear la fecha en formato UTC para evitar problemas de zona horaria
        // El input date proporciona la fecha en formato YYYY-MM-DD (sin hora)
        const dateParts = dateString.split('-');
        if (dateParts.length !== 3) {
            // Si no está en el formato esperado, intentar parsear directamente
            const date = new Date(dateString);
            return date.toLocaleDateString('es-PE');
        }
        
        // Crear fecha en UTC para evitar el desplazamiento de un día
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Los meses en JavaScript son 0-11
        const day = parseInt(dateParts[2]);
        
        // Crear fecha en UTC (sin hora local)
        const date = new Date(Date.UTC(year, month, day));
        
        // Formatear manualmente para asegurar el formato correcto
        const formattedDay = String(date.getUTCDate()).padStart(2, '0');
        const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
        const formattedYear = date.getUTCFullYear();
        
        return `${formattedDay}/${formattedMonth}/${formattedYear}`;
        
    } catch (error) {
        console.error('Error formateando fecha:', error, dateString);
        return '10/11/2025';
    }
};
        
        // Símbolo de moneda
        const currencySymbol = data.currency === 'USD' ? 'US$' : 'S/';
        
        // Generar HTML de las cuentas bancarias para el pie de página
        const footerBanksHTML = `
            <div class="footer-section">
                <div style="border-top: 0px solid #000; margin-bottom: 10px; padding-top: 10px;">
                    <strong style="font-size: 14px;">CUENTAS BANCARIAS:</strong>
                </div>
                <div class="footer-banks">
                    ${data.banks.map(bank => `
                        <div class="footer-bank">
                            <div class="footer-bank-title" style="font-size: 12px;">${bank.name}:</div>
                            <div class="footer-bank-details" style="font-size: 11px;">
                                ${bank.accountPen ? `<div>SOLES: Cta. ${bank.accountPen} - CCI: ${bank.cciPen}</div>` : ''}
                                ${bank.accountUsd ? `<div>DÓLARES: Cta. ${bank.accountUsd} - CCI: ${bank.cciUsd}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Generar HTML del encabezado para páginas 2+
        const pageHeaderHTML = `
            <div class="page-header-section">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <div style="font-weight: bold; font-size: 14px;">${data.companyName} - ${data.companyRuc}</div>
                    <div style="font-size: 12px;">Cotización: ${data.quoteNumber}</div>
                </div>
                <div style="font-size: 11px; border-top: 1px solid #000; padding-top: 5px;">
                    <strong>CLIENTE:</strong> ${data.clientName} - <strong>RUC:</strong> ${data.clientRuc} - 
                    <strong>DIRECCIÓN:</strong> ${data.clientAddress}
                </div>
            </div>
        `;
        
        // Dividir los items en páginas - 30 items por página
        const itemsPerPage = 30;
        const pages = [];
        
        for (let i = 0; i < itemsWithTotals.length; i += itemsPerPage) {
            pages.push(itemsWithTotals.slice(i, i + itemsPerPage));
        }
        
        // Generar HTML para todas las páginas
        let allPagesHTML = '';
        for (let i = 0; i < pages.length; i++) {
            const isLastPage = (i === pages.length - 1);
            allPagesHTML += generatePageHTML(data, pages[i], i, pageHeaderHTML, footerBanksHTML, currencySymbol, gravado, totalIgv, total, formatDate, i > 0, isLastPage);
        }
        
        // Mostrar la vista previa
        document.getElementById('quote-preview').innerHTML = allPagesHTML;
        
    } catch (error) {
        console.error('Error en generatePreview:', error);
        document.getElementById('quote-preview').innerHTML = '<p>Error al generar la vista previa. Por favor, verifique los datos.</p>';
    }
}

// Función auxiliar para generar HTML de cada página
function generatePageHTML(data, pageItems, pageIndex, pageHeaderHTML, footerBanksHTML, currencySymbol, gravado, totalIgv, total, formatDate, isSecondaryPage, isLastPage) {
    const pageClass = isSecondaryPage ? 'secondary-page' : '';
    
    return `
        <div class="${pageClass}">
            ${isSecondaryPage ? pageHeaderHTML : ''}
            
            ${!isSecondaryPage ? `
            <div class="header-container">
                <div class="company-info">
                    <div class="logo-container">
                        ${data.logo ? `<div class="logo-preview-large">${data.logo}</div>` : ''}
                    </div>
                    <div class="company-text">
                        <div class="company-name" style="text-align: center">${data.companyName}</div>
                        <div class="company-desc">MAQUINAS - HERRAMIENTAS - EPPS</div>
                        <div class="client-info">
                            <p>Dirección: ${data.companyAddress}</p>
                            <p>Correo: ${data.companyEmail}</p>
                            <p>Teléfono: ${data.companyPhone}</p>
                        </div>
                    </div>
                </div>
                
                <div class="quote-info">
                    <div class="quote-number-box">
                        <div class="company-subtitle">${data.companyRuc}</div>
                        <div class="quote-header-text">COTIZACIÓN</div>
                        <div class="quote-number">${data.quoteNumber}</div>
                    </div>
                    <div class="quote-details" style="margin-top: 5px;">
                        <div class="detail-row">
                            <span class="detail-label" >FECHA EMISION:</span>
                            <span class="detail-value">${formatDate(data.quoteDate)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">FECHA VENCIMIENTO:</span>
                            <span class="detail-value">${formatDate(data.validUntil)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">VENDEDOR:</span>
                            <span class="detail-value">${data.advisorName}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="border-bottom: 1px solid #000; margin: 10px 0;"></div>
            <div class="info-container">
                <div class="client-details">
                    <p><strong>CLIENTE:</strong> ${data.clientName}</p>
                    <p><strong>RUC:</strong> ${data.clientRuc}</p>
                    <p><strong>DIRECCIÓN:</strong> ${data.clientAddress}</p>
                    <p>${data.clientDistrict} - ${data.clientProvince} - ${data.clientDepartment}</p>
                </div>
            </div>
            <div style="border-bottom: 1px solid #000; margin: 10px 0;"></div>
            ` : ''}
            
            <table class="quote-table">
                <thead>
                    <tr>
                        <th class="num-column">ITEM</th>
                        <th class="desc-column">DESCRIPCIÓN</th>
                        <th class="unit-column">UNIDAD</th>
                        <th class="qty-column">CANTIDAD</th>
                        <th class="price-column">PRECIO UNIT.</th>
                        <th class="total-column">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    ${pageItems.map((item, index) => `
                        <tr>
                            <td style="text-align: center">${(pageIndex * 30) + index + 1}</td>
                            <td>${item.desc}</td>
                            <td style="text-align: center">${item.unit}</td>
                            <td style="text-align: center">${item.qty}</td>
                            <td style="text-align: center">${currencySymbol} ${item.price.toFixed(2)}</td>
                            <td style="text-align: center">${currencySymbol} ${item.itemTotal.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            ${isLastPage ? `
            <div class="totals">
                <table>
                    <tr>
                        <td>GRAVADO</td>
                        <td>${currencySymbol} ${gravado.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>I.G.V. 18%</td>
                        <td>${currencySymbol} ${totalIgv.toFixed(2)}</td>
                    </tr>
                    <tr class="total-row">
                        <td><strong>TOTAL</strong></td>
                        <td><strong>${currencySymbol} ${total.toFixed(2)}</strong></td>
                    </tr>
                </table>
            </div>
            ` : ''}

            ${footerBanksHTML}
        </div>
        
        ${!isLastPage ? '<div style="page-break-after: always;"></div>' : ''}
    `;
}

// Función para volver al formulario
function showForm() {
    document.getElementById('preview-screen').classList.remove('active');
    document.getElementById('form-screen').classList.add('active');
}

// Función para cancelar la cotización
function cancelQuote() {
    if (confirm('¿Está seguro de que desea cancelar esta cotización?')) {
        resetForm();
        showForm();
    }
}

// Función para mostrar la pantalla de impresión
function showPrint() {
    generatePrintView(quoteData);
    document.getElementById('preview-screen').classList.remove('active');
    document.getElementById('print-screen').classList.add('active');
}

// Función para generar la vista de impresión
function generatePrintView(data) {
    // Usar la misma lógica que generatePreview pero para impresión
    generatePreview(data);
    document.getElementById('quote-print').innerHTML = document.getElementById('quote-preview').innerHTML;
}

// Función para nueva cotización
function newQuote() {
    resetForm();
    document.getElementById('print-screen').classList.remove('active');
    document.getElementById('form-screen').classList.add('active');
}

// Función para resetear el formulario
function resetForm() {
    // Solo restablecer los campos que EXISTEN en el formulario actual
    const fields = [
        'quote-number', 'client-ruc', 'client-name', 'client-address',
        'client-district', 'client-province', 'client-department',
        'advisor-name'
    ];
    
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) element.value = '';
    });
    
    // Resetear tabla de artículos - DEJAR VACÍA
    const itemsBody = document.getElementById('items-body');
    itemsBody.innerHTML = '';
    
    // CORREGIDO: Resetear bancos pero mantener los por defecto
    const bankContainer = document.getElementById('bank-accounts-container');
    bankContainer.innerHTML = '';
    bankCounter = 0;
    
    // Agregar bancos por defecto nuevamente
    DEFAULT_BANKS.forEach(bank => {
        addBank(bank);
    });
    
    // Restablecer fechas
    document.getElementById('quote-date').valueAsDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);
    document.getElementById('valid-until').valueAsDate = futureDate;
    
    // Restablecer selects
    document.getElementById('currency').value = 'PEN';
    document.getElementById('order-type').value = 'Entrega Inmediata';

    // Resetear datos del cliente
    document.getElementById('client-ruc').value = '';
    document.getElementById('client-name').value = '';
    document.getElementById('client-address').value = '';
    document.getElementById('client-district').value = '';
    document.getElementById('client-province').value = '';
    document.getElementById('client-department').value = '';
    
    // Habilitar campos del cliente
    disableClientFields(true);
    
    // Ocultar resultados de búsqueda
    document.getElementById('client-search-results').style.display = 'none';
}

// Función mejorada para confirmar y descargar
function confirmAndDownload() {
    if (confirm('¿Está seguro de que desea confirmar esta cotización y generar el PDF?')) {
        // Mostrar pantalla de impresión
        generatePrintView(quoteData);
        document.getElementById('preview-screen').classList.remove('active');
        document.getElementById('print-screen').classList.add('active');
        
        // Esperar a que se renderice y descargar
        setTimeout(() => {
            window.print();
            
            // Opcional: Mostrar mensaje de éxito
            setTimeout(() => {
                alert('PDF generado exitosamente');
                newQuote(); // Volver al formulario
            }, 1500);
        }, 800);
    }
}







