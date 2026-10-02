# Annerie's Driving School website

A fast, static website (plain HTML, CSS and JavaScript). No build step, no frameworks, no dependencies.

## Put it online with GitHub Pages
1. Create a new repository on GitHub and upload **the contents of this folder** (so `index.html` sits at the top level).
2. Go to **Settings > Pages**. Under "Build and deployment" choose **Deploy from a branch**, pick `main` and `/ (root)`, then Save.
3. After a minute the site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.
4. Custom domain: add it under Settings > Pages, then point the domain's DNS at GitHub Pages.

## Folder layout
```
index.html              Welcome page
pricing.html            Pricing, calculator and packages
success-stories.html    Learner numbers, pass rates and testimonials
contact.html            Contact form, hours and map
404.html                Page-not-found screen
assets/
  css/styles.css        Design: colours are variables at the top of the file
  js/config.js          ALL the content (edit this one)
  js/main.js            Behaviour (rarely needs editing)
  img/favicon.svg       Browser tab icon
robots.txt, sitemap.xml Search engine files (update the web address inside)
```

## Changing information
Open `assets/js/config.js`. Everything is labelled:
phone and WhatsApp numbers, address, opening hours, services, prices, packages, testimonials, FAQs, stats and the number of learners. Save, upload, done. Pages update everywhere at once (header, footer, structured data for Google).

**Colours:** change the variables at the top of `assets/css/styles.css` (`--red`, `--pink`, `--pink-soft`, `--blush`, `--wine`).

## Contact form
GitHub Pages cannot run server code, so the form works in one of two ways:
- **Default:** it opens WhatsApp with the visitor's message pre-filled.
- **Email:** create a free form at https://formspree.io and paste its URL into `formEndpoint` in `config.js`. Enquiries then arrive in your inbox.

## Before launch checklist
- [ ] Replace the placeholder phone, email, address and map query
- [ ] Replace placeholder testimonials, stats and prices with real ones (do not publish invented reviews)
- [ ] Replace the illustration of Annerie with a real photo (see the comment in `index.html`)
- [ ] Update the web address in `robots.txt` and `sitemap.xml`
- [ ] Add the real legal line in `brand.legal`
