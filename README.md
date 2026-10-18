# IronBuddy: Workout Tracker — website

The site at **https://workout.ironbuddy.fit**: marketing site for **IronBuddy: Workout Tracker** — the offline Android workout tracker with no account, no ads, and no subscription.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- Static export (GitHub Pages)

## Configure

Update `src/lib/site.ts` before launch:

- `url` — production domain
- `playStoreUrl` — Google Play listing
- `contactEmail` — support inbox
- `freeTrialDays` — keep in sync with the privacy policy and the Play listing

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static files are written to `out/`.

## SEO

Every indexable page is registered once in `src/lib/pages.ts` (path, title, description, dates, summary). The
registry drives page metadata, the sitemap, the header and footer links, related-link cards, and `/llms.txt`.

- `src/lib/seo.ts` — `pageMetadata()` builds a complete title, description, canonical, Open Graph and Twitter set.
  Next.js merges metadata shallowly, so each page must set all of it itself; do not rely on the root layout.
- `src/lib/structured-data.ts` — JSON-LD builders (Organization, WebSite, WebPage, MobileApplication, BreadcrumbList,
  FAQPage, Article, CollectionPage).
- `src/lib/content.ts` — shared copy: features, FAQ, navigation and footer links.

### Add a page

1. Add an entry to `pages` in `src/lib/pages.ts`. Keep the full title (with ` | IronBuddy`) at 50–60 characters and
   the description at 140–160.
2. Create `src/app/<path>/page.tsx`: export `metadata = pageMetadata(pages.yourPage)` and render
   `<JsonLd data={pageGraph(...)} />`.
3. Link to it from at least one other page, then run the check below.

### Check before you deploy

```bash
npm run build && npm run seo:check
```

The script checks title and description lengths, canonicals, Open Graph tags, headings, JSON-LD, image attributes,
internal links and anchors, and that the sitemap, robots.txt and llms.txt match the built pages.

### Content rules

- State only what the app does. Every claim should be backed by the privacy policy, the screenshots, or the Play listing.
- Do not state other apps' prices, features, or policies. They change, and a wrong claim is worse than none.
- Mark up each FAQ question on one page only. `/faq/` holds the full list; other pages carry questions that are unique to them.
- Bump `modified` in `src/lib/pages.ts` when a page's content changes.

### Privacy policy

The source of truth is [ironbuddyapp/ironbuddy-privacy-policy](https://github.com/ironbuddyapp/ironbuddy-privacy-policy).
`src/app/privacy/page.tsx` mirrors it word for word. Change the policy there first, then update the page and bump the
page's `modified` date.

### Still needs real data

- `offers.price` (the real one-time price, not `0`: the app is free to download but needs a purchase after the trial)
  and a genuine `aggregateRating` in the app's JSON-LD, once the Play listing is public.
- A developer or team name and bio for the About page, if you want one.
- A Terms of Use page, if you want one. It needs your own legal wording.
