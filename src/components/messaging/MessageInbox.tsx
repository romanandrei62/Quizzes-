import React, { useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, Inbox, Send, Trash2, Archive, Star, MoreVertical, Reply, Paperclip, Pin, MessageCircle, Calendar, MailOpen, Mail, ReplyAll, Settings, X, ArrowUpDown, CheckSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { BarsSortIcon } from './BarsSortIcon';
interface Message {
  id: string;
  sender: string;
  email: string;
  avatar: string;
  subject: string;
  preview: string;
  timestamp: Date;
  isUnread: boolean;
  tags: string[];
  hasAttachment?: boolean;
  replyCount?: number;
  hasNewReplies?: boolean;
  isPinned?: boolean;
}
interface MessageInboxProps {
  onSelectMessage?: (id: string) => void;
  onNavigate?: (view: string) => void;
}
// Helper function to format date like Gmail
const formatMessageDate = (date: Date): string => {
  const now = new Date();
  const messageDate = new Date(date);
  // Reset time to midnight for date comparisons
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
  // Today: show time
  if (messageDay.getTime() === today.getTime()) {
    return messageDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
  // Yesterday
  if (messageDay.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  }
  // Last 7 days: show day name
  if (messageDay > weekAgo) {
    return messageDate.toLocaleDateString('en-US', {
      weekday: 'long'
    });
  }
  // This year: show month and day
  if (messageDate.getFullYear() === now.getFullYear()) {
    return messageDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
  // Previous years: show month, day, and year
  return messageDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
const MOCK_MESSAGES: Message[] = [{
  id: '1',
  sender: 'Mr. M. Kennedy Kieth',
  email: 'kennedy.kieth@example.com',
  avatar: 'MK',
  subject: 'Urgent: Project Requirements Update',
  preview: 'I wanted to discuss the latest changes to the project scope. We need to adjust the timeline and deliverables accordingly',
  timestamp: new Date(new Date().setHours(10, 42, 0, 0)),
  isUnread: true,
  tags: ['Project', 'Urgent'],
  hasAttachment: true,
  replyCount: 3,
  hasNewReplies: true,
  isPinned: false
}, {
  id: '2',
  sender: 'Sarah Jenkins',
  email: 'sarah.jenkins@example.com',
  avatar: 'SJ',
  subject: 'Q4 Roadmap Review Meeting',
  preview: "Here are the slides for tomorrow's presentation. Please review them before the meeting starts and let me know if you have any feedback",
  timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
  isUnread: true,
  tags: ['Internal', 'Planning'],
  replyCount: 7,
  hasNewReplies: true,
  isPinned: true
}, {
  id: '5',
  sender: 'Dr. Alexandria Montgomery-Richardson III',
  email: 'alexandria.montgomery@example.com',
  avatar: 'AM',
  subject: 'Research Collaboration Opportunity - Interdisciplinary Study on Machine Learning Applications in Healthcare Systems',
  preview: 'I would like to discuss a potential collaboration on the upcoming research project. Our team has been working on some exciting developments in the field of artificial intelligence and we believe your expertise would be invaluable to the success of this initiative. The project involves multiple stakeholders across different departments and we are looking to establish a comprehensive framework for collaboration.',
  timestamp: new Date(new Date().setHours(9, 15, 0, 0)),
  isUnread: true,
  tags: ['Research', 'Collaboration'],
  hasAttachment: true,
  replyCount: 12,
  hasNewReplies: true,
  isPinned: false
}, {
  id: '6',
  sender: 'Marketing Team',
  email: 'marketing@example.com',
  avatar: 'MT',
  subject: 'Q1 Campaign Performance Report',
  preview: 'Attached is the comprehensive report on our Q1 marketing campaigns and their performance metrics across all channels',
  timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
  isUnread: false,
  tags: ['Marketing', 'Report'],
  hasAttachment: true,
  replyCount: 5,
  hasNewReplies: false,
  isPinned: true
}, {
  id: '7',
  sender: 'CS',
  email: 'success@example.com',
  avatar: 'CS',
  subject: 'Quick question',
  preview: 'Hey! Just wanted to check in quickly about the client meeting scheduled for next week.',
  timestamp: new Date(new Date().setDate(new Date().getDate() - 3)),
  isUnread: false,
  tags: ['Customer', 'Feedback'],
  replyCount: 8,
  hasNewReplies: false,
  isPinned: false
}, {
  id: '4',
  sender: 'Billing Department',
  email: 'billing@example.com',
  avatar: 'BD',
  subject: 'Invoice #INV-2022-001 for December Services',
  preview: 'Please find attached the invoice for the services rendered in December. Payment is due by the end of the month',
  timestamp: new Date(2024, 11, 9, 11, 20),
  isUnread: true,
  tags: ['Finance', 'Invoice'],
  hasAttachment: true,
  replyCount: 1,
  hasNewReplies: false,
  isPinned: false
}, {
  id: '3',
  sender: 'Tech Support Team',
  email: 'support@example.com',
  avatar: 'TS',
  subject: 'Ticket #4928: Server Downtime Resolved',
  preview: 'The issue reported regarding the staging server has been fixed. You can now deploy your changes without any problems',
  timestamp: new Date(new Date().setDate(new Date().getDate() - 5)),
  isUnread: false,
  tags: ['Support'],
  replyCount: 2,
  hasNewReplies: false,
  isPinned: false
}, {
  id: '8',
  sender: 'Jennifer Smith-Anderson-Williams',
  email: 'jennifer.smith@example.com',
  avatar: 'JS',
  subject: 'Re: Budget Approval for Q2 Marketing Initiatives and Strategic Planning Session',
  preview: 'Thank you for sending over the detailed budget breakdown. I have reviewed all the line items and discussed them with the finance committee. We have a few questions regarding the allocation for digital advertising spend, particularly the social media campaigns planned for April and May. Could we schedule a call to discuss the ROI projections and expected outcomes? I think it would be beneficial to align our expectations before moving forward with the approval process.',
  timestamp: new Date(new Date().setHours(14, 30, 0, 0)),
  isUnread: true,
  tags: ['Budget', 'Planning'],
  hasAttachment: false,
  replyCount: 15,
  hasNewReplies: true,
  isPinned: false
}];
type FilterType = 'all' | 'unread' | 'pinned' | 'date';
type SortType = 'newest' | 'oldest' | 'title-asc' | 'title-desc';
export function MessageInbox({
  onSelectMessage,
  onNavigate
}: MessageInboxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [mobileActionMessageId, setMobileActionMessageId] = useState<string | null>(null);
  const [isMailboxMenuOpen, setIsMailboxMenuOpen] = useState(false);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: string;
    to: string;
  }>({
    from: '',
    to: ''
  });
  // Search functionality - filters messages by sender, subject, preview
  const getSearchableContent = (messageId: string): string => {
    const message = MOCK_MESSAGES.find((m) => m.id === messageId);
    if (!message) return '';
    return `${message.sender} ${message.email} ${message.subject} ${message.preview} ${message.tags.join(' ')}`.toLowerCase();
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
  const handleCopyEmail = (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };
  const handleTogglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages((prev) => prev.map((msg) => msg.id === id ? {
      ...msg,
      isPinned: !msg.isPinned
    } : msg));
  };
  const handleToggleReadStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages((prev) => prev.map((msg) => msg.id === id ? {
      ...msg,
      isUnread: !msg.isUnread
    } : msg));
    setOpenMenuId(null);
  };
  const handleReply = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Reply to message:', id);
    // Handle reply action
  };
  const filterOptions = [{
    value: 'all' as FilterType,
    label: 'All Messages',
    icon: Inbox
  }, {
    value: 'unread' as FilterType,
    label: 'Unread',
    icon: MailOpen
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

  // Filter and sort messages with search
  const filteredMessages = messages.filter((msg) => {
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const senderMatch = msg.sender.toLowerCase().includes(query);
      const subjectMatch = msg.subject.toLowerCase().includes(query);
      const previewMatch = msg.preview.toLowerCase().includes(query);
      const contentMatch = getSearchableContent(msg.id).includes(query);
      if (!senderMatch && !subjectMatch && !previewMatch && !contentMatch) {
        return false;
      }
    }
    // Existing filters
    if (activeFilter === 'unread') return msg.isUnread;
    if (activeFilter === 'pinned') return msg.isPinned;
    if (activeFilter === 'date') return false;
    return true;
  }).sort((a, b) => {
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        // Pinned first, then by date (newest first)
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.timestamp.getTime() - a.timestamp.getTime();
      case 'oldest':
        // Pinned first, then by date (oldest first)
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.timestamp.getTime() - b.timestamp.getTime();
      case 'title-asc':
        // Pinned first, then alphabetically A-Z
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.subject.localeCompare(b.subject);
      case 'title-desc':
        // Pinned first, then alphabetically Z-A
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
  return <div className="flex flex-col h-full bg-white">
      {/* Header Toolbar */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
        {/* Mobile: Dropdown | Desktop: Static Label */}
        <div className="relative">
          {/* Mobile & Tablet Dropdown */}
          <button onClick={() => setIsMailboxMenuOpen(!isMailboxMenuOpen)} className="lg:hidden flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors">

            <Inbox className="w-5 h-5" />
            <span>Inbox</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Desktop Static Label */}
          <div className="hidden lg:flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Inbox className="w-5 h-5" />
            <span>Inbox</span>
          </div>

          {isMailboxMenuOpen && onNavigate && <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMailboxMenuOpen(false)} />

              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-20">
                <button onClick={() => {
              onNavigate('inbox');
              setIsMailboxMenuOpen(false);
            }} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 bg-teal-50 text-teal-700 font-medium">

                  <Inbox className="w-4 h-4" />
                  <span className="flex-1">Inbox</span>
                  <span className="text-xs bg-teal-100 px-2 py-0.5 rounded-full">
                    4
                  </span>
                </button>
                <button onClick={() => {
              onNavigate('sent');
              setIsMailboxMenuOpen(false);
            }} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 text-gray-700 hover:bg-gray-50">

                  <Send className="w-4 h-4" />
                  <span className="flex-1">Sent</span>
                </button>
                <button onClick={() => {
              onNavigate('canned');
              setIsMailboxMenuOpen(false);
            }} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 text-gray-700 hover:bg-gray-50">

                  <MessageCircle className="w-4 h-4" />
                  <span className="flex-1">Canned Responses</span>
                </button>
                <button onClick={() => {
              onNavigate('trash');
              setIsMailboxMenuOpen(false);
            }} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 text-gray-700 hover:bg-gray-50">

                  <Trash2 className="w-4 h-4" />
                  <span className="flex-1">Trash</span>
                </button>
                <div className="h-px bg-gray-200 my-2" />
                <button onClick={() => {
              onNavigate('settings');
              setIsMailboxMenuOpen(false);
            }} className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 text-gray-700 hover:bg-gray-50">

                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </>}
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

              <input type="text" placeholder="Search messages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus className="w-64 pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />

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

      {/* Bulk Edit Bar - Positioned below header */}
      {selectedIds.size > 0 && showCheckboxes && <div className="bg-gray-800 text-white shadow-lg animate-slideDown">
          <div className="px-4 md:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-6">
              <span className="text-sm">
                <span className="font-bold">{selectedIds.size}</span> selected
              </span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 md:px-4 py-1.5 text-sm font-medium hover:bg-gray-700 rounded transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Mark as Read</span>
                </button>
                <button className="flex items-center gap-2 px-3 md:px-4 py-1.5 text-sm font-medium hover:bg-gray-700 rounded transition-colors">
                  <MailOpen className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Mark as Unread</span>
                </button>
                <div className="w-px h-5 bg-gray-600 hidden sm:block"></div>
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
          </div> : <motion.div variants={container} initial="hidden" animate="show" className="w-full">

            {filteredMessages.map((message, index) => <motion.div key={message.id} variants={item} className={`flex items-center gap-4 px-4 md:px-6 py-4 md:py-5 ${index !== filteredMessages.length - 1 ? 'border-b border-gray-100' : ''} cursor-pointer ${message.isPinned ? 'bg-blue-50/30' : ''} transition-colors`} onClick={() => {
          setSelectedMessageId(message.id);
          onSelectMessage?.(message.id);
        }} onMouseEnter={() => setHoveredMessageId(message.id)} onMouseLeave={() => setHoveredMessageId(null)} onTouchStart={(e) => {
          // Prevent hover state on touch
          e.currentTarget.classList.remove('hover-bg-gray-50');
          // Long press detection for mobile
          const touchTimer = setTimeout(() => {
            setMobileActionMessageId(message.id);
          }, 500);
          (e.currentTarget as any).touchTimer = touchTimer;
        }} onTouchEnd={(e) => {
          const touchTimer = (e.currentTarget as any).touchTimer;
          if (touchTimer) clearTimeout(touchTimer);
        }}>

                {showCheckboxes && <div onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedIds.has(message.id)} onChange={() => handleToggleSelect(message.id)} className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 focus:ring-2 cursor-pointer" />

                  </div>}

                <Avatar fallback={message.avatar} className="flex-shrink-0 hidden md:block" />


                <div className="flex-1 min-w-0">
                  {/* Mobile Layout - Compact */}
                  <div className="md:hidden">
                    {/* Top Row: Sender + Icons + Timestamp */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <h3 className={`text-sm truncate ${message.isUnread ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'}`}>

                          {message.sender}
                        </h3>
                        {message.isPinned && <Pin className="h-3.5 w-3.5 text-blue-600 fill-blue-600 flex-shrink-0" />}
                        {message.hasAttachment && <Paperclip className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />}
                        {message.replyCount && message.replyCount > 0 && <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-teal-100 text-teal-700 rounded-full flex-shrink-0">
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
                    <div className={`text-sm mb-1 ${message.isUnread ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>

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
                      <button onClick={(e) => handleToggleReadStatus(message.id, e)} className="p-1.5 hover:bg-gray-100 rounded transition-colors">

                        {message.isUnread ? <MailOpen className="h-4 w-4 text-teal-500" /> : <Mail className="h-4 w-4 text-gray-400" />}
                      </button>
                      <button onClick={(e) => handleReply(message.id, e)} className="p-1.5 hover:bg-gray-100 rounded transition-colors">

                        <Reply className="h-4 w-4 text-gray-400" />
                      </button>
                      <button onClick={(e) => {
                  e.stopPropagation();
                  console.log('Move to trash:', message.id);
                }} className="p-1.5 hover:bg-gray-100 rounded transition-colors">

                        <Trash2 className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout - Original */}
                  <div className="hidden md:block">
                    {/* Sender Name */}
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-[15px] truncate ${message.isUnread ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'}`}>

                        {message.sender}
                      </h3>
                      {message.isPinned && <Pin className="h-3.5 w-3.5 text-blue-600 fill-blue-600 flex-shrink-0" />}
                      {message.hasAttachment && <Paperclip className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />}

                      {/* Spacer */}
                      <div className="flex-1 min-w-0" />

                      {/* Timestamp - hide on hover when actions appear */}
                      {hoveredMessageId !== message.id && <span className="text-xs flex-shrink-0 text-gray-400">
                          {formatMessageDate(message.timestamp)}
                        </span>}
                    </div>

                    {/* Subject Line with Reply Count Badge */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`text-sm truncate ${message.isUnread ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>

                        {message.subject}
                      </div>

                      {message.replyCount && message.replyCount > 0 && <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${message.isUnread ? 'bg-teal-100 text-teal-700 font-medium' : 'bg-gray-100 text-gray-600'}`}>

                          <MessageCircle className="h-3 w-3" />
                          <span>{message.replyCount}</span>
                        </div>}
                    </div>

                    {/* Preview Text */}
                    <div className="text-sm text-gray-500 truncate">
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

                      {/* Read/Unread Button */}
                      <button onClick={(e) => handleToggleReadStatus(message.id, e)} className="p-1.5 hover:bg-gray-200 rounded transition-colors" title={message.isUnread ? 'Mark as read' : 'Mark as unread'}>

                        {message.isUnread ? <MailOpen className="h-4 w-4 text-teal-500" /> : <Mail className="h-4 w-4 text-gray-400" />}
                      </button>

                      {/* Reply Button */}
                      <button onClick={(e) => handleReply(message.id, e)} className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Reply">

                        <Reply className="h-4 w-4 text-gray-400" />
                      </button>

                      {/* Reply All Button */}
                      <button onClick={(e) => {
                e.stopPropagation();
                console.log('Reply all to:', message.id);
              }} className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Reply all">

                        <ReplyAll className="h-4 w-4 text-gray-400" />
                      </button>

                      {/* Trash Button */}
                      <button onClick={(e) => {
                e.stopPropagation();
                console.log('Move to trash:', message.id);
              }} className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Move to trash">

                        <Trash2 className="h-4 w-4 text-gray-400" />
                      </button>
                    </motion.div>}
                </div>
              </motion.div>)}
          </motion.div>}
      </div>

      {/* Date Range Picker Modal */}
      {isDateRangeOpen && <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsDateRangeOpen(false)} />

          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 z-50 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Custom Date Range
              </h3>
              <button onClick={() => setIsDateRangeOpen(false)} className="p-1 hover:bg-gray-100 rounded transition-colors">

                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <input type="date" value={dateRange.from} onChange={(e) => setDateRange({
              ...dateRange,
              from: e.target.value
            })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <input type="date" value={dateRange.to} onChange={(e) => setDateRange({
              ...dateRange,
              to: e.target.value
            })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />

              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button onClick={handleClearDateRange} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">

                Clear
              </button>
              <button onClick={handleApplyDateRange} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors">

                Apply Filter
              </button>
            </div>
          </div>
        </>}

      {/* Mobile Action Sheet - Bottom Drawer */}
      {mobileActionMessageId && <>
          <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setMobileActionMessageId(null)} />

          <motion.div initial={{
        y: '100%'
      }} animate={{
        y: 0
      }} exit={{
        y: '100%'
      }} className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 p-6">

            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            <div className="space-y-2">
              <button onClick={(e) => {
            handleTogglePin(mobileActionMessageId, e);
            setMobileActionMessageId(null);
          }} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">

                <Pin className="w-5 h-5" />
                <span className="font-medium">
                  {messages.find((m) => m.id === mobileActionMessageId)?.isPinned ? 'Unpin' : 'Pin to top'}
                </span>
              </button>
              <button onClick={(e) => {
            handleToggleReadStatus(mobileActionMessageId, e);
            setMobileActionMessageId(null);
          }} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">

                <MailOpen className="w-5 h-5" />
                <span className="font-medium">
                  {messages.find((m) => m.id === mobileActionMessageId)?.isUnread ? 'Mark as read' : 'Mark as unread'}
                </span>
              </button>
              <button onClick={(e) => {
            handleReply(mobileActionMessageId, e);
            setMobileActionMessageId(null);
          }} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">

                <Reply className="w-5 h-5" />
                <span className="font-medium">Reply</span>
              </button>
              <button onClick={(e) => {
            e.stopPropagation();
            console.log('Move to trash:', mobileActionMessageId);
            setMobileActionMessageId(null);
          }} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">

                <Trash2 className="w-5 h-5" />
                <span className="font-medium">Move to trash</span>
              </button>
            </div>
          </motion.div>
        </>}
    </div>;
}