# Blog 6 — soporte de rastreo, indexación y contenido renderizado

Fecha de verificación: 20 de octubre de 2026, Australia/Sydney. Mercado del artículo: Australia; manuscrito en inglés australiano. Investigación documental, sin acceso a Search Console ni auditoría de una web real. Todos los cuerpos de las nueve fuentes enlazadas fueron abiertos y leídos; no se depende únicamente de resultados de búsqueda.

## Conclusión para la edición

Separar cuatro preguntas: ¿se puede descubrir la URL?, ¿se puede acceder a su contenido?, ¿es elegible y ha sido seleccionada para indexarse?, ¿aparece para la consulta que importa? La corrección de un impedimento técnico demuestra que se corrigió ese impedimento; no demuestra indexación ni posicionamiento. Es una síntesis editorial de las fuentes, no un algoritmo de Google ni una secuencia de diagnóstico que Google imponga.

Los nueve documentos cubren mecanismos. No prueban que Ranking Rebels o un lector concreto tenga esos problemas. En el artículo, “podría deberse a…” debe ir seguido de una prueba y una decisión condicionada al resultado.

## Fuentes primarias y hechos verificados

### T1. Requisitos técnicos mínimos de Google Search

[Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical). Actualización visible: 18 de diciembre de 2025. Cuerpo relevante leído: requisitos, acceso público, HTTP 200 y contenido indexable.

Para que el contenido de una página sea elegible, Google debe poder acceder a ella, recibir una respuesta HTTP 200 y encontrar contenido indexable. Cumplir los mínimos no garantiza que se indexe. La indexación no requiere pagar a Google. Una página privada detrás de un inicio de sesión no es contenido público accesible a Googlebot. El propio documento distingue el bloqueo del rastreo de la posible aparición de una URL bloqueada sin su contenido.

Uso editorial: no llamar “indexada” a una página porque cargue en el navegador o porque una prueba técnica sea satisfactoria. No sugerir que Search Console sea una tarifa o requisito de pago para aparecer.

### T2. Qué hace robots.txt

[Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro). Actualización visible: 10 de diciembre de 2025. Cuerpo leído: usos por tipo de recurso y limitaciones.

robots.txt controla solicitudes de los rastreadores que lo respetan. Para páginas web, un bloqueo no es una forma fiable de retirarlas del índice: Google puede descubrir su URL a través de enlaces y mostrarla sin haber rastreado su contenido. Bloquear recursos necesarios también puede dificultar la comprensión de la página. robots.txt no protege información privada frente a usuarios u otros rastreadores.

Uso editorial: “no aparece porque tiene robots.txt” es falso; hay que comprobar la regla que afecta a la URL y al rastreador relevantes. No proponer eliminar el archivo ni desbloquear todo el sitio: puede contener restricciones intencionadas y recursos privados deben conservar su control de acceso.

### T3. noindex en HTML y en cabeceras HTTP

[Block Search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing). Actualización visible: 10 de diciembre de 2025. Cuerpo leído: implementación y depuración.

Google admite noindex mediante una etiqueta meta o una cabecera de respuesta X-Robots-Tag; el segundo mecanismo también sirve para recursos no HTML. Debe poder rastrear y recibir la regla para aplicarla. Si robots.txt impide acceder a la URL, Google no puede leer su noindex. Escribir noindex dentro de robots.txt no está admitido. La regla debe volver a rastrearse para reflejar un cambio.

Uso editorial: inspeccionar HTML y cabeceras, además del ajuste de visibilidad del CMS. Retirar un noindex sólo si es accidental en una página pública destinada a búsqueda. No eliminarlo de páginas privadas o utilitarias para aumentar un contador de indexación.

### T4. Canonicalización y duplicados normales

[What is canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization). Actualización visible: 20 de agosto de 2026. Cuerpo leído: agrupación de duplicados, señales y elección de la URL representativa.

Google puede agrupar contenido igual o muy parecido y seleccionar una URL representativa. Que otra versión no se indexe por separado puede ser esperado. Tener ciertos duplicados es normal y no supone por sí mismo incumplir las políticas de spam. La preferencia canonical es una indicación, no una orden; Google puede elegir otra URL. Un resultado suele apuntar a la URL canónica, con excepciones según el usuario.

Uso editorial: preguntar primero si la URL alternativa debe existir como resultado independiente. No convertir todas las exclusiones de duplicados en errores ni hablar de una penalización automática por duplicados.

### T5. Cómo indicar una canonical

[How to specify a canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). Actualización visible: 10 de julio de 2026. Cuerpo leído: métodos, buenas prácticas y señales.

Google describe las redirecciones y rel=canonical como señales fuertes y la inclusión en sitemap como señal débil. Se recomienda coherencia: enlaces internos a la URL preferida, sitemap alineado y ausencia de declaraciones contradictorias. noindex no es el método recomendado para seleccionar una canonical dentro del mismo sitio porque excluye la página de Search. Canonical no equivale a una redirección para la persona que visita la URL.

Uso editorial: comparar la URL declarada y la seleccionada por Google cuando el informe lo permita. No declarar que añadir una canonical obliga a Google a indexar una URL ni cambiar todas las canonicals al inicio.

### T6. Respuestas HTTP, errores y redirecciones

[How HTTP status codes affect Google's crawlers](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes). Actualización visible: 4 de febrero de 2026. La URL histórica de Search Central redirige a esta dirección de Google Crawling Infrastructure. Cuerpo leído completo.

Una respuesta 200 permite pasar el contenido al procesamiento, sin garantizar indexación. Una página vacía o un mensaje de error con respuesta de éxito puede ser tratado como soft 404. Una redirección válida hace que se procese el destino: no es lo mismo que un fallo de redirección. Los 404/410 expresan ausencia de contenido; los errores 5xx y 429 pueden frenar el rastreo y los 5xx persistentes pueden acabar haciendo que una URL salga del índice. La respuesta no describe una retirada instantánea ante un fallo aislado.

Uso editorial: comprobar destino y contenido final. Mantener el estado de error correcto para contenido realmente inexistente. Investigar servidor/CDN/firewall si una página pública válida falla. No “arreglar SEO” devolviendo 200 para todos los errores ni redirigiéndolos indiscriminadamente a la portada.

### T7. JavaScript y contenido que Google recibe

[Understand the JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). Actualización visible: 4 de marzo de 2026. Cuerpo leído: rastreo, renderizado, indexación, títulos/canonicals, códigos, enlaces, meta robots y web components.

Google Search puede ejecutar JavaScript y usar el HTML renderizado, pero los recursos o páginas bloqueados no se renderizan de ese modo. El contenido visible en un navegador humano no demuestra que esté disponible en la representación que Google procesa. Una etiqueta noindex en el código inicial puede hacer que Google omita el renderizado; confiar en JavaScript para retirarla no es una solución fiable. Los enlaces generados mediante JavaScript pueden descubrirse si usan marcado rastreable.

Uso editorial: inspeccionar el HTML renderizado y los recursos cuando haya una sospecha concreta. No afirmar que Google no indexa JavaScript, que cualquier web moderna exige reconstrucción o que SSR es un requisito universal de Google.

### T8. Sitemap y descubrimiento

[Learn about sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview). Actualización visible: 10 de diciembre de 2025. Cuerpo leído: finalidad, casos de uso y límites.

Un sitemap comunica URLs y otra información a los buscadores. Puede ayudar especialmente en sitios nuevos o complejos. Google también puede encontrar páginas mediante enlaces internos adecuados. El sitemap no garantiza que sus URLs se rastreen ni se indexen. Muchos CMS ya lo generan; no debe afirmarse que cualquier propietario deba crear manualmente otro archivo.

Uso editorial: comprobar el sitemap existente y si incluye las páginas públicas preferidas. Presentarlo como ayuda de descubrimiento, no como mecanismo de prioridad garantizada o sustituto de la navegación.

### T9. Enlaces rastreables y enlaces internos

[Link best practices for Google](https://developers.google.com/search/docs/crawling-indexing/links-crawlable). Actualización visible: 10 de diciembre de 2025. Cuerpo leído: marcado, texto de ancla y referencias internas/externas.

Google normalmente extrae enlaces de elementos HTML a con atributo href que resuelve a una dirección válida; acciones de script sin ese marcado no se extraen de forma fiable. Google recomienda que cada página importante tenga un enlace desde otra página del sitio. El contexto y un texto descriptivo ayudan a interpretar el destino. No hay un número mágico de enlaces por página; forzar palabras clave o enlaces perjudica la naturalidad.

Uso editorial: usar enlaces a los blogs 4 y 2 sólo si resuelven una necesidad del lector y el destino está confirmado. No afirmar una regla universal de tres clics ni un mínimo fijo de enlaces.

## Matriz de decisiones propuesta por el equipo editorial

Estas filas son recomendaciones de diagnóstico basadas en T1–T9. No son hallazgos sobre Ranking Rebels. Antes de tocar una configuración, confirmar el propósito de la URL y conservar controles de páginas privadas. El responsable autorizado del sitio decide el cambio.

| Escenario hipotético | Prueba que buscar | Decisión si se confirma | Confirmación posterior y límite |
|---|---|---|---|
| Servicio público desconocido por Google | Inspección de la URL y navegación: ¿hay enlaces reales?, ¿existe URL preferida en sitemap? | Añadir un enlace contextual útil y corregir la lista de URLs preferidas si falta | Comprobar que Google puede acceder y luego revisar si descubre/rastrea la URL; esto no garantiza indexación |
| Google no puede rastrear una página que debe ser pública | Regla robots aplicable, estado de acceso y respuestas para Google | Corregir sólo la restricción accidental; revisar el CMS o infraestructura que la genera | Repetir prueba de acceso; esperar un nuevo rastreo para verificar el estado del índice |
| Una página pública muestra noindex | Meta robots/googlebot y X-Robots-Tag de la respuesta que recibe Google | Retirar la regla accidental desde su origen; revisar si una plantilla afecta a otras páginas | Verificar ausencia de regla en respuesta y renderizado; que el cambio sea efectivo no prueba indexación |
| noindex y bloqueo robots conviven | Contrastar regla robots y directiva noindex con intención editorial | Para contenido a indexar, resolver ambos impedimentos; para una retirada, permitir lectura de noindex cuando corresponda o usar protección real | No asumir que la regla oculta ha sido aplicada; confirmar nuevo rastreo o comportamiento de acceso |
| Variante no indexada por canonical | Comparar contenido, canonical declarada, URL elegida y señales del sitio | Si la consolidación es intencionada, dejarla; si apunta a otra página incorrecta, alinear señales | Confirmar señales y, tras procesamiento, selección de Google. No exigir que todas las variantes se indexen |
| Una página válida devuelve 404/403/5xx | Respuesta HTTP real y registros del servidor/CDN pertinentes | Reparar publicación, acceso o disponibilidad según la causa demostrada | Probar respuesta y contenido final; luego revisar rastreo/índice. No convertir errores de páginas inexistentes en 200 |
| URL antigua redirige | Cadena, destino, respuesta y contenido final | Si el traslado es correcto, conservarlo y evaluar el destino; si falla, corregir la ruta específica | Confirmar destino funcional y relevante; una URL origen excluida no prueba un problema |
| Plantilla vacía con HTTP 200 | HTML recibido/renderizado, recursos y mensaje real | Restaurar contenido válido si debe existir o devolver el estado apropiado si falta | Confirmar contenido y respuesta; ni 200 ni una prueba visual aislada certifican indexación |
| Enlace funciona sólo al pulsar un script | Inspeccionar marcado href y dirección de destino | Usar enlace rastreable sin perder el comportamiento de la interfaz | Confirmar marcado/renderizado y destino accesible; no prometer que será rastreado inmediatamente |

## Redacción que debe rechazarse

- “Robots.txt elimina tu página de Google”. T2 y T3 explican la distinción.
- “Noindex se corrige añadiendo Allow en robots”. Son controles distintos; comprobar ambos y la intención de publicación.
- “Toda URL excluida necesita arreglarse”. Duplicados, páginas retiradas y redirecciones pueden ser esperados (T4–T6).
- “Sitemap enviado = Google indexó todas las páginas”. T8 lo descarta.
- “Si responde 200 está indexada”. T1 y T6 lo descartan.
- “301 es un error de indexación”. Una redirección válida y una redirección fallida son situaciones diferentes (T6).
- “Duplicado significa penalización”. Algunos duplicados son normales (T4).
- “Canonical es una orden”. Es una preferencia, aunque su señal pueda ser fuerte (T4–T5).
- “Hay que redirigir todos los 404 a la portada” o “todas las URLs deben tener 200”. No hay esa regla en las fuentes; puede ocultar la ausencia de contenido y producir respuestas engañosas.
- “Google no entiende JavaScript”, “SSR siempre es obligatorio”, “hace falta llms.txt”, “todo debe estar a tres clics”. No están justificadas por esta investigación. No se investigó ni se recomienda llms.txt para resolver indexación en Google.

## Límites documentados

No se han probado URLs de un negocio ni se tienen sus registros, CMS, respuestas HTTP, historial de cambios o Search Console. No se ha demostrado una causa concreta, ni un plazo de reindexación, ni una mejora de tráfico. El artículo debe explicar cómo conseguir evidencia, sin fingir que ya se ha obtenido. Las fechas indicadas son las fechas de actualización que muestran los documentos, no fechas de lanzamiento de estos mecanismos.

## Auditoría del manuscrito — 20 de octubre de 2026

Se leyó íntegramente `02-articulo-google-visibility-diagnosis-australia.md`, desde el H1 hasta el CTA final, y se contrastaron los puntos técnicos de este encargo con T1–T9. No se editaron los archivos principales.

Resultado: no se detectaron errores técnicos críticos o importantes en este ámbito. El artículo no recomienda indexar todas las URLs excluidas, eliminar todas las restricciones, exigir SSR, reconstruir sitios por usar JavaScript ni añadir llms.txt. La ausencia de estos errores no demuestra una auditoría de la web ni confirma una causa de pérdida de visibilidad.

| Extracto o decisión revisada | Valoración | Evidencia | Acción justificada |
|---|---|---|---|
| “Not every excluded URL needs to be indexed” y la distinción entre duplicados/redirecciones/páginas privadas | Correcto; conservar | T3–T6 | Ninguna corrección técnica |
| robots.txt y noindex no son intercambiables; bloqueo de rastreo impide leer la regla | Correcto; conservar | T2–T3 | Ninguna corrección técnica; el manuscrito también contempla noindex en cabeceras HTTP |
| Respuesta HTTP200 no garantiza indexación; redirección válida distinta de redirect error | Correcto; conservar | T1 y T6 | Ninguna corrección técnica |
| soft404 posible cuando una página vacía devuelve éxito; mantener una respuesta not-found exacta para contenido retirado | Correcto, condicionado y sin prometer resultados | T6 | Ninguna corrección técnica |
| Canonical como preferencia; comprobar la versión seleccionada y señales coherentes | Correcto; conservar | T4–T5 | Ninguna corrección técnica |
| Sitemap ayuda, pero no garantiza rastreo/indexación; enlaces contextuales para descubrimiento | Correcto; conservar | T8–T9 | Ninguna corrección técnica |
| Google puede procesar JavaScript; comprobar contenido recibido/renderizado antes de concluir | Correcto; conservar | T7 | Ninguna corrección técnica |
| “content loaded only after an interaction may affect what becomes available” | Confirmado mediante una fuente adicional; oportunidad menor de mejorar la atribución exacta | [Fix lazy-loaded content](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading), cuerpo leído, actualización visible 10 de diciembre de 2025: Google Search no interactúa con la página y el contenido debe poder cargarse sin depender de una acción del usuario | Opcional: enlazar específicamente “content loaded only after an interaction” a esa fuente. La afirmación actual no es un error; no ampliar la sección ni prescribir una tecnología |

No se propone reescribir secciones técnicamente correctas por preferencia de estilo. Las secciones de Search Console Performance, manual actions, security issues y traffic drops requieren la auditoría de sus fuentes específicas realizada por el responsable de ese bloque; esta revisión no sustituye esa comprobación.
