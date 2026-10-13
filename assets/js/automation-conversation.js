(() => {
  const root = document.querySelector("[data-automation-conversation]");
  if (!root) return;

  const find = (selector) => root.querySelector(selector);
  const toggle = find("[data-conversation-toggle]");
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const phases = ["received", "draft", "review", "sent"];
  const durations = [3200, 3800, 2200, 3600];
  let phase = media.matches ? 3 : 0;
  let playing = !media.matches;
  let inView = !("IntersectionObserver" in window);
  let remaining = durations[phase];
  let startedAt = 0;
  let timer = null;

  function suspend() {
    if (timer === null) return;
    clearTimeout(timer);
    timer = null;
    remaining = Math.max(0, remaining - (performance.now() - startedAt));
  }

  function render(animate = false) {
    root.dataset.phase = phases[phase];
    find("[data-conversation-sender]").textContent = phase === 3 ? "Your team · sent" : "Prepared reply · not sent";
    find("[data-conversation-approval]").textContent = phase === 3 ? "Approved by your team." : "Your team reviews the draft.";
    find("[data-conversation-result]").textContent = phase === 3 ? "The customer has a reply." : "A person has the final say.";
    find("[data-conversation-final-step]").textContent = phase === 3 ? "Approved and sent" : "Your team approves";
    find(".automation-conversation-approval path").setAttribute("d", phase === 3
      ? "m5 12 4 4 10-10"
      : "M8 7a4 4 0 1 0 8 0 4 4 0 1 0-8 0 M4 21v-3c0-5 16-5 16 0v3");
    toggle.setAttribute("data-playback", playing ? "pause" : "play");
    toggle.setAttribute("aria-label", playing ? "Pause enquiry example" : phase === 3 ? "Play enquiry example again" : "Resume enquiry example");

    const target = phase === 0 ? find(".automation-conversation-incoming") : phase === 1 ? find(".automation-conversation-reply") : find(".automation-conversation-approval");
    if (animate && target?.animate) {
      target.getAnimations().forEach((animation) => animation.cancel());
      target.animate(media.matches
        ? [{ opacity: 0.3 }, { opacity: 1 }]
        : [{ opacity: 0.3, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 240, easing: "cubic-bezier(0.23, 1, 0.32, 1)" });
    }
  }

  function schedule() {
    if (timer !== null || !playing || !inView || document.hidden) return;
    startedAt = performance.now();
    timer = setTimeout(() => {
      timer = null;
      phase = (phase + 1) % phases.length;
      remaining = durations[phase];
      render(true);
      schedule();
    }, remaining);
  }

  function restart() {
    suspend();
    root.getAnimations?.({ subtree: true }).forEach((animation) => animation.cancel());
    phase = 0;
    remaining = durations[0];
    playing = true;
    render();
    schedule();
  }

  toggle.addEventListener("click", () => {
    if (!playing && phase === 3 && media.matches) {
      restart();
      return;
    }
    suspend();
    playing = !playing;
    render();
    schedule();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) suspend();
    else schedule();
  });
  media.addEventListener("change", () => {
    suspend();
    root.getAnimations?.({ subtree: true }).forEach((animation) => animation.cancel());
    phase = 3;
    remaining = durations[3];
    playing = false;
    render();
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) schedule();
      else suspend();
    }, { threshold: 0.2 });
    observer.observe(root);
  }

  find(".automation-conversation-controls").hidden = false;
  render();
  schedule();
})();
