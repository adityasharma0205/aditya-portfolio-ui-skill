import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle.jsx';
import { themeStyle } from '../tokens.js';
import TeamMessagingLayout from './TeamMessagingLayout.jsx';

export default function MessagingFullViewPage() {
  const [mode, setMode] = useState('dark');

  return (
    <main className="messaging-tab-page" data-mode={mode} style={themeStyle(mode)}>
      <header className="messaging-tab-header">
        <a className="messaging-tab-back" href={window.location.pathname}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to examples
        </a>
        <div className="messaging-tab-title">
          <h1>Team messaging workspace</h1>
          <span>Layout 1</span>
        </div>
        <ThemeToggle mode={mode} onToggle={() => setMode((current) => current === 'dark' ? 'light' : 'dark')} />
      </header>
      <div className="messaging-tab-workspace">
        <TeamMessagingLayout />
      </div>
    </main>
  );
}
