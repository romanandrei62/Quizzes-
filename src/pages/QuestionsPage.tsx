import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  Trash2,
  Archive,
  Star,
  Settings,
  User,
  Menu,
  X,
  Plus,
  ChevronRight,
  ChevronLeft,
  Search,
  Bell,
  MessageSquare,
  GripVertical } from
'lucide-react';
import { QuestionsSidebar } from '../components/questions/QuestionsSidebar';
import { QuestionsContent } from '../components/questions/QuestionsContent';
import { QuestionDetail } from '../components/questions/QuestionDetail';
import { QuizzesSidebar } from '../components/quizzes/QuizzesSidebar';
import { QuizzesContent } from '../components/quizzes/QuizzesContent';
import { QuizDetail } from '../components/quizzes/QuizDetail';
interface Question {
  id: string;
  title: string;
  type: string;
  category: string;
  createdAt: Date;
  status: 'active' | 'draft';
  description?: string;
  options?: string[];
}

interface Quiz {
  id: string;
  title: string;
  numQuestions: number;
  passingScore: number;
  category: string;
  scoreDisplay: boolean;
  hints: boolean;
  showPercentComplete: boolean;
  showNumQuestions: boolean;
  showProgressBar: boolean;
  status: 'draft' | 'ready' | 'archived';
  description?: string;
}

export function QuestionsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'questions' | 'quizzes'>(
    'questions'
  );
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [detailDefaultTab, setDetailDefaultTab] = useState<'info' | 'edit'>(
    'info'
  );
  const [detailKey, setDetailKey] = useState(0);

  // Quiz-specific state
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedQuizCategory, setSelectedQuizCategory] = useState<string>('all');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  // Column widths - left: 25%, middle: 25%, right: 50%
  const [leftWidth, setLeftWidth] = useState(300);
  const [middleWidth, setMiddleWidth] = useState(300);
  const [rightWidth, setRightWidth] = useState(600);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Calculate initial widths as 25% / 25% / 50%
  useEffect(() => {
    const calculateWidths = () => {
      if (containerRef.current) {
        const containerWidth =
        containerRef.current.getBoundingClientRect().width;
        const availableWidth = containerWidth - 64;
        const targetLeft = Math.max(240, Math.floor(availableWidth * 0.25));
        const targetMiddle = Math.max(320, Math.floor(availableWidth * 0.25));
        const targetRight = Math.max(
          360,
          availableWidth - targetLeft - targetMiddle
        );
        const left = targetLeft;
        const middle = targetMiddle;
        const right = Math.max(360, availableWidth - left - middle);
        setLeftWidth(left);
        setMiddleWidth(middle);
        setRightWidth(right);
      }
    };
    calculateWidths();
    window.addEventListener('resize', calculateWidths);
    const timer = setTimeout(calculateWidths, 100);
    return () => {
      window.removeEventListener('resize', calculateWidths);
      clearTimeout(timer);
    };
  }, []);
  const handleLeftMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingLeft(true);
  };
  const handleRightMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingRight(true);
  };
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left - 16;
      const totalWidth = containerRect.width - 32 - 8;
      if (isDraggingLeft) {
        const newLeftWidth = Math.max(240, Math.min(500, mouseX));
        const newMiddleWidth = totalWidth - newLeftWidth - rightWidth;
        if (newMiddleWidth >= 320) {
          setLeftWidth(newLeftWidth);
          setMiddleWidth(newMiddleWidth);
        }
      }
      if (isDraggingRight) {
        const newRightWidth = Math.max(
          360,
          Math.min(totalWidth * 0.7, totalWidth - mouseX - 8)
        );
        const newMiddleWidth = totalWidth - leftWidth - newRightWidth;
        if (newMiddleWidth >= 320) {
          setMiddleWidth(newMiddleWidth);
          setRightWidth(newRightWidth);
        }
      }
    };
    const handleMouseUp = () => {
      setIsDraggingLeft(false);
      setIsDraggingRight(false);
    };
    if (isDraggingLeft || isDraggingRight) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDraggingLeft, isDraggingRight, leftWidth, middleWidth, rightWidth]);
  const handleCreateQuestion = () => {
    const newQuestion: Question = {
      id: `new-${Date.now()}`,
      title: 'New Question',
      type: 'multiple',
      category: 'feedback',
      createdAt: new Date(),
      status: 'draft',
      options: ['', '', '', '']
    };
    setDetailDefaultTab('edit');
    setDetailKey((prev) => prev + 1);
    setSelectedQuestion(newQuestion);
  };
  const handleSelectQuestion = (question: Question) => {
    setDetailDefaultTab('info');
    setDetailKey((prev) => prev + 1);
    setSelectedQuestion(question);
  };
  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Main Navigation Sidebar (Left) - 229px width */}
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
                <span className="text-sm font-medium">Questions</span>
              </div>
            </button>
          </div>
        </nav>

        {/* Bottom Ask Button */}
        <div className="p-3 border-t border-gray-800">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors">
            <span>?</span>
            <span>Ask!</span>
          </button>
        </div>
      </div>

      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#1a1a1a] flex items-center justify-between px-4 z-50 shadow-lg">
        <button
          onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
          className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">

          {isMainMenuOpen ?
          <X className="w-6 h-6" /> :

          <Menu className="w-6 h-6" />
          }
        </button>

        <img
          src="/2025-logo-mrclean_7caceb4b2be73a7d7c60895567e55bd2.png"
          alt="SuiteDash"
          className="h-6 w-auto object-contain" />


        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateQuestion}
            className="p-1.5 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-colors">

            <Plus className="w-5 h-5" />
          </button>
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
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-white/60 hover:bg-gray-800 rounded transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-white bg-gray-800 rounded transition-colors">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">Questions</span>
                </button>
              </div>
            </nav>
          </div>
        </>
      }

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden pt-14 lg:pt-0 bg-gray-50">
        {/* Top Navigation Bar - 90px height */}
        <div className="bg-white border-b border-gray-200 h-[90px]">
          <div className="hidden lg:flex items-center justify-between px-6 h-full">
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleCreateQuestion}
                className="p-2 bg-black text-white hover:bg-gray-800 rounded-lg transition-colors">

                <Plus className="w-5 h-5" />
              </button>
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
              <div className="h-[60px] w-[60px] rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors">
                <img
                  src="/george_747d2e2b146642ac46c1bd46552ca9a3.png"
                  alt="George"
                  className="h-full w-full object-cover" />

              </div>
            </div>
          </div>
          {/* Always-visible create button row for non-lg screens */}
          <div className="lg:hidden flex items-center justify-between px-4 h-full">
            <button
              onClick={handleCreateQuestion}
              className="p-2 bg-black text-white hover:bg-gray-800 rounded-lg transition-colors">

              <Plus className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Spacing above tabs */}
        <div className="pt-4" />

        {/* Tabs Row - with horizontal padding and rounded edges */}
        <div className="px-4 pb-4">
          <div
            className="bg-white border border-gray-200 rounded-lg"
            style={{
              boxSizing: 'border-box',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgb(238, 238, 238) transparent'
            }}>

            <div className="flex items-center justify-center gap-12 px-6 py-4">
              <button
                onClick={() => setActiveTab('questions')}
                className={`text-sm font-bold tracking-wider pb-2 transition-colors relative ${activeTab === 'questions' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>

                QUESTIONS
                {activeTab === 'questions' &&
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                }
              </button>
              <button
                onClick={() => setActiveTab('quizzes')}
                className={`text-sm font-bold tracking-wider pb-2 transition-colors relative ${activeTab === 'quizzes' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>

                QUIZZES
                {activeTab === 'quizzes' &&
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Three-Column Layout with Resize Handles */}
        <div
          ref={containerRef}
          className="flex-1 flex gap-4 px-4 pb-4 overflow-hidden">

          {/* Left Column: Sidebar - 25% width */}
          <div
            className="flex-shrink-0 shadow-lg rounded-lg overflow-hidden h-full hidden lg:flex"
            style={{
              width: `${leftWidth}px`
            }}>

            {activeTab === 'questions' ? (
              <QuestionsSidebar
                selectedType={selectedType}
                onSelectType={setSelectedType}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onCreateQuestion={handleCreateQuestion}
              />
            ) : (
              <QuizzesSidebar
                selectedStatus={selectedStatus}
                onSelectStatus={setSelectedStatus}
                selectedCategory={selectedQuizCategory}
                onSelectCategory={setSelectedQuizCategory}
              />
            )}
          </div>

          {/* Resize Handle - Left */}
          <div
            className="hidden lg:flex items-stretch justify-center flex-shrink-0 cursor-col-resize group relative -mx-2"
            style={{
              width: '4px'
            }}
            onMouseDown={handleLeftMouseDown}>

            <div className="w-px bg-gray-300 group-hover:bg-gray-400 transition-colors" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded p-1 shadow-sm">
              <GripVertical className="w-3 h-3 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </div>
          </div>

          {/* Middle Column: Questions List - 25% width */}
          <div
            className="flex-shrink-0 bg-white shadow-lg rounded-lg overflow-hidden h-full"
            style={{
              width: `${middleWidth}px`
            }}>

            <AnimatePresence mode="wait">
              {activeTab === 'questions' &&
              <QuestionsContent
                key="questions"
                selectedType={selectedType}
                selectedCategory={selectedCategory}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                selectedQuestion={selectedQuestion}
                onSelectQuestion={handleSelectQuestion} />

              }
              {activeTab === 'quizzes' &&
              <QuizzesContent
                key="quizzes"
                selectedStatus={selectedStatus}
                selectedCategory={selectedQuizCategory}
                selectedQuiz={selectedQuiz}
                onSelectQuiz={setSelectedQuiz}
              />
              }
            </AnimatePresence>
          </div>

          {/* Resize Handle - Right */}
          <div
            className="hidden lg:flex items-stretch justify-center flex-shrink-0 cursor-col-resize group relative -mx-2"
            style={{
              width: '4px'
            }}
            onMouseDown={handleRightMouseDown}>

            <div className="w-px bg-gray-300 group-hover:bg-gray-400 transition-colors" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded p-1 shadow-sm">
              <GripVertical className="w-3 h-3 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </div>
          </div>

          {/* Right Column: Detail - 50% width (desktop) */}
          <div
            className="hidden lg:flex flex-shrink-0 bg-white shadow-lg rounded-lg overflow-hidden h-full"
            style={{
              width: `${rightWidth}px`
            }}>

            {activeTab === 'questions' ? (
              <QuestionDetail
                key={detailKey}
                question={selectedQuestion}
                onClose={() => setSelectedQuestion(null)}
                defaultTab={detailDefaultTab}
              />
            ) : (
              <QuizDetail
                quiz={selectedQuiz}
                onClose={() => setSelectedQuiz(null)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Detail Overlay - shown on mobile only when a question is selected/created */}
      {selectedQuestion &&
      <div
        className="lg:hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: '#ffffff'
        }}>

          <QuestionDetail
          key={`overlay-${detailKey}`}
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          defaultTab={detailDefaultTab} />

        </div>
      }
    </div>);

}