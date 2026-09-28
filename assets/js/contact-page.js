(() => {
  "use strict";

  const form = document.querySelector("#contact-form");
  const leadCapture = window.RankingRebelsLeadCapture;
  const serviceLead = window.RankingRebelsLead;

  if (!form || !leadCapture || typeof leadCapture.initInline !== "function") return;

  const context = {
    ctaLabel: "Submit",
    market: "Not specified",
    services: [],
    sourcePath: "/contact/",
    document,
    window,
    whatsappUrl: serviceLead?.buildWhatsAppUrl([], null) || "https://wa.me/31613390178",
  };

  leadCapture.initInline(form, context);

  serviceLead
    ?.detectApproximateLocation()
    .then((location) => {
      context.whatsappUrl = serviceLead.buildWhatsAppUrl([], location);
    })
    .catch(() => {
      context.whatsappUrl = serviceLead.buildWhatsAppUrl([], null);
    });
})();
