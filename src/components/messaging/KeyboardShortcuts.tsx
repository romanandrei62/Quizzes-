import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, CornerDownLeft } from 'lucide-react';
interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}
export function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  const shortcuts = [
  {
    keys: ['C'],
    description: 'Compose new message'
  },
  {
    keys: ['/'],
    description: 'Search inbox'
  },
  {
    keys: ['Esc'],
    description: 'Close modal / Clear selection'
  },
  {
    keys: ['?'],
    description: 'Show keyboard shortcuts'
  },
  {
    keys: ['↑', '↓'],
    description: 'Navigate list'
  },
  {
    keys: ['Enter'],
    description: 'Open selected thread'
  }];

  return (
    <AnimatePresence>
      {isOpen &&
      <>
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50" />

          <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">

            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Command className="h-5 w-5 text-teal-600" />
                <h3 className="font-semibold text-gray-900">
                  Keyboard Shortcuts
                </h3>
              </div>
              <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600">

                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-2">
              {shortcuts.map((shortcut, index) =>
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">

                  <span className="text-sm text-gray-600">
                    {shortcut.description}
                  </span>
                  <div className="flex gap-1">
                    {shortcut.keys.map((key) =>
                <kbd
                  key={key}
                  className="px-2 py-1 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-500 shadow-sm min-w-[24px] text-center">

                        {key}
                      </kbd>
                )}
                  </div>
                </div>
            )}
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}