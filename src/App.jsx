import DesignSystemPage from './design-system/DesignSystemPage.jsx';
import MessagingFullViewPage from './design-system/examples/MessagingFullViewPage.jsx';

export default function App() {
  if (new URLSearchParams(window.location.search).get('view') === 'team-messaging') {
    return <MessagingFullViewPage />;
  }

  return <DesignSystemPage />;
}
