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
