# Imágenes del segundo blog

Preparadas el 19 de octubre de 2026. El usuario autorizó crear las imágenes pertinentes y publicar este artículo. Se mantienen las decisiones del primer blog: una ilustración editorial y un gráfico explicativo, con versiones adaptadas al espacio de lectura y al móvil.

## Ilustración principal

Método: herramienta integrada **imagegen**, sin CLI ni API externa configurada manualmente. La imagen se generó como una pieza nueva. Se inspeccionó la ilustración aprobada del primer blog para definir la continuidad de estilo, sin modificarla.

Escena: una persona consulta un mapa en el teléfono, mientras un profesional se acerca a una vivienda junto a su furgoneta de trabajo. La cartografía es conceptual. No representa datos, resultados o una ubicación empresarial de Google. No contiene logos, posiciones, estrellas, reseñas o cifras de rendimiento.

Archivos finales dentro de `assets/images/blog/`:

- `local-seo-discovery-illustration-1280.webp`, 1280 × 720, para el artículo y metadatos sociales.
- `local-seo-discovery-illustration-768.webp`, 768 × 432, para pantallas estrechas y el hub.

Original conservado en `image-sources/local-seo-discovery-illustration-v1.png`. Se optimizaron tamaño y formato de las copias web, sin cambiar la escena.

Texto alternativo implementado: “Editorial illustration of a person checking a local map on a phone as a tradesperson approaches a home beside a work van.”

### Prompt final utilizado

```text
Use case: illustration-story. Asset type: main editorial illustration for a premium Australian service-business blog by Ranking Rebels, titled Local SEO: How to Improve Your Business's Visibility on Google Maps. Create an original wide 16:9 illustration, richly composed and carefully drawn, with a near-black background (#050609), off-white (#F8FAFC), slate grey (#94A3B8), and a restrained vivid red (#FF304F). Style: sophisticated editorial screenprint / fine ink drawing, subtle halftone and paper grain, strong light and shadow, matching a dark red-and-black editorial website. Scene: a person in the foreground, seen three-quarter from behind, checking a smartphone while finding a local tradesperson. In the midground, an Australian residential street with low-rise homes, a modest unbranded plumber's work van parked naturally and a worker carrying a small tool bag near the home entrance. Unify the scene with one oversized abstract folded neighbourhood map at the left, viewed obliquely with a single red location pin and a small cluster of streets. The map is symbolic editorial artwork, never a screenshot or real geographic dataset. Focus on the connection between a person's local search and a real service visit. Keep the van free of map pins or address signage: this is a business that travels to customers. Use red selectively on the location pin, van detail, and small warm highlights, not a red wash. Editorial image only, no titles, no lettering, no numbers, no logos, no Google branding, no ratings, no review stars, no fake search interface, no ranking positions, no watermarks. Grounded human proportions and believable hands. No sci-fi, robots, dashboards, neon, glossy 3D icons, city skyline landmarks or clichéd stock-photo handshake. Composition should remain legible when reduced to a blog thumbnail, with the important subjects contained inside the central 80 percent.
```

## Gráfico explicativo

Método: SVG propio, con texto seleccionable en el archivo y geometría definida de forma determinista. No requiere generación raster porque su función es explicar una secuencia con etiquetas precisas.

Título: **A click is only the start**. Distingue clic en el teléfono, llamada conectada, consulta adecuada y reserva o presupuesto aceptado. El pie aclara que cada etapa necesita evidencia propia. No se inventan resultados, tasas de conversión ni cifras de una cuenta.

Archivos finales dentro de `assets/images/blog/`:

- `local-seo-enquiry-journey.svg`, 1000 × 440, composición horizontal.
- `local-seo-enquiry-journey-mobile.svg`, 540 × 970, composición vertical.

Se colocó al final de la sección de medición, donde aclara la diferencia entre acciones registradas y resultados del negocio. La versión móvil se selecciona por anchura y conserva sus dimensiones para reservar espacio.

Las dos versiones se renderizaron a PNG y se inspeccionaron visualmente. Evidencia en `docs/qa/blog-local-seo/`. Esta revisión de los gráficos no equivale a una inspección del artículo completo en navegador.

## Referencia de diseño

Se reutiliza la composición editorial del primer blog y los tokens vigentes de `assets/css/styles.css`, junto con `assets/css/blog.css`. El `DESIGN.md` raíz conserva una propuesta Ocean Depth anterior que no corresponde a la web publicada. La instrucción actual del usuario de mantener el diseño aprobado y el CSS vigente gobiernan esta publicación, sin cambiar la identidad global.
