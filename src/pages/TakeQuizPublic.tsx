import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TakeQuiz } from '../components/quiz-take/TakeQuiz';
import { MOCK_QUIZZES } from '../components/quizzes/QuizzesContent';
export function TakeQuizPublic() {
  const publishedQuizzes = MOCK_QUIZZES.filter((q) => q.status === 'published');
  const [selectedQuizId, setSelectedQuizId] = useState<string>(
    publishedQuizzes[0]?.id || ''
  );
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Simplified Top Bar */}
      <header className="bg-white border-b border-gray-200 h-[72px] flex items-center justify-between px-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <img
            src="/2025-logo-mrclean_7caceb4b2be73a7d7c60895567e55bd2.png"
            alt="SuiteDash"
            className="h-7 w-auto object-contain" />
          

          <div className="h-6 w-px bg-gray-200 hidden sm:block" />

          {/* Quiz Selector */}
          <div className="relative w-64 hidden sm:block">
            <select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium">
              
              {publishedQuizzes.map((quiz) =>
              <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Mobile Quiz Selector (shows only on small screens) */}
        <div className="relative w-48 sm:hidden">
          <select
            value={selectedQuizId}
            onChange={(e) => setSelectedQuizId(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium">
            
            {publishedQuizzes.map((quiz) =>
            <option key={quiz.id} value={quiz.id}>
                {quiz.title}
              </option>
            )}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <TakeQuiz quizId={selectedQuizId} />
      </main>
    </div>);

}