import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  Children,
  Component } from
'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  PenSquare,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  Search,
  SlidersHorizontal,
  X,
  CheckSquare,
  Filter,
  Plus,
  ChevronDown,
  GitFork,
  Info,
  HelpCircle,
  Layers,
  FileText,
  CheckCircle,
  Archive,
  MonitorPlay } from
'lucide-react';
import { QuizItem } from './QuizItem';
import { QuestionListSkeleton } from '../questions/QuestionListSkeleton';
import { MobileQuestionSkeleton } from '../questions/MobileQuestionSkeleton';
import { BulkEditBar } from '../questions/BulkEditBar';
import { BulkEditForm } from '../questions/BulkEditForm';
import { TableActionBar } from '../questions/TableActionBar';
import { Button } from '../ui/Button';
import { BarsSortIcon } from '../messaging/BarsSortIcon';
// Shared spinner
function Spinner({
  className = 'h-4 w-4 text-teal-500'


}: {className?: string;}) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none">
      
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none" />
      
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      
    </svg>);

}
interface Quiz {
  id: string;
  title: string;
  numQuestions: number;
  passingScore: number;
  category: string;
  scoreDisplay: boolean;
  hints: boolean;
  showPercentComplete: boolean;
  showNumQuestions: boolean;
  showProgressBar: boolean;
  status: 'draft' | 'published' | 'archived';
  description?: string;
  createdAt: Date;
}
const MOCK_QUIZZES: Quiz[] = [
{
  id: '1',
  title: 'Platform Onboarding Quiz',
  numQuestions: 5,
  passingScore: 75,
  category: 'onboarding',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'published',
  description: 'Introduction to our platform features',
  createdAt: new Date('2024-01-15T10:30:00')
},
{
  id: '2',
  title: 'Customer Satisfaction Survey',
  numQuestions: 8,
  passingScore: 75,
  category: 'assessment',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'draft',
  description: 'Gather feedback from customers',
  createdAt: new Date('2024-01-14T14:15:00')
},
{
  id: '3',
  title: 'LMS Course Assessment',
  numQuestions: 12,
  passingScore: 80,
  category: 'knowledge-check',
  scoreDisplay: true,
  hints: true,
  showPercentComplete: true,
  showNumQuestions: true,
  showProgressBar: true,
  status: 'published',
  description: 'Final assessment for LMS course completion',
  createdAt: new Date('2024-01-13T09:45:00')
},
{
  id: '4',
  title: 'Feature Testing Quiz',
  numQuestions: 6,
  passingScore: 70,
  category: 'technical-skills',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'draft',
  description: 'Test new feature understanding',
  createdAt: new Date('2024-01-12T16:20:00')
},
{
  id: '5',
  title: 'Product Knowledge Test',
  numQuestions: 15,
  passingScore: 85,
  category: 'product-knowledge',
  scoreDisplay: true,
  hints: false,
  showPercentComplete: true,
  showNumQuestions: true,
  showProgressBar: true,
  status: 'archived',
  description: 'Comprehensive product knowledge assessment',
  createdAt: new Date('2024-01-11T11:00:00')
},
{
  id: '6',
  title: 'User Experience Evaluation',
  numQuestions: 10,
  passingScore: 75,
  category: 'assessment',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'published',
  description: 'Evaluate user experience quality',
  createdAt: new Date('2024-01-10T08:30:00')
},
{
  id: '7',
  title: 'Technical Skills Assessment',
  numQuestions: 20,
  passingScore: 90,
  category: 'technical-skills',
  scoreDisplay: true,
  hints: false,
  showPercentComplete: true,
  showNumQuestions: true,
  showProgressBar: true,
  status: 'published',
  description: 'Advanced technical skills evaluation',
  createdAt: new Date('2024-01-09T13:45:00')
},
{
  id: '8',
  title: 'New Employee Orientation',
  numQuestions: 7,
  passingScore: 75,
  category: 'onboarding',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'draft',
  description: 'Orientation quiz for new hires',
  createdAt: new Date('2024-01-08T10:15:00')
},
{
  id: '9',
  title: 'Compliance Training Quiz',
  numQuestions: 15,
  passingScore: 100,
  category: 'compliance',
  scoreDisplay: true,
  hints: false,
  showPercentComplete: true,
  showNumQuestions: true,
  showProgressBar: true,
  status: 'published',
  description: 'Mandatory compliance training assessment',
  createdAt: new Date('2024-01-07T15:30:00')
},
{
  id: '10',
  title: 'Safety Procedures Test',
  numQuestions: 12,
  passingScore: 95,
  category: 'safety-training',
  scoreDisplay: true,
  hints: false,
  showPercentComplete: true,
  showNumQuestions: true,
  showProgressBar: true,
  status: 'published',
  description: 'Workplace safety procedures assessment',
  createdAt: new Date('2024-01-06T09:00:00')
},
{
  id: '11',
  title: 'Leadership Skills Quiz',
  numQuestions: 10,
  passingScore: 80,
  category: 'leadership',
  scoreDisplay: true,
  hints: true,
  showPercentComplete: true,
  showNumQuestions: true,
  showProgressBar: true,
  status: 'draft',
  description: 'Assess leadership competencies',
  createdAt: new Date('2024-01-05T14:20:00')
},
{
  id: '12',
  title: 'Customer Service Excellence',
  numQuestions: 8,
  passingScore: 85,
  category: 'customer-service',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'published',
  description: 'Customer service best practices',
  createdAt: new Date('2024-01-04T11:45:00')
},
{
  id: '13',
  title: 'Data Privacy Fundamentals',
  numQuestions: 10,
  passingScore: 90,
  category: 'data-privacy',
  scoreDisplay: true,
  hints: false,
  showPercentComplete: true,
  showNumQuestions: true,
  showProgressBar: true,
  status: 'published',
  description: 'Data privacy and protection basics',
  createdAt: new Date('2024-01-03T16:10:00')
},
{
  id: '14',
  title: 'Project Management Basics',
  numQuestions: 12,
  passingScore: 75,
  category: 'project-management',
  scoreDisplay: true,
  hints: true,
  showPercentComplete: true,
  showNumQuestions: true,
  showProgressBar: true,
  status: 'archived',
  description: 'Introduction to project management',
  createdAt: new Date('2024-01-02T10:30:00')
},
{
  id: '15',
  title: 'Communication Skills Assessment',
  numQuestions: 8,
  passingScore: 80,
  category: 'communication',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'draft',
  description: 'Evaluate communication effectiveness',
  createdAt: new Date('2024-01-01T13:00:00')
}];

const sortOptions = [
{
  id: 'created_desc',
  label: 'Newest first'
},
{
  id: 'created_asc',
  label: 'Oldest first'
},
{
  id: 'title_asc',
  label: 'A → Z'
},
{
  id: 'title_desc',
  label: 'Z → A'
}];

const mobileFilterOptions = [
{
  id: 'all',
  label: 'All',
  icon: Layers
},
{
  id: 'published',
  label: 'Published',
  icon: Eye
},
{
  id: 'draft',
  label: 'Draft',
  icon: EyeOff
},
{
  id: 'archived',
  label: 'Archived',
  icon: Archive
}];

const CATEGORY_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
  }> =
{
  'knowledge-check': {
    label: 'Knowledge Check',
    color: '#3B82F6'
  },
  compliance: {
    label: 'Compliance',
    color: '#10B981'
  },
  onboarding: {
    label: 'Onboarding',
    color: '#1F2937'
  },
  assessment: {
    label: 'Assessment',
    color: '#6B21A8'
  },
  'safety-training': {
    label: 'Safety Training',
    color: '#EF4444'
  },
  'product-knowledge': {
    label: 'Product Knowledge',
    color: '#F59E0B'
  },
  leadership: {
    label: 'Leadership',
    color: '#EC4899'
  },
  communication: {
    label: 'Communication',
    color: '#14B8A6'
  },
  'technical-skills': {
    label: 'Technical Skills',
    color: '#0EA5E9'
  },
  'customer-service': {
    label: 'Customer Service',
    color: '#D946EF'
  },
  'data-privacy': {
    label: 'Data Privacy',
    color: '#06B6D4'
  },
  'project-management': {
    label: 'Project Management',
    color: '#3B82F6'
  },
  all: {
    label: 'All',
    color: '#6B7280'
  }
};
interface QuizzesContentProps {
  selectedStatus: string;
  selectedCategory: string;
  selectedQuiz: Quiz | null;
  onSelectQuiz: (quiz: Quiz) => void;
  onOpenMobileFilters?: () => void;
  onCreateQuiz?: () => void;
}
// Mobile Quiz Card Component
function MobileQuizCard({
  quiz,
  isSelected,
  onClick,
  onAction





}: {quiz: Quiz;isSelected: boolean;onClick: () => void;onAction: (action: string) => void;}) {
  const categoryConfig = CATEGORY_CONFIG[quiz.category] || CATEGORY_CONFIG.all;
  const isPublished = quiz.status === 'published';
  const isArchived = quiz.status === 'archived';
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className={`relative bg-white rounded-xl border transition-all cursor-pointer active:scale-[0.98] ${isSelected ? 'border-gray-900 shadow-lg ring-2 ring-gray-900/5' : 'border-gray-200 active:border-gray-300 shadow-sm'}`}
      onClick={onClick}>
      
      <div className="px-4 pr-4 py-3.5">
        {/* Title row */}
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-1 flex-1 min-w-0">
            {quiz.title}
          </h3>
          {/* Status indicator */}
          <div className="relative flex-shrink-0">
            <div
              className={`flex items-center justify-center w-5 h-5 rounded-full ${isPublished ? 'bg-emerald-50 text-emerald-500' : isArchived ? 'bg-gray-100 text-gray-500' : 'bg-amber-50 text-amber-500'}`}>
              
              {isPublished ?
              <Eye className="w-3 h-3" /> :

              <EyeOff className="w-3 h-3" />
              }
            </div>
          </div>
        </div>

        {/* Quiz info */}
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-1 mb-3">
          {quiz.numQuestions} questions · {quiz.passingScore}% passing
        </p>

        {/* Bottom row */}
        <div
          className="flex items-center pt-2.5 border-t border-gray-100"
          onClick={(e) => e.stopPropagation()}>
          
          {/* Left: category dot + quiz icon */}
          <div className="flex items-center gap-2 flex-1">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-black/5"
              style={{
                backgroundColor: categoryConfig.color
              }}
              title={categoryConfig.label} />
            
            <div
              className="flex items-center justify-center w-6 h-6 rounded-md bg-gray-50 text-gray-400"
              title="Quiz">
              
              <HelpCircle className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Right: action icons */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => onAction('view')}
              className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors active:scale-90"
              title="Info">
              
              <Info className="w-[14px] h-[14px]" />
            </button>
            <button
              onClick={() => onAction('preview')}
              className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors active:scale-90"
              title="Preview">
              
              <MonitorPlay className="w-[14px] h-[14px]" />
            </button>
            <button
              onClick={() => onAction('edit')}
              className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors active:scale-90"
              title="Edit">
              
              <PenSquare className="w-[14px] h-[14px]" />
            </button>
            <button
              onClick={() => onAction('fork')}
              className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors active:scale-90"
              title="Fork">
              
              <GitFork className="w-[14px] h-[14px]" />
            </button>
            <button
              onClick={() => onAction('delete')}
              className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors active:scale-90"
              title="Delete">
              
              <Trash2 className="w-[14px] h-[14px]" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>);

}
// Mobile List Header
function MobileListHeader({
  searchQuery,
  onSearchChange,
  filterBy,
  onFilterChange,
  sortBy,
  onSortChange,
  onOpenSidebarFilters,
  showCheckboxes,
  onToggleCheckboxes,
  onCreateQuiz











}: {searchQuery: string;onSearchChange: (val: string) => void;filterBy: string;onFilterChange: (id: string) => void;sortBy: string;onSortChange: (id: string) => void;onOpenSidebarFilters?: () => void;showCheckboxes?: boolean;onToggleCheckboxes?: () => void;onCreateQuiz?: () => void;}) {
  const [showSearch, setShowSearch] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="lg:hidden flex-shrink-0">
      {/* Main row */}
      <div className="px-4 py-2.5 flex items-center gap-2 border-b border-gray-100 bg-white">
        {/* Left side: sidebar filter icon */}
        <div className="flex items-center flex-1 min-w-0">
          {onOpenSidebarFilters &&
          <button
            onClick={onOpenSidebarFilters}
            className="p-1.5 -ml-1 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors active:scale-95"
            title="Status & Category">
            
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          }
        </div>
        {/* Right side: action icons */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => {
              setShowSearch(!showSearch);
              setShowSort(false);
              setShowFilter(false);
            }}
            className={`p-2 rounded-lg transition-colors ${showSearch ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}>
            
            <Search className="w-4 h-4" />
          </button>
          <div className="relative">
            <button
              onClick={() => {
                setShowFilter(!showFilter);
                setShowSort(false);
                setShowSearch(false);
              }}
              className={`p-2 rounded-lg transition-colors ${showFilter || filterBy !== 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}>
              
              <Filter className="w-4 h-4" />
              {filterBy !== 'all' &&
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-teal-500" />
              }
            </button>
            <AnimatePresence>
              {showFilter &&
              <>
                  <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowFilter(false)} />
                
                  <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                    scale: 0.95
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.95
                  }}
                  transition={{
                    duration: 0.15
                  }}
                  className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-40">
                  
                    {mobileFilterOptions.map((opt) =>
                  <button
                    key={opt.id}
                    onClick={() => {
                      onFilterChange(opt.id);
                      setShowFilter(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-[13px] flex items-center gap-2 transition-colors ${filterBy === opt.id ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    
                        <opt.icon
                      className={`w-3.5 h-3.5 ${filterBy === opt.id ? 'text-teal-600' : 'text-gray-400'}`} />
                    
                        {opt.label}
                      </button>
                  )}
                  </motion.div>
                </>
              }
            </AnimatePresence>
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
                setShowSearch(false);
              }}
              className={`p-2 rounded-lg transition-colors ${showSort ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}>
              
              <BarsSortIcon className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showSort &&
              <>
                  <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowSort(false)} />
                
                  <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                    scale: 0.95
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.95
                  }}
                  transition={{
                    duration: 0.15
                  }}
                  className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-40">
                  
                    {sortOptions.map((opt) =>
                  <button
                    key={opt.id}
                    onClick={() => {
                      onSortChange(opt.id);
                      setShowSort(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-[13px] transition-colors ${sortBy === opt.id ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    
                        {opt.label}
                      </button>
                  )}
                  </motion.div>
                </>
              }
            </AnimatePresence>
          </div>
          {/* Checkbox Toggle */}
          {onToggleCheckboxes &&
          <button
            onClick={onToggleCheckboxes}
            className={`p-2 rounded-lg transition-colors ${showCheckboxes ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}
            title={showCheckboxes ? 'Hide checkboxes' : 'Show checkboxes'}>
            
              <CheckSquare className="w-4 h-4" />
            </button>
          }
          {/* Create Quiz Button */}
          {onCreateQuiz &&
          <button
            onClick={onCreateQuiz}
            className="ml-1 w-8 h-8 flex items-center justify-center rounded-lg bg-teal-500 text-white shadow-sm active:scale-95 transition-all hover:bg-teal-600"
            title="Create quiz">
            
              <Plus className="w-4 h-4" strokeWidth={2.5} />
            </button>
          }
        </div>
      </div>
      {/* Expandable search */}
      <AnimatePresence>
        {showSearch &&
        <motion.div
          initial={{
            height: 0,
            opacity: 0
          }}
          animate={{
            height: 'auto',
            opacity: 1
          }}
          exit={{
            height: 0,
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="overflow-hidden bg-white border-b border-gray-100">
          
            <div className="px-4 py-2.5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                autoFocus />
              
                {searchQuery &&
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600">
                
                    <X className="w-3.5 h-3.5" />
                  </button>
              }
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
export function QuizzesContent({
  selectedStatus,
  selectedCategory,
  selectedQuiz,
  onSelectQuiz,
  onOpenMobileFilters,
  onCreateQuiz
}: QuizzesContentProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>(MOCK_QUIZZES);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_desc');
  const [filterBy, setFilterBy] = useState('all');
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [visibleQuizCount, setVisibleQuizCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isLoadingMoreRef = useRef(false);
  const desktopSentinelRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileSentinelRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  // Pagination state
  const totalItems = quizzes.length;
  const currentPageItems = quizzes;
  const allCurrentPageSelected = currentPageItems.every((item) =>
  selectedIds.has(item.id)
  );
  const someCurrentPageSelected =
  currentPageItems.some((item) => selectedIds.has(item.id)) &&
  !allCurrentPageSelected;
  const allPagesSelected = selectedIds.size === totalItems;
  // Simulate initial load
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [selectedStatus, selectedCategory]);
  // Auto-select the first quiz on initial load (desktop only)
  useEffect(() => {
    if (!isLoading && !selectedQuiz && filteredQuizzes.length > 0) {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        onSelectQuiz(filteredQuizzes[0]);
      }
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
  // Filter quizzes
  const filteredQuizzes = quizzes.
  filter((q) => {
    const matchesSearch =
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
    selectedStatus === 'all' || q.status === selectedStatus;
    const matchesCategory =
    selectedCategory === 'all' || q.category === selectedCategory;
    const matchesFilter = filterBy === 'all' || q.status === filterBy;
    return matchesSearch && matchesStatus && matchesCategory && matchesFilter;
  }).
  sort((a, b) => {
    switch (sortBy) {
      case 'created_desc':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'created_asc':
        return a.createdAt.getTime() - b.createdAt.getTime();
      case 'title_asc':
        return a.title.localeCompare(b.title);
      case 'title_desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
  const visibleQuizzes = filteredQuizzes.slice(0, visibleQuizCount);
  const hasMoreQuizzes = visibleQuizCount < filteredQuizzes.length;
  const loadMoreQuizzes = useCallback(() => {
    if (isLoadingMoreRef.current) return;
    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleQuizCount((prev) => Math.min(prev + 10, filteredQuizzes.length));
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
    }, 600);
  }, [filteredQuizzes.length]);
  // Reset visible count when filters change
  useEffect(() => {
    setVisibleQuizCount(10);
  }, [selectedStatus, selectedCategory, searchQuery, sortBy, filterBy]);
  // Auto-load on scroll - desktop
  useEffect(() => {
    const sentinel = desktopSentinelRef.current;
    const container = desktopScrollRef.current;
    if (!sentinel || !container || !hasMoreQuizzes || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMoreRef.current) {
          loadMoreQuizzes();
        }
      },
      {
        root: container,
        threshold: 0
      }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMoreQuizzes, loadMoreQuizzes, isLoading]);
  // Auto-load on scroll - mobile
  useEffect(() => {
    const sentinel = mobileSentinelRef.current;
    const container = mobileScrollRef.current;
    if (!sentinel || !container || !hasMoreQuizzes || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMoreRef.current) {
          loadMoreQuizzes();
        }
      },
      {
        root: container,
        threshold: 0
      }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMoreQuizzes, loadMoreQuizzes, isLoading]);
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
  const handleToggleSelectAll = () => {
    if (
    allCurrentPageSelected &&
    selectedIds.size === currentPageItems.length)
    {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(currentPageItems.map((item) => item.id)));
    }
  };
  const handleSelectAllOnPage = () => {
    setSelectedIds(new Set(currentPageItems.map((item) => item.id)));
  };
  const handleSelectAllPages = () => {
    setSelectedIds(new Set(quizzes.map((q) => q.id)));
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
  const handleSaveBulkEdit = (updates: {
    category?: string;
    status?: string;
  }) => {
    console.log('Bulk edit saved:', updates);
  };
  const handleSortChange = (sortId: string) => {
    setSortBy(sortId);
  };
  const handleFilterChange = (filterId: string) => {
    setFilterBy(filterId);
  };
  const handleQuizAction = (quizId: string, action: string) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return;
    switch (action) {
      case 'view':
      case 'preview':
        onSelectQuiz(quiz);
        break;
      case 'edit':
        onSelectQuiz(quiz);
        break;
      case 'fork':
        const forked: Quiz = {
          ...quiz,
          id: `fork-${Date.now()}`,
          title: `${quiz.title} (Fork)`,
          status: 'draft',
          createdAt: new Date()
        };
        setQuizzes([forked, ...quizzes]);
        setTimeout(() => onSelectQuiz(forked), 100);
        break;
      case 'delete':
        setDeleteConfirmId(quizId);
        break;
    }
  };
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
  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
      {/* Bulk Delete Confirmation Dialog */}
      <AnimatePresence>
        {bulkDeleteConfirm &&
        (() => {
          const total = selectedIds.size;
          return (
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
              transition={{
                duration: 0.15
              }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
              onClick={() => setBulkDeleteConfirm(false)}>
              
                <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 8
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: 4
                }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 400
                }}
                className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 mx-4 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}>
                
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Delete {total} quiz{total !== 1 ? 'zes' : ''}?
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                      The selected quiz{total !== 1 ? 'zes' : ''} will be{' '}
                      <span className="font-medium text-gray-700">
                        permanently removed
                      </span>
                      . This action cannot be undone.
                    </p>
                    <div className="flex items-center gap-3 w-full">
                      <Button
                      variant="secondary"
                      onClick={() => setBulkDeleteConfirm(false)}
                      className="flex-1">
                      
                        Cancel
                      </Button>
                      <Button
                      variant="danger"
                      onClick={() => {
                        setQuizzes(
                          quizzes.filter((q) => !selectedIds.has(q.id))
                        );
                        setSelectedIds(new Set());
                        setBulkDeleteConfirm(false);
                      }}
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      className="flex-1">
                      
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>);

        })()}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteConfirmId &&
        (() => {
          const quizToDelete = quizzes.find((q) => q.id === deleteConfirmId);
          return (
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
              transition={{
                duration: 0.15
              }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
              onClick={() => setDeleteConfirmId(null)}>
              
                <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 8
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: 4
                }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 400
                }}
                className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 mx-4 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}>
                
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Delete this quiz?
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                      "{quizToDelete?.title}" will be permanently removed. This
                      action cannot be undone.
                    </p>
                    <div className="flex items-center gap-3 w-full">
                      <Button
                      variant="secondary"
                      onClick={() => setDeleteConfirmId(null)}
                      className="flex-1">
                      
                        Cancel
                      </Button>
                      <Button
                      variant="danger"
                      onClick={() => {
                        setQuizzes(
                          quizzes.filter((q) => q.id !== deleteConfirmId)
                        );
                        if (selectedQuiz?.id === deleteConfirmId) {
                          onSelectQuiz(null as any);
                        }
                        setDeleteConfirmId(null);
                      }}
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      className="flex-1">
                      
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>);

        })()}
      </AnimatePresence>

      {/* Bulk Edit Form */}
      {showEditForm &&
      <BulkEditForm
        selectedCount={selectedIds.size}
        onClose={() => setShowEditForm(false)}
        onSave={handleSaveBulkEdit} />

      }

      {/* Table Action Bar - Desktop only */}
      <div className="hidden lg:block">
        <TableActionBar
          showSearch={true}
          searchPlaceholder="Search quizzes..."
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
          allFilterLabel="All Quizzes" />
        
      </div>

      {/* Mobile Header */}
      <MobileListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterBy={filterBy}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onOpenSidebarFilters={onOpenMobileFilters}
        showCheckboxes={showCheckboxes}
        onToggleCheckboxes={handleToggleCheckboxes} />
      

      {/* Bulk Edit Bar */}
      <AnimatePresence mode="wait">
        {selectedIds.size > 0 && showCheckboxes &&
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
          onToggleSelectAll={handleToggleSelectAll} />

        }
      </AnimatePresence>

      {/* Content Area - Desktop Table View */}
      <div
        ref={desktopScrollRef}
        className="hidden lg:flex flex-col flex-1 overflow-y-auto"
        style={{
          paddingRight: '8px'
        }}>
        
        {isLoading ?
        <QuestionListSkeleton count={8} /> :
        filteredQuizzes.length === 0 ?
        <div className="flex flex-col items-center justify-center h-full p-8">
            <h3 className="text-xl font-normal text-gray-700 mb-3">
              Ready to get started?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6 max-w-md">
              When an item is added, you will see it displayed here
            </p>
            <div className="w-48 h-48 opacity-40 mt-8">
              <img
              src="/image.png"
              alt="Empty state"
              className="w-full h-full object-contain" />
            
            </div>
          </div> :

        <div className="flex flex-col min-h-full">
            <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="divide-y divide-gray-100">
            
              {visibleQuizzes.map((quiz) =>
            <motion.div key={quiz.id} variants={item}>
                  <QuizItem
                quiz={quiz}
                isHovered={hoveredId === quiz.id}
                isSelected={selectedQuiz?.id === quiz.id}
                onMouseEnter={() => setHoveredId(quiz.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectQuiz(quiz)}
                showCheckbox={showCheckboxes}
                isChecked={selectedIds.has(quiz.id)}
                onCheckboxChange={() => handleToggleSelect(quiz.id)} />
              
                </motion.div>
            )}
            </motion.div>
            {hasMoreQuizzes && <div ref={desktopSentinelRef} className="h-4" />}
            {/* Spacer */}
            <div className="flex-1" />
            {/* Sticky Show More bar - Desktop */}
            <div className="flex-shrink-0 sticky bottom-0 border-t border-gray-200 bg-white">
              {isLoadingMore ?
            <div className="flex items-center gap-2 px-6 py-2">
                  <Spinner className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">Loading…</span>
                </div> :
            hasMoreQuizzes ?
            <button
              onClick={loadMoreQuizzes}
              className="w-full flex items-center justify-between px-6 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors">
              
                  <span className="flex items-center gap-1.5">
                    <ChevronDown className="w-3 h-3" />
                    Show more
                  </span>
                  <span className="text-gray-400">
                    {visibleQuizCount} of {filteredQuizzes.length}
                  </span>
                </button> :

            <div className="flex items-center justify-between px-6 py-2 text-xs text-gray-400">
                  <span>{filteredQuizzes.length} quizzes loaded</span>
                  <span>
                    {filteredQuizzes.length} of {filteredQuizzes.length}
                  </span>
                </div>
            }
            </div>
          </div>
        }
      </div>

      {/* Mobile Card View */}
      <div
        ref={mobileScrollRef}
        className="lg:hidden flex-1 overflow-y-auto bg-gray-50 relative">
        
        {isLoading ?
        <MobileQuestionSkeleton count={5} /> :
        filteredQuizzes.length === 0 ?
        <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="w-24 h-24 opacity-30 mb-4">
              <img
              src="/image.png"
              alt="Empty state"
              className="w-full h-full object-contain" />
            
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              No quizzes yet
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              Tap the + button to create your first quiz
            </p>
          </div> :

        <div className="p-4 space-y-3 pb-4">
            {visibleQuizzes.map((quiz, index) =>
          <motion.div
            key={quiz.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.05,
              duration: 0.3
            }}>
            
                <MobileQuizCard
              quiz={quiz}
              isSelected={selectedQuiz?.id === quiz.id}
              onClick={() => onSelectQuiz(quiz)}
              onAction={(action) => handleQuizAction(quiz.id, action)} />
            
              </motion.div>
          )}
            {hasMoreQuizzes && <div ref={mobileSentinelRef} className="h-4" />}
            {/* Show more bar - Mobile */}
            {isLoadingMore ?
          <div className="w-full flex items-center justify-center py-3">
                <Spinner className="h-4 w-4 text-gray-400" />
              </div> :
          hasMoreQuizzes ?
          <button
            onClick={loadMoreQuizzes}
            className="w-full flex items-center justify-between px-4 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors">
            
                <span className="flex items-center gap-1.5">
                  <ChevronDown className="w-3 h-3" />
                  Show more
                </span>
                <span className="text-gray-400">
                  {visibleQuizCount} of {filteredQuizzes.length}
                </span>
              </button> :
          null}
          </div>
        }

        {/* Floating Action Button - Create Quiz */}
        {onCreateQuiz &&
        <motion.button
          initial={{
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 300,
            delay: 0.3
          }}
          onClick={onCreateQuiz}
          className="fixed bottom-6 right-6 w-[52px] h-[52px] flex items-center justify-center rounded-full bg-teal-500 text-white shadow-lg shadow-teal-500/30 active:scale-90 transition-transform z-30 lg:hidden"
          title="Create quiz">
          
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </motion.button>
        }
      </div>
    </div>);

}