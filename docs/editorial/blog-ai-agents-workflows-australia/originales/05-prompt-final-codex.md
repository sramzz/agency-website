# Prompt de trabajo para Codex — blog 3

Copia desde «Actúa» hasta el final. Adjunta los archivos 01–04 o colócalos en la carpeta accesible de este chat. Este prompt se usa después de comprobar que Codex puede leerlos; el archivo 06 sirve para esa comprobación sin empezar a redactar.

---

Actúa como un equipo editorial con cuatro perspectivas: estratega SEO, especialista en agentes de IA y automatización empresarial, editor de publicaciones profesionales e investigador de fuentes. No necesitas crear otros chats o delegar agentes: aplica esos criterios al trabajo y distingue los límites de tu propia revisión.

Prepara la versión final del tercer blog informativo de Ranking Rebels para propietarios y responsables de operaciones/marketing de empresas australianas, principalmente negocios de servicios. El artículo se publica en **inglés australiano**. Tu informe de revisión y explicaciones deben estar en español.

**Tema:** AI Agents vs Workflow Automation: What Can They Do for Your Business?

**Objetivo:** explicar qué pueden hacer los agentes, cuándo bastan reglas o un workflow con IA, qué beneficios pueden buscarse, qué decisiones se delegan y cómo evaluar resultados y costes. La pieza debe servir a lectores informados y resistir una revisión técnica. No es un catálogo de herramientas ni una promesa de autonomía total.

## Material obligatorio

Lee íntegramente, antes de editar:

1. `01-dossier-investigacion.md`: brief, fuentes, límites, veinte casos del CEO, ejemplo y criterios de aceptación.
2. `02-articulo-ai-agents-workflows-australia.md`: manuscrito base. Conserva lo que funciona; no lo sustituyas por un artículo genérico.
3. `03-auditoria-editorial.md`: problemas detectados, ajustes y límites pendientes.
4. `04-paquete-seo.md`: intención, metadatos, mapa semántico, enlaces y publicación.

Este archivo `05-prompt-final-codex.md` contiene las instrucciones. Las notas `soporte-*.md` amplían la evidencia y se consultan si necesitas comprobar matices. El archivo 06 solo comprueba recepción y no es contenido publicable.

No asumas acceso a archivos de otro chat o del equipo del usuario. Si falta un documento obligatorio o solo puedes leer una parte, identifica exactamente el problema antes de cerrar un artículo que dependa de él. No confundas ver un nombre, un resumen o una URL con haber leído el contenido. La comprobación de recepción por sí sola no autoriza afirmar que verificaste fuentes en Internet.

## Estándar factual

Investiga en Internet para verificar las afirmaciones materiales que mantengas o cambies. Usa documentación primaria y cuerpos de las páginas, no solo resultados de búsqueda. Las fuentes de partida son:

- https://www.anthropic.com/engineering/building-effective-agents
- https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- https://developers.openai.com/api/docs/guides/function-calling
- https://developers.openai.com/api/docs/guides/agents/guardrails-approvals
- https://learn.microsoft.com/en-us/power-automate/get-started-approvals
- https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products
- https://www.acma.gov.au/avoid-sending-spam
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://rankingrebels.com/solutions/ai-automation/

Registra qué páginas abriste, fecha de consulta, qué respaldan y sus límites. Si una fuente falla, dilo y busca una primaria equivalente; no inventes lo que falta. Si no tienes navegación, entrega una revisión basada en el material recibido e identifica la verificación pendiente, sin describirla como investigación actualizada independiente.

Estas distinciones son esenciales:

- En la definición operativa adoptada, el agente puede seleccionar pasos/herramientas; el workflow puede incluir IA en rutas predefinidas. Reconoce híbridos y terminología variable. El chat es una interfaz compatible con ambos.
- Interpretar texto, usar varias llamadas al modelo o ejecutar un “if” no convierte por sí solo el sistema en agente.
- El modelo puede solicitar una acción; herramientas, ejecución y permisos permiten llevarla a cabo. Un mensaje “done” no demuestra el estado final.
- Memoria persistente, RAG, MCP o varios agentes son opciones, no requisitos universales.
- “Fully managed” no equivale a “fully autonomous”. Una aprobación puede formar parte de la automatización.
- Los beneficios son mecanismos y objetivos medibles; no resultados demostrados de Ranking Rebels. Incluye revisión, errores, reintentos, integración y mantenimiento en el análisis de costes.
- Los veinte casos del CEO son oportunidades propuestas, no portfolio validado. Desarrolla cuatro aplicaciones relevantes y conserva el ejemplo hipotético de la empresa de limpieza de Brisbane como tal.
- No extrapoles métricas internas de coding/research o estudios de asistencia a empleados a agentes autónomos en pymes australianas. No inventes ahorros, precios, clientes, credenciales, volúmenes o experiencia propia.
- Los controles deben actuar donde se ejecuta una acción. No presentes un prompt, JSON válido, confianza declarada o revisión humana como garantía de seguridad o exactitud.
- Mantén el contexto australiano proporcionado: alcance de OAIC según la organización, ACMA para usos pertinentes. No redactes una receta legal universal.

## Auditoría antes de cerrar el texto

Revisa el manuscrito real y cualquier cambio, sin aprobarlo por estar bien escrito. Para cada hallazgo indica extracto o sección, gravedad, evidencia, impacto y solución. Separa errores demostrables, riesgos sin resolver y preferencias editoriales. No inventes defectos para completar una tabla.

Evalúa intención, cobertura, claridad, naturalidad, fuentes y experiencia demostrada. Mantén un único H1, encabezados útiles y enlaces pertinentes. No persigas densidad de keywords, longitud por ranking o una puntuación de E-E-A-T. No añadas preguntas frecuentes redundantes. Los competidores australianos son una muestra exploratoria; no hay datos de posiciones o volumen que permitan prometer una oportunidad cuantificada.

Conserva la frontera con los próximos artículos: selección de procesos (6), software a medida (7), implementación de un piloto (8) y CRM (12). No conviertas esta pieza en veinte tutoriales o una guía completa de instalación. No copies los marcos propios de competidores.

Usa inglés australiano natural: enquiries, organisation, authorised, prioritise. Evita hype, frases vacías y metáforas de “empleados digitales” sin límites. Explica términos al introducirlos. Mantén condiciones junto a beneficios y fuentes junto a afirmaciones materiales.

## Entrega

1. Diagnóstico ejecutivo en español: fortalezas, problemas y riesgos reales.
2. Tabla priorizada de hallazgos y correcciones, incluyendo cambios aplicados y asuntos pendientes. Si un punto no requiere cambios, no lo presentes como error.
3. Artículo completo y revisado en inglés australiano, listo para revisión humana, con fuentes enlazadas y el ejemplo claramente hipotético. La extensión orientativa es 2.200–3.000 palabras por alcance, ajustable sin relleno; no es un requisito SEO.
4. Title, H1, slug propuesto, meta description, extracto, enlaces internos confirmados y recomendaciones de imagen/alt solo si aportan valor. Verifica conteos de caracteres si los reportas. No inventes una URL final o enlaces de artículos futuros.
5. Registro breve de fuentes efectivamente comprobadas y afirmaciones no confirmadas. Separa la fecha de consulta de la fecha de publicación de una fuente.
6. Lista corta de datos necesarios antes de publicar: responsable/autoría real, revisión humana efectiva, ruta final y activos si se usan. No inventes esos datos ni los conviertas en requisitos para seguir redactando.

Guarda los entregables como documentos identificables si puedes trabajar con archivos. Separa el artículo de notas, prompts y auditoría para evitar publicar instrucciones internas. Comprueba coherencia entre manuscrito, tabla de cambios y metadatos.

El encargo autoriza preparar y revisar contenido. No publiques, modifiques el sitio, cambies código o conectes cuentas. No generes markup publicable con campos inventados. Al finalizar, resume qué revisaste, qué cambiaste y qué sigue pendiente, sin prometer posiciones, ventas o cumplimiento por el hecho de seguir una guía.
