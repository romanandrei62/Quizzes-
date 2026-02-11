import React from 'react';
import { motion } from 'framer-motion';
export function MobileQuestionSkeleton({ count = 5 }: {count?: number;}) {
  return (
    <div className="space-y-3 p-4">
      {[...Array(count)].map((_, i) =>
      <motion.div
        key={i}
        initial={{
          opacity: 0,
          y: 8
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: i * 0.05
        }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

          <div className="pl-5 pr-4 py-4">
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1 space-y-2">
                <div
                className="h-4 bg-gray-200 rounded animate-pulse"
                style={{
                  width: `${70 + Math.random() * 20}%`
                }} />

                <div
                className="h-3 bg-gray-100 rounded animate-pulse"
                style={{
                  width: `${85 + Math.random() * 10}%`
                }} />

                <div
                className="h-3 bg-gray-100 rounded animate-pulse"
                style={{
                  width: `${60 + Math.random() * 25}%`
                }} />

              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="h-6 w-20 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </div>);

}