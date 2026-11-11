# Enlaces del índice de blogs

Decisión del usuario, 27 de octubre de 2026: retirar la flecha diagonal de “Read the article” y usar texto subrayado permanente. En hover y foco de teclado cambia a rojo; al pulsar se refuerza el subrayado.

Se conserva el enlace nativo de tarjeta completa, con sus destinos, orden, títulos, fechas e imágenes. El subrayado es visible también en móvil sin hover. El foco visible de la tarjeta permanece. No se crean botones anidados o destinos externos.

Propietario de estilos: assets/css/blog.css. Fuente de generación: bloque compartido de tools/publish-blog.cjs. Los cinco módulos de publicación generan el mismo texto sin icono. Se mantiene la paleta y tipografía del runtime aprobado, que prevalece sobre el antiguo Design.md de azul/teal.

El índice usa una versión de CSS actualizada para que el navegador recupere el cambio. No se añaden animaciones o colores nuevos. La transición breve se desactiva con prefers-reduced-motion.

Al crear tarjetas futuras, conservar esta presentación. La petición se refiere a “Read the article” del índice; no modifica automáticamente otros iconos de navegación o CTA.
