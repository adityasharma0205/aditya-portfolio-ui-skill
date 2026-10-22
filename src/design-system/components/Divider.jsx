export function Divider({ className = '' }) {
  return <div className={`ui-divider${className ? ` ${className}` : ''}`} role="separator" />;
}
