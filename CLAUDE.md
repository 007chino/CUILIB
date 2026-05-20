# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project

```bash
cd cuilib
python -m http.server 8080
```

Open: **http://localhost:8080/cuilib.html**

Do not open the HTML file directly with `file://` — the browser blocks external script loading in that mode.

To use the Gemini AI (GAZAPITO chat), set the key at runtime — never hardcode it:
```js
window.GEMINI_API_KEY = "your-key-here"
```

## Architecture

### No build system — Babel runs in the browser

All `.jsx` files are loaded via `<script type="text/babel" src="...">` in `cuilib.html`. Babel 7 transpiles them client-side on every page load. There is no bundler, no `package.json`, no `node_modules`.

**Script load order is strict** — each file assumes the previous ones have already registered their globals on `window`. The order in `cuilib.html` is:

```
Firebase CDN (app-compat + auth-compat) → firebase-auth.js
→ svg-data.js → image-slot.js → icons.jsx → data.jsx → components.jsx
→ screens-main.jsx → screens-player.jsx → screens-quiz.jsx
→ screens-extras.jsx → tweaks-panel.jsx → app.jsx
```

### Global namespace pattern

There is no ES module system. Every file ends by registering its exports on `window`:

```js
window.ScreenPlayer = ScreenPlayer;
window.CUILIB_COURSES = CUILIB_COURSES;
```

Adding a new screen requires: (1) defining the component in a `.jsx` file, (2) registering it on `window`, (3) adding a `<script>` tag in `cuilib.html` before `app.jsx`, and (4) adding a route case in `App`.

### Routing

`App` in `app.jsx` owns all routing via a single `route` string state (`useState`). There is no URL-based router. Navigation happens by calling `setRoute('key')` or the `navigate(key)` wrapper. Current routes: `inicio`, `cursos`, `detalle`, `player`, `quiz`, `rutas`, `progreso`, `notif`, `pasar`, `practica`, `admin`.

The sidebar collapses automatically when `route === 'quiz'`. The `admin` route is only rendered when `authUser.email === window.ADMIN_EMAIL`.

### Authentication (`firebase-auth.js`)

Auth uses **Firebase Authentication** (compat CDN v10.12.0). The config and helper functions are in `firebase-auth.js`, which exposes these globals:

- `window.FB_login(email, pass)` — sign in
- `window.FB_register(email, pass, name)` — create account + set displayName
- `window.FB_logout()` — sign out
- `window.FB_resetPassword(email)` — send reset email
- `window.FB_onAuthChange(cb)` — subscribe to auth state
- `window.ADMIN_EMAIL` — the admin email (`141002@unsaac.edu.pe`)

`App` subscribes to `FB_onAuthChange` on mount. While `authReady` is false it shows a loading screen; once ready, if `authUser` is null it renders `ScreenLogin`. `ScreenLogin` and `ScreenAdmin` are defined directly in `app.jsx`.

The Firebase project is `cuilib` (project ID). To manage users go to the Firebase console linked from `ScreenAdmin`.

### Theming system (`tweaks-panel.jsx`)

`useTweaks(defaults)` manages all visual settings. On change, values are persisted to `localStorage` under the key `cuilib_tweaks`. The hook initializes by merging saved values with defaults so new keys in `TWEAK_DEFAULTS` still appear on existing installs.

Theme variables (`--accent`, `data-theme`, `data-density`, `data-radius`) are applied to `document.documentElement` via a `useEffect` in `App`. All colors in CSS reference `var(--accent)` and the subject colors (`var(--c-orange)`, `var(--c-purple)`, etc.) defined in `styles.css`.

### Video content

Only **lesson `c1`** (`Introducción a la teoría de conjuntos…`) has a real video file (`videoconjuntos.mp4`). All other lessons show a "Próximamente disponible" placeholder. The player detects this via `const hasVideo = lesson.id === 'c1'` and disables all controls (seekbar, skip, play) with `pointer-events: none` + 35% opacity when `hasVideo` is false.

### Data (`data.jsx`)

Course catalog lives in `CUILIB_COURSES` (14 courses). Lesson detail only exists for Aritmética via `ARITMETICA_MODULES` (5 modules, 21 lessons). `TEMARIO_FLAT` is a pre-computed flat array of all lessons used for prev/next navigation in the player.

Quiz questions are in `QUIZ_STEPS` (8 steps, two types: `fill-two` and `choose-one`). GAZAPITO's fallback replies are in `BARTUCHA_REPLIES`; if `window.GEMINI_API_KEY` is set, real Gemini 2.5 Flash responses are used instead.

### CSS design system (`styles.css`)

All spacing, color, and radius values use CSS custom properties. Density variants (`compact`, `regular`, `comfy`) and radius variants (`square`, `default`, `round`) are applied via `data-density` and `data-radius` attributes on `<html>`. Light theme is a full override block under `[data-theme="light"]`.

Subject card colors (`--c-orange`, `--c-purple)`, etc.) are intentionally high-saturation and do not change between themes.

### SVG assets

Course icons are stored as raw SVG strings in `svg-data.js` (exposed as `window.CUILIB_SVGS`). They are rendered inline via `dangerouslySetInnerHTML` using the `Glyph` component in `data.jsx`. The `assets/` and `uploads/` directories both contain the same SVG files — `assets/` is the source of truth.

### `image-slot.js`

A standalone Web Component (`<image-slot>`) that allows drag-and-drop image replacement. It persists slot state to a `.image-slots.state.json` sidecar file. It has no dependency on React.
