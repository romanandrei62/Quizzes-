import React from 'react';
import { motion } from 'framer-motion';
interface AvatarProps {
  src?: string;
  fallback: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}
export function Avatar({
  src,
  fallback,
  alt = 'Avatar',
  size = 'md',
  status,
  className = ''
}: AvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg'
  };
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-amber-500'
  };
  return <div className={`relative inline-block ${className}`}>
      <motion.div whileHover={{
      scale: 1.05
    }} className={`
          relative overflow-hidden rounded-full flex items-center justify-center
          bg-gradient-to-br from-teal-500 to-teal-600 text-white font-medium shadow-sm
          border-2 border-white ring-1 ring-gray-100
          ${sizeClasses[size]}
        `}>

        {src ? <img src={src} alt={alt} className="h-full w-full object-cover" /> : <span>{fallback}</span>}
      </motion.div>

      {status && <span className={`
          absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white
          ${statusColors[status]}
        `} />}
    </div>;
}