/* ============================================================
   PROJECT.JS — PROJECT DETAIL PAGE (project.html)
   ------------------------------------------------------------
   Reads the project id from the URL (project.html?id=northwind)
   finds the matching project in the PROJECTS array in data.js,
   and fills in the page. If no matching project is found, it
   shows a simple "not found" message instead.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  renderSiteBasics();
  renderSocialLinks();
  initMobileMenu();

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    showNotFound();
    return;
  }

  renderProject(project);
});

/* Small DOM helpers (same pattern as script.js, kept local to
   this file so project.html doesn't need to load script.js). */
function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}
function qsa(selector, scope) {
  return Array.from((scope || document).querySelectorAll(selector));
}
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

function setYear() {
  const yearEl = qs("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function renderSiteBasics() {
  qsa("[data-site-name]").forEach((n) => (n.textContent = SITE.name));
  qsa("[data-site-email]").forEach((n) => {
    n.textContent = SITE.email;
    if (n.tagName === "A") n.href = `mailto:${SITE.email}`;
  });
}

function renderSocialLinks() {
  qsa("[data-social-list]").forEach((list) => {
    SOCIAL_LINKS.forEach((link) => {
      list.appendChild(el("a", { href: link.url, target: "_blank", rel: "noopener" }, link.label));
    });
  });
}

function initMobileMenu() {
  const toggle = qs("[data-nav-toggle]");
  const menu = qs("[data-mobile-menu]");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
}

function showNotFound() {
  const main = qs("[data-project-main]");
  if (!main) return;
  main.innerHTML = "";
  main.appendChild(
    el("div", { class: "wrap section" }, [
      el("p", { class: "eyebrow" }, "Project not found"),
      el(
        "h1",
        { class: "section-title", style: "margin-top:16px;" },
        "That project doesn't exist"
      ),
      el("p", { style: "margin-top:20px; color: var(--ink-soft);" }, [
        "The project you're looking for may have been removed or the link is out of date. ",
      ]),
      el("a", { class: "btn", href: "index.html#portfolio", style: "margin-top:28px; display:inline-flex;" }, "← Back to portfolio"),
    ])
  );
}

function renderProject(project) {
  // Page title + meta description
  document.title = `${project.title} — ${SITE.name}`;
  const metaDesc = qs('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", project.description);
  const ogTitle = qs('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", `${project.title} — ${SITE.name}`);
  const ogDesc = qs('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", project.description);
  const ogImage = qs('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute("content", project.cover);

  qs("[data-project-category]").textContent = project.category;
  qs("[data-project-title]").textContent = project.title;

  const specs = qs("[data-project-specs]");
  specs.innerHTML = "";
  const specEntries = [
    ["Client", project.client],
    ["Year", project.year],
    ["Services", project.services.join(", ")],
    ["Tools", project.tools.join(", ")],
  ];
  specEntries.forEach(([label, value]) => {
    specs.appendChild(el("dt", null, label));
    specs.appendChild(el("dd", null, value));
  });

  const cover = qs("[data-project-cover]");
  cover.src = project.images[0];
  cover.alt = `${project.title} cover image`;

  qs("[data-project-overview]").textContent = project.overview;
  qs("[data-project-challenge]").textContent = project.challenge;
  qs("[data-project-solution]").textContent = project.solution;

  // External project link (optional)
  const linkWrap = qs("[data-project-link-wrap]");
  const linkEl = qs("[data-project-link]");
  if (project.link) {
    linkEl.href = project.link;
    linkEl.textContent = "Visit live project ↗";
    linkWrap.style.display = "block";
  } else {
    linkWrap.style.display = "none";
  }

  // Gallery — all images including the cover, so replacing the
  // "images" array in data.js is all that's needed to add more.
  const gallery = qs("[data-project-gallery]");
  gallery.innerHTML = "";
  project.images.forEach((src, index) => {
    gallery.appendChild(
      el("img", {
        src,
        alt: `${project.title} — image ${index + 1}`,
        loading: "lazy",
      })
    );
  });

  // Testimonial tied to this project, if any
  const testimonial = TESTIMONIALS.find((t) => t.id === project.testimonialId && t.public);
  const testimonialWrap = qs("[data-project-testimonial]");
  if (testimonial && testimonialWrap) {
    testimonialWrap.style.display = "block";
    testimonialWrap.querySelector("[data-testimonial-quote]").textContent = testimonial.review;
    testimonialWrap.querySelector("[data-testimonial-name]").textContent = testimonial.name;
    testimonialWrap.querySelector("[data-testimonial-company]").textContent = testimonial.company;
    const img = testimonialWrap.querySelector("[data-testimonial-image]");
    if (img) {
      img.src = testimonial.image;
      img.alt = testimonial.name;
    }
  } else if (testimonialWrap) {
    testimonialWrap.style.display = "none";
  }

  // Related projects: up to 3 other projects, preferring the
  // same category first.
  const related = PROJECTS.filter((p) => p.id !== project.id);
  related.sort((a, b) => (a.category === project.category ? -1 : 0) - (b.category === project.category ? -1 : 0));
  const relatedGrid = qs("[data-related-grid]");
  relatedGrid.innerHTML = "";
  related.slice(0, 3).forEach((p) => {
    relatedGrid.appendChild(
      el("a", { class: "project-card-link", href: `project.html?id=${p.id}` }, [
        el("div", { class: "project-card" }, [
          el("div", { class: "thumb" }, [
            el("img", { src: p.cover, alt: `${p.title} cover`, loading: "lazy" }),
          ]),
          el("div", { class: "project-meta" }, [
            el("span", { class: "cat" }, p.category),
            el("h3", null, p.title),
          ]),
        ]),
      ])
    );
  });
}
