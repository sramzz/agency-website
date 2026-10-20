# Fuentes comprobadas y afirmaciones no confirmadas

Consulta de este pase: **19 de octubre de 2026, Australia/Sydney**. Se abrieron las fuentes siguientes y se leyeron los pasajes que respaldan las afirmaciones utilizadas. No se afirma lectura íntegra de miles de líneas de documentación API ni de todo el PDF NIST. Las fechas de publicación o actualización se distinguen de la consulta.

## Comprobación primaria

| Fuente y URL | Publicación o actualización visible | Pasaje comprobado y uso | Límite |
|---|---|---|---|
| [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Publicado 19 diciembre 2024 | What are agents, When and when not to use agents, prompt chaining, routing y Agents: rutas previstas, decisiones dinámicas, composición y coste/complejidad | Taxonomía atribuida, no definición universal. La página advierte cambios en el tooling desde 2024. No se trasladan recomendaciones de producto antiguas ni resultados a Australia |
| [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Publicado 9 enero 2026 | The structure of an evaluation: trials, transcript y outcome; mantenimiento de evaluaciones: revisar ejecuciones y resultados. Respalda repetir pruebas y verificar el estado real | Experiencia de proveedor, no ROI propio ni garantía de fiabilidad por superar una muestra |
| [OpenAI: Function calling](https://developers.openai.com/api/docs/guides/function-calling) | Documentación viva, sin fecha de publicación confirmada en el pasaje | How it works y The tool calling flow: solicitud del modelo, código de aplicación y devolución del resultado | La afirmación se acota a una integración custom. No demuestra compatibilidad con cuentas o planes concretos |
| [OpenAI: Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals) | Documentación viva, sin fecha de publicación confirmada en el pasaje | Choose the right control, Approval lifecycle y Workflow boundaries matter: checks sobre herramientas y pausas de aprobación | Los controles no se aplican automáticamente a cada paso. No son garantía de seguridad ni obligación jurídica general |
| [Microsoft: Get started with approvals](https://learn.microsoft.com/en-us/power-automate/get-started-approvals) | Actualizado 29 abril 2026 | Approvals actions: Start and wait for an approval espera respuesta antes de continuar. Se leyó también el contexto de requisitos y licencias | La página muestra un aviso genérico de autorización, pero el cuerpo documental es legible. No se generalizan licencias o conectores |
| [NIST AI 600-1, documento original](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | Portada: julio 2024 | §2.9, página impresa 11, página 15 del PDF: instrucciones inyectadas en datos recuperados. La introducción declara uso voluntario | Perfil estadounidense de riesgos, sin carácter de ley australiana o certificación. Solo se utiliza para el mecanismo de prompt injection |
| [OAIC: commercially available AI products](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products) | Publicado 21 octubre 2024, actualizado 17 enero 2025 | Top five takeaways, Quick reference guide y How does the Privacy Act apply: idoneidad, accesos, supervisión y organizaciones cubiertas | No se presume que cada pequeña empresa tenga idénticas obligaciones ni se evalúa jurídicamente una implantación |
| [ACMA: Avoid sending spam](https://www.acma.gov.au/avoid-sending-spam) | Actualizado 29 noviembre 2024 | How to comply, Get consent, Identify yourself y Make it easy to unsubscribe: consentimiento expreso/inferido, identificación, baja y responsabilidad al delegar | Ámbito de mensajes comerciales electrónicos. No se añaden sanciones ni una prohibición universal de cualquier contacto |
| [Ranking Rebels: AI Automation](https://rankingrebels.com/solutions/ai-automation/) | Sin fecha editorial visible confirmada | Workflow, The method y The human handoff: reglas, asistencia de IA, aprobación y transferencia a personas. Respalda el CTA | Evidencia de la propuesta publicada, sin prueba de resultados propios o de los veinte servicios del dossier |
| [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Actualizado 5 octubre 2026 | Focus on people-first content, preguntas sobre longitud y Who: utilidad, autoría verdadera y ausencia de una extensión preferida | Criterio editorial, sin puntuación E-E-A-T ni garantía de ranking |
| [Google: Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) | Actualizado 10 diciembre 2025 | Anchor text e Internal links: referencias descriptivas en contexto y ausencia de un número mágico de enlaces | No demuestra mejora medida por añadir estos enlaces |

Los ocho primeros destinos externos son los del manuscrito base y se conservaron todos. Las dos guías de Google orientan el trabajo editorial y SEO, sin añadirlas artificialmente al artículo. Las métricas y los diseños del caso son recomendaciones editoriales identificadas, no tablas oficiales de estas fuentes.

## Rutas y material del sitio

Se leyeron completos los manuscritos activos de los dos artículos publicados y se contrastó el inventario con los directorios `blog/` y el hub. Una consulta HTTP directa confirmó el 19 de octubre de 2026:

| Destino | Respuesta | Canonical |
|---|---|---|
| [Hub de artículos](https://rankingrebels.com/blog/) | 200, sin redirección | Coincide con la URL solicitada; contiene los dos artículos del inventario |
| [SEO y búsqueda con IA](https://rankingrebels.com/blog/is-seo-still-relevant-ai-search/) | 200, sin redirección | Coincide con la URL solicitada |
| [SEO local y Maps](https://rankingrebels.com/blog/local-seo-google-maps-visibility/) | 200, sin redirección | Coincide con la URL solicitada |
| [AI Automation](https://rankingrebels.com/solutions/ai-automation/) | 200, sin redirección | Coincide con la URL solicitada |

La herramienta de investigación web no pudo abrir el hub. La comprobación del hub anterior procede de la consulta HTTP directa, no de atribuir contenido a una apertura fallida. No se utilizaron credenciales o cuentas privadas ni se modificaron perfiles.

## Material recibido que no se revalidó

Las notas incluyen cuatro competidores, otras páginas de OpenAI y Anthropic, un estudio NBER considerado y casos del CEO. Se leyeron sus descripciones en los archivos, pero no se volvieron a investigar esas páginas o estudios en este pase porque no sostienen afirmaciones nuevas del artículo final. No se presenta su revisión anterior como investigación independiente actual. Se mantuvo excluida cualquier cifra de NBER o de benchmarks internos.

## Afirmaciones que siguen sin confirmar

| Afirmación potencial | Situación y tratamiento |
|---|---|
| Ahorro, ventas o exactitud propios de Ranking Rebels | No hay datos. No se incluyen porcentajes o resultados |
| El negocio de limpieza es un cliente o una implantación real | Es expresamente hipotético y no se presenta como caso de éxito |
| Disponibilidad de los veinte usos del CEO como servicios probados | No acreditada. Se conservan como oportunidades en el dossier recibido |
| Compatibilidad de un sistema con CRM, correo o calendario concretos | No se inspeccionaron cuentas, planes, permisos o integraciones. Se explica qué comprobar |
| Autonomía completa, ausencia de errores o cumplimiento garantizado | No establecidos y no prometidos |
| Volumen australiano, dificultad o superioridad frente a competidores | Sin datos cuantitativos. Las consultas SEO son propuestas editoriales |
| Autor humano y revisión profesional independiente | Sin identidad o firma confirmada. No se inventan |
| Publicación nueva o mejora SEO medida | No implementada en producción ni medida. Hay una vista local con imágenes propias, documentadas en `08-vista-local-e-imagenes.md`; no son evidencia de resultados o de un cliente |

La consulta a estas fuentes no valida un producto, una instalación o la aplicabilidad jurídica de una situación concreta. Si la publicación se retrasa o se añaden funciones, precios o requisitos, habrá que revisar las afirmaciones afectadas.

## Revalidación antes de publicar, 21 de octubre de 2026

Se abrieron de nuevo las ocho fuentes externas citadas en el artículo y se leyeron los pasajes pertinentes. Anthropic conserva la distinción de rutas previstas frente a decisiones dinámicas, el coste de complejidad y la diferencia entre transcript y outcome en sus evaluaciones. Ambas URLs originales redirigen ahora a la sección /research/ y se conservan como destinos recibidos. La documentación de function calling mantiene la ejecución del código por la aplicación. Guardrails and human review mantiene las comprobaciones a nivel de herramienta, el ciclo de aprobación y los límites de controles de entrada/salida. Microsoft describe que Start and wait for an approval espera la respuesta antes de continuar.

El PDF NIST sigue disponible: se leyó el pasaje de prompt injection directa e indirecta de §2.9, página impresa 11, que el extractor actual sitúa en P14. OAIC conserva su orientación sobre idoneidad, supervisión y acceso a información personal; se mantiene la cautela del texto sobre la aplicabilidad del Privacy Act. ACMA mantiene consentimiento, responsabilidad al delegar, identificación y baja. La lectura de la página no se presenta como evaluación jurídica de una implantación.

No se añadieron benchmarks, porcentajes de ahorro, garantías de resultados, compatibilidades de planes ni nuevas obligaciones jurídicas. El manuscrito preparado permanece íntegro. Las comprobaciones del hub y las rutas del 19 son históricas: el 21 se contrastó el conjunto real de tres artículos antes de añadir el cuarto. La autorización para publicarlo hoy está en 11-publicacion-2026-10-21.md. Las respuestas y enlaces de producción se registran después del despliegue.
