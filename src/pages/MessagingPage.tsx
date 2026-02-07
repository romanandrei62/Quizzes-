import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Mail, Send, Trash2, Archive, Star, Settings, User, LogOut, Menu, X, Inbox, ChevronDown } from 'lucide-react';
import { MessageSidebar } from '../components/messaging/MessageSidebar';
import { MessageInbox } from '../components/messaging/MessageInbox';
import { MessageThread } from '../components/messaging/MessageThread';
import { ComposeMessage } from '../components/messaging/ComposeMessage';
import { MessageSentBox } from '../components/messaging/MessageSentBox';
import { MessageTrash } from '../components/messaging/MessageTrash';
import { MessageCannedResponses } from '../components/messaging/MessageCannedResponses';
import { MessageSettings } from '../components/messaging/MessageSettings';
import { KeyboardShortcuts } from '../components/messaging/KeyboardShortcuts';
type ViewState = 'inbox' | 'sent' | 'trash' | 'canned' | 'settings';
export function MessagingPage() {
  const [currentView, setCurrentView] = useState<ViewState>('inbox');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  return <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Main Navigation Sidebar (Left) */}
      <div className="w-[183px] bg-[#2D7A7A] flex flex-col shadow-xl hidden lg:flex">
        {/* Logo/Brand */}
        <div className="h-16 flex items-center justify-center border-b border-teal-700/30">
          <Mail className="w-8 h-8 text-white" />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <div className="space-y-1 px-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Calendar</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Archive className="w-5 h-5" />
              <span className="text-sm font-medium">CRM</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">Office</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Projects</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Send className="w-5 h-5" />
              <span className="text-sm font-medium">Marketing</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">Content</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Archive className="w-5 h-5" />
              <span className="text-sm font-medium">Files</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Forms</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Onboarding</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">Support</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Communities</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/90 bg-teal-700/50 rounded-lg transition-colors">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">Messaging</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Automations</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Archive className="w-5 h-5" />
              <span className="text-sm font-medium">LMS</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">My Pages</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Learn</span>
            </button>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-teal-700/30">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-teal-700/50 rounded-lg transition-colors">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Ask!</span>
          </button>
        </div>
      </div>

      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#2D7A7A] flex items-center justify-between px-4 z-50 shadow-lg">
        <button onClick={() => setIsMainMenuOpen(!isMainMenuOpen)} className="p-2 text-white hover:bg-teal-700/50 rounded-lg transition-colors">

          {isMainMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Mail className="w-6 h-6 text-white" />

        <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white/30 cursor-pointer hover:border-white transition-colors">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Profile" className="h-full w-full object-cover" />

        </div>
      </div>

      {/* Mobile Main Menu Overlay */}
      {isMainMenuOpen && <>
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40 mt-14" onClick={() => setIsMainMenuOpen(false)} />

          <div className="lg:hidden fixed left-0 top-14 bottom-0 w-64 bg-[#2D7A7A] z-50 shadow-xl overflow-y-auto">
            <nav className="flex-1 py-6">
              <div className="space-y-1 px-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">Dashboard</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Star className="w-5 h-5" />
                  <span className="text-sm font-medium">Calendar</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Archive className="w-5 h-5" />
                  <span className="text-sm font-medium">CRM</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">Office</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                  <span className="text-sm font-medium">Projects</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Send className="w-5 h-5" />
                  <span className="text-sm font-medium">Marketing</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">Content</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Archive className="w-5 h-5" />
                  <span className="text-sm font-medium">Files</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                  <span className="text-sm font-medium">Forms</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Onboarding</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">Support</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Star className="w-5 h-5" />
                  <span className="text-sm font-medium">Communities</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/90 bg-teal-700/50 rounded-lg transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">Messaging</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                  <span className="text-sm font-medium">Automations</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Archive className="w-5 h-5" />
                  <span className="text-sm font-medium">LMS</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                  <span className="text-sm font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">My Pages</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-teal-700/50 rounded-lg transition-colors">
                  <Star className="w-5 h-5" />
                  <span className="text-sm font-medium">Learn</span>
                </button>
              </div>
            </nav>
          </div>
        </>}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden pt-14 lg:pt-0">
        {/* Top Navigation Bar - Desktop only */}
        <div className="hidden lg:flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Mail className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Mail className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Profile" className="h-full w-full object-cover" />

            </div>
          </div>
        </div>

        {/* Content Area with Messaging Sidebar and Main Content */}
        <div className="flex-1 flex gap-4 p-4 overflow-hidden lg:p-4">
          {/* Messaging Sidebar Block - Desktop only */}
          <div className="flex-shrink-0 shadow-lg rounded-lg overflow-hidden self-start hidden lg:block">
            <MessageSidebar currentView={currentView} onNavigate={(view) => {
            if (view === 'compose') setIsComposeOpen(true);else setCurrentView(view as ViewState);
          }} onCompose={() => setIsComposeOpen(true)} />

          </div>

          {/* Main Content Block */}
          <main className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
            <AnimatePresence mode="wait">
              {currentView === 'inbox' && <MessageInbox key="inbox" onSelectMessage={(id) => setSelectedMessageId(id)} onNavigate={(view) => setCurrentView(view as ViewState)} />}
              {currentView === 'sent' && <MessageSentBox key="sent" onSelectMessage={(id) => setSelectedMessageId(id)} />}
              {currentView === 'trash' && <MessageTrash key="trash" onSelectMessage={(id) => setSelectedMessageId(id)} />}
              {currentView === 'canned' && <MessageCannedResponses key="canned" />}
              {currentView === 'settings' && <MessageSettings key="settings" />}
            </AnimatePresence>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {isComposeOpen && <ComposeMessage onCancel={() => setIsComposeOpen(false)} onSend={() => {
        setIsComposeOpen(false);
        setCurrentView('inbox');
      }} />}
      </AnimatePresence>

      {/* Mobile Floating Action Button */}
      <button onClick={() => setIsComposeOpen(true)} className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 active:scale-95 transition-all z-30 flex items-center justify-center" aria-label="New Message">

        <Mail className="w-6 h-6" />
      </button>

      <KeyboardShortcuts isOpen={false} onClose={() => {}} />
    </div>;
}