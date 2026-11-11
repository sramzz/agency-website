# Registro de fuentes y afirmaciones no confirmadas

11 de noviembre de 2026. Se localizaron las URLs recibidas y se abrieron los cuerpos de 15 fuentes primarias y del CTA. Se leyeron los pasajes pertinentes, no cada página completa. Ver enlaces no equivale a lectura; las atribuciones se limitan a lo consultado. En Microsoft apareció aviso genérico de autorización, pero el cuerpo técnico estaba disponible, sin iniciar sesión.

| Fuente abierta | URL | Afirmación / límite |
|---|---|---|
| Microsoft RAG | [Microsoft RAG](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview) | Patrón y desafíos; contexto limitado, acceso y rutas indexadas/directas. No infraestructura universal. |
| Microsoft indexers | [Microsoft indexers](https://learn.microsoft.com/en-us/azure/search/search-how-to-create-indexers) | Run/Check results: éxito puede contener warnings; consultar el contenido del índice. |
| AWS sync | [AWS sync](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-managed-sync.html) | Altas/cambios/bajas e ingestión incremental; opciones manuales/programadas sólo del conector descrito. |
| Azure Storage borrados | [Azure Storage borrados](https://learn.microsoft.com/en-us/azure/search/search-how-to-index-azure-blob-changed-deleted) | Detección de borrado no automática; estrategia del producto para documentos huérfanos. |
| Microsoft application design | [Microsoft application design](https://learn.microsoft.com/en-us/azure/well-architected/ai/application-design) | Respuesta/fragmentos/salidas intermedias, frescura, claves e invalidación; no borrar toda caché. |
| Anthropic prompt caching | [Anthropic prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | Reutilización de prefijos de entrada; distinto de respuestas previas. Sin TTL/precios/modelos trasladados. |
| Anthropic citations | [Anthropic citations](https://platform.claude.com/docs/en/build-with-claude/citations) | Punteros a documentos/pasajes suministrados, no certificación de vigencia o autoridad. |
| AWS RAG/fine-tuning | [AWS RAG/fine-tuning](https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-vs-fine-tuning.html) | Técnicas distintas y combinables; no trasladar garantías simplificadas de tabla, SLA o ausencia de errores. |
| Microsoft RAG evaluators | [Microsoft RAG evaluators](https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/rag-evaluators) | Calidad de recuperación y apoyo en contexto separados; vigencia necesita revisión adicional, inferencia editorial. |
| Azure acceso por documento | [Azure acceso por documento](https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview) | Metadatos de permisos sincronizados en mecanismos descritos, algunos preview. No permiso universal/instantáneo. |
| ASD/ACSC AI | [ASD/ACSC AI](https://www.cyber.gov.au/publication/ai-considerations-within-the-essentials) | Inyección indirecta por documentos/correos/web; sin protección absoluta por prompt. |
| OAIC commercial AI | [OAIC commercial AI](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products) | Idoneidad, transparencia, datos personales y supervisión; aplicar a organización/uso cubiertos, no consejo personalizado. |
| OAIC small business | [OAIC small business](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business) | Cobertura varía y tiene excepciones. No añadir reglas universales para toda pyme. |
| Google Cloud function calling | [Google Cloud function calling](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tools/function-calling) | La aplicación recibe la llamada/argumentos, ejecuta y devuelve resultado. Lookup y reserva separados es recomendación de diseño. |
| Google helpful content | [Google helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Utilidad, aporte y fuentes como autoevaluación editorial, sin garantía SEO. |
| Ranking Rebels CTA | [Ranking Rebels CTA](https://rankingrebels.com/solutions/ai-automation/) | Cuerpo comercial abierto; aplicaciones propuestas, no prueba de resultados o auditoría gratuita. |

Acceso fallido actual: https://ai.google.dev/gemini-api/docs/function-calling devolvió tipo text/markdown no soportado por el lector web. No se cuenta como leído; se usa el cuerpo oficial Google Cloud anterior para el mecanismo. No es URL citada por el manuscrito y no necesita sustituir un destino. No se reabrió todo el soporte secundario/competitivo recibido; sus fechas y límites se conservan en originales/.

La cadena diagnóstica, selección de intervención y criterios según consecuencia son recomendaciones editoriales. Son inferencias explícitas: repetir fielmente un PDF viejo puede seguir siendo incorrecto hoy; un timestamp o cita no establece autoridad; una consulta no demuestra reserva. No se ejecutaron llamadas, indexadores, sincronizaciones, evaluadores, borrados, pruebas de acceso o cambios de chatbot.

Caso completamente ficticio: K1-v1 incluye sábados; K2-v2 es la autoridad actual para el caso, estándar entre semana/sábado por confirmación separada. K1 sigue elegible y fue recuperado. No implica que K2 falte en todo el sistema ni prescribe borrar archivos históricos. A–H son ejercicios de desarrollo, no holdout, benchmark, estudio con lectores, observaciones o resultados propios; campos reales vacíos.

No confirmados: configuración/corpus/causa real, disponibilidad/precio/reserva de negocio, fiabilidad, precisión, ahorro, coste o impacto comercial; keywords/volumen/competencia/ranking; autor/revisor humano, cliente y permiso de uso reales; versión visual/fondo aprobados; fecha/ruta/canonical/schema públicos y descarga pública. Nada se inventa para completar el paquete.

Contradicción temporal recibida: cierre en 19 frente a plan general posterior22 y destinos 3/9 ya públicos. Se usa el inventario real, con 16 aún borrador, y se prepara sólo 19. Publicación y programaciones fuera del alcance actual.
