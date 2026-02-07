import React, { useState } from 'react';
import { Inbox, Send, Trash2, Settings, MessageSquare, Keyboard, Plus, Mail, Edit3 } from 'lucide-react';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { Button } from '../ui/Button';
interface MessageSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onCompose: () => void;
}
export function MessageSidebar({
  currentView,
  onNavigate,
  onCompose
}: MessageSidebarProps) {
  const [showShortcuts, setShowShortcuts] = useState(false);
  return <>
      <div className="w-[352px] bg-white border-r border-gray-200 flex flex-col">
        {/* Header with New Message Button */}
        <div className="px-6 py-5 border-b border-gray-200">
          <button onClick={onCompose} className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 active:scale-[0.98] transition-all shadow-sm hover:shadow-md font-medium">

            <Mail className="w-5 h-5" />
            <span>New Message</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <button onClick={() => onNavigate('inbox')} className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative
              ${currentView === 'inbox' ? 'bg-teal-50 text-teal-700' : 'text-gray-700'}
            `}>

            {currentView === 'inbox' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-600 rounded-r" />}
            <Inbox className="w-5 h-5" />
            <span className="font-medium flex-1 text-left">Inbox</span>
            <span className="text-sm font-semibold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
              4
            </span>
          </button>

          <button onClick={() => onNavigate('sent')} className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative
              ${currentView === 'sent' ? 'bg-teal-50 text-teal-700' : 'text-gray-700'}
            `}>

            {currentView === 'sent' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-600 rounded-r" />}
            <Send className="w-5 h-5" />
            <span className="font-medium flex-1 text-left">Sent Box</span>
          </button>

          <button onClick={() => onNavigate('canned')} className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative
              ${currentView === 'canned' ? 'bg-teal-50 text-teal-700' : 'text-gray-700'}
            `}>

            {currentView === 'canned' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-600 rounded-r" />}
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium flex-1 text-left">
              Canned Responses
            </span>
          </button>

          <button onClick={() => onNavigate('trash')} className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative
              ${currentView === 'trash' ? 'bg-teal-50 text-teal-700' : 'text-gray-700'}
            `}>

            {currentView === 'trash' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-600 rounded-r" />}
            <Trash2 className="w-5 h-5" />
            <span className="font-medium flex-1 text-left">Trash</span>
          </button>

          <button onClick={() => onNavigate('settings')} className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative
              ${currentView === 'settings' ? 'bg-teal-50 text-teal-700' : 'text-gray-700'}
            `}>

            {currentView === 'settings' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-600 rounded-r" />}
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        {/* Keyboard Shortcuts - Bottom Section */}
        <div className="px-3 pb-4 border-t border-gray-200 pt-3">
          <button onClick={() => setShowShortcuts(true)} className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-gray-600 transition-all group">

            <div className="w-7 h-7 rounded-md bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
              <Keyboard className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Shortcuts</span>
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />}
    </>;
}