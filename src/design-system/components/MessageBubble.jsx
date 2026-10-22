export function MessageBubble({ author, time, children, variant = 'incoming' }) {
  return (
    <article className={`message-bubble message-bubble--${variant}`}>
      <div className="message-bubble-meta"><strong>{author}</strong><time>{time}</time></div>
      <p>{children}</p>
    </article>
  );
}
