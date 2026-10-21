# Auditoría editorial, técnica y SEO — blog 5

20 de octubre de 2026, Australia/Sydney. Manuscrito revisado completo: `02-articulo-visits-few-enquiries-australia.md`. Revisión asistida por IA con lecturas separadas de medición, UX y estrategia; no firma humana independiente, auditoría de cuentas o prueba del sitio.

## 1. Diagnóstico ejecutivo

La pieza responde con una secuencia de comprobación, sin atribuir las consultas escasas automáticamente al diseño. Distingue tráfico informativo, eventos, recepción y seguimiento; ofrece una ruta para reparar averías antes de plantear cambios cosméticos. Los beneficios son mecanismos a evaluar y el caso de Perth es hipotético.

La revisión detectó un enlace de evidencia no verificable y dos ambigüedades menores de trazabilidad/terminología, ya corregidos. No se detectaron fallos críticos dentro del alcance asignado. No hay promesas de conversión, benchmarks universales, cifras de clientes o resultados ficticios.

Las limitaciones principales son ausencia de datos del negocio, publicación y URLs de los artículos relacionados. No se ocultan con enlaces inventados o un diagnóstico aparente. El texto está preparado para revisión humana y adaptación final, sin implementación.

## 2. Hallazgos priorizados

| Gravedad | Problema identificado | Evidencia / impacto | Solución aplicada |
|---|---|---|---|
| Importante · fuente no verificable | El primer enlace para la definición de tasa por sesión,12935877, no pudo verificarse en las aperturas realizadas | La fórmula sí está en la [tabla oficial de métricas](https://support.google.com/analytics/table/13948007?hl=en), fila Session key event rate. Una referencia no comprobada debilita una distinción central | Sustituido por13948007. No se afirma que la URL original fuera404 o tuviera contenido erróneo |
| Menor · nombre de etapa | «Submission recorded» se definía como interacción o finalización | Una interacción puede ser anterior al envío. El encabezado sugería más evidencia que su definición, aunque la columna de límites lo aclaraba | Renombrado «Form event recorded»; se mantiene separación de recepción |
| Menor · cercanía de respaldo | La afirmación sobre placeholder estaba enlazada a labels | El respaldo explícito está en [W3C instructions](https://www.w3.org/WAI/tutorials/forms/instructions/); labels explica asociación | Añadido enlace específico y separadas las atribuciones |

También se añadió la fuente de Microsoft junto al párrafo de experimentación y se explicitó no incluir datos personales en parámetros de Analytics. Son refuerzos de método y aplicación, sin inventar un fallo comercial previo. No se reescribió el artículo por gusto del revisor.

## 3. Exactitud y alcance de evidencia

| Tema | Fuente primaria | Evaluación |
|---|---|---|
| Eventos de formularios | [Enhanced measurement](https://support.google.com/analytics/answer/9216061?hl=en) | Registros de interacción no presentados como recepción/cualificación |
| Depuración | [DebugView](https://support.google.com/analytics/answer/7201382?hl=en) | Herramienta pertinente; no sustituto de revisar sistemas receptores |
| Denominador | [Métricas](https://support.google.com/analytics/table/13948007?hl=en) | Sesiones con resultado/sesiones, diferente de cantidad de eventos/sesiones |
| Visibilidad frente a conducta | [SC y Analytics](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console) | No exige igualdad de clics/sesiones ni adjudica consultas individuales a queries agregadas |
| Formularios comprensibles | [Labels](https://www.w3.org/WAI/tutorials/forms/labels/), [instructions](https://www.w3.org/WAI/tutorials/forms/instructions/), [notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | No convierte feedback visual en garantía de entrega; prueba rápida no certifica accesibilidad |
| Preguntas y errores | [GOV.UK questions](https://design-system.service.gov.uk/patterns/question-pages/), [error message](https://design-system.service.gov.uk/components/error-message/) | Recomendación adaptable, sin trasladar estilo o reglas británicas a toda web australiana |
| Rendimiento | [Web Vitals](https://web.dev/articles/vitals) | Describe dimensiones y campo/laboratorio sin prometer uplift |
| Reseñas | [ACCC](https://www.accc.gov.au/consumers/advertising-and-promotions/online-reviews-for-product-and-services) | Principio de autenticidad, sin asesoría legal o casos/sanciones fuera de alcance |
| Experimentos | [Microsoft Research](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/) | Hipótesis/diseño/métrica; sin umbral universal o antes/después como prueba causal |

Las recomendaciones de recorrido y ejemplo son síntesis propia, no resultados experimentales de estas fuentes. No se hizo una auditoría real de recepción, cuentas, accesibilidad o performance de Ranking Rebels.

## 4. Evaluación SEO en ocho dimensiones

Consulta editorial: **website traffic but no leads**. Función informativa/diagnóstica. No se dispone de volumen o ranking australiano.

| Dimensión | Estado | Conclusión |
|---|---|---|
| Title | Pass en propuesta |47 caracteres; natural para público australiano. Falta verificar en página |
| Meta description | Pass en propuesta |145 caracteres; describe comprobaciones, sin garantía de presentación |
| Encabezados | Pass en manuscrito | Un H1, ocho H2, tres H3 |
| Cuerpo | Pass en manuscrito | Respuesta directa, ejemplos y medidas apropiadas, sin FAQ redundante |
| Enlaces internos | Needs work al integrar | Contact confirmado; relaciones entre blogs pendientes de URL y pertinencia |
| Imágenes/medios | Needs work si se incorpora figura | Concepto opcional, sin activo para revisar |
| Slug | Pass como propuesta | Corto y descriptivo; comprobar inventario/ruta |
| Schema | Needs work al implementar | Datos reales y concordancia pendientes, sin campos inventados |

Los estados de implementación no son defectos demostrados del borrador. No se inspeccionó HTML o renderizado de una nueva página. Se sigue el criterio de [contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), sin cuota de palabras o puntuación ficticia de E-E-A-T.

## 5. Originalidad, lectura y relaciones

[MarketInc](https://marketinc.com.au/landing-page-not-converting/), [Nifty Marketing](https://niftymarketing.com.au/why-your-website-feels-busy-but-doesnt-generate-leads/) y [DreamoonTech](https://www.dreamoontech.com/blog/website-traffic-but-no-leads/) ya cubren claridad, intención, móvil y contacto. La muestra no prueba una brecha exclusiva ni superioridad. No se copiaron sus marcos, casos o porcentajes.

La continuidad del paisajista hipotético con blog4 es útil y no requiere lectura previa. El04 documenta candidatos hacia SEO, medición y CRM, cada uno con pregunta concreta. No hay obligación de activar todos ni de introducir IA por asociación de temas.

No se confirmaron URLs públicas1–4 en la búsqueda/navegación realizada; no se concluye que no existan. Los candidatos se mantienen fuera del cuerpo limpio. Una actualización recíproca futura4→5 es una propuesta, no trabajo ya implementado.

## 6. Pendientes y límites explícitos

- Autoría responsable, revisión humana y ruta/activos definitivos antes de publicar.
- Inventario del equipo para comprobar solapamientos; tres competidores no representan todo el mercado.
- URLs reales y lectura de destinos antes de activar relaciones.
- Implementación y pruebas de página, metadatos, canonical, markup y móvil cuando exista.
- Causas, tasas, costes y resultados de un negocio concreto: no confirmados ni añadidos.
- Último tema realmente procesado/publicado en el chat de destino: desconocido aquí. Las instrucciones de continuación requieren evidencia de ese estado.

No se recomiendan cambios adicionales de estilo, más estadísticas o una extensión superior sin un problema concreto. La versión optimizada con los ajustes justificados está en02; esta auditoría permanece separada del cuerpo publicable.
