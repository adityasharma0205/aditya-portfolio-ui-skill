import { ConversationHeading, ChannelNavigation, MessageComposer, MessageHistory, useMessagingWorkspace } from './TeamMessagingShared.jsx';

export const teamThreadFirstDescription = 'A thread-first workspace that gives the active conversation the most room, with channels kept close at hand.';

export default function TeamMessagingThreadFirst() {
  const workspace = useMessagingWorkspace();
  return <main className="team-message-product team-message-thread-first" aria-label="Thread-first messaging workspace">
    <ChannelNavigation channelId={workspace.channelId} conversationId={workspace.conversationId} onSelect={workspace.selectChannel} onSelectConversation={workspace.selectConversation} showConversations />
    <section className="team-message-thread-panel" aria-label={`Conversation in ${workspace.channel.name}`}>
      <header className="team-message-topline"><ConversationHeading channel={workspace.channel} conversation={workspace.conversation} /></header>
      <MessageHistory messages={workspace.messages} />
      <MessageComposer channel={workspace.channel} onSubmit={workspace.sendMessage} />
    </section>
  </main>;
}
