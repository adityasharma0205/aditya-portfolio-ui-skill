import { useId } from 'react';

export function Input({ label, hint, error, id, className = '', ...props }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const noteId = `${inputId}-note`;
  return (
    <label className={`input-field ${className}`} htmlFor={inputId}>
      <span className="input-label">{label}</span>
      <input id={inputId} className={`ui-input${error ? ' is-invalid' : ''}`} aria-invalid={Boolean(error)} aria-describedby={hint || error ? noteId : undefined} {...props} />
      {(hint || error) && <span className={`input-note${error ? ' input-note--error' : ''}`} id={noteId}>{error || hint}</span>}
    </label>
  );
}
