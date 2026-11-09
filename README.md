# ORBIT ’26 — Beyond the possible

A React + React Bits landing page for a **fictional 36-hour student hackathon**, developed for the IEEE Computer Society UCSC Web Team Recruitment Task.

This is version 2: a full React rebuild with a WebGL plasma orb, an interactive mission selector, a tabbed flight plan, motion effects, and a three-step demo application with a downloadable SVG boarding pass.

## Start locally

Requirements: **Node.js 22.12 or newer**. Node 24 is recommended.

```bash
cd orbit-26
npm install
npm run dev
```

Open the Local URL printed in your terminal, normally **http://localhost:5173**. Stop with **Ctrl+C**.

## Production build

```bash
npm run build
npm run preview
```

The generated `dist/` folder is the deployable static website. No API keys, databases, environment variables, or backend are needed.

A pnpm lockfile is included for reproducible installs:

```bash
pnpm install --frozen-lockfile
pnpm build
```

## React Bits used

These are actual component sources retrieved from the [official React Bits registry](https://reactbits.dev) and [repository](https://github.com/DavidHDev/react-bits), not CSS imitations:

| Component | Purpose |
| --- | --- |
| Orb | Cursor-reactive WebGL2 plasma ring, click pulses, five-second warp boost |
| Decrypted Text | Introductory system-label text reveal |
| Spotlight Card | Pointer-following light and borders on mission and payload cards |
| Magnet | Restrained magnetic movement on primary calls to action |
| Count Up | View-triggered event numbers |
| Scroll Velocity | Marquee driven by scrolling speed |

The component sources and license are in `src/components/react-bits/`. Additional transitions use Motion for React; icons use Lucide. Font files and IEEE CS UCSC logos are served locally.

## Main interactions

- **Experience the orbit:** temporarily boosts the orb for five seconds, with an explicit toggle state.
- **Motion control:** pauses the orb and decorative CSS effects, disables magnetic movement, and replaces the moving marquee with static text. Operating-system reduced motion is respected.
- **Mission selector:** three cards update a terminal-style brief, suggested problem, and the application's initial mission.
- **Flight plan:** three days with click and keyboard navigation (Left, Right, Home, End).
- **Crew application:** nickname and role → mission → review → personalized demo boarding pass.
- **SVG download:** a locally generated, escaped SVG keeps text sharp at any resolution.
- **Countdown:** explicit Sri Lanka timezone timestamp, clamped at zero after launch.
- **Calendar:** a fictional 36-hour build window downloadable as `.ics`.
- **FAQ:** accessible disclosure buttons with expanded state and labeled answer regions.

## Accessibility and performance

- Semantic landmarks, one H1, a skip link, visible keyboard focus, native modal dialog, labeled fields, and keyboard-operable schedule tabs.
- Input validation rejects empty and whitespace-only nicknames. No email, account, or payment information is requested.
- The WebGL component uses a capped pixel ratio, stops when offscreen or the page is hidden, and supports reduced motion. A CSS ring remains if WebGL is unavailable. Browser and GPU support affect the visual effect.
- Self-hosted fonts and logos; no remote assets or analytics requested by the running app.
- Vite produces static, compressed-friendly assets. Use a static host with HTTPS and normal compression for deployment.

## Privacy and event status

ORBIT ’26 is **fictional**. Dates, venue, track briefs, schedule, and evaluation rubric are illustrative. The provided IEEE CS logo is used as a recruitment asset, not as a claim that this event is endorsed or scheduled.

The application is a **local demo**: no server requests, cookies, localStorage, or actual registration. Nickname and choices exist only in React memory and are reset when the application is reopened; closing clears the nickname. Downloading a pass saves only the file you choose to download. No application is sent to an organizer.

## Project structure

```text
orbit-26/
├── src/
│   ├── App.jsx                    Page sections and shared interactions
│   ├── data.js                    Track, schedule, FAQ content
│   ├── main.jsx                   React entry point
│   ├── styles.css                 Theme, layout, breakpoints, CSS art
│   └── components/
│       ├── Registration.jsx       Three-step application and SVG pass
│       └── react-bits/             Official component sources and license
├── public/assets/                 Fonts, logos, favicon, calendar
├── index.html                     Metadata and Vite entry
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
├── README.md
└── THIRD_PARTY_NOTICES.md
```

## Customize and deploy

- Edit content in `src/data.js` and `src/App.jsx`.
- Edit color variables and layout in `src/styles.css`.
- Configure the Orb in the `Hero` component in `src/App.jsx`.
- When changing dates, update the countdown, visible copy, SVG pass, and `public/assets/orbit-26.ics` together.
- Run `npm run format` to format source with Prettier.
- For a static hosting provider, use build command `npm run build` and output directory `dist`.
- `base: './'` keeps built assets compatible with a repository subpath, such as GitHub Pages.

## Attribution

Original ORBIT concept, interface composition, custom diagrams, content, and application code were developed with AI assistance. React Bits effects are credited separately; see `THIRD_PARTY_NOTICES.md` for sources and licenses.
