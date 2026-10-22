import { Avatar } from '../src/design-system/components/Avatar.jsx';
import { ChannelNavigation, ConversationHeading, MessageComposer, MessageHistory, useMessagingWorkspace } from './TeamMessagingShared.jsx';

export const teamInboxDescription = 'An attention-led inbox pairs channel context with a scannable conversation queue and the selected thread.';

export default function TeamMessagingInbox() {
  const workspace = useMessagingWorkspace();
  return <main className="team-message-product team-message-inbox-layout" aria-label="Unified messaging inbox">
    <ChannelNavigation channelId={workspace.channelId} onSelect={workspace.selectChannel} />
    <section className="team-message-queue" aria-label={`Conversations in ${workspace.channel.name}`}>
      <header className="team-message-queue-heading"><h1>{workspace.channel.name.replace(/^./, (letter) => letter.toUpperCase())}</h1><p>{workspace.channel.conversations.length} conversations</p></header>
      <div className="team-message-queue-list" role="list" aria-label="Conversation list">
        {workspace.channel.conversations.map((conversation) => <button type="button" role="listitem" key={conversation.id} className={`team-message-queue-item${workspace.conversationId === conversation.id ? ' is-active' : ''}`} aria-current={workspace.conversationId === conversation.id ? 'true' : undefined} onClick={() => workspace.selectConversation(conversation.id)}>
          <Avatar initials={conversation.initials} alt={conversation.sender} size="sm" />
          <span className="team-message-queue-copy"><span className="team-message-queue-meta"><strong>{conversation.title}</strong><time>{conversation.time}</time></span><span className="team-message-queue-sender">{conversation.sender} · #{workspace.channel.name}</span><span className="team-message-queue-preview">{conversation.preview}</span></span>
          {conversation.unread > 0 && <span className="team-message-queue-unread" aria-label={`${conversation.unread} unread`}>{conversation.unread}</span>}
        </button>)}
      </div>
      <p className="team-message-queue-note">Choose a conversation to read and reply.</p>
    </section>
    <section className="team-message-thread-panel team-message-inbox-thread" aria-label={`Conversation: ${workspace.conversation.title}`}>
      <header className="team-message-topline"><ConversationHeading channel={workspace.channel} conversation={workspace.conversation} compact /></header>
      <MessageHistory messages={workspace.messages} />
      <MessageComposer channel={workspace.channel} onSubmit={workspace.sendMessage} />
    </section>
  </main>;
}
