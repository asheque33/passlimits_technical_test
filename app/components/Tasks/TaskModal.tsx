import React, { useState } from 'react';
import Button from '../ui/Button';

const TaskModal = ({ onShowModal, onSaveTask, onCloseTask, updatedTask }) => {
  const [isAdded] = useState(Object.is(updatedTask, null));
  const [errors, setErrors] = useState({});
  const [task, setTask] = useState(
    updatedTask || {
      title: '',
      description: '',
      status: 'pending',
      dueDate: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };
  const handleSubmit = () => {
    const newErrors = {};
    if (!task.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!task.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!task.dueDate.trim()) {
      newErrors.dueDate = 'Due date is required';
    }
    setErrors(newErrors);

    // Only submit if NO errors
    if (Object.keys(newErrors).length === 0) {
      onSaveTask(task, isAdded);
      onShowModal(false);
    }
  };
  return (
    <>
      <div
        onClick={onCloseTask}
        className='bg-black/70 fixed inset-0 w-screen h-screen  z-10'
      ></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className='fixed top-1/2 left-1/2  transform -translate-x-[54%] sm:-translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-lg mx-4 z-20 border rounded-xl p-4 sm:p-6 shadow-2xl space-y-2'
      >
        <div>
          <label
            className='block text-sm font-medium text-gray-700 mb-1'
            htmlFor=''
          >
            Task Title
          </label>
          <input
            type='text'
            name='title'
            value={task.title}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none'
            placeholder='Enter Task Title...'
          />
          {errors.title && (
            <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
          )}
        </div>
        <div>
          <label
            className='block text-sm font-medium text-gray-700 mb-1'
            htmlFor=''
          >
            Description
          </label>
          <textarea
            name='description'
            value={task.description}
            onChange={handleChange}
            id=''
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none'
          />
          {errors.description && (
            <p className='text-red-500 text-sm mt-1'>{errors.description}</p>
          )}
        </div>
        <div>
          <label
            className='block text-sm font-medium text-gray-700 mb-1'
            htmlFor=''
          >
            Due Date
          </label>
          <input
            type='date'
            name='dueDate'
            value={task.dueDate}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none '
          />
          {errors.dueDate && (
            <p className='text-red-500 text-sm mt-1'>{errors.dueDate}</p>
          )}
        </div>
        <div className='flex items-center justify-between pt-4'>
          <Button variant='secondary' onClick={onCloseTask}>
            Cancel
          </Button>
          <Button
            // onClick={() => {
            //   handleErrors();
            //   onSaveTask(task, isAdded);
            //   onShowModal(false);
            //   setIsAdded(false);
            // }}
            onClick={handleSubmit}
          >
            {isAdded ? 'Create Task' : 'Update Task'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
