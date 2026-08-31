/* ============================================================
   SCRIPT.JS — HOME PAGE (index.html)
   ------------------------------------------------------------
   This file reads the content arrays/objects defined in
   data.js and turns them into HTML on the page. You shouldn't
   need to edit this file to update content — edit data.js
   instead. Only touch this file if you want to change how
   something *behaves*, not what it *says*.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  renderSiteBasics();
  renderHero();
  renderAbout();
  renderCategories();
  renderProjects(PROJECTS);
  renderServices();
  renderTestimonials();
  renderContactOptions();
  renderSocialLinks();

  initMobileMenu();
  initScrollSpy();
  initRevealOnScroll();
  initPortfolioFilter();
  initGridCursor();
  initContactForm();
  initChatDemo();
  initFileLabel();
});

/* ------------------------------------------------------------
   Small helpers
   ------------------------------------------------------------ */

// Shortcut for document.querySelector
function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

// Shortcut for document.querySelectorAll, returned as a real array
function qsa(selector, scope) {
  return Array.from((scope || document).querySelectorAll(selector));
}

// Build a DOM element with attributes + children in one call.
// children can be a string (used as textContent) or an array
// of already-built elements.
function el(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === "class") node.className = value;
      else if (key === "html") node.innerHTML = value;
      else node.setAttribute(key, value);
    });
  }
  if (typeof children === "string") {
    node.textContent = children;
  } else if (Array.isArray(children)) {
    children.forEach((child) => child && node.appendChild(child));
  }
  return node;
}

function findProjectById(id) {
  return PROJECTS.find((p) => p.id === id);
}

function findTestimonialById(id) {
  return TESTIMONIALS.find((t) => t.id === id);
}

/* ------------------------------------------------------------
   Footer year
   ------------------------------------------------------------ */
function setYear() {
  const yearEl = qs("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------
   Site basics: name, title, nav logo, meta tags, footer
   ------------------------------------------------------------ */
function renderSiteBasics() {
  qsa("[data-site-name]").forEach((n) => (n.textContent = SITE.name));
  qsa("[data-site-title]").forEach((n) => (n.textContent = SITE.title));
  qsa("[data-site-short]").forEach((n) => (n.textContent = SITE.shortName));
  qsa("[data-site-email]").forEach((n) => {
    n.textContent = SITE.email;
    if (n.tagName === "A") n.href = `mailto:${SITE.email}`;
  });
  qsa("[data-site-phone]").forEach((n) => (n.textContent = SITE.phone));
  qsa("[data-site-location]").forEach((n) => (n.textContent = SITE.location));

  const metaDesc = qs('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", SITE.metaDescription);
  const ogDesc = qs('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", SITE.metaDescription);
  const ogTitle = qs('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", `${SITE.name} — ${SITE.title}`);
  document.title = `${SITE.name} — ${SITE.title}`;
}

/* ------------------------------------------------------------
   Hero section
   ------------------------------------------------------------ */
function renderHero() {
  const eyebrow = qs("[data-hero-eyebrow]");
  if (eyebrow) eyebrow.textContent = HERO.eyebrow;

  const headline = qs("[data-hero-headline]");
  if (headline) headline.textContent = HERO.headline;

  const desc = qs("[data-hero-description]");
  if (desc) desc.textContent = HERO.description;

  const ctaPrimary = qs("[data-hero-cta-primary]");
  if (ctaPrimary) {
    ctaPrimary.textContent = HERO.ctaPrimary.label;
    ctaPrimary.appendChild(el("span", { class: "btn-arrow" }, "↳"));
    ctaPrimary.href = HERO.ctaPrimary.href;
  }

  const ctaSecondary = qs("[data-hero-cta-secondary]");
  if (ctaSecondary) {
    ctaSecondary.textContent = HERO.ctaSecondary.label;
    ctaSecondary.href = HERO.ctaSecondary.href;
  }

  const visual = qs("[data-hero-visual]");
  if (visual) {
    visual.src = HERO.visualImage;
    visual.alt = HERO.visualAlt;
  }

  // Marquee strip built from the category list, repeated so the
  // CSS animation can loop seamlessly.
  const marquee = qs("[data-marquee-track]");
  if (marquee) {
    const words = CATEGORIES.filter((c) => c !== "All");
    const set = words.map((w) => el("span", null, w));
    const setDup = words.map((w) => el("span", null, w));
    [...set, ...setDup].forEach((span) => marquee.appendChild(span));
  }
}

/* ------------------------------------------------------------
   About section
   ------------------------------------------------------------ */
function renderAbout() {
  const image = qs("[data-about-image]");
  if (image) {
    image.src = ABOUT.profileImage;
    image.alt = ABOUT.profileAlt;
  }

  const bio = qs("[data-about-bio]");
  if (bio) {
    ABOUT.bio.forEach((paragraph) => bio.appendChild(el("p", null, paragraph)));
  }

  const philosophy = qs("[data-about-philosophy]");
  if (philosophy) philosophy.textContent = ABOUT.philosophy;

  const skillsList = qs("[data-about-skills]");
  if (skillsList) {
    ABOUT.skills.forEach((skill) => skillsList.appendChild(el("li", null, skill)));
  }

  const toolsList = qs("[data-about-tools]");
  if (toolsList) {
    ABOUT.tools.forEach((tool) => toolsList.appendChild(el("li", null, tool)));
  }

  const expList = qs("[data-about-experience]");
  if (expList) {
    ABOUT.experience.forEach((item) => {
      const li = el("li", null, [
        el("span", { class: "exp-role" }, `${item.role}`),
        el("span", { class: "exp-org" }, ` — ${item.org}`),
        el("span", { class: "exp-years" }, item.years),
      ]);
      expList.appendChild(li);
    });
  }
}

/* ------------------------------------------------------------
   Portfolio: category filter buttons
   ------------------------------------------------------------ */
function renderCategories() {
  const bar = qs("[data-filter-bar]");
  if (!bar) return;
  CATEGORIES.forEach((category, index) => {
    const btn = el(
      "button",
      {
        class: "filter-btn" + (index === 0 ? " is-active" : ""),
        type: "button",
        "data-category": category,
      },
      category
    );
    bar.appendChild(btn);
  });
}

/* ------------------------------------------------------------
   Portfolio: project cards
   ------------------------------------------------------------ */
function renderProjects(projects) {
  const grid = qs("[data-portfolio-grid]");
  if (!grid) return;
  grid.innerHTML = "";

  projects.forEach((project) => {
    const specList = el("dl", null, [
      el("dt", null, "Client"),
      el("dd", null, project.client),
      el("dt", null, "Year"),
      el("dd", null, project.year),
      el("dt", null, "Tools"),
      el("dd", null, project.tools.join(", ")),
    ]);

    const card = el(
      "article",
      { class: "project-card reveal", "data-category": project.category },
      [
        el("a", { class: "project-card-link", href: `project.html?id=${project.id}` }, [
          el("div", { class: "thumb" }, [
            el("img", {
              src: project.cover,
              alt: `${project.title} — ${project.category} project cover`,
              loading: "lazy",
            }),
            el("div", { class: "spec-panel" }, [specList]),
          ]),
          el("div", { class: "project-meta" }, [
            el("span", { class: "cat" }, project.category),
            el("h3", null, project.title),
          ]),
        ]),
      ]
    );
    grid.appendChild(card);
  });

  const emptyState = qs("[data-portfolio-empty]");
  if (emptyState) emptyState.classList.remove("is-visible");
}

function initPortfolioFilter() {
  const bar = qs("[data-filter-bar]");
  const grid = qs("[data-portfolio-grid]");
  const emptyState = qs("[data-portfolio-empty]");
  if (!bar || !grid) return;

  bar.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    qsa(".filter-btn", bar).forEach((b) => b.classList.remove("is-active"));
    button.classList.add("is-active");

    const category = button.dataset.category;
    let visibleCount = 0;

    qsa(".project-card", grid).forEach((card) => {
      const matches = category === "All" || card.dataset.category === category;
      card.classList.toggle("is-hidden", !matches);
      if (matches) visibleCount += 1;
    });

    if (emptyState) emptyState.classList.toggle("is-visible", visibleCount === 0);
  });
}

/* ------------------------------------------------------------
   Custom "VIEW" cursor over the portfolio grid (desktop only —
   see the (hover: none) media query in style.css that hides it
   on touch devices).
   ------------------------------------------------------------ */
function initGridCursor() {
  const grid = qs("[data-portfolio-grid]");
  const cursor = qs("[data-grid-cursor]");
  if (!grid || !cursor) return;

  grid.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  grid.addEventListener("mouseover", (event) => {
    if (event.target.closest(".project-card")) cursor.classList.add("is-active");
  });

  grid.addEventListener("mouseout", (event) => {
    if (event.target.closest(".project-card")) cursor.classList.remove("is-active");
  });
}

/* ------------------------------------------------------------
   Services
   ------------------------------------------------------------ */
const SERVICE_ICONS = {
  mark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,3 21,8 12,13 3,8"/><polyline points="3,14 12,19 21,14"/></svg>',
  square: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16"/><line x1="4" y1="10" x2="20" y2="10"/></svg>',
  type: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="4,7 4,4 20,4 20,7"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/></svg>',
  cursor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 3l7 17 2-7 7-2z"/></svg>',
};

function renderServices() {
  const grid = qs("[data-services-grid]");
  if (!grid) return;

  SERVICES.forEach((service) => {
    const icon = el("div", { class: "service-icon", html: SERVICE_ICONS[service.icon] || "" });
    const card = el("div", { class: "service-card reveal" }, [
      icon,
      el("h3", null, service.title),
      el("p", null, service.description),
      el("span", { class: "service-price" }, service.priceRange),
    ]);
    grid.appendChild(card);
  });
}

/* ------------------------------------------------------------
   Testimonials
   ------------------------------------------------------------ */
function renderTestimonials() {
  const track = qs("[data-testimonial-track]");
  if (!track) return;

  TESTIMONIALS.filter((t) => t.public).forEach((testimonial) => {
    const stars = "★".repeat(testimonial.rating) + "☆".repeat(5 - testimonial.rating);
    const card = el("article", { class: "testimonial-card reveal" }, [
      el("div", { class: "testimonial-rating" }, stars),
      el("p", { class: "testimonial-review" }, testimonial.review),
      el("div", { class: "testimonial-person" }, [
        el("img", { src: testimonial.image, alt: testimonial.name, loading: "lazy" }),
        el("div", null, [
          el("span", { class: "testimonial-name" }, testimonial.name),
          el("span", { class: "testimonial-company" }, testimonial.company),
        ]),
      ]),
    ]);
    track.appendChild(card);
  });
}

/* ------------------------------------------------------------
   Contact form <select> options + social links + footer
   ------------------------------------------------------------ */
function renderContactOptions() {
  const projectTypeSelect = qs("[data-project-type-select]");
  if (projectTypeSelect) {
    CONTACT_OPTIONS.projectTypes.forEach((type) => {
      projectTypeSelect.appendChild(el("option", { value: type }, type));
    });
  }

  const budgetSelect = qs("[data-budget-select]");
  if (budgetSelect) {
    CONTACT_OPTIONS.budgetRanges.forEach((range) => {
      budgetSelect.appendChild(el("option", { value: range }, range));
    });
  }

  const emailDetail = qs("[data-contact-email]");
  if (emailDetail) emailDetail.textContent = SITE.email;
  const phoneDetail = qs("[data-contact-phone]");
  if (phoneDetail) phoneDetail.textContent = SITE.phone;
  const locationDetail = qs("[data-contact-location]");
  if (locationDetail) locationDetail.textContent = SITE.location;
}

function renderSocialLinks() {
  qsa("[data-social-list]").forEach((list) => {
    SOCIAL_LINKS.forEach((link) => {
      list.appendChild(el("a", { href: link.url, target: "_blank", rel: "noopener" }, link.label));
    });
  });
}

/* ------------------------------------------------------------
   Mobile navigation menu
   ------------------------------------------------------------ */
function initMobileMenu() {
  const toggle = qs("[data-nav-toggle]");
  const menu = qs("[data-mobile-menu]");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  qsa("a", menu).forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

/* ------------------------------------------------------------
   Highlight the current section in the nav while scrolling
   ------------------------------------------------------------ */
function initScrollSpy() {
  const links = qsa("[data-nav-link]");
  if (!links.length) return;

  const sections = links
    .map((link) => document.getElementById(link.getAttribute("href").replace("#", "")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove("active"));
        const activeLink = links.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
        if (activeLink) activeLink.classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ------------------------------------------------------------
   Reveal-on-scroll animation for elements with class "reveal"
   ------------------------------------------------------------ */
function initRevealOnScroll() {
  const targets = qsa(".reveal");
  if (!targets.length) return;

  // Elements added later (like project cards) also get observed
  // via a MutationObserver on the grids that render dynamically.
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  const observeAll = () => qsa(".reveal:not(.is-visible)").forEach((t) => observer.observe(t));
  observeAll();

  ["[data-portfolio-grid]", "[data-services-grid]", "[data-testimonial-track]"].forEach((selector) => {
    const node = qs(selector);
    if (!node) return;
    new MutationObserver(observeAll).observe(node, { childList: true });
  });
}

/* ------------------------------------------------------------
   Contact form (frontend only)
   ------------------------------------------------------------
   IMPORTANT: This form does NOT send an email or store data
   anywhere. Submitting it just shows a confirmation message
   in the browser. To make this form actually deliver messages
   to your inbox, connect it to a form backend such as:
     - Formspree (https://formspree.io)
     - Getform (https://getform.io)
     - Netlify Forms (if you host on Netlify)
     - Your own small backend/serverless function
   Typically that means adding an "action" and "method" to the
   <form> tag, or POSTing the form data with fetch() to that
   service's endpoint from inside this function.
   ------------------------------------------------------------ */
function initContactForm() {
  const form = qs("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Basic frontend validation using the browser's built-in
    // constraint validation (required fields, email format).
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // ---- Connect your form backend here ----
    // Example (uncomment and edit once you have an endpoint):
    //
    // const data = new FormData(form);
    // fetch("https://formspree.io/f/your-form-id", {
    //   method: "POST",
    //   body: data,
    //   headers: { Accept: "application/json" },
    // });

    const success = qs("[data-form-success]");
    if (success) success.classList.add("is-visible");
    form.reset();
  });
}

/* ------------------------------------------------------------
   Show the chosen filename on the custom file-attach button
   ------------------------------------------------------------ */
function initFileLabel() {
  const input = qs("#cf-file");
  const label = qs("[data-file-label]");
  if (!input || !label) return;
  const defaultText = label.textContent;
  input.addEventListener("change", () => {
    label.textContent = input.files.length ? input.files[0].name : defaultText;
  });
}

/* ------------------------------------------------------------
   Client chat panel (frontend concept only)
   ------------------------------------------------------------
   IMPORTANT: This is a visual demonstration of a chat UI, not
   a real messaging system. Messages typed here are NOT saved,
   NOT sent to your email, and disappear on page refresh.
   Building a real private client chat (like the one described
   in the CMS version of this brief) requires a backend and a
   database to store conversations, plus authentication so only
   you can read them — none of which plain HTML/CSS/JS can do
   on its own. If you want that later, look into a backend
   platform such as Supabase or Firebase.
   ------------------------------------------------------------ */
function initChatDemo() {
  const form = qs("[data-chat-form]");
  const input = qs("[data-chat-input]");
  const messages = qs("[data-chat-messages]");
  if (!form || !input || !messages) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    messages.appendChild(el("div", { class: "chat-bubble from-me" }, text));
    input.value = "";
    messages.scrollTop = messages.scrollHeight;

    // Simulated auto-reply so the demo feels alive. Replace this
    // entire block with a real backend call when you add one.
    window.setTimeout(() => {
      messages.appendChild(
        el(
          "div",
          { class: "chat-bubble from-studio" },
          "Thanks for the note — this is a UI preview, so replies aren't monitored yet. Please use the contact form above for real inquiries."
        )
      );
      messages.scrollTop = messages.scrollHeight;
    }, 700);
  });
}
