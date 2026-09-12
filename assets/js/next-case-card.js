(() => {
  const card = document.querySelector('[data-next-case-card]');
  const contact = document.querySelector('.next-case-copy [data-lead-capture]');
  if (!card || !contact) return;

  const lead = window.RankingRebelsLead;
  if (lead) {
    const destination = new URL(contact.href);
    destination.searchParams.set('text', lead.buildWhatsAppMessage([]));
    contact.href = destination.href;
  }

  // Delegate to the existing CTA: one contact flow and one tracking event.
  card.addEventListener('click', () => {
    contact.click();
    const dialog = document.getElementById('rr-lead-capture-dialog');
    if (dialog && dialog.open) {
      dialog.addEventListener('close', () => card.focus({ preventScroll: true }), { once: true });
    }
  });
})();
