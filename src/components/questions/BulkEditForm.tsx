import React, { useState } from 'react';
import { TombstoneForm } from './TombstoneForm';
import { Save } from 'lucide-react';
interface BulkEditFormProps {
  selectedCount: number;
  onClose: () => void;
  onSave: (updates: {
    category?: string;
    status?: string;
  }) => void;
}
export function BulkEditForm({
  selectedCount,
  onClose,
  onSave
}: BulkEditFormProps) {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const handleSave = () => {
    const updates: {
      category?: string;
      status?: string;
    } = {};
    if (category) updates.category = category;
    if (status) updates.status = status;
    if (Object.keys(updates).length > 0) {
      onSave(updates);
    }
  };
  const hasChanges = category || status;
  return <TombstoneForm isOpen={true} onClose={() => {
    onClose();
    setIsExpanded(false);
  }} title={`Edit ${selectedCount} Item${selectedCount > 1 ? 's' : ''}`} maxWidth="lg" isExpanded={isExpanded} onToggleExpand={() => setIsExpanded(!isExpanded)} footer={<>
          <button onClick={() => {
      handleSave();
      onClose();
    }} disabled={!hasChanges} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">

            <Save className="h-4 w-4" />
            Save
          </button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ml-3">

            Cancel
          </button>
        </>}>

      <div className={`p-6 ${isExpanded ? 'space-y-6' : 'space-y-5'}`}>
        <p className="text-sm text-gray-600">
          Update fields for {selectedCount} selected item
          {selectedCount > 1 ? 's' : ''}. Leave fields empty to keep current
          values.
        </p>
        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">

            <option value="">No changes</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Feedback">Feedback</option>
            <option value="LMS">LMS</option>
            <option value="General">General</option>
          </select>
        </div>
        {/* Status Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">

            <option value="">No changes</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>
    </TombstoneForm>;
}