import React from 'react';
import { X, Pencil, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox } from './Checkbox';
interface BulkEditBarProps {
  selectedCount: number;
  totalCount: number;
  currentPageCount: number;
  allPagesSelected: boolean;
  allCurrentPageSelected: boolean;
  someCurrentPageSelected: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete?: () => void;
  onSelectAllPages: () => void;
  onSelectCurrentPageOnly: () => void;
  onToggleSelectAll: () => void;
}
export function BulkEditBar({
  selectedCount,
  totalCount,
  currentPageCount,
  allPagesSelected,
  allCurrentPageSelected,
  someCurrentPageSelected,
  onClose,
  onEdit,
  onDelete,
  onSelectAllPages,
  onSelectCurrentPageOnly,
  onToggleSelectAll
}: BulkEditBarProps) {
  return (
    <motion.div
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
        duration: 0.35,
        ease: [0.32, 0.72, 0, 1]
      }}
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-b border-gray-700 shadow-lg overflow-hidden">

      <motion.div
        initial={{
          y: -20
        }}
        animate={{
          y: 0
        }}
        exit={{
          y: -20
        }}
        transition={{
          duration: 0.35,
          ease: [0.32, 0.72, 0, 1]
        }}
        className="px-4 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">

        {/* Left Side - Selection Info */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 min-w-0 flex-1">
          {/* Desktop Layout - Checkbox + Count Badge + Text */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3 min-w-0">
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                delay: 0.1
              }}
              className="flex-shrink-0">

              <Checkbox
                checked={allCurrentPageSelected}
                indeterminate={someCurrentPageSelected}
                onChange={onToggleSelectAll}
                id="bulk-select-all" />

            </motion.div>
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                delay: 0.15
              }}
              className="relative w-7 h-7 sm:w-8 sm:h-8 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">

              <span className="text-xs sm:text-sm font-bold leading-none">
                {selectedCount}
              </span>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                x: -10
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.3,
                delay: 0.2
              }}
              className="flex flex-col gap-0.5 min-w-0">

              <AnimatePresence mode="wait">
                {allPagesSelected ?
                <motion.div
                  key="all-pages"
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
                    y: 5
                  }}
                  transition={{
                    duration: 0.2
                  }}
                  className="flex flex-col">

                    <span className="text-xs sm:text-sm font-semibold text-white leading-tight truncate">
                      All {totalCount} items selected
                    </span>
                    <button
                    onClick={onSelectCurrentPageOnly}
                    className="text-[10px] sm:text-xs text-gray-300 hover:text-white transition-colors text-left leading-tight mt-0.5 truncate">

                      Select current page only →
                    </button>
                  </motion.div> :

                <motion.div
                  key="current-page"
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
                    y: 5
                  }}
                  transition={{
                    duration: 0.2
                  }}
                  className="flex flex-col">

                    <span className="text-xs sm:text-sm font-semibold text-white leading-tight truncate">
                      {selectedCount} item{selectedCount !== 1 ? 's' : ''}{' '}
                      selected
                    </span>
                    {selectedCount === currentPageCount &&
                  <button
                    onClick={onSelectAllPages}
                    className="text-[10px] sm:text-xs text-teal-300 hover:text-teal-200 font-medium transition-colors text-left leading-tight mt-0.5 truncate">

                        Select all {totalCount} items →
                      </button>
                  }
                    {selectedCount !== currentPageCount &&
                  <span className="text-[10px] sm:text-xs text-gray-400 leading-tight mt-0.5 truncate">
                        Custom selection
                      </span>
                  }
                  </motion.div>
                }
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Layout - Compact with count badge only (no text labels) */}
          <div className="flex sm:hidden items-center gap-2 min-w-0">
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                delay: 0.1
              }}
              className="relative w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">

              <span className="text-sm font-bold leading-none">
                {selectedCount}
              </span>
            </motion.div>
          </div>

          {/* Desktop Action Buttons - Icon only */}
          <motion.div
            initial={{
              opacity: 0,
              x: -10
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.3,
              delay: 0.25
            }}
            className="hidden md:flex items-center gap-2">

            <button
              onClick={onEdit}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/10"
              aria-label="Edit">

              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-all duration-200 backdrop-blur-sm border border-red-400/20"
              aria-label="Delete">

              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Right Side - Action Icons */}
        <motion.div
          initial={{
            opacity: 0,
            x: 10
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            duration: 0.3,
            delay: 0.3
          }}
          className="flex items-center gap-2 flex-shrink-0">

          {/* Mobile Action Buttons - Icon only, no labels */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200"
              aria-label="Edit">

              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-all duration-200"
              aria-label="Delete">

              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 flex-shrink-0"
            aria-label="Clear selection">

            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>);

}