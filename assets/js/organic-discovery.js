(() => {
  const hero = document.querySelector(".od-hero");
  const heroStory = document.querySelector(".od-hero-signal");
  const queryCard = heroStory?.querySelector(".od-query-card");
  const queryText = heroStory?.querySelector("[data-od-query]");
  const stickyCta = document.querySelector("[data-organic-sticky-cta]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const typingDelay = 950;
  const characterDelay = 80;
  const fullQuery = queryText?.dataset.odQuery || "";
  let characterTimer;

  const stopTyping = () => {
    window.clearTimeout(characterTimer);
    queryText?.classList.remove("is-typing");
  };

  const typeQuery = () => {
    if (!queryText || reducedMotion.matches) return;

    window.clearTimeout(characterTimer);
    queryText.textContent = "";
    queryText.classList.add("is-typing");
    let characterIndex = 0;

    const typeNextCharacter = () => {
      characterIndex += 1;
      queryText.textContent = fullQuery.slice(0, characterIndex);

      if (characterIndex < fullQuery.length) {
        characterTimer = window.setTimeout(typeNextCharacter, characterDelay);
      } else {
        queryText.classList.remove("is-typing");
      }
    };

    characterTimer = window.setTimeout(typeNextCharacter, typingDelay);
  };

  const startStory = () => {
    heroStory?.classList.add("is-story-active");
    stopTyping();

    if (!queryText || reducedMotion.matches) {
      if (queryText) queryText.textContent = fullQuery;
      return;
    }

    typeQuery();
  };

  const stopStory = () => {
    heroStory?.classList.remove("is-story-active");
    stopTyping();
    if (queryText) queryText.textContent = fullQuery;
  };

  queryCard?.addEventListener("animationiteration", (event) => {
    if (event.animationName === "od-query-stage" && heroStory?.classList.contains("is-story-active")) {
      typeQuery();
    }
  });

  if (!("IntersectionObserver" in window)) {
    startStory();
    return;
  }

  if (heroStory) {
    const storyObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startStory();
        else stopStory();
      },
      { threshold: 0.3 },
    );

    storyObserver.observe(heroStory);
  }

  if (!hero || !stickyCta) return;

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
