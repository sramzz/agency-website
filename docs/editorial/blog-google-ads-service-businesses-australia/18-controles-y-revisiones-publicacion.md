# Controles y revisiones — blog 10

5 de noviembre de 2026. Base fija 4dd7661b323f468dc36a5874f475b7f8f812d444; revisión final d27fd3afa4bef12fc64ed7972a6d01ee84afeec0. Aprobación expresa en 14; la publicación no requiere otra confirmación.

## Especificación

Revisión asistida independiente y sólo lectura, blog10_spec_review. Sin hallazgos accionables, confirmados otra vez sobre la revisión final. Verificó 15 hashes aprobados, artículo íntegro tras remapear assets, ficha/copia exactas, campos vacíos, lectura clara, metadatos/fechas, diez rutas y 40 enlaces, 24 archivos allowlisted y destinos privados excluidos.

## Estándares

Revisión asistida independiente y sólo lectura, blog10_standards_review. Encontró un P2: etiquetas «blog draft»/«available locally…not published» en el pie de la ficha pública. Corregidas sólo en salida pública mediante generador privado, preservando cuerpo/aprobación; test case-insensitive ampliado. Revisión final: resuelto y sin otros hallazgos accionables. Estilos aislados, semántica/tablas/foco/alternativas, canonicals y límites de exportación revisados.

## Verificación ejecutada

220 pruebas JS privadas y 218 JS públicas, más una prueba de build público (219 pruebas públicas distintas), sin fallos pendientes. La primera ejecución detectó dos expectativas históricas de conteo/fechas; se actualizaron sin quitar las comprobaciones y se repitieron. Tras corregir el footer, tres pruebas afectadas pasaron otra vez. La prueba de build verifica modo preview/main y exclusión de docs/tests/originales. Build final de la revisión exacta antes del push.

36 comprobaciones HTTP locales verifican diez cuerpos/canonicals/esquemas, 40 enlaces contextuales a destinos presentes, ficha legible/descarga íntegra y vacíos, imágenes/recursos/fuentes, hub y sitemap. Versiones 11–18 exactas por hash; siete artículos públicos anteriores y kit9 exactos, dos artículos modificados sólo por enlaces y dateModified, fechas originales conservadas. Regeneración completa conserva 58 salidas exactas y todos los archivos aprobados.

Ilustración y gráficos conservan las versiones inspeccionadas y aprobadas. No nueva inspección visual completa de página/escritorio/móvil, teclado o impresión en navegador; ni prueba de cuenta, tracking, formulario, campaña o perfiles. Esos límites no se presentan como pruebas pasadas. La comprobación de producción se registra en 19 después de verificar Cloudflare y origin main.
