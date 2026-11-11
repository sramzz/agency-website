# Soporte: Google, reutilización de reseñas y datos estructurados

**Blog 17 — Customer Reviews and Testimonials: What Australian Businesses Should Check Before Publishing.** Investigación consultada el **27 de octubre de 2026, Australia/Sydney**. Nota editorial en español; fuentes primarias con cuerpos abiertos. No se accedió a cuentas ni se implementaron widgets o marcado.

## Dictamen y alcance

Separar tres decisiones: solicitar una reseña en Google, mostrarla en la web y añadir datos estructurados. La autorización o elegibilidad de una no resuelve automáticamente las otras. Este soporte documenta políticas de plataforma; las obligaciones australianas sobre publicidad, privacidad y derechos deben contrastarse con las fuentes jurídicas del dossier. No acredita permiso para ningún testimonio concreto.

## 1. Solicitud de reseñas en Maps y Business Profile

La política de Maps exige experiencias reales y prohíbe reseñas pagadas, incentivos en dinero o especie y manipulación mediante varias cuentas. Prohíbe ofrecer pagos, descuentos, productos o servicios gratuitos por publicar cualquier reseña, o por revisar o retirar una negativa. La prohibición no depende de exigir cinco estrellas. También prohíbe desalentar reseñas negativas o solicitar selectivamente positivas. Permite pedir opiniones sobre experiencias genuinas sin incentivos ni influencia sobre su valoración o contenido. [Maps: Fake Engagement y Rating Manipulation](https://support.google.com/contributionpolicy/answer/7400114?hl=en).

**Aplicación editorial:** un filtro que deriva sólo clientes satisfechos a Google es incompatible con la regla de solicitud selectiva; llamarlo encuesta no cambia ese funcionamiento. [Maps: Rating Manipulation](https://support.google.com/contributionpolicy/answer/7400114?hl=en). Una invitación neutral puede incluir el enlace o QR de Google: su ayuda oficial contempla ambos mecanismos. La misma ayuda recomienda valorar opiniones honestas y equilibradas. Esto no obliga a transformar toda selección editorial de testimonios en un directorio completo; son cuestiones distintas que el artículo debe explicar sin confundirlas. [Tips to get more reviews](https://support.google.com/business/answer/3474122?hl=en).

## 2. Reseñas visibles y estrellas en Search

La documentación actual restringe los snippets de reseñas para `LocalBusiness` y `Organization` a sitios que recogen opiniones sobre otras entidades. Si la entidad reseñada controla las opiniones sobre sí misma, sus páginas no son elegibles para esa función de estrellas. Incluye tanto marcado directo como widgets de terceros, con Google Business reviews y Facebook como ejemplos. Por tanto, instalar un widget no evita la restricción. [Review snippet, sección Guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#guidelines).

La aclaración histórica de Google confirma que la regla comprende `Review` y `AggregateRating`, y que afecta a Search orgánico, no a Business Profile. También aclara que esta condición por sí sola no exige retirar las reseñas visibles. No convertir la inelegibilidad para estrellas en una supuesta prohibición general de publicar testimonios. [Making Review Rich Results more helpful, FAQ; actualización del 18 de septiembre de 2019](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful).

Para marcado elegible, Google exige que reseñas y valoraciones señaladas sean visibles; prohíbe agregar valoraciones o reseñas de otros sitios. No presentar una suma de puntuaciones importadas como una vía para obtener estrellas. [Review snippet, Guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#guidelines).

## 3. Sintaxis válida no equivale a resultado garantizado

Google no garantiza resultados enriquecidos aunque el marcado pase Rich Results Test. Sus pautas requieren representar fielmente el contenido principal, usar tipos aplicables y evitar información engañosa u oculta. **Recomendación derivada:** no reclasificar reseñas sobre el negocio como `Product` para intentar sortear la regla anterior; primero debe existir un objeto real y una implementación que cumpla la documentación correspondiente. [General structured data guidelines, Content, Relevance y Specificity](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

Tampoco prometer mejores posiciones en Maps por copiar testimonios a la web. La guía local habla de relevancia, distancia y popularidad/prominencia, y reconoce que más reseñas y valoraciones positivas pueden ayudar al posicionamiento local; no demuestra un efecto equivalente por republicar testimonios propios. Es un límite de lo que estas fuentes permiten concluir, no una afirmación de que todo efecto indirecto sea imposible. [Tips to improve your local ranking](https://support.google.com/business/answer/7091?hl=en).

## 4. Reutilización: identificar primero el método

Los términos de Google para Australia mantienen los derechos de propiedad intelectual que el creador tenga sobre su contenido, con las reseñas como ejemplo. Para contenido ajeno indican permiso del titular o un uso permitido por ley. **Recomendación editorial:** para una cita copiada manualmente, registrar la base de reutilización, el texto autorizado, nombre/foto, canales y fecha; no inferir autorización sólo porque la reseña es pública. Esta recomendación no afirma que cada cita requiera siempre un permiso adicional bajo cualquier circunstancia. [Google Terms of Service, Australia: Licence y Other content](https://policies.google.com/terms?gl=au&hl=en-AU).

Los términos adicionales de Maps permiten ciertos usos con atribución y condicionan la copia a permisos específicos o a la legislación aplicable. Una atribución por sí sola no resuelve todos los derechos. Las Geo Guidelines permiten insertar un mapa o enlazar a Maps y remiten a APIs para integraciones comerciales más amplias. Esa autorización sobre mapas no es una licencia universal para copiar reseñas como anuncios. [Maps Additional Terms, License y Prohibited Conduct](https://www.google.com/intl/en_ALL/help/terms_maps/); [Geo Guidelines, Web and apps](https://about.google/brand-resource-center/products-and-services/geo-guidelines/).

## 5. API y widgets: conservar las condiciones del producto

Para contenido obtenido mediante **Places API**, su política exige atribución de Google Maps y del autor, acceso al contenido individual mediante `googleMapsUri` y aviso claro sobre ordenación y filtrado. Describe recursos de atribución disponibles y reglas de espacio; no reducirla a una instrucción universal sobre el nombre. También remite a restricciones de almacenamiento y a los términos aplicables. Son condiciones del producto, no reglas automáticamente transferibles a una cita manual ni prueba de que cualquier widget comercial las cumpla. La página advierte que cumplir sus requisitos no garantiza cumplimiento legal en todas las jurisdicciones. [Policies and attributions for Places API](https://developers.google.com/maps/documentation/places/web-service/policies).

**Comprobación propuesta:** identificar cómo obtiene contenido el proveedor, qué términos aplica, qué atribución conserva y cómo actualiza o elimina reseñas. No se auditó ningún proveedor y no se recomienda uno.

## Registro de lectura, fechas y límites

Se abrieron los cuerpos oficiales enlazados. Fechas visibles: Review snippet, **8 septiembre 2026**; General structured data guidelines, **10 julio 2026**; Places API policies, **23 octubre 2026**; Terms Australia, efectivos **30 julio 2026**; Maps Additional Terms, modificados **27 enero 2026**. Las ayudas de Maps/Business Profile y Geo Guidelines no mostraron fecha de actualización en el cuerpo recuperado. Consulta de todas: 27 octubre 2026.

**Acceso fallido y resuelto:** `policies.google.com/terms?hl=en&gl=au` devolvió error interno. La ruta `?gl=au&hl=en-AU` abrió el cuerpo y confirmó Country version: Australia. La ruta genérica abrió inicialmente Suecia; no se utilizó como evidencia de los términos australianos. No se consultaron contratos privados, código de widgets o excepciones jurídicas para casos concretos. No hay garantía de estrellas, ranking, conversiones ni autorización de publicación.
