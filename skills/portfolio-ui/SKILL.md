---
name: portfolio-ui
description: Builds product interfaces with this repository's visual system, adapting its components and patterns when existing capabilities do not fit. Use for new screens, workflows, and reusable interface components.
---

# Portfolio UI design lead

Use the existing interface as evidence of its visual language, not as a page template. Preserve what makes the system recognizable while choosing a composition and interaction model that fit the people and tasks in front of you.

## Start with the product and the source

First understand the user, their main task, what they need to scan, and the states they will encounter. Let those needs shape the hierarchy, density, navigation, and responsive behavior. Different products should not collapse into the same sidebar-and-card layout.

Inspect the current implementation before relying on descriptions or earlier decisions. Read the relevant page, nearby examples, `src/styles.css`, `src/design-system/tokens.js`, and component source. Use rendered screens as evidence too; notes and older screenshots can provide context, but they may no longer match the code.

Derive visual decisions from what the implementation actually does:

- Notice the typefaces, weights, scale, line lengths, and how headings differ from supporting text.
- Compare token values with their use in real pages: spacing rhythm, content widths, alignments, surface contrast, borders, radii, shadows, focus states, and motion.
- Look across more than one example to separate shared visual language from a one-off layout choice.

Before substantial work, briefly identify the components and tokens that fit, any real capability gap, and the files likely to change. Keep the plan small and update it if inspection changes the scope.

## Compose with visual intent

Carry the established typography, color relationships, spacing character, and interaction states into the new experience. Change the page structure when the product needs it; visual consistency does not require copying the portfolio’s columns or navigation.

Choose the frame for the content:

- Center a considered maximum width when it helps focus and reading. Use more of the viewport when comparison, dense work, or a broad collection genuinely benefits from it.
- Give prose a comfortable line length, and give visual collections enough room to browse. Avoid stretching every section to the browser edge by default.
- Use whitespace to group related information and set pace. Check that it feels intentional across the whole page, not empty around a cramped cluster of content.

Establish hierarchy with type, spacing, alignment, contrast, and grouping before adding decoration. A card should contain something that belongs together; a divider should clarify a boundary or aid scanning. If spacing or a quieter surface already does the job, an extra line or container adds noise.

Watch for patterns that have repeatedly weakened generated interfaces:

- A full-width shell can make the primary content feel scattered or push useful controls out of view. Widen it only when the workflow uses that space.
- A rule between every navigation area, header, content list, and action region turns one interface into a stack of boxed compartments. Keep the separators that explain real relationships.
- A generic sidebar can take space without helping orientation. Use persistent navigation when people need to move among stable destinations; choose a lighter pattern when the task is focused or linear.
- A container around every group and identical cards for unrelated information compete with the content. Reserve them for meaningful grouping, emphasis, or interaction.
- Even spacing can still leave a page unbalanced: compare the weight of the primary task with the quiet areas around it and adjust the composition, not just the margins.
- Fixed or floating controls can cover content near the edges. Check that they do not obscure reading, captions, or primary actions while scrolling.

These are signals to question, not patterns to ban. A wide workspace, sidebar, card, or divider is right when it supports the task and fits the surrounding visual language.

Reuse components when their semantics and behavior fit. Compose the existing primitives instead of imitating them with one-off styling. Adapt familiar patterns to the project’s tokens and conventions; do not import a second visual system. Add or extend a component only for a specific structural, behavioral, or accessibility gap.

## Make the interaction feel complete

Visible controls should have a clear purpose and work. Use realistic content, useful empty or error states where needed, keyboard support, visible focus, accessible names, and comfortable touch targets. Let narrow screens reorganize around the primary task instead of squeezing desktop controls into an unusable row. Respect reduced-motion preferences.

When changing a component, inspect its implementation and call sites. Check that its API and states suit the example, that it remains accessible and responsive, and that affected uses still work. A successful build confirms the code bundles; it does not prove the interface is clear or visually coherent.

## Critique what you built

Before finishing, compare the rendered result with both the product requirements and real examples from the current design system. Look at the intended desktop size and a narrow viewport when browser tools permit.

- Find the most important mismatch: perhaps the content is too wide, a divider has no purpose, the primary action lacks emphasis, or the whitespace does not balance the content.
- Make a targeted refinement to address that mismatch.
- Inspect the result again and confirm the change improved the relationship you identified without breaking another state or viewport.

Do not treat a successful build as proof of design quality. Run the checks listed in `package.json`, inspect the result in a browser when available, and report what you actually verified. Be clear about any unavailable visual or interaction checks. Avoid extra helper files, reference material, or dependencies unless the work truly needs them. Summarize the changes and remaining limitations; do not commit or push unless asked.
