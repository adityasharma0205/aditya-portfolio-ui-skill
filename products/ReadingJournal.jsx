import { useState } from 'react';
import { BookOpen, CalendarDays } from 'lucide-react';
import {
  BookCover,
  BookTitle,
  ProgressAction,
  ReaderIdentity,
  ReadingProgress,
  ReviewEntry,
  ShelfList,
  useProgress,
  books,
  reviews,
} from './ReaderProfileShared.jsx';
import './reader-profiles.css';

export const readingJournalDescription = 'A personal reading journal led by the reader, the book in progress, and the reflections that stay with them.';

export default function ReadingJournal() {
  const progress = useProgress();
  const [selectedShelf, setSelectedShelf] = useState('Read');
  const shelfBooks = books.filter((book) => book.shelf === selectedShelf);
  return (
    <main className="reader-product reader-journal" aria-label="Reading Journal layout">
      <div className="reader-product-inner">
        <header className="journal-header">
          <div><span className="reader-eyebrow">Aditya’s reading journal</span><h1>A life in books</h1></div>
          <ReaderIdentity />
        </header>

        <div className="journal-lead">
          <section className="journal-current" aria-label="Currently reading">
            <span className="reader-eyebrow"><BookOpen size={14} /> Currently reading</span>
            <div className="journal-current-book">
              <BookCover book={books[0]} />
              <div className="journal-current-copy">
                <BookTitle book={books[0]} />
                <p className="reader-book-context">A quiet story about second chances, and the lives we make from the choices we have.</p>
                <ReadingProgress page={progress.page} percent={progress.percent} />
                <ProgressAction progress={progress} />
              </div>
            </div>
          </section>
          <aside className="journal-note-column">
            <div className="journal-reflection">
              <span className="reader-eyebrow">A note from this week</span>
              <blockquote>“Some books arrive exactly when you need a little room to imagine another way.”</blockquote>
              <span className="reader-muted">On finding possibility in the margins</span>
            </div>
            <div className="journal-goal">
              <CalendarDays size={16} aria-hidden="true" />
              <div><strong>36 books this year</strong><span>Four left in my 40-book challenge</span></div>
            </div>
          </aside>
        </div>

        <section className="journal-shelves" aria-labelledby="journal-shelves-title">
          <div className="reader-section-heading"><div><span className="reader-eyebrow">Collected over time</span><h2 id="journal-shelves-title">A few shelves</h2></div><span className="reader-muted">42 books</span></div>
          <ShelfList selected={selectedShelf} onSelect={setSelectedShelf} />
          <div className="journal-shelf-preview" aria-live="polite">
            <strong>{selectedShelf}</strong>
            <span>{shelfBooks.slice(0, 3).map(({ title }) => title).join('  ·  ') || 'No books on this shelf yet.'}</span>
          </div>
        </section>

        <section className="journal-reviews" aria-labelledby="journal-reviews-title">
          <div className="reader-section-heading"><div><span className="reader-eyebrow">What stayed with me</span><h2 id="journal-reviews-title">Recent reviews</h2></div><span className="reader-muted">This month</span></div>
          <div className="journal-review-list">{reviews.slice(0, 2).map((review) => <ReviewEntry key={review.bookId} review={review} compact />)}</div>
        </section>
      </div>
    </main>
  );
}
