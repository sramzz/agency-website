const solutionLinks = [
  { key: "organic", label: "Organic Discovery", description: "Local SEO + GEO for Search, Maps and AI.", href: "/solutions/organic-discovery/" },
  { key: "paid", label: "Paid Ads", description: "Meta, TikTok and search campaigns.", href: "/solutions/paid-ads/" },
  { key: "automation", label: "AI Automation", description: "Practical AI workflows with human control.", href: "/solutions/ai-automation/" },
];

const primaryLinks = [
  { label: "Journey", href: "/journey/" },
  { label: "Success Cases", href: "/case-studies/" },
  { label: "About us", href: "/about/" },
];

const marketLocations = [
  { key: "australia", region: "Market", name: "Australia", detail: "Australia", href: "/locations/australia/" },
  { key: "netherlands", region: "Market", name: "Netherlands", detail: "Europe", href: "/locations/netherlands/" },
  { key: "latam", region: "Region", name: "LATAM", detail: "Latin America", href: "/locations/latam/" },
];

const currentPath = window.location.pathname.replace(/index\.html$/, "");
const currentMarket = marketLocations.find((market) => currentPath === market.href);
const siteHeader = document.querySelector(".site-header");
const headerActions = siteHeader?.querySelector(".header-actions");
const headerCta = headerActions?.querySelector(".header-cta");
const desktopNav = document.querySelector(".desktop-nav");
const mobileNav = document.querySelector("#mobile-nav");

const isCurrentLink = (href) => {
  if (href.startsWith("/#")) return currentPath === "/" && window.location.hash === href.slice(1);
  return currentPath === href;
};

const setCurrentState = (link, href) => {
  if (!isCurrentLink(href)) return;
  link.classList.add("is-active");
  link.setAttribute("aria-current", "page");
};

const createPrimaryLink = ({ label, href }, className = "primary-nav-link") => {
  const link = document.createElement("a");
  link.className = className;
  link.href = href;
  link.textContent = label;
  setCurrentState(link, href);
  return link;
};

const createSolutionLink = (solution, className) => {
  const link = document.createElement("a");
  link.className = className;
  link.href = solution.href;
  link.dataset.solution = solution.key;
  link.innerHTML = `<span class="solution-index" aria-hidden="true">${String(solutionLinks.indexOf(solution) + 1).padStart(2, "0")}</span><span class="solution-copy"><strong>${solution.label}</strong><span>${solution.description}</span></span>`;
  setCurrentState(link, solution.href);
  return link;
};

const createMarketLink = (market, className) => {
  const link = document.createElement("a");
  link.className = className;
  link.href = market.href;
  link.dataset.market = market.key;
  if (currentMarket?.key === market.key) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }

  const region = document.createElement("span");
  region.className = "location-region";
  region.textContent = market.region;
  const place = document.createElement("span");
  place.className = "location-place";
  place.innerHTML = `<strong>${market.name}</strong><span>${market.detail}</span>`;
  link.append(region, place);
  return link;
};

let closeSolutionsPanel = () => {};
let closeLocationPanel = () => {};
let closeMobileSolutions = () => {};
let closeMobileMenu = () => {};

if (desktopNav) {
  const solutions = document.createElement("div");
  solutions.className = "solutions-switcher";
  const solutionsTrigger = document.createElement("button");
  solutionsTrigger.className = "primary-nav-trigger";
  solutionsTrigger.type = "button";
  solutionsTrigger.setAttribute("aria-expanded", "false");
  solutionsTrigger.setAttribute("aria-controls", "solutions-panel");
  solutionsTrigger.setAttribute("aria-haspopup", "true");
  solutionsTrigger.innerHTML = '<span>Solutions</span><span class="nav-chevron" aria-hidden="true"></span>';
  if (currentPath.startsWith("/solutions/")) solutionsTrigger.classList.add("is-active");

  const solutionsPanel = document.createElement("div");
  solutionsPanel.id = "solutions-panel";
  solutionsPanel.className = "solutions-panel";
  solutionsPanel.setAttribute("aria-label", "Choose a solution");
  solutionsPanel.hidden = true;
  const panelHeading = document.createElement("div");
  panelHeading.className = "solutions-panel-heading";
  panelHeading.innerHTML = "<span>What we solve</span><strong>Solutions</strong>";
  solutionsPanel.append(panelHeading);
  solutionLinks.forEach((solution) => solutionsPanel.append(createSolutionLink(solution, "solution-option")));
  const allSolutions = createPrimaryLink({ label: "Explore all solutions", href: "/solutions/" }, "solution-all-link");
  solutionsPanel.append(allSolutions);

  solutions.append(solutionsTrigger, solutionsPanel);
  desktopNav.replaceChildren(solutions, ...primaryLinks.map((link) => createPrimaryLink(link)));

  closeSolutionsPanel = (returnFocus = false) => {
    const wasOpen = !solutionsPanel.hidden;
    solutionsPanel.hidden = true;
    solutionsTrigger.setAttribute("aria-expanded", "false");
    solutions.classList.remove("is-open");
    if (returnFocus && wasOpen) solutionsTrigger.focus();
  };
  const openSolutionsPanel = () => {
    closeLocationPanel();
    solutionsPanel.hidden = false;
    solutionsTrigger.setAttribute("aria-expanded", "true");
    solutions.classList.add("is-open");
  };
  solutionsTrigger.addEventListener("click", () => solutionsPanel.hidden ? openSolutionsPanel() : closeSolutionsPanel());
  solutionsTrigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openSolutionsPanel();
      solutionsPanel.querySelector("a")?.focus();
    }
  });
  solutionsPanel.addEventListener("click", () => closeSolutionsPanel());
  document.addEventListener("click", (event) => {
    if (!solutions.contains(event.target)) closeSolutionsPanel();
  });
}

if (headerCta) headerCta.textContent = "Hire us!";

if (headerActions) {
  const switcher = document.createElement("div");
  switcher.className = "location-switcher";
  const locationTrigger = document.createElement("button");
  locationTrigger.className = "location-trigger";
  locationTrigger.type = "button";
  locationTrigger.setAttribute("aria-expanded", "false");
  locationTrigger.setAttribute("aria-controls", "location-panel");
  locationTrigger.setAttribute("aria-haspopup", "true");
  locationTrigger.innerHTML = `<span class="location-pin" aria-hidden="true"></span><span>${currentMarket?.name || "Locations"}</span><span class="location-chevron" aria-hidden="true"></span>`;

  const locationPanel = document.createElement("div");
  locationPanel.id = "location-panel";
  locationPanel.className = "location-panel";
  locationPanel.setAttribute("aria-label", "Choose a market");
  locationPanel.hidden = true;
  const panelHeading = document.createElement("div");
  panelHeading.className = "location-panel-heading";
  panelHeading.innerHTML = "<span>Choose your market</span><strong>Our markets</strong>";
  locationPanel.append(panelHeading);
  marketLocations.forEach((market) => locationPanel.append(createMarketLink(market, "location-option")));
  switcher.append(locationTrigger, locationPanel);
  headerActions.prepend(switcher);

  closeLocationPanel = (returnFocus = false) => {
    const wasOpen = !locationPanel.hidden;
    locationPanel.hidden = true;
    locationTrigger.setAttribute("aria-expanded", "false");
    switcher.classList.remove("is-open");
    if (returnFocus && wasOpen) locationTrigger.focus();
  };
  const openLocationPanel = () => {
    closeSolutionsPanel();
    closeMobileMenu();
    locationPanel.hidden = false;
    locationTrigger.setAttribute("aria-expanded", "true");
    switcher.classList.add("is-open");
  };
  locationTrigger.addEventListener("click", () => locationPanel.hidden ? openLocationPanel() : closeLocationPanel());
  locationTrigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openLocationPanel();
      locationPanel.querySelector("a")?.focus();
    }
  });
  locationPanel.addEventListener("click", () => closeLocationPanel());
  document.addEventListener("click", (event) => {
    if (!switcher.contains(event.target)) closeLocationPanel();
  });
}

if (mobileNav) {
  const mobileSolutions = document.createElement("div");
  mobileSolutions.className = "mobile-solutions";
  const mobileSolutionsTrigger = document.createElement("button");
  mobileSolutionsTrigger.className = "mobile-solutions-trigger";
  mobileSolutionsTrigger.type = "button";
  mobileSolutionsTrigger.setAttribute("aria-expanded", "false");
  mobileSolutionsTrigger.setAttribute("aria-controls", "mobile-solutions-panel");
  mobileSolutionsTrigger.setAttribute("aria-haspopup", "true");
  mobileSolutionsTrigger.innerHTML = '<span>Solutions</span><span class="nav-chevron" aria-hidden="true"></span>';
  if (currentPath.startsWith("/solutions/")) mobileSolutionsTrigger.classList.add("is-active");
  const mobileSolutionsPanel = document.createElement("div");
  mobileSolutionsPanel.id = "mobile-solutions-panel";
  mobileSolutionsPanel.className = "mobile-solutions-panel";
  mobileSolutionsPanel.hidden = true;
  solutionLinks.forEach((solution) => mobileSolutionsPanel.append(createSolutionLink(solution, "mobile-solution-option")));
  mobileSolutionsPanel.append(createPrimaryLink({ label: "Explore all solutions", href: "/solutions/" }, "mobile-solutions-all"));
  mobileSolutions.append(mobileSolutionsTrigger, mobileSolutionsPanel);

  const mobilePrimaryLinks = primaryLinks.map((link) => createPrimaryLink(link, "mobile-primary-link"));
  const mobileHire = headerCta?.cloneNode(true);
  if (mobileHire) {
    mobileHire.className = "mobile-hire-cta";
    mobileHire.textContent = "Hire us!";
  }

  const mobileLanguages = document.createElement("div");
  mobileLanguages.className = "mobile-language-group";
  siteHeader?.querySelectorAll(".language-option").forEach((language) => {
    const clone = language.cloneNode(true);
    clone.classList.add("mobile-language-option");
    mobileLanguages.append(clone);
  });

  mobileNav.replaceChildren(mobileSolutions, ...mobilePrimaryLinks);
  if (mobileHire) mobileNav.append(mobileHire);
  if (mobileLanguages.childElementCount) mobileNav.append(mobileLanguages);

  closeMobileSolutions = () => {
    mobileSolutionsPanel.hidden = true;
    mobileSolutionsTrigger.setAttribute("aria-expanded", "false");
    mobileSolutions.classList.remove("is-open");
  };
  mobileSolutionsTrigger.addEventListener("click", () => {
    const shouldOpen = mobileSolutionsPanel.hidden;
    closeMobileSolutions();
    if (!shouldOpen) return;
    mobileSolutionsPanel.hidden = false;
    mobileSolutionsTrigger.setAttribute("aria-expanded", "true");
    mobileSolutions.classList.add("is-open");
  });
}

const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle && mobileNav) {
  const setMobileMenuState = (isOpen) => {
    document.body.classList.toggle("nav-open", isOpen);
    mobileNav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    if (!isOpen) closeMobileSolutions();
  };

  closeMobileMenu = (returnFocus = false) => {
    const wasOpen = mobileNav.classList.contains("is-open");
    setMobileMenuState(false);
    if (returnFocus && wasOpen) menuToggle.focus();
  };

  menuToggle.addEventListener("click", () => {
    closeSolutionsPanel();
    closeLocationPanel();
    setMobileMenuState(!mobileNav.classList.contains("is-open"));
  });

  const dismissMobileMenuFromOutside = (event) => {
    if (!mobileNav.classList.contains("is-open") || mobileNav.contains(event.target)) return;
    if (event.type === "click" && menuToggle.contains(event.target)) return;
    closeMobileMenu();
  };

  document.addEventListener("click", dismissMobileMenuFromOutside);
  for (const eventName of ["wheel", "touchmove"]) {
    document.addEventListener(eventName, dismissMobileMenuFromOutside, { passive: true });
  }

  mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMobileMenu()));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSolutionsPanel(true);
      closeLocationPanel(true);
      closeMobileSolutions();
      closeMobileMenu(true);
    }
  });
}

const serviceSelectorForm = document.querySelector(".service-selector");

if (serviceSelectorForm) {
  const serviceCheckboxes = [...serviceSelectorForm.querySelectorAll('input[name="services"]')];
  const directWhatsappLinks = [...document.querySelectorAll("[data-whatsapp-contact]")];
  const serviceLead = window.RankingRebelsLead;
  let approximateLocation = null;
  let servicePointerType = "";

  serviceSelectorForm.dataset.locationProvider = serviceLead ? "cloudflare" : "fallback";

  const updateDirectWhatsAppLinks = (location) => {
    const phone = serviceLead ? serviceLead.resolveWhatsAppNumber(location) : "31613390178";
    directWhatsappLinks.forEach((link) => {
      link.href = `https://wa.me/${phone}`;
    });
  };

  updateDirectWhatsAppLinks(null);

  serviceLead
    ?.detectApproximateLocation()
    .then((location) => {
      approximateLocation = location;
      updateDirectWhatsAppLinks(location);
    })
    .catch(() => {
      approximateLocation = null;
      updateDirectWhatsAppLinks(null);
    });

  const syncServiceSelector = () => {
    serviceCheckboxes.forEach((checkbox) => {
      checkbox.closest(".service-option")?.classList.toggle("is-selected", checkbox.checked);
    });
  };

  serviceSelectorForm.addEventListener("pointerdown", (event) => {
    servicePointerType = event.target.closest?.(".service-option") ? event.pointerType : "";
  });
  serviceSelectorForm.addEventListener("change", (event) => {
    syncServiceSelector();
    if (servicePointerType === "touch" && event.target.matches('input[name="services"]')) {
      window.requestAnimationFrame(() => event.target.blur());
    }
    servicePointerType = "";
  });
  serviceSelectorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedServices = serviceCheckboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);

    const whatsappUrl = serviceLead
      ? serviceLead.buildWhatsAppUrl(selectedServices, approximateLocation)
      : (() => {
          const messageLines = ["Hi Ranking Rebels, I’d like to improve my business’s online visibility and reach more customers."];
          if (selectedServices.length) {
            messageLines.push("", "I’m interested in:", ...selectedServices.map((service) => `• ${service}`));
          }
          messageLines.push("", "Could you recommend the best approach for my business?");
          return `https://wa.me/31613390178?text=${encodeURIComponent(messageLines.join("\n"))}`;
        })();

    const leadCapture = window.RankingRebelsLeadCapture;
    if (leadCapture && typeof leadCapture.open === "function") {
      leadCapture.open({
        whatsappUrl,
        ctaLabel: "Get started",
        market: serviceSelectorForm.dataset.market || document.body.dataset.market || "Not specified",
        services: selectedServices,
        sourcePath: window.location.pathname,
        document,
        window,
      });
    } else {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  });

  syncServiceSelector();
}
