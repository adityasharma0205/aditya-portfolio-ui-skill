---
name: portfolio-ui
description: Builds responsive product interfaces using this repository's design system, and extends React components and design tokens when existing capabilities are insufficient. Use for new screens, product workflows, and reusable UI components.
---

# UI implementation playbook

Use this skill to create interfaces for products beyond the portfolio while retaining the repository's visual identity. Adapt layout, density, and interaction patterns to the product instead of applying one dashboard template to every task.

## 1. Understand the product and inspect first

Before editing, identify the users, primary jobs, workflow, required screens, data shape, constraints, and important states. If details are missing, make the smallest reasonable assumptions and state them briefly. Organize the interface around user tasks and information priority.

Treat checked-in source as authoritative. Before relying on any repository-specific token, component API, path, framework detail, or command, confirm it in the current implementation; use documentation and this table as orientation, not proof. Inspect `package.json`, the app entry (`src/App.jsx`, `src/main.jsx`), relevant routes or page composition, `src/styles.css`, `src/design-system/tokens.js`, the closest files under `src/design-system/components/`, and their examples in `src/design-system/DesignSystemPage.jsx`. Read `DESIGN_SYSTEM.md` and `src/design-system/audit.js` as context, then verify implementation claims in code. The markdown audit records the original portfolio source; it can describe source behavior that this Vite documentation app does not implement.

Before substantial implementation, briefly plan which existing components and tokens fit, which capabilities are genuinely missing, and which files are likely to change. Keep the plan proportional to the task and adjust it if source inspection changes the scope.

## 2. Apply the real system

- This repository is a Vite + React JavaScript/JSX app. Styling is hand-authored in `src/styles.css`; icons use `lucide-react`. Follow the existing app composition and local state patterns. Do not assume a router, TypeScript, a utility-CSS framework, or a test framework exists.
- `src/design-system/tokens.js` is the current token data source. `semanticTokens` contains light/dark values for 38 roles; `themeStyle(mode)` maps semantic roles to kebab-case CSS custom properties and supplies the radius and motion variables. The app defaults to dark mode. Use semantic variables such as `var(--background)`, `var(--foreground)`, `var(--muted-foreground)`, `var(--border)`, and `var(--primary)` instead of copying palette values.
- The documented spacing scale is in `layoutTokens.spacing.scale` (2–80px). It is data, not a generated set of CSS custom properties; inspect existing CSS and use the scale deliberately rather than inventing `--spacing-*` variables.
- Radius data is in `layoutTokens.radius`; `themeStyle` exposes `--radius`, `--radius-base`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, and `--radius-full`. Typography is Geist and Geist Mono; `typeTokens.scale` documents representative 12–36px steps. Match local type roles and weights.
- Elevation examples live in `elevationTokens`; there is no complete shadow-variable API. Reuse nearby CSS shadow treatments and keep new elevation restrained and consistent.
- Motion values are `--motion-duration-fast: 150ms`, `--motion-duration-standard: 200ms`, `--motion-duration-emphasis: 400ms`, `--motion-easing-standard: cubic-bezier(.2,.75,.25,1)`, and `--motion-easing-enter: ease-out`. The portfolio audit originally found local values rather than named source tokens; these shared values are proposed/promoted app tokens. Use the variables where appropriate and honor `prefers-reduced-motion`.
- Prefer existing components and composition. Avoid arbitrary hardcoded visual values, duplicate primitives, unnecessary dependencies, and unrelated redesigns. A different product may need a different layout or density while using the same visual tokens.

### Existing component APIs and limits

Verify current source before use; these are the present APIs, not a promise that every pattern fits every product.

| Component | Current API and use |
| --- | --- |
| `Button` (`components/Button.jsx`) | `variant`: default, destructive, outline, secondary, ghost, link; `size`: default, sm, lg, icon. Defaults to `type="button"`; pass `type="submit"` for form submission. Native button props pass through. |
| `Input` (`components/Input.jsx`) | `label`, `hint`, `error`, optional `id`, and native input props. Generates an id, associates the visible label, and connects hint/error text. |
| `Card` (`components/Card.jsx`) | Compose `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`. Optional regions are composed explicitly. |
| `Tag` / `Badge` (`components/Tag.jsx`) | Non-interactive compact label; variants default, secondary, outline, destructive. Do not use it as an action. |
| `SiteNav` (`components/Nav.jsx`) | Dock-oriented inline/floating presentation. `items` entries need `label`, icon component, and `href` when interactive. `active`, `onNavigate`, `ariaLabel`, `interactive`, and `showThemeToggle` are supported. This is not a general full navigation framework. |
| `List` (`components/List.jsx`) | Timeline only: `items` with `date`, `title`, `description`, and optional `tag`. Do not treat it as a generic list API without extending it. |
| `Modal` (`components/Modal.jsx`) | Controlled native dialog: `open`, `onOpenChange`, `title`, optional `description`, and children. Escape, close button, backdrop click, and native dialog focus behavior are implemented. |
| `Sheet` (`components/Sheet.jsx`) | Controlled dialog panel with Modal-like props and `side` top/bottom/left/right. |
| `Avatar` (`components/Avatar.jsx`) | `src`, `alt`, `initials`, `size` sm/md/lg, and `className`; shows initials on missing or failed image. |
| `Divider` (`components/Divider.jsx`) | Horizontal separator. A vertical separator is not currently exposed by this component. |
| `MessageBubble` (`components/MessageBubble.jsx`) | `author`, `time`, children, and incoming/outgoing `variant`; a message bubble is not a complete conversation system. |
| `PromptBox` (`components/PromptBox.jsx`) | Labeled textarea with optional `onSubmit`; trims, ignores empty submissions, and clears after submit. It is not a rich-text or attachment composer. |

## 3. Design the interface for its actual job

Choose information hierarchy, navigation, content density, responsive behavior, and interaction model from the product's users and workflow. Account for empty, loading, populated, error, success, disabled, and permission states when relevant. Use realistic content lengths and visible timestamps/statuses where they help scanning. Keep keyboard access, semantic structure, visible focus, contrast, and reduced-motion behavior in the implementation plan. Reflow or simplify dense layouts on small screens; do not merely scale desktop content down.

Examples of adapting the system:

- **Team messaging:** prioritize a conversation list and clear selected/unread states, then a readable message history with sender identity and timestamps, then a composer. At wide sizes, use a compact conversation rail beside the thread; at narrow sizes, make the active conversation the primary view and provide a clear way back to the list. `SiteNav` is not the conversation rail. `MessageBubble` can provide message styling, `Avatar` sender identity, `Badge` a short unread/status marker, and `PromptBox` a simple text composer. Add or extend conversation/message-list patterns only for real missing behavior such as grouping, unread counts, attachments, or switching between list and thread.
- **Reader profile with a long book collection:** establish profile identity and reading summary first, then progress/shelves and the collection. Use actual book-cover aspect ratios, readable titles/authors, ratings and progress with text or accessible labels, and shelf/list filters that work with keyboard and touch. Give the book list a sustainable long-content layout with responsive columns or rows and useful sorting/filtering rather than one oversized card per book. Existing `Card` and `Badge` may compose book metadata; `List` is timeline-specific and should not be forced into a collection. Build a reusable book-item or collection pattern only if the existing components do not fit.

These examples are decision aids; do not turn them into fixed templates for other products.

## 4. Extend components only for a real gap

When the system seems insufficient:

1. Inspect the closest component, its CSS, token source, and all current call sites/examples.
2. Try composition or an existing variant first. A layout difference alone usually does not need a new component.
3. Name the missing behavior or structure precisely. Do not infer capability from a component label or from `DESIGN_SYSTEM.md` alone.
4. Extend an existing component when the new behavior shares its semantics and can be expressed with a small, coherent prop or composable slot. Create a distinct component when the interaction, accessibility semantics, content model, or lifecycle is materially different (for example, a conversation thread is not a variant of the website dock).
5. Keep the API small, consistently named, and typed if the project has types; this repository currently uses JSX without TypeScript. Cover realistic states and support semantic HTML, keyboard use, focus behavior, responsive layout, and reduced motion where relevant.
6. Reuse semantic and motion/radius variables. Avoid parallel token sets or hardcoded theme colors.
7. Put files in `src/design-system/components/` for reusable primitives and add/update the relevant demonstration in `src/design-system/DesignSystemPage.jsx` when the task calls for documenting the component. Keep product-specific compositions with their screen/page unless reuse is established.
8. Verify the public API through the example and affected call sites. Check the addition's realistic states, accessibility, responsive behavior, integration with existing conventions, and regressions. Run available checks; add no dependency or documentation file unless the task needs it.

## 5. Implement and verify

Build working interactions when requested; do not leave clickable-looking controls inert. Keep state, navigation, loading and error behavior aligned with the existing app architecture. Verify responsive layout, labels and accessible names, keyboard navigation, focus-visible states, modal dismissal/focus behavior, color contrast, and reduced-motion behavior relevant to the change.

The currently available package scripts are `npm run dev`, `npm run build`, and `npm run preview`; verify `package.json` because scripts can change. There is currently no lint, type-check, or test script. Run the checks that exist, inspect the resulting interface when a browser is available, and report unavailable checks honestly. Do not claim a behavior or check was verified unless it was actually verified. Summarize important changes, checks, assumptions, and remaining limitations; do not commit or push unless the user explicitly asks.
