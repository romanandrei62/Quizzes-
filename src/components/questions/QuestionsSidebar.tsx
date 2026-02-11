import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Plus, MoreVertical, Tags, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ManageCategoriesModal } from './ManageCategoriesModal';
interface QuestionsSidebarProps {
  selectedType: string;
  onSelectType: (type: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onCreateQuestion?: () => void;
  usedCategoryIds?: Set<string>;
}
const AllTypesIcon = () =>
<svg
  className="w-4 h-4"
  focusable="false"
  aria-hidden="true"
  viewBox="0 0 512 512"
  fill="currentColor">

    <path d="M80 64c-8.8 0-16 7.2-16 16l0 96c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16L80 64zM32 80c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zM80 320c-8.8 0-16 7.2-16 16l0 96c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16l-96 0zM32 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zM432 64l-96 0c-8.8 0-16 7.2-16 16l0 96c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16zM336 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm0 288c-8.8 0-16 7.2-16 16l0 96c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16l0-96c0-8.8-7.2-16-16-16l-96 0zm-48 16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96z" />
  </svg>;

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

const TYPES = [
{
  id: 'all',
  label: 'All Types',
  icon: 'all-types'
},
{
  id: 'multiple',
  label: 'Multiple Choice',
  icon: 'multiple-choice'
},
{
  id: 'open',
  label: 'Open Answer',
  icon: 'open-answer'
},
{
  id: 'true-false',
  label: 'True/False',
  icon: 'true-false'
},
{
  id: 'matching',
  label: 'Matching',
  icon: 'matching'
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
export function QuestionsSidebar({
  selectedType,
  onSelectType,
  selectedCategory,
  onSelectCategory,
  onCreateQuestion,
  usedCategoryIds = new Set()
}: QuestionsSidebarProps) {
  const [showManageCategories, setShowManageCategories] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isLoadingMoreRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const displayCategories = [ALL_CATEGORIES_ENTRY, ...categories];
  const visibleCategories = displayCategories.slice(0, visibleCount + 1); // +1 for "All Categories"
  const hasMore = visibleCount < categories.length;
  const remaining = categories.length - visibleCount;
  const allLoaded = !hasMore && categories.length > 0;
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
    // Map saved categories to sidebar format (use lowercase label as id for filtering)
    const mapped = savedCategories.map((cat) => ({
      id: cat.label.toLowerCase().replace(/\s+/g, '-'),
      label: cat.label,
      color: cat.color
    }));
    setCategories(mapped);
    // Always reset to "All Categories" after saving since we don't know what changed
    onSelectCategory('all');
  };
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'all-types':
        return <AllTypesIcon />;
      case 'multiple-choice':
        return <MultipleChoiceIcon />;
      case 'open-answer':
        return <OpenAnswerIcon />;
      case 'true-false':
        return <TrueFalseIcon />;
      case 'matching':
        return <MatchingIcon />;
      default:
        return <span className="text-base">{iconType}</span>;
    }
  };
  return (
    <div className="w-full bg-white flex flex-col h-full">
      {/* Questions Header - Fixed height to match TableActionBar */}
      <div className="h-[57px] px-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h2 className="text-base font-bold text-gray-900">Questions</h2>
        {onCreateQuestion &&
        <button
          onClick={onCreateQuestion}
          className="p-1 hover:bg-gray-100 rounded transition-colors">

            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        }
      </div>

      {/* Types Section */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-700 mb-3">Types</h3>
        <div className="space-y-1">
          {TYPES.map((type) =>
          <button
            key={type.id}
            onClick={() => onSelectType(type.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${selectedType === type.id ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>

              {renderIcon(type.icon)}
              <span>{type.label}</span>
            </button>
          )}
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
        {/* Sticky Show More bar at bottom - always visible like questions list */}
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
            className="w-full flex items-center gap-1.5 px-6 py-2 text-xs text-gray-500 hover:text-gray-700 transition-colors">

                <ChevronDown className="w-3 h-3" />
                <span>Show more ({remaining})</span>
              </button> :

          <div className="flex items-center px-6 py-2 text-xs text-gray-400">
                <span>{categories.length} categories loaded</span>
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