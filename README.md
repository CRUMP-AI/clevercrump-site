# clevercrump.com

The Clever Crump parent company website. Static HTML, no build step, no frameworks.

## Structure

- `index.html` — homepage: hero, products, philosophy, founder, footer
- `privacy.html` — company privacy policy
- `terms.html` — company terms of service
- `contact.html` — contact / support / press / partnerships
- `assets/css/style.css` — hand-written stylesheet
- `assets/js/main.js` — mobile nav, scroll reveals (no dependencies)
- `favicon.svg` — gold C monogram
- `CNAME` — `clevercrump.com` (GitHub Pages custom domain)

## Brand tokens

- Near-black `#070a0e` · Ivory `#f1efe9` · Gold `#d5b971` / `#b69855`
- Serif headlines (Georgia), clean sans body
- Eyebrow labels: 0.7rem, uppercase, 0.38em tracking, gold
- Voice: direct, confident, no hype

## Deploy

Enable GitHub Pages on this repo (Settings → Pages → Deploy from branch → `main` / root).
DNS for `clevercrump.com` should point at GitHub Pages; the `CNAME` file handles the rest.
