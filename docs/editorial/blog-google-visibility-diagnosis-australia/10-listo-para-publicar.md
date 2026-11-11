# Blog 6 · publicación confirmada

Preparación editorial y visual terminada el 23 de octubre de 2026. **Publicado y verificado el 28 de octubre de 2026, bajo la autorización específica del 27.** El usuario pidió dejarlo listo y preparar también el siguiente.

Los archivos `01`–`07` contienen diagnóstico, auditoría aplicada, manuscrito, SEO, fuentes reabiertas, imágenes y revisión de enlaces. `08`, `09` y `09a` registran controles y evidencia. Las dos vistas locales permiten revisar el mismo artículo con lectura clara u oscura. Su selección y aprobación visual siguen pendientes.

Ruta candidata: `/blog/website-not-showing-up-on-google/`. Comprobada ausente en el sitio público y sin colisión local. No convertir ese candidato en canonical o fecha efectiva antes de integrar.

## Al autorizar la publicación

1. Recuperar la versión y el diseño aprobados. Revisar instrucciones posteriores y el inventario actual. El blog 5 puede haberse publicado desde esta preparación; no deducirlo de su programación.
2. Integrar un módulo propio mediante `tools/publish-blog.cjs`, siguiendo los módulos existentes. Publicar sólo HTML, CSS necesario y los cuatro recursos optimizados. Quitar noindex, controles de comparación y etiqueta local. Usar canonical absoluto, fechas reales, Open Graph y schema veraces sin autoría humana inventada.
3. Completar `07`: dos salidas ya presentes en el borrador, tres párrafos útiles desde publicados y las dos direcciones con el 5 si ese destino existe. Revisar los artículos nuevos que haya entonces. Actualizar manuscritos y HTML juntos, conservando fechas de publicación originales.
4. Añadir hub, sitemap y manifiesto. Ejecutar las pruebas pertinentes, comprobar carga pública y build, y preservar cambios posteriores en el repositorio de producción `.cache/cloudflare-public-site`. Verificar las rutas absolutas de salida antes de cualquier operación recursiva del build.
5. Sólo con autorización, publicar la revisión en el remoto público habitual `rankingrebels/ranking-rebels-public-site`, origin main y Cloudflare Pages `ranking-rebels-public-site`. Confirmar despliegue y `/_deployment.json`, cuerpo completo, recursos, metadatos, hub, sitemap y enlaces dentro de las páginas servidas antes de anunciar éxito.
6. Actualizar inventario y registro con evidencia. No afirmar indexación o beneficio SEO por el despliegue.

No hay cambios de cuentas, robots, perfiles o solicitudes de Google autorizados por esta preparación. La automatización del 5 no incluye publicar el 6. El siguiente tema del plan es el 7, priorización de procesos para automatizar, cuya preparación se autorizó expresamente mientras se cerraba este trabajo.

## Revisión previa solicitada por el usuario, 27 de octubre

Cuando el usuario ordene publicar este blog, primero enlazar la vista final y recordarle revisar texto, diseño e imágenes. Mostrar la versión concreta y el resumen de cambios pertinentes en otros artículos. Esperar su confirmación de revisión y aprobación antes de enviar a origin main o desplegar en Cloudflare. Una orden inicial genérica de publicación no sustituye ese paso. Registrar la versión aprobada; si ese recordatorio y su aprobación ya constan para la versión vigente, no repetirlos. Se pueden completar preparación y comprobaciones locales mientras tanto. Esta condición expresa del usuario se detalla en ../criterios-ranking-rebels.md y precede a los pasos de publicación de este documento.


## Excepción posterior: publicación autorizada del 6

La instrucción posterior del usuario autoriza publicar este blog el 28 de octubre después de las 07:30 de Melbourne, sin volver a pedir permiso. Sustituye para esta publicación el bloqueo de revisión previa de la sección anterior. Detalle, versión y programación a las 07:35 en [11-autorizacion-publicacion.md](11-autorizacion-publicacion.md). Completar integración, controles y verificación pública; no publicar 7/8/9 ni adelantar la fecha.


## Integración y controles, 28 de octubre

Integrado el módulo privado tools/publish-google-visibility-blog.cjs y su llamada en el publicador existente. Se conservan imágenes, prosa aprobada y variantes locales; los únicos cambios editoriales son las referencias pertinentes. Pasaron 18 comprobaciones específicas, 209 de producción y el build. La primera ejecución detectó sólo un recuento histórico de páginas de 22 frente a 23; se actualizó el inventario y la suite completa pasó sin fallos.

Revisión de estándares y revisión independiente del encargo sin hallazgos accionables; detalle en 14-control-publicacion.json. No se realizó una nueva revisión de página completa en navegador ni se adjuntaron capturas de escritorio/móvil: esa limitación queda explícita, sin sustituirla por comprobaciones HTTP. Se conservó el diseño local ya preparado. Se verificaron 651 piezas de contenido semántico de los seis manuscritos y 23 enlaces contextuales. Los 130 archivos de los borradores 7–9 permanecen intactos. Exportación pública limitada a páginas, cuatro recursos optimizados, manifiesto y pruebas. No se declara éxito hasta verificar origin main y la revisión servida.


## Publicación confirmada, 28 de octubre

Publicado el 28 de octubre de 2026 en https://rankingrebels.com/blog/website-not-showing-up-on-google/. origin main recibió 3a28b8ef5d6988b30eaafb7e60b4ea7ff056af61 y Cloudflare sirvió esa misma revisión. Se verificaron los seis cuerpos y canonicals, 19 recursos, hub, sitemap y 23 enlaces contextuales, con 31 comprobaciones HTTP. Los tres borradores restantes devolvieron 404 y quedaron fuera del hub/sitemap. Pasaron 209 pruebas de producción y el build. Evidencia: 15-verificacion-produccion.json. No se afirma indexación o mejora de resultados por el despliegue.

La herramienta confirmó deleteStatus deleted de publicar-blog-6-de-diagn-stico-en-google tras verificar la publicación. No se creó otra programación.
