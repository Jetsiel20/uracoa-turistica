# Continuidad de Uracoa Turística

Actualizado: 26 de septiembre de 2026.

## Proyecto
- Sitio estático en HTML, CSS y JavaScript, sin framework ni proceso de compilación.
- Archivo principal: index.html. Estilos: assets/css/. Scripts: assets/js/.
- Repositorio: https://github.com/Jetsiel20/uracoa-turistica.git
- Rama: main. Remoto: origin.
- Sitio público: https://uracoa-turistica.vercel.app/
- Último commit de la web confirmado como subido: 9eacd56 (Actualiza tarjetas de experiencias y presencia del menu).
- Antes de crear esta nota, el directorio de trabajo estaba limpio y main sincronizada con origin/main.
- La web pública fue verificada anteriormente por HTTP. No se ha confirmado el despliegue del commit 9eacd56 en Vercel.

## Trabajo terminado
- Limpieza de CSS duplicado/sin uso, variables sin uso y del módulo vacío place.js.
- Enlaces a páginas inexistentes reemplazados por secciones existentes o avisos de contenido pendiente.
- Favicon SVG añadido y navegación móvil disponible incluso sin JavaScript.
- Altura de cabecera centralizada en --header-height; el JavaScript del menú consulta el estado del CSS para determinar el modo móvil.
- Imágenes hero y descubre convertidas a WebP sin pérdida de píxeles, con una reducción conjunta aproximada del 23 %. Los PNG antiguos fueron eliminados y esa eliminación ya está en el repositorio.
- Tarjetas de Experiencias: 260 px de altura mínima y dos columnas por encima de 600 px; 200 px y una columna hasta 600 px.
- Las cuatro tarjetas tienen imagen, texto alternativo, dimensiones 1672 x 941, carga diferida y degradado para el título:
  - Arquitectura: assets/imagenes/obelisco.webp. Antes se llamaba Naturaleza; el usuario pidió cambiarla.
  - Historia: assets/imagenes/plaza-bolivar.webp.
  - Cultura: assets/imagenes/iglesia.webp.
  - El río: assets/imagenes/rio.webp, con encuadre vertical al 75 %.
- Nav: enlaces de 1.0625rem (17 px con fuente raíz estándar), peso 600 y opacidad 1; marca URACOA de 1.25rem (20 px).
- Todos estos cambios de la web están incluidos en 9eacd56 y subidos a main.

## Verificación realizada
- Comprobaciones en Chrome sin ventana: menú móvil, Escape, foco por teclado, cambios entre móvil y escritorio, seis tamaños de pantalla, movimiento reducido y navegación sin JavaScript.
- Medidas de tarjetas verificadas a 320, 390, 600, 601, 768, 900 y 1440 px, sin desbordamientos internos.
- Tras el ajuste del nav se repitieron las comprobaciones generales con éxito, sin excepciones JavaScript ni errores HTTP.
- Las últimas inserciones de imágenes también se comprobaron mediante existencia de archivos y git diff --check.
- Estas comprobaciones no equivalen a una revisión visual exhaustiva de todos los encuadres en dispositivos reales.

## Pendientes de contenido
- Experiencias ya tiene títulos e imágenes; faltan descripciones y destinos/enlaces si se decide incorporarlos.
- Historia: desarrollar contenido histórico. No existe una cronología implementada.
- Bloque grande del río: aún utiliza degradados; no confundirlo con la tarjeta El río, que sí tiene foto.
- Lugares: ampliar la información; actualmente solo hay una referencia al río.
- Cultura y gastronomía: desarrollar contenido e imágenes de sus secciones.
- Planifica tu visita: redactar información verificada sobre cómo llegar; actualmente tiene aviso de próxima disponibilidad.
- Galería: pendiente; actualmente tiene aviso de preparación.
- No hay páginas internas implementadas en pages/.
- No hay un siguiente cambio concreto autorizado después de guardar esta nota.

## Forma de colaborar
- Conversar en español y avanzar por bloques con cambios acotados.
- El usuario insiste en conservar lo que funciona: “sin romper nada”.
- Si pide analizar y decir, presentar la propuesta antes de modificar.
- Usar las imágenes WebP que el usuario deja en assets/imagenes/ y comprobar nombre y dimensiones.
- Distinguir claramente cambios locales, cambios subidos a GitHub y despliegues realmente verificados en Vercel.
- Actualizar esta nota al finalizar avances relevantes; comprobar primero el estado real del repositorio.
## Avance local: nav, 27 de septiembre de 2026
- Primera propuesta aplicada por solicitud del usuario: cabecera crema en flujo normal, marca y enlaces verde río, acción Planifica tu visita destacada y panel móvil crema.
- Ajustado únicamente el espacio del hero para compensar la cabecera; no se implementó el carrusel. Se conserva navigation.js y las secciones inferiores.
- Verificación: git diff --check correcto y captura de Chrome a 1440 x 1000 revisada visualmente. Chrome falló dentro del aislamiento; la captura se obtuvo al ejecutarlo con permisos ampliados. Pendiente repetir comprobaciones interactivas del menú móvil y teclado con el nuevo diseño.
- Cambios locales en index.html, components.css y responsive.css; sin commit, push ni despliegue verificado.
- Pendiente valoración del usuario del nav y selección de tres imágenes adicionales para el futuro carrusel.

## Limpieza local: 27 de septiembre de 2026
- El usuario aprobó el aspecto del nuevo nav y pidió buscar código muerto y duplicidad.
- Eliminadas declaraciones de opacidad y transición sin efecto en los enlaces del nav, su excepción innecesaria de movimiento reducido, la repetición de posición/fondo de la cabecera sin JavaScript y el padding superior redundante del hero a 900 px.
- Conservados los fallbacks de navegación, los ajustes de pantallas horizontales y los estados dinámicos de animación. No se modificó JavaScript ni contenido HTML durante esta limpieza.
- Revisión estática: sin imágenes huérfanas, variables CSS declaradas sin referencia, IDs duplicados ni anclas rotas; bloques CSS equilibrados y git diff --check correcto. No se repitieron pruebas de navegador en esta limpieza; sigue pendiente la comprobación interactiva móvil del nuevo nav.
- Cambios exclusivamente locales, sin commit, push ni despliegue.

## Estructura del hero: 27 de septiembre de 2026
- Autorizada la secuencia sin controles ni bucles. Se interpreta que vuelve a empezar al recargar y se detiene en la última foto disponible.
- Eliminado initHeroParallax, su llamada, transformaciones y sobreencuadre; conservadas las animaciones de entrada del resto de la página.
- Nuevo hero-sequence.js: foto inicial de respaldo en CSS, fundidos de 2 segundos tras 8 segundos de reposo, precarga y decodificación antes de mostrar cada foto, sin reinicio al volver al hero. No avanza con la pestaña oculta o el hero fuera de vista. Movimiento reducido conserva imagen estática.
- Se encontró hero-2.webp y se conectó como segunda foto. Quedan dos src nulos explícitos para las imágenes 3 y 4; no se solicitan archivos inexistentes.
- Verificación inicial: sintaxis JavaScript y git diff --check correctos. Pendientes revisión posterior de código solicitada por el usuario, comprobación visual de fundidos y encuadres, y fotografías 3 y 4.
- Cambios locales únicamente, sin commit, push ni despliegue.

## Revisión del hero y nav: 27 de septiembre de 2026
- Corregido un caso de carga lenta: al salir y volver al hero, una decodificación anterior podía adelantar el cambio. Cada programación tiene ahora una generación que invalida resultados antiguos.
- Retirados los dos registros con src nulo y el filtrado asociado; se conserva comentario para incorporar las fotos 3 y 4 cuando existan.
- Trasladada la regla móvil de hero-slide a responsive.css para reunir los ajustes del mismo breakpoint.
- Confirmada ausencia de referencias al parallax retirado. Se mantienen las reglas necesarias de estados dinámicos, movimiento reducido y navegación sin JavaScript.
- Verificación: seis escenarios con Node y DOM/temporizadores simulados (final sin bucle e inicialización única, movimiento reducido inicial, carga lenta al salir/volver, pestaña oculta, imagen fallida y cambio de preferencia durante la carga), todos correctos. Sintaxis de los módulos modificados y git diff --check correctos.
- Estas pruebas validan lógica, no renderizado. Pendientes comprobación visual de fundidos/encuadres y prueba interactiva móvil del nav. La foto hero.webp sigue pesando aproximadamente 2,36 MB; no se recomprimió en esta revisión.
- Todo continúa local, sin commit, push ni despliegue.

## Tiempo del hero: 27 de septiembre de 2026
- Espera reducida de 8 a 5 segundos por petición del usuario. Se conservan los 2 segundos de fundido: primera transición a los 5 segundos, posteriores tras 2 de fundido y 5 de reposo.
- Sintaxis de hero-sequence.js y git diff --check correctos. Cambio local, sin commit, push ni despliegue; pendientes visuales anteriores sin cambios.

## Cuatro fotografías del hero: 27 de septiembre de 2026
- Incorporadas hero-3.webp y hero-4.webp a hero-sequence.js, después de hero-2.webp. Secuencia completa con la foto inicial hero.webp, sin bucles y con final en la cuarta.
- Conservados 5 segundos de reposo y 2 segundos de fundido. Nuevos encuadres centrados en escritorio y móvil.
- Verificados archivos WebP con Pillow, dimensiones y sintaxis JavaScript; git diff --check correcto. Pendiente revisión visual de encuadres en navegador.
- Cambios locales, sin commit, push ni despliegue.

## Degradado del hero: 27 de septiembre de 2026
- Aplicada la reducción aprobada: escritorio izquierda 72 a 60 %, centro 25 a 18 %, superior 40 a 25 % e inferior 22 a 15 %. En móvil, zona del texto 68 a 58 %; extremos conservados.
- Cambio limitado a las opacidades de hero-overlay en components.css y responsive.css. Sin cambios de estructura, carrusel ni tiempos.
- Verificadas coincidencias exactas antes de reemplazar y git diff --check correcto. Pendiente comprobar visualmente la legibilidad de las cuatro fotos en escritorio y móvil.
- Cambios locales, sin commit, push ni despliegue.

## Revisión tras suavizar el degradado: 27 de septiembre de 2026
- Revisados diff de estilos del nav/hero, integración de módulos y secuencia de cuatro imágenes. Corregido comentario obsoleto que todavía indicaba que faltaban dos fotografías.
- No se identificaron nuevos errores funcionales en la revisión estática. Las reglas desktop/móvil del degradado son variantes necesarias; no duplicidad eliminable.
- Verificación: sintaxis de los cuatro módulos JS, existencia de fotos/importaciones, IDs únicos, anclas válidas, llaves CSS equilibradas y git diff --check correctos.
- No se repitieron pruebas visuales: sigue pendiente evaluar contraste sobre las cuatro fotos y navegación móvil. Cambios locales, sin commit, push ni despliegue.

## Primera imagen uniforme: 27 de septiembre de 2026
- El usuario reemplazó hero.webp por hero-1.webp. Actualizada la referencia del fondo inicial en components.css para evitar la ruta antigua inexistente.
- Verificados los cuatro WebP: todos tienen 1672 x 941 px. hero-1.webp pesa 111876 bytes. Sin cambios al carrusel, encuadres ni tiempos.
- git diff --check correcto. Cambios locales, sin commit, push ni despliegue; revisión visual pendiente.

## Cierre visual del nav y hero: 27 de septiembre de 2026
- El usuario da por terminados y aprueba el nav y el hero. Esta aprobación visual no sustituye las verificaciones de navegador pendientes registradas anteriormente.
- Siguiente foco solicitado: analizar el bloque Descubre (Esto es Uracoa) con VisitScotland como referencia de organización, sin clonar. Se prepara propuesta; no se modificaron las secciones de la web en este turno.
- Dirección propuesta: bienvenida breve y evocadora, fotografía con protagonismo y transición clara hacia las cuatro experiencias. Pendiente valoración del usuario antes de implementar.
- Estado local: cambios anteriores sin commit, push ni despliegue confirmado.

## Descubrimiento unificado: 27 de septiembre de 2026
- Ejecutada la propuesta aprobada: retirado el bloque independiente Esto es Uracoa y su foto; Una tierra por descubrir pasa a ser la primera sección tras el hero, con etiqueta Descubre Uracoa y una frase que presenta las cuatro experiencias.
- Trasladado id=descubre a experiences: conservados los enlaces del nav, el botón Explorar Uracoa y el indicador del hero. Cuatro tarjetas sin modificaciones.
- Retirados CSS de intro, su media query exclusiva, selectores de animación de intro y variables --space-lg/--radius-md que quedaron sin uso. Conservadas las animaciones del hero y las demás secciones.
- uracoa-descubre.webp se conserva en disco para posible reutilización, aunque ya no está referenciada por la página.
- Verificación estática: IDs únicos, anclas válidas, cuatro tarjetas conservadas, imágenes existentes, llaves CSS equilibradas, sintaxis animations.js y git diff --check correctos. Pendiente revisión visual de este bloque en navegador.
- Cambios locales, sin commit, push ni despliegue. Nav y hero permanecen aprobados por el usuario.

## Revisión de sección unificada: 27 de septiembre de 2026
- El usuario valora positivamente el resultado y solicita revisión de código. Sin nuevos errores detectados en el alcance estático revisado; no se modificó código de la web.
- Comprobados anidamiento HTML, IDs únicos, destinos de anclas, cuatro tarjetas, variables CSS utilizadas, rutas CSS existentes y ausencia de referencias a intro/parallax eliminados. Sintaxis de los cuatro módulos JS y git diff --check correctos.
- uracoa-descubre.webp continúa como recurso sin uso conservado. Detectado detalle editorial en el texto actual: rio sin tilde y sin puntuación antes de cuatro formas; no alterado durante esta revisión de código.
- No se ejecutaron pruebas visuales ni de interacción en este turno. Todo sigue local, sin commit, push ni despliegue.

## Texto del hero más discreto: 27 de septiembre de 2026
- Aplicada la propuesta autorizada: título con máximo de 104 px en escritorio y 48–64 px en móvil (con raíz estándar); frase de 18–24 px, espacios más compactos y ubicación con menor separación entre letras.
- Botón principal limitado al hero: altura mínima 48 px, padding y texto ligeramente reducidos. Conservados contenido del usuario, posición superior en móvil, nav, degradado y carrusel.
- Ajuste específico para ventanas horizontales de poca altura: título limitado a 64 px y menor margen bajo la frase.
- Verificación: git diff --check correcto; reglas limitadas al hero en components.css y responsive.css. Pendiente revisión visual sobre las cuatro fotografías en escritorio y móvil; no se ejecutó navegador en este turno.
- Cambios locales, sin commit, push ni despliegue.

## Animación de las cuatro tarjetas: 27 de septiembre de 2026
- Aplicada exclusivamente la animación aprobada: entrada de 12 px en 550 ms, con 80 ms de retraso solo para tarjetas pares cuando hay dos columnas (más de 600 px). En una columna no hay retrasos acumulados.
- Reutilizado content-enter con variable de desplazamiento; las demás secciones conservan sus 20 px y duración. Retirados los antiguos retrasos de 100/200/300 ms.
- Se conserva el observador existente que anima una sola vez, y el respeto a movimiento reducido. Sin cambios de HTML, orden, contenido, enlaces ni hero.
- Verificación: revisión de cascada CSS, umbral coincidente con la cuadrícula y git diff --check correcto. Pendiente revisión visual en navegador.
- Cambios locales, sin commit, push ni despliegue.

## Activación visible de tarjetas: 27 de septiembre de 2026
- Corregida la activación temprana: las tarjetas usan un observador propio con umbral de 30 % y sin margen recortado. Se comprueba intersectionRatio también en las notificaciones iniciales.
- Las demás secciones mantienen umbral 0 y margen inferior de -32 px. Función compartida para evitar duplicar la lógica de entrada; todos los observadores se desconectan al activar movimiento reducido.
- Conservados 12 px, 550 ms, escalonado de 80 ms por fila y reproducción única. Sin cambios al hero ni al diseño.
- Verificación con Node y observadores simulados: no anima por debajo de 30 %, anima al alcanzarlo, no repite, otras secciones conservan activación y movimiento reducido desconecta observadores. Sintaxis y git diff --check correctos. Pendiente confirmación visual al desplazar en navegador.
- Cambios locales, sin commit, push ni despliegue.

## Entrada de tarjetas más lenta: 27 de septiembre de 2026
- Duración aumentada de 550 a 900 ms por solicitud del usuario. Conservados desplazamiento de 12 px, activación al 30 %, retraso de 80 ms por fila y reproducción única.
- Cambio limitado a animations.css; git diff --check correcto. Pendiente valoración visual del ritmo. Local, sin commit, push ni despliegue.
