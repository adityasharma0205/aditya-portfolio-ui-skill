import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from './components/Tag.jsx';
import TeamMessagingThreadFirst, { teamThreadFirstDescription } from '../../products/TeamMessagingThreadFirst.jsx';
import TeamMessagingInbox, { teamInboxDescription } from '../../products/TeamMessagingInbox.jsx';
import TeamMessagingKeyboard, { teamKeyboardDescription } from '../../products/TeamMessagingKeyboard.jsx';
import ReadingJournal, { readingJournalDescription } from '../../products/ReadingJournal.jsx';
import DigitalLibrary, { digitalLibraryDescription } from '../../products/DigitalLibrary.jsx';
import ReaderActivity, { readerActivityDescription } from '../../products/ReaderActivity.jsx';

const messagingPreviewStep = 1298;

const productLayouts = [
  {
    id: 'team-messaging',
    product: 'Team messaging app',
    layouts: [
      { number: '01', name: 'Thread-first workspace', description: teamThreadFirstDescription, Component: TeamMessagingThreadFirst },
      { number: '02', name: 'Unified inbox', description: teamInboxDescription, Component: TeamMessagingInbox },
      { number: '03', name: 'Keyboard-driven workspace', description: teamKeyboardDescription, Component: TeamMessagingKeyboard },
    ],
    recommendedLayout: 1,
  },
  {
    id: 'goodreads',
    product: 'Goodreads',
    layouts: [
      { number: '01', name: 'Reading Journal', description: readingJournalDescription, Component: ReadingJournal },
      { number: '02', name: 'Digital Library', description: digitalLibraryDescription, Component: DigitalLibrary },
      { number: '03', name: 'Reader Activity', description: readerActivityDescription, Component: ReaderActivity },
    ],
    recommendedLayout: 0,
  },
];

export default function ProductExamplesPage() {
  const [activeScreens, setActiveScreens] = useState([0, 0]);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  const showLayout = (groupIndex, direction) => {
    const layouts = productLayouts[groupIndex].layouts;
    const nextIndex = (activeScreens[groupIndex] + direction + layouts.length) % layouts.length;
    setActiveScreens((current) => current.map((screen, index) => index === groupIndex ? nextIndex : screen));
  };

  return (
    <main className="ds-content ds-examples-screen">
      <section className="product-examples-page">
        <header className="product-examples-intro">
          <h1>Product examples</h1>
          <p>Exploring how a single design system adapts across different product experiences.</p>
        </header>
        <div className="product-layout-groups">
          {productLayouts.map((group, groupIndex) => {
            const activeIndex = activeScreens[groupIndex];
            const layout = group.layouts[activeIndex];
            return (
            <section className={`product-layout-group product-layout-group--${group.id}`} key={group.id} aria-label={group.product}>
              <header className="product-layout-group-heading">
                <div><h2>{group.product}</h2></div>
              </header>
              <div className="product-screen-carousel">
                <div
                  className="product-screen-viewport"
                  aria-label={`${group.product} product layouts`}
                >
                  <div className="product-screen-track" style={{ '--product-track-offset': `${activeIndex * -(viewportWidth <= (group.id === 'team-messaging' ? 960 : 720) ? viewportWidth - 22 : messagingPreviewStep)}px` }}>
                    {group.layouts.map((layout, layoutIndex) => (
                      <div className="product-screen-preview" key={layout.number}>
                        <div className={`product-screen-frame${layout.Component ? ' product-screen-frame--reader' : ''}`} style={layout.tint ? { '--canvas-tint': layout.tint } : undefined} data-canvas-size="1280 x 832" role="group" aria-label={`${group.product} ${layout.name} layout. ${layout.description}`}>
                          {layout.Component ? <layout.Component isActive={activeIndex === layoutIndex} /> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {activeIndex > 0 && <button className="product-screen-previous" type="button" aria-label={`Show previous ${group.product} layout`} onClick={() => showLayout(groupIndex, -1)}><ChevronLeft size={20} /></button>}
                <button className="product-screen-next" type="button" aria-label={`Show next ${group.product} layout`} onClick={() => showLayout(groupIndex, 1)}><ChevronRight size={20} /></button>
              </div>
              <div className="product-layout-caption" aria-live="polite">
                <div className="product-layout-caption-title"><h3>{layout.name}</h3>{activeIndex === group.recommendedLayout && <Badge className="product-layout-recommended-badge">Recommended</Badge>}</div>
                <p>{layout.description}</p>
              </div>
            </section>
          );})}
        </div>
      </section>
    </main>
  );
}
