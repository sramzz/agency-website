const solutionLinks = [
  { key: "search", label: "Local SEO + GEO Strategy", description: "Search, Maps and AI visibility.", href: "/seo-agency/" },
  { key: "ads", label: "Ads SEM + GEM Management", description: "Paid demand across eligible platforms.", href: "/google-ads-management/" },
  { key: "automation", label: "AI Process Automation", description: "Practical automation for repetitive work.", href: "/#ai-automation" },
];

const primaryLinks = [
  { label: "Journey", href: "/journey/" },
  { label: "Success Cases", href: "/case-studies/" },
  { label: "About us", href: "/about/" },
];

const officeLocations = [
  { key: "medellin", region: "Latin America", city: "Medellín", country: "Colombia", href: "/locations/latin-america/medellin/" },
  { key: "amsterdam", region: "Europe", city: "Amsterdam", country: "Netherlands", href: "/locations/europe/amsterdam/" },
  { key: "melbourne", region: "Australia", city: "Melbourne", country: "Australia", href: "/locations/australia/melbourne/" },
];

const currentPath = window.location.pathname.replace(/index\.html$/, "");
const currentOffice = officeLocations.find((office) => currentPath === office.href);
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

const createOfficeLink = (office, className) => {
  const link = document.createElement("a");
  link.className = className;
  link.href = office.href;
  link.dataset.office = office.key;
  if (currentOffice?.key === office.key) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }

  const region = document.createElement("span");
  region.className = "location-region";
  region.textContent = office.region;
  const place = document.createElement("span");
  place.className = "location-place";
  place.innerHTML = `<strong>${office.city}</strong><span>${office.country}</span>`;
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
  if (solutionLinks.some(({ href }) => isCurrentLink(href))) solutionsTrigger.classList.add("is-active");

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
  locationTrigger.innerHTML = `<span class="location-pin" aria-hidden="true"></span><span>${currentOffice?.city || "Locations"}</span><span class="location-chevron" aria-hidden="true"></span>`;

  const locationPanel = document.createElement("div");
  locationPanel.id = "location-panel";
  locationPanel.className = "location-panel";
  locationPanel.setAttribute("aria-label", "Choose an office location");
  locationPanel.hidden = true;
  const panelHeading = document.createElement("div");
  panelHeading.className = "location-panel-heading";
  panelHeading.innerHTML = "<span>Choose your market</span><strong>Our offices</strong>";
  locationPanel.append(panelHeading);
  officeLocations.forEach((office) => locationPanel.append(createOfficeLink(office, "location-option")));
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
  if (solutionLinks.some(({ href }) => isCurrentLink(href))) mobileSolutionsTrigger.classList.add("is-active");
  const mobileSolutionsPanel = document.createElement("div");
  mobileSolutionsPanel.id = "mobile-solutions-panel";
  mobileSolutionsPanel.className = "mobile-solutions-panel";
  mobileSolutionsPanel.hidden = true;
  solutionLinks.forEach((solution) => mobileSolutionsPanel.append(createSolutionLink(solution, "mobile-solution-option")));
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

  const mobileLocations = document.createElement("div");
  mobileLocations.className = "mobile-location-group";
  mobileLocations.setAttribute("aria-label", "Office locations");
  const mobileLabel = document.createElement("p");
  mobileLabel.className = "mobile-location-label";
  mobileLabel.textContent = "Office locations";
  mobileLocations.append(mobileLabel);
  officeLocations.forEach((office) => mobileLocations.append(createOfficeLink(office, "mobile-location-option")));

  mobileNav.replaceChildren(mobileSolutions, ...mobilePrimaryLinks);
  if (mobileHire) mobileNav.append(mobileHire);
  if (mobileLanguages.childElementCount) mobileNav.append(mobileLanguages);
  mobileNav.append(mobileLocations);

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
  closeMobileMenu = (returnFocus = false) => {
    const wasOpen = mobileNav.classList.contains("is-open");
    document.body.classList.remove("nav-open");
    mobileNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    closeMobileSolutions();
    if (returnFocus && wasOpen) menuToggle.focus();
  };
  menuToggle.addEventListener("click", () => {
    closeSolutionsPanel();
    closeLocationPanel();
    const isOpen = mobileNav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
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
