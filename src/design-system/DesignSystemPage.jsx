import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Circle,
  PanelRight,
} from 'lucide-react';
import { Avatar } from './components/Avatar.jsx';
import { Badge } from './components/Tag.jsx';
import { Button } from './components/Button.jsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/Card.jsx';
import { CodeBlock } from './components/CodeBlock.jsx';
import { Divider } from './components/Divider.jsx';
import { Input } from './components/Input.jsx';
import { List } from './components/List.jsx';
import { MessageBubble } from './components/MessageBubble.jsx';
import { Modal } from './components/Modal.jsx';
import { SiteNav } from './components/Nav.jsx';
import { PromptBox } from './components/PromptBox.jsx';
import { Sheet } from './components/Sheet.jsx';
import {
  elevationTokens,
  colorTokenGroups,
  layoutTokens,
  proposedMotionTokens,
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
    { id: 'modal', label: 'Modal' },
    { id: 'sheet', label: 'Sheet' },
    { id: 'avatar', label: 'Avatar' },
    { id: 'divider', label: 'Divider' },
    { id: 'message-bubble', label: 'Message Bubble' },
    { id: 'prompt-box', label: 'Prompt Box' },
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
  const hex = colorToHex(token[mode]);
  return (
    <article className="token-color">
      <div className="token-color-swatch" style={{ background: token[mode] }} />
      <div className="token-color-copy"><strong>{token.label}</strong><code>--{cssName}</code><span>{hex}</span></div>
    </article>
  );
}

function colorToHex(value) {
  const match = value.match(/oklch\(([^\s]+)\s+([^\s]+)\s+([^\s/)]+)(?:\s*\/\s*([^\s)]+))?\)/i);
  if (!match) return value;

  const [, lightness, chroma, hue, alpha = '1'] = match;
  const L = Number(lightness);
  const C = Number(chroma);
  const radians = (Number(hue) * Math.PI) / 180;
  const a = C * Math.cos(radians);
  const b = C * Math.sin(radians);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  const channels = linear.map((channel) => {
    const srgb = channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, srgb)) * 255).toString(16).padStart(2, '0');
  });
  const alphaValue = alpha.endsWith('%') ? Number(alpha.slice(0, -1)) / 100 : Number(alpha);
  if (alphaValue < 1) channels.push(Math.round(Math.min(1, Math.max(0, alphaValue)) * 255).toString(16).padStart(2, '0'));
  return `#${channels.join('')}`;
}

function SectionBlock({ id, children, className = '' }) {
  return <section id={id} className={`doc-section ${className}`}>{children}</section>;
}

function MotionPreview({ durationToken, easingToken }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setActive((value) => !value), 1500);
    return () => window.clearInterval(timer);
  }, []);

  return <div className="motion-preview" aria-hidden="true" style={{ '--preview-duration': `var(${durationToken})`, '--preview-easing': `var(${easingToken})` }}><span className="motion-preview-track"><i className={active ? 'is-active' : ''} /></span></div>;
}

function MotionTokenCard({ item, durationToken, easingToken }) {
  return (
    <article className="radius-card motion-specimen-card">
      <MotionPreview durationToken={durationToken} easingToken={easingToken} />
      <div className="motion-specimen-meta">
        <strong>{item.name}</strong>
        <code>{item.variable}</code>
        <b>{item.value}</b>
        <p>{item.usage}</p>
      </div>
    </article>
  );
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
  const [modalResult, setModalResult] = useState('');
  const [promptResult, setPromptResult] = useState('');

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
          <div className="color-token-groups">{colorTokenGroups.map((group) => <section className="color-token-category" key={group.name} aria-label={`${group.name} color tokens`}><div className="color-category-heading"><div><h3>{group.name}</h3><p>{group.description}</p></div></div><div className="token-color-grid">{group.tokens.map((name) => <TokenColor key={name} name={name} token={semanticTokens[name]} mode={mode} />)}</div></section>)}</div>
        </SectionBlock>

        <SectionBlock id="type-scale">
          <div className="section-title-line"><SectionIntro label="01.2 / TYPE" title="Type scale" description="Geist carries display and interface text; a monospace face is reserved for technical details." /></div>
          <article className="type-specimen">
            <div className="type-specimen-meta"><span>Geist</span></div>
            <p className="type-display">Make the system work for the story.</p>
            <p className="type-body-sample">Clear product thinking, made visible. The portfolio favors compact reading widths and relaxed leading in supporting copy.</p>
            <code className="type-mono-sample">Aa · 0123456789 · --background</code>
          </article>
          <div className="type-scale-list">{typeTokens.scale.map((item) => <div className="type-scale-row" key={item.name}><code>{item.name} · {item.size}</code><span className={`scale-sample scale-${item.name}`}>Product systems</span></div>)}</div>
        </SectionBlock>

        <SectionBlock id="spacing">
          <div className="section-title-line"><SectionIntro label="01.3 / FOUNDATION" title="Spacing" description="A compact scale from 2px to 80px, shown in rem and pixels." /></div>
          <div className="spacing-scale-wrap"><table className="spacing-scale-table"><thead><tr><th scope="col">Token</th><th scope="col">rem</th><th scope="col">px</th><th scope="col">Example</th></tr></thead><tbody>{layoutTokens.spacing.scale.map((item) => <tr key={item.token}><th scope="row">{item.token}</th><td>{item.rem}</td><td>{item.px}</td><td><span className="spacing-scale-example" style={{ width: `${item.px}px`, height: `${item.px}px` }} /></td></tr>)}</tbody></table></div>
        </SectionBlock>

        <SectionBlock id="radius">
          <div className="section-title-line"><SectionIntro label="01.4 / FOUNDATION" title="Radius" description="Rounded corners use a small set of values, with a 10px base radius for common surfaces." /></div>
          <div className="radius-grid">{layoutTokens.radius.map((item) => <article className="radius-card" key={item.name}><div className="radius-swatch"><span className={`radius-preview${item.name === 'full' ? ' radius-preview--full' : ''}`} style={{ borderRadius: item.name === 'full' ? '50%' : item.value }} /></div><div className="radius-card-meta"><strong>{item.name}</strong><code>{item.value}</code></div></article>)}</div>
        </SectionBlock>

        <SectionBlock id="elevation">
          <div className="section-title-line"><SectionIntro label="01.5 / FOUNDATION" title="Elevation" description="Shadows and rings provide restrained depth for avatars, marks, and floating controls." /></div>
          <div className="elevation-grid">{elevationTokens.map((item) => <article className="radius-card elevation-card" key={item.name}><div className="radius-swatch elevation-swatch"><span className="elevation-sample" style={{ boxShadow: item.shadow }} /></div><div className="radius-card-meta"><strong>{item.name}</strong><code>{item.value}</code></div></article>)}</div>
        </SectionBlock>

        <SectionBlock id="motion">
          <div className="section-title-line"><SectionIntro label="01.6 / FOUNDATION" title="Motion" description="Motion durations and easing curves." /></div>
          <div className="motion-spec-group">
            <h4 className="motion-category-title">Duration</h4>
            <div className="motion-spec-grid">{proposedMotionTokens.durations.map((item) => <MotionTokenCard key={item.variable} item={item} durationToken={item.variable} easingToken="--motion-easing-standard" />)}</div>
            <h4 className="motion-category-title">Easing</h4>
            <div className="motion-spec-grid motion-spec-grid--easing">{proposedMotionTokens.easings.map((item) => <MotionTokenCard key={item.variable} item={item} durationToken="--motion-duration-standard" easingToken={item.variable} />)}</div>
          </div>
        </SectionBlock>

        <SectionBlock id="button">
          <div className="section-title-line"><SectionIntro label="03.1 / CONTROL" title="Button" description="Action controls with clear emphasis, hierarchy, and interaction states." /></div>
          <div className="component-demo-surface"><div className="button-row"><Button>Default</Button><Button variant="destructive">Destructive</Button><Button variant="outline">Outline</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="link">Link</Button></div><div className="button-row button-row--sizes"><Button size="sm">Small</Button><Button>Default size</Button><Button size="lg">Large</Button><Button size="icon" aria-label="Open external"><ArrowUpRight size={16} /></Button><Button disabled>Disabled</Button></div></div>
        </SectionBlock>

        <SectionBlock id="input">
          <div className="section-title-line"><SectionIntro label="03.2 / FORM CONTROL" title="Input" description="Text fields with helper copy, validation feedback, and disabled states." /></div>
          <div className="component-demo-surface input-demo-grid"><Input label="Name" placeholder="Enter a name" hint="Enter a value to continue." /><Input label="Email" defaultValue="invalid-email" error="Enter a valid email address." /><Input label="Account ID" defaultValue="Unavailable" disabled /></div>
        </SectionBlock>

        <SectionBlock id="card">
          <div className="section-title-line"><SectionIntro label="03.3 / SURFACE" title="Card" description="Composable surfaces with optional header, content, and footer regions." /></div>
          <div className="component-demo-surface"><div className="card-demo-grid"><Card className="demo-card"><CardHeader><Badge variant="outline">Category</Badge><CardTitle>Card title</CardTitle><CardDescription>A short description explaining the content or purpose of this card.</CardDescription></CardHeader><CardContent><p>Additional information can be placed here.</p></CardContent><CardFooter><Button variant="outline" size="sm">Learn more</Button></CardFooter></Card></div></div>
        </SectionBlock>

        <SectionBlock id="tag">
          <div className="section-title-line"><SectionIntro label="03.4 / LABEL" title="Tag" description="Compact labels for categories, link types, and status." /></div>
          <div className="component-demo-surface"><div className="badge-row"><Badge>Default</Badge><Badge variant="secondary">Secondary</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge><Badge variant="outline">Featured</Badge></div></div>
        </SectionBlock>

        <SectionBlock id="nav">
          <div className="section-title-line"><SectionIntro label="03.5 / NAVIGATION" title="Nav" description="A rounded navigation bar with clear, generic tab labels." /></div>
          <div className="component-demo-surface"><div className="dock-demo"><SiteNav variant="inline" ariaLabel="Static navigation example" items={[{ label: 'Tab 1', icon: Circle }, { label: 'Tab 2', icon: Circle }, { label: 'Tab 3', icon: Circle }]} active="Tab 1" interactive={false} showThemeToggle={false} /></div></div>
        </SectionBlock>

        <SectionBlock id="list">
          <div className="section-title-line"><SectionIntro label="03.6 / CONTENT" title="List" description="Chronological entries with dates, titles, supporting copy, and optional tags." /></div>
          <div className="component-demo-surface"><List items={[{ date: 'January 2026', title: 'First entry', description: 'A short description providing context for this item.', tag: 'Category' }, { date: 'December 2025', title: 'Second entry', description: 'Additional details can be displayed alongside each entry.', tag: 'Update' }, { date: 'November 2025', title: 'Third entry', description: 'More context can be included to describe this item.', tag: 'Note' }]} /></div>
        </SectionBlock>

        <SectionBlock id="modal">
          <div className="section-title-line"><SectionIntro label="03.7 / OVERLAY" title="Modal" description="A centered dialog for focused decisions and short tasks." /></div>
          <div className="component-demo-surface sheet-demo"><Button variant="outline" onClick={() => { setModalResult(''); setModalOpen(true); }}>Open modal</Button>{modalResult && <p className="modal-result" role="status">{modalResult}</p>}</div>
          <Modal open={modalOpen} onOpenChange={setModalOpen} title="Confirm changes" description="Review the update before continuing."><p className="muted-copy">Your changes are ready to be saved.</p><div className="sheet-actions"><Button variant="outline" onClick={() => { setModalResult('Changes canceled.'); setModalOpen(false); }}>Cancel</Button><Button onClick={() => { setModalResult('Changes confirmed.'); setModalOpen(false); }}>Confirm</Button></div></Modal>
        </SectionBlock>

        <SectionBlock id="sheet">
          <div className="section-title-line"><SectionIntro label="03.8 / OVERLAY" title="Sheet" description="A slide-over panel for focused details and secondary tasks." /></div>
          <div className="component-demo-surface sheet-demo"><Button variant="outline" onClick={() => setSheetOpen(true)}><PanelRight size={15} /> Open right sheet</Button></div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen} title="Item details" description="View additional information and complete a secondary task without leaving the current page." side="right"><div className="sheet-detail"><Badge variant="secondary">In progress</Badge><p>This panel supports Escape, backdrop, and close-button behavior.</p><Input label="Quick note" placeholder="Add a short note" /></div><div className="sheet-actions"><Button variant="outline" onClick={() => setSheetOpen(false)}>Close panel</Button><Button onClick={() => setSheetOpen(false)}>Done <Check size={14} /></Button></div></Sheet>
        </SectionBlock>

        <SectionBlock id="avatar">
          <div className="section-title-line"><SectionIntro label="03.9 / IDENTITY" title="Avatar" description="An image avatar with a readable initials fallback and size variants." /></div>
          <div className="component-demo-surface"><div className="avatar-row"><Avatar size="sm" initials="AS" alt="Small profile avatar" /><Avatar size="md" initials="AS" alt="Medium profile avatar" className="avatar-ring" /><Avatar size="lg" initials="AS" alt="Large profile avatar" className="avatar-ring" /><Avatar size="sm" src="/aditya-avatar.jpg" alt="Aditya Sharma, small photo avatar" /><Avatar size="md" src="/aditya-avatar.jpg" alt="Aditya Sharma, medium photo avatar" className="avatar-ring" /><Avatar size="lg" src="/aditya-avatar.jpg" alt="Aditya Sharma, large photo avatar" className="avatar-ring" /></div></div>
        </SectionBlock>

        <SectionBlock id="divider">
          <div className="section-title-line"><SectionIntro label="03.10 / SEPARATOR" title="Divider" description="A subtle rule that separates related content." /></div>
          <div className="component-demo-surface"><div className="divider-demo"><span>Section one</span><Divider /><span>Section two</span></div></div>
        </SectionBlock>

        <SectionBlock id="message-bubble">
          <div className="section-title-line"><SectionIntro label="03.11 / MESSAGING" title="Message Bubble" description="A compact message with author and time metadata." /></div>
          <div className="component-demo-surface"><div className="message-thread-demo"><MessageBubble author="Alex Morgan" time="9:41 AM">Could you share the latest update?</MessageBubble><MessageBubble author="You" time="9:42 AM" variant="outgoing">Yes, I’ll send it over shortly.</MessageBubble></div></div>
        </SectionBlock>

        <SectionBlock id="prompt-box">
          <div className="section-title-line"><SectionIntro label="03.12 / INPUT" title="Prompt Box" description="A multiline text entry with a submit action." /></div>
          <div className="component-demo-surface"><div className="prompt-demo"><PromptBox onSubmit={(value) => setPromptResult(`Sent: ${value}`)} />{promptResult && <p className="prompt-result" role="status">{promptResult}</p>}</div></div>
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
