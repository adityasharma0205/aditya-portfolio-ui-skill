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
