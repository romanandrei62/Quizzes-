import React, { Component } from 'react';
import { motion } from 'framer-motion';
interface BadgeProps {
  children: React.ReactNode;
  variant?:
  'default' |
  'outline' |
  'secondary' |
  'danger' |
  'success' |
  'warning';
  className?: string;
  animate?: boolean;
}
export function Badge({
  children,
  variant = 'default',
  className = '',
  animate = false
}: BadgeProps) {
  const variants = {
    default: 'bg-teal-100 text-teal-800 border-teal-200',
    outline: 'border border-gray-200 text-gray-600',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200'
  };
  const Component = animate ? motion.span : 'span';
  const animationProps = animate ?
  {
    initial: {
      scale: 0.8,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1
    },
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  } :
  {};
  return (
    <Component
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
        ${variants[variant]} ${className}
      `}
      {...animationProps}>

      {children}
    </Component>);

}