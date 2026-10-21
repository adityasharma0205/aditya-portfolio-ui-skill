export const auditSource = {
  repository: 'https://github.com/adityasharma0205/portfolio',
  commit: 'ced158f',
  stack: 'Next.js · React · Tailwind CSS · shadcn/ui · Motion',
  appEntry: 'src/app/page.tsx',
  themeSource: 'src/app/globals.css',
};

export const portfolioPatterns = [
  { name: 'Profile rail', source: 'app/page.tsx', details: 'Sticky 280px desktop rail with a 76px mobile / 96px desktop avatar, short intro, about copy, and inline navigation.' },
  { name: 'Dock navigation', source: 'components/navbar.tsx · components/magicui/dock.tsx', details: 'Floating rounded icon dock on small screens, inline dock in the desktop rail; pointer-distance spring magnification, tooltips, social links, separators, and theme control.' },
  { name: 'Floating mobile menu', source: 'components/floating-menu.tsx', details: 'Bottom-right circular 48px toggle; switches Equal/X glyphs and reveals an inline dock with a short fade/slide/scale.' },
  { name: 'Project card grid', source: 'components/project-card.tsx · sections/projects-section.tsx', details: 'One-column grid, two columns from 640px, centered 800px maximum. Cards support stacked and featured layouts; 3:2 image/video media, category/link badges, truncated description, and an arrow revealed on hover or keyboard focus.' },
  { name: 'Skills collection', source: 'app/page.tsx', details: 'Wrapped compact outlined chips with optional 16px technology marks, 8px gaps, 32px height, and a subtle ring.' },
  { name: 'Work history', source: 'sections/work-section.tsx', details: 'Roles grouped by employer; company logo/fallback, duration summary, and a nested vertical role track with an 11px outlined node.' },
  { name: 'Journey timeline', source: 'components/timeline.tsx · sections/hackathons-section.tsx', details: 'Vertical timeline with a 1px border-colored connector, circular 40px project mark, date, title, Markdown description, and linked badges.' },
  { name: 'Education rows', source: 'app/page.tsx', details: '32px/40px round logo or education-icon marks, ring and shadow; degree and school text sit in a compact two-line row.' },
  { name: 'Contact panel', source: 'sections/contact-section.tsx', details: 'Rounded bordered panel with a clipped top-half flickering grid and inline X, LinkedIn, and email links with visible keyboard focus.' },
  { name: 'Case-study narrative', source: 'components/mdx/case-study/*', details: 'Composable editorial modules combine cards, badges, separators, tooltips, tables, image/video frames, before/after comparisons, and diagrams.' },
];

export const componentInventory = [
  { name: 'Button', state: 'Used', source: 'components/ui/button.tsx', variants: 'default · destructive · outline · secondary · ghost · link; default · sm · lg · icon', note: 'Used by the theme switch and MDX code-copy control.' },
  { name: 'Input', state: 'Added here', source: 'No input or form in the portfolio source', variants: 'Default · invalid · disabled', note: 'Coverage primitive only; the portfolio contact section is link-based.' },
  { name: 'Card', state: 'Used', source: 'components/ui/card.tsx', variants: 'Card · Header · Title · Description · Content · Footer', note: 'The base is a rounded card surface; project and case-study uses add borders, padding, media, or rings at composition level.' },
  { name: 'Tag / Badge', state: 'Used', source: 'components/ui/badge.tsx', variants: 'default · secondary · destructive · outline', note: 'Used for project link types, hackathon links, and case-study labels. Skill chips are a related custom treatment.' },
  { name: 'Nav / Dock', state: 'Used', source: 'components/navbar.tsx · components/magicui/dock.tsx', variants: 'floating · inline', note: 'Each item is an icon link with a tooltip; social items and theme switch are grouped by separators.' },
  { name: 'List', state: 'Used', source: 'components/timeline.tsx · section components', variants: 'Vertical journey · grouped roles', note: 'Chronological entries with date, title, supporting copy, and optional tag.' },
  { name: 'Sheet', state: 'Available, not mounted', source: 'components/ui/sheet.tsx', variants: 'top · bottom · left · right', note: 'A Radix dialog-based slide-over primitive exists in the source; the main portfolio does not currently open one.' },
  { name: 'Avatar', state: 'Used', source: 'components/ui/avatar.tsx', variants: 'Image · fallback; 76px small-screen profile / 96px desktop profile', note: 'Also adapted for circular education and project marks.' },
  { name: 'Reveal motion', state: 'Used', source: 'components/magicui/blur-fade.tsx · blur-fade-text.tsx', variants: 'Section fade · text reveal · optional character stagger', note: 'One-shot in-view reveal; 400ms ease-out and a 40ms base delay.' },
  { name: 'Project media', state: 'Used', source: 'components/lazy-video.tsx · project-card.tsx', variants: 'Image · lazy video · poster fallback · empty media block', note: 'Videos mount near the viewport; card media uses 3:2 crop or a featured half-width slot.' },
];

export const caseStudyModules = [
  ['Hero', 'Case-study title, context, and lead media'],
  ['Promise', 'One-line product promise / framing'],
  ['ConstraintRail', 'Constraints shown as a compact rail'],
  ['Act', 'Action or implementation step with a badge and separator'],
  ['DecisionLog', 'Decision table with rationale and outcomes'],
  ['Reject', 'Rejected direction / rationale card'],
  ['BeforeAfter', 'Paired visual comparison'],
  ['Loop', 'Media loop with fallback image and caption'],
  ['Annotated', 'Image with numbered/labelled notes'],
  ['Payoff', 'Outcome statement in a highlighted card'],
  ['Reflection', 'Closing reflection block'],
  ['RoomLayout', 'Spatial / system diagram'],
  ['PermissionGrid', 'Permission matrix diagram'],
  ['RetrievalFlow', 'Retrieval process diagram'],
  ['StackCollapse', 'Layered architecture diagram'],
  ['KnowledgeGraph', 'Knowledge graph visualization'],
];

export const responsivePatterns = [
  { range: 'Base / narrow', rule: 'Single-column project grid; profile area stacks; mobile about moves below projects; floating bottom dock/menu.' },
  { range: 'sm · 640px', rule: 'Project grid switches to two columns; featured project media/content can sit side by side.' },
  { range: 'md · 768px', rule: 'Education/work logos grow from 32px to 40px.' },
  { range: 'lg · 1024px', rule: 'Page becomes 280px profile rail + content, About returns to the rail, inline dock replaces the floating nav.' },
];
