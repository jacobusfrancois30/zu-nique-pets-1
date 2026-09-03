# Zu-nique Pet Shop — website

A statically hosted site for **zuniquepets.co.za**, served by Cloudflare Pages. No build step, no
framework, no server: Cloudflare Pages serves the files exactly as they sit in the repo.

```
.
├── index.html              ← the home page (structure, styles, content, behaviour)
├── care.html               ← the species care guide, with search and filters
├── content/
│   ├── site.json           ← home page copy; the CMS commits back to this file
│   └── species.json        ← care guide species; same idea
├── admin/
│   ├── index.html          ← Decap CMS at /admin/
│   └── config.yml          ← CMS schema  ⚠ two values to fill in
├── assets/
│   ├── editor.js           ← GrapesJS drag-and-drop editor (loads only on demand)
│   ├── species.js          ← the 80 care guide records, one object each
│   └── images/             ← logo.png, mark.png, and stock/ for CMS uploads
├── decap-oauth-worker/     ← spare copy of the OAuth broker (yours is already deployed)
│   ├── worker.js
│   └── wrangler.toml
├── _headers                ← Cloudflare Pages caching + security headers
├── robots.txt
└── sitemap.xml
```

---

## Updating the live site, in one page

The Pages project is connected to `jacobusfrancois30/zu-nique-pets`, so **the repo is the
site**. Anything committed to `main` is live within about a minute. There are three ways to
make that commit, and you can mix them freely.

| You want to | Use | What happens |
| --- | --- | --- |
| Change wording, hours, a phone number, a card, add a species | `/admin/` | Fill in a form, hit Publish. It commits for you. |
| Move things around, add or delete whole sections | The visual editor (Ctrl + Shift + E) | Drag, edit, hit Publish. It commits for you. |
| Change code, add files, do anything unusual | Git | `git add . && git commit && git push` |

Everything is already wired up. `admin/config.yml` and the `CONFIG` block in
`assets/editor.js` both point at the repo, the `main` branch, and the OAuth worker at
`divine-math-b409.jacobusfrancois30.workers.dev`. Nothing to fill in.

Two things to check the first time:

**The GitHub OAuth app** behind that worker must list the site as an allowed origin, and its
callback must be `https://divine-math-b409.jacobusfrancois30.workers.dev/callback`. If sign-in
fails with a redirect error, that is where to look.

**The custom domain.** Everything points at `https://zuniquepets.co.za`, which is what you set
as `site_url`. If that domain is not attached yet, do it in Cloudflare under Workers and Pages,
the zu-nique-pets project, Custom domains, and point the DNS there. Until it resolves, the site
still works on `zu-nique-pets.pages.dev`, but the canonical tags and sitemap will point at the
custom domain.

---

## 1. Deploy

### The repo is connected to Cloudflare Pages

Copy these files into the repository root (replacing the old `index.html`), then:

```bash
git add .
git commit -m "Rebuild site: new design, CMS and visual editor"
git push
```

Cloudflare Pages redeploys on push. Build command: **none**. Output directory: **/** (the root).

### If you are starting a fresh Pages project

1. Push this folder to a GitHub repository.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Framework preset **None**, build command **empty**, output directory **`/`**.
4. Deploy.

---

## 2. Editing content — three ways, pick whichever suits the moment

### a) Edit `content/site.json` directly

Every heading, phone number, opening time, card and FAQ on the page lives in that one file.
Change it, commit, done. If the file is missing or malformed the site silently falls back to
the defaults baked into `index.html`, so a bad edit can never take the site down.

### b) Decap CMS at `/admin/`, a proper visual form with no code

Already configured. Open `https://zuniquepets.co.za/admin/`, sign in with GitHub, and edit.
Saving commits to `content/site.json` or `content/species.json` and Cloudflare redeploys within
a minute.

GitHub does not let a static site sign users in on its own, which is why an OAuth broker
exists. Yours already runs at `divine-math-b409.jacobusfrancois30.workers.dev`. A spare
implementation sits in `decap-oauth-worker/` if you ever need to redeploy your own, and its
header comment has the steps.

Images uploaded through the CMS are committed to `assets/images/stock/` and referenced as
`/assets/images/stock/<file>`. The logo and the brand mark live one level up in
`assets/images/`, so a CMS upload can never overwrite them.

To try the CMS locally against your working copy: `npx decap-server`, then open
`http://localhost:8080/admin/` (the `local_backend: true` line enables this).

### c) The built-in drag-and-drop editor (GrapesJS)

On the live site press **Ctrl + Shift + E** (or **Cmd + Shift + E**), or add `?edit=1` to the
address. It works on both pages, so `care.html?edit=1` opens the care guide in the editor.

The page turns into a full visual editor. Drag blocks from the right-hand panel, click any
element to restyle it, double-click text to retype it, and switch between desktop, tablet and
mobile views.

Three buttons in the top bar:

**Publish** signs you in with GitHub in a popup, commits the page you are editing straight to
the repo, and Cloudflare rebuilds. The bar tells you which file you are editing. The sign-in
token is held in memory for that session only and never written to browser storage, so closing
the tab signs you out.

**Download** saves the finished HTML instead, for when you would rather review the change and
commit it yourself.

**Exit** reloads the live page and throws away anything you have not published or downloaded.

Nothing autosaves. That is deliberate: every change to the site is a commit you can see and
undo, which is what stops the CMS and the editor from overwriting each other.

The editor code loads from a CDN only when you trigger it, so ordinary visitors never download it.

> **Which one should you use?** Day-to-day copy, hours, cards and species go through the CMS,
> because the form cannot break the layout. Rearranging or adding sections goes through the
> editor. If you use the editor to restructure a section heavily, the `data-cms` hooks in it
> stop being updated by the CMS, so keep those attributes on anything you still want to edit
> through `/admin/`.

---

## 3. Adding your own photos

The catalogue cards ship with drawn artwork rather than stock photography: layered brand
colour behind a large line icon, one accent per category. It looks deliberate, it loads
instantly, and it never shows the wrong animal. Photos of your own stock will beat it, and
they drop straight in.

**Through the CMS** open `/admin/`, go to *Livestock cards*, upload an image (it commits to
`assets/images/stock/`) and the path fills itself into the *Photo* field.

**By hand** put files in `assets/images/stock/` and set the `img` value in `content/site.json`:

```json
{ "title": "Reptiles", "img": "/assets/images/stock/reptiles.jpg", "alt": "A bearded dragon basking" }
```

A photo covers the artwork on that card only, so you can add them one at a time as you take
them. Leave `img` as `""` and the drawn tile stays. If a photo path is wrong or the file is
slow, the tile shows through instead of a broken image.

Landscape shots at roughly 1200 x 800 work best. Keep each file under about 300 KB.

## 4. The care guide

`care.html` renders one card per species from `assets/species.js`. Eighty species at the
moment: 20 aquatics, 15 reptiles and tortoises, 8 amphibians, 12 birds, 12 small mammals and
13 invertebrates. Adding an animal means adding one object to that file, or one entry under
*Care guide species* in `/admin/`. Nothing else needs touching.

Each record carries a common name, scientific name, experience level, adult size, lifespan,
minimum housing, temperature gradient, humidity or water chemistry, UVB and lighting,
substrate, diet, a health-watch line, a short list of what people get wrong, and an optional
permit note. The permit note puts an amber badge on the card, which is how the indigenous and
CITES species are flagged.

Visitors can search by common name, scientific name, diet, substrate or symptom, and filter by
group. Every card has its own link, so `care.html#leopard-gecko` opens that species directly.
Useful when someone asks a question on WhatsApp and you want to send them straight to the
answer.

Below the catalogue there are seven reference guides covering the things that decide whether a
setup works: cycling an aquarium, heat gradients and UVB, feeder insect nutrition, moulting,
humidity and ventilation, bioactive setups, and managing Klerksdorp heat and winter nights.

### Where the numbers come from

The reptile temperature, humidity and UVB figures follow ReptiFiles, which publishes current
research-based parameters. Several of them are deliberately different from older pet-trade
care sheets: bearded dragon basking is 42 to 45 °C at the surface, ball python humidity runs
60 to 80 percent rather than 50 to 60, and leopard geckos now get low-level UVB. Invertebrate
husbandry follows The Bio Dude and the keeper consensus on Arachnoboards, which is why the
guide talks about pouring water into a corner rather than chasing a hygrometer reading.

The page credits and links all six references so customers can read further. Check the figures
against how you actually keep each species and change anything that does not match. Your
experience beats a general guide, and the file is there to be edited.

## 5. Things worth knowing

- **Opening hours drive the "Open now / Closed" badge.** `hours.schedule` in `content/site.json`
  must stay as seven rows starting with **Sunday** (that order matches JavaScript's day
  numbering). Times are 24-hour `HH:MM`. The badge is calculated in South African time
  (UTC+2) regardless of where the visitor is.
- **The hero hour cards** (`hours.weekdays` / `saturday` / `sunday`) are display text only —
  update them alongside the schedule so the two agree.
- **WhatsApp** uses `contact.whatsapp` in international format with no `+` or spaces
  (`27798200108`). Every WhatsApp button on the page reads from that one value.
- **Tailwind** is loaded from its CDN and configured inline at the top of `index.html`. The
  brand palette (`ink`, `deep`, `lime`, `cyan`, `magenta`, `amber`, …) is defined there — change
  a colour once and it updates everywhere.
- **`/admin/` is excluded** from search engines via `robots.txt` and the `_headers` file.
- Structured data (`PetStore` schema) is embedded for Google, including address, phone and
  opening hours — update it in `index.html` if the hours change permanently.
