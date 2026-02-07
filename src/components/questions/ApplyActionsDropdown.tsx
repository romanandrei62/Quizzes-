import React, { useState } from 'react';
import { ChevronDown, Settings, CheckCircle, XCircle } from 'lucide-react';
interface ApplyActionsDropdownProps {
  onSetActive: () => void;
  onSetInactive: () => void;
}
export function ApplyActionsDropdown({
  onSetActive,
  onSetInactive
}: ApplyActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/10">

        <Settings className="w-4 h-4" />
        <span className="hidden sm:inline">Apply Actions</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px] z-20">
            <button onClick={() => {
          onSetActive();
          setIsOpen(false);
        }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">

              <CheckCircle className="w-4 h-4" style={{
            color: '#065f46'
          }} />

              Set Active
            </button>
            <button onClick={() => {
          onSetInactive();
          setIsOpen(false);
        }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">

              <XCircle className="w-4 h-4" style={{
            color: '#991b1b'
          }} />

              Set Inactive
            </button>
          </div>
        </>}
    </div>;
}