import { Badge } from './Tag.jsx';

export function List({ items = [] }) {
  return <ol className="portfolio-timeline">{items.map((item) => <li key={`${item.title}-${item.date}`}><span className="timeline-mark" aria-hidden="true" /><div><p className="timeline-date">{item.date}</p><h3>{item.title}</h3><p className="muted-copy">{item.description}</p>{item.tag && <Badge variant="outline">{item.tag}</Badge>}</div></li>)}</ol>;
}
