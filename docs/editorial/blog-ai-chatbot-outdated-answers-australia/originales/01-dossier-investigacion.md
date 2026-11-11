# Blog 19 — dossier de investigación

**Preparado: 28 de octubre de 2026, Australia/Sydney.** Título: **Why Does Your AI Chatbot Give Outdated Answers?** Mercado: empresas de servicios australianas; artículo y recurso en inglés australiano. El usuario seleccionó chatbots después del 18 y pidió diez ideas adicionales de AI automation. Este paquete completa sólo el 19; las propuestas nuevas no quedan autorizadas como diez paquetes.

## Diagnóstico editorial

La pregunta útil es por qué una respuesta dejó de reflejar una regla vigente del negocio y cómo demostrar que la corrección llega al cliente. Se investiga una cadena de evidencia: autoridad de la fuente, disponibilidad/ingestión, recuperación, contexto, respuesta y efecto si existe. Es una síntesis propia, no una taxonomía oficial ni un diagnóstico de una instalación real.

**Intención propuesta:** informativa y diagnóstica. Lector: dueño, responsable de operaciones o atención que tiene un chatbot o evalúa mantener uno. Puede acompañarle un especialista técnico. No se convierte en tutorial de código, comparador de proveedores, explicación completa de agentes o guía general de implantación.

**Beneficios por mecanismo:** fuentes coherentes pueden reducir explicaciones contradictorias; trazabilidad acota correcciones; handoff explícito conserva dudas y responsabilidad; distinguir información documental de lookup operativo evita compromisos inventados. Son beneficios potenciales a evaluar con esfuerzo de mantenimiento, no resultados observados, ahorro garantizado o cifras de conversión.

## Método y alcance real

- Navegación en fuentes primarias Microsoft, AWS, Anthropic, ASD/ACSC, OAIC y Google Search Central. La nota técnica `soporte-fuentes-y-recuperacion.md` conserva pasajes, límites y otras fuentes abiertas por un agente de investigación.
- Se leyeron completos aquí los manuscritos 3, 9 y 16 para delimitar arquitectura general, piloto e incidentes de integración. El agente técnico inspeccionó pasajes de 3/9; su alcance se distingue en su nota.
- Se abrió el destino comercial real `https://rankingrebels.com/solutions/ai-automation/`; cuerpo disponible. No se enviaron formularios o mensajes. La página describe aplicaciones propuestas, no prueba resultados propios.
- Las búsquedas de síntomas sirvieron como inspección cualitativa de contenido visible, no un censo de Google Australia. No hay Search Console, Ahrefs, Keyword Planner, volúmenes, dificultad, posiciones, tráfico o leads medidos.
- No se conectó ni probó un chatbot; no se sincronizó, borró, reindexó o modificó contenido de sistemas reales. Los ejercicios A–H y K1/K2 son ficticios y no ejecutados.

## Registro principal de fuentes abiertas

Las referencias se usan por su mecanismo o alcance documentado, no como respaldo de promesas comerciales. Fecha de lectura: 28 de octubre de 2026. Las páginas Microsoft devolvieron cuerpo técnico pese a un aviso genérico de autorización; no se inició sesión.

| ID | Fuente y URL | Qué permite sostener / límite |
|---|---|---|
| F1 | [Microsoft: RAG overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview) | Contexto externo y desafíos de recuperación/acceso/contexto; reconoce rutas indexadas y consultas directas. No toda RAG necesita la misma infraestructura |
| F2 | [Microsoft: Create an indexer](https://learn.microsoft.com/en-us/azure/search/search-how-to-create-indexers) | Ingestión, estados, warnings y comprobación del índice; un job no prueba cada afirmación final |
| F3 | [AWS: Sync a data source](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-managed-sync.html) | Altas/cambios/bajas requieren sync en la KB administrada descrita; opciones manuales/programadas. No hay frecuencia universal |
| F4 | [Microsoft: Azure Storage change/delete detection](https://learn.microsoft.com/en-us/azure/search/search-how-to-index-azure-blob-changed-deleted) | Condiciones específicas de retirada y documentos huérfanos. No aplicar soft-delete Azure a cualquier proveedor |
| F5 | [Microsoft: AI application design](https://learn.microsoft.com/en-us/azure/well-architected/ai/application-design) | Cachés de respuesta/recuperación, versiones, permisos e invalidación. No borrar todas las cachés por defecto |
| F6 | [Anthropic: Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | Reutilización de prefijos de entrada; no sinónimo de caché de respuestas. No usar sus TTL, precios o modelos en el artículo general |
| F7 | [Anthropic: Citations](https://platform.claude.com/docs/en/build-with-claude/citations) | Punteros válidos a documentos proporcionados; no certifica vigencia, autoridad o significado de cada claim |
| F8 | [AWS: RAG vs fine-tuning](https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-vs-fine-tuning.html) | Técnicas distintas y combinables. No trasladar su tabla simplificada a garantías de citas, latencia o ausencia de alucinaciones |
| F9 | [Microsoft: RAG evaluators](https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/rag-evaluators) | Recuperación y apoyo en contexto se evalúan por separado. Inferencia: repetir bien un PDF viejo no establece corrección actual |
| F10 | [Microsoft: document-level access](https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview) | Metadatos de permisos necesitan propagación en las rutas descritas; funciones preview limitadas. No vender revocación instantánea |
| F11 | [ASD/ACSC: AI considerations](https://www.cyber.gov.au/publication/ai-considerations-within-the-essentials) | Inyección indirecta mediante documentos/correos/web y control de acceso. No afirmar protección absoluta por prompt |
| F12 | [OAIC: commercial AI guidance](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products) | Idoneidad, transparencia, datos personales y supervisión para entidades cubiertas; recomendaciones y obligaciones no se confunden |
| F13 | [OAIC: small business](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business) | Cobertura y excepciones; no asumir mismas obligaciones para todas las pymes |
| F14 | [Google: helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Utilidad, originalidad, fuentes y autoevaluación. No fórmula E-E-A-T, longitud o frecuencia que garantice ranking |
| F15 | [Ranking Rebels: AI automation](https://rankingrebels.com/solutions/ai-automation/) | CTA real; no inventar oferta gratuita, experiencia o SLA |

Otras fuentes técnicas primarias, con lectura documentada en soporte: [Microsoft .NET RAG](https://learn.microsoft.com/en-us/dotnet/ai/conceptual/rag), [Google Cloud RAG](https://cloud.google.com/use-cases/retrieval-augmented-generation), [Anthropic contextual retrieval](https://www.anthropic.com/research/contextual-retrieval), [Google function calling](https://ai.google.dev/gemini-api/docs/function-calling), [Google Cloud tool execution](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) y [Azure SQL indexing](https://learn.microsoft.com/en-us/azure/search/search-how-to-index-sql-database?tabs=portal-sql%2Cportal-check-indexer). Sus límites/ejemplos numéricos no se universalizan.

## Matriz de afirmaciones y decisión

| Afirmación relevante | Clasificación | Evidencia / decisión |
|---|---|---|
| Cambiar la página prueba que el bot ya usa la nueva regla | Inferencia inválida | F1–F4; comprobar la ruta real y el documento afectado |
| Toda RAG responde sólo de una copia vectorial | Generalización incorrecta | F1 incluye acceso directo; explicar variantes sin exigir base vectorial |
| Una respuesta incorrecta siempre demuestra mala sincronización | Sin respaldo | F1/F9; separar mala fuente, búsqueda y generación |
| La fuente más recientemente subida siempre es autoridad | Regla editorial incorrecta | Autoridad depende de aprobación, alcance y vigencia; decisión del negocio |
| Una cita válida prueba exactitud y actualidad | Inferencia inválida | F7 vincula al material suministrado; inspeccionar significado y autoridad |
| Más contexto o un modelo mayor solucionan cualquier caso | Sin respaldo | Recomendación: cambiar sólo la capa que explique la evidencia |
| Fine-tuning es el refresco del catálogo/calendario | Confusión de procesos | F8; no negar que pueda aprender hechos o combinarse con retrieval |
| Revocar acceso en origen demuestra retirada completa | Inferencia inválida | F5/F10; verificar búsqueda, copias, caché y contexto según arquitectura |
| Consulta exitosa de disponibilidad equivale a reserva | Inferencia inválida | Herramienta/ejecución y confirmación son evidencias distintas; recomendación de diseño |
| Groundedness basta como métrica de actualidad | Inferencia inválida | F9; vigencia y aplicabilidad de la fuente requieren comprobación adicional |
| La ficha demuestra fiabilidad de RR | Falso | Es material didáctico; observaciones vacías |

## Contribución original y ejemplo final

`07-chatbot-answer-evidence-card.md` contiene la cadena de evidencia, una ficha de mantenimiento y ocho ejercicios A–H. Distingue qué se espera de lo observado. No hay resultados precargados o porcentajes inventados.

**Premisas finales compartidas 02/07:** K1-v1 es un PDF supersedido que incluye sábados; K2-v2 es la autoridad aprobada actual, visitas estándar entre semana y sábados sujetos a confirmación separada. La web cambió, K1-v1 sigue elegible y fue recuperado. Eso establece un fallo de elegibilidad/selección en el caso ficticio; no demuestra que falte todo K2 o que toda respuesta antigua tenga la misma causa. La reparación debe verificar accesibilidad, fragmentos y respuesta de K2, sin inventar precio, hueco o reserva.

**Ejercicios:** A versión vieja, B conflicto no resuelto, C actual ausente de retrieval, D contexto previo, E permiso revocado, F lookup fallido, G instrucción maliciosa en fuente, H cita sin apoyo. Una escalada correcta no es resolución autónoma; intentos repetidos no son preguntas únicas adicionales. No se fija frecuencia diaria, tamaño de chunk, número de pruebas o umbral de accuracy universal.

## Contraste de resultados visibles

Se abrió completo el artículo propio de [Owlish sobre respuestas desactualizadas](https://owlish.bot/blog/ai-chatbot-outdated-answers/), fechado en su cuerpo 12 de julio de 2026. Ya explica versiones, fuentes huérfanas, sync y citas: esos conceptos no se presentan como descubrimiento exclusivo nuestro. Algunas frases universalizan indexación, sincronización manual de archivos y causalidad; no se adoptan. Los hechos técnicos de este paquete se apoyan en documentación primaria, no en ese competidor.

El título de Vardot apareció en búsqueda, pero [su cuerpo](https://www.vardot.com/insights/blog/ai-chatbot-outdated-answers-cms-problem-not-ai) no abrió (Cache miss). No se le atribuye contenido leído. Comparación limitada, sin posiciones o cobertura exhaustiva del mercado. La diferenciación propuesta es la cadena verificable, la separación de tipos de error y el recurso original, no superioridad demostrada.

## Accesos fallidos y asuntos no confirmados

- `https://rankingrebels.com/ai-automation/` no accesible; se confirmó la ruta real F15.
- Ruta OAIC `/privacy/your-privacy-rights/more-privacy-rights/small-business` falló; se usa F13.
- Ruta Microsoft `/azure/architecture/ai-ml/guide/rag/rag-evaluation` falló; se usa F9 abierto.
- Vardot: fallo arriba. Snippets, Reddit y espejos no sostienen afirmaciones técnicas.
- Sin datos reales de chatbot, corpus, permisos, precisión, ahorro, ingresos o costes. Sin revisión humana firmada, implementación, HTML, schema validado, descarga pública o publicación confirmada.
- URL final del blog y destinos 3/9/16 pendientes de verificar al integrar. No usar enlaces locales ni slugs adivinados en texto público.

## Estructura y mantenimiento editorial

El artículo responde primero; después explica fuentes, seis puntos de fallo, ejemplo, retraining, pruebas y mantenimiento. No hace falta una FAQ que duplique esas respuestas. Mantener voz explicativa, beneficios condicionales y fuentes cerca de afirmaciones materiales. Revisar detalles de proveedor al integrar o cuando una modificación afecte una afirmación; no se creó monitor o investigación programada.
