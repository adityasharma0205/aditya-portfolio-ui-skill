import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  PanelRight,
  Sparkles,
} from 'lucide-react';
import { Avatar } from './components/Avatar.jsx';
import { Badge } from './components/Tag.jsx';
import { Button } from './components/Button.jsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/Card.jsx';
import { CodeBlock } from './components/CodeBlock.jsx';
import { Input } from './components/Input.jsx';
import { List } from './components/List.jsx';
import { Modal } from './components/Modal.jsx';
import { SiteNav } from './components/Nav.jsx';
import { Sheet } from './components/Sheet.jsx';
import {
  responsivePatterns,
} from './audit.js';
import {
  elevationTokens,
  colorTokenGroups,
  layoutTokens,
  motionTokens,
  semanticTokens,
  themeStyle,
  typeTokens,
} from './tokens.js';
import FlickeringGrid from './FlickeringGrid.jsx';
import ProductExamplesPage from './ProductExamplesPage.jsx';
import skillSource from '../../skill.md?raw';

const navigationTree = [
  { name: 'Start here', children: [{ id: 'overview', label: 'Introduction' }] },
  { name: 'Tokens', children: [
    { id: 'colors', label: 'Colour' },
    { id: 'type-scale', label: 'Type scale' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radius', label: 'Radius' },
    { id: 'layout', label: 'Layout' },
    { id: 'motion', label: 'Motion' },
    { id: 'elevation', label: 'Elevation' },
  ] },
  { name: 'Core components', children: [
    { id: 'button', label: 'Button' },
    { id: 'input', label: 'Input' },
    { id: 'card', label: 'Card' },
    { id: 'tag', label: 'Tag' },
    { id: 'nav', label: 'Nav' },
    { id: 'list', label: 'List' },
    { id: 'modal', label: 'Modal' },
    { id: 'sheet', label: 'Sheet' },
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

function TokenColor({ name, token, mode }) {
  const cssName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  return (
    <article className="token-color">
      <div className="token-color-swatch" style={{ background: token[mode] }} />
      <div className="token-color-copy"><strong>{token.label}</strong><code>--{cssName}</code><span>{token[mode]}</span></div>
    </article>
  );
}

function SectionBlock({ id, children, className = '' }) {
  return <section id={id} className={`doc-section ${className}`}>{children}</section>;
}

export default function DesignSystemPage() {
  const [mode, setMode] = useState('light');
  const [activeScreen, setActiveScreen] = useState(() => {
    try {
      const savedScreen = window.localStorage.getItem('aditya-portfolio-active-screen');
      return ['Design System', 'Code Skill', 'Examples'].includes(savedScreen) ? savedScreen : 'Design System';
    } catch {
      return 'Design System';
    }
  });
  const [sheetOpen, setSheetOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem('aditya-portfolio-active-screen', activeScreen);
    } catch {
      // Keep tab navigation usable when browser storage is unavailable.
    }
  }, [activeScreen]);

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
            <p className="intro-copy">A <strong>unified visual language</strong> that brings together the foundations, principles, and reusable components behind my portfolio.</p>
            <p>This design system is an exploration of how a personal visual identity can be translated into a <strong>structured, consistent, and scalable set of design rules</strong>. It captures the decisions that shape my work, from color and typography to spacing, elevation, motion, and the components that bring these elements together.</p>
            <p>Rather than treating each interface as an isolated design, the system establishes a <strong>shared foundation</strong> for building cohesive digital experiences. Every token and component serves a purpose, creating consistency across layouts while leaving room for flexibility and experimentation when the context demands it.</p>
            <p>The system is organized into <strong>foundations and core components</strong>. Foundations define the visual language through color, type scale, spacing, radius, elevation, and motion. Components turn these foundations into practical, reusable building blocks, with documented variants and interaction states that help maintain consistency across different use cases.</p>
            <p>The goal is not simply to document how my portfolio looks today, but to make the <strong>underlying design logic explicit and reusable</strong>. By separating design decisions from individual screens, this system creates a foundation that can evolve with new requirements, support unfamiliar product experiences, and enable both people and AI agents to build interfaces that remain recognizably consistent with the original visual identity.</p>
          </div>
        </SectionBlock>

        <SectionBlock id="colors">
          <div className="section-title-line"><SectionIntro label="01.1 / COLOR" title="Colour" description="The values below come directly from globals.css. Switch the theme with the toggle to see the same token set in light and dark." /></div>
          <div className="color-token-groups">{colorTokenGroups.map((group) => <section className="color-token-category" key={group.name} aria-label={`${group.name} color tokens`}><div className="color-category-heading"><div><h3>{group.name}</h3><p>{group.description}</p></div><span>{String(group.tokens.length).padStart(2, '0')}</span></div><div className="token-color-grid">{group.tokens.map((name) => <TokenColor key={name} name={name} token={semanticTokens[name]} mode={mode} />)}</div></section>)}</div>
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

        <SectionBlock id="spacing">
          <div className="section-title-line"><SectionIntro label="01.3 / FOUNDATION" title="Spacing" description="A 4px base scale with deliberate one-off measurements for the profile rail, cards, and narrative sections." /></div>
          <div className="layout-panel"><div className="subsection-heading"><div><h3>Common spacing steps</h3><p>Values repeated across the profile, cards, and narrative sections.</p></div><span className="mono-kicker">{normalCase('PIXELS')}</span></div><div className="space-scale">{layoutTokens.spacing.common.map((value) => <div className="space-step" key={value}><span style={{ width: `min(${Number.parseInt(value, 10)}px, 80px)` }} /><code>{value}</code></div>)}</div><p className="small-note">{layoutTokens.spacing.note}</p></div>
        </SectionBlock>

        <SectionBlock id="radius">
          <div className="section-title-line"><SectionIntro label="01.4 / FOUNDATION" title="Radius" description="Rounded corners use a small set of values, with a 10px base radius for common surfaces." /></div>
          <div className="layout-panel"><div className="radius-list">{layoutTokens.radius.map((item) => <div className="radius-row" key={item.name}><span className={`radius-demo radius-${item.name}`} /><div><strong>{item.name}</strong><code>{item.value}</code></div><small>{item.note}</small></div>)}</div></div>
        </SectionBlock>

        <SectionBlock id="layout">
          <div className="section-title-line"><SectionIntro label="01.5 / FOUNDATION" title="Layout" description="The page frame adapts from a profile rail and content column to a stacked narrow-screen layout." /></div>
          <div className="frame-panel"><div className="subsection-heading"><div><h3>Page frame & breakpoints</h3><p>Desktop profile rail stays sticky; content switches to a one-column stack on smaller screens.</p></div></div><div className="frame-grid">{layoutTokens.frame.map((item) => <div key={item.name}><span>{item.name}</span><strong>{item.value}</strong><small>{item.use}</small></div>)}</div><div className="breakpoint-list">{responsivePatterns.map((item) => <div key={item.range}><Badge variant="secondary">{item.range}</Badge><span>{item.rule}</span></div>)}</div></div>
        </SectionBlock>

        <SectionBlock id="motion">
          <div className="section-title-line"><SectionIntro label="01.6 / FOUNDATION" title="Motion" description="Motion is restrained and functional, clarifying transitions and interaction feedback." /></div>
          <div className="motion-grid">{motionTokens.map((item, index) => <article key={item.name} className="motion-row"><span className="motion-index">0{index + 1}</span><div><strong>{item.name}</strong><code>{item.value}</code><p>{item.note}</p></div></article>)}</div>
        </SectionBlock>

        <SectionBlock id="elevation">
          <div className="section-title-line"><SectionIntro label="01.7 / FOUNDATION" title="Elevation" description="Shadows and rings provide restrained depth for avatars, marks, and floating controls." /></div>
          <div className="elevation-grid">{elevationTokens.map((item) => <article className="elevation-card" key={item.name}><span className={`elevation-sample elevation-${item.name.split(' ')[0].toLowerCase()}`} /><div><strong>{item.name}</strong><code>{item.value}</code><small>{item.use}</small></div></article>)}</div>
        </SectionBlock>

        <SectionBlock id="button">
          <div className="section-title-line"><SectionIntro label="03.1 / CONTROL" title="Button" description="Action controls with clear emphasis, hierarchy, and interaction states." /></div>
          <div className="component-demo-surface"><div className="button-row"><Button>Default</Button><Button variant="destructive">Destructive</Button><Button variant="outline">Outline</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="link">Link</Button></div><div className="button-row button-row--sizes"><Button size="sm">Small</Button><Button>Default size</Button><Button size="lg">Large</Button><Button size="icon" aria-label="Open external"><ArrowUpRight size={16} /></Button><Button disabled>Disabled</Button></div><p className="small-note">Focus-visible ring, disabled opacity, icon size, and link styling.</p></div>
        </SectionBlock>

        <SectionBlock id="input">
          <div className="section-title-line"><SectionIntro label="03.2 / FORM CONTROL" title="Input" description="Text fields with helper copy, validation feedback, and disabled states." /></div>
          <div className="component-demo-surface input-demo-grid"><Input label="Default" placeholder="Type a project name" hint="The source portfolio has no form; this is a required addition." /><Input label="Invalid" defaultValue="not-an-email" error="Enter a valid email address." /><Input label="Disabled" placeholder="Not available" disabled /></div>
        </SectionBlock>

        <SectionBlock id="card">
          <div className="section-title-line"><SectionIntro label="03.3 / SURFACE" title="Card" description="Composable surfaces with optional header, content, and footer regions." /></div>
          <div className="component-demo-surface"><div className="card-demo-grid"><Card className="demo-card"><CardHeader><Badge variant="outline">Case study / module</Badge><CardTitle>Decision log</CardTitle><CardDescription>Card anatomy stays composable; compositions add their own border, padding, or media.</CardDescription></CardHeader><CardContent><p>Content area for concise explanation, metadata, or a visual.</p></CardContent><CardFooter><Button variant="outline" size="sm">View module <ArrowUpRight size={13} /></Button></CardFooter></Card><div className="card-anatomy"><span>CardHeader</span><span>CardTitle</span><span>CardDescription</span><span>CardContent</span><span>CardFooter</span></div></div></div>
        </SectionBlock>

        <SectionBlock id="tag">
          <div className="section-title-line"><SectionIntro label="03.4 / LABEL" title="Tag" description="Compact labels for categories, link types, and status." /></div>
          <div className="component-demo-surface"><div className="badge-row"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge><Badge variant="outline"><Sparkles size={12} /> AI product</Badge></div><p className="small-note">The portfolio uses badges for project link types, hackathon links, and case-study decisions.</p></div>
        </SectionBlock>

        <SectionBlock id="nav">
          <div className="section-title-line"><SectionIntro label="03.5 / NAVIGATION" title="Nav" description="A dock that adapts from an inline desktop treatment to a floating mobile control." /></div>
          <div className="component-demo-surface"><div className="dock-demo"><SiteNav variant="inline" mode={mode} onToggleTheme={() => setMode(mode === 'dark' ? 'light' : 'dark')} /></div><p className="small-note">The app dock keeps the same icon, border, and separation treatment.</p></div>
        </SectionBlock>

        <SectionBlock id="list">
          <div className="section-title-line"><SectionIntro label="03.6 / CONTENT" title="List" description="Chronological entries with dates, titles, supporting copy, and optional tags." /></div>
          <div className="component-demo-surface"><List items={[{ date: '2025 — Present', title: 'Product systems', description: 'Experience items share a vertical marker and aligned content.', tag: 'Work history' }, { date: '2024 — 2025', title: 'Independent practice', description: 'The same structure supports project and career milestones.', tag: 'Journey' }]} /></div>
        </SectionBlock>

        <SectionBlock id="modal">
          <div className="section-title-line"><SectionIntro label="03.7 / OVERLAY" title="Modal" description="A centered dialog for focused decisions and short tasks." /></div>
          <div className="component-demo-surface sheet-demo"><p>Use a modal when a task needs focused attention without changing the current page.</p><Button variant="outline" onClick={() => setModalOpen(true)}>Open modal</Button></div>
          <Modal open={modalOpen} onOpenChange={setModalOpen} title="Confirm changes" description="Review the update before continuing."><p className="muted-copy">Your changes are ready to be saved.</p><div className="sheet-actions"><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={() => setModalOpen(false)}>Confirm</Button></div></Modal>
        </SectionBlock>

        <SectionBlock id="sheet">
          <div className="section-title-line"><SectionIntro label="03.8 / OVERLAY" title="Sheet" description="A slide-over panel for focused details and secondary tasks." /></div>
          <div className="component-demo-surface sheet-demo"><p>The source exports four slide directions from a dialog primitive.</p><Button variant="outline" onClick={() => setSheetOpen(true)}><PanelRight size={15} /> Open right sheet</Button></div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen} title="Case study details" description="A right-side sheet pattern from the portfolio's shared UI library." side="right"><div className="sheet-detail"><Badge variant="secondary">In progress</Badge><p>This panel supports Escape, backdrop, and close-button behavior.</p><Input label="Quick note" placeholder="Add a short note" /></div><div className="sheet-actions"><Button variant="outline" onClick={() => setSheetOpen(false)}>Close panel</Button><Button onClick={() => setSheetOpen(false)}>Done <Check size={14} /></Button></div></Sheet>
        </SectionBlock>

        <SectionBlock id="avatar">
          <div className="section-title-line"><SectionIntro label="03.9 / IDENTITY" title="Avatar" description="An image avatar with a readable initials fallback and size variants." /></div>
          <div className="component-demo-surface"><div className="avatar-row"><Avatar size="sm" initials="AS" alt="Small profile avatar" /><Avatar size="md" initials="AS" alt="Medium profile avatar" className="avatar-ring" /><Avatar size="lg" initials="AS" alt="Large profile avatar" className="avatar-ring" /><span className="avatar-caption">76px small-screen profile / 96px desktop profile in source</span></div></div>
        </SectionBlock>

        </>
      </main>
      </>}
      {activeScreen === 'Code Skill' && <main className="ds-content ds-skill-screen"><section className="skill-page"><h1>Code Skill</h1><p>Instructions that turn my design system into a reusable capability for AI agents, enabling them to build new interfaces with consistent visual language and intentional design decisions.</p><CodeBlock title="skill.md" code={skillSource} /></section></main>}
      {activeScreen === 'Examples' && <ProductExamplesPage />}
      <SiteNav variant="floating" mode={mode} onToggleTheme={() => setMode(mode === 'dark' ? 'light' : 'dark')} active={activeScreen} onNavigate={(screen) => { setActiveScreen(screen); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
    </div>
  );
}
