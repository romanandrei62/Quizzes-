import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GripVertical,
  Plus,
  Trash2,
  Check,
  X,
  Save,
  ChevronRight,
  ArrowLeft,
  Palette,
  AlertCircle,
  Tags } from
'lucide-react';
import { Button } from '../ui/Button';
import { ModalDialog } from '../ui/ModalDialog';
interface Category {
  id: string;
  label: string;
  color: string;
}
interface ManageCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (categories: Category[]) => void;
  usedCategoryLabels?: Set<string>;
}
const PRESET_COLORS = [
'#1F2937',
'#3B82F6',
'#10B981',
'#6B21A8',
'#F59E0B',
'#EF4444',
'#EC4899',
'#14B8A6',
'#0EA5E9',
'#D946EF',
'#F97316',
'#84CC16',
'#06B6D4',
'#A855F7',
'#E11D48',
'#6B7280'];

const INITIAL_CATEGORIES: Category[] = [
{
  id: '1',
  label: 'Knowledge Check',
  color: '#3B82F6'
},
{
  id: '2',
  label: 'Compliance',
  color: '#10B981'
},
{
  id: '3',
  label: 'Onboarding',
  color: '#1F2937'
},
{
  id: '4',
  label: 'Assessment',
  color: '#6B21A8'
},
{
  id: '5',
  label: 'Safety Training',
  color: '#EF4444'
},
{
  id: '6',
  label: 'Product Knowledge',
  color: '#F59E0B'
},
{
  id: '7',
  label: 'Leadership',
  color: '#EC4899'
},
{
  id: '8',
  label: 'Communication',
  color: '#14B8A6'
},
{
  id: '9',
  label: 'Technical Skills',
  color: '#0EA5E9'
},
{
  id: '10',
  label: 'Customer Service',
  color: '#D946EF'
},
{
  id: '11',
  label: 'Sales Training',
  color: '#F97316'
},
{
  id: '12',
  label: 'HR Policies',
  color: '#84CC16'
},
{
  id: '13',
  label: 'Data Privacy',
  color: '#06B6D4'
},
{
  id: '14',
  label: 'Cybersecurity',
  color: '#A855F7'
},
{
  id: '15',
  label: 'Workplace Ethics',
  color: '#E11D48'
},
{
  id: '16',
  label: 'Time Management',
  color: '#6B7280'
},
{
  id: '17',
  label: 'Project Management',
  color: '#3B82F6'
},
{
  id: '18',
  label: 'Team Building',
  color: '#10B981'
},
{
  id: '19',
  label: 'Conflict Resolution',
  color: '#1F2937'
},
{
  id: '20',
  label: 'Diversity & Inclusion',
  color: '#6B21A8'
},
{
  id: '21',
  label: 'Health & Wellness',
  color: '#EF4444'
},
{
  id: '22',
  label: 'Financial Literacy',
  color: '#F59E0B'
},
{
  id: '23',
  label: 'Marketing Basics',
  color: '#EC4899'
},
{
  id: '24',
  label: 'Brand Guidelines',
  color: '#14B8A6'
},
{
  id: '25',
  label: 'Software Tools',
  color: '#0EA5E9'
},
{
  id: '26',
  label: 'Quality Assurance',
  color: '#D946EF'
},
{
  id: '27',
  label: 'Supply Chain',
  color: '#F97316'
},
{
  id: '28',
  label: 'Inventory Management',
  color: '#84CC16'
},
{
  id: '29',
  label: 'Logistics',
  color: '#06B6D4'
},
{
  id: '30',
  label: 'Environmental',
  color: '#A855F7'
},
{
  id: '31',
  label: 'Legal Compliance',
  color: '#E11D48'
},
{
  id: '32',
  label: 'Risk Management',
  color: '#6B7280'
},
{
  id: '33',
  label: 'Change Management',
  color: '#3B82F6'
},
{
  id: '34',
  label: 'Agile Methodology',
  color: '#10B981'
},
{
  id: '35',
  label: 'Scrum Framework',
  color: '#1F2937'
},
{
  id: '36',
  label: 'DevOps Practices',
  color: '#6B21A8'
},
{
  id: '37',
  label: 'Cloud Computing',
  color: '#EF4444'
},
{
  id: '38',
  label: 'AI & Machine Learning',
  color: '#F59E0B'
},
{
  id: '39',
  label: 'UX Design',
  color: '#EC4899'
},
{
  id: '40',
  label: 'Accessibility',
  color: '#14B8A6'
},
{
  id: '41',
  label: 'Performance Reviews',
  color: '#0EA5E9'
},
{
  id: '42',
  label: 'Mentoring',
  color: '#D946EF'
},
{
  id: '43',
  label: 'Public Speaking',
  color: '#F97316'
},
{
  id: '44',
  label: 'Negotiation Skills',
  color: '#84CC16'
},
{
  id: '45',
  label: 'Critical Thinking',
  color: '#06B6D4'
},
{
  id: '46',
  label: 'Problem Solving',
  color: '#A855F7'
},
{
  id: '47',
  label: 'Decision Making',
  color: '#E11D48'
},
{
  id: '48',
  label: 'Emotional Intelligence',
  color: '#6B7280'
},
{
  id: '49',
  label: 'Remote Work',
  color: '#3B82F6'
},
{
  id: '50',
  label: 'Cross-functional',
  color: '#10B981'
}];

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
export function ManageCategoriesModal({
  isOpen,
  onClose,
  onSave,
  usedCategoryLabels = new Set()
}: ManageCategoriesModalProps) {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [savedCategories, setSavedCategories] =
  useState<Category[]>(INITIAL_CATEGORIES);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(
    null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteWarningCategory, setDeleteWarningCategory] = useState<
    string | null>(
    null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragIndexRef = useRef<number | null>(null);
  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setCategories([...savedCategories]);
      setActiveCategoryIndex(null);
      setErrors({});
    }
  }, [isOpen]);
  const handleAddCategory = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newCategories = [
    ...categories,
    {
      id: newId,
      label: '',
      color: '#6B7280'
    }];

    setCategories(newCategories);
    setActiveCategoryIndex(newCategories.length - 1);
    setErrors({});
  };
  const handleDeleteCategory = (id: string) => {
    if (categories.length <= 1) return;
    const cat = categories.find((c) => c.id === id);
    if (cat && cat.label.trim()) {
      const derivedId = cat.label.toLowerCase().replace(/\s+/g, '-');
      const labelLower = cat.label.toLowerCase();
      const isInUse = Array.from(usedCategoryLabels).some(
        (used) =>
        derivedId === used ||
        labelLower === used ||
        derivedId.startsWith(used + '-') ||
        used.startsWith(derivedId + '-') ||
        derivedId.startsWith(used) ||
        used.startsWith(derivedId)
      );
      if (isInUse) {
        setDeleteWarningCategory(cat.label);
        return;
      }
    }
    setCategories(categories.filter((c) => c.id !== id));
  };
  const handleUpdateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(
      categories.map((c) =>
      c.id === id ?
      {
        ...c,
        ...updates
      } :
      c
      )
    );
  };
  const handleSaveDetail = () => {
    if (activeCategoryIndex === null) return;
    const cat = categories[activeCategoryIndex];
    const newErrors: Record<string, string> = {};
    if (!cat.label.trim()) newErrors.name = 'Category name is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setActiveCategoryIndex(null);
  };
  const handleBackToList = () => {
    // If the active category has no name, remove it (was a new empty one)
    if (activeCategoryIndex !== null) {
      const cat = categories[activeCategoryIndex];
      if (!cat.label.trim()) {
        setCategories(categories.filter((_, i) => i !== activeCategoryIndex));
      }
    }
    setErrors({});
    setActiveCategoryIndex(null);
  };
  const handleSave = () => {
    setSavedCategories([...categories]);
    onSave?.(categories);
    onClose();
  };
  const handleCancel = () => {
    setCategories([...savedCategories]);
    setActiveCategoryIndex(null);
    onClose();
  };
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
      const newCategories = [...categories];
      const [moved] = newCategories.splice(sourceIndex, 1);
      newCategories.splice(targetIndex, 0, moved);
      setCategories(newCategories);
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
  const activeCategory =
  activeCategoryIndex !== null ? categories[activeCategoryIndex] : null;
  return (
    <>
      <AnimatePresence>
        {isOpen &&
        <>
            {/* Backdrop */}
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
              duration: 0.2
            }}
            className="fixed inset-0 z-[9998] bg-black/20"
            onClick={handleCancel} />


            {/* Sidebar Panel */}
            <motion.div
            initial={{
              x: '100%'
            }}
            animate={{
              x: 0
            }}
            exit={{
              x: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 350
            }}
            className="fixed right-0 top-0 bottom-0 z-[9999] w-full max-w-md bg-white shadow-2xl flex flex-row">

              {/* Icon Rail - extensible vertical bar for contextual icons */}
              <div className="w-[48px] flex-shrink-0 border-r border-gray-200 bg-gray-50/80 flex flex-col items-center pt-4 gap-3">
                <button
                className="w-9 h-9 rounded-lg flex items-center justify-center bg-white text-gray-700 shadow-sm ring-1 ring-black/5 transition-all"
                title="Manage Categories">

                  <Tags className="w-[18px] h-[18px]" />
                </button>
              </div>

              {/* Main Panel Content */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="h-[57px] px-6 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                  {activeCategoryIndex !== null ?
                <div className="flex items-center gap-3">
                      <button
                    onClick={handleBackToList}
                    className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-lg transition-colors">

                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                      </button>
                      <h2 className="text-base font-bold text-gray-900">
                        {activeCategory?.label?.trim() || 'New Category'}
                      </h2>
                    </div> :

                <h2 className="text-base font-bold text-gray-900">
                      Manage Categories
                    </h2>
                }
                  <button
                  onClick={handleCancel}
                  className="p-1 hover:bg-gray-100 rounded transition-colors">

                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {activeCategoryIndex === null ?
                  <motion.div
                    key="category-list"
                    initial="enterFromLeft"
                    animate="center"
                    exit="exitToLeft"
                    variants={slideVariants}
                    transition={{
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="px-6 py-5">

                        <div className="space-y-2">
                          {categories.map((category, index) =>
                      <div
                        key={category.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center gap-2 group transition-all ${dragIndex === index ? 'opacity-30 scale-95' : ''} ${dragOverIndex === index && dragIndex !== index ? 'ring-2 ring-teal-400 rounded-lg' : ''}`}>

                              <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors select-none">
                                <GripVertical className="w-4 h-4" />
                              </div>
                              <button
                          onClick={() => {
                            setActiveCategoryIndex(index);
                            setErrors({});
                          }}
                          className="flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-200 bg-white hover:border-teal-400 hover:bg-teal-50/30 transition-all text-left">

                                <div
                            className="w-5 h-5 rounded-full flex-shrink-0 ring-2 ring-white shadow-sm"
                            style={{
                              backgroundColor: category.color
                            }} />

                                <div className="flex-1 min-w-0">
                                  <span className="text-sm text-gray-700 truncate block">
                                    {category.label.trim() ||
                              <span className="text-gray-400 italic">
                                        Unnamed Category
                                      </span>
                              }
                                  </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                              </button>
                              <button
                          onClick={() =>
                          handleDeleteCategory(category.id)
                          }
                          disabled={categories.length <= 1}
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-30 opacity-0 group-hover:opacity-100">

                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                      )}
                        </div>
                      </motion.div> :

                  <motion.div
                    key={`category-detail-${activeCategoryIndex}`}
                    initial="enterFromRight"
                    animate="center"
                    exit="exitToRight"
                    variants={slideVariants}
                    transition={{
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="px-6 py-5 space-y-5">

                        {/* Name Field */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Name
                            <span className="text-red-400 ml-0.5">*</span>
                          </label>
                          <input
                        type="text"
                        value={activeCategory?.label || ''}
                        onChange={(e) => {
                          if (activeCategory) {
                            handleUpdateCategory(activeCategory.id, {
                              label: e.target.value
                            });
                            if (errors.name) {
                              setErrors((prev) => {
                                const next = {
                                  ...prev
                                };
                                delete next.name;
                                return next;
                              });
                            }
                          }
                        }}
                        placeholder="e.g., Onboarding"
                        autoFocus
                        className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors ${errors.name ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'}`} />

                          {errors.name &&
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.name}
                            </p>
                      }
                          <p className="mt-1 text-xs text-gray-400">
                            The display name for this category.
                          </p>
                        </div>

                        {/* Color Field */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Color
                          </label>
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <input
                            type="color"
                            value={activeCategory?.color || '#6B7280'}
                            onChange={(e) => {
                              if (activeCategory) {
                                handleUpdateCategory(activeCategory.id, {
                                  color: e.target.value
                                });
                              }
                            }}
                            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white" />

                            </div>
                            <div className="flex-1 relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-mono">
                                #
                              </span>
                              <input
                            type="text"
                            value={(activeCategory?.color || '#6B7280').
                            replace('#', '').
                            toUpperCase()}
                            onChange={(e) => {
                              if (activeCategory) {
                                let val = e.target.value.
                                replace(/[^0-9A-Fa-f]/g, '').
                                slice(0, 6);
                                handleUpdateCategory(activeCategory.id, {
                                  color: `#${val}`
                                });
                              }
                            }}
                            onBlur={() => {
                              if (activeCategory) {
                                let hex = activeCategory.color.replace(
                                  '#',
                                  ''
                                );
                                if (hex.length < 6) {
                                  hex = hex.padEnd(6, '0');
                                }
                                handleUpdateCategory(activeCategory.id, {
                                  color: `#${hex}`
                                });
                              }
                            }}
                            maxLength={6}
                            placeholder="1F2937"
                            className="w-full rounded-md border border-gray-200 bg-white pl-7 pr-3 py-2.5 text-sm font-mono text-gray-900 uppercase tracking-wider hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors" />

                            </div>
                          </div>
                          <p className="mt-2 text-xs text-gray-400">
                            Pick a color or enter a hex value to identify this
                            category.
                          </p>
                        </div>
                      </motion.div>
                  }
                  </AnimatePresence>
                </div>

                {/* Sticky Add Category button - always visible above footer */}
                {activeCategoryIndex === null &&
              <div className="px-6 py-3 border-t border-gray-100 flex-shrink-0 bg-white">
                    <button
                  onClick={handleAddCategory}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">

                      <Plus className="w-4 h-4" />
                      Add Category
                    </button>
                  </div>
              }

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                  {activeCategoryIndex !== null ?
                (() => {
                  const isNewCategory = !savedCategories.some(
                    (sc) => sc.id === activeCategory?.id
                  );
                  return (
                    <>
                          <Button
                        variant="secondary"
                        onClick={handleBackToList}
                        leftIcon={
                        isNewCategory ?
                        <X className="w-4 h-4" /> :

                        <ArrowLeft className="w-4 h-4" />

                        }>

                            {isNewCategory ? 'Cancel' : 'Back'}
                          </Button>
                          <Button
                        variant="primary"
                        onClick={handleSaveDetail}
                        leftIcon={<Plus className="w-4 h-4" />}>

                            Add
                          </Button>
                        </>);

                })() :

                <>
                      <Button
                    variant="secondary"
                    onClick={handleCancel}
                    leftIcon={<X className="w-4 h-4" />}>

                        Cancel
                      </Button>
                      <Button
                    variant="primary"
                    onClick={handleSave}
                    leftIcon={<Save className="w-4 h-4" />}>

                        Save
                      </Button>
                    </>
                }
                </div>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Warning Dialog for in-use categories */}
      <AnimatePresence>
        {deleteWarningCategory &&
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
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
          onClick={() => setDeleteWarningCategory(null)}>

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
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Cannot delete category
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  <span className="font-medium text-gray-700">
                    "{deleteWarningCategory}"
                  </span>{' '}
                  is currently assigned to one or more questions. Reassign them
                  to a different category first.
                </p>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}