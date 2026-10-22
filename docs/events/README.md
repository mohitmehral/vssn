# Trust Event Media

Drop event photographs or short videos into **this folder** and they appear automatically in the
"Sansthan Events" gallery and the hero "Living Calendar" panel. The site always
shows the **newest media first**.

## Naming — both of these work

The site reads the date from the filename. Any image whose name **contains a
`YYYY-MM-DD` date** is picked up. Two common patterns:

**1. WhatsApp export style (what you're using):**
```
PHOTO-YYYY-MM-DD-HH-MM-SS.jpg
```
e.g. `PHOTO-2026-09-21-16-45-59.jpg`
- Date + time drive ordering (newest first, including time-of-day on the same day).
- No title in the name → caption shows **"Sansthan Event"**.

**2. Titled style (optional, for a nicer caption):**
```
YYYY-MM-DD_short-title.jpg
```
e.g. `2026-08-15_Manish-kumar-Varanasi.jpg` → caption **"Manish Kumar Varanasi"**.

Allowed extensions: `jpg`, `jpeg`, `png`, `webp`, `mp4`, `m4v`, `webm`.

Hero videos autoplay muted, loop, and play inline because browsers block audible
autoplay. Player controls let visitors unmute them after playback begins. Gallery
videos also include player controls. For reliable browser playback, prefer H.264/AAC MP4 or M4V, ideally
720p and under 10 MB. The filename date and optional time control sequence.

## How it works

At build time `src/data/trustEvents.ts` scans this folder, extracts each date
(and time if present), sorts newest-first, and `scripts/sync-events.mjs` copies
the media into `public/events/` for publishing. Just add files and push — the
GitHub Action rebuilds and deploys automatically. No code changes needed.

> Keep files reasonably sized (ideally under ~1 MB each) so the site stays fast.
