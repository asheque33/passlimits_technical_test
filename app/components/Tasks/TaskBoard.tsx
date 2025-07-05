'use client';
import React, { useReducer, useState } from 'react';
import Header from '../Header/Header';
import TaskList from './TaskList';
import { taskData } from '@/app/data/tasks';
import TaskModal from './TaskModal';
import TaskActions from './TaskActions';
import { nextId } from '@/app/utils/nextId';
import { taskReducer } from '@/app/reducer/taskReducer';

const TaskBoard = () => {
  const [tasks, dispatch] = useReducer(taskReducer, taskData);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');

  //  Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  //  Task counts for filter buttons
  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  const handleAddEditTask = (taskData, isAdded) => {
    if (isAdded) {
      dispatch({
        type: 'add_task',
        payload: {
          id: nextId(tasks),
          task: taskData,
        },
      });
      setTaskToUpdate(null);
    } else {
      dispatch({
        type: 'update_task',
        payload: {
          id: taskData.id,
          task: taskData,
        },
      });
    }
  };

  const handleToggleStatus = (taskId) => {
    dispatch({
      type: 'toggle_status',
      payload: {
        id: taskId,
      },
    });
  };

  const handleDeleteTask = (taskId) => {
    dispatch({
      type: 'delete_task',
      payload: {
        id: taskId,
      },
    });
  };
  const handleCloseModalTask = () => {
    setTaskToUpdate(null);
    setShowModal(false);
  };

  const handleUpdateTask = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      {showModal && (
        <TaskModal
          onShowModal={setShowModal}
          onSaveTask={handleAddEditTask}
          onCloseTask={handleCloseModalTask}
          updatedTask={taskToUpdate}
        />
      )}
      <div className='max-w-4xl w-full mx-auto py-8 px-4'>
        <Header />
        <TaskActions
          onShowModal={() => {
            setShowModal(true);
            setTaskToUpdate(null);
          }}
          filter={filter}
          onFilter={setFilter}
          taskCounts={taskCounts}
        />
        <TaskList
          tasks={filteredTasks}
          onToggleStatus={handleToggleStatus}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onShowModal={setShowModal}
        />
      </div>
    </div>
  );
};

export default TaskBoard;
