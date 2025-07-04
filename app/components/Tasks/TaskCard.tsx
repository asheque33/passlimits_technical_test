import React, { useState } from 'react';
import Button from '../ui/Button';

const TaskCard = ({
  task,
  onToggleStatus,
  onShowModal,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [subtasks, setSubtasks] = useState([]);
  const [loadingSubtasks, setLoadingSubtasks] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (date) =>
    new Date(date)
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .replace(/ (\w{3}) /, ' $1, ');

  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status === 'pending';

  const handleSuggestSubtasks = async (taskId, taskTitle) => {
    setLoadingSubtasks(true);
    setError('');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: taskTitle,
          description: task.description,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubtasks(data.subtasks);
        setShowSubtasks(true);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Network error. Please try again.' || err);
    } finally {
      setLoadingSubtasks(false);
    }
  };

  return (
    <div
      className={`bg-white border border-black/10 rounded-xl p-6 ${
        isOverdue ? 'border-l-4 border-l-red-500' : ''
      }`}
    >
      <div className='flex justify-between items-start mb-4'>
        <div className='flex-1'>
          <h3
            className={`text-lg font-semibold mb-2 ${
              task.status === 'completed'
                ? 'text-gray-500 line-through'
                : 'text-gray-800'
            }`}
          >
            {task.title}
          </h3>
          <p
            className={`text-sm mb-3 ${
              task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {task.description}
          </p>
        </div>
      </div>

      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center space-x-3'>
          <span
            className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full ${
              task.status === 'completed'
                ? 'text-green-800 bg-green-100'
                : 'text-yellow-800 bg-yellow-100'
            }`}
          >
            {task.status}
          </span>
          <span
            className={`text-xs ${
              isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'
            }`}
          >
            Due: {formatDate(task.dueDate)}
            {isOverdue && ' (Overdue)'}
          </span>
        </div>
      </div>

      {/* AI Subtasks */}
      <div className='mb-4'>
        <div className='flex items-center space-x-2 mb-2'>
          <Button
            size='sm'
            variant='secondary'
            onClick={() => handleSuggestSubtasks(task.id, task.title)}
            disabled={loadingSubtasks}
          >
            {loadingSubtasks ? (
              <>
                <svg
                  className='animate-spin h-4 w-4 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                Getting AI suggestions...
              </>
            ) : (
              '🤖 Suggest Subtasks'
            )}
          </Button>

          {subtasks.length > 0 && (
            <Button
              size='sm'
              variant='ghost'
              onClick={() => setShowSubtasks((prev) => !prev)}
              className='text-purple-600 hover:text-purple-700 border border-purple-300'
            >
              {showSubtasks ? 'Hide' : 'Show'} Subtasks ({subtasks.length})
            </Button>
          )}
        </div>

        {/* Simple Error Message */}
        {error && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-3 mb-3'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-red-600'>{error}</span>
              <button
                onClick={() => setError('')}
                className='text-red-400 hover:text-red-600'
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Subtasks Display */}
        {showSubtasks && subtasks.length > 0 && (
          <div className='bg-purple-50 rounded-lg p-3 mt-2'>
            <p className='text-xs text-purple-600 font-medium mb-2'>
              🤖 AI Generated Subtasks:
            </p>
            <ul className='space-y-1'>
              {subtasks.map((subtask, index) => (
                <li
                  key={index}
                  className='text-sm text-purple-700 flex items-center'
                >
                  <span className='w-4 h-4 bg-purple-200 rounded-full flex items-center justify-center text-xs font-bold text-purple-800 mr-2'>
                    {index + 1}
                  </span>
                  {subtask}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Task Actions */}
      <div className='flex justify-between items-center'>
        <Button
          size='sm'
          variant={task.status === 'completed' ? 'secondary' : 'primary'}
          onClick={() => onToggleStatus(task.id)}
        >
          {task.status === 'completed' ? '↺ Mark Pending' : '✓ Mark Complete'}
        </Button>
        <div className='flex items-center gap-2.5'>
          <Button
            onClick={() => {
              onShowModal((prev) => !prev);
              onUpdateTask(task);
            }}
            variant='secondary'
            size='sm'
          >
            ✏️ Edit
          </Button>
          <Button
            onClick={() => onDeleteTask(task.id)}
            variant='danger'
            size='sm'
          >
            🗑️ Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
