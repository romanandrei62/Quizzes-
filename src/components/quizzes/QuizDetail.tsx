import React, { useState } from 'react';
import { X, ChevronRight, ChevronDown, Eye } from 'lucide-react';
import { Badge } from '../ui/Badge';

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

interface QuizDetailProps {
  quiz: Quiz | null;
  onClose: () => void;
}

export function QuizDetail({ quiz, onClose }: QuizDetailProps) {
  const [title, setTitle] = useState(quiz?.title || 'New Quiz');
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [description, setDescription] = useState(quiz?.description || '');

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
            <img src="/image.png" alt="Placeholder" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Quiz</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Details</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Title Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold text-gray-900 border-none outline-none focus:ring-0 bg-transparent w-full"
              placeholder="Quiz Title"
            />
            <button className="ml-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 transition-colors">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Preview</span>
            </button>
          </div>
        </div>

        {/* Settings Grid - 2 columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              # of questions
            </label>
            <div className="text-base text-gray-900">{quiz.numQuestions}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passing Score
            </label>
            <div className="text-base text-gray-900">{quiz.passingScore}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Category
            </label>
            <div>
              <Badge variant="default">{quiz.category}</Badge>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Score Display
            </label>
            <div className="text-base text-gray-900">
              {quiz.scoreDisplay ? 'On' : 'Off'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hints?
            </label>
            <div className="text-base text-gray-900">
              {quiz.hints ? 'Yes' : 'No'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Show % Complete
            </label>
            <div className="text-base text-gray-900">
              {quiz.showPercentComplete ? 'Yes' : 'No'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Show # of Questions
            </label>
            <div className="text-base text-gray-900">
              {quiz.showNumQuestions ? 'Yes' : 'No'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Show Progress Bar
            </label>
            <div className="text-base text-gray-900">
              {quiz.showProgressBar ? 'Yes' : 'No'}
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Status
            </label>
            <div className="flex items-center gap-2">
              {quiz.status === 'ready' && (
                <>
                  <span className="text-green-600">✓</span>
                  <span className="text-base text-green-600 font-medium">Ready</span>
                </>
              )}
              {quiz.status === 'draft' && (
                <span className="text-base text-gray-600">Draft</span>
              )}
              {quiz.status === 'archived' && (
                <span className="text-base text-gray-600">Archived</span>
              )}
            </div>
          </div>
        </div>

        {/* Quiz Description - Collapsible */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={() => setDescriptionExpanded(!descriptionExpanded)}
            className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded transition-colors"
          >
            <span className="text-sm font-medium text-gray-900">Quiz Description</span>
            {descriptionExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {descriptionExpanded && (
            <div className="mt-2">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add quiz description..."
                className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
