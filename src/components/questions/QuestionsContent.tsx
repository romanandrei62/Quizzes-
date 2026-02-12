import React, {
  useEffect,
  useState,
  Children,
  Component,
  useRef,
  useCallback,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trash2,
  PenSquare,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  MoreVertical,
  Search,
  SlidersHorizontal,
  X,
  CheckSquare,
  Filter,
  Plus,
  Copy,
  ListChecks,
  MessageSquare,
  ToggleLeft,
  ArrowLeftRight,
  ChevronDown,
  Check,
  GitFork,
  Info,
  MonitorPlay,
} from 'lucide-react'
// Shared spinner matching the messaging app
function Spinner({
  className = 'h-4 w-4 text-teal-500',
}: {
  className?: string
}) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
import { QuestionItem } from './QuestionItem'
import { QuestionListSkeleton } from './QuestionListSkeleton'
import { MobileQuestionSkeleton } from './MobileQuestionSkeleton'
import { BulkEditBar } from './BulkEditBar'
import { BulkEditForm } from './BulkEditForm'
import { TableActionBar } from './TableActionBar'
import { Button } from '../ui/Button'
import { MobileListHeader } from './MobileListHeader'
import { BarsSortIcon } from '../messaging/BarsSortIcon'
interface Question {
  id: string
  title: string
  text?: string
  type: string
  category: string
  createdAt: Date
  status: 'active' | 'draft'
  description?: string
  options?: string[]
  matchSubType?: 'text' | 'image'
}
export const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    title: 'Platform Access',
    text: 'What should you do first after receiving access to the platform?',
    type: 'multiple',
    category: 'onboarding',
    createdAt: new Date('2024-01-15T10:30:00'),
    status: 'active',
    options: [
      'Complete your profile',
      'Explore the dashboard',
      'Contact support',
      'Invite team members',
    ],
  },
  {
    id: '2',
    title: 'User Experience Rating',
    text: 'Please describe your overall experience with our platform so far, including what you liked and what could be improved.',
    type: 'open',
    category: 'assessment',
    createdAt: new Date('2024-01-14T14:15:00'),
    status: 'active',
  },
  {
    id: '3',
    title: 'LMS Features',
    text: 'The LMS platform supports video content, interactive quizzes, and multimedia learning materials for comprehensive course delivery.',
    type: 'true-false',
    category: 'knowledge',
    createdAt: new Date('2024-01-13T09:45:00'),
    status: 'active',
  },
  {
    id: '4',
    title: 'Project Management Terms',
    text: 'Match the following project management terms with their corresponding definitions.',
    type: 'matching',
    category: 'knowledge',
    createdAt: new Date('2024-01-12T16:20:00'),
    status: 'active',
  },
  {
    id: '5',
    title: 'Identify the Icons',
    text: 'Match each icon image with its correct label.',
    type: 'matching',
    matchSubType: 'image',
    category: 'knowledge',
    createdAt: new Date('2024-01-11T11:00:00'),
    status: 'active',
  },
  {
    id: '6',
    title: 'Feature Priorities',
    text: 'Which features are most important to you when evaluating project management and collaboration tools for your organization?',
    type: 'multiple',
    category: 'assessment',
    createdAt: new Date('2024-01-10T08:30:00'),
    status: 'draft',
    options: [
      'Task automation',
      'Real-time collaboration',
      'Advanced reporting',
      'Mobile access',
    ],
  },
  {
    id: '7',
    title: 'Feature Requests',
    text: 'What specific improvements or new features would you like to see implemented in the platform to better serve your needs and enhance your experience?',
    type: 'open',
    category: 'assessment',
    createdAt: new Date('2024-01-09T13:45:00'),
    status: 'active',
  },
  {
    id: '8',
    title: 'Integration Capabilities',
    text: 'The system allows custom integrations with third-party applications, APIs, and external services to extend functionality and streamline workflows across your organization.',
    type: 'true-false',
    category: 'compliance',
    createdAt: new Date('2024-01-08T10:15:00'),
    status: 'active',
  },
  {
    id: '9',
    title: 'Discovery Channel',
    text: 'How did you first hear about our platform and what motivated you to sign up and start using our services for your business needs?',
    type: 'multiple',
    category: 'onboarding',
    createdAt: new Date('2024-01-07T15:30:00'),
    status: 'active',
    options: ['Social media', 'Search engine', 'Referral', 'Advertisement'],
  },
  {
    id: '10',
    title: 'Collaboration Tools',
    text: 'Match the following collaboration tools with their primary use cases and understand when to apply each one for maximum team efficiency and productivity.',
    type: 'matching',
    category: 'knowledge',
    createdAt: new Date('2024-01-06T09:00:00'),
    status: 'draft',
  },
  {
    id: '11',
    title: 'Role Identification',
    text: 'What is your current role within your organization and how does it relate to the use of project management and collaboration software?',
    type: 'multiple',
    category: 'onboarding',
    createdAt: new Date('2024-01-05T14:20:00'),
    status: 'active',
    options: ['Manager', 'Team Lead', 'Individual Contributor', 'Executive'],
  },
  {
    id: '12',
    title: 'Current Challenges',
    text: 'Please describe your biggest challenge with current tools and explain how you think a better solution could address these pain points effectively for your team.',
    type: 'open',
    category: 'assessment',
    createdAt: new Date('2024-01-04T11:45:00'),
    status: 'draft',
  },
  {
    id: '13',
    title: 'Data Privacy Policy',
    text: 'The platform supports single sign-on (SSO) authentication, multi-factor authentication, and enterprise-grade security features for user access control and data protection.',
    type: 'true-false',
    category: 'compliance',
    createdAt: new Date('2024-01-03T16:10:00'),
    status: 'active',
  },
  {
    id: '14',
    title: 'Team Size',
    text: 'How many team members in your organization will be using the platform on a regular basis for their daily work and collaboration activities?',
    type: 'multiple',
    category: 'onboarding',
    createdAt: new Date('2024-01-02T10:30:00'),
    status: 'active',
    options: ['1-5', '6-20', '21-50', '50+'],
  },
  {
    id: '15',
    title: 'Enhancement Suggestions',
    text: 'What additional features, integrations, or capabilities would significantly enhance your experience and make the platform more valuable for your specific use case and business requirements?',
    type: 'open',
    category: 'assessment',
    createdAt: new Date('2024-01-01T13:00:00'),
    status: 'draft',
  },
]
const sortOptions = [
  { id: 'created_desc', label: 'Newest first' },
  { id: 'created_asc', label: 'Oldest first' },
  { id: 'title_asc', label: 'A → Z' },
  { id: 'title_desc', label: 'Z → A' },
]
const mobileFilterOptions = [
  { id: 'all', label: 'All', icon: Eye },
  { id: 'published', label: 'Published', icon: Eye },
  { id: 'draft', label: 'Drafts', icon: EyeOff },
]
interface QuestionsContentProps {
  selectedType: string
  selectedCategory: string
  activeTab: 'questions' | 'quizzes'
  onTabChange: (tab: 'questions' | 'quizzes') => void
  selectedQuestion: Question | null
  onSelectQuestion: (
    question: Question,
    defaultTab?: 'info' | 'edit' | 'preview',
  ) => void
  questions?: Question[]
  setQuestions?: React.Dispatch<React.SetStateAction<Question[]>>
  draftOfPublishedIds?: Set<string>
  onDeleteQuestion?: (questionId: string) => void
  publishedVersionMap?: Map<string, string>
  onOpenMobileFilters?: () => void
  onCreateQuestion?: () => void
}
// Mobile Question Card Component - POLISHED
function MobileQuestionCard({
  question,
  isSelected,
  onClick,
  onAction,
  isDraftOfPublished,
}: {
  question: Question
  isSelected: boolean
  onClick: () => void
  onAction: (action: string) => void
  isDraftOfPublished: boolean
}) {
  const CATEGORY_CONFIG: Record<
    string,
    {
      label: string
      color: string
    }
  > = {
    knowledge: {
      label: 'Knowledge Check',
      color: '#3B82F6',
    },
    compliance: {
      label: 'Compliance',
      color: '#10B981',
    },
    onboarding: {
      label: 'Onboarding',
      color: '#1F2937',
    },
    assessment: {
      label: 'Assessment',
      color: '#6B21A8',
    },
    all: {
      label: 'All',
      color: '#6B7280',
    },
  }
  const TYPE_ICON_MAP: Record<
    string,
    {
      icon: React.ElementType
      label: string
    }
  > = {
    multiple: { icon: ListChecks, label: 'Multiple Choice' },
    open: { icon: MessageSquare, label: 'Open Answer' },
    'true-false': { icon: ToggleLeft, label: 'True/False' },
    matching: { icon: ArrowLeftRight, label: 'Matching' },
  }
  const categoryConfig =
    CATEGORY_CONFIG[question.category] || CATEGORY_CONFIG.all
  const typeConfig = TYPE_ICON_MAP[question.type] || TYPE_ICON_MAP.multiple
  const TypeIcon = typeConfig.icon
  const isPublished = question.status === 'active'
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={`relative bg-white rounded-xl border transition-all cursor-pointer active:scale-[0.98] ${isSelected ? 'border-gray-900 shadow-lg ring-2 ring-gray-900/5' : 'border-gray-200 active:border-gray-300 shadow-sm'}`}
      onClick={onClick}
    >
      <div className="px-4 pr-4 py-3.5">
        {/* Title row */}
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-1 flex-1 min-w-0">
            {question.title}
          </h3>
          {/* Status indicator */}
          <div className="relative flex-shrink-0">
            <div
              className={`flex items-center justify-center w-5 h-5 rounded-full ${isDraftOfPublished ? 'bg-emerald-50 text-emerald-500' : isPublished ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}
            >
              {isDraftOfPublished || isPublished ? (
                <Eye className="w-3 h-3" />
              ) : (
                <EyeOff className="w-3 h-3" />
              )}
            </div>
            {isDraftOfPublished && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 border border-white" />
            )}
          </div>
        </div>

        {/* Question preview text */}
        {question.text && (
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
            {question.text}
          </p>
        )}

        {/* Bottom row - metadata icons left, action icons right */}
        <div
          className="flex items-center pt-2.5 border-t border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left: category dot + type icon */}
          <div className="flex items-center gap-2 flex-1">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-black/5"
              style={{ backgroundColor: categoryConfig.color }}
              title={categoryConfig.label}
            />
            <div
              className="flex items-center justify-center w-6 h-6 rounded-md bg-gray-50 text-gray-400"
              title={typeConfig.label}
            >
              <TypeIcon className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Right: action icons */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => onAction('view')}
              className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors active:scale-90"
              title="Info"
            >
              <Info className="w-[14px] h-[14px]" />
            </button>
            <button
              onClick={() => onAction('preview')}
              className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors active:scale-90"
              title="Preview"
            >
              <MonitorPlay className="w-[14px] h-[14px]" />
            </button>
            <button
              onClick={() => onAction('edit')}
              className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors active:scale-90"
              title="Edit"
            >
              <PenSquare className="w-[14px] h-[14px]" />
            </button>
            <button
              onClick={() => onAction('fork')}
              className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors active:scale-90"
              title="Fork"
            >
              <GitFork className="w-[14px] h-[14px]" />
            </button>
            <button
              onClick={() => onAction('delete')}
              className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors active:scale-90"
              title="Delete"
            >
              <Trash2 className="w-[14px] h-[14px]" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
function MobileListHeader({
  searchQuery,
  onSearchChange,
  filterBy,
  onFilterChange,
  sortBy,
  onSortChange,
  onOpenSidebarFilters,
  questionCount,
  showCheckboxes,
  onToggleCheckboxes,
  onCreateQuestion,
}: {
  searchQuery: string
  onSearchChange: (val: string) => void
  filterBy: string
  onFilterChange: (id: string) => void
  sortBy: string
  onSortChange: (id: string) => void
  onOpenSidebarFilters?: () => void
  questionCount: number
  showCheckboxes?: boolean
  onToggleCheckboxes?: () => void
  onCreateQuestion?: () => void
}) {
  const [showSearch, setShowSearch] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  return (
    <div className="lg:hidden flex-shrink-0">
      {/* Main row */}
      <div className="px-4 py-2.5 flex items-center gap-2 border-b border-gray-100 bg-white">
        {/* Left side: sidebar filter icon */}
        <div className="flex items-center flex-1 min-w-0">
          {onOpenSidebarFilters && (
            <button
              onClick={onOpenSidebarFilters}
              className="p-1.5 -ml-1 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors active:scale-95"
              title="Type & Category"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>
        {/* Right side: action icons */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => {
              setShowSearch(!showSearch)
              setShowSort(false)
              setShowFilter(false)
            }}
            className={`p-2 rounded-lg transition-colors ${showSearch ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}
          >
            <Search className="w-4 h-4" />
          </button>
          <div className="relative">
            <button
              onClick={() => {
                setShowFilter(!showFilter)
                setShowSort(false)
                setShowSearch(false)
              }}
              className={`p-2 rounded-lg transition-colors ${showFilter || filterBy !== 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <Filter className="w-4 h-4" />
              {filterBy !== 'all' && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-teal-500" />
              )}
            </button>
            <AnimatePresence>
              {showFilter && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowFilter(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-40"
                  >
                    {mobileFilterOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          onFilterChange(opt.id)
                          setShowFilter(false)
                        }}
                        className={`w-full px-3 py-2 text-left text-[13px] flex items-center gap-2 transition-colors ${filterBy === opt.id ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        <opt.icon
                          className={`w-3.5 h-3.5 ${filterBy === opt.id ? 'text-teal-600' : 'text-gray-400'}`}
                        />
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowSort(!showSort)
                setShowFilter(false)
                setShowSearch(false)
              }}
              className={`p-2 rounded-lg transition-colors ${showSort ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <BarsSortIcon className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showSort && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowSort(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-40"
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          onSortChange(opt.id)
                          setShowSort(false)
                        }}
                        className={`w-full px-3 py-2 text-left text-[13px] transition-colors ${sortBy === opt.id ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          {/* Checkbox / Bulk Edit Toggle */}
          {onToggleCheckboxes && (
            <button
              onClick={onToggleCheckboxes}
              className={`p-2 rounded-lg transition-colors ${showCheckboxes ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}
              title={showCheckboxes ? 'Hide checkboxes' : 'Show checkboxes'}
            >
              <CheckSquare className="w-4 h-4" />
            </button>
          )}
          {/* Create Question Button */}
          {onCreateQuestion && (
            <button
              onClick={onCreateQuestion}
              className="ml-1 w-8 h-8 flex items-center justify-center rounded-lg bg-teal-500 text-white shadow-sm active:scale-95 transition-all hover:bg-teal-600"
              title="Create question"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
      {/* Expandable search */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 py-2.5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export function QuestionsContent({
  selectedType,
  selectedCategory,
  activeTab,
  onTabChange,
  selectedQuestion,
  onSelectQuestion,
  questions: propsQuestions,
  setQuestions: propsSetQuestions,
  draftOfPublishedIds = new Set(),
  onDeleteQuestion,
  publishedVersionMap = new Map(),
  onOpenMobileFilters,
  onCreateQuestion,
}: QuestionsContentProps) {
  const [localQuestions, setLocalQuestions] =
    useState<Question[]>(MOCK_QUESTIONS)
  // Use props questions if provided, otherwise use local state
  const questions = propsQuestions || localQuestions
  const setQuestions = propsSetQuestions || setLocalQuestions
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('created_desc')
  const [filterBy, setFilterBy] = useState('all')
  const [showCheckboxes, setShowCheckboxes] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false)
  const [pendingEditQuestion, setPendingEditQuestion] =
    useState<Question | null>(null)
  const [visibleQuestionCount, setVisibleQuestionCount] = useState(10)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const isLoadingMoreRef = useRef(false)
  const desktopSentinelRef = useRef<HTMLDivElement>(null)
  const desktopScrollRef = useRef<HTMLDivElement>(null)
  const mobileSentinelRef = useRef<HTMLDivElement>(null)
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  // Pagination state (simulated)
  const totalItems = questions.length
  const currentPageItems = questions
  const allCurrentPageSelected = currentPageItems.every((item) =>
    selectedIds.has(item.id),
  )
  const someCurrentPageSelected =
    currentPageItems.some((item) => selectedIds.has(item.id)) &&
    !allCurrentPageSelected
  const allPagesSelected = selectedIds.size === totalItems
  // Simulate initial load
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [selectedType, selectedCategory])
  // Filter questions by search query, type, category, and status
  const filteredQuestions = questions
    .filter((q) => {
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.text?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === 'all' || q.type === selectedType
      const matchesCategory =
        selectedCategory === 'all' || q.category === selectedCategory
      const isDraftOfPublished = draftOfPublishedIds.has(q.id)
      const matchesFilter =
        filterBy === 'all' ||
        (filterBy === 'published' &&
          q.status === 'active' &&
          !isDraftOfPublished) ||
        (filterBy === 'draft' && (q.status === 'draft' || isDraftOfPublished))
      return matchesSearch && matchesType && matchesCategory && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'created_desc':
          return b.createdAt.getTime() - a.createdAt.getTime()
        case 'created_asc':
          return a.createdAt.getTime() - b.createdAt.getTime()
        case 'title_asc':
          return a.title.localeCompare(b.title)
        case 'title_desc':
          return b.title.localeCompare(a.title)
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })
  const visibleQuestions = filteredQuestions.slice(0, visibleQuestionCount)
  const hasMoreQuestions = visibleQuestionCount < filteredQuestions.length
  const allQuestionsLoaded =
    !hasMoreQuestions &&
    filteredQuestions.length > 0 &&
    visibleQuestionCount >= filteredQuestions.length &&
    !isLoading
  const loadMoreQuestions = useCallback(() => {
    if (isLoadingMoreRef.current) return
    isLoadingMoreRef.current = true
    setIsLoadingMore(true)
    setTimeout(() => {
      setVisibleQuestionCount((prev) =>
        Math.min(prev + 10, filteredQuestions.length),
      )
      isLoadingMoreRef.current = false
      setIsLoadingMore(false)
    }, 600)
  }, [filteredQuestions.length])
  // Reset visible count when filters change
  useEffect(() => {
    setVisibleQuestionCount(10)
  }, [selectedType, selectedCategory, searchQuery, sortBy, filterBy])
  // Auto-load on scroll - desktop
  useEffect(() => {
    const sentinel = desktopSentinelRef.current
    const container = desktopScrollRef.current
    if (!sentinel || !container || !hasMoreQuestions || isLoading) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMoreRef.current) {
          loadMoreQuestions()
        }
      },
      { root: container, threshold: 0 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMoreQuestions, loadMoreQuestions, isLoading])
  // Auto-load on scroll - mobile
  useEffect(() => {
    const sentinel = mobileSentinelRef.current
    const container = mobileScrollRef.current
    if (!sentinel || !container || !hasMoreQuestions || isLoading) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMoreRef.current) {
          loadMoreQuestions()
        }
      },
      { root: container, threshold: 0 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMoreQuestions, loadMoreQuestions, isLoading])
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }
  const handleToggleSelectAll = () => {
    if (
      allCurrentPageSelected &&
      selectedIds.size === currentPageItems.length
    ) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(currentPageItems.map((item) => item.id)))
    }
  }
  const handleSelectAllOnPage = () => {
    setSelectedIds(new Set(currentPageItems.map((item) => item.id)))
  }
  const handleSelectAllPages = () => {
    const allIds = new Set<string>()
    for (let i = 1; i <= totalItems; i++) {
      allIds.add(i.toString())
    }
    setSelectedIds(allIds)
  }
  const handleClearSelection = () => {
    setSelectedIds(new Set())
  }
  const handleToggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes)
    if (showCheckboxes) {
      setSelectedIds(new Set())
    }
  }
  const handleSaveBulkEdit = (updates: {
    category?: string
    status?: string
  }) => {
    console.log('Bulk edit saved:', updates)
  }
  const handleSetActive = () => {
    console.log('Set active for:', Array.from(selectedIds))
  }
  const handleSetInactive = () => {
    console.log('Set inactive for:', Array.from(selectedIds))
  }
  const handleSortChange = (sortId: string) => {
    setSortBy(sortId)
  }
  const handleFilterChange = (filterId: string) => {
    setFilterBy(filterId)
  }
  const handleQuestionAction = (questionId: string, action: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (!question) return
    switch (action) {
      case 'view':
        // Open the question in view/info mode
        onSelectQuestion(question, 'info')
        break
      case 'preview':
        // Open the question in preview mode
        onSelectQuestion(question, 'preview')
        break
      case 'edit':
        // For published questions, show warning before opening
        if (question.status === 'active') {
          setPendingEditQuestion(question)
        } else {
          onSelectQuestion(question, 'edit')
        }
        break
      case 'fork':
        // Fork: create an independent copy detached from quizzes
        const forked: Question = {
          ...question,
          id: `fork-${Date.now()}`,
          title: `${question.title} (Fork)`,
          status: 'draft',
          createdAt: new Date(),
          options: question.options ? [...question.options] : undefined,
          matchSubType: question.matchSubType,
        }
        setQuestions([forked, ...questions])
        // Open the fork in edit mode immediately
        setTimeout(() => onSelectQuestion(forked, 'edit'), 100)
        break
      case 'delete':
        // Show delete confirmation modal
        setDeleteConfirmId(questionId)
        break
    }
  }
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }
  const item = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  }
  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
      {/* Bulk Delete Confirmation Dialog */}
      <AnimatePresence>
        {bulkDeleteConfirm &&
          (() => {
            const total = selectedIds.size
            return (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.15,
                }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
                onClick={() => setBulkDeleteConfirm(false)}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: 4,
                  }}
                  transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 400,
                  }}
                  className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 mx-4 max-w-sm w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Delete {total} question{total !== 1 ? 's' : ''}?
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                      The selected question{total !== 1 ? 's' : ''} will be{' '}
                      <span className="font-medium text-gray-700">
                        permanently removed
                      </span>
                      , including any quiz associations. This action cannot be
                      undone.
                    </p>
                    <div className="flex items-center gap-3 w-full">
                      <Button
                        variant="secondary"
                        onClick={() => setBulkDeleteConfirm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          const idsToDelete = Array.from(selectedIds)
                          if (onDeleteQuestion) {
                            idsToDelete.forEach((id) => onDeleteQuestion(id))
                          } else {
                            setQuestions(
                              questions.filter((q) => !selectedIds.has(q.id)),
                            )
                          }
                          setSelectedIds(new Set())
                          setBulkDeleteConfirm(false)
                        }}
                        leftIcon={<Trash2 className="w-4 h-4" />}
                        className="flex-1"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })()}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteConfirmId &&
          (() => {
            const questionToDelete = questions.find(
              (q) => q.id === deleteConfirmId,
            )
            const isPublishedQuestion = questionToDelete?.status === 'active'
            const isDraftOfPublished = draftOfPublishedIds.has(deleteConfirmId)
            return (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.15,
                }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
                onClick={() => setDeleteConfirmId(null)}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: 4,
                  }}
                  transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 400,
                  }}
                  className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 mx-4 max-w-sm w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isDraftOfPublished ? 'bg-amber-50' : 'bg-red-50'}`}
                    >
                      {isDraftOfPublished ? (
                        <ArrowLeft className="w-5 h-5 text-amber-500" />
                      ) : (
                        <Trash2 className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {isDraftOfPublished
                        ? 'Discard draft changes?'
                        : isPublishedQuestion
                          ? 'Delete published question?'
                          : 'Delete this question?'}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                      {isDraftOfPublished ? (
                        <>
                          Your draft edits will be discarded. The{' '}
                          <span className="font-medium text-gray-700">
                            published version
                          </span>{' '}
                          will be restored and remain live and unchanged.
                        </>
                      ) : isPublishedQuestion ? (
                        <>
                          This question will be{' '}
                          <span className="font-medium text-gray-700">
                            permanently deleted
                          </span>{' '}
                          and{' '}
                          <span className="font-medium text-gray-700">
                            removed from all quizzes
                          </span>{' '}
                          that use it. This action cannot be undone.
                        </>
                      ) : (
                        'This draft will be permanently removed. This action cannot be undone.'
                      )}
                    </p>
                    <div className="flex items-center gap-3 w-full">
                      <Button
                        variant="secondary"
                        onClick={() => setDeleteConfirmId(null)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      {isDraftOfPublished ? (
                        <Button
                          variant="secondary"
                          onClick={() => {
                            if (onDeleteQuestion) {
                              onDeleteQuestion(deleteConfirmId)
                            }
                            setDeleteConfirmId(null)
                          }}
                          leftIcon={<ArrowLeft className="w-4 h-4" />}
                          className="flex-1 !bg-amber-500 !text-white !border-amber-500 hover:!bg-amber-600 !shadow-md"
                        >
                          Discard Draft
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => {
                            if (onDeleteQuestion) {
                              onDeleteQuestion(deleteConfirmId)
                            } else {
                              setQuestions(
                                questions.filter(
                                  (q) => q.id !== deleteConfirmId,
                                ),
                              )
                            }
                            if (selectedQuestion?.id === deleteConfirmId) {
                              onSelectQuestion(null as any)
                            }
                            setDeleteConfirmId(null)
                          }}
                          leftIcon={<Trash2 className="w-4 h-4" />}
                          className="flex-1"
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })()}
      </AnimatePresence>

      {/* Edit Published Warning Dialog */}
      <AnimatePresence>
        {pendingEditQuestion && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.15,
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
            onClick={() => setPendingEditQuestion(null)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 4,
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 400,
              }}
              className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 mx-4 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                  <PenSquare className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Edit published question?
                </h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  A new{' '}
                  <span className="font-medium text-gray-700">
                    draft version
                  </span>{' '}
                  will be created for editing. The currently published version
                  will remain{' '}
                  <span className="font-medium text-gray-700">
                    live and unchanged
                  </span>{' '}
                  until you publish the new draft.
                </p>
                <div className="flex items-center gap-3 w-full">
                  <Button
                    variant="secondary"
                    onClick={() => setPendingEditQuestion(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      const q = pendingEditQuestion
                      setPendingEditQuestion(null)
                      onSelectQuestion(q, 'edit')
                    }}
                    leftIcon={<Save className="w-4 h-4" />}
                    className="flex-1 !bg-amber-500 !text-white !border-amber-500 hover:!bg-amber-600 !shadow-md"
                  >
                    Create Draft
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Edit Form */}
      {showEditForm && (
        <BulkEditForm
          selectedCount={selectedIds.size}
          onClose={() => setShowEditForm(false)}
          onSave={handleSaveBulkEdit}
        />
      )}

      {/* Table Action Bar - Desktop only */}
      <div className="hidden lg:block">
        <TableActionBar
          showSearch={true}
          searchPlaceholder="Search questions..."
          onSearch={setSearchQuery}
          showFilter={true}
          onFilter={handleFilterChange}
          showSort={true}
          onSort={handleSortChange}
          showCheckboxToggle={true}
          checkboxesVisible={showCheckboxes}
          onToggleCheckboxes={handleToggleCheckboxes}
          showItemsPerPage={true}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={[10, 25, 50]}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Mobile Header - integrated search, filter, sort */}
      <MobileListHeader
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val)
        }}
        filterBy={filterBy}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onOpenSidebarFilters={onOpenMobileFilters}
        questionCount={filteredQuestions.length}
        showCheckboxes={showCheckboxes}
        onToggleCheckboxes={handleToggleCheckboxes}
      />

      {/* Bulk Edit Bar */}
      <AnimatePresence mode="wait">
        {selectedIds.size > 0 && showCheckboxes && (
          <BulkEditBar
            selectedCount={selectedIds.size}
            totalCount={totalItems}
            currentPageCount={currentPageItems.length}
            allPagesSelected={allPagesSelected}
            allCurrentPageSelected={allCurrentPageSelected}
            someCurrentPageSelected={someCurrentPageSelected}
            onClose={handleClearSelection}
            onEdit={() => setShowEditForm(true)}
            onDelete={() => setBulkDeleteConfirm(true)}
            onSelectAllPages={handleSelectAllPages}
            onSelectCurrentPageOnly={handleSelectAllOnPage}
            onToggleSelectAll={handleToggleSelectAll}
          />
        )}
      </AnimatePresence>

      {/* Content Area - Desktop Table View (hidden on mobile) */}
      <div
        ref={desktopScrollRef}
        className="hidden lg:flex flex-col flex-1 overflow-y-auto"
        style={{
          paddingRight: '8px',
        }}
      >
        {isLoading ? (
          <QuestionListSkeleton count={8} />
        ) : filteredQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <h3 className="text-xl font-normal text-gray-700 mb-3">
              Ready to get started?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6 max-w-md">
              When an item is added, you will see it displayed here
            </p>
            <div className="w-48 h-48 opacity-40 mt-8">
              <img
                src="https://mirrorful-production.s3.us-west-1.amazonaws.com/patterns/assets/j1am4da8tkyi1orwtnyckn/41336168-95e4-4b1e-83cd-1ba2c4d49ff5/image.png"
                alt="Empty state"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col min-h-full">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="divide-y divide-gray-100"
            >
              {visibleQuestions.map((question) => (
                <motion.div key={question.id} variants={item}>
                  <QuestionItem
                    question={question}
                    isHovered={hoveredId === question.id}
                    isSelected={selectedQuestion?.id === question.id}
                    onMouseEnter={() => setHoveredId(question.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => onSelectQuestion(question)}
                    showCheckbox={showCheckboxes}
                    isChecked={selectedIds.has(question.id)}
                    onCheckboxChange={() => handleToggleSelect(question.id)}
                    onAction={(action) =>
                      handleQuestionAction(question.id, action)
                    }
                    isDraftOfPublished={draftOfPublishedIds.has(question.id)}
                    onViewPublished={() => {
                      const publishedId = publishedVersionMap.get(question.id)
                      if (publishedId) {
                        const publishedQuestion = questions.find(
                          (q) => q.id === publishedId,
                        )
                        if (publishedQuestion) {
                          onSelectQuestion(publishedQuestion, 'info')
                        }
                      }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
            {hasMoreQuestions && (
              <div ref={desktopSentinelRef} className="h-4" />
            )}
            {/* Spacer to push the bar to the bottom */}
            <div className="flex-1" />
            {/* Sticky Show More bar - Desktop */}
            <div className="flex-shrink-0 sticky bottom-0 border-t border-gray-200 bg-white">
              {isLoadingMore ? (
                <div className="flex items-center gap-2 px-6 py-2">
                  <Spinner className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">Loading…</span>
                </div>
              ) : hasMoreQuestions ? (
                <button
                  onClick={loadMoreQuestions}
                  className="w-full flex items-center gap-1.5 px-6 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ChevronDown className="w-3 h-3" />
                  <span>
                    Show more ({filteredQuestions.length - visibleQuestionCount}
                    )
                  </span>
                </button>
              ) : (
                <div className="flex items-center px-6 py-2 text-xs text-gray-400">
                  <span>{filteredQuestions.length} questions loaded</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Card View (shown only on mobile) - POLISHED */}
      <div
        ref={mobileScrollRef}
        className="lg:hidden flex-1 overflow-y-auto bg-gray-50 relative"
      >
        {isLoading ? (
          <MobileQuestionSkeleton count={5} />
        ) : filteredQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="w-24 h-24 opacity-30 mb-4">
              <img
                src="https://mirrorful-production.s3.us-west-1.amazonaws.com/patterns/assets/j1am4da8tkyi1orwtnyckn/41336168-95e4-4b1e-83cd-1ba2c4d49ff5/image.png"
                alt="Empty state"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              No questions yet
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              Tap the + button to create your first question
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3 pb-4">
            {visibleQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                }}
              >
                <MobileQuestionCard
                  question={question}
                  isSelected={selectedQuestion?.id === question.id}
                  onClick={() => onSelectQuestion(question)}
                  onAction={(action) =>
                    handleQuestionAction(question.id, action)
                  }
                  isDraftOfPublished={draftOfPublishedIds.has(question.id)}
                />
              </motion.div>
            ))}
            {hasMoreQuestions && (
              <div ref={mobileSentinelRef} className="h-4" />
            )}
            {/* Show more bar - Mobile */}
            {isLoadingMore ? (
              <div className="w-full flex items-center justify-center py-3">
                <Spinner className="h-4 w-4 text-gray-400" />
              </div>
            ) : hasMoreQuestions ? (
              <button
                onClick={loadMoreQuestions}
                className="w-full flex items-center gap-1.5 px-4 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronDown className="w-3 h-3" />
                <span>
                  Show more ({filteredQuestions.length - visibleQuestionCount})
                </span>
              </button>
            ) : null}
          </div>
        )}

        {/* Floating Action Button - Create Question */}
        {onCreateQuestion && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 300,
              delay: 0.3,
            }}
            onClick={onCreateQuestion}
            className="fixed bottom-6 right-6 w-[52px] h-[52px] flex items-center justify-center rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/30 active:scale-90 transition-transform z-30 lg:hidden"
            title="Create question"
          >
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </motion.button>
        )}
      </div>
    </div>
  )
}
