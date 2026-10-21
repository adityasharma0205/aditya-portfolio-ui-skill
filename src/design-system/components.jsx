import { useEffect, useId, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  Component,
  Check,
  Copy,
  LayoutDashboard,
  Moon,
  Sun,
  X,
} from 'lucide-react';

export const buttonVariants = {
  default: 'button--default',
  destructive: 'button--destructive',
  outline: 'button--outline',
  secondary: 'button--secondary',
  ghost: 'button--ghost',
  link: 'button--link',
};

export function Button({ variant = 'default', size = 'default', className = '', children, ...props }) {
  return <button className={`ui-button ${buttonVariants[variant] ?? buttonVariants.default} button--${size} ${className}`} {...props}>{children}</button>;
}

export function TextInput({ label, hint, error, id, className = '', ...props }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const noteId = `${inputId}-note`;
  return (
    <label className={`input-field ${className}`} htmlFor={inputId}>
      <span className="input-label">{label}</span>
      <input
        id={inputId}
        className={`ui-input${error ? ' is-invalid' : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={hint || error ? noteId : undefined}
        {...props}
      />
      {(hint || error) && <span className={`input-note${error ? ' input-note--error' : ''}`} id={noteId}>{error || hint}</span>}
    </label>
  );
}

export function Badge({ variant = 'default', className = '', children, ...props }) {
  return <span className={`ui-badge badge--${variant} ${className}`} {...props}>{children}</span>;
}

export function Avatar({ src, alt = 'Profile avatar', initials = 'AS', size = 'md', className = '' }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  return (
    <span className={`ui-avatar avatar--${size} ${className}`} role="img" aria-label={alt}>
      {showImage ? <img src={src} alt="" onError={() => setFailed(true)} /> : <span aria-hidden="true">{initials}</span>}
    </span>
  );
}

export function Card({ className = '', children, ...props }) {
  return <article className={`ui-card ${className}`} {...props}>{children}</article>;
}

export function CardHeader({ className = '', children }) { return <header className={`ui-card-header ${className}`}>{children}</header>; }
export function CardTitle({ className = '', children }) { return <h3 className={`ui-card-title ${className}`}>{children}</h3>; }
export function CardDescription({ className = '', children }) { return <p className={`ui-card-description ${className}`}>{children}</p>; }
export function CardContent({ className = '', children }) { return <div className={`ui-card-content ${className}`}>{children}</div>; }
export function CardFooter({ className = '', children }) { return <footer className={`ui-card-footer ${className}`}>{children}</footer>; }

export function Separator({ orientation = 'horizontal', className = '' }) {
  return <div className={`ui-separator separator--${orientation} ${className}`} role="separator" aria-orientation={orientation} />;
}

export function Tooltip({ label, children }) {
  const id = useId();
  return <span className="tooltip-wrap" aria-describedby={id}>{children}<span className="tooltip-content" role="tooltip" id={id}>{label}</span></span>;
}

export function Accordion({ items, className = '' }) {
  return (
    <div className={`ui-accordion ${className}`}>
      {items.map((item) => (
        <details className="accordion-item" key={item.title}>
          <summary>{item.title}<ChevronDown size={16} aria-hidden="true" /></summary>
          <div className="accordion-copy">{item.content}</div>
        </details>
      ))}
    </div>
  );
}

export function Collapsible({ title, children, defaultOpen = false }) {
  return <details className="ui-collapsible" open={defaultOpen}><summary>{title}<ChevronDown size={15} aria-hidden="true" /></summary><div>{children}</div></details>;
}

export function Sheet({ open, onOpenChange, side = 'right', title, description, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={`ui-sheet sheet--${side}`}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => { event.preventDefault(); onOpenChange(false); }}
      onClose={() => onOpenChange(false)}
      onClick={(event) => { if (event.target === event.currentTarget) onOpenChange(false); }}
    >
      <div className="sheet-inner">
        <button className="sheet-close" type="button" onClick={() => onOpenChange(false)} aria-label="Close panel"><X size={17} /></button>
        <div className="sheet-heading"><p className="mono-kicker">Panel / details</p><h2 id={titleId}>{title}</h2>{description && <p id={descriptionId} className="muted-copy">{description}</p>}</div>
        <div className="sheet-body">{children}</div>
      </div>
    </dialog>
  );
}

export function ThemeToggle({ mode, onToggle }) {
  const isDark = mode === 'dark';
  return <Button variant="ghost" size="icon" onClick={onToggle} aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}>{isDark ? <Sun size={17} /> : <Moon size={17} />}</Button>;
}

export function SiteNav({ variant = 'inline', mode = 'dark', onToggleTheme = () => {}, active = 'Design System', onNavigate }) {
  const links = [
    { label: 'Design System', icon: LayoutDashboard, href: '#overview' },
    { label: 'Code Skill', icon: Code2, href: '#code-skill' },
    { label: 'Examples', icon: Component, href: '#examples' },
  ];
  return (
    <nav className={`site-dock dock--${variant}`} aria-label="Portfolio navigation">
      {links.map(({ label, icon: Icon, href }) => (
        <Tooltip key={label} label={label}>
          <a className={`dock-item${active === label ? ' is-active' : ''}`} href={href} aria-label={label} title={label} aria-current={active === label ? 'page' : undefined} onClick={onNavigate ? (event) => { event.preventDefault(); onNavigate(label); } : undefined}>
            <Icon size={17} aria-hidden="true" /><span className="dock-label">{label}</span>
          </a>
        </Tooltip>
      ))}
      <Separator orientation="vertical" />
      <Tooltip label="Theme"><span className="dock-item dock-theme-item"><ThemeToggle mode={mode} onToggle={onToggleTheme} /></span></Tooltip>
    </nav>
  );
}

export function FloatingMenu({ mode, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const closeOutside = (event) => { if (ref.current && !ref.current.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);
  return (
    <div className="floating-nav" ref={ref}>
      {open && <div className="floating-nav-panel"><SiteNav variant="inline" mode={mode} onToggleTheme={onToggleTheme} /></div>}
      <Button variant="default" size="icon" className="floating-menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
        {open ? <X size={19} /> : <span className="menu-equal">＝</span>}
      </Button>
    </div>
  );
}

export function ProjectCard({ title, category, period, description, variant = 'stacked', className = '' }) {
  return (
    <Card className={`project-card project-card--${variant} ${className}`}>
      <div className="project-visual" aria-hidden="true"><span className="visual-orbit" /><span className="visual-glyph">{title.slice(0, 1)}</span><span className="visual-stamp">Case / 0{title.length % 9 + 1}</span></div>
      <CardContent className="project-card-content">
        <div className="project-card-heading"><div><CardTitle>{title}</CardTitle><p className="project-period">{period}</p></div><a className="project-arrow" href="#components" aria-label={`View ${title} pattern`}><ArrowUpRight size={16} /></a></div>
        <div className="project-badges"><Badge variant="outline">{category}</Badge><Badge variant="secondary">Selected work</Badge></div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export function ProjectList({ compact = false }) {
  const projects = [
    { title: 'Tequity', category: 'AI · Fintech', period: '2025 — Present', description: 'Deal intelligence and investor workflows for research-heavy decisions.' },
    { title: 'Self-Publish.ai', category: 'Publishing', period: '2024 — 2026', description: 'A creator workflow spanning writing, production, storefronts, and distribution.' },
    { title: 'Fandemic', category: 'Sports · Community', period: '2026', description: 'Fan communities, live match rooms, predictions, and creator tools.' },
  ];
  return <div className={`project-grid${compact ? ' project-grid--compact' : ''}`}>{projects.map((project) => <ProjectCard key={project.title} {...project} />)}</div>;
}

export function Timeline({ items = [] }) {
  return <ol className="portfolio-timeline">{items.map((item) => <li key={`${item.title}-${item.date}`}><span className="timeline-mark" aria-hidden="true" /><div><p className="timeline-date">{item.date}</p><h3>{item.title}</h3><p className="muted-copy">{item.description}</p>{item.tag && <Badge variant="outline">{item.tag}</Badge>}</div></li>)}</ol>;
}

export function ThemeSurface({ mode = 'dark', onToggleTheme = () => {}, children }) {
  return <div className={`portfolio-surface theme-${mode}`}>{children}<ThemeToggle mode={mode} onToggle={onToggleTheme} /></div>;
}

export function CodeBlock({ title = 'skill.md', code = '', className = '' }) {
  const [copied, setCopied] = useState(false);
  const lines = String(code).replace(/\r\n/g, '\n').split('\n');

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className={`code-block ${className}`} aria-label={`${title} code`}>
      <header className="code-block-header">
        <span className="code-block-title">{title}</span>
        <button className="code-block-copy" type="button" onClick={copyCode} aria-label={copied ? 'Copied code' : 'Copy code'} title={copied ? 'Copied' : 'Copy code'}>
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </header>
      <pre className="code-block-content"><code>{lines.map((line, index) => <span className="code-block-line" key={index}><span className="code-block-line-number" aria-hidden="true">{index + 1}</span><span>{line || ' '}</span></span>)}</code></pre>
    </section>
  );
}
