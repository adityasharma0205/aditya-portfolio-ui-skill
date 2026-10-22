import { useState } from 'react';
import { Avatar } from '../src/design-system/components/Avatar.jsx';
import { Badge } from '../src/design-system/components/Tag.jsx';
import { Button } from '../src/design-system/components/Button.jsx';

export const books = [
  { id: 'midnight-library', title: 'The Midnight Library', author: 'Matt Haig', pages: 304, page: 186, shelf: 'Currently reading', cover: 'midnight', year: 2020 },
  { id: 'tomorrow', title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', pages: 401, shelf: 'Read', cover: 'tomorrow', year: 2022 },
  { id: 'remarkably', title: 'Remarkably Bright Creatures', author: 'Shelby Van Pelt', pages: 368, shelf: 'Read', cover: 'remarkably', year: 2022 },
  { id: 'crying', title: 'Crying in H Mart', author: 'Michelle Zauner', pages: 256, shelf: 'Read', cover: 'crying', year: 2021 },
  { id: 'sea', title: 'Sea of Tranquility', author: 'Emily St. John Mandel', pages: 255, shelf: 'Want to read', cover: 'sea', year: 2022 },
  { id: 'anxious', title: 'Anxious People', author: 'Fredrik Backman', pages: 336, shelf: 'Read', cover: 'anxious', year: 2020 },
  { id: 'braiding', title: 'Braiding Sweetgrass', author: 'Robin Wall Kimmerer', pages: 408, shelf: 'Want to read', cover: 'braiding', year: 2013 },
  { id: 'addie', title: 'The Invisible Life of Addie LaRue', author: 'V. E. Schwab', pages: 448, shelf: 'Want to read', cover: 'addie', year: 2020 },
];

export const reviews = [
  { bookId: 'tomorrow', date: 'October 18', rating: 5, text: 'A story about friendship that understands how creative partnerships change over time. I wanted to stay with these characters for another hundred pages.' },
  { bookId: 'crying', date: 'October 12', rating: 4, text: 'Tender, precise, and impossible to rush through. The food writing makes every memory feel close enough to touch.' },
  { bookId: 'remarkably', date: 'October 4', rating: 5, text: 'A gentle surprise of a book. It made an ordinary week feel a little more generous.' },
];

export const shelfOptions = ['All books', 'Currently reading', 'Read', 'Want to read'];

export function useProgress() {
  const [page, setPage] = useState(books[0].page);
  const percent = Math.round((page / books[0].pages) * 100);
  const advance = () => setPage((current) => Math.min(books[0].pages, current + 10));
  return { page, percent, advance, complete: page >= books[0].pages };
}

export function ReaderIdentity({ compact = false }) {
  return (
    <div className={`reader-identity${compact ? ' reader-identity--compact' : ''}`}>
      <Avatar initials="AS" alt="Aditya Sharma" size={compact ? 'sm' : 'md'} />
      <div><strong>Aditya Sharma</strong><span>Reader since 2018 · Brooklyn, NY</span></div>
    </div>
  );
}

export function BookCover({ book, size = '' }) {
  return (
    <div className={`reader-book-cover cover--${book.cover} ${size}`} role="img" aria-label={`Cover artwork for ${book.title} by ${book.author}`}>
      <span className="reader-cover-kicker">{book.year === 2020 ? 'A NOVEL' : 'A STORY'}</span>
      <strong>{book.title}</strong>
      <span className="reader-cover-author">{book.author}</span>
      <i className="reader-cover-art" aria-hidden="true" />
    </div>
  );
}

export function ReadingProgress({ page, percent, className = '' }) {
  return (
    <div className={`reader-progress ${className}`}>
      <div className="reader-progress-label"><span>Reading progress</span><strong>{percent}%</strong></div>
      <progress value={page} max={books[0].pages} aria-label={`Page ${page} of ${books[0].pages}`} />
      <span className="reader-progress-detail">Page {page} of {books[0].pages}</span>
    </div>
  );
}

export function ProgressAction({ progress }) {
  return (
    <Button className="reader-progress-button" variant="secondary" size="sm" onClick={progress.advance} disabled={progress.complete}>
      {progress.complete ? 'Finished' : 'Log 10 pages'}
    </Button>
  );
}

export function ShelfPicker({ value, onChange, className = '' }) {
  return (
    <div className={`reader-shelf-picker ${className}`} role="group" aria-label="Filter books by shelf">
      {shelfOptions.map((shelf) => (
        <button type="button" key={shelf} aria-pressed={value === shelf} className={value === shelf ? 'is-selected' : ''} onClick={() => onChange(shelf)}>
          {shelf}
        </button>
      ))}
    </div>
  );
}

export function YearChallenge({ compact = false }) {
  return (
    <div className={`reader-challenge${compact ? ' reader-challenge--compact' : ''}`}>
      <div className="reader-challenge-heading"><span>2026 reading goal</span><Badge variant="secondary">36 / 40 books</Badge></div>
      <div className="reader-challenge-track" role="img" aria-label="36 of 40 books completed this year"><span style={{ width: '90%' }} /></div>
      <p>Four more books to reach this year’s goal.</p>
    </div>
  );
}

export function StarRating({ value }) {
  return <span className="reader-star-rating" aria-label={`${value} out of 5 stars`}>{'★'.repeat(value)}<span>{'★'.repeat(5 - value)}</span></span>;
}

export function ReviewEntry({ review, compact = false }) {
  const book = books.find(({ id }) => id === review.bookId);
  return (
    <article className={`reader-review${compact ? ' reader-review--compact' : ''}`}>
      <BookCover book={book} size="reader-book-cover--thumb" />
      <div className="reader-review-copy">
        <div className="reader-review-meta"><strong>{book.title}</strong><span>{review.date}</span></div>
        <StarRating value={review.rating} />
        <p>“{review.text}”</p>
      </div>
    </article>
  );
}

export function ShelfList({ selected, onSelect, className = '' }) {
  const shelves = [
    { name: 'Currently reading', count: 1 },
    { name: 'Read', count: 23 },
    { name: 'Want to read', count: 18 },
  ];
  return (
    <div className={`reader-shelf-list ${className}`}>
      {shelves.map(({ name, count }) => (
        <button key={name} type="button" className={selected === name ? 'is-selected' : ''} aria-pressed={selected === name} onClick={() => onSelect(name)}>
          <span>{name}</span><span>{count}</span>
        </button>
      ))}
    </div>
  );
}

export function BookTitle({ book, className = '' }) {
  return <div className={`reader-book-title ${className}`}><strong>{book.title}</strong><span>{book.author}</span></div>;
}
