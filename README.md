# Aditya Portfolio Design System

A custom, Storybook-style React documentation site built from a source audit of [adityasharma0205/portfolio](https://github.com/adityasharma0205/portfolio). It documents the portfolio's tokens, responsive layout, visual patterns, shared components, and case-study modules. It runs inside the existing Vite app; it does not use Storybook.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## System files

- `DESIGN_SYSTEM.md` — source-grounded audit and reuse guidance.
- `src/design-system/tokens.js` — synchronized semantic colors, typography, spacing, radius, elevation, and motion values.
- `src/design-system/audit.js` — source map, component inventory, portfolio patterns, and responsive rules.
- `src/design-system/components.jsx` — reusable React implementations and interactive examples.
- `src/design-system/DesignSystemPage.jsx` — the documentation page and component demonstrations.

The required Input is marked as an addition because the source portfolio is link-based and has no form. Sheet, Accordion, and Collapsible are marked as shared-library primitives that exist in the source but are not mounted on the portfolio page.
