import React from 'react';
import { Loader2 } from 'lucide-react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    primary:
    'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md hover:shadow-lg hover:from-teal-500 hover:to-teal-400 border border-transparent',
    secondary:
    'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm',
    outline: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100'
  };
  const sizes = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 py-2 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
    icon: 'h-10 w-10 p-0'
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}>

      {isLoading ?
      <Loader2 className="h-4 w-4 animate-spin" /> :

      <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      }
    </button>);

}