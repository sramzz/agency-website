# Imágenes y comparación local

Preparación del 21 de octubre de 2026, actualizada el 23 de octubre. Preparación únicamente.

La principal V2 es una edición con la herramienta integrada imagegen de la escena inicial. Muestra el mismo propietario de paisajismo junto a un portátil, un plano y un breve de proyecto, con luz y vegetación. Tras el comentario del usuario sobre el cambio brusco y el exceso de color, predominan gris, blanco roto, tinta oscura y rojo contenido. La ilustración del primer blog sirvió como referencia de estilo, conservando el tema de Perth. Se inspeccionaron composición, anatomía, pantalla abstracta sin datos de clientes, ausencia de cifras de rendimiento y legibilidad. No identifica un negocio o cliente real. El pie la llama ilustración.

El original V2 se conserva en `media/website-enquiries-original-v2.png`. Variantes activas: `media/website-enquiries-illustration-v2-1280.webp` y `media/website-enquiries-illustration-v2-768.webp`, de 1280 × 720 y 768 × 432, con espacio reservado en HTML. La primera versión a color permanece en sus archivos originales para comparar o revertir. Su función es contextualizar el trabajo, sin sustituir evidencia o fingir un testimonio. La V2 y la selección de fondo siguen pendientes de aprobación.

El gráfico es SVG original y determinista, con versión horizontal y móvil. Se inspeccionaron sus renders. Representa tres comprobaciones independientes: interacción registrada, solicitud recuperable y responsable con siguiente paso. No hay flechas que impliquen conversión automática, cifras comerciales o cuenta inventada. Su contenido esencial también está explicado en el artículo y el alt.

Ambas vistas usan la misma prosa y recursos. `preview.html` conserva cabecera oscura y cambia la lectura a blanco roto con texto oscuro. `preview-dark.html` conserva lectura oscura. La tipografía y estructura siguen el blog publicado. Los enlaces de comparación marcan la variante actual.

Se verificó el contraste calculado para prosa, enlaces y texto secundario, además de estructuras de navegación y tablas. Esto no sustituye ver la página completa en navegador. No se hizo nueva automatización tras la denegación registrada en el trabajo previo ni se probó otra vía para eludirla. La elección visual está pendiente del usuario.

- http://127.0.0.1:4177/docs/editorial/blog-visits-few-enquiries-australia/preview.html
- http://127.0.0.1:4177/docs/editorial/blog-visits-few-enquiries-australia/preview-dark.html

Generar sólo estas vistas: `node docs/editorial/blog-visits-few-enquiries-australia/render-preview.cjs`. El servidor local sirve la raíz en el puerto 4177. Ambas vistas son noindex, nofollow, sin fechas o autor personal ficticios. Los originales, documentos y PNG de trabajo quedan fuera de la futura carga pública.

## Procedencia de la edición V2

Modo: herramienta integrada imagegen, edición con referencias locales. Objetivo: `media/website-enquiries-original.png`. Referencia de estilo: `../blog-seo-ai-australia/image-sources/seo-ai-discovery-illustration-v1.png`. La generación terminó durante la sesión anterior; se recuperó e inspeccionó el resultado al continuar el 23 de octubre, evitando generar otra imagen sin necesidad.

Prompt utilizado:

> Use case: style-transfer. Edit target: Image 1, the bright landscaping studio illustration. Style reference only: Image 2, the earlier Ranking Rebels charcoal/red editorial illustration. Restyle Image 1 into an intermediate visual direction that belongs with the existing Ranking Rebels articles while retaining a lighter atmosphere. Keep the same overall wide 16:9 composition and subject: landscaping business owner seated on the left, reviewing a paper project brief, garden site plan across the desk, laptop on the right with abstract form shapes, window and suburban garden beyond. Preserve coherent anatomy and the physical arrangement. Change the rendering from richly coloured near-photorealism to a restrained hand-drawn editorial ink-and-paper illustration, taking the charcoal linework, flat illustrated shading and selective red accents from Image 2. Simplify incidental objects and botanical detail. Use a predominantly neutral palette: warm off-white paper, light/mid greys, charcoal outlines, a small amount of muted red on the notebook and form button. Plants should be nearly monochrome grey-green, sky pale grey, wood and skin rendered in quiet neutral washes. No bright blue sky, golden sunshine, vivid green foliage, orange/brown saturation or photographic shine. Keep an airy mid/light background and visible dark outlines; do not copy Image 2's black night-time background or heavy grain. Red is a small deliberate accent, not dramatic lighting. The result should feel like the same editorial illustrator as Image 2 working on a lighter page. No text, logos, numerical charts, watermarks, fake account screenshots or extra people. Image 2 is not an edit target; do not copy its woman, building or floating panels.
