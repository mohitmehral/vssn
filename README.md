# Vishwa Sanatan Sansthanam

The official website of **Vishwa Sanatan Sansthanam** — a religious and
cultural trust registered in India.

_सामाजिक समरसता ही सनातन की पहचान है।_

🌐 **www.vishwasanatansansthanam.org** (short: vssn.org.in) · ✉️ vishwasanatansansthanam@gmail.com · 📞 +91 7388735905

---

## Local development

```bash
npm install
npm run dev      # local preview
npm run build    # production build
```

## Adding event photos and videos

The single source of truth for hero and event-gallery media is:

```text
docs/events/
```

Administrators can open that folder on GitHub, select **Add file → Upload
files**, upload the media, and commit it to `main`. GitHub Actions then rebuilds
and deploys the website automatically—no code change is required.

Supported formats:

- Photos: `.jpg`, `.jpeg`, `.png`, `.webp`
- Videos: `.mp4`, `.m4v`, `.webm`

Every filename must contain a date in `YYYY-MM-DD` format. Add a time or sequence
after the date to control the order; the newest date/time appears first:

```text
2026-10-22-19-49-01_event-title.jpg
2026-10-22-19-49-02_event-title.mp4
2026-10-22-19-49-03_another-event.webp
```

WhatsApp-style filenames such as `PHOTO-2026-09-21-16-45-59.jpg` also work.
Text after the date/time becomes the displayed title when available.

For reliable, fast video playback, use short H.264/AAC MP4 videos, preferably
720p or below and under 10 MB. Browsers require autoplaying hero videos to start
muted; the visible player controls let visitors unmute them. Videos loop and play
inline, and gallery videos also show playback controls.

To remove an item, delete it from `docs/events/` and commit the deletion. The
next deployment removes it from the live website as well.

More details are available in [`docs/events/README.md`](docs/events/README.md).

## Adding member photos

Put 2:3 portrait images in `public/members/`:

- `www.vishwasanatansansthanam.org-member-<sequence>.jpg` shows the India flag
- `www.vishwasanatansansthanam.org-member-<country>-<sequence>.jpg` shows that country's flag (e.g. `usa`, `sweden`)

They display in order of `<sequence>`.

---

© Vishwa Sanatan Sansthanam. Reg. No. IN-UP76422624409815Y.
