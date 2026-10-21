import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  PanelRight,
  Sparkles,
} from 'lucide-react';
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Collapsible,
  CodeBlock,
  Separator,
  Sheet,
  SiteNav,
  TextInput,
  Timeline,
  Tooltip,
} from './components.jsx';
import {
  componentInventory,
  responsivePatterns,
} from './audit.js';
import {
  elevationTokens,
  layoutTokens,
  motionTokens,
  rawPalette,
  semanticTokens,
  themeStyle,
  typeTokens,
} from './tokens.js';
import FlickeringGrid from './FlickeringGrid.jsx';
import skillSource from '../../skill.md?raw';

const navigationTree = [
  { name: 'Start here', children: [{ id: 'overview', label: 'Introduction' }] },
  { name: 'Tokens', children: [
    { id: 'colors', label: 'Colour' },
    { id: 'type-scale', label: 'Type scale' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radius', label: 'Radius' },
    { id: 'elevation', label: 'Elevation' },
    { id: 'motion', label: 'Motion' },
  ] },
  { name: 'Core components', children: [
    { id: 'button', label: 'Button' },
    { id: 'input', label: 'Input' },
    { id: 'card', label: 'Card' },
    { id: 'tag', label: 'Tag' },
    { id: 'nav', label: 'Nav' },
    { id: 'list', label: 'List' },
    { id: 'sheet', label: 'Modal or Sheet' },
    { id: 'avatar', label: 'Avatar' },
  ] },
];

function normalCase(value) {
  return String(value).toLowerCase().replace(/(^|\/\s*)([a-z])/g, (_, prefix, letter) => `${prefix}${letter.toUpperCase()}`);
}

function Kicker() { return null; }

function SectionIntro({ label, title, description }) {
  return <div className="section-intro"><Kicker>{label}</Kicker><h2>{title}</h2><p>{description}</p></div>;
}

function StatusTag({ children, kind = 'source' }) {
  return <Badge variant={kind === 'added' ? 'secondary' : 'outline'} className={`status-badge status--${kind}`}>{normalCase(children)}</Badge>;
}


function TokenColor({ name, token, mode }) {
  const cssName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  return (
    <article className="token-color">
      <div className="token-color-swatch" style={{ background: token[mode] }}><span>Ab</span></div>
      <div className="token-color-copy"><strong>{token.label}</strong><code>--{cssName}</code><span>{token[mode]}</span></div>
    </article>
  );
}

function Swatch({ value, label }) {
  return <div className="raw-swatch"><span style={{ background: value }} /><div><strong>{label}</strong><code>{value}</code></div></div>;
}

function InventoryTable({ rows, headings = ['Pattern', 'Source / variants', 'Status'] }) {
  return (
    <div className="table-scroll"><table className="inventory-table"><thead><tr>{headings.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.name}><td><strong>{row.name}</strong></td><td><code>{row.source}</code><p>{row.details || row.note || row.variants}</p></td><td><StatusTag kind={row.state === 'Added here' ? 'added' : 'source'}>{row.state || 'In source'}</StatusTag></td></tr>)}</tbody></table></div>
  );
}

function SectionBlock({ id, children, className = '' }) {
  return <section id={id} className={`doc-section ${className}`}>{children}</section>;
}

export default function DesignSystemPage() {
  const [mode, setMode] = useState('light');
  const [activeScreen, setActiveScreen] = useState('Design System');
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const pageBackground = semanticTokens.background[mode];
    document.documentElement.style.backgroundColor = pageBackground;
    document.body.style.backgroundColor = pageBackground;
    return () => {
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    };
  }, [mode]);

  return (
    <div className={`ds-app${activeScreen === 'Code Skill' ? ' ds-app--skill' : activeScreen === 'Examples' ? ' ds-app--blank' : ''}`} data-mode={mode} style={themeStyle(mode)}>
      <FlickeringGrid mode={mode} />
      {activeScreen === 'Design System' && <>
      <aside className="ds-sidebar">
        <section className="sidebar-profile" aria-label="About Aditya Sharma">
          <img className="sidebar-profile-avatar" src="/aditya-avatar.jpg" alt="Aditya Sharma" />
          <div className="sidebar-profile-copy">
            <h2>Design system</h2>
            <p>by Aditya Sharma</p>
          </div>
        </section>
        <nav className="sidebar-nav" aria-label="Design system sections">
          {navigationTree.map((folder) => <section className="sidebar-tree-folder" key={folder.name}>
            <div className="sidebar-tree-trigger"><span>{folder.name}</span></div>
            <div className="sidebar-tree-children">{folder.children.map((item) => <a className="sidebar-tree-file" key={item.id} href={`#${item.id}`}><span>{item.label}</span></a>)}</div>
          </section>)}
        </nav>
      </aside>

      <main className="ds-content">
        <>
        <SectionBlock id="overview" className="overview-section">
          <div className="page-title-row"><div><h1>Introduction</h1></div></div>
          <div className="overview-copy">
            <p className="intro-copy">A unified visual language that brings together the foundations, principles, and reusable components behind my portfolio.</p>
            <p>This design system is an exploration of how a personal visual identity can be translated into a structured, consistent, and scalable set of design rules. It captures the decisions that shape my work, from color and typography to spacing, elevation, motion, and the components that bring these elements together.</p>
            <p>Rather than treating each interface as an isolated design, the system establishes a shared foundation for building cohesive digital experiences. Every token and component serves a purpose, creating consistency across layouts while leaving room for flexibility and experimentation when the context demands it.</p>
            <p>The system is organized into foundations and core components. Foundations define the visual language through color, type scale, spacing, radius, elevation, and motion. Components turn these foundations into practical, reusable building blocks, with documented variants and interaction states that help maintain consistency across different use cases.</p>
            <p>The goal is not simply to document how my portfolio looks today, but to make the underlying design logic explicit and reusable. By separating design decisions from individual screens, this system creates a foundation that can evolve with new requirements, support unfamiliar product experiences, and enable both people and AI agents to build interfaces that remain recognizably consistent with the original visual identity.</p>
          </div>
        </SectionBlock>

        <SectionBlock id="colors">
          <div className="section-title-line"><SectionIntro label="01.1 / COLOR" title="Semantic color" description="The values below come directly from globals.css. Switch the theme with the toggle to see the same token set in light and dark." /></div>
          <div className="token-color-grid">{Object.entries(semanticTokens).map(([name, token]) => <TokenColor key={name} name={name} token={token} mode={mode} />)}</div>
          <div className="token-legend"><span><i className="legend-box legend-box--dark" /> Dark / portfolio default</span><span><i className="legend-box legend-box--light" /> Light / alternate</span><span><i className="legend-box legend-box--chart" /> Chart slots are defined, no chart component is used</span></div>
          <div className="raw-palette-block"><div className="subsection-heading"><div><h3>Hard-coded exceptions</h3><p>Most interface color is semantic. These literal values are isolated to an illustration or decorative layer.</p></div><Badge variant="outline">Not theme tokens</Badge></div><div className="raw-palette-grid">{rawPalette.map((swatch) => <Swatch key={swatch.label} {...swatch} />)}</div><p className="small-note">Technology and company marks also use their source-brand SVG colors; those remain asset colors rather than app palette values.</p></div>
        </SectionBlock>

        <SectionBlock id="type">
          <div className="section-title-line"><SectionIntro label="01.2 / TYPE" title="Typography" description="The portfolio source defines Geist for interface text and Geist Mono for technical labels. This documentation app uses Geist only throughout." /></div>
          <div className="type-specimens">
            <article className="type-specimen"><div className="type-specimen-meta"><span>{normalCase('DISPLAY / SANS')}</span><code>Geist · 600/700</code></div><p className="type-display">Make the system<br />work for the story.</p></article>
            <article className="type-specimen"><div className="type-specimen-meta"><span>{normalCase('BODY / SANS')}</span><code>Geist · 400/500</code></div><p className="type-body-sample">Clear product thinking, made visible. The portfolio favors compact reading widths, crisp contrast, and relaxed leading in supporting copy.</p></article>
            <article className="type-specimen"><div className="type-specimen-meta"><span>{normalCase('TECHNICAL / MONO')}</span><code>Geist Mono · 300–700</code></div><p className="type-mono-sample">--background / 0.18 / 0 / 0</p></article>
          </div>
          <div className="type-scale-list" id="type-scale">{typeTokens.scale.map((item) => <div className="type-scale-row" key={item.name}><code>{item.name} · {item.size}</code><span className={`scale-sample scale-${item.name}`}>Product systems</span><p>{item.example}</p></div>)}</div>
          <div className="treatment-list"><span>{normalCase('TEXT TREATMENTS')}</span>{typeTokens.treatments.map((treatment) => <code key={treatment}>{treatment}</code>)}</div>
        </SectionBlock>

        <SectionBlock id="layout">
          <div className="section-title-line"><SectionIntro label="01.3 / SPACE & SHAPE" title="Spacing, radius, layout" description="Spacing follows Tailwind’s 4px base scale, with intentional one-off measurements for the profile rail, avatar, timeline alignment, and page frame." /></div>
          <div className="layout-grid" id="spacing">
            <div className="layout-panel"><div className="subsection-heading"><div><h3>Common spacing steps</h3><p>Values repeated across the profile, cards, and narrative sections.</p></div><span className="mono-kicker">{normalCase('PIXELS')}</span></div><div className="space-scale">{layoutTokens.spacing.common.map((value) => <div className="space-step" key={value}><span style={{ width: `min(${Number.parseInt(value, 10)}px, 80px)` }} /><code>{value}</code></div>)}</div><p className="small-note">{layoutTokens.spacing.note}</p></div>
            <div className="layout-panel"><div className="subsection-heading"><div><h3>Radius tokens</h3><p>Base 10px; semantic sizes derive from the CSS variable.</p></div><span className="mono-kicker">--RADIUS</span></div><div className="radius-list" id="radius">{layoutTokens.radius.map((item) => <div className="radius-row" key={item.name}><span className={`radius-demo radius-${item.name}`} /><div><strong>{item.name}</strong><code>{item.value}</code></div><small>{item.note}</small></div>)}</div></div>
          </div>
          <div className="frame-panel"><div className="subsection-heading"><div><h3>Page frame & breakpoints</h3><p>Desktop profile rail stays sticky; content switches to a one-column stack on smaller screens.</p></div><span className="mono-kicker">{normalCase('LAYOUT MAP')}</span></div><div className="frame-grid">{layoutTokens.frame.map((item) => <div key={item.name}><span>{item.name}</span><strong>{item.value}</strong><small>{item.use}</small></div>)}</div><div className="breakpoint-list">{responsivePatterns.map((item) => <div key={item.range}><Badge variant="secondary">{item.range}</Badge><span>{item.rule}</span></div>)}</div></div>
        </SectionBlock>

        <SectionBlock id="motion">
          <div className="section-title-line"><SectionIntro label="01.4 / FEEDBACK" title="Motion & elevation" description="Motion is small and functional: reveal content, clarify links, and magnify the dock. The source does not define a reduced-motion override." /></div>
          <div className="motion-grid">{motionTokens.map((item, index) => <article key={item.name} className="motion-row"><span className="motion-index">0{index + 1}</span><div><strong>{item.name}</strong><code>{item.value}</code><p>{item.note}</p></div></article>)}</div>
          <div className="elevation-grid" id="elevation">{elevationTokens.map((item) => <article className="elevation-card" key={item.name}><span className={`elevation-sample elevation-${item.name.split(' ')[0].toLowerCase()}`} /><div><strong>{item.name}</strong><code>{item.value}</code><small>{item.use}</small></div></article>)}</div>
        </SectionBlock>

        <SectionBlock id="components">
          <div className="section-title-line"><SectionIntro label="03 / COMPONENT LIBRARY" title="Core components" description="Reusable interface components and their documented variants." /></div>
          <InventoryTable rows={componentInventory} />

          <div className="component-showcase" id="examples">
            <article className="showcase-block" id="button"><div className="showcase-heading"><div><Kicker>CONTROL / BUTTON</Kicker><h3>Button variants</h3></div><StatusTag>Used</StatusTag></div><div className="button-row"><Button>Default</Button><Button variant="destructive">Destructive</Button><Button variant="outline">Outline</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="link">Link</Button></div><div className="button-row button-row--sizes"><Button size="sm">Small</Button><Button>Default size</Button><Button size="lg">Large</Button><Button size="icon" aria-label="Open external"><ArrowUpRight size={16} /></Button><Button disabled>Disabled</Button></div><p className="small-note">Focus-visible ring, disabled opacity, icon size, and as-child link styling are in the original button utility.</p></article>

            <article className="showcase-block" id="input"><div className="showcase-heading"><div><Kicker>FORM CONTROL / INPUT</Kicker><h3>Text input states</h3></div><StatusTag kind="added">Added here</StatusTag></div><div className="input-demo-grid"><TextInput label="Default" placeholder="Type a project name" hint="The source portfolio has no form; this is a required addition." /><TextInput label="Invalid" defaultValue="not-an-email" error="Enter a valid email address." /><TextInput label="Disabled" placeholder="Not available" disabled /></div><p className="small-note">Added for the requested minimum. Uses the portfolio’s semantic border, muted helper text, and focus ring.</p></article>

            <article className="showcase-block" id="card"><div className="showcase-heading"><div><Kicker>SURFACE / CARD</Kicker><h3>Composable card</h3></div><StatusTag>Used</StatusTag></div><div className="card-demo-grid"><Card className="demo-card"><CardHeader><Badge variant="outline">Case study / module</Badge><CardTitle>Decision log</CardTitle><CardDescription>Card anatomy remains composable; project and MDX uses add their own border and media framing.</CardDescription></CardHeader><CardContent><p>Content area with a concise explanation, tabular metadata, or a visual.</p></CardContent><CardFooter><Button variant="outline" size="sm">View module <ArrowUpRight size={13} /></Button></CardFooter></Card><div className="card-anatomy"><span>CardHeader</span><span>CardTitle</span><span>CardDescription</span><span>CardContent</span><span>CardFooter</span></div></div></article>

            <article className="showcase-block" id="tag"><div className="showcase-heading"><div><Kicker>LABEL / BADGE</Kicker><h3>Tags and status labels</h3></div><StatusTag>Used</StatusTag></div><div className="badge-row"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge><Badge variant="outline"><Sparkles size={12} /> AI product</Badge></div><p className="small-note">The portfolio uses badges for project link types, hackathon links, and case-study decisions. Skills use a slightly roomier outlined chip.</p></article>

            <article className="showcase-block" id="list"><div className="showcase-heading"><div><h3>Experience list</h3></div><StatusTag>Used</StatusTag></div><Timeline items={[{ date: '2025 — Present', title: 'Product systems', description: 'Experience items share a vertical marker and aligned content.', tag: 'Work history' }, { date: '2024 — 2025', title: 'Independent practice', description: 'The same list structure supports project and career milestones.', tag: 'Journey' }]} /></article>

            <article className="showcase-block" id="avatar"><div className="showcase-heading"><div><Kicker>IDENTITY / AVATAR</Kicker><h3>Image and fallback</h3></div><StatusTag>Used</StatusTag></div><div className="avatar-row"><Avatar size="sm" initials="AS" alt="Small profile avatar" /><Avatar size="md" initials="AS" alt="Medium profile avatar" className="avatar-ring" /><Avatar size="lg" initials="AS" alt="Large profile avatar" className="avatar-ring" /><span className="avatar-caption">76px small-screen profile / 96px desktop profile in source</span></div></article>

            <article className="showcase-block" id="sheet"><div className="showcase-heading"><div><Kicker>OVERLAY / SHEET</Kicker><h3>Slide-over panel</h3></div><StatusTag>Available, not mounted</StatusTag></div><div className="sheet-demo"><p>The source exports four slide directions from a Radix dialog primitive.</p><div className="button-row"><Button variant="outline" onClick={() => setSheetOpen(true)}><PanelRight size={15} /> Open right sheet</Button><Button variant="ghost" onClick={() => setSheetOpen(true)}>Open details <ArrowUpRight size={14} /></Button></div></div></article>

            <article className="showcase-block" id="nav"><div className="showcase-heading"><div><Kicker>NAVIGATION / DOCK</Kicker><h3>Responsive dock</h3></div><StatusTag>Used</StatusTag></div><p className="small-note">The original dock magnifies toward the pointer and uses tooltips. This scaled demo keeps the same icon, border, and separation treatment.</p><div className="dock-demo"><SiteNav variant="inline" mode={mode} onToggleTheme={() => setMode(mode === 'dark' ? 'light' : 'dark')} /></div><div className="dock-mobile-note">On small screens, the source moves this dock to the viewport bottom and adds the floating menu control.</div></article>

            <article className="showcase-block"><div className="showcase-heading"><div><Kicker>FEEDBACK / TOOLTIP</Kicker><h3>Hover and focus hint</h3></div><StatusTag>Used</StatusTag></div><div className="tooltip-demo"><Tooltip label="Open project"><Button variant="outline" size="icon" aria-label="Open project"><ArrowUpRight size={16} /></Button></Tooltip><span>Hover or keyboard-focus the icon.</span></div></article>

            <article className="showcase-block"><div className="showcase-heading"><div><Kicker>DISCLOSURE / ACCORDION</Kicker><h3>Source library primitive</h3></div><StatusTag>Available, not mounted</StatusTag></div><Accordion items={[{ title: 'When to use a card', content: 'Use a card for a contained project or case-study module, not to wrap every text section.' }, { title: 'When to use a badge', content: 'Use short labels for category, link type, or state. Keep longer descriptions in the card body.' }]} /></article>

            <article className="showcase-block"><div className="showcase-heading"><div><Kicker>DISCLOSURE / COLLAPSIBLE</Kicker><h3>Expandable note</h3></div><StatusTag>Available, not mounted</StatusTag></div><Collapsible title="Spacing notes"><p>The portfolio uses Tailwind’s regular spacing utilities plus small layout-specific values for its desktop rail and nested timeline.</p></Collapsible></article>

            <article className="showcase-block"><div className="showcase-heading"><div><Kicker>DATA / TABLE</Kicker><h3>Decision log rows</h3></div><StatusTag>Case studies</StatusTag></div><div className="table-scroll"><table className="inventory-table demo-table"><thead><tr><th>Choice</th><th>Reason</th><th>Outcome</th></tr></thead><tbody><tr><td>Keep hierarchy shallow</td><td>Reduce scanning cost</td><td>Faster review</td></tr><tr><td>Show evidence inline</td><td>Make tradeoffs clear</td><td>More trust</td></tr></tbody></table></div><Separator /></article>
          </div>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen} title="Case study details" description="A right-side sheet pattern from the portfolio's shared UI library." side="right">
            <div className="sheet-detail"><Badge variant="secondary">In progress</Badge><p>This overlay uses a native dialog surface in this React implementation, with Escape, backdrop, focus return, and close-button support.</p><TextInput label="Quick note" placeholder="Add a short note" /></div>
            <div className="sheet-actions"><Button variant="outline" onClick={() => setSheetOpen(false)}>Close panel</Button><Button onClick={() => setSheetOpen(false)}>Done <Check size={14} /></Button></div>
          </Sheet>
        </SectionBlock>

        </>
      </main>
      </>}
      {activeScreen === 'Code Skill' && <main className="ds-content ds-skill-screen"><section className="skill-page"><h1>Code Skill</h1><p>Instructions that turn my design system into a reusable capability for AI agents, enabling them to build new interfaces with consistent visual language and intentional design decisions.</p><CodeBlock title="skill.md" code={skillSource} /></section></main>}
      {activeScreen === 'Examples' && <main className="ds-content ds-blank-screen" />}
      <SiteNav variant="floating" mode={mode} onToggleTheme={() => setMode(mode === 'dark' ? 'light' : 'dark')} active={activeScreen} onNavigate={(screen) => { setActiveScreen(screen); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
    </div>
  );
}
