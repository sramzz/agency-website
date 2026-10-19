# Enlazado interno de los blogs de Ranking Rebels

Instrucción permanente del usuario, 19 de octubre de 2026: al crear cada artículo, revisar los anteriores y decidir qué conexiones ayudan al lector en ambas direcciones. El criterio de voz sigue siendo el primer blog final aprobado, con información documentada y menciones naturales.

## Inventario de artículos publicados

| Artículo | URL canónica | Manuscrito activo | Función |
|---|---|---|---|
| Is SEO Still Relevant in the Age of ChatGPT and AI Search? | [SEO y búsqueda con IA](https://rankingrebels.com/blog/is-seo-still-relevant-ai-search/) | `blog-seo-ai-australia/04-blog-seo-ai-australia.md` | Explica el papel de SEO y la web cuando también se consultan respuestas con IA. |
| Local SEO: How to Improve Your Business's Visibility on Google Maps | [SEO local y Maps](https://rankingrebels.com/blog/local-seo-google-maps-visibility/) | `blog-local-seo-australia/03-articulo-local-seo-australia.md` | Ayuda a diagnosticar perfil, visibilidad local y recorrido de la consulta. |

Este inventario debe contrastarse con `/blog/` y los artículos presentes en `blog/`. No presupone que futuros artículos se añadirán solos a la tabla.

## Revisión del conjunto actual

Se leyeron íntegramente los dos manuscritos activos. Ambos permiten una conexión pertinente; se añade una mención contextual en cada dirección.

| Origen → destino | Sección de origen | Anchor | Motivo |
|---|---|---|---|
| SEO y búsqueda con IA → SEO local y Maps | What SEO can still do for your business → Help the right people find the right service | improving your visibility on Google Maps | Amplía la explicación de servicio y cobertura con el trabajo específico del perfil y la evaluación de consultas locales. |
| SEO local y Maps → SEO y búsqueda con IA | Give the website a useful local role | SEO in the age of ChatGPT and AI search | Amplía el papel de las páginas de servicio para personas que llegan por otras herramientas de búsqueda. |

No se cambian los hechos, casos, imágenes o intención principal de los artículos para introducir estas menciones. Los enlaces son elementos HTML `a` con `href`, forman parte del cuerpo del artículo y se mantienen en los manuscritos fuente.

## Procedimiento para cada siguiente blog

1. Actualizar el inventario con todos los artículos publicados y comprobar su correspondencia con el hub y las rutas reales.
2. Leer el nuevo artículo y revisar el contenido completo de los anteriores. Identificar qué explicación del nuevo puede ampliar una sección existente y qué artículo anterior puede resolver una duda del nuevo.
3. Evaluar las dos direcciones para cada artículo existente. Enlazar cuando el destino aporte una explicación o un siguiente paso útil. Si no existe una relación suficiente, registrar brevemente esa decisión en la revisión del nuevo blog.
4. Redactar la mención con el tono del párrafo, un anchor descriptivo y una URL canónica comprobada. Evitar cadenas de enlaces, anchors genéricos y repeticiones artificiales. No hay una cantidad mínima por artículo.
5. Aplicar las modificaciones a los manuscritos activos. Conservar las versiones históricas y los originales recibidos. Regenerar las páginas públicas y conservar las fechas de publicación originales.
6. Comprobar destinos, anchors y presencia dentro del HTML del artículo. Ejecutar los controles pertinentes y el build de producción; revisar el artefacto que se publicará.
7. Al publicar el nuevo blog con autorización del usuario, publicar también las mejoras de enlazado pertinentes en los anteriores y comprobar ambas direcciones en las páginas servidas.
8. Actualizar este registro para que el siguiente encargo parta del conjunto real. No afirmar que Google ya rastreó los enlaces ni atribuirles una mejora medida sin datos.

## Fuente de criterio SEO

Se abrió la [guía de enlaces de Google Search Central](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) el 19 de octubre de 2026. Sus apartados sobre anchors y referencias internas respaldan enlaces rastreables, descriptivos y situados en contexto. No fija un número ideal. La página mostraba actualización del 10 de diciembre de 2025. Esto orienta la implementación, sin prometer un resultado de ranking.

La prueba de publicación de esta revisión se conserva en `verificacion-enlazado-2026-10-19.json` una vez confirmado el despliegue.

## Publicación confirmada

Los dos enlaces se publicaron el 19 de octubre de 2026. Cloudflare confirmó despliegue correcto de la revisión `23632917b203ed7d5fbb11d6c1221d91af773a4f`, identificador `52bbbad7-d410-423a-a9c9-73f29b39db30`. La lectura directa de las dos páginas devolvió HTTP 200 sin redirecciones, canonical correcto y la mención al otro artículo dentro del cuerpo del texto. `/_deployment.json` devolvió esa misma revisión.

Pasaron las siete pruebas específicas de los blogs y las 198 de producción, además de la compilación. Se corrigió el generador para que cambiar el canonical del segundo artículo no reescriba también el destino de un enlace al primero. Los metadatos, las fuentes y los casos conservan su alcance. No se realizó una nueva auditoría visual en navegador ni se afirmó una mejora de ranking.

Esta confirmación posterior se guarda en el repositorio de trabajo, sin provocar otro despliegue solo para registrar la publicación ya completada.

## Tercer blog en preparación

Revisión editorial iniciada el 19 y cerrada el 20 de octubre de 2026: **AI Agents vs Workflow Automation: What Can They Do for Your Business?** El artículo sigue como borrador y no se añade al inventario de publicados.

Se leyeron completos los dos artículos anteriores y se contrastó el inventario con el hub público y las rutas locales. Se evaluaron las cuatro direcciones con el nuevo: el borrador enlaza Maps desde cualificación de consultas y SEO con IA desde producción de contenido. Los dos artículos previos admiten una mención al nuevo cuando hablan del tratamiento de las consultas.

Los cuatro lugares, anchors y los párrafos inversos están en [la revisión propuesta del tercer blog](blog-ai-agents-workflows-australia/07-enlazado-propuesto.md). Los destinos existentes devolvieron 200 y canonical correcto. La ruta del tercer blog es candidata: las menciones desde los anteriores no se aplicaron y deberán implementarse con su publicación autorizada. La revisión del HTML y de ambas direcciones en producción sigue pendiente de esa etapa.

En la continuación visual del 20 de octubre se generó la vista local V1 del tercer blog y se comprobaron sus dos enlaces salientes dentro del HTML. El detalle está en `blog-ai-agents-workflows-australia/09-verificacion-preview.json`. Esto no cambia el estado de las menciones entrantes ni añade un artículo al inventario público.

El 20 de octubre también se preparó en local una versión más breve del ejemplo de fontanería del segundo blog, registrada en `blog-local-seo-australia/11-ejemplo-breve-2026-10-20.md`. Se mantiene el inventario de dos artículos publicados y sus enlaces contextuales en ambas direcciones. No se añadieron enlaces al tercero ni se desplegó esta corrección editorial.

## Publicación priorizada de What Is SEO

El usuario cambió el orden el 20 de octubre: crear y publicar primero **What Is SEO? How Search Engine Optimisation Works for Your Business**, con el artículo de agentes reservado para el jueves 22. Su recordatorio único quedó creado para las 9:00 de Sídney. El estado y los materiales del tercero están en `blog-ai-agents-workflows-australia/10-listo-para-el-jueves.md`.

Se contrastaron las rutas y el hub con los dos artículos publicados y se revisaron sus manuscritos completos. La guía nueva enlaza Maps desde Local visibility y SEO/IA desde Does AI search change the fundamentals?. Maps enlaza de vuelta desde la definición inicial de search engine optimisation (SEO), y SEO/IA desde work involved in SEO. Se conservan las dos menciones anteriores. Detalle en `blog-what-is-seo-australia/07-enlazado.md`.

Se revisó también la relación con agentes en ambas direcciones y se omitieron los enlaces por pertinencia, como se registra en ambos paquetes. No se introducen menciones públicas al borrador. Esta publicación incluye el ejemplo abreviado de fontanería solicitado por el usuario. La confirmación del nuevo inventario y de los seis enlaces servidos se añadirá tras verificar Cloudflare.
