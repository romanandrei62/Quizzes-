import React, { useState, useRef } from 'react';
import {
  X,
  Plus,
  Trash2,
  GripVertical,
  CheckCircle2,
  Circle,
  Type,
  List,
  CheckSquare,
  GitMerge,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Info,
  Edit,
  Copy,
  PenSquare,
  SlidersHorizontal } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
interface Question {
  id: string;
  title: string;
  text?: string;
  type: string;
  category: string;
  createdAt: Date;
  status: 'active' | 'draft';
  description?: string;
  options?: string[];
}
interface QuestionDetailProps {
  question: Question | null;
  onClose: () => void;
  defaultTab?: 'info' | 'edit';
  onSave?: (question: Question) => void;
}
const QUESTION_TYPES = [
{
  id: 'multiple',
  label: 'Multiple Choice',
  icon: List,
  description: 'Select one from many'
},
{
  id: 'open',
  label: 'Open Answer',
  icon: Type,
  description: 'Free text response'
},
{
  id: 'true-false',
  label: 'True/False',
  icon: CheckSquare,
  description: 'Binary choice'
},
{
  id: 'matching',
  label: 'Matching',
  icon: GitMerge,
  description: 'Connect pairs'
}];

const CATEGORIES = [
{
  id: 'onboarding',
  label: 'Onboarding',
  color: '#3B82F6'
},
{
  id: 'feedback',
  label: 'Feedback',
  color: '#10B981'
},
{
  id: 'lms',
  label: 'LMS',
  color: '#F59E0B'
}];

const TYPE_LABELS: Record<string, string> = {
  multiple: 'Multiple Choice',
  open: 'Open Answer',
  'true-false': 'True/False',
  matching: 'Matching'
};
function formatDate(date: Date): string {
  try {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (_e) {
    return 'Unknown date';
  }
}
export function QuestionDetail({
  question,
  onClose,
  defaultTab,
  onSave
}: QuestionDetailProps) {
  const isNewQuestion = question?.id?.startsWith('new-') ?? false;
  const [activeTab, setActiveTab] = useState<'info' | 'edit'>(
    defaultTab || 'info'
  );
  const [title, setTitle] = useState(question?.title || 'New Question');
  const [text, setText] = useState(question?.text || '');
  const [type, setType] = useState(question?.type || 'multiple');
  const [category, setCategory] = useState(question?.category || 'feedback');
  const [status, setStatus] = useState<'active' | 'draft'>(
    question?.status || 'draft'
  );
  const [options, setOptions] = useState<string[]>(
    question?.options || ['', '', '', '']
  );
  const [correctOption, setCorrectOption] = useState<number>(0);
  const [hint, setHint] = useState('');
  const [showConfigureAnswers, setShowConfigureAnswers] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragIndexRef = useRef<number | null>(null);
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const addOption = () => setOptions([...options, '']);
  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      if (correctOption === index) setCorrectOption(0);
      if (correctOption > index) setCorrectOption(correctOption - 1);
    }
  };
  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragIndexRef.current = index;
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = dragIndexRef.current;
    if (sourceIndex !== null && sourceIndex !== targetIndex) {
      const newOptions = [...options];
      const [movedItem] = newOptions.splice(sourceIndex, 1);
      newOptions.splice(targetIndex, 0, movedItem);
      setOptions(newOptions);
      // Update correctOption to follow the moved item
      if (correctOption === sourceIndex) {
        setCorrectOption(targetIndex);
      } else if (sourceIndex < correctOption && targetIndex >= correctOption) {
        setCorrectOption(correctOption - 1);
      } else if (sourceIndex > correctOption && targetIndex <= correctOption) {
        setCorrectOption(correctOption + 1);
      }
    }
    dragIndexRef.current = null;
    setDragIndex(null);
    setDragOverIndex(null);
  };
  const handleDragEnd = () => {
    dragIndexRef.current = null;
    setDragIndex(null);
    setDragOverIndex(null);
  };
  if (!question) {
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
    <div className="w-full h-full bg-white flex overflow-hidden">
      {/* Icon Sidebar */}
      <div className="w-[48px] flex-shrink-0 border-r border-gray-200 bg-gray-50/80 flex flex-col items-center pt-4 gap-3">
        <button
          onClick={() => setActiveTab('info')}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all relative ${activeTab === 'info' ? 'bg-white text-gray-700 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}>

          <Info className="w-[18px] h-[18px]" />
          {activeTab === 'info' &&
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-teal-500 rounded-r-full -ml-[6px]" />
          }
        </button>
        <button
          onClick={() => setActiveTab('edit')}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all relative ${activeTab === 'edit' ? 'bg-white text-gray-700 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}>

          <PenSquare className="w-[18px] h-[18px]" />
          {activeTab === 'edit' &&
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-teal-500 rounded-r-full -ml-[6px]" />
          }
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* INFO TAB */}
        {activeTab === 'info' &&
        <div className="flex flex-col h-full">
            <div className="h-[57px] px-6 border-b border-gray-200 flex items-center justify-end flex-shrink-0 bg-white">
              <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors">

                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${question.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>

                  {question.status === 'active' ? 'Published' : 'Draft'}
                </span>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
                  Question
                </label>
                <p className="text-base text-gray-900 font-medium leading-relaxed">
                  {question.title}
                </p>
                {question.text &&
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {question.text}
                  </p>
              }
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
                  Type
                </label>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gray-100 rounded-md">
                    {(() => {
                    const TypeIcon = QUESTION_TYPES.find(
                      (t) => t.id === question.type
                    )?.icon;
                    return TypeIcon ?
                    <TypeIcon className="w-4 h-4 text-gray-500" /> :

                    <HelpCircle className="w-4 h-4" />;

                  })()}
                  </div>
                  <p className="text-sm text-gray-900">
                    {TYPE_LABELS[question.type]}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
                  Category
                </label>
                <div className="flex items-center gap-2">
                  <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                    CATEGORIES.find((c) => c.id === question.category)?.
                    color || '#6B7280'
                  }} />


                  <span className="text-sm text-gray-900 capitalize">
                    {CATEGORIES.find((c) => c.id === question.category)?.
                  label || question.category}
                  </span>
                </div>
              </div>

              {question.type === 'multiple' && question.options &&
            <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
                    Answer Options
                  </label>
                  <div className="space-y-2">
                    {question.options.map((option, index) =>
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">

                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 bg-white">
                          <span className="text-xs font-medium text-gray-600">
                            {String.fromCharCode(65 + index)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">{option}</span>
                      </div>
                )}
                  </div>
                </div>
            }

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
                  Created
                </label>
                <p className="text-sm text-gray-900">
                  {formatDate(question.createdAt)}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center gap-2 bg-gray-50">
              <Button
              variant="primary"
              className="flex-1"
              onClick={() => setActiveTab('edit')}
              leftIcon={<Edit className="w-4 h-4" />}>

                Edit Question
              </Button>
              <Button variant="secondary" size="icon">
                <Copy className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="danger" size="icon">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        }

        {/* EDIT TAB */}
        {activeTab === 'edit' &&
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 pt-6 pb-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Reference Title
                  </label>
                  <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title..."
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors" />

                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Type
                    </label>
                    <div className="relative">
                      <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full appearance-none rounded-md border border-gray-200 bg-white pl-10 pr-8 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer transition-colors">

                        {QUESTION_TYPES.map((t) =>
                      <option key={t.id} value={t.id}>
                            {t.label}
                          </option>
                      )}
                      </select>
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        {(() => {
                        const TypeIcon = QUESTION_TYPES.find(
                          (t) => t.id === type
                        )?.icon;
                        return TypeIcon ?
                        <TypeIcon className="w-4 h-4" /> :

                        <List className="w-4 h-4" />;

                      })()}
                      </div>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

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
                        CATEGORIES.find((c) => c.id === category)?.color ||
                        '#6B7280'
                      }} />


                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Content
                  </label>
                  <textarea
                  className="w-full min-h-[120px] rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm placeholder:text-gray-400 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-y transition-colors"
                  placeholder="Enter your question content..."
                  value={text}
                  onChange={(e) => setText(e.target.value)} />

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Image
                  </label>
                  <div
                  className={`w-full min-h-[120px] rounded-md border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${isDragOver ? 'border-teal-400 bg-teal-50/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                  }}>

                    <span className="text-sm text-gray-500">
                      Drag & Drop File(s)
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Hint
                  </label>
                  <input
                  type="text"
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                  placeholder="Optional hint for the respondent..."
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors" />

                </div>

                <div>
                  <button
                  onClick={() =>
                  setShowConfigureAnswers(!showConfigureAnswers)
                  }
                  className="w-full flex items-center gap-2 py-3 text-teal-600 hover:text-teal-700 transition-colors">

                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-sm font-bold uppercase tracking-wide">
                      Configure Answers
                    </span>
                    <ChevronRight
                    className={`w-4 h-4 ml-auto transition-transform ${showConfigureAnswers ? 'rotate-90' : ''}`} />

                  </button>

                  <AnimatePresence>
                    {showConfigureAnswers &&
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0
                    }}
                    animate={{
                      height: 'auto',
                      opacity: 1
                    }}
                    exit={{
                      height: 0,
                      opacity: 0
                    }}
                    transition={{
                      duration: 0.2
                    }}
                    className="overflow-hidden">

                        <div className="pt-3 space-y-3">
                          {type === 'multiple' &&
                      <>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                  Answer Options
                                </span>
                                <span className="text-xs text-gray-400">
                                  Mark the correct answer
                                </span>
                              </div>
                              <div className="space-y-2.5">
                                {options.map((option, index) =>
                          <div
                            key={index}
                            draggable
                            onDragStart={(e) =>
                            handleDragStart(e, index)
                            }
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                            className={`flex items-center gap-2.5 group rounded-md p-1 -m-1 transition-all ${dragIndex === index ? 'opacity-30 scale-95' : ''} ${dragOverIndex === index && dragIndex !== index ? 'ring-2 ring-teal-400 bg-teal-50/30' : ''}`}>

                                    <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors select-none">
                                      <GripVertical className="w-4 h-4" />
                                    </div>
                                    <button
                              onClick={() => setCorrectOption(index)}
                              className={`flex-shrink-0 transition-colors ${correctOption === index ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}>

                                      {correctOption === index ?
                              <CheckCircle2 className="w-5 h-5" /> :

                              <Circle className="w-5 h-5" />
                              }
                                    </button>
                                    <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                              handleOptionChange(
                                index,
                                e.target.value
                              )
                              }
                              placeholder={`Option ${index + 1}`}
                              className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all" />


                                    <button
                              onClick={() => removeOption(index)}
                              disabled={options.length <= 2}
                              className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-30">

                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                          )}
                              </div>
                              <button
                          onClick={addOption}
                          className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">

                                <Plus className="w-4 h-4" />
                                Add Option
                              </button>
                            </>
                      }

                          {type === 'true-false' &&
                      <div className="grid grid-cols-2 gap-3">
                              {['True', 'False'].map((opt, idx) =>
                        <button
                          key={opt}
                          onClick={() => setCorrectOption(idx)}
                          className={`relative p-3 rounded-md border-2 text-center transition-all ${correctOption === idx ? 'border-teal-500 bg-teal-50/50 text-teal-700' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'}`}>

                                  <span className="text-sm font-bold">
                                    {opt}
                                  </span>
                                  {correctOption === idx &&
                          <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-teal-500" />
                          }
                                </button>
                        )}
                            </div>
                      }

                          {type === 'open' &&
                      <div className="p-4 bg-gray-50 rounded-md border border-dashed border-gray-200 text-center">
                              <Type className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-500">
                                Open-ended response. No predefined options
                                needed.
                              </p>
                            </div>
                      }

                          {type === 'matching' &&
                      <div className="p-4 bg-gray-50 rounded-md border border-dashed border-gray-200 text-center">
                              <GitMerge className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-500">
                                Matching pairs configuration coming soon.
                              </p>
                            </div>
                      }
                        </div>
                      </motion.div>
                  }
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Footer with Save/Cancel buttons */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between gap-2 bg-gray-50">
              <Button
              variant="secondary"
              onClick={() => {
                setActiveTab('info');
                // Reset form to original values
                setTitle(question?.title || 'New Question');
                setText(question?.text || '');
                setType(question?.type || 'multiple');
                setCategory(question?.category || 'feedback');
                setStatus(question?.status || 'draft');
                setOptions(question?.options || ['', '', '', '']);
              }}>

                Cancel
              </Button>
              <Button
              variant="primary"
              onClick={() => {
                const updatedQuestion: Question = {
                  id: question?.id || `q-${Date.now()}`,
                  title,
                  text,
                  type,
                  category,
                  status,
                  createdAt: question?.createdAt || new Date(),
                  options: type === 'multiple' ? options : undefined
                };
                onSave?.(updatedQuestion);
                setActiveTab('info');
              }}>

                {isNewQuestion ? 'Create Question' : 'Save Changes'}
              </Button>
            </div>
          </div>
        }
      </div>
    </div>);

}