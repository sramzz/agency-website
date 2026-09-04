(() => {
  const map = document.querySelector(".australia-map");
  if (!map) return;

  const markers = [...map.querySelectorAll(".market-marker")];
  const clearActiveMarker = () => markers.forEach((marker) => marker.classList.remove("is-active"));

  markers.forEach((marker) => {
    marker.addEventListener("pointerenter", clearActiveMarker);
    marker.addEventListener("focus", clearActiveMarker);
    marker.addEventListener("click", () => {
      const shouldActivate = !marker.classList.contains("is-active");
      clearActiveMarker();
      if (shouldActivate) marker.classList.add("is-active");
    });
  });

  document.addEventListener("pointerdown", (event) => {
    if (!event.target.closest?.(".market-marker")) clearActiveMarker();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") clearActiveMarker();
  });
})();
