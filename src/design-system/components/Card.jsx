export function Card({ className = '', children, ...props }) { return <article className={`ui-card ${className}`} {...props}>{children}</article>; }
export function CardHeader({ className = '', children }) { return <header className={`ui-card-header ${className}`}>{children}</header>; }
export function CardTitle({ className = '', children }) { return <h3 className={`ui-card-title ${className}`}>{children}</h3>; }
export function CardDescription({ className = '', children }) { return <p className={`ui-card-description ${className}`}>{children}</p>; }
export function CardContent({ className = '', children }) { return <div className={`ui-card-content ${className}`}>{children}</div>; }
export function CardFooter({ className = '', children }) { return <footer className={`ui-card-footer ${className}`}>{children}</footer>; }
