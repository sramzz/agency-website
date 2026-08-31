const officeLocations = [
  {
    key: "medellin",
    region: "Latin America",
    city: "Medellín",
    country: "Colombia",
    href: "/locations/latin-america/medellin/",
  },
  {
    key: "amsterdam",
    region: "Europe",
    city: "Amsterdam",
    country: "Netherlands",
    href: "/locations/europe/amsterdam/",
  },
  {
    key: "melbourne",
    region: "Australia",
    city: "Melbourne",
    country: "Australia",
    href: "/locations/australia/melbourne/",
  },
];

const currentPath = window.location.pathname.replace(/index\.html$/, "");
const currentOffice = officeLocations.find((office) => currentPath === office.href);
const siteHeader = document.querySelector(".site-header");
const headerActions = siteHeader?.querySelector(".header-actions");
const mobileNav = document.querySelector("#mobile-nav");

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

let locationTrigger;
let locationPanel;

if (headerActions) {
  const switcher = document.createElement("div");
  switcher.className = "location-switcher";

  locationTrigger = document.createElement("button");
  locationTrigger.className = "location-trigger";
  locationTrigger.type = "button";
  locationTrigger.setAttribute("aria-expanded", "false");
  locationTrigger.setAttribute("aria-controls", "location-panel");
  locationTrigger.setAttribute("aria-haspopup", "true");
  locationTrigger.innerHTML = `<span class="location-pin" aria-hidden="true"></span><span>${currentOffice?.city || "Locations"}</span><span class="location-chevron" aria-hidden="true"></span>`;

  locationPanel = document.createElement("div");
  locationPanel.id = "location-panel";
  locationPanel.className = "location-panel";
  locationPanel.setAttribute("aria-label", "Choose an office location");
  locationPanel.hidden = true;

  const panelHeading = document.createElement("div");
  panelHeading.className = "location-panel-heading";
  panelHeading.innerHTML = "<span>Choose your market</span><strong>Our offices</strong>";
  locationPanel.append(panelHeading);

  officeLocations.forEach((office) => {
    locationPanel.append(createOfficeLink(office, "location-option"));
  });

  switcher.append(locationTrigger, locationPanel);
  headerActions.prepend(switcher);

  const closeLocationPanel = (returnFocus = false) => {
    locationPanel.hidden = true;
    locationTrigger.setAttribute("aria-expanded", "false");
    switcher.classList.remove("is-open");
    if (returnFocus) locationTrigger.focus();
  };

  const openLocationPanel = () => {
    locationPanel.hidden = false;
    locationTrigger.setAttribute("aria-expanded", "true");
    switcher.classList.add("is-open");
  };

  locationTrigger.addEventListener("click", () => {
    if (locationPanel.hidden) openLocationPanel();
    else closeLocationPanel();
  });

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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !locationPanel.hidden) closeLocationPanel(true);
  });
}

if (mobileNav) {
  const mobileLocations = document.createElement("div");
  mobileLocations.className = "mobile-location-group";
  mobileLocations.setAttribute("aria-label", "Office locations");

  const mobileLabel = document.createElement("p");
  mobileLabel.className = "mobile-location-label";
  mobileLabel.textContent = "Office locations";
  mobileLocations.append(mobileLabel);

  officeLocations.forEach((office) => {
    mobileLocations.append(createOfficeLink(office, "mobile-location-option"));
  });

  mobileNav.append(mobileLocations);
}

const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle && mobileNav) {
  const closeMenu = () => {
    document.body.classList.remove("nav-open");
    mobileNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}
