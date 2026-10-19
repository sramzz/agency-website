# Blog 3 — soporte de arquitectura y fuentes primarias

Consulta: 19 de octubre de 2026, Australia/Brisbane. Alcance: conceptos y límites de agentes y workflows; no validación de un producto concreto, implementación ni estimaciones de ROI. Las ocho páginas siguientes se abrieron y se leyó el cuerpo del artículo/documentación, incluidas sus secciones finales. Documentación viva: fecha de consulta no significa fecha de publicación. Sin citas textuales extensas.

## Conclusión para el editor

**Hecho verificado:** el grado de control sobre los próximos pasos distingue arquitecturas. **Recomendación editorial:** explicar qué puede delegar una empresa, con qué integraciones y límites, antes de enumerar herramientas. Una interfaz de chat no basta para clasificar el sistema; puede ser la interfaz de un agente o un asistente que solamente produce respuestas. “Agente” tampoco equivale a control irrestricto ni a supervisión inexistente. No presentar la taxonomía de un proveedor como un estándar universal.

## Fuentes verificadas y alcance de cada una

### A1. Anthropic — Building effective agents

- URL: https://www.anthropic.com/engineering/building-effective-agents
- Publicación: 19 diciembre 2024. La página advierte que parte del tooling descrito ha cambiado y enlaza documentación actual.
- **Verificado:** distingue caminos definidos mediante código de agentes que deciden dinámicamente proceso y herramientas. Recomienda comenzar simple; agentes añaden coste, latencia y riesgo de errores acumulados. Describe bucles con resultados de herramientas, condiciones de parada y puntos de consulta humana; permite combinar patrones.
- **Uso:** fundamento conceptual; evitar repetir recomendaciones de productos o modelos antiguos. Su experiencia de ingeniería es evidencia cualitativa de primera parte, no ensayo independiente sobre productividad de pymes.

### A2. Anthropic — How we built our multi-agent research system

- URL: https://www.anthropic.com/engineering/multi-agent-research-system
- Publicación: 13 junio 2025.
- **Verificado:** explica investigación con coordinador y subagentes paralelos, incluyendo costes, coordinación, observabilidad y recuperación. Tareas con contexto compartido o muchas dependencias pueden encajar peor. Resultados favorables pertenecen a su arquitectura y evaluaciones internas.
- **Uso:** respaldar que múltiples agentes no son automáticamente mejores. No trasladar porcentajes de rendimiento, velocidad o consumo de este sistema a una agencia australiana ni tratarlos como garantía económica.

### A3. Anthropic — Demystifying evals for AI agents

- URL: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- Publicación: 9 enero 2026.
- **Verificado:** diferencia transcripción y resultado real del entorno; combina evaluadores programáticos, modelos y personas. Recomienda casos representativos, pruebas repetidas, revisión de trazas y calibración humana; evals se complementan con vigilancia en producción y feedback.
- **Uso:** comprobar acciones reales y restricciones, además de calidad del texto. La frase del agente “reserva realizada” no prueba que exista la reserva. Un pequeño conjunto inicial sirve para aprender, no certifica fiabilidad universal.

### A4. OpenAI — Agents

- URL: https://developers.openai.com/api/docs/guides/agents
- Documentación viva, sin fecha de publicación visible en el cuerpo leído.
- **Verificado:** presenta Agents API, Agents SDK y Responses API con diferentes responsabilidades de ejecución, herramientas y estado. Las herramientas e integraciones deben configurarse para el runtime elegido; mantener contexto requiere mecanismos de estado.
- **Uso:** demostrar que un sistema combina componentes, no solo un prompt. Evitar recomendar Agent Builder por documentación histórica: el índice actual lo clasifica en Legacy APIs. No se investigó aquí su calendario formal de retirada.

### A5. OpenAI — Running agents

- URL: https://developers.openai.com/api/docs/guides/agents/running-agents
- Documentación viva, sin fecha de publicación visible.
- **Verificado:** el runner consulta modelo, procesa herramientas o handoffs y continúa hasta salida o pausa. Documenta límites de turnos, fallos de herramientas, aprobaciones y reanudación desde estado. La definición inicial del agente es solo configuración; la ejecución requiere runtime y gestión de continuidad.
- **Uso:** explicar bucle “decidir → actuar con herramienta → observar → decidir”; añadir detener/escalar. No confundir generar una intención de acción con completar una transacción externa.

### A6. OpenAI — Orchestration and handoffs

- URL: https://developers.openai.com/api/docs/guides/agents/orchestration
- Documentación viva, sin fecha de publicación visible.
- **Verificado:** distingue transferencia de responsabilidad a un especialista y especialistas como herramientas de un agente coordinador. Recomienda empezar con uno y dividir solo cuando mejore aislamiento de capacidades/políticas, claridad o trazabilidad. Dividir prematuramente añade prompts, trazas y superficies de aprobación.
- **Uso:** explicar que un sistema multiagente es una decisión de diseño que debe demostrar valor, no una etapa obligatoria de madurez ni multiplicador automático de resultados.

### A7. OpenAI — Guardrails and human review

- URL: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals
- Documentación viva, sin fecha de publicación visible.
- **Verificado:** distingue validaciones automáticas de pausas para aprobar acciones. Una aprobación puede interrumpir y reanudar una ejecución con estado. Los controles de entrada/salida no cubren todas las llamadas: los controles de herramientas se aplican donde están conectados.
- **Uso:** mostrar aprobaciones en puntos de efecto real, no solo una instrucción “sé cuidadoso”. No afirmar que un guardrail garantiza seguridad o que un control de salida evita una acción externa ya ejecutada.

### A8. Microsoft Learn — Get started with approvals

- URL: https://learn.microsoft.com/en-us/power-automate/get-started-approvals
- Última actualización mostrada: 29 abril 2026.
- **Verificado:** un flujo puede iniciar una solicitud y esperar respuesta de responsables; documenta distintas reglas de aprobación y requisitos de entorno/licencia. Hay formas de combinar automatización con decisión humana sin necesitar un agente autónomo.
- **Uso:** ejemplo concreto de diseño híbrido. No extrapolar sus licencias, permisos o conectores a otras plataformas ni a las cuentas de Ranking Rebels. La página mostraba un aviso genérico de autorización, pero el cuerpo documental completo era legible.

## Taxonomía de trabajo para el artículo

Síntesis editorial, basada en A1, A4, A5; no taxonomía normativa universal:

| Categoría | Quién define los pasos | Ejemplo hipotético |
|---|---|---|
| Automatización con reglas | Reglas/programación determinan secuencia y ramas | Formulario válido crea registro y envía aviso al responsable |
| Workflow con IA | Ruta prevista incluye interpretación/generación del modelo | Extraer datos de consulta, comprobar campos y presentar borrador |
| Agente de IA | Modelo elige próximos pasos/herramientas según objetivo y resultados | Investigar una consulta ambigua en fuentes autorizadas y decidir qué verificar después |
| Asistente conversacional | Describe interfaz/uso; capacidad depende del sistema conectado | Puede redactar una respuesta o ser interfaz de un agente con herramientas |

Las categorías no son excluyentes por toda la empresa: una ruta definida puede llamar a un agente para un subproblema y volver a controles y aprobación. Un diagrama fijo con un nodo de IA no demuestra por sí solo que el sistema entero sea un agente.

## Decisiones defendibles para un ejemplo empresarial

**Recomendaciones de ingeniería/editoriales, no resultados comprobados:**

1. Para una empresa de servicios australiana, usar un ejemplo hipotético de consulta entrante: validación de formulario, consulta de datos autorizados, extracción de necesidad, preparación de respuesta, revisión y registro del resultado. Precisar qué pasos son reglas, IA o decisiones dinámicas.
2. Describir permisos separados para lectura, creación de borrador, edición y envío. Es una recomendación de diseño basada en límites y aprobaciones de A4/A7; no una propiedad automática de cualquier agente.
3. Si el dato falta, la herramienta falla o una acción excede autoridad, conservar estado y escalar; no rellenar información ni continuar enviando. La capacidad técnica debe probarse en el sistema elegido.
4. Medir registros correctos, consultas bien clasificadas, respuestas aprobadas, tiempo total con revisión, errores, escalaciones y coste por tarea completada. Comparar con una línea base; no prometer mejoras sin piloto.
5. Usar reglas cuando reglas conocidas basten. Emplear IA para lenguaje/documentos y un agente cuando la elección dinámica de pasos aporte una ventaja verificable.

## Afirmaciones que no quedaron establecidas por estas fuentes

- Que cualquiera de los veinte workflows del CEO pueda ser totalmente autónomo o esté disponible en Ranking Rebels con todas las integraciones.
- Que adoptar agentes reduzca necesariamente plantilla, mejore ventas o disminuya coste total.
- Que integrar un modelo conceda por sí solo acceso al CRM, email, calendario o contabilidad. La documentación presupone herramientas configuradas; las credenciales y permisos concretos requieren inspección del despliegue.
- Que una demo exitosa pruebe consistencia, cumplimiento legal o seguridad en producción.
- Que la memoria sea ilimitada, que las actualizaciones se validen solas o que varios agentes siempre superen a uno.

## Nota al integrador

Priorizar enlaces A1, A3 y A7 en el manuscrito conceptual. Reservar detalles API para dossier. Mantener las síntesis derivadas de cada fuente acotadas: no copiar este documento entero más otro resumen largo de la misma página. No publicar claims legales australianos con esta nota; necesitan fuentes oficiales locales y revisión de aplicabilidad por separado.

## Auditoría técnica independiente del manuscrito

Revisión íntegra de `02-articulo-ai-agents-workflows-australia.md`, 19 octubre 2026. Alcance: arquitectura, mecanismos y evaluación; privacidad australiana, spam y evidencia comercial requieren sus revisiones especializadas.

**Resultado:** no se detectaron errores demostrables críticos o importantes dentro de este alcance. Los beneficios se expresan como posibilidades sometidas a medición; el caso de Brisbane está rotulado hipotético y no reclama mejoras observadas.

| Extracto comprobado | Dictamen | Evidencia |
|---|---|---|
| “Workflow automation ... routes are defined in advance; it may include AI” | Correcto para la taxonomía declarada; reconoce variación y combinación | A1 |
| “A workflow can hand one investigation to an agent, then resume a fixed approval process” | Composición técnicamente válida; no impone exclusión entre categorías | A1, A7 |
| “the model can request a function; application code executes it and returns the result” | Correcto para la integración explícitamente delimitada | OpenAI Function calling, sección The tool calling flow: https://developers.openai.com/api/docs/guides/function-calling |
| “a check on the final answer alone does not cover every intermediate action” | Correcto; validaciones tienen límites de ejecución distintos | A7 |
| “Reading a calendar does not imply permission to reschedule” | Recomendación de autoridad por acción, adecuada; no promete comportamiento automático | A4, A7 |
| “A correct escalation ... without being an autonomous resolution” | Definición evaluativa editorial útil; diferencia resultados y automatización | A3 |
| “demonstration on a few easy cases does not establish reliability” | Correcto; no generaliza cobertura ni consistencia a partir de demo | A3 |

**Mejora menor de trazabilidad**, sin error factual demostrado: el párrafo “Information retrieved from an email or document ... prompt injection” necesita una fuente próxima específica. El enlace de guardrails respalda controles, pero no desarrolla por sí solo toda la explicación de inyección indirecta. Añadir una fuente técnica ya verificada de seguridad que cubra contenido no confiable; mantener la separación entre recomendación y garantía. La página histórica https://developers.openai.com/api/docs/guides/agent-builder-safety confirma el mecanismo, pero está en Legacy APIs y contiene recomendaciones de productos antiguas: preferir una fuente actual para la cita pública. No recomendar sus configuraciones históricas.

No es necesario agregar memoria, vector databases, modelos particulares, muchos agentes ni código API para corregir el artículo. Serían ampliaciones de alcance, no correcciones exigidas por estas fuentes.
