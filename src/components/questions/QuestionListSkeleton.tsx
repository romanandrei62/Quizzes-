import React from 'react';
function SkeletonRow({
  index


}: {index: number;}) {
  return <div className="flex items-center gap-0" style={{
    animationDelay: `${index * 75}ms`
  }}>

      {/* Left Spacing */}
      <div className="hidden sm:block w-3 flex-shrink-0" />

      {/* Category Color Bar */}
      <div className="flex items-center py-3 sm:py-4 flex-shrink-0 pl-3 sm:pl-0">
        <div className="w-1 h-12 rounded-full bg-gray-200 animate-pulse" style={{
        animationDelay: `${index * 75}ms`
      }} />

      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 min-w-0">
        {/* Type Icon */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 animate-pulse flex-shrink-0" style={{
        animationDelay: `${index * 75 + 50}ms`
      }} />


        {/* Title + Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <div className="h-3.5 bg-gray-200 rounded animate-pulse" style={{
              width: `${55 + index * 17 % 35}%`,
              animationDelay: `${index * 75 + 100}ms`
            }} />

              <div className="hidden xs:block h-3 bg-gray-100 rounded mt-2 animate-pulse" style={{
              width: `${70 + index * 23 % 25}%`,
              animationDelay: `${index * 75 + 150}ms`
            }} />

            </div>

            {/* Status Icon */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 animate-pulse flex-shrink-0" style={{
            animationDelay: `${index * 75 + 200}ms`
          }} />

          </div>
        </div>

        {/* Actions placeholder */}
        <div className="w-6 h-6 rounded bg-gray-50 animate-pulse flex-shrink-0" style={{
        animationDelay: `${index * 75 + 250}ms`
      }} />

      </div>
    </div>;
}
interface QuestionListSkeletonProps {
  count?: number;
}
export function QuestionListSkeleton({
  count = 8
}: QuestionListSkeletonProps) {
  return <div className="divide-y divide-gray-100">
      {Array.from({
      length: count
    }).map((_, i) => <SkeletonRow key={i} index={i} />)}
    </div>;
}