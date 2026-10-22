import { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import {
  BookCover,
  BookTitle,
  ProgressAction,
  ReaderIdentity,
  ReadingProgress,
  ReviewEntry,
  ShelfPicker,
  YearChallenge,
  useProgress,
  books,
  reviews,
} from './ReaderProfileShared.jsx';
import './reader-profiles.css';

export const digitalLibraryDescription = 'A collection-first library for browsing book covers and moving between thoughtfully kept shelves.';

export default function DigitalLibrary() {
  const [activeShelf, setActiveShelf] = useState('All books');
  const progress = useProgress();
  const filteredBooks = activeShelf === 'All books' ? books : books.filter(({ shelf }) => shelf === activeShelf);
  const currentReview = reviews[0];
  return (
    <main className="reader-product reader-library" aria-label="Digital Library layout">
      <div className="reader-product-inner">
        <header className="library-header">
          <div><span className="reader-eyebrow">Aditya Sharma’s collection</span><h1>My library</h1></div>
          <ReaderIdentity compact />
        </header>

        <div className="library-overview">
          <div className="library-stats" aria-label="Reading statistics">
            <div><strong>23</strong><span>read this year</span></div>
            <div><strong>7,481</strong><span>pages read</span></div>
            <div><strong>4.2</strong><span>average rating</span></div>
          </div>
          <YearChallenge compact />
        </div>

        <section className="library-collection" aria-labelledby="library-collection-title">
          <div className="reader-section-heading library-collection-heading">
            <div><span className="reader-eyebrow">42 books · 3 shelves</span><h2 id="library-collection-title">Browse your shelves</h2></div>
            <span className="reader-muted" aria-live="polite">{filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}</span>
          </div>
          <ShelfPicker value={activeShelf} onChange={setActiveShelf} />
          <div className="library-book-grid" aria-live="polite">
            {filteredBooks.map((book) => (
              <article className="library-book" key={book.id}>
                <BookCover book={book} />
                <BookTitle book={book} />
              </article>
            ))}
            {filteredBooks.length === 0 && <p className="reader-empty-state">No books on this shelf yet.</p>}
          </div>
        </section>

        <div className="library-bottom-row">
          <section className="library-current" aria-label="Currently reading">
            <BookCover book={books[0]} size="reader-book-cover--thumb" />
            <div className="library-current-info"><span className="reader-eyebrow"><BookOpen size={13} /> Currently reading</span><BookTitle book={books[0]} /><ReadingProgress page={progress.page} percent={progress.percent} /></div>
            <ProgressAction progress={progress} />
          </section>
          <section className="library-latest-review" aria-labelledby="library-review-title">
            <div className="reader-section-heading"><div><span className="reader-eyebrow">Latest review</span><h2 id="library-review-title">On {books.find(({ id }) => id === currentReview.bookId).title}</h2></div><ArrowRight size={15} aria-hidden="true" /></div>
            <ReviewEntry review={currentReview} compact />
          </section>
        </div>
      </div>
    </main>
  );
}
