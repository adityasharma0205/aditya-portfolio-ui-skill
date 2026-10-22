import { useEffect, useRef, useState } from 'react';
import { Hash, MessageCircle, PanelLeft, X } from 'lucide-react';
import { Avatar } from '../components/Avatar.jsx';
import { Button } from '../components/Button.jsx';
import { MessageBubble } from '../components/MessageBubble.jsx';
import { PromptBox } from '../components/PromptBox.jsx';
import { Badge } from '../components/Tag.jsx';

const startingChannels = [
  {
    id: 'general', name: 'general', group: 'Product team', unread: 0, members: 18,
    topic: 'Daily coordination, quick questions, and team updates.',
    messages: [
      { id: 'g1', author: 'Maya Chen', initials: 'MC', time: '9:12 AM', text: 'Morning! I’ve gathered the customer interview notes and highlighted the themes that came up most often.' },
      { id: 'g2', author: 'Maya Chen', initials: 'MC', time: '9:15 AM', text: 'The clearest opportunity is helping people understand what to do after they create their first workspace.' },
      { id: 'g3', author: 'Leo Martin', initials: 'LM', time: '9:22 AM', text: 'That fits with the support requests from last week. I can bring the onboarding events into the review.' },
      { id: 'g4', author: 'Priya Shah', initials: 'PS', time: '9:31 AM', text: 'I’ll share two ways to make the next step more visible. We can compare them against the interview clips.' },
      { id: 'g5', author: 'Jordan Lee', initials: 'JL', time: '9:38 AM', text: 'Great. I’ve reserved the last ten minutes of today’s sync for a decision and an owner.' },
    ],
  },
  {
    id: 'design', name: 'design-crit', group: 'Product team', unread: 3, members: 7,
    topic: 'Share work in progress and leave focused feedback.',
    messages: [
      { id: 'd1', author: 'Priya Shah', initials: 'PS', time: '10:04 AM', text: 'The revised preferences screen is ready for a quick review. I simplified the grouping and clarified the save state.' },
      { id: 'd2', author: 'Maya Chen', initials: 'MC', time: '10:16 AM', text: 'This scans more easily. I’d also check how the longer labels wrap on a smaller screen.' },
      { id: 'd3', author: 'Priya Shah', initials: 'PS', time: '10:19 AM', text: 'Good call — I’ll add that to the next pass.' },
    ],
  },
  {
    id: 'launch', name: 'launch-planning', group: 'Engineering', unread: 5, members: 12,
    topic: 'Coordinate milestones and release readiness.',
    messages: [
      { id: 'l1', author: 'Leo Martin', initials: 'LM', time: 'Yesterday', text: 'The release checklist is current. QA and help content are the two remaining items.' },
      { id: 'l2', author: 'Jordan Lee', initials: 'JL', time: 'Yesterday', text: 'I can take the help content review and post the updated checklist here.' },
    ],
  },
  {
    id: 'help', name: 'help-desk', group: 'Engineering', unread: 0, members: 9,
    topic: 'Ask a question and get help from the team.',
    messages: [],
  },
];

export default function TeamMessagingLayout2() {
  const [channels, setChannels] = useState(startingChannels);
  const [selectedChannelId, setSelectedChannelId] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messageEndRef = useRef(null);
  const selectedChannel = channels.find(({ id }) => id === selectedChannelId) ?? channels[0];
  const channelGroups = [...new Set(channels.map(({ group }) => group))].map((group) => ({
    name: group,
    channels: channels.filter((channel) => channel.group === group),
  }));

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ block: 'end' });
  }, [selectedChannelId, selectedChannel.messages.length]);

  const selectChannel = (channelId) => {
    setSelectedChannelId(channelId);
    setSidebarOpen(false);
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
    <div className={`messaging-conversation-first${sidebarOpen ? ' is-sidebar-open' : ''}`}>
      <aside className="messaging-first-sidebar" id="layout2-channels" aria-label="Workspace and channels">
        <header className="messaging-first-workspace">
          <div className="messaging-first-workspace-mark" aria-hidden="true">N</div>
          <div><span>Workspace</span><h2>Northstar Studio</h2></div>
          <Button className="messaging-first-mobile-close" variant="ghost" size="icon" aria-label="Close channels panel" onClick={() => setSidebarOpen(false)}><X size={17} /></Button>
        </header>
        <nav className="messaging-first-nav" aria-label="Workspace navigation">
          <a href="#layout2-channels" aria-current="page"><Hash size={16} aria-hidden="true" />Channels</a>
          <a href="#layout2-thread"><MessageCircle size={16} aria-hidden="true" />Conversation</a>
        </nav>
        <div className="messaging-first-channel-list">
          {channelGroups.map(({ name, channels: groupChannels }) => (
            <section className="messaging-channel-group" key={name} aria-label={name}>
              <h3>{name}</h3>
              <ul>
                {groupChannels.map((channel) => {
                  const selected = channel.id === selectedChannelId;
                  return (
                    <li key={channel.id}>
                      <button
                        type="button"
                        className={`messaging-channel-button${selected ? ' is-active' : ''}`}
                        aria-pressed={selected}
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
        <div className="messaging-first-sidebar-footer"><span className="messaging-online-indicator" aria-hidden="true" />4 teammates online</div>
      </aside>

      <section className="messaging-first-thread" id="layout2-thread" aria-label={`# ${selectedChannel.name} conversation`}>
        <header className="messaging-first-header">
          <div className="messaging-first-channel-title">
            <Hash size={20} aria-hidden="true" />
            <div>
              <h1>{selectedChannel.name}</h1>
              <p>{selectedChannel.topic}</p>
            </div>
          </div>
          <div className="messaging-first-header-meta">
            <Badge variant="secondary">{selectedChannel.members} members</Badge>
            <Button className="messaging-first-mobile-channels" variant="outline" size="sm" aria-expanded={sidebarOpen} aria-controls="layout2-channels" onClick={() => setSidebarOpen((open) => !open)}>
              <PanelLeft size={15} aria-hidden="true" />Channels
            </Button>
          </div>
        </header>

        <div className="messaging-first-history" role="log" aria-label={`Messages in ${selectedChannel.name}`} aria-live="polite" aria-relevant="additions text">
          <p className="messaging-first-date">Today</p>
          {selectedChannel.messages.length ? selectedChannel.messages.map((message) => {
            const ownMessage = message.author === 'You';
            return (
              <div className={`messaging-first-message${ownMessage ? ' is-own' : ''}`} key={message.id}>
                <Avatar initials={message.initials} alt={`${message.author}'s avatar`} size="sm" />
                <MessageBubble author={message.author} time={message.time} variant={ownMessage ? 'outgoing' : 'incoming'}>
                  {message.text}
                </MessageBubble>
              </div>
            );
          }) : (
            <div className="messaging-first-empty" role="status">
              <MessageCircle size={22} aria-hidden="true" />
              <strong>Start the conversation</strong>
              <p>There are no messages in #{selectedChannel.name} yet. Send the first one below.</p>
            </div>
          )}
          <div ref={messageEndRef} aria-hidden="true" />
        </div>

        <footer className="messaging-first-composer">
          <PromptBox label={`Message #${selectedChannel.name}`} placeholder={`Message #${selectedChannel.name}`} onSubmit={sendMessage} />
          <p>Enter to add a new line · Use the send button to post</p>
        </footer>
      </section>
    </div>
  );
}
