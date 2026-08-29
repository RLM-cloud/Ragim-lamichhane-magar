/* ============================================================
   DATA.JS — YOUR EDITABLE CONTENT
   ------------------------------------------------------------
   Everything on the website that you'd normally want to change
   (your name, project list, services, testimonials, links...)
   lives in this one file. The HTML and script.js just read
   from here and build the page automatically.

   To update the site:
   1. Edit the values below.
   2. Save the file.
   3. Refresh the browser (Live Server does this for you).

   You do NOT need to touch index.html, project.html, style.css
   or script.js to update text, projects, services or links.
   ============================================================ */

/* ------------------------------------------------------------
   1. SITE / OWNER INFO
   Shown in the nav, footer, hero, meta tags, etc.
   ------------------------------------------------------------ */
const SITE = {
  name: "Ragim Lamichhane Magar",
  title: "Graphic Designer & Brand Stylist",
  shortName: "Ragim", // used in nav logo / favicon area
  email: "ragimmagar@gmail.com",
  phone: "+9779815599385",
  location: "Nepal, ",
  metaDescription:
    "Ragim is a graphic designer specializing in brand identity, packaging and editorial design. View selected work and get in touch.",
};

/* ------------------------------------------------------------
   2. SOCIAL / PROFESSIONAL LINKS
   Add, remove or edit entries — the footer and contact page
   loop over this list automatically.
   ------------------------------------------------------------ */
const SOCIAL_LINKS = [
  { label: "Instagram", url: "https://instagram.com/" },
  { label: "LinkedIn", url: "https://linkedin.com/" },
  { label: "Behance", url: "https://behance.net/" },
  { label: "Dribbble", url: "https://dribbble.com/" },
];

/* ------------------------------------------------------------
   3. HERO SECTION (Home page top)
   ------------------------------------------------------------ */
const HERO = {
  eyebrow: "Portfolio 2022—2026",
  headline: "Design that\nearns a second look.",
  description:
    "I'm Ragim, a graphic designer working across brand identity, packaging and editorial design for independent studios, restaurants and small manufacturers.",
  ctaPrimary: { label: "View my work", href: "#portfolio" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
  visualImage: "assets/images/hero-visual.svg",
  visualAlt: "Abstract geometric composition in cobalt, mustard and ink",
};

/* ------------------------------------------------------------
   4. ABOUT SECTION
   ------------------------------------------------------------ */
const ABOUT = {
  heading: "About",
  profileImage: "assets/images/profile.svg",
  profileAlt: "Portrait of Ragim Lamichhane Magar",
  bio: [
    "I've spent the last eight years helping small, ambitious brands look like they belong in rooms much bigger than the ones they started in — through identity systems, packaging and print that hold up under scrutiny.",
    "My process starts with a client's actual constraints — budget, materials, timelines — rather than a mood board. Good design should survive contact with a print run, not just a screen.",
  ],
  philosophy:
    "Clarity before decoration. If a mark, a layout or a color doesn't help someone understand the brand faster, it doesn't earn a place in the system.",
  skills: [
    "Brand Identity",
    "Logo Design",
    "Packaging Design",
    "Editorial Layout",
    "Art Direction",
    "Typography Systems",
  ],
  tools: [
    "Adobe Illustrator",
    "Adobe InDesign",
    "Adobe Photoshop",  
    "Figma",
    "",
  ],
  experience: [
    { role: "Freelancer", org: " I have more than 4 years of experince with graphics designing", years: "2022—Present" },
    
  ],
};

/* ------------------------------------------------------------
   5. PORTFOLIO CATEGORIES
   Used to build the filter buttons above the portfolio grid.
   The value must exactly match a project's "category" field.
   ------------------------------------------------------------ */
const CATEGORIES = [
  "All",
  "Branding",
  "Logo Design",
  "Packaging",
  "Social Media",
  "Poster",
  "UI/UX",
];

/* ------------------------------------------------------------
   6. PROJECTS
   ------------------------------------------------------------
   TO ADD A NEW PROJECT: copy one object below (including the
   { and }), paste it into the array, and edit its fields.
   Give it a unique "id" (used in the URL: project.html?id=...).

   TO REMOVE A PROJECT: delete its whole { ... } object.

   images: the first one is used as the cover/thumbnail on the
   portfolio grid. All of them appear on the project detail page.
   Replace the file paths with your own images inside
   assets/projects/ — file names don't matter, just keep the
   path pointing at the right file.
   ------------------------------------------------------------ */
const PROJECTS = [
  {
    id: "northwind",
    title: "Northwind Coffee",
    category: "Branding",
    client: "Northwind Coffee Roasters",
    year: "2026",
    cover: "assets/projects/project-01-cover.svg",
    images: [
      "assets/projects/project-01-cover.svg",
      "assets/projects/project-01-detail.svg",
    ],
    description:
      "A full identity system for a Pacific Northwest coffee roaster, built around a mark that references topographic contour lines.",
    overview:
      "Northwind needed an identity that felt regional without leaning on cabin-in-the-woods clichés. We built the system around contour-line iconography pulled from actual topographic maps of their sourcing regions.",
    challenge:
      "The previous identity looked interchangeable with a dozen other roasters in the same city. Nothing in the mark, palette or type told you where the beans came from.",
    solution:
      "A custom wordmark, a contour-based icon system, and a two-color print palette that works on kraft packaging without a fourth spot color.",
    tools: ["Illustrator", "InDesign", "Photoshop"],
    services: ["Brand Identity", "Packaging Design", "Signage"],
    testimonialId: 1,
    link: "",
  },
  {
    id: "auberge",
    title: "Auberge Table",
    category: "Branding",
    client: "Auberge Collective",
    year: "2025",
    cover: "assets/projects/project-02-cover.svg",
    images: [
      "assets/projects/project-02-cover.svg",
      "assets/projects/project-02-detail.svg",
    ],
    description:
      "Menu system and dining room signage for a farm-to-table restaurant group, using a warm, restrained editorial palette.",
    overview:
      "Auberge wanted their menus and signage to read like a small print run, not a template. The system leans on a single serif family set at generous sizes.",
    challenge:
      "Menus changed weekly with the harvest, so the system needed to survive constant re-typesetting without looking assembled by whoever was on shift.",
    solution:
      "A strict InDesign template with locked type styles and a two-column grid, so any staff member can update the menu without breaking the layout.",
    tools: ["InDesign", "Illustrator"],
    services: ["Editorial Layout", "Signage", "Print Templates"],
    testimonialId: 2,
    link: "",
  },
  {
    id: "kiosk",
    title: "Kiosk Magazine",
    category: "Poster",
    client: "Kiosk Independent Press",
    year: "2025",
    cover: "assets/projects/project-03-cover.svg",
    images: [
      "assets/projects/project-03-cover.svg",
      "assets/projects/project-03-detail.svg",
    ],
    description: "Cover and poster series for a quarterly independent culture magazine.",
    overview:
      "Four cover concepts and a companion poster series for newsstand and event display, designed to work as a set and individually.",
    challenge:
      "Each issue needed a distinct cover identity while still reading instantly as \"Kiosk\" from across a newsstand.",
    solution:
      "A fixed masthead treatment paired with a rotating full-bleed illustration system, keeping typography as the one constant.",
    tools: ["Illustrator", "Photoshop"],
    services: ["Poster Design", "Editorial Layout"],
    testimonialId: 3,
    link: "",
  },
  {
    id: "feral",
    title: "Feral & Co.",
    category: "Logo Design",
    client: "Feral & Co. Pet Supply",
    year: "2024",
    cover: "assets/projects/project-04-cover.svg",
    images: [
      "assets/projects/project-04-cover.svg",
      "assets/projects/project-04-detail.svg",
    ],
    description: "Logo and mark system for an independent pet supply shop.",
    overview:
      "A single flexible mark built to scale from a storefront sign down to a care-instruction hang tag without losing legibility.",
    challenge:
      "The founders wanted something playful that still felt credible enough for a shelf next to established pet-food brands.",
    solution:
      "A geometric paw-adjacent mark, deliberately abstracted so it reads as a shape first and a paw second — playful without being cute.",
    tools: ["Illustrator"],
    services: ["Logo Design", "Brand Guidelines"],
    testimonialId: 4,
    link: "",
  },
  {
    id: "monoline",
    title: "Monoline Studio",
    category: "UI/UX",
    client: "Monoline Studio",
    year: "2024",
    cover: "assets/projects/project-05-cover.svg",
    images: [
      "assets/projects/project-05-cover.svg",
      "assets/projects/project-05-detail.svg",
    ],
    description: "Marketing site design and design-token system for a product studio.",
    overview:
      "A small marketing site and a documented token system (color, type, spacing) so the in-house team could extend it after handoff.",
    challenge:
      "Monoline needed something they could maintain themselves after launch, without needing a designer for every new page.",
    solution:
      "A component-based Figma library mapped 1:1 to a documented CSS token system, handed off with usage notes.",
    tools: ["Figma"],
    services: ["UI/UX Design", "Design Systems"],
    testimonialId: 1,
    link: "",
  },
  {
    id: "saltpress",
    title: "Salt Press Packaging",
    category: "Packaging",
    client: "Salt Press Co.",
    year: "2023",
    cover: "assets/projects/project-06-cover.svg",
    images: [
      "assets/projects/project-06-cover.svg",
      "assets/projects/project-06-detail.svg",
    ],
    description: "Packaging redesign for a small-batch condiment line, sold in regional grocery.",
    overview:
      "A packaging refresh for six SKUs, designed to stand out on a crowded condiment shelf while keeping print costs low for a small producer.",
    challenge:
      "The client could only afford a two-color print process, and needed the six flavors to be tell-apart-able at a glance.",
    solution:
      "One consistent layout with a rotating flavor-coded band, printed in two spot colors that combine differently per SKU.",
    tools: ["Illustrator", "Photoshop"],
    services: ["Packaging Design"],
    testimonialId: 2,
    link: "",
  },
];

/* ------------------------------------------------------------
   7. SERVICES
   Add, remove or reorder freely — the list on the homepage is
   built directly from this array.
   ------------------------------------------------------------ */
const SERVICES = [
  {
    icon: "mark",
    title: "Brand Identity",
    description:
      "Logo, color, type and voice — a full system built to hold up across print, packaging and screen.",
    priceRange: "From $2,400",
  },
  {
    icon: "grid",
    title: "Logo Design",
    description:
      "A focused mark and usage guidelines, for founders who need one strong asset rather than a full system.",
    priceRange: "From $900",
  },
  {
    icon: "layers",
    title: "Packaging Design",
    description:
      "Shelf-ready packaging design for small-batch producers, built around real print constraints and budgets.",
    priceRange: "From $1,600 / SKU set",
  },
  {
    icon: "square",
    title: "Social Media Design",
    description:
      "Templated post, story and cover systems so your team can post consistently without a designer on call.",
    priceRange: "From $650",
  },
  {
    icon: "type",
    title: "Poster & Print Design",
    description: "Event, editorial and campaign posters designed to work at newsstand and pedestrian scale.",
    priceRange: "From $500",
  },
  {
    icon: "cursor",
    title: "UI/UX Design",
    description: "Marketing sites and small product surfaces, handed off as documented, developer-ready systems.",
    priceRange: "Project-based",
  },
];

/* ------------------------------------------------------------
   8. TESTIMONIALS
   "id" is referenced by a project's "testimonialId" above, so
   the project detail page can show the related quote.
   Set "public": false to hide a testimonial without deleting it
   (useful for reviews awaiting your approval).
   ------------------------------------------------------------ */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Renata Kessler",
    company: "Northwind Coffee Roasters",
    image: "assets/testimonials/client-01.svg",
    rating: 5,
    review:
      "Ragim asked better questions about our business than any designer we'd worked with before, and it shows in how well the identity actually holds up on packaging.",
    project: "Northwind Coffee",
    public: true,
  },
  {
    id: 2,
    name: "Andres Marchetti",
    company: "Auberge Collective",
    image: "assets/testimonials/client-02.svg",
    rating: 5,
    review:
      "Our menus used to look different every week depending on who typeset them. Mira's template fixed that completely, and it still feels handmade.",
    project: "Auberge Table",
    public: true,
  },
  {
    id: 3,
    name: "Talia Sung",
    company: "Kiosk Independent Press",
    image: "assets/testimonials/client-03.svg",
    rating: 4,
    review:
      "Four covers, one clear identity. Readers recognize the magazine on the shelf now, which wasn't true before.",
    project: "Kiosk Magazine",
    public: true,
  },
  {
    id: 4,
    name: "Jordan Diallo",
    company: "Feral & Co. Pet Supply",
    image: "assets/testimonials/client-04.svg",
    rating: 5,
    review:
      "The new mark works everywhere we need it, from a tiny hang tag to the storefront sign. That was exactly the brief.",
    project: "Feral & Co.",
    public: true,
  },
];

/* ------------------------------------------------------------
   9. CONTACT FORM OPTIONS
   Dropdown choices for the contact form on the Contact section.
   ------------------------------------------------------------ */
const CONTACT_OPTIONS = {
  projectTypes: [
    "Brand Identity",
    "Logo Design",
    "Packaging Design",
    "Social Media Design",
    "Poster / Print Design",
    "UI/UX Design",
    "Other",
  ],
  budgetRanges: [
    "Under $1,000",
    "$1,000 – $3,000",
    "$3,000 – $7,000",
    "$7,000+",
    "Not sure yet",
  ],
};
