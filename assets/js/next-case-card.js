(() => {
  'use strict';

  const card = document.querySelector('[data-next-case-card]');
  const contact = document.querySelector('.next-case-copy [data-lead-capture]');
  const layer = card?.querySelector('.next-case-particles');
  const shell = card?.closest('.next-case-card-shell');
  if (!card || !contact || !layer || !shell) return;

  const lead = window.RankingRebelsLead;
  if (lead) {
    const destination = new URL(contact.href);
    destination.searchParams.set('text', lead.buildWhatsAppMessage([]));
    contact.href = destination.href;
  }

  card.addEventListener('click', () => {
    contact.click();
    const dialog = document.getElementById('rr-lead-capture-dialog');
    if (dialog && dialog.open) {
      dialog.addEventListener('close', () => card.focus({ preventScroll: true }), { once: true });
    }
  });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 560px)');
  const highContrast = matchMedia('(forced-colors: active)');
  const settings = { desktopCount: 16, mobileCount: 8, safeMargin: 18, maxOpacity: 0.46 };
  let particles = [];
  let elapsed = 0;
  let previous = null;
  let frame = null;
  let inView = true;
  let ready = false;
  let pressTimer;

  function lightLogo(active) {
    card.classList.toggle('is-lit', active);
  }

  card.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'touch') lightLogo(true);
  });
  card.addEventListener('pointerleave', () => lightLogo(false));
  card.addEventListener('focus', () => lightLogo(true));
  card.addEventListener('blur', () => lightLogo(false));
  card.addEventListener('pointerdown', () => {
    clearTimeout(pressTimer);
    lightLogo(true);
    pressTimer = setTimeout(() => {
      if (!card.matches(':hover, :focus-visible')) lightLogo(false);
    }, 900);
  });

  function firstContact(start, target, box) {
    let enter = 0;
    let leave = 1;
    for (const axis of ['x', 'y']) {
      const delta = target[axis] - start[axis];
      const low = box[axis];
      const high = box[axis === 'x' ? 'right' : 'bottom'];
      if (Math.abs(delta) < 0.00001) {
        if (start[axis] < low || start[axis] > high) return 1;
      } else {
        const a = (low - start[axis]) / delta;
        const b = (high - start[axis]) / delta;
        enter = Math.max(enter, Math.min(a, b));
        leave = Math.min(leave, Math.max(a, b));
        if (enter > leave) return 1;
      }
    }
    return enter;
  }

  function layout() {
    const rect = card.getBoundingClientRect();
    const boxes = [...card.querySelectorAll('[data-next-case-protected]')].map(element => {
      const protectedRect = element.getBoundingClientRect();
      const margin = settings.safeMargin;
      return {
        x: protectedRect.left - rect.left - margin,
        y: protectedRect.top - rect.top - margin,
        right: protectedRect.right - rect.left + margin,
        bottom: protectedRect.bottom - rect.top + margin,
      };
    });
    const edgeCount = mobile.matches ? settings.mobileCount : settings.desktopCount;
    const cornerCount = 8;
    const extraBottomCount = 2;
    const labelStreamCount = card.matches('.od-discovery-card') ? 2 : 0;
    const labelStreamStart = edgeCount + cornerCount + extraBottomCount;
    const count = labelStreamStart + labelStreamCount;

    layer.replaceChildren();
    particles = Array.from({ length: count }, (_, index) => {
      const corner = index >= edgeCount && index < edgeCount + cornerCount;
      const extraBottom = index >= edgeCount + cornerCount && index < labelStreamStart;
      const labelStream = index >= labelStreamStart;
      const side = index % 4;
      const group = Math.floor(index / 4);
      const fraction = [0.22, 0.40, 0.65, 0.84][group];
      const bottom = extraBottom || (!labelStream && !corner && side === 2);
      const inset = bottom ? 4 : 8 + ((index * 7) % 5);
      const topFraction = mobile.matches ? [0.70, 0.86][group] : [0.50, 0.63, 0.76, 0.88][group];
      let start;

      if (!labelStream && side === 0) start = { x: rect.width * topFraction, y: inset };
      if (!labelStream && side === 1) start = { x: rect.width - inset, y: rect.height * fraction };
      if (!labelStream && side === 2) start = { x: rect.width * [0.14, 0.86, 0.32, 0.68][group], y: rect.height - inset };
      if (!labelStream && side === 3) start = { x: inset, y: rect.height * fraction };
      if (extraBottom) {
        const slot = index - edgeCount - cornerCount;
        start = { x: rect.width * [0.27, 0.73][slot], y: rect.height - inset };
      }
      if (labelStream) {
        const slot = index - labelStreamStart;
        start = {
          x: 9 + slot * 5,
          y: 9 + slot * 5,
        };
      }

      let target = { x: rect.width * 0.5, y: rect.height * 0.57 };
      let waypoints = [];
      if (labelStream) {
        const slot = index - labelStreamStart;
        target = {
          x: start.x + 84 + 12 * slot,
          y: start.y + 72 + 10 * slot,
        };
      }
      if (!labelStream && !corner && !bottom && group === 3 && (side === 1 || side === 3)) {
        waypoints = [{ x: start.x, y: rect.height * 0.70 }];
        target = { x: rect.width * 0.5, y: rect.height * 0.62 };
      }
      if (bottom) {
        const inward = start.x < rect.width * 0.5 ? 18 : -18;
        target = { x: start.x + inward, y: rect.height * 0.62 };
      }
      if (!labelStream && corner) {
        const cornerPosition = index - edgeCount;
        const cornerIndex = cornerPosition % 4;
        const cornerPair = Math.floor(cornerPosition / 4);
        const right = cornerIndex % 2 === 1;
        const lower = cornerIndex >= 2;
        const cornerInset = 9 + cornerPair * 5;
        start = {
          x: right ? rect.width - cornerInset : lower ? cornerInset : 9,
          y: lower ? rect.height - cornerInset : cornerInset,
        };
        if (lower) {
          const destination = card.querySelector(right ? '.next-case-you' : '.next-case-symbol').getBoundingClientRect();
          target = {
            x: destination.left - rect.left + destination.width / 2 + (cornerPair ? 7 : -7),
            y: destination.top - rect.top + destination.height / 2 + (cornerPair ? 5 : -5),
          };
        } else {
          if (cornerIndex === 0) {
            target = {
              x: start.x + 84 + 12 * cornerPair,
              y: start.y + 72 + 10 * cornerPair,
            };
          } else {
            target = {
              x: start.x - 84 - 12 * cornerPair,
              y: start.y + 72 + 10 * cornerPair,
            };
          }
        }
      }

      const segments = [];
      let previousPoint = start;
      let length = 0;
      for (const destination of [...waypoints, target]) {
        const stop = Math.min(1, ...boxes.map(box => firstContact(previousPoint, destination, box)));
        const dx = (destination.x - previousPoint.x) * stop;
        const dy = (destination.y - previousPoint.y) * stop;
        const distance = Math.hypot(dx, dy);
        if (distance > 0) segments.push({ start: previousPoint, dx, dy, distance, offset: length });
        length += distance;
        if (stop < 1) break;
        previousPoint = destination;
      }

      const element = document.createElement('i');
      element.dataset.origin = labelStream ? 'label' : corner ? 'corner' : bottom ? 'bottom' : 'edge';
      element.hidden = length < 24;
      layer.append(element);
      return {
        element,
        start,
        bottom,
        corner: corner || labelStream,
        labelStream,
        segments,
        length,
        duration: labelStream
          ? 4200 + ((index * 733) % 1401)
          : bottom
          ? 3200 + ((index * 937) % 1001)
          : corner
            ? 4200 + ((index * 733) % 1401)
            : 6000 + ((index * 937) % 4001),
        offset: (index * 0.61803398875 + (labelStream ? 0.37 : 0)) % 1,
      };
    });
    render();
  }

  function render() {
    for (const particle of particles) {
      const phase = (elapsed / particle.duration + particle.offset) % 1;
      const pulse = Math.sin(Math.PI * phase);
      const diameter = 1 + (particle.bottom ? 1 : particle.corner ? 1.2 : 2) * pulse;
      const progress = phase;
      const fadeBeforeContent = phase < 0.68 ? 1 : Math.max(0, (0.9 - phase) / 0.22);
      const opacity = particle.length < 24
        ? 0
        : (particle.bottom ? 0.24 : particle.corner ? 0.38 : settings.maxOpacity) * Math.pow(pulse, 1.4) * fadeBeforeContent;
      const distance = progress * particle.length;
      const segment = particle.segments.find(item => distance <= item.offset + item.distance) || particle.segments.at(-1);
      const local = segment ? Math.min(1, (distance - segment.offset) / segment.distance) : 0;
      const x = segment ? segment.start.x + segment.dx * local : particle.start.x;
      const y = segment ? segment.start.y + segment.dy * local : particle.start.y;
      particle.element.style.transform = `translate3d(${x - 1.5}px, ${y - 1.5}px, 0) scale(${diameter / 3})`;
      particle.element.style.opacity = opacity;
    }
  }

  function tick(now) {
    if (previous !== null) elapsed += Math.min(now - previous, 64);
    previous = now;
    render();
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    const disabled = reduced.matches || highContrast.matches;
    layer.hidden = disabled;
    const running = ready && !disabled && !document.hidden && inView;
    if (running && frame === null) {
      previous = null;
      frame = requestAnimationFrame(tick);
    }
    if (!running && frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
      previous = null;
    }
  }

  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  highContrast.addEventListener('change', sync);
  mobile.addEventListener('change', layout);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      sync();
    }).observe(shell);
  }
  if ('ResizeObserver' in window) new ResizeObserver(layout).observe(card);

  const fontsReady = document.fonts?.ready || Promise.resolve();
  fontsReady.then(() => {
    layout();
    ready = true;
    sync();
  });
  sync();
})();
