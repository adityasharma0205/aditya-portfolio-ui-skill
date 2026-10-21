import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CodeBlock({ title = 'skill.md', code = '', className = '' }) {
  const [copied, setCopied] = useState(false);
  const lines = String(code).replace(/\r\n/g, '\n').split('\n');
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className={`code-block ${className}`} aria-label={`${title} code`}>
      <header className="code-block-header"><span className="code-block-title">{title}</span><button className="code-block-copy" type="button" onClick={copyCode} aria-label={copied ? 'Copied code' : 'Copy code'} title={copied ? 'Copied' : 'Copy code'}>{copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}<span>{copied ? 'Copied' : 'Copy'}</span></button></header>
      <pre className="code-block-content"><code>{lines.map((line, index) => <span className="code-block-line" key={index}><span className="code-block-line-number" aria-hidden="true">{index + 1}</span><span>{line || ' '}</span></span>)}</code></pre>
    </section>
  );
}
