import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
export type ToastType = 'success' | 'error' | 'info' | 'warning';
export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}
interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}
export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) =>
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        )}
      </AnimatePresence>
    </div>);

}
function ToastItem({
  toast,
  onDismiss



}: {toast: ToastMessage;onDismiss: (id: string) => void;}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />
  };
  const borders = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    info: 'border-l-blue-500',
    warning: 'border-l-amber-500'
  };
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        x: 50,
        scale: 0.9
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1
      }}
      exit={{
        opacity: 0,
        x: 20,
        scale: 0.9
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30
      }}
      className={`
        pointer-events-auto w-80 bg-white rounded-lg shadow-lg border border-gray-100 
        border-l-4 p-4 flex items-start gap-3 backdrop-blur-sm bg-white/95
        ${borders[toast.type]}
      `}>

      <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900">{toast.title}</h4>
        {toast.message &&
        <p className="text-sm text-gray-500 mt-1">{toast.message}</p>
        }
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">

        <X className="h-4 w-4" />
      </button>
    </motion.div>);

}