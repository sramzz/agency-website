# Publicación del primer blog

Solicitud de publicación autorizada por el usuario el 16 de octubre de 2026.

Rutas públicas:

- `https://rankingrebels.com/blog/`
- `https://rankingrebels.com/blog/is-seo-still-relevant-ai-search/`

Se conserva el diseño de la primera vista local y el contenido humanizado completo. La versión pública elimina las etiquetas de preview y la regla noindex, incorpora canonical, metadatos sociales, fecha real de publicación y BlogPosting sin inventar autor ni revisor humano. El hub y la navegación compartida permiten descubrir la pieza; el sitemap incluye ambas rutas.

La fuente actual está en el repositorio `sramzz/agency-website`. La producción de Cloudflare está conectada a `rankingrebels/ranking-rebels-public-site`, rama `main`. El blog y su código se integran en ambos repositorios. El proyecto de Pages se llama `ranking-rebels-public-site`, ejecuta `node --test && node scripts/build.mjs` y publica `dist`.

Antes de subir los cambios, pasaron 195 pruebas del repositorio de trabajo y 194 del repositorio de producción. Se comprobó una compilación de producción: el artículo es indexable, tiene canonical correcto y los documentos editoriales quedan fuera de `dist`. Las tres nuevas pruebas comprueban metadatos, conservación de evidencia, navegación y enlaces de descubrimiento.

Las comprobaciones de inventario excluyen ahora cachés y documentación. En el repositorio de trabajo se corrigió además la normalización de rutas Windows para reconocer las copias de logos de propuestas que ya tenían una excepción explícita. El estilo del progreso de lectura se incluye en el archivo CSS del blog para mantener dos hojas de estilos.

La inspección visual automática de localhost seguía bloqueada por la política del navegador integrado. Los resultados de pruebas y compilación no constituyen una auditoría visual, de accesibilidad completa o de rendimiento real.

Esta publicación sustituye el alcance de preparación editorial de los documentos anteriores. La verificación del despliegue se informa al finalizar la operación, contrastando la revisión de Cloudflare y las respuestas públicas.
