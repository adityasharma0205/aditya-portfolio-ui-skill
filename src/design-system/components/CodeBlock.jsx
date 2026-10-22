import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

function InlineMarkdown({ children }) {
  const parts = String(children).split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}><InlineMarkdown>{part.slice(2, -2)}</InlineMarkdown></strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (/^(https?:|mailto:|#|\/)/i.test(href)) return <a key={index} href={href}>{label}</a>;
    }
    return <span key={index}>{part}</span>;
  });
}

function isTableDivider(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function tableCells(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
}

function MarkdownPreview({ source }) {
  const normalized = String(source).replace(/\r\n/g, '\n');
  const markdown = normalized.replace(/^---\n[\s\S]*?\n---\n*/, '');
  const lines = markdown.split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index += 1; continue; }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      const TagName = `h${heading[1].length}`;
      blocks.push(<TagName key={`heading-${index}`}><InlineMarkdown>{heading[2]}</InlineMarkdown></TagName>);
      index += 1;
      continue;
    }

    if (/^```|^~~~/.test(line)) {
      const marker = line.slice(0, 3);
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith(marker)) codeLines.push(lines[index++]);
      index += 1;
      blocks.push(<pre key={`code-${index}`}><code>{codeLines.join('\n')}</code></pre>);
      continue;
    }

    if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const headers = tableCells(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].includes('|') && lines[index].trim()) rows.push(tableCells(lines[index++]));
      blocks.push(<div className="markdown-table-wrap" key={`table-${index}`}><table><thead><tr>{headers.map((cell, cellIndex) => <th key={cellIndex}><InlineMarkdown>{cell}</InlineMarkdown></th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{headers.map((_, cellIndex) => <td key={cellIndex}><InlineMarkdown>{row[cellIndex] ?? ''}</InlineMarkdown></td>)}</tr>)}</tbody></table></div>);
      continue;
    }

    if (/^\s*([-*_])\s*\1\s*\1\s*$/.test(line)) {
      blocks.push(<hr key={`rule-${index}`} />);
      index += 1;
      continue;
    }

    const listItem = line.match(/^\s*(?:([-+*])|(\d+)[.)])\s+(.+)$/);
    if (listItem) {
      const ordered = Boolean(listItem[2]);
      const items = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*(?:([-+*])|(\d+)[.)])\s+(.+)$/);
        if (!item || Boolean(item[2]) !== ordered) break;
        items.push(<li key={`item-${index}`}><InlineMarkdown>{item[3]}</InlineMarkdown></li>);
        index += 1;
      }
      const ListTag = ordered ? 'ol' : 'ul';
      blocks.push(<ListTag key={`list-${index}`}>{items}</ListTag>);
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) quote.push(lines[index++].replace(/^>\s?/, ''));
      blocks.push(<blockquote key={`quote-${index}`}><InlineMarkdown>{quote.join(' ')}</InlineMarkdown></blockquote>);
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{1,6})\s|^```|^~~~|^>\s?|^\s*(?:[-+*]|\d+[.)])\s+/.test(lines[index]) && !(lines[index].includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1]))) paragraph.push(lines[index++].trim());
    blocks.push(<p key={`paragraph-${index}`}><InlineMarkdown>{paragraph.join(' ')}</InlineMarkdown></p>);
  }

  return <article className="markdown-preview">{blocks}</article>;
}

export function CodeBlock({ title = 'skill.md', code = '', className = '', markdownPreview = false }) {
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState(markdownPreview ? 'preview' : 'source');
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
    <section className={`code-block ${className}`} aria-label={`${title} ${view === 'preview' ? 'Markdown preview' : 'source'}`}>
      <header className="code-block-header"><span className="code-block-title">{title}</span><div className="code-block-actions">{markdownPreview && <div className="code-block-view-toggle" role="group" aria-label="Markdown view">{['preview', 'source'].map((option) => <button key={option} type="button" aria-pressed={view === option} onClick={() => setView(option)}>{option === 'preview' ? 'Preview' : 'Source'}</button>)}</div>}<button className="code-block-copy" type="button" onClick={copyCode} aria-label={copied ? 'Copied raw Markdown source' : 'Copy raw Markdown source'} title={copied ? 'Copied' : 'Copies the raw Markdown source'}>{copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}<span>{copied ? 'Copied' : 'Copy source'}</span></button></div></header>
      {view === 'preview' && markdownPreview ? <MarkdownPreview source={code} /> : <pre className="code-block-content"><code>{lines.map((line, index) => <span className="code-block-line" key={index}><span className="code-block-line-number" aria-hidden="true">{index + 1}</span><span>{line || ' '}</span></span>)}</code></pre>}
    </section>
  );
}
