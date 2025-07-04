// TaskActions.jsx
import React, { useState } from 'react';
import Button from '../ui/Button';
import { Plus, ChevronDown } from 'lucide-react';

const TaskActions = ({ onShowModal, filter, onFilter, taskCounts }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const filterOptions = [
    { key: 'all', label: 'All Tasks', icon: '📋' },
    { key: 'pending', label: 'Pending', icon: '⏳' },
    { key: 'completed', label: 'Completed', icon: '✔' },
  ];

  const activeFilter = filterOptions.find((f) => f.key === filter);

  return (
    <div className='flex justify-between items-center my-8'>
      {/* Filter Dropdown */}
      <div className='relative'>
        <Button
          className='flex items-center gap-2'
          variant='secondary'
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>{activeFilter?.icon}</span>
          {activeFilter?.label} ({taskCounts[filter]})
          <ChevronDown size={16} />
        </Button>

        {showDropdown && (
          <div className='absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-[180px]'>
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => {
                  onFilter(option.key);
                  setShowDropdown(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
                  filter === option.key ? 'bg-purple-50 text-purple-600' : ''
                }`}
              >
                <span>{option.icon}</span>
                {option.label}
                <span className='ml-auto text-sm text-gray-500'>
                  {taskCounts[option.key]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add Task Button */}
      <Button className='flex items-center gap-2' onClick={onShowModal}>
        <Plus size={20} absoluteStrokeWidth={3} /> Add New Task
      </Button>
    </div>
  );
};

export default TaskActions;
