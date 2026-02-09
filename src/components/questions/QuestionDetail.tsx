import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  createElement } from
'react';
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
  Square,
  GitMerge,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Info,
  Edit,
  Copy,
  PenSquare,
  SlidersHorizontal,
  Save,
  Send,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  Image,
  Upload } from
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
  onDelete?: (questionId: string) => void;
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
const slideVariants = {
  enterFromRight: {
    x: '100%',
    opacity: 0
  },
  enterFromLeft: {
    x: '-100%',
    opacity: 0
  },
  center: {
    x: 0,
    opacity: 1
  },
  exitToLeft: {
    x: '-100%',
    opacity: 0
  },
  exitToRight: {
    x: '100%',
    opacity: 0
  }
};
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
            className="h-3.5 w-12 bg-gray-200 rounded animate-pulse mb-2.5"
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
      </div>
      <div>
        <div
          className="h-3.5 w-16 bg-gray-200 rounded animate-pulse mb-2.5"
          style={{
            animationDelay: '200ms'
          }} />

        <div
          className="h-[120px] w-full bg-gray-100 rounded-md animate-pulse"
          style={{
            animationDelay: '250ms'
          }} />

      </div>
      <div>
        <div
          className="h-3.5 w-14 bg-gray-200 rounded animate-pulse mb-2.5"
          style={{
            animationDelay: '300ms'
          }} />

        <div
          className="h-[120px] w-full bg-gray-50 rounded-md border-2 border-dashed border-gray-200 animate-pulse"
          style={{
            animationDelay: '350ms'
          }} />

      </div>
      <div>
        <div
          className="h-3.5 w-10 bg-gray-200 rounded animate-pulse mb-2.5"
          style={{
            animationDelay: '400ms'
          }} />

        <div
          className="h-10 w-full bg-gray-100 rounded-md animate-pulse"
          style={{
            animationDelay: '450ms'
          }} />

      </div>
      <div
        className="rounded-lg border-2 border-gray-200 p-4 animate-pulse"
        style={{
          animationDelay: '500ms'
        }}>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gray-200" />
          <div className="flex-1">
            <div className="h-3.5 w-32 bg-gray-200 rounded mb-1.5" />
            <div className="h-3 w-48 bg-gray-100 rounded" />
          </div>
          <div className="w-5 h-5 bg-gray-100 rounded" />
        </div>
      </div>
    </div>);

}
function AnswersSkeleton() {
  return (
    <div className="px-6 pt-6 pb-8 space-y-4">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-100 animate-pulse">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="h-3.5 w-24 bg-gray-200 rounded" />
      </div>
      <div className="flex items-center justify-between">
        <div
          className="h-3 w-28 bg-gray-200 rounded animate-pulse"
          style={{
            animationDelay: '75ms'
          }} />

        <div
          className="h-3 w-36 bg-gray-100 rounded animate-pulse"
          style={{
            animationDelay: '75ms'
          }} />

      </div>
      {[0, 1, 2, 3].map((i) =>
      <div
        key={i}
        className="flex items-center gap-2.5 animate-pulse"
        style={{
          animationDelay: `${150 + i * 75}ms`
        }}>

          <div className="w-4 h-4 bg-gray-100 rounded" />
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
          <div className="flex-1 h-9 bg-gray-100 rounded-md" />
          <div className="w-6 h-6 bg-gray-50 rounded" />
        </div>
      )}
      <div
        className="h-9 w-full bg-gray-50 rounded-md border-2 border-dashed border-gray-200 animate-pulse"
        style={{
          animationDelay: '500ms'
        }} />

    </div>);

}
function InfoSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
      <div>
        <div
          className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-3"
          style={{
            animationDelay: '50ms'
          }} />

        <div
          className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"
          style={{
            animationDelay: '100ms'
          }} />

        <div
          className="h-3.5 w-full bg-gray-100 rounded animate-pulse"
          style={{
            animationDelay: '150ms'
          }} />

      </div>
      <div>
        <div
          className="h-3 w-12 bg-gray-200 rounded animate-pulse mb-3"
          style={{
            animationDelay: '200ms'
          }} />

        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 bg-gray-100 rounded-md animate-pulse"
            style={{
              animationDelay: '250ms'
            }} />

          <div
            className="h-3.5 w-28 bg-gray-200 rounded animate-pulse"
            style={{
              animationDelay: '250ms'
            }} />

        </div>
      </div>
      <div>
        <div
          className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-3"
          style={{
            animationDelay: '300ms'
          }} />

        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"
            style={{
              animationDelay: '350ms'
            }} />

          <div
            className="h-3.5 w-20 bg-gray-200 rounded animate-pulse"
            style={{
              animationDelay: '350ms'
            }} />

        </div>
      </div>
      <div>
        <div
          className="h-3 w-28 bg-gray-200 rounded animate-pulse mb-3"
          style={{
            animationDelay: '400ms'
          }} />

        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) =>
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 animate-pulse"
            style={{
              animationDelay: `${450 + i * 75}ms`
            }}>

              <div className="w-6 h-6 rounded-full bg-gray-200" />
              <div
              className="h-3.5 bg-gray-200 rounded"
              style={{
                width: `${40 + i * 15}%`
              }} />

            </div>
          )}
        </div>
      </div>
      <div>
        <div
          className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-3"
          style={{
            animationDelay: '750ms'
          }} />

        <div
          className="h-3.5 w-36 bg-gray-200 rounded animate-pulse"
          style={{
            animationDelay: '800ms'
          }} />

      </div>
    </div>);

}
export function QuestionDetail({
  question,
  onClose,
  defaultTab,
  onSave,
  onDelete
}: QuestionDetailProps) {
  const isNewQuestion = question?.id?.startsWith('new-') ?? false;
  const [activeTab, setActiveTab] = useState<'info' | 'edit'>(
    defaultTab || 'info'
  );
  const [editView, setEditView] = useState<'form' | 'answers'>('form');
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>(
    'right'
  );
  const [title, setTitle] = useState(question?.title || 'New Question');
  const [text, setText] = useState(question?.text || '');
  const [type, setType] = useState(question?.type || 'multiple');
  const [category, setCategory] = useState(question?.category || 'feedback');
  const [status, setStatus] = useState<'active' | 'draft'>(
    question?.status || 'draft'
  );
  const [options, setOptions] = useState<string[]>(
    question?.options || ['', '']
  );
  const [correctOption, setCorrectOption] = useState<number>(0);
  const [correctOptions, setCorrectOptions] = useState<Set<number>>(() => {
    // For existing questions with options, mark the first option as correct by default
    if (
    question?.options &&
    question.options.length > 0 &&
    !question.id?.startsWith('new-'))
    {
      return new Set([0]);
    }
    return new Set();
  });
  const [scoringMode, setScoringMode] = useState<'all' | 'any'>('all');
  const [binaryLabels, setBinaryLabels] = useState<[string, string]>([
  'True',
  'False']
  );
  const [editingBinaryIndex, setEditingBinaryIndex] = useState<number | null>(
    null
  );
  const [editingBinaryOriginal, setEditingBinaryOriginal] = useState<string>('');
  const binaryInputRef = useRef<HTMLInputElement>(null);
  const [matchSubType, setMatchSubType] = useState<'text' | 'image'>('text');
  const [matchPairs, setMatchPairs] = useState<
    Array<{
      prompt: string;
      answer: string;
      imageUrl?: string;
    }>>(
    () => {
      // For existing matching questions, provide default pairs for demo
      if (question?.type === 'matching' && !question.id?.startsWith('new-')) {
        return [
        {
          prompt: 'Sprint',
          answer: 'A short, time-boxed period for completing work'
        },
        {
          prompt: 'Backlog',
          answer: 'A prioritized list of work items'
        },
        {
          prompt: 'Standup',
          answer: 'A brief daily team meeting'
        },
        {
          prompt: 'Retrospective',
          answer: 'A review meeting after a sprint'
        }];

      }
      return [
      {
        prompt: '',
        answer: ''
      },
      {
        prompt: '',
        answer: ''
      }];

    });
  const [activeMatchPairIndex, setActiveMatchPairIndex] = useState<
    number | null>(
    null);
  const [matchDragIndex, setMatchDragIndex] = useState<number | null>(null);
  const [matchDragOverIndex, setMatchDragOverIndex] = useState<number | null>(
    null
  );
  const matchDragIndexRef = useRef<number | null>(null);
  const [hint, setHint] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragIndexRef = useRef<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [correctAnswer, setCorrectAnswer] = useState(() => {
    // For existing open answer questions, provide a default correct answer for demo
    if (question?.type === 'open' && !question.id?.startsWith('new-')) {
      return 'A detailed description of the user experience including usability, features, and support quality.';
    }
    return '';
  });
  const [matchValue, setMatchValue] = useState(() => {
    if (question?.type === 'open' && !question.id?.startsWith('new-')) {
      return 80;
    }
    return 1;
  });
  const [testAnswer, setTestAnswer] = useState('');
  const [testResult, setTestResult] = useState<{
    similarity: number;
    passed: boolean;
  } | null>(null);
  const [showTestMatch, setShowTestMatch] = useState(false);
  const testMatchRef = useRef<HTMLDivElement>(null);
  const testMatchContentRef = useRef<HTMLDivElement>(null);
  const [testMatchHeight, setTestMatchHeight] = useState<number>(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showTypeChangeConfirm, setShowTypeChangeConfirm] = useState(false);
  const [pendingType, setPendingType] = useState<string | null>(null);
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [isAnswersLoading, setIsAnswersLoading] = useState(false);
  useEffect(() => {
    if (activeTab === 'info' && question) {
      setIsInfoLoading(true);
      const timer = setTimeout(() => setIsInfoLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [activeTab, question?.id]);
  useEffect(() => {
    if (activeTab === 'edit' && editView === 'form' && isFormLoading) {
      const timer = setTimeout(() => setIsFormLoading(false), 700);
      return () => clearTimeout(timer);
    }
  }, [activeTab, editView, isFormLoading]);
  useEffect(() => {
    if (editView === 'answers' && isAnswersLoading) {
      const timer = setTimeout(() => setIsAnswersLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [editView, isAnswersLoading]);
  const navigateToAnswers = () => {
    setSlideDirection('right');
    setIsAnswersLoading(true);
    setEditView('answers');
  };
  const navigateToForm = () => {
    setSlideDirection('left');
    setIsFormLoading(true);
    setEditView('form');
  };
  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 250);
  };
  useEffect(() => {
    if (showTestMatch && testMatchContentRef.current) {
      setTestMatchHeight(testMatchContentRef.current.scrollHeight);
    }
  }, [showTestMatch, testAnswer, testResult]);
  const calculateSimilarity = (a: string, b: string): number => {
    if (!a || !b) return 0;
    const strA = a.toLowerCase().trim();
    const strB = b.toLowerCase().trim();
    if (strA === strB) return 100;
    const longer = strA.length > strB.length ? strA : strB;
    const shorter = strA.length > strB.length ? strB : strA;
    const longerLength = longer.length;
    if (longerLength === 0) return 100;
    const costs: number[] = [];
    for (let i = 0; i <= longer.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= shorter.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (longer.charAt(i - 1) !== shorter.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[shorter.length] = lastValue;
    }
    return Math.round(
      (longerLength - costs[shorter.length]) / longerLength * 100
    );
  };
  const handleTestMatch = () => {
    const similarity = calculateSimilarity(correctAnswer, testAnswer);
    setTestResult({
      similarity,
      passed: similarity >= matchValue
    });
  };
  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = {
          ...prev
        };
        delete next[field];
        return next;
      });
    }
  };
  const toggleCorrectOption = (index: number) => {
    setCorrectOptions((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
    clearError('correctOptions');
  };
  const validateForPublish = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim() || title.trim() === 'New Question')
    newErrors.title = 'Reference title is required';
    if (!text.trim()) newErrors.text = 'Content is required';
    if (type === 'multiple') {
      const filledOptions = options.filter((o) => o.trim() !== '');
      if (filledOptions.length < 2)
      newErrors.options = 'At least 2 answer options are required';
      if (correctOptions.size === 0)
      newErrors.correctOptions =
      'At least one correct answer must be selected';
    }
    if (type === 'open') {
      if (!correctAnswer.trim())
      newErrors.correctAnswer = 'Correct answer is required';
    }
    if (type === 'matching') {
      const configuredPairs = matchPairs.filter((p) =>
      matchSubType === 'text' ?
      p.prompt.trim() && p.answer.trim() :
      p.imageUrl && p.answer.trim()
      );
      if (configuredPairs.length < 2)
      newErrors.matchPairs =
      'At least 2 fully configured match pairs are required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSave = (saveStatus: 'draft' | 'active') => {
    if (saveStatus === 'active') {
      if (!validateForPublish()) return;
    } else {
      setErrors({});
    }
    const updatedQuestion: Question = {
      id: question?.id || `q-${Date.now()}`,
      title,
      text,
      type,
      category,
      status: saveStatus,
      createdAt: question?.createdAt || new Date(),
      options: type === 'multiple' ? options : undefined
    };
    onSave?.(updatedQuestion);
    setEditView('form');
    setActiveTab('info');
  };
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    clearError('options');
  };
  const addOption = () => setOptions([...options, '']);
  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      setCorrectOptions((prev) => {
        const next = new Set<number>();
        prev.forEach((i) => {
          if (i < index) next.add(i);else
          if (i > index) next.add(i - 1);
        });
        return next;
      });
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
      setCorrectOptions((prev) => {
        const next = new Set<number>();
        prev.forEach((i) => {
          if (i === sourceIndex) {
            next.add(targetIndex);
          } else if (sourceIndex < targetIndex) {
            next.add(i > sourceIndex && i <= targetIndex ? i - 1 : i);
          } else {
            next.add(i >= targetIndex && i < sourceIndex ? i + 1 : i);
          }
        });
        return next;
      });
      if (correctOption === sourceIndex) setCorrectOption(targetIndex);else
      if (sourceIndex < correctOption && targetIndex >= correctOption)
      setCorrectOption(correctOption - 1);else
      if (sourceIndex > correctOption && targetIndex <= correctOption)
      setCorrectOption(correctOption + 1);
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
  const getAnswerSummary = () => {
    if (type === 'multiple') {
      const filled = options.filter((o) => o.trim() !== '').length;
      const correctCount = correctOptions.size;
      return `${filled} options, ${correctCount} correct · ${scoringMode === 'all' ? 'Require all' : 'At least one'}`;
    }
    if (type === 'true-false')
    return correctOption === 0 ?
    `Correct: ${binaryLabels[0] || 'True'}` :
    `Correct: ${binaryLabels[1] || 'False'}`;
    if (type === 'open')
    return correctAnswer.trim() ?
    `Answer set, ${matchValue}% match` :
    'No answer configured';
    if (type === 'matching') {
      const filled = matchPairs.filter(
        (p) =>
        (matchSubType === 'text' ? p.prompt.trim() : p.imageUrl) &&
        p.answer.trim()
      ).length;
      return `${matchSubType === 'text' ? 'Text' : 'Image'} match · ${filled}/${matchPairs.length} pairs configured`;
    }
    return '';
  };
  const hasAnswerErrors = !!(
  errors.options ||
  errors.correctAnswer ||
  errors.correctOptions ||
  errors.matchPairs ||
  errors.matchPrompt ||
  errors.matchAnswer);

  const validateAnswers = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (type === 'multiple') {
      const filledOptions = options.filter((o) => o.trim() !== '');
      if (filledOptions.length < 2)
      newErrors.options = 'At least 2 answer options are required';
      if (correctOptions.size === 0)
      newErrors.correctOptions =
      'At least one correct answer must be selected';
    }
    if (type === 'open') {
      if (!correctAnswer.trim())
      newErrors.correctAnswer = 'Correct answer is required';
    }
    if (type === 'matching') {
      const configuredPairs = matchPairs.filter((p) =>
      matchSubType === 'text' ?
      p.prompt.trim() && p.answer.trim() :
      p.imageUrl && p.answer.trim()
      );
      if (configuredPairs.length < 2)
      newErrors.matchPairs =
      'At least 2 fully configured match pairs are required';
    }
    setErrors((prev) => ({
      ...prev,
      ...newErrors
    }));
    return Object.keys(newErrors).length === 0;
  };
  const handleSaveAnswers = () => {
    if (type === 'matching' && activeMatchPairIndex !== null) {
      const pair = matchPairs[activeMatchPairIndex];
      const newErrors: Record<string, string> = {};
      if (matchSubType === 'text' && !pair.prompt.trim()) {
        newErrors.matchPrompt = 'Prompt is required';
      }
      if (matchSubType === 'image' && !pair.imageUrl) {
        newErrors.matchPrompt = 'Image is required';
      }
      if (!pair.answer.trim()) {
        newErrors.matchAnswer = 'Answer is required';
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors((prev) => ({
          ...prev,
          ...newErrors
        }));
        return;
      }
      setErrors((prev) => {
        const next = {
          ...prev
        };
        delete next.matchPrompt;
        delete next.matchAnswer;
        return next;
      });
      setActiveMatchPairIndex(null);
      return;
    }
    if (validateAnswers()) {
      navigateToForm();
    }
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
    <div className="w-full h-full bg-white flex overflow-hidden relative">
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
                  Delete this question?
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  This draft will be permanently removed. This action cannot be
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
                    if (question) {
                      onDelete?.(question.id);
                    }
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">

                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Type Change Confirmation Dialog */}
      <AnimatePresence>
        {false && showTypeChangeConfirm && pendingType &&
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
          onClick={() => {
            setShowTypeChangeConfirm(false);
            setPendingType(null);
          }}>

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
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Change question type?
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Switching to{' '}
                  <span className="font-medium text-gray-700">
                    {TYPE_LABELS[pendingType]}
                  </span>{' '}
                  will reset your currently configured answers.
                </p>
                <div className="flex items-center gap-3 w-full">
                  <button
                  onClick={() => {
                    setShowTypeChangeConfirm(false);
                    setPendingType(null);
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">

                    Keep Current
                  </button>
                  <button
                  onClick={() => {
                    setType(pendingType);
                    setOptions(['', '']);
                    setCorrectOption(0);
                    setCorrectOptions(new Set());
                    setScoringMode('all');
                    setBinaryLabels(['True', 'False']);
                    setCorrectAnswer('');
                    setMatchValue(1);
                    setTestAnswer('');
                    setTestResult(null);
                    setShowTestMatch(false);
                    setMatchSubType('text');
                    setMatchPairs([
                    {
                      prompt: '',
                      answer: ''
                    },
                    {
                      prompt: '',
                      answer: ''
                    }]
                    );
                    setActiveMatchPairIndex(null);
                    setErrors((prev) => {
                      const next = {
                        ...prev
                      };
                      delete next.options;
                      delete next.correctAnswer;
                      delete next.correctOptions;
                      return next;
                    });
                    setShowTypeChangeConfirm(false);
                    setPendingType(null);
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors">

                    Change Type
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Icon Sidebar */}
      <div className="w-[48px] flex-shrink-0 border-r border-gray-200 bg-gray-50/80 flex flex-col items-center pt-4 gap-3">
        <button
          onClick={() => {
            setActiveTab('info');
            setEditView('form');
          }}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all relative ${activeTab === 'info' ? 'bg-white text-gray-700 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}>

          <Info className="w-[18px] h-[18px]" />
          {activeTab === 'info' &&
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-teal-500 rounded-r-full -ml-[6px]" />
          }
        </button>
        <button
          onClick={() => {
            setActiveTab('edit');
            setEditView('form');
          }}
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
            <div className="flex-1 overflow-y-auto">
              {isInfoLoading ?
            <InfoSkeleton /> :

            <div className="p-6 space-y-6">
                  {/* Status + Metadata Row */}
                  <div className="flex items-center justify-between">
                    <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${question.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>

                      <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${question.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />

                      {question.status === 'active' ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(question.createdAt)}
                    </span>
                  </div>

                  {/* Question Title & Content */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 leading-snug">
                      {question.title}
                    </h3>
                    {text &&
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {text}
                      </p>
                }
                  </div>

                  {/* Type & Category - Compact Row */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="p-1 bg-white rounded shadow-sm">
                        {(() => {
                      const TypeIcon = QUESTION_TYPES.find(
                        (t) => t.id === type
                      )?.icon;
                      return TypeIcon ?
                      <TypeIcon className="w-3.5 h-3.5 text-gray-500" /> :

                      <HelpCircle className="w-3.5 h-3.5" />;

                    })()}
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {TYPE_LABELS[type]}
                      </span>
                    </div>
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
                  </div>

                  {/* Hint */}
                  {hint &&
              <div className="flex items-start gap-2 px-3 py-2.5 bg-amber-50/60 rounded-lg border border-amber-100">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider">
                          Hint
                        </span>
                        <p className="text-xs text-amber-700 mt-0.5">{hint}</p>
                      </div>
                    </div>
              }

                  {/* Answer Preview - Type Specific */}
                  <div className="pt-2 border-t border-gray-100">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3 block">
                      Answer Configuration
                    </label>

                    {/* Multiple Choice */}
                    {type === 'multiple' &&
                <div className="space-y-2">
                        {options.map((option, index) => {
                    const isCorrect = correctOptions.has(index);
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors ${isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>

                              <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-emerald-500 text-white' : 'border-2 border-gray-300 bg-white'}`}>

                                {isCorrect ?
                          <CheckCircle2 className="w-3.5 h-3.5" /> :

                          <span className="text-[10px] font-semibold text-gray-500">
                                    {String.fromCharCode(65 + index)}
                                  </span>
                          }
                              </div>
                              <span
                          className={`text-sm ${isCorrect ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>

                                {option ||
                          <span className="text-gray-400 italic">
                                    Empty option
                                  </span>
                          }
                              </span>
                            </div>);

                  })}
                        {correctOptions.size > 1 &&
                  <div className="flex items-center gap-1.5 mt-2 px-1">
                            <Info className="w-3 h-3 text-gray-400" />
                            <span className="text-[11px] text-gray-400">
                              {scoringMode === 'all' ?
                      'All correct answers required' :
                      'At least one correct answer needed'}
                            </span>
                          </div>
                  }
                      </div>
                }

                    {/* True/False */}
                    {type === 'true-false' &&
                <div className="grid grid-cols-2 gap-3">
                        {binaryLabels.map((label, idx) => {
                    const isCorrect = correctOption === idx;
                    return (
                      <div
                        key={idx}
                        className={`relative rounded-lg border-2 text-center py-3 px-4 ${isCorrect ? 'border-emerald-400 bg-emerald-50/50' : 'border-gray-100 bg-gray-50'}`}>

                              {isCorrect &&
                        <div className="absolute top-2 right-2 text-emerald-500">
                                  <CheckCircle2 className="w-4 h-4" />
                                </div>
                        }
                              <span
                          className={`text-sm font-bold ${isCorrect ? 'text-emerald-700' : 'text-gray-500'}`}>

                                {label || (idx === 0 ? 'True' : 'False')}
                              </span>
                            </div>);

                  })}
                      </div>
                }

                    {/* Open Answer */}
                    {type === 'open' &&
                <div className="space-y-3">
                        {correctAnswer.trim() ?
                  <div className="px-3 py-3 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                              Correct Answer
                            </span>
                            <p className="text-sm text-gray-800 leading-relaxed">
                              {correctAnswer}
                            </p>
                          </div> :

                  <div className="px-3 py-3 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-center">
                            <span className="text-xs text-gray-400 italic">
                              No answer configured
                            </span>
                          </div>
                  }
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-teal-50 rounded-md border border-teal-100">
                            <span className="text-xs font-bold text-teal-700">
                              {matchValue}%
                            </span>
                            <span className="text-[10px] text-teal-600">
                              match threshold
                            </span>
                          </div>
                        </div>
                      </div>
                }

                    {/* Matching */}
                    {type === 'matching' &&
                <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold ${matchSubType === 'text' ? 'bg-gray-100 text-gray-600' : 'bg-purple-50 text-purple-600 border border-purple-100'}`}>

                            {matchSubType === 'text' ?
                      <>
                                <Type className="w-3 h-3" /> Text Match
                              </> :

                      <>
                                <Image className="w-3 h-3" /> Image Match
                              </>
                      }
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {
                      matchPairs.filter((p) =>
                      matchSubType === 'text' ?
                      p.prompt.trim() && p.answer.trim() :
                      p.imageUrl && p.answer.trim()
                      ).length
                      }
                            /{matchPairs.length} pairs configured
                          </span>
                        </div>
                        {matchPairs.map((pair, index) => {
                    const isConfigured =
                    matchSubType === 'text' ?
                    pair.prompt.trim() && pair.answer.trim() :
                    pair.imageUrl && pair.answer.trim();
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${isConfigured ? 'bg-white border-gray-200' : 'bg-gray-50 border-dashed border-gray-200'}`}>

                              {matchSubType === 'image' ?
                        pair.imageUrl ?
                        <img
                          src={pair.imageUrl}
                          alt=""
                          className="w-9 h-9 rounded-md object-cover flex-shrink-0 border border-gray-200" /> :


                        <div className="w-9 h-9 rounded-md bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                                    <Image className="w-3.5 h-3.5 text-gray-400" />
                                  </div> :


                        <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-bold text-gray-500">
                                    {index + 1}
                                  </span>
                                </div>
                        }
                              <div className="flex-1 min-w-0">
                                <span
                            className={`text-sm block truncate ${isConfigured ? 'text-gray-800' : 'text-gray-400 italic'}`}>

                                  {matchSubType === 'text' ?
                            pair.prompt.trim() || 'No prompt' :
                            pair.imageUrl ?
                            'Image uploaded' :
                            'No image'}
                                </span>
                                {pair.answer.trim() &&
                          <span className="text-xs text-gray-400 block truncate">
                                    → {pair.answer}
                                  </span>
                          }
                              </div>
                              {isConfigured ?
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> :

                        <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        }
                            </div>);

                  })}
                      </div>
                }

                    {/* No answers configured fallback */}
                    {type !== 'multiple' &&
                type !== 'true-false' &&
                type !== 'open' &&
                type !== 'matching' &&
                <div className="px-3 py-3 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-center">
                          <span className="text-xs text-gray-400 italic">
                            No answer preview available
                          </span>
                        </div>
                }
                  </div>
                </div>
            }
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
        <div className="flex flex-col h-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {editView === 'form' &&
            <motion.div
              key="form-view"
              initial={
              slideDirection === 'left' ?
              'enterFromLeft' :
              'enterFromRight'
              }
              animate="center"
              exit="exitToLeft"
              variants={slideVariants}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="flex flex-col h-full">

                  <div className="h-[57px] px-6 border-b border-gray-200 flex items-center flex-shrink-0 bg-white">
                    <h2 className="text-lg font-bold text-gray-900 flex-1 min-w-0 truncate">
                      {isFormLoading ?
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" /> :
                  isNewQuestion ?
                  'New Question' :

                  question.title
                  }
                    </h2>
                    {!isFormLoading &&
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ml-3 flex-shrink-0 ${status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>

                        <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />

                        {status === 'active' ? 'Published' : 'Draft'}
                      </span>
                }
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {isFormLoading ?
                <FormSkeleton /> :

                <div className="px-6 pt-6 pb-8 space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Reference Title
                            <span className="text-red-400 ml-0.5">*</span>
                          </label>
                          <input
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        clearError('title');
                      }}
                      placeholder="Enter a descriptive title..."
                      className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors ${errors.title ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'}`} />

                          {errors.title &&
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.title}
                            </p>
                    }
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Type
                            </label>
                            <div className="relative">
                              <select
                          value={type}
                          onChange={(e) => {
                            const newType = e.target.value;
                            if (newType === type) return;
                            setType(newType);
                            setOptions(['', '']);
                            setCorrectOption(0);
                            setCorrectOptions(new Set());
                            setScoringMode('all');
                            setBinaryLabels(['True', 'False']);
                            setCorrectAnswer('');
                            setMatchValue(1);
                            setTestAnswer('');
                            setTestResult(null);
                            setShowTestMatch(false);
                            setMatchSubType('text');
                            setMatchPairs([
                            {
                              prompt: '',
                              answer: ''
                            },
                            {
                              prompt: '',
                              answer: ''
                            }]
                            );
                            setActiveMatchPairIndex(null);
                            setErrors((prev) => {
                              const next = {
                                ...prev
                              };
                              delete next.options;
                              delete next.correctAnswer;
                              delete next.correctOptions;
                              delete next.matchPairs;
                              return next;
                            });
                          }}
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
                            CATEGORIES.find((c) => c.id === category)?.
                            color || '#6B7280'
                          }} />

                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Content
                            <span className="text-red-400 ml-0.5">*</span>
                          </label>
                          <textarea
                      className={`w-full min-h-[120px] rounded-md border bg-white px-3 py-2.5 text-sm placeholder:text-gray-400 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-y transition-colors ${errors.text ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'}`}
                      placeholder="Enter your question content..."
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                        clearError('text');
                      }} />

                          {errors.text &&
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.text}
                            </p>
                    }
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
                        <button
                    onClick={navigateToAnswers}
                    className={`w-full text-left rounded-lg border-2 p-4 transition-all group ${hasAnswerErrors ? 'border-red-200 bg-red-50/50 hover:border-red-300' : 'border-gray-200 bg-gray-50/50 hover:border-teal-400 hover:bg-teal-50/30'}`}>

                          <div className="flex items-center gap-3">
                            <div
                        className={`p-2 rounded-lg ${hasAnswerErrors ? 'bg-red-100' : 'bg-teal-100'}`}>

                              <SlidersHorizontal
                          className={`w-5 h-5 ${hasAnswerErrors ? 'text-red-600' : 'text-teal-600'}`} />

                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900">
                                  Configure Answers
                                  <span className="text-red-400 ml-0.5">*</span>
                                </span>
                              </div>
                              <p
                          className={`text-xs mt-0.5 ${hasAnswerErrors ? 'text-red-500' : 'text-gray-500'}`}>

                                {hasAnswerErrors ?
                          errors.options ||
                          errors.correctAnswer ||
                          errors.correctOptions ||
                          errors.matchPairs ||
                          errors.matchPrompt ||
                          errors.matchAnswer :
                          getAnswerSummary()}
                              </p>
                            </div>
                            <ChevronRight
                        className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 ${hasAnswerErrors ? 'text-red-400' : 'text-gray-400'}`} />

                          </div>
                        </button>
                      </div>
                }
                  </div>
                  <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between gap-2 bg-gray-50">
                    {isNewQuestion ?
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteConfirm(true)}
                  leftIcon={<Trash2 className="w-4 h-4" />}>

                        Delete
                      </Button> :

                <Button
                  variant="secondary"
                  onClick={() => {
                    setActiveTab('info');
                    setEditView('form');
                    setErrors({});
                    setTitle(question?.title || 'New Question');
                    setText(question?.text || '');
                    setType(question?.type || 'multiple');
                    setCategory(question?.category || 'feedback');
                    setStatus(question?.status || 'draft');
                    setOptions(question?.options || ['', '']);
                  }}>

                        Cancel
                      </Button>
                }
                    <div className="flex items-center gap-2">
                      <Button
                    variant="outline"
                    onClick={() => handleSave('draft')}
                    leftIcon={<Save className="w-4 h-4" />}>

                        Save as Draft
                      </Button>
                      <Button
                    variant="primary"
                    onClick={() => handleSave('active')}
                    leftIcon={<Send className="w-4 h-4" />}>

                        Publish
                      </Button>
                    </div>
                  </div>
                </motion.div>
            }

              {editView === 'answers' &&
            <motion.div
              key="answers-view"
              initial={
              slideDirection === 'right' ?
              'enterFromRight' :
              'enterFromLeft'
              }
              animate="center"
              exit="exitToRight"
              variants={slideVariants}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="flex flex-col h-full">

                  <div className="h-[57px] px-6 border-b border-gray-200 flex items-center gap-3 flex-shrink-0 bg-white">
                    <button
                  onClick={navigateToForm}
                  className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-lg transition-colors">

                      <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                      <h2 className="text-lg font-bold text-gray-900">
                        Configure Answers
                      </h2>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {isAnswersLoading ?
                <AnswersSkeleton /> :

                <div className="px-6 pt-6 pb-8 space-y-4">
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                          {(() => {
                      const TypeIcon = QUESTION_TYPES.find(
                        (t) => t.id === type
                      )?.icon;
                      return TypeIcon ?
                      <TypeIcon className="w-4 h-4 text-gray-500" /> :

                      <HelpCircle className="w-4 h-4" />;

                    })()}
                          <span className="text-sm text-gray-600">
                            {TYPE_LABELS[type]}
                          </span>
                        </div>

                        {type === 'multiple' &&
                  <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                Answer Options
                                <span className="text-red-400 ml-0.5">*</span>
                              </span>
                              <span className="text-xs text-gray-400">
                                Mark correct answers
                              </span>
                            </div>
                            {errors.options &&
                    <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.options}
                              </p>
                    }
                            {errors.correctOptions &&
                    <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.correctOptions}
                              </p>
                    }
                            <div
                      className={`space-y-2.5 ${errors.options || errors.correctOptions ? 'rounded-md ring-2 ring-red-100 p-2 -m-2' : ''}`}>

                              {options.map((option, index) =>
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`flex items-center gap-2.5 group rounded-md p-1 -m-1 transition-all ${dragIndex === index ? 'opacity-30 scale-95' : ''} ${dragOverIndex === index && dragIndex !== index ? 'ring-2 ring-teal-400 bg-teal-50/30' : ''}`}>

                                  <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors select-none">
                                    <GripVertical className="w-4 h-4" />
                                  </div>
                                  <button
                          onClick={() => toggleCorrectOption(index)}
                          className={`flex-shrink-0 transition-colors ${correctOptions.has(index) ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}>

                                    {correctOptions.has(index) ?
                          <CheckSquare className="w-5 h-5" /> :

                          <Square className="w-5 h-5" />
                          }
                                  </button>
                                  <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                          handleOptionChange(index, e.target.value)
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
                            {correctOptions.size > 1 &&
                    <div className="pt-2 border-t border-gray-100">
                                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-2.5">
                                  Scoring Mode
                                </span>
                                <div className="grid grid-cols-2 gap-2">
                                  <button
                          onClick={() => setScoringMode('all')}
                          className={`px-3 py-2.5 rounded-lg border-2 text-left transition-all ${scoringMode === 'all' ? 'border-teal-500 bg-teal-50/50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>

                                    <span
                            className={`text-xs font-bold block ${scoringMode === 'all' ? 'text-teal-700' : 'text-gray-700'}`}>

                                      Require All
                                    </span>
                                    <span className="text-[11px] text-gray-500 leading-tight block mt-0.5">
                                      All correct answers must be selected
                                    </span>
                                  </button>
                                  <button
                          onClick={() => setScoringMode('any')}
                          className={`px-3 py-2.5 rounded-lg border-2 text-left transition-all ${scoringMode === 'any' ? 'border-teal-500 bg-teal-50/50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>

                                    <span
                            className={`text-xs font-bold block ${scoringMode === 'any' ? 'text-teal-700' : 'text-gray-700'}`}>

                                      At Least One
                                    </span>
                                    <span className="text-[11px] text-gray-500 leading-tight block mt-0.5">
                                      Any one correct answer is sufficient
                                    </span>
                                  </button>
                                </div>
                              </div>
                    }
                          </div>
                  }

                        {type === 'true-false' &&
                  <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                Select the correct answer
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {binaryLabels.map((label, idx) =>
                      <div
                        key={idx}
                        onClick={() => {
                          if (editingBinaryIndex !== idx) {
                            setCorrectOption(idx);
                          }
                        }}
                        className={`relative rounded-lg border-2 text-center transition-all ${editingBinaryIndex !== idx ? 'cursor-pointer' : ''} ${correctOption === idx ? 'border-teal-500 bg-teal-50/50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>

                                  {editingBinaryIndex !== idx &&
                        <div
                          className={`absolute top-2 right-2 transition-colors pointer-events-none ${correctOption === idx ? 'text-green-500' : 'text-gray-300'}`}>

                                      {correctOption === idx ?
                          <CheckCircle2 className="w-4 h-4" /> :

                          <Circle className="w-4 h-4" />
                          }
                                    </div>
                        }
                                  <div className="px-3 py-3 pt-2">
                                    {editingBinaryIndex === idx ?
                          <div className="flex items-center gap-1">
                                        <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const revertLabels: [
                                  string,
                                  string] =
                                [...binaryLabels] as [
                                  string,
                                  string];

                                revertLabels[idx] =
                                editingBinaryOriginal;
                                setBinaryLabels(revertLabels);
                                setEditingBinaryIndex(null);
                              }}
                              className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                              title="Cancel">

                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                        <input
                              ref={binaryInputRef}
                              type="text"
                              value={label}
                              onChange={(e) => {
                                const newLabels: [string, string] =
                                [...binaryLabels] as [
                                  string,
                                  string];

                                newLabels[idx] = e.target.value;
                                setBinaryLabels(newLabels);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setEditingBinaryIndex(null);
                                }
                                if (e.key === 'Escape') {
                                  const revertLabels: [
                                    string,
                                    string] =
                                  [...binaryLabels] as [
                                    string,
                                    string];

                                  revertLabels[idx] =
                                  editingBinaryOriginal;
                                  setBinaryLabels(revertLabels);
                                  setEditingBinaryIndex(null);
                                }
                              }}
                              className="flex-1 min-w-0 text-center text-sm font-bold rounded border border-gray-200 bg-white px-2 py-1 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-gray-700"
                              placeholder={
                              idx === 0 ? 'True' : 'False'
                              }
                              autoFocus />

                                        <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingBinaryIndex(null);
                              }}
                              className="flex-shrink-0 p-1 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors"
                              title="Save">

                                          <CheckCircle2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div> :

                          <div className="flex items-center justify-center gap-1.5">
                                        <span
                              className={`text-sm font-bold ${correctOption === idx ? 'text-teal-700' : 'text-gray-600'}`}>

                                          {label || (
                              idx === 0 ? 'True' : 'False')}
                                        </span>
                                        <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingBinaryOriginal(label);
                                setEditingBinaryIndex(idx);
                                setTimeout(
                                  () =>
                                  binaryInputRef.current?.focus(),
                                  0
                                );
                              }}
                              className="p-0.5 text-gray-300 hover:text-gray-500 transition-colors rounded">

                                          <PenSquare className="w-3 h-3" />
                                        </button>
                                      </div>
                          }
                                  </div>
                                </div>
                      )}
                            </div>
                            <p className="text-xs text-gray-400">
                              Click the circle to mark correct. Click the edit
                              icon to rename labels.
                            </p>
                          </div>
                  }

                        {type === 'open' &&
                  <div className="space-y-5">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Correct Answer
                                <span className="text-red-400 ml-0.5">*</span>
                              </label>
                              <textarea
                        className={`w-full min-h-[120px] rounded-md border bg-white px-3 py-2.5 text-sm placeholder:text-gray-400 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-y transition-colors ${errors.correctAnswer ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'}`}
                        placeholder="Enter the correct answer..."
                        value={correctAnswer}
                        onChange={(e) => {
                          setCorrectAnswer(e.target.value);
                          clearError('correctAnswer');
                        }} />

                              {errors.correctAnswer &&
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {errors.correctAnswer}
                                </p>
                      }
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Match Value (%)
                              </label>
                              <input
                        type="number"
                        min={1}
                        max={100}
                        value={matchValue}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setMatchValue(
                            val < 1 ? 1 : val > 100 ? 100 : val
                          );
                        }}
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors" />

                              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                                What threshold in % do you want to use for the
                                correct answer? A 90% value means that the
                                submitted answer must be at least 90% similar to
                                correct answer to be marked as correct. - Ex.
                                the correct answer is 'Apple Inc.', but the
                                Target answered with 'Apple Inc' without the
                                period. At 90% value this answer would be marked
                                as correct.
                              </p>
                            </div>
                            <div>
                              <button
                        type="button"
                        onClick={() => {
                          const next = !showTestMatch;
                          setShowTestMatch(next);
                          if (next) scrollToRef(testMatchRef);
                        }}
                        className="w-full flex items-center gap-2 py-3 text-teal-600 hover:text-teal-700 transition-colors">

                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-bold uppercase tracking-wide">
                                  Test Match Value
                                </span>
                                <ChevronRight
                          className={`w-4 h-4 ml-auto transition-transform duration-300 ${showTestMatch ? 'rotate-90' : ''}`} />

                              </button>
                              <div ref={testMatchRef}>
                                <div
                          style={{
                            height: showTestMatch ?
                            `${testMatchHeight}px` :
                            '0px',
                            opacity: showTestMatch ? 1 : 0,
                            overflow: 'hidden',
                            transition:
                            'height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease'
                          }}>

                                  <div ref={testMatchContentRef}>
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Enter a test answer
                                      </label>
                                      <input
                                type="text"
                                value={testAnswer}
                                onChange={(e) => {
                                  setTestAnswer(e.target.value);
                                  setTestResult(null);
                                }}
                                placeholder="Type a test answer to compare..."
                                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors" />

                                      <button
                                type="button"
                                onClick={handleTestMatch}
                                disabled={
                                !correctAnswer.trim() ||
                                !testAnswer.trim()
                                }
                                className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">

                                        Run Test
                                      </button>
                                      {testResult &&
                              <div
                                className={`p-3 rounded-md border ${testResult.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>

                                          <div className="flex items-center gap-2 mb-1">
                                            {testResult.passed ?
                                  <CheckCircle2 className="w-4 h-4 text-green-600" /> :

                                  <AlertCircle className="w-4 h-4 text-red-500" />
                                  }
                                            <span
                                    className={`text-sm font-semibold ${testResult.passed ? 'text-green-700' : 'text-red-600'}`}>

                                              {testResult.passed ?
                                    'PASS' :
                                    'FAIL'}
                                            </span>
                                          </div>
                                          <p className="text-xs text-gray-600">
                                            Similarity:{' '}
                                            <span className="font-bold">
                                              {testResult.similarity}%
                                            </span>{' '}
                                            — Threshold:{' '}
                                            <span className="font-bold">
                                              {matchValue}%
                                            </span>
                                          </p>
                                        </div>
                              }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                  }

                        {type === 'matching' &&
                  <div className="space-y-4">
                            {errors.matchPairs &&
                    <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.matchPairs}
                              </p>
                    }
                            <div>
                              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-2.5">
                                Match Type
                              </span>
                              <div className="grid grid-cols-2 gap-3">
                                <button
                          onClick={() => {
                            setMatchSubType('text');
                            setActiveMatchPairIndex(null);
                          }}
                          className={`relative rounded-lg border-2 text-center transition-all cursor-pointer py-3 px-4 ${matchSubType === 'text' ? 'border-teal-500 bg-teal-50/50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>

                                  <div
                            className={`absolute top-2.5 right-2.5 transition-colors pointer-events-none ${matchSubType === 'text' ? 'text-green-500' : 'text-gray-300'}`}>

                                    {matchSubType === 'text' ?
                            <CheckCircle2 className="w-4 h-4" /> :

                            <Circle className="w-4 h-4" />
                            }
                                  </div>
                                  <div className="flex items-center justify-center gap-2">
                                    <Type
                              className={`w-4 h-4 ${matchSubType === 'text' ? 'text-teal-600' : 'text-gray-400'}`} />

                                    <span
                              className={`text-sm font-bold ${matchSubType === 'text' ? 'text-teal-700' : 'text-gray-600'}`}>

                                      Text Match
                                    </span>
                                  </div>
                                </button>
                                <button
                          onClick={() => {
                            setMatchSubType('image');
                            setActiveMatchPairIndex(null);
                          }}
                          className={`relative rounded-lg border-2 text-center transition-all cursor-pointer py-3 px-4 ${matchSubType === 'image' ? 'border-teal-500 bg-teal-50/50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>

                                  <div
                            className={`absolute top-2.5 right-2.5 transition-colors pointer-events-none ${matchSubType === 'image' ? 'text-green-500' : 'text-gray-300'}`}>

                                    {matchSubType === 'image' ?
                            <CheckCircle2 className="w-4 h-4" /> :

                            <Circle className="w-4 h-4" />
                            }
                                  </div>
                                  <div className="flex items-center justify-center gap-2">
                                    <Image
                              className={`w-4 h-4 ${matchSubType === 'image' ? 'text-teal-600' : 'text-gray-400'}`} />

                                    <span
                              className={`text-sm font-bold ${matchSubType === 'image' ? 'text-teal-700' : 'text-gray-600'}`}>

                                      Image Match
                                    </span>
                                  </div>
                                </button>
                              </div>
                              <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                                {matchSubType === 'text' ?
                        'Users will match text prompts with their correct text answers. Both columns will be shuffled.' :
                        'Users will match images with their correct text labels. Images and labels will be shuffled.'}
                              </p>
                            </div>
                            <AnimatePresence mode="wait">
                              {activeMatchPairIndex === null ?
                      <motion.div
                        key="pair-list"
                        initial={{
                          opacity: 0,
                          x: -10
                        }}
                        animate={{
                          opacity: 1,
                          x: 0
                        }}
                        exit={{
                          opacity: 0,
                          x: -10
                        }}
                        transition={{
                          duration: 0.2
                        }}
                        className="space-y-2">

                                  {matchPairs.map((pair, index) =>
                        <div
                          key={index}
                          draggable
                          onDragStart={(e) => {
                            matchDragIndexRef.current = index;
                            setMatchDragIndex(index);
                            e.dataTransfer.effectAllowed = 'move';
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'move';
                            setMatchDragOverIndex(index);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            const src = matchDragIndexRef.current;
                            if (src !== null && src !== index) {
                              const newPairs = [...matchPairs];
                              const [moved] = newPairs.splice(
                                src,
                                1
                              );
                              newPairs.splice(index, 0, moved);
                              setMatchPairs(newPairs);
                            }
                            matchDragIndexRef.current = null;
                            setMatchDragIndex(null);
                            setMatchDragOverIndex(null);
                          }}
                          onDragEnd={() => {
                            matchDragIndexRef.current = null;
                            setMatchDragIndex(null);
                            setMatchDragOverIndex(null);
                          }}
                          className={`flex items-center gap-2 group transition-all ${matchDragIndex === index ? 'opacity-30 scale-95' : ''} ${matchDragOverIndex === index && matchDragIndex !== index ? 'ring-2 ring-teal-400 rounded-lg' : ''}`}>

                                      <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors select-none">
                                        <GripVertical className="w-4 h-4" />
                                      </div>
                                      <button
                            onClick={() =>
                            setActiveMatchPairIndex(index)
                            }
                            className="flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-200 bg-white hover:border-teal-400 hover:bg-teal-50/30 transition-all text-left">

                                        {matchSubType === 'image' ?
                            pair.imageUrl ?
                            <img
                              src={pair.imageUrl}
                              alt=""
                              className="w-8 h-8 rounded object-cover flex-shrink-0" /> :


                            <div className="w-8 h-8 rounded bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                                              <Image className="w-3.5 h-3.5 text-gray-400" />
                                            </div> :


                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                                            <GitMerge className="w-4 h-4 text-gray-400" />
                                          </div>
                            }
                                        <div className="flex-1 min-w-0">
                                          <span className="text-sm text-gray-700 truncate block">
                                            {matchSubType === 'text' ?
                                pair.prompt.trim() ||
                                `Pair ${index + 1}` :
                                pair.imageUrl ?
                                'Image uploaded' :
                                `Pair ${index + 1}`}
                                          </span>
                                          {pair.answer.trim() &&
                              <span className="text-xs text-gray-400 truncate block">
                                              → {pair.answer}
                                            </span>
                              }
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                      </button>
                                      <button
                            onClick={() => {
                              if (matchPairs.length > 2) {
                                setMatchPairs(
                                  matchPairs.filter(
                                    (_, i) => i !== index
                                  )
                                );
                              }
                            }}
                            disabled={matchPairs.length <= 2}
                            className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-30 opacity-0 group-hover:opacity-100">

                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                        )}
                                  <button
                          onClick={() => {
                            const newPairs = [
                            ...matchPairs,
                            {
                              prompt: '',
                              answer: ''
                            }];

                            setMatchPairs(newPairs);
                            setActiveMatchPairIndex(
                              newPairs.length - 1
                            );
                          }}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">

                                    <Plus className="w-4 h-4" />
                                    Add New Option
                                  </button>
                                </motion.div> :

                      <motion.div
                        key={`pair-detail-${activeMatchPairIndex}`}
                        initial={{
                          opacity: 0,
                          x: 10
                        }}
                        animate={{
                          opacity: 1,
                          x: 0
                        }}
                        exit={{
                          opacity: 0,
                          x: 10
                        }}
                        transition={{
                          duration: 0.2
                        }}
                        className="space-y-4">

                                  {matchSubType === 'text' ?
                        <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Prompt
                                        <span className="text-red-400 ml-0.5">
                                          *
                                        </span>
                                      </label>
                                      <input
                            type="text"
                            value={
                            matchPairs[activeMatchPairIndex]?.
                            prompt || ''
                            }
                            onChange={(e) => {
                              const newPairs = [...matchPairs];
                              newPairs[activeMatchPairIndex] = {
                                ...newPairs[activeMatchPairIndex],
                                prompt: e.target.value
                              };
                              setMatchPairs(newPairs);
                              clearError('matchPrompt');
                            }}
                            placeholder='e.g., "Ananas"'
                            className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors ${errors.matchPrompt ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'}`} />

                                      <p className="mt-1 text-xs text-gray-400">
                                        The text shown on the left side that
                                        users will try to match.
                                      </p>
                                      {errors.matchPrompt &&
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                          <AlertCircle className="w-3 h-3" />
                                          {errors.matchPrompt}
                                        </p>
                          }
                                    </div> :

                        <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Image Prompt
                                        <span className="text-red-400 ml-0.5">
                                          *
                                        </span>
                                      </label>
                                      {matchPairs[activeMatchPairIndex]?.
                          imageUrl ?
                          <div className="relative group">
                                          <img
                              src={
                              matchPairs[activeMatchPairIndex].
                              imageUrl
                              }
                              alt="Match prompt"
                              className="w-full h-40 object-contain rounded-lg border border-gray-200 bg-gray-50" />

                                          <button
                              onClick={() => {
                                const newPairs = [...matchPairs];
                                newPairs[activeMatchPairIndex] = {
                                  ...newPairs[
                                  activeMatchPairIndex],

                                  imageUrl: undefined
                                };
                                setMatchPairs(newPairs);
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-md text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm opacity-0 group-hover:opacity-100">

                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div> :

                          <div
                            className="w-full min-h-[160px] rounded-lg border-2 border-dashed border-gray-300 bg-white flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gray-400 hover:bg-gray-50/50 transition-colors"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const file = e.dataTransfer.files[0];
                              if (
                              file &&
                              file.type.startsWith('image/'))
                              {
                                const url =
                                URL.createObjectURL(file);
                                const newPairs = [...matchPairs];
                                newPairs[activeMatchPairIndex] = {
                                  ...newPairs[
                                  activeMatchPairIndex],

                                  imageUrl: url
                                };
                                setMatchPairs(newPairs);
                              }
                            }}
                            onClick={() => {
                              const input =
                              document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => {
                                const file = (
                                e.target as HTMLInputElement).
                                files?.[0];
                                if (file) {
                                  const url =
                                  URL.createObjectURL(file);
                                  const newPairs = [...matchPairs];
                                  newPairs[activeMatchPairIndex] =
                                  {
                                    ...newPairs[
                                    activeMatchPairIndex],

                                    imageUrl: url
                                  };
                                  setMatchPairs(newPairs);
                                }
                              };
                              input.click();
                            }}>

                                          <Upload className="w-5 h-5 text-gray-400" />
                                          <span className="text-sm text-gray-500">
                                            Drag & Drop File(s)
                                          </span>
                                        </div>
                          }
                                      <p className="mt-1.5 text-xs text-gray-400">
                                        Upload the image users will match to the
                                        correct label. Best displayed at 1:1
                                        ratio (square).
                                      </p>
                                      {errors.matchPrompt &&
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                          <AlertCircle className="w-3 h-3" />
                                          {errors.matchPrompt}
                                        </p>
                          }
                                    </div>
                        }
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                      Answer
                                      <span className="text-red-400 ml-0.5">
                                        *
                                      </span>
                                    </label>
                                    <input
                            type="text"
                            value={
                            matchPairs[activeMatchPairIndex]?.
                            answer || ''
                            }
                            onChange={(e) => {
                              const newPairs = [...matchPairs];
                              newPairs[activeMatchPairIndex] = {
                                ...newPairs[activeMatchPairIndex],
                                answer: e.target.value
                              };
                              setMatchPairs(newPairs);
                              clearError('matchAnswer');
                            }}
                            placeholder={
                            matchSubType === 'text' ?
                            'e.g., "Pineapple"' :
                            'e.g., "Ananas"'
                            }
                            className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-gray-900 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors ${errors.matchAnswer ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'}`} />

                                    <p className="mt-1 text-xs text-gray-400">
                                      {matchSubType === 'text' ?
                            'The correct match shown on the right side.' :
                            'The text label that correctly matches this image.'}
                                    </p>
                                    {errors.matchAnswer &&
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.matchAnswer}
                                      </p>
                          }
                                  </div>
                                </motion.div>
                      }
                            </AnimatePresence>
                          </div>
                  }
                      </div>
                }
                  </div>
                  <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                    <Button
                  variant="secondary"
                  onClick={() => {
                    if (
                    type === 'matching' &&
                    activeMatchPairIndex !== null)
                    {
                      setErrors((prev) => {
                        const next = {
                          ...prev
                        };
                        delete next.matchPrompt;
                        delete next.matchAnswer;
                        return next;
                      });
                      setActiveMatchPairIndex(null);
                    } else {
                      navigateToForm();
                    }
                  }}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}>

                      Back
                    </Button>
                    {!(
                type === 'matching' && activeMatchPairIndex === null) &&

                <Button
                  variant="primary"
                  onClick={handleSaveAnswers}
                  leftIcon={<Save className="w-4 h-4" />}>

                        Save
                      </Button>
                }
                  </div>
                </motion.div>
            }
            </AnimatePresence>
          </div>
        }
      </div>
    </div>);

}