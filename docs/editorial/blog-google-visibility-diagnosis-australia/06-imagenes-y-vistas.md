# Imágenes y vistas locales

23 de octubre de 2026. Dos recursos con funciones distintas: una ilustración conceptual de comprobar una página y un gráfico de cuatro rutas de diagnóstico. Son propuestas para revisión, sin publicar ni aprobar una plantilla global.

La principal se creó con la herramienta integrada imagegen. Cambia la composición del retrato de paisajista a una vista de mesa: lupa sobre una página, tarjetas de versiones, mano con lápiz y portátil. Tinta, papel claro, grises y rojo contenido mantienen continuidad con la dirección sobria solicitada. No hay captura de Search Console, estado verde, datos de cuenta o tráfico medido. Se inspeccionaron el resultado y el recorte, la mano, el dibujo, el contraste y la ausencia de afirmaciones visuales de éxito.

Archivos guardados en este proyecto:

- `media/google-visibility-original.png`: original generado.
- `media/google-visibility-illustration-1280.webp`: principal 1280 × 720.
- `media/google-visibility-illustration-768.webp`: variante 768 × 432.
- `media/visibility-diagnosis.svg`: gráfico propio 1000 × 650.
- `media/visibility-diagnosis-mobile.svg`: versión 540 × 1160, con el mismo contenido.

El gráfico se creó en SVG porque es una explicación determinista. Se inspeccionaron sus dos renders. Las rutas no se presentan como fases obligatorias, pueden coincidir y no garantizan inclusión o ranking. La información esencial también está en el cuerpo y en el alt. Las dimensiones se reservan en HTML y el móvil usa una composición vertical.

Vistas del mismo manuscrito:

- http://127.0.0.1:4177/docs/editorial/blog-google-visibility-diagnosis-australia/preview.html
- http://127.0.0.1:4177/docs/editorial/blog-google-visibility-diagnosis-australia/preview-dark.html

Ambas reutilizan tipografía, navegación y cabecera del blog. Sólo cambia la superficie de lectura de la prueba existente. No hay autoría inventada, fecha de publicación, canonical público o schema que simulen un artículo publicado. No se ejecutó una nueva revisión de página completa en navegador: se conserva la restricción de automatización previa y se distingue inspección de activos de QA visual del conjunto.

Para regenerar sólo el borrador: `node docs/editorial/blog-google-visibility-diagnosis-australia/render-preview.cjs`.

## Prompt de la ilustración

Modo integrado, generación nueva sin imagen de referencia ni edición por CLI.

> Use case: illustration-story. Asset type: 16:9 landscape editorial hero for an Australian service-business article about diagnosing why a website page is missing from Google. Create a restrained Ranking Rebels ink-and-paper illustration, near-monochrome warm off-white, charcoal and mid grey, with small deliberate red accents. Scene: a close three-quarter overhead view of a practical web-review desk. A large printed service-page layout sits in the middle under a real magnifying glass; a hand with a red pencil points to one small page card beside two almost-identical page cards, suggesting checking the exact page and its intended version. A laptop partly visible along one edge displays a simple abstract website layout, not a real dashboard. A folder, paper tabs and a subtle Australian native leaf can complete the quiet still life. Composition: crisp editorial drawing with strong ink outlines and flat graphic shading, generous light paper areas, a limited number of objects and subtle print texture. The loupe and selected page are the visual focus. Keep it clearly illustrated, not photorealistic. More visual continuity with a charcoal/red brand than a colourful office stock image. No letters, words, numbers, Google logos, account screenshots, ranking charts, growth arrows, traffic statistics, blue sky, green foliage, saturated colour, neon glow, night-time black backdrop, robots, extra people or watermark. This is a conceptual illustration of inspecting evidence, not a successful test or measured recovery.
