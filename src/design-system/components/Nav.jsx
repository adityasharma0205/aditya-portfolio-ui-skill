import { Code2, Component, LayoutDashboard } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle.jsx';

export function SiteNav({ variant = 'inline', mode = 'dark', onToggleTheme = () => {}, active = 'Design System', onNavigate, items, ariaLabel = 'Portfolio navigation', showThemeToggle = true }) {
  const links = items ?? [
    { label: 'Design System', icon: LayoutDashboard, href: '#overview' },
    { label: 'Code Skill', icon: Code2, href: '#code-skill' },
    { label: 'Examples', icon: Component, href: '#examples' },
  ];
  return (
    <nav className={`site-dock dock--${variant}`} aria-label={ariaLabel}>
      {links.map(({ label, icon: Icon, href }) => (
        <a key={label} className={`dock-item${active === label ? ' is-active' : ''}`} href={href} aria-label={label} aria-current={active === label ? 'page' : undefined} onClick={onNavigate ? (event) => { event.preventDefault(); onNavigate(label); } : undefined}>
          {Icon && <Icon size={17} aria-hidden="true" />}<span className="dock-label">{label}</span>
        </a>
      ))}
      {showThemeToggle && <><span className="ui-separator separator--vertical" role="separator" aria-orientation="vertical" /><span className="dock-item dock-theme-item"><ThemeToggle mode={mode} onToggle={onToggleTheme} /></span></>}
    </nav>
  );
}
