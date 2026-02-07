import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizItem } from './QuizItem';
import { QuestionListSkeleton } from '../questions/QuestionListSkeleton';
import { BulkEditBar } from '../questions/BulkEditBar';
import { BulkEditForm } from '../questions/BulkEditForm';
import { TableActionBar } from '../questions/TableActionBar';
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
  status: 'draft' | 'ready' | 'archived';
  description?: string;
}
const MOCK_QUIZZES: Quiz[] = [{
  id: '1',
  title: 'Platform Onboarding Quiz',
  numQuestions: 5,
  passingScore: 75,
  category: 'FEEDBACK',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'ready',
  description: ''
}, {
  id: '2',
  title: 'Customer Satisfaction Survey',
  numQuestions: 8,
  passingScore: 75,
  category: 'FEEDBACK',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'draft',
  description: ''
}, {
  id: '3',
  title: 'LMS Course Assessment',
  numQuestions: 12,
  passingScore: 80,
  category: 'LMS',
  scoreDisplay: true,
  hints: true,
  showPercentComplete: true,
  showNumQuestions: true,
  showProgressBar: true,
  status: 'ready',
  description: ''
}, {
  id: '4',
  title: 'Feature Testing Quiz',
  numQuestions: 6,
  passingScore: 70,
  category: 'TEST',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'draft',
  description: ''
}, {
  id: '5',
  title: 'Product Knowledge Test',
  numQuestions: 15,
  passingScore: 85,
  category: 'LMS',
  scoreDisplay: true,
  hints: false,
  showPercentComplete: true,
  showNumQuestions: true,
  showProgressBar: true,
  status: 'archived',
  description: ''
}, {
  id: '6',
  title: 'User Experience Evaluation',
  numQuestions: 10,
  passingScore: 75,
  category: 'FEEDBACK',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'ready',
  description: ''
}, {
  id: '7',
  title: 'Technical Skills Assessment',
  numQuestions: 20,
  passingScore: 90,
  category: 'TEST',
  scoreDisplay: true,
  hints: false,
  showPercentComplete: true,
  showNumQuestions: true,
  showProgressBar: true,
  status: 'ready',
  description: ''
}, {
  id: '8',
  title: 'New Employee Orientation',
  numQuestions: 7,
  passingScore: 75,
  category: 'LMS',
  scoreDisplay: false,
  hints: true,
  showPercentComplete: false,
  showNumQuestions: false,
  showProgressBar: false,
  status: 'draft',
  description: ''
}];
interface QuizzesContentProps {
  selectedStatus: string;
  selectedCategory: string;
  selectedQuiz: Quiz | null;
  onSelectQuiz: (quiz: Quiz) => void;
}
export function QuizzesContent({
  selectedStatus,
  selectedCategory,
  selectedQuiz,
  onSelectQuiz
}: QuizzesContentProps) {
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
  const totalItems = 100;
  const currentPageItems = MOCK_QUIZZES;
  const allCurrentPageSelected = currentPageItems.every((item) => selectedIds.has(item.id));
  const someCurrentPageSelected = currentPageItems.some((item) => selectedIds.has(item.id)) && !allCurrentPageSelected;
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedStatus, selectedCategory]);
  useEffect(() => {
    if (selectedIds.size === 0) {
      setShowCheckboxes(false);
      setShowEditForm(false);
    }
  }, [selectedIds.size]);
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSet = new Set(selectedIds);
      currentPageItems.forEach((item) => newSet.add(item.id));
      setSelectedIds(newSet);
    } else {
      const newSet = new Set(selectedIds);
      currentPageItems.forEach((item) => newSet.delete(item.id));
      setSelectedIds(newSet);
    }
  };
  const handleBulkActionStart = () => {
    setShowCheckboxes(true);
  };
  const handleBulkActionCancel = () => {
    setShowCheckboxes(false);
    setSelectedIds(new Set());
    setShowEditForm(false);
  };
  const handleApplyActionsClick = () => {
    setShowEditForm(true);
  };
  const handleEditFormClose = () => {
    setShowEditForm(false);
  };
  const handleBulkEditSubmit = (formData: any) => {
    console.log('Bulk edit submit:', formData, 'for IDs:', Array.from(selectedIds));
    setShowEditForm(false);
    setShowCheckboxes(false);
    setSelectedIds(new Set());
  };
  const filteredQuizzes = currentPageItems.filter((quiz) => {
    const matchesStatus = selectedStatus === 'all' || quiz.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || quiz.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery === '' || quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });
  return <div className="flex flex-col h-full bg-white">
      {/* Table Action Bar */}
      <TableActionBar searchQuery={searchQuery} onSearchChange={setSearchQuery} sortBy={sortBy} onSortChange={setSortBy} filterBy={filterBy} onFilterChange={setFilterBy} itemsPerPage={itemsPerPage} onItemsPerPageChange={setItemsPerPage} totalItems={totalItems} showCheckboxes={showCheckboxes} onBulkActionStart={handleBulkActionStart} onApplyActionsClick={handleApplyActionsClick} selectedCount={selectedIds.size} isAllSelected={allCurrentPageSelected} isSomeSelected={someCurrentPageSelected} onSelectAll={handleSelectAll} />

      {/* Bulk Edit Bar */}
      <AnimatePresence>
        {showCheckboxes && selectedIds.size > 0 && <BulkEditBar selectedCount={selectedIds.size} onCancel={handleBulkActionCancel} />}
      </AnimatePresence>

      {/* Quiz List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {isLoading ? <QuestionListSkeleton key="skeleton" /> : filteredQuizzes.length === 0 ? <motion.div key="empty" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="flex items-center justify-center h-full p-8">
              <p className="text-gray-500 text-sm">No quizzes found</p>
            </motion.div> : <motion.div key="list" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="divide-y divide-gray-200">
              {filteredQuizzes.map((quiz) => <QuizItem key={quiz.id} quiz={quiz} isHovered={hoveredId === quiz.id} isSelected={selectedQuiz?.id === quiz.id} onMouseEnter={() => setHoveredId(quiz.id)} onMouseLeave={() => setHoveredId(null)} onClick={() => onSelectQuiz(quiz)} showCheckbox={showCheckboxes} isChecked={selectedIds.has(quiz.id)} onCheckboxChange={(checked) => {
            const newSet = new Set(selectedIds);
            if (checked) {
              newSet.add(quiz.id);
            } else {
              newSet.delete(quiz.id);
            }
            setSelectedIds(newSet);
          }} />)}
            </motion.div>}
        </AnimatePresence>
      </div>

      {/* Bulk Edit Form Overlay */}
      <AnimatePresence>
        {showEditForm && <BulkEditForm selectedCount={selectedIds.size} onClose={handleEditFormClose} onSubmit={handleBulkEditSubmit} />}
      </AnimatePresence>
    </div>;
}