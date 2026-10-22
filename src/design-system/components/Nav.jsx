import { Circle, Code2, Component, LayoutDashboard } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle.jsx';

export function SiteNav({ variant = 'inline', mode = 'dark', onToggleTheme = () => {}, active = 'Design System', onNavigate, items, ariaLabel = 'Portfolio navigation', interactive = true, showThemeToggle = true }) {
  const links = items ?? [
    { label: 'Design System', icon: LayoutDashboard, href: '#overview' },
    { label: 'Code Skill', icon: Code2, href: '#code-skill' },
    { label: 'Examples', icon: Component, href: '#examples' },
  ];
  return (
    <nav className={`site-dock dock--${variant}`} aria-label={ariaLabel}>
      {links.map(({ label, icon: Icon, href }) => (
        interactive ? <a key={label} className={`dock-item${active === label ? ' is-active' : ''}`} href={href} aria-label={label} aria-current={active === label ? 'page' : undefined} onClick={onNavigate ? (event) => { event.preventDefault(); onNavigate(label); } : undefined}>
          <Icon size={17} aria-hidden="true" /><span className="dock-label">{label}</span>
        </a> : <span key={label} className={`dock-item dock-item--static${active === label ? ' is-active' : ''}`} aria-current={active === label ? 'page' : undefined}>
          <Icon size={17} aria-hidden="true" /><span className="dock-label">{label}</span>
        </span>
      ))}
      {showThemeToggle && <><span className="ui-separator separator--vertical" role="separator" aria-orientation="vertical" /><span className={`dock-item dock-theme-item${interactive ? '' : ' dock-theme-item--static'}`}>{interactive ? <ThemeToggle mode={mode} onToggle={onToggleTheme} /> : <span className="dock-theme-icon" aria-label="Theme"><Circle size={17} aria-hidden="true" /></span>}</span></>}
    </nav>
  );
}
