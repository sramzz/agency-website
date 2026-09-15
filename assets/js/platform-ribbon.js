(() => {
  const ribbon = document.querySelector('.platform-ribbon');
  if (!ribbon) return;
  const track = ribbon.querySelector('.platform-ribbon-track');
  const group = ribbon.querySelector('.platform-ribbon-group');
  const button = ribbon.querySelector('.platform-ribbon-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const duplicate = group.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.setAttribute('inert', '');
  track.append(duplicate);
  let paused = false;
  const update = () => {
    ribbon.classList.toggle('is-moving', !reducedMotion.matches);
    ribbon.classList.toggle('is-paused', paused);
    button.hidden = reducedMotion.matches;
    button.textContent = paused ? 'Resume animation' : 'Pause animation';
  };
  button.addEventListener('click', () => {
    paused = !paused;
    update();
  });
  reducedMotion.addEventListener('change', update);
  update();
})();
