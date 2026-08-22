(() => {
  const proposalId = "titanium-gym-9c42e7";
  const fields = [...document.querySelectorAll("[data-edit-key]")];

  fields.forEach((field) => {
    const key = `${proposalId}:${field.dataset.editKey}`;
    const saved = window.localStorage.getItem(key);
    if (saved) field.textContent = saved;

    field.addEventListener("input", () => {
      window.localStorage.setItem(key, field.textContent.trim());
    });

    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        field.blur();
      }
    });
  });

  document.querySelector("[data-reset-edits]")?.addEventListener("click", () => {
    fields.forEach((field) => {
      window.localStorage.removeItem(`${proposalId}:${field.dataset.editKey}`);
    });
    window.location.reload();
  });

  const dialog = document.querySelector("[data-evidence-dialog]");
  const triggers = [...document.querySelectorAll("[data-evidence-src]")];

  if (dialog && triggers.length) {
    const image = dialog.querySelector("[data-evidence-image]");
    const title = dialog.querySelector("[data-evidence-title]");
    const caption = dialog.querySelector("[data-evidence-caption]");
    const count = dialog.querySelector("[data-evidence-count]");
    const stage = dialog.querySelector(".evidence-lightbox-stage");
    const closeButton = dialog.querySelector("[data-evidence-close]");
    const previousButton = dialog.querySelector("[data-evidence-previous]");
    const nextButton = dialog.querySelector("[data-evidence-next]");
    let currentIndex = 0;
    let lastTrigger = null;

    const showEvidence = (index) => {
      currentIndex = (index + triggers.length) % triggers.length;
      const trigger = triggers[currentIndex];
      const thumbnail = trigger.querySelector("img");

      image.src = trigger.dataset.evidenceSrc;
      image.alt = thumbnail?.alt || "Audit evidence screenshot";
      title.textContent = trigger.dataset.evidenceTitle;
      caption.textContent = trigger.dataset.evidenceCaption;
      count.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(triggers.length).padStart(2, "0")}`;
      stage.scrollTo({ top: 0, left: 0 });
    };

    const openDialog = (trigger, index) => {
      lastTrigger = trigger;
      showEvidence(index);
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    };

    const closeDialog = () => {
      if (typeof dialog.close === "function") dialog.close();
      else {
        dialog.removeAttribute("open");
        lastTrigger?.focus();
      }
    };

    triggers.forEach((trigger, index) => {
      trigger.addEventListener("click", () => openDialog(trigger, index));
    });

    closeButton.addEventListener("click", closeDialog);
    previousButton.addEventListener("click", () => showEvidence(currentIndex - 1));
    nextButton.addEventListener("click", () => showEvidence(currentIndex + 1));

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog();
    });

    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showEvidence(currentIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showEvidence(currentIndex + 1);
      }
    });

    dialog.addEventListener("close", () => lastTrigger?.focus());
  }
})();
