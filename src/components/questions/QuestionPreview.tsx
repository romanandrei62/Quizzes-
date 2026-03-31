import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  Fragment } from
'react';
import {
  Lightbulb,
  Check,
  X,
  RotateCcw,
  Send,
  ZoomIn,
  HelpCircle } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
function SettingDebugPopover({
  setting,
  label



}: {setting: string;label: string;}) {
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
export interface AnswerState {
  selectedOption?: number | null;
  selectedOptions?: number[];
  textAnswer?: string;
  matchedPairs?: [number, number][];
}
interface QuestionPreviewProps {
  title: string;
  text?: string;
  type: string;
  options?: string[];
  matchSubType?: 'text' | 'image';
  matchPairs?: Array<{
    prompt: string;
    answer: string;
    imageUrl?: string;
  }>;
  binaryLabels?: [string, string];
  hint?: string;
  onAnswerSubmit?: (answer: AnswerState) => void;
  hideReset?: boolean;
  showSettingDebug?: boolean;
  initialAnswer?: AnswerState;
  isReadOnly?: boolean;
}
export function QuestionPreview({
  title,
  text,
  type,
  options = [],
  matchSubType = 'text',
  matchPairs = [],
  binaryLabels = ['True', 'False'],
  hint,
  onAnswerSubmit,
  hideReset = false,
  showSettingDebug = false,
  initialAnswer,
  isReadOnly = false
}: QuestionPreviewProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(
    initialAnswer?.selectedOption ?? null
  );
  const [selectedOptions, setSelectedOptions] = useState<Set<number>>(
    new Set(initialAnswer?.selectedOptions ?? [])
  );
  const [textAnswer, setTextAnswer] = useState(initialAnswer?.textAnswer ?? '');
  const [showHint, setShowHint] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(isReadOnly);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [selectedMatchLeft, setSelectedMatchLeft] = useState<number | null>(
    null
  );
  const [matchedPairs, setMatchedPairs] = useState<Map<number, number>>(
    new Map(initialAnswer?.matchedPairs ?? [])
  );
  // Shuffle right column indices for matching (stable per mount)
  const shuffledRightIndices = useMemo(() => {
    const indices = matchPairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [matchPairs.length]);
  const handleSelect = useCallback(
    (index: number) => {
      if (isSubmitted) return;
      setSelectedOption(index);
    },
    [isSubmitted]
  );
  const handleMatchClick = useCallback(
    (side: 'left' | 'right', index: number) => {
      if (isSubmitted) return;
      if (side === 'left') {
        if (matchedPairs.has(index)) {
          const next = new Map(matchedPairs);
          next.delete(index);
          setMatchedPairs(next);
        } else {
          setSelectedMatchLeft(index === selectedMatchLeft ? null : index);
        }
      } else {
        if (selectedMatchLeft !== null) {
          const isUsed = Array.from(matchedPairs.values()).includes(index);
          if (!isUsed) {
            const next = new Map(matchedPairs);
            next.set(selectedMatchLeft, index);
            setMatchedPairs(next);
            setSelectedMatchLeft(null);
          }
        }
      }
    },
    [isSubmitted, matchedPairs, selectedMatchLeft]
  );
  const handleSubmit = () => {
    setIsSubmitted(true);
    onAnswerSubmit?.({
      selectedOption,
      selectedOptions: Array.from(selectedOptions),
      textAnswer,
      matchedPairs: Array.from(matchedPairs.entries())
    });
  };
  const handleMultiSelect = useCallback(
    (index: number) => {
      if (isSubmitted) return;
      setSelectedOptions((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    },
    [isSubmitted]
  );
  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    setSelectedOptions(new Set());
    setTextAnswer('');
    setMatchedPairs(new Map());
    setSelectedMatchLeft(null);
    setShowHint(false);
  };
  const getMatchNumber = (leftIndex: number): number => {
    const entries = Array.from(matchedPairs.entries()).sort(([a], [b]) => a - b);
    const pos = entries.findIndex(([k]) => k === leftIndex);
    return pos >= 0 ? pos + 1 : -1;
  };
  const hasAnswer =
  type === 'multiple' || type === 'true-false' ?
  selectedOption !== null :
  type === 'multiselect' ?
  selectedOptions.size > 0 :
  type === 'open' ?
  textAnswer.trim().length > 0 :
  type === 'matching' ?
  matchedPairs.size === matchPairs.length :
  false;
  return (
    <div className="w-full max-w-lg mx-auto h-full flex flex-col">
      {/* Question Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 12
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="rounded-2xl overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-gray-900/[0.04] flex flex-col max-h-full">
        
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-400 flex-shrink-0" />

        {/* Question Header */}
        <div className="px-6 pt-5 pb-4 flex-shrink-0">
          <motion.h3
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.15
            }}
            className="text-[17px] font-semibold text-gray-900 leading-relaxed tracking-tight">
            
            {title}
          </motion.h3>
          {text &&
          <motion.p
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.2
            }}
            className="mt-2.5 text-[13px] text-gray-500 leading-relaxed">
            
              {text}
            </motion.p>
          }
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-shrink-0" />

        {/* Answer Area — scrollable */}
        <div className="px-6 py-4 flex-1 overflow-y-auto thin-scrollbar min-h-0">
          {/* Multiple Choice */}
          {type === 'multiple' &&
          <div className="space-y-2.5">
              {options.map((option, index) => {
              const isSelected = selectedOption === index;
              const letter = String.fromCharCode(65 + index);
              return (
                <motion.button
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -12
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: 0.2 + index * 0.06,
                    duration: 0.35,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  onClick={() => handleSelect(index)}
                  disabled={isSubmitted}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${isSelected ? 'bg-teal-50 ring-2 ring-teal-500 ring-offset-1' : 'bg-gray-50/60 ring-1 ring-gray-200/80 hover:ring-gray-300 hover:bg-gray-50'}`}>
                  
                    <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all duration-200 ${isSelected ? 'bg-teal-500 text-white shadow-sm' : 'bg-white text-gray-400 ring-1 ring-gray-200'}`}>
                    
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : letter}
                    </div>
                    <span
                    className={`text-[13px] leading-snug transition-colors ${isSelected ? 'text-teal-900 font-medium' : 'text-gray-700'}`}>
                    
                      {option ||
                    <span className="italic text-gray-400">
                          Empty option
                        </span>
                    }
                    </span>
                  </motion.button>);

            })}
            </div>
          }

          {/* Multiselect */}
          {type === 'multiselect' &&
          <div className="space-y-2.5">
              {options.map((option, index) => {
              const isSelected = selectedOptions.has(index);
              return (
                <motion.button
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -12
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: 0.2 + index * 0.06,
                    duration: 0.35,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  onClick={() => handleMultiSelect(index)}
                  disabled={isSubmitted}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left transition-all duration-200 ${isSelected ? 'bg-teal-50 ring-2 ring-teal-500 ring-offset-1' : 'bg-gray-50/60 ring-1 ring-gray-200/80 hover:ring-gray-300 hover:bg-gray-50'}`}>
                  
                    <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isSelected ? 'bg-teal-500 text-white shadow-sm' : 'bg-white ring-1 ring-gray-200'}`}>
                    
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span
                    className={`text-[13px] leading-snug transition-colors ${isSelected ? 'text-teal-900 font-medium' : 'text-gray-700'}`}>
                    
                      {option ||
                    <span className="italic text-gray-400">
                          Empty option
                        </span>
                    }
                    </span>
                  </motion.button>);

            })}
            </div>
          }

          {/* True/False */}
          {type === 'true-false' &&
          <div className="grid grid-cols-2 gap-3">
              {binaryLabels.map((label, index) => {
              const isSelected = selectedOption === index;
              return (
                <motion.button
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.95
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    delay: 0.2 + index * 0.08
                  }}
                  whileTap={{
                    scale: 0.97
                  }}
                  onClick={() => handleSelect(index)}
                  disabled={isSubmitted}
                  className={`flex flex-col items-center justify-center py-8 rounded-xl transition-all duration-200 ${isSelected ? 'bg-teal-50 ring-2 ring-teal-500 ring-offset-1' : 'bg-gray-50/60 ring-1 ring-gray-200/80 hover:ring-gray-300 hover:bg-gray-50'}`}>
                  
                    <motion.div
                    animate={
                    isSelected ?
                    {
                      scale: [1, 1.15, 1]
                    } :
                    {}
                    }
                    transition={{
                      duration: 0.3
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-200 ${isSelected ? 'bg-teal-500 text-white shadow-md' : 'bg-white text-gray-400 ring-1 ring-gray-200'}`}>
                    
                      {index === 0 ?
                    <Check className="w-5 h-5" /> :

                    <X className="w-5 h-5" />
                    }
                    </motion.div>
                    <span
                    className={`text-sm font-semibold transition-colors ${isSelected ? 'text-teal-900' : 'text-gray-600'}`}>
                    
                      {label || (index === 0 ? 'True' : 'False')}
                    </span>
                  </motion.button>);

            })}
            </div>
          }

          {/* Open Answer */}
          {type === 'open' &&
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.2
            }}
            className="space-y-2">
            
              <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              disabled={isSubmitted}
              placeholder="Type your answer here..."
              className="w-full min-h-[100px] max-h-[180px] p-4 rounded-xl bg-gray-50/60 ring-1 ring-gray-200/80 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 focus:bg-white resize-none transition-all" />
            
              <div className="flex justify-end px-1">
                <span className="text-[11px] text-gray-400 tabular-nums">
                  {textAnswer.length} characters
                </span>
              </div>
            </motion.div>
          }

          {/* Matching */}
          {type === 'matching' && matchPairs.length > 0 &&
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.15
            }}
            className="space-y-4">
            
              <p className="text-[11px] text-gray-400 text-center font-medium uppercase tracking-wider">
                Select a prompt, then select its match
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0">
                {/* Column Headers */}
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-1">
                  Prompts
                </span>
                <span className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-1">
                  Answers
                </span>

                {/* Rows — each row has one prompt and one answer aligned */}
                {matchPairs.map((pair, index) => {
                const isMatched = matchedPairs.has(index);
                const isActive = selectedMatchLeft === index;
                const matchNum = getMatchNumber(index);
                const rightOriginalIndex = shuffledRightIndices[index];
                const rightPair = matchPairs[rightOriginalIndex];
                const rightMatchedLeftIndex = Array.from(
                  matchedPairs.entries()
                ).find(([_, r]) => r === rightOriginalIndex)?.[0];
                const rightIsMatched = rightMatchedLeftIndex !== undefined;
                const rightMatchNum = rightIsMatched ?
                getMatchNumber(rightMatchedLeftIndex) :
                -1;
                return (
                  <Fragment key={index}>
                      {/* Left — Prompt */}
                      <motion.button
                      initial={{
                        opacity: 0,
                        x: -8
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: 0.2 + index * 0.05
                      }}
                      onClick={() => handleMatchClick('left', index)}
                      disabled={isSubmitted}
                      className={`w-full p-3 mb-2 rounded-xl text-left transition-all duration-200 relative flex items-center min-h-[52px] ${isMatched ? 'bg-teal-50 ring-2 ring-teal-400' : isActive ? 'bg-teal-50 ring-2 ring-teal-500 ring-offset-1' : 'bg-gray-50/60 ring-1 ring-gray-200/80 hover:ring-gray-300'}`}>
                      
                        {isMatched && matchNum > 0 &&
                      <div className="absolute -right-1.5 -top-1.5 w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-sm text-[10px] font-bold">
                            {matchNum}
                          </div>
                      }
                        {matchSubType === 'image' && pair.imageUrl ?
                      <div className="flex items-center gap-2.5">
                            <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxImage(pair.imageUrl!);
                          }}
                          className="relative group/zoom flex-shrink-0">
                          
                              <img
                            src={pair.imageUrl}
                            alt=""
                            className="w-9 h-9 rounded-lg object-cover ring-1 ring-black/5" />
                          
                              <div className="absolute inset-0 rounded-lg bg-black/0 group-hover/zoom:bg-black/30 transition-all duration-200 flex items-center justify-center">
                                <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-200 drop-shadow-md" />
                              </div>
                            </button>
                            <span className="text-[11px] text-gray-500 font-medium">
                              Image {index + 1}
                            </span>
                          </div> :

                      <span
                        className={`text-[13px] font-medium ${isMatched ? 'text-teal-700' : 'text-gray-700'}`}>
                        
                            {pair.prompt || `Item ${index + 1}`}
                          </span>
                      }
                      </motion.button>

                      {/* Right — Answer (shuffled) */}
                      <motion.button
                      initial={{
                        opacity: 0,
                        x: 8
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: 0.25 + index * 0.05
                      }}
                      onClick={() =>
                      handleMatchClick('right', rightOriginalIndex)
                      }
                      disabled={isSubmitted}
                      className={`w-full p-3 mb-2 rounded-xl text-left transition-all duration-200 relative flex items-center min-h-[52px] ${rightIsMatched ? 'bg-teal-50 ring-2 ring-teal-400' : 'bg-gray-50/60 ring-1 ring-gray-200/80 hover:ring-gray-300'}`}>
                      
                        {rightIsMatched && rightMatchNum > 0 &&
                      <div className="absolute -left-1.5 -top-1.5 w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-sm text-[10px] font-bold">
                            {rightMatchNum}
                          </div>
                      }
                        <span
                        className={`text-[13px] ${rightIsMatched ? 'font-medium text-teal-700' : 'text-gray-700'}`}>
                        
                          {rightPair?.answer ||
                        `Answer ${rightOriginalIndex + 1}`}
                        </span>
                      </motion.button>
                    </Fragment>);

              })}
              </div>
              {matchedPairs.size > 0 &&
            matchedPairs.size < matchPairs.length &&
            <p className="text-center text-[11px] text-gray-400">
                    {matchedPairs.size} of {matchPairs.length} pairs connected
                  </p>
            }
            </motion.div>
          }

          {/* Hint — shown as overlay tooltip, doesn't push content */}
          {hint &&
          <div className="relative mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <button
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-amber-600 hover:text-amber-700 transition-colors">
                
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? 'Hide hint' : 'Need a hint?'}
                </button>
                {showSettingDebug &&
              <SettingDebugPopover
                setting="hints"
                label="the hint button" />

              }
              </div>
              <AnimatePresence>
                {showHint &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: 4
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: 4
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="absolute bottom-full left-0 right-0 mb-1 z-10">
                
                    <div className="px-3.5 py-2.5 bg-amber-50 rounded-xl ring-1 ring-amber-200 shadow-lg text-[12px] text-amber-800 leading-relaxed">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{hint}</span>
                      </div>
                    </div>
                  </motion.div>
              }
              </AnimatePresence>
            </div>
          }
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <AnimatePresence mode="wait">
            {isSubmitted ?
            <motion.div
              key="submitted"
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.95
              }}
              className="flex items-center gap-2">
              
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-[13px] font-medium text-emerald-700">
                  Answer recorded
                </span>
              </motion.div> :

            <motion.div
              key="empty"
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}>
              
                <span className="text-[11px] text-gray-400">
                  {type === 'open' ?
                'Type your answer' :
                type === 'matching' ?
                'Match all pairs' :
                type === 'multiselect' ?
                '✓ Multiple answers allowed' :
                'Select an answer'}
                </span>
              </motion.div>
            }
          </AnimatePresence>

          <div className="flex items-center gap-2">
            {isSubmitted ?
            !hideReset &&
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-medium text-gray-600 bg-white ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300 transition-all">
              
                  <RotateCcw className="w-3.5 h-3.5" />
                  Try Again
                </button> :


            <button
              onClick={handleSubmit}
              disabled={!hasAnswer}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              
                <Send className="w-3.5 h-3.5" />
                Submit
              </button>
            }
          </div>
        </div>
      </motion.div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxImage &&
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
            duration: 0.2
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
          onClick={() => setLightboxImage(null)}>
          
            <motion.div
            initial={{
              scale: 0.9,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            exit={{
              scale: 0.9,
              opacity: 0
            }}
            transition={{
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="relative max-w-lg max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}>
            
              <img
              src={lightboxImage}
              alt=""
              className="rounded-2xl shadow-2xl ring-1 ring-white/10 max-w-full max-h-[80vh] object-contain" />
            
              <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/90 shadow-lg ring-1 ring-black/5 flex items-center justify-center hover:bg-white transition-colors">
              
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}