import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Info,
  PenSquare,
  MonitorPlay,
  ArrowLeft,
  Trash2,
  Edit,
  Save,
  Send,
  ChevronDown,
  Eye,
  EyeOff,
  HelpCircle,
  BarChart3,
  ListChecks,
  Percent,
  ToggleLeft,
  FileText } from
'lucide-react';
import { Button } from '../ui/Button';
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
  status: 'draft' | 'published' | 'archived';
  description?: string;
}
interface QuizDetailProps {
  quiz: Quiz | null;
  onClose: () => void;
}
const CATEGORIES = [
{
  id: 'onboarding',
  label: 'Onboarding',
  color: '#1F2937'
},
{
  id: 'assessment',
  label: 'Assessment',
  color: '#6B21A8'
},
{
  id: 'knowledge-check',
  label: 'Knowledge Check',
  color: '#3B82F6'
},
{
  id: 'compliance',
  label: 'Compliance',
  color: '#10B981'
},
{
  id: 'technical-skills',
  label: 'Technical Skills',
  color: '#0EA5E9'
},
{
  id: 'product-knowledge',
  label: 'Product Knowledge',
  color: '#F59E0B'
},
{
  id: 'safety-training',
  label: 'Safety Training',
  color: '#EF4444'
},
{
  id: 'customer-service',
  label: 'Customer Service',
  color: '#D946EF'
},
{
  id: 'data-privacy',
  label: 'Data Privacy',
  color: '#06B6D4'
}];

function InfoSkeleton() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
        <div
          className="h-4 w-32 bg-gray-100 rounded animate-pulse"
          style={{
            animationDelay: '50ms'
          }} />
        
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) =>
        <div key={i}>
            <div
            className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2"
            style={{
              animationDelay: `${i * 50}ms`
            }} />
          
            <div
            className="h-5 w-16 bg-gray-100 rounded animate-pulse"
            style={{
              animationDelay: `${i * 50 + 25}ms`
            }} />
          
          </div>
        )}
      </div>
      <div className="pt-4 border-t border-gray-100">
        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="space-y-2">
          {[...Array(4)].map((_, i) =>
          <div
            key={i}
            className="h-10 w-full bg-gray-100 rounded-lg animate-pulse"
            style={{
              animationDelay: `${i * 50}ms`
            }} />

          )}
        </div>
      </div>
    </div>);

}
function FormSkeleton() {
  return (
    <div className="px-6 pt-6 pb-8 space-y-6">
      <div>
        <div className="h-3.5 w-28 bg-gray-200 rounded animate-pulse mb-2.5" />
        <div
          className="h-10 w-full bg-gray-100 rounded-md animate-pulse"
          style={{
            animationDelay: '50ms'
          }} />
        
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div
            className="h-3.5 w-20 bg-gray-200 rounded animate-pulse mb-2.5"
            style={{
              animationDelay: '100ms'
            }} />
          
          <div
            className="h-10 w-full bg-gray-100 rounded-md animate-pulse"
            style={{
              animationDelay: '150ms'
            }} />
          
        </div>
        <div>
          <div
            className="h-3.5 w-24 bg-gray-200 rounded animate-pulse mb-2.5"
            style={{
              animationDelay: '200ms'
            }} />
          
          <div
            className="h-10 w-full bg-gray-100 rounded-md animate-pulse"
            style={{
              animationDelay: '250ms'
            }} />
          
        </div>
      </div>
      <div>
        <div
          className="h-3.5 w-20 bg-gray-200 rounded animate-pulse mb-2.5"
          style={{
            animationDelay: '300ms'
          }} />
        
        <div
          className="h-24 w-full bg-gray-100 rounded-md animate-pulse"
          style={{
            animationDelay: '350ms'
          }} />
        
      </div>
      <div className="space-y-3 pt-4">
        {[...Array(5)].map((_, i) =>
        <div
          key={i}
          className="h-12 w-full bg-gray-100 rounded-lg animate-pulse"
          style={{
            animationDelay: `${400 + i * 50}ms`
          }} />

        )}
      </div>
    </div>);

}
export function QuizDetail({ quiz, onClose }: QuizDetailProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'edit' | 'preview'>(
    'info'
  );
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // Form state
  const [title, setTitle] = useState(quiz?.title || 'New Quiz');
  const [description, setDescription] = useState(quiz?.description || '');
  const [category, setCategory] = useState(quiz?.category || 'onboarding');
  const [passingScore, setPassingScore] = useState(quiz?.passingScore || 75);
  const [scoreDisplay, setScoreDisplay] = useState(quiz?.scoreDisplay || false);
  const [hints, setHints] = useState(quiz?.hints || true);
  const [showPercentComplete, setShowPercentComplete] = useState(
    quiz?.showPercentComplete || false
  );
  const [showNumQuestions, setShowNumQuestions] = useState(
    quiz?.showNumQuestions || false
  );
  const [showProgressBar, setShowProgressBar] = useState(
    quiz?.showProgressBar || false
  );
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(
    quiz?.status || 'draft'
  );
  const isPublished = status === 'published';
  useEffect(() => {
    if (activeTab === 'info' && quiz) {
      setIsInfoLoading(true);
      const timer = setTimeout(() => setIsInfoLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [activeTab, quiz?.id]);
  useEffect(() => {
    if (activeTab === 'edit' && isFormLoading) {
      const timer = setTimeout(() => setIsFormLoading(false), 700);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isFormLoading]);
  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDescription(quiz.description || '');
      setCategory(quiz.category);
      setPassingScore(quiz.passingScore);
      setScoreDisplay(quiz.scoreDisplay);
      setHints(quiz.hints);
      setShowPercentComplete(quiz.showPercentComplete);
      setShowNumQuestions(quiz.showNumQuestions);
      setShowProgressBar(quiz.showProgressBar);
      setStatus(quiz.status);
    }
  }, [quiz?.id]);
  const handleSave = (saveStatus: 'draft' | 'published') => {
    setStatus(saveStatus);
    setActiveTab('info');
  };
  if (!quiz) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h3 className="text-xl font-normal text-gray-700 mb-3">
            Ready to get started?
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            When an item is added, you will see it displayed here
          </p>
          <div className="w-48 h-48 mx-auto opacity-40 mt-8">
            <img
              src="/image.png"
              alt="Empty state"
              className="w-full h-full object-contain" />
            
          </div>
        </div>
      </div>);

  }
  return (
    <div className="w-full h-full bg-white flex flex-col md:flex-row overflow-hidden relative">
      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {showDeleteConfirm &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.15
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
          onClick={() => setShowDeleteConfirm(false)}>
          
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 8
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 4
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 400
            }}
            className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 mx-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}>
            
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Delete this quiz?
                </h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  This quiz will be permanently removed. This action cannot be
                  undone.
                </p>
                <div className="flex items-center gap-3 w-full">
                  <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  
                    Cancel
                  </button>
                  <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    onClose();
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Icon Sidebar - Hidden on mobile */}
      <div className="hidden md:flex w-[48px] flex-shrink-0 border-r border-gray-200 bg-gray-50/80 flex-col items-center pt-4 gap-3">
        <button
          onClick={() => setActiveTab('info')}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${activeTab === 'info' ? 'bg-white text-gray-700 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
          title="Info">
          
          <Info className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={() => {
            setIsFormLoading(true);
            setActiveTab('edit');
          }}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${activeTab === 'edit' ? 'bg-white text-gray-700 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
          title="Edit">
          
          <PenSquare className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${activeTab === 'preview' ? 'bg-white text-gray-700 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
          title="Preview">
          
          <MonitorPlay className="w-[18px] h-[18px]" />
        </button>
      </div>

      {/* Mobile Header Bar */}
      <div className="md:hidden flex-shrink-0 border-b border-gray-200 bg-white">
        <div className="h-[52px] px-3 flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2 -ml-1 hover:bg-gray-100 rounded-lg transition-colors active:scale-95 flex-shrink-0"
            aria-label="Back">
            
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-[15px] font-bold text-gray-900 flex-1 min-w-0 truncate">
            {quiz.title}
          </h2>
        </div>
        {/* Tab row */}
        <div className="flex items-center px-3 pb-1.5 pt-0.5">
          <div className="relative flex items-center w-full p-[3px] bg-gray-950/[0.04] rounded-full">
            <motion.div
              layout
              className="absolute top-[3px] bottom-[3px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]"
              animate={{
                left:
                activeTab === 'info' ?
                '3px' :
                activeTab === 'edit' ?
                'calc(33.33% + 1px)' :
                'calc(66.66% + 1px)',
                width: 'calc(33.33% - 4px)'
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 35
              }} />
            
            <button
              onClick={() => setActiveTab('info')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-colors duration-200 ${activeTab === 'info' ? 'text-gray-900' : 'text-gray-400'}`}>
              
              <Info className="w-3.5 h-3.5" />
              Info
            </button>
            <button
              onClick={() => {
                setIsFormLoading(true);
                setActiveTab('edit');
              }}
              className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-colors duration-200 ${activeTab === 'edit' ? 'text-gray-900' : 'text-gray-400'}`}>
              
              <PenSquare className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-colors duration-200 ${activeTab === 'preview' ? 'text-gray-900' : 'text-gray-400'}`}>
              
              <MonitorPlay className="w-3.5 h-3.5" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* INFO TAB */}
        {activeTab === 'info' &&
        <div className="flex flex-col h-full">
            <div className="hidden md:flex h-[57px] px-6 border-b border-gray-200 items-center flex-shrink-0 bg-white">
              <h2 className="text-lg font-bold text-gray-900 flex-1 min-w-0 truncate">
                {isInfoLoading ?
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" /> :

              quiz.title
              }
              </h2>
              {!isInfoLoading &&
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ml-3 flex-shrink-0 ${isPublished ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              
                  <span
                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isPublished ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              
                  {isPublished ? 'Published' : 'Draft'}
                </span>
            }
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-50/50">
              {isInfoLoading ?
            <div className="bg-white h-full">
                  <InfoSkeleton />
                </div> :

            <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white min-h-full">
                  {/* Quiz Title & Description */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 leading-snug">
                      {quiz.title}
                    </h3>
                    {description &&
                <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                        {description}
                      </p>
                }
                  </div>

                  {/* Category & Status Row */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div
                    className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm"
                    style={{
                      backgroundColor:
                      CATEGORIES.find((c) => c.id === category)?.color ||
                      '#6B7280'
                    }} />
                  
                      <span className="text-xs font-medium text-gray-600">
                        {CATEGORIES.find((c) => c.id === category)?.label ||
                    category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isPublished ?
                  <Eye className="w-3.5 h-3.5 text-emerald-500" /> :

                  <EyeOff className="w-3.5 h-3.5 text-amber-500" />
                  }
                      <span
                    className={`text-xs font-medium ${isPublished ? 'text-emerald-600' : 'text-amber-600'}`}>
                    
                        {isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>

                  {/* Quiz Settings Grid */}
                  <div className="pt-2 border-t border-gray-100">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 block">
                      Quiz Settings
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="p-1.5 bg-white rounded shadow-sm">
                          <ListChecks className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wide block">
                            Questions
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {quiz.numQuestions}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="p-1.5 bg-white rounded shadow-sm">
                          <Percent className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wide block">
                            Passing Score
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {passingScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Display Options */}
                  <div className="pt-2 border-t border-gray-100">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 block">
                      Display Options
                    </label>
                    <div className="space-y-2">
                      <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${scoreDisplay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                    
                        <div className="flex items-center gap-2">
                          <BarChart3
                        className={`w-4 h-4 ${scoreDisplay ? 'text-emerald-600' : 'text-gray-400'}`} />
                      
                          <span
                        className={`text-sm ${scoreDisplay ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                        
                            Score Display
                          </span>
                        </div>
                        <span
                      className={`text-xs font-semibold ${scoreDisplay ? 'text-emerald-600' : 'text-gray-400'}`}>
                      
                          {scoreDisplay ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${hints ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                    
                        <div className="flex items-center gap-2">
                          <HelpCircle
                        className={`w-4 h-4 ${hints ? 'text-emerald-600' : 'text-gray-400'}`} />
                      
                          <span
                        className={`text-sm ${hints ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                        
                            Hints
                          </span>
                        </div>
                        <span
                      className={`text-xs font-semibold ${hints ? 'text-emerald-600' : 'text-gray-400'}`}>
                      
                          {hints ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${showPercentComplete ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                    
                        <div className="flex items-center gap-2">
                          <Percent
                        className={`w-4 h-4 ${showPercentComplete ? 'text-emerald-600' : 'text-gray-400'}`} />
                      
                          <span
                        className={`text-sm ${showPercentComplete ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                        
                            Show % Complete
                          </span>
                        </div>
                        <span
                      className={`text-xs font-semibold ${showPercentComplete ? 'text-emerald-600' : 'text-gray-400'}`}>
                      
                          {showPercentComplete ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${showNumQuestions ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                    
                        <div className="flex items-center gap-2">
                          <ListChecks
                        className={`w-4 h-4 ${showNumQuestions ? 'text-emerald-600' : 'text-gray-400'}`} />
                      
                          <span
                        className={`text-sm ${showNumQuestions ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                        
                            Show # of Questions
                          </span>
                        </div>
                        <span
                      className={`text-xs font-semibold ${showNumQuestions ? 'text-emerald-600' : 'text-gray-400'}`}>
                      
                          {showNumQuestions ? 'ON' : 'OFF'}
                        </span>
                      </div>
                      <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${showProgressBar ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                    
                        <div className="flex items-center gap-2">
                          <ToggleLeft
                        className={`w-4 h-4 ${showProgressBar ? 'text-emerald-600' : 'text-gray-400'}`} />
                      
                          <span
                        className={`text-sm ${showProgressBar ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                        
                            Show Progress Bar
                          </span>
                        </div>
                        <span
                      className={`text-xs font-semibold ${showProgressBar ? 'text-emerald-600' : 'text-gray-400'}`}>
                      
                          {showProgressBar ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
            }
            </div>
            {!isInfoLoading &&
          <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-gray-50">
                <div className="sm:hidden flex flex-col gap-2 w-full">
                  <Button
                variant="primary"
                className="w-full justify-center"
                onClick={() => {
                  setIsFormLoading(true);
                  setActiveTab('edit');
                }}
                leftIcon={<Edit className="w-4 h-4" />}>
                
                    Edit Quiz
                  </Button>
                  <Button
                variant="danger"
                className="w-full"
                onClick={() => setShowDeleteConfirm(true)}
                leftIcon={<Trash2 className="w-4 h-4" />}>
                
                    Delete
                  </Button>
                </div>
                <div className="hidden sm:flex items-center gap-2 w-full">
                  <Button
                variant="danger"
                onClick={() => setShowDeleteConfirm(true)}
                leftIcon={<Trash2 className="w-4 h-4" />}>
                
                    Delete
                  </Button>
                  <Button
                variant="primary"
                className="flex-1 justify-center"
                onClick={() => {
                  setIsFormLoading(true);
                  setActiveTab('edit');
                }}
                leftIcon={<Edit className="w-4 h-4" />}>
                
                    Edit Quiz
                  </Button>
                </div>
              </div>
          }
          </div>
        }

        {/* EDIT TAB */}
        {activeTab === 'edit' &&
        <div className="flex flex-col h-full">
            <div className="hidden md:flex h-[57px] px-4 md:px-6 border-b border-gray-200 items-center flex-shrink-0 bg-white">
              <h2 className="text-lg font-bold text-gray-900 flex-1 min-w-0 truncate">
                {isFormLoading ?
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" /> :

              quiz.title
              }
              </h2>
              {!isFormLoading &&
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ml-3 flex-shrink-0 ${status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              
                  <span
                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              
                  {status === 'published' ? 'Published' : 'Draft'}
                </span>
            }
            </div>
            <div className="flex-1 overflow-y-auto">
              {isFormLoading ?
            <FormSkeleton /> :

            <div className="px-4 md:px-6 pt-4 md:pt-6 pb-6 md:pb-8 space-y-4 md:space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Quiz Title
                      <span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter quiz title..."
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors" />
                
                  </div>

                  {/* Category & Passing Score */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category
                      </label>
                      <div className="relative">
                        <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full appearance-none rounded-md border border-gray-200 bg-white pl-10 pr-8 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer transition-colors">
                      
                          {CATEGORIES.map((c) =>
                      <option key={c.id} value={c.id}>
                              {c.label}
                            </option>
                      )}
                        </select>
                        <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full pointer-events-none"
                      style={{
                        backgroundColor:
                        CATEGORIES.find((c) => c.id === category)?.
                        color || '#6B7280'
                      }} />
                    
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Passing Score (%)
                      </label>
                      <input
                    type="number"
                    min={0}
                    max={100}
                    value={passingScore}
                    onChange={(e) =>
                    setPassingScore(
                      Math.min(100, Math.max(0, Number(e.target.value)))
                    )
                    }
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors" />
                  
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Description
                    </label>
                    <textarea
                  className="w-full min-h-[100px] rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm placeholder:text-gray-400 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-y transition-colors"
                  placeholder="Enter quiz description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} />
                
                  </div>

                  {/* Toggle Options */}
                  <div className="pt-2 border-t border-gray-100">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 block">
                      Display Options
                    </label>
                    <div className="space-y-3">
                      <ToggleOption
                    label="Score Display"
                    description="Show score to users after completion"
                    checked={scoreDisplay}
                    onChange={setScoreDisplay} />
                  
                      <ToggleOption
                    label="Hints"
                    description="Allow hints during the quiz"
                    checked={hints}
                    onChange={setHints} />
                  
                      <ToggleOption
                    label="Show % Complete"
                    description="Display completion percentage"
                    checked={showPercentComplete}
                    onChange={setShowPercentComplete} />
                  
                      <ToggleOption
                    label="Show # of Questions"
                    description="Display total question count"
                    checked={showNumQuestions}
                    onChange={setShowNumQuestions} />
                  
                      <ToggleOption
                    label="Show Progress Bar"
                    description="Display progress bar during quiz"
                    checked={showProgressBar}
                    onChange={setShowProgressBar} />
                  
                    </div>
                  </div>
                </div>
            }
            </div>
            <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-gray-50">
              <div className="flex items-center gap-2 w-full sm:hidden">
                <Button
                variant="outline"
                onClick={() => handleSave('draft')}
                leftIcon={<Save className="w-4 h-4" />}
                className="flex-1">
                
                  Draft
                </Button>
                <Button
                variant="primary"
                onClick={() => handleSave('published')}
                leftIcon={<Send className="w-4 h-4" />}
                className="flex-1">
                
                  Publish
                </Button>
              </div>
              <div className="sm:hidden w-full">
                <Button
                variant="danger"
                onClick={() => setShowDeleteConfirm(true)}
                leftIcon={<Trash2 className="w-4 h-4" />}
                className="w-full">
                
                  Delete
                </Button>
              </div>
              <div className="hidden sm:block">
                <Button
                variant="danger"
                onClick={() => setShowDeleteConfirm(true)}
                leftIcon={<Trash2 className="w-4 h-4" />}>
                
                  Delete
                </Button>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Button
                variant="outline"
                onClick={() => handleSave('draft')}
                leftIcon={<Save className="w-4 h-4" />}>
                
                  Save as Draft
                </Button>
                <Button
                variant="primary"
                onClick={() => handleSave('published')}
                leftIcon={<Send className="w-4 h-4" />}>
                
                  Publish
                </Button>
              </div>
            </div>
          </div>
        }

        {/* PREVIEW TAB */}
        {activeTab === 'preview' &&
        <div className="flex flex-col h-full">
            <div className="hidden md:flex h-[57px] px-6 border-b border-gray-200 items-center flex-shrink-0 bg-white">
              <h2 className="text-lg font-bold text-gray-900 flex-1 min-w-0 truncate">
                Preview
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-50/50">
              <div className="p-4 md:p-8 flex items-center justify-center min-h-full">
                <div className="w-full max-w-md">
                  {/* Quiz Preview Card */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-cyan-50">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {title}
                      </h3>
                      {description &&
                    <p className="text-sm text-gray-600">{description}</p>
                    }
                    </div>
                    {/* Info */}
                    <div className="px-6 py-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Questions</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {quiz.numQuestions}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Passing Score
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {passingScore}%
                        </span>
                      </div>
                      {showProgressBar &&
                    <div className="pt-2">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-0 bg-teal-500 rounded-full" />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Progress bar preview
                          </p>
                        </div>
                    }
                    </div>
                    {/* Start Button */}
                    <div className="px-6 py-4 border-t border-gray-100">
                      <button className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors">
                        Start Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}
function ToggleOption({
  label,
  description,
  checked,
  onChange





}: {label: string;description: string;checked: boolean;onChange: (value: boolean) => void;}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-all ${checked ? 'bg-teal-50/50 border-teal-200' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}>
      
      <div className="flex-1 min-w-0">
        <span
          className={`text-sm font-medium block ${checked ? 'text-teal-800' : 'text-gray-700'}`}>
          
          {label}
        </span>
        <span className="text-xs text-gray-400">{description}</span>
      </div>
      <div
        className={`w-10 h-6 rounded-full p-0.5 transition-colors ${checked ? 'bg-teal-500' : 'bg-gray-300'}`}>
        
        <motion.div
          className="w-5 h-5 bg-white rounded-full shadow-sm"
          animate={{
            x: checked ? 16 : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }} />
        
      </div>
    </div>);

}