export function Badge({ variant = 'default', className = '', children, ...props }) {
  return <span className={`ui-badge badge--${variant} ${className}`} {...props}>{children}</span>;
}

export const Tag = Badge;
