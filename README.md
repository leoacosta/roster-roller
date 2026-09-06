# Roster Roller

Legendary team names for your rec league squad. Pick a sport and a vibe, roll,
and get eight names ranging from groan-worthy puns to genuinely intimidating.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with ESLint |

## How it works

The UI (`src/app/page.tsx`) is a single client component: sport and vibe
selectors on the left, results on the right. Rolling POSTs to
`/api/generate`, which calls `generateNames()` from `src/lib/names.ts`.

Each sport has a curated bank of `punny`, `fierce`, and `funny` names, plus
`prefixes` and `nouns` that get combined into "Blazing Vipers"-style names.
The `random` vibe mixes two from each category with two generated combos.

### API

```http
POST /api/generate
Content-Type: application/json

{ "sport": "soccer", "vibe": "random" }
```

```json
{ "names": ["Pitch Please", "Iron Cleats", "..."] }
```

Both fields are optional and default to `soccer` / `random`.

- `sport`: `soccer` | `netball`
- `vibe`: `punny` | `fierce` | `funny` | `random`

## Adding a sport

1. Add the name to the `Sport` union in `src/lib/names.ts`.
2. Add a `NameData` object with all five arrays (`prefixes`, `nouns`, `punny`,
   `fierce`, `funny`) and register it in `namesBySport`.
3. Add an entry to `SPORTS` in `src/app/page.tsx` with a label and icon.

## Project structure

```
src/
  app/
    api/generate/route.ts  POST endpoint
    globals.css            theme variables + keyframes
    layout.tsx             fonts and metadata
    page.tsx               the UI
  lib/
    names.ts               name banks and generator
```

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Type is Anton,
Barlow Condensed, and Geist Mono via `next/font/google`.
