(function () {
  "use strict";

  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

  const calculateReadingProgress = (scrollTop, scrollHeight, viewportHeight) => {
    const maximumScroll = Math.max(0, scrollHeight - viewportHeight);
    if (maximumScroll === 0) return 0;
    return clamp(scrollTop / maximumScroll, 0, 1);
  };

  const initialiseReadingProgress = () => {
    if (document.querySelector(".reading-progress")) return;

    const progress = document.createElement("div");
    progress.className = "reading-progress";
    progress.setAttribute("aria-hidden", "true");

    const bar = document.createElement("div");
    bar.className = "reading-progress__bar";
    progress.append(bar);
    document.body.append(progress);

    const header = document.querySelector(".site-header, .proposal-topbar, .topbar");
    let animationFrame;

    const render = () => {
      animationFrame = undefined;

      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const scrollTop = Math.max(
        0,
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      const readingProgress = calculateReadingProgress(scrollTop, documentHeight, window.innerHeight);
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0;

      progress.style.setProperty("--reading-progress-top", `${Math.max(0, Math.round(headerBottom))}px`);
      bar.style.transform = `scaleX(${readingProgress})`;
    };

    const scheduleRender = () => {
      if (animationFrame !== undefined) return;
      animationFrame = window.requestAnimationFrame(render);
    };

    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", scheduleRender, { passive: true });
    window.addEventListener("load", scheduleRender, { once: true });

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(scheduleRender);
      resizeObserver.observe(document.documentElement);
      if (header) resizeObserver.observe(header);
    }

    scheduleRender();
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { calculateReadingProgress };
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initialiseReadingProgress, { once: true });
    } else {
      initialiseReadingProgress();
    }
  }
})();
