/** Composable sidebar primitives following the shadcn/ui sidebar structure. */
export function Sidebar({ label = 'Sidebar', className = '', children, ...props }) {
  return (
    <aside {...props} className={`ui-sidebar ${className}`.trim()} aria-label={label}>
      {children}
    </aside>
  );
}

export function SidebarHeader({ className = '', children, ...props }) {
  return <div {...props} className={`ui-sidebar-header ${className}`.trim()}>{children}</div>;
}

export function SidebarContent({ className = '', children, ...props }) {
  return <nav {...props} className={`ui-sidebar-content ${className}`.trim()} aria-label={props['aria-label'] ?? 'Sidebar navigation'}>{children}</nav>;
}

export function SidebarGroup({ className = '', children, ...props }) {
  return <section {...props} className={`ui-sidebar-group ${className}`.trim()}>{children}</section>;
}

export function SidebarGroupLabel({ className = '', children, ...props }) {
  return <h2 {...props} className={`ui-sidebar-group-label ${className}`.trim()}>{children}</h2>;
}

export function SidebarMenu({ className = '', children, ...props }) {
  return <ul {...props} className={`ui-sidebar-menu ${className}`.trim()}>{children}</ul>;
}

export function SidebarMenuItem({ className = '', children, ...props }) {
  return <li {...props} className={`ui-sidebar-menu-item ${className}`.trim()}>{children}</li>;
}

export function SidebarMenuButton({
  active = false,
  icon: Icon,
  badge,
  href,
  className = '',
  children,
  ...props
}) {
  const classNames = `ui-sidebar-menu-button${active ? ' is-active' : ''} ${className}`.trim();
  const content = <>
    {Icon && <Icon size={16} aria-hidden="true" />}
    <span className="ui-sidebar-menu-label">{children}</span>
    {badge != null && <span className="ui-sidebar-menu-badge">{badge}</span>}
  </>;

  return href
    ? <a {...props} className={classNames} href={href} aria-current={active ? 'page' : undefined}>{content}</a>
    : <button {...props} className={classNames} type="button" aria-current={active ? 'page' : undefined}>{content}</button>;
}

export function SidebarFooter({ className = '', children, ...props }) {
  return <div {...props} className={`ui-sidebar-footer ${className}`.trim()}>{children}</div>;
}

export function SidebarInset({ className = '', children, ...props }) {
  return <div {...props} className={`ui-sidebar-inset ${className}`.trim()}>{children}</div>;
}
