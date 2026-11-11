# Auditoría editorial, factual y SEO — blog 6

20 de octubre de 2026, Australia/Sydney. Se leyó el manuscrito completo `02-articulo-google-visibility-diagnosis-australia.md`, con pasadas separadas sobre Search Console, rastreo/indexación y estrategia. Revisión asistida por IA, no firma humana independiente ni auditoría del dominio.

## 1. Diagnóstico ejecutivo

El artículo convierte una pregunta amplia en una investigación por URL, consulta y evidencia. Distingue indexación y ranking, registros y prueba en vivo, etiquetas y causas. Conserva controles intencionales y exclusiones normales; no recomienda indexar todo o reconstruir cualquier web con JavaScript.

No se detectaron errores factuales críticos o importantes en los ámbitos técnicos revisados. Sí se identificó una mejora importante de cobertura diagnóstica: precisar qué dato disminuyó al hablar de una caída. Se añadieron comprobaciones menores de frescura, retirada temporal y fuente específica de contenido cargado por interacción.

El límite principal es claro: no hay datos privados o comprobación real de un sitio para demostrar causa, indexación, recuperación o resultado comercial. El caso es hipotético. El paquete está listo para revisión humana y preparación final; no publicado.

## 2. Hallazgos y cambios justificados

| Gravedad / tipo | Hallazgo en la versión revisada | Evidencia e impacto | Cambio aplicado |
|---|---|---|---|
| Importante · cobertura, no falsedad | «Lost traffic» podía interpretarse igual para impresiones, clics y sesiones | [Traffic drops](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops) y [SC/Analytics](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console) separan observaciones. Cambia qué se investiga antes de atribuir causa | Añadido bloque que distingue unidades y evita inferir desindexación, IA o penalización de menos clics |
| Menor · límite de datos | Faltaba advertencia expresa sobre filtros y datos recientes preliminares | [About the data](https://support.google.com/webmasters/answer/17011364?hl=en) describe frescura. Un cero reciente o filtrado no confirma descenso | Añadida frase con fuente específica en sección5 |
| Menor · ruta omitida | Una URL indexada puede no mostrarse por una retirada temporal activa | [Removals](https://support.google.com/webmasters/answer/9689846?hl=en) y límites de [Inspection](https://support.google.com/webmasters/answer/9012289?hl=en). Live positivo no la descarta | Añadida comprobación en sección6 y revisión de propósito con propietario, sin cancelar automáticamente |
| Menor · cercanía de respaldo | Contenido cargado solo tras interacción tenía una referencia JS general | La [guía lazy loading](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading) respalda el mecanismo específico | Añadido enlace, sin cambiar una afirmación ya correcta |

La nueva frase de retiradas se formuló sobre el **live test**, evitando atribuir una incapacidad absoluta a todas las vistas de Inspection. No se añadieron plazos de retirada, recetas universales o detalles de implementación innecesarios.

## 3. Registro de verificación material

| Tema | Fuente primaria | Dictamen y límite |
|---|---|---|
| Búsqueda manual/site: | [Operador site](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site) | No se trata como censo ni prueba definitiva de indexación |
| Índice, live y canonical | [Inspection](https://support.google.com/webmasters/answer/9012289?hl=en) | Distintos alcances/fechas; prueba actual no promete inclusión o selección |
| Estados y exclusiones | [Page Indexing](https://support.google.com/webmasters/answer/7440203?hl=en) | No atribuye causa de calidad/hosting por etiqueta ni exige todo indexado |
| robots/noindex | [Robots](https://developers.google.com/search/docs/crawling-indexing/robots/intro), [noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) | Distingue acceso, lectura de regla y meta/cabecera. No elimina protecciones indiscriminadamente |
| Versiones | [Canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) | Preferencia, señales e intención; no garantía ni penalización automática por duplicado |
| Respuestas y contenido | [HTTP](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes), [JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) |200, redirects, soft404 y renderizado bien separados; sin SSR obligatorio |
| Rendimiento de Search | [Desgloses](https://support.google.com/webmasters/answer/17011259?hl=en) | Canonical y queries omitidas impiden interpretar ausencia de fila como cero apariciones |
| Problemas específicos | [Manual Actions](https://support.google.com/webmasters/answer/9044175), [Security Issues](https://support.google.com/webmasters/answer/9044101) | No confunde informes, reconsideración o revisión con solicitudes de indexación |
| Reprocesamiento | [Recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) | Días/semanas de rastreo no convertidos en plazo comercial; reenviar no acelera |

La página de desgloses se leyó en la investigación de soporte; un intento adicional devolvió429 y quedó documentado. No se usa ese fallo temporal como evidencia de un problema del sitio del lector.

## 4. Evaluación SEO y editorial

Consulta: **why is my website not showing up on Google**. Función informativa/diagnóstica. La muestra de tres guías australianas no acredita ranking, demanda o brecha exclusiva.

| Dimensión | Estado | Conclusión |
|---|---|---|
| Title | Pass propuesto |51 caracteres, claro; presentación real pendiente |
| Meta description | Pass propuesta |152 caracteres, sin tratar conteo como límite oficial |
| Encabezados | Pass manuscrito | Un H1, nueve H2 y cinco H3 |
| Cuerpo | Pass manuscrito | Árbol comprensible, casos condicionados y fuentes junto a hechos |
| Enlaces internos | Needs work al integrar | Contact confirmado; conexiones de blogs pendientes de destino |
| Medios | Needs work si se añade figura | Propuesta opcional; no activo para evaluar |
| Slug | Pass como propuesta | Descriptivo, sujeto a inventario/ruta real |
| Schema | Needs work al implementar | Datos reales y concordancia pendientes, sin campos ficticios |

No se renderizó una página nueva ni se inspeccionó su HTML. Las comprobaciones de implementación pendientes no son fallos probados del artículo. La revisión técnica del contenido tampoco equivale a puntuar las seis capas de una web que no se auditó.

Se conserva Perth hipotético para continuidad sin obligar a leer los anteriores. What Is SEO? sigue4 y aporta fundamentos;2 amplía Maps;5 amplía consultas cuando sí hay visitas. El6 no absorbe esos temas ni fuerza agentes/IA.

## 5. Credibilidad, pendientes y decisiones conservadas

La investigación abierta de [Nifty](https://niftymarketing.com.au/why-your-website-isnt-showing-up-on-google/), [Pryce](https://prycedigital.com/guides/google-rankings-seo) y [Ranking Australia](https://www.rankingaustralia.com.au/news/why-is-my-website-not-showing-up-on-google-search/) muestra que gran parte de la cobertura ya existe. No se copiaron sus marcos o cifras ni se verificó cada afirmación rival. La contribución buscada es la precisión del proceso, no exclusividad demostrada.

Se descartan cambios cosméticos de estructura, más keywords, más extensión o un FAQ sin necesidad. No hay razón para añadir código de configuración, umbrales CWV, llms.txt o un tutorial de recuperación de seguridad: ampliarían el alcance sin corregir un fallo del manuscrito.

Quedan autoría/revisión humana reales, inventario del equipo, URL/activos y pruebas de implementación. Las URLs públicas1–5 no se confirmaron; no se concluye que no estén publicados. No hay cuentas, causas reales, tarifas, ROI, fechas de recuperación o resultados propios verificados.

La versión optimizada está en02; la auditoría y prompts permanecen fuera del cuerpo publicable. Una entrega en archivos no demuestra indexación, publicación o ejecución de otro chat.
