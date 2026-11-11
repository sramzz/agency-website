# Blog 9 — evaluación de un piloto con IA

Consulta: **20 de octubre de 2026, Australia/Sydney**. Nota de investigación, no certificación de un sistema real. Se abrieron y leyeron los cuerpos de las seis fuentes siguientes. No se probaron herramientas ni se calcularon resultados de Ranking Rebels. El análisis editorial y las fórmulas propuestas se distinguen de las afirmaciones de los autores.

## Fuentes primarias y alcance comprobado

### 1. Anthropic: evaluar el resultado, no sólo una respuesta

[Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), publicado **9 de enero de 2026**. Cuerpo leído, especialmente secciones de estructura, graders, variabilidad, conjunto inicial y mantenimiento.

**Hechos de la fuente:** distingue tarea, intento, grader, registro y resultado final en el entorno. Una afirmación textual de que se realizó una reserva no equivale a la reserva existente. Los evaluadores deterministas, de modelo y humanos tienen capacidades y limitaciones diferentes; la evaluación con otro LLM requiere calibración humana. Recomienda tareas inequívocas, conjuntos equilibrados entre cuándo actuar y cuándo no, pruebas aisladas y revisar registros para detectar fallos del sistema y del propio evaluador. Combina evaluaciones previas, monitorización y revisión humana; ninguna capa detecta todo.

**Límite:** es experiencia de un proveedor. Su sugerencia inicial de 20–50 tareas no demuestra suficiencia estadística ni autoriza producción. No trasladar cifras de sus benchmarks al negocio del lector. En el blog, preferir «casos representativos y casos difíciles con resultado esperado» a imponer un número universal.

### 2. Microsoft: probar el flujo completo y las dependencias

[Test and evaluate AI workloads on Azure](https://learn.microsoft.com/en-us/azure/well-architected/ai/test), actualización visible **5 de septiembre de 2025**. Cuerpo leído completo; pese al aviso genérico de autorización, el contenido sustantivo fue accesible.

**Hechos:** separa experimentación del modelo de prueba del sistema completo. Propone métricas vinculadas al objetivo y varios indicadores, datos representativos, pruebas desde entrada a resultado, llamadas a herramientas, fallos simulados de dependencias, revisión humana para tareas sensibles o subjetivas, regresión y rendimiento bajo condiciones realistas. La sección de entrenamiento separa datos de entrenamiento, evaluación y prueba. También diferencia prueba de cambios y monitorización continua.

**Límite:** no es una obligación técnica idéntica para cualquier pyme ni una recomendación de comprar Azure. Evitar repetir su generalización de que todos los modelos se degradan con el tiempo; es suficiente explicar que cambian entradas, reglas y dependencias y que deben vigilarse los resultados.

### 3. NIST: objetivos, comparación y decisiones documentadas

[AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/), marco AI RMF 1.0 de **enero de 2023**; cuerpo consultado sin fecha de actualización propia visible. Secciones MAP 1–3, MEASURE 1–2 y MANAGE 1–4 leídas.

**Hechos:** MAP 3 incluye beneficios, costes de errores —también no monetarios— y comparación con referencias pertinentes. MEASURE pide documentar conjuntos y métodos, reconocer incertidumbre, evaluar condiciones similares al uso y mantener seguimiento. MANAGE 1.1 vincula continuar o no con objetivos y fines definidos; MANAGE 2.1 contempla alternativas sin IA. Deben definirse responsables, supervisión y respuesta ante resultados incompatibles con el uso previsto.

**Límite:** marco voluntario estadounidense; no presentarlo como ley australiana ni como sello automático de seguridad. Nuestra recomendación de fijar criterios de avance antes de observar resultados es una aplicación editorial coherente, no un umbral numérico de NIST.

### 4. Google: reservar ejemplos que no se usaron para ajustar

[Datasets: Dividing the original dataset](https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets), actualizado **3 de diciembre de 2025**. Cuerpo leído, incluyendo validación, duplicados y límites del conjunto de prueba.

**Hechos:** reutilizar pruebas para tomar decisiones de ajuste reduce su independencia; distingue validación durante desarrollo y prueba final. Duplicados y datos que no representan el uso real pueden falsear una buena evaluación. No fija porcentajes obligatorios ni una cantidad suficiente universal.

**Síntesis aplicada:** para un workflow sin entrenamiento propio, mantener ejemplos de desarrollo separados de un conjunto reservado para comprobar la configuración elegida. Ajustar prompts, reglas o herramientas usando esos ejemplos también consume su independencia. No llamarlo entrenamiento de pesos si sólo se cambió el prompt.

### 5. Microsoft: medir valor no equivale a multiplicar minutos por salario

[Choose the best methods and tools to measure business value](https://learn.microsoft.com/en-us/power-platform/guidance/adoption/business-value-methods), actualizado **14 de mayo de 2025**. Cuerpo leído completo.

**Hechos:** combina indicadores cuantitativos, entrevistas y comentarios; vincula medición a objetivos. Su ejemplo muestra que digitalizar puede aportar valor aunque el ahorro de tiempo directo sea pequeño. Los beneficios y los costes deben evaluarse, no darse por realizados.

**Límite:** sus escenarios y tarifas son ilustrativos. No usar como cifras para Australia o Ranking Rebels. «La automatización garantiza datos exactos», presente como descripción promocional, tampoco es una conclusión defendible.

### 6. NIST: una tasa observada tiene incertidumbre

[Exact binomial confidence limits](https://itl.nist.gov/div898/software/dataplot/refman2/auxillar/exacbici.htm), fecha visible de actualización **5 de octubre de 2010**. Cuerpo leído; documento estadístico estable.

**Hechos:** define proporción como éxitos divididos por ensayos y advierte que aproximaciones normales pueden ser inadecuadas con muestras o fallos escasos; presenta límites binomiales exactos.

**Síntesis:** cero fallos observados en una muestra no prueba riesgo cero. Un pequeño kit sintético descubre fallos concretos y comprueba contratos; no estima por sí mismo la frecuencia de incidentes reales. La inferencia exige diseño muestral y supuestos apropiados, no sólo contar casos.

## Recomendación editorial para el piloto

Comparar el método actual, una alternativa sencilla sin IA cuando sea viable y la propuesta con IA sobre un alcance equivalente. Separar **tiempo activo humano**, espera y tiempo hasta resultado válido. Incluir revisión, correcciones, excepciones y soporte; no registrar sólo ejecuciones exitosas ni llamar ahorro de caja a capacidad liberada.

Propuesta de indicadores, definidos por el equipo antes de empezar:

| Indicador | Definición propuesta y cuidado |
|---|---|
| Resultado válido | Casos que cumplen todos los requisitos / todos los casos elegibles del alcance. Contar fallos y exclusiones; no dividir sólo por los que acabaron |
| Calidad de borrador | Borradores aceptados sin corrección sustantiva / borradores revisados. No es tasa de éxito del flujo completo |
| Escalado | Casos que debían escalar y lo hicieron / casos que debían escalar. Revisar por separado escalados innecesarios |
| Trabajo humano | Minutos totales de tramitación, revisión, corrección, excepciones y soporte por periodo o cohorte equivalente |
| Coste por resultado válido | Costes incluidos y periodo declarados / resultados válidos. Identificar aparte inversión inicial y costes recurrentes |

La revisión humana no es un control automático: debe tener responsable, contexto para decidir y capacidad real de detener o corregir. Antes de avanzar, comprobar también volumen pendiente, capacidad de la cola de revisión, incidentes, recuperación y acciones prohibidas. Si falla un control de consecuencias importantes, una media favorable de velocidad o coste no lo compensa.

Mantener versión de modelo/configuración, prompts, reglas, documentos fuente, conectores y conjunto de pruebas. Tras cambios relevantes, repetir casos de regresión y nuevos ejemplos reservados cuando los anteriores ya guiaron ajustes. El kit sintético de este paquete debe etiquetarse como material didáctico sin ejecución; cualquier número del artículo será hipotético o aritmética explícita, nunca resultado comercial medido.
