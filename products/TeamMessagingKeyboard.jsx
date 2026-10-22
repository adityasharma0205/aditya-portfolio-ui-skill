import { useEffect, useRef, useState } from 'react';
import { Command, Hash, Search, X } from 'lucide-react';
import { Button } from '../src/design-system/components/Button.jsx';
import { Avatar } from '../src/design-system/components/Avatar.jsx';
import { ConversationHeading, MessageComposer, MessageHistory, WorkspaceMark, messagingChannels, useMessagingWorkspace } from './TeamMessagingShared.jsx';

export const teamKeyboardDescription = 'A keyboard-ready workspace uses a horizontal channel map and quick-switch commands to keep the thread close at hand.';

export default function TeamMessagingKeyboard({ isActive = true }) {
  const workspace = useMessagingWorkspace();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [query, setQuery] = useState('');
  const switcherInput = useRef(null);
  const switcherButton = useRef(null);
  const wasSwitcherOpen = useRef(false);
  const composer = useRef(null);

  useEffect(() => {
    if (switcherOpen) switcherInput.current?.focus();
    else if (wasSwitcherOpen.current) switcherButton.current?.focus();
    wasSwitcherOpen.current = switcherOpen;
  }, [switcherOpen]);

  useEffect(() => {
    if (!isActive && switcherOpen) setSwitcherOpen(false);
  }, [isActive, switcherOpen]);

  useEffect(() => {
    if (!isActive) return undefined;
    function handleShortcut(event) {
      const target = event.target;
      const typing = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setQuery('');
        setSwitcherOpen(true);
      } else if (event.key === 'Tab' && switcherOpen) {
        const focusable = [...document.querySelectorAll('.team-channel-switcher button, .team-channel-switcher input')];
        if (focusable.length) {
          const first = focusable[0];
          const last = focusable.at(-1);
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      } else if (event.key === 'Escape' && switcherOpen) {
        setSwitcherOpen(false);
      } else if (event.key === '/' && !typing && !switcherOpen) {
        event.preventDefault();
        composer.current?.querySelector('textarea')?.focus();
      } else if (!typing && !switcherOpen && event.altKey && ['ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        const currentIndex = messagingChannels.findIndex(({ id }) => id === workspace.channelId);
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        const nextIndex = (currentIndex + direction + messagingChannels.length) % messagingChannels.length;
        workspace.selectChannel(messagingChannels[nextIndex].id);
      }
    }
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [isActive, switcherOpen, workspace.channelId, workspace.selectChannel]);

  const matchingChannels = messagingChannels.filter(({ name, group }) => `${name} ${group}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="team-message-product team-message-keyboard" aria-label="Keyboard-driven messaging workspace">
    <header className="team-keyboard-workspacebar">
      <div className="team-keyboard-identity"><WorkspaceMark /><div><span>Workspace</span><strong>Northstar Studio</strong></div></div>
      <div className="team-keyboard-commandbar"><span><Command size={14} /> Quick switch</span><div><kbd>Ctrl K</kbd><span>channels</span><kbd>/</kbd><span>message</span></div><Button ref={switcherButton} type="button" variant="outline" size="sm" onClick={() => { setQuery(''); setSwitcherOpen(true); }}><Search size={14} /> Jump to</Button></div>
      <div className="team-keyboard-account"><Avatar initials="AS" alt="Aditya Sharma" size="sm" /><span><strong>Aditya Sharma</strong><small>aditya@northstar.studio</small></span></div>
    </header>
    <nav className="team-keyboard-channels" aria-label="Channels">
      <span className="team-keyboard-channels-label">Channels</span>
      {messagingChannels.map((channel) => <button type="button" key={channel.id} aria-current={workspace.channelId === channel.id ? 'page' : undefined} className={workspace.channelId === channel.id ? 'is-active' : ''} onClick={() => workspace.selectChannel(channel.id)}>
        <Hash size={14} /><span>{channel.name}</span>{channel.unread > 0 && <small aria-label={`${channel.unread} unread`}>{channel.unread}</small>}
      </button>)}
      <span className="team-keyboard-channel-hint">Alt + ↑ / ↓ to move</span>
    </nav>
    <nav className="team-keyboard-conversations" aria-label={`Chats in #${workspace.channel.name}`}>
      <span className="team-keyboard-conversations-label">Chats</span>
      <div className="team-keyboard-conversation-list">
        {workspace.channel.conversations.map((chat) => <button type="button" key={chat.id} aria-current={workspace.conversationId === chat.id ? 'true' : undefined} className={workspace.conversationId === chat.id ? 'is-active' : ''} onClick={() => workspace.selectConversation(chat.id)}>
          <span>{chat.title}</span><time>{chat.time}</time>{chat.unread > 0 && <small aria-label={`${chat.unread} unread`}>{chat.unread}</small>}
        </button>)}
      </div>
    </nav>
    <section className="team-message-thread-panel team-keyboard-thread" aria-label={`Conversation in ${workspace.channel.name}`}>
      <header className="team-message-topline"><ConversationHeading channel={workspace.channel} conversation={workspace.conversation} /></header>
      <MessageHistory messages={workspace.messages} />
      <div ref={composer} className="team-keyboard-composer"><MessageComposer channel={workspace.channel} onSubmit={workspace.sendMessage} helper="Type / to focus · Send with the button" /></div>
    </section>
    {switcherOpen && <div className="team-channel-switcher-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSwitcherOpen(false); }}>
      <section className="team-channel-switcher" role="dialog" aria-modal="true" aria-labelledby="team-channel-switcher-title">
        <header><div><Hash size={16} /><h2 id="team-channel-switcher-title">Jump to a channel</h2></div><Button type="button" variant="ghost" size="icon" aria-label="Close channel switcher" onClick={() => setSwitcherOpen(false)}><X size={16} /></Button></header>
        <label className="team-switcher-search"><Search size={15} /><span className="team-message-visually-hidden">Filter channels</span><input ref={switcherInput} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search channels…" /></label>
        <div className="team-switcher-results" role="listbox" aria-label="Available channels">
          {matchingChannels.length ? matchingChannels.map((channel) => <button type="button" role="option" aria-selected={workspace.channelId === channel.id} key={channel.id} onClick={() => { workspace.selectChannel(channel.id); setSwitcherOpen(false); }}><Hash size={14} /><span>{channel.name}</span><small>{channel.group}</small></button>) : <p>No channels match that search.</p>}
        </div>
        <p className="team-switcher-hint">Esc to close · Alt + ↑ / ↓ to move between channels</p>
      </section>
    </div>}
  </main>;
}
