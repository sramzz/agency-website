# Auditoría editorial y técnica — blog 3

Fecha: 19 de octubre de 2026. Objeto revisado: manuscrito completo `02-articulo-ai-agents-workflows-australia.md`, contrastado con dossier, plan de trece blogs, fuentes y propuesta pública de Ranking Rebels. Esta revisión asistida por IA incluye lecturas separadas de arquitectura, evidencia operativa y estrategia; no constituye revisión o firma de un experto humano independiente, ensayo de un agente o auditoría jurídica.

## 1. Diagnóstico ejecutivo

El manuscrito responde a la intención de comparar agentes y workflows sin convertir la flexibilidad en una ventaja automática. Define el alcance de «agente» y reconoce sistemas híbridos, separa chat de arquitectura y diferencia la solicitud del modelo de una acción realmente ejecutada. Los beneficios se explican mediante mecanismos y condiciones, no mediante cifras de ahorro ajenas.

El ejemplo continuo de Brisbane y la comparación de resultados válidos aportan una herramienta de decisión propia. No son investigación de campo ni un caso de cliente. Los competidores australianos consultados ya cubren permisos, supervisión y evaluación; no se afirma una ventaja exclusiva o superioridad en posiciones.

No se identificaron errores críticos o importantes demostrables en el manuscrito revisado dentro del alcance asignado. Se hicieron dos ajustes menores de precisión/evidencia. El principal límite de credibilidad permanece explícito: no hay prueba de implantación, costes o ROI propios, ni revisión humana firmada. La ausencia de esos datos impide añadir claims de experiencia o rentabilidad; no invalida la explicación técnica y el ejemplo hipotético.

**Dictamen:** material preparado para revisión humana y adaptación editorial final. No se ha publicado ni auditado una nueva página en producción.

## 2. Hallazgos priorizados y cambios aplicados

| Prioridad / gravedad | Hallazgo en la versión revisada | Evidencia y por qué importa | Solución / estado |
|---|---|---|---|
| 1 · Menor, respaldo documental | El párrafo de prompt injection no tenía fuente propia; la cita anterior sobre controles de herramientas no documentaba por sí sola ese mecanismo | [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), §2.9, página impresa 11, describe inyección indirecta por datos recuperados. Evita atribuir un hecho a la fuente equivocada | Añadido enlace directo y aclarado que instrucciones maliciosas pueden intentar redirigir el sistema. No se promete eliminar el riesgo |
| 2 · Menor, precisión | «Finding an address online should not be treated as permission to contact it» podía interpretarse fuera del contexto de marketing electrónico | [ACMA](https://www.acma.gov.au/avoid-sending-spam) trata consentimiento para mensajes comerciales, distingue consentimiento expreso e inferido y mantiene responsabilidad al delegar | Sustituido por «does not, by itself, establish consent to send commercial electronic messages». Mantiene alcance y matiz |
| 3 · Menor, coherencia del paquete | Una versión del paquete SEO contaba diez H2 | El manuscrito contiene nueve H2; el conteo es verificable en el archivo | Corregido a nueve. No se cambiaron encabezados para ajustar un número |

No se detectaron defectos que justifiquen una reescritura completa, añadir keywords o aumentar extensión. No se inventaron incidencias críticas para llenar la tabla.

## 3. Riesgos y pendientes: distintos de errores del manuscrito

| Asunto | Nivel / naturaleza | Tratamiento |
|---|---|---|
| Autoría y revisión humana | Importante para cerrar la publicación; dato pendiente | Asignar responsable real y obtener revisión efectiva. No inventar byline, credenciales o una firma técnica |
| Resultados y capacidad de empresa | Límite de evidencia comercial | Mantener beneficios potenciales y ejemplo hipotético. Para añadir un caso propio se necesitarían datos y permiso para usarlo |
| Datos, costes e integración de un negocio concreto | Pendiente de proyecto, no de este artículo | No calcular ROI ni garantizar conexiones con todos los planes/herramientas |
| Normativa australiana | Alcance general, sin dictamen de un caso | Mantener referencias proporcionadas. Determinar aplicabilidad y condiciones del uso real antes de implantar |
| Ruta, imagen, canonical y markup | Pendiente de publicación | No generar URL o activos imaginados. Comprobarlos al implementar la página |
| Fuentes técnicas vivas | Riesgo de cambio posterior | Revalidar cerca de la publicación, sobre todo si se añaden productos, versiones, precios o instrucciones de instalación |

## 4. Registro de comprobación de afirmaciones materiales

Fuentes abiertas y leídas durante la investigación; consulta 19 de octubre de 2026. Las notas de soporte amplían el registro. Fecha de consulta no equivale a fecha de publicación.

| Afirmación o uso | Fuente primaria | Evaluación y límite |
|---|---|---|
| Distinción entre rutas predefinidas y elección dinámica | [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Respaldada como distinción de ese proveedor. Publicación de diciembre de 2024 con aviso sobre evolución del tooling; no taxonomía universal ni manual vigente de instalación |
| Solicitud de función y ejecución por aplicación | [OpenAI: Function calling](https://developers.openai.com/api/docs/guides/function-calling) | Respaldada para integración custom descrita. El artículo reconoce ejecución gestionada; no afirma que todos los servicios requieran código del cliente |
| Aprobación dentro de automatización | [Microsoft: approvals](https://learn.microsoft.com/en-us/power-automate/get-started-approvals) | Respaldada. No deriva de ella que cualquier licencia incluya cualquier conector |
| Controles sobre acciones y herramientas | [OpenAI: guardrails and approvals](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals) | Respaldada. El manuscrito no presenta una comprobación del texto final como cobertura de todos los efectos |
| Instrucciones inyectadas en contenido recuperado | [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | Respaldada, §2.9. Documento voluntario estadounidense; no se trata como ley australiana |
| Trazas, resultados y repetición de evaluaciones | [Anthropic: agent evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Respaldada. Las métricas propuestas y su selección son síntesis editorial, no benchmark oficial o certificación |
| Evaluación de privacidad en productos AI comerciales | [OAIC](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products) | Se preserva alcance a organizaciones cubiertas; no obligación idéntica asumida para toda pyme |
| Responsabilidad y consentimiento de mensajes comerciales | [ACMA](https://www.acma.gov.au/avoid-sending-spam) | Formulación afinada; sin sanciones, umbrales o asesoría jurídica añadidos |
| CTA de automatización de Ranking Rebels | [Página pública de AI Automation](https://rankingrebels.com/solutions/ai-automation/) | Coincide con reglas, IA y handoffs publicados. No prueba resultados ni los veinte casos del CEO |
| Criterios editoriales y ausencia de extensión preferida | [Google Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Utilizados en la revisión SEO, sin puntuación de E-E-A-T ni promesas de ranking |

## 5. Evaluación SEO y editorial

La respuesta inicial fija una decisión útil y la tabla permite comparar rápidamente. La cobertura incluye beneficios, herramientas, control, ejemplos y medición. Las preguntas al proveedor concretan qué debe pedir el lector; no repiten un FAQ por motivos de SEO.

No se identificó una laguna esencial que exija ampliar a veinte casos o enumerar plataformas. No se midió la demanda de Australia, dificultad o posición de la competencia. Las consultas del paquete SEO son hipótesis de lenguaje, no oportunidades cuantificadas. Una muestra de cuatro publicaciones no demuestra una brecha exclusiva del mercado.

El texto respeta el alcance de los próximos blogs: no desarrolla la matriz de selección de procesos, compra de software, tutorial de piloto o administración del CRM. El enlace final de automatización es pertinente y está confirmado. Las rutas de artículos futuros quedan pendientes.

**Preferencias consideradas y no aplicadas como correcciones:** dar un H2 separado a «cuándo no usar agente» o dividir más el bloque de medición. Esa respuesta ya aparece en el inicio, ejemplo, comparación y cierre; sumar una sección duplicaría contenido. El bloque de medición combina tabla y aclaraciones necesarias para interpretar denominadores. No se cambió por gusto del revisor.

## 6. Qué no se pudo confirmar

No hay resultados de producción propios, precios verificables para el caso hipotético, tasas de ahorro o exactitud aplicables a la audiencia, acceso a cuentas, prueba de herramientas concretas ni volumen de búsqueda australiano. Tampoco se ha confirmado autoría humana, activos finales o publicación. No se han incorporado esas afirmaciones.

Se excluyeron porcentajes del estudio NBER considerado porque no se verificó aquí el texto completo/método de la versión relevante y no corresponde directamente a la autonomía descrita. No se sustituyó por una cifra de prensa o un resumen social.

La versión optimizada que incorpora los cambios justificados está en `02-articulo-ai-agents-workflows-australia.md`. El diagnóstico y el artículo se conservan separados para que las instrucciones internas no terminen en la publicación.
