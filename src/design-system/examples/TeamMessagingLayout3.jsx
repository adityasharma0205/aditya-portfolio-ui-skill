import { useEffect, useRef, useState } from 'react';
import { Hash, MessageCircle, MessagesSquare, X } from 'lucide-react';
import { Avatar } from '../components/Avatar.jsx';
import { Button } from '../components/Button.jsx';
import { MessageBubble } from '../components/MessageBubble.jsx';
import { PromptBox } from '../components/PromptBox.jsx';
import { Badge } from '../components/Tag.jsx';

const startingChannels = [
  {
    id: 'general', name: 'general', group: 'Product team', unread: 0,
    conversations: [
      {
        id: 'onboarding', title: 'Onboarding review', subtitle: 'Maya Chen and 3 others', initials: 'MC', sender: 'Maya Chen', time: '9:38 AM', unread: 2,
        messages: [
          { id: 'o1', author: 'Maya Chen', initials: 'MC', time: '9:12 AM', text: 'I’ve pulled together the interview themes for onboarding. The biggest gap is what people should do after creating a workspace.' },
          { id: 'o2', author: 'Leo Martin', initials: 'LM', time: '9:22 AM', text: 'The event data points in the same direction. Most people pause before inviting their first teammate.' },
          { id: 'o3', author: 'Maya Chen', initials: 'MC', time: '9:38 AM', text: 'Could we make the invitation step feel more like a natural next action than a separate setup task?' },
        ],
      },
      {
        id: 'interviews', title: 'Interview notes', subtitle: 'Priya Shah and 2 others', initials: 'PS', sender: 'Priya Shah', time: '9:26 AM', unread: 1,
        messages: [
          { id: 'i1', author: 'Priya Shah', initials: 'PS', time: '9:04 AM', text: 'I’ve added the latest interview summaries. Three people mentioned that the first-run checklist made the product easier to explore.' },
          { id: 'i2', author: 'Jordan Lee', initials: 'JL', time: '9:26 AM', text: 'That’s useful context. I’ll bring the checklist into the design review.' },
        ],
      },
      {
        id: 'weekly', title: 'Weekly planning', subtitle: 'Jordan Lee and 4 others', initials: 'JL', sender: 'Jordan Lee', time: 'Yesterday', unread: 0,
        messages: [
          { id: 'w1', author: 'Jordan Lee', initials: 'JL', time: 'Yesterday', text: 'Please add your priorities before the planning sync so we can leave with clear owners.' },
          { id: 'w2', author: 'Maya Chen', initials: 'MC', time: 'Yesterday', text: 'Added mine — research summary, onboarding review, and the follow-up interview plan.' },
        ],
      },
    ],
  },
  {
    id: 'design', name: 'design-crit', group: 'Product team', unread: 3,
    conversations: [
      {
        id: 'settings', title: 'Settings flow', subtitle: 'Priya Shah and 2 others', initials: 'PS', sender: 'Priya Shah', time: '10:11 AM', unread: 3,
        messages: [
          { id: 's1', author: 'Priya Shah', initials: 'PS', time: '10:04 AM', text: 'The updated settings flow is ready for critique. I focused on clearer groups and a more useful empty state.' },
          { id: 's2', author: 'Maya Chen', initials: 'MC', time: '10:11 AM', text: 'The hierarchy is clearer now. Can we check how the longer labels behave on a narrow screen?' },
        ],
      },
      {
        id: 'patterns', title: 'Component patterns', subtitle: 'Leo Martin and 3 others', initials: 'LM', sender: 'Leo Martin', time: 'Yesterday', unread: 0,
        messages: [
          { id: 'p1', author: 'Leo Martin', initials: 'LM', time: 'Yesterday', text: 'I’ve collected the repeated form patterns in one place. Let me know if a case is missing.' },
          { id: 'p2', author: 'Priya Shah', initials: 'PS', time: 'Yesterday', text: 'The validation examples are covered. I’ll add the loading state to the set.' },
        ],
      },
    ],
  },
  {
    id: 'launch', name: 'launch-planning', group: 'Engineering', unread: 4,
    conversations: [
      {
        id: 'checklist', title: 'Release checklist', subtitle: 'Leo Martin and 5 others', initials: 'LM', sender: 'Leo Martin', time: 'Yesterday', unread: 4,
        messages: [
          { id: 'c1', author: 'Leo Martin', initials: 'LM', time: 'Yesterday', text: 'The checklist is current. QA and help content are the last open items before the release review.' },
          { id: 'c2', author: 'Jordan Lee', initials: 'JL', time: 'Yesterday', text: 'I’ll take the help content review and post an update here.' },
        ],
      },
    ],
  },
];

export default function TeamMessagingLayout3() {
  const [channels, setChannels] = useState(startingChannels);
  const [selectedChannelId, setSelectedChannelId] = useState('general');
  const [selectedConversationId, setSelectedConversationId] = useState('onboarding');
  const [mobilePanel, setMobilePanel] = useState('thread');
  const endRef = useRef(null);
  const channel = channels.find(({ id }) => id === selectedChannelId) ?? channels[0];
  const conversation = channel.conversations.find(({ id }) => id === selectedConversationId) ?? channel.conversations[0];
  const channelGroups = [...new Set(channels.map(({ group }) => group))].map((group) => ({
    name: group,
    channels: channels.filter((item) => item.group === group),
  }));

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [selectedChannelId, selectedConversationId, conversation.messages.length]);

  const selectChannel = (nextChannel) => {
    setSelectedChannelId(nextChannel.id);
    setSelectedConversationId(nextChannel.conversations[0]?.id ?? '');
    setMobilePanel('thread');
    setChannels((current) => current.map((item) => item.id === nextChannel.id
      ? { ...item, unread: 0, conversations: item.conversations.map((thread, index) => index === 0 ? { ...thread, unread: 0 } : thread) }
      : item));
  };

  const selectConversation = (thread) => {
    setSelectedConversationId(thread.id);
    setMobilePanel('thread');
    setChannels((current) => current.map((item) => item.id === selectedChannelId
      ? { ...item, conversations: item.conversations.map((entry) => entry.id === thread.id ? { ...entry, unread: 0 } : entry) }
      : item));
  };

  const sendMessage = (text) => {
    const time = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date());
    const message = { id: `sent-${Date.now()}`, author: 'You', initials: 'YO', time, text };
    setChannels((current) => current.map((item) => item.id === selectedChannelId
      ? {
          ...item,
          conversations: item.conversations.map((thread) => thread.id === selectedConversationId
            ? { ...thread, sender: 'You', initials: 'YO', time: 'Now', unread: 0, messages: [...thread.messages, message] }
            : thread),
        }
      : item));
  };

  return (
    <div className={`messaging-layout-split${mobilePanel === 'channels' ? ' is-channels-open' : mobilePanel === 'conversations' ? ' is-conversations-open' : ''}`}>
      <aside className="messaging-split-rail" aria-label="Workspace navigation">
        <a className="messaging-split-mark" href="#layout3-thread" aria-label="Northstar workspace">N</a>
        <a className="messaging-split-rail-link is-active" href="#layout3-channels" aria-label="Channels" aria-current="page"><Hash size={18} aria-hidden="true" /></a>
        <a className="messaging-split-rail-link" href="#layout3-conversations" aria-label="Conversations"><MessagesSquare size={18} aria-hidden="true" /></a>
        <span className="messaging-split-rail-spacer" />
        <Avatar initials="AS" alt="Your profile" size="sm" />
      </aside>

      <aside className="messaging-split-channels" id="layout3-channels" aria-label="Workspace channels">
        <header className="messaging-split-workspace">
          <span>Workspace</span>
          <strong>Northstar Studio</strong>
          <Button className="messaging-split-mobile-close" variant="ghost" size="icon" aria-label="Close channels panel" onClick={() => setMobilePanel('thread')}><X size={17} /></Button>
        </header>
        <div className="messaging-split-channel-scroll">
          {channelGroups.map(({ name, channels: items }) => (
            <section className="messaging-channel-group" key={name} aria-label={name}>
              <h3>{name}</h3>
              <ul>
                {items.map((item) => {
                  const active = item.id === selectedChannelId;
                  return (
                    <li key={item.id}>
                      <button className={`messaging-channel-button${active ? ' is-active' : ''}`} type="button" aria-pressed={active} aria-label={`# ${item.name}${item.unread ? `, ${item.unread} unread messages` : ''}`} onClick={() => selectChannel(item)}>
                        <Hash size={15} aria-hidden="true" />
                        <span className="messaging-channel-name">{item.name}</span>
                        {item.unread > 0 && <span className="messaging-unread-count" aria-label={`${item.unread} unread`}>{item.unread}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </aside>

      <aside className="messaging-split-conversations" id="layout3-conversations" aria-label={`Recent conversations in ${channel.name}`}>
        <header className="messaging-split-list-heading">
          <div><span>#{channel.name}</span><h2>Conversations</h2></div>
          <Button className="messaging-split-mobile-close" variant="ghost" size="icon" aria-label="Close conversations panel" onClick={() => setMobilePanel('thread')}><X size={17} /></Button>
        </header>
        <div className="messaging-split-thread-list">
          {channel.conversations.map((thread) => {
            const active = thread.id === conversation.id;
            return (
              <button className={`messaging-split-thread-item${active ? ' is-active' : ''}`} key={thread.id} type="button" aria-pressed={active} onClick={() => selectConversation(thread)}>
                <Avatar initials={thread.initials} alt={`${thread.sender}'s avatar`} size="sm" />
                <span className="messaging-split-thread-copy">
                  <span className="messaging-split-thread-top"><strong>{thread.title}</strong><time>{thread.time}</time></span>
                  <span className="messaging-split-thread-subtitle">{thread.subtitle}</span>
                  <span className="messaging-split-thread-preview">{thread.messages.at(-1)?.text ?? 'No messages yet'}</span>
                </span>
                {thread.unread > 0 && <span className="messaging-split-thread-unread" aria-label={`${thread.unread} unread messages`}>{thread.unread}</span>}
              </button>
            );
          })}
        </div>
      </aside>

      <section className="messaging-split-thread" id="layout3-thread" aria-label={`${conversation.title} conversation`}>
        <header className="messaging-split-header">
          <div className="messaging-split-mobile-controls">
            <Button variant="outline" size="sm" aria-label="Show channels" aria-expanded={mobilePanel === 'channels'} aria-controls="layout3-channels" onClick={() => setMobilePanel('channels')}><Hash size={14} aria-hidden="true" />Channels</Button>
            <Button variant="outline" size="sm" aria-label="Show conversations" aria-expanded={mobilePanel === 'conversations'} aria-controls="layout3-conversations" onClick={() => setMobilePanel('conversations')}><MessagesSquare size={14} aria-hidden="true" />Threads</Button>
          </div>
          <div className="messaging-split-thread-title">
            <Avatar initials={conversation.initials} alt={`${conversation.sender}'s avatar`} size="sm" />
            <div><h1>{conversation.title}</h1><p>{conversation.subtitle} · #{channel.name}</p></div>
          </div>
          <Badge variant="outline">Conversation</Badge>
        </header>

        <div className="messaging-split-history" role="log" aria-label={`Messages in ${conversation.title}`} aria-live="polite" aria-relevant="additions text">
          <p className="messaging-split-date">Today</p>
          {conversation.messages.length ? conversation.messages.map((message) => {
            const ownMessage = message.author === 'You';
            return (
              <div className={`messaging-split-message${ownMessage ? ' is-own' : ''}`} key={message.id}>
                <Avatar initials={message.initials} alt={`${message.author}'s avatar`} size="sm" />
                <MessageBubble author={message.author} time={message.time} variant={ownMessage ? 'outgoing' : 'incoming'}>{message.text}</MessageBubble>
              </div>
            );
          }) : (
            <div className="messaging-split-empty" role="status"><MessageCircle size={22} aria-hidden="true" /><p>No messages in this conversation yet.</p></div>
          )}
          <div ref={endRef} aria-hidden="true" />
        </div>

        <footer className="messaging-split-composer">
          <PromptBox label={`Reply in ${conversation.title}`} placeholder="Write a reply…" onSubmit={sendMessage} />
        </footer>
      </section>
    </div>
  );
}
