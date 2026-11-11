# Investigación — blog 11: evaluar resultados de marketing digital

**Preparado: 21 de octubre de 2026, Australia/Sydney.** Título acordado: **How to Tell Whether Your Digital Marketing Is Working: From Visits to Customers**. Mercado Australia; manuscrito y recurso en inglés australiano. Investigación editorial, sin cuentas conectadas, datos privados, campañas ejecutadas o publicación.

## Conclusión y alcance

El artículo necesita responder cómo conectar objetivos con evidencia y una decisión, sin convertir tráfico o conversiones atribuidas en ventas incrementales demostradas. Su aportación consiste en definiciones operativas, reconciliación entre fuentes, una cohorte evaluable, costes explícitos y una ficha reutilizable. Es síntesis editorial, no método validado con clientes ni estándar oficial.

El beneficio defendible es disponer de una base más clara para investigar, asignar recursos y hacer seguimiento. La mejora comercial depende de decisiones y ejecución posteriores; documentación y aritmética no demuestran rentabilidad. No prometer que instrumentar más eventos o añadir un dashboard por sí solo mejore resultados.

Lector: responsable de una empresa australiana de servicios que recibe cifras de marketing y necesita entender si justifican mantener o cambiar lo que hace. Consulta objetivo editorial: **how to measure digital marketing success**. Variantes: is my digital marketing working; digital marketing results; marketing metrics for service businesses. No se midieron volúmenes, dificultad, posiciones, CPC o demanda australiana.

El blog 5 ya diagnostica visitas con pocas consultas; aquí se indica cuándo investigar ese tramo, sin repetir auditoría móvil/formularios. El10 explica Search; el11 evalúa resultados empresariales entre canales, sin subasta, concordancias o presupuestos. El13 ampliará registros/CRM, sin que su futura existencia impida definir responsables ahora. La medición debe acompañar cada trabajo desde el principio, no esperar al puesto11 de la serie.

## Fuentes primarias: hechos y límites

Se leyeron cuerpos relevantes de las páginas, mediante tres lecturas especializadas documentadas en `soporte-*.md` y revisión principal. Los localizadores de las notas son secciones/pasajes; no presentar rastreo o consulta como fecha editorial de la fuente. Salvo indicación, no se confirmó fecha de actualización visible.

| ID | Fuente | Hecho comprobado y uso prudente |
|---|---|---|
| P01 | [Search Console: About the data](https://support.google.com/webmasters/answer/17011364?hl=en) | Agregación por propiedad/página y estado de datos pueden alterar lectura de totales. No tratar impresiones como personas únicas ni prometer que sumar filas reproduzca siempre el gráfico. |
| P02 | [Traffic acquisition report](https://support.google.com/analytics/answer/12923437?hl=en) | Adquisición de sesiones y adquisición inicial de usuarios responden preguntas distintas. Eventos y sesiones no son unidades intercambiables. Elegir métrica concreta; no llamar clientes a usuarios medidos. |
| P03 | [Direct / none](https://support.google.com/analytics/answer/15258820?hl=en) | Fuente de referencia no clara; puede incluir información perdida. No inferir reconocimiento de marca o URL tecleada a partir del totalDirect. |
| P04 | [Conversions vs. key events](https://support.google.com/analytics/answer/13965727?hl=en) | GA4 actual distingue eventos clave de comportamiento y conversiones para publicidad; admite conversiones compartidas y medición entre canales. Evitar regla antigua «Analytics nunca muestra conversions». El informe y acción concretos importan. |
| P05 | [Analytics events to Google Ads conversions](https://support.google.com/google-ads/answer/2375435?hl=en) | Discrepancias por momento atribuido, acciones/columnas, contar una/todas, ventanas, demoras y estimaciones. No afirmar que todo informe siempre usa fecha del clic. |
| P06 | [Search Console discrepancies](https://support.google.com/webmasters/answer/17010575?hl=en) | Procesamiento, privacidad, herramienta y fecha afectan comparaciones. Datos diarios de Search Console en Pacific Time salvo vista24h; no suponer díaSídney en todas las cuentas. |
| P07 | [Search Console and Analytics for SEO](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console) | Herramientas complementarias, clics y sesiones distintos; las diferencias necesitan contexto. Actualización visible7 enero2026UTC. Su dashboard de ejemplo no prueba implementación de RR. |
| E01 | [Get started with attribution](https://support.google.com/analytics/answer/10596866?hl=en) | Atribución asigna crédito; DDA emplea métodos contrafactuales y entrenamiento con ensayos aleatorizados. No describir toda atribución como reparto manual o puramente observacional. Un total atribuido no es por sí solo un estudio de lift de esa campaña. |
| E02 | [Conversion Lift](https://support.google.com/google-ads/answer/12003020?hl=en) | Compara tratamiento/control para estimar efecto incremental. No disponible para todas las cuentas; no imponerlo como paso inmediato de toda pyme. |
| E03 | [Target ROAS](https://support.google.com/google-ads/answer/6268637?hl=en) | Relaciona valor de conversión y gasto publicitario. El significado depende del valor configurado; no equiparar automáticamente con ingresos o beneficio. No transferir plazos de puja a éxito empresarial. |
| E04 | [Return on investment](https://support.google.com/google-ads/answer/14090?hl=en-AU) | Explica retorno considerando ingresos y costes, no sólo facturación/medios. No establece qué incluye todo negocio ni garantiza retorno universal. |
| E05 | [Conversion values](https://support.google.com/google-ads/answer/13064207?hl=en) | Valores pueden ser uniformes o variar. Un importe asignado a un lead no prueba ingreso realizado; no sumar estimación y venta posterior como ingresos independientes. |
| E06 | [Conversion lag](https://support.google.com/google-ads/answer/9347141?hl=en) | Demora clic→conversión puede dejar incompletos resultados recientes. El ciclo comercial puede añadir otras esperas; una cohorte requiere corte y seguimiento definidos. |
| D01 | [Current URL builders](https://support.google.com/analytics/answer/10917952?hl=en) | UTMs identifican campaña/origen; valores distinguen mayúsculas. No garantizan reconstrucción completa. No adoptar el antiguo1033863 marcadoUniversal Analytics/legacy como tutorial vigente. |
| D02 | [Avoid sending PII](https://support.google.com/analytics/answer/6366371?hl=en) | Evitar datos identificativos en URLs, parámetros y campos ordinarios de Analytics. La página conserva ejemplos de código antiguo: no copiarlos ni generalizar a funciones especiales autorizadas sin revisar sus condiciones. |
| D03 | [GA4 Data redaction](https://support.google.com/analytics/answer/13544947) | Herramienta preventiva best-effort para web; tiene límites y no resuelve por sí sola obligaciones legales. No es implementación ejecutada aquí. |
| AU01 | [OAIC: tracking pixels](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/tracking-pixels-and-privacy-obligations) | Entender recogida, uso y divulgación; minimizar datos y evaluar obligaciones según caso. Fecha visible4 noviembre2024. No convertirlo en dictamen de cumplimiento para toda empresa. |

Las seis fuentesP01–P06 están documentadas en `soporte-plataformas-medicion.md`; E01–E06 en `soporte-atribucion-economia.md`. La revisión principal comprobóP07,D01–D03,AU01. Se excluyeron snippets, hilos de comunidad y blogs de terceros como autoridades técnicas.

## Separación de hechos, interpretación y recomendaciones

**Hechos:** las reglas documentadas de la matriz, con sus condiciones. **Interpretaciones:** una discrepancia puede deberse a definiciones, fechas, atribución o implementación; un patrón identifica qué investigar, no diagnostica una cuenta ausente. **Recomendaciones propias:** un objetivo explícito, diccionario de eventos de negocio, responsable por dato, cohorte con seguimiento, revisión de costes y decisión con próxima comprobación.

No asumir que una llamada larga es cualificada, que un evento clave es venta o que todos los canales deben generar un contacto inmediato. Conservar indicadores de educación/awareness cuando respondan a un propósito, sin declararlos ingresos. No sumar conversiones atribuidas por distintas plataformas como clientes únicos.

Para tasas, conservar unidades compatibles. Sesiones con resultado/sesiones es distinto de eventos/sesiones. Cualificadas/consultas requiere criterio y cobertura. La tasa de cierre usa consultas cualificadas que terminaron en trabajo aceptado/consultas cualificadas del mismo grupo, contando como máximo un éxito por consulta, no clientes nuevos/cualificadas. Un cliente recurrente también puede generar trabajo ganado. Identificar clientes nuevos distintos por separado para adquisición y aclarar asignación de costes si una campaña sirve a ambos grupos. Denominador cero no es coste cero. Si no existe relación fiable visita→consulta, reportar cuentas separadas y el límite.

## Cobertura australiana y oportunidad

Se leyeron [business.gov.au](https://business.gov.au/online-and-digital/measure-your-digital-performance), [Yellow Pages](https://www.yellow.com.au/business-hub/how-to-measure-the-success-of-your-small-business-digital-marketing/) y [Dream Outcome](https://www.dreamoutcome.com.au/blog/how-to-measure-digital-marketing-roi-australia), como evidencia de sus propios enfoques. Detalle y fechas en `soporte-estrategia.md`; la última presenta fechas de cabecera/pie distintas, sin escoger una como actualización confirmada única.

Cubren objetivos/canales, reconocimiento/interacción/leads y métricas comerciales. La oportunidad de RR consiste en operacionalizar definiciones, reconciliar bases temporales, declarar incertidumbre y separar facturación de contribución. No adoptar rangosCPL, ratiosROI, plazos o afirmaciones causales de esas guías. No se midieron SERPs controladas o posiciones ni se acreditó ausencia de contenidos equivalentes.

## Aporte original y ejemplo único

07 aporta una ficha de decisión: objetivo→evento verificable→fuente→responsable→periodo/cohorte→costes→incertidumbre→acción. Sus tablas son síntesis editorial, no plantilla oficial o estudio empírico. El manuscrito funciona sin descarga pública; el recurso necesita integración o alojamiento real si se ofrece.

El ejemplo amplía didácticamente los supuestos del 10, sin exigir que el lector haya leído otro artículo ni atribuir continuidad a un cliente real: **AUD 1500 medios +600 gestión/página =2100;30 consultas únicas =18 descartadas +12 cualificadas;12=3 consultas ganadas +9 perdidas; cero pendientes al corte. Las3ganadas producen un trabajo cada una para3clientes primerizos distintos.** Mismo grupo, maduro para esa evaluación. Trabajo completado y registros de ingresos 7500/costes directos3600, base consistente sin GST.

Cálculos: cualificación40%; cierre entre cualificadas25%; medios/consulta50; coste de marketing incluido/cliente700; contribución antes de marketing3900; después de esos costes 1800, antes de otros gastos; ROAS de ingresos/medios 5×. No es CAC completo, beneficio neto, ROI completo, recomendación de escalar o impacto incremental probado. Las cifras no son benchmarks ni resultados de RR. Mantener artículo y07 idénticos, sin sustituirlos por una alternativa de soporte.

No se incorporan LTV supuesto, porcentaje adicional de ROI o plazo de payback. Añadirlos exigiría datos/horizonte y aumentaría complejidad sin resolver la pregunta del artículo. Cobros, ingresos y valor estimado del lead son conceptos diferentes; el recurso exige especificar base antes de interpretar números propios.

## Marca, enlaces y credibilidad

Se abrieron [Contact](https://rankingrebels.com/contact/) y [How We Work](https://rankingrebels.com/journey/), además de portada/Solutions. Contact es CTA transversal real y se usa en02; no se envió ni probó formulario. No prometer auditoría gratuita, acceso, precio o respuesta temporal sin evidencia.

Blogs5/10/13 son candidatos para profundizar en consultas,Search y CRM.4 sólo si ayuda a interpretar qué evalúaSEO. Destinos sin URL pública o rutaCMS confirmada: no inventar enlaces ni deducir ausencia por búsquedas/sitemaps fallidos. No se revisó el inventario completo de los otros socios, por lo que no hay diagnóstico de canibalización.

Autor/revisor humano y experiencia real específica sin confirmar.08 permite documentar una contribución verificable sin fingirla. [Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) respalda utilidad, aporte y fuentes; no un puntaje de autoridad ni garantía por extensión/frecuencia. La auditoría03 distingue lectura editorial de comprobación del HTML, tracking o publicación.

**Pendiente de confirmación, excluido como hecho:** datos reales de empresa, métricas de cuenta, cobertura del recorrido, rentabilidad, efecto incremental, benchmarks australianos y plazos de éxito. La investigación no autoriza campañas, conexiones, uploads, mensajes o publicación.

Tras preparar11, siguiente tema 12. Cadencia prevista cada cuatro días bajo decisión manual del usuario; no iniciar investigaciones futuras o programar acciones al cerrar este paquete.
