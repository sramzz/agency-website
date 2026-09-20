(function () {
  "use strict";

  const productionHosts = new Set(["rankingrebels.com", "www.rankingrebels.com"]);
  if (!productionHosts.has(window.location.hostname)) return;
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", "G-6M6Y191D7Q");

  const googleTag = document.createElement("script");
  googleTag.async = true;
  googleTag.src = "https://www.googletagmanager.com/gtag/js?id=G-6M6Y191D7Q";
  document.head.append(googleTag);
})();
