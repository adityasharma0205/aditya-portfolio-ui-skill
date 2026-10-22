import { useEffect, useRef, useState } from 'react';
import { Hash, MessageCircle, Search, X } from 'lucide-react';
import { Avatar } from '../components/Avatar.jsx';
import { Button } from '../components/Button.jsx';
import { MessageBubble } from '../components/MessageBubble.jsx';
import { PromptBox } from '../components/PromptBox.jsx';
import { Badge } from '../components/Tag.jsx';

const initialChannels = [
  {
    id: 'general', name: 'general', group: 'Product team', unread: 0, members: 18,
    description: 'Team updates and everyday coordination',
    messages: [
      { id: 'g1', author: 'Maya Chen', initials: 'MC', time: '9:12 AM', text: 'Morning everyone — the customer interview notes are ready. I pulled out the top themes for today’s review.' },
      { id: 'g2', author: 'Leo Martin', initials: 'LM', time: '9:18 AM', text: 'Thanks, Maya. I’ll bring the onboarding flow into the discussion so we can connect the feedback to next steps.' },
      { id: 'g3', author: 'Priya Shah', initials: 'PS', time: '9:26 AM', text: 'I’ve added a short summary to the planning doc. The biggest opportunity is making the first project setup feel more guided.' },
      { id: 'g4', author: 'Jordan Lee', initials: 'JL', time: '9:34 AM', text: 'That matches what I heard too. Let’s leave a few minutes at the end to agree on an owner for the follow-up.' },
    ],
  },
  {
    id: 'design', name: 'design-crit', group: 'Product team', unread: 2, members: 7,
    description: 'Share work and give thoughtful feedback',
    messages: [
      { id: 'd1', author: 'Priya Shah', initials: 'PS', time: '10:04 AM', text: 'Sharing the updated settings flow before critique. I focused on clearer section labels and a calmer empty state.' },
      { id: 'd2', author: 'Maya Chen', initials: 'MC', time: '10:11 AM', text: 'The hierarchy reads much better. Could we check the narrow layout once the desktop pass is settled?' },
    ],
  },
  {
    id: 'launch', name: 'launch-planning', group: 'Engineering team', unread: 4, members: 12,
    description: 'Coordinate the next release',
    messages: [
      { id: 'l1', author: 'Leo Martin', initials: 'LM', time: 'Yesterday', text: 'Release checklist is up to date. The remaining items are the help content review and final QA.' },
      { id: 'l2', author: 'Jordan Lee', initials: 'JL', time: 'Yesterday', text: 'I can take the help content pass this afternoon and post a summary here.' },
    ],
  },
  {
    id: 'random', name: 'watercooler', group: 'Community', unread: 0, members: 21,
    description: 'A little room for everything else',
    messages: [
      { id: 'r1', author: 'Maya Chen', initials: 'MC', time: 'Yesterday', text: 'Small recommendation for the week: take a proper lunch break away from your screen if you can.' },
    ],
  },
];

const workspaceLinks = [
  { label: 'Channels', icon: Hash, target: 'messaging-channels' },
  { label: 'Conversation', icon: MessageCircle, target: 'messaging-thread' },
];

export default function TeamMessagingLayout() {
  const [channels, setChannels] = useState(initialChannels);
  const [selectedChannelId, setSelectedChannelId] = useState('general');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const threadEndRef = useRef(null);
  const selectedChannel = channels.find(({ id }) => id === selectedChannelId) ?? channels[0];
  const groupedChannels = [...new Set(channels.map(({ group }) => group))].map((group) => ({
    name: group,
    channels: channels.filter((channel) => channel.group === group),
  }));
  const visibleMessages = selectedChannel.messages.filter((message) =>
    message.text.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ block: 'end' });
  }, [selectedChannelId, selectedChannel.messages.length]);

  const selectChannel = (channelId) => {
    setSelectedChannelId(channelId);
    setSearchOpen(false);
    setSearchTerm('');
    setChannels((current) => current.map((channel) => channel.id === channelId ? { ...channel, unread: 0 } : channel));
  };

  const sendMessage = (text) => {
    const time = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date());
    const message = { id: `sent-${Date.now()}`, author: 'You', initials: 'YO', time, text };
    setChannels((current) => current.map((channel) => channel.id === selectedChannelId
      ? { ...channel, messages: [...channel.messages, message] }
      : channel));
  };

  return (
    <div className="messaging-layout">
      <aside className="messaging-rail" aria-label="Workspace">
        <a className="messaging-workspace-mark" href="#messaging-thread" aria-label="Northstar workspace home">N</a>
        <div className="messaging-rail-divider" />
        <nav className="messaging-rail-nav" aria-label="Workspace navigation">
          {workspaceLinks.map(({ label, icon: Icon, target }, index) => (
            <a
              className={`messaging-rail-link${index === 0 ? ' is-active' : ''}`}
              key={target}
              href={`#${target}`}
              aria-label={label}
              aria-current={index === 0 ? 'page' : undefined}
              title={label}
            >
              <Icon size={19} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <span className="messaging-rail-spacer" />
        <Avatar initials="AS" alt="Your profile" size="sm" className="messaging-self-avatar" />
      </aside>

      <aside className="messaging-sidebar" id="messaging-channels" aria-label="Workspace channels">
        <div className="messaging-workspace-heading">
          <div className="messaging-workspace-copy">
            <span className="messaging-eyebrow">Workspace</span>
            <h2>Northstar Studio</h2>
          </div>
        </div>
        <div className="messaging-channel-scroll">
          {groupedChannels.map(({ name, channels: teamChannels }) => (
            <section className="messaging-channel-group" key={name} aria-label={name}>
              <h3>{name}</h3>
              <ul>
                {teamChannels.map((channel) => {
                  const active = channel.id === selectedChannelId;
                  return (
                    <li key={channel.id}>
                      <button
                        className={`messaging-channel-button${active ? ' is-active' : ''}`}
                        type="button"
                        aria-pressed={active}
                        aria-label={`# ${channel.name}${channel.unread ? `, ${channel.unread} unread messages` : ''}`}
                        onClick={() => selectChannel(channel.id)}
                      >
                        <Hash size={15} aria-hidden="true" />
                        <span className="messaging-channel-name">{channel.name}</span>
                        {channel.unread > 0 && <span className="messaging-unread-count" aria-label={`${channel.unread} unread`}>{channel.unread}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
        <div className="messaging-sidebar-footer">
          <span className="messaging-online-indicator" aria-hidden="true" />
          <span>4 teammates online</span>
        </div>
      </aside>

      <section className="messaging-conversation" id="messaging-thread" aria-label={`# ${selectedChannel.name} conversation`}>
        <header className="messaging-channel-header">
          <div className="messaging-channel-heading">
            <div className="messaging-channel-title-line">
              <Hash size={19} aria-hidden="true" />
              <h1>{selectedChannel.name}</h1>
              <Badge variant="outline">{selectedChannel.members} members</Badge>
            </div>
            <p>{selectedChannel.description}</p>
          </div>
          <div className="messaging-channel-actions">
            {searchOpen && (
              <label className="messaging-search-field">
                <span className="messaging-visually-hidden">Search messages in #{selectedChannel.name}</span>
                <input
                  autoFocus
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search messages"
                />
              </label>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="messaging-icon-button"
              aria-label={searchOpen ? 'Close message search' : 'Search messages'}
              aria-expanded={searchOpen}
              onClick={() => { setSearchOpen((open) => !open); setSearchTerm(''); }}
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </Button>
          </div>
        </header>

        <div className="messaging-message-list" role="log" aria-label={`Messages in ${selectedChannel.name}`} aria-live="polite" aria-relevant="additions text">
          {visibleMessages.length > 0 ? visibleMessages.map((message) => {
            const ownMessage = message.author === 'You';
            return (
              <div className={`messaging-message-row${ownMessage ? ' is-own' : ''}`} key={message.id}>
                <Avatar initials={message.initials} alt={`${message.author}'s avatar`} size="sm" className="messaging-message-avatar" />
                <MessageBubble author={message.author} time={message.time} variant={ownMessage ? 'outgoing' : 'incoming'}>
                  {message.text}
                </MessageBubble>
              </div>
            );
          }) : (
            <div className="messaging-empty-state" role="status">
              <Search size={20} aria-hidden="true" />
              <p>{searchTerm ? 'No messages match your search.' : 'No messages here yet. Start the conversation.'}</p>
            </div>
          )}
          <div ref={threadEndRef} aria-hidden="true" />
        </div>

        <footer className="messaging-composer-area">
          <PromptBox label={`Message #${selectedChannel.name}`} placeholder={`Write a message to #${selectedChannel.name}`} onSubmit={sendMessage} />
          <p className="messaging-composer-hint">Press the send button to share with this channel</p>
        </footer>
      </section>
    </div>
  );
}
