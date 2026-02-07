import React, { useState, Children } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckSquare, X, Trash2, Pin, MessageCircle, Paperclip, Filter, Calendar, ArrowUpDown, ChevronDown, Send, Inbox } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { BarsSortIcon } from './BarsSortIcon';
interface SentMessage {
  id: string;
  recipient: string;
  recipientEmail: string;
  avatar: string;
  subject: string;
  preview: string;
  timestamp: Date;
  tags: string[];
  hasAttachment?: boolean;
  replyCount?: number;
  isPinned?: boolean;
}
interface MessageSentBoxProps {
  onSelectMessage: (id: string) => void;
}
// Helper function to format date like Gmail
const formatMessageDate = (date: Date): string => {
  const now = new Date();
  const messageDate = new Date(date);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
  if (messageDay.getTime() === today.getTime()) {
    return messageDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
  if (messageDay.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  }
  if (messageDay > weekAgo) {
    return messageDate.toLocaleDateString('en-US', {
      weekday: 'long'
    });
  }
  if (messageDate.getFullYear() === now.getFullYear()) {
    return messageDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
  return messageDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
const MOCK_SENT_MESSAGES: SentMessage[] = [{
  id: '1',
  recipient: 'Sarah Jenkins',
  recipientEmail: 'sarah.jenkins@example.com',
  avatar: 'SJ',
  subject: 'Re: Q4 Roadmap Review Meeting',
  preview: 'Thanks for sharing the slides. I reviewed them and have a few suggestions for the timeline section...',
  timestamp: new Date(new Date().setHours(14, 30, 0, 0)),
  tags: ['Internal', 'Planning'],
  replyCount: 2,
  isPinned: false
}, {
  id: '2',
  recipient: 'Tech Support Team',
  recipientEmail: 'support@example.com',
  avatar: 'TS',
  subject: 'Server Access Request',
  preview: 'I need access to the staging server to deploy the latest updates. Can you grant me permissions?',
  timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
  tags: ['Support'],
  hasAttachment: true,
  replyCount: 1,
  isPinned: true
}, {
  id: '3',
  recipient: 'Mr. M. Kennedy Kieth',
  recipientEmail: 'kennedy.kieth@example.com',
  avatar: 'MK',
  subject: 'Project Timeline Update',
  preview: 'Following up on our discussion about the project requirements. Here are the revised timelines...',
  timestamp: new Date(new Date().setDate(new Date().getDate() - 3)),
  tags: ['Project'],
  hasAttachment: true,
  isPinned: false
}];
export function MessageSentBox({
  onSelectMessage
}: MessageSentBoxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [messages, setMessages] = useState(MOCK_SENT_MESSAGES);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: string;
    to: string;
  }>({
    from: '',
    to: ''
  });
  // Search functionality
  const getSearchableContent = (messageId: string): string => {
    const message = MOCK_SENT_MESSAGES.find((m) => m.id === messageId);
    if (!message) return '';
    return `${message.recipient} ${message.recipientEmail} ${message.subject} ${message.preview} ${message.tags.join(' ')}`.toLowerCase();
  };
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };
  const handleToggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    if (showCheckboxes) {
      setSelectedIds(new Set());
    }
  };
  const handleTogglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages((prev) => prev.map((msg) => msg.id === id ? {
      ...msg,
      isPinned: !msg.isPinned
    } : msg));
  };
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Move to trash:', id);
  };
  const filterOptions = [{
    value: 'all' as FilterType,
    label: 'All Messages',
    icon: Inbox
  }, {
    value: 'pinned' as FilterType,
    label: 'Pinned',
    icon: Pin
  }, {
    value: 'date' as FilterType,
    label: 'Filter by Date',
    icon: Calendar
  }];
  const sortOptions = [{
    value: 'newest' as SortType,
    label: 'Created (Newest - Oldest)',
    icon: Calendar
  }, {
    value: 'oldest' as SortType,
    label: 'Created (Oldest - Newest)',
    icon: Calendar
  }, {
    value: 'title-asc' as SortType,
    label: 'Title (A-Z)',
    icon: ArrowUpDown
  }, {
    value: 'title-desc' as SortType,
    label: 'Title (Z-A)',
    icon: ArrowUpDown
  }];
  const handleDateRangeClick = () => {
    setIsFilterOpen(false);
    setIsDateRangeOpen(true);
  };
  const handleApplyDateRange = () => {
    console.log('Apply date range:', dateRange);
    setIsDateRangeOpen(false);
  };
  const handleClearDateRange = () => {
    setDateRange({
      from: '',
      to: ''
    });
    setIsDateRangeOpen(false);
  };
  // Filter and sort messages with search
  const filteredMessages = messages.filter((msg) => {
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const recipientMatch = msg.recipient.toLowerCase().includes(query);
      const subjectMatch = msg.subject.toLowerCase().includes(query);
      const previewMatch = msg.preview.toLowerCase().includes(query);
      const contentMatch = getSearchableContent(msg.id).includes(query);
      if (!recipientMatch && !subjectMatch && !previewMatch && !contentMatch) {
        return false;
      }
    }
    // Existing filters
    if (activeFilter === 'pinned') return msg.isPinned;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.timestamp.getTime() - a.timestamp.getTime();
      case 'oldest':
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.timestamp.getTime() - b.timestamp.getTime();
      case 'title-asc':
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.subject.localeCompare(b.subject);
      case 'title-desc':
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.subject.localeCompare(a.subject);
      default:
        return 0;
    }
  });
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 10
    },
    show: {
      opacity: 1,
      y: 0
    }
  };
  return <div className="flex flex-col h-full bg-white">
      {/* Header Toolbar */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Send className="w-5 h-5" />
          <span>Sent</span>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen ? <motion.div initial={{
          width: 0,
          opacity: 0
        }} animate={{
          width: 'auto',
          opacity: 1
        }} exit={{
          width: 0,
          opacity: 0
        }} transition={{
          duration: 0.2
        }} className="relative">

              <input type="text" placeholder="Search sent messages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus className="w-64 pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />

            </motion.div> : null}
          <button onClick={() => {
          setIsSearchOpen(!isSearchOpen);
          if (isSearchOpen) {
            setSearchQuery('');
          }
        }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">

            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Filter Dropdown */}
          <div className="relative">
            <button onClick={() => {
            setIsFilterOpen(!isFilterOpen);
            setIsSortOpen(false);
          }} className={`p-2 rounded-lg transition-colors ${activeFilter !== 'all' ? 'bg-teal-50 text-teal-600 hover:bg-teal-100' : 'hover:bg-gray-100 text-gray-600'}`}>

              <Filter className="w-5 h-5" />
            </button>

            {isFilterOpen && <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20">
                  {filterOptions.map((option) => {
                const Icon = option.icon;
                return <button key={option.value} onClick={() => {
                  setActiveFilter(option.value);
                  setIsFilterOpen(false);
                }} className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2 ${activeFilter === option.value ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>

                        <Icon className="w-4 h-4" />
                        {option.label}
                      </button>;
              })}
                </div>
              </>}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button onClick={() => {
            setIsSortOpen(!isSortOpen);
            setIsFilterOpen(false);
          }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">

              <BarsSortIcon className="w-5 h-5" />
            </button>

            {isSortOpen && <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />

                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20">
                  {sortOptions.map((option) => {
                const Icon = option.icon;
                return <button key={option.value} onClick={() => {
                  setSortBy(option.value);
                  setIsSortOpen(false);
                }} className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-2 ${sortBy === option.value ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>

                        <Icon className="w-4 h-4" />
                        {option.label}
                      </button>;
              })}
                </div>
              </>}
          </div>

          <button onClick={handleToggleCheckboxes} className={`p-2 rounded-lg transition-colors ${showCheckboxes ? 'bg-teal-50 text-teal-600 hover:bg-teal-100' : 'hover:bg-gray-100 text-gray-600'}`} title={showCheckboxes ? 'Hide checkboxes' : 'Show checkboxes'}>

            <CheckSquare className="w-5 h-5" />
          </button>

          <select className="hidden sm:block px-3 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && showCheckboxes && <div className="bg-gray-800 text-white shadow-lg animate-slideDown">
          <div className="px-4 md:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-6">
              <span className="text-sm">
                <span className="font-bold">{selectedIds.size}</span> selected
              </span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 md:px-4 py-1.5 text-sm font-medium hover:bg-red-600 rounded transition-colors">
                  <Trash2 className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Move to Trash</span>
                </button>
              </div>
            </div>
            <button onClick={handleClearSelection} className="p-1 hover:bg-gray-700 rounded transition-colors flex items-center justify-center">

              <X className="w-5 h-5" />
            </button>
          </div>
        </div>}

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.length === 0 && searchQuery.trim() ? <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">
              No messages found for "{searchQuery}"
            </p>
            <button onClick={() => setSearchQuery('')} className="mt-4 text-sm text-teal-600 hover:text-teal-700 font-medium">

              Clear search
            </button>
          </div> : <motion.div variants={container} initial="hidden" animate="show">
            {filteredMessages.map((message, index) => <motion.div key={message.id} variants={item} className={`flex items-center gap-4 px-4 md:px-6 py-4 md:py-5 ${index !== filteredMessages.length - 1 ? 'border-b border-gray-100' : ''} cursor-pointer ${message.isPinned ? 'bg-blue-50/30' : ''} transition-colors`} onClick={() => onSelectMessage(message.id)} onMouseEnter={() => setHoveredMessageId(message.id)} onMouseLeave={() => setHoveredMessageId(null)} onTouchStart={() => setHoveredMessageId(null)}>

                {showCheckboxes && <div onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedIds.has(message.id)} onChange={() => handleToggleSelect(message.id)} className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 focus:ring-2 cursor-pointer" />

                  </div>}

                <Avatar fallback={message.avatar} className="flex-shrink-0 hidden md:block" />


                <div className="flex-1 min-w-0">
                  {/* Mobile Layout - Compact */}
                  <div className="md:hidden">
                    {/* Top Row: Recipient + Icons + Timestamp */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <h3 className="text-sm truncate font-normal text-gray-700">
                          To: {message.recipient}
                        </h3>
                        {message.isPinned && <Pin className="h-3.5 w-3.5 text-blue-600 fill-blue-600 flex-shrink-0" />}
                        {message.hasAttachment && <Paperclip className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />}
                        {message.replyCount && message.replyCount > 0 && <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full flex-shrink-0">
                            <MessageCircle className="h-3 w-3" />
                            <span className="text-xs font-semibold">
                              {message.replyCount}
                            </span>
                          </div>}
                      </div>
                      <span className="text-xs flex-shrink-0 text-gray-400">
                        {formatMessageDate(message.timestamp)}
                      </span>
                    </div>

                    {/* Middle Row: Subject */}
                    <div className="text-sm mb-1 text-gray-700">
                      {message.subject}
                    </div>

                    {/* Bottom Row: Preview */}
                    <div className="text-sm text-gray-500 line-clamp-1 mb-2">
                      {message.preview}
                    </div>

                    {/* Action Icons Row */}
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                      <button onClick={(e) => handleTogglePin(message.id, e)} className="p-1.5 hover:bg-gray-100 rounded transition-colors">

                        {message.isPinned ? <Pin className="h-4 w-4 text-blue-600 fill-blue-600" /> : <Pin className="h-4 w-4 text-gray-400" />}
                      </button>
                      <button onClick={(e) => handleDelete(message.id, e)} className="p-1.5 hover:bg-gray-100 rounded transition-colors">

                        <Trash2 className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout - Original */}
                  <div className="hidden md:block">
                    {/* Recipient Name */}
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[15px] font-normal text-gray-700">
                        To: {message.recipient}
                      </h3>
                      {message.isPinned && <Pin className="h-3.5 w-3.5 text-blue-600 fill-blue-600" />}
                      {message.hasAttachment && <Paperclip className="h-3.5 w-3.5 text-gray-400" />}

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Timestamp - hide on hover when actions appear */}
                      {hoveredMessageId !== message.id && <span className="text-xs flex-shrink-0 text-gray-400">
                          {formatMessageDate(message.timestamp)}
                        </span>}
                    </div>

                    {/* Subject Line with Reply Count Badge */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-sm text-gray-700">
                        {message.subject}
                      </div>

                      {message.replyCount && message.replyCount > 0 && <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 flex-shrink-0">
                          <MessageCircle className="h-3 w-3" />
                          <span>{message.replyCount}</span>
                        </div>}
                    </div>

                    {/* Preview Text */}
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {message.preview}
                    </div>
                  </div>
                </div>

                {/* Right Side: Actions only - Desktop only */}
                <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                  {/* Action Buttons - Show on hover */}
                  {hoveredMessageId === message.id && <motion.div initial={{
              opacity: 0,
              x: -10
            }} animate={{
              opacity: 1,
              x: 0
            }} className="flex items-center gap-1">

                      {/* Pin Button */}
                      <button onClick={(e) => handleTogglePin(message.id, e)} className="p-1.5 hover:bg-gray-200 rounded transition-colors" title={message.isPinned ? 'Unpin' : 'Pin to top'}>

                        {message.isPinned ? <Pin className="h-4 w-4 text-blue-600 fill-blue-600" /> : <Pin className="h-4 w-4 text-gray-400" />}
                      </button>

                      {/* Trash Button */}
                      <button onClick={(e) => handleDelete(message.id, e)} className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Move to trash">

                        <Trash2 className="h-4 w-4 text-gray-400" />
                      </button>
                    </motion.div>}
                </div>
              </motion.div>)}
          </motion.div>}
      </div>
    </div>;
}