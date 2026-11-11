# Blog 15 — soporte técnico de URL y retirada

Consulta editorial: **26 de octubre de 2026, Australia/Sydney**. Tema: *Should You Update or Delete Old Blog Posts? A Practical SEO Guide*. Informe en español para un artículo en inglés australiano. Sólo se consultó documentación pública de Google; no se inspeccionaron cuentas, artículos de RR, Search Console ni configuraciones del sitio. Los ejemplos siguientes son sintéticos y no ejecutados.

## Criterio editorial y hechos verificados

La decisión empieza por la utilidad actual del contenido, no por su antigüedad. Google recomienda revisar lo publicado, actualizarlo cuando sea necesario y eliminarlo si dejó de ser pertinente. También rechaza la idea de que borrar mucho contenido antiguo o cambiar fechas sin cambios sustanciales haga parecer el sitio más fresco y mejore por ello sus resultados. No convertir esta orientación en una cuota de borrado o calendario universal. Fuentes: [SEO Starter Guide, «Make your site interesting and useful»](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#make-your-site-interesting-and-useful) y [Helpful content, «Avoid creating search engine-first content»](https://developers.google.com/search/docs/fundamentals/creating-helpful-content#avoid-creating-search-engine-first-content).

**Actualizar la misma página:** si la pregunta del lector sigue siendo la misma, conservar la URL útil es una recomendación editorial razonable. La FAQ de Google contempla modificar texto en páginas existentes y esperar su nuevo rastreo; no exige estrenar URL para actualizar. Esto respalda una actualización, pero no establece que conservar cualquier URL sea siempre obligatorio. Cambiar de tema radicalmente o consolidar varias páginas requiere otra evaluación. Fuente: [FAQ, «I changed some text on my pages. Why isn't it updated in search results?»](https://developers.google.com/search/help/crawling-index-faq).

**Consolidar o mover:** una redirección permanente HTTP `301` o `308` indica que una página se ha trasladado y actúa como señal para la selección canónica. Google recomienda redirecciones permanentes del servidor cuando sea posible. El destino debe resolver la necesidad del visitante; no basta con pertenecer al mismo negocio. Fuente: [Redirects, «Permanent server-side redirects»](https://developers.google.com/search/docs/crawling-indexing/301-redirects#permanent-server-side-redirects).

La guía de migraciones admite redirigir varias páginas a una página que realmente consolida su contenido. Advierte que enviar muchas URLs antiguas a un destino irrelevante, como la portada, puede confundir y tratarse como `soft 404`. Actualizar enlaces internos hacia el destino final evita mantener referencias antiguas innecesarias. Esta aplicación a un grupo de blogs es una inferencia editorial limitada, no una invitación a ejecutar una migración completa. Fuente: [Site moves, «Update all URL details on the new site» y «Start the site move»](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

**Retirar sin sustituto pertinente:** Google indica responder `404` o `410` cuando la página se eliminó y no existe otra con contenido similar. Una pantalla que dice «no existe» mientras devuelve `200` puede ser `soft 404`. Una página de error amable puede ofrecer navegación y enlaces útiles, conservando el código HTTP correcto. No presentar un `404` deliberado como fallo que siempre deba repararse con una redirección. Fuente: [Crawling errors, «The page and content are no longer available»](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors#the-page-and-content-are-no-longer-available).

## Controles que no son intercambiables

`rel="canonical"` expresa una preferencia para páginas duplicadas o muy similares; no traslada al visitante ni sustituye universalmente una actualización, una retirada o una redirección. Es una señal, no una promesa de selección. Google desaconseja `noindex` para escoger entre versiones canónicas dentro de un sitio y pide coherencia entre señales y enlaces. Fuente: [Canonicalisation, introducción y «Best practices»](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls#best-practices).

`noindex` permite mantener una página accesible mientras se excluye de Google Search cuando Google rastrea y procesa la regla. Debe poder acceder a ella; bloquearla mediante robots.txt puede impedir que lea ese `noindex`. Google no admite colocar la regla `noindex` dentro de robots.txt. Fuente: [Block Search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

robots.txt regula el acceso de rastreadores; una URL bloqueada todavía puede aparecer en resultados a partir de enlaces. Tampoco es protección de información privada. Fuente: [Robots.txt, introducción y «Understand the limitations»](https://developers.google.com/search/docs/crawling-indexing/robots/intro).

Removals oculta resultados temporalmente: Google indica aproximadamente seis meses. No borra el contenido alojado ni reemplaza la medida permanente adecuada. `noindex` tampoco impide que una persona abra la página. Fuente: [Remove a page, «Make your removal permanent»](https://developers.google.com/search/docs/crawling-indexing/remove-information#make-your-removal-permanent). Esta nota no determina obligaciones de conservación documental ni autoriza destruir archivos históricos.

## Comprobación proporcionada, sin promesas

Para una futura actuación autorizada, registrar URL, decisión, motivo, sustituto y fecha; comprobar la página visible, respuesta HTTP y destino; actualizar referencias internas pertinentes y el sitemap del contenido que se quiere mostrar en Search. Google pide incluir URLs preferidas y que `lastmod`, cuando se use, refleje cambios significativos y verificables. No cambiar fechas automáticamente por mantenimiento cosmético. Fuente: [Build a sitemap, «Sitemap best practices» y «Additional notes about XML sitemaps»](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

Los enlaces deben ayudar al lector a encontrar recursos relacionados; Google no fija un número mágico por página. Fuente: [Link best practices, «Internal links»](https://developers.google.com/search/docs/crawling-indexing/links-crawlable#internal-links). Comprobar enlaces que ahora terminen en error es una recomendación editorial, no una penalización automática demostrada.

URL Inspection puede ayudar a examinar unas pocas páginas y seguir su procesamiento. Solicitar rastreo no garantiza inclusión ni rapidez; repetir solicitudes no lo acelera. Fuente: [Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl). Tampoco prometer recuperación de posiciones, tráfico o conservación cuantificada de «link equity»: Google advierte que los cambios no garantizan un efecto apreciable. Fuente: [Core updates, «How long does it take to see an effect»](https://developers.google.com/search/docs/appearance/core-updates#how-long-does-it-take-to-see-an-effect-in-search-results).

## Cuatro ejemplos sintéticos propuestos

| Ejemplo ficticio | Decisión propuesta y condición | Comprobación futura |
|---|---|---|
| Una guía de preparación de presupuestos sigue siendo correcta y útil | Mantener; revisar una referencia concreta si hace falta. Una fecha antigua no exige reescritura | Confirmar exactitud y necesidad del lector |
| Una guía de Google Business Profile conserva su propósito, pero muestra capturas obsoletas | Actualizar en la misma URL si sigue contestando la misma pregunta | Revisar instrucciones, fuentes, enlaces y fecha real del cambio |
| Dos guías de seguimiento de consultas repiten la misma respuesta con detalles complementarios | Consolidar sólo tras comprobar equivalencia; redirigir la retirada hacia la guía final pertinente | Comprobar contenido integrado, destino y enlaces internos |
| Un anuncio de promoción finalizada ya no ayuda y no tiene sustituto pertinente | Considerar retirada con `404`/`410`; antes valorar utilidad histórica o necesidad de conservación | Confirmar decisión del responsable, estado HTTP y referencias |

No contienen clientes, métricas, pruebas ni URLs reales. No justifican acciones sobre RR por sí mismos.

## Registro de lectura y límites

Todas las páginas enlazadas se abrieron y sus secciones materiales fueron legibles; ningún acceso material falló. No se utilizaron snippets como evidencia. Fechas «Last updated» visibles, en UTC: Starter Guide, FAQ, noindex, robots.txt, removals, enlaces, recrawl y core updates: **2025-12-10**; crawling errors: **2025-12-18**; redirects: **2026-04-14**; sitemap: **2026-07-08**; canonicalisation: **2026-07-10**; site moves: **2026-08-20**; helpful content: **2026-10-05**. Son fechas de documentación, no de publicación del blog.

La [página histórica de fechas del 11 de marzo de 2019](https://developers.google.com/search/blog/2019/03/help-google-search-know-best-date-for) también se abrió: su advertencia sobre republicar una historia apenas cambiada aparece bajo «Guidelines specific to Google News». No se trasladó esa regla específica como prohibición universal para todos los blogs. El alcance técnico de estas fuentes es Google Search; no acredita comportamiento idéntico de otros buscadores ni resultados de una implementación concreta.
