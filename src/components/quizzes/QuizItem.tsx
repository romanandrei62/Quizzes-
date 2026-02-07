import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RowActionsDropdown } from '../questions/RowActionsDropdown';
import { Checkbox } from '../questions/Checkbox';
import { Eye, EyeOff, HelpCircle } from 'lucide-react';

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

interface QuizItemProps {
  quiz: Quiz;
  isHovered: boolean;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  showCheckbox?: boolean;
  isChecked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}

const CATEGORY_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
  }
> = {
  TEST: {
    label: 'Test',
    color: '#3B82F6'
  },
  FEEDBACK: {
    label: 'Feedback',
    color: '#10B981'
  },
  LMS: {
    label: 'LMS',
    color: '#8B5CF6'
  },
  all: {
    label: 'All',
    color: '#6B7280'
  }
};

export function QuizItem({
  quiz,
  isHovered,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
  showCheckbox = false,
  isChecked = false,
  onCheckboxChange
}: QuizItemProps) {
  const [showCategoryTooltip, setShowCategoryTooltip] = useState(false);
  const [showTypeTooltip, setShowTypeTooltip] = useState(false);
  const [showStatusTooltip, setShowStatusTooltip] = useState(false);

  const categoryConfig =
    CATEGORY_CONFIG[quiz.category] || CATEGORY_CONFIG.all;
  const isPublished = quiz.status === 'ready';

  const handleRowAction = (action: string) => {
    console.log(`Action ${action} for quiz ${quiz.id}`);
  };

  return (
    <motion.div
      className={`group flex items-center gap-0 transition-all duration-200 relative cursor-pointer select-none ${
        isSelected ? 'bg-gray-50' : isHovered ? 'bg-gray-50' : ''
      }`}
      style={{
        borderRight: isHovered ? '4px solid #444444' : '4px solid transparent'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Left Spacing - Hidden on mobile */}
      <div className="hidden sm:block w-3 flex-shrink-0" />

      {/* Category Color Bar - Fixed 4px x 48px with custom tooltip */}
      <div className="flex items-center py-3 sm:py-4 flex-shrink-0 relative pl-3 sm:pl-0">
        <div
          className="w-1 h-12 rounded-full cursor-pointer"
          style={{
            backgroundColor: categoryConfig.color
          }}
          onMouseEnter={() => setShowCategoryTooltip(true)}
          onMouseLeave={() => setShowCategoryTooltip(false)}
        />
        <AnimatePresence>
          {showCategoryTooltip && (
            <motion.div
              initial={{
                opacity: 0,
                x: -5
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -5
              }}
              transition={{
                duration: 0.15
              }}
              className="absolute left-full ml-2 z-50 px-2.5 py-1 bg-gray-900 text-white text-xs rounded border border-gray-700 whitespace-nowrap pointer-events-none"
            >
              {categoryConfig.label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 min-w-0">
        {showCheckbox && onCheckboxChange && (
          <div
            className="transition-opacity duration-200 flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={isChecked}
              onChange={onCheckboxChange}
              id={`quiz-${quiz.id}`}
            />
          </div>
        )}

        {/* Quiz Icon with tooltip */}
        <div className="relative flex-shrink-0">
          <div
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 text-gray-500 cursor-pointer"
            onMouseEnter={() => setShowTypeTooltip(true)}
            onMouseLeave={() => setShowTypeTooltip(false)}
          >
            <HelpCircle className="w-4 h-4" />
          </div>
          <AnimatePresence>
            {showTypeTooltip && (
              <motion.div
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
                  y: -5
                }}
                transition={{
                  duration: 0.15
                }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 px-2.5 py-1 bg-gray-900 text-white text-xs rounded border border-gray-700 whitespace-nowrap pointer-events-none"
              >
                Quiz
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 min-w-0 cursor-pointer">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              {/* Title - Bold only on hover */}
              <h3
                className={`text-gray-900 text-sm leading-tight transition-all duration-200 cursor-pointer truncate ${
                  isHovered ? 'font-semibold' : 'font-normal'
                }`}
              >
                {quiz.title}
              </h3>

              {/* Quiz info - Hidden on very small screens */}
              <p className="hidden xs:block text-gray-600 text-xs sm:text-sm leading-snug mt-0.5 sm:mt-1 truncate">
                {quiz.numQuestions} questions · {quiz.passingScore}% passing
              </p>
            </div>

            {/* Status Icon with tooltip */}
            <div className="relative flex-shrink-0">
              <div
                className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all duration-200 cursor-pointer ${
                  isPublished
                    ? 'bg-emerald-100 text-emerald-600'
                    : quiz.status === 'archived'
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-amber-100 text-amber-600'
                }`}
                onMouseEnter={() => setShowStatusTooltip(true)}
                onMouseLeave={() => setShowStatusTooltip(false)}
              >
                {isPublished ? (
                  <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                ) : (
                  <EyeOff className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
              </div>
              <AnimatePresence>
                {showStatusTooltip && (
                  <motion.div
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
                      y: -5
                    }}
                    transition={{
                      duration: 0.15
                    }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 px-2.5 py-1 bg-gray-900 text-white text-xs rounded border border-gray-700 whitespace-nowrap pointer-events-none"
                  >
                    {quiz.status === 'ready'
                      ? 'Ready'
                      : quiz.status === 'archived'
                      ? 'Archived'
                      : 'Draft'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div
          className="flex-shrink-0 self-center transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <RowActionsDropdown onAction={handleRowAction} />
        </div>
      </div>
    </motion.div>
  );
}
