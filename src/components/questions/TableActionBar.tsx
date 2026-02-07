import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, CheckSquare, Calendar, ArrowUpDown, ToggleLeft, Eye, EyeOff } from 'lucide-react';
import { BarsSortIcon } from '../messaging/BarsSortIcon';
export interface TableActionBarProps {
  // Primary Action
  primaryActionLabel?: string;
  primaryActionIcon?: React.ReactNode;
  onPrimaryAction?: () => void;
  // Search
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  // Filter
  showFilter?: boolean;
  onFilter?: (filterId: string) => void;
  // Sort
  showSort?: boolean;
  onSort?: (sortId: string) => void;
  // Checkboxes Toggle
  showCheckboxToggle?: boolean;
  checkboxesVisible?: boolean;
  onToggleCheckboxes?: () => void;
  // Items Per Page
  showItemsPerPage?: boolean;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  onItemsPerPageChange?: (value: number) => void;
  // Styling
  className?: string;
}
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
const filterOptions = [{
  id: 'all',
  label: 'All Questions',
  icon: Filter
}, {
  id: 'published',
  label: 'Published',
  icon: Eye
}, {
  id: 'draft',
  label: 'Draft',
  icon: EyeOff
}];
export function TableActionBar({
  primaryActionLabel = 'ADD ITEM',
  primaryActionIcon,
  onPrimaryAction,
  showSearch = true,
  searchPlaceholder = 'Search...',
  onSearch,
  showFilter = true,
  onFilter,
  showSort = true,
  onSort,
  showCheckboxToggle = true,
  checkboxesVisible = true,
  onToggleCheckboxes,
  showItemsPerPage = true,
  itemsPerPage = 10,
  itemsPerPageOptions = [10, 25, 50],
  onItemsPerPageChange,
  className = ''
}: TableActionBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Created (Newest - Oldest)');
  const [selectedFilter, setSelectedFilter] = useState('All Questions');
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const narrowContainerRef = useRef<HTMLDivElement>(null);
  // Detect container width dynamically
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  // Use narrow layout when container is less than 640px wide
  const useNarrowLayout = containerWidth > 0 && containerWidth < 640;
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };
  const handleSortSelect = (sortId: string, label: string) => {
    setSelectedSort(label);
    onSort?.(sortId);
    setSortOpen(false);
  };
  const handleFilterSelect = (filterId: string, label: string) => {
    setSelectedFilter(label);
    onFilter?.(filterId);
    setFilterOpen(false);
  };
  return <div className={`${className}`}>
      <div ref={containerRef} className="h-[57px] px-6 border-b border-gray-200 flex items-center flex-shrink-0">

        {/* Wide Layout */}
        {!useNarrowLayout && <div className="flex items-center justify-end gap-3 w-full">
            {/* Search Button */}
            {showSearch && <>
                <AnimatePresence mode="wait">
                  {searchOpen && <motion.div initial={{
              width: 0,
              opacity: 0
            }} animate={{
              width: 320,
              opacity: 1
            }} exit={{
              width: 0,
              opacity: 0
            }} transition={{
              duration: 0.2,
              ease: 'easeInOut'
            }} className="overflow-hidden">

                      <input type="text" placeholder={searchPlaceholder} value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} className="w-80 px-4 py-2 border-2 border-teal-500 rounded-lg focus:outline-none focus:border-teal-600 text-sm" autoFocus />

                    </motion.div>}
                </AnimatePresence>
                <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-gray-50 rounded transition-colors flex-shrink-0">

                  <Search className="w-5 h-5 text-gray-600" />
                </button>
              </>}
            {/* Filter Dropdown */}
            {showFilter && <div className="relative">
                <button onClick={() => setFilterOpen(!filterOpen)} className="p-2 hover:bg-gray-50 rounded transition-colors flex-shrink-0">

                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
                <AnimatePresence>
                  {filterOpen && <>
                      <div className="fixed inset-0 z-30" onClick={() => setFilterOpen(false)} />

                      <motion.div initial={{
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
              }} className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-40">

                        {filterOptions.map((filter) => {
                  const Icon = filter.icon;
                  const isSelected = selectedFilter === filter.label;
                  return <button key={filter.id} onClick={() => handleFilterSelect(filter.id, filter.label)} className={`w-full px-4 py-2.5 text-left flex items-start gap-3 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-teal-50' : ''}`}>

                              <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isSelected ? 'text-teal-600' : 'text-gray-400'}`} />

                              <span className={`text-sm ${isSelected ? 'text-teal-600 font-medium' : 'text-gray-600'}`}>

                                {filter.label}
                              </span>
                            </button>;
                })}
                      </motion.div>
                    </>}
                </AnimatePresence>
              </div>}
            {/* Sort Dropdown - Wide Layout */}
            {showSort && <div className="relative">
                <button onClick={() => setSortOpen(!sortOpen)} className="p-2 hover:bg-gray-50 rounded transition-colors flex-shrink-0">

                  <BarsSortIcon className="w-5 h-5 text-gray-600" />
                </button>
                <AnimatePresence>
                  {sortOpen && <>
                      <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />

                      <motion.div initial={{
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
              }} className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">

                        {sortOptions.map((sort) => {
                  const Icon = sort.icon;
                  const isSelected = selectedSort === sort.label;
                  return <button key={sort.id} onClick={() => handleSortSelect(sort.id, sort.label)} className={`w-full px-4 py-2.5 text-left flex items-start gap-3 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-teal-50' : ''}`}>

                              <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isSelected ? 'text-teal-600' : 'text-gray-400'}`} />

                              <span className={`text-sm ${isSelected ? 'text-teal-600 font-medium' : 'text-gray-600'}`}>

                                {sort.label}
                              </span>
                            </button>;
                })}
                      </motion.div>
                    </>}
                </AnimatePresence>
              </div>}
            {/* Checkbox Toggle */}
            {showCheckboxToggle && <button onClick={onToggleCheckboxes} className={`p-2 rounded transition-colors ${checkboxesVisible ? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-gray-50'}`} style={{
          color: '#444444'
        }} title={checkboxesVisible ? 'Hide checkboxes' : 'Show checkboxes'}>

                <CheckSquare className="w-5 h-5" />
              </button>}
            {/* Items Per Page */}
            {showItemsPerPage && <select value={itemsPerPage} onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))} className="px-3 py-2 border border-gray-300 rounded text-sm bg-white flex-shrink-0">

                {itemsPerPageOptions.map((option) => <option key={option} value={option}>
                    {option}
                  </option>)}
              </select>}
          </div>}

        {/* Narrow Layout */}
        {useNarrowLayout && <div className="w-full">
            <div ref={narrowContainerRef} className="relative">
              {/* Top Row - Icons right-aligned */}
              <div className="flex items-center justify-end gap-3">
                {/* Search Button */}
                {showSearch && <button onClick={() => {
              setSearchOpen(!searchOpen);
              if (searchOpen) {
                setSortOpen(false);
                setFilterOpen(false);
              }
            }} className="p-2 hover:bg-gray-50 rounded transition-colors">

                    <Search className="w-5 h-5 text-gray-600" />
                  </button>}
                {/* Filter Button */}
                {showFilter && <button onClick={() => {
              setFilterOpen(!filterOpen);
              if (filterOpen) {
                setSearchOpen(false);
                setSortOpen(false);
              }
            }} className="p-2 hover:bg-gray-50 rounded transition-colors">

                    <Filter className="w-5 h-5 text-gray-600" />
                  </button>}
                {/* Sort Button */}
                {showSort && <button onClick={() => {
              setSortOpen(!sortOpen);
              if (sortOpen) {
                setSearchOpen(false);
                setFilterOpen(false);
              }
            }} className="p-2 hover:bg-gray-50 rounded transition-colors">

                    <BarsSortIcon className="w-5 h-5 text-gray-600" />
                  </button>}
                {/* Checkbox Toggle */}
                {showCheckboxToggle && <button onClick={onToggleCheckboxes} className={`p-2 rounded transition-colors ${checkboxesVisible ? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-gray-50'}`} style={{
              color: '#444444'
            }} title={checkboxesVisible ? 'Hide checkboxes' : 'Show checkboxes'}>

                    <CheckSquare className="w-5 h-5" />
                  </button>}
                {/* Items Per Page */}
                {showItemsPerPage && <select value={itemsPerPage} onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))} className="px-2 py-2 border border-gray-300 rounded text-xs bg-white">

                    {itemsPerPageOptions.map((option) => <option key={option} value={option}>
                        {option}
                      </option>)}
                  </select>}
              </div>

              {/* Narrow Filter Dropdown */}
              {showFilter && <AnimatePresence>
                  {filterOpen && <>
                      <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)} />

                      <motion.div initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -10
              }} transition={{
                duration: 0.2,
                ease: 'easeInOut'
              }} className="absolute left-0 right-0 mt-2 max-w-xs bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-20">

                        {filterOptions.map((filter) => {
                  const Icon = filter.icon;
                  const isSelected = selectedFilter === filter.label;
                  return <button key={filter.id} onClick={() => handleFilterSelect(filter.id, filter.label)} className={`w-full px-4 py-2.5 text-left flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${isSelected ? 'bg-teal-50' : ''}`}>

                              <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isSelected ? 'text-teal-600' : 'text-gray-400'}`} />

                              <span className={`text-sm ${isSelected ? 'text-teal-600 font-medium' : 'text-gray-600'}`}>

                                {filter.label}
                              </span>
                            </button>;
                })}
                      </motion.div>
                    </>}
                </AnimatePresence>}

              {/* Narrow Sort - Overlay with max width, positioned relative to container */}
              {showSort && <AnimatePresence>
                  {sortOpen && <>
                      {/* Backdrop */}
                      <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />

                      {/* Sort Dropdown - With max width */}
                      <motion.div initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -10
              }} transition={{
                duration: 0.2,
                ease: 'easeInOut'
              }} className="absolute left-0 right-0 mt-2 max-w-xs bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-20">

                        {sortOptions.map((sort) => {
                  const Icon = sort.icon;
                  const isSelected = selectedSort === sort.label;
                  return <button key={sort.id} onClick={() => handleSortSelect(sort.id, sort.label)} className={`w-full px-4 py-2.5 text-left flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${isSelected ? 'bg-teal-50' : ''}`}>

                              <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isSelected ? 'text-teal-600' : 'text-gray-400'}`} />

                              <span className={`text-sm ${isSelected ? 'text-teal-600 font-medium' : 'text-gray-600'}`}>

                                {sort.label}
                              </span>
                            </button>;
                })}
                      </motion.div>
                    </>}
                </AnimatePresence>}
            </div>
          </div>}
      </div>

      {/* Narrow Search - Expands below when viewport is narrow */}
      {useNarrowLayout && showSearch && <AnimatePresence>
          {searchOpen && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.2,
        ease: 'easeInOut'
      }} className="overflow-hidden border-b border-gray-200">

              <div className="px-6 py-3">
                <input type="text" placeholder={searchPlaceholder} value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} className="w-full px-4 py-2.5 border-2 border-teal-500 rounded-lg focus:outline-none focus:border-teal-600 text-sm" autoFocus />

              </div>
            </motion.div>}
        </AnimatePresence>}
    </div>;
}