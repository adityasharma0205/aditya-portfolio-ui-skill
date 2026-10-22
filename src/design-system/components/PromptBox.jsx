import { useId, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './Button.jsx';

export function PromptBox({ label = 'Message', placeholder = 'Write a message…', onSubmit }) {
  const [value, setValue] = useState('');
  const inputId = useId();
  const submit = (event) => {
    event.preventDefault();
    const prompt = value.trim();
    if (!prompt) return;
    onSubmit?.(prompt);
    setValue('');
  };

  return (
    <form className="prompt-box" onSubmit={submit}>
      <label className="prompt-box-label" htmlFor={inputId}>{label}</label>
      <div className="prompt-box-controls">
        <textarea id={inputId} value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} rows={2} />
        <Button type="submit" size="icon" aria-label="Send message" disabled={!value.trim()}><ArrowUp size={15} /></Button>
      </div>
    </form>
  );
}
