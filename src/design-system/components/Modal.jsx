import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

export function Modal({ open, onOpenChange, title, description, children }) {
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
      className="ui-modal"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => { event.preventDefault(); onOpenChange(false); }}
      onClose={() => onOpenChange(false)}
      onClick={(event) => { if (event.target === event.currentTarget) onOpenChange(false); }}
    >
      <div className="modal-inner">
        <button className="sheet-close" type="button" onClick={() => onOpenChange(false)} aria-label="Close modal"><X size={17} /></button>
        <div className="modal-heading"><h2 id={titleId}>{title}</h2>{description && <p id={descriptionId} className="muted-copy">{description}</p>}</div>
        <div className="modal-body">{children}</div>
      </div>
    </dialog>
  );
}
