import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUpDown, ToggleLeft, DollarSign, Users } from 'lucide-react';
import { BarsSortIcon } from '../messaging/BarsSortIcon';
interface SortDropdownProps {
  onSortChange: (sortId: string) => void;
}
export function SortDropdown({
  onSortChange
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Created (Newest - Oldest)');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  const sortOptions = [{
    id: 'created_desc',
    label: 'Created (Newest - Oldest)',
    icon: Calendar
  }, {
    id: 'created_asc',
    label: 'Created (Oldest - Newest)',
    icon: Calendar
  }, {
    id: 'title_asc',
    label: 'Title (A - Z)',
    icon: ArrowUpDown
  }, {
    id: 'title_desc',
    label: 'Title (Z - A)',
    icon: ArrowUpDown
  }, {
    id: 'status',
    label: 'Status',
    icon: ToggleLeft
  }];
  const handleSortSelect = (sort: (typeof sortOptions)[0]) => {
    setSelectedSort(sort.label);
    onSortChange(sort.id);
    setIsOpen(false);
  };
  return <>
      {/* Button */}
      <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-50 rounded transition-colors flex-shrink-0">

        <BarsSortIcon className="w-5 h-5 text-gray-600" />
      </button>

      {/* Dropdown Portal - renders outside to avoid clipping */}
      <AnimatePresence>
        {isOpen && <motion.div ref={dropdownRef} initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -10
      }} transition={{
        duration: 0.15
      }} className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 mt-2 sm:w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-[70vh] overflow-y-auto" style={{
        top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 8 : 'auto'
      }}>

            {sortOptions.map((sort) => {
          const Icon = sort.icon;
          const isSelected = selectedSort === sort.label;
          return <button key={sort.id} onClick={() => handleSortSelect(sort)} className={`w-full px-4 py-2.5 text-left flex items-start gap-3 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-teal-50' : ''}`}>

                  <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isSelected ? 'text-teal-600' : 'text-gray-400'}`} />

                  <span className={`text-sm ${isSelected ? 'text-teal-600 font-medium' : 'text-gray-600'}`}>

                    {sort.label}
                  </span>
                </button>;
        })}
          </motion.div>}
      </AnimatePresence>
    </>;
}