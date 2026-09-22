(() => {
  const hero = document.querySelector(".pa-hero");
  const stickyCta = document.querySelector("[data-paid-sticky-cta]");

  if (!hero || !stickyCta || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      const shouldShow = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      stickyCta.hidden = !shouldShow;
      stickyCta.classList.toggle("is-visible", shouldShow);
    },
    { threshold: 0.08 },
  );

  observer.observe(hero);
})();
