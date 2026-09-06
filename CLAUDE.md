@AGENTS.md

# Roster Roller

Next.js app that generates team names for rec-league squads. Pick a **sport**
(soccer, netball) and a **vibe** (punny, fierce, funny, random), hit roll, get 8 names.

## Stack

- Next.js 16.2.6 (App Router) + React 19.2.4, TypeScript strict
- Tailwind CSS v4 (`@import "tailwindcss"` in `globals.css`, no config file)
- ESLint flat config (`eslint.config.mjs`), no test framework configured

## Layout

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | The whole UI — client component, two-column control/results layout |
| `src/app/layout.tsx` | Root layout, fonts (Anton, Barlow Condensed, Geist Mono), metadata |
| `src/app/globals.css` | CSS custom-property theme + `@keyframes` |
| `src/app/api/generate/route.ts` | `POST /api/generate` → `{ names: string[] }` |
| `src/lib/names.ts` | Name banks and `generateNames(sport, vibe, count)` |

`@/*` maps to `./src/*`.

## Conventions

- Name data lives only in `src/lib/names.ts`. Adding a sport means adding a
  `NameData` entry (all five arrays) plus a member of the `Sport` union — the
  `Record<Sport, NameData>` map will fail to compile until both exist.
- `page.tsx` styles with inline `style` objects against the CSS variables in
  `globals.css` (`--bg`, `--accent`, `--font-anton`, …), not Tailwind utilities.
  Match that when editing it. Keyframes go in `globals.css`.
- Result rows key off `` `${rollCount}-${name}` `` so a re-roll remounts and
  replays the entry animation. Never key by array index.
- `roll()` races the fetch against an 800 ms timer so the dice animation always
  gets a beat; keep the `Promise.all` if you touch it.

## Commands

```bash
npm run dev     # dev server on :3000
npm run build   # production build
npm run start   # serve the build
npm run lint    # eslint
```

## Known gaps

- `/api/generate` doesn't validate the body — an unknown `sport` yields
  `undefined` name data and a 500. The client is the only caller today.
- `roll()` has no error handling; a failed fetch leaves `loading` stuck on.
- `dice-idle` is defined twice (inline in `EmptyState`, again in `globals.css`),
  with different keyframes. The inline one wins.
- Several `--animate-*` theme tokens in `globals.css` are unused.
