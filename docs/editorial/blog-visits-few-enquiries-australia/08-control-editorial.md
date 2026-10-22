# Control de preparación

Se compararon ambos HTML con el manuscrito: 96 bloques semánticos en el mismo orden, incluidas todas las celdas y listas. Ocho H2, tres H3, dos tablas y dos figuras por vista. Se conservaron los trece destinos originales y se añadieron dos enlaces contextuales a artículos publicados. Los dos cuerpos son iguales.

Se comprobaron las diez copias de originales con SHA-256, IDs únicos, etiquetas code, dimensiones y alternativas de imágenes, metadatos de borrador y ausencia de canonical o schema que simulen publicación. Los contrastes calculados superan 4,5:1 para los colores de prosa, enlaces y texto secundario comprobados.

Veintidós respuestas HTTP locales comprobaron ambas páginas, CSS, JavaScript e imágenes referidas. Las cuatro URLs publicadas devolvieron 200 y canonical correcto y figuran en el hub y sitemap. El candidato nuevo no figura en esos recursos públicos ni existe como ruta pública local. Los 258 archivos rastreados ajenos a docs del punto de partida conservan su SHA-256.

Estas comprobaciones corresponden a un borrador aislado. No se ejecutó el generador público ni el build de publicación. La verificación visual cubre recursos, no la página completa en navegador. No se atribuye un resultado SEO a la preparación.

Evidencia: `09-verificacion.json` y `09a-verificacion-http.json`. El cierre público requiere controles de integración y build y comprobación de enlaces en las páginas servidas después del despliegue.

## Revisión de imagen, 23 de octubre

Se inspeccionó la edición V2 original y su WebP optimizado. Se comprobaron por HTTP las dos vistas y ambas variantes de imagen, con 200 y coincidencia exacta con los archivos. Las dimensiones son 1280 × 720 y 768 × 432. La comparación con la versión guardada en Git confirma que el HTML sólo cambia en las referencias de la principal y la etiqueta V2. El manuscrito, los enlaces y los recursos anteriores se conservan, y los 258 archivos públicos del punto de partida permanecen idénticos. Evidencia actual: `12-verificacion-imagen-v2.json`. La revisión de página completa en navegador y la aprobación visual siguen pendientes.
