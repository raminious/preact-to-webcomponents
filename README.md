# preact-to-webcomponent

A small, opinionated example of shipping a Preact app as a framework-free
**Web Component** that any HTML page (React, Vue, plain HTML, …) can drop in
with a single `<script>` tag.

It is the companion code for a blog post on the topic. The repo is meant to
be read top-to-bottom; comments call out the choices and their trade-offs.

## What you get

Two custom elements, both registered from a single IIFE bundle:

| Element          | Purpose                                                           |
| ---------------- | ----------------------------------------------------------------- |
| `<contact-form>` | Self-contained form. Carries its own state/provider internally.   |
| `<app-root>`     | Provider element you can wrap around your own Preact composition. |

Each instance owns its own [zustand](https://zustand.docs.pmnd.rs/) store via
Preact context, with [immer](https://immerjs.github.io/immer/) for ergonomic
updates.

## Quick start

```bash
npm install
npm run build         # writes dist/pastel-form.min.{js,css}
npx serve .           # then open http://localhost:3000/demo/
```

For an iterative loop:

```bash
npm run dev           # rollup --watch
# (in another shell)
npx serve .
```

## Using the bundle

```html
<link rel="stylesheet" href="dist/pastel-form.min.css" />
<script src="dist/pastel-form.min.js"></script>

<contact-form
  authorization="my-token"
  api_url="https://api.example.com"
></contact-form>

<script>
  window.addEventListener('pastel-form:contact-form:success', (e) => {
    console.log(e.detail.data)
  })
</script>
```

## How it fits together

```
src/
├── main.ts                          entry — re-exports register
├── register.ts                      register custom elements
├── styles.core.scss                 global styles (light DOM)
├── globals.d.ts                     SCSS module typing
├── jsx.d.ts                         IntrinsicElements for our tags
├── components/
│   ├── ContactForm.tsx              the form UI
│   └── AppContextProvider.tsx       creates a per-instance store
├── context/
│   └── root.ts                      store factory + AppContext
└── hooks/
    └── use-app-store.ts             selector hook over the store
```

## Choices worth understanding

- **Light DOM (`shadow: false`) for both elements.** A single global
  stylesheet styles every instance. Switch to `shadow: true` if you need
  isolation, but then you must also slot children and inline (or `<link>`)
  styles into the shadow root — see [register.ts](src/register.ts).
- **Per-instance store via context.** Each `<contact-form>` keeps its own
  zustand store. The store is created lazily inside a `useRef` so the
  factory only runs once per mount — see
  [AppContextProvider.tsx](src/components/AppContextProvider.tsx).
- **Events on the host, bubbling and composed.** Submissions dispatch from
  the form element with `bubbles: true, composed: true`, so listeners
  attached to `document`, `window`, or the custom element itself all work
  — and the event still escapes if you later flip on shadow DOM. See
  [ContactForm.tsx](src/components/ContactForm.tsx).
- **Observed attributes.** Anything you want to react to from outside must
  be listed in the third argument to `register(...)`. Empty array = no
  attributes are observed.

## Scripts

| Script          | What it does                              |
| --------------- | ----------------------------------------- |
| `npm run build` | Clean `dist/` and produce a minified IIFE |
| `npm run dev`   | Same, in `--watch` mode                   |
| `npm run clean` | Remove `dist/`                            |

## License

MIT.
