# Blog 6 — soporte de investigación: Search Console y diagnóstico

Consulta: **20 de octubre de 2026, Australia/Sydney**. Investigación documental pública; no se accedió a cuentas de Ranking Rebels, no se probaron sus URLs en Search Console y no se enviaron solicitudes de indexación. Se abrieron los cuerpos de las ocho páginas oficiales descritas aquí. No son fuentes de resultados comerciales ni de una auditoría del sitio de la empresa.

Esta nota apoya el artículo **Why Isn't My Website Showing Up on Google? A Step-by-Step SEO Diagnosis**. La guía **What Is SEO?** permanece como artículo4 del plan de catorce; este es el6 y debe resolver un diagnóstico concreto, sin volver a explicar toda la disciplina.

## Hallazgo central y niveles de evidencia

La hipótesis de trabajo editorial es separar cinco preguntas: ¿Google conoce la URL?, ¿puede obtener y procesar su contenido?, ¿la incorporó al índice y qué canonical eligió?, ¿la muestra para búsquedas pertinentes?, ¿esas apariciones generan visitas y consultas? Es una organización pedagógica propia, no una secuencia de indicadores oficiales ni una garantía de que superar un paso cause el siguiente. Las fuentesSC1–SC8 respaldan las distinciones y límites específicos siguientes.

## Ocho fuentes primarias leídas

### SC1. URL Inspection tool

URL: <https://support.google.com/webmasters/answer/9012289?hl=en>

Fecha: documentación viva de Google, sin fecha pública de actualización identificada en el cuerpo leído. Consulta20oct2026.

**Respalda:** la vista inicial recupera información del índice, no el estado actual del sitio. La prueba en vivo obtiene la página de nuevo y permite revisar lo renderizado. Un resultado positivo en vivo no comprueba todas las condiciones: no decide la canonical final ni garantiza inclusión. En la vista indexada se puede comparar canonical declarada y elegida por Google. “URL is on Google” tampoco promete aparecer para una consulta particular. Existen límites diarios de inspecciones.

**Límite editorial:** no confundir inspección, test en vivo y solicitud de indexación. Ver un problema corregido en vivo no demuestra que el índice ya se haya actualizado. Una captura renderizada útil no certifica indexación ni ranking. Referencias dentro de la página: “About the indexed URL status”, “Live URL test”, “What isn't tested”.

### SC2. Page indexing report

URL: <https://support.google.com/webmasters/answer/7440203?hl=en>

Fecha: documentación viva, sin fecha pública de actualización identificada. Consulta20oct2026.

**Respalda:** sirve para patrones del conjunto de URLs conocidas; para una URL concreta remite a Inspection. No se pretende indexar el cien por cien: duplicados, redirecciones y páginas retiradas pueden quedar fuera correctamente. Las listas de ejemplos no son inventarios completos. “Crawled - currently not indexed” indica rastreo sin indexación; no prueba una causa de calidad y Google indica que no hace falta reenviar para rastreo. “Discovered - currently not indexed” significa conocida sin rastreo; describe como motivo típico la reprogramación por carga prevista. Una canonical alternativa inesperada necesita investigación.

**Límite editorial:** no eliminar todas las exclusiones ni diagnosticar mal hosting por un estado aislado. La página contiene resúmenes amplios sobre robots; su sección detallada reconoce que bloquear rastreo no garantiza impedir indexación. No reproducir el resumen como garantía de exclusión. Referencias: “What not to look for”, “Not indexed”, estados específicos.

### SC3. Ask Google to recrawl your URLs

URL: <https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl>

Fecha visible: **10 de diciembre de 2025 UTC**. Consulta20oct2026.

**Respalda:** para pocas URLs se puede usar Inspection; para muchas, sitemap. Solicitar requiere propiedad gestionada y permisos adecuados. El rastreo puede tardar de días a semanas; pedirlo no garantiza inclusión, rapidez ni aparición. Hay cuotas, sin cifra universal publicada en esta página, y reenviar repetidamente la misma URL no acelera el rastreo.

**Límite editorial:** no convertir ese rango de rastreo en plazo de indexación, ranking o retorno comercial. No prometer “Google tarda24/48horas”, no recomendar solicitudes diarias ni presentar la cola como aceptación. Una solicitud resulta razonable tras corregir una URL importante nueva o modificada; no sustituye la corrección.

### SC4. site: search operator

URL: <https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site>

Fecha visible: **10 de diciembre de 2025 UTC**. Consulta20oct2026.

**Respalda:** limita resultados a dominio, URL o prefijo. No devuelve necesariamente todas las URLs indexadas; una URL indexada puede faltar en ese resultado. Sin término adicional no representa una clasificación normal por relevancia y el orden es en gran parte aleatorio.

**Límite editorial:** útil como comprobación orientativa pública; no sirve de censo ni prueba definitiva de desindexación. Si una URL falta, confirmar con Inspection. No deducir “sólo tiene12páginas indexadas” de un recuento aproximado de resultados ni usar el primer resultado `site:` como prueba de cuál página posiciona mejor.

### SC5. Performance report: Overview and basic setup

URL: <https://support.google.com/webmasters/answer/7576553?hl=en>

Fecha: documentación viva, sin fecha pública de actualización identificada. Consulta20oct2026.

**Respalda:** clics, impresiones, CTR y posición media describen rendimiento en resultados. Se puede agrupar por consultas, páginas, países, dispositivos, fechas y apariencia, y modificar rango/tipo de búsqueda. La misma consulta ejecutada manualmente puede devolver resultados distintos según momento, lugar, dispositivo e historial. La posición es un promedio condicionado al conjunto medido, no un puesto fijo.

**Límite editorial:** filtrar Australia no significa comparar todas las búsquedas de una ciudad. Una impresión no es visita ni consulta de negocio. No concluir que la web no aparece porque el propietario no la ve en una búsqueda personal. Revisar los filtros antes de interpretar ceros.

### SC6. Performance report: Dimensions and data groupings

URL limpia: <https://support.google.com/webmasters/answer/17011259?hl=en>

Fecha: documentación viva, sin fecha pública de actualización identificada. Consulta20oct2026.

**Respalda:** la mayoría de datos de rendimiento se asigna a la canonical, incluyendo clics sobre duplicados. Algunas consultas se omiten por privacidad; hay límites de almacenamiento/filas. Las consultas anonimizadas se incluyen en totales salvo cuando se filtra por consulta. La agrupación por país corresponde al origen de la búsqueda. La clasificación de marca puede no estar disponible con pocas impresiones y puede clasificar mal.

**Límite editorial:** cero datos en una variante de URL o ausencia de una fila de consulta no demuestra falta de visibilidad. Verificar canonical, propiedad, filtros y alcance. Para el artículo basta separar marca/no marca como análisis conceptual; no obligar a que el lector disponga del filtro automático.

### SC7. Performance report: About the data

URL limpia: <https://support.google.com/webmasters/answer/17011364?hl=en>

Fecha: documentación viva, sin fecha pública de actualización identificada. Consulta20oct2026.

**Respalda:** contar por propiedad y por página produce agregaciones distintas. Los datos más recientes pueden ser preliminares y cambiar; el gráfico los identifica con una línea discontinua. La fecha de actualización informa de la disponibilidad del reporte.

**Límite editorial:** un cambio aparente en totales puede resultar del modo de agrupación. Para diagnóstico de una pérdida, comparar períodos equivalentes y revisar frescura antes de afirmar una caída. No usar una fotografía de hoy como prueba definitiva.

### SC8. Performance report: Troubleshooting data discrepancies

URL limpia: <https://support.google.com/webmasters/answer/17010575?hl=en>

Fecha: documentación viva, sin fecha pública de actualización identificada. Consulta20oct2026.

**Respalda:** las diferencias entre tablas, gráficos y otras herramientas pueden venir de agregación, filas omitidas, privacidad, procesamiento, demora y zonas horarias. Los informes diarios ordinarios usan Pacific Time; la vista24horas sigue hora local. No todos los clicsSC equivalen a sesionesAnalytics.

**Límite editorial:** no diagnosticar una avería sólo porque Analytics y Search Console difieren. El contexto australiano hace pertinente revisar fechas, sin convertir el artículo en un tutorial de atribución; esa profundidad corresponde al blog11.

## Recomendación editorial propia: árbol de decisiones breve

1. Elegir una URL importante y una búsqueda concreta. Registrar si nunca apareció, si una página nueva falta o si hubo pérdida reciente. Mantener aparte Maps y anuncios.
2. Confirmar propiedad y URL exactas en Search Console. Leer primero la vista del índice de Inspection; anotar fecha de último rastreo y canonical.
3. Si no está indexada, identificar el motivo. Compararlo con la intención editorial: no todos los duplicados, redirecciones o404 requieren arreglo. Si cambió la página, contrastar la vista actual en vivo, reconociendo sus límites.
4. Si parece técnicamente accesible pero sigue excluida, estudiar contenido, duplicidad, enlaces y los patrones pertinentes; no presentar una causa única inferida de la etiqueta.
5. Si está indexada, pasar a Performance con fecha, tipo, país y página apropiados; buscar tendencias e intención de consulta. Un resultado aislado no permite cuantificar el problema.
6. Después de cambios confirmados, pedir un recrawl individual cuando proceda o mantener un sitemap para múltiples URLs. Registrar lo modificado y revisar nueva evidencia; no reenviar por ritual.

Esta priorización es una propuesta editorial. No se aplicó a Ranking Rebels ni certifica que todos los casos sigan ese orden. Los sitios grandes, migraciones, acciones manuales y fallos de servidor requieren profundización por especialistas.

## Errores que la auditoría del manuscrito debe buscar

- “No está en mi búsqueda = no está indexada”. La inferencia no se sostiene con SC1,SC4,SC5.
- “Prueba en vivo verde = ya está indexada”. Contradice los límites de SC1.
- “Crawled/notindexed = thin content o penalización”. SC2 no atribuye esa causa.
- “Discovered = servidor lento demostrado”. SC2 describe un motivo habitual, no el diagnóstico del sitio.
- “Todas las exclusiones son fallos”. No coincide con SC2.
- “Request indexing publica o posiciona”. No coincide con SC3.
- “Cero fila de query o URL alternativa = cero apariciones”. Debe comprobarse conSC6.
- “El mismo gráfico de hoy y ayer prueba pérdida”. Debe revisar frescura, agregación y fechasSC7–SC8.

No se obtuvo información privada que permita confirmar indexación, sanción, servidor, visibilidad, fechas de publicación, tráfico o conversiones de Ranking Rebels o un cliente. Los ejemplos que se creen para explicar este flujo deben identificarse como hipotéticos.

## Auditoría del manuscrito — 20 de octubre de 2026

Se leyó completo `02-articulo-google-visibility-diagnosis-australia.md`. Revisión documental asistida por IA en el ámbito de esta nota; no auditoría de una propiedadSC ni revisión humana. **No se identificaron errores críticos ni afirmaciones técnicas incorrectas en las distinciones verificadas.** Tampoco se justifica reescribir las secciones que funcionan.

| Gravedad / naturaleza | Extracto o lugar | Evaluación y evidencia | Corrección proporcionada |
|---|---|---|---|
| Menor; precisión operativa omitida | §5: “Use Search Console performance data to examine the relevant page, queries, country, device and period.”; §6 sobre descensos | Los filtros elegidos están bien cubiertos, pero falta recordar que los datos más recientes pueden ser preliminares. SC7–SC8 permiten evitar un falso descenso por frescura o corte de fechas. El texto no formula una falsedad; es una precaución útil para este diagnóstico. | Añadir una oración: “Check the active filters and data freshness before treating a recent low or zero as a confirmed decline.” No hace falta dar un plazo fijo ni desarrollar un tutorial deAnalytics. |
| Menor; rama diagnóstica ausente, no error demostrado | §6: “Check the Manual Actions report and Security Issues report where relevant.” | Es correcto. SC1 también advierte que las retiradas temporales no están contempladas por el resultado de inspección y pueden impedir aparición. Si se pretende cubrir una URL indexada que desaparece, merece una comprobación adicional. | Añadir, como condición de desaparición inesperada, revisar si existe una retirada temporal activa enSearchConsole. No sugerir enviar una retirada ni describirla como desindexación permanente. Esta rama puede quedar en notas para el especialista si se prioriza brevedad. |

Comprobaciones satisfactorias:

- §2 presenta `site:` como pista e inventario incompleto, sin usarlo para una conclusión de desindexaciónSC4.
- §3 distingue la vista del índice de la prueba actual, reconoce el desfase después de una reparación y no promete inclusiónSC1.
- §3–4 distinguen exclusiones legítimas y la canonical deseada de la indexación de todos los duplicadosSC2.
- §4 no atribuye “discovered” a una avería demostrada ni “crawled/notindexed” a un defecto concreto; desaconseja reescribir o reenviar por la etiquetaSC2.
- §5 separa ranking de indexación; no infiere ausencia absoluta de una consulta no reportada y recuerda la atribución canonicalSC5–SC6.
- §7 conserva el alcance correcto del plazo: días–semanas de **rastreo**. Reconoce cuotas sin inventar un número y que repetir no acelera, sin prometer indexación nirankingSC3.

Preferencias que no se proponen como defectos: abreviar títulos, aumentar el número deFAQ, imponer una cantidad de fuentes o una longitud diferente. No hay evidencia de que esos cambios mejoren la utilidad de este manuscrito. No se modificaron los archivos principales.
