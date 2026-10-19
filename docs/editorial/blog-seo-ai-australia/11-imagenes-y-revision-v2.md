# Imágenes y reedición del blog, V2

19 de octubre de 2026. El usuario pidió una reedición más cercana al lector común y eligió una ilustración editorial propia con la estética de Ranking Rebels.

## Propuesta aplicada en local

Se usan dos visuales. La ilustración principal aparece después de los párrafos de introducción, para que la respuesta siga siendo lo primero que encuentra el lector. El gráfico explicativo acompaña el ejemplo hipotético de Brisbane. No se compraron ni reutilizaron imágenes de internet.

La ilustración representa a una persona que considera resultados de búsqueda y una respuesta conversacional antes de acercarse a un negocio. Usa negro, blanco, rojo y gris, con textura editorial. Los paneles son conceptuales, sin rankings, recomendaciones o interfaces reales inventados.

El gráfico muestra dos búsquedas posibles y una comprobación del servicio antes de solicitar un presupuesto. Tiene una variante para móvil con texto más grande y una leyenda que identifica el caso como hipotético. Se creó directamente en SVG para conservar texto legible y permitir ajustes precisos.

## Archivos

- `assets/images/blog/seo-ai-discovery-illustration-1280.webp`: ilustración principal, 1280 × 720.
- `assets/images/blog/seo-ai-discovery-illustration-768.webp`: variante para pantallas pequeñas, 768 × 432.
- `assets/images/blog/seo-ai-brisbane-journey.svg`: gráfico horizontal.
- `assets/images/blog/seo-ai-brisbane-journey-mobile.svg`: composición vertical para móvil.
- `docs/editorial/blog-seo-ai-australia/image-sources/seo-ai-discovery-illustration-v1.png`: original generado, conservado como fuente.

La ilustración se creó con la herramienta integrada image_gen, siguiendo la habilidad imagegen. La conversión a WebP conserva el original. El gráfico se construyó como recurso vectorial propio.

## Prompt final de la ilustración

Use case: illustration-story. Asset type: original editorial lead illustration for Ranking Rebels' blog about whether SEO remains relevant with ChatGPT and AI search. Create a wide 16:9 landscape illustration, composed as one coherent editorial scene: a prospective customer with a phone considers two abstract discovery surfaces, a traditional search-results panel and a conversational answer panel, with a modest Australian service-business office entrance visible beyond them. Human discovery and choosing a business are the focus. The panels use only a few graphic lines and a magnifying-glass or conversation symbol, not readable interface content. This is clearly a conceptual illustration, not a screenshot or testimonial. Art direction: sophisticated graphic editorial illustration with screen-printed ink texture, precise cut-paper shapes, restrained halftone, strong asymmetry, generous negative space, mature human proportions and confident simple forms. Integrates into a dark high-end challenger-agency website. Palette strictly near-black #050609, off-white #F8FAFC, signal red #FF304F and muted slate #94A3B8. Red creates the focal accents, not an overall red wash. Keep major subjects within the central 80% so the composition can crop on a phone. Background near-black, image not transparent. No text, words, letters, numbers, brand logos, watermarks, robots, cyborgs, glowing brains, circuits, ascending sales charts or fake rankings. Do not add a headline; typography will be outside the image.

## Revisión del texto

La versión nueva está en `04-blog-seo-ai-australia.md`, con copia de revisión en `10-blog-voz-directa.md`. Se sustituyó el subtítulo sobre presupuesto por «What ChatGPT and AI search change about getting found online, and where SEO still helps.».

La entrada comienza por el trabajo que la web hace para un cliente. Los apartados se acercan al lenguaje de un responsable de negocio y mantienen las fuentes y los límites relevantes. Se conserva la fecha de comprobación del informe de Google del 16 de octubre de 2026, sin fingir una nueva inspección de la cuenta.

La vista local se regenera con `node docs/editorial/blog-seo-ai-australia/render-preview.cjs`. No se ha publicado esta revisión ni sincronizado con el repositorio de producción. Se mantiene para revisar el texto y las imágenes juntos.
