import { useState } from 'react';
import { BookOpen, Clock3 } from 'lucide-react';
import {
  BookCover,
  BookTitle,
  ProgressAction,
  ReaderIdentity,
  ReadingProgress,
  ReviewEntry,
  ShelfList,
  YearChallenge,
  useProgress,
  books,
} from './ReaderProfileShared.jsx';
import './reader-profiles.css';

export const readerActivityDescription = 'A review-led reading log that puts recent opinions and reading history first, with the current book always in view.';

const history = [
  { date: 'October 18', title: 'Finished Tomorrow, and Tomorrow, and Tomorrow', detail: '401 pages · 8 days' },
  { date: 'October 12', title: 'Finished Crying in H Mart', detail: '256 pages · 5 days' },
  { date: 'October 4', title: 'Finished Remarkably Bright Creatures', detail: '368 pages · 9 days' },
];

export default function ReaderActivity() {
  const progress = useProgress();
  const [selectedShelf, setSelectedShelf] = useState('Read');
  const shelfBooks = books.filter((book) => book.shelf === selectedShelf);
  return (
    <main className="reader-product reader-activity" aria-label="Reader Activity layout">
      <div className="reader-product-inner">
        <header className="activity-header">
          <div className="activity-title"><span className="reader-eyebrow">Reading notes · 2026</span><h1>What I’ve been reading</h1><p>Reviews, small discoveries, and the stories I’m carrying along.</p></div>
          <ReaderIdentity />
        </header>

        <div className="activity-columns">
          <section className="activity-reviews" aria-labelledby="activity-reviews-title">
            <div className="reader-section-heading"><div><span className="reader-eyebrow">Recent opinions</span><h2 id="activity-reviews-title">Reviews & reflections</h2></div><span className="reader-muted">3 notes</span></div>
            <div className="activity-review-list">
              <ReviewEntry review={{ bookId: 'tomorrow', date: 'October 18', rating: 5, text: 'A story about friendship that understands how creative partnerships change over time. I wanted to stay with these characters for another hundred pages.' }} />
              <ReviewEntry review={{ bookId: 'crying', date: 'October 12', rating: 4, text: 'Tender, precise, and impossible to rush through. The food writing makes every memory feel close enough to touch.' }} />
              <ReviewEntry review={{ bookId: 'remarkably', date: 'October 4', rating: 5, text: 'A gentle surprise of a book. It made an ordinary week feel a little more generous.' }} />
            </div>
          </section>

          <aside className="activity-context">
            <section className="activity-current" aria-labelledby="activity-current-title">
              <div className="reader-section-heading"><div><span className="reader-eyebrow"><BookOpen size={13} /> In progress</span><h2 id="activity-current-title">Currently reading</h2></div></div>
              <div className="activity-current-book"><BookCover book={books[0]} size="reader-book-cover--small" /><BookTitle book={books[0]} /></div>
              <ReadingProgress page={progress.page} percent={progress.percent} />
              <ProgressAction progress={progress} />
            </section>

            <section className="activity-history" aria-labelledby="activity-history-title">
              <div className="reader-section-heading"><div><span className="reader-eyebrow"><Clock3 size={13} /> Reading history</span><h2 id="activity-history-title">Recently finished</h2></div></div>
              <ol>{history.map(({ date, title, detail }) => <li key={title}><time>{date}</time><strong>{title}</strong><span>{detail}</span></li>)}</ol>
            </section>

            <section className="activity-shelves" aria-labelledby="activity-shelves-title">
              <div className="reader-section-heading"><div><span className="reader-eyebrow">Your collection</span><h2 id="activity-shelves-title">Shelves</h2></div></div>
              <ShelfList selected={selectedShelf} onSelect={setSelectedShelf} />
              <p className="activity-shelf-note" aria-live="polite">{shelfBooks.length} featured {selectedShelf.toLowerCase()} {shelfBooks.length === 1 ? 'book' : 'books'} · {shelfBooks.slice(0, 2).map(({ title }) => title).join(' and ')}</p>
            </section>

            <YearChallenge compact />
          </aside>
        </div>
      </div>
    </main>
  );
}
