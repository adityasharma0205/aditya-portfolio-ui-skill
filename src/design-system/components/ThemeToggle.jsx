import { Moon, Sun } from 'lucide-react';
import { Button } from './Button.jsx';

export function ThemeToggle({ mode, onToggle }) {
  const isDark = mode === 'dark';
  return <Button variant="ghost" size="icon" onClick={onToggle} aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}>{isDark ? <Sun size={17} /> : <Moon size={17} />}</Button>;
}
