import React, { useEffect, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, HelpCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { QuestionPreview, AnswerState } from '../questions/QuestionPreview';
import { MOCK_QUESTIONS } from '../questions/QuestionsContent';
import { MOCK_QUIZZES } from '../quizzes/QuizzesContent';
// Debug indicator for settings-controlled elements (testing only)
function SettingDebug({ setting, label }: {setting: string;label: string;}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  return (
    <span ref={ref} className="relative inline-flex ml-1 flex-shrink-0">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-100 text-amber-600 cursor-pointer hover:bg-amber-200 transition-colors">
        
        <HelpCircle className="w-3 h-3" />
      </button>
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{
            opacity: 0,
            y: 4,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            y: 4,
            scale: 0.95
          }}
          transition={{
            duration: 0.15
          }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-56">
          
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900 rotate-45" />
            <div className="bg-gray-900 text-white rounded-lg shadow-xl px-3 py-2.5 text-left">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-amber-400 text-[10px]">⚙️</span>
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                  Setting
                </span>
              </div>
              <p className="text-[12px] font-medium text-white leading-snug">
                "{setting}"
              </p>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                If this setting is OFF, "{label}" will not be visible to
                learners.
              </p>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </span>);

}
interface TakeQuizProps {
  quizId: string;
  onExit?: () => void;
}
export function TakeQuiz({ quizId, onExit }: TakeQuizProps) {
  const selectedQuiz = useMemo(
    () => MOCK_QUIZZES.find((q) => q.id === quizId),
    [quizId]
  );
  const quizQuestions = useMemo(() => {
    if (!selectedQuiz) return [];
    return selectedQuiz.questionIds.
    map((id) => MOCK_QUESTIONS.find((q) => q.id === id)).
    filter((q): q is NonNullable<typeof q> => q !== undefined);
  }, [selectedQuiz]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Map<number, AnswerState>>(
    new Map());
  // Reset state when quiz changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsCompleted(false);
    setDirection(1);
    setAnsweredQuestions(new Map());
  }, [quizId]);
  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };
  const handleRestart = () => {
    setDirection(-1);
    setCurrentIndex(0);
    setIsCompleted(false);
    setAnsweredQuestions(new Map());
  };
  const handleAnswerSubmit = (answer: AnswerState) => {
    setAnsweredQuestions((prev) => {
      const next = new Map(prev);
      next.set(currentIndex, answer);
      return next;
    });
    setTimeout(() => {
      handleNext();
    }, 800);
  };
  if (!selectedQuiz || quizQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500">No questions available for this quiz.</p>
      </div>);

  }
  const currentQuestion = quizQuestions[currentIndex];
  const percentComplete = Math.round(
    currentIndex / quizQuestions.length * 100
  );
  // Generate mock data for matching questions
  const matchPairs =
  currentQuestion.type === 'matching' ?
  currentQuestion.matchSubType === 'image' ?
  [
  {
    prompt: 'Landmark 1',
    answer: 'Eiffel Tower, Paris',
    imageUrl:
    'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=400&h=400&fit=crop'
  },
  {
    prompt: 'Landmark 2',
    answer: 'Taj Mahal, India',
    imageUrl:
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=400&fit=crop'
  },
  {
    prompt: 'Landmark 3',
    answer: 'Golden Gate Bridge, SF',
    imageUrl:
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop'
  },
  {
    prompt: 'Landmark 4',
    answer: 'Colosseum, Rome',
    imageUrl:
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=400&fit=crop'
  }] :

  [
  {
    prompt: 'Term 1',
    answer: 'Definition 1'
  },
  {
    prompt: 'Term 2',
    answer: 'Definition 2'
  },
  {
    prompt: 'Term 3',
    answer: 'Definition 3'
  },
  {
    prompt: 'Term 4',
    answer: 'Definition 4'
  }] :

  undefined;
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 md:py-6 flex flex-col h-full overflow-hidden">
      {/* Header Section */}
      {!isCompleted &&
      <div className="mb-4 text-center flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
            {selectedQuiz.title}
          </h1>

          {/* Question counter — controlled by showNumQuestions */}
          <div className="flex items-center justify-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              Question {currentIndex + 1} of {quizQuestions.length}
            </p>
            <SettingDebug setting="showNumQuestions" label="Question X of Y" />
          </div>

          {/* Circular Progress — controlled by showProgressBar */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="3" />
              
                <motion.circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 24}
                initial={{
                  strokeDashoffset: 2 * Math.PI * 24
                }}
                animate={{
                  strokeDashoffset:
                  2 * Math.PI * 24 * (1 - percentComplete / 100)
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1]
                }} />
              
                <defs>
                  <linearGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%">
                  
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                key={percentComplete}
                initial={{
                  scale: 0.8,
                  opacity: 0
                }}
                animate={{
                  scale: 1,
                  opacity: 1
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="flex items-baseline tabular-nums">
                
                  <span className="text-[15px] font-bold text-teal-700 tracking-tight">
                    {percentComplete}
                  </span>
                  <span className="text-[9px] font-semibold text-teal-500 ml-px">
                    %
                  </span>
                </motion.span>
              </div>
            </div>
            <SettingDebug setting="showProgressBar" label="Progress bar" />
          </div>

          {/* Step Indicator — navigation dots (always visible) */}
          <div className="mt-3 flex items-center justify-center max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              {(() => {
              // Find the active (first unanswered) question index
              const activeIdx = quizQuestions.findIndex(
                (_, i) => !answeredQuestions.has(i)
              );
              const activeQuestionIdx =
              activeIdx >= 0 ? activeIdx : quizQuestions.length - 1;
              return quizQuestions.map((_, idx) => {
                const isAnswered = answeredQuestions.has(idx);
                const isCurrent = idx === currentIndex;
                const isActiveQuestion = idx === activeQuestionIdx;
                const canNavigate =
                (isAnswered || isActiveQuestion) && !isCurrent;
                if (
                quizQuestions.length > 15 &&
                Math.abs(idx - currentIndex) > 3 &&
                idx !== 0 &&
                idx !== quizQuestions.length - 1)
                {
                  if (idx === 1 || idx === quizQuestions.length - 2) {
                    return (
                      <span
                        key={idx}
                        className="text-gray-300 text-xs tracking-widest">
                        
                          ...
                        </span>);

                  }
                  return null;
                }
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (canNavigate) {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }
                    }}
                    disabled={!canNavigate}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${isAnswered ? 'bg-teal-500 cursor-pointer hover:scale-125' : isCurrent ? 'bg-white ring-2 ring-teal-500 ring-offset-2' : isActiveQuestion ? 'bg-gray-300 cursor-pointer hover:scale-110' : 'bg-gray-200'} ${!canNavigate ? 'cursor-default' : ''}`}
                    aria-label={`Question ${idx + 1}${isAnswered ? ' (answered)' : ''}`} />);


              });
            })()}
            </div>
          </div>
        </div>
      }

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {isCompleted ?
          <motion.div
            key="completed"
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            transition={{
              duration: 0.6,
              type: 'spring',
              bounce: 0.4
            }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 md:p-14 text-center max-w-lg mx-auto w-full relative overflow-hidden flex-shrink-0">
            
              {/* Decorative Confetti Dots */}
              <div className="absolute top-10 left-10 w-3 h-3 bg-teal-400 rounded-full opacity-50" />
              <div className="absolute top-20 right-12 w-4 h-4 bg-emerald-300 rounded-full opacity-40" />
              <div className="absolute bottom-24 left-16 w-2 h-2 bg-teal-500 rounded-full opacity-60" />
              <div className="absolute bottom-16 right-20 w-3 h-3 bg-emerald-400 rounded-full opacity-50" />

              <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                delay: 0.2,
                type: 'spring',
                stiffness: 200
              }}
              className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              
                <div className="absolute inset-0 bg-teal-100 rounded-full animate-ping opacity-20" />
                <Trophy className="w-12 h-12 text-teal-500 relative z-10" />
              </motion.div>

              <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                Quiz Completed!
              </h2>
              <p className="text-gray-500 mb-6 text-lg">
                You've successfully finished <br />
                <span className="font-medium text-gray-700">
                  "{selectedQuiz.title}"
                </span>
              </p>

              {/* Score display — controlled by scoreDisplay */}
              <div className="flex items-center justify-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-xl ring-1 ring-teal-200">
                  <span className="text-sm font-semibold text-teal-700">
                    Score: 85%
                  </span>
                  <span className="text-xs text-teal-500">
                    — Passed (min {selectedQuiz.passingScore}%)
                  </span>
                </div>
                <SettingDebug setting="scoreDisplay" label="Score display" />
              </div>

              <div className="flex flex-col gap-3">
                {onExit &&
              <Button
                variant="secondary"
                onClick={onExit}
                className="w-full justify-center py-3 text-base">
                
                    Return to Dashboard
                  </Button>
              }
              </div>
            </motion.div> :

          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: 'spring',
                stiffness: 300,
                damping: 30
              },
              opacity: {
                duration: 0.2
              }
            }}
            className="w-full h-full flex items-center justify-center overflow-hidden">
            
              <div className="w-full h-full py-2 px-1">
                <QuestionPreview
                title={currentQuestion.title}
                text={currentQuestion.text}
                type={currentQuestion.type}
                options={currentQuestion.options}
                matchSubType={currentQuestion.matchSubType}
                matchPairs={matchPairs}
                binaryLabels={['True', 'False']}
                onAnswerSubmit={handleAnswerSubmit}
                hideReset={true}
                showSettingDebug={true}
                initialAnswer={answeredQuestions.get(currentIndex)}
                isReadOnly={answeredQuestions.has(currentIndex)}
                hint={
                selectedQuiz.hints ?
                'This is a sample hint to help guide you toward the correct answer.' :
                undefined
                } />
              
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}