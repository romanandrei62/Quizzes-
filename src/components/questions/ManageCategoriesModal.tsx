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
interface Category {
  id: string;
  label: string;
  color: string;
}
interface ManageCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (categories: Category[]) => void;
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
  label: 'Onboarding',
  color: '#1F2937'
},
{
  id: '2',
  label: 'Feedback',
  color: '#10B981'
},
{
  id: '3',
  label: 'LMS',
  color: '#6B21A8'
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
  onSave
}: ManageCategoriesModalProps) {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [savedCategories, setSavedCategories] =
  useState<Category[]>(INITIAL_CATEGORIES);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(
    null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
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
              {/* Future icons can be added here */}
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
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={categories.length <= 1}
                        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-30 opacity-0 group-hover:opacity-100">

                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                    )}
                        <button
                      onClick={handleAddCategory}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">

                          <Plus className="w-4 h-4" />
                          Add Category
                        </button>
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

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                {activeCategoryIndex !== null ?
              <>
                    <Button
                  variant="secondary"
                  onClick={handleBackToList}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}>

                      Back
                    </Button>
                    <Button
                  variant="primary"
                  onClick={handleSaveDetail}
                  leftIcon={<Save className="w-4 h-4" />}>

                      Save
                    </Button>
                  </> :

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
    </AnimatePresence>);

}