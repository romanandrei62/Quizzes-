import React, { useCallback, useMemo, useState } from 'react';
import {
  Lightbulb,
  Check,
  X,
  RotateCcw,
  Send,
  Link2,
  Sparkles } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
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
}
const MATCH_COLORS = [
{
  bg: 'bg-teal-50',
  border: 'border-teal-400',
  text: 'text-teal-700',
  badge: 'bg-teal-500'
},
{
  bg: 'bg-violet-50',
  border: 'border-violet-400',
  text: 'text-violet-700',
  badge: 'bg-violet-500'
},
{
  bg: 'bg-amber-50',
  border: 'border-amber-400',
  text: 'text-amber-700',
  badge: 'bg-amber-500'
},
{
  bg: 'bg-rose-50',
  border: 'border-rose-400',
  text: 'text-rose-700',
  badge: 'bg-rose-500'
},
{
  bg: 'bg-sky-50',
  border: 'border-sky-400',
  text: 'text-sky-700',
  badge: 'bg-sky-500'
},
{
  bg: 'bg-emerald-50',
  border: 'border-emerald-400',
  text: 'text-emerald-700',
  badge: 'bg-emerald-500'
}];

export function QuestionPreview({
  title,
  text,
  type,
  options = [],
  matchSubType = 'text',
  matchPairs = [],
  binaryLabels = ['True', 'False'],
  hint
}: QuestionPreviewProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedMatchLeft, setSelectedMatchLeft] = useState<number | null>(
    null
  );
  const [matchedPairs, setMatchedPairs] = useState<Map<number, number>>(
    new Map()
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
  const handleSubmit = () => setIsSubmitted(true);
  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    setTextAnswer('');
    setMatchedPairs(new Map());
    setSelectedMatchLeft(null);
    setShowHint(false);
  };
  const getMatchColorIndex = (leftIndex: number): number => {
    const entries = Array.from(matchedPairs.entries()).sort(([a], [b]) => a - b);
    const pos = entries.findIndex(([k]) => k === leftIndex);
    return pos >= 0 ? pos % MATCH_COLORS.length : -1;
  };
  const hasAnswer =
  type === 'multiple' || type === 'true-false' ?
  selectedOption !== null :
  type === 'open' ?
  textAnswer.trim().length > 0 :
  type === 'matching' ?
  matchedPairs.size === matchPairs.length :
  false;
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Preview badge */}
      <motion.div
        initial={{
          opacity: 0,
          y: -8
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.1
        }}
        className="flex items-center justify-center gap-1.5 mb-4">

        <Sparkles className="w-3 h-3 text-teal-500" />
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-teal-600/70">
          Learner Preview
        </span>
      </motion.div>

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
        className="rounded-2xl overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-gray-900/[0.04]">

        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-400" />

        {/* Question Header */}
        <div className="px-7 pt-7 pb-5">
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
        <div className="mx-7 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Answer Area */}
        <div className="px-7 py-6">
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
              className="w-full min-h-[140px] p-4 rounded-xl bg-gray-50/60 ring-1 ring-gray-200/80 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 focus:bg-white resize-y transition-all" />

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
              <div className="flex gap-4">
                {/* Left Column */}
                <div className="flex-1 space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-1">
                    Prompts
                  </span>
                  {matchPairs.map((pair, index) => {
                  const isMatched = matchedPairs.has(index);
                  const isActive = selectedMatchLeft === index;
                  const colorIdx = getMatchColorIndex(index);
                  const color = colorIdx >= 0 ? MATCH_COLORS[colorIdx] : null;
                  return (
                    <motion.button
                      key={`left-${index}`}
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
                      className={`w-full p-3 rounded-xl text-left transition-all duration-200 relative ${isMatched && color ? `${color.bg} ring-2 ${color.border}` : isActive ? 'bg-teal-50 ring-2 ring-teal-500 ring-offset-1' : 'bg-gray-50/60 ring-1 ring-gray-200/80 hover:ring-gray-300'}`}>

                        {isMatched && color &&
                      <div
                        className={`absolute -right-1.5 -top-1.5 w-5 h-5 rounded-full ${color.badge} text-white flex items-center justify-center shadow-sm`}>

                            <Link2 className="w-2.5 h-2.5" />
                          </div>
                      }
                        {matchSubType === 'image' && pair.imageUrl ?
                      <div className="flex items-center gap-2.5">
                            <img
                          src={pair.imageUrl}
                          alt=""
                          className="w-9 h-9 rounded-lg object-cover ring-1 ring-black/5" />

                            <span className="text-[11px] text-gray-500 font-medium">
                              Image {index + 1}
                            </span>
                          </div> :

                      <span
                        className={`text-[13px] font-medium ${isMatched && color ? color.text : 'text-gray-700'}`}>

                            {pair.prompt || `Item ${index + 1}`}
                          </span>
                      }
                      </motion.button>);

                })}
                </div>

                {/* Right Column (shuffled) */}
                <div className="flex-1 space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-1">
                    Answers
                  </span>
                  {shuffledRightIndices.map((originalIndex, displayIndex) => {
                  const pair = matchPairs[originalIndex];
                  const matchedLeftIndex = Array.from(
                    matchedPairs.entries()
                  ).find(([_, r]) => r === originalIndex)?.[0];
                  const isMatched = matchedLeftIndex !== undefined;
                  const colorIdx = isMatched ?
                  getMatchColorIndex(matchedLeftIndex) :
                  -1;
                  const color = colorIdx >= 0 ? MATCH_COLORS[colorIdx] : null;
                  return (
                    <motion.button
                      key={`right-${originalIndex}`}
                      initial={{
                        opacity: 0,
                        x: 8
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: 0.25 + displayIndex * 0.05
                      }}
                      onClick={() => handleMatchClick('right', originalIndex)}
                      disabled={isSubmitted}
                      className={`w-full p-3 rounded-xl text-left transition-all duration-200 relative ${isMatched && color ? `${color.bg} ring-2 ${color.border}` : 'bg-gray-50/60 ring-1 ring-gray-200/80 hover:ring-gray-300'}`}>

                        {isMatched && color &&
                      <div
                        className={`absolute -left-1.5 -top-1.5 w-5 h-5 rounded-full ${color.badge} text-white flex items-center justify-center shadow-sm`}>

                            <Link2 className="w-2.5 h-2.5" />
                          </div>
                      }
                        <span
                        className={`text-[13px] ${isMatched && color ? `font-medium ${color.text}` : 'text-gray-700'}`}>

                          {pair?.answer || `Answer ${originalIndex + 1}`}
                        </span>
                      </motion.button>);

                })}
                </div>
              </div>
              {matchedPairs.size > 0 &&
            matchedPairs.size < matchPairs.length &&
            <p className="text-center text-[11px] text-gray-400">
                    {matchedPairs.size} of {matchPairs.length} pairs connected
                  </p>
            }
            </motion.div>
          }

          {/* Hint */}
          {hint &&
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.4
            }}
            className="mt-5 pt-4 border-t border-gray-100">

              <button
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-amber-600 hover:text-amber-700 transition-colors">

                <Lightbulb className="w-4 h-4" />
                {showHint ? 'Hide hint' : 'Need a hint?'}
              </button>
              <AnimatePresence>
                {showHint &&
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0
                }}
                animate={{
                  opacity: 1,
                  height: 'auto'
                }}
                exit={{
                  opacity: 0,
                  height: 0
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="overflow-hidden">

                    <div className="mt-2.5 px-3.5 py-3 bg-amber-50/60 rounded-xl ring-1 ring-amber-200/50 text-[13px] text-amber-800 leading-relaxed">
                      {hint}
                    </div>
                  </motion.div>
              }
              </AnimatePresence>
            </motion.div>
          }
        </div>

        {/* Footer */}
        <div className="px-7 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
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
                  {hasAnswer ? 'Ready to submit' : 'Select an answer'}
                </span>
              </motion.div>
            }
          </AnimatePresence>

          <div className="flex items-center gap-2">
            {isSubmitted ?
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
    </div>);

}