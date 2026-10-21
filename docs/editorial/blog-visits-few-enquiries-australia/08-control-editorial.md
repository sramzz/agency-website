# Control de preparación

Se compararon ambos HTML con el manuscrito: 96 bloques semánticos en el mismo orden, incluidas todas las celdas y listas. Ocho H2, tres H3, dos tablas y dos figuras por vista. Se conservaron los trece destinos originales y se añadieron dos enlaces contextuales a artículos publicados. Los dos cuerpos son iguales.

Se comprobaron las diez copias de originales con SHA-256, IDs únicos, etiquetas code, dimensiones y alternativas de imágenes, metadatos de borrador y ausencia de canonical o schema que simulen publicación. Los contrastes calculados superan 4,5:1 para los colores de prosa, enlaces y texto secundario comprobados.

Veintidós respuestas HTTP locales comprobaron ambas páginas, CSS, JavaScript e imágenes referidas. Las cuatro URLs publicadas devolvieron 200 y canonical correcto y figuran en el hub y sitemap. El candidato nuevo no figura en esos recursos públicos ni existe como ruta pública local. Los 258 archivos rastreados ajenos a docs del punto de partida conservan su SHA-256.

Estas comprobaciones corresponden a un borrador aislado. No se ejecutó el generador público ni el build de publicación. La verificación visual cubre recursos, no la página completa en navegador. No se atribuye un resultado SEO a la preparación.

Evidencia: `09-verificacion.json` y `09a-verificacion-http.json`. El cierre público requiere controles de integración y build y comprobación de enlaces en las páginas servidas después del despliegue.
