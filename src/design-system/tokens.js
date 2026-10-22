export const semanticTokens = {
  background: { label: 'Background', light: 'oklch(1 0 0)', dark: 'oklch(0.18 0 0)', usage: 'Page canvas' },
  foreground: { label: 'Foreground', light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)', usage: 'Primary text and icons' },
  card: { label: 'Card', light: 'oklch(1 0 0)', dark: 'oklch(0.205 0 0)', usage: 'Cards, dock, and raised surfaces' },
  cardForeground: { label: 'Card foreground', light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)', usage: 'Text on cards' },
  popover: { label: 'Popover', light: 'oklch(1 0 0)', dark: 'oklch(0.205 0 0)', usage: 'Tooltips and floating content' },
  popoverForeground: { label: 'Popover foreground', light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)', usage: 'Text in popovers' },
  primary: { label: 'Primary', light: 'oklch(0.205 0 0)', dark: 'oklch(0.922 0 0)', usage: 'Primary controls' },
  primaryForeground: { label: 'Primary foreground', light: 'oklch(0.985 0 0)', dark: 'oklch(0.205 0 0)', usage: 'Content on primary controls' },
  secondary: { label: 'Secondary', light: 'oklch(0.97 0 0)', dark: 'oklch(0.269 0 0)', usage: 'Secondary surfaces' },
  secondaryForeground: { label: 'Secondary foreground', light: 'oklch(0.205 0 0)', dark: 'oklch(0.985 0 0)', usage: 'Text on secondary surfaces' },
  muted: { label: 'Muted', light: 'oklch(0.97 0 0)', dark: 'oklch(0.269 0 0)', usage: 'Subtle surfaces' },
  mutedForeground: { label: 'Muted foreground', light: 'oklch(0.556 0 0)', dark: 'oklch(0.708 0 0)', usage: 'Descriptions and metadata' },
  accent: { label: 'Accent', light: 'oklch(0.97 0 0)', dark: 'oklch(0.269 0 0)', usage: 'Hover and selection surfaces' },
  accentForeground: { label: 'Accent foreground', light: 'oklch(0.205 0 0)', dark: 'oklch(0.985 0 0)', usage: 'Text on accent surfaces' },
  destructive: { label: 'Destructive', light: 'oklch(0.577 0.245 27.325)', dark: 'oklch(0.704 0.191 22.216)', usage: 'Destructive actions and errors' },
  destructiveForeground: { label: 'Destructive foreground', light: 'oklch(0.985 0 0)', dark: 'oklch(0.145 0 0)', usage: 'Content on destructive surfaces' },
  success: { label: 'Success', light: '#15803d', dark: '#4ade80', usage: 'Completed actions and positive states' },
  successForeground: { label: 'Success foreground', light: '#ffffff', dark: '#052e16', usage: 'Content on success surfaces' },
  warning: { label: 'Warning', light: '#a16207', dark: '#fbbf24', usage: 'Caution and attention states' },
  warningForeground: { label: 'Warning foreground', light: '#ffffff', dark: '#422006', usage: 'Content on warning surfaces' },
  info: { label: 'Info', light: '#0369a1', dark: '#38bdf8', usage: 'Informational states and guidance' },
  infoForeground: { label: 'Info foreground', light: '#ffffff', dark: '#082f49', usage: 'Content on informational surfaces' },
  border: { label: 'Border', light: 'oklch(0.922 0 0)', dark: 'oklch(1 0 0 / 10%)', usage: 'Card and divider outlines' },
  input: { label: 'Input', light: 'oklch(0.922 0 0)', dark: 'oklch(1 0 0 / 15%)', usage: 'Input borders' },
  ring: { label: 'Ring', light: 'oklch(0.708 0 0)', dark: 'oklch(0.556 0 0)', usage: 'Keyboard focus rings' },
  chart1: { label: 'Chart 1', light: 'oklch(0.646 0.222 41.116)', dark: 'oklch(0.488 0.243 264.376)', usage: 'Chart palette slot 1; no chart view found' },
  chart2: { label: 'Chart 2', light: 'oklch(0.6 0.118 184.704)', dark: 'oklch(0.696 0.17 162.48)', usage: 'Chart palette slot 2; no chart view found' },
  chart3: { label: 'Chart 3', light: 'oklch(0.398 0.07 227.392)', dark: 'oklch(0.769 0.188 70.08)', usage: 'Chart palette slot 3; no chart view found' },
  chart4: { label: 'Chart 4', light: 'oklch(0.828 0.189 84.429)', dark: 'oklch(0.627 0.265 303.9)', usage: 'Chart palette slot 4; no chart view found' },
  chart5: { label: 'Chart 5', light: 'oklch(0.769 0.188 70.08)', dark: 'oklch(0.645 0.246 16.439)', usage: 'Chart palette slot 5; no chart view found' },
  sidebar: { label: 'Sidebar', light: 'oklch(0.985 0 0)', dark: 'oklch(0.205 0 0)', usage: 'Sidebar surface token; portfolio uses a profile rail' },
  sidebarForeground: { label: 'Sidebar foreground', light: 'oklch(0.145 0 0)', dark: 'oklch(0.985 0 0)', usage: 'Sidebar text' },
  sidebarPrimary: { label: 'Sidebar primary', light: 'oklch(0.205 0 0)', dark: 'oklch(0.488 0.243 264.376)', usage: 'Sidebar selected control' },
  sidebarPrimaryForeground: { label: 'Sidebar primary foreground', light: 'oklch(0.985 0 0)', dark: 'oklch(0.985 0 0)', usage: 'Text on sidebar primary' },
  sidebarAccent: { label: 'Sidebar accent', light: 'oklch(0.97 0 0)', dark: 'oklch(0.269 0 0)', usage: 'Sidebar hover surface' },
  sidebarAccentForeground: { label: 'Sidebar accent foreground', light: 'oklch(0.205 0 0)', dark: 'oklch(0.985 0 0)', usage: 'Text on sidebar accent' },
  sidebarBorder: { label: 'Sidebar border', light: 'oklch(0.922 0 0)', dark: 'oklch(1 0 0 / 10%)', usage: 'Sidebar divider' },
  sidebarRing: { label: 'Sidebar ring', light: 'oklch(0.708 0 0)', dark: 'oklch(0.556 0 0)', usage: 'Sidebar focus ring' },
};

export const colorTokenGroups = [
  {
    name: 'Surfaces',
    description: 'Page, card, overlay, and muted backgrounds.',
    tokens: ['background', 'card', 'popover', 'muted'],
  },
  {
    name: 'Text',
    description: 'Primary and supporting text colors for each surface.',
    tokens: ['foreground', 'cardForeground', 'popoverForeground', 'mutedForeground'],
  },
  {
    name: 'Actions and controls',
    description: 'Control fills, paired label colors, borders, and focus rings.',
    tokens: ['primary', 'primaryForeground', 'secondary', 'secondaryForeground', 'accent', 'accentForeground', 'border', 'input', 'ring'],
  },
  {
    name: 'Status',
    description: 'Paired colors for destructive, success, warning, and informational states.',
    tokens: ['destructive', 'destructiveForeground', 'success', 'successForeground', 'warning', 'warningForeground', 'info', 'infoForeground'],
  },
  {
    name: 'Charts',
    description: 'Reserved chart colors from the source theme; no chart component uses them yet.',
    tokens: ['chart1', 'chart2', 'chart3', 'chart4', 'chart5'],
  },
  {
    name: 'Sidebar',
    description: 'Dedicated rail surfaces, text, selected states, borders, and focus ring.',
    tokens: ['sidebar', 'sidebarForeground', 'sidebarPrimary', 'sidebarPrimaryForeground', 'sidebarAccent', 'sidebarAccentForeground', 'sidebarBorder', 'sidebarRing'],
  },
];

export const typeTokens = {
  sans: { name: 'Geist', variable: '--font-sans', weights: [400, 500, 600, 700], role: 'Headings, body, cards, and controls' },
  mono: { name: 'Geist Mono', variable: '--font-mono', weights: [300, 400, 500, 600, 700], role: 'Code and technical metadata' },
  scale: [
    { name: 'xs', size: '12px', example: 'Compact metadata, skill labels, dates' },
    { name: 'sm', size: '14px', example: 'Descriptions, badges, timeline details' },
    { name: 'base', size: '16px', example: 'Body copy and section introductions' },
    { name: 'lg', size: '18px', example: 'Profile title and emphasized card text' },
    { name: 'xl', size: '20px', example: 'Section headings on small screens' },
    { name: '2xl', size: '24px', example: 'Case study prose headings' },
    { name: '3xl', size: '30px', example: 'Journey and contact headings' },
    { name: '4xl', size: '36px', example: 'Large responsive section headings' },
  ],
  treatments: ['tracking-tighter', 'tracking-tight', 'leading-none', 'leading-tight', 'leading-relaxed', 'text-pretty', 'text-balance'],
};

export const layoutTokens = {
  radius: [
    { name: 'base', value: '10px', note: 'CSS --radius: 0.625rem' },
    { name: 'sm', value: '6px', note: 'base − 4px' },
    { name: 'md', value: '8px', note: 'base − 2px' },
    { name: 'lg', value: '10px', note: 'base' },
    { name: 'xl', value: '14px', note: 'base + 4px' },
    { name: 'full', value: '9999px', note: 'Profile, education, dock, and timeline marks' },
  ],
  spacing: {
    base: 'Tailwind spacing unit: 4px (0.25rem)',
    scale: [
      { token: 'spacing-01', rem: '0.125', px: 2 },
      { token: 'spacing-02', rem: '0.25', px: 4 },
      { token: 'spacing-03', rem: '0.375', px: 6 },
      { token: 'spacing-04', rem: '0.5', px: 8 },
      { token: 'spacing-05', rem: '0.75', px: 12 },
      { token: 'spacing-06', rem: '1', px: 16 },
      { token: 'spacing-07', rem: '1.25', px: 20 },
      { token: 'spacing-08', rem: '1.5', px: 24 },
      { token: 'spacing-09', rem: '2', px: 32 },
      { token: 'spacing-10', rem: '2.5', px: 40 },
      { token: 'spacing-11', rem: '3', px: 48 },
      { token: 'spacing-12', rem: '3.5', px: 56 },
      { token: 'spacing-13', rem: '4', px: 64 },
      { token: 'spacing-14', rem: '5', px: 80 },
    ],
    layout: ['24px page padding', '48px top padding', '56px section gaps', '80px project grid max width', '112px desktop column gap'],
  },
  breakpoints: [
    { name: 'sm', value: '640px', use: 'Project grid becomes two columns; featured cards can become horizontal' },
    { name: 'md', value: '768px', use: 'Education and work marks grow from 32px to 40px' },
    { name: 'lg', value: '1024px', use: 'Two-column profile rail, desktop about block, inline dock' },
  ],
  frame: [
    { name: 'Reading width', value: 'max-w-2xl → 672px', use: 'Narrow page width' },
    { name: 'Wide page', value: 'max-w-6xl → 1152px', use: 'Desktop page width' },
    { name: 'Profile rail', value: '280px', use: 'Desktop profile and about column' },
    { name: 'Project grid', value: '800px', use: 'Centered two-column project list' },
  ],
};

export const proposedMotionTokens = {
  durations: [
    { name: 'Fast', variable: '--motion-duration-fast', value: '150ms', usage: 'Immediate control and navigation feedback.' },
    { name: 'Standard', variable: '--motion-duration-standard', value: '200ms', usage: 'Cards, links, and common interface transitions.' },
    { name: 'Emphasis', variable: '--motion-duration-emphasis', value: '400ms', usage: 'Section entrances and larger changes in state.' },
  ],
  easings: [
    { name: 'Standard', variable: '--motion-easing-standard', value: 'cubic-bezier(.2,.75,.25,1)', usage: 'Balanced movement for interface transitions.' },
    { name: 'Enter', variable: '--motion-easing-enter', value: 'ease-out', usage: 'Movement that settles into its final state.' },
  ],
};

export const motionStyle = Object.fromEntries([
  ...proposedMotionTokens.durations,
  ...proposedMotionTokens.easings,
].map(({ variable, value }) => [variable, value]));

export const elevationTokens = [
  { name: 'Ring 2', value: 'ring-2 ring-border', shadow: '0 0 0 2px var(--border)' },
  { name: 'Ring 4', value: 'ring-4 ring-muted', shadow: '0 0 0 4px var(--muted)' },
  { name: 'Shadow small', value: 'shadow-sm', shadow: '0 1px 2px 0 rgb(0 0 0 / 5%)' },
  { name: 'Shadow', value: 'shadow', shadow: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px -1px rgb(0 0 0 / 10%)' },
  { name: 'Shadow large', value: 'shadow-lg', shadow: '0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%)' },
  { name: 'Tooltip shadow', value: 'tooltip shadow', shadow: '0 10px 40px -10px rgb(0 0 0 / 30%)' },
];

export function themeStyle(mode = 'dark') {
  const baseRadius = layoutTokens.radius.find(({ name }) => name === 'base')?.value ?? '10px';
  const radiusStyle = Object.fromEntries(layoutTokens.radius.map(({ name, value }) => [`--radius-${name}`, value]));
  const elevationStyle = Object.fromEntries(elevationTokens
    .filter(({ name }) => ['Shadow small', 'Shadow', 'Shadow large', 'Tooltip shadow'].includes(name))
    .map(({ name, shadow }) => [`--${name.toLowerCase().replaceAll(' ', '-')}`, shadow]));
  const style = { ...radiusStyle, ...elevationStyle, '--radius': baseRadius, ...motionStyle };
  for (const [key, token] of Object.entries(semanticTokens)) {
    const cssName = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    style[`--${cssName}`] = token[mode];
  }
  return style;
}
