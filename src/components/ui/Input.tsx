import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  variant?: 'default' | 'search';
}
export function Input({
  label,
  error,
  className = '',
  fullWidth = true,
  icon,
  variant = 'default',
  id,
  required,
  ...props
}: InputProps) {
  const inputId = id || props.name || Math.random().toString(36).substr(2, 9);
  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label &&
      <label
        htmlFor={inputId}
        className="block text-xs font-semibold text-gray-600 uppercase mb-1.5 tracking-wide ml-0.5">

          {label} {required && <span className="text-red-500">*</span>}
        </label>
      }
      <div className="relative group">
        {(icon || variant === 'search') &&
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors">
            {variant === 'search' ? <Search className="h-4 w-4" /> : icon}
          </div>
        }
        <motion.input
          id={inputId}
          whileFocus={{
            scale: 1.01
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
          className={`
            flex h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm 
            placeholder:text-gray-400 shadow-sm transition-all
            focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500
            disabled:cursor-not-allowed disabled:opacity-50
            ${icon || variant === 'search' ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}
            ${className}
          `}
          required={required}
          {...props} />

      </div>
      {error &&
      <motion.p
        initial={{
          opacity: 0,
          y: -5
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="mt-1.5 text-xs text-red-500 font-medium ml-0.5">

          {error}
        </motion.p>
      }
    </div>);

}