import React, { useState } from 'react';
import { Plus, MoreVertical, Settings, Layers, FileText, CheckCircle, Archive } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ManageCategoriesModal } from '../questions/ManageCategoriesModal';

interface QuizzesSidebarProps {
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const STATUSES = [
  {
    id: 'all',
    label: 'All Statuses',
    icon: Layers
  },
  {
    id: 'draft',
    label: 'Draft',
    icon: FileText
  },
  {
    id: 'ready',
    label: 'Ready',
    icon: CheckCircle
  },
  {
    id: 'archived',
    label: 'Archived',
    icon: Archive
  }
];

const CATEGORIES = [
  {
    id: 'all',
    label: 'All Categories',
    color: '#9CA3AF'
  },
  {
    id: 'test',
    label: 'Test',
    color: '#3B82F6'
  },
  {
    id: 'feedback',
    label: 'Feedback',
    color: '#10B981'
  },
  {
    id: 'lms',
    label: 'LMS',
    color: '#6B21A8'
  }
];

export function QuizzesSidebar({
  selectedStatus,
  onSelectStatus,
  selectedCategory,
  onSelectCategory
}: QuizzesSidebarProps) {
  const [showManageCategories, setShowManageCategories] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full bg-white flex flex-col h-full">
      {/* Quizzes Header - Fixed height to match TableActionBar */}
      <div className="h-[57px] px-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h2 className="text-base font-bold text-gray-900">Quizzes</h2>
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Statuses Section */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-700 mb-3">Statuses</h3>
        <div className="space-y-1">
          {STATUSES.map((status) => {
            const Icon = status.icon;
            return (
              <button
                key={status.id}
                onClick={() => onSelectStatus(status.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedStatus === status.id
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{status.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-6 py-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-700">Categories</h3>
          <div className="flex items-center gap-1 relative">
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20"
                  >
                    <button
                      onClick={() => {
                        setShowManageCategories(true);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4 text-gray-500" />
                      Manage Quiz Categories
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="space-y-1">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category.id
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Manage Categories Modal */}
      <ManageCategoriesModal
        isOpen={showManageCategories}
        onClose={() => setShowManageCategories(false)}
      />
    </div>
  );
}
