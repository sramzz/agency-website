# Blog 19 — evidencia sobre fuentes, actualización y recuperación
Investigación técnica: **28 de octubre de 2026, Australia/Sydney**. Fuentes primarias abiertas mediante navegación web. Esta nota no diagnostica un chatbot real, no prueba un producto ni describe resultados de Ranking Rebels. No se accedió a cuentas. Las fechas de rastreo de un buscador no se interpretan como fechas de publicación.

## Dictamen

La respuesta desactualizada puede originarse en varias capas: fuente vigente, copia ingerida, recuperación, contexto de conversación, caché y generación. Conviene seguir una afirmación concreta hacia atrás y localizar la primera divergencia. Esa secuencia diagnóstica es una **recomendación editorial propia**, apoyada en mecanismos documentados; no es una taxonomía exhaustiva certificada por los proveedores.

## Hallazgos verificables y límites

### 1. RAG aporta contexto externo; no equivale a volver a entrenar el modelo

Microsoft describe procesar fuentes, dividirlas y convertirlas a formato consultable; la pregunta y el contexto recuperado se entregan al modelo. Conservar metadatos permite vincular fragmentos y citas. Esto sustenta explicar RAG como búsqueda de material pertinente antes de redactar, sin presentar embeddings como una garantía de verdad. No todos los sistemas necesitan una base vectorial separada o exactamente esta arquitectura.

Fuente: [Microsoft .NET: RAG](https://learn.microsoft.com/en-us/dotnet/ai/conceptual/rag), cuerpo leído, líneas 31–51. La página muestra actualización 14 de septiembre de 2026.

### 2. Un documento actual puede fallar en la recuperación o usarse mal

Google distingue el suministro de hechos relevantes de la calidad de la generación. La recuperación de contenido irrelevante puede producir una respuesta anclada a una fuente y aun así incorrecta o ajena a la pregunta. Su guía menciona evaluación de fragmentos y respuestas. **Interpretación para el blog:** comprobar la fuente sólo no demuestra qué recibió ni qué hizo el modelo; comprobar respuesta y evidencia por separado.

Fuente: [Google Cloud: RAG](https://cloud.google.com/use-cases/retrieval-augmented-generation), cuerpo leído, líneas 20–38. Se usa el mecanismo, no sus formulaciones comerciales como promesa de precisión.

### 3. Conectar una fuente no demuestra que su última versión esté indexada

Azure AI Search permite ejecución inicial, bajo demanda y programada. La detección de cambios depende de la fuente: Azure Storage y ciertas bases de datos no tienen idéntico funcionamiento. Incluso una ejecución marcada exitosa puede contener advertencias. Microsoft recomienda verificar el contenido con consultas al índice. **Aplicación:** pedir identificador/versión de fuente y evidencia de ingestión del documento afectado; un estado general verde es insuficiente para demostrar frescura de cada respuesta.

Fuente: [Create an indexer](https://learn.microsoft.com/en-us/azure/search/search-how-to-create-indexers), cuerpo leído, secciones Run an indexer, Check results y Change detection and internal state, líneas 190–242. URL antigua `search-howto-create-indexers` redirigió a esta ruta.

### 4. La sincronización puede ser manual o programada según el producto

La documentación actual de **Amazon Bedrock Managed Knowledge Base** indica sincronizar tras añadir, modificar o retirar archivos. La sincronización es incremental. Para el conector administrado documenta on-demand por defecto y opciones daily/weekly/monthly. El resultado de trabajo y sus estadísticas se consultan por separado. **Límite:** no afirmar que todos los conectores, todos los productos Bedrock o todos los chatbots son manuales, se actualizan en tiempo real o comparten estas frecuencias.

Fuente: [AWS: Sync a data source](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-managed-sync.html), cuerpo leído, líneas 7–17, 29–39 y 46–120. La búsqueda devolvió también un anuncio del 4 de septiembre de 2026; para los hechos se prioriza este cuerpo técnico abierto.

### 5. Borrar el original no garantiza retirar la copia consultable

Para indexadores de Azure Storage, la detección de borrados requiere una estrategia específica. Microsoft describe condiciones y advierte sobre documentos huérfanos; añadir la política tarde y resetear no elimina necesariamente los ya borrados antes. Esto es un **ejemplo de producto**, no una regla que diga que RAG nunca borra. La recomendación general es verificar que la política retirada deje de ser recuperable por la ruta pública correspondiente.

Fuente: [Azure Storage: change and delete detection](https://learn.microsoft.com/en-us/azure/search/search-how-to-index-azure-blob-changed-deleted), cuerpo leído, líneas 39–71. No trasladar sus requisitos de soft-delete a otros fabricantes.

### 6. Indexación programada y datos operativos vivos son necesidades distintas

El indexador SQL de Azure AI Search no proporciona sincronización en tiempo real; esa página documenta un intervalo máximo de frecuencia de cinco minutos y propone push para una actualización más rápida. **El número es exclusivo de ese producto y no necesita aparecer en el artículo.** Para disponibilidad, existencias, estado de pedido o precio dependiente del cliente, recomendar consultar el sistema operativo autorizado con la frescura requerida en lugar de presentar una ficha estática como una comprobación actual. Ni siquiera un lookup elimina carreras entre consulta y confirmación de una reserva.

Fuentes: [Azure SQL indexer](https://learn.microsoft.com/en-us/azure/search/search-how-to-index-sql-database?tabs=portal-sql%2Cportal-check-indexer), cuerpo leído, líneas 48–50; [Google: Function calling](https://ai.google.dev/gemini-api/docs/function-calling), cuerpo y ejemplos de llamadas leídos, sección introductoria líneas 88–98. La recomendación sobre la carrera consulta/confirmación es razonamiento de diseño, no resultado medido.

### 7. Pedir o proponer una función no demuestra su ejecución exitosa

Google explica que las llamadas permiten solicitar herramientas/APIs y recibir sus resultados. Su documentación de Google Cloud explicita que la aplicación ejecuta la herramienta y devuelve el resultado al modelo. **Aplicación editorial:** separar leer disponibilidad, proponer reserva y confirmar que el sistema aceptó la reserva; no permitir que un mensaje fluido suplante la evidencia operativa.

Fuente adicional abierta: [Google Cloud: Introduction to function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling), introducción. No se usan listas de modelos ni límites numéricos que puedan cambiar.

### 8. Las cachés de respuestas y de recuperación pueden conservar información anterior

La arquitectura oficial de Microsoft distingue caché de respuestas, fragmentos recuperados y salidas intermedias. Recomienda incluir contexto de usuario/tenant, política y versiones pertinentes en claves, elegir TTL por necesidades de frescura y disparar invalidación con cambios de datos, modelo y prompt. **Recomendación:** inspeccionar la capa relevante y probar una solicitud controlada por la ruta autorizada, en vez de borrar indiscriminadamente todas las cachés. No presentar TTL como prueba de actualidad ni como solución única.

Fuente: [Azure Well-Architected: Application design](https://learn.microsoft.com/en-us/azure/well-architected/ai/application-design), cuerpo leído, líneas 134–148; privacidad y acceso forman parte del contexto de la recomendación del proveedor.

### 9. Prompt caching no significa necesariamente reutilizar una respuesta anterior

Anthropic describe su prompt caching como reutilización de prefijos de entrada y reglas de invalidación cuando cambia el contenido. Por eso sería incorrecto explicar que todo uso de prompt caching impide ver documentos nuevos o devuelve una respuesta antigua. Hay que identificar si la aplicación conserva respuestas, resultados de búsqueda, documentos/contexto antiguos o sólo procesamiento del prefijo invariable. Ninguna semántica Anthropic se universaliza a todos los proveedores.

Fuente: [Claude: Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), cuerpo leído, líneas 66–78, 334–350 y 450–459. No trasladar sus TTL o precios al blog general.

### 10. Una cita puede ser trazable sin que el contenido esté vigente o sea correcto

Claude distingue citar documentos proporcionados de una instrucción genérica para inventariar referencias. Su función de citas ofrece punteros válidos a pasajes suministrados. Esa validez es una propiedad del puntero, no una certificación de la autoridad, aplicabilidad o vigencia de la fuente. **Recomendación editorial:** comprobar que el pasaje respalda la afirmación para el servicio, lugar, cliente y fecha adecuados; no prometer que añadir citas elimina alucinaciones.

Fuente: [Claude: Citations](https://platform.claude.com/docs/en/build-with-claude/citations), cuerpo leído, líneas 74–82, 118–149 y 157–160.

### 11. Fragmentar un documento puede retirar sus condiciones

Anthropic ilustra un fragmento que contiene una cifra sin empresa o periodo, y explica búsqueda léxica, semántica y contextualización de chunks. Esto sustenta revisar si una condición de elegibilidad, una fecha efectiva o un área de servicio quedó fuera del fragmento recuperado. No justifica un tamaño de chunk universal ni instalar reranking siempre. Sus porcentajes de evaluación pertenecen a sus experimentos de 2024; no son benchmarks de pequeñas empresas australianas y no se recomiendan para este blog.

Fuente: [Anthropic: Contextual retrieval](https://www.anthropic.com/research/contextual-retrieval), publicado 19 de septiembre de 2024, cuerpo leído, líneas 55–87. La cita pública debe centrarse en el mecanismo, sin reproducir cifras comerciales.

### 12. Fine-tuning y RAG se pueden combinar, pero son cambios distintos

AWS compara RAG y fine-tuning y contempla combinarlos. La comparación considera que volver a ajustar el modelo puede ser poco adecuado para documentos que cambian frecuentemente. **Recomendación:** localizar primero el defecto de fuente/recuperación/uso y justificar después un cambio de modelo o entrenamiento. Evitar el falso absoluto «fine-tuning nunca aprende hechos» y evitar afirmar que RAG garantiza citas, frescura o eliminación de alucinaciones. Algunas frases generales de la tabla AWS son orientaciones simplificadas, no garantías de toda arquitectura.

Fuente: [AWS Prescriptive Guidance: RAG vs fine-tuning](https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-vs-fine-tuning.html), cuerpo leído completo, líneas 7–39. No se usa su expresión «few minutes» como SLA ni se infiere que una interfaz que dice «train» modifique necesariamente los pesos de un modelo.

## Límites y trazabilidad de la búsqueda

- Las páginas Microsoft mostraron texto genérico de acceso/autorización, pero el cuerpo técnico relevante fue devuelto y pudo leerse. No se accedió a contenido privado o se inició sesión.
- Ninguna de las fuentes utilizadas depende exclusivamente de un snippet. Se abrieron sus cuerpos. El primer URL Microsoft redirigió a la ruta técnica actual indicada.
- La búsqueda devolvió páginas secundarias, Reddit y espejos; se excluyeron. El espejo Voozoo y dominios de caché AWS no sustentan afirmaciones.
- La consulta `find` de “fine-tun” en Google RAG y “does not execute” en Google AI no devolvió coincidencia. Eso no demuestra ausencia del concepto; se usaron los pasajes y fuentes explícitos indicados.
- No se verificaron configuración real, producto contratado, frecuencia de sincronización, cachés, documento, chatbot o permisos de Ranking Rebels. No se identificó una causa real ni midieron precisión, latencia, coste, ahorro o impacto en ventas.
- La nota no establece un porcentaje aceptable universal de error ni una frecuencia obligatoria de revisión. Son decisiones según cambio y consecuencia del caso.

## Frontera con los blogs existentes

Se inspeccionaron los pasajes pertinentes de los manuscritos 3 y 9, **no se afirma una nueva lectura completa**. El 3 explica agentes frente a workflows, usos y límites. El 9 diseña un piloto de tratamiento de consultas con validación y prueba. El 19 debe responder una pregunta diferente: seguir la evidencia de una respuesta que quedó vieja, distinguir actualización de recuperación y probar que la corrección funciona. Los enlaces públicos a 3/9 requieren URL confirmada por el ejecutor.

## Ampliación solicitada: permisos y evaluación

**Permisos.** [Document-level access control in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview), cuerpo abierto, líneas 137–145: en los mecanismos nativos documentados como **preview**, la autorización consulta metadatos ya almacenados en el índice. Cambios en origen aparecen después de sincronizar esos metadatos mediante el mecanismo aplicable. La página distingue cambios de permisos únicos en SharePoint de cambios heredados. No generalizar API, madurez o propagación a otro producto. **Recomendación:** retirar el acceso a un usuario no se da por probado con cambiar el documento origen; verificar la ruta de recuperación, las cachés y que las identidades pertinentes ya no reciban el contenido. No usar «sincronizar todo para todos» como solución, porque puede ampliar exposición.

**Evaluación.** [Microsoft Foundry: RAG evaluators](https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/rag-evaluators), cuerpo abierto, líneas 31–62: distingue evaluación del proceso de recuperación y evaluación del resultado. Groundedness comprueba alineación con contexto; completeness, cobertura frente a respuesta esperada. **Inferencia importante:** una respuesta fiel a un PDF obsoleto puede superar una prueba de apoyo en contexto y seguir siendo inadecuada para hoy. Añadir una comprobación editorial separada de vigencia, autoridad y aplicabilidad de la fuente esperada. No convertir el umbral por defecto de un evaluador o su juez LLM en estándar universal de lanzamiento; no se ejecutaron evaluadores ni se observaron puntuaciones.

## Auditoría del manuscrito y ficha — 28 de octubre

**Alcance:** lectura completa de `02-articulo-ai-chatbot-outdated-answers-australia.md` y `07-chatbot-answer-evidence-card.md`, contrastada con la evidencia de esta nota. Revisión asistida por IA; no certificación humana ni prueba de un chatbot. No se modificaron 02/07.

**Resultado técnico: ningún error demostrable crítico o importante identificado en los dos archivos leídos.** No se proponen cambios cosméticos para aparentar hallazgos. Este resultado no verifica implementación, publicación, datos privados, calidad en producción ni todas las afirmaciones legales; las referencias OAIC corresponden a la revisión general del responsable del paquete.

| Punto revisado | Comprobación y resultado |
|---|---|
| RAG y fuente actual | Se distinguen fuente, copia, recuperación, contexto y respuesta. El artículo no reduce todo error al cutoff del modelo ni promete que RAG elimina alucinaciones. |
| Sincronización y borrado | AWS y Azure aparecen como ejemplos por producto, sin universalizar frecuencias o soft-delete. Un run reciente o exitoso no se equipara a un documento correctamente actualizado. |
| Versiones y autoridad | El caso K1-v1/K2-v2 identifica explícitamente K2-v2 como aprobado, con la misma regla weekday/Saturday separate confirmation en 02 y 07. No se infiere autoridad por timestamp reciente ni se ordena eliminar archivos históricos del negocio. |
| Citas | Se comprueba apoyo del pasaje, autoridad y vigencia; se explica que puntero válido no valida una afirmación. Caso H conserva esa separación. |
| Caché y conversaciones | Distingue respuestas/resultados guardados de prompt caching. Considera contexto histórico y compara conversación nueva/antigua sin presentar reinicio como reparación suficiente. |
| Permisos | E incluye la ruta completa, contexto retenido y resultados guardados. No se afirma que actualizar el permiso en origen ya haya revocado toda copia o que una instrucción al modelo sustituya el control. |
| Dato vivo y acción | F no convierte lookup fallido en disponibilidad; lectura, reserva y confirmación se mantienen separadas, incluida la posibilidad de que el estado cambie tras consultarlo. |
| Fine-tuning | Describe operación distinta de subir/sincronizar archivos; no afirma que nunca pueda aprender hechos ni que un modelo mayor identifique la política aprobada sin evidencia. |
| Pruebas A–H | Los ocho ejercicios coinciden entre ambos archivos. Condiciones e interpretación esperada se etiquetan como ficticias, sin resultados observados, benchmark suficiente o holdout privado. |
| Métricas | Declara conjunto y denominador, separa casos de intentos, handoff de resolución, tiempo de ahorro monetario. No hay tasas inventadas ni umbral universal de lanzamiento. |

También se abrió [el overview RAG de Azure AI Search citado en el manuscrito](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview). Su cuerpo, líneas 34–42 y 150–179, respalda el patrón y las dificultades de contexto, acceso y recuperación atribuidas. No se trasladan al texto sus cifras de latencia, límites o recomendaciones comerciales de migración.

**Pendientes reales de uso futuro:** el implementador necesita conocer el producto y la configuración efectivos; el negocio debe aprobar el contenido vigente y los criterios por consecuencia; la evaluación con casos separados debe ejecutarse y registrar observaciones; el sitio final requiere su propia verificación. Estos límites ya están declarados y no son errores de la guía.
