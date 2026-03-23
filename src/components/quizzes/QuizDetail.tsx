import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RowActionsDropdown } from '../questions/RowActionsDropdown';
import { TableActionBar } from '../questions/TableActionBar';
import { Checkbox } from '../questions/Checkbox';
import { TombstoneForm } from '../questions/TombstoneForm';
import {
  X,
  Info,
  PenSquare,
  MonitorPlay,
  ArrowLeft,
  Trash2,
  Edit,
  Save,
  Send,
  ChevronDown,
  Eye,
  EyeOff,
  HelpCircle,
  BarChart3,
  ListChecks,
  Percent,
  ToggleLeft,
  FileText,
  GripVertical,
  Plus,
  Search,
  Pencil,
  CheckSquare,
  CheckCircle2,
  Type,
  Image,
  HelpCircle as HelpCircleIcon,
  Unlink,
  Filter,
  Calendar,
  RotateCcw } from
'lucide-react';
import { Button } from '../ui/Button';
import { QuestionPreview } from '../questions/QuestionPreview';
import { MOCK_QUESTIONS } from '../questions/QuestionsContent';
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
  status: 'draft' | 'published';
  description?: string;
  questionIds: string[];
}
interface QuizDetailProps {
  quiz: Quiz | null;
  onClose: () => void;
  defaultTab?: 'info' | 'edit' | 'preview' | 'questions';
  tabSignal?: number;
}
const CATEGORIES = [
{
  id: 'onboarding',
  label: 'Onboarding',
  color: '#1F2937'
},
{
  id: 'assessment',
  label: 'Assessment',
  color: '#6B21A8'
},
{
  id: 'knowledge-check',
  label: 'Knowledge Check',
  color: '#3B82F6'
},
{
  id: 'compliance',
  label: 'Compliance',
  color: '#10B981'
},
{
  id: 'technical-skills',
  label: 'Technical Skills',
  color: '#0EA5E9'
},
{
  id: 'product-knowledge',
  label: 'Product Knowledge',
  color: '#F59E0B'
},
{
  id: 'safety-training',
  label: 'Safety Training',
  color: '#EF4444'
},
{
  id: 'customer-service',
  label: 'Customer Service',
  color: '#D946EF'
},
{
  id: 'data-privacy',
  label: 'Data Privacy',
  color: '#06B6D4'
}];

function InfoSkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
        <div
          className="h-4 w-32 bg-gray-100 rounded animate-pulse"
          style={{
            animationDelay: '50ms'
          }} />
        
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) =>
        <div key={i}>
            <div
            className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2"
            style={{
              animationDelay: `${i * 50}ms`
            }} />
          
            <div
            className="h-5 w-16 bg-gray-100 rounded animate-pulse"
            style={{
              animationDelay: `${i * 50 + 25}ms`
            }} />
          
          </div>
        )}
      </div>
      <div className="pt-4 border-t border-gray-100">
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="space-y-2">
          {[...Array(4)].map((_, i) =>
          <div
            key={i}
            className="h-10 w-full bg-gray-100 rounded-lg animate-pulse"
            style={{
              animationDelay: `${i * 50}ms`
            }} />

          )}
        </div>
      </div>
    </div>);

}
function FormSkeleton() {
  return (
    <div className="px-6 pt-6 pb-8 space-y-6">
      <div>
        <div className="h-3.5 w-28 bg-gray-200 rounded animate-pulse mb-2.5" />
        <div
          className="h-10 w-full bg-gray-100 rounded-md animate-pulse"
          style={{
            animationDelay: '50ms'
          }} />
        
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div
            className="h-3.5 w-20 bg-gray-200 rounded animate-pulse mb-2.5"
            style={{
              animationDelay: '100ms'
            }} />
          
          <div
            className="h-10 w-full bg-gray-100 rounded-md animate-pulse"
            style={{
              animationDelay: '150ms'
            }} />
          
        </div>
        <div>
          <div
            className="h-3.5 w-24 bg-gray-200 rounded animate-pulse mb-2.5"
            style={{
              animationDelay: '200ms'
            }} />
          
          <div
            className="h-10 w-full bg-gray-100 rounded-md animate-pulse"
            style={{
              animationDelay: '250ms'
            }} />
          
        </div>
      </div>
      <div>
        <div
          className="h-3.5 w-20 bg-gray-200 rounded animate-pulse mb-2.5"
          style={{
            animationDelay: '300ms'
          }} />
        
        <div
          className="h-24 w-full bg-gray-100 rounded-md animate-pulse"
          style={{
            animationDelay: '350ms'
          }} />
        
      </div>
      <div className="space-y-3 pt-4">
        {[...Array(5)].map((_, i) =>
        <div
          key={i}
          className="h-12 w-full bg-gray-100 rounded-lg animate-pulse"
          style={{
            animationDelay: `${400 + i * 50}ms`
          }} />

        )}
      </div>
    </div>);

}
// Question type icons (matching QuestionItem)
const MultipleChoiceIcon = () =>
<svg
  className="w-4 h-4"
  focusable="false"
  aria-hidden="true"
  viewBox="0 0 512 512"
  fill="currentColor">
  
    <path d="M32 96a32 32 0 1 1 64 0A32 32 0 1 1 32 96zm96 0A64 64 0 1 0 0 96a64 64 0 1 0 128 0zm64 0c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L208 80c-8.8 0-16 7.2-16 16zm0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zm0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zM64 288a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0-96a64 64 0 1 0 0 128 64 64 0 1 0 0-128zM80 96A16 16 0 1 0 48 96a16 16 0 1 0 32 0zM32 416a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm96 0A64 64 0 1 0 0 416a64 64 0 1 0 128 0z" />
  </svg>;

const OpenAnswerIcon = () =>
<svg
  className="w-4 h-4"
  focusable="false"
  aria-hidden="true"
  viewBox="0 0 640 512"
  fill="currentColor">
  
    <path d="M582.8 45.5l11.9 11.9c12.5 12.5 12.5 32.8 0 45.2L568 129.4l-57-57 26.4-26.8c12.5-12.6 32.8-12.7 45.4-.1zM346.2 239.2L488.5 95.1 545.4 152 402.3 295.2c-4.4 4.4-10 7.4-16.1 8.7l-61.5 12.9 12.9-61.7c1.3-6 4.2-11.5 8.6-15.9zM514.7 23.1L323.4 216.7c-8.6 8.7-14.6 19.8-17.1 31.8l-18 85.7c-1.1 5.3 .5 10.8 4.3 14.6s9.3 5.5 14.6 4.3l85.5-17.9c12.2-2.6 23.3-8.6 32.1-17.4L617.4 125.3c25-25 25-65.5 0-90.5L605.5 22.8c-25.1-25.1-65.8-25-90.8 .3zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-176c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 176c0 17.7-14.3 32-32 32L64 480c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l240 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L64 128zm64 216a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm120-24a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z" />
  </svg>;

const TrueFalseIcon = () =>
<svg
  className="w-4 h-4"
  focusable="false"
  aria-hidden="true"
  viewBox="0 0 640 512"
  fill="currentColor">
  
    <path d="M205.2 496c-12.4 0-24.4-4.6-33.7-12.8L49.3 374.6C38.3 364.8 32 350.7 32 336s6.3-28.8 17.3-38.6L171.5 188.8c9.3-8.3 21.3-12.8 33.7-12.8c28 0 50.8 22.7 50.8 50.8V240H400c8.8 0 16 7.2 16 16v29.2c0 10.4 8.4 18.8 18.8 18.8c4.6 0 9-1.7 12.5-4.7L569.4 190.7c4.2-3.7 6.6-9.1 6.6-14.7s-2.4-10.9-6.6-14.7L447.3 52.7c-3.4-3.1-7.9-4.7-12.5-4.7C424.4 48 416 56.4 416 66.8V96c0 8.8-7.2 16-16 16H288c-8.8 0-16-7.2-16-16s7.2-16 16-16h96V66.8c0-28 22.7-50.8 50.8-50.8c12.4 0 24.4 4.6 33.7 12.8L590.7 137.4c11 9.8 17.3 23.8 17.3 38.6s-6.3 28.8-17.3 38.6L468.5 323.2c-9.3 8.3-21.3 12.8-33.7 12.8c-28 0-50.8-22.7-50.8-50.8V272H240c-8.8 0-16-7.2-16-16V226.8c0-10.4-8.4-18.8-18.8-18.8c-4.6 0-9 1.7-12.5 4.7L70.6 321.3c-4.2 3.7-6.6 9.1-6.6 14.7s2.4 10.9 6.6 14.7L192.7 459.3c3.4 3.1 7.9 4.7 12.5 4.7c10.4 0 18.8-8.4 18.8-18.8V416c0-8.8 7.2-16 16-16H352c8.8 0 16 7.2 16 16s-7.2 16-16 16H256v13.2c0 28-22.7 50.8-50.8 50.8z" />
  </svg>;

const MatchingIcon = () =>
<svg
  className="w-4 h-4"
  focusable="false"
  aria-hidden="true"
  viewBox="0 0 576 512"
  fill="currentColor">
  
    <path d="M272 64c8.8 0 16 7.2 16 16l0 128c0 8.8-7.2 16-16 16L48 224c-8.8 0-16-7.2-16-16L32 80c0-8.8 7.2-16 16-16l224 0zM48 32C21.5 32 0 53.5 0 80L0 208c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-128c0-26.5-21.5-48-48-48L48 32zM528 64c8.8 0 16 7.2 16 16l0 256c0 8.8-7.2 16-16 16l-96 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l96 0zM432 32c-26.5 0-48 21.5-48 48l0 256c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-256c0-26.5-21.5-48-48-48l-96 0zM112 336l176 0c8.8 0 16 7.2 16 16l0 80c0 8.8-7.2 16-16 16l-176 0c-8.8 0-16-7.2-16-16l0-80c0-8.8 7.2-16 16-16zM64 352l0 80c0 26.5 21.5 48 48 48l176 0c26.5 0 48-21.5 48-48l0-80c0-26.5-21.5-48-48-48l-176 0c-26.5 0-48 21.5-48 48z" />
  </svg>;

const QUESTION_TYPE_CONFIG: Record<
  string,
  {
    icon: any;
    label: string;
  }> =
{
  multiple: {
    icon: MultipleChoiceIcon,
    label: 'Multiple Choice'
  },
  open: {
    icon: OpenAnswerIcon,
    label: 'Open Answer'
  },
  'true-false': {
    icon: TrueFalseIcon,
    label: 'True/False'
  },
  matching: {
    icon: MatchingIcon,
    label: 'Matching'
  }
};
const QUESTION_CATEGORY_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
  }> =
{
  knowledge: {
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
  }
};
const slideVariants = {
  enterFromRight: {
    x: '100%',
    opacity: 0
  },
  enterFromLeft: {
    x: '-100%',
    opacity: 0
  },
  center: {
    x: 0,
    opacity: 1
  },
  exitToLeft: {
    x: '-100%',
    opacity: 0
  },
  exitToRight: {
    x: '100%',
    opacity: 0
  }
};
const TYPE_LABELS: Record<string, string> = {
  multiple: 'Multiple Choice',
  open: 'Open Answer',
  'true-false': 'True/False',
  matching: 'Matching'
};
export function QuizDetail({
  quiz,
  onClose,
  defaultTab,
  tabSignal
}: QuizDetailProps) {
  const isNewQuiz = quiz?.id?.startsWith('new-') ?? false;
  const [activeTab, setActiveTab] = useState<
    'info' | 'edit' | 'preview' | 'questions'>(
    isNewQuiz ? 'edit' : defaultTab || 'info');
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(isNewQuiz ? false : true);
  // Force switch tab when parent sends a new tabSignal
  useEffect(() => {
    if (tabSignal && tabSignal > 0 && defaultTab) {
      setActiveTab(defaultTab);
      if (defaultTab === 'edit') {
        setIsFormLoading(true);
      }
      if (defaultTab === 'questions') {
        setQuestionsView('list');
        setSelectedQuestionId(null);
      }
      if (defaultTab === 'info') {
        setIsInfoLoading(true);
      }
    }
  }, [tabSignal, defaultTab]);
  const [deleteDialogMode, setDeleteDialogMode] = useState<
    'draft' | 'published' | null>(
    null);
  // Form state
  const [title, setTitle] = useState(quiz?.title || 'New Quiz');
  const [description, setDescription] = useState(quiz?.description || '');
  const [category, setCategory] = useState(quiz?.category || 'onboarding');
  const [passingScore, setPassingScore] = useState(quiz?.passingScore || 75);
  const [scoreDisplay, setScoreDisplay] = useState(quiz?.scoreDisplay || false);
  const [hints, setHints] = useState(quiz?.hints || true);
  const [showPercentComplete, setShowPercentComplete] = useState(
    quiz?.showPercentComplete || false
  );
  const [showNumQuestions, setShowNumQuestions] = useState(
    quiz?.showNumQuestions || false
  );
  const [showProgressBar, setShowProgressBar] = useState(
    quiz?.showProgressBar || false
  );
  const [status, setStatus] = useState<'draft' | 'published'>(
    quiz?.status || 'draft'
  );
  const [questionIds, setQuestionIds] = useState<string[]>(
    quiz?.questionIds || []
  );
  const [showAddQuestionsModal, setShowAddQuestionsModal] = useState(false);
  const [addQuestionsExpanded, setAddQuestionsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [addFilterCategory, setAddFilterCategory] = useState('');
  const [addSort, setAddSort] = useState('');
  const [addItemsPerPage, setAddItemsPerPage] = useState(10);
  const [addDisplayCount, setAddDisplayCount] = useState(10);
  const [quizSearchQuery, setQuizSearchQuery] = useState('');
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(
    new Set()
  );
  // Edit view slide state (like Configure Answers in QuestionDetail)
  const [editView, setEditView] = useState<
    'form' | 'questions' | 'questionDetail'>(
    'form');
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>(
    'right'
  );
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null
  );
  const [questionsView, setQuestionsView] = useState<'list' | 'detail'>('list');
  const [questionDetailTab, setQuestionDetailTab] = useState<
    'info' | 'preview'>(
    'info');
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);
  const [removeConfirmId, setRemoveConfirmId] = useState<string | null>(null);
  // Quiz questions toolbar state
  const [bulkSelectedQuestionIds, setBulkSelectedQuestionIds] = useState<
    Set<string>>(
    new Set());
  const [quizCheckboxesVisible, setQuizCheckboxesVisible] = useState(false);
  const [quizFilter, setQuizFilter] = useState('all');
  const [quizSort, setQuizSort] = useState('manual');
  const [bulkDetachConfirm, setBulkDetachConfirm] = useState(false);
  const [quizItemsPerPage, setQuizItemsPerPage] = useState(10);
  const [quizDisplayCount, setQuizDisplayCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const navigateToQuestions = () => {
    setActiveTab('questions');
    setQuestionsView('list');
    setSelectedQuestionId(null);
  };
  const navigateToQuestionDetail = (
  qId: string,
  tab: 'info' | 'preview' = 'info') =>
  {
    setSelectedQuestionId(qId);
    setQuestionDetailTab(tab);
    setQuestionsView('detail');
  };
  const navigateBackToQuestions = () => {
    setSelectedQuestionId(null);
    setQuestionDetailTab('info');
    setQuestionsView('list');
  };
  // Drag and drop state
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragIndexRef = useRef<number | null>(null);
  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragIndexRef.current = index;
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = dragIndexRef.current;
    if (sourceIndex !== null && sourceIndex !== targetIndex) {
      const newQuestionIds = [...questionIds];
      const [moved] = newQuestionIds.splice(sourceIndex, 1);
      newQuestionIds.splice(targetIndex, 0, moved);
      setQuestionIds(newQuestionIds);
    }
    dragIndexRef.current = null;
    setDragIndex(null);
    setDragOverIndex(null);
  };
  const handleDragEnd = () => {
    dragIndexRef.current = null;
    setDragIndex(null);
    setDragOverIndex(null);
  };
  const handleRemoveQuestion = (id: string) => {
    setQuestionIds(questionIds.filter((qId) => qId !== id));
  };
  // Bulk detach helpers
  const handleBulkDetach = () => {
    setBulkDetachConfirm(true);
  };
  const confirmBulkDetach = () => {
    setQuestionIds(
      questionIds.filter((qId) => !bulkSelectedQuestionIds.has(qId))
    );
    setBulkSelectedQuestionIds(new Set());
    setBulkDetachConfirm(false);
  };
  const handleToggleQuizCheckboxes = () => {
    if (quizCheckboxesVisible) {
      setBulkSelectedQuestionIds(new Set());
    }
    setQuizCheckboxesVisible(!quizCheckboxesVisible);
  };
  const handleToggleBulkSelect = (qId: string) => {
    const next = new Set(bulkSelectedQuestionIds);
    if (next.has(qId)) {
      next.delete(qId);
    } else {
      next.add(qId);
    }
    setBulkSelectedQuestionIds(next);
  };
  const handleToggleSelectAllQuizQuestions = (filteredIds: string[]) => {
    const allSelected = filteredIds.every((id) =>
    bulkSelectedQuestionIds.has(id)
    );
    if (allSelected) {
      setBulkSelectedQuestionIds(new Set());
    } else {
      setBulkSelectedQuestionIds(new Set(filteredIds));
    }
  };
  // Get filtered and sorted quiz questions
  const getFilteredSortedQuizQuestions = () => {
    let filtered = questionIds.
    map((qId) => MOCK_QUESTIONS.find((mq) => mq.id === qId)).
    filter(Boolean) as typeof MOCK_QUESTIONS;
    // Apply search
    if (quizSearchQuery) {
      const q = quizSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
        item.title.toLowerCase().includes(q) ||
        item.text?.toLowerCase().includes(q)
      );
    }
    // Apply filter
    if (quizFilter === 'published') {
      filtered = filtered.filter((item) => item.status === 'active');
    } else if (quizFilter === 'draft') {
      filtered = filtered.filter((item) => item.status === 'draft');
    }
    // Apply sort (skip when 'manual' — preserves questionIds order)
    if (quizSort === 'title_asc') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (quizSort === 'title_desc') {
      filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    } else if (quizSort === 'created_asc') {
      filtered = [...filtered].sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
    } else if (quizSort === 'created_desc') {
      filtered = [...filtered].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    }
    // 'manual' — no sorting, keeps questionIds array order
    return filtered;
  };
  // Reset display count when filters change
  useEffect(() => {
    setQuizDisplayCount(quizItemsPerPage);
  }, [quizFilter, quizSort, quizSearchQuery, quizItemsPerPage]);
  const handleLoadMoreQuizQuestions = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setQuizDisplayCount((prev) => prev + quizItemsPerPage);
      setIsLoadingMore(false);
    }, 400);
  };
  const handleAddSelectedQuestions = () => {
    setQuestionIds([...questionIds, ...Array.from(selectedQuestionIds)]);
    setShowAddQuestionsModal(false);
    setSelectedQuestionIds(new Set());
    setSearchQuery('');
  };
  const isPublished = status === 'published';
  useEffect(() => {
    if (activeTab === 'info' && quiz) {
      setIsInfoLoading(true);
      const timer = setTimeout(() => setIsInfoLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [activeTab, quiz?.id]);
  useEffect(() => {
    if (activeTab === 'edit' && isFormLoading) {
      const timer = setTimeout(() => setIsFormLoading(false), 700);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isFormLoading]);
  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDescription(quiz.description || '');
      setCategory(quiz.category);
      setPassingScore(quiz.passingScore);
      setScoreDisplay(quiz.scoreDisplay);
      setHints(quiz.hints);
      setShowPercentComplete(quiz.showPercentComplete);
      setShowNumQuestions(quiz.showNumQuestions);
      setShowProgressBar(quiz.showProgressBar);
      setStatus(quiz.status);
      setQuestionIds(quiz.questionIds || []);
      // If switching to a new quiz, open edit tab directly without loading
      if (quiz.id?.startsWith('new-')) {
        setActiveTab('edit');
        setIsFormLoading(false);
      } else if (defaultTab && defaultTab !== 'info') {
        setActiveTab(defaultTab);
        if (defaultTab === 'edit') {
          setIsFormLoading(true);
        }
      } else {
        setActiveTab('info');
        setIsInfoLoading(true);
      }
    }
  }, [quiz?.id]);
  // Questions loading effect
  useEffect(() => {
    if (editView === 'questions' && isQuestionsLoading) {
      const timer = setTimeout(() => setIsQuestionsLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [editView, isQuestionsLoading]);
  // Reset editView when switching tabs
  useEffect(() => {
    if (activeTab !== 'edit') {
      setEditView('form');
    }
  }, [activeTab]);
  const handleSave = (saveStatus: 'draft' | 'published') => {
    if (saveStatus === 'published' && questionIds.length === 0) {
      setActiveTab('questions');
      setQuestionsView('list');
      return;
    }
    setStatus(saveStatus);
    setActiveTab('info');
  };
  if (!quiz) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h3 className="text-xl font-normal text-gray-700 mb-3">
            Ready to get started?
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            When an item is added, you will see it displayed here
          </p>
          <div className="w-48 h-48 mx-auto opacity-40 mt-8">
            <img
              src="/image.png"
              alt="Empty state"
              className="w-full h-full object-contain" />
            
          </div>
        </div>
      </div>);

  }
  return (
    <div className="w-full h-full bg-white flex flex-col md:flex-row overflow-hidden relative">
      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteDialogMode &&
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
          onClick={() => setDeleteDialogMode(null)}>
          
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
                <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${deleteDialogMode === 'published' ? 'bg-red-50' : 'bg-red-50'}`}>
                
                  <Trash2
                  className={`w-5 h-5 ${deleteDialogMode === 'published' ? 'text-red-600' : 'text-red-500'}`} />
                
                </div>

                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {deleteDialogMode === 'draft' && 'Delete this quiz?'}
                  {deleteDialogMode === 'published' && 'Delete published quiz?'}
                </h3>

                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {deleteDialogMode === 'draft' &&
                'This draft will be permanently removed. This action cannot be undone.'}
                  {deleteDialogMode === 'published' &&
                <>
                      Users who have already{' '}
                      <span className="font-medium text-gray-700">
                        completed this quiz
                      </span>{' '}
                      will retain their scores, snapshots, and references. For{' '}
                      <span className="font-medium text-gray-700">
                        new users or those in progress
                      </span>
                      , the quiz will no longer be accessible. This action
                      cannot be undone.
                    </>
                }
                </p>

                <div className="flex items-center gap-3 w-full">
                  <button
                  onClick={() => setDeleteDialogMode(null)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  
                    Cancel
                  </button>
                  <button
                  onClick={() => {
                    setDeleteDialogMode(null);
                    onClose();
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Remove from Quiz Confirmation Dialog */}
      <AnimatePresence>
        {removeConfirmId &&
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          onClick={() => setRemoveConfirmId(null)}>
          
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
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                  <Unlink className="w-5 h-5 text-amber-600" />
                </div>

                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Detach?
                </h3>

                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  This question will be detached from the quiz but{' '}
                  <span className="font-medium text-gray-700">
                    won't be deleted
                  </span>
                  . You can always add it back later.
                </p>

                <div className="flex items-center gap-3 w-full">
                  <button
                  onClick={() => setRemoveConfirmId(null)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  
                    Cancel
                  </button>
                  <button
                  onClick={() => {
                    handleRemoveQuestion(removeConfirmId);
                    setRemoveConfirmId(null);
                    if (questionsView === 'detail') {
                      setQuestionsView('list');
                      setSelectedQuestionId(null);
                    }
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                  
                    <Unlink className="w-4 h-4" />
                    Detach
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Bulk Detach Confirmation Dialog */}
      <AnimatePresence>
        {bulkDetachConfirm &&
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          onClick={() => setBulkDetachConfirm(false)}>
          
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
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                  <Unlink className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Detach {bulkSelectedQuestionIds.size} question
                  {bulkSelectedQuestionIds.size !== 1 ? 's' : ''}?
                </h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  These questions will be detached from the quiz but{' '}
                  <span className="font-medium text-gray-700">
                    won't be deleted
                  </span>
                  . You can always add them back later.
                </p>
                <div className="flex items-center gap-3 w-full">
                  <button
                  onClick={() => setBulkDetachConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  
                    Cancel
                  </button>
                  <button
                  onClick={confirmBulkDetach}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                  
                    <Unlink className="w-4 h-4" />
                    Detach ({bulkSelectedQuestionIds.size})
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Icon Sidebar - Hidden on mobile */}
      <div className="hidden md:flex w-[48px] flex-shrink-0 border-r border-gray-200 bg-gray-50/80 flex-col items-center pt-4 gap-3">
        <button
          onClick={() => setActiveTab('info')}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${activeTab === 'info' ? 'bg-white text-gray-700 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
          title="Info">
          
          <Info className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${activeTab === 'preview' ? 'bg-white text-gray-700 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
          title="Preview">
          
          <MonitorPlay className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={() => {
            setIsFormLoading(true);
            setActiveTab('edit');
          }}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${activeTab === 'edit' ? 'bg-white text-gray-700 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
          title="Edit">
          
          <PenSquare className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={() => {
            setActiveTab('questions');
            setQuestionsView('list');
            setSelectedQuestionId(null);
          }}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${activeTab === 'questions' ? 'bg-white text-gray-700 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
          title="Questions">
          
          <ListChecks className="w-[18px] h-[18px]" />
        </button>
      </div>

      {/* Mobile Header Bar */}
      <div className="md:hidden flex-shrink-0 border-b border-gray-200 bg-white">
        <div className="h-[52px] px-3 flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2 -ml-1 hover:bg-gray-100 rounded-lg transition-colors active:scale-95 flex-shrink-0"
            aria-label="Back">
            
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-[15px] font-bold text-gray-900 flex-1 min-w-0 truncate">
            {quiz.title}
          </h2>
        </div>
        {/* Tab row */}
        <div className="flex items-center px-3 pb-1.5 pt-0.5">
          <div className="relative flex items-center w-full p-[3px] bg-gray-950/[0.04] rounded-full">
            <motion.div
              layout
              className="absolute top-[3px] bottom-[3px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]"
              animate={{
                left:
                activeTab === 'info' ?
                '3px' :
                activeTab === 'preview' ?
                'calc(25% + 1px)' :
                activeTab === 'edit' ?
                'calc(50% + 1px)' :
                'calc(75% + 1px)',
                width: 'calc(25% - 4px)'
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 35
              }} />
            
            <button
              onClick={() => setActiveTab('info')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-1 py-1.5 text-[11px] font-semibold tracking-wide rounded-full transition-colors duration-200 ${activeTab === 'info' ? 'text-gray-900' : 'text-gray-400'}`}>
              
              <Info className="w-3.5 h-3.5" />
              Info
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-1 py-1.5 text-[11px] font-semibold tracking-wide rounded-full transition-colors duration-200 ${activeTab === 'preview' ? 'text-gray-900' : 'text-gray-400'}`}>
              
              <MonitorPlay className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              onClick={() => {
                setIsFormLoading(true);
                setActiveTab('edit');
              }}
              className={`relative z-10 flex-1 flex items-center justify-center gap-1 py-1.5 text-[11px] font-semibold tracking-wide rounded-full transition-colors duration-200 ${activeTab === 'edit' ? 'text-gray-900' : 'text-gray-400'}`}>
              
              <PenSquare className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => {
                setActiveTab('questions');
                setQuestionsView('list');
                setSelectedQuestionId(null);
              }}
              className={`relative z-10 flex-1 flex items-center justify-center gap-1 py-1.5 text-[11px] font-semibold tracking-wide rounded-full transition-colors duration-200 ${activeTab === 'questions' ? 'text-gray-900' : 'text-gray-400'}`}>
              
              <ListChecks className="w-3.5 h-3.5" />
              Q's
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* INFO TAB */}
        {activeTab === 'info' &&
        <div className="flex flex-col h-full">
            <div className="hidden md:flex h-[57px] px-6 border-b border-gray-200 items-center flex-shrink-0 bg-white">
              <h2 className="text-lg font-bold text-gray-900 flex-1 min-w-0 truncate">
                {isInfoLoading ?
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" /> :

              quiz.title
              }
              </h2>
              {!isInfoLoading &&
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ml-3 flex-shrink-0 ${isPublished ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              
                  <span
                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isPublished ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              
                  {isPublished ? 'Published' : 'Draft'}
                </span>
            }
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-50/50">
              {isInfoLoading ?
            <div className="bg-white h-full">
                  <InfoSkeleton />
                </div> :

            <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white min-h-full">
                  {/* Quiz Description & Date */}
                  <div>
                    {description &&
                <p className="text-sm text-gray-600 leading-relaxed">
                        {description}
                      </p>
                }
                    <span
                  className={`text-[11px] text-gray-400 ${description ? 'mt-1.5' : ''} block`}>
                  
                      {(quiz.createdAt || new Date()).toLocaleDateString(
                    'en-US',
                    {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }
                  )}
                    </span>
                  </div>

                  {/* Category & Status Row */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div
                    className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm"
                    style={{
                      backgroundColor:
                      CATEGORIES.find((c) => c.id === category)?.color ||
                      '#6B7280'
                    }} />
                  
                      <span className="text-xs font-medium text-gray-600">
                        {CATEGORIES.find((c) => c.id === category)?.label ||
                    category}
                      </span>
                    </div>
                  </div>

                  {/* Quiz Settings Grid */}
                  <div className="pt-2 border-t border-gray-100">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 block">
                      Quiz Settings
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="p-1.5 bg-white rounded shadow-sm">
                          <ListChecks className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wide block">
                            Questions
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {questionIds.length}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="p-1.5 bg-white rounded shadow-sm">
                          <Percent className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wide block">
                            Passing Score
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {passingScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Display Options */}
                  <div className="pt-2 border-t border-gray-100">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 block">
                      Display Options
                    </label>
                    <div className="space-y-2">
                      <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${scoreDisplay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                    
                        <div className="flex items-center gap-2">
                          <BarChart3
                        className={`w-4 h-4 ${scoreDisplay ? 'text-emerald-600' : 'text-gray-400'}`} />
                      
                          <span
                        className={`text-sm ${scoreDisplay ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                        
                            Score Display
                          </span>
                        </div>
                        <span
                      className={`text-xs font-semibold ${scoreDisplay ? 'text-emerald-600' : 'text-gray-400'}`}>
                      
                          {scoreDisplay ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${hints ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                    
                        <div className="flex items-center gap-2">
                          <HelpCircle
                        className={`w-4 h-4 ${hints ? 'text-emerald-600' : 'text-gray-400'}`} />
                      
                          <span
                        className={`text-sm ${hints ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                        
                            Hints
                          </span>
                        </div>
                        <span
                      className={`text-xs font-semibold ${hints ? 'text-emerald-600' : 'text-gray-400'}`}>
                      
                          {hints ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${showPercentComplete ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                    
                        <div className="flex items-center gap-2">
                          <Percent
                        className={`w-4 h-4 ${showPercentComplete ? 'text-emerald-600' : 'text-gray-400'}`} />
                      
                          <span
                        className={`text-sm ${showPercentComplete ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                        
                            Show Complete
                          </span>
                        </div>
                        <span
                      className={`text-xs font-semibold ${showPercentComplete ? 'text-emerald-600' : 'text-gray-400'}`}>
                      
                          {showPercentComplete ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${showNumQuestions ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                    
                        <div className="flex items-center gap-2">
                          <ListChecks
                        className={`w-4 h-4 ${showNumQuestions ? 'text-emerald-600' : 'text-gray-400'}`} />
                      
                          <span
                        className={`text-sm ${showNumQuestions ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                        
                            Show # of Questions
                          </span>
                        </div>
                        <span
                      className={`text-xs font-semibold ${showNumQuestions ? 'text-emerald-600' : 'text-gray-400'}`}>
                      
                          {showNumQuestions ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${showProgressBar ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                    
                        <div className="flex items-center gap-2">
                          <ToggleLeft
                        className={`w-4 h-4 ${showProgressBar ? 'text-emerald-600' : 'text-gray-400'}`} />
                      
                          <span
                        className={`text-sm ${showProgressBar ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                        
                            Show Progress Bar
                          </span>
                        </div>
                        <span
                      className={`text-xs font-semibold ${showProgressBar ? 'text-emerald-600' : 'text-gray-400'}`}>
                      
                          {showProgressBar ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
            }
            </div>
            {!isInfoLoading &&
          <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-gray-50">
                <div className="sm:hidden flex flex-col gap-2 w-full">
                  <Button
                variant="primary"
                className="w-full justify-center"
                onClick={() => {
                  setIsFormLoading(true);
                  setActiveTab('edit');
                }}
                leftIcon={<Edit className="w-4 h-4" />}>
                
                    Edit Quiz
                  </Button>
                  <Button
                variant="danger"
                className="w-full"
                onClick={() =>
                setDeleteDialogMode(isPublished ? 'published' : 'draft')
                }
                leftIcon={<Trash2 className="w-4 h-4" />}>
                
                    Delete
                  </Button>
                </div>
                <div className="hidden sm:flex items-center gap-2 w-full">
                  <Button
                variant="danger"
                onClick={() =>
                setDeleteDialogMode(isPublished ? 'published' : 'draft')
                }
                leftIcon={<Trash2 className="w-4 h-4" />}>
                
                    Delete
                  </Button>
                  <Button
                variant="primary"
                className="flex-1 justify-center"
                onClick={() => {
                  setIsFormLoading(true);
                  setActiveTab('edit');
                }}
                leftIcon={<Edit className="w-4 h-4" />}>
                
                    Edit Quiz
                  </Button>
                </div>
              </div>
          }
          </div>
        }

        {/* EDIT TAB */}
        {activeTab === 'edit' &&
        <div className="flex flex-col h-full">
            <div className="hidden md:flex h-[57px] px-4 md:px-6 border-b border-gray-200 items-center flex-shrink-0 bg-white">
              <h2 className="text-lg font-bold text-gray-900 flex-1 min-w-0 truncate">
                {isFormLoading ?
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" /> :
              isNewQuiz ?
              'New Quiz' :

              quiz.title
              }
              </h2>
              {!isFormLoading &&
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ml-3 flex-shrink-0 ${status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              
                  <span
                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              
                  {status === 'published' ? 'Published' : 'Draft'}
                </span>
            }
            </div>
            <div className="flex-1 overflow-y-auto">
              {isFormLoading ?
            <FormSkeleton /> :

            <div className="px-4 md:px-6 pt-4 md:pt-6 pb-6 md:pb-8 space-y-4 md:space-y-6">
                  {/* Reference Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Reference Title
                      <span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="New Quiz"
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors" />
                
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Category
                      <span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none rounded-md border border-gray-200 bg-white pl-10 pr-8 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer transition-colors">
                    
                        {CATEGORIES.map((c) =>
                    <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                    )}
                      </select>
                      <div
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full pointer-events-none"
                    style={{
                      backgroundColor:
                      CATEGORIES.find((c) => c.id === category)?.color ||
                      '#6B7280'
                    }} />
                  
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Description
                      <span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <textarea
                  className="w-full min-h-[120px] rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm placeholder:text-gray-400 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-y transition-colors"
                  placeholder="Enter quiz description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} />
                
                  </div>

                  {/* Passing Score */}
                  <div
                className={
                isPublished ? 'opacity-50 pointer-events-none' : ''
                }>
                
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Passing Score (out of 100)
                      <span className="text-red-400 ml-0.5">*</span>
                      {isPublished &&
                  <span className="text-xs text-gray-400 ml-2 font-normal">
                          (locked)
                        </span>
                  }
                    </label>
                    <input
                  type="number"
                  min={0}
                  max={100}
                  value={passingScore}
                  disabled={isPublished}
                  onChange={(e) =>
                  setPassingScore(
                    Math.min(100, Math.max(0, Number(e.target.value)))
                  )
                  }
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed" />
                
                  </div>

                  {/* Score Display & Show/Hide Hints */}
                  <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isPublished ? 'opacity-50 pointer-events-none' : ''}`}>
                
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Score Display
                        <span className="text-red-400 ml-0.5">*</span>
                        {isPublished &&
                    <span className="text-xs text-gray-400 ml-2 font-normal">
                            (locked)
                          </span>
                    }
                      </label>
                      <div className="relative">
                        <select
                      value={scoreDisplay ? 'show-after' : 'hide'}
                      disabled={isPublished}
                      onChange={(e) =>
                      setScoreDisplay(e.target.value !== 'hide')
                      }
                      className="w-full appearance-none rounded-md border border-gray-200 bg-white px-3 pr-8 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed">
                      
                          <option value="show-after">
                            Show Score After Quiz Is Complete
                          </option>
                          <option value="show-during">
                            Show Score During Quiz
                          </option>
                          <option value="hide">Do Not Show Score</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Show/Hide Hints
                        <span className="text-red-400 ml-0.5">*</span>
                        {isPublished &&
                    <span className="text-xs text-gray-400 ml-2 font-normal">
                            (locked)
                          </span>
                    }
                      </label>
                      <div className="relative">
                        <select
                      value={hints ? 'show' : 'hide'}
                      disabled={isPublished}
                      onChange={(e) => setHints(e.target.value === 'show')}
                      className="w-full appearance-none rounded-md border border-gray-200 bg-white px-3 pr-8 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed">
                      
                          <option value="show">Show</option>
                          <option value="hide">Hide</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Toggle Options */}
                  <div
                className={`pt-2 border-t border-gray-100 space-y-3 ${isPublished ? 'opacity-50 pointer-events-none' : ''}`}>
                
                    <ToggleOption
                  label="Show % Complete"
                  description="Display completion percentage during quiz"
                  checked={showPercentComplete}
                  onChange={isPublished ? () => {} : setShowPercentComplete} />
                
                    <ToggleOption
                  label="Show Total # of Questions"
                  description="Display total question count to users"
                  checked={showNumQuestions}
                  onChange={isPublished ? () => {} : setShowNumQuestions} />
                
                    <ToggleOption
                  label="Show Quiz Progress Bar"
                  description="Display progress bar during quiz"
                  checked={showProgressBar}
                  onChange={isPublished ? () => {} : setShowProgressBar} />
                
                  </div>

                  {/* Manage Questions Button (like Configure Answers) */}
                  <button
                onClick={navigateToQuestions}
                className={`w-full text-left rounded-lg border-2 p-4 transition-all group ${questionIds.length === 0 ? 'border-amber-200 bg-amber-50/50 hover:border-amber-300' : 'border-gray-200 bg-gray-50/50 hover:border-teal-400 hover:bg-teal-50/30'}`}>
                
                    <div className="flex items-center gap-3">
                      <div
                    className={`p-2 rounded-lg ${questionIds.length === 0 ? 'bg-amber-100' : 'bg-teal-100'}`}>
                    
                        <ListChecks
                      className={`w-5 h-5 ${questionIds.length === 0 ? 'text-amber-600' : 'text-teal-600'}`} />
                    
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            Manage Questions
                            <span className="text-red-400 ml-0.5">*</span>
                          </span>
                        </div>
                        <p
                      className={`text-xs mt-0.5 ${questionIds.length === 0 ? 'text-amber-500' : 'text-gray-500'}`}>
                      
                          {questionIds.length === 0 ?
                      'No questions added yet — tap to add' :
                      `${questionIds.length} question${questionIds.length !== 1 ? 's' : ''} configured`}
                        </p>
                      </div>
                      <ChevronDown
                    className={`w-5 h-5 -rotate-90 transition-transform group-hover:translate-x-0.5 ${questionIds.length === 0 ? 'text-amber-400' : 'text-gray-400'}`} />
                  
                    </div>
                  </button>
                </div>
            }
            </div>
            {/* Footer */}
            <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-gray-50">
              {isPublished ?
            <>
                  <div className="flex items-center gap-2 w-full sm:hidden">
                    <Button
                  variant="primary"
                  onClick={() => handleSave('published')}
                  leftIcon={<Save className="w-4 h-4" />}
                  className="flex-1">
                  
                      Save
                    </Button>
                  </div>
                  <div className="sm:hidden w-full">
                    <Button
                  variant="danger"
                  onClick={() => setDeleteDialogMode('published')}
                  leftIcon={<Trash2 className="w-4 h-4" />}
                  className="w-full">
                  
                      Delete
                    </Button>
                  </div>
                </> :

            <>
                  <div className="flex items-center gap-2 w-full sm:hidden">
                    <Button
                  variant="outline"
                  onClick={() => handleSave('draft')}
                  leftIcon={<Save className="w-4 h-4" />}
                  className="flex-1 !border-amber-300 !text-amber-700 !bg-amber-50 hover:!bg-amber-100">
                  
                      Draft
                    </Button>
                    <Button
                  variant="primary"
                  onClick={() => handleSave('published')}
                  leftIcon={<Send className="w-4 h-4" />}
                  className="flex-1">
                  
                      Publish
                    </Button>
                  </div>
                  <div className="sm:hidden w-full">
                    <Button
                  variant="danger"
                  onClick={() => setDeleteDialogMode('draft')}
                  leftIcon={<Trash2 className="w-4 h-4" />}
                  className="w-full">
                  
                      Delete
                    </Button>
                  </div>
                </>
            }
              <div className="hidden sm:block">
                <Button
                variant="danger"
                onClick={() =>
                setDeleteDialogMode(isPublished ? 'published' : 'draft')
                }
                leftIcon={<Trash2 className="w-4 h-4" />}>
                
                  Delete
                </Button>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                {isPublished ?
              <Button
                variant="primary"
                onClick={() => handleSave('published')}
                leftIcon={<Save className="w-4 h-4" />}>
                
                    Save
                  </Button> :

              <>
                    <Button
                  variant="outline"
                  onClick={() => handleSave('draft')}
                  leftIcon={<Save className="w-4 h-4" />}
                  className="!border-amber-300 !text-amber-700 !bg-amber-50 hover:!bg-amber-100">
                  
                      Save as Draft
                    </Button>
                    <Button
                  variant="primary"
                  onClick={() => handleSave('published')}
                  leftIcon={<Send className="w-4 h-4" />}>
                  
                      Publish
                    </Button>
                  </>
              }
              </div>
            </div>
          </div>
        }

        {/* QUESTIONS TAB */}
        {activeTab === 'questions' &&
        <div className="flex flex-col h-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {questionsView === 'list' &&
            <motion.div
              key="questions-list-view"
              initial="enterFromLeft"
              animate="center"
              exit="exitToLeft"
              variants={slideVariants}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="flex flex-col h-full">
              
                  {/* Desktop Header with Add Button + TableActionBar */}
                  <div className="hidden md:block flex-shrink-0 bg-white border-b border-gray-200 relative">
                    {!isPublished &&
                <button
                  onClick={() => setShowAddQuestionsModal(true)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-gray-50 rounded transition-colors"
                  title="Add questions">
                  
                        <Plus className="w-5 h-5 text-gray-600" />
                      </button>
                }
                    <div
                  className={`[&>div]:!border-b-0 ${!isPublished ? '[&>div>div]:!pl-14' : ''}`}>
                  
                      <TableActionBar
                    showSearch={true}
                    searchPlaceholder="Search quiz questions..."
                    onSearch={(q) => setQuizSearchQuery(q)}
                    showFilter={true}
                    allFilterLabel="All Questions"
                    onFilter={(filterId) => setQuizFilter(filterId)}
                    showSort={true}
                    onSort={(sortId) => setQuizSort(sortId)}
                    customSortOptions={[
                    {
                      id: 'manual',
                      label: 'Presentation Order',
                      icon: GripVertical
                    },
                    {
                      id: 'created_desc',
                      label: 'Newest First',
                      icon: Calendar
                    },
                    {
                      id: 'created_asc',
                      label: 'Oldest First',
                      icon: Calendar
                    },
                    {
                      id: 'title_asc',
                      label: 'Title (A - Z)',
                      icon: Type
                    },
                    {
                      id: 'title_desc',
                      label: 'Title (Z - A)',
                      icon: Type
                    }]
                    }
                    defaultSortLabel="Presentation Order"
                    showCheckboxToggle={!isPublished}
                    checkboxesVisible={quizCheckboxesVisible}
                    onToggleCheckboxes={handleToggleQuizCheckboxes}
                    showItemsPerPage={true}
                    itemsPerPage={quizItemsPerPage}
                    itemsPerPageOptions={[5, 10, 25, 50]}
                    onItemsPerPageChange={(val) => setQuizItemsPerPage(val)} />
                  
                    </div>
                  </div>

                  {/* Mobile Header */}
                  <div className="md:hidden flex-shrink-0 bg-white border-b border-gray-200 relative">
                    <div className="[&>div]:!border-b-0">
                      <TableActionBar
                    showSearch={true}
                    searchPlaceholder="Search quiz questions..."
                    onSearch={(q) => setQuizSearchQuery(q)}
                    showFilter={true}
                    allFilterLabel="All Questions"
                    onFilter={(filterId) => setQuizFilter(filterId)}
                    showSort={true}
                    onSort={(sortId) => setQuizSort(sortId)}
                    customSortOptions={[
                    {
                      id: 'manual',
                      label: 'Presentation Order',
                      icon: GripVertical
                    },
                    {
                      id: 'created_desc',
                      label: 'Newest First',
                      icon: Calendar
                    },
                    {
                      id: 'created_asc',
                      label: 'Oldest First',
                      icon: Calendar
                    },
                    {
                      id: 'title_asc',
                      label: 'Title (A - Z)',
                      icon: Type
                    },
                    {
                      id: 'title_desc',
                      label: 'Title (Z - A)',
                      icon: Type
                    }]
                    }
                    defaultSortLabel="Presentation Order"
                    showCheckboxToggle={!isPublished}
                    checkboxesVisible={quizCheckboxesVisible}
                    onToggleCheckboxes={handleToggleQuizCheckboxes}
                    showItemsPerPage={true}
                    itemsPerPage={quizItemsPerPage}
                    itemsPerPageOptions={[5, 10, 25, 50]}
                    onItemsPerPageChange={(val) => setQuizItemsPerPage(val)} />
                  
                    </div>
                  </div>

                  {/* Bulk Edit Bar — shown whenever checkboxes are visible */}
                  <AnimatePresence>
                    {quizCheckboxesVisible &&
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto'
                  }}
                  exit={{
                    opacity: 0,
                    height: 0
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-b border-gray-700 shadow-lg overflow-hidden flex-shrink-0">
                  
                        <motion.div
                    initial={{
                      y: -20
                    }}
                    animate={{
                      y: 0
                    }}
                    exit={{
                      y: -20
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.32, 0.72, 0, 1]
                    }}
                    className="px-4 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
                    
                          {/* Left Side */}
                          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                              <motion.div
                          initial={{
                            scale: 0
                          }}
                          animate={{
                            scale: 1
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 25,
                            delay: 0.1
                          }}
                          className="flex-shrink-0">
                          
                                <Checkbox
                            checked={(() => {
                              const filtered =
                              getFilteredSortedQuizQuestions();
                              return (
                                filtered.length > 0 &&
                                filtered.every((q) =>
                                bulkSelectedQuestionIds.has(q.id)
                                ));

                            })()}
                            indeterminate={(() => {
                              const filtered =
                              getFilteredSortedQuizQuestions();
                              const allSelected =
                              filtered.length > 0 &&
                              filtered.every((q) =>
                              bulkSelectedQuestionIds.has(q.id)
                              );
                              return (
                                !allSelected &&
                                bulkSelectedQuestionIds.size > 0);

                            })()}
                            onChange={() => {
                              const filtered =
                              getFilteredSortedQuizQuestions();
                              handleToggleSelectAllQuizQuestions(
                                filtered.map((q) => q.id)
                              );
                            }}
                            id="quiz-bulk-select-all" />
                          
                              </motion.div>
                              <motion.div
                          initial={{
                            scale: 0
                          }}
                          animate={{
                            scale: 1
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 25,
                            delay: 0.15
                          }}
                          className="relative w-7 h-7 sm:w-8 sm:h-8 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                          
                                <span className="text-xs sm:text-sm font-bold leading-none">
                                  {bulkSelectedQuestionIds.size}
                                </span>
                              </motion.div>
                              <motion.div
                          initial={{
                            opacity: 0,
                            x: -10
                          }}
                          animate={{
                            opacity: 1,
                            x: 0
                          }}
                          transition={{
                            duration: 0.3,
                            delay: 0.2
                          }}
                          className="hidden sm:flex flex-col gap-0.5 min-w-0">
                          
                                <AnimatePresence mode="wait">
                                  {(() => {
                              const filtered =
                              getFilteredSortedQuizQuestions();
                              const allSelected =
                              filtered.length > 0 &&
                              filtered.every((q) =>
                              bulkSelectedQuestionIds.has(q.id)
                              );
                              if (allSelected) {
                                return (
                                  <motion.div
                                    key="all-selected"
                                    initial={{
                                      opacity: 0,
                                      y: -5
                                    }}
                                    animate={{
                                      opacity: 1,
                                      y: 0
                                    }}
                                    exit={{
                                      opacity: 0,
                                      y: 5
                                    }}
                                    transition={{
                                      duration: 0.2
                                    }}
                                    className="flex flex-col">
                                    
                                          <span className="text-xs sm:text-sm font-semibold text-white leading-tight truncate">
                                            All {filtered.length} question
                                            {filtered.length !== 1 ?
                                      's' :
                                      ''}{' '}
                                            selected
                                          </span>
                                          <button
                                      onClick={() =>
                                      setBulkSelectedQuestionIds(
                                        new Set()
                                      )
                                      }
                                      className="text-[10px] sm:text-xs text-gray-300 hover:text-white transition-colors text-left leading-tight mt-0.5 truncate">
                                      
                                            Clear selection →
                                          </button>
                                        </motion.div>);

                              }
                              return (
                                <motion.div
                                  key="partial-selected"
                                  initial={{
                                    opacity: 0,
                                    y: -5
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0
                                  }}
                                  exit={{
                                    opacity: 0,
                                    y: 5
                                  }}
                                  transition={{
                                    duration: 0.2
                                  }}
                                  className="flex flex-col">
                                  
                                        <span className="text-xs sm:text-sm font-semibold text-white leading-tight truncate">
                                          {bulkSelectedQuestionIds.size}{' '}
                                          question
                                          {bulkSelectedQuestionIds.size !== 1 ?
                                    's' :
                                    ''}{' '}
                                          selected
                                        </span>
                                        <button
                                    onClick={() => {
                                      handleToggleSelectAllQuizQuestions(
                                        filtered.map((q) => q.id)
                                      );
                                    }}
                                    className="text-[10px] sm:text-xs text-teal-300 hover:text-teal-200 font-medium transition-colors text-left leading-tight mt-0.5 truncate">
                                    
                                          Select all {filtered.length} questions
                                          →
                                        </button>
                                      </motion.div>);

                            })()}
                                </AnimatePresence>
                              </motion.div>
                            </div>

                            {/* Detach Action Button */}
                            <motion.div
                        initial={{
                          opacity: 0,
                          x: -10
                        }}
                        animate={{
                          opacity: 1,
                          x: 0
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 0.25
                        }}
                        className="flex items-center gap-2">
                        
                              <button
                          onClick={handleBulkDetach}
                          className="p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 rounded-lg transition-all duration-200 backdrop-blur-sm border border-amber-400/20"
                          aria-label="Detach selected"
                          title="Detach selected questions">
                          
                                <Unlink className="w-4 h-4" />
                              </button>
                            </motion.div>
                          </div>

                          {/* Right Side - Close */}
                          <motion.div
                      initial={{
                        opacity: 0,
                        x: 10
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        duration: 0.3,
                        delay: 0.3
                      }}
                      className="flex items-center gap-2 flex-shrink-0">
                      
                            <button
                        onClick={() => {
                          setBulkSelectedQuestionIds(new Set());
                          setQuizCheckboxesVisible(false);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex-shrink-0"
                        aria-label="Close bulk mode">
                        
                              <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                }
                  </AnimatePresence>

                  {/* Order hint banners */}
                  {!isPublished &&
              questionIds.length > 0 &&
              !quizCheckboxesVisible &&
              <>
                        {quizSort === 'manual' &&
                quizFilter === 'all' &&
                !quizSearchQuery ?
                <div className="flex-shrink-0 bg-gray-50/60 border-b border-gray-100">
                            <div className="px-4 md:px-6 py-1.5 flex items-center gap-2 text-[11px] text-gray-400">
                              <span className="truncate text-[10px]">
                                Drag to reorder · This is the order questions
                                will appear in the quiz
                              </span>
                            </div>
                          </div> :

                <div className="flex-shrink-0 bg-gray-50/60 border-b border-gray-100">
                            <div className="px-4 md:px-6 py-1.5 flex items-center gap-2 text-[11px] text-gray-400">
                              <button
                      onClick={() => {
                        setQuizSort('manual');
                        setQuizFilter('all');
                        setQuizSearchQuery('');
                      }}
                      className="p-0.5 rounded hover:bg-gray-200/60 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                      title="Reset to presentation order">
                      
                                <RotateCcw className="w-3 h-3" />
                              </button>
                              <span>
                                Reordering disabled while sorting or filtering.
                              </span>
                            </div>
                          </div>
                }
                      </>
              }

                  <div className="flex-1 overflow-y-auto">
                    <div className="px-4 md:px-0 flex flex-col min-h-full">
                      {questionIds.length === 0 ?
                  <div className="text-center py-12 mx-4 md:mx-6 mt-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                          <ListChecks className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm text-gray-500 mb-1">
                            No questions added yet
                          </p>
                          <p className="text-xs text-gray-400 mb-4">
                            Add questions from the question bank
                          </p>
                          {!isPublished &&
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddQuestionsModal(true)}
                      leftIcon={<Plus className="w-4 h-4" />}>
                      
                              Browse Question Bank
                            </Button>
                    }
                        </div> :

                  (() => {
                    const filteredQuestions =
                    getFilteredSortedQuizQuestions();
                    if (filteredQuestions.length === 0) {
                      return (
                        <div className="text-center py-12 mx-4 md:mx-6 mt-4">
                                <Search className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">
                                  No questions match your filters
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Try adjusting your search or filter criteria
                                </p>
                              </div>);

                    }
                    const visibleQuestions = filteredQuestions.slice(
                      0,
                      quizDisplayCount
                    );
                    const hasMore =
                    filteredQuestions.length > quizDisplayCount;
                    return (
                      <>
                              <div className="divide-y divide-gray-100">
                                {visibleQuestions.map((q) => {
                            const index = questionIds.indexOf(q.id);
                            const categoryConfig =
                            QUESTION_CATEGORY_CONFIG[q.category] || {
                              color: '#6B7280',
                              label: q.category
                            };
                            const typeConfig =
                            QUESTION_TYPE_CONFIG[q.type] ||
                            QUESTION_TYPE_CONFIG.multiple;
                            const TypeIcon = typeConfig.icon;
                            const isSelected =
                            bulkSelectedQuestionIds.has(q.id);
                            const canReorder =
                            !isPublished &&
                            !quizCheckboxesVisible &&
                            !quizSearchQuery &&
                            quizFilter === 'all' &&
                            quizSort === 'manual';
                            return (
                              <div
                                key={`qt-${q.id}-${index}`}
                                draggable={canReorder}
                                onDragStart={(e) =>
                                handleDragStart(e, index)
                                }
                                onDragOver={(e) =>
                                handleDragOver(e, index)
                                }
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                className={`group flex items-center gap-0 transition-all duration-200 cursor-pointer select-none hover:bg-gray-50 ${dragIndex === index ? 'opacity-30 scale-95' : ''} ${dragOverIndex === index && dragIndex !== index ? 'ring-2 ring-teal-400 rounded' : ''} ${isSelected ? 'bg-teal-50/40' : ''}`}
                                onClick={() => {
                                  if (quizCheckboxesVisible) {
                                    handleToggleBulkSelect(q.id);
                                  } else {
                                    setSelectedQuestionId(q.id);
                                    setQuestionsView('detail');
                                  }
                                }}>
                                
                                      {/* Checkbox or Numbered drag handle */}
                                      {quizCheckboxesVisible ?
                                <div
                                  className="flex items-center py-3 pl-4 md:pl-6 pr-1 flex-shrink-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}>
                                  
                                          <Checkbox
                                    checked={isSelected}
                                    onChange={() =>
                                    handleToggleBulkSelect(q.id)
                                    }
                                    id={`quiz-q-${q.id}`} />
                                  
                                        </div> :
                                canReorder ?
                                <div
                                  className="flex items-center justify-center py-3 pl-4 md:pl-6 pr-2 flex-shrink-0 cursor-grab active:cursor-grabbing"
                                  onClick={(e) => e.stopPropagation()}
                                  title="Drag to reorder">
                                  
                                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] leading-none font-medium tabular-nums select-none transition-all duration-200 bg-teal-500/10 text-teal-600 group-hover:bg-teal-500 group-hover:text-white">
                                            {index + 1}
                                          </div>
                                        </div> :

                                <div className="pl-4 md:pl-6 flex-shrink-0" />
                                }

                                      {/* Category color bar */}
                                      <div className="flex items-center py-3 flex-shrink-0">
                                        <div
                                    className="w-1 h-10 rounded-full"
                                    style={{
                                      backgroundColor:
                                      categoryConfig.color
                                    }} />
                                  
                                      </div>

                                      {/* Content area */}
                                      <div className="flex-1 flex items-center gap-2.5 px-3 py-3 min-w-0 pr-4 md:pr-6">
                                        {/* Type icon */}
                                        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-500 flex-shrink-0">
                                          <TypeIcon />
                                        </div>

                                        {/* Title + text */}
                                        <div className="flex-1 min-w-0">
                                          <h3 className="text-gray-900 text-sm leading-tight truncate group-hover:font-semibold transition-all duration-200">
                                            {q.title}
                                          </h3>
                                          {q.text &&
                                    <p className="text-gray-400 text-xs leading-snug mt-0.5 truncate">
                                              {q.text}
                                            </p>
                                    }
                                        </div>

                                        {/* Actions */}
                                        {!quizCheckboxesVisible &&
                                  <div
                                    className="flex items-center flex-shrink-0"
                                    onClick={(e) => e.stopPropagation()}>
                                    
                                            <RowActionsDropdown
                                      onAction={(action) => {
                                        if (action === 'view') {
                                          navigateToQuestionDetail(
                                            q.id,
                                            'info'
                                          );
                                        } else if (
                                        action === 'preview')
                                        {
                                          navigateToQuestionDetail(
                                            q.id,
                                            'preview'
                                          );
                                        } else if (
                                        action === 'remove')
                                        {
                                          setRemoveConfirmId(q.id);
                                        }
                                      }}
                                      excludeActions={[
                                      'edit',
                                      'fork',
                                      'questions',
                                      'delete',
                                      ...(isPublished ?
                                      ['remove'] :
                                      [])]
                                      } />
                                    
                                          </div>
                                  }
                                      </div>
                                    </div>);

                          })}
                              </div>
                              {/* Spacer */}
                              <div className="flex-1" />
                              {/* Sticky Show More bar */}
                              <div className="flex-shrink-0 sticky bottom-0 border-t border-gray-200 bg-white">
                                {isLoadingMore ?
                          <div className="flex items-center gap-2 px-6 py-2">
                                    <Spinner className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-400">
                                      Loading…
                                    </span>
                                  </div> :
                          hasMore ?
                          <button
                            onClick={handleLoadMoreQuizQuestions}
                            className="w-full flex items-center justify-between px-6 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors">
                            
                                    <span className="flex items-center gap-1.5">
                                      <ChevronDown className="w-3 h-3" />
                                      Show more
                                    </span>
                                    <span className="text-gray-400">
                                      {visibleQuestions.length} of{' '}
                                      {filteredQuestions.length}
                                    </span>
                                  </button> :

                          <div className="flex items-center justify-between px-6 py-2 text-xs text-gray-400">
                                    <span>
                                      {filteredQuestions.length} questions
                                      loaded
                                    </span>
                                    <span>
                                      {filteredQuestions.length} of{' '}
                                      {filteredQuestions.length}
                                    </span>
                                  </div>
                          }
                              </div>
                            </>);

                  })()
                  }
                    </div>
                  </div>

                  {/* Add Questions button for mobile */}
                  {!isPublished &&
              <div className="md:hidden px-4 py-3 border-t border-gray-200 flex-shrink-0 bg-gray-50">
                      <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => setShowAddQuestionsModal(true)}
                  leftIcon={<Plus className="w-4 h-4" />}>
                  
                        Add Questions
                      </Button>
                    </div>
              }
                </motion.div>
            }

              {questionsView === 'detail' &&
            selectedQuestionId &&
            (() => {
              const q = MOCK_QUESTIONS.find(
                (mq) => mq.id === selectedQuestionId
              );
              if (!q) return null;
              return (
                <motion.div
                  key={`qt-detail-${selectedQuestionId}`}
                  initial="enterFromRight"
                  animate="center"
                  exit="exitToRight"
                  variants={slideVariants}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="flex flex-col h-full">
                  
                      <div className="h-[57px] px-4 md:px-6 border-b border-gray-200 flex items-center gap-2 md:gap-3 flex-shrink-0 bg-white">
                        <button
                      onClick={navigateBackToQuestions}
                      className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                      
                          <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <h2 className="text-lg font-bold text-gray-900 flex-1 min-w-0 truncate">
                          {q.title}
                        </h2>
                        {/* Info / Preview toggle */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5 flex-shrink-0">
                          <button
                        onClick={() => setQuestionDetailTab('info')}
                        className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${questionDetailTab === 'info' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        
                            <Info className="w-3.5 h-3.5" />
                          </button>
                          <button
                        onClick={() => setQuestionDetailTab('preview')}
                        className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${questionDetailTab === 'preview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        
                            <MonitorPlay className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Preview Tab */}
                      {questionDetailTab === 'preview' ?
                  <div className="flex-1 overflow-y-auto bg-gray-50/50">
                          <div className="p-4 md:p-8 flex items-center justify-center min-h-full">
                            <QuestionPreview
                        title={q.title}
                        text={q.text}
                        type={q.type}
                        options={q.options}
                        matchSubType={q.matchSubType} />
                      
                          </div>
                        </div> :

                  <div className="flex-1 overflow-y-auto">
                          <div className="px-4 md:px-6 pt-4 md:pt-6 pb-6 md:pb-8 space-y-4 md:space-y-6">
                            {/* Question Text & Date */}
                            <div>
                              {q.text &&
                        <p className="text-sm text-gray-600 leading-relaxed">
                                  {q.text}
                                </p>
                        }
                              <span
                          className={`text-[11px] text-gray-400 ${q.text ? 'mt-1.5' : ''} block`}>
                          
                                {q.createdAt.toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                              </span>
                            </div>

                            {/* Type & Category - Compact Row */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="p-1 bg-white rounded shadow-sm">
                                  {(() => {
                              const typeConfig =
                              QUESTION_TYPE_CONFIG[q.type];
                              const TypeIcon = typeConfig?.icon;
                              return TypeIcon ?
                              <div className="text-gray-500">
                                        <TypeIcon />
                                      </div> :

                              <HelpCircleIcon className="w-3.5 h-3.5 text-gray-500" />;

                            })()}
                                </div>
                                <span className="text-xs font-medium text-gray-700">
                                  {TYPE_LABELS[q.type] || q.type}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <div
                            className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm"
                            style={{
                              backgroundColor:
                              QUESTION_CATEGORY_CONFIG[q.category]?.
                              color || '#6B7280'
                            }} />
                          
                                <span className="text-xs font-medium text-gray-600">
                                  {QUESTION_CATEGORY_CONFIG[q.category]?.
                            label || q.category}
                                </span>
                              </div>
                            </div>

                            {/* Answer Configuration */}
                            <div className="pt-2 border-t border-gray-100">
                              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 block">
                                Answer Configuration
                              </label>

                              {/* Multiple Choice */}
                              {q.type === 'multiple' &&
                        q.options &&
                        q.options.length > 0 &&
                        <div className="space-y-2">
                                    {q.options.map((opt, i) => {
                            const isCorrect = i === 0;
                            return (
                              <div
                                key={i}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors ${isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                                
                                          <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-emerald-500 text-white' : 'border-2 border-gray-300 bg-white'}`}>
                                  
                                            {isCorrect ?
                                  <CheckSquare className="w-3.5 h-3.5" /> :

                                  <span className="text-[10px] font-semibold text-gray-500">
                                                {String.fromCharCode(65 + i)}
                                              </span>
                                  }
                                          </div>
                                          <span
                                  className={`text-sm ${isCorrect ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                                  
                                            {opt ||
                                  <span className="text-gray-400 italic">
                                                Empty option
                                              </span>
                                  }
                                          </span>
                                        </div>);

                          })}
                                    <div className="flex items-center gap-1.5 mt-2 px-1">
                                      <Info className="w-3 h-3 text-gray-400" />
                                      <span className="text-[11px] text-gray-400">
                                        Single correct answer
                                      </span>
                                    </div>
                                  </div>
                        }

                              {/* True/False */}
                              {q.type === 'true-false' &&
                        <div className="grid grid-cols-2 gap-3">
                                  {['True', 'False'].map((label, idx) => {
                            const isCorrect = idx === 0;
                            return (
                              <div
                                key={idx}
                                className={`relative rounded-lg border-2 text-center py-3 px-4 ${isCorrect ? 'border-emerald-400 bg-emerald-50/50' : 'border-gray-100 bg-gray-50'}`}>
                                
                                        {isCorrect &&
                                <div className="absolute top-2 right-2 text-emerald-500">
                                            <CheckCircle2 className="w-4 h-4" />
                                          </div>
                                }
                                        <span
                                  className={`text-sm font-bold ${isCorrect ? 'text-emerald-700' : 'text-gray-500'}`}>
                                  
                                          {label}
                                        </span>
                                      </div>);

                          })}
                                </div>
                        }

                              {/* Matching */}
                              {q.type === 'matching' &&
                        <div className="space-y-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold ${q.matchSubType === 'image' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-gray-100 text-gray-600'}`}>
                              
                                      {q.matchSubType === 'image' ?
                              <>
                                          <Image className="w-3 h-3" /> Image
                                          Match
                                        </> :

                              <>
                                          <Type className="w-3 h-3" /> Text
                                          Match
                                        </>
                              }
                                    </span>
                                    <span className="text-[11px] text-gray-400">
                                      3/3 pairs configured
                                    </span>
                                  </div>
                                  {[
                          {
                            prompt: 'Prompt 1',
                            answer: 'Answer 1'
                          },
                          {
                            prompt: 'Prompt 2',
                            answer: 'Answer 2'
                          },
                          {
                            prompt: 'Prompt 3',
                            answer: 'Answer 3'
                          }].
                          map((pair, index) =>
                          <div
                            key={index}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg border bg-white border-gray-200">
                            
                                      <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-gray-500">
                                          {index + 1}
                                        </span>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <span className="text-sm block truncate text-gray-800">
                                          {pair.prompt}
                                        </span>
                                      </div>
                                      <div className="flex-shrink-0 text-gray-300">
                                        <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}>
                                
                                          <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                
                                        </svg>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <span className="text-sm block truncate text-gray-600">
                                          {pair.answer}
                                        </span>
                                      </div>
                                    </div>
                          )}
                                </div>
                        }

                              {/* Open Answer */}
                              {q.type === 'open' &&
                        <div className="space-y-3">
                                  <div className="px-3 py-3 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-center">
                                    <span className="text-xs text-gray-400 italic">
                                      No answer configured
                                    </span>
                                  </div>
                                </div>
                        }
                            </div>
                          </div>
                        </div>
                  }
                      {/* Footer */}
                      <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 flex items-center justify-end bg-gray-50">
                        {!isPublished &&
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                      setRemoveConfirmId(selectedQuestionId)
                      }
                      leftIcon={<Unlink className="w-4 h-4" />}
                      className="!bg-amber-500 !text-white hover:!bg-amber-600 !border-amber-500 hover:!border-amber-600 !shadow-md">
                      
                            Detach
                          </Button>
                    }
                      </div>
                    </motion.div>);

            })()}
            </AnimatePresence>
          </div>
        }

        {/* PREVIEW TAB */}
        {activeTab === 'preview' &&
        <div className="flex flex-col h-full">
            <div className="hidden md:flex h-[57px] px-6 border-b border-gray-200 items-center flex-shrink-0 bg-white">
              <h2 className="text-lg font-bold text-gray-900 flex-1 min-w-0 truncate">
                Preview
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-50/50">
              <div className="p-4 md:p-8 flex items-center justify-center min-h-full">
                <div className="w-full max-w-md">
                  {/* Quiz Preview Card */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-cyan-50">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {title}
                      </h3>
                      {description &&
                    <p className="text-sm text-gray-600">{description}</p>
                    }
                    </div>
                    {/* Info */}
                    <div className="px-6 py-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Questions</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {quiz.numQuestions}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Passing Score
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {passingScore}%
                        </span>
                      </div>
                      {showProgressBar &&
                    <div className="pt-2">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-0 bg-teal-500 rounded-full" />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Progress bar preview
                          </p>
                        </div>
                    }
                    </div>
                    {/* Start Button */}
                    <div className="px-6 py-4 border-t border-gray-100">
                      <button className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors">
                        Start Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      {/* Add Questions Modal */}
      <TombstoneForm
        isOpen={showAddQuestionsModal}
        onClose={() => {
          setShowAddQuestionsModal(false);
          setSelectedQuestionIds(new Set());
          setSearchQuery('');
          setAddFilterCategory('');
          setAddSort('');
          setAddItemsPerPage(10);
          setAddDisplayCount(10);
          setAddQuestionsExpanded(false);
        }}
        title="Add Questions"
        maxWidth="lg"
        isExpanded={addQuestionsExpanded}
        onToggleExpand={() => setAddQuestionsExpanded(!addQuestionsExpanded)}>
        
        {/* TableActionBar toolbar */}
        <div className="[&>div]:!border-b-0 border-b border-gray-100">
          <TableActionBar
            showSearch={true}
            searchPlaceholder="Search available questions..."
            onSearch={(q) => {
              setSearchQuery(q);
              setAddDisplayCount(10);
            }}
            showFilter={true}
            allFilterLabel="All Questions"
            onFilter={(filterId) => {
              setAddFilterCategory(filterId === 'all' ? '' : filterId);
              setAddDisplayCount(addItemsPerPage);
            }}
            showSort={true}
            onSort={(sortId) => {
              setAddSort(sortId);
              setAddDisplayCount(10);
            }}
            showCheckboxToggle={true}
            checkboxesVisible={true}
            onToggleCheckboxes={() => {}}
            showItemsPerPage={true}
            itemsPerPage={addItemsPerPage}
            itemsPerPageOptions={[5, 10, 25, 50]}
            onItemsPerPageChange={(val) => {
              setAddItemsPerPage(val);
              setAddDisplayCount(val);
            }} />
          
        </div>

        {/* Question List */}
        <div className="px-6 py-0">
          {(() => {
            const existingIds = new Set(questionIds);
            let available = MOCK_QUESTIONS.filter(
              (q) =>
              q.status === 'active' &&
              !existingIds.has(q.id) && (
              addFilterCategory === '' ||
              q.category === addFilterCategory) && (
              q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.text?.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            // Apply sort
            if (addSort === 'title_asc') {
              available = [...available].sort((a, b) =>
              a.title.localeCompare(b.title)
              );
            } else if (addSort === 'title_desc') {
              available = [...available].sort((a, b) =>
              b.title.localeCompare(a.title)
              );
            } else if (addSort === 'created_asc') {
              available = [...available].sort(
                (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
              );
            } else if (addSort === 'created_desc') {
              available = [...available].sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
              );
            }
            if (available.length === 0) {
              return (
                <div className="text-center py-8 text-sm text-gray-500">
                  {searchQuery || addFilterCategory ?
                  'No matching questions found.' :
                  'All questions have been added to this quiz.'}
                </div>);

            }
            const visibleQuestions = available.slice(0, addDisplayCount);
            const hasMore = available.length > addDisplayCount;
            const allVisibleSelected = visibleQuestions.every((q) =>
            selectedQuestionIds.has(q.id)
            );
            const someSelected = visibleQuestions.some((q) =>
            selectedQuestionIds.has(q.id)
            );
            return (
              <>
                {/* Bulk bar — always visible since checkboxes always on */}
                <AnimatePresence>
                  {available.length > 0 &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto'
                    }}
                    exit={{
                      opacity: 0,
                      height: 0
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.32, 0.72, 0, 1]
                    }}
                    className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-b border-gray-700 shadow-lg overflow-hidden flex-shrink-0">
                    
                      <motion.div
                      initial={{
                        y: -20
                      }}
                      animate={{
                        y: 0
                      }}
                      exit={{
                        y: -20
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.32, 0.72, 0, 1]
                      }}
                      className="px-4 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
                      
                        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <motion.div
                            initial={{
                              scale: 0
                            }}
                            animate={{
                              scale: 1
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                              delay: 0.1
                            }}
                            className="flex-shrink-0">
                            
                              <Checkbox
                              checked={allVisibleSelected}
                              indeterminate={
                              someSelected && !allVisibleSelected
                              }
                              onChange={() => {
                                if (allVisibleSelected) {
                                  const next = new Set(selectedQuestionIds);
                                  available.forEach((q) => next.delete(q.id));
                                  setSelectedQuestionIds(next);
                                } else {
                                  const next = new Set(selectedQuestionIds);
                                  available.forEach((q) => next.add(q.id));
                                  setSelectedQuestionIds(next);
                                }
                              }}
                              id="add-bulk-select-all" />
                            
                            </motion.div>
                            <motion.div
                            initial={{
                              scale: 0
                            }}
                            animate={{
                              scale: 1
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                              delay: 0.15
                            }}
                            className="relative w-7 h-7 sm:w-8 sm:h-8 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                            
                              <span className="text-xs sm:text-sm font-bold leading-none">
                                {selectedQuestionIds.size}
                              </span>
                            </motion.div>
                            <motion.div
                            initial={{
                              opacity: 0,
                              x: -10
                            }}
                            animate={{
                              opacity: 1,
                              x: 0
                            }}
                            transition={{
                              duration: 0.3,
                              delay: 0.2
                            }}
                            className="hidden sm:flex flex-col gap-0.5 min-w-0">
                            
                              <AnimatePresence mode="wait">
                                {allVisibleSelected &&
                              selectedQuestionIds.size > 0 ?
                              <motion.div
                                key="all-selected-add"
                                initial={{
                                  opacity: 0,
                                  y: -5
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0
                                }}
                                exit={{
                                  opacity: 0,
                                  y: 5
                                }}
                                transition={{
                                  duration: 0.2
                                }}
                                className="flex flex-col">
                                
                                    <span className="text-xs sm:text-sm font-semibold text-white leading-tight truncate">
                                      All {available.length} question
                                      {available.length !== 1 ? 's' : ''}{' '}
                                      selected
                                    </span>
                                    <button
                                  onClick={() =>
                                  setSelectedQuestionIds(new Set())
                                  }
                                  className="text-[10px] sm:text-xs text-gray-300 hover:text-white transition-colors text-left leading-tight mt-0.5 truncate">
                                  
                                      Clear selection →
                                    </button>
                                  </motion.div> :

                              <motion.div
                                key="partial-selected-add"
                                initial={{
                                  opacity: 0,
                                  y: -5
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0
                                }}
                                exit={{
                                  opacity: 0,
                                  y: 5
                                }}
                                transition={{
                                  duration: 0.2
                                }}
                                className="flex flex-col">
                                
                                    <span className="text-xs sm:text-sm font-semibold text-white leading-tight truncate">
                                      {selectedQuestionIds.size} question
                                      {selectedQuestionIds.size !== 1 ?
                                  's' :
                                  ''}{' '}
                                      selected
                                    </span>
                                    <button
                                  onClick={() => {
                                    const next = new Set(
                                      selectedQuestionIds
                                    );
                                    available.forEach((q) => next.add(q.id));
                                    setSelectedQuestionIds(next);
                                  }}
                                  className="text-[10px] sm:text-xs text-teal-300 hover:text-teal-200 font-medium transition-colors text-left leading-tight mt-0.5 truncate">
                                  
                                      Select all {available.length} questions →
                                    </button>
                                  </motion.div>
                              }
                              </AnimatePresence>
                            </motion.div>
                          </div>

                          {/* Add Action Button */}
                          <motion.div
                          initial={{
                            opacity: 0,
                            x: -10
                          }}
                          animate={{
                            opacity: 1,
                            x: 0
                          }}
                          transition={{
                            duration: 0.3,
                            delay: 0.25
                          }}
                          className="flex items-center gap-2">
                          
                            <button
                            onClick={handleAddSelectedQuestions}
                            className="p-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 rounded-lg transition-all duration-200 backdrop-blur-sm border border-teal-400/20"
                            aria-label="Add selected"
                            title="Add selected questions">
                            
                              <Plus className="w-4 h-4" />
                            </button>
                          </motion.div>
                        </div>

                        {/* Right Side - Close */}
                        <motion.div
                        initial={{
                          opacity: 0,
                          x: 10
                        }}
                        animate={{
                          opacity: 1,
                          x: 0
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 0.3
                        }}
                        className="flex items-center gap-2 flex-shrink-0">
                        
                          <button
                          onClick={() => setSelectedQuestionIds(new Set())}
                          className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex-shrink-0"
                          aria-label="Clear selection">
                          
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  }
                </AnimatePresence>

                {/* Question rows */}
                <div className="divide-y divide-gray-100">
                  {visibleQuestions.map((q) => {
                    const isSelected = selectedQuestionIds.has(q.id);
                    const catConfig = QUESTION_CATEGORY_CONFIG[q.category] || {
                      color: '#6B7280',
                      label: q.category
                    };
                    const typeConfig =
                    QUESTION_TYPE_CONFIG[q.type] ||
                    QUESTION_TYPE_CONFIG.multiple;
                    const TypeIcon = typeConfig.icon;
                    return (
                      <div
                        key={q.id}
                        onClick={() => {
                          const next = new Set(selectedQuestionIds);
                          if (isSelected) {
                            next.delete(q.id);
                          } else {
                            next.add(q.id);
                          }
                          setSelectedQuestionIds(next);
                        }}
                        className={`group flex items-center gap-0 transition-all duration-200 cursor-pointer select-none hover:bg-gray-50 ${isSelected ? 'bg-teal-50/40' : ''}`}>
                        
                        {/* Checkbox */}
                        <div
                          className="flex items-center py-3 pl-4 md:pl-6 pr-1 flex-shrink-0"
                          onClick={(e) => e.stopPropagation()}>
                          
                          <Checkbox
                            checked={isSelected}
                            onChange={() => {
                              const next = new Set(selectedQuestionIds);
                              if (isSelected) {
                                next.delete(q.id);
                              } else {
                                next.add(q.id);
                              }
                              setSelectedQuestionIds(next);
                            }}
                            id={`add-q-${q.id}`} />
                          
                        </div>

                        {/* Category color bar */}
                        <div className="flex items-center py-3 flex-shrink-0">
                          <div
                            className="w-1 h-10 rounded-full"
                            style={{
                              backgroundColor: catConfig.color
                            }} />
                          
                        </div>

                        {/* Content area */}
                        <div className="flex-1 flex items-center gap-2.5 px-3 py-3 min-w-0 pr-4 md:pr-6">
                          {/* Type icon */}
                          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-500 flex-shrink-0">
                            <TypeIcon />
                          </div>

                          {/* Title + text */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-gray-900 text-sm leading-tight truncate group-hover:font-semibold transition-all duration-200">
                              {q.title}
                            </h3>
                            {q.text &&
                            <p className="text-gray-400 text-xs leading-snug mt-0.5 truncate">
                                {q.text}
                              </p>
                            }
                          </div>
                        </div>
                      </div>);

                  })}
                </div>
              </>);

          })()}
        </div>
        {/* Sticky Show More bar */}
        <div className="flex-shrink-0 sticky bottom-0 border-t border-gray-200 bg-white">
          {(() => {
            const existingIds = new Set(questionIds);
            const totalAvailable = MOCK_QUESTIONS.filter(
              (q) =>
              q.status === 'active' &&
              !existingIds.has(q.id) && (
              addFilterCategory === '' ||
              q.category === addFilterCategory) && (
              q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.text?.toLowerCase().includes(searchQuery.toLowerCase()))
            ).length;
            const visibleCount = Math.min(addDisplayCount, totalAvailable);
            const hasMore = totalAvailable > addDisplayCount;
            if (totalAvailable === 0) return null;
            return hasMore ?
            <button
              onClick={() =>
              setAddDisplayCount((prev) => prev + addItemsPerPage)
              }
              className="w-full flex items-center justify-between px-6 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors">
              
                <span className="flex items-center gap-1.5">
                  <ChevronDown className="w-3 h-3" />
                  Show more
                </span>
                <span className="text-gray-400">
                  {visibleCount} of {totalAvailable}
                </span>
              </button> :

            <div className="flex items-center justify-between px-6 py-2 text-xs text-gray-400">
                <span>{totalAvailable} questions loaded</span>
                <span>
                  {totalAvailable} of {totalAvailable}
                </span>
              </div>;

          })()}
        </div>
      </TombstoneForm>
    </div>);

}
function ToggleOption({
  label,
  description,
  checked,
  onChange





}: {label: string;description: string;checked: boolean;onChange: (value: boolean) => void;}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-all ${checked ? 'bg-teal-50/50 border-teal-200' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}>
      
      <div className="flex-1 min-w-0">
        <span
          className={`text-sm font-medium block ${checked ? 'text-teal-800' : 'text-gray-700'}`}>
          
          {label}
        </span>
        <span className="text-sm text-gray-600">{description}</span>
      </div>
      <div
        className={`w-10 h-6 rounded-full p-0.5 transition-colors ${checked ? 'bg-teal-500' : 'bg-gray-300'}`}>
        
        <motion.div
          className="w-5 h-5 bg-white rounded-full shadow-sm"
          animate={{
            x: checked ? 16 : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }} />
        
      </div>
    </div>);

}