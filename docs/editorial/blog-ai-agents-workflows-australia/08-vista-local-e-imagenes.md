# Vista local e imágenes del tercer blog

20 de octubre de 2026 · Australia/Sydney · Vista V1, sin publicar.

[Abrir la vista local](http://127.0.0.1:4177/docs/editorial/blog-ai-agents-workflows-australia/preview.html?v=1).

La página toma el manuscrito completo de `03-articulo-ai-agents-workflows-australia.md`. Conserva sus nueve apartados, ocho subapartados, dos tablas y fuentes. La ilustración aparece después de la introducción y el gráfico después del caso de Brisbane. El índice lateral, el índice desplegable de móvil, el progreso de lectura y el cierre siguen la plantilla de los blogs publicados.

## Recursos creados

Todos los archivos siguientes están dentro de `docs/editorial/blog-ai-agents-workflows-australia/`. Se mantienen como recursos de borrador, separados de los assets públicos.

| Archivo | Formato y tamaño | Función |
|---|---|---|
| [Ilustración 1280](<C:/Users/Kelly Serna/OneDrive/Documentos/Juan David/agency-website/docs/editorial/blog-ai-agents-workflows-australia/media/ai-agents-workflow-illustration-1280.webp>) | 1280 × 720, 241.586 bytes | Ilustración principal para escritorio |
| [Ilustración 768](<C:/Users/Kelly Serna/OneDrive/Documentos/Juan David/agency-website/docs/editorial/blog-ai-agents-workflows-australia/media/ai-agents-workflow-illustration-768.webp>) | 768 × 432, 94.574 bytes | Variante ligera de la misma ilustración |
| [Gráfico de escritorio](<C:/Users/Kelly Serna/OneDrive/Documentos/Juan David/agency-website/docs/editorial/blog-ai-agents-workflows-australia/media/ai-agents-workflow-comparison.svg>) | 1000 × 820 | Dos recorridos paralelos para la misma consulta |
| [Gráfico de móvil](<C:/Users/Kelly Serna/OneDrive/Documentos/Juan David/agency-website/docs/editorial/blog-ai-agents-workflows-australia/media/ai-agents-workflow-comparison-mobile.svg>) | 540 × 1250 | Comparación vertical con las dos opciones separadas y conectadas al mismo brief |
| [PNG original](<C:/Users/Kelly Serna/OneDrive/Documentos/Juan David/agency-website/docs/editorial/blog-ai-agents-workflows-australia/image-sources/ai-agents-workflow-illustration-v1.png>) | Original de generación, sin modificar | Fuente conservada para posteriores adaptaciones |

La ilustración se creó con **image_gen integrado**, sin CLI ni llamadas API alternativas. Se inspeccionó el resultado y se conservó el PNG original. Sharp se utilizó únicamente para redimensionar y optimizar WebP. El [prompt completo y registro de generación](<C:/Users/Kelly Serna/OneDrive/Documentos/Juan David/agency-website/docs/editorial/blog-ai-agents-workflows-australia/image-sources/generation.json>) conserva herramienta, ruta de salida original y destinos. Las dimensiones y tamaños reales están en `image-sources/asset-record.json`.

El gráfico se construyó en SVG editable. No es una captura de un producto ni representa resultados observados. Distingue pasos definidos de selección de investigación autorizada, y mantiene la decisión de precio y compromisos con el estimador de este ejemplo. Se inspeccionaron los PNG de ambas variantes, guardados en `docs/qa/blog-ai-agents-workflows/`.

## Alt y pies de figura

**Ilustración:** “Three team members review an enquiry and a clipboard brief, connected by illustrated document and tool symbols.”

Pie: “A conceptual illustration of an enquiry being prepared for a human handover.”

**Gráfico:** “Two routes for a hypothetical Brisbane cleaning enquiry: a fixed AI workflow and an agent choosing authorised research. Both prepare a checkable brief, while the estimator retains prices and commitments.”

Pie: “Two illustrative designs for the same Brisbane enquiry. The brief needs checking in either case.”

## Plantilla y alcance

Se reutilizan `assets/css/styles.css`, `assets/css/blog.css` y los comportamientos existentes de lectura y navegación. El diseño sigue el negro, blanco roto, rojo, Inter, Oswald y JetBrains Mono aprobados por el usuario. `DESIGN.md` contiene un tema anterior azul/teal y serif; no sustituye esta identidad explícitamente acordada. No se modificaron los tokens o archivos compartidos para crear el borrador.

`render-preview.cjs` genera exclusivamente `preview.html` dentro de esta carpeta. `preview.css` añade estilos locales para la lista numerada y foco visible. La página tiene `noindex, nofollow` y no incorpora canonical, datos de publicación, autor supuesto, JSON-LD o analítica de producción.

La comprobación estática verificó los 109 bloques de contenido, enlaces, encabezados, tablas, listas, anclas y recursos locales. La regeneración produce el mismo HTML. Pasaron las siete pruebas existentes de los dos blogs. El detalle está en `09-verificacion-preview.json`.

No se realizó una inspección de la página completa en navegador: la automatización de navegador había sido rechazada por la política de seguridad y no se reintentó por otra vía. La revisión visual de imágenes y las comprobaciones HTTP/HTML no sustituyen esa inspección. La vista queda disponible para revisión local.

No se publicaron rutas, se hicieron pushes ni se aplicaron todavía las menciones del tercer artículo en los blogs anteriores. Esas menciones siguen preparadas en `07-enlazado-propuesto.md` para la publicación autorizada.
