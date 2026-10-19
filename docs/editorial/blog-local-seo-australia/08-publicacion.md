# Publicación del segundo blog

Autorización expresa del usuario: 19 de octubre de 2026. Esta autorización sustituye el límite anterior de preparación editorial para este artículo y permite crear imágenes, modificar los archivos públicos necesarios, enviar main y publicar en Cloudflare. No autoriza cambios en perfiles empresariales, que no forman parte de esta operación.

Ruta pública preparada: https://rankingrebels.com/blog/local-seo-google-maps-visibility/

## Implementación

Se conserva el manuscrito final en inglés australiano. El generador utiliza el diseño aprobado del primer blog: portada tipográfica, índice de escritorio y móvil, tablas accesibles y los estilos y navegación compartidos. La lista de tipos de negocio se representa como una lista HTML real.

La ilustración y el gráfico están documentados en `07-imagenes.md`. El artículo incorpora tamaños adaptativos, dimensiones, textos alternativos y metadatos sociales con imagen. BlogPosting utiliza publicación y modificación del 19 de octubre de 2026, idioma en-AU y Ranking Rebels como publisher, sin inventar una firma humana.

El hub muestra ambos artículos, con el más reciente primero y miniaturas derivadas de sus ilustraciones. El sitemap incluye la nueva ruta. El generador principal mantiene ambas entradas al ejecutarse, evitando que una actualización del primer artículo elimine la segunda del hub.

El CSS compartido recibe un identificador de versión nuevo; el contenido y las imágenes aprobadas del primer blog se conservan. Las pruebas de inventario y enlaces se amplían para incluir la nueva ruta.

## Repositorios y despliegue

Fuente de trabajo: `sramzz/agency-website`, rama `main`. Cloudflare Pages publica desde `rankingrebels/ranking-rebels-public-site`, rama `main`, proyecto `ranking-rebels-public-site`. El build ejecuta `node --test && node scripts/build.mjs` y entrega `dist` mediante una lista explícita de archivos públicos.

La lista de producción debe incluir el artículo y los cuatro archivos de imagen. El dossier, auditoría, manuscrito Markdown, notas, originales PNG y capturas de revisión quedan fuera de `dist`.

## Validación y prueba final

Se verificaron contenido completo, fuentes, metadatos, semántica de listas, navegación por secciones, ambas ilustraciones, rutas y configuración del artefacto. Pasaron las 199 pruebas del repositorio de trabajo y las 198 de producción. La compilación de producción también terminó correctamente antes de enviar cambios.

La inspección del navegador integrado de localhost seguía bloqueada por la política registrada anteriormente en esta conversación. No se intenta sortearla con otra superficie de automatización ni se afirma una revisión visual completa en navegador. Se inspeccionaron la ilustración generada y las versiones renderizadas del gráfico; las pruebas comprueban la estructura y los archivos.

El resultado efectivo de publicación, las revisiones Git, el estado de Cloudflare y las respuestas HTTP se registran en `09-verificacion-publicacion.json` después del despliegue. Esta nota de preparación no sustituye esa confirmación.

## Confirmación de publicación

Publicación confirmada el 19 de octubre de 2026. La revisión `04b9cf38cfb25aeb6be31b3b62648b6c8f09b38c` de producción se desplegó correctamente en Cloudflare con identificador `dc6ab642-91ea-4da4-9cfe-127f614a7b2e`. La comprobación directa de `/_deployment.json` en el dominio devolvió esa misma revisión.

El artículo, el hub, el sitemap, el primer blog y las cuatro imágenes nuevas respondieron con HTTP 200. Los bytes de las imágenes públicas coinciden con los archivos del workspace. El artículo tiene canonical y no contiene instrucciones noindex en el HTML o en su cabecera de respuesta. Esto confirma disponibilidad e indexabilidad declarada, no que Google ya lo haya indexado.

La fuente se publicó en `sramzz/agency-website` mediante el commit `7451b86157fe2a340cd2b2ec88f3edae29cc5d8d`. Esta confirmación posterior se conserva en ese repositorio de trabajo, sin provocar otro despliegue solo para registrar el resultado del anterior.
