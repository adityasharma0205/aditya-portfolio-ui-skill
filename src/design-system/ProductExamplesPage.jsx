import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const productLayouts = [
  {
    product: 'Team messaging app',
    context: 'A Slack alternative',
    layouts: [
      { number: '01', name: 'Workspace', description: 'Channels, a conversation thread, and message composer.', tint: '#dcecff' },
      { number: '02', name: 'Thread view', description: 'A focused conversation with replies and a place to respond.', tint: '#e9e2ff' },
      { number: '03', name: 'Direct messages', description: 'One-to-one conversations and message composition.', tint: '#d9f1e8' },
    ],
  },
  {
    product: 'Goodreads',
    context: 'A reader’s book profile and tracking space',
    layouts: [
      { number: '04', name: 'Reader profile', description: 'Currently reading, shelves, reading stats or yearly challenge, and recent reviews.', tint: '#f6e4d8' },
      { number: '05', name: 'Bookshelves', description: 'A reader’s organized shelves and book lists.', tint: '#f5e5ed' },
      { number: '06', name: 'Book and review', description: 'A book’s details alongside a reader’s review and rating.', tint: '#f5efcf' },
    ],
  },
];

export default function ProductExamplesPage() {
  const [activeScreens, setActiveScreens] = useState([0, 0]);
  const carouselRefs = useRef([]);
  const [backButtonOffsets, setBackButtonOffsets] = useState([]);

  useEffect(() => {
    const updateBackButtonOffsets = () => {
      setBackButtonOffsets(carouselRefs.current.map((carousel) => carousel ? 40 - carousel.getBoundingClientRect().left : -80));
    };
    updateBackButtonOffsets();
    window.addEventListener('resize', updateBackButtonOffsets);
    return () => window.removeEventListener('resize', updateBackButtonOffsets);
  }, []);

  return (
    <main className="ds-content ds-examples-screen">
      <section className="product-examples-page">
        <header className="product-examples-intro">
          <h1>Product examples</h1>
          <p>Exploring how a single design system adapts across different product experiences.</p>
        </header>
        <div className="product-layout-groups">
          {productLayouts.map((group, groupIndex) => (
            <section className="product-layout-group" key={group.product} aria-label={group.product}>
              <div className="product-screen-carousel" ref={(node) => { carouselRefs.current[groupIndex] = node; }}>
              <div className="product-screen-viewport" aria-label={`${group.product} screen placeholders`}>
                <div className="product-screen-track" style={{ transform: `translateX(-${activeScreens[groupIndex] * 1298}px)` }}>
                  <div className="product-screen-set">
                    {group.layouts.map((layout, layoutIndex) => (
                      <div className="product-screen-preview" key={layout.number}>
                        <div className="product-screen-frame" style={{ '--canvas-tint': layout.tint }} data-canvas-size="1280 x 832" role="img" aria-label={`${group.product} ${layout.name} screen placeholder, 1280 by 832. ${layout.description}`} />
                        <span className="product-screen-badge">Layout {layoutIndex + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {activeScreens[groupIndex] > 0 && <button className="product-screen-previous" style={{ left: `${backButtonOffsets[groupIndex] ?? -80}px` }} type="button" aria-label={`Show previous ${group.product} screen`} onClick={() => setActiveScreens((current) => current.map((screen, index) => index === groupIndex ? screen - 1 : screen))}><ChevronLeft size={20} /></button>}
              <button className="product-screen-next" type="button" aria-label={`Show next ${group.product} screen`} onClick={() => setActiveScreens((current) => current.map((screen, index) => index === groupIndex ? (screen + 1) % 3 : screen))}><ChevronRight size={20} /></button>
              </div>
              <header className="product-layout-group-heading">
                <div><h2>{group.product}</h2><p>{group.context}</p></div>
              </header>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
