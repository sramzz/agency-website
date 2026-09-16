(() => {
  const ribbon = document.querySelector('.platform-ribbon');
  if (!ribbon) return;
  const track = ribbon.querySelector('.platform-ribbon-track');
  const group = ribbon.querySelector('.platform-ribbon-group');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const duplicate = group.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.setAttribute('inert', '');
  track.append(duplicate);
  const update = () => {
    ribbon.classList.toggle('is-moving', !reducedMotion.matches);
  };
  reducedMotion.addEventListener('change', update);
  update();
})();
