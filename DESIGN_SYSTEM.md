# Aditya Portfolio Design System

Source audit of [`adityasharma0205/portfolio`](https://github.com/adityasharma0205/portfolio), commit `ced158f`. This file and the interactive documentation in `src/design-system/DesignSystemPage.jsx` describe the same system. The canonical token data lives in `src/design-system/tokens.js`; reusable React components and their examples live in `src/design-system/components.jsx`.

## Source map

| Area | Source files | What is present |
| --- | --- | --- |
| Portfolio page | `src/app/page.tsx` | Profile rail, projects, skills, work, education, journey, contact |
| Theme | `src/app/globals.css`, theme provider | Semantic OKLCH light/dark variables; dark is the default |
| Shared UI | `src/components/ui/*` | Button, card, badge, avatar, sheet, tooltip, separator, table, accordion, collapsible |
| Navigation and motion | `src/components/navbar.tsx`, `floating-menu.tsx`, `magicui/*` | Dock, mobile menu, theme control, tooltip, reveal motion |
| Portfolio compositions | `src/components/project-card.tsx`, `src/components/timeline.tsx`, `src/components/section/*` | Project, timeline, contact, experience, education patterns |
| Case studies | `src/components/mdx/case-study/*` | 16 narrative modules and diagrams |

## Foundations

### Color

The source declares 31 semantic slots in OKLCH. Light/dark values are represented as data in `src/design-system/tokens.js` and rendered in the Colors section. They include page and text surfaces, card/popover pairs, primary/secondary/muted/accent/destructive colors, border/input/ring, five chart colors, and nine sidebar roles. The chart palette is defined but no chart component is rendered on the audited portfolio route. The sidebar palette is a shared theme primitive; the portfolio page itself uses a profile rail.

Most UI color is semantic. The sprout illustration has light `#5C8A60` and dark `#9DBD9F` variants; the flickering grid defaults to `rgb(0, 0, 0)`. Logos and technology marks retain their asset brand colors.

### Type

- **Geist**: 400, 500, 600, 700 for headings, body, cards, and controls.
- **Geist Mono**: 300, 400, 500, 600, 700 for code and technical labels.
- The source uses Tailwind font sizing and line-height utilities rather than a single custom scale. The documentation shows representative 12–36px steps and the recurring tight/relaxed tracking and leading treatments.

### Spacing, shape, and layout

- Spacing follows Tailwind's 4px base unit. Common values and layout-specific exceptions are listed in the Foundations section and `tokens.js`.
- Base radius is `0.625rem` (10px). Derived radii are 6px, 8px, 10px, and 14px, with fully rounded avatars, marks, and dock controls.
- The desktop portfolio uses a 280px profile rail, 112px column gap, and 24px page inset. Narrow content is `max-w-2xl` (672px); wide content is `max-w-6xl` (1152px); project grid is capped at 800px.
- The portfolio's main sections use generous 56px separation. The profile avatar is 76px on small screens and 96px on desktop.

### Elevation and motion

Elevation uses border rings and Tailwind `shadow-sm`, `shadow`, and `shadow-lg`, with a soft dark tooltip shadow. The source reveal animation is a 400ms ease-out blur/fade with 6px offset/blur and 40ms base delay; lists commonly stagger by 50ms. Character reveals use 30ms. Dock magnification uses a spring (mass .1, stiffness 150, damping 12). Project link/ring feedback and floating menu transitions are brief. The source does not define a reduced-motion override; this documentation app adds one for accessibility.

## Portfolio patterns

| Pattern | Source behavior |
| --- | --- |
| Profile rail | Sticky 280px desktop column with profile image, intro, About, and navigation; content stacks on narrow screens. |
| Dock navigation | Inline on desktop, floating on mobile; icon links, tooltips, social links, separators, and theme control. Pointer distance magnifies icons. |
| Floating menu | 48px bottom-right control toggles Equal/X and reveals the mobile dock. |
| Project grid | One column then two at 640px, max width 800px. Stacked and featured project-card variants use 3:2 image/video/fallback media, badges, truncated descriptions, and a hover/focus arrow. |
| Skills | Wrapping outlined 32px chips with 8px gaps and optional 16px technology icon. |
| Work history | Employer groups with 32/40px company logo or fallback and a nested role timeline with 11px marker. |
| Journey | Vertical connector, circular 40px mark, date/title/Markdown copy, and linked badges. |
| Education | Compact two-line row with 32/40px circular logo or school icon, ring, and shadow. |
| Contact panel | Rounded bordered surface, clipped top-half flickering grid, inline X/LinkedIn/email links and keyboard focus treatment. It is link-based, not a form. |
| Case-study narrative | Composable editorial modules; cards, badges, separators, tooltips, decision table, media frames, comparisons, and diagrams. |

## Components and source status

The documentation page implements the listed controls as reusable React components. “Used” means rendered on the audited portfolio route; “Available, not mounted” means exported in its source UI library but not currently used there; “Added here” identifies a gap-filling component created for this design-system app.

| Component | Source status / variants |
| --- | --- |
| Button | Used. Default, destructive, outline, secondary, ghost, link; default, small, large, icon sizes. |
| Input | Added here. Default, invalid, disabled. The portfolio has no input or form. |
| Card | Used. Card, header, title, description, content, footer; project and editorial compositions add their own media/border/ring. |
| Tag / Badge | Used. Default, secondary, destructive, outline. Skill chips are a related custom pattern. |
| Nav / Dock | Used. Floating and inline variants; tooltips and theme control. |
| List | Used. Project grid, grouped roles, skill wrap, and chronological timeline. |
| Sheet | Available, not mounted. Four directions: top, bottom, left, right. Source is Radix-dialog based. |
| Avatar | Used. Image/fallback; profile sizing 76/96px and smaller circular marks. |
| Tooltip | Used. Dock hints, top positioned with offset. |
| Separator | Used. Horizontal and vertical one-pixel rules. |
| Table | Used in case studies. Head/body/footer/row/cell/caption and overflow wrapper. |
| Accordion | Available, not mounted. Single/multiple Radix items. |
| Collapsible | Available, not mounted. Root/trigger/content. |
| Theme switch | Used. Dark default, light alternate, sun/moon icon. |
| Reveal motion | Used. Section/text reveal with optional stagger. |
| Project media | Used. Image, lazy video, poster fallback, empty media. |

### Case-study modules

The source exports: `Hero`, `Promise`, `ConstraintRail`, `Act`, `DecisionLog`, `Reject`, `BeforeAfter`, `Loop`, `Annotated`, `Payoff`, `Reflection`, `RoomLayout`, `PermissionGrid`, `RetrievalFlow`, `StackCollapse`, and `KnowledgeGraph`. They are editorial story components, not generic application chrome. Descriptions and the module inventory are in `src/design-system/audit.js` and the Case-study section.

## Responsive rules

- **Below 640px:** one-column project list, stacked profile content, floating bottom navigation/menu.
- **At 640px (`sm`):** project grid becomes two columns; featured media may sit beside card text.
- **At 768px (`md`):** education/work marks grow from 32px to 40px.
- **At 1024px (`lg`):** 280px profile rail returns, About sits in the rail, and the dock becomes inline.

## Reuse guidance

Use semantic token names from `tokens.js` rather than copying literal theme colors. Compose Card subcomponents instead of creating one-off card anatomy; use Badge for short categories/status; reserve the Timeline for chronological/grouped content. Keep portfolio-specific narrative modules separate from generic controls. The Input in this app is an explicitly marked addition, and the Sheet/Accordion/Collapsible demos are source library exports that the portfolio page does not mount.
