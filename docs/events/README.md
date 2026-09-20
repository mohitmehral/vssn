# Trust Event Photos

Drop event photographs into **this folder** to have them appear automatically
in the "Our Trust Events" showcase on the website. The page always displays the
**latest-dated** images first.

## Naming convention (required)

```
YYYY-MM-DD_short-title.ext
```

- `YYYY-MM-DD` — the date of the event (drives ordering, newest first)
- `short-title` — a few words separated by hyphens; becomes the caption
- `ext` — one of `jpg`, `jpeg`, `png`, `webp`

### Examples

```
2026-01-14_makar-sankranti-bhandara.webp
2026-03-03_holi-satsang.jpg
2026-08-15_annadanam-seva.png
```

`2026-08-15_annadanam-seva.png` would show a caption of **"Annadanam Seva"**.

## How it works

At build time the site scans this folder (`docs/events/`) via
`src/data/trustEvents.ts`, parses the date prefix, sorts newest-first, and
renders the images in the auto-scrolling showcase. Just add a file and rebuild
(or push — the GitHub Action rebuilds automatically). No code changes needed.

> Keep image files reasonably sized (ideally under ~500 KB, max width ~1600px)
> so the site stays fast.
