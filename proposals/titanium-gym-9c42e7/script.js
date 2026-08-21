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
})();
