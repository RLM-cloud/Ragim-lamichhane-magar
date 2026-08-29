# Mira Solano — Graphic Designer Portfolio

A premium, fully static portfolio site built with plain HTML, CSS and
JavaScript — no frameworks, no build step, no database. All the content
you'll want to change lives in one file: **`data.js`**.

## Folder structure

```
portfolio/
├── index.html          Home page (hero, about, portfolio, services, testimonials, contact)
├── project.html         Project / case-study detail page (reads ?id= from the URL)
├── style.css             All styles
├── script.js              Behavior for index.html
├── project.js              Behavior for project.html
├── data.js                  ALL editable content — start here
│
├── assets/
│   ├── images/                 Profile photo, hero image, favicon
│   ├── projects/                 Project cover + gallery images
│   ├── testimonials/               Client photos
│   └── icons/                        (empty — reserved if you add custom icon files)
│
├── robots.txt
└── sitemap.xml
```

> Note: the original brief listed just `script.js`, but this project splits
> page-specific behavior into `script.js` (home page) and `project.js`
> (project detail page) so neither file runs code for a page it isn't on.
> Both files read from the same `data.js`.

---

## 1. Open the project in VS Code

1. Download/unzip the `portfolio` folder.
2. In VS Code: **File → Open Folder…** and select `portfolio`.

## 2. Run it locally with Live Server

1. Install the **Live Server** extension (by Ritwick Dey) from the VS Code
   Extensions panel, if you don't already have it.
2. Right-click `index.html` in the file explorer → **Open with Live Server**.
3. Your browser opens the site at an address like `http://127.0.0.1:5500`.

You can also just double-click `index.html` to open it directly in a
browser, but Live Server is recommended because it auto-refreshes when you
save a file.

---

## 3. Where to change things

Everything below is a change to **`data.js`** unless noted otherwise.

| What | Where in `data.js` |
|---|---|
| Your name, title, email, phone, location | `SITE` object |
| Hero heading, intro text, buttons | `HERO` object |
| About bio, philosophy, skills, tools, experience | `ABOUT` object |
| Portfolio filter categories | `CATEGORIES` array |
| Projects (add / remove / edit) | `PROJECTS` array |
| Services offered | `SERVICES` array |
| Testimonials | `TESTIMONIALS` array |
| Contact form dropdown options | `CONTACT_OPTIONS` object |
| Social media links | `SOCIAL_LINKS` array |

### Add a project

1. Open `data.js` and find the `PROJECTS` array.
2. Copy one whole project object (from `{` to `}`, including the comma
   after it) and paste it into the array.
3. Give it a unique `id` (this becomes the URL: `project.html?id=your-id`).
4. Edit `title`, `category`, `client`, `year`, `description`, `overview`,
   `challenge`, `solution`, `tools`, `services`.
5. Set `cover` and `images` to point at your image files (see below).
6. Save. It will automatically appear in the portfolio grid and filters —
   you never need to touch `index.html` or `project.html`.

### Remove a project

Delete its entire `{ ... }` object from the `PROJECTS` array in `data.js`.

### Replace project images

1. Put your image file(s) inside `assets/projects/`.
2. In the project's entry in `data.js`, update the `cover` field and the
   `images` array to the new file path(s), e.g.
   `"assets/projects/my-new-cover.jpg"`.
3. The first item in `images` is used as the cover/thumbnail and as the
   large image at the top of the project detail page. All items in
   `images` show in the gallery on that page — add as many as you like.

The site ships with generated placeholder graphics (abstract shapes, not
real photos) so you can see the layout working immediately. Replace them
with your real work whenever you're ready — the file names don't matter,
only the paths referenced in `data.js`.

### Add a testimonial

1. Add a client photo to `assets/testimonials/` (optional — you can also
   reuse one of the placeholder avatars).
2. Copy a testimonial object in the `TESTIMONIALS` array in `data.js` and
   edit its fields.
3. Set `"public": true` to show it, or `false` to hide it while you decide
   (useful if you're collecting reviews and want to approve them first).
4. Optionally set a project's `testimonialId` to that testimonial's `id`
   to show it on that project's detail page too.

### Edit services

Add, remove or reorder objects in the `SERVICES` array in `data.js`. The
`icon` field picks from a small built-in icon set (`mark`, `grid`,
`layers`, `square`, `type`, `cursor`) defined near the top of `script.js`
— you can reuse any of those names.

### Change social links

Edit the `SOCIAL_LINKS` array in `data.js`. Add or remove entries; they
appear automatically in the footer and contact section.

### Change colors

Open `style.css` and edit the values at the very top, inside the `:root {
}` block (the "design tokens" section). For example, change
`--cobalt: #2a4bff;` to any hex color to change the accent color
site-wide.

### Change fonts

The site loads three Google Fonts via a `<link>` tag in the `<head>` of
`index.html` and `project.html`: **Anton** (headlines), **Inter** (body
text) and **IBM Plex Mono** (labels/eyebrows). To use different fonts:

1. Pick fonts at [fonts.google.com](https://fonts.google.com) and copy
   their `<link>` embed code.
2. Replace the existing font `<link>` tags in both HTML files.
3. Update the `--font-display`, `--font-body` and `--font-mono` values in
   `style.css`.

### Where to put new images

- General site images (profile photo, hero visual, favicon) →
  `assets/images/`
- Project photos → `assets/projects/`
- Client photos for testimonials → `assets/testimonials/`
- Any custom icon files you add yourself → `assets/icons/`

Use reasonably compressed JPG/PNG/WebP files for real photography —
large, uncompressed images will slow the site down. Images already use
`loading="lazy"` so off-screen images don't load until needed.

---

## About the contact form and chat panel

Both are **frontend-only** in this version, as requested — there's no
backend or database, so nothing typed into them is stored or emailed
anywhere yet.

- **Contact form**: submitting it currently just shows an on-page "thanks"
  message (see `initContactForm()` in `script.js`). To actually receive
  messages, connect a form backend such as
  [Formspree](https://formspree.io), [Getform](https://getform.io) or
  Netlify Forms (if you host on Netlify) — each gives you a POST endpoint
  and a few lines of setup that are commented in `script.js` where you'd
  add them.
- **Chat panel**: a visual preview of a chat UI, including a simulated
  auto-reply. It is **not** real-time or private — messages disappear on
  refresh. Real private client messaging needs a backend and database
  (for example Supabase or Firebase) to store conversations and
  authentication so only you can read them. The UI is built so it's ready
  to wire up to something like that later; see the comment above
  `initChatDemo()` in `script.js`.

---

## Deploying

This is a static site, so it works on any static host. Three easy free
options:

### GitHub Pages
1. Push the `portfolio` folder contents to a GitHub repository.
2. In the repo: **Settings → Pages → Branch** → select your main branch
   and `/ (root)`, then save.
3. Your site publishes at `https://yourusername.github.io/reponame/`.

### Netlify
1. Push the folder to GitHub (or drag-and-drop the folder into
   [app.netlify.com/drop](https://app.netlify.com/drop)).
2. If using GitHub: **Add new site → Import an existing project**, pick
   the repo, leave the build command empty, set publish directory to `/`.

### Vercel / Cloudflare Pages
Same idea — import the GitHub repo, no build command needed, output
directory is the project root.

### Connecting your own domain
All three hosts above have a **Domain settings** page where you can add
your existing domain and follow their DNS instructions (usually adding a
CNAME or A record at your domain registrar). Once verified, update
`robots.txt` and `sitemap.xml` to use your real domain instead of
`yourdomain.com`.

---

## SEO checklist already in place

- Descriptive `<title>` and `<meta name="description">` on both pages
  (auto-filled from `data.js` where possible)
- Open Graph tags for social previews
- Semantic HTML (`<header>`, `<main>`, `<footer>`, proper heading order)
- `alt` text on all images, generated from project/testimonial data
- `robots.txt` and `sitemap.xml` included — update the domain in both
  once you deploy
- Clean, readable URLs for project pages (`project.html?id=...`)

---

## Browser support note

The site uses modern but well-supported CSS/JS (CSS custom properties,
`IntersectionObserver`, `URLSearchParams`) and works in all current
versions of Chrome, Firefox, Safari and Edge.
