import React, { useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, CheckSquare, X, Edit, Trash2, FileText, Filter, CheckCircle, Calendar, ArrowUpDown, Reply, MessageSquare, Maximize2, Minimize2, Save, Image as ImageIcon, Smile, HelpCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { BarsSortIcon } from './BarsSortIcon';
import { EmptyState } from '../ui/EmptyState';
interface CannedResponse {
  id: string;
  name: string;
  autoAdd: boolean;
  autoReply: boolean;
  content: string;
  color: string;
}
const MOCK_CANNED_RESPONSES: CannedResponse[] = [{
  id: '1',
  name: 'Out of Office',
  autoAdd: false,
  autoReply: true,
  content: 'Thank you for your message. I am currently out of office and will respond when I return.',
  color: '#8B5CF6'
}, {
  id: '2',
  name: 'Meeting Request',
  autoAdd: true,
  autoReply: false,
  content: 'Thank you for reaching out. I would be happy to schedule a meeting. Please let me know your availability.',
  color: '#EC4899'
}, {
  id: '3',
  name: 'Follow Up',
  autoAdd: false,
  autoReply: false,
  content: 'Following up on our previous conversation. Please let me know if you have any questions.',
  color: '#10B981'
}, {
  id: '4',
  name: 'dsada',
  autoAdd: false,
  autoReply: false,
  content: 'Sample canned response content.',
  color: '#8B5CF6'
}];
type SortType = 'name-asc' | 'name-desc' | 'newest' | 'oldest';
export function MessageCannedResponses() {
  const [responses, setResponses] = useState(MOCK_CANNED_RESPONSES);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [hoveredResponseId, setHoveredResponseId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingResponse, setEditingResponse] = useState<CannedResponse | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    subject: '',
    includeSubject: false,
    autoAdd: false,
    autoReply: false,
    color: '#8B5CF6'
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'auto-add' | 'auto-reply'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>('name-asc');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: string;
    to: string;
  }>({
    from: '',
    to: ''
  });
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
  const handleEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const response = responses.find((r) => r.id === id);
    if (response) {
      setEditingResponse(response);
      setFormData({
        title: response.name,
        content: response.content,
        subject: '',
        includeSubject: false,
        autoAdd: response.autoAdd,
        autoReply: response.autoReply,
        color: response.color
      });
      setShowModal(true);
    }
  };
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Delete response:', id);
  };
  const handleToggleAutoAdd = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResponses(responses.map((r) => r.id === id ? {
      ...r,
      autoAdd: !r.autoAdd
    } : r));
  };
  const handleToggleAutoReply = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResponses(responses.map((r) => r.id === id ? {
      ...r,
      autoReply: !r.autoReply
    } : r));
  };
  const filterOptions = [{
    value: 'all' as const,
    label: 'All Responses',
    icon: FileText
  }, {
    value: 'auto-add' as const,
    label: 'Auto-Add',
    icon: CheckCircle
  }, {
    value: 'auto-reply' as const,
    label: 'Auto-Reply',
    icon: Reply
  }, {
    value: 'date' as const,
    label: 'Filter by Date',
    icon: Calendar
  }];
  const sortOptions = [{
    value: 'name-asc' as SortType,
    label: 'Name (A-Z)',
    icon: ArrowUpDown
  }, {
    value: 'name-desc' as SortType,
    label: 'Name (Z-A)',
    icon: ArrowUpDown
  }, {
    value: 'newest' as SortType,
    label: 'Created (Newest - Oldest)',
    icon: Calendar
  }, {
    value: 'oldest' as SortType,
    label: 'Created (Oldest - Newest)',
    icon: Calendar
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
  // Filter and sort responses
  const filteredResponses = responses.filter((response) => {
    if (filterType === 'auto-add') return response.autoAdd;
    if (filterType === 'auto-reply') return response.autoReply;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'newest':
        // For demo purposes, sort by id (higher id = newer)
        return b.id.localeCompare(a.id);
      case 'oldest':
        return a.id.localeCompare(b.id);
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
        <div className="flex items-center gap-3">
          <div className="relative group">
            <button onClick={() => {
            setEditingResponse(null);
            setFormData({
              title: '',
              content: '',
              subject: '',
              includeSubject: false,
              autoAdd: false,
              autoReply: false,
              color: '#8B5CF6'
            });
            setShowModal(true);
          }} className="flex items-center justify-center w-9 h-9 bg-teal-600 text-white rounded-full hover:bg-teal-700 hover:shadow-md active:scale-95 transition-all" title="New canned response">

              <Plus className="w-5 h-5" />
            </button>

            {/* Tooltip */}
            <div className="absolute left-0 top-full mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
              New canned response
              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-lg font-semibold text-gray-900">
            <MessageSquare className="w-5 h-5" />
            <span>Canned Responses</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Filter Dropdown */}
          <div className="relative">
            <button onClick={() => {
            setIsFilterOpen(!isFilterOpen);
            setIsSortOpen(false);
          }} className={`p-2 rounded-lg transition-colors ${filterType !== 'all' ? 'bg-teal-50 text-teal-600 hover:bg-teal-100' : 'hover:bg-gray-100 text-gray-600'}`}>

              <Filter className="w-5 h-5" />
            </button>

            {isFilterOpen && <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20">
                  {filterOptions.map((option) => {
                const Icon = option.icon;
                return <button key={option.value} onClick={() => {
                  setFilterType(option.value);
                  setIsFilterOpen(false);
                }} className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2 ${filterType === option.value ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>

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
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
            <button onClick={handleClearSelection} className="p-1 hover:bg-gray-700 rounded transition-colors flex items-center justify-center">

              <X className="w-5 h-5" />
            </button>
          </div>
        </div>}

      {/* Responses List */}
      <div className="flex-1 overflow-y-auto">
        {filteredResponses.length === 0 ? <EmptyState icon={MessageSquare} title={filterType === 'all' ? 'No canned responses' : 'No responses match this filter'} description={filterType === 'all' ? 'Create your first response to get started' : 'Try a different filter'} actionLabel={filterType === 'all' ? 'Create Response' : undefined} actionIcon={filterType === 'all' ? Plus : undefined} onAction={filterType === 'all' ? () => {
        setEditingResponse(null);
        setFormData({
          title: '',
          content: '',
          subject: '',
          includeSubject: false,
          autoAdd: false,
          autoReply: false,
          color: '#8B5CF6'
        });
        setShowModal(true);
      } : undefined} /> : <motion.div variants={container} initial="hidden" animate="show">
            {filteredResponses.map((response, index) => <motion.div key={response.id} variants={item} className={`flex items-center gap-4 px-4 md:px-6 py-4 md:py-5 ${index !== filteredResponses.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors cursor-pointer`} onClick={(e) => handleEdit(response.id, e)} onMouseEnter={() => setHoveredResponseId(response.id)} onMouseLeave={() => setHoveredResponseId(null)}>

                {showCheckboxes && <div onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedIds.has(response.id)} onChange={() => handleToggleSelect(response.id)} className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 focus:ring-2 cursor-pointer" />

                  </div>}

                {/* Left Border Accent */}
                <div className="w-1 h-12 rounded-full flex-shrink-0" style={{
            backgroundColor: response.color
          }} />


                <div className="flex-1 min-w-0">
                  {/* Response Name */}
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[15px] font-medium text-gray-900">
                      {response.name}
                    </h3>
                  </div>

                  {/* Response Content Preview */}
                  <div className="text-sm text-gray-500 line-clamp-1 mb-2">
                    {response.content}
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    {response.autoAdd && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                        Auto-Add
                      </span>}
                    {response.autoReply && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                        Auto-Reply
                      </span>}
                  </div>
                </div>

                {/* Action Buttons - Show on hover */}
                {hoveredResponseId === response.id && <motion.div initial={{
            opacity: 0,
            x: -10
          }} animate={{
            opacity: 1,
            x: 0
          }} className="flex items-center gap-1">

                    {/* Edit Button */}
                    <button onClick={(e) => handleEdit(response.id, e)} className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Edit response">

                      <Edit className="h-4 w-4 text-gray-400" />
                    </button>

                    {/* Delete Button */}
                    <button onClick={(e) => handleDelete(response.id, e)} className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Delete response">

                      <Trash2 className="h-4 w-4 text-gray-400" />
                    </button>
                  </motion.div>}
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

      {/* Add/Edit Canned Response Modal */}
      <AnimatePresence>
        {showModal && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className={`fixed inset-0 z-50 flex justify-center ${isExpanded ? 'items-stretch lg:items-end bg-white lg:bg-black/50 lg:backdrop-blur-sm' : 'items-end bg-black/50 backdrop-blur-sm'}`} onClick={isExpanded ? undefined : () => setShowModal(false)}>

            <motion.div initial={{
          y: '100%',
          opacity: 0,
          scale: 0.96
        }} animate={{
          y: 0,
          opacity: 1,
          scale: 1
        }} exit={{
          y: '100%',
          opacity: 0,
          scale: 0.96
        }} transition={{
          type: 'spring',
          damping: 28,
          stiffness: 300,
          mass: 0.5
        }} layout className={`w-full bg-white shadow-2xl overflow-hidden flex flex-col ${isExpanded ? 'lg:max-w-6xl lg:max-h-[90vh] lg:rounded-t-2xl max-h-screen rounded-none' : 'max-w-2xl max-h-[700px] rounded-t-2xl'}`} onClick={(e) => e.stopPropagation()}>

              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingResponse ? 'Edit Canned Response' : 'New Canned Response'}
                </h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title={isExpanded ? 'Minimize' : 'Maximize'}>

                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>
                  <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">

                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto">
                <div className={`p-6 ${isExpanded ? 'space-y-6' : 'space-y-3'}`}>

                  {/* Title Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm" placeholder="e.g., Welcome Message, Follow Up..." value={formData.title} onChange={(e) => setFormData({
                  ...formData,
                  title: e.target.value
                })} />

                  </div>

                  {/* Content Field with Rich Text Editor */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Content <span className="text-red-500">*</span>
                    </label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
                      {/* Toolbar */}
                      <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center gap-1">
                        <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded text-xs font-semibold transition-colors">
                          B
                        </button>
                        <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded text-xs font-semibold italic transition-colors">
                          I
                        </button>
                        <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded text-xs font-semibold underline transition-colors">
                          U
                        </button>
                        <div className="w-px h-4 bg-gray-300 mx-1" />
                        <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors">
                          <ImageIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors">
                          <Smile className="h-4 w-4" />
                        </button>
                      </div>
                      <textarea className={`w-full p-4 outline-none resize-none text-sm text-gray-800 leading-relaxed ${isExpanded ? 'min-h-[400px]' : 'min-h-[100px]'}`} placeholder="Type your canned response content here..." value={formData.content} onChange={(e) => setFormData({
                    ...formData,
                    content: e.target.value
                  })} />

                    </div>
                  </div>

                  {/* Subject Line Toggle & Input */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          Include Subject Line
                        </span>
                        <div className="group relative">
                          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                          <div className="absolute left-0 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity w-48 z-50">
                            Add a subject line when using this response for new
                            messages
                            <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input type="checkbox" checked={formData.includeSubject} onChange={(e) => setFormData({
                      ...formData,
                      includeSubject: e.target.checked
                    })} className="sr-only peer" />

                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>

                    {/* Subject Line Input - Conditionally Shown */}
                    <AnimatePresence>
                      {formData.includeSubject && <motion.div initial={{
                    height: 0,
                    opacity: 0
                  }} animate={{
                    height: 'auto',
                    opacity: 1
                  }} exit={{
                    height: 0,
                    opacity: 0
                  }} transition={{
                    duration: 0.2
                  }} className="overflow-hidden">

                          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm" placeholder="Enter subject line..." value={formData.subject} onChange={(e) => setFormData({
                      ...formData,
                      subject: e.target.value
                    })} />

                        </motion.div>}
                    </AnimatePresence>
                  </div>

                  {/* Color Picker */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <div className="relative">
                      <button onClick={() => setShowColorPicker(!showColorPicker)} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">

                        <div className="w-6 h-6 rounded border border-gray-300" style={{
                      backgroundColor: formData.color
                    }} />

                        <span className="text-sm text-gray-700">
                          {formData.color}
                        </span>
                      </button>

                      {showColorPicker && <>
                          <div className="fixed inset-0 z-10" onClick={() => setShowColorPicker(false)} />

                          <div className="absolute left-0 mt-2 p-3 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                            <div className="grid grid-cols-6 gap-2">
                              {['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#6366F1', '#8B5CF6', '#D946EF', '#06B6D4', '#14B8A6', '#84CC16', '#F97316', '#F43F5E', '#64748B', '#6B7280', '#78716C', '#57534E'].map((color) => <button key={color} onClick={() => {
                          setFormData({
                            ...formData,
                            color
                          });
                          setShowColorPicker(false);
                        }} className={`w-8 h-8 rounded transition-all hover:scale-110 ${formData.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`} style={{
                          backgroundColor: color
                        }} />)}
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <input type="text" value={formData.color} onChange={(e) => setFormData({
                          ...formData,
                          color: e.target.value
                        })} className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="#000000" />

                            </div>
                          </div>
                        </>}
                    </div>
                  </div>

                  {/* Toggles Side by Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Auto-Add Toggle */}
                    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          Auto-Add
                        </span>
                        <div className="group relative">
                          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                          <div className="absolute left-0 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity w-48 z-50">
                            Automatically add this response to new conversations
                            <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input type="checkbox" checked={formData.autoAdd} onChange={(e) => setFormData({
                      ...formData,
                      autoAdd: e.target.checked
                    })} className="sr-only peer" />

                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>

                    {/* Auto-Reply Toggle */}
                    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          Auto-Reply
                        </span>
                        <div className="group relative">
                          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                          <div className="absolute left-0 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity w-48 z-50">
                            Automatically send this response to new messages
                            <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input type="checkbox" checked={formData.autoReply} onChange={(e) => setFormData({
                      ...formData,
                      autoReply: e.target.checked
                    })} className="sr-only peer" />

                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-start">
                <button onClick={() => {
              // Handle save logic here
              console.log('Save:', formData);
              setShowModal(false);
            }} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">

                  <Save className="h-4 w-4" />
                  {editingResponse ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
}