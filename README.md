# future.nostalgia

Lead-magnet landing page for **future.nostalgia** — $10 instant analog prints, turnkey for events and venues.

Static site (no build step). Hand-written HTML/CSS/JS so it deploys instantly and has nothing to maintain. Hosted on **Cloudflare Pages**, DNS on **Cloudflare**, domain registered at **NamesPro.ca**, email on **Zoho**.

## Files

| File | Purpose |
|---|---|
| `index.html` | The landing page |
| `styles.css` | All styling + design tokens (CSS variables at top) |
| `main.js` | Scroll reveals, hero animation, form submit |
| `favicon.svg` · `og-image.svg` | Brand marks |
| `404.html` | On-brand not-found page |
| `robots.txt` · `sitemap.xml` | SEO |

## Local preview

No tooling needed — open `index.html`, or serve it:

```bash
python3 -m http.server 4000   # then visit http://localhost:4000
```

---

## 1. Wire up the form (2 min — required, do this first)

The booking form posts to **Web3Forms** (free, no backend). Until you add a key, the form shows
"Form not connected yet."

1. Go to **https://web3forms.com**, enter the inbox you want inquiries delivered to
   (e.g. `futurenostalgiacreative@gmail.com`), and copy the **Access Key** they email you.
2. In `index.html`, replace `REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY` with that key.
3. Commit + push. Submissions now land in that inbox.

> Swapping providers later (e.g. Formspree): change the `<form action=...>` URL and the hidden
> `access_key` field — the JS in `main.js` is provider-agnostic (posts FormData, expects JSON).

## 2. Add real photos (the one thing only you can supply)

The hero shows three duotone placeholder frames. Replace them with **real instant prints** — that's
what sells an analog-photography service.

1. Drop images into an `assets/` folder (square crops look best, ~800×800).
2. In `styles.css`, find `.print__photo--a / --b / --c` and swap each gradient for
   `background: url("/assets/your-photo.jpg") center/cover;`.

---

## 3. Deploy — Cloudflare Pages

Connected to GitHub `phdemotions/future.nostalgia`; every push to `main` auto-deploys.

**One-time setup (Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git):**

- Repository: `phdemotions/future.nostalgia`
- Production branch: `main`
- Framework preset: **None**
- Build command: *(empty)*
- Build output directory: `/`

That's it — it's a static site, no build.

## 4. DNS / domain runbook

See the project handoff notes for the full step-by-step. Summary:

- **Nameservers** (at NamesPro): change from `htns1/2/3.namespro.ca` → the two Cloudflare
  nameservers shown on the Cloudflare dashboard Overview page.
- **Cloudflare DNS:** the apex + `www` records are managed automatically once the domain is added
  as a custom domain in Pages. Delete the stale records pointing at the old DigitalOcean droplet
  (`143.110.209.156` A record, the matching AAAA, and the dead `www → *.tempurl.host` CNAME).
- **DO NOT TOUCH the Zoho `MX` records** (`mx.zoho.com`, `mx2`, `mx3`) or any `TXT` SPF/DKIM/DMARC
  records — those keep email working.
