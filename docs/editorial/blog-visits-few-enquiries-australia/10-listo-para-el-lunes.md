# Blog 5 · publicación del lunes

Preparado el 21 de octubre de 2026. No publicado.

**Fecha más temprana: lunes 26 de octubre de 2026, 13:00, Australia/Sydney.** Equivale a 2026-10-26T02:00:00Z. Respetar la fecha del encargo; no usar la del servidor o una planificación histórica para adelantarlo.

El usuario pidió preparar el siguiente blog y respondió expresamente: **“Publicar automáticamente la versión aprobada”**. La herramienta creó `publicar-blog-de-visitas-y-consultas`, activa en este chat para una sola ocurrencia el lunes a las 13:00. Se inspeccionó la configuración guardada. El prompt exige respetar la fecha, comprobar aprobación y verificar publicación.

## Aprobación pendiente

Se mostraron las dos vistas locales y se preguntó cuál dejar aprobada. No interpretar una opción preseleccionada o el silencio como respuesta. Se recomienda cabecera oscura y lectura clara; la otra variante conserva lectura oscura. Ambas comparten manuscrito, ilustración diurna y gráfico.

Registrar aquí la selección del usuario y SHA-256 de la versión concreta cuando responda. Si pide ajustes, aplicarlos y confirmar la versión resultante. No solicitar otra vez autorización de publicación de una versión ya aprobada, pues la publicación automática ya está autorizada. Si llega el lunes sin elección, conservar el borrador y avisar de esa decisión pendiente.

## Material preparado

Artículo en `03`, diagnóstico y auditoría en `01` y `02`, SEO en `04`, fuentes reabiertas en `05`, imágenes y dos vistas en `06` y `media/`, propuestas de enlaces en `07`, controles en `08`, evidencia en `09` y `09a`. Las diez fuentes originales están copiadas con hashes. Las verificaciones locales no equivalen a un build o despliegue público.

## Integración y publicación autorizada

1. Leer criterios, inventario, aprobación e instrucciones posteriores. Volver a contrastar artículos y hub por si hay más publicaciones. Preservar cualquier cambio posterior en los manuscritos activos.
2. Integrar la variante elegida mediante un módulo propio basado en `tools/publish-ai-agents-blog.cjs`, llamado después de los existentes por `tools/publish-blog.cjs`. Conservar el estilo de los otros artículos y limitar el nuevo CSS a esta ruta.
3. Ruta candidata: `/blog/website-visits-few-enquiries/`. Comprobar ausencia de colisión. Usar metadatos de `04`, canonical absoluto, fechas reales y schema según la práctica del sitio, sin autor personal inventado. Quitar selector local, etiqueta de borrador y noindex. Convertir rutas relativas de CSS y media a recursos públicos.
4. Aplicar los cuatro párrafos pertinentes de `07`, actualizando manuscritos y páginas generadas juntos, con dateModified real y datePublished original. Conservar las dos salidas del nuevo y revisar cualquier artículo añadido después de esta preparación.
5. Añadir hub, sitemap y manifiesto de distribución. Incluir sólo HTML público, CSS necesario y cuatro recursos optimizados. Excluir originales PNG, documentos y previews. Comprobar duplicados y restos de borrador.
6. Ejecutar controles de contenido, enlaces y pruebas. Preparar el repositorio público habitual `.cache/cloudflare-public-site`, remoto `https://github.com/rankingrebels/ranking-rebels-public-site.git`. Revisar su estado y sincronizar una lista explícita sin borrar cambios desconocidos. El remoto de trabajo agency-website es distinto del público.
7. Compilar y revisar la carga. Verificar rutas absolutas antes de operaciones recursivas del build. Publicar la revisión aprobada en origin main del repositorio público y Cloudflare Pages `ranking-rebels-public-site`, respetando la fecha más temprana.
8. Confirmar éxito y coincidencia de `/_deployment.json` con la revisión. Verificar HTTP, canonical, artículo completo, CSS, imágenes, hub, sitemap y las seis conexiones nuevas dentro de los cuerpos servidos, preservando las diez anteriores. No afirmar rastreo o indexación de Google.
9. Actualizar inventario y prueba de publicación. Eliminar la automatización única cuando se complete o deje de ser útil. Avisar del resultado verificado o del impedimento concreto. Conservar la limitación de revisión visual si no existe evidencia nueva.

Este encargo no autoriza publicar otros temas. El siguiente del plan para un encargo posterior es “Why Isn't My Website Showing Up on Google? A Step-by-Step SEO Diagnosis”.
