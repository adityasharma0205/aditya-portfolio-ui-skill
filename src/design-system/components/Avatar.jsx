import { useEffect, useState } from 'react';

export function Avatar({ src, alt = 'Profile avatar', initials = 'AS', size = 'md', className = '' }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const showImage = Boolean(src) && !failed;
  return (
    <span className={`ui-avatar avatar--${size} ${className}`} role="img" aria-label={alt}>
      {showImage ? <img src={src} alt="" onError={() => setFailed(true)} /> : <span aria-hidden="true">{initials}</span>}
    </span>
  );
}
