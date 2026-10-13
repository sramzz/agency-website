(() => {
  const card = document.querySelector('.solutions-hero-signal');
  const flow = card.querySelector('.solutions-signal-flow');
  const steps = [...flow.querySelectorAll('.solutions-signal-step')];
  const picker = document.querySelector('.proto-picker');
  const buttons = [...picker.querySelectorAll('[data-variant]')];
  const highlight = picker.querySelector('.proto-picker-highlight');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ns = 'http://www.w3.org/2000/svg';
  const duration = 6600;
  let current = 3, animations = [], visible = true;
  function path(d) {
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', d); p.setAttribute('pathLength', '100');
    return p;
  }
  const arcs = steps.map(step => {
    const svg = document.createElementNS(ns, 'svg');
    svg.classList.add('paired-ring'); svg.setAttribute('viewBox', '0 0 40 40');
    svg.setAttribute('aria-hidden', 'true');
    const right = path('M20 2 A18 18 0 0 1 20 38');
    const left = path('M20 2 A18 18 0 0 0 20 38');
    svg.append(left, right);
    const number = document.createElement('span');
    number.className = 'paired-number'; number.textContent = step.textContent;
    number.setAttribute('aria-hidden', 'true'); step.append(svg, number);
    return [left, right, number];
  });
  const layer = document.createElementNS(ns, 'svg');
  layer.classList.add('paired-links'); layer.setAttribute('aria-hidden', 'true');
  flow.prepend(layer);
  const links = steps.slice(0, -1).map(() => { const p = path('M0 0 L0 1'); layer.append(p); return p; });
  function geometry() {
    const base = flow.getBoundingClientRect();
    const rects = steps.map(step => step.getBoundingClientRect());
    layer.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
    flow.style.setProperty('--paired-line-top', (rects[0].top + rects[0].height / 2 - base.top) + 'px');
    flow.style.setProperty('--paired-line-bottom', (base.bottom - rects[2].top - rects[2].height / 2) + 'px');
    links.forEach((link, i) => {
      const r = rects[i];
      const x = r.left + r.width / 2 - base.left;
      const start = r.bottom - base.top;
      const end = rects[i + 1].top - base.top;
      link.setAttribute('d', `M${x} ${start} L${x} ${end}`);
    });
  }
  const frame = (offset, values) => ({ offset, ...values });
  function animate(el, frames) {
    if (!reduced.matches) animations.push(el.animate(frames, { duration, iterations: Infinity, easing: 'linear' }));
  }
  function trace(el, start, end) {
    if (current === 3) {
      // A broad wave: the head reaches the next path while the tail clears behind it.
      el.style.strokeDasharray = '60 160';
      animate(el, [
        frame(0, { strokeDashoffset: 60, opacity: 0 }),
        frame(start, { strokeDashoffset: 60, opacity: 1 }),
        frame(end, { strokeDashoffset: -40, opacity: 1 }),
        frame(end + (end - start) * .6, { strokeDashoffset: -100, opacity: 0 }),
        frame(1, { strokeDashoffset: -100, opacity: 0 })
      ]);
      return;
    }
    const initial = 24, final = -100;
    el.style.strokeDasharray = '24 100';
    animate(el, [
      frame(0, { strokeDashoffset: initial, opacity: 0 }),
      frame(start, { strokeDashoffset: initial, opacity: 1 }),
      frame(end, { strokeDashoffset: final, opacity: 1 }),
      frame(end + .012, { strokeDashoffset: final, opacity: 0 }),
      frame(.96, { strokeDashoffset: final, opacity: 0 }),
      frame(1, { strokeDashoffset: final, opacity: 0 })
    ]);
  }
  function render() {
    animations.forEach(a => a.cancel()); animations = [];
    card.dataset.pairedEnergy = String(current);
    arcs.forEach(([left, right, number], i) => {
      const start = .04 + i * .25, join = start + .13;
      trace(left, start, join); trace(right, start, join);
      animate(number, [frame(0, { opacity: 0 }), frame(start, { opacity: 0 }),
        frame(join, { opacity: 1 }), frame(join + .055, { opacity: 1 }),
        frame(join + .12, { opacity: 0 }), frame(1, { opacity: 0 })]);
      if (links[i]) trace(links[i], join, join + .12);
    });
    // All paths share one clock so both halves merge before the connector starts.
    if (animations.length) {
      const origin = document.timeline.currentTime;
      animations.forEach(a => { a.startTime = origin; });
    }
    pauseIfNeeded();
  }
  function pauseIfNeeded() {
    animations.forEach(a => { if (document.hidden || !visible) a.pause(); else if (a.playState === 'paused') a.play(); });
  }
  function select(value) {
    current = value;
    buttons.forEach(b => { const active = Number(b.dataset.variant) === current;
      b.toggleAttribute('data-active', active); if (active) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    const active = buttons.find(b => Number(b.dataset.variant) === current);
    highlight.style.width = active.offsetWidth + 'px'; highlight.style.transform = `translateX(${active.offsetLeft}px)`;
    const url = new URL(location); url.searchParams.set('v', current); url.searchParams.set('revision', 'wave-flow');
    history.replaceState(null, '', url); geometry(); render();
  }
  buttons.forEach(b => b.addEventListener('click', () => select(Number(b.dataset.variant))));
  picker.querySelector('.proto-picker-replay').addEventListener('click', render);
  document.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.target.isContentEditable || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === '2' || e.key === '3') select(Number(e.key));
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') select(current === 3 ? 2 : 3);
    if (e.key.toLowerCase() === 'r') render();
  });
  new ResizeObserver(geometry).observe(flow);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; pauseIfNeeded(); }, { threshold: .1 }).observe(card);
  document.addEventListener('visibilitychange', pauseIfNeeded); reduced.addEventListener('change', render);
  window.addEventListener('resize', () => {
    const b = buttons.find(b => Number(b.dataset.variant) === current);
    highlight.style.width = b.offsetWidth + 'px'; highlight.style.transform = `translateX(${b.offsetLeft}px)`;
  });
  select(Number(new URLSearchParams(location.search).get('v')) === 2 ? 2 : 3);
  document.fonts.ready.then(geometry);
  requestAnimationFrame(() => requestAnimationFrame(() => picker.setAttribute('data-ready', '')));
})();
