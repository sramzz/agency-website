(() => {
  const links = [...document.querySelectorAll('.blog-toc li a')];
  const headings = [...document.querySelectorAll('.blog-article h2')];
  if ('IntersectionObserver' in window) {
    const visible = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
      const current = headings.find(heading => visible.has(heading));
      if (!current) return;
      links.forEach(link => {
        if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-90px 0px -45% 0px' });
    headings.forEach(heading => observer.observe(heading));
  }
  document.querySelectorAll('.blog-mobile-toc a').forEach(link => {
    link.addEventListener('click', event => {
      const heading = document.getElementById(link.hash.slice(1));
      if (!heading) return;
      event.preventDefault();
      link.closest('details').open = false;
      history.replaceState(null, '', link.hash);
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      heading.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  });
})();
