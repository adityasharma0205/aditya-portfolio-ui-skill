import { useState } from 'react';
import { ChevronDown, ChevronRight, Hash } from 'lucide-react';
import { Avatar } from '../src/design-system/components/Avatar.jsx';
import { MessageBubble } from '../src/design-system/components/MessageBubble.jsx';
import { PromptBox } from '../src/design-system/components/PromptBox.jsx';
import { Sidebar, SidebarFooter, SidebarHeader } from '../src/design-system/components/Sidebar.jsx';
import './team-messaging.css';

export const messagingChannels = [
  {
    id: 'general', name: 'general', group: 'Product team', description: 'Team updates, quick questions, and everyday coordination.', unread: 0,
    conversations: [
      { id: 'general-daily', title: 'Daily conversation', sender: 'Aditya Sharma', initials: 'AS', time: '9:12 AM', unread: 0, preview: 'The customer interview notes are ready for today’s review.', messages: [
        { author: 'Aditya Sharma', initials: 'AS', time: '9:12 AM', text: 'Morning everyone — the customer interview notes are ready. I pulled out the top themes for today’s review.' },
        { author: 'Leo Martin', initials: 'LM', time: '9:18 AM', text: 'Thanks, Aditya. I’ll bring the onboarding flow into the discussion so we can connect the feedback to next steps.' },
        { author: 'Priya Shah', initials: 'PS', time: '9:26 AM', text: 'I’ve added a short summary to the planning doc. The biggest opportunity is making the first project setup feel more guided.' },
        { author: 'Jordan Lee', initials: 'JL', time: '9:34 AM', text: 'That matches what I heard too. Let’s leave a few minutes at the end to agree on an owner for the follow-up.' },
      ] },
      { id: 'general-kickoff', title: 'Friday kickoff', sender: 'Jordan Lee', initials: 'JL', time: 'Yesterday', unread: 1, preview: 'I added an agenda for the launch review.', messages: [
        { author: 'Jordan Lee', initials: 'JL', time: 'Yesterday', text: 'I added an agenda for the launch review. Please add any open questions before Friday.' },
        { author: 'Aditya Sharma', initials: 'AS', time: 'Yesterday', text: 'I’ll add the research summary and a short decision section.' },
      ] },
    ],
  },
  {
    id: 'design-crit', name: 'design-crit', group: 'Product team', description: 'Share work in progress and thoughtful feedback.', unread: 2,
    conversations: [
      { id: 'design-review', title: 'Onboarding review', sender: 'Priya Shah', initials: 'PS', time: '10:04 AM', unread: 2, preview: 'Could we make the invitation step feel more natural?', messages: [
        { author: 'Priya Shah', initials: 'PS', time: '10:04 AM', text: 'Could we make the invitation step feel more like a natural next action than a separate setup task?' },
        { author: 'Aditya Sharma', initials: 'AS', time: '10:11 AM', text: 'Yes. I’ll try a version that introduces it after the first workspace action.' },
        { author: 'Leo Martin', initials: 'LM', time: '10:16 AM', text: 'That should make the value clearer. I can review the copy once the flow is ready.' },
      ] },
      { id: 'design-notes', title: 'Research notes', sender: 'Leo Martin', initials: 'LM', time: '9:48 AM', unread: 1, preview: 'Three people asked for a clearer first step.', messages: [
        { author: 'Leo Martin', initials: 'LM', time: '9:48 AM', text: 'Three people asked for a clearer first step. I added the quotes to the research notes.' },
        { author: 'Priya Shah', initials: 'PS', time: '9:53 AM', text: 'Helpful. I’ll use those to frame the next design pass.' },
      ] },
    ],
  },
  {
    id: 'launch-planning', name: 'launch-planning', group: 'Engineering', description: 'Milestones, owners, and launch decisions.', unread: 4,
    conversations: [
      { id: 'launch-checklist', title: 'Launch checklist', sender: 'Leo Martin', initials: 'LM', time: '8:42 AM', unread: 4, preview: 'The release checklist is ready for a final pass.', messages: [
        { author: 'Leo Martin', initials: 'LM', time: '8:42 AM', text: 'The release checklist is ready for a final pass. I’ve marked the items that still need an owner.' },
        { author: 'Jordan Lee', initials: 'JL', time: '8:49 AM', text: 'I can take the documentation review. The remaining handoff looks clear.' },
        { author: 'Aditya Sharma', initials: 'AS', time: '8:56 AM', text: 'I’ll confirm the onboarding screenshots after the copy update lands.' },
      ] },
    ],
  },
  {
    id: 'help-desk', name: 'help-desk', group: 'Engineering', description: 'Questions and support from across the team.', unread: 0,
    conversations: [
      { id: 'access-question', title: 'Workspace access', sender: 'Jordan Lee', initials: 'JL', time: 'Yesterday', unread: 0, preview: 'The new teammates can now join the workspace.', messages: [
        { author: 'Jordan Lee', initials: 'JL', time: 'Yesterday', text: 'The new teammates can now join the workspace. I’ve added the access steps to the team guide.' },
        { author: 'Aditya Sharma', initials: 'AS', time: 'Yesterday', text: 'Thanks for sorting that out. I’ll share the guide with the group.' },
      ] },
    ],
  },
];

export function useMessagingWorkspace() {
  const [channelId, setChannelId] = useState(messagingChannels[0].id);
  const [conversationId, setConversationId] = useState(messagingChannels[0].conversations[0].id);
  const [messageMap, setMessageMap] = useState(() => Object.fromEntries(
    messagingChannels.flatMap((channel) => channel.conversations.map((conversation) => [conversation.id, conversation.messages])),
  ));
  const channel = messagingChannels.find((item) => item.id === channelId) ?? messagingChannels[0];
  const conversation = channel.conversations.find((item) => item.id === conversationId) ?? channel.conversations[0];
  const messages = messageMap[conversation.id] ?? conversation.messages;

  function selectChannel(nextId) {
    const next = messagingChannels.find((item) => item.id === nextId);
    if (!next) return;
    setChannelId(next.id);
    setConversationId(next.conversations[0].id);
  }

  function selectConversation(nextId) {
    if (channel.conversations.some((item) => item.id === nextId)) setConversationId(nextId);
  }

  function sendMessage(text) {
    setMessageMap((current) => ({
      ...current,
      [conversation.id]: [...(current[conversation.id] ?? conversation.messages), { author: 'You', initials: 'AS', time: 'Now', text }],
    }));
  }

  return { channel, channelId, conversation, conversationId, messages, selectChannel, selectConversation, sendMessage };
}

export function WorkspaceMark({ compact = false }) {
  return <div className={`team-message-mark${compact ? ' team-message-mark--compact' : ''}`} aria-hidden="true">N</div>;
}

export function ChannelNavigation({ channelId, conversationId, onSelect, onSelectConversation, showConversations = false, className = '' }) {
  const [expandedChannelId, setExpandedChannelId] = useState(channelId);
  let lastGroup = '';
  return (
    <Sidebar className={`team-message-sidebar ${className}`} label="Workspace and channels">
      <SidebarHeader className="team-message-workspace">
        <WorkspaceMark />
        <div><span>Workspace</span><strong>Northstar Studio</strong></div>
      </SidebarHeader>
      <nav className="team-message-channels" aria-label="Channels">
        {messagingChannels.map((item) => {
          const showGroup = item.group !== lastGroup;
          lastGroup = item.group;
          const expanded = expandedChannelId === item.id;
          return <div className="team-message-channel-wrap" key={item.id}>
            {showGroup && <h2>{item.group}</h2>}
            <div className="team-message-channel-row">
              <button type="button" className={`team-message-channel${channelId === item.id ? ' is-active' : ''}`} aria-current={channelId === item.id ? 'page' : undefined} onClick={() => { onSelect(item.id); if (showConversations) setExpandedChannelId(item.id); }}>
                <Hash size={14} /><span>{item.name}</span>{item.unread > 0 && <span className="team-message-unread" aria-label={`${item.unread} unread messages`}>{item.unread}</span>}
              </button>
              {showConversations && <button type="button" className="team-message-channel-toggle" aria-label={`${expanded ? 'Collapse' : 'Expand'} chats in #${item.name}`} aria-expanded={expanded} onClick={() => setExpandedChannelId(expanded ? null : item.id)}>
                {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
              </button>}
            </div>
            {showConversations && expanded && <div className="team-message-subchannels" role="group" aria-label={`Chats in #${item.name}`}>
              {item.conversations.map((chat) => <button type="button" key={chat.id} className={`team-message-subchannel${channelId === item.id && conversationId === chat.id ? ' is-active' : ''}`} aria-current={channelId === item.id && conversationId === chat.id ? 'true' : undefined} onClick={() => { onSelect(item.id); onSelectConversation(chat.id); }}>
                <span>{chat.title}</span>{chat.unread > 0 && <span className="team-message-subchannel-unread" aria-label={`${chat.unread} unread`}>{chat.unread}</span>}
              </button>)}
            </div>}
          </div>;
        })}
      </nav>
      <SidebarFooter className="team-message-user">
        <Avatar initials="AS" alt="Aditya Sharma" size="sm" />
        <span><strong>Aditya Sharma</strong><small>aditya@northstar.studio</small></span>
      </SidebarFooter>
    </Sidebar>
  );
}

export function MessageHistory({ messages, className = '' }) {
  return <div className={`team-message-history ${className}`} role="log" aria-label="Conversation messages" aria-live="polite">
    {messages.map((message, index) => <div className={`team-message-row${message.author === 'You' ? ' is-own' : ''}`} key={`${message.time}-${index}`}>
      <Avatar initials={message.initials} alt={message.author} size="sm" />
      <MessageBubble author={message.author} time={message.time} variant={message.author === 'You' ? 'outgoing' : 'incoming'}>{message.text}</MessageBubble>
    </div>)}
  </div>;
}

export function MessageComposer({ channel, onSubmit, className = '', helper = 'Use the send button to post' }) {
  return <div className={`team-message-composer ${className}`}>
    <PromptBox label={`Message #${channel.name}`} placeholder={`Write a message to #${channel.name}`} onSubmit={onSubmit} />
    <p>{helper}</p>
  </div>;
}

export function ConversationHeading({ channel, conversation, compact = false }) {
  return <div className={`team-message-heading${compact ? ' team-message-heading--compact' : ''}`}>
    <div><span className="team-message-heading-channel"><Hash size={15} />{channel.name}</span><h1>{conversation.title}</h1><p>{channel.description}</p></div>
    <div className="team-message-heading-meta"><Avatar initials={conversation.initials} alt={conversation.sender} size="sm" /><span>{conversation.sender} and the team</span></div>
  </div>;
}
