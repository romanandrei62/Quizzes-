import { useEffect } from 'react';
type KeyCombo = {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
};
export function useKeyboardShortcuts(shortcuts: {
  combo: KeyCombo;
  action: () => void;
  description?: string;
}[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if inside an input or textarea
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA' || (document.activeElement as HTMLElement)?.isContentEditable) {
        return;
      }
      shortcuts.forEach(({
        combo,
        action
      }) => {
        const keyMatch = event.key.toLowerCase() === combo.key.toLowerCase();
        const ctrlMatch = combo.ctrl ? event.ctrlKey : true;
        const metaMatch = combo.meta ? event.metaKey : true;
        const shiftMatch = combo.shift ? event.shiftKey : true;
        const altMatch = combo.alt ? event.altKey : true;
        if (keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch) {
          event.preventDefault();
          action();
        }
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}