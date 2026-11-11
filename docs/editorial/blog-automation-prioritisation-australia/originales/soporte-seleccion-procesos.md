# Blog 7 — fuentes para seleccionar procesos que automatizar primero

Investigación de apoyo realizada el 20 de octubre de 2026 para Ranking Rebels. Mercado: Australia. Artículo destinado a publicarse en inglés australiano. Esta nota verifica criterios de selección; no recomienda comprar una plataforma ni demuestra resultados de Ranking Rebels.

## Resultado

Hay respaldo primario para evaluar el problema empresarial, la repetición y claridad de las tareas, los datos disponibles, las variantes, la estabilidad, los responsables y el coste de mantener la solución. No se encontró evidencia que convierta una puntuación editorial en una probabilidad de éxito o que establezca un proceso universal que toda pequeña empresa deba automatizar primero.

Las fuentes son documentación de producto y recomendaciones de sus proveedores. Sirven para verificar cómo describen sus métodos y requisitos. No son estudios independientes de impacto económico en pymes australianas.

## Fuentes primarias abiertas y leídas

### S1 — Microsoft: Recommendations for implementing automation

[Documento vigente](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/automate-tasks). Actualización mostrada: 8 de abril de 2026. Cuerpo revisado: apartados «Key design strategies», «Target tasks to automate», «Choose an appropriate automation tool», «Integrate automation» y «Considerations»; aproximadamente líneas 31–71 en la extracción web.

Verifica recomendaciones de comenzar por tareas procedimentales con duración útil, contemplar automatización parcial y mantener el control sobre dependencias, monitorización y mantenimiento. Advierte de la carga de desarrollar y mantener soluciones propias y aconseja elegir herramientas según la necesidad.

Límite: trata operaciones de workloads de Power Platform; trasladar sus principios a procesos comerciales es una recomendación editorial razonada. No garantiza ausencia de errores ni dicta que una tarea poco frecuente nunca merezca inversión.

### S2 — UiPath: Detailed Assessment

[Documento Cloud latest](https://docs.uipath.com/automation-hub/automation-cloud/latest/user-guide/completing-the-detailed-assessment). Sin fecha de publicación clara en el cuerpo. Cuerpo revisado completo, aproximadamente líneas 289–343.

El formulario solicita estabilidad del proceso y aplicaciones, frecuencia, volumen, duración, variantes, características de entradas y aplicaciones utilizadas; también contempla reproceso y revisión. El Process Owner completa la evaluación.

Límite: esos campos pertenecen a su producto. Una empresa puede reunir datos equivalentes con observaciones, registros y una hoja sencilla. La documentación no demuestra que todos los candidatos con datos digitales sean convenientes.

### S3 — UiPath: Information About the Idea Score

[Documento Cloud latest](https://docs.uipath.com/automation-hub/automation-cloud/latest/user-guide/information-about-the-idea-score). Sin fecha clara en el cuerpo. Cuerpo completo revisado, aproximadamente líneas 289–334.

El producto distingue adecuación y preparación. Su algoritmo combina reglas, digitalización, estructura, cambios previstos y documentación mediante valoraciones del remitente.

Límite decisivo: su porcentaje es un indicador calculado por una metodología de producto, no una probabilidad de éxito demostrada. No copiar pesos o escalas y presentarlos como estándar de Ranking Rebels o fórmula de ROI. Un criterio importante ausente no queda resuelto por una media alta.

### S4 — Microsoft: Prepare processes and data

[Documento vigente](https://learn.microsoft.com/en-us/power-automate/process-mining-processes-and-data). Actualización mostrada: 1 de septiembre de 2026. Leídos los requisitos y límites del historial, aproximadamente líneas 32–83.

Power Automate Process Mining requiere registros de eventos con identificador de caso, actividad y tiempo. El documento distingue una tabla de estado actual de un historial de eventos y advierte que algunas actividades pueden no estar registradas.

Límite: estos son requisitos de esa capacidad de análisis, no condiciones para toda automatización. Process mining puede aportar evidencia si hay registros adecuados; no es obligatorio para una primera selección pequeña ni descubre automáticamente todo el trabajo fuera del sistema.

### S5 — Microsoft: Measure value and realize return on investment

[Documento vigente](https://learn.microsoft.com/en-us/power-platform/guidance/adoption/common-vision/realize-value). Actualización mostrada: 14 de mayo de 2025. Cuerpo completo leído, aproximadamente líneas 32–101.

La orientación recomienda definir resultados, recoger datos de costes y valor, revisar métricas y contrastar iniciativas mediante grupos piloto. Los porcentajes en blanco del documento son plantillas de objetivos, no resultados de investigación.

Límite: no aporta un ahorro medio ni un plazo universal de retorno. Ninguna de sus plantillas puede usarse como estadística. Mantener separados previsión y beneficio observado.

### S6 — UiPath: Performing the Cost Benefit Analysis

[Documento Cloud latest](https://docs.uipath.com/automation-hub/automation-cloud/latest/user-guide/performing-the-idea-cost-benefit-analysis). Cuerpo completo leído, aproximadamente líneas 289–338. El texto incluye una nota sobre corrección de fechas en una entrega de junio de 2026; no hace falta trasladar ese detalle al blog.

Su análisis distingue estimaciones iniciales de implementación y datos posteriores. Incluye costes de construcción y operación, como licencias, infraestructura, mantenimiento, soporte y alojamiento. Las hipótesis de velocidad y potencial pueden ajustarse.

Límite: la calculadora depende de supuestos y valores introducidos. El cálculo previsto no es una medición del efecto conseguido ni prueba de ahorro de caja. Tampoco certifica la fiabilidad de una automatización.

## Matriz para afirmaciones del artículo

| Afirmación admisible | Evidencia | Qué no permite concluir |
|---|---|---|
| La selección debe comenzar por un resultado empresarial y el trabajo que lo bloquea. | S1 y S5. | Que automatizar sea siempre la intervención adecuada. |
| La repetición y las reglas claras suelen facilitar un primer alcance. | S1 y S3. | Que frecuencia por sí sola establezca prioridad o que IA solo pueda tratar datos estructurados. |
| Es útil conocer excepciones, variantes, revisión y reproceso antes de estimar esfuerzo. | S2. | Que todo caso excepcional deba automatizarse ni que pueda ignorarse al medir resultados. |
| La estabilidad de proceso y aplicaciones importa para estimar mantenimiento. | S1, S2 y S3. | Que haya un periodo mínimo universal de estabilidad o que los cambios imposibiliten cualquier solución. |
| Una tarea dentro de un proceso puede automatizarse manteniendo intervención humana en otras etapas. | S1. | Que esa intervención haga fiable cualquier solución, o que humano implique que ya no es automatización. |
| Un responsable debe poder describir reglas y resolver dudas del proceso. | S2 documenta un Process Owner; la función práctica es síntesis editorial. | Que toda pyme necesite un CoE, un cargo nuevo o Automation Hub. |
| Los registros permiten examinar lo sucedido, con límites de cobertura. | S4. | Que una captura del estado del CRM describa todo el recorrido ni que sea obligatorio usar process mining. |
| Hay que incluir construcción y operación al comparar opciones. | S6; seguimiento en S5. | Que coste de licencia sea el coste total o que un ROI previsto sea un resultado real. |

## Recomendaciones editoriales propias, no normas oficiales

- Separar una condición pendiente que impide decidir de una variable que simplemente reduce el atractivo del candidato. Por ejemplo, no conocer quién puede autorizar el acceso es información por resolver, no un punto negativo que pueda compensarse con alto volumen.
- Comparar alcances concretos. «Crear un registro de una consulta y asignarlo al equipo correcto» es un candidato evaluable; «automatizar ventas» es demasiado amplio.
- Pedir evidencia suficiente para cada candidato: algunos ejemplos normales, excepciones reales, reglas, frecuencia observada, sistemas y coste de intervención humana. La cantidad de muestras debe depender de variabilidad y riesgo; no afirmar un tamaño universal estadísticamente válido.
- Ordenar por resultado, preparación, esfuerzo total y consecuencias. Una cuadrícula o ficha sirve para conversación, no constituye un modelo predictivo validado.
- Contemplar eliminar un paso o cambiar el formulario antes de conectar más sistemas. Si la mejora del proceso logra el resultado, documentarla como mejora; no atribuirla a un agente de IA.
- No inferir ahorros de caja a partir de minutos liberados: la capacidad puede reasignarse y no reducir nómina. Esta es una distinción analítica, no una cifra de estas seis fuentes.
- Una herramienta con integración no prueba que la operación concreta esté disponible: comprobar acción, permisos, límites, plan comercial y gestión de errores antes de recomendar una arquitectura. Esta comprobación es una recomendación de diseño; no se realizó una prueba de integración para el artículo.

## Riesgos que un especialista podría cuestionar

| Riesgo | Gravedad editorial | Corrección |
|---|---|---|
| «Los procesos con más volumen deben ir primero». | Importante. | Comparar beneficio, esfuerzo, estabilidad y consecuencias; atender también cuellos de botella de bajo volumen. |
| «Datos estructurados significa proceso 100 % automatizable». | Crítico si se afirma como hecho. | No reutilizar la simplificación de algunos algoritmos RPA antiguos. Estructura de datos no resuelve permisos, excepciones ni validez del resultado. |
| «Una puntuación de 80 % predice 80 % de éxito». | Crítico. | Identificar toda escala como heurística de organización, sin predicción estadística. |
| «Automatizar elimina errores». | Importante. | Puede evitar algunas omisiones y repetir errores de reglas o datos a mayor escala. Medir resultados y revisar fallos. |
| «Cuatro horas liberadas equivalen a cuatro horas de salario ahorrado». | Importante. | Distinguir capacidad y ahorro efectivo; explicitar supuestos si se monetiza tiempo. |
| «Hace falta process mining antes de empezar». | Importante. | Presentarlo como opción para registros adecuados, no requisito ni compra inicial. |
| «Un proceso con revisión humana es manual y no cuenta». | Importante. | Evaluar el conjunto y declarar qué pasos realizan personas y sistemas. |
| «La interfaz o el conector existe, por eso la integración está resuelta». | Importante. | Verificar operación específica, autorización, límites y soporte. |

## Fuentes excluidas y navegación

La antigua página de planificación de Power Automate redirige al producto Plans de Power Apps. No se utilizó como si siguiera conteniendo la guía histórica: [destino actual](https://learn.microsoft.com/en-us/power-apps/maker/plan-designer/plan-designer). También hubo errores de acceso en algunas rutas antiguas de planificación. Los resultados de buscador de documentos RPA antiguos no sustituyen sus cuerpos vigentes.

No se usaron testimonios de Reddit, cifras de consultoras, resultados compuestos de estudios patrocinados ni porcentajes de adopción o ROI sin método leído. Esta nota no sostiene un ahorro típico, una fecha de recuperación ni un beneficio probado para Ranking Rebels.

## Estado

Lista para revisión del manuscrito cuando exista. No se ha examinado un proceso real de la empresa ni se ha ejecutado una integración o piloto.
