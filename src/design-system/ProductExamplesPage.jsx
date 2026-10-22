import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TeamMessagingLayout from './examples/TeamMessagingLayout.jsx';
import TeamMessagingLayout2 from './examples/TeamMessagingLayout2.jsx';
import TeamMessagingLayout3 from './examples/TeamMessagingLayout3.jsx';

const messagingPreviewStep = 1298;

const productLayouts = [
  {
    id: 'team-messaging',
    product: 'Team messaging app',
    layouts: [
      { number: '01', name: 'Workspace', description: 'Channels, a conversation thread, and message composer.', tint: '#dcecff', Component: TeamMessagingLayout },
      { number: '02', name: 'Conversation first', description: 'A focused channel conversation with room for context and replies.', tint: '#e9e2ff', Component: TeamMessagingLayout2 },
      { number: '03', name: 'Split conversation', description: 'Channels, recent discussions, and the active thread in separate regions.', tint: '#d9f1e8', Component: TeamMessagingLayout3 },
    ],
  },
  {
    id: 'goodreads',
    product: 'Goodreads',
    layouts: [
      { number: '04', name: 'Reader profile', description: 'Currently reading, shelves, reading stats or yearly challenge, and recent reviews.', tint: '#f6e4d8' },
      { number: '05', name: 'Bookshelves', description: 'A reader’s organized shelves and book lists.', tint: '#f5e5ed' },
      { number: '06', name: 'Book and review', description: 'A book’s details alongside a reader’s review and rating.', tint: '#f5efcf' },
    ],
  },
];

export default function ProductExamplesPage() {
  const [activeScreens, setActiveScreens] = useState([0, 0]);

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
                  <div className="product-screen-track" style={{ '--product-track-offset': `${activeIndex * -messagingPreviewStep}px` }}>
                    {group.layouts.map((layout, layoutIndex) => (
                      <div className={`product-screen-preview${layout.Component ? ' product-screen-preview--messaging' : ''}`} key={layout.number}>
                        {layout.Component ? (
                          <div className={`product-screen-frame product-screen-frame--messaging product-screen-frame--messaging-${layoutIndex + 1}`} data-canvas-size="1280 x 832">
                            <layout.Component />
                          </div>
                        ) : (
                          <div className="product-screen-frame" style={{ '--canvas-tint': layout.tint }} data-canvas-size="1280 x 832" role="img" aria-label={`${group.product} ${layout.name} screen placeholder, 1280 by 832. ${layout.description}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {activeIndex > 0 && <button className="product-screen-previous" type="button" aria-label={`Show previous ${group.product} layout`} onClick={() => showLayout(groupIndex, -1)}><ChevronLeft size={20} /></button>}
                <button className="product-screen-next" type="button" aria-label={`Show next ${group.product} layout`} onClick={() => showLayout(groupIndex, 1)}><ChevronRight size={20} /></button>
              </div>
              <div className="product-layout-caption" aria-live="polite">
                <h3>Layout {activeIndex + 1}</h3>
                <p>{layout.description}</p>
              </div>
            </section>
          );})}
        </div>
      </section>
    </main>
  );
}
