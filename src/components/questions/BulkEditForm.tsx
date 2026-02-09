import React, { useState } from 'react';
import { TombstoneForm } from './TombstoneForm';
import { Save, X } from 'lucide-react';
import { Button } from '../ui/Button';
interface BulkEditFormProps {
  selectedCount: number;
  onClose: () => void;
  onSave: (updates: {category?: string;}) => void;
}
export function BulkEditForm({
  selectedCount,
  onClose,
  onSave
}: BulkEditFormProps) {
  const [category, setCategory] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const handleSave = () => {
    const updates: {
      category?: string;
    } = {};
    if (category) updates.category = category;
    if (Object.keys(updates).length > 0) {
      onSave(updates);
    }
  };
  const hasChanges = !!category;
  return (
    <TombstoneForm
      isOpen={true}
      onClose={() => {
        onClose();
        setIsExpanded(false);
      }}
      title={`Edit ${selectedCount} Item${selectedCount > 1 ? 's' : ''}`}
      maxWidth="lg"
      isExpanded={isExpanded}
      onToggleExpand={() => setIsExpanded(!isExpanded)}
      footer={
      <div className="flex items-center justify-between w-full">
          <Button
          variant="secondary"
          onClick={onClose}
          leftIcon={<X className="w-4 h-4" />}>

            Cancel
          </Button>
          <Button
          variant="primary"
          onClick={() => {
            handleSave();
            onClose();
          }}
          disabled={!hasChanges}
          leftIcon={<Save className="w-4 h-4" />}>

            Save
          </Button>
        </div>
      }>

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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">

            <option value="">No changes</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Feedback">Feedback</option>
            <option value="LMS">LMS</option>
            <option value="General">General</option>
          </select>
        </div>
      </div>
    </TombstoneForm>);

}