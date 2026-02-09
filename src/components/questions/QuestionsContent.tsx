import React, { useEffect, useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, PenSquare, Save, ArrowLeft } from 'lucide-react';
import { QuestionItem } from './QuestionItem';
import { QuestionListSkeleton } from './QuestionListSkeleton';
import { BulkEditBar } from './BulkEditBar';
import { BulkEditForm } from './BulkEditForm';
import { TableActionBar } from './TableActionBar';
interface Question {
  id: string;
  title: string;
  text?: string;
  type: string;
  category: string;
  createdAt: Date;
  status: 'active' | 'draft';
  description?: string;
  options?: string[];
  matchSubType?: 'text' | 'image';
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
  'Invite team members']

},
{
  id: '2',
  title: 'User Experience Rating',
  text: 'Please describe your overall experience with our platform so far, including what you liked and what could be improved.',
  type: 'open',
  category: 'feedback',
  createdAt: new Date('2024-01-14T14:15:00'),
  status: 'active'
},
{
  id: '3',
  title: 'LMS Features',
  text: 'The LMS platform supports video content, interactive quizzes, and multimedia learning materials for comprehensive course delivery.',
  type: 'true-false',
  category: 'lms',
  createdAt: new Date('2024-01-13T09:45:00'),
  status: 'active'
},
{
  id: '4',
  title: 'Project Management Terms',
  text: 'Match the following project management terms with their corresponding definitions.',
  type: 'matching',
  category: 'lms',
  createdAt: new Date('2024-01-12T16:20:00'),
  status: 'active'
},
{
  id: '5',
  title: 'Identify the Icons',
  text: 'Match each icon image with its correct label.',
  type: 'matching',
  matchSubType: 'image',
  category: 'lms',
  createdAt: new Date('2024-01-11T11:00:00'),
  status: 'active'
},
{
  id: '6',
  title: 'Feature Priorities',
  text: 'Which features are most important to you when evaluating project management and collaboration tools for your organization?',
  type: 'multiple',
  category: 'onboarding',
  createdAt: new Date('2024-01-10T08:30:00'),
  status: 'draft',
  options: [
  'Task automation',
  'Real-time collaboration',
  'Advanced reporting',
  'Mobile access']

},
{
  id: '7',
  title: 'Feature Requests',
  text: 'What specific improvements or new features would you like to see implemented in the platform to better serve your needs and enhance your experience?',
  type: 'open',
  category: 'feedback',
  createdAt: new Date('2024-01-09T13:45:00'),
  status: 'active'
},
{
  id: '8',
  title: 'Integration Capabilities',
  text: 'The system allows custom integrations with third-party applications, APIs, and external services to extend functionality and streamline workflows across your organization.',
  type: 'true-false',
  category: 'lms',
  createdAt: new Date('2024-01-08T10:15:00'),
  status: 'active'
},
{
  id: '9',
  title: 'Discovery Channel',
  text: 'How did you first hear about our platform and what motivated you to sign up and start using our services for your business needs?',
  type: 'multiple',
  category: 'onboarding',
  createdAt: new Date('2024-01-07T15:30:00'),
  status: 'active',
  options: ['Social media', 'Search engine', 'Referral', 'Advertisement']
},
{
  id: '10',
  title: 'Collaboration Tools',
  text: 'Match the following collaboration tools with their primary use cases and understand when to apply each one for maximum team efficiency and productivity.',
  type: 'matching',
  category: 'lms',
  createdAt: new Date('2024-01-06T09:00:00'),
  status: 'draft'
},
{
  id: '11',
  title: 'Role Identification',
  text: 'What is your current role within your organization and how does it relate to the use of project management and collaboration software?',
  type: 'multiple',
  category: 'onboarding',
  createdAt: new Date('2024-01-05T14:20:00'),
  status: 'active',
  options: ['Manager', 'Team Lead', 'Individual Contributor', 'Executive']
},
{
  id: '12',
  title: 'Current Challenges',
  text: 'Please describe your biggest challenge with current tools and explain how you think a better solution could address these pain points effectively for your team.',
  type: 'open',
  category: 'feedback',
  createdAt: new Date('2024-01-04T11:45:00'),
  status: 'draft'
},
{
  id: '13',
  title: 'Security Features',
  text: 'The platform supports single sign-on (SSO) authentication, multi-factor authentication, and enterprise-grade security features for user access control and data protection.',
  type: 'true-false',
  category: 'lms',
  createdAt: new Date('2024-01-03T16:10:00'),
  status: 'active'
},
{
  id: '14',
  title: 'Team Size',
  text: 'How many team members in your organization will be using the platform on a regular basis for their daily work and collaboration activities?',
  type: 'multiple',
  category: 'onboarding',
  createdAt: new Date('2024-01-02T10:30:00'),
  status: 'active',
  options: ['1-5', '6-20', '21-50', '50+']
},
{
  id: '15',
  title: 'Enhancement Suggestions',
  text: 'What additional features, integrations, or capabilities would significantly enhance your experience and make the platform more valuable for your specific use case and business requirements?',
  type: 'open',
  category: 'feedback',
  createdAt: new Date('2024-01-01T13:00:00'),
  status: 'draft'
}];

interface QuestionsContentProps {
  selectedType: string;
  selectedCategory: string;
  activeTab: 'questions' | 'quizzes';
  onTabChange: (tab: 'questions' | 'quizzes') => void;
  selectedQuestion: Question | null;
  onSelectQuestion: (question: Question, defaultTab?: 'info' | 'edit') => void;
  questions?: Question[];
  setQuestions?: React.Dispatch<React.SetStateAction<Question[]>>;
  draftOfPublishedIds?: Set<string>;
  onDeleteQuestion?: (questionId: string) => void;
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
  onDeleteQuestion
}: QuestionsContentProps) {
  const [localQuestions, setLocalQuestions] =
  useState<Question[]>(MOCK_QUESTIONS);
  // Use props questions if provided, otherwise use local state
  const questions = propsQuestions || localQuestions;
  const setQuestions = propsSetQuestions || setLocalQuestions;
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
  const [pendingEditQuestion, setPendingEditQuestion] =
  useState<Question | null>(null);
  // Pagination state (simulated)
  const totalItems = questions.length;
  const currentPageItems = questions;
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
  }, [selectedType, selectedCategory]);
  // Filter questions by search query, type, category, and status
  const filteredQuestions = questions.
  filter((q) => {
    const matchesSearch =
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.text?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || q.type === selectedType;
    const matchesCategory =
    selectedCategory === 'all' || q.category === selectedCategory;
    const matchesFilter =
    filterBy === 'all' ||
    filterBy === 'published' && q.status === 'active' ||
    filterBy === 'draft' && q.status === 'draft';
    return matchesSearch && matchesType && matchesCategory && matchesFilter;
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
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
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
    const allIds = new Set<string>();
    for (let i = 1; i <= totalItems; i++) {
      allIds.add(i.toString());
    }
    setSelectedIds(allIds);
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
  const handleSetActive = () => {
    console.log('Set active for:', Array.from(selectedIds));
  };
  const handleSetInactive = () => {
    console.log('Set inactive for:', Array.from(selectedIds));
  };
  const handleSortChange = (sortId: string) => {
    setSortBy(sortId);
  };
  const handleFilterChange = (filterId: string) => {
    setFilterBy(filterId);
  };
  const handleQuestionAction = (questionId: string, action: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;
    switch (action) {
      case 'view':
        // Open the question in view/info mode
        onSelectQuestion(question, 'info');
        break;
      case 'edit':
        // For published questions, show warning before opening
        if (question.status === 'active') {
          setPendingEditQuestion(question);
        } else {
          onSelectQuestion(question, 'edit');
        }
        break;
      case 'fork':
        // Fork: create an independent copy detached from quizzes
        const forked: Question = {
          ...question,
          id: `fork-${Date.now()}`,
          title: `${question.title} (Fork)`,
          status: 'draft',
          createdAt: new Date(),
          options: question.options ? [...question.options] : undefined,
          matchSubType: question.matchSubType
        };
        setQuestions([forked, ...questions]);
        // Open the fork in edit mode immediately
        setTimeout(() => onSelectQuestion(forked, 'edit'), 100);
        break;
      case 'delete':
        // Show delete confirmation modal
        setDeleteConfirmId(questionId);
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
      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteConfirmId &&
        (() => {
          const questionToDelete = questions.find(
            (q) => q.id === deleteConfirmId
          );
          const isPublishedQuestion = questionToDelete?.status === 'active';
          const isDraftOfPublished = draftOfPublishedIds.has(deleteConfirmId);
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
                    <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isDraftOfPublished ? 'bg-amber-50' : 'bg-red-50'}`}>

                      {isDraftOfPublished ?
                    <ArrowLeft className="w-5 h-5 text-amber-500" /> :

                    <Trash2
                      className={`w-5 h-5 ${isPublishedQuestion ? 'text-red-600' : 'text-red-500'}`} />

                    }
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {isDraftOfPublished ?
                    'Discard draft changes?' :
                    isPublishedQuestion ?
                    'Delete published question?' :
                    'Delete this question?'}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                      {isDraftOfPublished ?
                    <>
                          Your draft edits will be discarded. The{' '}
                          <span className="font-medium text-gray-700">
                            published version
                          </span>{' '}
                          will be restored and remain live and unchanged.
                        </> :
                    isPublishedQuestion ?
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
                        </> :

                    'This draft will be permanently removed. This action cannot be undone.'
                    }
                    </p>
                    <div className="flex items-center gap-3 w-full">
                      <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">

                        Cancel
                      </button>
                      <button
                      onClick={() => {
                        if (isDraftOfPublished && onDeleteQuestion) {
                          // Discard draft: parent handler restores published version
                          onDeleteQuestion(deleteConfirmId);
                        } else {
                          // Normal delete
                          if (onDeleteQuestion) {
                            onDeleteQuestion(deleteConfirmId);
                          } else {
                            setQuestions(
                              questions.filter(
                                (q) => q.id !== deleteConfirmId
                              )
                            );
                          }
                          if (selectedQuestion?.id === deleteConfirmId) {
                            onSelectQuestion(null as any);
                          }
                        }
                        setDeleteConfirmId(null);
                      }}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${isDraftOfPublished ? 'bg-amber-500 hover:bg-amber-600' : 'bg-red-500 hover:bg-red-600'}`}>

                        {isDraftOfPublished ?
                      <>
                            <ArrowLeft className="w-4 h-4" />
                            Discard Draft
                          </> :

                      <>
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </>
                      }
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>);

        })()}
      </AnimatePresence>

      {/* Edit Published Warning Dialog */}
      <AnimatePresence>
        {pendingEditQuestion &&
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
          onClick={() => setPendingEditQuestion(null)}>

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
                  <button
                  onClick={() => setPendingEditQuestion(null)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">

                    Cancel
                  </button>
                  <button
                  onClick={() => {
                    const q = pendingEditQuestion;
                    setPendingEditQuestion(null);
                    onSelectQuestion(q, 'edit');
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">

                    <Save className="w-4 h-4" />
                    Create Draft
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Bulk Edit Form */}
      {showEditForm &&
      <BulkEditForm
        selectedCount={selectedIds.size}
        onClose={() => setShowEditForm(false)}
        onSave={handleSaveBulkEdit} />

      }

      {/* Table Action Bar */}
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
        onItemsPerPageChange={setItemsPerPage} />


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
          onSetActive={handleSetActive}
          onSetInactive={handleSetInactive}
          onSelectAllPages={handleSelectAllPages}
          onSelectCurrentPageOnly={handleSelectAllOnPage}
          onToggleSelectAll={handleToggleSelectAll} />

        }
      </AnimatePresence>

      {/* Content Area */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          paddingRight: '8px'
        }}>

        {isLoading ?
        <QuestionListSkeleton count={8} /> :
        filteredQuestions.length === 0 ?
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

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="divide-y divide-gray-100">

            {filteredQuestions.map((question) =>
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
              } />

              </motion.div>
          )}
          </motion.div>
        }
      </div>
    </div>);

}