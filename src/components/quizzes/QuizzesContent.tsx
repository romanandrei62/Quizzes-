import React, { useState } from 'react';
import { Search, Filter, SortAsc, MoreVertical, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface QuizzesContentProps {
  selectedStatus: string;
  selectedCategory: string;
  selectedQuiz: Quiz | null;
  onSelectQuiz: (quiz: Quiz) => void;
}

const MOCK_QUIZZES: Quiz[] = [
  {
    id: '1',
    title: 'Platform Onboarding Quiz',
    numQuestions: 0,
    passingScore: 75,
    category: 'FEEDBACK',
    scoreDisplay: false,
    hints: true,
    showPercentComplete: false,
    showNumQuestions: false,
    showProgressBar: false,
    status: 'ready',
    description: ''
  },
  {
    id: '2',
    title: 'Customer Satisfaction Survey',
    numQuestions: 0,
    passingScore: 75,
    category: 'FEEDBACK',
    scoreDisplay: false,
    hints: true,
    showPercentComplete: false,
    showNumQuestions: false,
    showProgressBar: false,
    status: 'draft',
    description: ''
  },
  {
    id: '3',
    title: 'LMS Course Assessment',
    numQuestions: 0,
    passingScore: 75,
    category: 'LMS',
    scoreDisplay: false,
    hints: true,
    showPercentComplete: false,
    showNumQuestions: false,
    showProgressBar: false,
    status: 'ready',
    description: ''
  },
  {
    id: '4',
    title: 'Feature Testing Quiz',
    numQuestions: 0,
    passingScore: 75,
    category: 'TEST',
    scoreDisplay: false,
    hints: true,
    showPercentComplete: false,
    showNumQuestions: false,
    showProgressBar: false,
    status: 'draft',
    description: ''
  },
  {
    id: '5',
    title: 'Product Knowledge Test',
    numQuestions: 0,
    passingScore: 75,
    category: 'LMS',
    scoreDisplay: false,
    hints: true,
    showPercentComplete: false,
    showNumQuestions: false,
    showProgressBar: false,
    status: 'archived',
    description: ''
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ready':
      return 'bg-green-500';
    case 'draft':
      return 'bg-yellow-500';
    case 'archived':
      return 'bg-gray-400';
    default:
      return 'bg-gray-300';
  }
};

export function QuizzesContent({
  selectedStatus,
  selectedCategory,
  selectedQuiz,
  onSelectQuiz
}: QuizzesContentProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuizzes = MOCK_QUIZZES.filter((quiz) => {
    const matchesStatus =
      selectedStatus === 'all' || quiz.status === selectedStatus;
    const matchesCategory =
      selectedCategory === 'all' ||
      quiz.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchTerm === '' ||
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Action Bar */}
      <div className="h-[57px] px-4 border-b border-gray-200 flex items-center gap-3 flex-shrink-0">
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
          <Search className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
          <SortAsc className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1" />
        <select className="text-sm text-gray-700 border border-gray-300 rounded px-2 py-1">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
      </div>

      {/* Quiz List */}
      <div className="flex-1 overflow-y-auto">
        {filteredQuizzes.length === 0 ? (
          <div className="flex items-center justify-center h-full p-8">
            <p className="text-gray-500 text-sm">No quizzes found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredQuizzes.map((quiz) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-3 ${
                  selectedQuiz?.id === quiz.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => onSelectQuiz(quiz)}
              >
                {/* Quiz Icon */}
                <HelpCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />

                {/* Quiz Title */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {quiz.title}
                  </div>
                </div>

                {/* Status Dot */}
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(
                    quiz.status
                  )} flex-shrink-0`}
                />

                {/* Menu Button */}
                <button
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
