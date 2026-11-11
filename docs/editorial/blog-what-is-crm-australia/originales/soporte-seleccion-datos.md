# Soporte: elegir, probar y migrar un CRM

**Investigación nueva: 23 de octubre de 2026, Australia/Sydney.** Nota de apoyo para el blog 13. Seis fuentes primarias consultadas; no se accedió a cuentas, importó información, ejecutó un piloto ni publicó contenido. La revisión de OAIC/ACMA pertenece al dossier principal y queda fuera de esta nota.

## Conclusión editorial

Elegir por el recorrido de una consulta: entrada, responsable, presupuesto, siguiente acción y cierre. Una demostración comercial debería permitir reproducir ese recorrido con ejemplos ficticios. La cantidad de funciones o la etiqueta «AI CRM» no acredita adecuación. Este es un criterio editorial, no un resultado experimental ni una recomendación de proveedor. HubSpot se utiliza para documentar límites concretos de producto; las cinco páginas de ese fabricante no constituyen una comparativa de mercado.

## 1. Necesidad antes que plataforma

**Hechos verificados.** business.gov.au recomienda vincular las herramientas a objetivos, distinguir funciones imprescindibles y opcionales, calcular el coste total de propiedad, probar antes de comprar y formar al personal antes de necesitar la herramienta. También aconseja revisar después el uso y la utilidad. La fuente aborda herramientas digitales en general; no establece un número de contactos a partir del cual sea obligatorio comprar un CRM. [Digital tools for business](https://business.gov.au/online-and-digital/digital-tools-for-business), apartados «Things to do before…», «Compare the value…» y «Tell staff…».

**Aplicación editorial.** Una hoja compartida puede ser suficiente si una persona mantiene un proceso sencillo y puede identificar cada consulta pendiente, su estado y la próxima acción. Conviene evaluar un CRM cuando los traspasos, seguimientos e historiales resultan difíciles de mantener. Son señales para investigar, no umbrales universales. Antes de cambiar, escribir qué problema concreto debe resolver la nueva herramienta y qué trabajo seguirá haciendo el equipo.

## 2. Coste, licencias y uso real

**Hechos verificados.** El catálogo de HubSpot distingue ediciones y tipos de asiento. En Sales Hub diferencia Core Seat y Sales Seat; Professional y Enterprise muestran onboarding obligatorio con cargo adicional y canales de soporte que varían por edición. Esto demuestra una estructura comercial específica, no un coste representativo del sector. [Product & Services Catalog](https://legal.hubspot.com/hubspot-product-and-services-catalog/products), «Sales Hub Pricing» y «Sales Hub Features».

**Recomendación editorial.** Comparar el coste del alcance necesario: usuarios que editarán, administrarán o solo consultarán; limpieza y migración; configuración; formación; conexión con formularios, correo y presupuestos; mantenimiento y salida. Pedir confirmación escrita de funciones incluidas, límites, soporte, compromiso contractual y condiciones de renovación. Probar con los permisos del usuario cotidiano, además del administrador. No publicar una tarifa promocional como presupuesto australiano completo: esta nota no fija precios, moneda, impuestos ni un proveedor ganador.

## 3. Qué significa «se integra»

**Hechos verificados.** La documentación de data sync de HubSpot explica que los mapeos determinan datos, dirección y tratamiento de conflictos. Los mapeos personalizados requieren determinadas suscripciones Data Hub. No todos los desplegables admiten sincronización bidireccional; también existen límites por campos de solo lectura y API de terceros. Para sincronizar propietarios, estos deben existir como usuarios en ambas aplicaciones. [Understand your data sync field mappings](https://knowledge.hubspot.com/integrations/understand-your-data-sync-field-mappings), apartados iniciales, «Review default…» y «Owner properties».

**Prueba propuesta.** Revisar la integración exacta, no el logotipo de la aplicación. Con datos sintéticos, comprobar qué ocurre al crear y modificar un contacto, cambiar un responsable y actualizar un estado desde cada extremo. Definir qué sistema manda ante discrepancias y quién resuelve los fallos. Esta propuesta no acredita que una conexión concreta de Ranking Rebels esté disponible, contratada o probada.

## 4. Importación: relaciones y duplicados

**Hechos verificados.** HubSpot exige identificadores únicos para actualizar registros y evitar duplicados: Record ID o una propiedad única; admite además Email para contactos y Company domain name para empresas. Las asociaciones necesitan relacionar identificadores de los registros. La documentación incluye comportamientos particulares para importaciones de varios objetos y advierte del riesgo de duplicados cuando faltan identificadores. No significa que todos los CRM resuelvan duplicados igual. [Format import files](https://knowledge.hubspot.com/import-and-export/set-up-your-import-file), «Requirements to update existing records or avoid duplicates» y «Requirements to associate records».

**Plan editorial de piloto.** Conservar el origen, definir campos y estados, resolver registros conflictivos y probar un lote pequeño identificado. Incluir deliberadamente un contacto con dos consultas y una consulta con varias actividades para comprobar relaciones. Reconciliar creados, actualizados, errores y asociaciones; comprobar también ejemplos individuales. Acordar cómo detener la prueba y recuperar el trabajo antes de ampliar. «Reversible» describe ese plan verificado: una función de deshacer o borrar el lote no garantiza restaurar campos sobrescritos o efectos externos.

## 5. Exportar no equivale a restaurar

**Hechos verificados.** Export records de HubSpot descarga valores actuales de propiedades y asociaciones. Por defecto exporta lo incluido en la vista, con hasta mil identificadores asociados por columna; ofrece seleccionar todas las asociaciones en CSV. Para actividades como llamadas o notas remite a otras vías: datos individuales, ciertos informes o API. También exige permiso de exportación. [Export your records](https://knowledge.hubspot.com/import-and-export/export-records), introducción, «Export records» y opciones de personalización.

**Consecuencia editorial.** No llamar «copia completa» al CSV de contactos. Antes de migrar o cancelar, inventariar contactos, consultas, empresas, actividades, archivos y relaciones; confirmar cómo se obtiene cada elemento y qué formato conserva. Exigir una comprobación de lectura y reconstrucción del alcance necesario. La página leída no demuestra restauración integral, conservación de adjuntos o traslado de configuraciones y automatizaciones. Tampoco demuestra que esas capacidades sean imposibles por otras herramientas: quedan pendientes de verificación específica.

## 6. Automatización con reglas y soporte

**Hechos verificados.** La página de workflows de HubSpot exige permisos Super Admin o Workflows para crear y editar; documenta criterios por eventos o filtros. Por defecto, los registros entran cuando cumplen por primera vez los criterios, salvo entrada manual; repetir la entrada requiere configuración. Las suscripciones indicadas para esa herramienta son Professional o Enterprise, con excepciones documentadas. [Set your workflow enrollment triggers](https://knowledge.hubspot.com/workflows/set-your-workflow-enrollment-triggers), «Understand limits and requirements» y «Types of enrollment triggers».

**Aplicación editorial.** Empezar con una regla verificable, por ejemplo generar una tarea interna cuando un presupuesto necesite revisión. Definir responsable, condición de entrada, exclusiones, plazo y respuesta al error. Probar una respuesta recibida, un registro duplicado y una consulta cerrada antes de activar seguimientos. Asignar a alguien la revisión de tareas y fallos. Un asistente que proponga reglas no sustituye estas decisiones ni demuestra que un seguimiento sea apropiado para cada cliente.

## Pendientes que el artículo debe conservar

No hay evaluación de herramientas, tiempos ahorrados, tasas de cierre ni costes reales de Ranking Rebels. Faltan inventario de aplicaciones, requisitos del equipo, alcance de datos, permisos, pruebas de recuperación y validación humana. Las capacidades citadas corresponden a páginas consultadas en esta fecha; comprobar edición y documentación vigente al implementar. El manuscrito puede recomendar organizar el seguimiento y medir el piloto; no puede prometer ventas, migración sin pérdidas o automatización autónoma basándose en esta nota.
