# Registro de fuentes y límites

Revalidación: 23 de octubre de 2026, Australia/Sydney. Se abrieron los cuerpos y se leyeron los pasajes materiales de las veinte fuentes originales del artículo, más dos documentos oficiales de apoyo. No se afirma lectura íntegra de cada sitio, auditoría de una cuenta ni verificación independiente de resultados comerciales. La fecha de consulta no es una fecha de publicación o cambio del sistema.

| Fuente abierta | Qué respalda | Límite conservado |
|---|---|---|
| [Operador site:](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site) | La búsqueda acotada no devuelve necesariamente todas las URLs indexadas. | Ni recuento exacto ni prueba única de desindexación. |
| [URL Inspection](https://support.google.com/webmasters/answer/9012289) | Vista indexada y prueba actual con alcances distintos; canonical seleccionada en datos del índice. | Live positivo no confirma inclusión, canonical final, retirada temporal inexistente o ranking. |
| [Page Indexing](https://support.google.com/webmasters/answer/7440203) | Patrones de indexación, exclusiones esperadas y estados discovered/crawled. Se leyeron también sus definiciones específicas. | La etiqueta por sí sola no demuestra hosting lento, defecto de calidad o penalización. La lista de ejemplos no es inventario completo. |
| [Enlaces rastreables](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) | Enlaces con href, anclas descriptivas y contexto. | Sin cantidad mágica ni obligación de enlazar todas las parejas. |
| [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) | Ayuda para descubrir páginas y sus relaciones. | Enviar un sitemap no garantiza rastreo o indexación. |
| [Noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) | Meta o cabecera HTTP, regla accesible al rastreador y noindex no admitido en robots.txt. | Revisar propósito antes de retirar restricciones; no expone contenido privado. |
| [Respuestas HTTP](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes) | Respuestas de éxito, redirecciones, errores y posible soft 404 por contenido vacío/error con éxito. | HTTP 200 no certifica inclusión; una redirección válida no es un redirect error. |
| [Canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) | Señales de preferencia y coherencia entre enlaces, sitemap y declaraciones. | Preferencia no es orden; noindex no es atajo para elegir representante interno. |
| [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) | Rastreo, renderizado, contenido y recursos recibidos. | No obliga a reconstruir todo sitio JavaScript ni demuestra el resultado de una página concreta. |
| [Lazy loading](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading) | Contenido relevante disponible sin interacción que Google no realiza. | Inspeccionar implementación antes de atribuir un fallo. |
| [Performance: dimensiones](https://support.google.com/webmasters/answer/17011259?hl=en) | Consultas omitidas y atribución de gran parte de los datos a canonical, con segmentación. | Fila ausente o variante con pocos datos no demuestra cero apariciones. La página fue accesible en esta revisión. |
| [Performance: datos y frescura](https://support.google.com/webmasters/answer/17011364?hl=en) | Datos recientes preliminares y diferencias de agregación. | Revisar filtros y fechas antes de tratar un cero reciente como caída confirmada. |
| [Contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Autoevaluación de utilidad y contribución para personas. | No respalda densidad, extensión óptima o resultados prometidos. |
| [Caídas de tráfico](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops) | Hipótesis técnicas, demanda, ranking, seguridad y datos. | La forma de la curva o coincidencia con una actualización no prueba la causa. |
| [Search Console y Analytics](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console) | Observan etapas y métricas diferentes antes y después de la llegada al sitio. | No igualar clics, sesiones o consultas comerciales ni inferir pérdida de Google de una caída sólo en Analytics. |
| [Manual Actions](https://support.google.com/webmasters/answer/9044175) | Acciones de revisión humana por políticas de spam y su proceso. | Un informe limpio no certifica toda la salud técnica ni preferencias de sistemas automáticos. |
| [Security Issues](https://support.google.com/webmasters/answer/9044101) | Incidencias de seguridad y posibles avisos en resultados o navegador. | No confundir con acciones manuales, ni una solicitud ordinaria de rastreo con revisión de seguridad. |
| [Retiradas temporales](https://support.google.com/webmasters/answer/9689846?hl=en) | Bloqueo temporal de aparición y revisión de solicitudes existentes. | Live positivo no lo descarta. No se prescribe cancelar una retirada sin revisar su propósito. |
| [Pedir nuevo rastreo](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) | Permisos, límites y que reenviar no acelera. El rango de días/semanas describe rastreo. | Sin plazo de indexación, ranking o clientes. No se ejecutó ninguna solicitud. |
| [Contact](https://rankingrebels.com/contact/) | Destino real y pertinente para iniciar la conversación con la marca. | No se envió el formulario ni se verificó entrega, seguimiento o servicio comercial concreto. |
| [Robots.txt, apoyo](https://developers.google.com/search/docs/crawling-indexing/robots/intro) | Acceso del rastreador y posibilidad de aparición de una URL bloqueada conocida por enlaces. | No usarlo como mecanismo de privacidad o garantía de retirada. |
| [Requisitos técnicos, apoyo](https://developers.google.com/search/docs/essentials/technical) | Acceso, respuesta de éxito y contenido elegible. | Cumplir mínimos no garantiza inclusión. |

La investigación de tres proveedores australianos pertenece al material recibido del 20 de octubre. No se presenta como nueva lectura ni se usan sus cifras o marcos como respaldo técnico. No se hizo una SERP australiana controlada ni se midieron demanda, dificultad, posición o retorno.

## Datos no confirmados

- No hay acceso a Search Console, hosting, CMS, registros o datos de clientes. No se identifica una causa real del sitio de Ranking Rebels o de un lector.
- No se verificaron indexación, penalización, recuperación, tráfico o consultas de la empresa hipotética de Perth. El ejemplo es didáctico y no acumula resultados de otros artículos.
- La ilustración y el gráfico son recursos editoriales propios, no capturas de herramientas ni pruebas de una cuenta.
- La selección de diseño, autoría personal si se desea, fecha pública y ruta final siguen pendientes. El borrador no simula esos datos.
- El blog 5 aún no es un destino público confirmado: su ruta devolvió 404 y no figura en el hub comprobado. No se activa su enlace por estar programado.
- No se prometen rastreo de enlaces, indexación, posiciones o mejoría comercial por preparar esta guía.

La tabla inicial, el gráfico de rutas y el brief son síntesis editorial para tomar decisiones. No son un método oficial o exclusivo ni una auditoría ejecutada. La evidencia HTTP y de integridad se guarda en `09-verificacion.json` y `09a-verificacion-http.json` al cerrar la preparación.


## Revalidación para publicación, 28 de octubre de 2026

Se reabrieron las 21 páginas oficiales de Google de la tabla y se leyeron los pasajes materiales de los hechos usados en la guía. El destino Contact se comprobó por HTTP, sin enviar formularios. Se mantienen las distinciones entre resultado indexado y prueba live, acceso y noindex, canonical preferida y seleccionada, HTTP 200 y garantía de inclusión, datos recientes y resultados definitivos, rastreo e indexación. No se encontró un cambio material que justificara reescribir la prosa aprobada. URLs y alcance en 12-revalidacion-fuentes-2026-10-28.json.

Los pendientes históricos de diseño y ruta se resolvieron bajo la autorización específica del 27, registrada en 11. El blog 5 ya es un destino público confirmado y se activa la referencia pertinente. Continúan sin confirmar datos de cuentas, causas reales de clientes, rastreo, indexación, posiciones o resultados comerciales. La publicación y sus comprobaciones de recursos no prueban ninguno de esos resultados.


## Publicación confirmada, 28 de octubre

Publicado el 28 de octubre de 2026 en https://rankingrebels.com/blog/website-not-showing-up-on-google/. origin main recibió 3a28b8ef5d6988b30eaafb7e60b4ea7ff056af61 y Cloudflare sirvió esa misma revisión. Se verificaron los seis cuerpos y canonicals, 19 recursos, hub, sitemap y 23 enlaces contextuales, con 31 comprobaciones HTTP. Los tres borradores restantes devolvieron 404 y quedaron fuera del hub/sitemap. Pasaron 209 pruebas de producción y el build. Evidencia: 15-verificacion-produccion.json. No se afirma indexación o mejora de resultados por el despliegue.
