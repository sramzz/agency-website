# Plan TDD: captura de leads con Cloudflare y retorno a WhatsApp

## Resumen y decisiones cerradas

- Baseline confirmado: 43/43 pruebas existentes pasan.
- Coolify continúa sirviendo el sitio estático; un Worker separado atiende únicamente `POST /api/leads`.
- Se intervienen 35 CTA comerciales de las 12 páginas públicas y los cuatro selectores de servicios.
- Quedan fuera los enlaces “WhatsApp” del footer, `404.html` y las propuestas privadas.
- WhatsApp abre en una pestaña nueva; si el navegador la bloquea, se usa la pestaña actual.
- Las notificaciones se entregan mediante Cloudflare Queue y Email Service.
- El proyecto usa Workers Free y acepta los 7 días de D1 Time Travel de ese plan.
- `/privacy/` contiene un borrador completo, pero producción queda bloqueada hasta su aprobación.
- El frontend continúa sin bundler; el Worker TypeScript vive en `worker/`.

## Contratos

### `POST /api/leads`

```json
{
  "submissionId": "UUID v4",
  "firstName": "string",
  "lastName": "string",
  "companyName": "string",
  "email": "string",
  "phone": "string",
  "sourcePath": "/locations/australia/",
  "ctaLabel": "Request an Australian search audit",
  "market": "Australia",
  "services": ["Google SEO"],
  "noticeVersion": "2026-09-03",
  "turnstileToken": "string",
  "website": ""
}
```

- `website` es el honeypot y debe estar vacío.
- Límites tras `trim`: nombres 1–80, empresa 1–120, email 254, CTA 1–120, ruta 1–512 y servicio 1–80.
- Mercados: `Australia`, `Netherlands`, `LATAM`, `Not specified`.
- Servicios: los diez valores actuales, sin duplicados.
- Email en minúsculas; teléfono guardado como `+` y 8–15 dígitos.
- Cuerpo máximo 8 KiB, leído incrementalmente.
- Respuesta exitosa: `{ "ok": true, "submissionId": "...", "duplicate": false }`.
- Errores: `invalid_json`, `validation_failed`, `origin_rejected`, `method_not_allowed`, `payload_too_large`, `honeypot_rejected`, `turnstile_rejected`, `storage_unavailable`.
- Todas las respuestas usan `Cache-Control: no-store` y no exponen datos personales o errores internos.
- Se exige HTTPS, hostname permitido y `Origin` idéntico al origen del request.
- Un `submissionId` existente devuelve éxito antes de consumir otro token o encolar correo.
- Turnstile valida `success`, action `lead_capture` y hostname; no recibe `remoteip`.

### D1, Queue y correo

- `leads` guarda el payload normalizado salvo Turnstile/honeypot, más `services_json`, timestamps y estado de notificación.
- `submission_id` es clave primaria; índices en expiración y estado de notificación.
- `expires_at` es `created_at + 365 días`.
- Estados: `pending`, `sending`, `sent`, `failed`; se registran intentos y timestamps, no mensajes con PII.
- Bindings: `DB`, `LEAD_EMAIL_QUEUE`, `EMAIL`; secreto `TURNSTILE_SECRET_KEY`.
- La Queue transporta solamente `{ submissionId }`.
- El correo sale de `leads@forms.rankingrebels.com` hacia `rankingrebelsmarketingagency@gmail.com`.

### Estado del navegador

```json
// localStorage["rr.lead.receipt.v1"]
{ "submissionId": "UUID v4", "submittedAt": "ISO-8601" }

// sessionStorage["rr.lead.session.v1"]
{ "capturedSubmissionId": "UUID v4 o null", "receiptShownSubmissionId": "UUID v4 o null" }
```

- El recibo local caduca a los 30 días; registros inválidos o futuros se eliminan.
- Nunca se almacenan nombre, empresa, email, teléfono, servicios, mercado o mensaje de WhatsApp.
- El bypass dura solo la sesión actual.
- Una sesión nueva muestra la confirmación una vez, pero vuelve a pedir datos al siguiente CTA.
- El retorno se detecta en carga, `pageshow`, `visibilitychange` y `focus` sin duplicar el toast.
- Toast previo: “Details saved — opening WhatsApp…” durante 600 ms.
- Toast de retorno: “Your details were saved successfully.”

## Protocolo de implementación

- Subagentes: `gpt-5.6-luna`, razonamiento `medium`.
- Cada asignación recibe una sola tarea o ciclo TDD acotado y archivos explícitos.
- Ciclo obligatorio: prueba roja, implementación mínima, prueba verde, refactor.
- Los subagentes no despliegan, crean recursos remotos, cambian secretos ni aplican migraciones remotas.
- No se paralelizan trabajos que modifiquen el mismo archivo.
- El orquestador ejecuta pruebas completas y revisa el diff después de cada bloque.

## Tareas atómicas

### A. Preparación

1. Guardar este documento y crear `feat/cloudflare-lead-capture`.
2. Confirmar el baseline 43/43.
3. Crear `worker/` con package, lockfile, TypeScript, Wrangler y Vitest.
4. Añadir scripts de test, watch, typecheck, types, dev, deploy y dry-run.
5. Usar `@cloudflare/vitest-plugin`.
6. Configurar Wrangler con fecha actual, observabilidad, D1, Queue, Email, cron y rutas root/www.
7. Generar tipos de bindings con Wrangler.
8. Ignorar secretos y estado local.

### B. D1 y validación

9. Crear una prueba de migración roja.
10. Crear `0001_create_leads.sql` con checks e índices.
11. Probar clave duplicada e índice de expiración.
12. Probar e implementar borrado de leads vencidos.
13. Confirmar ausencia de IP, user-agent y token en el esquema.
14. Probar e implementar UUID v4.
15. Probar tipos, campos obligatorios y longitudes.
16. Probar e implementar email normalizado.
17. Probar e implementar teléfono internacional normalizado.
18. Probar whitelist de mercados/servicios y deduplicación.
19. Probar rutas relativas seguras.
20. Probar notice version exacta.
21. Probar e implementar lectura incremental de 8 KiB.
22. Probar rechazo temprano del honeypot.

### C. API y protección

23. Probar path, query, método y content type.
24. Implementar routing interno exacto.
25. Probar e implementar mismo origen/HTTPS/hostname.
26. Probar todos los resultados de Siteverify.
27. Implementar Siteverify con timeout e idempotency key.
28. Probar duplicado antes de Turnstile.
29. Probar concurrencia e implementar `INSERT OR IGNORE`.
30. Mapear fallo D1 sin exponer internals.
31. Probar un único mensaje de Queue tras insert nuevo.
32. Probar cero efectos secundarios en duplicados.

### D. Queue, email y cron

33. Probar asunto y cuerpos text/html.
34. Implementar contenido de website lead sin IP/user-agent.
35. Probar mensajes inexistentes y ya enviados.
36. Probar pendiente → sending e incremento de intentos.
37. Probar envío exitoso → sent.
38. Probar fallo → failed + retry.
39. Probar logs sin PII.
40. Configurar retry y dead-letter queue.
41. Probar cron con leads vigentes y vencidos.
42. Reencolar notificaciones estancadas usando solo submissionId.

### E. Estado y controlador del navegador

43. Crear prueba roja para el módulo compartido.
44. Probar recibos válidos, vencidos, futuros y malformados.
45. Implementar almacenamiento seguro de 30 días.
46. Probar registro de sesión.
47. Implementar bypass actual/nueva sesión.
48. Probar que storage nunca contenga PII.
49. Probar UUID estable durante retries.
50. Implementar UUID con Web Crypto.
51. Probar contrato accesible del `<dialog>`.
52. Implementar una instancia dinámica compartida.
53. Probar foco, Escape, cierre y restauración.
54. Implementar Turnstile diferido y explícito.
55. Usar clave de prueba en localhost y clave pública de producción fuera de local.
56. Probar success/expiry/error/reset de Turnstile.
57. Probar validación cliente.
58. Implementar errores asociados y primer campo inválido.
59. Probar pending/`aria-busy` y doble submit.
60. Probar error preservando campos y cerrando popup reservado.
61. Probar que el popup se reserva antes del primer `await`.
62. Implementar pestaña temporal sin PII y sin opener.
63. Probar flujo exitoso completo y espera de 600 ms.
64. Probar fallback si el popup está bloqueado.
65. Probar que el error no abre WhatsApp ni borra datos.
66. Probar los cuatro eventos de retorno.
67. Probar nueva sesión con recibo.
68. Probar bypass en sesión capturada.

### F. Integración y privacidad

69. Marcar exactamente 35 enlaces con `data-lead-capture`.
70. Conservar `data-whatsapp-contact` donde ya existe.
71. Añadir `data-market` a las 12 páginas.
72. Cargar el módulo antes de `script.js` solo en las 12 páginas.
73. Probar que los footers siguen directos.
74. Probar que propuestas y 404 no cambian.
75. Integrar los cuatro selectores con el controlador.
76. Mantener las expectativas actuales de URL/mensaje/routing.
77. Probar bypass desde selector.
78. Probar contratos CSS antes de añadir estilos.
79. Implementar estilos usando el sistema visual existente.
80. Probar layout a 320 px, viewport corto y teclado virtual.
81. Implementar focus visible, contraste y reduced motion.
82. Crear prueba roja de `/privacy/`.
83. Crear el borrador completo de privacidad.
84. Mantener fuera de la copia visible la nota de revisión pendiente.
85. Añadir Privacy Policy a footers públicos.
86. Actualizar inventario público, sitemap y enlaces.
87. Bloquear producción hasta aprobación del texto.

### G. Verificación

88. Ejecutar suite estática completa.
89. Ejecutar tests, typecheck, tipos y dry-run del Worker.
90. Buscar secretos o PII en storage/logs/Queue/fixtures.
91. Verificar teclado, lector, Escape, zoom, 320 px y escritorio.
92. Verificar éxito, retry, popup bloqueado, Back, reload, app switching y bfcache.
93. Comparar los 39 puntos de salida antes/después.
94. Revisar diff, Coolify y capturas desktop/móvil.

## Aprovisionamiento manual y rollout

1. Crear D1 `ranking-rebels-leads` con jurisdicción EU.
2. Crear Queue y DLQ; añadir IDs y aplicar la migración remota.
3. Crear Turnstile Managed para root/www y registrar el secreto.
4. Incorporar `forms.rankingrebels.com`, verificar Gmail y restringir el binding.
5. Configurar WAF: `/api/leads`, 5 requests/10 s/IP, bloqueo 10 s.
6. Desplegar backend antes del frontend.
7. Hacer smoke test real: fila D1, Queue, correo y logs sin PII.
8. Desplegar estáticos mediante Coolify.
9. Vigilar 5xx, Turnstile, DLQ, latencia y rate limiting durante 48 horas.
10. Rollback: revertir frontend; no borrar recursos ni datos.
11. Mantener cron diario, revisión de DLQ, MFA y eliminación trimestral de correos antiguos.

## Criterios de aceptación

- D1 confirma antes del éxito.
- Los fallos conservan campos y ofrecen retry.
- El correo no bloquea la respuesta ni WhatsApp.
- Un submissionId repetido no duplica fila ni mensaje.
- El bypass dura únicamente la sesión actual.
- El recibo de 30 días se muestra una vez por sesión nueva.
- Storage contiene solo IDs y timestamps.
- Enlaces excluidos permanecen directos.
- Número, mensaje, mercado y servicios de WhatsApp no cambian.
- El coste esperado es $0 dentro de los límites gratuitos, sin promesa contractual.
- Producción requiere credenciales reales, Gmail verificado y aprobación de privacidad.
