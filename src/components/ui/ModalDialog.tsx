import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';
interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '6xl';
}
export function ModalDialog({
  isOpen,
  onClose,
  title,
  children,
  footer,
  isExpanded = false,
  onToggleExpand,
  maxWidth = '2xl'
}: ModalDialogProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '6xl': 'max-w-6xl'
  };
  return <AnimatePresence>
      {isOpen && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className={`fixed inset-0 z-50 flex justify-center ${isExpanded ? 'items-stretch lg:items-end bg-white lg:bg-black/50 lg:backdrop-blur-sm' : 'items-end bg-black/50 backdrop-blur-sm'}`} onClick={isExpanded ? undefined : onClose}>

          <motion.div initial={{
        y: '100%',
        opacity: 0,
        scale: 0.96
      }} animate={{
        y: 0,
        opacity: 1,
        scale: 1
      }} exit={{
        y: '100%',
        opacity: 0,
        scale: 0.96
      }} transition={{
        type: 'spring',
        damping: 28,
        stiffness: 300,
        mass: 0.5
      }} layout className={`w-full bg-white shadow-2xl overflow-hidden flex flex-col ${isExpanded ? `lg:${maxWidthClasses['6xl']} lg:max-h-[90vh] lg:rounded-t-2xl max-h-screen rounded-none` : `${maxWidthClasses[maxWidth]} max-h-[700px] rounded-t-2xl`}`} onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <div className="flex items-center gap-2">
                {onToggleExpand && <button onClick={onToggleExpand} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title={isExpanded ? 'Minimize' : 'Maximize'}>

                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>}
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">

                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">{children}</div>

            {/* Footer */}
            {footer && <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-start flex-shrink-0">
                {footer}
              </div>}
          </motion.div>
        </motion.div>}
    </AnimatePresence>;
}