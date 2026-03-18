import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Plus, Tags, ChevronDown, Layers, Eye, EyeOff } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ManageCategoriesModal } from '../questions/ManageCategoriesModal';
interface QuizzesSidebarProps {
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onCreateQuiz?: () => void;
  usedCategoryIds?: Set<string>;
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
  icon: EyeOff
},
{
  id: 'published',
  label: 'Published',
  icon: Eye
}];

const INITIAL_CATEGORIES = [
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
  id: 'safety-training',
  label: 'Safety Training',
  color: '#EF4444'
},
{
  id: 'product-knowledge',
  label: 'Product Knowledge',
  color: '#F59E0B'
},
{
  id: 'leadership',
  label: 'Leadership',
  color: '#EC4899'
},
{
  id: 'communication',
  label: 'Communication',
  color: '#14B8A6'
},
{
  id: 'technical-skills',
  label: 'Technical Skills',
  color: '#0EA5E9'
},
{
  id: 'customer-service',
  label: 'Customer Service',
  color: '#D946EF'
},
{
  id: 'sales-training',
  label: 'Sales Training',
  color: '#F97316'
},
{
  id: 'hr-policies',
  label: 'HR Policies',
  color: '#84CC16'
},
{
  id: 'data-privacy',
  label: 'Data Privacy',
  color: '#06B6D4'
},
{
  id: 'cybersecurity',
  label: 'Cybersecurity',
  color: '#A855F7'
},
{
  id: 'workplace-ethics',
  label: 'Workplace Ethics',
  color: '#E11D48'
},
{
  id: 'time-management',
  label: 'Time Management',
  color: '#6B7280'
},
{
  id: 'project-management',
  label: 'Project Management',
  color: '#3B82F6'
},
{
  id: 'team-building',
  label: 'Team Building',
  color: '#10B981'
},
{
  id: 'conflict-resolution',
  label: 'Conflict Resolution',
  color: '#1F2937'
},
{
  id: 'diversity-&-inclusion',
  label: 'Diversity & Inclusion',
  color: '#6B21A8'
},
{
  id: 'health-&-wellness',
  label: 'Health & Wellness',
  color: '#EF4444'
},
{
  id: 'financial-literacy',
  label: 'Financial Literacy',
  color: '#F59E0B'
},
{
  id: 'marketing-basics',
  label: 'Marketing Basics',
  color: '#EC4899'
},
{
  id: 'brand-guidelines',
  label: 'Brand Guidelines',
  color: '#14B8A6'
},
{
  id: 'software-tools',
  label: 'Software Tools',
  color: '#0EA5E9'
},
{
  id: 'quality-assurance',
  label: 'Quality Assurance',
  color: '#D946EF'
},
{
  id: 'supply-chain',
  label: 'Supply Chain',
  color: '#F97316'
},
{
  id: 'inventory-management',
  label: 'Inventory Management',
  color: '#84CC16'
},
{
  id: 'logistics',
  label: 'Logistics',
  color: '#06B6D4'
},
{
  id: 'environmental',
  label: 'Environmental',
  color: '#A855F7'
},
{
  id: 'legal-compliance',
  label: 'Legal Compliance',
  color: '#E11D48'
},
{
  id: 'risk-management',
  label: 'Risk Management',
  color: '#6B7280'
},
{
  id: 'change-management',
  label: 'Change Management',
  color: '#3B82F6'
},
{
  id: 'agile-methodology',
  label: 'Agile Methodology',
  color: '#10B981'
},
{
  id: 'scrum-framework',
  label: 'Scrum Framework',
  color: '#1F2937'
},
{
  id: 'devops-practices',
  label: 'DevOps Practices',
  color: '#6B21A8'
},
{
  id: 'cloud-computing',
  label: 'Cloud Computing',
  color: '#EF4444'
},
{
  id: 'ai-&-machine-learning',
  label: 'AI & Machine Learning',
  color: '#F59E0B'
},
{
  id: 'ux-design',
  label: 'UX Design',
  color: '#EC4899'
},
{
  id: 'accessibility',
  label: 'Accessibility',
  color: '#14B8A6'
},
{
  id: 'performance-reviews',
  label: 'Performance Reviews',
  color: '#0EA5E9'
},
{
  id: 'mentoring',
  label: 'Mentoring',
  color: '#D946EF'
},
{
  id: 'public-speaking',
  label: 'Public Speaking',
  color: '#F97316'
},
{
  id: 'negotiation-skills',
  label: 'Negotiation Skills',
  color: '#84CC16'
},
{
  id: 'critical-thinking',
  label: 'Critical Thinking',
  color: '#06B6D4'
},
{
  id: 'problem-solving',
  label: 'Problem Solving',
  color: '#A855F7'
},
{
  id: 'decision-making',
  label: 'Decision Making',
  color: '#E11D48'
},
{
  id: 'emotional-intelligence',
  label: 'Emotional Intelligence',
  color: '#6B7280'
},
{
  id: 'remote-work',
  label: 'Remote Work',
  color: '#3B82F6'
},
{
  id: 'cross-functional',
  label: 'Cross-functional',
  color: '#10B981'
}];

const ALL_CATEGORIES_ENTRY = {
  id: 'all',
  label: 'All Categories',
  color: '#9CA3AF'
};
export function QuizzesSidebar({
  selectedStatus,
  onSelectStatus,
  selectedCategory,
  onSelectCategory,
  onCreateQuiz,
  usedCategoryIds = new Set()
}: QuizzesSidebarProps) {
  const [showManageCategories, setShowManageCategories] = useState(false);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isLoadingMoreRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const displayCategories = [ALL_CATEGORIES_ENTRY, ...categories];
  const visibleCategories = displayCategories.slice(0, visibleCount + 1); // +1 for "All Categories"
  const hasMore = visibleCount < categories.length;
  // Auto-load more categories when scrolling to the bottom
  const loadMore = useCallback(() => {
    if (isLoadingMoreRef.current) return;
    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 10, categories.length));
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
    }, 400);
  }, [categories.length]);
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const container = scrollContainerRef.current;
    if (!sentinel || !container || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMoreRef.current) {
          loadMore();
        }
      },
      {
        root: container,
        threshold: 0.1
      }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);
  const handleCategoriesSaved = (
  savedCategories: {
    id: string;
    label: string;
    color: string;
  }[]) =>
  {
    const mapped = savedCategories.map((cat) => ({
      id: cat.label.toLowerCase().replace(/\s+/g, '-'),
      label: cat.label,
      color: cat.color
    }));
    setCategories(mapped);
    onSelectCategory('all');
  };
  return (
    <div className="w-full bg-white flex flex-col h-full">
      {/* Quizzes Header */}
      <div className="h-[57px] px-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h2 className="text-base font-bold text-gray-900">Quizzes</h2>
        {onCreateQuiz &&
        <button
          onClick={onCreateQuiz}
          className="p-1 hover:bg-gray-100 rounded transition-colors">
          
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        }
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
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${selectedStatus === status.id ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                
                <Icon className="w-4 h-4" />
                <span>{status.label}</span>
              </button>);

          })}
        </div>
      </div>

      {/* Categories Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0 bg-white z-10">
          <h3 className="text-sm font-bold text-gray-700">Categories</h3>
          <button
            onClick={() => setShowManageCategories(true)}
            className="p-1 hover:bg-gray-100 rounded transition-colors">
            
            <Tags className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 py-4">
          
          <div className="space-y-1">
            {visibleCategories.map((category) =>
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category.id ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
              
                <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: category.color
                }} />
              
                <span className="truncate">{category.label}</span>
              </button>
            )}
            {/* Invisible sentinel to trigger auto-load */}
            {hasMore && <div ref={sentinelRef} className="h-1" />}
          </div>
        </div>
        {/* Sticky Show More bar at bottom */}
        {categories.length > 0 &&
        <div className="flex-shrink-0 border-t border-gray-100 bg-white">
            {isLoadingMore ?
          <div className="flex items-center gap-2 px-6 py-2">
                <svg
              className="animate-spin h-3 w-3 text-gray-400"
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
              
                </svg>
                <span className="text-xs text-gray-400">Loading…</span>
              </div> :
          hasMore ?
          <button
            onClick={loadMore}
            className="w-full flex items-center justify-between px-6 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors">
            
                <span className="flex items-center gap-1.5">
                  <ChevronDown className="w-3 h-3" />
                  Show more
                </span>
                <span className="text-gray-400">
                  {visibleCount} of {categories.length}
                </span>
              </button> :

          <div className="flex items-center justify-between px-6 py-2 text-xs text-gray-400">
                <span>{categories.length} categories loaded</span>
                <span>
                  {categories.length} of {categories.length}
                </span>
              </div>
          }
          </div>
        }
      </div>

      {/* Manage Categories Modal */}
      <ManageCategoriesModal
        isOpen={showManageCategories}
        onClose={() => setShowManageCategories(false)}
        onSave={handleCategoriesSaved}
        usedCategoryLabels={usedCategoryIds} />
      
    </div>);

}