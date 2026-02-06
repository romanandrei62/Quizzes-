import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Plus, Trash2, Check, Settings } from 'lucide-react';
import { ModalDialog } from '../ui/ModalDialog';
interface Category {
  id: string;
  label: string;
  color: string;
}
interface ManageCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const PRESET_COLORS = [
'#3B82F6',
'#10B981',
'#8B5CF6',
'#F59E0B',
'#EF4444',
'#EC4899',
'#14B8A6',
'#6B7280' // Gray
];
export function ManageCategoriesModal({
  isOpen,
  onClose
}: ManageCategoriesModalProps) {
  const [categories, setCategories] = useState<Category[]>([
  {
    id: '1',
    label: 'Onboarding',
    color: '#3B82F6'
  },
  {
    id: '2',
    label: 'Feedback',
    color: '#10B981'
  },
  {
    id: '3',
    label: 'LMS',
    color: '#8B5CF6'
  }]
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [colorPickerId, setColorPickerId] = useState<string | null>(null);
  const handleAddCategory = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newCategory = {
      id: newId,
      label: '',
      color: '#6B7280'
    };
    setCategories([...categories, newCategory]);
    setEditingId(newId);
  };
  const handleDeleteCategory = (id: string) => {
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
  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Question Categories"
      maxWidth="md"
      footer={
      <div className="flex justify-end w-full">
          <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">

            Done
          </button>
        </div>
      }>

      <div className="p-6">
        <div className="space-y-1">
          <AnimatePresence initial={false}>
            {categories.map((category) =>
            <motion.div
              key={category.id}
              initial={{
                opacity: 0,
                height: 0
              }}
              animate={{
                opacity: 1,
                height: 'auto'
              }}
              exit={{
                opacity: 0,
                height: 0
              }}
              transition={{
                duration: 0.2
              }}
              className="group relative">

                <div className="flex items-center gap-3 py-3 border-b border-gray-100 group-hover:bg-gray-50/50 rounded-lg px-2 -mx-2 transition-colors">
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  {/* Color Dot */}
                  <div className="relative">
                    <button
                    onClick={() =>
                    setColorPickerId(
                      colorPickerId === category.id ? null : category.id
                    )
                    }
                    className="w-4 h-4 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    style={{
                      backgroundColor: category.color
                    }} />


                    {/* Color Picker Popover */}
                    <AnimatePresence>
                      {colorPickerId === category.id &&
                    <>
                          <div
                        className="fixed inset-0 z-10"
                        onClick={() => setColorPickerId(null)} />

                          <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                          scale: 0.95
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1
                        }}
                        exit={{
                          opacity: 0,
                          y: 10,
                          scale: 0.95
                        }}
                        className="absolute top-full left-0 mt-2 p-3 bg-white rounded-xl shadow-xl border border-gray-100 z-20 flex gap-2 w-max">

                            {PRESET_COLORS.map((color) =>
                        <button
                          key={color}
                          onClick={() => {
                            handleUpdateCategory(category.id, {
                              color
                            });
                            setColorPickerId(null);
                          }}
                          className="w-6 h-6 rounded-full hover:scale-110 transition-transform relative"
                          style={{
                            backgroundColor: color
                          }}>

                                {category.color === color &&
                          <div className="absolute inset-0 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                          }
                              </button>
                        )}
                          </motion.div>
                        </>
                    }
                    </AnimatePresence>
                  </div>

                  {/* Category Name Input/Text */}
                  <div className="flex-1">
                    {editingId === category.id ?
                  <input
                    type="text"
                    value={category.label}
                    onChange={(e) =>
                    handleUpdateCategory(category.id, {
                      label: e.target.value
                    })
                    }
                    onBlur={() => setEditingId(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setEditingId(null);
                    }}
                    autoFocus
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    placeholder="Category Name" /> :


                  <span
                    onClick={() => setEditingId(category.id)}
                    className="text-sm text-gray-900 cursor-text block w-full py-1 px-2 hover:bg-gray-100 rounded transition-colors">

                        {category.label ||
                    <span className="text-gray-400 italic">
                            Unnamed Category
                          </span>
                    }
                      </span>
                  }
                  </div>

                  {/* Delete Button */}
                  <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">

                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add Category Button */}
        <button
          onClick={handleAddCategory}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors px-2 py-2 rounded-lg hover:bg-gray-50 w-full">

          <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300">
            <Plus className="w-3 h-3" />
          </div>
          Add Category
        </button>
      </div>
    </ModalDialog>);

}