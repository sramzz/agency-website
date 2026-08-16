(() => {
  const track = (event, details = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...details });
    window.dispatchEvent(new CustomEvent("rankingrebels:analytics", { detail: { event, ...details } }));
  };

  document.querySelectorAll("[data-event]").forEach((element) => {
    element.addEventListener("click", () => track(element.dataset.event));
  });

  const trackedDepths = new Set();
  const depthThresholds = [25, 50, 75, 90];
  let scrollFrame;

  const trackScrollDepth = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollableHeight <= 0) return;

    const depth = Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100));
    depthThresholds.forEach((threshold) => {
      if (depth >= threshold && !trackedDepths.has(threshold)) {
        trackedDepths.add(threshold);
        track("melbourne_scroll_depth", { percent: threshold });
      }
    });
  };

  window.addEventListener("scroll", () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      trackScrollDepth();
      scrollFrame = undefined;
    });
  }, { passive: true });

  const faqItems = [...document.querySelectorAll(".melbourne-page .faq-list details")];
  faqItems.forEach((item, index) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) otherItem.open = false;
      });
      track("melbourne_faq_open", { question_index: index + 1 });
    });
  });

  const form = document.querySelector("#audit-form");
  const status = document.querySelector("#audit-status");

  if (!form || !status) return;

  let formStarted = false;
  let validationErrorTracked = false;
  form.addEventListener("focusin", () => {
    if (formStarted) return;
    formStarted = true;
    track("audit_form_start", { location: "melbourne" });
  });

  form.addEventListener("input", () => {
    validationErrorTracked = false;
    status.textContent = "";
  });

  form.addEventListener("invalid", () => {
    status.textContent = "Please complete the required fields before requesting your audit.";
    if (validationErrorTracked) return;
    validationErrorTracked = true;
    track("audit_form_error", { location: "melbourne", reason: "validation" });
  }, true);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = "Please complete the required fields before requesting your audit.";
      track("audit_form_error", { location: "melbourne", reason: "validation" });
      return;
    }

    const formData = new FormData(form);
    const message = [
      "Melbourne search audit request",
      `Name: ${formData.get("name")}`,
      `Work email: ${formData.get("email")}`,
      `Website: ${formData.get("website")}`,
      `Business: ${formData.get("company")}`,
      `Monthly marketing investment: ${formData.get("investment") || "Not provided"}`
    ].join("\n");
    const auditUrl = `https://wa.me/61439499441?text=${encodeURIComponent(message)}`;

    track("audit_form_submit", { location: "melbourne" });
    const auditWindow = window.open(auditUrl, "_blank");

    if (auditWindow) {
      auditWindow.opener = null;
      status.textContent = "Your audit request is ready in WhatsApp. Send the message to complete your request.";
      track("audit_form_success", { location: "melbourne", destination: "whatsapp" });
      return;
    }

    status.innerHTML = `Your browser blocked the new window. <a href="${auditUrl}" target="_blank" rel="noreferrer">Open your audit request in WhatsApp</a>.`;
    track("audit_form_error", { location: "melbourne", reason: "popup_blocked" });
  });
})();
