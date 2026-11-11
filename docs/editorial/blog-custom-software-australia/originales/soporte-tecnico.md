# Blog 8 — soporte técnico: alternativas, integración y mantenimiento

Investigación contrastada el **20 de octubre de 2026**, contexto Australia/Sydney. Nota de apoyo para *Custom Software for Your Business: Benefits, Trade-offs and When It Makes Sense*. Las fuentes se abrieron y sus cuerpos pertinentes se leyeron; no se dedujeron capacidades desde resultados de búsqueda. No se revisó ninguna aplicación concreta, contrato del cliente ni producto de Ranking Rebels.

## Dictamen técnico

El argumento defendible es que desarrollar software específico puede dar margen para adaptar un proceso importante que las alternativas disponibles no resuelven suficientemente bien. Esa posibilidad exige demostrar la necesidad, las restricciones y la capacidad de operar la solución. No permite afirmar que construir resulte siempre más barato, seguro, escalable, sencillo de integrar o independiente de proveedores.

La decisión no es solamente «software genérico o desarrollar todo». La comparación editorial debe incluir comprar, configurar, extender, integrar y construir una parte o un sistema, además de posponer la inversión cuando el problema todavía no está claro. Esa clasificación es una síntesis editorial, no una taxonomía normativa universal. Un mismo proyecto puede combinar varias opciones.

## Seis fuentes principales verificadas

### T1. Government Digital Service — Define your purchasing strategy

- **URL:** [Define your purchasing strategy](https://www.gov.uk/guidance/define-your-purchasing-strategy).
- **Publicación:** 6 de noviembre de 2017. **Última actualización visible:** 3 de septiembre de 2026.
- **Cuerpo leído:** secciones *Discover your requirements and capabilities*, *Choosing to build technology*, *Choosing to buy technology* y condiciones sobre propiedad; líneas de consulta 119–174 y 195–206.
- **Hechos verificables sobre la guía:** contempla comprar, construir o combinar; compara necesidades, costes de ciclo de vida y capacidad para mantener. Considera construir cuando las soluciones disponibles no satisfacen necesidades centrales, incluso tras adaptación o integración. Considera comprar cuando el mercado cubre la mayor parte de las necesidades y permite configurar. Advierte de que modificaciones pueden complicar mantenimiento, soporte y evolución.
- **Uso editorial:** sustenta comparar alternativas con un problema común y probar una necesidad difícil. No sustenta un porcentaje mínimo de requisitos, ROI ni ahorro prometido.
- **Límite:** son instrucciones para organismos del Reino Unido. No trasladar sus obligaciones de contratación, accesibilidad o cláusulas de salida a pymes australianas. No citar sus beneficios esperados como resultados medidos.

### T2. ASD’s Australian Cyber Security Centre — Choosing secure and verifiable technologies: Executive guidance

- **URL:** [Choosing secure and verifiable technologies: Executive guidance](https://www.cyber.gov.au/publication/choosing-secure-and-verifiable-technologies-executive-guidance).
- **Publicación y revisión visibles:** 5 de diciembre de 2024.
- **Cuerpo leído:** introducción, audiencia, riesgos de cadena de suministro y fases de compra, especialmente líneas de consulta 65–180.
- **Hechos verificables sobre la guía:** aborda evaluación antes y después de comprar; incluye desarrollo, sistemas conectados, datos y cadena de suministro. La fase posterior contempla mantenimiento, soporte, contratos, licencias, acuerdos de servicio y fin de vida. Recomienda recursos para sostener la solución y gestionar riesgos durante su vida útil.
- **Uso editorial:** pedir evidencia de seguridad y responsabilidades de soporte tanto en soluciones comerciales como específicas. Que el software sea propio o contratado no demuestra seguridad por sí mismo.
- **Límite:** es orientación sobre seguridad y compra, no certificación de un proveedor, verificación de una aplicación ni prueba cuantitativa de rentabilidad. No derivar una obligación general de alojar todos los datos en Australia.

### T3. Microsoft — Overview of application lifecycle management with Microsoft Power Platform

- **URL:** [Overview of application lifecycle management with Microsoft Power Platform](https://learn.microsoft.com/en-us/power-platform/alm/overview-alm).
- **Última actualización visible:** 29 de enero de 2025.
- **Cuerpo leído:** definición ALM, áreas de gobierno/desarrollo/mantenimiento, soluciones y control de versiones; líneas de consulta 32–51.
- **Hechos verificables sobre la documentación:** ALM incluye requisitos, arquitectura, pruebas, mantenimiento, soporte, cambios, despliegue y gobierno. Su alcance incluye Power Apps y Power Automate. La guía contempla acceso, datos, revisión de cambios y reversión, así como tecnologías dependientes.
- **Uso editorial:** una aplicación hecha con herramientas visuales sigue necesitando un responsable y gestión durante su uso. La herramienta cambia cómo se construye; no hace desaparecer el ciclo de vida.
- **Límite:** es documentación del ecosistema Microsoft. No imponer Dataverse, Azure DevOps ni una estructura corporativa compleja a todo proyecto. Apareció un aviso genérico de autorización, pero el cuerpo citado estaba disponible y fue leído.

### T4. Microsoft — What is Power Apps?

- **URL:** [What is Power Apps?](https://learn.microsoft.com/en-us/power-apps/powerapps-overview).
- **Última actualización visible:** 18 de noviembre de 2025.
- **Cuerpo leído:** descripción del producto, creadores y extensibilidad para desarrolladores; líneas de consulta 31–35 y 43–69.
- **Hechos verificables sobre el producto:** Microsoft presenta Power Apps como un entorno para crear aplicaciones empresariales personalizadas, incluidas aplicaciones sin escribir código. También documenta extensiones mediante código, lógica, conectores y datos externos.
- **Uso editorial:** demuestra con un ejemplo real que «personalizado» no implica escribir desde cero cada componente. Low-code es una forma posible de desarrollar aplicaciones específicas; no una categoría necesariamente opuesta al software a medida.
- **Límite:** la página es del fabricante y contiene lenguaje promocional sobre rapidez. No convertirlo en una promesa de entrega, rendimiento o ahorro. No es una recomendación de comprar Power Apps. Cuerpo disponible pese al aviso genérico de autorización.

### T5. Microsoft — Custom connectors overview

- **URL:** [Custom connectors overview](https://learn.microsoft.com/en-us/connectors/custom-connectors/).
- **Última actualización visible:** 27 de agosto de 2026.
- **Cuerpo leído:** ciclo de vida del conector, API/autenticación, definición, conexión y cambios; líneas de consulta 30–99.
- **Hechos verificables sobre el producto:** los conectores personalizados permiten trabajar con servicios no cubiertos por conectores predefinidos. La documentación requiere API, acceso autenticado y una definición de operaciones. Describe tareas cuando cambian campos de la API.
- **Uso editorial:** un pequeño componente de integración puede resolver un hueco sin sustituir todos los sistemas. La viabilidad se comprueba con las interfaces y permisos reales; «se puede hacer a medida» no significa «se conecta con todo».
- **Límite:** no todas las plataformas ofrecen las mismas opciones. La existencia de una API no confirma que permita el dato o la acción requerida. El blog no debe repetir capacidades del producto como garantías universales ni publicar instrucciones antiguas de autenticación. Cuerpo disponible pese al aviso genérico de autorización.

### T6. Microsoft Azure Well-Architected — Performance Efficiency design principles

- **URL:** [Performance Efficiency design principles](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/principles).
- **Última actualización visible:** 1 de agosto de 2025.
- **Cuerpo leído:** objetivos, capacidad, sostenimiento del rendimiento y mejora; líneas de consulta 31–110.
- **Hechos verificables sobre la guía:** recomienda objetivos ligados a necesidades de negocio, previsión de demanda, medición, validación del diseño y seguimiento continuado. Examina el sistema completo y sus dependencias, y reconoce que los cambios pueden modificar el rendimiento.
- **Uso editorial:** presentar capacidad de adaptación como una posibilidad que se diseña y valida. Para afirmar que una solución puede crecer, pedir escenarios de carga, datos y medidas, no la etiqueta «custom».
- **Límite:** es guía de arquitectura Azure, no estudio comparativo entre software comercial y específico. No promete crecimiento ilimitado, ausencia de caídas ni que usar la nube resuelva automáticamente la capacidad. Cuerpo disponible pese al aviso genérico de autorización.

## Síntesis editorial para el manuscrito

Estas son recomendaciones razonadas a partir de las fuentes, no hechos demostrados sobre un cliente o mandatos universales:

| Pregunta de negocio | Opciones que conviene comparar | Evidencia práctica antes de elegir |
| --- | --- | --- |
| Una función existente parece insuficiente | Configuración y uso correcto antes de sustituir | Prueba con un caso representativo, incluidos permisos y excepciones |
| Dos herramientas no comparten información suficiente | Conector disponible, extensión o integración específica | Datos y acciones permitidos; prueba del recorrido; responsable de cambios |
| Una interacción o regla esencial no existe en el mercado | Extender una herramienta o construir un componente acotado | Ejemplos reales de la necesidad; prototipo; condiciones de aceptación |
| Se prevé más trabajo, usuarios o datos | Revisar capacidad de cualquier opción | Carga esperada y experiencia aceptable; dependencias; validación |
| Se ofrece control o independencia | Revisar propiedad contractual y capacidad operativa | Quién modifica y despliega; documentación; acceso; exportación y soporte |

No presentar las filas como una secuencia obligatoria que siempre deba agotarse. Una restricción contractual o una función crítica puede descartar pronto una alternativa. No equiparar una necesidad específica con la obligación de desarrollar un sistema completo.

## Ventajas posibles y condiciones que las hacen defendibles

- **Mejor ajuste al trabajo:** describir qué decisión, paso o experiencia mejora. Exige comprender el trabajo y comprobarlo con quienes lo realizan. No basta «nuestro negocio es único».
- **Menos traspasos o duplicación:** atribuirlo a un diseño concreto y a una integración viable; no a la palabra «custom».
- **Más capacidad de evolucionar:** depende de arquitectura, documentación, acceso y recursos. Código disponible sin capacidad de mantenerlo puede no ofrecer control práctico.
- **Una experiencia propia:** puede ser valiosa cuando el recorrido diferenciador lo justifica; no implica reconstruir componentes comunes como autenticación, pagos o contabilidad.
- **Capacidad para crecer:** se formula respecto de una carga y una experiencia objetivo, y se valida. También puede lograrse con productos comerciales bien elegidos.

## Afirmaciones que deben eliminarse o condicionarse

| Afirmación | Problema | Formulación defendible |
| --- | --- | --- |
| Custom software is more secure | No existe comparación de amenazas, controles ni implementación | Security depends on design, delivery and ongoing operation; assess the actual solution |
| It scales automatically with your business | Omite capacidad, coste y dependencias | It can be designed for expected growth, with stated targets and testing |
| It integrates seamlessly with any tool | No comprueba acceso ni interfaces | It may connect the systems you need if their available interfaces and permissions support the workflow |
| Low-code is not custom software | Confunde medio de desarrollo con ajuste a una necesidad | Custom applications can use low-code, code or a combination |
| You own everything | Requiere contrato y revisión de componentes/licencias | Agree what is owned, licensed and accessible, and how the system can be maintained or transferred |
| No more vendor lock-in | Sigue habiendo dependencias técnicas y de servicio | Compare dependencies and exit options for every alternative |
| Pay once and avoid subscriptions | Omite operación, soporte y componentes licenciados | Compare full lifecycle costs and continuing commitments |

## Límites de esta investigación

No se identificó evidencia primaria que establezca un umbral universal de tamaño empresarial, número de empleados, ahorro, coste de desarrollo o plazo que haga preferible construir. No se verificaron precios, estimaciones de entrega, certificaciones, garantías de integración ni resultados propios de Ranking Rebels. Ninguna fuente autoriza atribuir casos hipotéticos a la empresa.

Las fuentes del fabricante prueban capacidades y prácticas documentadas en su ecosistema; no prueban superioridad económica de una categoría. La guía de GDS aporta un razonamiento útil, pero sus reglas de compra pública no son obligaciones australianas. Para publicar afirmaciones jurídicas específicas sobre propiedad intelectual, privacidad o contratos en Australia se requiere contraste separado con fuentes australianas y alcance preciso.

## Comprobaciones fallidas que no se citan como evidencia

Dos rutas de documentación de rendimiento de Power Platform (`reliability/design-scale` y `performance-efficiency/scale-performance`) devolvieron error y no se usaron. Se sustituyeron por la página real de principios de eficiencia de Azure T6. También se abrió una guía introductoria de tecnología de GDS, pero no se incluye entre las seis fuentes principales para evitar duplicar la base del argumento.

## Auditoría técnica del manuscrito completo

**Texto revisado:** `02-articulo-custom-software-australia.md`, leído completo el 20 de octubre de 2026. Esta revisión cubre las afirmaciones técnicas, el razonamiento de alternativas y el ejemplo. No confirma publicación, implementación, seguridad de una aplicación real, costes ni la interpretación jurídica de la cláusula sobre contratistas.

### Hallazgos priorizados

No se encontró un error crítico ni un error importante demostrado dentro del alcance técnico revisado. Las dos oportunidades siguientes son recomendaciones de precisión, no afirmaciones falsas ya identificadas:

| Gravedad | Pasaje | Evaluación y evidencia | Solución recomendada |
| --- | --- | --- | --- |
| Menor, útil para el ejemplo | “The existing job system remains the authoritative source for job details” y “the latest approved scope and the documents relevant to their jobs” | La elección de fuente está bien delimitada y se declara hipotética. Sin embargo, el ejemplo empieza con documentos exigidos por diferentes contratos y una lista externa; conviene distinguir la fuente de los datos de trabajo de la fuente de los requisitos documentales. GDS T1 pide comprobar el flujo real; Microsoft T5 exige operaciones y datos concretos para la integración. Ninguna fuente demuestra que el sistema hipotético ya almacene esas reglas. | Añadir, como criterio del ejemplo, que se acuerde dónde se mantienen las reglas documentales por contrato y quién actualiza su versión. No atribuir automáticamente esa capacidad al sistema de gestión de trabajos. |
| Menor, ampliación opcional | “Confirm supported extension points, data access, upgrade compatibility and who supports each part” | Es técnicamente correcto, pero “data access” puede sonar suficiente para resolver una integración. La existencia de una interfaz no confirma acceso a la operación necesaria o capacidad suficiente. T5 describe acceso, autenticación y operaciones; T6 obliga a validar capacidad y dependencias. El manuscrito sí reconoce límites del servicio conectado y pruebas representativas, por lo que no es un fallo material. | Si se desea hacer más concreta esa fila, cambiar “data access” por “access to the required data and actions, usage limits”. No hace falta añadir jerga de APIs ni un tutorial de integraciones. |

### Afirmaciones comprobadas y resultado

- **Comprar/configurar/extender/construir:** no hay falsa dicotomía. El texto contempla combinaciones y limita construir a un requisito material tras evaluar alternativas. Concordante con T1. No convierte obligaciones de compra pública británica en reglas australianas.
- **Low-code:** presenta un método posible para una solución específica y conserva soporte y mantenimiento. Concordante con T3/T4; no promete que cualquiera pueda construir sin preparación o que el resultado sea automáticamente listo para producción.
- **Integración:** habla de información acordada, acceso soportado y detección de fallos. No promete compatibilidad universal. La mejora menor de la tabla ayudaría al lector, pero no corrige una falsedad.
- **Fuente autoritativa:** aparece como una decisión explícita de un caso hipotético, no como hecho sobre un producto real. Evita introducir otra versión editable; aun así, debe precisarse quién mantiene las reglas documentales si se incorpora la mejora sugerida.
- **Exportación y handover:** pide registros, adjuntos, relaciones y contexto; no equipara un botón de exportación o código entregado con portabilidad o soporte garantizados. Adecuado como criterio de contratación y aceptación. La prueba propuesta es para un propósito acordado, no garantía general de migración.
- **Seguridad:** rechaza “custom = secure”, formula preguntas de responsabilidad y contempla operación posterior. Concordante con T2. No se verifica una solución particular ni se promete cumplimiento automático.
- **Rendimiento:** sustituye “escalable” por carga, concurrencia, volumen, tiempos y costes, y reconoce límites de dependencias. Concordante con T6. No sugiere crecimiento ilimitado ni resultados medidos de Ranking Rebels.
- **Propiedad:** el texto separa derechos de acceso operativo. La afirmación específica de derecho australiano debe cerrarse en la revisión de la fuente IP Australia; esta auditoría técnica no la certifica.

No se recomienda aumentar extensión por SEO, añadir más beneficios genéricos ni desarrollar un tutorial técnico. Las secciones que funcionan ya ofrecen decisiones y condiciones concretas. La falta de cambios obligatorios en esta revisión no equivale a validar costes, contratos, clientes o páginas publicadas que no se han examinado.
