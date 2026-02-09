import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RowActionsDropdown } from './RowActionsDropdown';
import { Checkbox } from './Checkbox';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
interface Question {
  id: string;
  title: string;
  text: string;
  type: string;
  category: string;
  createdAt: Date;
  status: 'active' | 'draft';
}
interface QuestionItemProps {
  question: Question;
  isHovered: boolean;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  showCheckbox?: boolean;
  isChecked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  onAction?: (action: string) => void;
}
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

const TYPE_CONFIG: Record<
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
const CATEGORY_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
  }> =
{
  onboarding: {
    label: 'Onboarding',
    color: '#3B82F6'
  },
  feedback: {
    label: 'Feedback',
    color: '#10B981'
  },
  lms: {
    label: 'LMS',
    color: '#8B5CF6'
  },
  all: {
    label: 'All',
    color: '#6B7280'
  }
};
export function QuestionItem({
  question,
  isHovered,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
  showCheckbox = false,
  isChecked = false,
  onCheckboxChange,
  onAction
}: QuestionItemProps) {
  const [showCategoryTooltip, setShowCategoryTooltip] = useState(false);
  const [showTypeTooltip, setShowTypeTooltip] = useState(false);
  const [showStatusTooltip, setShowStatusTooltip] = useState(false);
  const categoryConfig =
  CATEGORY_CONFIG[question.category] || CATEGORY_CONFIG.all;
  const typeConfig = TYPE_CONFIG[question.type] || TYPE_CONFIG.multiple;
  const TypeIcon = typeConfig.icon;
  const isPublished = question.status === 'active';
  const handleRowAction = (action: string) => {
    if (onAction) {
      onAction(action);
    }
  };
  return (
    <motion.div
      className={`group flex items-center gap-0 transition-all duration-200 relative cursor-pointer select-none ${isSelected ? 'bg-gray-50' : isHovered ? 'bg-gray-50' : ''}`}
      style={{
        borderRight: isHovered ? '4px solid #444444' : '4px solid transparent'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}>

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
          onMouseLeave={() => setShowCategoryTooltip(false)} />


        <AnimatePresence>
          {showCategoryTooltip &&
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
            className="absolute left-full ml-2 z-50 px-2.5 py-1 bg-gray-900 text-white text-xs rounded border border-gray-700 whitespace-nowrap pointer-events-none">

              {categoryConfig.label}
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 min-w-0">
        {showCheckbox && onCheckboxChange &&
        <div
          className="transition-opacity duration-200 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}>

            <Checkbox
            checked={isChecked}
            onChange={onCheckboxChange}
            id={`question-${question.id}`} />

          </div>
        }

        {/* Type Icon with tooltip */}
        <div className="relative flex-shrink-0">
          <div
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 text-gray-500 cursor-pointer"
            onMouseEnter={() => setShowTypeTooltip(true)}
            onMouseLeave={() => setShowTypeTooltip(false)}>

            <TypeIcon />
          </div>
          <AnimatePresence>
            {showTypeTooltip &&
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
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 px-2.5 py-1 bg-gray-900 text-white text-xs rounded border border-gray-700 whitespace-nowrap pointer-events-none">

                {typeConfig.label}
              </motion.div>
            }
          </AnimatePresence>
        </div>

        <div className="flex-1 min-w-0 cursor-pointer">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              {/* Title - Bold only on hover, no tooltip */}
              <h3
                className={`text-gray-900 text-sm leading-tight transition-all duration-200 cursor-pointer truncate ${isHovered ? 'font-semibold' : 'font-normal'}`}>

                {question.title}
              </h3>

              {/* Question text preview - truncated */}
              {question.text &&
              <p className="text-gray-400 text-xs leading-snug mt-0.5 truncate">
                  {question.text}
                </p>
              }
            </div>

            {/* Status Icon with tooltip */}
            <div className="relative flex-shrink-0">
              <div
                className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all duration-200 cursor-pointer ${isPublished ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}
                onMouseEnter={() => setShowStatusTooltip(true)}
                onMouseLeave={() => setShowStatusTooltip(false)}>

                {isPublished ?
                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> :

                <EyeOff className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                }
              </div>
              <AnimatePresence>
                {showStatusTooltip &&
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
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 px-2.5 py-1 bg-gray-900 text-white text-xs rounded border border-gray-700 whitespace-nowrap pointer-events-none">

                    {isPublished ? 'Published' : 'Draft'}
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div
          className="flex-shrink-0 self-center transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}>

          <button
            onClick={() => handleRowAction('delete')}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete">

            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>);

}