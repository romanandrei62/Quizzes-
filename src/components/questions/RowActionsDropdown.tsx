import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Eye, Edit, Copy, Trash2 } from 'lucide-react';
interface RowActionsDropdownProps {
  onAction: (action: string) => void;
}
export function RowActionsDropdown({ onAction }: RowActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node))
      {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  const actions = [
  {
    id: 'view',
    label: 'View',
    icon: Eye
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: Edit
  },
  {
    id: 'duplicate',
    label: 'Duplicate',
    icon: Copy
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: Trash2
  }];

  const handleActionClick = (actionId: string) => {
    onAction(actionId);
    setIsOpen(false);
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-200 rounded transition-colors flex-shrink-0">

        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>
      <AnimatePresence>
        {isOpen &&
        <>
            {/* Mobile: Full-screen overlay */}
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
            className="sm:hidden fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)} />


            {/* Dropdown */}
            <motion.div
            initial={{
              opacity: 0,
              y: -10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            transition={{
              duration: 0.15
            }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-[70vh] overflow-y-auto">

              {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action.id)}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">

                    <Icon className="w-4 h-4 flex-shrink-0 text-gray-500" />

                    <span className="text-sm text-gray-700">
                      {action.label}
                    </span>
                  </button>);

            })}
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}