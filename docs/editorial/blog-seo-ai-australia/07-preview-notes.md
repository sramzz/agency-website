# Primera vista local del blog

Preparada el 16 de octubre de 2026, después de la revisión editorial, a petición del usuario.

Vista local: http://127.0.0.1:4177/docs/editorial/blog-seo-ai-australia/preview.html

La página usa la navegación, paleta y fuentes del sitio actual y presenta el manuscrito completo. Añade un índice de secciones, progreso de lectura, índice desplegable en móvil y tablas con desplazamiento horizontal localizado. Se identifica como vista previa y no incluye autor, fecha de publicación ni canonical inventados.

El archivo `render-preview.cjs` transforma el Markdown revisado en `preview.html`. Para regenerarlo después de un cambio editorial:

```text
node docs/editorial/blog-seo-ai-australia/render-preview.cjs
```

Los estilos específicos están en `preview.css` y la interacción del índice en `preview.js`. Se heredan los estilos generales sin modificar la hoja compartida. El archivo tiene `noindex, nofollow`, no se añadió al sitemap ni a la navegación pública y no se publicó.

## Comprobaciones

La página y los estilos compartidos respondieron HTTP 200 en localhost. Se comprobó la sintaxis de los scripts, un solo H1, ausencia de identificadores duplicados, diez secciones del artículo y tres tablas.

La primera apertura en el navegador integrado agotó el tiempo de conexión antes de reiniciar el servidor con acceso local. El intento posterior de observación fue rechazado por la política del navegador. No se intentó sortear esa restricción con otro navegador o herramientas de automatización. Por ello no se afirma revisión visual de escritorio o móvil ni se adjuntan capturas.

La suite del repositorio ejecutó 192 pruebas: 188 pasaron y 4 fallaron. Los fallos se deben al inventario, recuento de páginas y organización de imágenes en `.cache/cloudflare-public-site/` y en el preview preexistente `docs/qa/solutions-motion/preview/index.html`. La vista del blog no añade archivos llamados `index.html` ni imágenes y no modifica esos elementos. El resultado completo de la ejecución está en `.cache/blog-preview-tests.log`.

Esta vista local es posterior a la entrega editorial, cuyo alcance original era preparar contenido. Las comprobaciones de una futura publicación, autoría real y revisión visual permanecen pendientes.
