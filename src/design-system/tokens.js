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

export const rawPalette = [
  { label: 'Sprout icon · light', value: '#5C8A60', group: 'Illustration-specific' },
  { label: 'Sprout icon · dark', value: '#9DBD9F', group: 'Illustration-specific' },
  { label: 'Flickering grid', value: 'rgb(0, 0, 0)', group: 'Motion/decoration default' },
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
    common: ['2px', '4px', '6px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '56px', '64px', '80px'],
    layout: ['24px page padding', '48px top padding', '56px section gaps', '80px project grid max width', '112px desktop column gap'],
    note: 'The reference combines the default Tailwind spacing scale with explicit one-off values such as 11px timeline dots, 52px nested-role alignment, 76px profile avatars, and 280px profile rails.',
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

export const motionTokens = [
  { name: 'Blur fade', value: '400ms ease-out', note: 'Default section reveal; starts 6px above with 6px blur and 40ms base delay' },
  { name: 'Stagger', value: '50ms', note: 'Per-item reveal increment; text character reveal uses 30ms' },
  { name: 'Card / link hover', value: '200ms', note: 'Ring, color, and external-arrow transitions' },
  { name: 'Floating menu', value: '150–180ms', note: 'Icon swap and panel entrance/exit' },
  { name: 'Sheet', value: '300ms close / 500ms open', note: 'Directional slide with fade overlay' },
  { name: 'Dock spring', value: 'mass 0.1 · stiffness 150 · damping 12', note: 'Pointer-distance icon magnification' },
  { name: 'Reduced motion', value: 'Not explicitly authored', note: 'The source does not define a reduced-motion override for these effects' },
];

export const elevationTokens = [
  { name: 'Ring 2', value: 'ring-2 ring-border', use: 'Avatar, education logos, selected/hover card' },
  { name: 'Ring 4', value: 'ring-4 ring-muted', use: 'Profile avatar' },
  { name: 'shadow-sm', value: 'Tailwind shadow-sm', use: 'Buttons and raised small controls' },
  { name: 'shadow', value: 'Tailwind shadow', use: 'Education/company marks' },
  { name: 'shadow-lg', value: 'Tailwind shadow-lg', use: 'Profile avatar and floating menu button' },
  { name: 'Tooltip shadow', value: '0 10px 40px -10px rgba(0,0,0,.3/.5)', use: 'Light/dark tooltip surface' },
];

export function themeStyle(mode = 'dark') {
  const style = { '--radius': '0.625rem', '--ds-radius': '0.625rem' };
  for (const [key, token] of Object.entries(semanticTokens)) {
    const cssName = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    style[`--${cssName}`] = token[mode];
  }
  return style;
}
