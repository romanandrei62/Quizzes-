import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Send,
  Archive,
  Star,
  Settings,
  User,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Search,
  Bell,
  MessageSquare,
  ChevronDown } from
'lucide-react';
import { TakeQuiz } from '../components/quiz-take/TakeQuiz';
import { MOCK_QUIZZES } from '../components/quizzes/QuizzesContent';
export function TakeQuizLoggedIn() {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const navigate = useNavigate();
  const publishedQuizzes = MOCK_QUIZZES.filter((q) => q.status === 'published');
  const [selectedQuizId, setSelectedQuizId] = useState<string>(
    publishedQuizzes[0]?.id || ''
  );
  const handleExit = () => {
    navigate('/');
  };
  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Main Navigation Sidebar (Left) - 229px width - Desktop only */}
      <div className="w-[229px] bg-[#1a1a1a] flex flex-col shadow-xl hidden lg:flex">
        {/* SuiteDash Logo - 230×90 */}
        <div className="h-[90px] flex items-center justify-center border-b border-gray-800 px-4">
          <img
            src="/2025-logo-mrclean_7caceb4b2be73a7d7c60895567e55bd2.png"
            alt="SuiteDash"
            className="h-10 w-auto object-contain" />
          
        </div>

        {/* Profile Section */}
        <div className="px-4 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-700 flex-shrink-0">
              <img
                src="/george_747d2e2b146642ac46c1bd46552ca9a3.png"
                alt="George"
                className="h-full w-full object-cover" />
              
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-bold tracking-wide">
                GEORGE
              </div>
              <button className="text-gray-400 text-xs hover:text-white transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="space-y-0.5 px-2">
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Calendar</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Archive className="w-4 h-4" />
                <span className="text-sm font-medium">CRM</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Office</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Projects</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Send className="w-4 h-4" />
                <span className="text-sm font-medium">Marketing</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Content</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Archive className="w-4 h-4" />
                <span className="text-sm font-medium">Files</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Forms</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Onboarding</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Support</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Communities</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Messaging</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Automations</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Archive className="w-4 h-4" />
                <span className="text-sm font-medium">LMS</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Settings</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors group">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">My Pages</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 text-white bg-gray-800 rounded transition-colors">
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Take Quiz</span>
              </div>
            </button>
          </div>
        </nav>

        {/* Bottom Ask Button */}
        <div className="p-3 border-t border-gray-800">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors">
            <span>?</span>
            <span>Ask</span>
          </button>
        </div>
      </div>

      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#1a1a1a] flex items-center justify-between px-4 z-50 shadow-lg">
        <button
          onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
          className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0">
          
          {isMainMenuOpen ?
          <X className="w-6 h-6" /> :

          <Menu className="w-6 h-6" />
          }
        </button>

        {/* Mobile Quiz Selector */}
        <div className="flex-1 px-4 flex justify-center">
          <div className="relative w-full max-w-[200px]">
            <select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              className="w-full appearance-none bg-gray-800/50 border border-gray-700 text-white text-sm rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500">
              
              {publishedQuizzes.map((quiz) =>
              <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              )}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-gray-700 cursor-pointer hover:border-gray-500 transition-colors">
            <img
              src="/george_747d2e2b146642ac46c1bd46552ca9a3.png"
              alt="George"
              className="h-full w-full object-cover" />
            
          </div>
        </div>
      </div>

      {/* Mobile Main Menu Overlay */}
      {isMainMenuOpen &&
      <>
          <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 mt-14"
          onClick={() => setIsMainMenuOpen(false)} />
        

          <div className="lg:hidden fixed left-0 top-14 bottom-0 w-64 bg-[#1a1a1a] z-50 shadow-xl overflow-y-auto">
            <div className="px-4 py-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-700">
                  <img
                  src="/george_747d2e2b146642ac46c1bd46552ca9a3.png"
                  alt="George"
                  className="h-full w-full object-cover" />
                
                </div>
                <div>
                  <div className="text-white text-sm font-bold">GEORGE</div>
                  <button className="text-gray-400 text-xs hover:text-white transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            <nav className="flex-1 py-4">
              <div className="space-y-0.5 px-2">
                <button
                onClick={() => navigate('/')}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors">
                
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-white bg-gray-800 rounded transition-colors">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">Take Quiz</span>
                </button>
              </div>
            </nav>
          </div>
        </>
      }

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden pt-14 lg:pt-0 bg-gray-50">
        {/* Top Navigation Bar - 90px height - Desktop only */}
        <div className="hidden lg:block bg-white border-b border-gray-200 h-[90px] flex-shrink-0">
          <div className="flex items-center justify-between px-6 h-full">
            <div className="flex items-center gap-6">
              <button
                onClick={handleExit}
                className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Back to Dashboard">
                
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Desktop Quiz Selector */}
              <div className="relative w-72">
                <select
                  value={selectedQuizId}
                  onChange={(e) => setSelectedQuizId(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium">
                  
                  {publishedQuizzes.map((quiz) =>
                  <option key={quiz.id} value={quiz.id}>
                      {quiz.title}
                    </option>
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
              <div className="h-[60px] w-[60px] rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors ml-2">
                <img
                  src="/george_747d2e2b146642ac46c1bd46552ca9a3.png"
                  alt="George"
                  className="h-full w-full object-cover" />
                
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="flex-1 overflow-hidden">
          <TakeQuiz quizId={selectedQuizId} onExit={handleExit} />
        </div>
      </div>
    </div>);

}