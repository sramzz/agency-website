# Dossier — blog 3: agentes de IA y automatización de workflows

**Ranking Rebels · Australia · artículo en inglés australiano.** Fecha de consulta: 19 de octubre de 2026, Australia/Brisbane. Este documento prepara contenido editorial; no implementa agentes, conecta cuentas ni demuestra resultados de clientes.

## 1. Encargo y decisión editorial

**H1:** AI Agents vs Workflow Automation: What Can They Do for Your Business?

**Pregunta principal:** ¿qué puede delegar una empresa a un agente, en qué se diferencia de automatizar pasos y cuándo merece la pena esa flexibilidad?

**Respuesta central:** un agente puede coordinar partes de un proceso mediante herramientas habilitadas y decisiones delegadas. Su valor depende del problema, los datos, la integración, los límites y la evaluación. Muchas tareas funcionan mejor con reglas o un workflow con un paso de IA. El objetivo es un resultado útil y verificable, no la máxima autonomía.

El feedback del CEO aporta veinte casos potenciales. No son veinte capacidades verificadas de Ranking Rebels ni veinte procesos que puedan ejecutarse de extremo a extremo sin intervención. «Fully managed» describe quién gestiona un servicio; no equivale a «fully autonomous».

## 2. Público, intención y alcance

Principal: propietarios, responsables de operaciones y marketing de negocios australianos de servicios. Secundario: profesionales que esperan una explicación técnica defendible sin tutorial de código.

Intención principal: entender las opciones y tomar una decisión de diseño o compra. Secundarias: ejemplos, beneficios, autonomía, integraciones, supervisión y medición. No es una comparativa de modelos o de herramientas ni una promesa de sustituir equipos.

La pieza debe responder:

1. ¿Un chatbot, un workflow con IA y un agente son lo mismo?
2. ¿Qué decisiones pueden estar predefinidas y cuáles delegarse al modelo?
3. ¿Qué necesita un agente para actuar en correo, CRM, calendario o documentos?
4. ¿Qué casos justifican reglas, IA asistida o selección dinámica de pasos?
5. ¿Cuáles son los beneficios y cómo se evalúan?
6. ¿Qué controles debe tener una actuación delegada?
7. ¿Cómo se demuestra que una tarea quedó hecha?
8. ¿Cuándo no conviene un agente o un sistema multiagente?

## 3. Jerarquía de evidencia

| Tipo | Uso válido | Qué no demuestra |
|---|---|---|
| Documentación y publicaciones técnicas del proveedor | Funcionamiento documentado, arquitectura, evaluación y límites | Rentabilidad universal o resultados de Ranking Rebels |
| Guías de autoridades australianas | Alcance y orientaciones en su materia | Que toda empresa tenga idénticas obligaciones o que una arquitectura sea conforme por sí sola |
| Estudios originales de campo | Resultados en una población, tarea y periodo definidos | Rendimiento de cualquier agente en cualquier empresa |
| Contenidos de proveedores/consultores | Su propuesta y cobertura editorial | Una prueba independiente de cada beneficio comercial |
| Marcos de este dossier | Criterios prácticos y ejemplos de diseño | Taxonomía oficial, certificación o experiencia de campo demostrada |

Las síntesis son paráfrasis. No se recopilan citas sociales sin contexto verificable. La fecha de consulta no se presenta como fecha de publicación de una fuente. No se utilizan datos ausentes para completar una historia comercial.

## 4. Distinción técnica: útil, pero no universal

Anthropic distingue workflows cuyos modelos y herramientas siguen recorridos predefinidos de agentes donde el modelo dirige dinámicamente el proceso y el uso de herramientas. La publicación es de diciembre de 2024 y advierte actualmente que parte del tooling ha cambiado; se usa para arquitectura, no como manual de instalación vigente. También reconoce que «agente» se usa de varias maneras. [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents).

No convertir esa distinción en una frontera absoluta: pueden existir modelos que clasifican dentro de un flujo fijo, bucles predefinidos, delegación dinámica dentro de límites y sistemas híbridos. Una condición «si/entonces», una llamada al modelo o la cantidad de pasos no bastan para clasificar todo un sistema.

**Definiciones operativas de este artículo:**

| Concepto | Qué describe | Ejemplo ilustrativo |
|---|---|---|
| Automatización por reglas | Acciones y condiciones programadas sobre entradas previstas | Formulario válido → registro → aviso al responsable |
| Workflow con IA | Proceso definido que utiliza IA en una o varias etapas | Email → extracción de datos → validación → borrador → aprobación |
| Agente basado en LLM | Sistema con decisiones delegadas sobre los próximos pasos o herramientas para un objetivo acotado | Investigar una consulta usando fuentes autorizadas, adaptar la búsqueda y preparar un handoff |
| Asistente o interfaz de chat | Forma de interacción con la persona | Puede apoyarse por debajo en reglas, workflow o agente; no es una arquitectura mutuamente excluyente |

El artículo habla de agentes basados en modelos de lenguaje para procesos empresariales, no intenta definir todo el campo histórico de agentes en inteligencia artificial.

## 5. Qué permite actuar: modelo, herramientas y sistema

Un modelo que redacta «he actualizado el CRM» no demuestra una actualización. En function calling, el modelo puede solicitar una función y el código de la aplicación ejecuta la operación y devuelve un resultado. Los servicios gestionados pueden proporcionar parte de esa ejecución, pero siguen necesitando herramientas y permisos adecuados. [OpenAI: function calling](https://developers.openai.com/api/docs/guides/function-calling).

Elementos a explicar sin convertirlos en una lista obligatoria de productos:

- Objetivo y límites del encargo.
- Información disponible, procedencia y actualidad.
- Herramientas realmente conectadas y acciones admitidas.
- Reglas de negocio y controles fuera del texto de un prompt.
- Estado necesario para continuar o recuperar una tarea.
- Evidencia de lo que ocurrió y condición de finalización.
- Responsable y ruta para excepciones o cambios.

No afirmar que todo agente necesita memoria persistente, RAG, un servidor MCP, varios subagentes o un vector database. Son opciones de diseño según el problema, no requisitos universales.

El ejemplo oficial de preparación de reuniones de OpenAI ilustra conexión a fuentes y acciones seleccionadas; es una demostración específica, no prueba de integración con cualquier plan, CRM o calendario. [Workspace agents](https://developers.openai.com/cookbook/articles/chatgpt-agents-sales-meeting-prep).

## 6. Beneficios: mecanismo, condición y métrica

Esta tabla es una propuesta de evaluación, no resultados empíricos de Ranking Rebels:

| Beneficio buscado | Mecanismo posible | Condición | Qué medir |
|---|---|---|---|
| Menos traspasos manuales | Mover información entre etapas y sistemas compatibles | Datos correctos e integración fiable | Tiempo total y retrabajo por caso válido |
| Respuesta o preparación más rápida | Clasificar, recuperar antecedentes o preparar un borrador | Fuentes disponibles y revisión proporcionada | Tiempo hasta siguiente acción útil, no solo velocidad del borrador |
| Procesar lenguaje menos estructurado | Extraer o interpretar una solicitud para el proceso | Criterios y evaluación de exactitud | Campos correctos, información omitida y excepciones |
| Mayor capacidad ante tareas variables | Elegir qué consulta o herramienta usar según el resultado previo | Flexibilidad realmente necesaria y margen operativo | Resolución válida frente al método más sencillo |
| Mejor continuidad de seguimiento | Recordar estado y preparar el siguiente paso autorizado | Identificadores y registro de estado adecuados | Oportunidades pendientes, duplicados y acciones correctas |
| Mayor visibilidad del proceso | Registrar acciones y salidas relevantes | Logs útiles, acceso adecuado y revisión | Casos explicables y capacidad de detectar/reparar errores |

La trazabilidad no viene garantizada por llamar «agente» al software: hay que diseñarla. La automatización tampoco elimina errores por definición; puede propagar un error de origen con rapidez. Comparar contra una línea base y contra una solución más sencilla.

El tiempo de una revisión, las correcciones, las licencias, uso de modelos, integraciones, supervisión y mantenimiento forman parte del coste. Un demo rápido o barato por llamada no determina el coste por resultado correcto.

## 7. Elegir qué parte delegar

Escala editorial propia, no clasificación oficial ni una progresión obligatoria:

| Modalidad | Delegación | Ejemplo | Evidencia para ampliarla |
|---|---|---|---|
| Preparación | Leer información permitida y proponer una salida | Resumen de reunión | Exactitud y utilidad verificadas |
| Ejecución definida | Aplicar acciones previstas dentro de reglas | Crear tarea para responsable correcto | Campos, permisos y resultado correctos |
| Decisión acotada | Elegir pasos o herramientas dentro de alcance | Investigar un ticket y proponer resolución | Casos variables resueltos sin actuaciones fuera de alcance |
| Ampliación posterior | Delegar más acciones solo si compensa | Enviar respuestas de un tipo permitido | Evaluación operacional, coste y control adecuados |

La decisión es por tarea y acción, no «dar a la IA el control de la empresa». Preparar un mensaje, enviarlo, cambiar un presupuesto, borrar registros y autorizar un pago tienen consecuencias distintas.

Las aprobaciones pueden formar parte de un flujo automatizado: Microsoft documenta procesos que esperan una respuesta humana antes de continuar. No es necesario exigir revisión de cada paso de bajo impacto para poder conservar control; sí definir qué queda permitido y dónde intervenir. [Microsoft: approvals](https://learn.microsoft.com/en-us/power-automate/get-started-approvals).

## 8. Cuatro casos principales para el artículo

**Cualificación de consultas entrantes.** Reglas para campos y duplicados; IA para interpretar texto; posible agente si necesita elegir búsquedas autorizadas para reunir contexto. Criterios de adecuación definidos por el negocio, sin rechazar o prometer servicios por una impresión no verificada.

**Preparación de reuniones.** Recuperar documentos y notas permitidos, resolver qué antecedentes hacen falta y preparar agenda o briefing. No convertir información de calendario en autorización para cancelar o enviar mensajes. Confirmar datos y permisos de cada acción.

**Soporte.** Routing y respuestas de casos conocidos pueden ser workflow; investigación variable con herramientas puede justificar un agente. Una respuesta convincente no equivale a resolver el estado de la cuenta. Derivar casos fuera de política o evidencia.

**Producción de contenido.** Investigación → esquema → redacción → edición es compatible con un workflow fijo. No necesita llamarse agente por usar IA. Verificación y publicación son acciones diferentes; producir más no demuestra calidad, SEO ni ventas.

El artículo debe desarrollar tres o cuatro ejemplos sin repetir veinte mini-secciones. La tabla completa del CEO queda como material de apoyo.

## 9. Los veinte casos del CEO, reinterpretados

Estas filas son propuestas de análisis, no un catálogo validado. «Inicial» no significa que esa arquitectura baste para cualquier implementación.

| Caso | Enfoque inicial y posible delegación | Condición / resultado a comprobar |
|---|---|---|
| Lead generation & qualification | Reglas para filtros; IA para investigación/clasificación; agente si necesita búsqueda variable | Datos autorizados y adecuación según criterio comercial |
| Outbound sales sequences | Workflow para secuencias; investigación y borradores asistidos | Destinatarios, supresiones, permisos, comunicaciones adecuadas y respuestas derivadas |
| Content production | Cadena editorial con pasos verificables | Fuentes, calidad, aprobación y publicación efectivas |
| Social media | Calendario y programación por reglas; asistencia en borradores y clasificación | Mensaje correcto y escalamiento de situaciones sensibles |
| Email marketing | Segmentos/disparadores definidos; propuestas y análisis asistidos | Datos, bajas, criterios de prueba y resultado relevante |
| Customer onboarding | Etapas y recordatorios; interpretación de bloqueos | Provisión/guía correctas y excepciones atendidas |
| Support resolution | Routing o agente para investigación según variabilidad | Estado resuelto, exactitud y actuación dentro de política |
| Meeting intelligence | Captura, resumen y tareas con herramientas autorizadas | Acuerdos correctos, destinatarios y condiciones aplicables a grabación |
| Invoices & expenses | Extracción más validaciones y rutas de aprobación | Datos y autorización: capturar una factura no es pagarla |
| Bookkeeping & close | Conciliación definida y propuestas sobre excepciones | Profesional responsable y evidencia de cierre; sin promesa de exactitud automática |
| Recruiting | Agenda/comunicación y apoyo a resumen de candidaturas | Criterios válidos, datos y revisión de decisiones relevantes |
| Competitive intelligence | Recogida programada o investigación adaptativa | Fuentes, fechas y distinción observación/inferencia |
| Order fulfilment | Integraciones transaccionales y reglas; IA en excepciones | Inventario, envío y estado real; no entrega física realizada por un modelo |
| Ads management | Automatización de plataforma más análisis y propuestas | Presupuesto, permisos y conversiones; no ROI garantizado |
| Video pipeline | Pasos de producción con herramientas especializadas | Exactitud, activos, derechos y publicación autorizada |
| CRM hygiene | Reglas y propuestas para coincidencias ambiguas | No borrar o fusionar sin criterios; recuperación y datos correctos |
| Market research | Investigación y análisis con método | Datos reales, cálculos y límites; no encuestas inventadas |
| Product feedback | Recogida/clustering y propuestas | Frecuencia no equivale a prioridad; decisión de producto documentada |
| Legal documents | Plantillas, extracción, comparación y borradores | Revisión jurídica competente para decisiones materiales; no consejo autónomo garantizado |
| Personal productivity | Reglas y asistencia; acciones delegadas acotadas | Agenda y mensajes correctos, sin compromisos no autorizados |

Las recomendaciones de revisión dependen del caso; esta tabla no afirma una obligación legal idéntica para cada acción ni que todas las decisiones deban ser manuales.

## 10. Integración, permisos y errores que importan

La conexión necesita comprobar herramientas, API o interfaz, plan, identidad, lectura/escritura, límites y operación. No prometer «se conecta con todo». Una API disponible no elimina la necesidad de configurar credenciales y probar el recorrido.

OpenAI documenta controles y revisión en el límite de herramientas y advierte que ninguna capa elimina todos los fallos. El material externo puede incluir instrucciones maliciosas o datos incorrectos: no debe tratarse como autorización para ampliar el encargo. [Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals).

Recomendaciones de diseño para explicar en lenguaje empresarial:

- Limitar las acciones y fuentes a lo necesario.
- Comprobar reglas y autorización donde se ejecuta la acción, no solo en un prompt.
- Separar lectura, borrador, envío y cambios destructivos.
- Resolver campos ausentes o contradictorios mediante una ruta definida.
- Definir parada por agotamiento de presupuesto, fallos repetidos o falta de evidencia.
- Prever recuperación y evitar efectos duplicados al reintentar.
- Conservar un registro proporcionado y un responsable operativo.

No presentar la frase «human in the loop», los formatos JSON válidos o un porcentaje de confianza declarado por el modelo como garantía de exactitud. Cada control tiene que probarse en contexto.

Para el mecanismo de instrucciones maliciosas en documentos recuperados, citar específicamente [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), §2.9, página impresa 11 / página PDF 15: describe prompt injection indirecta mediante datos recuperados. MS-2.7-007 recomienda evaluar resistencia a estos ataques. No atribuir este detalle a la página de guardrails si esa página no lo explica.

## 11. Ejemplo conductor australiano

**Hipotético:** una empresa de limpieza comercial de Brisbane recibe solicitudes de presupuesto con información desigual. No es un cliente ni una implantación verificada de Ranking Rebels.

Una solicitud contiene ubicación y frecuencia, pero no superficie aproximada o franja de acceso. Un flujo puede comprobar campos, asociar el registro y preparar una petición de datos. El modelo puede interpretar lenguaje libre; eso por sí solo no exige un agente.

Si el caso requiere elegir entre antecedentes de cliente y documentos de servicio autorizados, puede evaluarse un componente agente para reunir información relevante. Su encargo termina en un briefing y próximo paso propuesto. Confirmar precio, disponibilidad, contrato o envío fuera del alcance exige el proceso que el negocio haya definido; no queda autorizado por la solicitud original al modelo.

Comparar dos alternativas: workflow con un paso de extracción frente a selección dinámica de herramientas. Elegir la segunda solo si aporta mejor resultado suficiente para justificar costes, revisión y complejidad. Verificar el registro o borrador real, no solo la respuesta que anuncia su creación.

## 12. Medición propuesta: trabajo válido, no solo actividad

| Medida | Definición de trabajo propuesta | Límite |
|---|---|---|
| Finalización correcta | Casos que cumplen criterios verificables / casos evaluados | Separar resultados automáticos de asistidos |
| Tiempo total | Entrada a resultado válido, incluida revisión y espera | Un borrador rápido puede ocultar retrabajo |
| Coste por resultado válido | Costes atribuibles de operación y revisión / resultados válidos | Declarar cómo se asignan implementación y mantenimiento |
| Retrabajo y excepciones | Casos corregidos o derivados, con motivo | Derivar correctamente puede ser una buena decisión |
| Calidad de handoff | Campos correctos y contexto útil para responsable | «Mensaje enviado» no demuestra utilidad |
| Efectos no autorizados | Acciones fuera del permiso o resultado previsto | No ocultar incidentes detrás de una media de acierto |

Es un cuadro editorial propio, no un benchmark de proveedores. Definir qué cuenta como válido y evitar excluir los casos difíciles después de medir. Un resultado completado por una persona tras derivación puede ser éxito del proceso, pero no del componente autónomo; informar ambos por separado.

Anthropic distingue la traza de una ejecución de su resultado real y recomienda múltiples intentos porque hay variabilidad. Una afirmación de reserva hecha no sustituye la evidencia de la reserva. [Evaluación de agentes](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).

OpenAI documenta trazas, criterios y conjuntos de evaluación para revisar selección de herramientas, handoffs y cambios de comportamiento. El log permite investigar; no certifica calidad por existir. [Agent evals](https://developers.openai.com/api/docs/guides/agent-evals).

## 13. Evidencia empírica y límites

Las fuentes técnicas verificadas respaldan mecanismos, límites y métodos de evaluación; no ofrecen una estimación defendible del ahorro de una pyme australiana concreta. Los resultados internos de investigación multiagente de Anthropic corresponden a su sistema y evaluación, no al workflow de una empresa de servicios. No se reproducen sus porcentajes como ROI. [Sistema de investigación multiagente](https://www.anthropic.com/engineering/multi-agent-research-system).

NIST AI 600-1 aporta un marco voluntario estadounidense para riesgos de IA generativa, incluida confabulación y evaluación. No es una ley australiana, certificación ni evidencia de productividad. [Publicación y documento original](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence).

Se consideró el estudio NBER «Generative AI at Work», pero no se incorporaron sus cifras: no se pudo verificar aquí el texto completo y método de la versión correspondiente. Además, asistencia a empleados y actuación autónoma son unidades de análisis distintas. Esta exclusión evita presentar una cifra atractiva como respuesta a otra pregunta.

No hace falta una cifra de ahorro para defender el tema. La guía puede explicar beneficios como hipótesis medibles y mostrar una decisión honesta. No utilizar resultados de coding/research internos de un proveedor como multiplicadores de productividad en una empresa de servicios.

## 14. Contexto australiano proporcionado

Al trabajar con información personal, las orientaciones de OAIC deben interpretarse según su alcance y si la organización está sujeta a la Privacy Act. No afirmar que toda pyme tiene idénticas obligaciones, ni que añadir revisión humana demuestre cumplimiento. Revisar datos, producto, accesos y finalidad. [OAIC: uso de productos de IA comerciales](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products).

Para comunicaciones comerciales electrónicas, consultar la guía de ACMA sobre consentimiento, identificación y baja. Un agente o proveedor no convierte una lista de contactos en permiso para contactar. No desarrollar sanciones o asesoría jurídica en este artículo. [ACMA](https://www.acma.gov.au/avoid-sending-spam).

Estas referencias son relevantes al analizar los casos de outbound y tratamiento de datos. No convertir el blog en una lista legal ni dar una receta universal para sectores regulados.

## 15. Qué puede decirse de Ranking Rebels

La página de AI Automation describe reglas, asistencia de IA, aprobación y handoff. Incluye aplicaciones como informes, calendarios, preparación de documentos y seguimiento. Es evidencia de la propuesta publicada, no una auditoría de implementaciones o de resultados. [AI Automation](https://rankingrebels.com/solutions/ai-automation/).

No se dispone de métricas propias de ahorro, exactitud o ventas; no presentar el inventario del CEO como portfolio. Un CTA puede invitar a revisar un proceso concreto y sus decisiones, sin prometer un agente universal o una plantilla que funcione sin configuración.

## 16. Intención, competencia y semántica

Muestra exploratoria de cuatro publicaciones australianas abiertas y leídas; no es un censo de resultados de Google ni una comparación de posiciones. Las páginas comerciales prueban su propia cobertura, no validan sus promesas de ahorro o precios.

| Publicación | Cobertura observada | Decisión para este blog |
|---|---|---|
| [HELLO PEOPLE](https://hellopeople.com.au/guides/ai-agent-vs-workflow-automation) | Automatización primero; comparación con agentes | Explicar que lenguaje libre también puede procesarse en un workflow fijo |
| [Attah Digital](https://www.attahdigital.com.au/insights/ai-agents-explained) | Herramientas, permisos, evaluación y handoffs | Reconocer que esa cobertura ya existe; no copiar su marco BOUND |
| [All Webbed Labs](https://www.awlabs.com.au/guides/ai-agents-vs-chatbots-vs-automation) | Comparación con chatbots y automatización | Aclarar que chat es una interfaz compatible con varias arquitecturas |
| [FlowWorks](https://flowworks.com.au/guides/ai-agents-australia) | Casos empresariales, costes y gobernanza | No trasladar precios o beneficios particulares como referencia universal |

Propuesta de valor editorial propia: seguir una misma consulta comercial a través de reglas, extracción con IA, selección dinámica de herramientas y handoff responsable. Complementarla con denominadores de medición y evidencia del estado final. Es una síntesis útil, no una afirmación de exclusividad o una garantía de superar a estos artículos.

Enlace interno principal confirmado: [AI Automation](https://rankingrebels.com/solutions/ai-automation/). [Solutions](https://rankingrebels.com/solutions/), [Journey](https://rankingrebels.com/journey/) y [Contact](https://rankingrebels.com/contact/) existen como opciones según contexto; no insertar los cuatro por obligación. No inventar rutas de los próximos blogs.

La revisión sigue el enfoque de contenido útil de [Google Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): aportar análisis que ayude a decidir, identificar autoría real y evitar aparentar experiencia no demostrada. No hay extensión preferida de Google ni una fórmula de E-E-A-T que garantice posiciones.

Consulta principal editorial: **AI agents vs workflow automation**. Secundarias propuestas: AI agents for business, AI workflow automation, AI assistant vs agent, business process automation, human oversight for AI agents, how to measure AI agent performance.

No hay datos cuantitativos de Australia para demanda, dificultad o ranking. No convertir estas variantes en una lista de repeticiones obligatorias.

## 17. Fronteras con los otros artículos

| Blog del plan | Pregunta reservada |
|---|---|
| 3, este artículo | Qué enfoque utilizar y qué decisiones delegar |
| 6, priorización | Qué proceso merece automatizarse primero |
| 7, software a medida | Cuándo desarrollar/adaptar/comprar y trade-offs de producto |
| 8, implementación workflow | Cómo mapear, construir y evaluar un piloto concreto |
| 12, CRM | Cómo organizar estados, responsabilidades e historial comercial |

El blog 3 explica arquitectura y decisiones con ejemplos; no proporciona un manual de cada integración ni veinte tutoriales. No enlazar slugs imaginados de artículos no publicados.

## 18. Estructura editorial propuesta

Extensión orientativa de unas 2.200–3.000 palabras por alcance, ajustable sin relleno. No es un requisito de ranking.

1. Respuesta clara: capacidades y decisión central.
2. Tabla de reglas, workflow con IA y agente; chat como interfaz.
3. Qué necesita un agente para actuar y qué control se delega.
4. Beneficios con condiciones y métricas.
5. Casos seleccionados y un contraejemplo donde bastan reglas.
6. Ejemplo australiano con elección entre dos arquitecturas.
7. Límites de ejecución, handoffs y cuándo no usar agente.
8. Cómo evaluar resultados y costes.
9. Preguntas no repetidas y siguiente paso comercial proporcionado.

## 19. Reglas para redactor y auditor

- Inglés australiano natural: enquiries, organisation, prioritise, authorised y optimisation según contexto.
- Voz profesional y concreta. No «digital employees», «runs your entire business», «set and forget», «guaranteed ROI» o autonomía como superioridad por defecto.
- Definir si una regla es del proveedor, un hallazgo experimental o una recomendación propia.
- No usar un demo o caso extranjero para prometer el mismo ahorro a Australia.
- No inventar clientes, credenciales, autor/revisor o experiencia propia.
- No recomendar una función legacy/deprecada como punto de partida sin comprobar vigencia; el artículo es independiente de proveedores.
- No confundir una revisión por otro modelo con verificación independiente definitiva.
- Mantener fuentes junto a afirmaciones. No copiar pasajes largos ni citar estadísticas sin método original.

## 20. Qué no se ha confirmado

No se revisaron cuentas o procesos privados, permisos reales, sistemas de clientes, volúmenes australianos o costes de un proyecto. No se construyó ni evaluó un agente. No hay resultados de producción o ROI propios. No se certificó cumplimiento legal de un caso ni validez de integraciones para un plan específico.

Autoría y revisión humana, imágenes, ruta, canonical, markup, renderizado y publicación son pendientes reales. Este paquete prepara el contenido y las pruebas editoriales, no una implementación.

## 21. Criterios de aceptación

- [ ] Explica qué decisiones se delegan sin vender autonomía ilimitada.
- [ ] Distingue IA en un workflow, agente y chat como interfaz, reconociendo híbridos.
- [ ] Beneficios acompañados de condiciones y evaluación; sin porcentajes inventados.
- [ ] Herramientas/permisos y efecto real separados de texto generado.
- [ ] Cuatro ejemplos pertinentes y un caso australiano hipotético coherente.
- [ ] Reglas, roles, supervisión y parada proporcionales a cada acción.
- [ ] Métricas incluyen revisión, fallos, coste y estado final.
- [ ] No atribuye a Ranking Rebels todos los veinte casos.
- [ ] No solapa la guía de implementación ni la de software a medida.
- [ ] Auditoría del manuscrito real, con cambios justificados y no confirmados explícitos.
