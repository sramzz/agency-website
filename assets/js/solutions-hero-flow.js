(() => {
  const card = document.querySelector('.solutions-hero-signal');
  if (!card || card.dataset.pairedEnergy) return;
  const flow = card.querySelector('.solutions-signal-flow');
  const steps = [...flow.querySelectorAll('.solutions-signal-step')];
  if (steps.length !== 3) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ns = 'http://www.w3.org/2000/svg';
  const duration = 6600;
  let animations = [], visible = true;

  function path(d) {
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', d);
    p.setAttribute('pathLength', '100');
    return p;
  }
  const arcs = steps.map(step => {
    const svg = document.createElementNS(ns, 'svg');
    svg.classList.add('paired-ring');
    svg.setAttribute('viewBox', '0 0 40 40');
    svg.setAttribute('aria-hidden', 'true');
    const right = path('M20 2 A18 18 0 0 1 20 38');
    const left = path('M20 2 A18 18 0 0 0 20 38');
    svg.append(left, right);
    const number = document.createElement('span');
    number.className = 'paired-number';
    number.textContent = step.textContent;
    number.setAttribute('aria-hidden', 'true');
    step.append(svg, number);
    return [left, right, number];
  });
  const layer = document.createElementNS(ns, 'svg');
  layer.classList.add('paired-links');
  layer.setAttribute('aria-hidden', 'true');
  flow.prepend(layer);
  const links = steps.slice(0, -1).map(() => {
    const p = path('M0 0 L0 1');
    layer.append(p);
    return p;
  });
  function geometry() {
    const base = flow.getBoundingClientRect();
    const rects = steps.map(step => step.getBoundingClientRect());
    layer.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
    flow.style.setProperty('--paired-line-top', (rects[0].top + rects[0].height / 2 - base.top) + 'px');
    flow.style.setProperty('--paired-line-bottom', (base.bottom - rects[2].top - rects[2].height / 2) + 'px');
    links.forEach((link, i) => {
      const r = rects[i];
      const x = r.left + r.width / 2 - base.left;
      link.setAttribute('d', `M${x} ${r.bottom - base.top} L${x} ${rects[i + 1].top - base.top}`);
    });
  }
  const frame = (offset, values) => ({ offset, ...values });
  function animate(el, frames) {
    if (!reduced.matches) animations.push(el.animate(frames, { duration, iterations: Infinity, easing: 'linear' }));
  }
  function trace(el, start, end) {
    el.style.strokeDasharray = '60 160';
    animate(el, [
      frame(0, { strokeDashoffset: 60, opacity: 0 }),
      frame(start, { strokeDashoffset: 60, opacity: 1 }),
      frame(end, { strokeDashoffset: -40, opacity: 1 }),
      frame(end + (end - start) * .6, { strokeDashoffset: -100, opacity: 0 }),
      frame(1, { strokeDashoffset: -100, opacity: 0 })
    ]);
  }
  function render() {
    animations.forEach(a => a.cancel());
    animations = [];
    arcs.forEach(([left, right, number], i) => {
      const start = .04 + i * .25, join = start + .13;
      trace(left, start, join);
      trace(right, start, join);
      animate(number, [frame(0, { opacity: 0 }), frame(start, { opacity: 0 }),
        frame(join, { opacity: 1 }), frame(join + .055, { opacity: 1 }),
        frame(join + .12, { opacity: 0 }), frame(1, { opacity: 0 })]);
      if (links[i]) trace(links[i], join, join + .12);
    });
    // Both halves arrive together; the connector starts at their meeting point.
    const origin = document.timeline.currentTime;
    animations.forEach(a => { a.startTime = origin; });
    pauseIfNeeded();
  }
  function pauseIfNeeded() {
    animations.forEach(a => {
      if (document.hidden || !visible) a.pause();
      else if (a.playState === 'paused') a.play();
    });
  }
  card.dataset.pairedEnergy = '3';
  new ResizeObserver(geometry).observe(flow);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    pauseIfNeeded();
  }, { threshold: .1 }).observe(card);
  document.addEventListener('visibilitychange', pauseIfNeeded);
  reduced.addEventListener('change', render);
  geometry();
  render();
  document.fonts.ready.then(geometry);
})();
