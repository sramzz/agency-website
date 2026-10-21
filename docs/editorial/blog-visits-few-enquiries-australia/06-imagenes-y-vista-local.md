# Imágenes y comparación local

21 de octubre de 2026. Preparación únicamente.

La principal es una ilustración nueva generada con imagegen. Muestra un propietario de paisajismo junto a un portátil, un plano y un breve de proyecto, con luz diurna y vegetación. Predominan crema, verdes naturales y cielo claro, con acentos rojos. Se inspeccionaron composición, anatomía, pantalla abstracta sin datos de clientes, ausencia de cifras de rendimiento y legibilidad. No identifica un negocio o cliente real de Perth. El pie la llama ilustración.

El original se conserva en `media/website-enquiries-original.png`. Variantes WebP de 1280 × 720 y 768 × 432, con espacio reservado en HTML. Su función es contextualizar el trabajo, sin sustituir evidencia o fingir un testimonio.

El gráfico es SVG original y determinista, con versión horizontal y móvil. Se inspeccionaron sus renders. Representa tres comprobaciones independientes: interacción registrada, solicitud recuperable y responsable con siguiente paso. No hay flechas que impliquen conversión automática, cifras comerciales o cuenta inventada. Su contenido esencial también está explicado en el artículo y el alt.

Ambas vistas usan la misma prosa y recursos. `preview.html` conserva cabecera oscura y cambia la lectura a blanco roto con texto oscuro. `preview-dark.html` conserva lectura oscura. La tipografía y estructura siguen el blog publicado. Los enlaces de comparación marcan la variante actual.

Se verificó el contraste calculado para prosa, enlaces y texto secundario, además de estructuras de navegación y tablas. Esto no sustituye ver la página completa en navegador. No se hizo nueva automatización tras la denegación registrada en el trabajo previo ni se probó otra vía para eludirla. La elección visual está pendiente del usuario.

- http://127.0.0.1:4177/docs/editorial/blog-visits-few-enquiries-australia/preview.html
- http://127.0.0.1:4177/docs/editorial/blog-visits-few-enquiries-australia/preview-dark.html

Generar sólo estas vistas: `node docs/editorial/blog-visits-few-enquiries-australia/render-preview.cjs`. El servidor local sirve la raíz en el puerto 4177. Ambas vistas son noindex, nofollow, sin fechas o autor personal ficticios. Los originales, documentos y PNG de trabajo quedan fuera de la futura carga pública.
