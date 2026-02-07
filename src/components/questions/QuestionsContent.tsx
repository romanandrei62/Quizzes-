import React, { useEffect, useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionItem } from './QuestionItem';
import { QuestionListSkeleton } from './QuestionListSkeleton';
import { BulkEditBar } from './BulkEditBar';
import { BulkEditForm } from './BulkEditForm';
import { TableActionBar } from './TableActionBar';
interface Question {
  id: string;
  title: string;
  text: string;
  type: string;
  category: string;
  createdAt: Date;
  status: 'active' | 'draft';
  description?: string;
  options?: string[];
}
const MOCK_QUESTIONS: Question[] = [
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
  text: 'How would you rate your overall experience with our platform so far, considering ease of use, features, and support?',
  type: 'multiple',
  category: 'feedback',
  createdAt: new Date('2024-01-14T14:15:00'),
  status: 'active',
  options: ['Excellent', 'Good', 'Fair', 'Poor']
},
{
  id: '3',
  title: 'Workflow Description',
  text: 'Please describe your ideal workflow in detail, including the tools you use, the processes you follow, and any pain points you currently experience in your daily operations.',
  type: 'open',
  category: 'feedback',
  createdAt: new Date('2024-01-13T09:45:00'),
  status: 'draft'
},
{
  id: '4',
  title: 'LMS Features',
  text: 'The LMS platform supports video content, interactive quizzes, and multimedia learning materials for comprehensive course delivery.',
  type: 'true-false',
  category: 'lms',
  createdAt: new Date('2024-01-12T16:20:00'),
  status: 'active'
},
{
  id: '5',
  title: 'Project Management Terms',
  text: 'Match the following project management terms with their corresponding definitions and understand how they apply to your daily workflow and team collaboration.',
  type: 'matching',
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
  onSelectQuestion: (question: Question) => void;
}
export function QuestionsContent({
  selectedType,
  selectedCategory,
  activeTab,
  onTabChange,
  selectedQuestion,
  onSelectQuestion
}: QuestionsContentProps) {
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_desc');
  const [filterBy, setFilterBy] = useState('all');
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
  const filteredQuestions = MOCK_QUESTIONS.filter((q) => {
    const matchesSearch =
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || q.type === selectedType;
    const matchesCategory =
    selectedCategory === 'all' || q.category === selectedCategory;
    const matchesFilter =
    filterBy === 'all' ||
    filterBy === 'published' && q.status === 'active' ||
    filterBy === 'draft' && q.status === 'draft';
    return matchesSearch && matchesType && matchesCategory && matchesFilter;
  }).sort((a, b) => {
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
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    switch (action) {
      case 'edit':
        // Open the question in edit mode
        onSelectQuestion(question);
        break;

      case 'duplicate':
        // Create a duplicate with a new ID
        const duplicate: Question = {
          ...question,
          id: `dup-${Date.now()}`,
          title: `${question.title} (Copy)`,
          status: 'draft',
          createdAt: new Date()
        };
        setQuestions([duplicate, ...questions]);
        break;

      case 'delete':
        // Remove the question
        if (window.confirm(`Delete "${question.title}"?`)) {
          setQuestions(questions.filter(q => q.id !== questionId));
          if (selectedQuestion?.id === questionId) {
            onSelectQuestion(null as any);
          }
        }
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
              onAction={(action) => handleQuestionAction(question.id, action)} />

              </motion.div>
          )}
          </motion.div>
        }
      </div>
    </div>);

}