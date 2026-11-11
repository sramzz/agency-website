# Blog 11 — soporte de plataformas de medición

**Consulta: 21 de octubre de 2026; mercado Australia.** Investigación editorial para *How to Tell Whether Your Digital Marketing Is Working: From Visits to Customers*. Se leyeron los cuerpos completos de seis páginas oficiales de Google, incluidos sus apartados de límites y discrepancias. No se accedió a cuentas de Analytics, Search Console, Ads ni datos de Ranking Rebels. Fecha de consulta no equivale a fecha de publicación de las fuentes.

## Fuentes y localizadores

| ID | Página oficial consultada | Apartados / pasajes de referencia |
|---|---|---|
| S1 | [Performance report: About the data](https://support.google.com/webmasters/answer/17011364?hl=en) | “Data aggregation by property vs. page”, L21–52; “Data status and freshness”, L53–62 |
| S2 | [GA4 Traffic acquisition report](https://support.google.com/analytics/answer/12923437?hl=en) | Introducción, L23; “Dimensions”, L49–67; “Metrics”, L68–84; troubleshooting hasta L117 |
| S3 | [Understand (direct) / (none) traffic](https://support.google.com/analytics/answer/15258820?hl=en) | Definición, L23; “Reasons”, L27–40 |
| S4 | [Conversions vs. key events in Google Analytics](https://support.google.com/analytics/answer/13965727?hl=en) | Definiciones, L47–85; informes, L88–109; discrepancias y FAQ, L110–159 |
| S5 | [Create conversions from Google Analytics events in Google Ads](https://support.google.com/google-ads/answer/2375435?hl=en) | Importación, L59–83; “Data discrepancies”, L104–133 |
| S6 | [Performance report: Troubleshooting data discrepancies](https://support.google.com/webmasters/answer/17010575?hl=en) | Totales de gráfico/tabla, L21–29; otras herramientas, L30–37 |

Los números de línea son localizadores de la lectura, no numeración propia de Google. Se registran secciones para localizar los pasajes si cambia la presentación. No se verificaron vídeos, ejemplos de cuentas ni páginas enlazadas fuera de estas seis.

## Hechos confirmados

### 1. Una aparición o un clic no es una visita medida

Search Console registra apariciones y clics relacionados con resultados de búsqueda. Sus unidades de agregación importan: dos resultados de una misma propiedad pueden contar como una impresión de propiedad; agrupados por página, cada URL se cuenta por separado. También puede cambiar el recuento de clics al agrupar por propiedad o página. Por eso sumar filas no siempre reproduce un total. El dato más reciente puede ser preliminar y modificarse. [S1, apartados de agregación y actualización](https://support.google.com/webmasters/answer/17011364?hl=en).

**Uso editorial:** explicar “visibilidad → interacción con el resultado → actividad registrada en la web” como capas diferentes. No convertir impresiones en personas únicas ni exigir un clic de Search Console por cada sesión de Analytics. Esa cadena es una herramienta didáctica; no afirma que cada plataforma observe a la misma persona de principio a fin.

### 2. En Analytics, especificar qué se está contando

El informe de adquisición de tráfico incluye visitantes nuevos y recurrentes; el de adquisición de usuarios se centra en cómo llegan los nuevos. Las dimensiones con “Session” describen la adquisición de sesiones. Una sesión es un periodo de interacción; por defecto termina tras treinta minutos de inactividad. Event count cuenta activaciones de eventos. Session key event rate divide sesiones con un evento clave entre todas las sesiones, no el número bruto de activaciones entre visitas. [S2, introducción, dimensiones y métricas](https://support.google.com/analytics/answer/12923437?hl=en).

**Uso editorial:** distinguir usuarios medidos, sesiones y acciones registradas. Una misma visita puede contener varias acciones; un visitante puede volver. No llamar “customers” a usuarios ni a sesiones. Elegir y conservar una métrica de usuarios concreta antes de comparar informes. Esta revisión no establece una equivalencia entre usuarios totales, activos y personas físicas: evitar un glosario avanzado que no aporta a la decisión comercial. Tampoco intercambiar adquisición inicial de usuarios y origen de sesiones como si respondieran la misma pregunta.

### 3. Direct no demuestra que alguien escribiera la dirección

Google define `(direct) / (none)` como tráfico sin una fuente de referencia clara. Entre los motivos documentados están información de campaña ausente, redirecciones que eliminan parámetros, determinados acortadores, acceso directo, enlaces desde documentos y bloqueadores que interfieren con la identificación del origen. [S3, definición y Reasons](https://support.google.com/analytics/answer/15258820?hl=en).

**Uso editorial:** “Direct means Analytics could not identify a clear referral source.” No presentar una subida de Direct como prueba automática de reconocimiento de marca, fidelidad o éxito de publicidad. Revisar etiquetado y redirecciones es una posible comprobación, no un diagnóstico de una cuenta que no hemos visto.

### 4. Evento, evento clave y conversión requieren contexto

Un evento clave es un evento marcado por su importancia para el negocio. Una conversión sirve para medir campañas y optimizar pujas; puede crearse desde eventos de Analytics y compartirse con Ads. La documentación actual admite medición de conversiones entre canales, incluidos orgánicos, y distingue sus informes de Advertising de los informes ordinarios de comportamiento. Las conversiones de Ads no aparecen como tales en los informes estándar Reports/Explore. Modelos, canales elegibles, ventanas, identidad y momento de atribución pueden diferir entre eventos clave y conversiones. [S4, definiciones, informes y discrepancias](https://support.google.com/analytics/answer/13965727?hl=en).

**Uso editorial:** conservar la palabra comercial “conversion” si se define la acción, pero aclarar “called key events in GA4 behavioural reports” cuando corresponda. No afirmar que Analytics nunca muestra conversiones ni que todos sus informes son intercambiables. Marcar una acción como importante no verifica su calidad comercial ni la convierte en venta.

### 5. Las comparaciones necesitan la misma base temporal

Google documenta diferencias incluso con configuración correcta: Ads suele asignar la conversión al momento del clic que la produjo; Analytics, al de la acción. El ejemplo oficial separa clic del día 19 y compra del 20. También influyen contar una o todas las conversiones por interacción, comparar Conversions con All conversions, ventanas y retrasos de importación. Los informes importados pueden incluir estimaciones modeladas. [S5, Data discrepancies y Keep in mind](https://support.google.com/google-ads/answer/2375435?hl=en).

**Uso editorial:** no escribir “Google always reports by click date”: comprobar el informe, columna y ajuste temporal. Antes de interpretar un cambio, anotar acción, rango, fecha de interacción o de resultado, ventana y columna. No utilizar duraciones de cookies como garantía de seguimiento completo ni adoptar una ventana universal para todos los negocios.

Search Console añade otras causas: privacidad, procesamiento, retraso de datos, diferencias de zona horaria y dependencia de JavaScript en herramientas como Analytics. Sus vistas diarias, salvo la vista de 24 horas, etiquetan los datos en Pacific Time. [S6, Data discrepancies between Search Console and other tools](https://support.google.com/webmasters/answer/17010575?hl=en).

**Uso editorial:** para Australia, comprobar el día que representa cada gráfico antes de comparar cifras. No asumir que todos usan Sydney ni exigir igualdad diaria. Una discrepancia esperable tampoco prueba que la configuración sea correcta: una ruptura repentina merece revisión.

## Recomendaciones editoriales propias y límites

Estas propuestas son criterio de preparación, no reglas de Google ni resultados observados:

- Abrir con la pregunta comercial: qué servicio, qué consulta útil y qué cliente pretende conseguir el negocio. Después elegir indicadores de visibilidad, visitas, consultas y ventas.
- Conservar un diccionario breve: nombre de indicador, acción exacta, fuente, periodo y responsable. Separar clic en teléfono, llamada atendida, consulta válida, presupuesto y cliente ganado.
- Usar el registro comercial para comprobar calidad y desenlace. Conciliar duplicados antes de tratar formularios y llamadas como oportunidades distintas.
- Revisar tendencias comparables y mantener visibles los resultados pendientes; no juzgar un mes reciente como si todas sus consultas ya hubieran cerrado.
- Presentar atribución como asignación de crédito bajo una regla. No convertirla en una prueba de que un canal causó ventas adicionales.

No se ha auditado la implementación, el consentimiento, la calidad de eventos, la identidad entre dispositivos, los costes ni las ventas de RR. No hay benchmarks, umbrales de éxito, resultados de clientes ni promesas de exhaustividad. El manuscrito debe enseñar a formular y comprobar preguntas; no prometer que una herramienta reconstruya todo el recorrido.
